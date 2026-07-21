"use client";

import { Plus, Trash2 } from "lucide-react";
import {
  getCharacter,
  getCharacters,
  getStampPassives,
  getStampSet,
} from "@/lib/data";
import { evaluateStamp } from "@/lib/scoring/engine";
import { useTeamsStore, TEAM_PIECES } from "@/stores/teams-store";
import { useInventoryStore } from "@/stores/inventory-store";
import { useHydrated } from "@/hooks/useHydrated";
import { useT, type Dict } from "@/lib/i18n";
import { EmptyState } from "@/components/shared/EmptyState";
import { GradeBadge } from "@/components/stamps/GradeBadge";
import type { Character, Team, UserStamp } from "@/types";
import { cn } from "@/lib/utils";

function formatScore(value: number): string {
  return value.toFixed(1).replace(".", ",");
}

export function TeamsView() {
  const t = useT();
  const TEXTS = t.teams;
  const hydrated = useHydrated();
  const teams = useTeamsStore((s) => s.teams);
  const addTeam = useTeamsStore((s) => s.addTeam);
  const stamps = useInventoryStore((s) => s.stamps);

  /* useHydrated obligatoire : stores persistés absents du HTML SSG. */
  if (!hydrated) {
    return <p className="text-sm text-bsr-faint">{TEXTS.loading}</p>;
  }

  const createButton = (
    <button
      type="button"
      onClick={() => addTeam(TEXTS.defaultName(teams.length + 1))}
      className="inline-flex items-center gap-2 rounded-md bg-bsr-reiatsu px-5 py-2.5 text-sm font-medium text-bsr-ink transition-opacity hover:opacity-90"
    >
      <Plus className="size-4" /> {TEXTS.create}
    </button>
  );

  if (teams.length === 0) {
    return (
      <EmptyState
        title={TEXTS.emptyTitle}
        description={TEXTS.emptyDescription}
        action={createButton}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>{createButton}</div>
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} stamps={stamps} texts={TEXTS} />
      ))}
    </div>
  );
}

function TeamCard({
  team,
  stamps,
  texts,
}: {
  team: Team;
  stamps: UserStamp[];
  texts: Dict["teams"];
}) {
  const removeTeam = useTeamsStore((s) => s.removeTeam);
  const renameTeam = useTeamsStore((s) => s.renameTeam);
  const setMember = useTeamsStore((s) => s.setMember);
  const characters = getCharacters();
  const members = team.members.map((id) => (id ? getCharacter(id) : undefined));
  const filled = members.filter((m): m is Character => m !== undefined);

  /* Synergie : répartition des types et des rôles. */
  const typeCounts = new Map<string, number>();
  const roleCounts = new Map<string, number>();
  for (const member of filled) {
    typeCounts.set(
      member.damageType,
      (typeCounts.get(member.damageType) ?? 0) + 1
    );
    roleCounts.set(member.role, (roleCounts.get(member.role) ?? 0) + 1);
  }

  /* Conflit de set : deux membres avec le même set recommandé n°1. */
  const topSets = filled
    .map(
      (m) =>
        [...m.recommendedSets].sort((a, b) => a.priority - b.priority)[0]?.setId
    )
    .filter(Boolean) as string[];
  const contestedSetId = topSets.find(
    (setId, i) => topSets.indexOf(setId) !== i
  );

  /* Maillon faible de l'équipe : pièce manquante d'abord, sinon plus bas score. */
  let weakest:
    | { character: Character; piece: string; score: number | null }
    | null = null;
  for (const member of filled) {
    const assigned = team.stampAssignments[member.id] ?? ["", "", ""];
    for (let i = 0; i < TEAM_PIECES.length; i++) {
      const stamp = stamps.find((s) => s.id === assigned[i]);
      const entry = stamp
        ? {
            character: member,
            piece: TEAM_PIECES[i],
            score: evaluateStamp(
              member,
              {
                piece: stamp.piece,
                level: stamp.level,
                secondBasicStatId: stamp.secondBasicStat,
                substats: stamp.substats,
                passiveId: stamp.passiveId,
              },
              getStampPassives()
            ).score,
          }
        : { character: member, piece: TEAM_PIECES[i], score: null };
      const rank = entry.score ?? -1;
      const weakestRank = weakest ? (weakest.score ?? -1) : Infinity;
      if (rank < weakestRank) weakest = entry;
    }
  }

  return (
    <section className="rounded-[10px] border border-bsr-border bg-bsr-ink-2 p-5">
      <div className="flex items-center justify-between gap-3">
        <input
          value={team.name}
          aria-label={texts.namePlaceholder}
          placeholder={texts.namePlaceholder}
          onChange={(e) => renameTeam(team.id, e.target.value)}
          className="heading-serif w-full max-w-xs bg-transparent text-2xl text-bsr-paper focus:outline-none"
        />
        <button
          type="button"
          aria-label={texts.remove}
          onClick={() => removeTeam(team.id)}
          className="rounded-md p-2 text-bsr-faint transition-colors hover:bg-bsr-ink-3 hover:text-bsr-blood"
        >
          <Trash2 className="size-4" />
        </button>
      </div>

      <p className="eyebrow mt-4 mb-2">{texts.membersLegend}</p>
      <div className="grid gap-4 md:grid-cols-3">
        {team.members.map((memberId, slot) => {
          const member = members[slot];
          return (
            <div
              key={slot}
              className="rounded-md border border-bsr-border bg-bsr-ink p-3"
            >
              <select
                aria-label={texts.memberSlot(slot + 1)}
                value={memberId}
                onChange={(e) => setMember(team.id, slot, e.target.value)}
                className="h-10 w-full rounded-md border border-bsr-border bg-bsr-ink px-3 text-sm text-bsr-paper focus:border-bsr-paper-dim focus:outline-none"
              >
                <option value="">{texts.noMember}</option>
                {characters
                  .filter(
                    (c) => c.id === memberId || !team.members.includes(c.id)
                  )
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </select>
              {member && (
                <>
                  <p className="mt-2 text-[11px] text-bsr-muted">
                    {member.rarity} · {member.role} · {member.damageType}
                  </p>
                  <MemberAssignments
                    team={team}
                    member={member}
                    stamps={stamps}
                    texts={texts}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>
      {filled.length === 0 && (
        <p className="mt-2 text-xs text-bsr-faint">{texts.noMembersHint}</p>
      )}

      <div className="mt-5 border-t border-bsr-border pt-4">
        <p className="eyebrow mb-2">{texts.synergy}</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
          <span className="text-bsr-muted">
            {texts.typesLabel}{" "}
            {[...typeCounts.entries()].map(([type, count]) => (
              <span
                key={type}
                className="ml-1.5 rounded border border-bsr-border px-1.5 py-0.5 text-bsr-paper-dim"
              >
                {type} ×{count}
              </span>
            ))}
          </span>
          <span className="text-bsr-muted">
            {texts.rolesLabel}{" "}
            {[...roleCounts.entries()].map(([role, count]) => (
              <span
                key={role}
                className="ml-1.5 rounded border border-bsr-border px-1.5 py-0.5 text-bsr-paper-dim"
              >
                {role} ×{count}
              </span>
            ))}
          </span>
        </div>
        {contestedSetId && (
          <p className="mt-2 text-xs text-bsr-blood">
            {texts.sameSetWarning(
              getStampSet(contestedSetId)?.name ?? contestedSetId
            )}
          </p>
        )}
        <p
          className={cn(
            "mt-2 text-xs",
            weakest
              ? weakest.score === null
                ? "text-bsr-blood"
                : "text-bsr-paper-dim"
              : "text-bsr-faint"
          )}
        >
          {texts.weakestLabel}{" "}
          {weakest
            ? weakest.score === null
              ? texts.weakestMissing(weakest.character.name, weakest.piece)
              : texts.weakestScore(
                  weakest.character.name,
                  weakest.piece,
                  formatScore(weakest.score)
                )
            : texts.weakestNone}
        </p>
      </div>
    </section>
  );
}

function MemberAssignments({
  team,
  member,
  stamps,
  texts,
}: {
  team: Team;
  member: Character;
  stamps: UserStamp[];
  texts: Dict["teams"];
}) {
  const setAssignment = useTeamsStore((s) => s.setAssignment);
  const assigned = team.stampAssignments[member.id] ?? ["", "", ""];

  return (
    <div className="mt-3 space-y-2">
      <p className="text-[10px] uppercase tracking-wide text-bsr-faint">
        {texts.assignTitle}
      </p>
      {TEAM_PIECES.map((piece, pieceIndex) => {
        const candidates = stamps.filter((s) => s.piece === piece);
        const current = stamps.find((s) => s.id === assigned[pieceIndex]);
        const evaluation = current
          ? evaluateStamp(
              member,
              {
                piece: current.piece,
                level: current.level,
                secondBasicStatId: current.secondBasicStat,
                substats: current.substats,
                passiveId: current.passiveId,
              },
              getStampPassives()
            )
          : null;
        return (
          <div key={piece} className="flex items-center gap-2">
            <span className="tabular w-6 shrink-0 text-xs text-bsr-muted">
              {piece}
            </span>
            <select
              aria-label={`${member.name} — Stamp ${piece}`}
              value={assigned[pieceIndex]}
              onChange={(e) =>
                setAssignment(team.id, member.id, pieceIndex, e.target.value)
              }
              className="h-9 min-w-0 flex-1 rounded-md border border-bsr-border bg-bsr-ink px-2 text-xs text-bsr-paper focus:border-bsr-paper-dim focus:outline-none"
            >
              <option value="">{texts.noStamp}</option>
              {candidates.map((s) => (
                <option key={s.id} value={s.id}>
                  {getStampSet(s.setId)?.name ?? texts.unknownSet} · Lv{" "}
                  {s.level}
                </option>
              ))}
            </select>
            {evaluation && (
              <span className="flex shrink-0 items-center gap-1.5">
                <span className="tabular text-xs text-bsr-paper-dim">
                  {formatScore(evaluation.score)}
                </span>
                <GradeBadge
                  grade={evaluation.grade}
                  className="size-5 rounded text-xs"
                />
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
