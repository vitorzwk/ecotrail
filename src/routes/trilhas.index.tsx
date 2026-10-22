import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, ProgressBar } from "@/components/ui-kit";
import { trails } from "@/data/trails";
import { useProgress } from "@/lib/progress-store";

export const Route = createFileRoute("/trilhas/")({
  head: () => ({
    meta: [
      { title: "Trilhas de aprendizagem — EcoTrilha" },
      { name: "description", content: "Trilhas curtas sobre papel, plástico, vidro, pilhas e eletrônicos." },
      { property: "og:title", content: "Trilhas de aprendizagem — EcoTrilha" },
      { property: "og:description", content: "Aprenda descarte correto com lições curtas e gamificadas." },
    ],
  }),
  component: Trails,
});

function Trails() {
  const p = useProgress();
  return (
    <div className="anim-rise">
      <PageHeader title="Trilhas de aprendizagem" subtitle="Lições curtas com perguntas. Cada acerto vale 10 XP e concluir vale +20 XP." />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trails.map((t) => {
          const done = p.lessons[t.id];
          const pct = done ? 100 : 0;
          const status = !t.available ? "Em breve" : done ? "Concluída" : t.id === "papel" ? "Em andamento" : "Disponível";
          const content = (
            <>
              <div className="flex items-start justify-between">
                <span className="grid size-14 place-items-center rounded-2xl bg-primary-soft text-3xl" aria-hidden>{t.icon}</span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${done ? "bg-primary text-primary-foreground" : t.available ? "bg-primary-soft text-primary-deep" : "bg-muted text-muted-foreground"}`}>
                  {!t.available && "🔒 "}{status}
                </span>
              </div>
              <h2 className="mt-4 text-lg font-bold text-primary-deep">{t.title}</h2>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{t.description}</p>
              <div className="mt-4 space-y-1">
                <ProgressBar value={pct} label={`Progresso ${t.title}`} />
                <p className="text-xs text-muted-foreground">
                  {t.available ? `${t.questions.length} etapas · ${done ? `${done.correct}/${done.total} acertos` : "não iniciada"}` : "Conteúdo planejado"}
                </p>
              </div>
            </>
          );
          return (
            <li key={t.id}>
              {t.available ? (
                <Link to="/trilhas/$id" params={{ id: t.id }} className="card-surface flex h-full flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]">
                  {content}
                </Link>
              ) : (
                <div aria-disabled className="card-surface flex h-full flex-col p-5 opacity-70">{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
