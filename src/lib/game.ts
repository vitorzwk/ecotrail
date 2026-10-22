/**
 * Regras do jogo (puras, sem React) — fáceis de explicar e testar.
 * XP: +10 por resposta correta, +20 ao concluir lição, +30 por descarte registrado.
 * Nível: a cada 100 XP sobe um nível (0–99 = nível 1, 100–199 = nível 2...).
 */
import { getPoint } from "@/data/points";

export const XP_PER_CORRECT = 10;
export const XP_LESSON_BONUS = 20;
export const XP_PER_DISPOSAL = 30;
export const XP_PER_LEVEL = 100;

export type Disposal = { wasteId: string; pointId: string; date: string };

export type Progress = {
  xp: number;
  streak: number;
  /** melhor pontuação (acertos) por trilha */
  lessons: Record<string, { correct: number; total: number }>;
  disposals: Disposal[];
  badges: string[];
};

export const initialProgress: Progress = {
  xp: 120,
  streak: 4,
  lessons: {},
  disposals: [
    { wasteId: "garrafa-pet", pointId: "ponto-verde", date: "2026-10-18" },
    { wasteId: "papel", pointId: "ponto-verde", date: "2026-10-19" },
    { wasteId: "pilha", pointId: "ecocoleta", date: "2026-10-20" },
  ],
  badges: ["tres-descartes"],
};

export const levelFromXp = (xp: number) => Math.floor(xp / XP_PER_LEVEL) + 1;
export const nextLevelXp = (xp: number) => levelFromXp(xp) * XP_PER_LEVEL;
export const levelProgress = (xp: number) => ((xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100;

export type Badge = { id: string; name: string; icon: string; description: string; test: (p: Progress) => boolean; progress: (p: Progress) => [number, number] };

export const badges: Badge[] = [
  { id: "primeira-licao", name: "Primeira lição", icon: "🌱", description: "Conclua sua primeira lição.",
    test: (p) => Object.keys(p.lessons).length >= 1, progress: (p) => [Math.min(Object.keys(p.lessons).length, 1), 1] },
  { id: "mestre-pilhas", name: "Mestre das pilhas", icon: "🔋", description: "Acerte todas as perguntas da trilha de pilhas.",
    test: (p) => !!p.lessons.pilhas && p.lessons.pilhas.correct === p.lessons.pilhas.total,
    progress: (p) => [p.lessons.pilhas?.correct ?? 0, p.lessons.pilhas?.total ?? 3] },
  { id: "explorador", name: "Explorador de pontos", icon: "🧭", description: "Use 3 pontos de coleta diferentes.",
    test: (p) => distinctPoints(p) >= 3, progress: (p) => [Math.min(distinctPoints(p), 3), 3] },
  { id: "tres-descartes", name: "Três descartes registrados", icon: "♻️", description: "Registre 3 descartes.",
    test: (p) => p.disposals.length >= 3, progress: (p) => [Math.min(p.disposals.length, 3), 3] },
  { id: "semana", name: "Semana sustentável", icon: "📅", description: "Mantenha 7 dias de sequência.",
    test: (p) => p.streak >= 7, progress: (p) => [Math.min(p.streak, 7), 7] },
  { id: "guardiao", name: "Guardião do campus", icon: "🛡️", description: "Conclua 3 trilhas e registre 5 descartes.",
    test: (p) => Object.keys(p.lessons).length >= 3 && p.disposals.length >= 5,
    progress: (p) => [Math.min(Object.keys(p.lessons).length, 3) + Math.min(p.disposals.length, 5), 8] },
];

export const distinctPoints = (p: Progress) => new Set(p.disposals.map((d) => d.pointId)).size;

/** Retorna o novo progresso e as medalhas recém-desbloqueadas. */
export function withBadges(p: Progress): { progress: Progress; unlocked: Badge[] } {
  const unlocked = badges.filter((b) => !p.badges.includes(b.id) && b.test(p));
  return { progress: { ...p, badges: [...p.badges, ...unlocked.map((b) => b.id)] }, unlocked };
}

export function lessonXp(correct: number) {
  return correct * XP_PER_CORRECT + XP_LESSON_BONUS;
}

export function completeLesson(p: Progress, trailId: string, correct: number, total: number) {
  const prev = p.lessons[trailId];
  const best = !prev || correct > prev.correct ? { correct, total } : prev;
  const gained = lessonXp(correct);
  return { ...withBadges({ ...p, xp: p.xp + gained, lessons: { ...p.lessons, [trailId]: best } }), gained };
}

export function registerDisposal(p: Progress, wasteId: string, pointId: string, date: string) {
  if (!getPoint(pointId)) throw new Error("Ponto de coleta inválido");
  return {
    ...withBadges({ ...p, xp: p.xp + XP_PER_DISPOSAL, disposals: [...p.disposals, { wasteId, pointId, date }] }),
    gained: XP_PER_DISPOSAL,
  };
}
