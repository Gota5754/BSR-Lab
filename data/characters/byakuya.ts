import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const byakuya: Character = {
  id: "byakuya",
  name: "Byakuya Kuchiki",
  damageType: "Slash",
  role: "Tactic",
  rarity: "SSR",
  releaseDate: "2025-09-24",
  imageUrl: "/images/characters/byakuya-kuchiki.webp",
  recommendedSets: [
    { setId: "blooming-sakura", priority: 1, note: "UCR + Battlefield Skill DMG +30% (estimation, pas de guide publié)", sincePatch: "Juil. 2026" },
    { setId: "inner-fang", priority: 2, note: "Stacking de Battlefield Skill DMG", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["slash-dmg", "atk-pct"],
    II: ["crit-rate", "crit-dmg", "atk-pct"],
    III: ["ult-charge", "atk-pct"],
  },
  statWeights: {
    "atk": 0.35,
    "atk-pct": 0.8,
    "def": 0.05,
    "def-pct": 0.05,
    "hp": 0.05,
    "hp-pct": 0.1,
    "crit-rate": 0.85,
    "crit-dmg": 0.85,
    "ult-charge": 0.9,
    "ailment-dmg": 0.3,
  },
  recommendedPassives: ["enhanced-battlefield-skill", "enhanced-damage"],
  passives: [],
  buildNotes: "DPS off-field via Battlefield Skill (Senbonzakura) ; -30% résistance Slash pour l'équipe (Senka).",
};
