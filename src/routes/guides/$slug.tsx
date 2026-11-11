import { useState, useEffect } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { FileText, Calendar, User as UserIcon, ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getPublishedArticles } from "@/lib/autospec.functions";

export const Route = createFileRoute("/guides/$slug")({
  component: GuidePage,
});

function GuidePage() {
  const params = Route.useParams();
  const slug = params.slug as string;

  const [article, setArticle] = useState<any>(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setBusy(true);
    void getPublishedArticles({ data: {} })
      .then((res) => {
        if (!active) return;
        const found = (res.data ?? []).find((a: any) => a.slug === slug);
        if (found) setArticle(found);
        else setError("Guide not found.");
        setError(res.error ?? "");
      })
      .catch(() => {
        if (active) setError("Unable to load guide.");
      })
      .finally(() => { if (active) setBusy(false); });
    return () => { active = false; };
  }, [slug]);

  if (busy) {
    return (
      <div className="autospec-container py-20">
        <div className="flex flex-col items-center justify-center text-center">
          <FileText className="size-8 text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">Loading guide…</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="autospec-container py-20">
        <div className="rounded-xl border border-border bg-background p-8 text-center">
          <h2 className="text-xl font-semibold">{error || "Guide not found"}</h2>
          <Button asChild>
            <Link to="/guides">Browse guides</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="autospec-container py-8">
        <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-6">
          <Link to="/guides" className="hover:text-primary">Guides</Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{article.title}</span>
        </nav>

        <article className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="size-4 text-muted-foreground" />
            <span className="text-[10px] font-semibold text-muted-foreground uppercase">{article.category}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-4">{article.title}</h1>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-8">
            <span>
              <UserIcon className="size-3.5 mr-1" />
              {article.author ?? "AutoSpec Editorial"}
            </span>
            <span>
              <Calendar className="size-3.5 mr-1" />
              {article.published_at ? new Date(article.published_at).toLocaleDateString() : "—"}
            </span>
          </div>
          <div className="prose prose-sm text-muted-foreground leading-7">
            {article.content.split("\n\n").map((p: string, i: number) => (
              <p key={i} className="mb-4">{p}</p>
            ))}
          </div>
          <div className="mt-10 pt-6 border-t border-border">
            <Button variant="outline" asChild>
              <Link to="/guides">← Back to guides</Link>
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
}
