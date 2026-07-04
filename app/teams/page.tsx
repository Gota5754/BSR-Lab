import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataDisclaimer } from "@/components/shared/DataDisclaimer";

export const metadata: Metadata = {
  title: "Équipes",
  description:
    "Composez vos équipes de Bleach: Soul Resonance et assignez vos stamps à chaque membre.",
};

export default function TeamsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Outil"
        title="Équipes"
        description="Composez vos équipes et assignez vos stamps à chaque membre."
      />
      <DataDisclaimer />
      <p className="text-sm text-bsr-muted">En construction.</p>
    </>
  );
}
