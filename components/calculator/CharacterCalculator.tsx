"use client";

import { useState } from "react";
import {
  bookExp,
  calcCharacterCost,
  expFromBooks,
  LEVEL_STEPS,
  type BookCounts,
} from "@/lib/calculator/costs";
import { SectionCard } from "./SectionCard";
import { LevelSelect } from "./inputs";
import { formatNumber, ResourceRow } from "./ResourceRow";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const zeroBooks: BookCounts = { green: 0, blue: 0, purple: 0, yellow: 0 };

export function CharacterCalculator() {
  const base = useT().calc.character;
  const TEXTS = {
    ...base,
    bookGreen: base.book(base.bookColors.green, formatNumber(bookExp.green)),
    bookBlue: base.book(base.bookColors.blue, formatNumber(bookExp.blue)),
    bookPurple: base.book(base.bookColors.purple, formatNumber(bookExp.purple)),
    bookYellow: base.book(base.bookColors.yellow, formatNumber(bookExp.yellow)),
  };
  const [fromLevel, setFromLevel] = useState(1);
  const [toLevel, setToLevel] = useState(100);
  const [essences, setEssences] = useState({ green: 0, blue: 0, purple: 0 });
  const [books, setBooks] = useState<BookCounts>(zeroBooks);

  const cost = calcCharacterCost(fromLevel, toLevel);
  const ownedExp = expFromBooks(books);
  const booksEnough = ownedExp >= cost.exp;

  function selectFrom(level: number) {
    setFromLevel(level);
    if (toLevel <= level) {
      setToLevel(LEVEL_STEPS[LEVEL_STEPS.indexOf(level) + 1] ?? 100);
    }
  }

  return (
    <SectionCard title={TEXTS.title}>
      <div className="grid grid-cols-2 gap-3">
        <LevelSelect
          label={TEXTS.from}
          value={fromLevel}
          options={LEVEL_STEPS.slice(0, -1)}
          onChange={selectFrom}
        />
        <LevelSelect
          label={TEXTS.to}
          value={toLevel}
          options={LEVEL_STEPS.filter((l) => l > fromLevel)}
          onChange={setToLevel}
        />
      </div>

      <div className="mt-4 space-y-1 border-t border-bsr-border pt-3">
        <ResourceRow label={TEXTS.exp} needed={cost.exp} />
        <ResourceRow label={TEXTS.kans} needed={cost.kans} />
      </div>

      <p className="eyebrow mt-4 mb-1">{TEXTS.essences}</p>
      {cost.essences.green > 0 && (
        <ResourceRow
          label={TEXTS.essGreen}
          needed={cost.essences.green}
          owned={essences.green}
          onOwned={(green) => setEssences({ ...essences, green })}
        />
      )}
      {cost.essences.blue > 0 && (
        <ResourceRow
          label={TEXTS.essBlue}
          needed={cost.essences.blue}
          owned={essences.blue}
          onOwned={(blue) => setEssences({ ...essences, blue })}
        />
      )}
      {cost.essences.purple > 0 && (
        <ResourceRow
          label={TEXTS.essPurple}
          needed={cost.essences.purple}
          owned={essences.purple}
          onOwned={(purple) => setEssences({ ...essences, purple })}
        />
      )}

      <p className="eyebrow mt-4 mb-1">{TEXTS.books}</p>
      {(
        [
          ["green", TEXTS.bookGreen],
          ["blue", TEXTS.bookBlue],
          ["purple", TEXTS.bookPurple],
          ["yellow", TEXTS.bookYellow],
        ] as const
      ).map(([key, label]) => (
        <ResourceRow
          key={key}
          label={label}
          owned={books[key]}
          onOwned={(value) => setBooks({ ...books, [key]: value })}
        />
      ))}

      <div
        className={cn(
          "mt-3 flex items-center justify-between rounded-md border px-3 py-2 text-xs",
          booksEnough
            ? "border-bsr-paper-dim/40 text-bsr-paper"
            : "border-bsr-border text-bsr-muted"
        )}
      >
        <span>{TEXTS.expOwned}</span>
        <span className="tabular">
          {booksEnough
            ? TEXTS.booksEnough
            : `${formatNumber(ownedExp)} / ${formatNumber(cost.exp)}`}
        </span>
      </div>
    </SectionCard>
  );
}
