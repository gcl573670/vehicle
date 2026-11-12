// Verifies the requestJson/menuItems fix against the live FuelEconomy.gov API.
// Mirrors src/lib/autospec.functions.ts (requestJson + menuItems).
const FUEL_ECONOMY_SOURCE = "https://www.fueleconomy.gov/ws/rest";

function asRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value : {};
}

async function requestJson(url) {
  let lastStatus = 0;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const response = await fetch(url, {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(12_000),
    });
    if (response.ok) return await response.json();
    lastStatus = response.status;
    if (attempt === 0 && (response.status === 429 || response.status >= 500)) {
      await new Promise((r) => setTimeout(r, 250));
      continue;
    }
    break;
  }
  throw new Error(`Provider request failed (${lastStatus || "network error"})`);
}

function menuItems(payload) {
  const root = asRecord(payload);
  const raw = root["menuItem"] ?? asRecord(root["menuItemList"])["menuItem"];
  const items = Array.isArray(raw) ? raw : raw == null ? [] : [raw];
  return items
    .map((item) => {
      const row = asRecord(item);
      const id = typeof row["value"] === "string" || typeof row["value"] === "number" ? String(row["value"]).trim() : "";
      const name = typeof row["text"] === "string" || typeof row["text"] === "number" ? String(row["text"]).trim() : "";
      return { id, name };
    })
    .filter((item) => item.id.length > 0 && item.name.length > 0);
}

const cases = [
  ["makes 2024", `${FUEL_ECONOMY_SOURCE}/vehicle/menu/make?year=2024&format=json`],
  ["models 2024 Toyota", `${FUEL_ECONOMY_SOURCE}/vehicle/menu/model?year=2024&make=Toyota&format=json`],
  ["options 2024 Toyota Camry", `${FUEL_ECONOMY_SOURCE}/vehicle/menu/options?year=2024&make=Toyota&model=Camry&format=json`],
];

for (const [label, href] of cases) {
  try {
    const items = menuItems(await requestJson(new URL(href)));
    console.log(`${label}: ${items.length} items | first: ${JSON.stringify(items.slice(0, 3))}`);
    if (items.length === 0) throw new Error("no items parsed");
  } catch (err) {
    console.log(`${label}: FAILED - ${err.message}`);
    process.exitCode = 1;
  }
}

// Legacy wrapper shape must still parse.
const legacy = menuItems({ menuItemList: { menuItem: [{ text: "Ford", value: "Ford" }] } });
console.log(`legacy wrapper: ${JSON.stringify(legacy)}`);
if (legacy.length !== 1) { console.log("FAILED legacy shape"); process.exitCode = 1; }
