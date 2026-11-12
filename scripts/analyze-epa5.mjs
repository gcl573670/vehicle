// Inspect duplicate config names within a vehicle group
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

const groups = new Map();
for (let i = 1; i < rows.length; i++) {
  const r = rows[i];
  const year = +r[idx.year];
  const make = r[idx.make];
  const base = (r[idx.baseModel] || r[idx.model]).trim();
  const key = `${year}|${make}|${base}`;
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push({
    id: +r[idx.id], model: r[idx.model], drive: r[idx.drive], trany: r[idx.trany],
    displ: r[idx.displ], cyl: r[idx.cylinders], comb: +r[idx.comb08],
    city: +r[idx.city08], hwy: +r[idx.highway08], engId: r[idx.engId],
    fuel: r[idx.fuelType1], atv: r[idx.atvType],
  });
}

// exact full duplicates within group?
let exactDupes = 0, nameDupesDiffValues = 0, nameDupesSameValues = 0;
const examples = [];
for (const [key, cfgs] of groups) {
  const seen = new Map();
  for (const c of cfgs) {
    const tuple = `${c.model}|${c.drive}|${c.trany}|${c.displ}|${c.cyl}|${c.comb}|${c.city}|${c.hwy}|${c.engId}`;
    const nameTuple = `${c.model}|${c.comb}|${c.city}|${c.hwy}`;
    if (seen.has(tuple)) { exactDupes++; continue; }
    if (seen.has(nameTuple)) {
      nameDupesSameValues++;
    } else if ([...seen.keys()].some((k) => k.split("|")[0] === c.model)) {
      nameDupesDiffValues++;
      if (examples.length < 8) examples.push({ key, cfg: c });
    }
    seen.set(tuple, c);
    seen.set(nameTuple, c);
  }
}
console.log("exact full dup configs:", exactDupes);
console.log("same name + same MPG (dupe):", nameDupesSameValues);
console.log("same name + DIFFERENT MPG:", nameDupesDiffValues);
for (const e of examples) console.log("  example:", JSON.stringify(e));

// how many vehicles after exact-dedupe? and after name-dedupe?
let vExact = 0, vName = 0, cfgExact = 0;
for (const [, cfgs] of groups) {
  const t = new Set(), n = new Set();
  for (const c of cfgs) {
    t.add(`${c.model}|${c.drive}|${c.trany}|${c.displ}|${c.cyl}|${c.comb}|${c.city}|${c.hwy}|${c.engId}`);
    n.add(`${c.model}|${c.comb}|${c.city}|${c.hwy}`);
  }
  cfgExact += t.size; vExact++; vName += n.size;
}
console.log("vehicles:", vExact, "| configs after exact dedupe:", cfgExact, "| after name+MPG dedupe:", vName);
