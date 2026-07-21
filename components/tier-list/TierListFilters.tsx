"use client";

import type { DamageType, Role } from "@/types";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const ROLES: Role[] = ["Full Assault", "Support", "Tactic"];
export const DAMAGE_TYPES: DamageType[] = [
  "Slash",
  "Thrust",
  "Strike",
  "Spirit",
];

export type TierListFilterState = {
  role: Role | null;
  damageType: DamageType | null;
};

type TierListFiltersProps = {
  value: TierListFilterState;
  onChange: (value: TierListFilterState) => void;
};

function ChipGroup<T extends string>({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: T[];
  selected: T | null;
  onSelect: (value: T | null) => void;
}) {
  const TEXTS = useT().tierList;
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="eyebrow mr-1">{label}</span>
      {[null, ...options].map((option) => (
        <button
          key={option ?? "all"}
          type="button"
          aria-pressed={selected === option}
          onClick={() => onSelect(option)}
          className={cn(
            "rounded-md border px-3 py-1.5 text-xs transition-colors",
            selected === option
              ? "border-bsr-paper-dim bg-bsr-ink-3 text-bsr-paper"
              : "border-bsr-border bg-bsr-ink-2 text-bsr-muted hover:text-bsr-paper-dim"
          )}
        >
          {option ?? TEXTS.all}
        </button>
      ))}
    </div>
  );
}

export function TierListFilters({ value, onChange }: TierListFiltersProps) {
  const TEXTS = useT().tierList;
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-8">
      <ChipGroup
        label={TEXTS.roleLabel}
        options={ROLES}
        selected={value.role}
        onSelect={(role) => onChange({ ...value, role })}
      />
      <ChipGroup
        label={TEXTS.typeLabel}
        options={DAMAGE_TYPES}
        selected={value.damageType}
        onSelect={(damageType) => onChange({ ...value, damageType })}
      />
    </div>
  );
}
