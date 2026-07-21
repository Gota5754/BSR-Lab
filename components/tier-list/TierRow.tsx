"use client";

import type { Character, Tier, TierEntry } from "@/types";
import { useT } from "@/lib/i18n";
import { TierBadge } from "./TierBadge";
import { TierItem } from "./TierItem";

type TierRowProps = {
  tier: Tier;
  entries: Array<{ entry: TierEntry; character: Character }>;
  /* Masquer la rangée si elle est vide (vues par type). */
  hideWhenEmpty?: boolean;
};

export function TierRow({ tier, entries, hideWhenEmpty = false }: TierRowProps) {
  const TEXTS = useT().tierList;
  if (entries.length === 0 && hideWhenEmpty) return null;
  return (
    <div className="flex flex-col gap-3 border-t border-bsr-border py-5 first:border-t-0 sm:flex-row sm:gap-5">
      <div className="shrink-0 sm:pt-1">
        <TierBadge tier={tier} />
      </div>
      {entries.length === 0 ? (
        <p className="self-center text-sm text-bsr-faint">{TEXTS.empty}</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {entries.map(({ entry, character }) => (
            <TierItem
              key={entry.characterId}
              entry={entry}
              character={character}
            />
          ))}
        </div>
      )}
    </div>
  );
}
