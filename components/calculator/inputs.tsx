"use client";

/* Petits contrôles partagés des calculateurs. */

type LevelSelectProps = {
  label: string;
  value: number;
  options: number[];
  onChange: (value: number) => void;
};

export function LevelSelect({
  label,
  value,
  options,
  onChange,
}: LevelSelectProps) {
  return (
    <div>
      <label className="eyebrow mb-2 block">{label}</label>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-10 w-full rounded-md border border-bsr-border bg-bsr-ink px-3 text-sm text-bsr-paper focus:border-bsr-paper-dim focus:outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

type NumberFieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  max?: number;
};

export function NumberField({
  label,
  value,
  onChange,
  placeholder = "0",
  max,
}: NumberFieldProps) {
  return (
    <div>
      <label className="eyebrow mb-2 block">{label}</label>
      <input
        type="number"
        inputMode="numeric"
        aria-label={label}
        min={0}
        max={max}
        value={value === 0 ? "" : value}
        placeholder={placeholder}
        onChange={(e) =>
          onChange(Math.max(0, Number(e.target.value) || 0))
        }
        className="tabular h-10 w-full rounded-md border border-bsr-border bg-bsr-ink px-3 text-sm text-bsr-paper placeholder:text-bsr-faint focus:border-bsr-paper-dim focus:outline-none"
      />
    </div>
  );
}
