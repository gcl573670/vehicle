// One-off analysis of the EPA vehicles.csv export (not part of the app build).
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
      if (c === '"') {
        if (s[i + 1] === '"') { field += '"'; i++; } else q = false;
      } else field += c;
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
console.log("columns:", header.length, "| data rows:", rows.length - 1);

const YEARS = [2020, 2021, 2022, 2023, 2024, 2025];
const groups = new Map();
const oddChars = new Set();
const atvTypes = new Map();
const fuels = new Map();
let cfgCount = 0;

for (let i = 1; i < rows.length; i++) {
  const r = rows[i];
  const year = +r[idx.year];
  if (!YEARS.includes(year)) continue;
  cfgCount++;
  const make = r[idx.make], model = r[idx.model];
  for (const s of [make, model]) {
    for (const ch of s) if (!/[A-Za-z0-9 \-'.]/.test(ch)) oddChars.add(`${ch} in "${s}"`);
  }
  const key = `${year}|${make}|${model}`;
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push({
    id: +r[idx.id],
    comb: +r[idx.comb08],
    city: +r[idx.city08],
    hwy: +r[idx.highway08],
    atv: r[idx.atvType],
    fuel: r[idx.fuelType1],
    drive: r[idx.drive],
    trany: r[idx.trany],
    displ: r[idx.displ],
    cyl: r[idx.cylinders],
    vclass: r[idx.VClass],
  });
  atvTypes.set(r[idx.atvType] || "(empty)", (atvTypes.get(r[idx.atvType] || "(empty)") || 0) + 1);
  fuels.set(r[idx.fuelType1], (fuels.get(r[idx.fuelType1]) || 0) + 1);
}

console.log("configs in years:", cfgCount, "| unique year/make/model:", groups.size);
const perYear = {};
for (const k of groups.keys()) { const y = k.split("|")[0]; perYear[y] = (perYear[y] || 0) + 1; }
console.log("per year:", JSON.stringify(perYear));
console.log("odd chars in make/model:", oddChars.size ? [...oddChars] : "none");
console.log("atvType values:", JSON.stringify([...atvTypes.entries()].sort((a, b) => b[1] - a[1])));
console.log("fuelType1 values:", JSON.stringify([...fuels.entries()].sort((a, b) => b[1] - a[1])));

// slug collision check using the exact transform the vehicles list Link uses
const linkTransform = (s) => s.toLowerCase().replace(/\s+/g, "-");
const slugs = new Map();
let collisions = 0;
for (const k of groups.keys()) {
  const [y, make, model] = k.split("|");
  const slug = `${linkTransform(make)}-${linkTransform(model)}-${y}`;
  if (slugs.has(slug) && slugs.get(slug) !== k) { collisions++; console.log("COLLISION:", slug, "<=", slugs.get(slug), "<=", k); }
  slugs.set(slug, k);
}
console.log("slug collisions:", collisions);

// slash/apostrophe models that could break URL segments
for (const k of groups.keys()) {
  const [, make, model] = k.split("|");
  if (/[\/?#&]/.test(make + model)) console.log("URL-risky name:", k);
}

// sample: 2024 Toyota Camry configs
const camry = groups.get("2024|Toyota|Camry");
console.log("2024 Toyota Camry configs:", camry ? camry.length : 0, JSON.stringify(camry?.slice(0, 3)));
