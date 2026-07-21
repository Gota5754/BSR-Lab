"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useT } from "@/lib/i18n";
import { LanguageToggle } from "./LanguageToggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const t = useT();

  return (
    <header className="sticky top-0 z-50 border-b border-bsr-border bg-bsr-ink/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="heading-serif text-xl text-bsr-paper"
          onClick={() => setOpen(false)}
        >
          BSR<span className="text-bsr-reiatsu"> Lab</span>
        </Link>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-1 md:flex">
            {siteConfig.nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm transition-colors",
                    active
                      ? "bg-bsr-ink-3 text-bsr-paper"
                      : "text-bsr-paper-dim hover:bg-bsr-ink-3 hover:text-bsr-paper"
                  )}
                >
                  {t.nav[item.labelKey]}
                </Link>
              );
            })}
          </nav>

          <a
            href={siteConfig.kofi}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-md border border-bsr-border px-3 py-1.5 text-sm text-bsr-paper-dim transition-colors hover:border-bsr-reiatsu/60 hover:text-bsr-paper sm:inline-flex"
          >
            <Heart className="size-4 text-bsr-reiatsu" />
            {t.support}
          </a>

          <LanguageToggle />

          <button
            type="button"
            className="rounded-md p-2 text-bsr-paper-dim hover:bg-bsr-ink-3 hover:text-bsr-paper md:hidden"
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-bsr-border px-4 py-2 md:hidden">
          {siteConfig.nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-md px-3 py-2.5 text-sm",
                  active
                    ? "bg-bsr-ink-3 text-bsr-paper"
                    : "text-bsr-paper-dim hover:bg-bsr-ink-3 hover:text-bsr-paper"
                )}
              >
                {t.nav[item.labelKey]}
              </Link>
            );
          })}
          <a
            href={siteConfig.kofi}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-bsr-paper-dim hover:bg-bsr-ink-3 hover:text-bsr-paper"
          >
            <Heart className="size-4 text-bsr-reiatsu" />
            {t.support}
          </a>
        </nav>
      )}
    </header>
  );
}
