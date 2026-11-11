import { useState, useEffect } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { BookOpenText, FileText, Clock, Wrench, Battery, Fuel, Zap, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getPublishedArticles } from "@/lib/autospec.functions";

const GUIDE_CATEGORIES = [
  { id: "tire-care", label: "Tire care", icon: Clock, description: "Tire pressure, rotation, tread wear, and replacement." },
  { id: "battery-maintenance", label: "Battery maintenance", icon: Battery, description: "Group size, terminal care, testing, and replacement." },
  { id: "engine-oil", label: "Engine oil", icon: FileText, description: "Viscosity, specifications, capacity, and change intervals." },
  { id: "cooling-systems", label: "Cooling systems", icon: Zap, description: "Coolant type, capacity, and radiator maintenance." },
  { id: "brakes", label: "Brakes", icon: Shield, description: "Brake pad, rotor, and fluid maintenance." },
  { id: "spark-plugs", label: "Spark plugs", icon: FileText, description: "Part numbers, gaps, heat ranges, and replacement." },
  { id: "wipers", label: "Wipers", icon: Wrench, description: "Blade sizes, fitment, and replacement." },
  { id: "vehicle-maintenance", label: "Vehicle maintenance", icon: Wrench, description: "General maintenance schedules and best practices." },
  { id: "fuel-economy", label: "Fuel economy", icon: Fuel, description: "MPG, fuel types, and efficiency tips." },
  { id: "ev-ownership", label: "EV ownership", icon: Zap, description: "Charging, range, and EV maintenance." },
] as const;

export const Route = createFileRoute("/guides/")({
  component: GuidesPage,
});

function GuidesPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setBusy(true);
    void getPublishedArticles({ data: {} })
      .then((res) => {
        if (!active) return;
        setArticles(res.data ?? []);
        setError(res.error ?? "");
      })
      .finally(() => { if (active) setBusy(false); });
    return () => { active = false; };
  }, []);

  if (busy) {
    return (
      <div className="autospec-container py-20">
        <div className="flex flex-col items-center justify-center text-center">
          <BookOpenText className="size-8 text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">Loading guides…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="autospec-container py-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">Guides</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Practical automotive maintenance and ownership guides. All guides
              are reviewed before publishing.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {GUIDE_CATEGORIES.map((cat) => {
            const catArticles = articles.filter((a) => a.category === cat.id);
            return (
              <Card key={cat.id} className="flex flex-col group hover:bg-secondary/50 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <cat.icon className="size-5 text-primary" />
                    <span className="font-semibold">{cat.label}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">{cat.description}</p>
                </CardHeader>
                <CardContent className="flex-1 pt-0">
                  <p className="text-xs text-muted-foreground">
                    {catArticles.length} article{catArticles.length !== 1 ? "s" : ""} available
                  </p>
                </CardContent>
                <CardFooter className="pt-3">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/guides" className="w-full text-[11px]">Browse {cat.label}</Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-4">Latest guides</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 6).map((article) => (
              <Card key={article.id} className="hover:bg-secondary/50 transition-colors">
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="size-4 text-muted-foreground" />
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase">{article.category}</span>
                  </div>
                  <CardTitle className="text-sm">{article.title}</CardTitle>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{article.content.slice(0, 120)}…</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">
                      {article.published_at ? new Date(article.published_at).toLocaleDateString() : "—"}
                    </span>
                    <Button variant="link" size="sm" asChild>
                      <Link to={`/guides/${article.slug}`}>Read more</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {articles.length === 0 && (
              <div className="col-span-full py-8 text-center text-sm text-muted-foreground">
                No published guides yet. Check back soon.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
