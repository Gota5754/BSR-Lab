"use client";

import { useState } from "react";
import { getCharacters, getTierList } from "@/lib/data";
import type { Grade } from "@/components/stamps/GradeBadge";
import { TierRow } from "./TierRow";
import { TierListFilters, type TierListFilterState } from "./TierListFilters";

/* Ordre d'affichage des tiers (la tier list du jeu n'a pas de D). */
const TIERS: Grade[] = ["S", "A", "B", "C"];

/* Board éditorial. Conçu pour accueillir plus tard d'autres sources de
   classement (tier list communautaire en V3) : il suffira de lui passer
   d'autres entrées que celles de getTierList(). */
export function TierListBoard() {
  const [filters, setFilters] = useState<TierListFilterState>({
    role: null,
    damageType: null,
  });

  const characters = getCharacters();
  const entries = getTierList()
    .map((entry) => ({
      entry,
      character: characters.find((c) => c.id === entry.characterId),
    }))
    .filter(
      (
        item
      ): item is { entry: (typeof item)["entry"]; character: NonNullable<(typeof item)["character"]> } =>
        item.character !== undefined &&
        (filters.role === null || item.character.role === filters.role) &&
        (filters.damageType === null ||
          item.character.damageType === filters.damageType)
    );

  return (
    <div className="space-y-6">
      <TierListFilters value={filters} onChange={setFilters} />
      <div>
        {TIERS.map((tier) => (
          <TierRow
            key={tier}
            tier={tier}
            entries={entries.filter(({ entry }) => entry.tier === tier)}
          />
        ))}
      </div>
    </div>
  );
}
