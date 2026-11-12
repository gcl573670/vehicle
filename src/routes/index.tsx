import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Battery,
  BookOpenText,
  CircleGauge,
  Clock3,
  Fuel,
  Gauge,
  Search,
  ShieldAlert,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  decodeVin,
  getFuelEconomyMakes,
  getFuelEconomyModels,
  getFuelEconomyOptions,
  getVehicleRecalls,
} from "@/lib/autospec.functions";
import type { RecallRecord, VehicleOption, VehicleSelection, VinDecodedVehicle } from "@/lib/autospec.model";
import { createModelYears, isValidVin } from "@/lib/autospec.model";
import vehicleImage from "@/assets/autospec-vehicle.jpg";
import { VehicleSelector } from "@/components/autospec/vehicle-selector";
import { ConfidenceBadge } from "@/components/autospec/confidence-badge";
import { SourceCitation } from "@/components/autospec/source-citation";

const tools = [
  { title: "Tire pressure", caption: "Specification lookup", icon: Gauge, slug: "tire-pressure" },
  { title: "Wiper blades", caption: "Fitment reference", icon: Sparkles, slug: "wiper-blades" },
  { title: "Battery fit", caption: "Compatibility reference", icon: Battery, slug: "battery-compatibility" },
  { title: "Engine oil", caption: "Type & capacity", icon: CircleGauge, slug: "oil-and-coolant" },
  { title: "Maintenance", caption: "Service schedule", icon: Wrench, slug: "maintenance-schedule" },
  { title: "Fuel cost", caption: "Trip cost calculator", icon: Fuel, slug: "fuel-cost-calculator" },
  { title: "Recall check", caption: "Official safety records", icon: ShieldAlert, slug: "recall-checker" },
  { title: "VIN decode", caption: "Identify your vehicle", icon: Search, slug: "vin-decoder" },
];

function toolPath(slug: string) {
  return { to: "/tools/$tool" as const, params: { tool: slug } };
}

function DetailRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 border-b border-border/70 py-3 last:border-0">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="max-w-full break-words text-right text-sm font-semibold text-foreground">{value}</dd>
    </div>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    title: "AutoSpec — Know Your Car. Maintain It Better.",
    meta: [
      { name: "description", content: "Vehicle specifications, maintenance references, compatible parts and automotive tools—all in one place. Sourced data, never guessed." },
      { property: "og:title", content: "AutoSpec — Know Your Car. Maintain It Better." },
      { property: "og:description", content: "Vehicle specifications, maintenance references, compatible parts and automotive tools—all in one place." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AutoSpecHomePage,
});

function AutoSpecHomePage() {
  const fetchMakes = getFuelEconomyMakes;
  const fetchModels = getFuelEconomyModels;
  const fetchOptions = getFuelEconomyOptions;
  const runVinDecode = decodeVin;
  const fetchRecalls = getVehicleRecalls;
  const modelYears = createModelYears(new Date().getFullYear());

  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [option, setOption] = useState("");
  const [makes, setMakes] = useState<VehicleOption[]>([]);
  const [models, setModels] = useState<VehicleOption[]>([]);
  const [configurations, setConfigurations] = useState<VehicleOption[]>([]);
  const [catalogError, setCatalogError] = useState("");
  const [catalogBusy, setCatalogBusy] = useState(false);
  const [vin, setVin] = useState("");
  const [vinResult, setVinResult] = useState<VinDecodedVehicle | null>(null);
  const [vinError, setVinError] = useState("");
  const [vinBusy, setVinBusy] = useState(false);
  const [recalls, setRecalls] = useState<RecallRecord[] | null>(null);
  const [recallError, setRecallError] = useState("");
  const [recallBusy, setRecallBusy] = useState(false);
  const [optionId, setOptionId] = useState("");

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem("autospec.selected-vehicle");
      if (!stored) return;
      const selected = JSON.parse(stored) as Partial<VehicleSelection>;
      if (selected.year && selected.make && selected.model) {
        setYear(String(selected.year));
        setMake(selected.make);
        setModel(selected.model);
        if (selected.option) setOption(selected.option);
        if (typeof selected.fuelEconomyId === "number") setOptionId(String(selected.fuelEconomyId));
      }
    } catch {
      window.sessionStorage.removeItem("autospec.selected-vehicle");
    }
  }, []);

  useEffect(() => {
    if (!year) {
      setMakes([]);
      setCatalogError("");
      return;
    }
    let active = true;
    setCatalogBusy(true);
    setCatalogError("");
    void fetchMakes({ data: { year: Number(year) } })
      .then((response) => {
        if (!active) return;
        setMakes(response.data ?? []);
        setCatalogError(response.error ?? "");
      })
      .catch(() => {
        if (active) setCatalogError("Vehicle data is temporarily unavailable. Try again shortly.");
      })
      .finally(() => {
        if (active) setCatalogBusy(false);
      });
    return () => { active = false; };
  }, [year, fetchMakes]);

  useEffect(() => {
    if (!year || !make) {
      setModels([]);
      return;
    }
    let active = true;
    setCatalogBusy(true);
    void fetchModels({ data: { year: Number(year), make } })
      .then((response) => {
        if (!active) return;
        setModels(response.data ?? []);
        setCatalogError(response.error ?? "");
      })
      .catch(() => {
        if (active) setCatalogError("Vehicle data is temporarily unavailable. Try again shortly.");
      })
      .finally(() => {
        if (active) setCatalogBusy(false);
      });
    return () => { active = false; };
  }, [year, make, fetchModels]);

  useEffect(() => {
    if (!year || !make || !model) {
      setConfigurations([]);
      return;
    }
    let active = true;
    setCatalogBusy(true);
    void fetchOptions({ data: { year: Number(year), make, model } })
      .then((response) => {
        if (!active) return;
        setConfigurations(response.data ?? []);
        setCatalogError(response.error ?? "");
      })
      .catch(() => {
        if (active) setCatalogError("Vehicle configurations are temporarily unavailable.");
      })
      .finally(() => {
        if (active) setCatalogBusy(false);
      });
    return () => { active = false; };
  }, [year, make, model, fetchOptions]);

  const selectYear = (value: string) => {
    setYear(value);
    setMake("");
    setModel("");
    setOption("");
    setOptionId("");
    setModels([]);
    setConfigurations([]);
    setVinResult(null);
  };

  const selectMake = (value: string) => {
    setMake(value);
    setModel("");
    setOption("");
    setOptionId("");
    setConfigurations([]);
    setVinResult(null);
  };

  const selectModel = (value: string) => {
    setModel(value);
    setOption("");
    setOptionId("");
    setVinResult(null);
  };

  const selectOption = (value: string) => {
    const selected = configurations.find((item) => item.id === value);
    setOption(selected?.name ?? "");
    setOptionId(value);
    const selection: VehicleSelection = {
      year: Number(year),
      make,
      model,
      option: selected?.name ?? "",
      fuelEconomyId: Number(value),
    };
    try {
      window.sessionStorage.setItem("autospec.selected-vehicle", JSON.stringify(selection));
    } catch {
      // The lookup remains usable when browser storage is restricted.
    }
  };

  const submitVin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = vin.trim().toUpperCase();
    if (!isValidVin(normalized)) {
      setVinError("Enter a 17-character VIN. The letters I, O and Q are not used.");
      setVinResult(null);
      return;
    }
    setVinBusy(true);
    setVinError("");
    setVinResult(null);
    try {
      const response = await runVinDecode({ data: { vin: normalized } });
      setVinResult(response.data);
      setVinError(response.error ?? "");
    } catch {
      setVinError("NHTSA VIN decoding is temporarily unavailable. Your VIN was not saved.");
    } finally {
      setVinBusy(false);
    }
  };

  const submitRecalls = async () => {
    if (!year || !make || !model) return;
    setRecallBusy(true);
    setRecallError("");
    setRecalls(null);
    try {
      const response = await fetchRecalls({ data: { year: Number(year), make, model } });
      setRecalls(response.data);
      setRecallError(response.error ?? "");
    } catch {
      setRecallError("NHTSA recall records are temporarily unavailable. Try again shortly.");
    } finally {
      setRecallBusy(false);
    }
  };

  const handleSaveVehicle = () => {
    if (!year || !make || !model) return;
    const selected: VehicleSelection = {
      year: Number(year),
      make,
      model,
      option,
      ...(optionId ? { fuelEconomyId: Number(optionId) } : {}),
    };
    try {
      window.sessionStorage.setItem("autospec.selected-vehicle", JSON.stringify(selected));
    } catch {
      // Keep the current selection in memory if storage is unavailable.
    }
  };

  return (
    <main className="min-h-screen bg-background">

      <section className="hero-panel overflow-hidden">
        <div className="autospec-container grid min-h-[478px] items-center gap-7 py-9 lg:grid-cols-[0.94fr_1.06fr] lg:py-12">
          <div className="autospec-reveal relative z-10 max-w-[540px] py-5 lg:py-8">
            <div className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-primary"><span className="size-1.5 rounded-full bg-accent"/> THE REFERENCE FOR YOUR RIDE</div>
            <h1 className="max-w-[520px] text-[42px] font-semibold leading-[1.03] sm:text-[56px] lg:text-[62px]">Know your car.<br/><span className="text-accent">Maintain it better.</span></h1>
            <p className="mt-6 max-w-[410px] text-[15px] leading-7 text-foreground/75">Vehicle specifications, maintenance references, compatible parts and automotive tools—all in one place.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" className="h-12 rounded-md bg-accent px-5 text-accent-foreground shadow-none hover:bg-accent/90" asChild>
                <a href="#find-vehicle">Find your vehicle <ArrowRight className="size-4"/></a>
              </Button>
              <Button variant="outline" size="lg" className="h-12 rounded-md border-foreground/20 bg-transparent px-5 text-foreground hover:bg-foreground/10" asChild>
                <Link {...toolPath("vin-decoder")}>Decode a VIN <ArrowUpRight className="size-4"/></Link>
              </Button>
            </div>
          </div>
          <div className="relative order-first flex min-h-[230px] items-center justify-center lg:order-last lg:min-h-[385px]">
            <div className="absolute inset-y-3 -right-16 left-8 hidden bg-foreground/5 lg:block" />
            <img src={vehicleImage} alt="Silver vehicle in a modern service bay" width={1280} height={960} fetchPriority="high" className="relative z-10 h-[245px] w-full max-w-[640px] object-cover sm:h-[320px] lg:h-[370px]"/>
            <div className="absolute bottom-0 left-0 z-20 hidden border-l-2 border-accent bg-background px-4 py-3 text-foreground shadow-sm sm:block lg:bottom-2">
              <p className="autospec-eyebrow">Vehicle data, without guesswork</p>
              <p className="mt-1 text-xs font-semibold">Sources shown. Unknowns stay unknown.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="find-vehicle" className="autospec-container relative z-20 -mt-2 scroll-mt-5 pb-16 pt-8">
        <div className="grid gap-7 border-b border-border pb-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
          <div className="flex flex-col justify-center">
            <div className="autospec-eyebrow">Start with your vehicle</div>
            <h2 className="mt-2 text-[25px] font-semibold">Find the right fit.</h2>
            <p className="mt-2 max-w-[350px] text-sm leading-6 text-muted-foreground">Choose a specific U.S. model configuration to unlock source-linked information.</p>
            <a href="#vin-decoder" className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary hover:underline">Have your VIN? Decode it <ArrowRight className="size-3.5"/></a>
          </div>
          <div className="min-w-0">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="autospec-field">
                <PrettyLabel value="Year"/>
                <Select value={year || undefined} onValueChange={selectYear}>
                  <SelectTrigger className="h-12 rounded-md border-border bg-background px-3.5 text-sm"><SelectValue placeholder="Select year"/></SelectTrigger>
                  <SelectContent>{modelYears.map((item) => <SelectItem key={item} value={String(item)}>{item}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <FieldSelect label="Make" placeholder={catalogBusy && year ? "Loading makes…" : "Select make"} value={make} options={makes} disabled={!year || catalogBusy} onChange={selectMake}/>
              <FieldSelect label="Model" placeholder="Select model" value={model} options={models} disabled={!make || catalogBusy} onChange={selectModel}/>
              <FieldSelect label="Configuration" placeholder="Select configuration" value={optionId} options={configurations} disabled={!model || catalogBusy} onChange={selectOption}/>
            </div>
            <div className="mt-4 flex min-h-7 flex-wrap items-center justify-between gap-3">
              <p role="status" className="text-xs text-muted-foreground">{catalogError || (optionId ? "Selection held for this browser session." : "Powered by U.S. EPA FuelEconomy.gov data.")}</p>
              <Button size="sm" className="rounded-md px-4" disabled={!year || !make || !model} onClick={handleSaveVehicle}>Use this vehicle <ArrowRight className="size-3.5"/></Button>
            </div>
            {year && make && model && (
              <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-border pt-4">
                <p className="text-sm font-semibold">{year} {make} {model}{option ? ` · ${option}` : ""}</p>
                <Button variant="outline" size="sm" className="rounded-md" onClick={submitRecalls} disabled={recallBusy}>
                  <ShieldAlert className="size-3.5"/>{recallBusy ? "Checking NHTSA…" : "Check recalls"}
                </Button>
              </div>
            )}
            {recallError && <p role="status" className="mt-3 text-sm text-destructive">{recallError}</p>}
            {recalls !== null && (
              <div className="mt-4 space-y-3" aria-live="polite">
                <p className="text-sm font-semibold">{recalls.length === 0 ? "No matching campaigns were returned by NHTSA." : `${recalls.length} NHTSA campaign${recalls.length === 1 ? "" : "s"} reported for this model.`}</p>
                <p className="text-xs text-muted-foreground">This is a model-year history lookup, not a VIN-specific open-recall or repair-status check.</p>
                {recalls.slice(0, 3).map((recall) => (
                  <article key={recall.campaignNumber} className="border-l-2 border-primary pl-3">
                    <p className="text-xs font-semibold">{recall.campaignNumber} · {recall.component || "Component not specified"}</p>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">{recall.summary}</p>
                  </article>
                ))}
                <a href="https://www.nhtsa.gov/recalls" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-primary">Confirm at NHTSA <ArrowUpRight className="size-3"/></a>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="autospec-container pb-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="autospec-eyebrow">At your service</div>
            <h2 className="mt-2 text-[28px] font-semibold">Useful tools. Verified when available.</h2>
          </div>
          <p className="max-w-[340px] text-sm leading-6 text-muted-foreground">No sourced data? We’ll say so—never fill in a spec by guessing.</p>
        </div>
        <div className="mt-7 grid gap-x-7 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map(({ title, caption, icon: Icon, slug }, index) => (
            <Link key={slug} {...toolPath(slug)} className="group flex min-h-[112px] items-center gap-4 border-t border-border py-5 transition-colors hover:border-primary">
              <span className="grid size-11 shrink-0 place-items-center rounded-md bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><Icon className="size-5"/></span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-foreground">{title}</span>
                <span className="mt-1 block text-xs text-muted-foreground">{caption}</span>
              </span>
              <ArrowDownRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-primary"/>
              <span className="sr-only">Tool {index + 1}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-secondary/60 py-14">
        <div className="autospec-container grid gap-9 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <div className="autospec-eyebrow">From identification to the details</div>
            <h2 className="mt-2 max-w-lg text-[29px] font-semibold leading-tight">A VIN is a good place to start.</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">Decode manufacturer-reported vehicle details through NHTSA. Your VIN is sent to the official decoder and isn’t stored here.</p>
            <form id="vin-decoder" onSubmit={submitVin} className="mt-6 flex max-w-[540px] flex-col gap-3 sm:flex-row">
              <label htmlFor="autospec-vin" className="sr-only">17-character vehicle identification number</label>
              <input id="autospec-vin" autoComplete="off" spellCheck={false} maxLength={17} value={vin} onChange={(event) => setVin(event.target.value.toUpperCase())} placeholder="Enter 17-character VIN" className="h-12 min-w-0 flex-1 rounded-md border border-input bg-background px-4 font-mono text-sm uppercase placeholder:font-sans placeholder:normal-case placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-describedby={vinError ? "vin-feedback" : undefined}/>
              <Button type="submit" className="h-12 rounded-md px-5" disabled={vinBusy}>{vinBusy ? "Decoding…" : "Decode VIN"}<ArrowRight className="size-4"/></Button>
            </form>
            {vinError && <p id="vin-feedback" role="alert" className="mt-3 text-sm text-destructive">{vinError}</p>}
            {vinResult && (
              <div className="mt-5 border-l-2 border-primary bg-background px-5 py-4" aria-live="polite">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div><p className="text-xs font-medium text-muted-foreground">NHTSA vPIC · decoded record</p><h3 className="mt-1 text-base font-semibold">{[vinResult.year, vinResult.make, vinResult.model].filter(Boolean).join(" ") || "Vehicle details"}</h3></div>
                  <a href={vinResult.sourceUrl} target="_blank" rel="noreferrer" className="text-xs font-semibold text-primary">Source</a>
                </div>
                <dl className="mt-3 grid gap-x-6 sm:grid-cols-2">
                  <DetailRow label="Trim / series" value={[vinResult.trim, vinResult.series].filter(Boolean).join(" · ")}/>
                  <DetailRow label="Body" value={vinResult.bodyClass}/>
                  <DetailRow label="Engine" value={[vinResult.displacement && `${vinResult.displacement} L`, vinResult.engineCylinders && `${vinResult.engineCylinders} cylinders`].filter(Boolean).join(" · ")}/>
                  <DetailRow label="Fuel" value={vinResult.fuelType}/>
                  <DetailRow label="Drive" value={vinResult.driveType}/>
                  <DetailRow label="Manufacturer" value={vinResult.manufacturer}/>
                  <DetailRow label="Plant country" value={vinResult.plantCountry}/>
                </dl>
                <p className="mt-4 text-xs leading-5 text-muted-foreground">Manufacturer-reported U.S. VIN data. Available fields vary; this decode does not establish exact parts fitment or repair status.</p>
              </div>
            )}
          </div>
          <div className="border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div className="autospec-eyebrow">The confidence behind every detail</div>
            <h3 className="mt-2 text-xl font-semibold">Know the source, not just the spec.</h3>
            <div className="mt-5 space-y-0">
              {[
                ["Manufacturer verified", "Sourced directly from vehicle-maker information."],
                ["Official government source", "Sourced from NHTSA or U.S. EPA records."],
                ["Verified third party", "Independently confirmed from an attributable source."],
                ["Not verified yet", "No trusted source is available for this configuration."],
              ].map(([label, description]) => (
                <div key={label} className="flex gap-3 border-t border-border py-3.5">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-primary"/>
                  <div><p className="text-sm font-semibold">{label}</p><p className="mt-0.5 text-xs leading-5 text-muted-foreground">{description}</p></div>
                </div>
              ))}
            </div>
            <p className="mt-3 border-l-2 border-accent px-3 text-xs leading-5 text-muted-foreground">For safety-critical service, verify the answer against your owner’s manual or manufacturer.</p>
          </div>
        </div>
      </section>

      <section className="autospec-container py-14">
        <div className="grid gap-5 border-b border-border pb-11 md:grid-cols-3">
          {[
            { icon: Clock3, label: "VIN decode", value: "Official NHTSA vPIC" },
            { icon: Fuel, label: "Fuel economy", value: "U.S. EPA estimates" },
            { icon: ShieldAlert, label: "Safety records", value: "NHTSA campaign history" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4">
              <Icon className="size-5 text-primary"/><div><p className="text-[11px] font-semibold uppercase text-muted-foreground">{label}</p><p className="mt-1 text-sm font-semibold">{value}</p></div>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between gap-5 pt-8 sm:flex-row sm:items-center">
          <Link to="/" className="font-display text-lg font-bold">AutoSpec</Link>
          <p className="max-w-xl text-xs leading-5 text-muted-foreground">Fuel economy estimates apply to the U.S. EPA test cycle and may differ from real-world use. Recall history is not individual VIN repair status. Data market: United States.</p>
          <Link to="/guides" className="inline-flex items-center gap-2 text-xs font-semibold text-primary">Explore guides <BookOpenText className="size-3.5"/></Link>
        </div>
      </section>
    </main>
  );
}

function PrettyLabel({ value }: { value: string }) {
  return <span className="text-[13px] font-semibold text-foreground">{value}</span>;
}

function FieldSelect({
  label,
  placeholder,
  value,
  options,
  disabled,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  options: VehicleOption[];
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div className="autospec-field">
      <PrettyLabel value={label} />
      <Select value={value || undefined} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="h-12 rounded-md border-border bg-background px-3.5 text-sm">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
