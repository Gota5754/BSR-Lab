import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const kisukeUrahara: Character = {
  id: "kisuke-urahara",
  name: "Kisuke Urahara",
  damageType: "Slash",
  role: "Support",
  rarity: "SSR",
  releaseDate: "2025-10-29",
  imageUrl: "/images/characters/kisuke-urahara.webp",
  recommendedSets: [
    { setId: "ready-to-go", priority: 1, note: "Buff équipe +10% all DMG après technique", sincePatch: "Juil. 2026" },
    { setId: "hidden-wisdom", priority: 2, note: "Alternative UCR pour cycler l'ultimate", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["slash-dmg", "atk-pct"],
    II: ["crit-dmg"],
    III: ["ult-charge"],
  },
  statWeights: {
    "atk": 0.3,
    "atk-pct": 0.6,
    "def": 0.05,
    "def-pct": 0.05,
    "hp": 0.05,
    "hp-pct": 0.1,
    "crit-rate": 0.1,
    "crit-dmg": 1,
    "ult-charge": 0.8,
    "ailment-dmg": 0.1,
  },
  recommendedPassives: ["invigorate", "restrain"],
  passives: [],
  buildNotes: "Support offensif : stacks Reishi Analysis = buff ATK d'équipe ; ses coups critiques sont garantis → Crit DMG only, + UCR pour cycler l'ultimate.",
};
