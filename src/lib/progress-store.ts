import { useSyncExternalStore } from "react";
import { initialProgress, type Progress } from "./game";

/** Persistência local (LocalStorage) do progresso do usuário demo. */
const KEY = "ecotrilha-progress-v1";
let state: Progress = initialProgress;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) state = { ...initialProgress, ...JSON.parse(raw) };
  } catch {
    state = initialProgress;
  }
}

export function getProgress() {
  load();
  return state;
}

export function setProgress(next: Progress) {
  state = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* armazenamento indisponível: mantém em memória */
  }
  listeners.forEach((l) => l());
}

export function resetProgress() {
  setProgress(initialProgress);
}

export function useProgress() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    getProgress,
    () => initialProgress,
  );
}
