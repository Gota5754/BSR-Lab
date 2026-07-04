import type { StampPassive } from "@/types";

/* Passifs 6★ (ascension niv 25) — transcrits des données du jeu (Lv.1).
   Un stamp gagne 1 passif aléatoire ; équiper un doublon monte son niveau. */
export const stampPassives: StampPassive[] = [
  {
    id: "enhanced-basic-attack",
    name: "Enhanced Basic Attack",
    descriptionLv1: "Increases Basic Attack DMG by 30%.",
  },
  {
    id: "enhanced-technique",
    name: "Enhanced Technique",
    descriptionLv1: "Increases Technique DMG by 30%.",
  },
  {
    id: "enhanced-ultimate",
    name: "Enhanced Ultimate",
    descriptionLv1: "Increases Ultimate DMG by 22.5%.",
  },
  {
    id: "enhanced-special-attack",
    name: "Enhanced Special Attack",
    descriptionLv1: "Increases Special Attack DMG by 22.5%.",
  },
  {
    id: "enhanced-battlefield-skill",
    name: "Enhanced Battlefield Skill",
    descriptionLv1: "Increases Battlefield Skill DMG by 22.5%.",
  },
  {
    id: "enhanced-damage",
    name: "Enhanced Damage",
    descriptionLv1: "Increases all DMG by 9%.",
  },
  {
    id: "invigorate",
    name: "Invigorate",
    descriptionLv1:
      "Releasing a technique or Ultimate increases All-Type DMG dealt by the entire team by 3.6% for 25s. Unstackable.",
  },
  {
    id: "restrain",
    name: "Restrain",
    descriptionLv1:
      "Attacks have a chance to reduce the enemy's All-Type Resistance by 3.6% for 10s. Unstackable.",
  },
  {
    id: "restrain-2",
    name: "Restrain II",
    descriptionLv1:
      "Attacks have a chance to reduce the enemy's All-Type Resistance by 3.6% for 10s. Releasing a Battlefield Skill will reduce it by an extra 1.2%. Unstackable.",
  },
  {
    id: "overdrive-tactic",
    name: "Overdrive - Tactic",
    roleAffinity: "Tactic",
    descriptionLv1:
      "Increases all damage dealt by 9%. When equipped by a Tactic character, the effect is further enhanced by 3%.",
  },
  {
    id: "overdrive-full-assault",
    name: "Overdrive - Full Assault",
    roleAffinity: "Full Assault",
    descriptionLv1:
      "Increases all damage dealt by 9%. When equipped by a Full Assault character, the effect is further enhanced by 3%.",
  },
  {
    id: "overdrive-support",
    name: "Overdrive - Support",
    roleAffinity: "Support",
    descriptionLv1:
      "Increases all damage dealt by 9%. When equipped by a Support character, the effect is further enhanced by 3%.",
  },
  {
    id: "invigorate-support",
    name: "Invigorate - Support",
    roleAffinity: "Support",
    descriptionLv1:
      "Releasing a technique or Ultimate increases all damage dealt by the entire team by 3.6%. When equipped by a Support character, the effect is further enhanced by 1.2%. Lasts for 25 seconds.",
  },
  {
    id: "invigorate-tactic",
    name: "Invigorate - Tactic",
    roleAffinity: "Tactic",
    descriptionLv1:
      "Releasing a technique or Ultimate increases all damage dealt by the entire team by 3.6%. When equipped by a Tactic character, the effect is further enhanced by 1.2%. Lasts for 25 seconds.",
  },
  {
    id: "enhanced-basic-attack-full-assault",
    name: "Enhanced Basic Attack - Full Assault",
    roleAffinity: "Full Assault",
    descriptionLv1:
      "Increases the damage dealt by basic attacks by 30%. When equipped by a Full Assault character, the effect is further enhanced by 10%.",
  },
  {
    id: "enhanced-technique-full-assault",
    name: "Enhanced Technique - Full Assault",
    roleAffinity: "Full Assault",
    descriptionLv1:
      "Increases the damage dealt by techniques by 30%. When equipped by a Full Assault character, the effect is further enhanced by 10%.",
  },
  {
    id: "enhanced-ultimate-full-assault",
    name: "Enhanced Ultimate - Full Assault",
    roleAffinity: "Full Assault",
    /* ⚠️ Fin de description coupée sur la capture — bonus supposé 7.5%. */
    descriptionLv1:
      "Increases the damage dealt by Ultimates by 22.5%. When equipped by a Full Assault character, the effect is further enhanced by 7.5%.",
  },
  {
    id: "enhanced-special-attack-full-assault",
    name: "Enhanced Special Attack - Full Assault",
    roleAffinity: "Full Assault",
    descriptionLv1:
      "Increases the damage dealt by special attacks by 22.5%. When equipped by a Full Assault character, the effect is further enhanced by 7.5%.",
  },
  {
    id: "enhanced-damage-2",
    name: "Enhanced Damage II",
    descriptionLv1:
      "All DMG Bonus increases by 9%, and reduces the debuffed enemy's all DMG Resistance by 1.2%. Lasts 25s. Unstackable.",
  },
  {
    id: "enhanced-battlefield-skill-2",
    name: "Enhanced Battlefield Skill II",
    descriptionLv1:
      "Increases Battlefield Skill DMG by 22.5%. While releasing the Battlefield Skill, deals extra DMG equal to 12% of ATK.",
  },
];
