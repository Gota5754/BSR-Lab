import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const yachiru: Character = {
  id: "yachiru",
  name: "Yachiru Kusajishi",
  damageType: "Slash",
  role: "Full Assault",
  rarity: "SR",
  imageUrl: "/images/characters/yachiru.webp",
  recommendedSets: [
    { setId: "blooming-sakura", priority: 1, note: "UCR pour cycler l'ult (+50% Crit Rate équipe) (estimation)", sincePatch: "Juil. 2026" },
    { setId: "mindscape-encroachment", priority: 2, note: "Team Slash (estimation)", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["slash-dmg", "atk-pct"],
    II: ["crit-rate"],
    III: ["ult-charge"],
  },
  statWeights: {
    "atk": 0.25,
    "atk-pct": 0.5,
    "def": 0.05,
    "def-pct": 0.1,
    "hp": 0.1,
    "hp-pct": 0.3,
    "crit-rate": 0.5,
    "crit-dmg": 0.4,
    "ult-charge": 1,
    "ailment-dmg": 0.1,
  },
  recommendedPassives: ["invigorate", "restrain"],
  passives: [],
  buildNotes: "Buffeuse Slash : Inspiration (+Slash DMG) en spectatrice, ultimate = +50% Crit Rate d'équipe. Classée Full Assault en jeu malgré son rôle de support.",
};
