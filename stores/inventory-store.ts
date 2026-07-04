"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { UserStamp } from "@/types";
import {
  INVENTORY_SCHEMA_VERSION,
  migrateInventory,
} from "@/lib/storage";

type NewStamp = Omit<UserStamp, "id" | "createdAt" | "updatedAt">;

type InventoryStore = {
  stamps: UserStamp[];
  addStamp: (stamp: NewStamp) => UserStamp;
  removeStamp: (id: string) => void;
  /* Import JSON : fusion par id (les stamps importés remplacent
     les existants de même id). */
  importStamps: (stamps: UserStamp[]) => number;
  clear: () => void;
};

export const useInventoryStore = create<InventoryStore>()(
  persist(
    (set, get) => ({
      stamps: [],

      addStamp: (stamp) => {
        const now = new Date().toISOString();
        const created: UserStamp = {
          ...stamp,
          id: crypto.randomUUID(),
          createdAt: now,
          updatedAt: now,
        };
        set({ stamps: [created, ...get().stamps] });
        return created;
      },

      removeStamp: (id) =>
        set({ stamps: get().stamps.filter((s) => s.id !== id) }),

      importStamps: (imported) => {
        const importedIds = new Set(imported.map((s) => s.id));
        const kept = get().stamps.filter((s) => !importedIds.has(s.id));
        set({ stamps: [...imported, ...kept] });
        return imported.length;
      },

      clear: () => set({ stamps: [] }),
    }),
    {
      name: "bsr-lab-inventory",
      version: INVENTORY_SCHEMA_VERSION,
      storage: createJSONStorage(() => localStorage),
      migrate: migrateInventory,
    }
  )
);
