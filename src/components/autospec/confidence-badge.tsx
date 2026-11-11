"use client";

import { Badge } from "@/components/ui/badge";

type ConfidenceStatus =
  | "manufacturer_verified"
  | "official_government_source"
  | "verified_third_party_source"
  | "community_unverified"
  | "not_available";

const CONFIDENCE_CONFIG: Record<
  ConfidenceStatus,
  { label: string; variant: string; description: string }
> = {
  manufacturer_verified: {
    label: "Manufacturer verified",
    variant: "default",
    description: "Sourced directly from the vehicle manufacturer.",
  },
  official_government_source: {
    label: "Official government source",
    variant: "secondary",
    description: "Sourced from NHTSA or U.S. EPA records.",
  },
  verified_third_party_source: {
    label: "Verified third-party source",
    variant: "outline",
    description: "Independently confirmed from an attributable source.",
  },
  community_unverified: {
    label: "Community submitted — unverified",
    variant: "outline",
    description: "Submitted by the community; not yet verified.",
  },
  not_available: {
    label: "Not verified yet",
    variant: "secondary",
    description: "No trusted source is available for this configuration.",
  },
};

export function ConfidenceBadge({
  status,
  showDescription = false,
}: {
  status: ConfidenceStatus | string;
  showDescription?: boolean;
}) {
  const config =
    CONFIDENCE_CONFIG[status as ConfidenceStatus] ??
    CONFIDENCE_CONFIG.not_available;

  return (
    <span className="flex items-center gap-2 whitespace-nowrap">
      <Badge variant={config.variant as any} size="sm">
        {config.label}
      </Badge>
      {showDescription && (
        <span className="text-[10px] text-muted-foreground leading-none">
          {config.description}
        </span>
      )}
    </span>
  );
}

export function confidenceColor(status: ConfidenceStatus | string): string {
  const config =
    CONFIDENCE_CONFIG[status as ConfidenceStatus] ??
    CONFIDENCE_CONFIG.not_available;
  switch (config.variant) {
    case "default":
      return "text-primary";
    case "secondary":
      return "text-muted-foreground";
    case "outline":
      return "text-secondary-foreground";
    default:
      return "text-muted-foreground";
  }
}
