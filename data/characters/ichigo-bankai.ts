import type { Character } from "@/types";

/* ⚠️ Poids, arme et sets recommandés à confirmer par Mathieu. */
export const ichigoBankai: Character = {
  id: "ichigo-bankai",
  name: "Ichigo Kurosaki (Bankai)",
  damageType: "Slash",
  role: "Full Assault",
  rarity: "SSR",
  releaseDate: "2025-12-10",
  imageUrl: "/images/characters/ichigo-bankai.webp",
  weapon: {
    name: "Tensa Zangetsu",
    stats: ["ATK", "Slash DMG Bonus"],
    passive:
      "Getsuga Tenshō : les attaques chargées libèrent une onde infligeant 180 % de l'ATK.", // ⚠️ placeholder
  },
  recommendedSets: [
    {
      setId: "ready-to-go",
      priority: 1,
      note: "Son meilleur set (validé par Mathieu, 2026-07).",
      sincePatch: "1.0",
    },
    {
      setId: "rising-black-moon",
      priority: 2,
      note: "Fonctionne également très bien (set signature).",
      sincePatch: "1.0",
    },
  ],
  recommendedBasicStats: {
    I: ["slash-dmg", "atk-pct"],
    II: ["crit-rate", "crit-dmg", "atk-pct"],
    III: ["atk-pct", "ult-charge"],
  },
  statWeights: {
    "crit-rate": 1,
    "crit-dmg": 1,
    "atk-pct": 0.8,
    atk: 0.4,
    "ult-charge": 0.3,
    "ailment-dmg": 0.2,
    "hp-pct": 0.1,
    hp: 0.05,
    "def-pct": 0.05,
    def: 0.05,
  },
  recommendedPassives: ["overdrive-full-assault"], // ⚠️ à confirmer
  passives: [
    {
      name: "Overdrive — conversion critique",
      description:
        "Au-delà de 100 % de Crit Rate, chaque 1 % excédentaire est converti en 2 % de Crit DMG (passif niv 3).",
    },
  ],
  buildNotes:
    "Empiler le Crit Rate reste rentable au-delà de 100 % grâce à la conversion 1 % → 2 % Crit DMG. Priorité substats : Crit Rate = Crit DMG > ATK%. Passif 6★ BIS : Overdrive - Full Assault.",
};
