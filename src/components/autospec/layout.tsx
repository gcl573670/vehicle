"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import {
  Battery,
  BookOpenText,
  Calendar,
  Gauge,
  Link as LinkIcon,
  MapPin,
  Menu,
  Search,
  ShieldAlert,
  Sparkles,
  User,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { createModelYears } from "@/lib/autospec.model";
import { VehicleSelector } from "./vehicle-selector";

const NAVIGATION = [
  { label: "Home", href: "/" },
  { label: "Find My Car", href: "#find-vehicle" },
  { label: "Vehicle Database", href: "/vehicles" },
  { label: "Specifications", href: "/tools/specifications" },
  { label: "Maintenance", href: "/tools/maintenance-schedule" },
  { label: "Parts & Compatibility", href: "/tools/parts-compatibility" },
  { label: "Calculators", href: "/tools/fuel-cost-calculator" },
  { label: "Recalls & Safety", href: "/tools/recall-checker" },
  { label: "EV Information", href: "/tools/ev-charging" },
  { label: "Guides", href: "/guides" },
];

export function AutoSpecLayout({ children }: { children: ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s ?? null);
    });
    return () => sub?.subscription?.unsubscribe?.();
  }, []);

  const selectedVehicleRaw = typeof window !== "undefined"
    ? window.sessionStorage.getItem("autospec.selected-vehicle")
    : null;
  const selectedVehicle = selectedVehicleRaw
    ? (() => { try { return JSON.parse(selectedVehicleRaw); } catch { return null; } })()
    : null;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUserMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/70 bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="autospec-container flex h-[76px] items-center justify-between gap-5">
          <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="AutoSpec home">
            <span className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground">
              <span className="font-display text-sm font-bold">A<span className="text-accent">/</span></span>
            </span>
            <span className="font-display text-[20px] font-bold tracking-[0.015em]">AutoSpec</span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            <VehicleSelector compact storageKey="autospec.selected-vehicle" />
          </div>

          <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
            {NAVIGATION.map((item) => (
              <Link
                key={item.label}
                to={item.href.startsWith("/") ? (item.href as any) : undefined}
                className="whitespace-nowrap text-[12px] font-semibold text-muted-foreground transition-colors hover:text-foreground"
                disable={!item.href.startsWith("/")}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
              <MapPin className="size-3.5" /> US market data
            </span>
            <Button variant="outline" size="sm" asChild>
              <Link to="/tools/vin-decoder">
                <Search className="size-3.5" /> Decode VIN
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              {mounted && session ? (
                <DropdownMenu open={userMenuOpen} onOpenChange={setUserMenuOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <User className="size-4" /> {session.user.email?.split("@")[0] ?? "Account"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => { setUserMenuOpen(false); window.location.href = "/account"; }}>
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { setUserMenuOpen(false); window.location.href = "/admin"; }}>
                      Admin
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={() => { window.location.href = "/login"; }}>
                    Sign in
                  </Button>
                  <Button size="sm" onClick={() => { window.location.href = "/signup"; }}>
                    Create account
                  </Button>
                </>
              )}
            </div>
          </div>

          <Button variant="ghost" size="icon" className="xl:hidden" aria-label={mobileNavOpen ? "Close menu" : "Open menu"} onClick={() => setMobileNavOpen((o) => !o)}>
            {mobileNavOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {mobileNavOpen && (
          <nav className="autospec-container grid grid-cols-2 gap-x-5 gap-y-3 pb-6 xl:hidden" aria-label="Mobile navigation">
            {NAVIGATION.map((item) => (
              <a
                key={item.label}
                href={item.href.startsWith("/") ? item.href : item.href}
                onClick={() => setMobileNavOpen(false)}
                className={`py-2 text-sm font-semibold transition-colors ${
                  item.href.startsWith("/") ? "text-foreground hover:text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="col-span-2 pt-3 border-t border-border/50 flex items-center gap-2">
              {mounted && session ? (
                <Button variant="outline" size="sm" className="flex-1" onClick={handleSignOut}>
                  Sign out
                </Button>
              ) : (
                <>
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => { window.location.href = "/login"; }}>
                    Sign in
                  </Button>
                  <Button size="sm" className="flex-1" onClick={() => { window.location.href = "/signup"; }}>
                    Create account
                  </Button>
                </>
              )}
            </div>
          </nav>
        )}
      </header>

      <div className="relative">
        <div className="absolute inset-x-0 top-0 z-[-1] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        {children}
      </div>

      <footer className="border-t border-border/70 bg-background mt-auto">
        <div className="autospec-container py-8 text-[11px] text-muted-foreground">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="font-display font-semibold tracking-tight">AutoSpec</p>
            <p className="max-w-md text-sm leading-5">
              Vehicle specifications, maintenance references, compatible parts and
              automotive tools — all sourced, never guessed.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="/guides"
                className="text-sm font-semibold text-primary hover:underline"
              >
                Guides
              </a>
              <a
                href="https://www.nhtsa.gov/recalls"
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm font-semibold text-primary hover:underline"
              >
                NHTSA Recalls
              </a>
              <a
                href="https://www.fueleconomy.gov"
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm font-semibold text-primary hover:underline"
              >
                FuelEconomy.gov
              </a>
            </div>
          </div>
          <p className="mt-4 text-[10px] text-muted-foreground/70">
            Data market: United States. NHTSA vPIC and U.S. EPA data have market
            limitations and do not claim universal global coverage. For
            safety-critical service, verify against your owner&rsquo;s manual or
            manufacturer.
          </p>
        </div>
      </footer>
    </div>
  );
}
