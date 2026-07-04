import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-bsr-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-bsr-faint md:flex-row md:items-center md:justify-between md:px-6">
        <p>{siteConfig.disclaimer}</p>
        <p>
          {siteConfig.name} — données à jour du patch {siteConfig.currentPatch}
        </p>
      </div>
    </footer>
  );
}
