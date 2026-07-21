/* Constantes de calibration du moteur de scoring.

   Mécanique réelle du jeu : pas de rolls. Aux niv 10/15/20, une substat
   aléatoire « évolue » (évolutions simples, cumulables sur une même
   substat) ; au niv 25, les 4 substats évoluent toutes (+1 automatique)
   et le stamp gagne un passif 6★ aléatoire.

   Le score est ABSOLU : il compare le stamp au stamp parfait niv 30
   (4 meilleures substats, 3 évolutions simples sur la BIS, passif BIS).
   Un stamp niv 1 est donc plafonné bas — son « potentiel » (qualité de
   ses 4 substats) est affiché séparément pour décider de l'investir. */

/* Évolutions simples maximum (niv 10, 15, 20). */
export const MAX_SINGLE_EVOLUTIONS = 3;

/* Évolutions max sur une même substat (3 simples + le +1 du niv 25). */
export const MAX_EVOLUTIONS = 4;

/* Répartition du score final. */
export const SUBSTAT_SHARE = 0.7;
export const BASIC_STAT_SHARE = 0.15;
export const PASSIVE_SHARE = 0.15;

/* Qualité d'une 2e basic stat hors des recommandations
   (0.35 plutôt que 0 : une basic stat « correcte » reste jouable). */
export const OFF_META_BASIC_STAT_QUALITY = 0.35;

/* Qualités de la composante passif (stamp ascensionné niv 25+). */
export const PASSIVE_QUALITY = {
  /* Passif dans les recommandations du personnage. */
  bis: 1,
  /* Affinité de rôle correspondante (ex. Overdrive - Tactic sur un Tactic). */
  roleMatch: 0.8,
  /* Passif générique sans affinité de rôle. */
  generic: 0.6,
  /* Affinité d'un autre rôle : bonus perdu. */
  roleMismatch: 0.3,
  /* Passif non renseigné alors que le stamp est ascensionné : neutre. */
  unknown: 0.5,
} as const;

/* Paliers de pertinence d'une substat selon son poids (UI du rater).
   Les libellés affichés viennent de lib/i18n (dict.weightLabels). */
export type WeightTier = "bis" | "strong" | "medium" | "weak";

export const WEIGHT_TIERS: Array<{ min: number; tier: WeightTier }> = [
  { min: 0.9, tier: "bis" },
  { min: 0.6, tier: "strong" },
  { min: 0.25, tier: "medium" },
  { min: 0, tier: "weak" },
];

export function getWeightTier(weight: number): WeightTier {
  const entry = WEIGHT_TIERS.find((t) => weight >= t.min);
  return entry ? entry.tier : "weak";
}
