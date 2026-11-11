"use client";

import { ExternalLink, Database } from "lucide-react";

export function SourceCitation({
  sourceName,
  sourceUrl,
  sourceId,
  retrievedAt,
}: {
  sourceName?: string | null;
  sourceUrl?: string | null;
  sourceId?: string | null;
  retrievedAt?: string | null;
}) {
  const hasSource = Boolean(sourceName || sourceUrl);
  if (!hasSource) return null;

  return (
    <div className="flex items-center gap-1.5 text-[10px] leading-4 text-muted-foreground">
      <Database className="size-3.5" />
      {sourceName && (
        <span>
          {sourceName}
          {sourceUrl && (
            // Use anchor for external source links instead of router link
            <a
              href={sourceUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline text-primary underline underline-offset-4 hover:text-primary/80"
            >
              source <ExternalLink className="size-3.5 inline ml-0.5" />
            </a>
          )}
        </span>
      )}
      {retrievedAt && (
        <span>· retrieved {new Date(retrievedAt).toLocaleDateString()}</span>
      )}
    </div>
  );
}

export function SourceCitationInline({
  sourceName,
  sourceUrl,
}: {
  sourceName?: string | null;
  sourceUrl?: string | null;
}) {
  if (!sourceName && !sourceUrl) return null;
  return (
    <span className="text-[10px] text-muted-foreground leading-none">
      {sourceName && sourceUrl ? (
        <>
          Source:{" "}
          <a
            href={sourceUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="text-primary underline underline-offset-4 hover:text-primary/80"
          >
            {sourceName}
          </a>
        </>
      ) : sourceName ? (
        sourceName
      ) : (
        <a
          href={sourceUrl!}
          target="_blank"
          rel="noreferrer noopener"
          className="text-primary underline underline-offset-4 hover:text-primary/80"
        >
          Source
        </a>
      )}
    </span>
  );
}
