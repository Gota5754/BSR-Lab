"use client";

import { Minus, Plus } from "lucide-react";
import type { Stat } from "@/types";
import {
  getWeightTier,
  MAX_SINGLE_EVOLUTIONS,
  type WeightTier,
} from "@/lib/scoring/weights";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type SubstatInputProps = {
  index: number;
  /* Préfixe des labels d'accessibilité (utile en mode comparaison). */
  labelPrefix?: string;
  /* Pool des 10 substats possibles. */
  substats: Stat[];
  /* Ids déjà choisis dans les autres lignes (exclus des options). */
  takenIds: string[];
  selectedId: string;
  /* Évolutions simples assignées (niv 10/15/20, 0-3). */
  evolutions: number;
  /* Reste-t-il du budget d'évolutions simples à répartir ? */
  canAddEvolution: boolean;
  /* Le stamp est-il niv 25+ (évolution générale automatique) ? */
  hasLevel25Bonus: boolean;
  /* Poids de la substat sélectionnée pour le personnage courant. */
  weight: number;
  onChange: (id: string, evolutions: number) => void;
};

const weightTagStyles: Record<WeightTier, string> = {
  bis: "border-bsr-reiatsu/60 text-bsr-reiatsu",
  strong: "border-bsr-paper-dim/50 text-bsr-paper-dim",
  medium: "border-bsr-border text-bsr-muted",
  weak: "border-bsr-border text-bsr-faint",
};

export function SubstatInput({
  index,
  labelPrefix = "",
  substats,
  takenIds,
  selectedId,
  evolutions,
  canAddEvolution,
  hasLevel25Bonus,
  weight,
  onChange,
}: SubstatInputProps) {
  const t = useT();
  const TEXTS = t.substat;
  const tier = selectedId ? getWeightTier(weight) : null;

  return (
    <div className="flex items-center gap-2">
      <select
        aria-label={`${labelPrefix}Substat ${index + 1}`}
        value={selectedId}
        onChange={(e) => onChange(e.target.value, evolutions)}
        className="h-10 min-w-0 flex-1 rounded-md border border-bsr-border bg-bsr-ink px-3 text-sm text-bsr-paper focus:border-bsr-paper-dim focus:outline-none"
      >
        <option value="">{TEXTS.placeholder}</option>
        {substats
          .filter((s) => s.id === selectedId || !takenIds.includes(s.id))
          .map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
      </select>

      {/* Évolutions simples (niv 10/15/20) ; le +1 du niv 25 est auto. */}
      <div
        className={cn(
          "flex h-10 items-center rounded-md border border-bsr-border",
          !selectedId && "opacity-40"
        )}
      >
        <button
          type="button"
          aria-label={TEXTS.decrease}
          disabled={!selectedId || evolutions === 0}
          onClick={() => onChange(selectedId, evolutions - 1)}
          className="flex h-full w-8 items-center justify-center text-bsr-paper-dim hover:text-bsr-paper disabled:opacity-30"
        >
          <Minus className="size-3.5" />
        </button>
        <span
          className="tabular w-6 text-center text-sm text-bsr-paper"
          aria-label={`${labelPrefix}${TEXTS.evolutionsLabel} substat ${index + 1}`}
        >
          {selectedId ? evolutions : "—"}
        </span>
        <button
          type="button"
          aria-label={TEXTS.increase}
          disabled={
            !selectedId ||
            evolutions === MAX_SINGLE_EVOLUTIONS ||
            !canAddEvolution
          }
          onClick={() => onChange(selectedId, evolutions + 1)}
          className="flex h-full w-8 items-center justify-center text-bsr-paper-dim hover:text-bsr-paper disabled:opacity-30"
        >
          <Plus className="size-3.5" />
        </button>
      </div>

      <span
        title={TEXTS.level25BonusTitle}
        className={cn(
          "tabular w-7 text-center text-xs",
          hasLevel25Bonus && selectedId ? "text-bsr-paper-dim" : "invisible"
        )}
      >
        {TEXTS.level25Bonus}
      </span>

      <span
        className={cn(
          "inline-flex w-14 justify-center rounded border px-1.5 py-0.5 text-[10px] uppercase tracking-wide",
          tier ? weightTagStyles[tier] : "invisible border-bsr-border"
        )}
      >
        {tier ? t.weightLabels[tier] : "—"}
      </span>
    </div>
  );
}
