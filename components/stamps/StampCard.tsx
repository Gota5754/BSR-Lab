"use client";

import { Trash2 } from "lucide-react";
import type { UserStamp } from "@/types";
import {
  getCharacter,
  getStampPassive,
  getStampSet,
  getStat,
} from "@/lib/data";
import { getStampPassives } from "@/lib/data";
import { evaluateStamp } from "@/lib/scoring/engine";
import { useT } from "@/lib/i18n";
import { GradeBadge } from "./GradeBadge";

type StampCardProps = {
  stamp: UserStamp;
  onRemove: (id: string) => void;
};

export function StampCard({ stamp, onRemove }: StampCardProps) {
  const TEXTS = useT().stampCard;
  const set = getStampSet(stamp.setId);
  const character = stamp.targetCharacterId
    ? getCharacter(stamp.targetCharacterId)
    : undefined;
  const passive = stamp.passiveId
    ? getStampPassive(stamp.passiveId)
    : undefined;

  /* Le score n'est jamais stocké : recalculé avec les poids actuels. */
  const evaluation = character
    ? evaluateStamp(
        character,
        {
          piece: stamp.piece,
          level: stamp.level,
          secondBasicStatId: stamp.secondBasicStat,
          substats: stamp.substats,
          passiveId: stamp.passiveId,
        },
        getStampPassives()
      )
    : null;

  return (
    <div className="flex flex-col rounded-[10px] border border-bsr-border bg-bsr-ink-2 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="heading-serif truncate text-lg text-bsr-paper">
            {set ? `${set.name} — ` : ""}Stamp {stamp.piece}
          </p>
          <p className="mt-0.5 text-xs text-bsr-muted">
            {TEXTS.levelPrefix} {stamp.level} · {TEXTS.basicPrefix}{" "}
            {getStat(stamp.secondBasicStat)?.name ?? stamp.secondBasicStat}
          </p>
          <p className="mt-0.5 text-xs text-bsr-muted">
            {character
              ? `${TEXTS.targetPrefix} ${character.name}`
              : TEXTS.noTarget}
          </p>
        </div>
        {evaluation && (
          <div className="flex shrink-0 items-center gap-2">
            <div className="text-right">
              <p className="heading-serif tabular text-2xl leading-none text-bsr-paper">
                {evaluation.score.toFixed(1).replace(".", ",")}
              </p>
              <p className="tabular mt-1 text-[11px] text-bsr-muted">
                {Math.round(evaluation.potential * 100)} %{" "}
                {TEXTS.potentialShort}
              </p>
            </div>
            <GradeBadge grade={evaluation.grade} />
          </div>
        )}
      </div>

      <ul className="mt-3 space-y-1 border-t border-bsr-border pt-3 text-xs">
        {stamp.substats.map((s) => (
          <li key={s.id} className="flex justify-between">
            <span className="text-bsr-paper-dim">
              {getStat(s.id)?.name ?? s.id}
            </span>
            <span className="tabular text-bsr-muted">
              {s.evolutions + (stamp.level >= 25 ? 1 : 0)}{" "}
              {TEXTS.evolutionsShort}
            </span>
          </li>
        ))}
      </ul>

      {passive && (
        <p className="mt-2 truncate text-xs text-bsr-muted" title={passive.name}>
          6★ {passive.name}
        </p>
      )}

      <div className="mt-3 flex justify-end border-t border-bsr-border pt-3">
        <button
          type="button"
          aria-label={TEXTS.remove}
          onClick={() => onRemove(stamp.id)}
          className="rounded-md p-2 text-bsr-faint transition-colors hover:bg-bsr-ink-3 hover:text-bsr-blood"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </div>
  );
}
