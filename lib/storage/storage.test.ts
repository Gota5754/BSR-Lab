import { describe, expect, it } from "vitest";
import {
  buildInventoryExport,
  INVENTORY_SCHEMA_VERSION,
  migrateInventory,
  parseInventoryExport,
} from "./index";
import type { UserStamp } from "@/types";

const validStamp: UserStamp = {
  id: "stamp-1",
  setId: "rising-black-moon",
  piece: "I",
  level: 25,
  secondBasicStat: "atk-pct",
  substats: [
    { id: "crit-rate", evolutions: 2 },
    { id: "crit-dmg", evolutions: 1 },
  ],
  passiveId: "overdrive-full-assault",
  targetCharacterId: "ichigo-bankai",
  createdAt: "2026-07-01T00:00:00.000Z",
  updatedAt: "2026-07-01T00:00:00.000Z",
};

describe("export/import inventaire", () => {
  it("un export puis un import restituent les stamps", () => {
    const json = JSON.stringify(buildInventoryExport([validStamp]));
    expect(parseInventoryExport(json)).toEqual([validStamp]);
  });

  it("rejette un JSON invalide avec un message lisible", () => {
    expect(() => parseInventoryExport("pas du json")).toThrow(/JSON valide/);
  });

  it("rejette un fichier qui n'est pas un export BSR Lab", () => {
    expect(() => parseInventoryExport('{"foo": 1}')).toThrow(/export BSR Lab/);
  });

  it("rejette un export d'une version future du schéma", () => {
    const future = JSON.stringify({
      schemaVersion: INVENTORY_SCHEMA_VERSION + 1,
      stamps: [],
    });
    expect(() => parseInventoryExport(future)).toThrow(/version plus récente/);
  });

  it("assainit les données douteuses (pièce invalide, évolutions hors bornes)", () => {
    const dirty = JSON.stringify({
      schemaVersion: 1,
      stamps: [
        { ...validStamp, piece: "IV" }, // pièce inexistante → écarté
        {
          ...validStamp,
          id: "stamp-2",
          level: 99,
          substats: [{ id: "crit-rate", evolutions: 12 }],
        },
      ],
    });
    const result = parseInventoryExport(dirty);
    expect(result).toHaveLength(1);
    expect(result[0].level).toBe(30);
    expect(result[0].substats[0].evolutions).toBe(3);
  });
});

describe("migrations du schéma", () => {
  it("la version courante passe telle quelle", () => {
    const state = { stamps: [validStamp] };
    expect(migrateInventory(state, INVENTORY_SCHEMA_VERSION)).toEqual(state);
  });

  it("un état absent devient un inventaire vide", () => {
    expect(migrateInventory(undefined, 0)).toEqual({ stamps: [] });
  });
});
