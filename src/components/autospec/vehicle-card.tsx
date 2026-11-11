"use client";

import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export interface VehicleCardProps {
  id: string;
  year: number;
  make: string;
  model: string;
  trim?: string | null;
  market?: string;
  bodyStyle?: string | null;
  fuelType?: string | null;
  drivetrain?: string | null;
  slug?: string;
  onSelect?: () => void;
  variant?: "default" | "compact";
}

export function VehicleCard({
  id,
  year,
  make,
  model,
  trim,
  market = "US",
  bodyStyle,
  fuelType,
  drivetrain,
  slug,
  onSelect,
  variant = "default",
}: VehicleCardProps) {
  const label = `${year} ${make} ${model}${trim ? ` ${trim}` : ""}`;
  const to = slug
    ? { to: "/cars/$makeSlug/$modelSlug/$year" as const, params: { makeSlug: make.toLowerCase().replace(/\s+/g, "-"), modelSlug: model.toLowerCase().replace(/\s+/g, "-"), year: String(year) } }
    : undefined;

  const handleClick = () => {
    if (onSelect) onSelect();
  };

  return (
    <Card className="cursor-pointer hover:border-primary transition-border group">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center justify-between gap-1">
          <CardTitle className="text-sm font-semibold leading-tight">{label}</CardTitle>
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-tighter">
            {market}
          </span>
        </div>
        <div className="mt-1 flex flex-wrap gap-1.5 text-xs text-muted-foreground">
          {bodyStyle && <span>{bodyStyle}</span>}
          {drivetrain && <span>· {drivetrain}</span>}
          {fuelType && <span>· {fuelType}</span>}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {variant === "compact" ? (
          <p className="text-[10px] text-muted-foreground line-clamp-1">
            Select this vehicle to view specifications, maintenance, and parts.
          </p>
        ) : null}
      </CardContent>
      <CardFooter className="pt-3">
        <Button
          size="sm"
          asChild
          onClick={handleClick}
          className="w-full text-[11px] px-3 py-2"
        >
          {to ? (
            <Link {...to}>View details <ChevronRight className="size-3.5 inline ml-1" /></Link>
          ) : (
            <span>View details <ChevronRight className="size-3.5 inline ml-1" /></span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
