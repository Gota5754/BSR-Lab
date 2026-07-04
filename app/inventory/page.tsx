import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataDisclaimer } from "@/components/shared/DataDisclaimer";
import { InventoryView } from "@/components/stamps/InventoryView";

export const metadata: Metadata = {
  title: "Inventaire",
  description:
    "Vos Set Stamps évalués, sauvegardés localement, avec les priorités d'amélioration par personnage.",
};

export default function InventoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Outil"
        title="Inventaire"
        description="Vos stamps évalués, sauvegardés localement dans votre navigateur. Exportez le JSON pour changer d'appareil."
      />
      <DataDisclaimer />
      <InventoryView />
    </>
  );
}
