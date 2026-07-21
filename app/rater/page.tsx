import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataDisclaimer } from "@/components/shared/DataDisclaimer";
import { StampForm } from "@/components/stamps/StampForm";

export const metadata: Metadata = {
  title: "Rater",
  description:
    "Évaluez vos Set Stamps de Bleach: Soul Resonance — score sur 100, grade S à D et potentiel, pondérés par personnage.",
};

export default function RaterPage() {
  return (
    <>
      <PageHeader pageKey="rater" />
      <DataDisclaimer />
      <StampForm />
    </>
  );
}
