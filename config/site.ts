export const siteConfig = {
  name: "BSR Lab",
  tagline:
    "Le labo francophone de Bleach: Soul Resonance — rater, tier list, calculateurs, guides",
  description:
    "La référence communautaire francophone de Bleach: Soul Resonance : évaluateur de Set Stamps, tier list des personnages, calculateur de ressources et guides de build.",
  url: "https://bsr-lab.vercel.app",
  repo: "https://github.com/Gota5754/BSR-Lab",
  currentPatch: "Juil. 2026",
  disclaimer:
    "Site non affilié — Bleach: Soul Resonance est une marque de ses ayants droit.",
  /* labelKey : clé du libellé dans lib/i18n (dict.nav). */
  nav: [
    { href: "/rater", labelKey: "rater" },
    { href: "/tier-list", labelKey: "tierList" },
    { href: "/calculator", labelKey: "calculator" },
    { href: "/inventory", labelKey: "inventory" },
    { href: "/teams", labelKey: "teams" },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
