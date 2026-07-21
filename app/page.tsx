"use client";

import Link from "next/link";
import { Calculator, Layers, ListOrdered, Stamp } from "lucide-react";
import { GradeBadge, type Grade } from "@/components/stamps/GradeBadge";
import { useT } from "@/lib/i18n";

const GRADES: Grade[] = ["S", "A", "B", "C", "D"];

/* Jauges d'exemple pour valider la DA (§3.4) — noms de stats anglais. */
const DEMO_SUBSTATS = [
  { name: "Crit Rate", value: 92, tone: "bg-bsr-reiatsu" },
  { name: "Crit DMG", value: 61, tone: "bg-bsr-paper-dim" },
  { name: "ATK%", value: 44, tone: "bg-bsr-paper-dim" },
  { name: "HP", value: 18, tone: "bg-bsr-steel" },
] as const;

export default function Home() {
  const t = useT();

  const tools = [
    { href: "/rater", icon: Stamp, title: t.nav.rater, description: t.home.toolDescriptions.rater },
    { href: "/tier-list", icon: ListOrdered, title: t.nav.tierList, description: t.home.toolDescriptions.tierList },
    { href: "/calculator", icon: Calculator, title: t.nav.calculator, description: t.home.toolDescriptions.calculator },
    { href: "/inventory", icon: Layers, title: t.nav.inventory, description: t.home.toolDescriptions.inventory },
  ];

  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="pt-8 md:pt-16">
        <p className="eyebrow mb-3">{t.home.eyebrow}</p>
        <h1 className="heading-serif max-w-3xl text-5xl leading-tight text-bsr-paper md:text-7xl">
          {t.home.title}
        </h1>
        <p className="mt-5 max-w-xl text-base text-bsr-paper-dim">
          {t.home.intro}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/rater"
            className="rounded-md bg-bsr-reiatsu px-5 py-2.5 text-sm font-medium text-bsr-ink transition-opacity hover:opacity-90"
          >
            {t.home.ctaPrimary}
          </Link>
          <Link
            href="/tier-list"
            className="rounded-md border border-bsr-border px-5 py-2.5 text-sm text-bsr-paper-dim transition-colors hover:bg-bsr-ink-3 hover:text-bsr-paper"
          >
            {t.home.ctaSecondary}
          </Link>
        </div>
      </section>

      {/* Outils */}
      <section>
        <p className="eyebrow mb-2">{t.home.toolsEyebrow}</p>
        <h2 className="heading-serif mb-6 text-3xl text-bsr-paper">
          {t.home.toolsTitle}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-[10px] border border-bsr-border bg-bsr-ink-2 p-5 transition-colors hover:bg-bsr-ink-3"
            >
              <tool.icon className="mb-4 size-5 text-bsr-muted transition-colors group-hover:text-bsr-paper" />
              <h3 className="heading-serif text-xl text-bsr-paper">
                {tool.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-bsr-muted">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Aperçu grades + jauges (validation DA) */}
      <section>
        <p className="eyebrow mb-2">{t.home.gradesEyebrow}</p>
        <h2 className="heading-serif mb-6 text-3xl text-bsr-paper">
          {t.home.gradesTitle}
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[10px] border border-bsr-border bg-bsr-ink-2 p-6">
            <div className="flex items-center gap-3">
              {GRADES.map((grade) => (
                <GradeBadge key={grade} grade={grade} size="lg" />
              ))}
            </div>
            <p className="mt-5 text-sm text-bsr-muted">{t.home.gradesNote}</p>
          </div>
          <div className="rounded-[10px] border border-bsr-border bg-bsr-ink-2 p-6">
            <div className="mb-5 flex items-baseline justify-between">
              <span className="eyebrow">{t.home.scoreLabel}</span>
              <span className="heading-serif tabular text-4xl text-bsr-reiatsu">
                92,4
              </span>
            </div>
            <ul className="space-y-3">
              {DEMO_SUBSTATS.map((substat) => (
                <li key={substat.name}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-bsr-paper-dim">{substat.name}</span>
                    <span className="tabular text-bsr-muted">
                      {substat.value}
                    </span>
                  </div>
                  <div className="h-1 rounded-full bg-bsr-border">
                    <div
                      className={`h-1 rounded-full ${substat.tone}`}
                      style={{ width: `${substat.value}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
