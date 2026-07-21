import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataDisclaimer } from "@/components/shared/DataDisclaimer";
import { TeamsView } from "@/components/teams/TeamsView";

export const metadata: Metadata = {
  title: "Équipes",
  description:
    "Composez vos équipes de Bleach: Soul Resonance, assignez vos stamps et repérez le maillon faible.",
};

export default function TeamsPage() {
  return (
    <>
      <PageHeader pageKey="teams" />
      <DataDisclaimer />
      <TeamsView />
    </>
  );
}
