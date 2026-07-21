import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const orihime: Character = {
  id: "orihime",
  name: "Orihime Inoue",
  damageType: "Spirit",
  role: "Support",
  rarity: "SR",
  imageUrl: "/images/characters/orihime.webp",
  recommendedSets: [
    { setId: "hidden-wisdom", priority: 1, note: "Buff équipe + HP de base +16%", sincePatch: "Juil. 2026" },
    { setId: "blooming-sakura", priority: 2, note: "Alternative UCR", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["hp-pct"],
    II: ["hp-pct"],
    III: ["ult-charge"],
  },
  statWeights: {
    "atk": 0.2,
    "atk-pct": 0.2,
    "def": 0.1,
    "def-pct": 0.2,
    "hp": 0.4,
    "hp-pct": 0.7,
    "crit-rate": 0.05,
    "crit-dmg": 0.05,
    "ult-charge": 1,
    "ailment-dmg": 0.05,
  },
  recommendedPassives: ["invigorate", "restrain"],
  passives: [],
  buildNotes: "Healeuse : HP% + UCR, barrière d'équipe via l'ultimate.",
};
