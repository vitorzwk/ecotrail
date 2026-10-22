import { createFileRoute, Link } from "@tanstack/react-router";
import { Broto } from "@/components/Broto";
import { Card, DemoNote, ProgressBar, Stat } from "@/components/ui-kit";
import { trails } from "@/data/trails";
import { wastes } from "@/data/wastes";
import { badges, levelFromXp, levelProgress, nextLevelXp } from "@/lib/game";
import { useProgress } from "@/lib/progress-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EcoTrilha — Aprenda a descartar certo" },
      { name: "description", content: "Plataforma gamificada de educação ambiental: lições curtas, XP, medalhas e pontos de coleta." },
      { property: "og:title", content: "EcoTrilha — Aprenda a descartar certo" },
      { property: "og:description", content: "Lições curtas, XP, medalhas e pontos de coleta para descarte correto." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const p = useProgress();
  const level = levelFromXp(p.xp);
  const next = trails.find((t) => t.available && !p.lessons[t.id]) ?? trails[0]!;
  const kg = p.disposals.reduce((s, d) => s + (wastes.find((w) => w.id === d.wasteId)?.estimatedKg ?? 0), 0);
  const earned = badges.filter((b) => p.badges.includes(b.id));
  const mood = p.streak >= 4 ? "motivado" : "feliz";

  return (
    <div className="space-y-6 anim-rise">
      <section className="card-surface relative overflow-hidden bg-primary-deep p-6 text-primary-foreground sm:p-8">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="rounded-3xl bg-primary-soft p-3">
            <Broto mood={mood} size={110} />
          </div>
          <div className="flex-1 space-y-3">
            <DemoNote>Usuário de demonstração</DemoNote>
            <h1 className="text-3xl font-extrabold sm:text-4xl">Olá, Ana! 🌿</h1>
            <p className="max-w-lg text-primary-soft">
              “Você está há {p.streak} dias cuidando do planeta. Que tal mais uma lição hoje?” — Broto
            </p>
            <div className="max-w-md space-y-1">
              <div className="flex justify-between text-sm font-semibold">
                <span>Nível {level}</span>
                <span>{p.xp} / {nextLevelXp(p.xp)} XP</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-primary-soft/20" role="progressbar" aria-label="Progresso de nível" aria-valuenow={Math.round(levelProgress(p.xp))} aria-valuemin={0} aria-valuemax={100}>
                <div className="h-full rounded-full bg-highlight transition-all" style={{ width: `${levelProgress(p.xp)}%` }} />
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/trilhas/$id" params={{ id: next.id }} className="btn btn-highlight">Continuar aprendendo →</Link>
              <Link to="/pontos-de-coleta" className="btn bg-primary-soft text-primary-deep hover:bg-card">📍 Encontrar ponto de coleta</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat icon="⭐" label="XP" value={p.xp} />
        <Stat icon="🏆" label="Nível" value={level} />
        <Stat icon="🔥" label="Sequência" value={`${p.streak} dias`} />
        <Stat icon="♻️" label="Descartes" value={p.disposals.length} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">Lição recomendada do dia</p>
          <div className="mt-3 flex items-center gap-4">
            <span className="grid size-16 place-items-center rounded-2xl bg-primary-soft text-3xl" aria-hidden>{next.icon}</span>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-primary-deep">{next.title}</h2>
              <p className="text-sm text-muted-foreground">{next.description}</p>
            </div>
            <Link to="/trilhas/$id" params={{ id: next.id }} className="btn btn-primary">Começar</Link>
          </div>
        </Card>
        <Card>
          <p className="text-xs font-bold uppercase tracking-wide text-primary">Seu impacto</p>
          <p className="mt-2 text-3xl font-extrabold text-primary-deep">{kg.toFixed(2)} kg</p>
          <p className="text-sm text-muted-foreground">de materiais encaminhados (estimativa)</p>
          <div className="mt-3"><ProgressBar value={(kg / 5) * 100} label="Meta de 5 kg" /></div>
          <p className="mt-1 text-xs text-muted-foreground">Meta: 5 kg</p>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-primary-deep">Últimas conquistas</h2>
          <Link to="/recompensas" className="text-sm font-semibold text-primary hover:underline">Ver todas</Link>
        </div>
        {earned.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">Nenhuma medalha ainda — conclua uma lição para ganhar a primeira!</p>
        ) : (
          <ul className="mt-3 flex flex-wrap gap-3">
            {earned.slice(-4).map((b) => (
              <li key={b.id} className="flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5 text-sm font-semibold text-primary-deep">
                <span aria-hidden>{b.icon}</span>{b.name}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
