import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataDisclaimer } from "@/components/shared/DataDisclaimer";
import { TierListBoard } from "@/components/tier-list/TierListBoard";

export const metadata: Metadata = {
  title: "Tier list",
  description:
    "La tier list des personnages de Bleach: Soul Resonance, mise à jour à chaque patch avec justifications.",
};

export default function TierListPage() {
  return (
    <>
      <PageHeader pageKey="tierList" />
      <DataDisclaimer />
      <TierListBoard />
    </>
  );
}
