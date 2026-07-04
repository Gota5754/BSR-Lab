"use client";

import {
  getPieceRules,
  getStampPassives,
  getStat,
  getSubstatPool,
} from "@/lib/data";
import {
  hasLevel25Evolution,
  singleEvolutionBudget,
  STAMP_LEVELS,
  type StampLevel,
} from "@/lib/scoring/engine";
import type { Character, StampPieceId } from "@/types";
import { SubstatInput } from "./SubstatInput";
import { cn } from "@/lib/utils";

const TEXTS = {
  pieceLegend: "Pièce",
  piecePrefix: "Stamp",
  fixedBasicPrefix: "Basic stat fixe :",
  levelLegend: "Niveau du stamp",
  levelPrefix: "Niv",
  secondBasicLabel: "2e basic stat",
  recommendedSuffix: " (recommandée)",
  substatsLegend: "Substats",
  budgetHint: (used: number, total: number) =>
    `Évolutions simples (niv 10/15/20) : ${used}/${total} réparties`,
  level25Hint: "Niv 25 : +1 automatique sur les 4 substats",
  passiveLabel: "Passif 6★",
  passivePlaceholder: "— Passif non renseigné —",
  passiveLocked: "Ascension niv 25 requise pour le passif 6★",
  passiveAffinityOk: "Affinité avec le rôle du personnage",
} as const;

const PIECES: StampPieceId[] = ["I", "II", "III"];

export type SubstatRow = { id: string; evolutions: number };

export type StampConfig = {
  piece: StampPieceId;
  level: StampLevel;
  secondBasicStatId: string;
  passiveId: string;
  rows: SubstatRow[];
};

export const emptyStampConfig = (): StampConfig => ({
  piece: "I",
  level: 1,
  secondBasicStatId: "",
  passiveId: "",
  rows: Array.from({ length: 4 }, () => ({ id: "", evolutions: 0 })),
});

type StampConfiguratorProps = {
  config: StampConfig;
  onChange: (config: StampConfig) => void;
  character: Character | undefined;
  /* Identifiant unique pour les ids DOM et labels (ex. "a", "b"). */
  uid: string;
  /* Préfixe lisible des labels en mode comparaison (ex. "Stamp A — "). */
  labelPrefix?: string;
};

export function StampConfigurator({
  config,
  onChange,
  character,
  uid,
  labelPrefix = "",
}: StampConfiguratorProps) {
  const substatPool = getSubstatPool();
  const passives = getStampPassives();
  const rules = getPieceRules(config.piece);
  const fixedBasicStat = getStat(rules.fixedBasicStat);
  const recommendedBasics = character
    ? character.recommendedBasicStats[config.piece]
    : [];
  const selectedPassive = passives.find((p) => p.id === config.passiveId);

  const budget = singleEvolutionBudget(config.level);
  const usedBudget = config.rows.reduce((sum, r) => sum + r.evolutions, 0);
  const ascended = hasLevel25Evolution(config.level);

  function selectPiece(piece: StampPieceId) {
    onChange({ ...config, piece, secondBasicStatId: "" });
  }

  function selectLevel(level: StampLevel) {
    /* Nouveau budget : on retire les évolutions excédentaires. */
    let remaining = singleEvolutionBudget(level);
    const rows = config.rows.map((row) => {
      const evolutions = Math.min(row.evolutions, remaining);
      remaining -= evolutions;
      return { ...row, evolutions };
    });
    onChange({
      ...config,
      level,
      rows,
      passiveId: hasLevel25Evolution(level) ? config.passiveId : "",
    });
  }

  function updateRow(index: number, id: string, evolutions: number) {
    onChange({
      ...config,
      rows: config.rows.map((row, i) =>
        i === index ? { id, evolutions: id === "" ? 0 : evolutions } : row
      ),
    });
  }

  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="eyebrow mb-3">{TEXTS.pieceLegend}</legend>
        <div className="flex gap-2">
          {PIECES.map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={config.piece === p}
              onClick={() => selectPiece(p)}
              className={cn(
                "flex-1 rounded-md border px-3 py-2.5 text-sm transition-colors",
                config.piece === p
                  ? "border-bsr-paper-dim bg-bsr-ink-3 text-bsr-paper"
                  : "border-bsr-border bg-bsr-ink-2 text-bsr-paper-dim hover:bg-bsr-ink-3"
              )}
            >
              {TEXTS.piecePrefix} {p}
            </button>
          ))}
        </div>
        {fixedBasicStat && (
          <p className="mt-2 text-xs text-bsr-muted">
            {TEXTS.fixedBasicPrefix} {fixedBasicStat.name}
          </p>
        )}
      </fieldset>

      <fieldset>
        <legend className="eyebrow mb-3">{TEXTS.levelLegend}</legend>
        <div className="flex flex-wrap gap-2">
          {STAMP_LEVELS.map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={config.level === l}
              onClick={() => selectLevel(l)}
              className={cn(
                "min-w-14 flex-1 rounded-md border px-2 py-2.5 text-sm transition-colors",
                config.level === l
                  ? "border-bsr-paper-dim bg-bsr-ink-3 text-bsr-paper"
                  : "border-bsr-border bg-bsr-ink-2 text-bsr-paper-dim hover:bg-bsr-ink-3"
              )}
            >
              {TEXTS.levelPrefix} {l}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor={`second-basic-${uid}`} className="eyebrow mb-3 block">
          {TEXTS.secondBasicLabel}
        </label>
        <select
          id={`second-basic-${uid}`}
          value={config.secondBasicStatId}
          onChange={(e) =>
            onChange({ ...config, secondBasicStatId: e.target.value })
          }
          className="h-10 w-full rounded-md border border-bsr-border bg-bsr-ink px-3 text-sm text-bsr-paper focus:border-bsr-paper-dim focus:outline-none"
        >
          <option value="">—</option>
          {rules.secondBasicPool.map((id) => {
            const stat = getStat(id);
            if (!stat) return null;
            return (
              <option key={id} value={id}>
                {stat.name}
                {recommendedBasics.includes(id) ? TEXTS.recommendedSuffix : ""}
              </option>
            );
          })}
        </select>
      </div>

      <fieldset>
        <legend className="eyebrow mb-3">{TEXTS.substatsLegend}</legend>
        <div className="space-y-2">
          {config.rows.map((row, index) => (
            <SubstatInput
              key={index}
              index={index}
              labelPrefix={labelPrefix}
              substats={substatPool}
              takenIds={config.rows
                .filter((_, i) => i !== index)
                .map((r) => r.id)
                .filter(Boolean)}
              selectedId={row.id}
              evolutions={row.evolutions}
              canAddEvolution={usedBudget < budget}
              hasLevel25Bonus={ascended}
              weight={
                character?.statWeights[
                  row.id as keyof typeof character.statWeights
                ] ?? 0
              }
              onChange={(id, evolutions) => updateRow(index, id, evolutions)}
            />
          ))}
        </div>
        <p className="mt-2 text-xs text-bsr-muted">
          {TEXTS.budgetHint(usedBudget, budget)}
          {ascended && (
            <span className="text-bsr-paper-dim"> · {TEXTS.level25Hint}</span>
          )}
        </p>
      </fieldset>

      <div>
        <label htmlFor={`passive-${uid}`} className="eyebrow mb-3 block">
          {TEXTS.passiveLabel}
        </label>
        <select
          id={`passive-${uid}`}
          value={config.passiveId}
          disabled={!ascended}
          onChange={(e) => onChange({ ...config, passiveId: e.target.value })}
          className="h-10 w-full rounded-md border border-bsr-border bg-bsr-ink px-3 text-sm text-bsr-paper focus:border-bsr-paper-dim focus:outline-none disabled:opacity-40"
        >
          <option value="">{TEXTS.passivePlaceholder}</option>
          {passives.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        {!ascended && (
          <p className="mt-2 text-xs text-bsr-faint">{TEXTS.passiveLocked}</p>
        )}
        {ascended && selectedPassive && (
          <p className="mt-2 text-xs leading-relaxed text-bsr-muted">
            {selectedPassive.descriptionLv1}
            {character && selectedPassive.roleAffinity === character.role && (
              <span className="mt-1 block text-bsr-paper-dim">
                ✓ {TEXTS.passiveAffinityOk}
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
