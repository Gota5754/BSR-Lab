"use client";

import { useEffect } from "react";
import { useSettingsStore } from "@/stores/settings-store";
import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LOCALES = ["fr", "en"] as const;

export function LanguageToggle() {
  const locale = useLocale();
  const setLocale = useSettingsStore((s) => s.setLocale);

  /* Synchronise l'attribut lang du document avec la langue choisie. */
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <div
      className="flex items-center rounded-md border border-bsr-border text-xs"
      role="group"
      aria-label="Langue / Language"
    >
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={locale === l}
          onClick={() => setLocale(l)}
          className={cn(
            "px-2 py-1 uppercase transition-colors first:rounded-l-md last:rounded-r-md",
            locale === l
              ? "bg-bsr-ink-3 text-bsr-paper"
              : "text-bsr-faint hover:text-bsr-paper-dim"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
