"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Locale = "fr" | "en";

type SettingsStore = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      locale: "fr",
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: "bsr-lab-settings",
      version: 1,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
