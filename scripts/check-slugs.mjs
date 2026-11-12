// One-off: report seeded makes/models whose characters would break URL slugs.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const envText = fs.readFileSync(path.join(ROOT, ".env"), "utf8");
const key = envText.match(/^SUPABASE_SERVICE_ROLE_KEY=(.*)$/m)[1].trim();
const url = envText.match(/^SUPABASE_URL=(.*)$/m)[1].trim();

async function q(params) {
  const res = await fetch(`${url}/rest/v1/vehicles?${params}`, {
    headers: { apikey: key, authorization: `Bearer ${key}` },
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json();
}

// PostgREST caps rows at 1000 per request, so page through everything.
const rows = [];
const pageSize = 1000;
for (let offset = 0; ; offset += pageSize) {
  const batch = await q(`select=make,model,slug,year&limit=${pageSize}&offset=${offset}`);
  rows.push(...batch);
  if (batch.length < pageSize) break;
}
const makes = [...new Set(rows.map((r) => r.make))];
const models = [...new Set(rows.map((r) => r.model))];

const weirdMakes = makes.filter((m) => !/^[A-Za-z0-9 ]+$/.test(m));
const weirdModels = models.filter((m) => !/^[A-Za-z0-9 \-' ]+$/.test(m));
const slugsBad = rows.filter((r) => !/^[a-z0-9]+(-[a-z0-9]+)*-\d{4}$/.test(r.slug));

console.log("rows:", rows.length, "| makes:", makes.length, "| models:", models.length);
console.log("weird makes:", JSON.stringify(weirdMakes));
console.log("weird models (" + weirdModels.length + "):", JSON.stringify(weirdModels.slice(0, 60)));
console.log("slugs not matching [a-z0-9-]+year (" + slugsBad.length + "):", JSON.stringify(slugsBad.slice(0, 20).map((r) => r.slug)));
