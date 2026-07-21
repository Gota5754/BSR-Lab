"use client";

import { Heart } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useT } from "@/lib/i18n";

export function Footer() {
  const t = useT();
  return (
    <footer className="mt-auto border-t border-bsr-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-bsr-faint md:flex-row md:items-center md:justify-between md:px-6">
        <p>{t.footer.disclaimer}</p>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
          <a
            href={siteConfig.kofi}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-bsr-paper-dim transition-colors hover:text-bsr-paper"
          >
            <Heart className="size-3.5 text-bsr-reiatsu" />
            {t.support} — Ko-fi
          </a>
          <p>
            {siteConfig.name} — {t.footer.patchLine(siteConfig.currentPatch)}
          </p>
        </div>
      </div>
    </footer>
  );
}
