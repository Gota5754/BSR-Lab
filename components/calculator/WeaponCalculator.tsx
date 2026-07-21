"use client";

import { useState } from "react";
import {
  calcWeaponCost,
  expFromTamahagane,
  LEVEL_STEPS,
  tamahaganeExp,
  WEAPON_MIN_LEVEL,
  type BookCounts,
} from "@/lib/calculator/costs";
import { SectionCard } from "./SectionCard";
import { LevelSelect } from "./inputs";
import { formatNumber, ResourceRow } from "./ResourceRow";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const zeroCounts: BookCounts = { green: 0, blue: 0, purple: 0, yellow: 0 };

/* Les armes commencent au niveau 20. */
const WEAPON_LEVEL_STEPS = LEVEL_STEPS.filter((l) => l >= WEAPON_MIN_LEVEL);

export function WeaponCalculator() {
  const base = useT().calc.weapon;
  const TEXTS = {
    ...base,
    tamaGreen: base.tamaItem(base.tamaColors.green, formatNumber(tamahaganeExp.green)),
    tamaBlue: base.tamaItem(base.tamaColors.blue, formatNumber(tamahaganeExp.blue)),
    tamaPurple: base.tamaItem(base.tamaColors.purple, formatNumber(tamahaganeExp.purple)),
    tamaYellow: base.tamaItem(base.tamaColors.yellow, formatNumber(tamahaganeExp.yellow)),
  };
  const [fromLevel, setFromLevel] = useState(WEAPON_MIN_LEVEL);
  const [toLevel, setToLevel] = useState(100);
  const [hammers, setHammers] = useState({ green: 0, blue: 0, purple: 0 });
  const [tama, setTama] = useState<BookCounts>(zeroCounts);

  const cost = calcWeaponCost(fromLevel, toLevel);
  const ownedExp = expFromTamahagane(tama);
  const tamaEnough = ownedExp >= cost.tamaExp;

  function selectFrom(level: number) {
    setFromLevel(level);
    if (toLevel <= level) {
      setToLevel(
        WEAPON_LEVEL_STEPS[WEAPON_LEVEL_STEPS.indexOf(level) + 1] ?? 100
      );
    }
  }

  return (
    <SectionCard title={TEXTS.title}>
      <div className="grid grid-cols-2 gap-3">
        <LevelSelect
          label={TEXTS.from}
          value={fromLevel}
          options={WEAPON_LEVEL_STEPS.slice(0, -1)}
          onChange={selectFrom}
        />
        <LevelSelect
          label={TEXTS.to}
          value={toLevel}
          options={WEAPON_LEVEL_STEPS.filter((l) => l > fromLevel)}
          onChange={setToLevel}
        />
      </div>

      <div className="mt-4 space-y-1 border-t border-bsr-border pt-3">
        <ResourceRow label={TEXTS.tamaExp} needed={cost.tamaExp} />
        <ResourceRow label={TEXTS.kans} needed={cost.kans} />
        <ResourceRow label={TEXTS.gold} needed={cost.gold} />
      </div>

      {(cost.hammers.green > 0 ||
        cost.hammers.blue > 0 ||
        cost.hammers.purple > 0) && (
        <>
          <p className="eyebrow mt-4 mb-1">{TEXTS.hammers}</p>
          {cost.hammers.green > 0 && (
            <ResourceRow
              label={TEXTS.hamGreen}
              needed={cost.hammers.green}
              owned={hammers.green}
              onOwned={(green) => setHammers({ ...hammers, green })}
            />
          )}
          {cost.hammers.blue > 0 && (
            <ResourceRow
              label={TEXTS.hamBlue}
              needed={cost.hammers.blue}
              owned={hammers.blue}
              onOwned={(blue) => setHammers({ ...hammers, blue })}
            />
          )}
          {cost.hammers.purple > 0 && (
            <ResourceRow
              label={TEXTS.hamPurple}
              needed={cost.hammers.purple}
              owned={hammers.purple}
              onOwned={(purple) => setHammers({ ...hammers, purple })}
            />
          )}
        </>
      )}

      <p className="eyebrow mt-4 mb-1">{TEXTS.tama}</p>
      {(
        [
          ["green", TEXTS.tamaGreen],
          ["blue", TEXTS.tamaBlue],
          ["purple", TEXTS.tamaPurple],
          ["yellow", TEXTS.tamaYellow],
        ] as const
      ).map(([key, label]) => (
        <ResourceRow
          key={key}
          label={label}
          owned={tama[key]}
          onOwned={(value) => setTama({ ...tama, [key]: value })}
        />
      ))}

      <div
        className={cn(
          "mt-3 flex items-center justify-between rounded-md border px-3 py-2 text-xs",
          tamaEnough
            ? "border-bsr-paper-dim/40 text-bsr-paper"
            : "border-bsr-border text-bsr-muted"
        )}
      >
        <span>{TEXTS.expOwned}</span>
        <span className="tabular">
          {tamaEnough
            ? TEXTS.tamaEnough
            : `${formatNumber(ownedExp)} / ${formatNumber(cost.tamaExp)}`}
        </span>
      </div>
    </SectionCard>
  );
}
