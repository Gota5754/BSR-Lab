"use client";

import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function formatNumber(value: number): string {
  return value.toLocaleString("fr-FR");
}

type ResourceRowProps = {
  label: string;
  /* Quantité requise ; absente pour une ligne de simple comptage. */
  needed?: number;
  /* Quantité possédée : si fournie, affiche saisie + jauge de progression. */
  owned?: number;
  onOwned?: (value: number) => void;
};

export function ResourceRow({
  label,
  needed,
  owned,
  onOwned,
}: ResourceRowProps) {
  const t = useT();
  const trackable = owned !== undefined && onOwned !== undefined;
  const hasTarget = needed !== undefined;
  const done = trackable && hasTarget && owned >= needed;
  const progress =
    trackable && hasTarget
      ? Math.min(100, needed > 0 ? (owned / needed) * 100 : 100)
      : 0;

  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className="w-40 shrink-0 text-xs text-bsr-paper-dim">{label}</span>
      <div className="min-w-0 flex-1">
        {hasTarget && (
          <p
            className={cn(
              "tabular mb-1 text-xs",
              done ? "text-bsr-paper" : "text-bsr-muted"
            )}
          >
            {trackable ? `${formatNumber(owned)} / ` : ""}
            {formatNumber(needed)}
            {done && " ✓"}
          </p>
        )}
        {trackable && hasTarget && (
          <div className="h-1 rounded-full bg-bsr-border">
            <div
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                done ? "bg-bsr-paper" : "bg-bsr-paper-dim"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
      {trackable && (
        <input
          type="number"
          inputMode="numeric"
          aria-label={`${label} ${t.calc.ownedAria}`}
          min={0}
          value={owned === 0 ? "" : owned}
          placeholder="0"
          onChange={(e) => onOwned(Math.max(0, Number(e.target.value) || 0))}
          className="tabular h-8 w-20 shrink-0 rounded-md border border-bsr-border bg-bsr-ink px-2 text-right text-xs text-bsr-paper placeholder:text-bsr-faint focus:border-bsr-paper-dim focus:outline-none"
        />
      )}
    </div>
  );
}
