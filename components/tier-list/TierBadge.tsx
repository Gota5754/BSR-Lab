import type { Tier } from "@/types";
import { cn } from "@/lib/utils";

/* Badges des tiers de personnages (SS → D). Déclinaison de la rampe
   §3.3 avec SS au sommet — le seul à porter le glow orange. */
const tierStyles: Record<Tier, string> = {
  SS: "bg-bsr-reiatsu text-bsr-ink glow-reiatsu",
  S: "bg-bsr-reiatsu/80 text-bsr-ink",
  A: "bg-bsr-blood text-bsr-paper",
  B: "bg-bsr-steel text-bsr-paper-dim",
  C: "bg-bsr-ink-3 text-bsr-faint",
  D: "bg-transparent border border-bsr-border text-bsr-faint",
};

export function TierBadge({ tier }: { tier: Tier }) {
  return (
    <span
      className={cn(
        "heading-serif inline-flex size-14 items-center justify-center rounded-md",
        tier === "SS" ? "text-2xl" : "text-3xl",
        tierStyles[tier]
      )}
    >
      {tier}
    </span>
  );
}
