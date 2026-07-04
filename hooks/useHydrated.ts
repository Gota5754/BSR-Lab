"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/* Obligatoire avant tout rendu de données persistées (CLAUDE.md §5.2) :
   le HTML est généré en SSG sans localStorage. Retourne false pendant le
   rendu serveur/hydratation, true ensuite — sans erreur d'hydratation. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
