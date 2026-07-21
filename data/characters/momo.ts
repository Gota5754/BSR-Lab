import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const momo: Character = {
  id: "momo",
  name: "Momo Hinamori",
  damageType: "Spirit",
  role: "Support",
  rarity: "SR",
  imageUrl: "/images/characters/momo.webp",
  recommendedSets: [
    { setId: "hidden-wisdom", priority: 1, note: "Buff équipe +10% all DMG", sincePatch: "Juil. 2026" },
    { setId: "blooming-sakura", priority: 2, note: "Alternative UCR", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["atk-pct", "hp-pct"],
    II: ["hp-pct"],
    III: ["ult-charge"],
  },
  statWeights: {
    "atk": 0.2,
    "atk-pct": 0.4,
    "def": 0.1,
    "def-pct": 0.2,
    "hp": 0.3,
    "hp-pct": 0.5,
    "crit-rate": 0.1,
    "crit-dmg": 0.1,
    "ult-charge": 1,
    "ailment-dmg": 0.05,
  },
  recommendedPassives: ["invigorate", "restrain"],
  passives: [],
  buildNotes: "Support Spirit : cycle d'ultimate, UCR au maximum.",
};
