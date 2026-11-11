"use client";

import { useState, useEffect } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { User, Vehicle, Calendar, Shield, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/account/")({
  component: AccountPage,
});

function AccountPage() {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      if (data.session) {
        supabase
          .from("user_profiles")
          .select("*")
          .eq("id", data.session.user.id)
          .single()
          .then(({ data: p }) => {
            if (active) setProfile(p);
          });
      }
      setBusy(false);
    });
    return () => { active = false; };
  }, []);

  if (busy) return null;
  if (!session) {
    window.location.href = "/login";
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="autospec-container py-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">Account</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage your profile, saved vehicles, and maintenance records.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 p-4">
                <div className="flex items-center gap-4">
                  <div className="flex shrink-0 items-center justify-center size-16 rounded-full bg-secondary text-secondary-foreground">
                    <User className="size-8" />
                  </div>
                  <div>
                    <p className="font-semibold">{session.user.email}</p>
                    <p className="text-xs text-muted-foreground">
                      Member since {new Date(session.user.created_at ?? Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-md border border-border/60">
                    <span className="text-sm text-muted-foreground">Preferred market</span>
                    <Input
                      value={profile?.preferred_market ?? "US"}
                      disabled
                      className="h-9 text-sm bg-transparent"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="w-full text-[11px]">
                    Sign out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Saved vehicles</CardTitle>
                  <CardDescription>Vehicles you've saved for quick reference.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    No saved vehicles yet.
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Maintenance history</CardTitle>
                  <CardDescription>Your recorded service history.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    No maintenance records yet.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
