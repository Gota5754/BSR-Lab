import type { Dict } from "./index";

/* English dictionary — mirrors fr.ts (typed against it). */

export const en: Dict = {
  nav: {
    rater: "Rater",
    tierList: "Tier list",
    calculator: "Calculator",
    inventory: "Inventory",
    teams: "Teams",
  },

  footer: {
    disclaimer:
      "Unofficial fan site — Bleach: Soul Resonance is a trademark of its rights holders.",
    patchLine: (patch: string) => `data up to date for patch ${patch}`,
  },

  support: "Support",

  dataDisclaimer: (patch: string) => `Data up to date for patch ${patch}`,

  pages: {
    rater: {
      eyebrow: "Tool",
      title: "Rater",
      description:
        "Rate your Set Stamps substat by substat, with a score weighted per character.",
    },
    tierList: {
      eyebrow: "Tool",
      title: "Tier list",
      description:
        "The character ranking, updated every patch with justifications.",
    },
    calculator: {
      eyebrow: "Tool",
      title: "Calculator",
      description:
        "Estimate the resources needed to level your characters, weapons, skills and passives — and plan your pulls.",
    },
    inventory: {
      eyebrow: "Tool",
      title: "Inventory",
      description:
        "Your rated stamps, saved locally in your browser. Export the JSON to switch devices.",
    },
    teams: {
      eyebrow: "Tool",
      title: "Teams",
      description:
        "Build 3-character teams, assign your stamps and spot the weak link.",
    },
  },

  home: {
    eyebrow: "Bleach: Soul Resonance",
    title: "The lab for your Set Stamps",
    intro:
      "Rate your stamps, check the tier list, plan your resources. Free, no account, built to be used while playing.",
    ctaPrimary: "Rate a stamp",
    ctaSecondary: "View the tier list",
    toolsEyebrow: "Tools",
    toolsTitle: "The whole lab",
    toolDescriptions: {
      rater:
        "Rate your Set Stamps substat by substat, with a score weighted per character.",
      tierList:
        "The character ranking, updated every patch with justifications.",
      calculator:
        "Estimate the resources needed to level your characters and weapons.",
      inventory:
        "Your rated stamps, saved locally. JSON export and import included.",
    },
    gradesEyebrow: "Preview",
    gradesTitle: "The grading system",
    gradesNote:
      "Every rated stamp receives a grade from S to D based on the weights of the targeted character.",
    scoreLabel: "Score",
  },

  picker: {
    legend: "Character",
    searchPlaceholder: "Search for a character…",
    allRarities: "All",
    noResult: "No character matches.",
  },

  configurator: {
    pieceLegend: "Piece",
    piecePrefix: "Stamp",
    fixedBasicPrefix: "Fixed basic stat:",
    levelLegend: "Stamp level",
    levelPrefix: "Lv",
    secondBasicLabel: "2nd basic stat",
    recommendedSuffix: " (recommended)",
    substatsLegend: "Substats",
    budgetHint: (used: number, total: number) =>
      `Single evolutions (lv 10/15/20): ${used}/${total} assigned`,
    level25Hint: "Lv 25: automatic +1 on all 4 substats",
    passiveLabel: "6★ passive",
    passivePlaceholder: "— Passive not set —",
    passiveLocked: "Lv 25 ascension required for the 6★ passive",
    passiveAffinityOk: "Matches the character's role",
  },

  substat: {
    placeholder: "— Substat —",
    evolutionsLabel: "Single evolutions",
    decrease: "Remove an evolution",
    increase: "Add an evolution",
    level25Bonus: "+1",
    level25BonusTitle: "Lv 25 general evolution (automatic)",
  },

  weightLabels: {
    bis: "BIS",
    strong: "Great",
    medium: "Decent",
    weak: "Low",
  },

  rater: {
    compareOn: "Compare 2 stamps",
    compareOff: "Exit comparison",
    save: "Save to inventory",
    saved: "Saved",
    recommendedSets: "Recommended sets",
    stampA: "Stamp A",
    stampB: "Stamp B",
    reset: "Reset",
    emptyState: "Pick the stamp's 2nd basic stat to see its score live.",
    emptyStateCompare:
      "Set the 2nd basic stat of both stamps to get the verdict.",
    verdictKeep: (label: string) => `Keep ${label}`,
    verdictTie: "Tie — keep the one that costs less to level",
    verdictDelta: (points: string) => `+${points} points`,
    verdictPotential: "Decided by substat potential",
    verdictPieceWarning:
      "Different pieces: indicative comparison only (they don't share a slot).",
  },

  breakdown: {
    scoreLabel: "Score",
    potentialLabel: "Substat potential",
    basicStatOk: "Recommended 2nd basic stat",
    basicStatOff: "Off-meta 2nd basic stat",
    passiveLabel: "Passive",
    breakdownTitle: "Substat contribution",
    emptyBreakdown: "No substats set.",
    evolutionsShort: "evo",
    passiveStatus: {
      "not-ascended": "No passive yet (lv < 25)",
      unknown: "Passive not set",
      bis: "BIS passive for this character",
      "role-match": "Passive with role affinity",
      generic: "Generic passive",
      "role-mismatch": "Passive from another role (bonus lost)",
    },
  },

  stampCard: {
    levelPrefix: "Lv",
    basicPrefix: "2nd basic:",
    targetPrefix: "For",
    noTarget: "No target character",
    potentialShort: "potential",
    evolutionsShort: "evo",
    remove: "Delete this stamp",
  },

  inventory: {
    count: (n: number) => `${n} saved stamp${n > 1 ? "s" : ""}`,
    filterAll: "All characters",
    exportButton: "Export (JSON)",
    importButton: "Import (JSON)",
    importSuccess: (n: number) => `${n} stamp${n > 1 ? "s" : ""} imported.`,
    importError: "Import failed.",
    emptyTitle: "Empty inventory",
    emptyDescription:
      "Rate a stamp in the rater then save it: it will appear here, kept in your browser.",
    emptyAction: "Open the rater",
    loading: "Loading inventory…",
  },

  focus: {
    title: "Upgrade priorities",
    hint: "Based on the stamps assigned to each character (pieces I/II/III of a single set).",
    missing: (piece: string) => `Stamp ${piece} missing`,
    weakest: (piece: string) => `Weak link: Stamp ${piece}`,
  },

  tierList: {
    empty: "No character in this tier.",
    all: "All",
    roleLabel: "Role",
    typeLabel: "Damage type",
    viewLabel: "View",
    generalTab: "Overall",
    byTypeTab: "By type",
  },

  calc: {
    ownedAria: "owned",
    pull: {
      title: "Pulls",
      crystals: "Current crystals",
      pity: (hardPity: number) => `Current pity (guarantee at ${hardPity})`,
      days: "Days until banner",
      daily: "Crystals earned / day",
      pulls: "Estimated pulls",
      needed: "For the guarantee",
      enough: "Enough",
      missing: "Short",
      missingCrystals: (n: string, cost: number) =>
        `${n} crystals missing (${cost}/pull).`,
    },
    character: {
      title: "Character",
      from: "Current level",
      to: "Target level",
      exp: "EXP needed",
      kans: "Total Kans",
      essences: "Essences (ascension)",
      essGreen: "Green essences",
      essBlue: "Blue essences",
      essPurple: "Purple essences",
      books: "EXP books owned",
      book: (color: string, exp: string) => `${color} books (${exp} EXP)`,
      bookColors: {
        green: "Green",
        blue: "Blue",
        purple: "Purple",
        yellow: "Yellow",
      },
      expOwned: "EXP covered by books",
      booksEnough: "Enough books ✓",
    },
    weapon: {
      title: "Weapon",
      from: "Current level",
      to: "Target level",
      tamaExp: "Tamahagane EXP needed",
      kans: "Total Kans",
      gold: "Total Gold",
      hammers: "Hammers (ascension)",
      hamGreen: "Green hammers",
      hamBlue: "Blue hammers",
      hamPurple: "Purple hammers",
      tama: "Tamahagane owned",
      tamaItem: (color: string, exp: string) =>
        `${color} Tamahagane (${exp} EXP)`,
      tamaColors: {
        green: "Green",
        blue: "Blue",
        purple: "Purple",
        yellow: "Yellow",
      },
      expOwned: "EXP covered by Tamahagane",
      tamaEnough: "Enough Tamahagane ✓",
    },
    skills: {
      title: "Skills & passives",
      from: "Current lv",
      to: "Target lv",
      numSkills: "Skills count",
      artGreen: "Green Arts",
      artBlue: "Blue Arts",
      artPurple: "Purple Arts",
      passives: "Passives (target level)",
      passiveLabel: (i: number) => `Passive ${i}`,
      omamori: "Omamori",
      totalKans: "Total Kans (skills + passives)",
    },
    credits:
      "Data: bsr-calculator.vercel.app — credits @enveelive, @Ganxo012, @Joker",
  },

  teams: {
    create: "New team",
    defaultName: (n: number) => `Team ${n}`,
    namePlaceholder: "Team name",
    remove: "Delete team",
    membersLegend: "Members",
    memberSlot: (n: number) => `Member ${n}`,
    noMember: "— Character —",
    assignTitle: "Assigned stamps (from inventory)",
    noStamp: "— None —",
    unknownSet: "Unknown set",
    synergy: "Synergy",
    typesLabel: "Damage types",
    rolesLabel: "Roles",
    weakestLabel: "Team weak link",
    weakestMissing: (character: string, piece: string) =>
      `${character} — Stamp ${piece} missing`,
    weakestScore: (character: string, piece: string, score: string) =>
      `${character} — Stamp ${piece} (${score})`,
    weakestNone: "Assign stamps to see the weak link.",
    noMembersHint: "Pick up to 3 characters.",
    emptyTitle: "No teams",
    emptyDescription:
      "Create your first team: 3 characters, your inventory stamps, and a synergy analysis.",
    loading: "Loading teams…",
    sameSetWarning: (set: string) =>
      `Several members are competing for the ${set} set.`,
  },
};
