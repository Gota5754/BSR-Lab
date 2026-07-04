"use client";

import { useState } from "react";
import {
  calcPassivesCost,
  calcSkillsCost,
  PASSIVE_MAX_LEVEL,
  SKILL_MAX_LEVEL,
} from "@/lib/calculator/costs";
import { SectionCard } from "./SectionCard";
import { LevelSelect } from "./inputs";
import { formatNumber, ResourceRow } from "./ResourceRow";

const TEXTS = {
  title: "Compétences & passifs",
  from: "Niv. actuel",
  to: "Niv. cible",
  numSkills: "Nb compétences",
  artGreen: "Arts verts",
  artBlue: "Arts bleus",
  artPurple: "Arts violets",
  passives: "Passifs (niveau cible)",
  passiveLabel: (i: number) => `Passif ${i}`,
  omamori: "Omamori",
  totalKans: "Kans total (compétences + passifs)",
} as const;

const SKILL_LEVELS = Array.from({ length: SKILL_MAX_LEVEL }, (_, i) => i + 1);
const PASSIVE_LEVELS = Array.from(
  { length: PASSIVE_MAX_LEVEL + 1 },
  (_, i) => i
);

export function SkillCalculator() {
  const [fromLevel, setFromLevel] = useState(1);
  const [toLevel, setToLevel] = useState(SKILL_MAX_LEVEL);
  const [numSkills, setNumSkills] = useState(4);
  const [arts, setArts] = useState({ green: 0, blue: 0, purple: 0 });
  const [passiveTargets, setPassiveTargets] = useState<
    [number, number, number]
  >([3, 3, 3]);
  const [omamori, setOmamori] = useState(0);

  const skills = calcSkillsCost(fromLevel, toLevel, numSkills);
  const passives = calcPassivesCost(passiveTargets);
  const totalKans = skills.kans + passives.kans;

  function selectFrom(level: number) {
    setFromLevel(level);
    if (toLevel <= level) setToLevel(level + 1);
  }

  return (
    <SectionCard title={TEXTS.title}>
      <div className="grid grid-cols-3 gap-3">
        <LevelSelect
          label={TEXTS.from}
          value={fromLevel}
          options={SKILL_LEVELS.slice(0, -1)}
          onChange={selectFrom}
        />
        <LevelSelect
          label={TEXTS.to}
          value={toLevel}
          options={SKILL_LEVELS.filter((l) => l > fromLevel)}
          onChange={setToLevel}
        />
        <LevelSelect
          label={TEXTS.numSkills}
          value={numSkills}
          options={[1, 2, 3, 4]}
          onChange={setNumSkills}
        />
      </div>

      <div className="mt-4 space-y-1 border-t border-bsr-border pt-3">
        <ResourceRow
          label={TEXTS.artGreen}
          needed={skills.arts.green}
          owned={arts.green}
          onOwned={(green) => setArts({ ...arts, green })}
        />
        <ResourceRow
          label={TEXTS.artBlue}
          needed={skills.arts.blue}
          owned={arts.blue}
          onOwned={(blue) => setArts({ ...arts, blue })}
        />
        <ResourceRow
          label={TEXTS.artPurple}
          needed={skills.arts.purple}
          owned={arts.purple}
          onOwned={(purple) => setArts({ ...arts, purple })}
        />
      </div>

      <p className="eyebrow mt-4 mb-2">{TEXTS.passives}</p>
      <div className="grid grid-cols-3 gap-3">
        {passiveTargets.map((target, index) => (
          <LevelSelect
            key={index}
            label={TEXTS.passiveLabel(index + 1)}
            value={target}
            options={PASSIVE_LEVELS}
            onChange={(value) =>
              setPassiveTargets(
                passiveTargets.map((t, i) => (i === index ? value : t)) as [
                  number,
                  number,
                  number,
                ]
              )
            }
          />
        ))}
      </div>

      <div className="mt-3">
        <ResourceRow
          label={TEXTS.omamori}
          needed={passives.omamori}
          owned={omamori}
          onOwned={setOmamori}
        />
      </div>

      <div className="mt-3 flex items-center justify-between rounded-md border border-bsr-border px-3 py-2 text-xs text-bsr-paper-dim">
        <span>{TEXTS.totalKans}</span>
        <span className="tabular text-bsr-paper">
          {formatNumber(totalKans)}
        </span>
      </div>
    </SectionCard>
  );
}
