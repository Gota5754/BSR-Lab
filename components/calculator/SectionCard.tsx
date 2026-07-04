"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type SectionCardProps = {
  title: string;
  children: ReactNode;
};

export function SectionCard({ title, children }: SectionCardProps) {
  const [open, setOpen] = useState(true);

  return (
    <section className="overflow-hidden rounded-[10px] border border-bsr-border bg-bsr-ink-2">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="eyebrow">{title}</span>
        <ChevronDown
          className={cn(
            "size-4 text-bsr-faint transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </section>
  );
}
