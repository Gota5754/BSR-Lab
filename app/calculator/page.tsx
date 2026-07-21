import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataDisclaimer } from "@/components/shared/DataDisclaimer";
import { PullCalculator } from "@/components/calculator/PullCalculator";
import { CharacterCalculator } from "@/components/calculator/CharacterCalculator";
import { WeaponCalculator } from "@/components/calculator/WeaponCalculator";
import { SkillCalculator } from "@/components/calculator/SkillCalculator";
import { resourceDataCredits } from "@/lib/calculator/costs";

export const metadata: Metadata = {
  title: "Calculateur",
  description:
    "Calculez les ressources nécessaires dans Bleach: Soul Resonance : EXP, Kans, essences, Tamahagane, arts, omamori et pulls.",
};

export default function CalculatorPage() {
  return (
    <>
      <PageHeader pageKey="calculator" />
      <DataDisclaimer />
      <div className="grid items-start gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <PullCalculator />
          <SkillCalculator />
        </div>
        <div className="space-y-4">
          <CharacterCalculator />
          <WeaponCalculator />
        </div>
      </div>
      <p className="mt-6 text-center text-xs italic text-bsr-faint">
        {resourceDataCredits}
      </p>
    </>
  );
}
