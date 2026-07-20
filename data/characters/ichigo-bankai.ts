import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const ichigoBankai: Character = {
  id: "ichigo-bankai",
  name: "Ichigo Kurosaki (Bankai)",
  damageType: "Slash",
  role: "Full Assault",
  rarity: "SSR",
  releaseDate: "2025-12-10",
  imageUrl: "/images/characters/ichigo-bankai.webp",
  recommendedSets: [
    { setId: "ready-to-go", priority: 1, note: "Set signature : ATK +18%, special attack +28% après technique", sincePatch: "Juil. 2026" },
    { setId: "rising-black-moon", priority: 2, note: "Alternative crit générique (ATK +20%, Crit DMG +50%)", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["slash-dmg", "atk-pct"],
    II: ["crit-rate", "crit-dmg", "atk-pct"],
    III: ["ult-charge", "atk-pct"],
  },
  statWeights: {
    "atk": 0.4,
    "atk-pct": 0.8,
    "def": 0.05,
    "def-pct": 0.05,
    "hp": 0.05,
    "hp-pct": 0.1,
    "crit-rate": 1,
    "crit-dmg": 1,
    "ult-charge": 0.5,
    "ailment-dmg": 0.1,
  },
  recommendedPassives: ["enhanced-special-attack", "enhanced-damage", "enhanced-ultimate"],
  passives: [],
  buildNotes: "Hyper-carry Slash : spam de special attacks + burst Hollowfication ; le Crit Rate au-dessus de 100% est converti en Crit DMG.",
};
