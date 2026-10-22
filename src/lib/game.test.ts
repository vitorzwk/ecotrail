import { describe, expect, it } from "vitest";
import { completeLesson, initialProgress, levelFromXp, nextLevelXp, registerDisposal } from "./game";

describe("regras do EcoTrilha", () => {
  it("demo começa no nível 2 com 120 XP e próximo nível em 200", () => {
    expect(levelFromXp(initialProgress.xp)).toBe(2);
    expect(nextLevelXp(initialProgress.xp)).toBe(200);
  });
  it("lição com 3 acertos dá 50 XP (10 por acerto + 20 de bônus)", () => {
    const r = completeLesson(initialProgress, "papel", 3, 3);
    expect(r.gained).toBe(50);
    expect(r.progress.xp).toBe(170);
    expect(r.unlocked.map((b) => b.id)).toContain("primeira-licao");
  });
  it("acertar tudo em pilhas desbloqueia Mestre das pilhas", () => {
    const r = completeLesson(initialProgress, "pilhas", 3, 3);
    expect(r.progress.badges).toContain("mestre-pilhas");
  });
  it("registrar descarte soma 30 XP e incrementa o contador", () => {
    const r = registerDisposal(initialProgress, "pilha", "mercado", "2026-10-22");
    expect(r.progress.xp).toBe(150);
    expect(r.progress.disposals.length).toBe(4);
    expect(r.unlocked.map((b) => b.id)).toContain("explorador");
  });
});
