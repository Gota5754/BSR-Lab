"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Download, Upload } from "lucide-react";
import { useInventoryStore } from "@/stores/inventory-store";
import { useHydrated } from "@/hooks/useHydrated";
import { buildInventoryExport, parseInventoryExport } from "@/lib/storage";
import { getCharacters } from "@/lib/data";
import { EmptyState } from "@/components/shared/EmptyState";
import { StampCard } from "./StampCard";
import { InventoryFocus } from "./InventoryFocus";
import { useT } from "@/lib/i18n";

export function InventoryView() {
  const TEXTS = useT().inventory;
  const hydrated = useHydrated();
  const stamps = useInventoryStore((s) => s.stamps);
  const removeStamp = useInventoryStore((s) => s.removeStamp);
  const importStamps = useInventoryStore((s) => s.importStamps);

  const [filterCharacterId, setFilterCharacterId] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  /* useHydrated obligatoire : le store persist n'existe pas côté SSG. */
  if (!hydrated) {
    return <p className="text-sm text-bsr-faint">{TEXTS.loading}</p>;
  }

  const filtered = filterCharacterId
    ? stamps.filter((s) => s.targetCharacterId === filterCharacterId)
    : stamps;

  function handleExport() {
    const data = buildInventoryExport(stamps);
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bsr-lab-inventaire-${data.exportedAt.slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function handleImportFile(file: File) {
    try {
      const imported = parseInventoryExport(await file.text());
      const count = importStamps(imported);
      setMessage(TEXTS.importSuccess(count));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : TEXTS.importError);
    }
  }

  if (stamps.length === 0) {
    return (
      <>
        <EmptyState
          title={TEXTS.emptyTitle}
          description={TEXTS.emptyDescription}
          action={
            <Link
              href="/rater"
              className="inline-block rounded-md bg-bsr-reiatsu px-5 py-2.5 text-sm font-medium text-bsr-ink transition-opacity hover:opacity-90"
            >
              {TEXTS.emptyAction}
            </Link>
          }
        />
        <ImportRow
          fileInput={fileInput}
          onFile={handleImportFile}
          message={message}
        />
      </>
    );
  }

  return (
    <div className="space-y-4">
      <InventoryFocus stamps={stamps} />

      <div className="flex flex-wrap items-center gap-3">
        <p className="tabular text-sm text-bsr-paper-dim">
          {TEXTS.count(stamps.length)}
        </p>
        <select
          aria-label={TEXTS.filterAll}
          value={filterCharacterId}
          onChange={(e) => setFilterCharacterId(e.target.value)}
          className="h-9 rounded-md border border-bsr-border bg-bsr-ink px-3 text-sm text-bsr-paper focus:border-bsr-paper-dim focus:outline-none"
        >
          <option value="">{TEXTS.filterAll}</option>
          {getCharacters().map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 rounded-md border border-bsr-border px-3 py-2 text-xs text-bsr-paper-dim transition-colors hover:bg-bsr-ink-3 hover:text-bsr-paper"
          >
            <Download className="size-3.5" /> {TEXTS.exportButton}
          </button>
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="inline-flex items-center gap-2 rounded-md border border-bsr-border px-3 py-2 text-xs text-bsr-paper-dim transition-colors hover:bg-bsr-ink-3 hover:text-bsr-paper"
          >
            <Upload className="size-3.5" /> {TEXTS.importButton}
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImportFile(file);
              e.target.value = "";
            }}
          />
        </div>
      </div>

      {message && <p className="text-xs text-bsr-muted">{message}</p>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((stamp) => (
          <StampCard key={stamp.id} stamp={stamp} onRemove={removeStamp} />
        ))}
      </div>
    </div>
  );
}

function ImportRow({
  fileInput,
  onFile,
  message,
}: {
  fileInput: React.RefObject<HTMLInputElement | null>;
  onFile: (file: File) => void;
  message: string | null;
}) {
  const TEXTS = useT().inventory;
  return (
    <div className="mt-4 flex items-center gap-3">
      <button
        type="button"
        onClick={() => fileInput.current?.click()}
        className="inline-flex items-center gap-2 rounded-md border border-bsr-border px-3 py-2 text-xs text-bsr-paper-dim transition-colors hover:bg-bsr-ink-3 hover:text-bsr-paper"
      >
        <Upload className="size-3.5" /> {TEXTS.importButton}
      </button>
      <input
        ref={fileInput}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
          e.target.value = "";
        }}
      />
      {message && <p className="text-xs text-bsr-muted">{message}</p>}
    </div>
  );
}
