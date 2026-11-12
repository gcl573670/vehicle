// Check PHEV/EV MPG semantics + full-year counts
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

// full-history unique counts
const all = new Map();
for (let i = 1; i < rows.length; i++) {
  const r = rows[i];
  const year = +r[idx.year];
  const make = r[idx.make];
  const base = (r[idx.baseModel] || r[idx.model]).trim();
  const slug = `${make.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}-${base.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}-${year}`;
  if (!all.has(slug)) all.set(slug, 0);
  all.set(slug, all.get(slug) + 1);
}
const yearDist = {};
for (const k of all.keys()) { const y = k.split("-").pop(); yearDist[y] = (yearDist[y] || 0) + 1; }
console.log("ALL YEARS unique slugs:", all.size, "| configs:", rows.length - 1);
console.log("year dist:", JSON.stringify(yearDist));

// slug collisions full history
let collisions = 0;
const seen = new Map();
for (let i = 1; i < rows.length; i++) {
  const r = rows[i];
  const year = +r[idx.year];
  const make = r[idx.make];
  const base = (r[idx.baseModel] || r[idx.model]).trim();
  const t = (s) => s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const slug = `${t(make)}-${t(base)}-${year}`;
  const raw = `${make}|${base}`;
  if (seen.has(slug) && seen.get(slug) !== raw) {
    collisions++;
    if (collisions <= 15) console.log("COLLISION:", slug, "||", seen.get(slug), "vs", raw);
  } else seen.set(slug, raw);
}
console.log("full-history slug collisions:", collisions);

// PHEV check: Prius Prime
for (let i = 1; i < rows.length; i++) {
  const r = rows[i];
  if (r[idx.model].includes("Prime") && +r[idx.year] === 2024) {
    console.log("PHEV row:", JSON.stringify({
      model: r[idx.model], atv: r[idx.atvType], fuel1: r[idx.fuelType1], fuel2: r[idx.fuelType2],
      comb08: r[idx.comb08], combA08: r[idx.combA08], combE: r[idx.combE], combCD: r[idx.combCD],
      cityCD: r[idx.cityCD], range: r[idx.range], rangeA: r[idx.rangeA], phevComb: r[idx.phevComb],
      feScore: r[idx.feScore], ghgScore: r[idx.ghgScore], fuelCost08: r[idx.fuelCost08],
      youSaveSpend: r[idx.youSaveSpend], co2TailpipeGpm: r[idx.co2TailpipeGpm],
    }));
  }
}
// EV check: Model 3 2024
for (let i = 1; i < rows.length; i++) {
  const r = rows[i];
  if (r[idx.model] === "Model 3 RWD" && +r[idx.year] === 2024) {
    console.log("EV row:", JSON.stringify({
      model: r[idx.model], comb08: r[idx.comb08], combE: r[idx.combE], range: r[idx.range],
      fuelCost08: r[idx.fuelCost08], feScore: r[idx.feScore], ghgScore: r[idx.ghgScore],
      co2TailpipeGpm: r[idx.co2TailpipeGpm], youSaveSpend: r[idx.youSaveSpend],
    }));
  }
}
// feScore/ghgScore/fuelCost ranges (non -1)
let fe = new Set(), ghg = new Set(), fc = 0, fcN = 0;
for (let i = 1; i < rows.length; i++) {
  const r = rows[i];
  fe.add(r[idx.feScore]); ghg.add(r[idx.ghgScore]);
  const v = +r[idx.fuelCost08]; if (v > 0) { fc += v; fcN++; }
}
console.log("feScore values:", [...fe].join(","), "| ghgScore:", [...ghg].join(","), "| avg fuelCost08:", (fc / fcN).toFixed(0));
