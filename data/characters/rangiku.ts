import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const rangiku: Character = {
  id: "rangiku",
  name: "Rangiku Matsumoto",
  damageType: "Thrust",
  role: "Support",
  rarity: "SR",
  recommendedSets: [
    { setId: "mocking-visage", priority: 1, note: "Ailment +50% (AniGacha) ; Hideout conseille plutôt Hidden Wisdom", sincePatch: "Juil. 2026" },
    { setId: "hidden-wisdom", priority: 2, note: "Buff équipe (choix Hideout Guides)", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["atk-pct", "thrust-dmg"],
    II: ["crit-rate"],
    III: ["ailment-dmg", "ult-charge"],
  },
  statWeights: {
    "atk": 0.25,
    "atk-pct": 0.4,
    "def": 0.05,
    "def-pct": 0.1,
    "hp": 0.1,
    "hp-pct": 0.2,
    "crit-rate": 0.4,
    "crit-dmg": 0.3,
    "ult-charge": 0.8,
    "ailment-dmg": 1,
  },
  recommendedPassives: ["invigorate", "restrain"],
  passives: [],
  buildNotes: "Support Thrust ailment : vise ~200% Ailment DMG Bonus + 130% UCR.",
};
