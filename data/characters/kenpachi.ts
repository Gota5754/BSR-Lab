import type { Character } from "@/types";

/* ⚠️ Poids, arme et sets recommandés à confirmer par Mathieu. */
export const kenpachi: Character = {
  id: "kenpachi",
  name: "Kenpachi Zaraki",
  damageType: "Slash",
  role: "Full Assault",
  rarity: "SSR",
  releaseDate: "2025-11-19",
  imageUrl: "/images/characters/kenpachi-zaraki.webp",
  weapon: {
    name: "Nozarashi (scellé)",
    stats: ["ATK", "Crit Rate"],
    passive:
      "Soif de combat : chaque 10 % de HP perdus augmente l'ATK de 4 %.", // ⚠️ placeholder
  },
  recommendedSets: [
    {
      setId: "ready-to-go",
      priority: 1,
      note: "Burst d'ouverture — son kit frontload les dégâts.",
      sincePatch: "1.0",
    },
    {
      setId: "savage-beast-king",
      priority: 2,
      note: "Meilleur en contenu avec beaucoup d'adds.",
      sincePatch: "1.0",
    },
  ],
  recommendedBasicStats: {
    I: ["slash-dmg", "atk-pct"],
    II: ["crit-dmg", "crit-rate", "atk-pct"],
    III: ["atk-pct", "hp-pct"],
  },
  statWeights: {
    "atk-pct": 1,
    "crit-dmg": 0.9,
    "crit-rate": 0.85,
    atk: 0.45,
    "hp-pct": 0.35,
    "ult-charge": 0.2,
    hp: 0.15,
    "ailment-dmg": 0.15,
    "def-pct": 0.05,
    def: 0.05,
  },
  recommendedPassives: [
    "overdrive-full-assault",
    "enhanced-basic-attack-full-assault",
  ], // ⚠️ à confirmer
  passives: [
    {
      name: "Joie du massacre",
      description:
        "Les dégâts infligés augmentent de 20 % lorsque ses HP sont sous 60 %.", // ⚠️ placeholder
    },
  ],
  buildNotes:
    "Tanky par nature : on peut sacrifier un peu de HP% pour du dégât pur. ATK% prime tant que le Crit Rate reste sous ~60 %.",
};
