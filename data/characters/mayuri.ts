import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const mayuri: Character = {
  id: "mayuri",
  name: "Kurotsuchi Mayuri",
  damageType: "Thrust",
  role: "Support",
  rarity: "SSR",
  imageUrl: "/images/characters/mayuri.webp",
  recommendedSets: [
    { setId: "sample-collection", priority: 1, note: "Set signature : Poison → ATK équipe +5%/stack", sincePatch: "Juil. 2026" },
    { setId: "blooming-sakura", priority: 2, note: "Alternative UCR", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["atk-pct", "thrust-dmg"],
    II: ["atk-pct"],
    III: ["ult-charge"],
  },
  statWeights: {
    "atk": 0.3,
    "atk-pct": 0.5,
    "def": 0.05,
    "def-pct": 0.05,
    "hp": 0.1,
    "hp-pct": 0.2,
    "crit-rate": 0.3,
    "crit-dmg": 0.3,
    "ult-charge": 1,
    "ailment-dmg": 0.7,
  },
  recommendedPassives: ["invigorate", "restrain"],
  passives: [],
  buildNotes: "Support Thrust : Poison (set Sample Collection) ; vise ~250% d'Ultimate Charge Rate pour spammer l'ultimate.",
};
