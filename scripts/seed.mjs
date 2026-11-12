// Seed the AutoSpec catalog from the official EPA FuelEconomy.gov dataset.
//
// Source: https://www.fueleconomy.gov/feg/epadata/vehicles.csv.zip
//         (EPA "All vehicles" fuel economy and emissions dataset, public domain US gov data)
//
// - Groups EPA configurations into one `vehicles` row per (year, make, baseModel).
// - Writes `engines`, `vehicle_specifications` (confidence: official_government_source)
//   and a `data_import_logs` audit row.
// - Slug format MUST match `slugifyVehicleSegment()` in src/lib/autospec.model.ts.
//
// Usage: node scripts/seed.mjs [--dry-run]
// Requires SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env (never committed).

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DRY_RUN = process.argv.includes("--dry-run");

// ---------------------------------------------------------------- config ----
function loadEnv() {
  const env = { ...process.env };
  const file = path.join(ROOT, ".env");
  if (fs.existsSync(file)) {
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (m && !(m[1] in env)) env[m[1]] = m[2];
    }
  }
  return env;
}
const env = loadEnv();
const SUPABASE_URL = (env.SUPABASE_URL || env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY || "";
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

async function rest(method, p, body, headers = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${p}`, {
    method,
    headers: {
      apikey: SERVICE_KEY,
      authorization: `Bearer ${SERVICE_KEY}`,
      "content-type": "application/json",
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${method} ${p} -> ${res.status} ${text.slice(0, 500)}`);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

async function countRows(table) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=id&limit=1`, {
    method: "HEAD",
    headers: {
      apikey: SERVICE_KEY,
      authorization: `Bearer ${SERVICE_KEY}`,
      Prefer: "count=exact",
    },
  });
  if (!res.ok) throw new Error(`count ${table} -> ${res.status}`);
  const range = res.headers.get("content-range") || "";
  return Number(range.split("/")[1] ?? 0);
}

// Deterministic UUIDs so re-runs upsert instead of duplicating.
function uuidFrom(key) {
  const h = crypto.createHash("md5").update(key).digest("hex");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-a${h.slice(13, 16)}-8${h.slice(17, 20)}-${h.slice(20, 32)}`;
}

// Must mirror slugifyVehicleSegment() in src/lib/autospec.model.ts
function slugifySegment(value) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// ------------------------------------------------------------------ csv -----
function parseCSV(s) {
  const rows = [];
  let row = [], field = "", q = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (q) {
      if (c === '"') { if (s[i + 1] === '"') { field += '"'; i++; } else q = false; }
      else field += c;
    } else {
      if (c === '"') q = true;
      else if (c === ",") { row.push(field); field = ""; }
      else if (c === "\n") { row.push(field); field = ""; rows.push(row); row = []; }
      else if (c !== "\r") field += c;
    }
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function mostFrequent(items) {
  const counts = new Map();
  let best = null, bestN = 0;
  for (const it of items) {
    const v = (it ?? "").trim();
    if (!v) continue;
    const n = (counts.get(v) ?? 0) + 1;
    counts.set(v, n);
    if (n > bestN) { best = v; bestN = n; }
  }
  return best;
}

const csvPath = path.join(os.tmpdir(), "opencode", "vehicles.csv");
if (!fs.existsSync(csvPath)) {
  console.error(`EPA dataset not found at ${csvPath}`);
  process.exit(1);
}
console.log("Reading EPA vehicles.csv …");
const rows = parseCSV(fs.readFileSync(csvPath, "utf8"));
const header = rows[0];
const idx = Object.fromEntries(header.map((h, i) => [h, i]));
const need = ["year", "make", "model", "baseModel", "comb08", "city08", "highway08", "VClass"];
for (const k of need) if (!(k in idx)) { console.error(`CSV missing column ${k}`); process.exit(1); }

// --------------------------------------------------------------- groups -----
const groups = new Map();
let rawConfigs = 0;
for (let i = 1; i < rows.length; i++) {
  const r = rows[i];
  const year = Number(r[idx.year]);
  const make = (r[idx.make] || "").trim();
  const base = (r[idx.baseModel] || r[idx.model] || "").trim();
  if (!year || !make || !base) continue;
  rawConfigs++;
  const key = `${year}|${make.toLowerCase()}|${base.toLowerCase()}`;
  let g = groups.get(key);
  if (!g) {
    g = { year, makeVariants: [], modelVariants: [], configs: [] };
    groups.set(key, g);
  }
  g.makeVariants.push(make);
  g.modelVariants.push(base);
  g.configs.push({
    epaId: r[idx.id],
    model: (r[idx.model] || "").trim(),
    displ: r[idx.displ] ? Number(r[idx.displ]) : null,
    cylinders: r[idx.cylinders] ? Number(r[idx.cylinders]) : null,
    drive: (r[idx.drive] || "").trim(),
    trany: (r[idx.trany] || "").trim(),
    fuel1: (r[idx.fuelType1] || "").trim(),
    fuel2: (r[idx.fuelType2] || "").trim(),
    vclass: (r[idx.VClass] || "").trim(),
    comb: Number(r[idx.comb08]) || 0,
    city: Number(r[idx.city08]) || 0,
    hwy: Number(r[idx.highway08]) || 0,
    combA: Number(r[idx.combA08]) || 0,
    range: Number(r[idx.range]) || 0,
    rangeA: Number(r[idx.rangeA]) || 0,
    combE: Number(r[idx.combE]) || 0,
    feScore: Number(r[idx.feScore]) || 0,
    ghgScore: Number(r[idx.ghgScore]) || 0,
  });
}
console.log(`Parsed ${rawConfigs} EPA configurations into ${groups.size} vehicle groups`);

// ------------------------------------------------------- derive rows --------
const SOURCE_ID = uuidFrom("source:epa-fueleconomy");
const usedSlugs = new Set();
const skippedSlugs = [];
const vehicles = [];
const enginesByKey = new Map();
const specs = [];

function engineKey(make, c) {
  return `${make.toLowerCase()}|${c.displ ?? ""}|${c.cylinders ?? ""}|${c.fuel1}`;
}

for (const [key, g] of groups) {
  const make = mostFrequent(g.makeVariants);
  const model = mostFrequent(g.modelVariants);

  // Exact-duplicate configurations, then order for a representative pick.
  const seen = new Set();
  const configs = [];
  for (const c of g.configs) {
    const t = `${c.model}|${c.drive}|${c.trany}|${c.displ}|${c.cylinders}|${c.comb}|${c.city}|${c.hwy}|${c.epaId}`;
    if (seen.has(t)) continue;
    seen.add(t);
    configs.push(c);
  }
  if (configs.length === 0) continue;

  const slug = `${slugifySegment(make)}-${slugifySegment(model)}-${g.year}`;
  if (usedSlugs.has(slug)) {
    skippedSlugs.push(slug);
    continue;
  }
  usedSlugs.add(slug);

  // Representative config: median combined rating (MPG or MPGe depending on type).
  const sorted = [...configs].sort((a, b) => a.comb - b.comb);
  const rep = sorted[Math.floor(sorted.length / 2)];

  const isEV = rep.fuel1.toLowerCase().includes("electric");
  const isPHEV = rep.fuel2.toLowerCase().includes("electric");

  const fuelType = isEV ? "Electric"
    : isPHEV ? "Plug-in Hybrid Electric"
    : /diesel/i.test(rep.fuel1) ? "Diesel"
    : /cng|natural gas/i.test(rep.fuel1) ? "CNG"
    : /hydrogen/i.test(rep.fuel1) ? "Hydrogen"
    : "Gasoline";

  let engineId = null;
  const ek = engineKey(make, rep);
  if (!enginesByKey.has(ek)) {
    enginesByKey.set(ek, {
      id: uuidFrom(`engine:${ek}`),
      manufacturer: make,
      engine_code: null,
      displacement: rep.displ,
      cylinders: rep.cylinders,
      aspiration: null,
      fuel_type: rep.fuel1 || null,
      horsepower: null,
      torque: null,
      horsepower_unit: null,
      torque_unit: null,
    });
  }
  engineId = enginesByKey.get(ek).id;

  vehicles.push({
    id: uuidFrom(`vehicle:${slug}`),
    year: g.year,
    make,
    model,
    trim: null,
    generation: null,
    body_style: null,
    market: "US",
    vehicle_type: mostFrequent(configs.map((c) => c.vclass)) || null,
    fuel_type: fuelType,
    transmission: mostFrequent(configs.map((c) => c.trany)) || null,
    drivetrain: mostFrequent(configs.map((c) => c.drive)) || null,
    engine_id: engineId,
    external_source_ids: {
      fueleconomy_gov_id: rep.epaId,
      epa_configuration_count: configs.length,
    },
    slug,
  });

  // ---- specifications (all from the EPA dataset: official government source)
  const vehicleId = uuidFrom(`vehicle:${slug}`);
  const baseSpec = {
    vehicle_id: vehicleId,
    market: "US",
    source_id: SOURCE_ID,
    confidence_status: "official_government_source",
    verified_at: new Date().toISOString(),
  };
  const addSpec = (category, name, value, unit, notes) => {
    if (value === null || value === undefined || value === "" || Number.isNaN(value)) return;
    specs.push({
      ...baseSpec,
      id: uuidFrom(`spec:${slug}:${category}:${name}`),
      specification_category: category,
      specification_name: name,
      value: String(value),
      unit: unit ?? null,
      notes: notes ?? null,
    });
  };

  const reps = configs.length > 1
    ? `Representative EPA configuration: ${rep.model || "base model"}. `
    : "";
  const rangeNote = (vals, unitLabel) => {
    const v = vals.filter((n) => n > 0);
    if (v.length < 2) return reps;
    const min = Math.min(...v), max = Math.max(...v);
    if (min === max) return reps;
    return `${reps}EPA ${unitLabel} ratings across ${v.length} configurations range from ${min} to ${max}.`;
  };

  if (isEV) {
    addSpec("Fuel Economy", "Combined MPGe", rep.comb, "MPGe", rangeNote(configs.map((c) => c.comb), "MPGe"));
    addSpec("Fuel Economy", "City MPGe", rep.city, "MPGe", null);
    addSpec("Fuel Economy", "Highway MPGe", rep.hwy, "MPGe", null);
    if (rep.range > 0) addSpec("Fuel Economy", "Electric Range", rep.range, "miles", rangeNote(configs.map((c) => c.range), "range"));
    if (rep.combE > 0) addSpec("Fuel Economy", "Energy Consumption", rep.combE, "kWh/100 miles", null);
  } else if (isPHEV) {
    addSpec("Fuel Economy", "Combined MPG (gas only)", rep.comb, "MPG", rangeNote(configs.map((c) => c.comb), "gas MPG"));
    if (rep.combA > 0) addSpec("Fuel Economy", "Combined MPGe", rep.combA, "MPGe", null);
    if (rep.rangeA > 0) addSpec("Fuel Economy", "Electric Range", rep.rangeA, "miles", rangeNote(configs.map((c) => c.rangeA), "electric range"));
  } else {
    addSpec("Fuel Economy", "Combined MPG", rep.comb, "MPG", rangeNote(configs.map((c) => c.comb), "MPG"));
    addSpec("Fuel Economy", "City MPG", rep.city, "MPG", null);
    addSpec("Fuel Economy", "Highway MPG", rep.hwy, "MPG", null);
  }

  addSpec("Engine", "Displacement", rep.displ, "L", null);
  addSpec("Engine", "Cylinders", rep.cylinders, null, null);
  addSpec("Engine", "Fuel Type", rep.fuel1, null, null);
  if (rep.feScore > 0) addSpec("Engine", "EPA Fuel Economy Score", rep.feScore, "1-10", null);
  if (rep.ghgScore > 0) addSpec("Engine", "EPA Greenhouse Gas Score", rep.ghgScore, "1-10", null);
}

console.log(`Derived ${vehicles.length} vehicles, ${enginesByKey.size} engines, ${specs.length} specifications`);
if (skippedSlugs.length) console.log(`Skipped ${skippedSlugs.length} slug collisions (kept first):`, skippedSlugs.slice(0, 10));

if (DRY_RUN) {
  console.log("Dry run — no writes.");
  console.log("sample vehicles:", JSON.stringify(vehicles.slice(0, 2), null, 2));
  process.exit(0);
}

// ---------------------------------------------------------------- write -----
async function main() {
  // Safety gate: only seed an empty catalog (or re-run with --force).
  const existing = await countRows("vehicles");
  if (existing > 0 && !process.argv.includes("--force")) {
    console.error(`vehicles table already has ${existing} rows. Re-run with --force to upsert.`);
    process.exit(1);
  }

  console.log("Writing data_sources …");
  await rest(
    "POST",
    "data_sources?on_conflict=source_name",
    [{
      id: SOURCE_ID,
      source_name: "EPA FuelEconomy.gov",
      source_url: "https://www.fueleconomy.gov",
      source_type: "official_government",
      license: "US government work (public domain)",
      attribution_required: true,
      terms_url: "https://www.fueleconomy.gov/feg/",
      last_checked_at: new Date().toISOString(),
      enabled: true,
    }],
    { Prefer: "resolution=merge-duplicates,return=minimal" },
  );

  const chunk = (arr, n) => {
    const out = [];
    for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
    return out;
  };

  const engines = [...enginesByKey.values()];
  console.log(`Writing ${engines.length} engines …`);
  for (const part of chunk(engines, 500)) {
    try {
      await rest(
        "POST",
        "engines?on_conflict=manufacturer,engine_code,displacement,cylinders,aspiration,fuel_type",
        part,
        { Prefer: "resolution=merge-duplicates,return=minimal" },
      );
    } catch (err) {
      // First run: table is empty, plain insert always works.
      console.warn(`  engine upsert failed (${err.message.slice(0, 120)}), falling back to plain insert`);
      await rest("POST", "engines", part, { Prefer: "return=minimal" });
    }
  }

  const vehicleChunks = chunk(vehicles, 500);
  console.log(`Writing ${vehicles.length} vehicles in ${vehicleChunks.length} batches …`);
  for (const [i, part] of vehicleChunks.entries()) {
    await rest(
      "POST",
      "vehicles?on_conflict=slug",
      part,
      { Prefer: "resolution=merge-duplicates,return=minimal" },
    );
    if ((i + 1) % 10 === 0 || i === vehicleChunks.length - 1) console.log(`  vehicles ${i + 1}/${vehicleChunks.length}`);
  }

  const specChunks = chunk(specs, 500);
  console.log(`Writing ${specs.length} specifications in ${specChunks.length} batches …`);
  for (const [i, part] of specChunks.entries()) {
    await rest(
      "POST",
      "vehicle_specifications?on_conflict=vehicle_id,specification_category,specification_name,market,source_id",
      part,
      { Prefer: "resolution=merge-duplicates,return=minimal" },
    );
    if ((i + 1) % 20 === 0 || i === specChunks.length - 1) console.log(`  specs ${i + 1}/${specChunks.length}`);
  }

  console.log("Writing data_import_logs …");
  await rest("POST", "data_import_logs", [{
    source_id: SOURCE_ID,
    import_started_at: new Date().toISOString(),
    import_completed_at: new Date().toISOString(),
    records_imported: vehicles.length,
    records_updated: 0,
    records_failed: skippedSlugs.length,
    status: "completed",
    error_details: skippedSlugs.length ? `${skippedSlugs.length} slug collisions skipped` : null,
  }]);

  console.log("Done.");
}

main().catch((err) => {
  console.error("SEED FAILED:", err.message);
  process.exit(1);
});
