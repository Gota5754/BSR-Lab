import type { Character } from "@/types";

/* ⚠️ Rôle, type, poids, arme et sets recommandés à confirmer par Mathieu. */
export const kisukeUrahara: Character = {
  id: "kisuke-urahara",
  name: "Kisuke Urahara",
  damageType: "Spirit",
  role: "Support",
  rarity: "SSR",
  releaseDate: "2025-10-29",
  imageUrl: "/images/characters/kisuke-urahara.webp",
  weapon: {
    name: "Benihime",
    stats: ["ATK", "Spirit DMG Bonus"],
    passive:
      "Chante, Benihime : les compétences appliquent une marque augmentant les dégâts subis de 8 %.", // ⚠️ placeholder
  },
  recommendedSets: [
    {
      setId: "hidden-wisdom",
      priority: 1,
      note: "Son set historique (Hidden Wisdom / Ready to Go).",
      sincePatch: "1.0",
    },
    {
      setId: "ready-to-go",
      priority: 2,
      sincePatch: "1.0",
    },
  ],
  recommendedBasicStats: {
    I: ["spirit-dmg", "atk-pct"],
    II: ["crit-rate", "crit-dmg", "atk-pct"],
    III: ["ult-charge", "atk-pct"],
  },
  statWeights: {
    "ult-charge": 1,
    "crit-rate": 0.8,
    "crit-dmg": 0.8,
    "atk-pct": 0.7,
    atk: 0.35,
    "ailment-dmg": 0.3,
    "hp-pct": 0.15,
    hp: 0.05,
    "def-pct": 0.1,
    def: 0.05,
  },
  recommendedPassives: ["invigorate-support", "overdrive-support"], // ⚠️ à confirmer
  passives: [
    {
      name: "Scientifique de l'ombre",
      description:
        "Après un Ultimate, réduit le temps de recharge des compétences alliées de 15 %.", // ⚠️ placeholder
    },
  ],
  buildNotes:
    "L'Ultimate Charge Rate est sa stat clé : viser un cycle d'Ultimate le plus court possible. Passifs 6★ intéressants : Invigorate - Support / Overdrive - Support.",
};
