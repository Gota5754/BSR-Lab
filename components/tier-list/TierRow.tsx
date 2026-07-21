"use client";

import type { Character, TierEntry } from "@/types";
import { GradeBadge, type Grade } from "@/components/stamps/GradeBadge";
import { useT } from "@/lib/i18n";
import { TierItem } from "./TierItem";

type TierRowProps = {
  tier: Grade;
  entries: Array<{ entry: TierEntry; character: Character }>;
};

export function TierRow({ tier, entries }: TierRowProps) {
  const TEXTS = useT().tierList;
  return (
    <div className="flex flex-col gap-3 border-t border-bsr-border py-5 first:border-t-0 sm:flex-row sm:gap-5">
      <div className="shrink-0 sm:pt-1">
        <GradeBadge grade={tier} size="lg" />
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
