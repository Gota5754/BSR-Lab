"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate } from "motion/react";
import type { PassiveStatus, StampEvaluation } from "@/lib/scoring/engine";
import { getStat } from "@/lib/data";
import { useT } from "@/lib/i18n";
import { GradeBadge } from "./GradeBadge";

function formatScore(value: number): string {
  return value.toFixed(1).replace(".", ",");
}

/* Jauges : orange pour la substat dominante, gris pour le reste (§3.4). */
function barTone(share: number, isTop: boolean): string {
  if (isTop && share > 0) return "bg-bsr-reiatsu";
  if (share >= 0.15) return "bg-bsr-paper-dim";
  return "bg-bsr-steel";
}

type ScoreBreakdownProps = {
  evaluation: StampEvaluation;
  /* Titre optionnel (mode comparaison : « Stamp A »). */
  title?: string;
};

export function ScoreBreakdown({ evaluation, title }: ScoreBreakdownProps) {
  const TEXTS = useT().breakdown;
  const PASSIVE_STATUS_TEXTS: Record<PassiveStatus, string> =
    TEXTS.passiveStatus;
  const [displayed, setDisplayed] = useState(0);
  const previousScore = useRef(0);
  const topShare = Math.max(...evaluation.breakdown.map((b) => b.share), 0);

  /* Compteur animé en continu : on repart de la valeur affichée
     précédente, pas de zéro (§3.4, adapté au scoring temps réel). */
  useEffect(() => {
    const controls = animate(previousScore.current, evaluation.score, {
      duration: 0.5,
      ease: "easeOut",
      onUpdate: (v) => setDisplayed(v),
    });
    previousScore.current = evaluation.score;
    return () => controls.stop();
  }, [evaluation.score]);

  return (
    <div className="rounded-[10px] border border-bsr-border bg-bsr-ink-2 p-6">
      {title && <p className="heading-serif mb-3 text-xl text-bsr-paper">{title}</p>}

      <div className="flex items-start justify-between">
        <div>
          <p className="eyebrow mb-1">{TEXTS.scoreLabel}</p>
          <p
            className={`heading-serif tabular text-6xl ${
              evaluation.grade === "S" ? "text-bsr-reiatsu" : "text-bsr-paper"
            }`}
            aria-live="polite"
          >
            {formatScore(displayed)}
          </p>
        </div>
        {/* Badge qui « claque » au changement de grade (§3.4). */}
        <motion.div
          key={evaluation.grade}
          initial={{ scale: 1.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 380, damping: 16 }}
        >
          <GradeBadge grade={evaluation.grade} size="lg" />
        </motion.div>
      </div>

      {/* Potentiel : la boussole « garder / monter » pour un stamp niv 1. */}
      <div className="mt-4 flex items-baseline justify-between border-t border-bsr-border pt-4">
        <p className="eyebrow">{TEXTS.potentialLabel}</p>
        <p className="heading-serif tabular text-3xl text-bsr-paper">
          {Math.round(evaluation.potential * 100)}
          <span className="text-lg text-bsr-muted"> %</span>
        </p>
      </div>

      <ul className="mt-3 space-y-1 text-xs text-bsr-muted">
        <li>
          {evaluation.basicStatRecommended
            ? TEXTS.basicStatOk
            : TEXTS.basicStatOff}
        </li>
        <li>
          {TEXTS.passiveLabel} :{" "}
          {PASSIVE_STATUS_TEXTS[evaluation.passiveStatus]}
        </li>
      </ul>

      <div className="mt-5 border-t border-bsr-border pt-5">
        <p className="eyebrow mb-4">{TEXTS.breakdownTitle}</p>
        {evaluation.breakdown.length === 0 ? (
          <p className="text-sm text-bsr-faint">{TEXTS.emptyBreakdown}</p>
        ) : (
          <ul className="space-y-3">
            {evaluation.breakdown.map((item) => (
              <li key={item.substatId}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-bsr-paper-dim">
                    {getStat(item.substatId)?.name ?? item.substatId}
                    <span className="ml-2 text-bsr-faint">
                      {item.evolutions} {TEXTS.evolutionsShort}
                    </span>
                  </span>
                  <span className="tabular text-bsr-muted">
                    {Math.round(item.share * 100)} %
                  </span>
                </div>
                <div className="h-1 rounded-full bg-bsr-border">
                  <motion.div
                    className={`h-1 rounded-full ${barTone(
                      item.share,
                      item.share === topShare
                    )}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.share * 100}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
