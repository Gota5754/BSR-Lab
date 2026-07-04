import type { Character } from "@/types";
import { ichigoBankai } from "./ichigo-bankai";
import { kenpachi } from "./kenpachi";
import { kisukeUrahara } from "./kisuke-urahara";
import { byakuya } from "./byakuya";

/* Registre des personnages — ajouter chaque nouveau perso ici
   (workflow CLAUDE.md §5.1 : 1 fichier par personnage). */
export const characters: Character[] = [
  ichigoBankai,
  kenpachi,
  kisukeUrahara,
  byakuya,
];
