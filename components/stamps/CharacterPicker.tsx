"use client";

import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import type { Character } from "@/types";
import { cn } from "@/lib/utils";

const TEXTS = {
  legend: "Personnage",
  searchPlaceholder: "Rechercher un personnage…",
  allRarities: "Tous",
  noResult: "Aucun personnage ne correspond.",
} as const;

/* Raretés du jeu, de la plus haute à la plus basse. */
const RARITIES = ["SSR", "SR+", "SR"] as const;

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

type CharacterPickerProps = {
  characters: Character[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function CharacterPicker({
  characters,
  selectedId,
  onSelect,
}: CharacterPickerProps) {
  const [query, setQuery] = useState("");
  const [rarity, setRarity] = useState<string | null>(null);

  const filtered = characters.filter(
    (c) =>
      (rarity === null || c.rarity === rarity) &&
      normalize(c.name).includes(normalize(query))
  );

  return (
    <fieldset>
      <legend className="eyebrow mb-3">{TEXTS.legend}</legend>

      <div className="mb-3 flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-bsr-faint" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={TEXTS.searchPlaceholder}
            aria-label={TEXTS.searchPlaceholder}
            className="h-10 w-full rounded-md border border-bsr-border bg-bsr-ink pl-9 pr-3 text-sm text-bsr-paper placeholder:text-bsr-faint focus:border-bsr-paper-dim focus:outline-none"
          />
        </div>
        <div className="flex gap-1.5">
          {[null, ...RARITIES].map((r) => (
            <button
              key={r ?? "all"}
              type="button"
              aria-pressed={rarity === r}
              onClick={() => setRarity(r)}
              className={cn(
                "rounded-md border px-3 py-1.5 text-xs transition-colors",
                rarity === r
                  ? "border-bsr-paper-dim bg-bsr-ink-3 text-bsr-paper"
                  : "border-bsr-border bg-bsr-ink-2 text-bsr-muted hover:text-bsr-paper-dim"
              )}
            >
              {r ?? TEXTS.allRarities}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-md border border-dashed border-bsr-border px-3 py-6 text-center text-sm text-bsr-faint">
          {TEXTS.noResult}
        </p>
      ) : (
        <div className="grid max-h-[420px] grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-4">
          {filtered.map((character) => {
            const selected = character.id === selectedId;
            return (
              <button
                key={character.id}
                type="button"
                aria-pressed={selected}
                onClick={() => onSelect(character.id)}
                className={cn(
                  "overflow-hidden rounded-[10px] border text-left transition-colors",
                  selected
                    ? "border-bsr-paper-dim bg-bsr-ink-3"
                    : "border-bsr-border bg-bsr-ink-2 hover:bg-bsr-ink-3"
                )}
              >
                {/* Images préoptimisées au build : pas d'optimisation Vercel.
                   Fallback typographique tant que l'artwork n'est pas fourni. */}
                <div className="relative aspect-[4/3] w-full bg-bsr-ink-3">
                  {character.imageUrl ? (
                    <Image
                      src={character.imageUrl}
                      alt=""
                      fill
                      unoptimized
                      sizes="(min-width: 640px) 200px, 45vw"
                      className={cn(
                        "object-cover object-top transition-opacity",
                        selected ? "opacity-100" : "opacity-80"
                      )}
                    />
                  ) : (
                    <span className="heading-serif absolute inset-0 flex items-center justify-center text-4xl text-bsr-faint">
                      {character.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <span className="heading-serif block text-base leading-tight text-bsr-paper">
                    {character.name}
                  </span>
                  <span className="mt-1 block text-[11px] text-bsr-muted">
                    {character.rarity} · {character.role} ·{" "}
                    {character.damageType}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </fieldset>
  );
}
