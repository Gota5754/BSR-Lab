import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const nemu: Character = {
  id: "nemu",
  name: "Nemu Kurotsuchi",
  damageType: "Strike",
  role: "Support",
  rarity: "SR",
  imageUrl: "/images/characters/nemu.webp",
  recommendedSets: [
    { setId: "hidden-wisdom", priority: 1, note: "Buff équipe +10% all DMG", sincePatch: "Juil. 2026" },
    { setId: "blooming-sakura", priority: 2, note: "Alternative UCR", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["atk-pct", "strike-dmg"],
    II: ["atk-pct"],
    III: ["ult-charge", "atk-pct"],
  },
  statWeights: {
    "atk": 0.3,
    "atk-pct": 0.6,
    "def": 0.1,
    "def-pct": 0.2,
    "hp": 0.2,
    "hp-pct": 0.3,
    "crit-rate": 0.1,
    "crit-dmg": 0.1,
    "ult-charge": 1,
    "ailment-dmg": 0.1,
  },
  recommendedPassives: ["invigorate", "restrain"],
  passives: [],
  buildNotes: "Support Strike : UCR au maximum, un peu d'ATK% (vise ~180% UCR / 2500 ATK).",
};
