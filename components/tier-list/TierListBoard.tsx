"use client";

import { useState } from "react";
import { getCharacters, getTierList } from "@/lib/data";
import type { Character, DamageType, Tier, TierEntry } from "@/types";
import { useT } from "@/lib/i18n";
import { TierRow } from "./TierRow";
import {
  DAMAGE_TYPES,
  TierListFilters,
  type TierListFilterState,
} from "./TierListFilters";
import { cn } from "@/lib/utils";

/* Ordre d'affichage des tiers. */
const TIERS: Tier[] = ["SS", "S", "A", "B", "C", "D"];

type View = "general" | "byType";

type BoardEntry = { entry: TierEntry; character: Character };

/* Board éditorial : classement général + classement au sein de chaque
   type de dégâts. Conçu pour accueillir d'autres sources d'entrées
   (tier list communautaire V3). */
export function TierListBoard() {
  const t = useT();
  const TEXTS = t.tierList;
  const [view, setView] = useState<View>("general");
  const [filters, setFilters] = useState<TierListFilterState>({
    role: null,
    damageType: null,
  });

  const characters = getCharacters();
  const entries: BoardEntry[] = getTierList()
    .map((entry) => ({
      entry,
      character: characters.find((c) => c.id === entry.characterId),
    }))
    .filter(
      (item): item is BoardEntry =>
        item.character !== undefined &&
        (filters.role === null || item.character.role === filters.role) &&
        (filters.damageType === null ||
          item.character.damageType === filters.damageType)
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        <div className="flex gap-1.5" role="group" aria-label={TEXTS.viewLabel}>
          {(
            [
              ["general", TEXTS.generalTab],
              ["byType", TEXTS.byTypeTab],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              aria-pressed={view === key}
              onClick={() => setView(key)}
              className={cn(
                "rounded-md border px-4 py-2 text-sm transition-colors",
                view === key
                  ? "border-bsr-paper-dim bg-bsr-ink-3 text-bsr-paper"
                  : "border-bsr-border bg-bsr-ink-2 text-bsr-paper-dim hover:bg-bsr-ink-3"
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <TierListFilters value={filters} onChange={setFilters} />
      </div>

      {view === "general" ? (
        <div>
          {TIERS.map((tier) => (
            <TierRow
              key={tier}
              tier={tier}
              entries={entries.filter(({ entry }) => entry.tier === tier)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-10">
          {DAMAGE_TYPES.map((damageType) => (
            <TypeSection
              key={damageType}
              damageType={damageType}
              entries={entries.filter(
                ({ character }) => character.damageType === damageType
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TypeSection({
  damageType,
  entries,
}: {
  damageType: DamageType;
  entries: BoardEntry[];
}) {
  if (entries.length === 0) return null;
  return (
    <section>
      <h2 className="heading-serif mb-2 text-2xl text-bsr-paper">
        {damageType}
      </h2>
      {TIERS.map((tier) => (
        <TierRow
          key={tier}
          tier={tier}
          hideWhenEmpty
          entries={entries.filter(({ entry }) => entry.typeTier === tier)}
        />
      ))}
    </section>
  );
}
