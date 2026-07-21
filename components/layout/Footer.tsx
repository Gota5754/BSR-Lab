"use client";

import { siteConfig } from "@/config/site";
import { useT } from "@/lib/i18n";

export function Footer() {
  const t = useT();
  return (
    <footer className="mt-auto border-t border-bsr-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-bsr-faint md:flex-row md:items-center md:justify-between md:px-6">
        <p>{t.footer.disclaimer}</p>
        <p>
          {siteConfig.name} — {t.footer.patchLine(siteConfig.currentPatch)}
        </p>
      </div>
    </footer>
  );
}
