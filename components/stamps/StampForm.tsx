"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeftRight, Check, Save, X } from "lucide-react";
import { getCharacters, getStampPassives, getStampSet } from "@/lib/data";
import { evaluateStamp, type StampEvaluation } from "@/lib/scoring/engine";
import { useInventoryStore } from "@/stores/inventory-store";
import type { StatId } from "@/types";
import { CharacterPicker } from "./CharacterPicker";
import {
  emptyStampConfig,
  StampConfigurator,
  type StampConfig,
} from "./StampConfigurator";
import { ScoreBreakdown } from "./ScoreBreakdown";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function evaluate(
  config: StampConfig,
  characterId: string
): StampEvaluation | null {
  const character = getCharacters().find((c) => c.id === characterId);
  if (!character || !config.secondBasicStatId) return null;
  return evaluateStamp(
    character,
    {
      piece: config.piece,
      level: config.level,
      secondBasicStatId: config.secondBasicStatId,
      substats: config.rows.filter((r) => r.id !== ""),
      passiveId: config.passiveId || undefined,
    },
    getStampPassives()
  );
}

type Verdict = {
  winner: "A" | "B" | null;
  deltaScore: number;
  byPotential: boolean;
};

function computeVerdict(a: StampEvaluation, b: StampEvaluation): Verdict {
  const deltaScore = Math.round((a.score - b.score) * 10) / 10;
  if (deltaScore !== 0) {
    return { winner: deltaScore > 0 ? "A" : "B", deltaScore, byPotential: false };
  }
  if (a.potential !== b.potential) {
    return {
      winner: a.potential > b.potential ? "A" : "B",
      deltaScore: 0,
      byPotential: true,
    };
  }
  return { winner: null, deltaScore: 0, byPotential: false };
}

export function StampForm() {
  const TEXTS = useT().rater;
  const characters = getCharacters();

  const [characterId, setCharacterId] = useState(characters[0]?.id ?? "");
  const [configA, setConfigA] = useState<StampConfig>(emptyStampConfig());
  const [configB, setConfigB] = useState<StampConfig>(emptyStampConfig());
  const [compareMode, setCompareMode] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const savedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const addStamp = useInventoryStore((s) => s.addStamp);

  useEffect(() => {
    return () => {
      if (savedTimer.current) clearTimeout(savedTimer.current);
    };
  }, []);

  function handleSave() {
    addStamp({
      setId: "",
      piece: configA.piece,
      level: configA.level,
      secondBasicStat: configA.secondBasicStatId as StatId,
      substats: configA.rows
        .filter((r) => r.id !== "")
        .map((r) => ({ id: r.id as StatId, evolutions: r.evolutions })),
      passiveId: configA.passiveId || undefined,
      targetCharacterId: characterId,
    });
    setJustSaved(true);
    if (savedTimer.current) clearTimeout(savedTimer.current);
    savedTimer.current = setTimeout(() => setJustSaved(false), 2000);
  }

  const character = characters.find((c) => c.id === characterId);

  /* Scoring temps réel : recalculé à chaque changement du formulaire. */
  const evalA = useMemo(
    () => evaluate(configA, characterId),
    [configA, characterId]
  );
  const evalB = useMemo(
    () => (compareMode ? evaluate(configB, characterId) : null),
    [configB, characterId, compareMode]
  );

  const verdict =
    compareMode && evalA && evalB ? computeVerdict(evalA, evalB) : null;

  function handleReset() {
    setConfigA(emptyStampConfig());
    setConfigB(emptyStampConfig());
  }

  return (
    <div className="space-y-8">
      <CharacterPicker
        characters={characters}
        selectedId={characterId}
        onSelect={setCharacterId}
      />

      {/* Sets recommandés du personnage : information, pas une saisie. */}
      {character && character.recommendedSets.length > 0 && (
        <div>
          <p className="eyebrow mb-3">{TEXTS.recommendedSets}</p>
          <ul className="flex flex-wrap gap-2">
            {[...character.recommendedSets]
              .sort((a, b) => a.priority - b.priority)
              .map((rec) => {
                const set = getStampSet(rec.setId);
                if (!set) return null;
                return (
                  <li
                    key={rec.setId}
                    title={rec.note}
                    className={cn(
                      "rounded-md border px-3 py-1.5 text-xs",
                      rec.priority === 1
                        ? "border-bsr-paper-dim/50 text-bsr-paper"
                        : "border-bsr-border text-bsr-paper-dim"
                    )}
                  >
                    <span className="tabular text-bsr-muted">
                      {rec.priority}.
                    </span>{" "}
                    {set.name}
                  </li>
                );
              })}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          aria-pressed={compareMode}
          onClick={() => setCompareMode((v) => !v)}
          className={cn(
            "inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm transition-colors",
            compareMode
              ? "border-bsr-paper-dim bg-bsr-ink-3 text-bsr-paper"
              : "border-bsr-border bg-bsr-ink-2 text-bsr-paper-dim hover:bg-bsr-ink-3"
          )}
        >
          {compareMode ? (
            <X className="size-4" />
          ) : (
            <ArrowLeftRight className="size-4" />
          )}
          {compareMode ? TEXTS.compareOff : TEXTS.compareOn}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-md border border-bsr-border px-4 py-2 text-sm text-bsr-paper-dim transition-colors hover:bg-bsr-ink-3 hover:text-bsr-paper"
        >
          {TEXTS.reset}
        </button>
      </div>

      {compareMode ? (
        <div className="space-y-6">
          {/* Verdict en tête : c'est la réponse qu'on est venu chercher. */}
          {verdict && evalA && evalB ? (
            <div className="rounded-[10px] border border-bsr-border bg-bsr-ink-2 p-5">
              <p className="heading-serif text-2xl text-bsr-paper">
                {verdict.winner === null
                  ? TEXTS.verdictTie
                  : TEXTS.verdictKeep(
                      verdict.winner === "A" ? TEXTS.stampA : TEXTS.stampB
                    )}
              </p>
              <p className="mt-1 text-xs text-bsr-muted">
                {verdict.winner !== null &&
                  (verdict.byPotential
                    ? TEXTS.verdictPotential
                    : TEXTS.verdictDelta(
                        Math.abs(verdict.deltaScore)
                          .toFixed(1)
                          .replace(".", ",")
                      ))}
                {configA.piece !== configB.piece && (
                  <span className="mt-1 block text-bsr-blood">
                    {TEXTS.verdictPieceWarning}
                  </span>
                )}
              </p>
            </div>
          ) : (
            <div className="rounded-[10px] border border-dashed border-bsr-border p-5 text-sm text-bsr-faint">
              {TEXTS.emptyStateCompare}
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-2">
            {(
              [
                ["a", TEXTS.stampA, configA, setConfigA, evalA],
                ["b", TEXTS.stampB, configB, setConfigB, evalB],
              ] as const
            ).map(([uid, label, config, setConfig, evaluation]) => (
              <div
                key={uid}
                className={cn(
                  "space-y-6 rounded-[10px] border p-5",
                  verdict?.winner === uid.toUpperCase()
                    ? "border-bsr-paper-dim"
                    : "border-bsr-border"
                )}
              >
                <p className="heading-serif text-xl text-bsr-paper">{label}</p>
                <StampConfigurator
                  config={config}
                  onChange={setConfig}
                  character={character}
                  uid={uid}
                  labelPrefix={`${label} — `}
                />
                {evaluation && (
                  <ScoreBreakdown evaluation={evaluation} title={label} />
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <StampConfigurator
            config={configA}
            onChange={setConfigA}
            character={character}
            uid="a"
          />
          <div>
            {evalA ? (
              <div className="space-y-3 lg:sticky lg:top-20">
                <ScoreBreakdown evaluation={evalA} />
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={justSaved}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-bsr-border px-4 py-2.5 text-sm text-bsr-paper-dim transition-colors hover:bg-bsr-ink-3 hover:text-bsr-paper disabled:opacity-70"
                >
                  {justSaved ? (
                    <>
                      <Check className="size-4" /> {TEXTS.saved}
                    </>
                  ) : (
                    <>
                      <Save className="size-4" /> {TEXTS.save}
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="rounded-[10px] border border-dashed border-bsr-border p-6 text-sm text-bsr-faint">
                {TEXTS.emptyState}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
