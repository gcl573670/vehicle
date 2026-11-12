export type FuelEconomyUnit = "mpg" | "l100km" | "kml";
export type VehicleDistanceUnit = "miles" | "kilometers";
export type FuelPriceUnit = "gallon" | "liter";

export interface VehicleSelection {
  year: number;
  make: string;
  model: string;
  option?: string;
  fuelEconomyId?: number;
}

export interface FuelEconomyVehicle {
  id: number;
  description: string;
  cityMpg: number | null;
  highwayMpg: number | null;
  combinedMpg: number | null;
  fuelType: string | null;
  fuelTypeSecondary: string | null;
  drive: string | null;
  cylinders: string | null;
  displacement: string | null;
  annualFuelCost: number | null;
  tailpipeCo2: number | null;
}

export interface VehicleOption {
  id: string;
  name: string;
}

export interface RecallRecord {
  campaignNumber: string;
  component: string;
  summary: string;
  consequence: string;
  remedy: string;
  reportDate: string;
  sourceUrl: string;
}

export interface VinDecodedVehicle {
  vin: string;
  year: string;
  make: string;
  model: string;
  trim: string;
  series: string;
  bodyClass: string;
  vehicleType: string;
  engineCylinders: string;
  displacement: string;
  fuelType: string;
  driveType: string;
  transmission: string;
  manufacturer: string;
  plantCountry: string;
  sourceUrl: string;
}

export interface LookupResult<T> {
  data: T | null;
  error: string | null;
}

const US_GALLON_LITERS = 3.785411784;
const MILES_PER_KILOMETER = 0.621371192;

export function isValidVin(vin: string): boolean {
  return /^[A-HJ-NPR-Z0-9]{17}$/i.test(vin.trim());
}

export function createModelYears(currentYear: number): number[] {
  const firstYear = 1984;
  return Array.from({ length: currentYear - firstYear + 1 }, (_, index) => currentYear - index);
}

export function calculateFuelCost(input: {
  distance: number;
  distanceUnit: VehicleDistanceUnit;
  economy: number;
  economyUnit: FuelEconomyUnit;
  price: number;
  priceUnit: FuelPriceUnit;
}): { cost: number; fuelLiters: number } | null {
  const { distance, distanceUnit, economy, economyUnit, price, priceUnit } = input;
  if (![distance, economy, price].every(Number.isFinite) || distance <= 0 || economy <= 0 || price < 0) {
    return null;
  }

  const kilometers = distanceUnit === "miles" ? distance / MILES_PER_KILOMETER : distance;
  let fuelLiters: number;
  if (economyUnit === "l100km") {
    fuelLiters = (kilometers * economy) / 100;
  } else if (economyUnit === "kml") {
    fuelLiters = kilometers / economy;
  } else {
    const miles = kilometers * MILES_PER_KILOMETER;
    fuelLiters = (miles / economy) * US_GALLON_LITERS;
  }

  const cost = priceUnit === "gallon" ? (fuelLiters / US_GALLON_LITERS) * price : fuelLiters * price;
  return { cost, fuelLiters };
}

export function convertTirePressure(psi: number): { psi: number; kpa: number; bar: number } | null {
  if (!Number.isFinite(psi) || psi < 0) return null;
  return { psi, kpa: psi * 6.894757293, bar: psi * 0.06894757293 };
}

export function slugifyTool(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Canonical slug transform for vehicle URL segments (`/cars/:makeSlug/:modelSlug/:year`).
 * Must stay in sync with the slug written by `scripts/seed.mjs`.
 */
export function slugifyVehicleSegment(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}