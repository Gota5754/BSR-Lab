import { siteConfig } from "@/config/site";

export function DataDisclaimer() {
  return (
    <p className="mb-6 rounded-md border border-bsr-border bg-bsr-ink-2 px-3 py-2 text-xs text-bsr-muted">
      Données à jour du patch {siteConfig.currentPatch}
    </p>
  );
}
