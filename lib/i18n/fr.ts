/* Dictionnaire français — source de vérité des textes d'UI.
   Les termes techniques du jeu (stats, rôles, sets, passifs) restent en
   anglais dans les deux langues (CLAUDE.md §5.1). */

export const fr = {
  nav: {
    rater: "Rater",
    tierList: "Tier list",
    calculator: "Calculateur",
    inventory: "Inventaire",
    teams: "Équipes",
  },

  footer: {
    disclaimer:
      "Site non affilié — Bleach: Soul Resonance est une marque de ses ayants droit.",
    patchLine: (patch: string) => `données à jour du patch ${patch}`,
  },

  dataDisclaimer: (patch: string) => `Données à jour du patch ${patch}`,

  pages: {
    rater: {
      eyebrow: "Outil",
      title: "Rater",
      description:
        "Évaluez vos Set Stamps substat par substat, avec un score pondéré par personnage.",
    },
    tierList: {
      eyebrow: "Outil",
      title: "Tier list",
      description:
        "Le classement des personnages, mis à jour à chaque patch avec justifications.",
    },
    calculator: {
      eyebrow: "Outil",
      title: "Calculateur",
      description:
        "Estimez les ressources nécessaires pour monter vos personnages, armes, compétences et passifs — et planifiez vos pulls.",
    },
    inventory: {
      eyebrow: "Outil",
      title: "Inventaire",
      description:
        "Vos stamps évalués, sauvegardés localement dans votre navigateur. Exportez le JSON pour changer d'appareil.",
    },
    teams: {
      eyebrow: "Outil",
      title: "Équipes",
      description:
        "Composez vos équipes de 3 personnages, assignez vos stamps et repérez le maillon faible.",
    },
  },

  home: {
    eyebrow: "Bleach: Soul Resonance",
    title: "Le labo de vos Set Stamps",
    intro:
      "Évaluez vos stamps, consultez la tier list, planifiez vos ressources. Gratuit, sans compte, pensé pour être utilisé en jouant.",
    ctaPrimary: "Évaluer un stamp",
    ctaSecondary: "Voir la tier list",
    toolsEyebrow: "Outils",
    toolsTitle: "Tout le labo",
    toolDescriptions: {
      rater:
        "Notez vos Set Stamps substat par substat, avec un score pondéré par personnage.",
      tierList:
        "Le classement des personnages, mis à jour à chaque patch avec justifications.",
      calculator:
        "Estimez les ressources nécessaires pour monter vos personnages et armes.",
      inventory:
        "Vos stamps évalués, sauvegardés en local. Export et import JSON inclus.",
    },
    gradesEyebrow: "Aperçu",
    gradesTitle: "Le système de grades",
    gradesNote:
      "Chaque stamp évalué reçoit un grade de S à D selon les pondérations du personnage ciblé.",
    scoreLabel: "Score",
  },

  picker: {
    legend: "Personnage",
    searchPlaceholder: "Rechercher un personnage…",
    allRarities: "Tous",
    noResult: "Aucun personnage ne correspond.",
  },

  configurator: {
    pieceLegend: "Pièce",
    piecePrefix: "Stamp",
    fixedBasicPrefix: "Basic stat fixe :",
    levelLegend: "Niveau du stamp",
    levelPrefix: "Niv",
    secondBasicLabel: "2e basic stat",
    recommendedSuffix: " (recommandée)",
    substatsLegend: "Substats",
    budgetHint: (used: number, total: number) =>
      `Évolutions simples (niv 10/15/20) : ${used}/${total} réparties`,
    level25Hint: "Niv 25 : +1 automatique sur les 4 substats",
    passiveLabel: "Passif 6★",
    passivePlaceholder: "— Passif non renseigné —",
    passiveLocked: "Ascension niv 25 requise pour le passif 6★",
    passiveAffinityOk: "Affinité avec le rôle du personnage",
  },

  substat: {
    placeholder: "— Substat —",
    evolutionsLabel: "Évolutions simples",
    decrease: "Retirer une évolution",
    increase: "Ajouter une évolution",
    level25Bonus: "+1",
    level25BonusTitle: "Évolution générale du niv 25 (automatique)",
  },

  weightLabels: {
    bis: "BIS",
    strong: "Fort",
    medium: "Moyen",
    weak: "Faible",
  },

  rater: {
    compareOn: "Comparer 2 stamps",
    compareOff: "Quitter la comparaison",
    save: "Sauvegarder dans l'inventaire",
    saved: "Sauvegardé",
    recommendedSets: "Sets recommandés",
    stampA: "Stamp A",
    stampB: "Stamp B",
    reset: "Réinitialiser",
    emptyState:
      "Choisissez la 2e basic stat du stamp pour voir son score en temps réel.",
    emptyStateCompare:
      "Renseignez la 2e basic stat des deux stamps pour obtenir le verdict.",
    verdictKeep: (label: string) => `Gardez le ${label}`,
    verdictTie: "Égalité — gardez celui qui coûte le moins à monter",
    verdictDelta: (points: string) => `+${points} points`,
    verdictPotential: "Départagés au potentiel des substats",
    verdictPieceWarning:
      "Pièces différentes : comparaison indicative (elles n'occupent pas le même emplacement).",
  },

  breakdown: {
    scoreLabel: "Score",
    potentialLabel: "Potentiel des substats",
    basicStatOk: "2e basic stat recommandée",
    basicStatOff: "2e basic stat hors méta",
    passiveLabel: "Passif",
    breakdownTitle: "Contribution des substats",
    emptyBreakdown: "Aucune substat renseignée.",
    evolutionsShort: "évo",
    passiveStatus: {
      "not-ascended": "Pas encore de passif (niv < 25)",
      unknown: "Passif non renseigné",
      bis: "Passif BIS pour ce personnage",
      "role-match": "Passif avec affinité de rôle",
      generic: "Passif générique",
      "role-mismatch": "Passif d'un autre rôle (bonus perdu)",
    },
  },

  stampCard: {
    levelPrefix: "Niv",
    basicPrefix: "2e basic :",
    targetPrefix: "Pour",
    noTarget: "Aucun personnage cible",
    potentialShort: "potentiel",
    evolutionsShort: "évo",
    remove: "Supprimer ce stamp",
  },

  inventory: {
    count: (n: number) =>
      `${n} stamp${n > 1 ? "s" : ""} sauvegardé${n > 1 ? "s" : ""}`,
    filterAll: "Tous les personnages",
    exportButton: "Exporter (JSON)",
    importButton: "Importer (JSON)",
    importSuccess: (n: number) =>
      `${n} stamp${n > 1 ? "s" : ""} importé${n > 1 ? "s" : ""}.`,
    importError: "Import impossible.",
    emptyTitle: "Inventaire vide",
    emptyDescription:
      "Évaluez un stamp dans le rater puis sauvegardez-le : il apparaîtra ici, conservé dans votre navigateur.",
    emptyAction: "Ouvrir le rater",
    loading: "Chargement de l'inventaire…",
  },

  focus: {
    title: "Priorités d'amélioration",
    hint: "Basé sur les stamps assignés à chaque personnage (pièces I/II/III d'un même set).",
    missing: (piece: string) => `Stamp ${piece} manquant`,
    weakest: (piece: string) => `Maillon faible : Stamp ${piece}`,
  },

  tierList: {
    empty: "Aucun personnage dans ce tier.",
    all: "Tous",
    roleLabel: "Rôle",
    typeLabel: "Type de dégâts",
  },

  calc: {
    ownedAria: "possédés",
    pull: {
      title: "Invocations",
      crystals: "Cristaux actuels",
      pity: (hardPity: number) => `Pity actuelle (garantie à ${hardPity})`,
      days: "Jours avant le banner",
      daily: "Cristaux gagnés / jour",
      pulls: "Pulls estimés",
      needed: "Pour la garantie",
      enough: "Suffisant",
      missing: "Manquants",
      missingCrystals: (n: string, cost: number) =>
        `Il manque ${n} cristaux (${cost}/pull).`,
    },
    character: {
      title: "Personnage",
      from: "Niveau actuel",
      to: "Niveau cible",
      exp: "EXP nécessaire",
      kans: "Kans total",
      essences: "Essences (ascension)",
      essGreen: "Essences vertes",
      essBlue: "Essences bleues",
      essPurple: "Essences violettes",
      books: "Livres EXP possédés",
      book: (color: string, exp: string) => `Livres ${color} (${exp} EXP)`,
      bookColors: {
        green: "verts",
        blue: "bleus",
        purple: "violets",
        yellow: "jaunes",
      },
      expOwned: "EXP couverte par les livres",
      booksEnough: "Assez de livres ✓",
    },
    weapon: {
      title: "Arme",
      from: "Niveau actuel",
      to: "Niveau cible",
      tamaExp: "EXP Tamahagane nécessaire",
      kans: "Kans total",
      gold: "Or total",
      hammers: "Marteaux (ascension)",
      hamGreen: "Marteaux verts",
      hamBlue: "Marteaux bleus",
      hamPurple: "Marteaux violets",
      tama: "Tamahagane possédés",
      tamaItem: (color: string, exp: string) =>
        `Tamahagane ${color} (${exp} EXP)`,
      tamaColors: {
        green: "verts",
        blue: "bleus",
        purple: "violets",
        yellow: "jaunes",
      },
      expOwned: "EXP couverte par les Tamahagane",
      tamaEnough: "Assez de Tamahagane ✓",
    },
    skills: {
      title: "Compétences & passifs",
      from: "Niv. actuel",
      to: "Niv. cible",
      numSkills: "Nb compétences",
      artGreen: "Arts verts",
      artBlue: "Arts bleus",
      artPurple: "Arts violets",
      passives: "Passifs (niveau cible)",
      passiveLabel: (i: number) => `Passif ${i}`,
      omamori: "Omamori",
      totalKans: "Kans total (compétences + passifs)",
    },
    credits:
      "Données : bsr-calculator.vercel.app — crédits @enveelive, @Ganxo012, @Joker",
  },

  teams: {
    create: "Nouvelle équipe",
    defaultName: (n: number) => `Équipe ${n}`,
    namePlaceholder: "Nom de l'équipe",
    remove: "Supprimer l'équipe",
    membersLegend: "Membres",
    memberSlot: (n: number) => `Membre ${n}`,
    noMember: "— Personnage —",
    assignTitle: "Stamps assignés (depuis l'inventaire)",
    noStamp: "— Aucun —",
    unknownSet: "Set inconnu",
    synergy: "Synergie",
    typesLabel: "Types de dégâts",
    rolesLabel: "Rôles",
    weakestLabel: "Maillon faible de l'équipe",
    weakestMissing: (character: string, piece: string) =>
      `${character} — Stamp ${piece} manquant`,
    weakestScore: (character: string, piece: string, score: string) =>
      `${character} — Stamp ${piece} (${score})`,
    weakestNone: "Assignez des stamps pour voir le maillon faible.",
    noMembersHint: "Choisissez jusqu'à 3 personnages.",
    emptyTitle: "Aucune équipe",
    emptyDescription:
      "Créez votre première équipe : 3 personnages, vos stamps de l'inventaire, et une analyse de synergie.",
    loading: "Chargement des équipes…",
    sameSetWarning: (set: string) =>
      `Plusieurs membres se disputent le set ${set}.`,
  },
};
