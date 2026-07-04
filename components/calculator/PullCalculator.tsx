"use client";

import { useState } from "react";
import { calcPulls, HARD_PITY, PULL_COST } from "@/lib/calculator/costs";
import { SectionCard } from "./SectionCard";
import { NumberField } from "./inputs";
import { formatNumber } from "./ResourceRow";
import { cn } from "@/lib/utils";

const TEXTS = {
  title: "Invocations",
  crystals: "Cristaux actuels",
  pity: `Pity actuelle (garantie à ${HARD_PITY})`,
  days: "Jours avant le banner",
  daily: "Cristaux gagnés / jour",
  pulls: "Pulls estimés",
  needed: "Pour la garantie",
  enough: "Suffisant",
  missing: "Manquants",
  missingCrystals: (n: string) => `Il manque ${n} cristaux (${PULL_COST}/pull).`,
} as const;

export function PullCalculator() {
  const [crystals, setCrystals] = useState(0);
  const [pity, setPity] = useState(0);
  const [days, setDays] = useState(0);
  const [daily, setDaily] = useState(30);

  const result = calcPulls({
    crystals,
    pity,
    daysUntilBanner: days,
    crystalsPerDay: daily,
  });

  return (
    <SectionCard title={TEXTS.title}>
      <div className="grid grid-cols-2 gap-3">
        <NumberField label={TEXTS.crystals} value={crystals} onChange={setCrystals} />
        <NumberField label={TEXTS.pity} value={pity} onChange={setPity} max={HARD_PITY - 1} />
        <NumberField label={TEXTS.days} value={days} onChange={setDays} />
        <NumberField label={TEXTS.daily} value={daily} onChange={setDaily} placeholder="30" />
      </div>

      <div className="mt-4 rounded-md border border-bsr-border bg-bsr-ink p-4">
        <div className="flex justify-around text-center">
          <div>
            <p className="heading-serif tabular text-3xl text-bsr-paper">
              {formatNumber(result.pulls)}
            </p>
            <p className="eyebrow mt-1">{TEXTS.pulls}</p>
          </div>
          <div>
            <p className="heading-serif tabular text-3xl text-bsr-paper-dim">
              {result.neededForGuarantee}
            </p>
            <p className="eyebrow mt-1">{TEXTS.needed}</p>
          </div>
          <div>
            <p
              className={cn(
                "heading-serif tabular text-3xl",
                result.enough ? "text-bsr-paper" : "text-bsr-blood"
              )}
            >
              {result.enough ? "✓" : `−${result.missingPulls}`}
            </p>
            <p className="eyebrow mt-1">
              {result.enough ? TEXTS.enough : TEXTS.missing}
            </p>
          </div>
        </div>
        {!result.enough && (
          <p className="mt-3 text-center text-xs text-bsr-muted">
            {TEXTS.missingCrystals(formatNumber(result.missingCrystals))}
          </p>
        )}
      </div>
    </SectionCard>
  );
}
