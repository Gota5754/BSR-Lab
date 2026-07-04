import type { StampPieceId, UserStamp } from "@/types";

/* Version du schéma des données utilisateur persistées.
   À incrémenter à chaque changement de structure, avec un cas de
   migration correspondant dans `migrateInventory` (ne jamais casser
   les données existantes — CLAUDE.md §5.2). */
export const INVENTORY_SCHEMA_VERSION = 1;

export type InventoryPersistedState = {
  stamps: UserStamp[];
};

/* Migre un état persisté d'une version antérieure vers la version
   courante. Appelée par le middleware persist de Zustand. */
export function migrateInventory(
  persisted: unknown,
  fromVersion: number
): InventoryPersistedState {
  const state = (persisted ?? { stamps: [] }) as InventoryPersistedState;
  switch (fromVersion) {
    /* v1 : version initiale — rien à migrer.
       Exemple pour plus tard :
       case 1: return { ...state, nouveauChamp: valeurParDefaut }; */
    default:
      return state;
  }
}

/* ── Export / Import JSON (substitut gratuit à la synchro cloud) ─────── */

export type InventoryExport = {
  schemaVersion: number;
  exportedAt: string;
  stamps: UserStamp[];
};

export function buildInventoryExport(stamps: UserStamp[]): InventoryExport {
  return {
    schemaVersion: INVENTORY_SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    stamps,
  };
}

const PIECES: StampPieceId[] = ["I", "II", "III"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/* Valide et assainit un fichier d'export importé par l'utilisateur.
   Lève une Error à message lisible si le fichier n'est pas exploitable. */
export function parseInventoryExport(raw: string): UserStamp[] {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error("Le fichier n'est pas un JSON valide.");
  }
  if (!isRecord(data) || !Array.isArray(data.stamps)) {
    throw new Error("Le fichier ne ressemble pas à un export BSR Lab.");
  }
  if (
    typeof data.schemaVersion !== "number" ||
    data.schemaVersion > INVENTORY_SCHEMA_VERSION
  ) {
    throw new Error(
      "Ce fichier vient d'une version plus récente du site — mettez la page à jour."
    );
  }

  const stamps: UserStamp[] = [];
  for (const item of data.stamps) {
    if (!isRecord(item)) continue;
    if (!PIECES.includes(item.piece as StampPieceId)) continue;
    if (typeof item.secondBasicStat !== "string") continue;
    const substats = Array.isArray(item.substats)
      ? item.substats
          .filter(
            (s): s is Record<string, unknown> =>
              isRecord(s) && typeof s.id === "string"
          )
          .map((s) => ({
            id: s.id as UserStamp["substats"][number]["id"],
            evolutions: clamp(Number(s.evolutions) || 0, 0, 3),
          }))
      : [];
    const now = new Date().toISOString();
    stamps.push({
      id: typeof item.id === "string" ? item.id : crypto.randomUUID(),
      setId: typeof item.setId === "string" ? item.setId : "",
      piece: item.piece as StampPieceId,
      level: clamp(Number(item.level) || 1, 1, 30),
      secondBasicStat:
        item.secondBasicStat as UserStamp["secondBasicStat"],
      substats,
      passiveId:
        typeof item.passiveId === "string" ? item.passiveId : undefined,
      targetCharacterId:
        typeof item.targetCharacterId === "string"
          ? item.targetCharacterId
          : undefined,
      createdAt: typeof item.createdAt === "string" ? item.createdAt : now,
      updatedAt: typeof item.updatedAt === "string" ? item.updatedAt : now,
    });
  }
  return stamps;
}
