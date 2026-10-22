import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Broto, BrotoSays } from "@/components/Broto";
import { Card, ProgressBar } from "@/components/ui-kit";
import { getTrail } from "@/data/trails";
import { completeLesson, XP_PER_CORRECT, type Badge } from "@/lib/game";
import { getProgress, setProgress } from "@/lib/progress-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/trilhas/$id")({
  loader: ({ params }) => {
    const trail = getTrail(params.id);
    if (!trail || !trail.available) throw notFound();
    return { title: trail.title };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `Lição: ${loaderData.title} — EcoTrilha` : "Lição — EcoTrilha" },
      { name: "description", content: "Lição interativa sobre descarte correto de resíduos." },
      { property: "og:title", content: loaderData ? `Lição: ${loaderData.title}` : "Lição EcoTrilha" },
      { property: "og:description", content: "Responda perguntas e ganhe XP." },
    ],
  }),
  notFoundComponent: () => (
    <div className="card-surface p-10 text-center">
      <p className="font-bold">Trilha não encontrada ou ainda indisponível.</p>
      <Link to="/trilhas" className="btn btn-primary mt-4">Ver trilhas</Link>
    </div>
  ),
  component: Lesson,
});

function Lesson() {
  const { id } = Route.useParams();
  const trail = getTrail(id)!;
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [result, setResult] = useState<{ gained: number; unlocked: Badge[]; xp: number } | null>(null);

  const q = trail.questions[step]!;
  const answered = selected !== null;
  const isRight = answered && selected === q?.correctIndex;

  function choose(i: number) {
    if (answered) return;
    setSelected(i);
    if (i === q.correctIndex) setCorrect((c) => c + 1);
  }

  function next() {
    if (step + 1 < trail.questions.length) {
      setStep(step + 1);
      setSelected(null);
      return;
    }
    const r = completeLesson(getProgress(), trail.id, correct, trail.questions.length);
    setProgress(r.progress);
    setResult({ gained: r.gained, unlocked: r.unlocked, xp: r.progress.xp });
  }

  function restart() {
    setStep(0); setSelected(null); setCorrect(0); setResult(null);
  }

  if (result) {
    const perfect = correct === trail.questions.length;
    return (
      <Card className="mx-auto max-w-xl text-center anim-rise">
        <div className="flex justify-center"><Broto mood={perfect ? "comemorando" : correct > 0 ? "motivado" : "pensativo"} size={130} /></div>
        <h1 className="mt-2 text-2xl font-extrabold text-primary-deep">Lição concluída!</h1>
        <p className="mt-1 text-muted-foreground">Você acertou {correct} de {trail.questions.length} perguntas.</p>
        <p className="mt-4 text-4xl font-extrabold text-primary">+{result.gained} XP</p>
        <p className="text-sm text-muted-foreground">Total agora: {result.xp} XP</p>
        <p className="mt-4 rounded-2xl bg-primary-soft p-3 text-sm font-medium text-primary-deep">
          {perfect ? "“Perfeito! Você domina esse tema.” — Broto" : "“Bom trabalho! Refazer ajuda a fixar o conteúdo.” — Broto"}
        </p>
        {result.unlocked.length > 0 && (
          <div className="mt-4 rounded-2xl border-2 border-highlight p-4">
            <p className="text-xs font-bold uppercase text-highlight-foreground">Medalha desbloqueada!</p>
            {result.unlocked.map((b) => <p key={b.id} className="text-lg font-bold">{b.icon} {b.name}</p>)}
          </div>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={restart} className="btn btn-outline">Refazer lição</button>
          <Link to="/pontos-de-coleta" search={{ residuo: trail.wasteId }} className="btn btn-primary">Encontrar ponto de coleta</Link>
        </div>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5 anim-rise">
      <div className="flex items-center gap-3">
        <Link to="/trilhas" aria-label="Voltar para trilhas" className="btn btn-outline px-3">←</Link>
        <div className="flex-1"><ProgressBar value={((step + (answered ? 1 : 0)) / trail.questions.length) * 100} label="Progresso da lição" /></div>
        <span className="text-sm font-bold text-primary-deep">{step + 1}/{trail.questions.length}</span>
      </div>

      <Card key={step} className="anim-rise">
        <div className="flex items-center gap-4">
          <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-primary-soft text-4xl" aria-hidden>{trail.icon}</span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-primary">{trail.title}</p>
            <p className="text-foreground">{q.explanation}</p>
          </div>
        </div>
        <h1 className="mt-6 text-xl font-bold text-primary-deep">{q.question}</h1>
        <div role="radiogroup" aria-label="Alternativas" className="mt-4 grid gap-3">
          {q.options.map((opt, i) => {
            const state = !answered ? "idle" : i === q.correctIndex ? "right" : i === selected ? "wrong" : "dim";
            return (
              <button
                key={opt}
                role="radio"
                aria-checked={selected === i}
                disabled={answered}
                onClick={() => choose(i)}
                className={cn(
                  "flex items-center gap-3 rounded-xl border-2 p-4 text-left font-medium transition disabled:cursor-default",
                  state === "idle" && "border-border bg-card hover:border-primary hover:bg-primary-soft",
                  state === "right" && "border-primary bg-primary-soft text-primary-deep",
                  state === "wrong" && "border-destructive bg-destructive/10 text-destructive",
                  state === "dim" && "border-border opacity-60",
                )}
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-muted text-sm font-bold">{String.fromCharCode(65 + i)}</span>
                {opt}
              </button>
            );
          })}
        </div>
      </Card>

      {answered && (
        <div className={cn("card-surface flex flex-col gap-4 p-4 sm:flex-row sm:items-center anim-rise", isRight ? "border-primary" : "border-destructive")}>
          <div className="flex-1">
            <BrotoSays mood={isRight ? "comemorando" : "pensativo"}>
              <strong>{isRight ? `Correto! +${XP_PER_CORRECT} XP` : "Quase lá!"}</strong> {q.feedback}
            </BrotoSays>
          </div>
          <button onClick={next} className="btn btn-primary" autoFocus>
            {step + 1 < trail.questions.length ? "Avançar →" : "Concluir lição"}
          </button>
        </div>
      )}
    </div>
  );
}
