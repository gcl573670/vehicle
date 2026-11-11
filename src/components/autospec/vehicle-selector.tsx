"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  getVehicleMakes,
  getVehicleModels,
  getVehicleTrims,
  getVehicleEngines,
} from "@/lib/autospec.functions";
import { createModelYears, isValidVin } from "@/lib/autospec.model";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin, Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type VehicleSelection = {
  year: number;
  make: string;
  model: string;
  trim?: string | null;
  engineId?: string | null;
  market: string;
  fuelEconomyId?: number | null;
};

type FieldSelectProps = {
  label: string;
  placeholder: string;
  value: string;
  options: { id: string; name: string }[];
  disabled?: boolean;
  onChange: (value: string) => void;
  hint?: string;
};

function FieldSelect({
  label,
  placeholder,
  value,
  options,
  disabled,
  onChange,
  hint,
}: FieldSelectProps) {
  return (
    <div className="autospec-field">
      <label className="text-[11px] font-semibold text-foreground/80">
        {label}
      </label>
      <Select value={value || undefined} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="h-11 rounded-md border-border bg-background px-3.5 text-sm">
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
      {hint && <p className="text-[10px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

export interface VehicleSelectorProps {
  className?: string;
  initialSelection?: Partial<VehicleSelection>;
  onChange?: (selection: VehicleSelection) => void;
  showVinAlternative?: boolean;
  compact?: boolean;
  storageKey?: string;
  defaultMarket?: string;
}

export function VehicleSelector({
  className,
  initialSelection,
  onChange,
  showVinAlternative = true,
  compact = false,
  storageKey = "autospec.selected-vehicle",
  defaultMarket = "US",
}: VehicleSelectorProps) {
  const currentYear = new Date().getFullYear();
  const modelYears = useMemo(() => createModelYears(currentYear), [currentYear]);

  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [trim, setTrim] = useState("");
  const [engineId, setEngineId] = useState("");
  const [market, setMarket] = useState(defaultMarket);

  const [makes, setMakes] = useState<{ id: string; name: string }[]>([]);
  const [models, setModels] = useState<{ id: string; name: string }[]>([]);
  const [trims, setTrims] = useState<{ id: string; name: string }[]>([]);
  const [engines, setEngines] = useState<{ id: string; name: string }[]>([]);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const initializedRef = useRef(false);

  const markets = [
    { id: "US", name: "United States" },
    { id: "CA", name: "Canada" },
    { id: "MX", name: "Mexico" },
    { id: "EU", name: "European Union" },
    { id: "UK", name: "United Kingdom" },
    { id: "AU", name: "Australia" },
    { id: "JP", name: "Japan" },
  ];

  // Initialize from stored selection or props
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const stored =
      typeof window !== "undefined"
        ? window.sessionStorage.getItem(storageKey)
        : null;
    const initial = initialSelection ?? (stored ? (() => { try { return JSON.parse(stored); } catch { return null; } })() : null);

    if (initial) {
      if (initial.year) setYear(String(initial.year));
      if (initial.make) setMake(initial.make);
      if (initial.model) setModel(initial.model);
      if (initial.trim) setTrim(initial.trim);
      if (initial.engineId) setEngineId(initial.engineId);
      if (initial.market) setMarket(initial.market);
      if (onChange) {
        onChange({
          year: Number(initial.year) || 0,
          make: initial.make ?? "",
          model: initial.model ?? "",
          ...(initial.trim ? { trim: initial.trim } : {}),
          ...(initial.engineId ? { engineId: initial.engineId } : {}),
          market: initial.market ?? defaultMarket,
          ...(initial.fuelEconomyId !== undefined ? { fuelEconomyId: initial.fuelEconomyId } : {}),
        });
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const persistSelection = useCallback(
    (sel: VehicleSelection) => {
      try {
        window.sessionStorage.setItem(storageKey, JSON.stringify(sel));
      } catch {
        // storage restricted; keep in memory only
      }
      if (onChange) onChange(sel);
    },
    [onChange, storageKey],
  );

  const resetDependents = useCallback((keepYear?: boolean, keepMake?: boolean, keepModel?: boolean) => {
    if (!keepYear) { setMake(""); setModels([]); }
    if (!keepMake) { setModel(""); setTrims([]); }
    if (!keepModel) { setTrim(""); setEngineId(""); setEngines([]); }
    setError("");
  }, []);

  // Load makes when year changes
  useEffect(() => {
    if (!year) {
      resetDependents(true, false, false);
      setMakes([]);
      return;
    }
    let active = true;
    setBusy(true);
    void getVehicleMakes({ data: { year: Number(year), market } })
      .then((res) => {
        if (!active) return;
        setMakes((res.data ?? []).map((m) => ({ id: m, name: m })));
        setError(res.error ?? "");
      })
      .catch(() => {
        if (active) setError("Vehicle data is temporarily unavailable.");
      })
      .finally(() => {
        if (active) setBusy(false);
      });
    return () => { active = false; };
  }, [year, market, resetDependents]);

  // Load models when year+make change
  useEffect(() => {
    if (!year || !make) {
      resetDependents(false, true, false);
      setModels([]);
      return;
    }
    let active = true;
    setBusy(true);
    void getVehicleModels({ data: { year: Number(year), make, market } })
      .then((res) => {
        if (!active) return;
        setModels((res.data ?? []).map((m) => ({ id: m, name: m })));
        setError(res.error ?? "");
      })
      .catch(() => {
        if (active) setError("Vehicle data is temporarily unavailable.");
      })
      .finally(() => {
        if (active) setBusy(false);
      });
    return () => { active = false; };
  }, [year, make, market, resetDependents]);

  // Load trims when year+make+model change
  useEffect(() => {
    if (!year || !make || !model) {
      resetDependents(false, false, true);
      setTrims([]);
      return;
    }
    let active = true;
    setBusy(true);
    void getVehicleTrims({ data: { year: Number(year), make, model, market } })
      .then((res) => {
        if (!active) return;
        setTrims((res.data ?? []).map((t) => ({ id: t, name: t })));
        setError(res.error ?? "");
      })
      .catch(() => {
        if (active) setError("Vehicle data is temporarily unavailable.");
      })
      .finally(() => {
        if (active) setBusy(false);
      });
    return () => { active = false; };
  }, [year, make, model, market, resetDependents]);

  // Load engines when trims load
  useEffect(() => {
    setBusy(true);
    void getVehicleEngines()
      .then((res) => {
        setEngines((res.data ?? []).map((e) => ({
          id: e.id,
          name: [
            e.manufacturer ?? "",
            e.engine_code ?? "",
            e.displacement ? `${e.displacement}L` : "",
            e.cylinders ? `${e.cylinders} cyl` : "",
            e.fuel_type ?? "",
          ].filter(Boolean).join(" - ") || "Engine",
        })));
        setError(res.error ?? "");
      })
      .catch(() => setEngines([]))
      .finally(() => setBusy(false));
  }, []);

  const selectionReady = Boolean(year && make && model);

  const handleSelect = useCallback(() => {
    if (!selectionReady) return;
    const sel: VehicleSelection = {
      year: Number(year),
      make,
      model,
      ...(trim ? { trim } : {}),
      ...(engineId ? { engineId } : {}),
      market,
    };
    persistSelection(sel);
  }, [year, make, model, trim, engineId, market, selectionReady, persistSelection]);

  return (
    <div
      className={cn(
        "grid gap-3 sm:grid-cols-2 xl:grid-cols-5 border border-border/60 rounded-xl bg-background p-4 shadow-sm",
        className,
      )}
    >
      <div className="col-span-5 sm:col-span-2 xl:col-span-1 flex flex-col">
        <FieldSelect
          label="Year"
          placeholder="Select year"
          value={year}
          options={modelYears.map((y) => ({ id: String(y), name: String(y) }))}
          disabled={busy}
          onChange={(v) => {
            setYear(v);
            resetDependents(true, false, false);
          }}
        />
      </div>
      <div className="col-span-5 sm:col-span-2 xl:col-span-1 flex flex-col">
        <FieldSelect
          label="Make"
          placeholder={busy && year ? "Loading makes…" : "Select make"}
          value={make}
          options={makes}
          disabled={!year || busy}
          onChange={(v) => {
            setMake(v);
            resetDependents(false, true, false);
          }}
        />
      </div>
      <div className="col-span-5 sm:col-span-2 xl:col-span-1 flex flex-col">
        <FieldSelect
          label="Model"
          placeholder="Select model"
          value={model}
          options={models}
          disabled={!make || busy}
          onChange={(v) => {
            setModel(v);
            resetDependents(false, false, true);
          }}
        />
      </div>
      <div className="col-span-5 sm:col-span-1 xl:col-span-1 flex flex-col">
        <FieldSelect
          label="Trim"
          placeholder="Select trim"
          value={trim}
          options={trims}
          disabled={!model || busy}
          onChange={setTrim}
        />
      </div>
      <div className="col-span-5 sm:col-span-1 xl:col-span-1 flex flex-col">
        <FieldSelect
          label="Market"
          placeholder="Market"
          value={market}
          options={markets.map((m) => ({ id: m.id, name: m.name }))}
          onChange={(v) => {
            setMarket(v);
            resetDependents(false, false, false);
          }}
        />
      </div>
      <div className="col-span-5 sm:col-span-2 xl:col-span-1 flex flex-col">
        <FieldSelect
          label="Engine"
          placeholder="Select engine (optional)"
          value={engineId}
          options={engines}
          disabled={busy}
          onChange={setEngineId}
          hint="Engine-specific data when available"
        />
      </div>
      <div className="col-span-5 sm:col-span-2 xl:col-span-1 flex items-end">
        <Button
          size={compact ? "sm" : "default"}
          disabled={!selectionReady || busy}
          onClick={handleSelect}
          className="w-full text-sm font-medium"
        >
          {busy ? "Loading…" : "Use this vehicle"}
        </Button>
      </div>
      {error && (
        <div className="col-span-full text-[11px] text-destructive">{error}</div>
      )}
      {!selectionReady && !busy && (
        <p className="col-span-full text-[11px] text-muted-foreground">
          Select a complete vehicle configuration to continue.
        </p>
      )}
    </div>
  );
}

export function VINInput({
  onDecode,
  placeholder = "Enter 17-character VIN",
  disabled = false,
}: {
  onDecode: (vin: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  const [vin, setVin] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = vin.trim().toUpperCase();
    if (!isValidVin(normalized)) {
      setError("Enter a 17-character VIN. The letters I, O and Q are not used.");
      return;
    }
    setError("");
    onDecode(normalized);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
      <input
        ref={inputRef}
        autoComplete="off"
        spellCheck={false}
        maxLength={17}
        value={vin}
        onChange={(e) => setVin(e.target.value.toUpperCase())}
        placeholder={placeholder}
        disabled={disabled}
        className="h-11 min-w-0 flex-1 rounded-md border border-input bg-background px-4 font-mono text-sm uppercase placeholder:font-sans placeholder:normal-case placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <Button type="submit" disabled={disabled || !isValidVin(vin.trim())} size="sm">
        <Search className="size-4" />
      </Button>
      {error && <span className="text-[11px] text-destructive">{error}</span>}
    </form>
  );
}
