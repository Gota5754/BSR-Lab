"use client";

import { siteConfig } from "@/config/site";
import { useT } from "@/lib/i18n";

export function DataDisclaimer() {
  const t = useT();
  return (
    <p className="mb-6 rounded-md border border-bsr-border bg-bsr-ink-2 px-3 py-2 text-xs text-bsr-muted">
      {t.dataDisclaimer(siteConfig.currentPatch)}
    </p>
  );
}
