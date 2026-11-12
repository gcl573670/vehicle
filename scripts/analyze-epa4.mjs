// Check distinct drive/trany/vclass values + config-model uniqueness within groups
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

const drive = new Map(), trany = new Map();
const groups = new Map();
let dupCfgNames = 0;

for (let i = 1; i < rows.length; i++) {
  const r = rows[i];
  drive.set(r[idx.drive] || "(empty)", (drive.get(r[idx.drive] || "(empty)") || 0) + 1);
  trany.set(r[idx.trany] || "(empty)", (trany.get(r[idx.trany] || "(empty)") || 0) + 1);
  const year = +r[idx.year];
  const make = r[idx.make];
  const base = (r[idx.baseModel] || r[idx.model]).trim();
  const key = `${year}|${make}|${base}`;
  if (!groups.has(key)) groups.set(key, new Map());
  const cfgMap = groups.get(key);
  const cfgName = r[idx.model];
  if (cfgMap.has(cfgName)) dupCfgNames++;
  cfgMap.set(cfgName, true);
}

console.log("drive values:", JSON.stringify([...drive.entries()].sort((a, b) => b[1] - a[1]).slice(0, 25)));
console.log("trany values (top 25):", JSON.stringify([...trany.entries()].sort((a, b) => b[1] - a[1]).slice(0, 25)));
console.log("duplicate config model names within same vehicle group:", dupCfgNames);

// displacement/cylinders empties
let noDispl = 0, noCyl = 0, noTrany = 0, noDrive = 0;
for (let i = 1; i < rows.length; i++) {
  const r = rows[i];
  if (!r[idx.displ]) noDispl++;
  if (!r[idx.cylinders]) noCyl++;
  if (!r[idx.trany]) noTrany++;
  if (!r[idx.drive]) noDrive++;
}
console.log("empty: displ=", noDispl, "cyl=", noCyl, "trany=", noTrany, "drive=", noDrive, "of", rows.length - 1);

// makes with case variants (MINI vs Mini etc.)
const makes = new Set();
for (let i = 1; i < rows.length; i++) makes.add(rows[i][idx.make]);
const byLower = new Map();
for (const m of makes) { const l = m.toLowerCase(); if (!byLower.has(l)) byLower.set(l, []); byLower.get(l).push(m); }
console.log("case-variant makes:", JSON.stringify([...byLower.values()].filter((v) => v.length > 1)));
