"use client";

import { fr } from "./fr";
import { en } from "./en";
import { useSettingsStore } from "@/stores/settings-store";
import { useHydrated } from "@/hooks/useHydrated";

export type Dict = typeof fr;
export type Locale = "fr" | "en";

export { fr, en };

const DICTS: Record<Locale, Dict> = { fr, en };

/* Textes de l'UI dans la langue choisie. Le HTML statique est généré en
   français ; on ne bascule vers la préférence persistée qu'après
   hydratation pour éviter tout mismatch SSG. */
export function useT(): Dict {
  const hydrated = useHydrated();
  const locale = useSettingsStore((s) => s.locale);
  return hydrated ? DICTS[locale] : fr;
}

export function useLocale(): Locale {
  const hydrated = useHydrated();
  const locale = useSettingsStore((s) => s.locale);
  return hydrated ? locale : "fr";
}
