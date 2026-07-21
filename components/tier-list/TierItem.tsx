"use client";

import Image from "next/image";
import type { Character, TierEntry } from "@/types";
import { useLocale } from "@/lib/i18n";

type TierItemProps = {
  entry: TierEntry;
  character: Character;
};

export function TierItem({ entry, character }: TierItemProps) {
  const locale = useLocale();
  /* Note dans la langue active, repli sur le français. */
  const note = locale === "en" ? (entry.noteEn ?? entry.note) : entry.note;
  return (
    <div className="flex w-44 shrink-0 flex-col overflow-hidden rounded-[10px] border border-bsr-border bg-bsr-ink-2">
      {/* Images préoptimisées au build : pas d'optimisation Vercel.
         Fallback typographique tant que l'artwork n'est pas fourni. */}
      <div className="relative aspect-[4/3] w-full bg-bsr-ink-3">
        {character.imageUrl ? (
          <Image
            src={character.imageUrl}
            alt=""
            fill
            unoptimized
            sizes="176px"
            className="object-cover object-top"
          />
        ) : (
          <span className="heading-serif absolute inset-0 flex items-center justify-center text-4xl text-bsr-faint">
            {character.name.charAt(0)}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <p className="heading-serif text-base leading-tight text-bsr-paper">
          {character.name}
        </p>
        <p className="mt-1 text-[11px] text-bsr-muted">
          {character.role} · {character.damageType}
        </p>
        {note && (
          <p className="mt-2 text-[11px] leading-relaxed text-bsr-paper-dim">
            {note}
          </p>
        )}
      </div>
    </div>
  );
}
