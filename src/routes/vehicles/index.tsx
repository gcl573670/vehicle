import { useState, useEffect } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Search, Filter, ChevronRight } from "lucide-react";
import { searchVehicles, getVehicleMakes } from "@/lib/autospec.functions";
import type { VehicleSearchResult, VehicleRecord } from "@/lib/autospec.functions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Pagination, PaginationContent, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";

export const Route = createFileRoute("/vehicles/")({
  component: VehicleDatabasePage,
});

function VehicleDatabasePage() {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [market, setMarket] = useState("US");
  const [vehicles, setVehicles] = useState<VehicleRecord[]>([]);
  const [makes, setMakes] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const y = searchParams.get("year");
    const m = searchParams.get("make");
    const mod = searchParams.get("model");
    const mk = searchParams.get("market");
    if (y) setYear(y);
    if (m) setMake(m);
    if (mod) setSearch(mod);
    if (mk) setMarket(mk);
  }, [searchParams]);

  useEffect(() => {
    let active = true;
    setBusy(true);
    void getVehicleMakes({ data: { market } })
      .then((res) => {
        if (!active) return;
        setMakes(res.data ?? []);
        setError(res.error ?? "");
      })
      .finally(() => {
        if (active) setBusy(false);
      });
    return () => { active = false; };
  }, [market]);

  useEffect(() => {
    let active = true;
    setBusy(true);
    void searchVehicles({
      data: {
        year: year ? Number(year) : undefined,
        make: make || undefined,
        model: search || undefined,
        market,
        page,
        pageSize,
      },
    })
      .then((res) => {
        if (!active) return;
        if (res.data) {
          setVehicles(res.data.vehicles);
          setTotal(res.data.total);
        }
        setError(res.error ?? "");
      })
      .catch(() => {
        if (active) setError("Unable to load vehicles at this time.");
      })
      .finally(() => {
        if (active) setBusy(false);
      });
    return () => { active = false; };
  }, [year, make, search, market, page, pageSize]);

  const totalPages = Math.ceil(total / pageSize);

  if (busy && vehicles.length === 0) {
    return (
      <div className="autospec-container py-20">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Search className="size-5" />
            <span>Loading vehicles…</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="autospec-container py-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">Vehicle Database</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Search and browse verified vehicle records by year, make, model, and market.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search make, model…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="h-11 rounded-md border border-input bg-background px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button onClick={() => setPage(1)}>Search</Button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-4">
          <div className="autospec-field">
            <label className="text-[11px] font-semibold text-foreground/80">Year</label>
            <Select value={year || undefined} onValueChange={(v) => { setYear(v); setPage(1); }}>
              <SelectTrigger className="h-11 rounded-md border-border bg-background px-3.5 text-sm">
                <SelectValue placeholder="Any year" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: new Date().getFullYear() - 1983 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                  <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="autospec-field">
            <label className="text-[11px] font-semibold text-foreground/80">Make</label>
            <Select value={make || undefined} onValueChange={(v) => { setMake(v); setPage(1); }}>
              <SelectTrigger className="h-11 rounded-md border-border bg-background px-3.5 text-sm">
                <SelectValue placeholder={busy && !make ? "Loading makes…" : "Any make"} />
              </SelectTrigger>
              <SelectContent>
                {makes.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="autospec-field">
            <label className="text-[11px] font-semibold text-foreground/80">Market</label>
            <Select value={market || undefined} onValueChange={(v) => { setMarket(v); setPage(1); setMakes([]); }}>
              <SelectTrigger className="h-11 rounded-md border-border bg-background px-3.5 text-sm">
                <SelectValue placeholder={market} />
              </SelectTrigger>
              <SelectContent>
                {["US", "CA", "MX", "EU", "UK", "AU", "JP"].map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button variant="outline" onClick={() => { setYear(""); setMake(""); setSearch(""); setPage(1); }}>
              Reset
            </Button>
          </div>
        </div>

        {error && <div className="mt-4 p-3 rounded-md border border-destructive/20 bg-destructive/5 text-destructive text-sm">{error}</div>}

        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Year</th>
                <th className="pb-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Make</th>
                <th className="pb-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Model</th>
                <th className="pb-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Trim</th>
                <th className="pb-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Market</th>
                <th className="pb-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-sm text-muted-foreground">
                    No vehicles match your search.
                  </td>
                </tr>
              )}
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                  <td className="py-4 text-sm font-medium text-foreground">{vehicle.year}</td>
                  <td className="py-4 text-sm text-foreground">{vehicle.make}</td>
                  <td className="py-4 text-sm text-foreground">{vehicle.model}</td>
                  <td className="py-4 text-sm text-muted-foreground">{vehicle.trim ?? "—"}</td>
                  <td className="py-4 text-sm text-muted-foreground">{vehicle.market}</td>
                  <td className="py-4 text-right">
                    <Link
                      to={{
                        to: "/cars/$makeSlug/$modelSlug/$year" as const,
                        params: {
                          makeSlug: vehicle.make.toLowerCase().replace(/\s+/g, "-"),
                          modelSlug: vehicle.model.toLowerCase().replace(/\s+/g, "-"),
                          year: String(vehicle.year),
                        },
                      }}
                      className="text-sm font-semibold text-primary hover:underline"
                    >
                      View details <ChevronRight className="size-3.5 inline ml-1" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {total > 0 && (
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {vehicles.length} of {total} vehicles
            </p>
            <Pagination>
              <PaginationContent>
                <PaginationPrevious onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1} />
                <PaginationNext onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages} />
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
