"use client";

import { getCharacters, getStampPassives } from "@/lib/data";
import {
  buildFocusReport,
  type CharacterFocus,
} from "@/lib/scoring/focus";
import type { StampPieceId, UserStamp } from "@/types";
import { GradeBadge } from "./GradeBadge";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const PIECES: StampPieceId[] = ["I", "II", "III"];

function formatScore(value: number): string {
  return value.toFixed(1).replace(".", ",");
}

type InventoryFocusProps = {
  stamps: UserStamp[];
};

export function InventoryFocus({ stamps }: InventoryFocusProps) {
  const TEXTS = useT().focus;
  const report = buildFocusReport(stamps, getCharacters(), getStampPassives());
  if (report.length === 0) return null;

  return (
    <section className="rounded-[10px] border border-bsr-border bg-bsr-ink-2 p-5">
      <p className="eyebrow mb-1">{TEXTS.title}</p>
      <p className="mb-4 text-xs text-bsr-faint">{TEXTS.hint}</p>
      <ul className="space-y-3">
        {report.map((focus) => (
          <FocusRow key={focus.characterId} focus={focus} />
        ))}
      </ul>
    </section>
  );
}

function FocusRow({ focus }: { focus: CharacterFocus }) {
  const TEXTS = useT().focus;
  const character = getCharacters().find((c) => c.id === focus.characterId);
  if (!character || !focus.weakest) return null;

  const weakestPiece = focus.weakest.piece;

  return (
    <li className="flex flex-col gap-2 border-t border-bsr-border pt-3 first:border-t-0 first:pt-0 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="heading-serif text-lg text-bsr-paper">
          {character.name}
        </p>
        <p
          className={cn(
            "text-xs",
            focus.weakest.equipped ? "text-bsr-muted" : "text-bsr-blood"
          )}
        >
          {focus.weakest.equipped
            ? TEXTS.weakest(weakestPiece)
            : TEXTS.missing(weakestPiece)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {PIECES.map((piece) => {
          const equipped = focus.equipped[piece];
          const isWeakest = piece === weakestPiece;
          return (
            <span
              key={piece}
              className={cn(
                "tabular inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs",
                isWeakest
                  ? equipped
                    ? "border-bsr-blood/60 text-bsr-paper-dim"
                    : "border-bsr-blood/60 text-bsr-blood"
                  : "border-bsr-border text-bsr-muted"
              )}
            >
              {piece} ·{" "}
              {equipped ? (
                <>
                  {formatScore(equipped.evaluation.score)}
                  <GradeBadge
                    grade={equipped.evaluation.grade}
                    className="size-5 rounded text-xs"
                  />
                </>
              ) : (
                "—"
              )}
            </span>
          );
        })}
      </div>
    </li>
  );
}
