import type { StampSet } from "@/types";

/* Noms de sets issus du jeu.
   ⚠️ Textes des bonus (3 pièces équipées) placeholder — à vérifier en jeu. */
export const stampSets: StampSet[] = [
  {
    id: "rising-black-moon",
    name: "Rising Black Moon",
    bonus: "Dégâts tranchants +10 % ; après un coup critique, ATK +15 % pendant 8 s.",
    imageUrl: "/images/stamps/rising-black-moon.webp",
  },
  {
    id: "ready-to-go",
    name: "Ready to Go",
    bonus: "ATK +10 % ; en début de combat, Crit Rate +12 % pendant 12 s.",
    imageUrl: "/images/stamps/ready-to-go.webp",
  },
  {
    id: "hidden-wisdom",
    name: "Hidden Wisdom",
    bonus: "Dégâts spirituels +10 % ; Ultimate Charge Rate +20 %.",
    imageUrl: "/images/stamps/hidden-wisdom.webp",
  },
  {
    id: "blooming-sakura",
    name: "Blooming Sakura",
    bonus:
      "Dégâts spirituels +10 % ; les compétences infligent +18 % de dégâts aux ennemis contrôlés.",
    imageUrl: "/images/stamps/blooming-sakura.webp",
  },
  {
    id: "mocking-visage",
    name: "Mocking Visage",
    bonus: "HP +12 % ; réduit les dégâts subis de 10 % et en renvoie 15 %.",
    imageUrl: "/images/stamps/mocking-visage.webp",
  },
  {
    id: "unyielding-light",
    name: "Unyielding Light",
    bonus: "DEF +12 % ; sous 50 % HP, soin de 20 % des HP max (1×/combat).",
    imageUrl: "/images/stamps/unyielding-light.webp",
  },
  {
    id: "knights-anthem",
    name: "Knight's Anthem",
    bonus: "HP +12 % ; les soins prodigués augmentent de 18 %.",
    imageUrl: "/images/stamps/knights-anthem.webp",
  },
  {
    id: "savage-beast-king",
    name: "Savage Beast King",
    bonus: "ATK +10 % ; chaque élimination augmente l'ATK de 6 % (max 3 cumuls).",
    imageUrl: "/images/stamps/savage-beast-king.webp",
  },
  {
    id: "inner-fang",
    name: "Inner Fang",
    bonus: "Dégâts tranchants +10 % ; les attaques chargées infligent +20 % de dégâts.",
    imageUrl: "/images/stamps/inner-fang.webp",
  },
  {
    id: "immeasurable-gap",
    name: "Immeasurable Gap",
    bonus: "Dégâts spirituels +10 % ; ignore 12 % de la DEF des ennemis.",
    imageUrl: "/images/stamps/immeasurable-gap.webp",
  },
  {
    id: "shadow-in-still-night",
    name: "Shadow in Still Night",
    bonus: "Vitesse +8 % ; après une esquive, +25 % de dégâts pendant 6 s.",
    imageUrl: "/images/stamps/shadow-in-still-night.webp",
  },
];
