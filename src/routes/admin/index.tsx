"use client";

import { useState, useEffect } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Shield, User, Database, List, FileText, AlertTriangle, Settings, Activity, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const ADMIN_SECTIONS = [
  { label: "Vehicles", href: "/admin/vehicles", icon: Database, description: "View and manage vehicle records" },
  { label: "Engines", href: "/admin/engines", icon: Settings, description: "Manage engine catalog" },
  { label: "Specifications", href: "/admin/specifications", icon: FileText, description: "Manage technical specifications" },
  { label: "Parts & Compatibility", href: "/admin/parts", icon: List, description: "Manage parts and fitment" },
  { label: "Maintenance", href: "/admin/maintenance", icon: Activity, description: "Manage maintenance schedules" },
  { label: "Fluids & Tires", href: "/admin/fluids-tires", icon: Settings, description: "Manage fluid and tire data" },
  { label: "Recalls", href: "/admin/recalls", icon: AlertTriangle, description: "Manage recall records" },
  { label: "Articles & Guides", href: "/admin/articles", icon: FileText, description: "Manage guides and articles" },
  { label: "Data Sources", href: "/admin/sources", icon: Shield, description: "Manage data source registry" },
  { label: "Import Logs", href: "/admin/imports", icon: List, description: "View data import history" },
  { label: "API Health", href: "/admin/api-health", icon: Activity, description: "Monitor external API health" },
];

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [session, setSession] = useState<any>(null);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setBusy(false);
    });
    return () => { active = false; };
  }, []);

  if (busy) {
    return (
      <div className="autospec-container py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Activity className="size-4" />
            <span>Loading admin dashboard…</span>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    window.location.href = "/login";
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="autospec-container py-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage vehicle data, specifications, parts, and content. All changes
              are audited with user, timestamp, and source.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green/10 text-green text-xs font-semibold border border-green/20">
              <span className="size-2 shrink-0 rounded-full bg-green"></span>
              System operational
            </Badge>
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              Visit site <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ADMIN_SECTIONS.map((section) => (
            <Card key={section.label} className="hover:bg-secondary/50 transition-colors group">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <section.icon className="size-5 text-primary" />
                  <div>
                    <CardTitle className="text-sm">{section.label}</CardTitle>
                    <CardDescription className="text-[10px]">{section.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="outline" size="sm" asChild className="w-full text-[11px]">
                  <Link to={section.href as any}>Open</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Quick actions</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <Button variant="outline" asChild className="text-[11px]">
              <Link to="/admin/imports">Import CSV/JSON dataset</Link>
            </Button>
            <Button variant="outline" asChild className="text-[11px]">
              <Link to="/admin/sources">Manage data sources</Link>
            </Button>
            <Button variant="outline" asChild className="text-[11px]">
              <Link to="/admin/api-health">Check API health</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={className}>{children}</span>;
}
