import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { supabase } from "@/integrations/supabase/client";

import type {
  FuelEconomyVehicle,
  LookupResult,
  RecallRecord,
  VehicleOption,
  VinDecodedVehicle,
} from "@/lib/autospec.model";

const VIN_SOURCE = "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended";
const RECALL_SOURCE = "https://api.nhtsa.gov/recalls/recallsByVehicle";
const FUEL_ECONOMY_SOURCE = "https://www.fueleconomy.gov/ws/rest";

/** NHTSA reports dates as DD/MM/YYYY; normalize to ISO so `new Date()` parses everywhere. */
function normalizeNhtsaDate(value: string | null): string | null {
  if (!value) return value;
  const dmy = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value.trim());
  if (dmy) return `${dmy[3]}-${dmy[2]}-${dmy[1]}`;
  return value;
}

async function requestJson(url: URL): Promise<unknown> {
  let lastStatus = 0;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    // FuelEconomy.gov ignores `format=json` and serves XML without this header.
    const response = await fetch(url, {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(12_000),
    });
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

function asRecord(value: unknown): Record<string, unknown> {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

function asText(value: unknown): string {
  return typeof value === "string" || typeof value === "number" ? String(value).trim() : "";
}

function pickText(record: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const text = asText(record[key]);
    if (text && text !== "0" && text.toLowerCase() !== "not applicable") return text;
  }
  return "";
}

function menuItems(payload: unknown): VehicleOption[] {
  const root = asRecord(payload);
  // The live API returns `{ menuItem: [...] }`; older docs showed a
  // `menuItemList` wrapper, so accept both (and a single bare item).
  const raw = root["menuItem"] ?? asRecord(root["menuItemList"])["menuItem"];
  const items = Array.isArray(raw) ? raw : raw == null ? [] : [raw];
  return items
    .map((item) => {
      const row = asRecord(item);
      const id = asText(row["value"]);
      const name = asText(row["text"]);
      return { id, name };
    })
    .filter((item) => item.id.length > 0 && item.name.length > 0);
}

export const getFuelEconomyMakes = createServerFn({ method: "GET" })
  .inputValidator((input: { year: number }) => z.object({ year: z.number().int().min(1984).max(2100) }).parse(input))
  .handler(async ({ data }): Promise<LookupResult<VehicleOption[]>> => {
    const url = new URL(`${FUEL_ECONOMY_SOURCE}/vehicle/menu/make`);
    url.searchParams.set("year", String(data.year));
    url.searchParams.set("format", "json");
    try {
      return { data: menuItems(await requestJson(url)), error: null };
    } catch {
      return { data: null, error: "Fuel-economy makes are temporarily unavailable. Try again shortly." };
    }
  });

export const getFuelEconomyModels = createServerFn({ method: "GET" })
  .inputValidator((input: { year: number; make: string }) =>
    z.object({ year: z.number().int().min(1984).max(2100), make: z.string().trim().min(1).max(100) }).parse(input),
  )
  .handler(async ({ data }): Promise<LookupResult<VehicleOption[]>> => {
    const url = new URL(`${FUEL_ECONOMY_SOURCE}/vehicle/menu/model`);
    url.searchParams.set("year", String(data.year));
    url.searchParams.set("make", data.make);
    url.searchParams.set("format", "json");
    try {
      return { data: menuItems(await requestJson(url)), error: null };
    } catch {
      return { data: null, error: "Fuel-economy models are temporarily unavailable. Try again shortly." };
    }
  });

export const getFuelEconomyOptions = createServerFn({ method: "GET" })
  .inputValidator((input: { year: number; make: string; model: string }) =>
    z
      .object({
        year: z.number().int().min(1984).max(2100),
        make: z.string().trim().min(1).max(100),
        model: z.string().trim().min(1).max(120),
      })
      .parse(input),
  )
  .handler(async ({ data }): Promise<LookupResult<VehicleOption[]>> => {
    const url = new URL(`${FUEL_ECONOMY_SOURCE}/vehicle/menu/options`);
    url.searchParams.set("year", String(data.year));
    url.searchParams.set("make", data.make);
    url.searchParams.set("model", data.model);
    url.searchParams.set("format", "json");
    try {
      return { data: menuItems(await requestJson(url)), error: null };
    } catch {
      return { data: null, error: "Fuel-economy configurations are temporarily unavailable. Try again shortly." };
    }
  });

export const getFuelEconomyVehicle = createServerFn({ method: "GET" })
  .inputValidator((input: { id: number }) => z.object({ id: z.number().int().positive().max(1_000_000) }).parse(input))
  .handler(async ({ data }): Promise<LookupResult<FuelEconomyVehicle>> => {
    const url = new URL(`${FUEL_ECONOMY_SOURCE}/vehicle/${data.id}`);
    url.searchParams.set("format", "json");
    try {
      const result = asRecord(await requestJson(url));
      const asNumber = (value: unknown): number | null => {
        const number = Number(value);
        return Number.isFinite(number) && number > 0 ? number : null;
      };
      const vehicle: FuelEconomyVehicle = {
        id: Number(result["id"]) || data.id,
        description: pickText(result, ["year", "make", "model", "eng_dscr", "trany"]),
        cityMpg: asNumber(result["city08"]),
        highwayMpg: asNumber(result["highway08"]),
        combinedMpg: asNumber(result["comb08"]),
        fuelType: pickText(result, ["fuelType1"]),
        fuelTypeSecondary: pickText(result, ["fuelType2"]),
        drive: pickText(result, ["drive"]),
        cylinders: pickText(result, ["cylinders"]),
        displacement: pickText(result, ["displ"]),
        annualFuelCost: asNumber(result["fuelCost08"]),
        tailpipeCo2: asNumber(result["co2TailpipeGpm"]),
      };
      return { data: vehicle, error: null };
    } catch {
      return { data: null, error: "This configuration's EPA data is temporarily unavailable." };
    }
  });

export const getEpaFuelPrices = createServerFn({ method: "GET" }).handler(
  async (): Promise<LookupResult<Record<string, number>>> => {
    const url = new URL(`${FUEL_ECONOMY_SOURCE}/fuelprices`);
    url.searchParams.set("format", "json");
    try {
      const prices = asRecord(await requestJson(url));
      const data: Record<string, number> = {};
      for (const [fuel, amount] of Object.entries(prices)) {
        const price = Number(amount);
        if (Number.isFinite(price) && price > 0) data[fuel.toLowerCase()] = price;
      }
      return { data, error: null };
    } catch {
      return { data: null, error: "Current U.S. reference fuel prices are unavailable. Enter a price to continue." };
    }
  },
);

export const decodeVin = createServerFn({ method: "POST" })
  .inputValidator((input: { vin: string }) =>
    z
      .object({ vin: z.string().trim().toUpperCase().regex(/^[A-HJ-NPR-Z0-9]{17}$/) })
      .parse(input),
  )
  .handler(async ({ data }): Promise<LookupResult<VinDecodedVehicle>> => {
    const url = new URL(`${VIN_SOURCE}/${encodeURIComponent(data.vin)}`);
    url.searchParams.set("format", "json");
    try {
      const root = asRecord(await requestJson(url));
      const rows = Array.isArray(root["Results"]) ? root["Results"] : [];
      const result = asRecord(rows[0]);
      const vehicle: VinDecodedVehicle = {
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
        sourceUrl: "https://vpic.nhtsa.dot.gov/",
      };
      if (!vehicle.year && !vehicle.make && !vehicle.model) {
        return { data: null, error: "NHTSA could not identify this VIN. Check the characters and try again." };
      }
      return { data: vehicle, error: null };
    } catch {
      return { data: null, error: "NHTSA VIN decoding is temporarily unavailable. Your VIN was not saved." };
    }
  });

export const getVehicleRecalls = createServerFn({ method: "GET" })
  .inputValidator((input: { year: number; make: string; model: string }) =>
    z
      .object({
        year: z.number().int().min(1981).max(2100),
        make: z.string().trim().min(1).max(100),
        model: z.string().trim().min(1).max(120),
      })
      .parse(input),
  )
  .handler(async ({ data }): Promise<LookupResult<RecallRecord[]>> => {
    const url = new URL(RECALL_SOURCE);
    url.searchParams.set("make", data.make);
    url.searchParams.set("model", data.model);
    url.searchParams.set("modelYear", String(data.year));
    try {
      const root = asRecord(await requestJson(url));
      const results = Array.isArray(root["results"]) ? root["results"] : [];
      const recalls = results.map((item): RecallRecord => {
        const result = asRecord(item);
        return {
          campaignNumber: pickText(result, ["NHTSACampaignNumber", "nhtsaCampaignNumber"]),
          component: pickText(result, ["Component", "component"]),
          summary: pickText(result, ["Summary", "summary"]),
          consequence: pickText(result, ["Conequence", "Consequence", "consequence"]),
          remedy: pickText(result, ["Remedy", "remedy"]),
          reportDate: normalizeNhtsaDate(pickText(result, ["ReportReceivedDate", "reportReceivedDate"])),
          sourceUrl: "https://www.nhtsa.gov/recalls",
        };
      });
      return { data: recalls, error: null };
    } catch {
      return { data: null, error: "NHTSA recall records are temporarily unavailable. Try again shortly." };
    }
  });

export interface VehicleRecord {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string | null;
  generation: string | null;
  body_style: string | null;
  market: string;
  vehicle_type: string | null;
  fuel_type: string | null;
  transmission: string | null;
  drivetrain: string | null;
  engine_id: string | null;
  external_source_ids: Record<string, unknown>;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface VehicleSearchFilters {
  year?: number;
  make?: string;
  model?: string;
  market?: string;
  fuel_type?: string;
  vehicle_type?: string;
  page?: number;
  pageSize?: number;
}

export interface VehicleSearchResult {
  vehicles: VehicleRecord[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const getVehicleMakes = createServerFn({ method: "GET" })
  .inputValidator((input: { year?: number; market?: string }) =>
    z
      .object({
        year: z.number().int().min(1984).max(2100).optional(),
        market: z.string().min(1).max(10).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }): Promise<LookupResult<string[]>> => {
    try {
      let query = supabase
        .from("vehicles")
        .select("make")
        .order("make", { ascending: true });

      if (data.year) query = query.eq("year", data.year);
      if (data.market) query = query.eq("market", data.market);

      const { data: rows, error } = await query;
      if (error) throw error;

      const makes = Array.from(new Set((rows ?? []).map((r) => r.make))).sort();
      return { data: makes, error: null };
    } catch {
      return { data: null, error: "Unable to load vehicle makes at this time." };
    }
  });

export const getVehicleModels = createServerFn({ method: "GET" })
  .inputValidator((input: { year: number; make: string; market?: string }) =>
    z
      .object({
        year: z.number().int().min(1984).max(2100),
        make: z.string().trim().min(1).max(100),
        market: z.string().min(1).max(10).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }): Promise<LookupResult<string[]>> => {
    try {
      let query = supabase
        .from("vehicles")
        .select("model")
        .eq("year", data.year)
        .eq("make", data.make)
        .order("model", { ascending: true });

      if (data.market) query = query.eq("market", data.market);

      const { data: rows, error } = await query;
      if (error) throw error;

      const models = Array.from(new Set((rows ?? []).map((r) => r.model))).sort();
      return { data: models, error: null };
    } catch {
      return { data: null, error: "Unable to load vehicle models at this time." };
    }
  });

export const getVehicleTrims = createServerFn({ method: "GET" })
  .inputValidator((input: { year: number; make: string; model: string; market?: string }) =>
    z
      .object({
        year: z.number().int().min(1984).max(2100),
        make: z.string().trim().min(1).max(100),
        model: z.string().trim().min(1).max(120),
        market: z.string().min(1).max(10).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }): Promise<LookupResult<string[]>> => {
    try {
      let query = supabase
        .from("vehicles")
        .select("trim")
        .eq("year", data.year)
        .eq("make", data.make)
        .eq("model", data.model)
        .not("trim", "is", null)
        .order("trim", { ascending: true });

      if (data.market) query = query.eq("market", data.market);

      const { data: rows, error } = await query;
      if (error) throw error;

      const trims = Array.from(new Set((rows ?? []).map((r) => r.trim).filter(Boolean))).sort();
      return { data: trims, error: null };
    } catch {
      return { data: null, error: "Unable to load vehicle trims at this time." };
    }
  });

export const getVehicleEngines = createServerFn({ method: "GET" }).handler(
  async (): Promise<LookupResult<Array<{ id: string; engine_code: string | null; manufacturer: string | null; displacement: number | null; cylinders: number | null; fuel_type: string | null }>>> => {
    try {
      const { data: rows, error } = await supabase
        .from("engines")
        .select("id, engine_code, manufacturer, displacement, cylinders, fuel_type")
        .order("manufacturer", { ascending: true })
        .order("engine_code", { ascending: true });
      if (error) throw error;
      return { data: (rows ?? []).map((r) => ({
        id: r.id,
        engine_code: r.engine_code,
        manufacturer: r.manufacturer,
        displacement: r.displacement,
        cylinders: r.cylinders,
        fuel_type: r.fuel_type,
      })), error: null };
    } catch {
      return { data: null, error: "Unable to load engine catalog at this time." };
    }
  },
);

export const searchVehicles = createServerFn({ method: "GET" })
  .inputValidator((input: VehicleSearchFilters) =>
    z
      .object({
        year: z.number().int().min(1984).max(2100).optional(),
        make: z.string().trim().min(1).max(100).optional(),
        model: z.string().trim().min(1).max(120).optional(),
        market: z.string().min(1).max(10).optional(),
        fuel_type: z.string().min(1).max(50).optional(),
        vehicle_type: z.string().min(1).max(50).optional(),
        page: z.number().int().min(1).default(1).optional(),
        pageSize: z.number().int().min(1).max(100).default(20).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }): Promise<LookupResult<VehicleSearchResult>> => {
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
          vehicles: (rows ?? []),
          total: count ?? 0,
          page,
          pageSize,
          totalPages: Math.ceil((count ?? 0) / pageSize),
        },
        error: null,
      };
    } catch {
      return {
        data: null,
        error: "Unable to search vehicles at this time.",
      };
    }
  });

export const getVehicleBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) =>
    z.object({ slug: z.string().trim().min(1).max(200) }).parse(input),
  )
  .handler(async ({ data }): Promise<LookupResult<VehicleRecord & { engine?: { engine_code: string | null; displacement: number | null; cylinders: number | null; fuel_type: string | null } | null }>> => {
    try {
      const { data: row, error } = await supabase
        .from("vehicles")
        .select(`
          *,
          engines ( engine_code, displacement, cylinders, fuel_type )
        `)
        .eq("slug", data.slug)
        .single();
      if (error) throw error;
      if (!row) return { data: null, error: null };

      return {
        data: {
          ...row,
          engine: row.engines ? {
            engine_code: row.engines.engine_code,
            displacement: row.engines.displacement,
            cylinders: row.engines.cylinders,
            fuel_type: row.engines.fuel_type,
          } : null,
        },
        error: null,
      };
    } catch {
      return { data: null, error: "Vehicle not found." };
    }
  });

export const getVehicleSpecifications = createServerFn({ method: "GET" })
  .inputValidator((input: { vehicleId: string; category?: string; market?: string }) =>
    z
      .object({
        vehicleId: z.string().uuid(),
        category: z.string().optional(),
        market: z.string().optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }): Promise<LookupResult<any[]>> => {
    try {
      let query = supabase
        .from("vehicle_specifications")
        .select(`
          *,
          data_sources ( source_name, source_url, source_type )
        `)
        .eq("vehicle_id", data.vehicleId);

      if (data.category) query = query.eq("specification_category", data.category);
      if (data.market) query = query.eq("market", data.market);

      const { data: rows, error } = await query.order("specification_category").order("specification_name");
      if (error) throw error;

      return { data: (rows ?? []).map((r: any) => ({
        ...r,
        source_name: r.data_sources?.source_name ?? null,
        source_url: r.data_sources?.source_url ?? null,
      })), error: null };
    } catch {
      return { data: null, error: "Unable to load specifications at this time." };
    }
  });

export const getVehicleMaintenance = createServerFn({ method: "GET" })
  .inputValidator((input: { vehicleId: string }) =>
    z.object({ vehicleId: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data }): Promise<LookupResult<any[]>> => {
    try {
      const { data: rows, error } = await supabase
        .from("maintenance_items")
        .select(`
          *,
          data_sources ( source_name, source_url )
        `)
        .eq("vehicle_id", data.vehicleId)
        .order("item_name");
      if (error) throw error;
      return {
        data: (rows ?? []).map((r: any) => ({
          ...r,
          source_name: r.data_sources?.source_name ?? null,
          source_url: r.data_sources?.source_url ?? null,
        })),
        error: null,
      };
    } catch {
      return { data: null, error: "Unable to load maintenance schedule at this time." };
    }
  });

export const getVehicleParts = createServerFn({ method: "GET" })
  .inputValidator((input: { vehicleId: string }) =>
    z.object({ vehicleId: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data }): Promise<LookupResult<any[]>> => {
    try {
      const { data: rows, error } = await supabase
        .from("vehicle_part_compatibility")
        .select(`
          *,
          parts ( part_category, manufacturer, part_number, product_name, description, specifications, external_url, image_url, affiliate_relationship ),
          data_sources ( source_name, source_url )
        `)
        .eq("vehicle_id", data.vehicleId)
        .order("parts(part_category)");
      if (error) throw error;
      return {
        data: (rows ?? []).map((r: any) => ({
          ...r,
          part: r.parts,
          source_name: r.data_sources?.source_name ?? null,
          source_url: r.data_sources?.source_url ?? null,
        })),
        error: null,
      };
    } catch {
      return { data: null, error: "Unable to load parts compatibility at this time." };
    }
  });

export const getVehicleTires = createServerFn({ method: "GET" })
  .inputValidator((input: { vehicleId: string }) =>
    z.object({ vehicleId: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data }): Promise<LookupResult<any[]>> => {
    try {
      const { data: rows, error } = await supabase
        .from("tire_specifications")
        .select(`
          *,
          data_sources ( source_name, source_url )
        `)
        .eq("vehicle_id", data.vehicleId)
        .order("tire_position");
      if (error) throw error;
      return {
        data: (rows ?? []).map((r: any) => ({
          ...r,
          source_name: r.data_sources?.source_name ?? null,
          source_url: r.data_sources?.source_url ?? null,
        })),
        error: null,
      };
    } catch {
      return { data: null, error: "Unable to load tire specifications at this time." };
    }
  });

export const getVehicleFluids = createServerFn({ method: "GET" })
  .inputValidator((input: { vehicleId: string }) =>
    z.object({ vehicleId: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data }): Promise<LookupResult<any[]>> => {
    try {
      const { data: rows, error } = await supabase
        .from("fluids")
        .select(`
          *,
          data_sources ( source_name, source_url )
        `)
        .eq("vehicle_id", data.vehicleId)
        .order("fluid_type");
      if (error) throw error;
      return {
        data: (rows ?? []).map((r: any) => ({
          ...r,
          source_name: r.data_sources?.source_name ?? null,
          source_url: r.data_sources?.source_url ?? null,
        })),
        error: null,
      };
    } catch {
      return { data: null, error: "Unable to load fluid specifications at this time." };
    }
  });

export const getRecallsByVehicle = createServerFn({ method: "GET" })
  .inputValidator((input: { vehicleId?: string; year?: number; make?: string; model?: string }) =>
    z
      .object({
        vehicleId: z.string().uuid().optional(),
        year: z.number().int().optional(),
        make: z.string().optional(),
        model: z.string().optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }): Promise<LookupResult<any[]>> => {
    try {
      let query = supabase
        .from("recalls")
        .select(`
          *,
          data_sources ( source_name, source_url )
        `)
        .order("report_date", { ascending: false });

      if (data.vehicleId) query = query.eq("vehicle_id", data.vehicleId);
      if (data.year) query = query.eq("model_year", data.year);
      if (data.make) query = query.eq("make", data.make);
      if (data.model) query = query.eq("model", data.model);

      const { data: rows, error } = await query;
      if (error) throw error;
      return {
        data: (rows ?? []).map((r: any) => ({
          ...r,
          source_name: r.data_sources?.source_name ?? null,
          source_url: r.data_sources?.source_url ?? null,
        })),
        error: null,
      };
    } catch {
      return { data: null, error: "Unable to load recall records at this time." };
    }
  });

export const getDataSources = createServerFn({ method: "GET" }).handler(
  async (): Promise<LookupResult<any[]>> => {
    try {
      const { data: rows, error } = await supabase
        .from("data_sources")
        .select("*")
        .eq("enabled", true)
        .order("source_name");
      if (error) throw error;
      return { data: (rows ?? []), error: null };
    } catch {
      return { data: null, error: "Unable to load data sources at this time." };
    }
  });

export const getPublishedArticles = createServerFn({ method: "GET" })
  .inputValidator((input: { category?: string; limit?: number }) =>
    z
      .object({
        category: z.string().optional(),
        limit: z.number().int().min(1).max(50).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }): Promise<LookupResult<any[]>> => {
    try {
      let query = supabase
        .from("articles")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (data.category) query = query.eq("category", data.category);
      if (data.limit) query = query.limit(data.limit);

      const { data: rows, error } = await query;
      if (error) throw error;
      return { data: (rows ?? []), error: null };
    } catch {
      return { data: null, error: "Unable to load articles at this time." };
    }
  });