import { useState, useEffect } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronRight, ExternalLink, Gauge, Sparkles, Battery, CircleGauge, Wrench, Fuel, ShieldAlert, Search, MapPin, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { decodeVin, getVehicleRecalls, getFuelEconomyVehicle, getEpaFuelPrices } from "@/lib/autospec.functions";
import { isValidVin, calculateFuelCost, convertTirePressure, slugifyTool } from "@/lib/autospec.model";
import type { VinDecodedVehicle, RecallRecord } from "@/lib/autospec.model";
import { ConfidenceBadge } from "@/components/autospec/confidence-badge";
import { SourceCitation } from "@/components/autospec/source-citation";
import { cn } from "@/lib/utils";

const TOOLS: Record<string, {
  title: string;
  description: string;
  category: string;
  icon: React.ElementType;
  path: string;
}> = {
  "tire-pressure": {
    title: "Tire Pressure Lookup",
    description: "Verified front and rear tire pressure specifications with PSI, kPa, and bar conversions.",
    category: "Specifications",
    icon: Gauge,
    path: "/cars/$makeSlug/$modelSlug/$year/tire-pressure",
  },
  "wiper-blades": {
    title: "Wiper Blade Finder",
    description: "Driver, passenger, and rear blade lengths with fitment source and confidence.",
    category: "Parts & Fitment",
    icon: Sparkles,
    path: "/cars/$makeSlug/$modelSlug/$year/wiper-blades",
  },
  "battery-compatibility": {
    title: "Battery Compatibility Finder",
    description: "Verified battery group size, dimensions, terminal layout, polarity, and CCA.",
    category: "Parts & Fitment",
    icon: Battery,
    path: "/cars/$makeSlug/$modelSlug/$year/battery",
  },
  "oil-and-coolant": {
    title: "Oil & Coolant Reference",
    description: "Engine-specific oil viscosity, capacity, and coolant specifications.",
    category: "Fluids",
    icon: CircleGauge,
    path: "/cars/$makeSlug/$modelSlug/$year/oil-coolant",
  },
  "maintenance-schedule": {
    title: "Maintenance Schedule",
    description: "Time and distance service intervals with normal and severe driving conditions.",
    category: "Maintenance",
    icon: Wrench,
    path: "/cars/$makeSlug/$modelSlug/$year/maintenance",
  },
  "fuel-cost-calculator": {
    title: "Fuel Cost Calculator",
    description: "Calculate estimated fuel consumption and trip cost from EPA fuel-economy data.",
    category: "Calculators",
    icon: Fuel,
    path: "/tools/fuel-cost-calculator",
  },
  "recall-checker": {
    title: "Recall Checker",
    description: "NHTSA recall campaigns by vehicle or VIN with campaign numbers and remedies.",
    category: "Safety",
    icon: ShieldAlert,
    path: "/tools/recall-checker",
  },
  "vin-decoder": {
    title: "VIN Decoder",
    description: "Decode a 17-character VIN through the official NHTSA vPIC API.",
    category: "Identification",
    icon: Search,
    path: "/tools/vin-decoder",
  },
  "ev-charging": {
    title: "EV Charging Station Locator",
    description: "Find public EV charging stations with connector types and operator details.",
    category: "EV",
    icon: Zap,
    path: "/tools/ev-charging",
  },
  "specifications": {
    title: "Vehicle Specifications Browser",
    description: "Browse technical specifications across the vehicle catalog.",
    category: "Reference",
    icon: MapPin,
    path: "/tools/specifications",
  },
  "parts-compatibility": {
    title: "Parts Compatibility Browser",
    description: "Search compatible parts by vehicle and part category.",
    category: "Parts & Fitment",
    icon: Battery,
    path: "/tools/parts-compatibility",
  },
};

export const Route = createFileRoute("/tools/$tool")({
  component: ToolPage,
});

function ToolPage() {
  const params = Route.useParams();
  const toolSlug = (params.tool as string) ?? "";
  const tool = TOOLS[toolSlug];

  if (!tool) {
    return (
      <div className="autospec-container py-20">
        <div className="rounded-xl border border-border bg-background p-8 text-center">
          <h2 className="text-xl font-semibold">Tool not found</h2>
          <p className="mt-2 text-sm text-muted-foreground">The requested tool does not exist.</p>
          <Button asChild>
            <Link to="/">Return home</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Vehicle-specific tools redirect to the vehicle page with tab
  if (tool.path.startsWith("/cars/")) {
    return null; // handled by vehicle route tabs
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="autospec-container py-8">
        <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">Tools</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{tool.title}</span>
        </nav>

        <div className="max-w-3xl">
          <div className="mb-8">
            <BadgeCategory className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-primary mb-2">{tool.category}</BadgeCategory>
            <h1 className="text-2xl font-bold tracking-tight">{tool.title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{tool.description}</p>
          </div>

          {toolSlug === "fuel-cost-calculator" && <FuelCostCalculator />}
          {toolSlug === "vin-decoder" && <VINDecoderTool />}
          {toolSlug === "recall-checker" && <RecallCheckerTool />}
          {toolSlug === "ev-charging" && <EVChargingTool />}
          {toolSlug === "specifications" && <SpecificationsBrowserTool />}
          {toolSlug === "parts-compatibility" && <PartsBrowserTool />}
          {!["fuel-cost-calculator","vin-decoder","recall-checker","ev-charging","specifications","parts-compatibility"].includes(toolSlug) && (
            <div className="rounded-xl border border-border bg-background p-8 text-center">
              <tool.icon className="size-12 text-primary mb-4" />
              <h2 className="text-lg font-semibold">{tool.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{tool.description}</p>
              <p className="mt-4 text-xs text-muted-foreground/70">Please select a vehicle first to use this tool.</p>
              <div className="mt-6">
                <Button asChild>
                  <Link to="/">Select your vehicle</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BadgeCategory({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("rounded-md bg-primary/10 px-2 py-0.5", className)}>{children}</span>
  );
}

// ---------- Fuel Cost Calculator ----------
function FuelCostCalculator() {
  const [distance, setDistance] = useState("");
  const [distanceUnit, setDistanceUnit] = useState<"miles" | "kilometers">("miles");
  const [economy, setEconomy] = useState<number | null>(null);
  const [economyUnit, setEconomyUnit] = useState<"mpg" | "l100km" | "kml">("mpg");
  const [price, setPrice] = useState("");
  const [priceUnit, setPriceUnit] = useState<"gallon" | "liter">("gallon");
  const [fuelPrices, setFuelPrices] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ cost: number; fuelLiters: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setBusy(true);
    void getEpaFuelPrices()
      .then((res) => {
        if (!active) return;
        setFuelPrices(res.data ?? {});
        setError(res.error ?? "");
      })
      .finally(() => { if (active) setBusy(false); });
    return () => { active = false; };
  }, []);

  const calculate = () => {
    const d = Number(distance);
    const p = Number(price);
    if (!economy || !d || !p || d <= 0 || p < 0) {
      setResult(null);
      return;
    }
    const r = calculateFuelCost({
      distance: d,
      distanceUnit,
      economy,
      economyUnit,
      price: p,
      priceUnit,
    });
    setResult(r);
  };

  const defaultPrice = fuelPrices["regular"] ?? fuelPrices["gasoline"] ?? 3.50;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fuel Cost Calculator</CardTitle>
        <CardDescription>Estimate fuel consumption and cost for a trip. Based on U.S. EPA fuel-economy data; actual consumption varies.</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-muted-foreground">Distance</label>
            <input
              type="number"
              value={distance}
              onChange={(e) => { setDistance(e.target.value); calculate(); }}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button variant="outline" size="sm" onClick={() => setDistanceUnit(distanceUnit === "miles" ? "kilometers" : "miles")}>
              {distanceUnit === "miles" ? "km" : "mi"}
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-muted-foreground">Fuel economy</label>
            <input
              type="number"
              value={economy ? String(economy) : ""}
              onChange={(e) => { setEconomy(Number(e.target.value) || null); calculate(); }}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button variant="outline" size="sm" onClick={() => {
              const u = economyUnit === "mpg" ? "l100km" : economyUnit === "l100km" ? "kml" : "mpg";
              setEconomyUnit(u);
            }}>
              {economyUnit === "mpg" ? "L/100km" : economyUnit === "l100km" ? "km/L" : "MPG"}
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-muted-foreground">Fuel price</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => { setPrice(e.target.value); calculate(); }}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button variant="outline" size="sm" onClick={() => setPriceUnit(priceUnit === "gallon" ? "liter" : "gallon")}>
              {priceUnit === "gallon" ? "L" : "gal"}
            </Button>
          </div>
          <div className="flex flex-col gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={() => { setEconomy(null); calculate(); }} disabled={!economy}>
              Use EPA data
            </Button>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Estimated fuel cost</span>
            <span className="font-semibold text-foreground">
              {result ? `$${result.cost.toFixed(2)}` : "—"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-muted-foreground">Estimated fuel used</span>
            <span className="font-semibold text-foreground">
              {result ? `${result.fuelLiters.toFixed(1)} L` : "—"}
            </span>
          </div>
        </div>

        {fuelPrices["regular"] && (
          <p className="mt-4 text-xs text-muted-foreground">
            Reference U.S. regular gasoline price: ${fuelPrices["regular"].toFixed(2)}/gal (EPA FuelEconomy.gov).
          </p>
        )}
        {error && <p className="mt-3 text-xs text-destructive">{error}</p>}
        <p className="mt-3 text-[10px] text-muted-foreground/70">
          Actual fuel consumption varies by driving conditions, vehicle load, and maintenance.
        </p>
      </CardContent>
    </Card>
  );
}

// ---------- VIN Decoder Tool ----------
function VINDecoderTool() {
  const [vin, setVin] = useState("");
  const [result, setResult] = useState<VinDecodedVehicle | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = vin.trim().toUpperCase();
    if (!isValidVin(normalized)) {
      setError("Enter a 17-character VIN. The letters I, O and Q are not used.");
      setResult(null);
      return;
    }
    setBusy(true);
    setError("");
    setResult(null);
    try {
      const response = await decodeVin({ data: { vin: normalized } });
      setResult(response.data);
      setError(response.error ?? "");
    } catch {
      setError("NHTSA VIN decoding is temporarily unavailable.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>VIN Decoder</CardTitle>
        <CardDescription>Decode manufacturer-reported vehicle details through the official NHTSA vPIC API.</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            autoComplete="off"
            spellCheck={false}
            maxLength={17}
            value={vin}
            onChange={(e) => setVin(e.target.value.toUpperCase())}
            placeholder="Enter 17-character VIN"
            className="h-11 min-w-0 flex-1 rounded-md border border-input bg-background px-4 font-mono text-sm uppercase placeholder:font-sans placeholder:normal-case placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Button type="submit" disabled={busy || !isValidVin(vin.trim())}>
            {busy ? "Decoding…" : "Decode VIN"}
          </Button>
        </form>
        {error && <p className="mb-4 text-sm text-destructive">{error}</p>}
        {result && (
          <div className="border-l-2 border-primary bg-background p-4">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground">NHTSA vPIC · decoded record</p>
                <h3 className="mt-1 text-base font-semibold">
                  {[result.year, result.make, result.model].filter(Boolean).join(" ") || "Vehicle details"}
                </h3>
              </div>
              <a href={result.sourceUrl} target="_blank" rel="noreferrer" className="text-xs font-semibold text-primary">Source</a>
            </div>
            <dl className="grid gap-x-6 sm:grid-cols-2">
              <dt className="text-xs text-muted-foreground">VIN</dt>
              <dd className="text-sm font-mono">{result.vin}</dd>
              <dt className="text-xs text-muted-foreground">Trim / series</dt>
              <dd className="text-sm">{[result.trim, result.series].filter(Boolean).join(" · ") || "—"}</dd>
              <dt className="text-xs text-muted-foreground">Body</dt>
              <dd className="text-sm">{result.bodyClass || "—"}</dd>
              <dt className="text-xs text-muted-foreground">Engine</dt>
              <dd className="text-sm">{[result.displacement && `${result.displacement} L`, result.engineCylinders && `${result.engineCylinders} cylinders`].filter(Boolean).join(" · ") || "—"}</dd>
              <dt className="text-xs text-muted-foreground">Fuel</dt>
              <dd className="text-sm">{result.fuelType || "—"}</dd>
              <dt className="text-xs text-muted-foreground">Drive</dt>
              <dd className="text-sm">{result.driveType || "—"}</dd>
              <dt className="text-xs text-muted-foreground">Transmission</dt>
              <dd className="text-sm">{result.transmission || "—"}</dd>
              <dt className="text-xs text-muted-foreground">Manufacturer</dt>
              <dd className="text-sm">{result.manufacturer || "—"}</dd>
              <dt className="text-xs text-muted-foreground">Plant country</dt>
              <dd className="text-sm">{result.plantCountry || "—"}</dd>
            </dl>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">
              Manufacturer-reported U.S. VIN data. Available fields vary; this
              decode does not establish exact parts fitment or repair status.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ---------- Recall Checker Tool ----------
function RecallCheckerTool() {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [recalls, setRecalls] = useState<RecallRecord[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const check = async () => {
    if (!year || !make || !model) return;
    setBusy(true);
    setError("");
    setRecalls(null);
    try {
      const response = await getVehicleRecalls({ data: { year: Number(year), make, model } });
      setRecalls(response.data);
      setError(response.error ?? "");
    } catch {
      setError("NHTSA recall records are temporarily unavailable.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recall Checker</CardTitle>
        <CardDescription>Check NHTSA safety recall campaigns by year, make, and model.</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-muted-foreground">Year</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-muted-foreground">Make</label>
            <input
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-muted-foreground">Model</label>
            <input
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="flex items-end">
            <Button onClick={check} disabled={busy || !year || !make || !model}>
              {busy ? "Checking…" : "Check recalls"}
            </Button>
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
        {recalls !== null && (
          <div className="mt-6 space-y-3">
            <p className="text-sm font-semibold">
              {recalls.length === 0 ? "No matching campaigns were returned by NHTSA." : `${recalls.length} NHTSA campaign${recalls.length === 1 ? "" : "s"} reported.`}
            </p>
            <p className="text-xs text-muted-foreground">
              This is a model-year history lookup, not a VIN-specific open-recall or repair-status check.
            </p>
            {recalls.slice(0, 5).map((r) => (
              <div key={r.campaignNumber} className="p-3 rounded-md border border-border/60 bg-background">
                <p className="text-xs font-semibold text-primary">{r.campaignNumber}</p>
                <p className="mt-1 text-sm text-muted-foreground">{r.summary}</p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {r.component && <span>{r.component}</span>}
                  {r.reportDate && (
                    <span>
                      · {Number.isNaN(Date.parse(r.reportDate))
                        ? r.reportDate
                        : new Date(r.reportDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
                {r.remedy && (
                  <p className="mt-2 text-sm"><strong>Remedy:</strong> {r.remedy}</p>
                )}
              </div>
            ))}
            <a href="https://www.nhtsa.gov/recalls" target="_blank" rel="noreferrer noopener" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
              Confirm at NHTSA <ExternalLink className="size-3.5" />
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ---------- EV Charging Tool ----------
function EVChargingTool() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>EV Charging Station Locator</CardTitle>
        <CardDescription>Find public EV charging stations with connector types and operator details. (Open Charge Map integration — API key required)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-dashed border-border/60 bg-secondary/30 p-8 text-center">
          <Zap className="size-8 text-primary mb-3" />
          <h3 className="text-sm font-semibold">Open Charge Map integration</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Configure your Open Charge Map API key in Supabase secrets to enable EV charging station search.
            API keys are never exposed in browser code.
          </p>
          <Button variant="outline" size="sm">Request API key setup</Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ---------- Specifications Browser ----------
function SpecificationsBrowserTool() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Specifications Browser</CardTitle>
        <CardDescription>Browse technical specifications across the vehicle catalog.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Select a vehicle from the header or homepage to view its full
          specifications, including sourced confidence levels and source citations.
        </p>
      </CardContent>
    </Card>
  );
}

// ---------- Parts Browser ----------
function PartsBrowserTool() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Parts Compatibility Browser</CardTitle>
        <CardDescription>Search compatible parts by vehicle and part category.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Select a vehicle to view compatible parts with verified fitment notes,
          source attribution, and confidence levels. Never guess fitment.
        </p>
      </CardContent>
    </Card>
  );
}
