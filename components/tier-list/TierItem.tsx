import Image from "next/image";
import type { Character, TierEntry } from "@/types";

type TierItemProps = {
  entry: TierEntry;
  character: Character;
};

export function TierItem({ entry, character }: TierItemProps) {
  return (
    <div className="flex w-44 shrink-0 flex-col overflow-hidden rounded-[10px] border border-bsr-border bg-bsr-ink-2">
      {/* Images préoptimisées au build : pas d'optimisation Vercel. */}
      <div className="relative aspect-[4/3] w-full bg-bsr-ink-3">
        <Image
          src={character.imageUrl}
          alt=""
          fill
          unoptimized
          sizes="176px"
          className="object-cover object-top"
        />
      </div>
      <div className="flex flex-1 flex-col p-3">
        <p className="heading-serif text-base leading-tight text-bsr-paper">
          {character.name}
        </p>
        <p className="mt-1 text-[11px] text-bsr-muted">
          {character.role} · {character.damageType}
        </p>
        {entry.note && (
          <p className="mt-2 text-[11px] leading-relaxed text-bsr-paper-dim">
            {entry.note}
          </p>
        )}
      </div>
    </div>
  );
}
