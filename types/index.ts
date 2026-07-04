/* ── Données de jeu ──────────────────────────────────────────────────────
   Les termes techniques du jeu restent en anglais (stats, types, rôles,
   noms de sets/passifs) ; seuls les textes d'interface sont en français. */

/* Les 14 stats du jeu. Les 4 « DMG Bonus » de type n'existent qu'en
   basic stat de Stamp I ; les 10 autres forment le pool de substats. */
export type StatId =
  | "atk"
  | "atk-pct"
  | "def"
  | "def-pct"
  | "hp"
  | "hp-pct"
  | "crit-rate"
  | "crit-dmg"
  | "ult-charge"
  | "ailment-dmg"
  | "slash-dmg"
  | "thrust-dmg"
  | "strike-dmg"
  | "spirit-dmg";

export type Stat = {
  id: StatId;
  name: string;
  isPercent: boolean;
};

/* Types de dégâts des personnages. */
export type DamageType = "Slash" | "Thrust" | "Strike" | "Spirit";

/* Rôles du jeu. */
export type Role = "Full Assault" | "Support" | "Tactic";

/* Chaque set possède 3 pièces : Stamp I, II, III. */
export type StampPieceId = "I" | "II" | "III";

/* Règles d'une pièce : 1re basic stat fixe + pool de la 2e basic stat
   (la seule qui monte avec le niveau du stamp, jusqu'au niv 30). */
export type StampPieceRules = {
  piece: StampPieceId;
  fixedBasicStat: StatId;
  secondBasicPool: StatId[];
};

/* Un personnage équipe exactement 3 stamps (I/II/III) d'un MÊME set,
   plus 1 core stamp (modélisé plus tard). Les paliers 2p/3p existent en
   jeu mais tout le monde joue les 3 pièces : un seul texte de bonus. */
export type StampSet = {
  id: string;
  name: string;
  bonus: string;
  imageUrl: string;
};

/* Passif 6★ obtenu à l'ascension niv 25 (1 au hasard parmi la liste).
   Équiper un stamp avec le même passif augmente son niveau. */
export type StampPassive = {
  id: string;
  name: string;
  /* Rôle amplifiant l'effet, s'il y en a un (ex. Overdrive - Tactic). */
  roleAffinity?: Role;
  descriptionLv1: string;
};

export type Character = {
  id: string;
  name: string;
  damageType: DamageType;
  role: Role;
  rarity: string;
  releaseDate: string;                       // sortie ~toutes les 3 semaines
  imageUrl: string;
  weapon: { name: string; stats: string[]; passive: string };
  recommendedSets: Array<{
    setId: string;
    priority: number;
    note?: string;
    sincePatch: string;
  }>;
  /* 2e basic stat recommandée pour chaque pièce. */
  recommendedBasicStats: Record<StampPieceId, StatId[]>;
  /* Pondérations du rater (0 à 1) sur le pool de substats. */
  statWeights: Partial<Record<StatId, number>>;
  /* Passifs 6★ BIS pour ce personnage (ids de data/stamp-passives.ts). */
  recommendedPassives: string[];
  passives: Array<{ name: string; description: string }>;
  buildNotes?: string;                        // markdown
};

export type TierEntry = {
  characterId: string;
  tier: "S" | "A" | "B" | "C";
  note?: string;
  patchVersion: string;
};

/* Les coûts de progression (EXP, Kans, essences, tamahagane, arts,
   omamori…) sont des tables typées dans data/resources.ts. */

/* ── Données utilisateur (localStorage, Zustand persist) ─────────────── */

export type UserStamp = {
  id: string;
  setId: string;
  piece: StampPieceId;
  level: number;
  secondBasicStat: StatId;
  /* evolutions : évolutions simples reçues aux niv 10/15/20 (0-3).
     Le +1 général du niv 25 se déduit du niveau. */
  substats: Array<{ id: StatId; evolutions: number }>;
  passiveId?: string;
  targetCharacterId?: string;
  createdAt: string;
  updatedAt: string;
};

export type Team = {
  id: string;
  name: string;
  members: string[];
  stampAssignments: Record<string, string[]>;
};

export type Settings = {
  theme: "dark";
  locale: "fr";
  lastSeenPatch: string;
};
