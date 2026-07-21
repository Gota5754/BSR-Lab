import type { TierEntry } from "@/types";

/* Placements : Classeur1.xlsx (Mathieu, juillet 2026) — tier = classement
   général, typeTier = classement au sein du type de dégâts.
   Notes rédigées par Mathieu (éditées sur GitHub). */

export const tierList: TierEntry[] = [
  { characterId: "ichigo-bankai", tier: "B", typeTier: "A", note: "Un ancien DPS qui a souffert de la montée en puissance globale (power creep), car il monopolise trop le terrain en restant figé pendant son attaque spéciale et est désormais surclassé", patchVersion: "Juil. 2026" },
  { characterId: "kenpachi", tier: "S", typeTier: "S", note: "Un excellent DPS Slash aux dégâts massifs qui réduit les dégâts qu'il subit, mais dont les combos nécessitent un minimum de maîtrise ou une protection pour ne pas être interrompus", patchVersion: "Juil. 2026" },
  { characterId: "kisuke-urahara", tier: "S", typeTier: "S", note: "Un support universel free-to-play extrêmement simple à utiliser, augmentant passivement l'attaque et les dégâts critiques de n'importe quelle équipe", patchVersion: "Juil. 2026" },
  { characterId: "byakuya", tier: "C", typeTier: "B", note: "Un personnage Tactique Slash globalement décevant qui demande un investissement faramineux (plusieurs doublons) pour avoir un réel impact, et qui se fait complètement remplacer par White Ichigo", patchVersion: "Juil. 2026" },
  { characterId: "white", tier: "SS", typeTier: "SS", note: "Considéré comme l'un des meilleurs DPS du jeu, il inflige des dégâts colossaux même sans aucun doublon et devient surpuissant une fois en bankai", patchVersion: "Juil. 2026" },
  { characterId: "toshiro", tier: "A", typeTier: "A", note: "Un DPS Spirit solide et facile à jouer, bien qu'il ait absolument besoin de son équipe complète (Aizen et Szayelaporro) pour rester compétitif face aux DPS les plus récents", patchVersion: "Juil. 2026" },
  { characterId: "aizen", tier: "SS", typeTier: "SS", note: "Un personnage Tactique universel indispensable qui augmente de 30 % les dégâts de n'importe quelle équipe, tout en facilitant les contres et en infligeant d'énormes dégâts de zone avec son Hado 90", patchVersion: "Juil. 2026" },
  { characterId: "szayel", tier: "SS", typeTier: "SS", note: "Le support dédié ultime pour l'équipe Spirit, augmentant considérablement les dégâts critiques et spirituels de ses alliés (comme Ulquiorra ou Toshiro) tout en réduisant la résistance ennemie", patchVersion: "Juil. 2026" },
  { characterId: "ulquiorra", tier: "SS", typeTier: "SS", note: "Un DPS Spirit incontournable et très simple à prendre en main qui domine complètement la méta grâce à ses dégâts colossaux et à sa surpuissante forme Segunda Etapa capable d'ignorer la défense ennemie avec ses doublons", patchVersion: "Juil. 2026" },
  { characterId: "komamura", tier: "D", typeTier: "C", note: "Actuellement considéré comme le pire personnage Tactique du jeu, avec un apport beaucoup trop faible pour mériter une place, même dans une équipe Strike", patchVersion: "Juil. 2026" },
  { characterId: "yoruichi", tier: "A", typeTier: "A", note: "Une unité Strike qui possède une excellente synergie avec Soi Fon et reste très accessible grâce à l'obtention facile de ses doublons, bien qu'elle soit complexe à prendre en main", patchVersion: "Juil. 2026" },
  { characterId: "soifon", tier: "S", typeTier: "SS", note: "Une unité Tactique Strike ultra-rapide qui requiert très peu de temps de présence sur le terrain, tout en réduisant la résistance ennemie et en boostant l'équipe grâce à ses esquives parfaites", patchVersion: "Juil. 2026" },
  { characterId: "grimmjow-pantera", tier: "S", typeTier: "SS", note: "Un DPS Strike redoutable et très puissant depuis ses buffs, bien qu'il nécessite un temps de pratique important pour maîtriser parfaitement ses rotations et ses combos", patchVersion: "Juil. 2026" },
  { characterId: "gin", tier: "S", typeTier: "S", note: "Un très bon DPS facile d'utilisation grâce à sa résistance aux interruptions, qui synergise à la perfection avec Nelliel via ses mécaniques de dégâts d'altération continus", patchVersion: "Juil. 2026" },
  { characterId: "ikkaku", tier: "D", typeTier: "D", note: "Un personnage aux dégâts beaucoup trop faibles qui ne sert strictement à rien dans la méta actuelle et se retrouve tout en bas de la tier list, au même titre que Komamura", patchVersion: "Juil. 2026" },
  { characterId: "tosen", tier: "B", typeTier: "B", note: "Une unité Tactique utile pour ses altérations d'état et la baisse de résistance, mais qui est aujourd'hui largement dépassée par Nelliel en termes de dégâts et d'utilité", patchVersion: "Juil. 2026" },
  { characterId: "nelliel", tier: "S", typeTier: "SS", note: "Une excellente unité Tactique Thrust qui inflige de gros dégâts, applique des malus de résistance et recharge très vite, s'intégrant parfaitement avec Gin et White Ichigo", patchVersion: "Juil. 2026" },
  { characterId: "mayuri", tier: "SS", typeTier: "SS", note: "Le meilleur support universel actuel, offrant des buffs massifs d'attaque et de maîtrise tout en arrêtant le temps avec son ultime, ce qui le rend incontournable dans la plupart des compositions", patchVersion: "Juil. 2026" },
  { characterId: "grimmjow-jaegerjack", tier: "A", typeTier: "A", note: "Bon DPS Strike SR+", patchVersion: "Juil. 2026" },
  { characterId: "ulquiorra-cifer-sr", tier: "A", typeTier: "A", note: "Bon DPS Spirit SR+", patchVersion: "Juil. 2026" },
  { characterId: "ichigo-initial", tier: "D", typeTier: "D", note: "Early game uniquement", patchVersion: "Juil. 2026" },
  { characterId: "ichigo-shikai", tier: "C", typeTier: "D", note: "Early game uniquement", patchVersion: "Juil. 2026" },
  { characterId: "momo", tier: "A", typeTier: "A", note: "Bon soutien de rareté SR, parfait et facile à jouer pour améliorer  vos équipes en attendant d'obtenir de meilleurs soutiens SSR", patchVersion: "Juil. 2026" },
  { characterId: "nemu", tier: "C", typeTier: "B", note: "Support SR déclassé par Mayuri ou Kisuke", patchVersion: "Juil. 2026" },
  { characterId: "orihime", tier: "C", typeTier: "C", note: "Healeuse correcte mais déclassée", patchVersion: "Juil. 2026" },
  { characterId: "rangiku", tier: "A", typeTier: "A", note: "Bon soutien de rareté SR, parfait et facile à jouer pour améliorer  vos équipes en attendant d'obtenir de meilleurs soutiens SSR", patchVersion: "Juil. 2026" },
  { characterId: "renji", tier: "D", typeTier: "D", note: "DPS Thrust SR déclassé", patchVersion: "Juil. 2026" },
  { characterId: "rukia", tier: "C", typeTier: "C", note: "Contrôle (Freeze) utile", patchVersion: "Juil. 2026" },
  { characterId: "sado", tier: "D", typeTier: "D", note: "Le plus faible du roster", patchVersion: "Juil. 2026" },
  { characterId: "ururu", tier: "D", typeTier: "D", note: "DPS Spirit SR déclassé", patchVersion: "Juil. 2026" },
  { characterId: "uryu", tier: "D", typeTier: "D", note: "Tactic Thrust déclassé", patchVersion: "Juil. 2026" },
  { characterId: "yachiru", tier: "A", typeTier: "A", note: "Bon soutien de rareté SR, parfait et facile à jouer pour améliorer  vos équipes en attendant d'obtenir de meilleurs soutiens SSR", patchVersion: "Juil. 2026" },
  { characterId: "ichigo-dual-zangetsu", tier: "SS", typeTier: "SS", note: "Actuellement considéré comme le meilleur personnage du jeu, se montrant absolument dévastateur même sans aucun doublon", patchVersion: "Juil. 2026" },
];
