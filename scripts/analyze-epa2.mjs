// Check baseModel grouping + URL safety (follow-up analysis)
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const csvPath = path.join(os.tmpdir(), "opencode", "vehicles.csv");
const text = fs.readFileSync(csvPath, "utf8");

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

const rows = parseCSV(text);
const header = rows[0];
const idx = Object.fromEntries(header.map((h, i) => [h, i]));
const YEARS = [2020, 2021, 2022, 2023, 2024, 2025];

const groups = new Map();
let emptyBase = 0;
const oddBase = new Set();
let total = 0;

for (let i = 1; i < rows.length; i++) {
  const r = rows[i];
  const year = +r[idx.year];
  if (!YEARS.includes(year)) continue;
  total++;
  const make = r[idx.make];
  let base = (r[idx.baseModel] || "").trim();
  if (!base) { base = r[idx.model]; emptyBase++; }
  for (const ch of base) if (!/[A-Za-z0-9 \-'.&+]/.test(ch)) oddBase.add(`${ch} in "${base}"`);
  const key = `${year}|${make}|${base}`;
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push({
    id: +r[idx.id], model: r[idx.model],
    comb: +r[idx.comb08], city: +r[idx.city08], hwy: +r[idx.highway08],
    atv: r[idx.atvType], fuel: r[idx.fuelType1], drive: r[idx.drive],
    trany: r[idx.trany], displ: r[idx.displ], cyl: r[idx.cylinders],
    vclass: r[idx.VClass], range: +r[idx.range], rangeA: +r[idx.rangeA],
    phev: r[idx.phevBlended],
  });
}

console.log("configs:", total, "| empty baseModel:", emptyBase, "| unique (year, make, baseModel):", groups.size);
console.log("odd chars in baseModel:", oddBase.size ? [...oddBase] : "none");

const perYear = {};
for (const k of groups.keys()) { const y = k.split("|")[0]; perYear[y] = (perYear[y] || 0) + 1; }
console.log("per year:", JSON.stringify(perYear));

// config count distribution
const dist = {};
for (const v of groups.values()) dist[v.length] = (dist[v.length] || 0) + 1;
console.log("configs-per-model dist:", JSON.stringify(dist));

// slug collisions with link transform on make + baseModel
const t = (s) => s.toLowerCase().replace(/\s+/g, "-");
const slugs = new Map();
let col = 0;
for (const k of groups.keys()) {
  const [y, make, base] = k.split("|");
  const slug = `${t(make)}-${t(base)}-${y}`;
  if (slugs.has(slug)) { col++; console.log("COLLISION:", slug); }
  slugs.set(slug, k);
}
console.log("slug collisions:", col);

// URL-risky baseModels
for (const k of groups.keys()) {
  const [, make, base] = k.split("|");
  if (/[\/?#&]/.test(make + " " + base)) console.log("URL-risky:", k);
}

// sanity samples
for (const key of ["2024|Toyota|Camry", "2024|Tesla|Model 3", "2025|Toyota|Camry"]) {
  const g = groups.get(key);
  console.log(key, "->", g ? `${g.length} configs: ${g.map((c) => `${c.model}(${c.comb}mpg,${c.fuel},${c.drive})`).join(" ; ")}` : "MISSING");
}

// EV range sanity
let evs = 0, evWithRange = 0;
for (const g of groups.values()) for (const c of g) if (c.fuel === "Electricity") { evs++; if (c.range > 0) evWithRange++; }
console.log("EV configs:", evs, "| with range>0:", evWithRange);

// vclass values
const vc = new Map();
for (const g of groups.values()) for (const c of g) vc.set(c.vclass || "(empty)", (vc.get(c.vclass || "(empty)") || 0) + 1);
console.log("VClass:", JSON.stringify([...vc.entries()].sort((a, b) => b[1] - a[1])));
