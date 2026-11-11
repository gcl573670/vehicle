"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ConfidenceBadge } from "./confidence-badge";
import { SourceCitation } from "./source-citation";

export interface SpecificationRow {
  specification_category: string;
  specification_name: string;
  value: string | null;
  unit: string | null;
  market: string;
  confidence_status: string;
  source_name?: string | null;
  source_url?: string | null;
  retrieved_at?: string | null;
  notes?: string | null;
  verified_at?: string | null;
}

export interface SpecificationTableProps {
  specifications: SpecificationRow[];
  category?: string;
  marketFilter?: string;
  title?: string;
  showEmptyState?: boolean;
}

export function SpecificationTable({
  specifications,
  category,
  marketFilter,
  title,
  showEmptyState = true,
}: SpecificationTableProps) {
  const filtered = specifications.filter((spec) => {
    if (category && spec.specification_category !== category) return false;
    if (marketFilter && spec.market !== marketFilter) return false;
    return true;
  });

  if (filtered.length === 0) {
    if (!showEmptyState) return null;
    return (
      <div className="rounded-md border border-border bg-background p-4 text-center">
        <p className="text-sm text-muted-foreground">
          No sourced specifications available for this selection.
        </p>
      </div>
    );
  }

  // Group by category
  const byCategory = new Map<string, SpecificationRow[]>();
  for (const spec of filtered) {
    const group = byCategory.get(spec.specification_category) ?? [];
    group.push(spec);
    byCategory.set(spec.specification_category, group);
  }

  return (
    <div className="space-y-6">
      {title && (
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      )}
      {Array.from(byCategory.entries()).map(([catName, specs]) => (
        <div key={catName} className="rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  Specification
                </TableHead>
                <TableHead className="w-1/3 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  Value
                </TableHead>
                <TableHead className="w-1/6 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  Market
                </TableHead>
                <TableHead className="w-1/6 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  Source
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {specs.map((spec) => (
                <TableRow key={spec.specification_name + spec.market}>
                  <TableCell className="text-sm text-muted-foreground">
                    {spec.specification_name}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-foreground text-right">
                    {spec.value ? `${spec.value}${spec.unit ? " " + spec.unit : ""}` : (
                      <span className="text-muted-foreground">Not specified</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground text-right">
                    {spec.market}
                  </TableCell>
                  <TableCell className="text-sm text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <ConfidenceBadge
                        status={spec.confidence_status as any}
                        showDescription={false}
                      />
                      {spec.source_name || spec.source_url ? (
                        <SourceCitation
                          sourceName={spec.source_name ?? undefined}
                          sourceUrl={spec.source_url ?? undefined}
                          retrievedAt={spec.retrieved_at ?? undefined}
                        />
                      ) : null}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
}
