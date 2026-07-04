export const siteConfig = {
  name: "BSR Lab",
  tagline:
    "Le labo francophone de Bleach: Soul Resonance — rater, tier list, calculateurs, guides",
  description:
    "La référence communautaire francophone de Bleach: Soul Resonance : évaluateur de Set Stamps, tier list des personnages, calculateur de ressources et guides de build.",
  url: "https://bsr-lab.vercel.app",
  repo: "https://github.com/Gota5754/BSR-Lab",
  currentPatch: "1.0",
  disclaimer:
    "Site non affilié — Bleach: Soul Resonance est une marque de ses ayants droit.",
  nav: [
    { href: "/rater", label: "Rater" },
    { href: "/tier-list", label: "Tier list" },
    { href: "/calculator", label: "Calculateur" },
    { href: "/inventory", label: "Inventaire" },
    { href: "/teams", label: "Équipes" },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
