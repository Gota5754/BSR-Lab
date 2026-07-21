"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Team } from "@/types";

export const TEAM_SIZE = 3;
export const TEAM_PIECES = ["I", "II", "III"] as const;

type TeamsPersistedState = { teams: Team[] };

function migrateTeams(persisted: unknown): TeamsPersistedState {
  return (persisted ?? { teams: [] }) as TeamsPersistedState;
}

type TeamsStore = {
  teams: Team[];
  addTeam: (name: string) => Team;
  removeTeam: (id: string) => void;
  renameTeam: (id: string, name: string) => void;
  /* slot : 0-2. Changer un membre libère ses assignations. */
  setMember: (teamId: string, slot: number, characterId: string) => void;
  /* pieceIndex : 0 = Stamp I, 1 = II, 2 = III ; stampId "" = libre. */
  setAssignment: (
    teamId: string,
    characterId: string,
    pieceIndex: number,
    stampId: string
  ) => void;
};

export const useTeamsStore = create<TeamsStore>()(
  persist(
    (set, get) => ({
      teams: [],

      addTeam: (name) => {
        const team: Team = {
          id: crypto.randomUUID(),
          name,
          members: ["", "", ""],
          stampAssignments: {},
        };
        set({ teams: [...get().teams, team] });
        return team;
      },

      removeTeam: (id) =>
        set({ teams: get().teams.filter((t) => t.id !== id) }),

      renameTeam: (id, name) =>
        set({
          teams: get().teams.map((t) => (t.id === id ? { ...t, name } : t)),
        }),

      setMember: (teamId, slot, characterId) =>
        set({
          teams: get().teams.map((team) => {
            if (team.id !== teamId) return team;
            const previous = team.members[slot];
            const members = team.members.map((m, i) =>
              i === slot ? characterId : m
            );
            const stampAssignments = { ...team.stampAssignments };
            if (previous && previous !== characterId) {
              delete stampAssignments[previous];
            }
            return { ...team, members, stampAssignments };
          }),
        }),

      setAssignment: (teamId, characterId, pieceIndex, stampId) =>
        set({
          teams: get().teams.map((team) => {
            if (team.id !== teamId) return team;
            const current = team.stampAssignments[characterId] ?? ["", "", ""];
            const next = current.map((s, i) => (i === pieceIndex ? stampId : s));
            return {
              ...team,
              stampAssignments: {
                ...team.stampAssignments,
                [characterId]: next,
              },
            };
          }),
        }),
    }),
    {
      name: "bsr-lab-teams",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      migrate: migrateTeams,
    }
  )
);
