import type { Stat, StatId, StampPieceRules } from "@/types";

/* Les 14 stats du jeu (noms anglais officiels).
   Les valeurs en jeu sont fixes (pas de rolls) : le rater raisonne
   uniquement en nombre d'évolutions, pas en valeurs chiffrées. */
export const stats: Stat[] = [
  { id: "atk", name: "ATK", isPercent: false },
  { id: "atk-pct", name: "ATK%", isPercent: true },
  { id: "def", name: "DEF", isPercent: false },
  { id: "def-pct", name: "DEF%", isPercent: true },
  { id: "hp", name: "HP", isPercent: false },
  { id: "hp-pct", name: "HP%", isPercent: true },
  { id: "crit-rate", name: "Crit Rate", isPercent: true },
  { id: "crit-dmg", name: "Crit DMG", isPercent: true },
  { id: "ult-charge", name: "Ultimate Charge Rate", isPercent: true },
  { id: "ailment-dmg", name: "Ailment DMG Bonus", isPercent: true },
  /* Basic stat de Stamp I uniquement — jamais en substat. */
  { id: "slash-dmg", name: "Slash DMG Bonus", isPercent: true },
  { id: "thrust-dmg", name: "Thrust DMG Bonus", isPercent: true },
  { id: "strike-dmg", name: "Strike DMG Bonus", isPercent: true },
  { id: "spirit-dmg", name: "Spirit DMG Bonus", isPercent: true },
];

/* Pool des 10 substats possibles (communes aux 3 pièces). */
export const SUBSTAT_POOL: StatId[] = [
  "atk",
  "atk-pct",
  "def",
  "def-pct",
  "hp",
  "hp-pct",
  "crit-rate",
  "crit-dmg",
  "ult-charge",
  "ailment-dmg",
];

/* Règles des 3 pièces d'un set : 1re basic stat fixe, et pool de la 2e
   basic stat (aléatoire à l'obtention, seule stat à monter avec le niveau). */
export const pieceRules: StampPieceRules[] = [
  {
    piece: "I",
    fixedBasicStat: "atk",
    secondBasicPool: [
      "def",
      "hp",
      "def-pct",
      "hp-pct",
      "atk-pct",
      "slash-dmg",
      "thrust-dmg",
      "strike-dmg",
      "spirit-dmg",
    ],
  },
  {
    piece: "II",
    fixedBasicStat: "def",
    secondBasicPool: [
      "atk",
      "atk-pct",
      "def-pct",
      "hp",
      "hp-pct",
      "crit-rate",
      "crit-dmg",
    ],
  },
  {
    piece: "III",
    fixedBasicStat: "hp",
    secondBasicPool: [
      "atk",
      "atk-pct",
      "def",
      "def-pct",
      "hp-pct",
      "ult-charge",
      "ailment-dmg",
    ],
  },
];
