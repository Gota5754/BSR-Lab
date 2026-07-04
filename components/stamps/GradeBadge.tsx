import { cn } from "@/lib/utils";
import type { Grade } from "@/lib/scoring/grades";

export type { Grade };

/* Styles par grade — CLAUDE.md §3.3 */
const gradeStyles: Record<Grade, string> = {
  S: "bg-bsr-reiatsu text-bsr-ink glow-reiatsu",
  A: "bg-bsr-blood text-bsr-paper",
  B: "bg-bsr-steel text-bsr-paper-dim",
  C: "bg-bsr-ink-3 text-bsr-faint",
  D: "bg-transparent border border-bsr-border text-bsr-faint",
};

type GradeBadgeProps = {
  grade: Grade;
  size?: "sm" | "lg";
  className?: string;
};

export function GradeBadge({ grade, size = "sm", className }: GradeBadgeProps) {
  return (
    <span
      className={cn(
        "heading-serif inline-flex items-center justify-center rounded-md",
        size === "sm" ? "size-8 text-lg" : "size-14 text-3xl",
        gradeStyles[grade],
        className
      )}
    >
      {grade}
    </span>
  );
}
