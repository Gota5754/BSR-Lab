"use client";

import { useT, type Dict } from "@/lib/i18n";

type PageHeaderProps = {
  /* Clé de la page dans dict.pages (titre/description traduits). */
  pageKey: keyof Dict["pages"];
};

export function PageHeader({ pageKey }: PageHeaderProps) {
  const t = useT();
  const page = t.pages[pageKey];
  return (
    <div className="mb-8">
      <p className="eyebrow mb-2">{page.eyebrow}</p>
      <h1 className="heading-serif text-4xl text-bsr-paper md:text-5xl">
        {page.title}
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-bsr-paper-dim">
        {page.description}
      </p>
    </div>
  );
}
