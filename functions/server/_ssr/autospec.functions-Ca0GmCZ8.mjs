import { a as TSS_SERVER_FUNCTION, l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { n as objectType, r as stringType, t as numberType } from "../_libs/zod.mjs";
import { t as supabase } from "./client-9Lv_B3m8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/autospec.functions-Ca0GmCZ8.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var VIN_SOURCE = "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended";
var RECALL_SOURCE = "https://api.nhtsa.gov/recalls/recallsByVehicle";
var FUEL_ECONOMY_SOURCE = "https://www.fueleconomy.gov/ws/rest";
async function requestJson(url) {
	let lastStatus = 0;
	for (let attempt = 0; attempt < 2; attempt += 1) {
		const response = await fetch(url, { signal: AbortSignal.timeout(12e3) });
		if (response.ok) return await response.json();
		lastStatus = response.status;
		if (attempt === 0 && (response.status === 429 || response.status >= 500)) {
			await new Promise((resolve) => setTimeout(resolve, 250));
			continue;
		}
		break;
	}
	throw new Error(`Provider request failed (${lastStatus || "network error"})`);
}
function asRecord(value) {
	if (typeof value === "object" && value !== null && !Array.isArray(value)) return value;
	return {};
}
function asText(value) {
	return typeof value === "string" || typeof value === "number" ? String(value).trim() : "";
}
function pickText(record, keys) {
	for (const key of keys) {
		const text = asText(record[key]);
		if (text && text !== "0" && text.toLowerCase() !== "not applicable") return text;
	}
	return "";
}
function menuItems(payload) {
	const raw = asRecord(asRecord(payload)["menuItemList"])["menuItem"];
	return (Array.isArray(raw) ? raw : raw == null ? [] : [raw]).map((item) => {
		const row = asRecord(item);
		return {
			id: asText(row["value"]),
			name: asText(row["text"])
		};
	}).filter((item) => item.id.length > 0 && item.name.length > 0);
}
var getFuelEconomyMakes_createServerFn_handler = createServerRpc({
	id: "ee70af4c2256ffde32b50b167125afe236a74c574049694f9510b5c3ecd5a4d9",
	name: "getFuelEconomyMakes",
	filename: "src/lib/autospec.functions.ts"
}, (opts) => getFuelEconomyMakes.__executeServer(opts));
var getFuelEconomyMakes = createServerFn({ method: "GET" }).inputValidator((input) => objectType({ year: numberType().int().min(1984).max(2100) }).parse(input)).handler(getFuelEconomyMakes_createServerFn_handler, async ({ data }) => {
	const url = new URL(`${FUEL_ECONOMY_SOURCE}/vehicle/menu/make`);
	url.searchParams.set("year", String(data.year));
	url.searchParams.set("format", "json");
	try {
		return {
			data: menuItems(await requestJson(url)),
			error: null
		};
	} catch {
		return {
			data: null,
			error: "Fuel-economy makes are temporarily unavailable. Try again shortly."
		};
	}
});
var getFuelEconomyModels_createServerFn_handler = createServerRpc({
	id: "f2ab1c1ea8b9fedd0d1d0be87ad02ae07d7ad890a2c7027f8b2d344aaa84f44d",
	name: "getFuelEconomyModels",
	filename: "src/lib/autospec.functions.ts"
}, (opts) => getFuelEconomyModels.__executeServer(opts));
var getFuelEconomyModels = createServerFn({ method: "GET" }).inputValidator((input) => objectType({
	year: numberType().int().min(1984).max(2100),
	make: stringType().trim().min(1).max(100)
}).parse(input)).handler(getFuelEconomyModels_createServerFn_handler, async ({ data }) => {
	const url = new URL(`${FUEL_ECONOMY_SOURCE}/vehicle/menu/model`);
	url.searchParams.set("year", String(data.year));
	url.searchParams.set("make", data.make);
	url.searchParams.set("format", "json");
	try {
		return {
			data: menuItems(await requestJson(url)),
			error: null
		};
	} catch {
		return {
			data: null,
			error: "Fuel-economy models are temporarily unavailable. Try again shortly."
		};
	}
});
var getFuelEconomyOptions_createServerFn_handler = createServerRpc({
	id: "766d5987fa0d471cea226c97cc7b5567c37460c810f3c23e14b7084915b3f7e3",
	name: "getFuelEconomyOptions",
	filename: "src/lib/autospec.functions.ts"
}, (opts) => getFuelEconomyOptions.__executeServer(opts));
var getFuelEconomyOptions = createServerFn({ method: "GET" }).inputValidator((input) => objectType({
	year: numberType().int().min(1984).max(2100),
	make: stringType().trim().min(1).max(100),
	model: stringType().trim().min(1).max(120)
}).parse(input)).handler(getFuelEconomyOptions_createServerFn_handler, async ({ data }) => {
	const url = new URL(`${FUEL_ECONOMY_SOURCE}/vehicle/menu/options`);
	url.searchParams.set("year", String(data.year));
	url.searchParams.set("make", data.make);
	url.searchParams.set("model", data.model);
	url.searchParams.set("format", "json");
	try {
		return {
			data: menuItems(await requestJson(url)),
			error: null
		};
	} catch {
		return {
			data: null,
			error: "Fuel-economy configurations are temporarily unavailable. Try again shortly."
		};
	}
});
var getFuelEconomyVehicle_createServerFn_handler = createServerRpc({
	id: "a177709f3cfb1849a076ccf3090870d45c33385d7fe8607c7d62580945c7ae69",
	name: "getFuelEconomyVehicle",
	filename: "src/lib/autospec.functions.ts"
}, (opts) => getFuelEconomyVehicle.__executeServer(opts));
var getFuelEconomyVehicle = createServerFn({ method: "GET" }).inputValidator((input) => objectType({ id: numberType().int().positive().max(1e6) }).parse(input)).handler(getFuelEconomyVehicle_createServerFn_handler, async ({ data }) => {
	const url = new URL(`${FUEL_ECONOMY_SOURCE}/vehicle/${data.id}`);
	url.searchParams.set("format", "json");
	try {
		const result = asRecord(await requestJson(url));
		const asNumber = (value) => {
			const number = Number(value);
			return Number.isFinite(number) && number > 0 ? number : null;
		};
		return {
			data: {
				id: Number(result["id"]) || data.id,
				description: pickText(result, [
					"year",
					"make",
					"model",
					"eng_dscr",
					"trany"
				]),
				cityMpg: asNumber(result["city08"]),
				highwayMpg: asNumber(result["highway08"]),
				combinedMpg: asNumber(result["comb08"]),
				fuelType: pickText(result, ["fuelType1"]),
				fuelTypeSecondary: pickText(result, ["fuelType2"]),
				drive: pickText(result, ["drive"]),
				cylinders: pickText(result, ["cylinders"]),
				displacement: pickText(result, ["displ"]),
				annualFuelCost: asNumber(result["fuelCost08"]),
				tailpipeCo2: asNumber(result["co2TailpipeGpm"])
			},
			error: null
		};
	} catch {
		return {
			data: null,
			error: "This configuration's EPA data is temporarily unavailable."
		};
	}
});
var getEpaFuelPrices_createServerFn_handler = createServerRpc({
	id: "929258b48e910d3b917b3f21962db5964831a093253f63b763261c62e388f5b8",
	name: "getEpaFuelPrices",
	filename: "src/lib/autospec.functions.ts"
}, (opts) => getEpaFuelPrices.__executeServer(opts));
var getEpaFuelPrices = createServerFn({ method: "GET" }).handler(getEpaFuelPrices_createServerFn_handler, async () => {
	const url = new URL(`${FUEL_ECONOMY_SOURCE}/fuelprices`);
	url.searchParams.set("format", "json");
	try {
		const prices = asRecord(await requestJson(url));
		const data = {};
		for (const [fuel, amount] of Object.entries(prices)) {
			const price = Number(amount);
			if (Number.isFinite(price) && price > 0) data[fuel.toLowerCase()] = price;
		}
		return {
			data,
			error: null
		};
	} catch {
		return {
			data: null,
			error: "Current U.S. reference fuel prices are unavailable. Enter a price to continue."
		};
	}
});
var decodeVin_createServerFn_handler = createServerRpc({
	id: "acb6e23ad4ca57303e82679db57d7003cf0f44c188a019c0a491a6deae598a71",
	name: "decodeVin",
	filename: "src/lib/autospec.functions.ts"
}, (opts) => decodeVin.__executeServer(opts));
var decodeVin = createServerFn({ method: "POST" }).inputValidator((input) => objectType({ vin: stringType().trim().toUpperCase().regex(/^[A-HJ-NPR-Z0-9]{17}$/) }).parse(input)).handler(decodeVin_createServerFn_handler, async ({ data }) => {
	const url = new URL(`${VIN_SOURCE}/${encodeURIComponent(data.vin)}`);
	url.searchParams.set("format", "json");
	try {
		const root = asRecord(await requestJson(url));
		const result = asRecord((Array.isArray(root["Results"]) ? root["Results"] : [])[0]);
		const vehicle = {
			vin: data.vin,
			year: pickText(result, ["ModelYear"]),
			make: pickText(result, ["Make"]),
			model: pickText(result, ["Model"]),
			trim: pickText(result, ["Trim"]),
			series: pickText(result, ["Series", "Series2"]),
			bodyClass: pickText(result, ["BodyClass"]),
			vehicleType: pickText(result, ["VehicleType"]),
			engineCylinders: pickText(result, ["EngineCylinders"]),
			displacement: pickText(result, ["DisplacementL"]),
			fuelType: pickText(result, ["FuelTypePrimary"]),
			driveType: pickText(result, ["DriveType"]),
			transmission: pickText(result, ["TransmissionStyle"]),
			manufacturer: pickText(result, ["Manufacturer"]),
			plantCountry: pickText(result, ["PlantCountry"]),
			sourceUrl: "https://vpic.nhtsa.dot.gov/"
		};
		if (!vehicle.year && !vehicle.make && !vehicle.model) return {
			data: null,
			error: "NHTSA could not identify this VIN. Check the characters and try again."
		};
		return {
			data: vehicle,
			error: null
		};
	} catch {
		return {
			data: null,
			error: "NHTSA VIN decoding is temporarily unavailable. Your VIN was not saved."
		};
	}
});
var getVehicleRecalls_createServerFn_handler = createServerRpc({
	id: "c029d602bc464986cbeb997e29972dd7eb9d4b471f34cea7ca6f8b1b39eaea85",
	name: "getVehicleRecalls",
	filename: "src/lib/autospec.functions.ts"
}, (opts) => getVehicleRecalls.__executeServer(opts));
var getVehicleRecalls = createServerFn({ method: "GET" }).inputValidator((input) => objectType({
	year: numberType().int().min(1981).max(2100),
	make: stringType().trim().min(1).max(100),
	model: stringType().trim().min(1).max(120)
}).parse(input)).handler(getVehicleRecalls_createServerFn_handler, async ({ data }) => {
	const url = new URL(RECALL_SOURCE);
	url.searchParams.set("make", data.make);
	url.searchParams.set("model", data.model);
	url.searchParams.set("modelYear", String(data.year));
	try {
		const root = asRecord(await requestJson(url));
		return {
			data: (Array.isArray(root["results"]) ? root["results"] : []).map((item) => {
				const result = asRecord(item);
				return {
					campaignNumber: pickText(result, ["NHTSACampaignNumber", "nhtsaCampaignNumber"]),
					component: pickText(result, ["Component", "component"]),
					summary: pickText(result, ["Summary", "summary"]),
					consequence: pickText(result, [
						"Conequence",
						"Consequence",
						"consequence"
					]),
					remedy: pickText(result, ["Remedy", "remedy"]),
					reportDate: pickText(result, ["ReportReceivedDate", "reportReceivedDate"]),
					sourceUrl: "https://www.nhtsa.gov/recalls"
				};
			}),
			error: null
		};
	} catch {
		return {
			data: null,
			error: "NHTSA recall records are temporarily unavailable. Try again shortly."
		};
	}
});
var getVehicleMakes_createServerFn_handler = createServerRpc({
	id: "83bff1df512d3f5c860e6810636c3203c7b32e6c0ae23bd9df56434956fb7610",
	name: "getVehicleMakes",
	filename: "src/lib/autospec.functions.ts"
}, (opts) => getVehicleMakes.__executeServer(opts));
var getVehicleMakes = createServerFn({ method: "GET" }).inputValidator((input) => objectType({
	year: numberType().int().min(1984).max(2100).optional(),
	market: stringType().min(1).max(10).optional()
}).parse(input)).handler(getVehicleMakes_createServerFn_handler, async ({ data }) => {
	try {
		let query = supabase.from("vehicles").select("make").order("make", { ascending: true });
		if (data.year) query = query.eq("year", data.year);
		if (data.market) query = query.eq("market", data.market);
		const { data: rows, error } = await query;
		if (error) throw error;
		return {
			data: Array.from(new Set((rows ?? []).map((r) => r.make))).sort(),
			error: null
		};
	} catch {
		return {
			data: null,
			error: "Unable to load vehicle makes at this time."
		};
	}
});
var getVehicleModels_createServerFn_handler = createServerRpc({
	id: "95d57b7a678f83831a229bc17aa36941bc529fb772ff4887070e31590a9b7d8d",
	name: "getVehicleModels",
	filename: "src/lib/autospec.functions.ts"
}, (opts) => getVehicleModels.__executeServer(opts));
var getVehicleModels = createServerFn({ method: "GET" }).inputValidator((input) => objectType({
	year: numberType().int().min(1984).max(2100),
	make: stringType().trim().min(1).max(100),
	market: stringType().min(1).max(10).optional()
}).parse(input)).handler(getVehicleModels_createServerFn_handler, async ({ data }) => {
	try {
		let query = supabase.from("vehicles").select("model").eq("year", data.year).eq("make", data.make).order("model", { ascending: true });
		if (data.market) query = query.eq("market", data.market);
		const { data: rows, error } = await query;
		if (error) throw error;
		return {
			data: Array.from(new Set((rows ?? []).map((r) => r.model))).sort(),
			error: null
		};
	} catch {
		return {
			data: null,
			error: "Unable to load vehicle models at this time."
		};
	}
});
var getVehicleTrims_createServerFn_handler = createServerRpc({
	id: "a91d70ddfc55ec3d7b5446d754b61d6ce3fe538640e766f370de32df8ec234cd",
	name: "getVehicleTrims",
	filename: "src/lib/autospec.functions.ts"
}, (opts) => getVehicleTrims.__executeServer(opts));
var getVehicleTrims = createServerFn({ method: "GET" }).inputValidator((input) => objectType({
	year: numberType().int().min(1984).max(2100),
	make: stringType().trim().min(1).max(100),
	model: stringType().trim().min(1).max(120),
	market: stringType().min(1).max(10).optional()
}).parse(input)).handler(getVehicleTrims_createServerFn_handler, async ({ data }) => {
	try {
		let query = supabase.from("vehicles").select("trim").eq("year", data.year).eq("make", data.make).eq("model", data.model).not("trim", "is", null).order("trim", { ascending: true });
		if (data.market) query = query.eq("market", data.market);
		const { data: rows, error } = await query;
		if (error) throw error;
		return {
			data: Array.from(new Set((rows ?? []).map((r) => r.trim).filter(Boolean))).sort(),
			error: null
		};
	} catch {
		return {
			data: null,
			error: "Unable to load vehicle trims at this time."
		};
	}
});
var getVehicleEngines_createServerFn_handler = createServerRpc({
	id: "54114e6b72f2abe77009c3c601e1bd40bd2d2828450592d96afdc11b6a933ac6",
	name: "getVehicleEngines",
	filename: "src/lib/autospec.functions.ts"
}, (opts) => getVehicleEngines.__executeServer(opts));
var getVehicleEngines = createServerFn({ method: "GET" }).handler(getVehicleEngines_createServerFn_handler, async () => {
	try {
		const { data: rows, error } = await supabase.from("engines").select("id, engine_code, manufacturer, displacement, cylinders, fuel_type").order("manufacturer", { ascending: true }).order("engine_code", { ascending: true });
		if (error) throw error;
		return {
			data: (rows ?? []).map((r) => ({
				id: r.id,
				engine_code: r.engine_code,
				manufacturer: r.manufacturer,
				displacement: r.displacement,
				cylinders: r.cylinders,
				fuel_type: r.fuel_type
			})),
			error: null
		};
	} catch {
		return {
			data: null,
			error: "Unable to load engine catalog at this time."
		};
	}
});
var searchVehicles_createServerFn_handler = createServerRpc({
	id: "b416928522c602ab9625b8e32eb13ff041f92388ee351f975661e6e87851fe2f",
	name: "searchVehicles",
	filename: "src/lib/autospec.functions.ts"
}, (opts) => searchVehicles.__executeServer(opts));
var searchVehicles = createServerFn({ method: "GET" }).inputValidator((input) => objectType({
	year: numberType().int().min(1984).max(2100).optional(),
	make: stringType().trim().min(1).max(100).optional(),
	model: stringType().trim().min(1).max(120).optional(),
	market: stringType().min(1).max(10).optional(),
	fuel_type: stringType().min(1).max(50).optional(),
	vehicle_type: stringType().min(1).max(50).optional(),
	page: numberType().int().min(1).default(1).optional(),
	pageSize: numberType().int().min(1).max(100).default(20).optional()
}).parse(input)).handler(searchVehicles_createServerFn_handler, async ({ data }) => {
	try {
		const page = data.page ?? 1;
		const pageSize = data.pageSize ?? 20;
		const from = (page - 1) * pageSize;
		const to = from + pageSize - 1;
		let query = supabase.from("vehicles").select("*", { count: "exact" });
		if (data.year) query = query.eq("year", data.year);
		if (data.make) query = query.eq("make", data.make);
		if (data.model) query = query.eq("model", data.model);
		if (data.market) query = query.eq("market", data.market);
		if (data.fuel_type) query = query.eq("fuel_type", data.fuel_type);
		if (data.vehicle_type) query = query.eq("vehicle_type", data.vehicle_type);
		query = query.order("year", { ascending: false }).order("make").order("model").range(from, to);
		const { data: rows, error, count } = await query;
		if (error) throw error;
		return {
			data: {
				vehicles: rows ?? [],
				total: count ?? 0,
				page,
				pageSize,
				totalPages: Math.ceil((count ?? 0) / pageSize)
			},
			error: null
		};
	} catch {
		return {
			data: null,
			error: "Unable to search vehicles at this time."
		};
	}
});
var getVehicleBySlug_createServerFn_handler = createServerRpc({
	id: "934c3c14b8ca1dceb38abac6f968223aff7e092b548d66ec07a8576112145360",
	name: "getVehicleBySlug",
	filename: "src/lib/autospec.functions.ts"
}, (opts) => getVehicleBySlug.__executeServer(opts));
var getVehicleBySlug = createServerFn({ method: "GET" }).inputValidator((input) => objectType({ slug: stringType().trim().min(1).max(200) }).parse(input)).handler(getVehicleBySlug_createServerFn_handler, async ({ data }) => {
	try {
		const { data: row, error } = await supabase.from("vehicles").select(`
          *,
          engines ( engine_code, displacement, cylinders, fuel_type )
        `).eq("slug", data.slug).single();
		if (error) throw error;
		if (!row) return {
			data: null,
			error: null
		};
		return {
			data: {
				...row,
				engine: row.engines ? {
					engine_code: row.engines.engine_code,
					displacement: row.engines.displacement,
					cylinders: row.engines.cylinders,
					fuel_type: row.engines.fuel_type
				} : null
			},
			error: null
		};
	} catch {
		return {
			data: null,
			error: "Vehicle not found."
		};
	}
});
var getVehicleSpecifications_createServerFn_handler = createServerRpc({
	id: "54575f07e4308202c19fac2238b487353452a246745d3c9ac739a00b7739f175",
	name: "getVehicleSpecifications",
	filename: "src/lib/autospec.functions.ts"
}, (opts) => getVehicleSpecifications.__executeServer(opts));
var getVehicleSpecifications = createServerFn({ method: "GET" }).inputValidator((input) => objectType({
	vehicleId: stringType().uuid(),
	category: stringType().optional(),
	market: stringType().optional()
}).parse(input)).handler(getVehicleSpecifications_createServerFn_handler, async ({ data }) => {
	try {
		let query = supabase.from("vehicle_specifications").select(`
          *,
          data_sources ( source_name, source_url, source_type )
        `).eq("vehicle_id", data.vehicleId);
		if (data.category) query = query.eq("specification_category", data.category);
		if (data.market) query = query.eq("market", data.market);
		const { data: rows, error } = await query.order("specification_category").order("specification_name");
		if (error) throw error;
		return {
			data: (rows ?? []).map((r) => ({
				...r,
				source_name: r.data_sources?.source_name ?? null,
				source_url: r.data_sources?.source_url ?? null
			})),
			error: null
		};
	} catch {
		return {
			data: null,
			error: "Unable to load specifications at this time."
		};
	}
});
var getVehicleMaintenance_createServerFn_handler = createServerRpc({
	id: "86590dc5151bb412d8092dc572f9482e9fed0905b00bc6e240ac0dbda9691827",
	name: "getVehicleMaintenance",
	filename: "src/lib/autospec.functions.ts"
}, (opts) => getVehicleMaintenance.__executeServer(opts));
var getVehicleMaintenance = createServerFn({ method: "GET" }).inputValidator((input) => objectType({ vehicleId: stringType().uuid() }).parse(input)).handler(getVehicleMaintenance_createServerFn_handler, async ({ data }) => {
	try {
		const { data: rows, error } = await supabase.from("maintenance_items").select(`
          *,
          data_sources ( source_name, source_url )
        `).eq("vehicle_id", data.vehicleId).order("item_name");
		if (error) throw error;
		return {
			data: (rows ?? []).map((r) => ({
				...r,
				source_name: r.data_sources?.source_name ?? null,
				source_url: r.data_sources?.source_url ?? null
			})),
			error: null
		};
	} catch {
		return {
			data: null,
			error: "Unable to load maintenance schedule at this time."
		};
	}
});
var getVehicleParts_createServerFn_handler = createServerRpc({
	id: "7d5a1a3c31620df7190e7b4a98081d0c708b9bfa14eb87178b56405cd6769d04",
	name: "getVehicleParts",
	filename: "src/lib/autospec.functions.ts"
}, (opts) => getVehicleParts.__executeServer(opts));
var getVehicleParts = createServerFn({ method: "GET" }).inputValidator((input) => objectType({ vehicleId: stringType().uuid() }).parse(input)).handler(getVehicleParts_createServerFn_handler, async ({ data }) => {
	try {
		const { data: rows, error } = await supabase.from("vehicle_part_compatibility").select(`
          *,
          parts ( part_category, manufacturer, part_number, product_name, description, specifications, external_url, image_url, affiliate_relationship ),
          data_sources ( source_name, source_url )
        `).eq("vehicle_id", data.vehicleId).order("parts(part_category)");
		if (error) throw error;
		return {
			data: (rows ?? []).map((r) => ({
				...r,
				part: r.parts,
				source_name: r.data_sources?.source_name ?? null,
				source_url: r.data_sources?.source_url ?? null
			})),
			error: null
		};
	} catch {
		return {
			data: null,
			error: "Unable to load parts compatibility at this time."
		};
	}
});
var getVehicleTires_createServerFn_handler = createServerRpc({
	id: "b0523c1692d976a59586dede502a6fe86dffd1424aff263f22686ede1a640e92",
	name: "getVehicleTires",
	filename: "src/lib/autospec.functions.ts"
}, (opts) => getVehicleTires.__executeServer(opts));
var getVehicleTires = createServerFn({ method: "GET" }).inputValidator((input) => objectType({ vehicleId: stringType().uuid() }).parse(input)).handler(getVehicleTires_createServerFn_handler, async ({ data }) => {
	try {
		const { data: rows, error } = await supabase.from("tire_specifications").select(`
          *,
          data_sources ( source_name, source_url )
        `).eq("vehicle_id", data.vehicleId).order("tire_position");
		if (error) throw error;
		return {
			data: (rows ?? []).map((r) => ({
				...r,
				source_name: r.data_sources?.source_name ?? null,
				source_url: r.data_sources?.source_url ?? null
			})),
			error: null
		};
	} catch {
		return {
			data: null,
			error: "Unable to load tire specifications at this time."
		};
	}
});
var getVehicleFluids_createServerFn_handler = createServerRpc({
	id: "6bc16de0db809743082a50d47858c12a1ab52fec4e8f8b981b0e1e6eb16c439f",
	name: "getVehicleFluids",
	filename: "src/lib/autospec.functions.ts"
}, (opts) => getVehicleFluids.__executeServer(opts));
var getVehicleFluids = createServerFn({ method: "GET" }).inputValidator((input) => objectType({ vehicleId: stringType().uuid() }).parse(input)).handler(getVehicleFluids_createServerFn_handler, async ({ data }) => {
	try {
		const { data: rows, error } = await supabase.from("fluids").select(`
          *,
          data_sources ( source_name, source_url )
        `).eq("vehicle_id", data.vehicleId).order("fluid_type");
		if (error) throw error;
		return {
			data: (rows ?? []).map((r) => ({
				...r,
				source_name: r.data_sources?.source_name ?? null,
				source_url: r.data_sources?.source_url ?? null
			})),
			error: null
		};
	} catch {
		return {
			data: null,
			error: "Unable to load fluid specifications at this time."
		};
	}
});
var getRecallsByVehicle_createServerFn_handler = createServerRpc({
	id: "76803bc26f6b781399db8ec3335c487080f91e71da4ce2da785db15722d7a930",
	name: "getRecallsByVehicle",
	filename: "src/lib/autospec.functions.ts"
}, (opts) => getRecallsByVehicle.__executeServer(opts));
var getRecallsByVehicle = createServerFn({ method: "GET" }).inputValidator((input) => objectType({
	vehicleId: stringType().uuid().optional(),
	year: numberType().int().optional(),
	make: stringType().optional(),
	model: stringType().optional()
}).parse(input)).handler(getRecallsByVehicle_createServerFn_handler, async ({ data }) => {
	try {
		let query = supabase.from("recalls").select(`
          *,
          data_sources ( source_name, source_url )
        `).order("report_date", { ascending: false });
		if (data.vehicleId) query = query.eq("vehicle_id", data.vehicleId);
		if (data.year) query = query.eq("model_year", data.year);
		if (data.make) query = query.eq("make", data.make);
		if (data.model) query = query.eq("model", data.model);
		const { data: rows, error } = await query;
		if (error) throw error;
		return {
			data: (rows ?? []).map((r) => ({
				...r,
				source_name: r.data_sources?.source_name ?? null,
				source_url: r.data_sources?.source_url ?? null
			})),
			error: null
		};
	} catch {
		return {
			data: null,
			error: "Unable to load recall records at this time."
		};
	}
});
var getDataSources_createServerFn_handler = createServerRpc({
	id: "7e354cc1eccc03a7bb826cbc2ca80f3d67603416edc0e95e8cb2ccdab73ce09e",
	name: "getDataSources",
	filename: "src/lib/autospec.functions.ts"
}, (opts) => getDataSources.__executeServer(opts));
var getDataSources = createServerFn({ method: "GET" }).handler(getDataSources_createServerFn_handler, async () => {
	try {
		const { data: rows, error } = await supabase.from("data_sources").select("*").eq("enabled", true).order("source_name");
		if (error) throw error;
		return {
			data: rows ?? [],
			error: null
		};
	} catch {
		return {
			data: null,
			error: "Unable to load data sources at this time."
		};
	}
});
var getPublishedArticles_createServerFn_handler = createServerRpc({
	id: "9915c3e101b549d5d2df6555622bb33b4c3e1445fea7de6a14db1352ad2802b7",
	name: "getPublishedArticles",
	filename: "src/lib/autospec.functions.ts"
}, (opts) => getPublishedArticles.__executeServer(opts));
var getPublishedArticles = createServerFn({ method: "GET" }).inputValidator((input) => objectType({
	category: stringType().optional(),
	limit: numberType().int().min(1).max(50).optional()
}).parse(input)).handler(getPublishedArticles_createServerFn_handler, async ({ data }) => {
	try {
		let query = supabase.from("articles").select("*").eq("status", "published").order("published_at", { ascending: false });
		if (data.category) query = query.eq("category", data.category);
		if (data.limit) query = query.limit(data.limit);
		const { data: rows, error } = await query;
		if (error) throw error;
		return {
			data: rows ?? [],
			error: null
		};
	} catch {
		return {
			data: null,
			error: "Unable to load articles at this time."
		};
	}
});
//#endregion
export { decodeVin_createServerFn_handler, getDataSources_createServerFn_handler, getEpaFuelPrices_createServerFn_handler, getFuelEconomyMakes_createServerFn_handler, getFuelEconomyModels_createServerFn_handler, getFuelEconomyOptions_createServerFn_handler, getFuelEconomyVehicle_createServerFn_handler, getPublishedArticles_createServerFn_handler, getRecallsByVehicle_createServerFn_handler, getVehicleBySlug_createServerFn_handler, getVehicleEngines_createServerFn_handler, getVehicleFluids_createServerFn_handler, getVehicleMaintenance_createServerFn_handler, getVehicleMakes_createServerFn_handler, getVehicleModels_createServerFn_handler, getVehicleParts_createServerFn_handler, getVehicleRecalls_createServerFn_handler, getVehicleSpecifications_createServerFn_handler, getVehicleTires_createServerFn_handler, getVehicleTrims_createServerFn_handler, searchVehicles_createServerFn_handler };
