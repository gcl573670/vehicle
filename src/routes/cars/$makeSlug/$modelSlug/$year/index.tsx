import { useState, useEffect, useCallback } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useParams } from "@tanstack/react-router";
import {
  Gauge, Sparkles, Battery, CircleGauge, Wrench, ShieldAlert, Fuel,
  Link as LinkIcon, ExternalLink, Info, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import { getVehicleBySlug, getVehicleSpecifications, getVehicleMaintenance,
  getVehicleParts, getVehicleTires, getVehicleFluids, getRecallsByVehicle,
} from "@/lib/autospec.functions";
import { ConfidenceBadge } from "@/components/autospec/confidence-badge";
import { SourceCitation } from "@/components/autospec/source-citation";
import { SpecificationTable } from "@/components/autospec/specification-table";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cars/$makeSlug/$modelSlug/$year/")({
  component: VehiclePage,
});

function slugify(s: string) {
  return s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function VehiclePage() {
  const params = useParams();
  const makeSlug = params.makeSlug as string;
  const modelSlug = params.modelSlug as string;
  const year = params.year as string;

  const [vehicle, setVehicle] = useState<any>(null);
  const [specifications, setSpecifications] = useState<any[]>([]);
  const [maintenance, setMaintenance] = useState<any[]>([]);
  const [parts, setParts] = useState<any[]>([]);
  const [tires, setTires] = useState<any[]>([]);
  const [fluids, setFluids] = useState<any[]>([]);
  const [recalls, setRecalls] = useState<any[]>([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const loadVehicle = useCallback(async () => {
    setBusy(true);
    setError("");
    try {
      const vResp = await getVehicleBySlug({ data: { slug: `${makeSlug}-${modelSlug}-${year}` } });
      if (vResp.data) {
        setVehicle(vResp.data);
      } else if (vResp.error) {
        setError(vResp.error);
      }

      // Try to find vehicle by year/make/model/slug match in DB
      // Fallback: try direct slug variations
      if (!vResp.data) {
        const altSlug = `${slugify(makeSlug)}-${slugify(modelSlug)}-${year}`;
        const vResp2 = await getVehicleBySlug({ data: { slug: altSlug } });
        if (vResp2.data) setVehicle(vResp2.data);
        else if (vResp2.error) setError(vResp2.error);
      }

      if (vehicle?.id) {
        const [specResp, maintResp, partsResp, tiresResp, fluidsResp, recallResp] = await Promise.all([
          getVehicleSpecifications({ data: { vehicleId: vehicle.id } }),
          getVehicleMaintenance({ data: { vehicleId: vehicle.id } }),
          getVehicleParts({ data: { vehicleId: vehicle.id } }),
          getVehicleTires({ data: { vehicleId: vehicle.id } }),
          getVehicleFluids({ data: { vehicleId: vehicle.id } }),
          getRecallsByVehicle({ data: { vehicleId: vehicle.id } }),
        ]);
        if (specResp.data) setSpecifications(specResp.data);
        if (maintResp.data) setMaintenance(maintResp.data);
        if (partsResp.data) setParts(partsResp.data);
        if (tiresResp.data) setTires(tiresResp.data);
        if (fluidsResp.data) setFluids(fluidsResp.data);
        if (recallResp.data) setRecalls(recallResp.data);
      }
    } catch {
      setError("Unable to load vehicle details.");
    } finally {
      setBusy(false);
    }
  }, [makeSlug, modelSlug, year, vehicle?.id]);

  useEffect(() => {
    loadVehicle();
  }, [loadVehicle]);

  if (busy && !vehicle) {
    return (
      <div className="autospec-container py-20">
        <div className="flex flex-col items-center justify-center text-center">
          <Gauge className="size-8 text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">Loading vehicle details…</p>
        </div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="autospec-container py-20">
        <div className="rounded-xl border border-border bg-background p-8 text-center">
          <h2 className="text-xl font-semibold">{error || "Vehicle not found"}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            No matching vehicle record for {year} {makeSlug.replace(/-/g, " ")} {modelSlug.replace(/-/g, " ")}.
          </p>
          <Button onClick={() => window.location.href = "/vehicles"}>
            Browse vehicle database
          </Button>
        </div>
      </div>
    );
  }

  const hasSpecs = specifications.length > 0;
  const hasMaintenance = maintenance.length > 0;
  const hasParts = parts.length > 0;
  const hasTires = tires.length > 0;
  const hasFluids = fluids.length > 0;
  const hasRecalls = recalls.length > 0;

  const fullLabel = `${vehicle.year} ${vehicle.make} ${vehicle.model}${vehicle.trim ? ` ${vehicle.trim}` : ""}`;

  return (
    <div className="min-h-screen bg-background">
      <div className="autospec-container py-8">
        <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-6" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="text-muted-foreground">/</span>
          <Link to="/vehicles" className="hover:text-primary">Vehicle Database</Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{vehicle.year}</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{vehicle.make}</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{vehicle.model}</span>
          {vehicle.trim && (
            <>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground">{vehicle.trim}</span>
            </>
          )}
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3 flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{fullLabel}</CardTitle>
                <CardDescription className="text-sm">
                  {vehicle.market} market · {vehicle.vehicle_type ?? "Vehicle"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-muted-foreground">Body:</span>
                    <span>{vehicle.body_style ?? "Not specified"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-muted-foreground">Drivetrain:</span>
                    <span>{vehicle.drivetrain ?? "Not specified"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-muted-foreground">Transmission:</span>
                    <span>{vehicle.transmission ?? "Not specified"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-muted-foreground">Fuel:</span>
                    <span>{vehicle.fuel_type ?? "Not specified"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-muted-foreground">Engine:</span>
                    <span>{vehicle.engine?.engine_code ?? vehicle.engine?.displacement ? `${vehicle.engine.displacement}L` : "Not specified"}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("specifications")}>
                    Specifications
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("maintenance")}>
                    Maintenance
                  </Button>
                </div>
              </CardFooter>
            </Card>

            {hasTires && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">Tire Pressure</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    {tires.map((t) => (
                      <div key={t.id} className="flex items-center justify-between pb-2 border-b border-border/50 last:border-0">
                        <span className="text-muted-foreground">{t.tire_position}</span>
                        <div className="text-right">
                          <span className="font-medium">{t.pressure_value}{t.pressure_unit ? " " + t.pressure_unit : ""}</span>
                          <span className="text-xs text-muted-foreground block">{t.tire_size ?? ""}</span>
                        </div>
                        <ConfidenceBadge status={t.confidence_status as any} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="flex-1">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                {hasSpecs && <TabsTrigger value="specifications">Specifications</TabsTrigger>}
                {hasMaintenance && <TabsTrigger value="maintenance">Maintenance</TabsTrigger>}
                {hasParts && <TabsTrigger value="parts">Parts & Compatibility</TabsTrigger>}
                {hasFluids && <TabsTrigger value="fluids">Fluids & Capacities</TabsTrigger>}
                {hasRecalls && <TabsTrigger value="recalls">Recalls & Safety</TabsTrigger>}
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { label: "Year", value: String(vehicle.year) },
                    { label: "Make", value: vehicle.make },
                    { label: "Model", value: vehicle.model },
                    { label: "Trim", value: vehicle.trim ?? "—" },
                    { label: "Market", value: vehicle.market },
                    { label: "Body Style", value: vehicle.body_style ?? "—" },
                    { label: "Drivetrain", value: vehicle.drivetrain ?? "—" },
                    { label: "Transmission", value: vehicle.transmission ?? "—" },
                    { label: "Fuel Type", value: vehicle.fuel_type ?? "—" },
                  ].map(({ label, value }) => (
                    <Card key={label} className="p-4">
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
                      <p className="mt-1 text-sm font-semibold">{value}</p>
                    </Card>
                  ))}
                </div>
                <div className="mt-8">
                  <p className="text-sm text-muted-foreground">
                    Select a tab above to view specifications, maintenance,
                    parts compatibility, fluids, and recall information for this
                    vehicle. Data shown is sourced from verified records where
                    available.
                  </p>
                </div>
              </TabsContent>

              {hasSpecs && (
                <TabsContent value="specifications" className="mt-6">
                  <SpecificationTable
                    specifications={specifications}
                    title="Technical Specifications"
                  />
                </TabsContent>
              )}

              {hasMaintenance && (
                <TabsContent value="maintenance" className="mt-6">
                  <div className="space-y-4">
                    {maintenance.map((item) => (
                      <Card key={item.id} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-sm">{item.item_name}</span>
                          <ConfidenceBadge status={item.confidence_status as any} />
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          {item.interval_distance && <span>{item.interval_distance} mi</span>}
                          {item.interval_time_months && <span>{item.interval_time_months} months</span>}
                          {item.conditions && <span>{item.conditions}</span>}
                        </div>
                        {item.instructions && (
                          <p className="text-xs text-muted-foreground">{item.instructions}</p>
                        )}
                        <SourceCitation
                          sourceName={item.source_name}
                          sourceUrl={item.source_url}
                        />
                      </Card>
                    ))}
                    </div>
                    {maintenance.length === 0 && (
                      <p className="text-sm text-muted-foreground">No maintenance records available.</p>
                    )}
                  </TabsContent>
                )}

                {hasParts && (
                <TabsContent value="parts" className="mt-6">
                  <div className="space-y-4">
                    {parts.map((p: any) => {
                      const part = p.parts ?? {};
                      return (
                        <Card key={p.id} className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-sm">{part.product_name}</span>
                            <ConfidenceBadge status={p.confidence_status as any} />
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <span>{part.part_category}</span>
                            {part.manufacturer && <span>· {part.manufacturer}</span>}
                            {part.part_number && <span>· {part.part_number}</span>}
                          </div>
                          {part.description && (
                            <p className="text-xs text-muted-foreground">{part.description}</p>
                          )}
                          <SourceCitation
                            sourceName={p.source_name}
                            sourceUrl={p.source_url}
                          />
                          {part.external_url && (
                            <a
                              href={part.external_url}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary"
                            >
                              View part <ExternalLink className="size-3.5" />
                            </a>
                          )}
                          {part.affiliate_relationship && (
                            <p className="mt-2 text-[10px] text-muted-foreground">
                              Affiliate link: {part.affiliate_relationship}
                            </p>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
              )}

              {hasFluids && (
                <TabsContent value="fluids" className="mt-6">
                  <div className="space-y-4">
                    {fluids.map((f) => (
                      <Card key={f.id} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-sm">{f.fluid_type}</span>
                          <ConfidenceBadge status={f.confidence_status as any} />
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          {f.specification && <span>{f.specification}</span>}
                          {f.capacity && <span>{f.capacity} {f.capacity_unit}</span>}
                          {f.recommended_product_type && <span>· {f.recommended_product_type}</span>}
                        </div>
                        <SourceCitation
                          sourceName={f.source_name}
                          sourceUrl={f.source_url}
                        />
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              )}

              {hasRecalls && (
                <TabsContent value="recalls" className="mt-6">
                  <div className="space-y-4">
                    {recalls.map((r) => (
                      <Card key={r.campaign_number} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-sm">{r.campaign_number}</span>
                          <span className="text-xs font-semibold text-destructive">Safety Recall</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{r.summary}</p>
                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-2">
                          {r.component && <span>{r.component}</span>}
                          {r.report_date && <span>· {new Date(r.report_date).toLocaleDateString()}</span>}
                        </div>
                        {r.remedy && (
                          <p className="text-sm"><strong>Remedy:</strong> {r.remedy}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          This is a model-year recall history, not individual
                          VIN repair status. Confirm at NHTSA.
                        </p>
                        <a
                          href="https://www.nhtsa.gov/recalls"
                          target="_blank"
                          rel="noreferrer noopener"
                          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary"
                        >
                          Confirm at NHTSA <ExternalLink className="size-3.5" />
                        </a>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
