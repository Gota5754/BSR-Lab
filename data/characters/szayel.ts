import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const szayel: Character = {
  id: "szayel",
  name: "Szayelaporro",
  damageType: "Spirit",
  role: "Support",
  rarity: "SSR",
  imageUrl: "/images/characters/szayel.webp",
  recommendedSets: [
    { setId: "curtain-falls", priority: 1, note: "Buffs Spirit d'équipe via counters/ultimate", sincePatch: "Juil. 2026" },
    { setId: "hidden-wisdom", priority: 2, note: "Alternative support", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["atk-pct", "spirit-dmg"],
    II: ["crit-dmg"],
    III: ["atk-pct", "ult-charge"],
  },
  statWeights: {
    "atk": 0.6,
    "atk-pct": 1,
    "def": 0.05,
    "def-pct": 0.05,
    "hp": 0.05,
    "hp-pct": 0.1,
    "crit-rate": 0.5,
    "crit-dmg": 0.85,
    "ult-charge": 0.4,
    "ailment-dmg": 0.1,
  },
  recommendedPassives: ["invigorate", "restrain"],
  passives: [],
  buildNotes: "Support Spirit d'élite : buffs d'équipe via counters/ultimate (Curtain Falls), self-revive via core stamp.",
};
