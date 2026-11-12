"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  getVehicleMakes,
  getVehicleModels,
} from "@/lib/autospec.functions";
import { createModelYears } from "@/lib/autospec.model";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin, Search } from "lucide-react";
import { cn } from "@/lib/utils";

type HeaderVehicleSelectorProps = {
  storageKey?: string;
  className?: string;
};

const markets = [
  { id: "US", name: "US" },
  { id: "CA", name: "CA" },
  { id: "MX", name: "MX" },
  { id: "EU", name: "EU" },
];

export function HeaderVehicleSelector({
  storageKey = "autospec.selected-vehicle",
  className,
}: HeaderVehicleSelectorProps) {
  const currentYear = new Date().getFullYear();
  const modelYears = useMemo(() => createModelYears(currentYear), [currentYear]);

  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [market, setMarket] = useState("US");

  const [makes, setMakes] = useState<{ id: string; name: string }[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!year) {
      setMakes([]);
      return;
    }
    let active = true;
    setBusy(true);
    void getVehicleMakes({ data: { year: Number(year), market } })
      .then((res) => {
        if (!active) return;
        setMakes((res.data ?? []).map((m) => ({ id: m, name: m })));
      })
      .catch(() => setMakes([]))
      .finally(() => { if (active) setBusy(false); });
    return () => { active = false; };
  }, [year, market]);

  const persist = useCallback(() => {
    if (!year || !make) return;
    const sel = { year: Number(year), make, model: "", market };
    try {
      window.sessionStorage.setItem(storageKey, JSON.stringify(sel));
    } catch { /* storage restricted */ }
  }, [year, make, market, storageKey]);

  return (
    <div
      className={cn(
        "flex items-center gap-2 border border-border/60 rounded-lg bg-background px-2 py-1.5 shadow-sm",
        className,
      )}
    >
      <Select
        value={year || undefined}
        onValueChange={(v) => { setYear(v); setMake(""); }}
        disabled={busy}
      >
        <SelectTrigger className="h-9 min-w-[72px] rounded-md border-border bg-transparent px-2 text-[11px] shadow-sm">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          {modelYears.map((y) => (
            <SelectItem key={y} value={String(y)}>{String(y)}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={make || undefined}
        onValueChange={setMake}
        disabled={!year || busy}
      >
        <SelectTrigger className="h-9 min-w-[100px] rounded-md border-border bg-transparent px-2 text-[11px] shadow-sm">
          <SelectValue placeholder={busy && year ? "Loading…" : "Make"} />
        </SelectTrigger>
        <SelectContent>
          {makes.map((m) => (
            <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        size="sm"
        disabled={!year || !make || busy}
        onClick={() => {
          persist();
          window.location.href = "/vehicles";
        }}
        className="h-9 px-2.5 text-[11px] font-medium"
      >
        <MapPin className="size-3.5" /> Go
      </Button>

      {year && !make && !busy && (
        <span className="text-[10px] text-muted-foreground">Select make</span>
      )}
    </div>
  );
}
