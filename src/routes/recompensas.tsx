import { createFileRoute } from "@tanstack/react-router";
import { Card, DemoNote, PageHeader, ProgressBar, Stat } from "@/components/ui-kit";
import { badges, levelFromXp } from "@/lib/game";
import { useProgress } from "@/lib/progress-store";

export const Route = createFileRoute("/recompensas")({
  head: () => ({
    meta: [
      { title: "Recompensas e medalhas — EcoTrilha" },
      { name: "description", content: "XP, nível, medalhas e ranking demonstrativo por curso." },
      { property: "og:title", content: "Recompensas — EcoTrilha" },
      { property: "og:description", content: "Medalhas e ranking do EcoTrilha." },
    ],
  }),
  component: Rewards,
});

const ranking = [
  { course: "ADS", xp: 4820 },
  { course: "Engenharia da Computação", xp: 4310 },
  { course: "Ciências Contábeis", xp: 2950 },
];

function Rewards() {
  const p = useProgress();
  return (
    <div className="space-y-5 anim-rise">
      <PageHeader title="Recompensas" />
      <div className="grid grid-cols-3 gap-3">
        <Stat icon="⭐" label="XP total" value={p.xp} />
        <Stat icon="🏆" label="Nível" value={levelFromXp(p.xp)} />
        <Stat icon="🔥" label="Sequência" value={`${p.streak}d`} />
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {badges.map((b) => {
          const got = p.badges.includes(b.id);
          const [n, t] = b.progress(p);
          return (
            <li key={b.id}><Card className={got ? "border-primary" : "opacity-75"}>
              <div className="flex items-center gap-3">
                <span className={`grid size-12 place-items-center rounded-full text-2xl ${got ? "bg-highlight" : "bg-muted grayscale"}`} aria-hidden>{b.icon}</span>
                <div><p className="font-bold text-primary-deep">{b.name}</p><p className="text-xs text-muted-foreground">{got ? "Conquistada" : "🔒 Bloqueada"}</p></div>
              </div>
              <p className="mt-2 text-sm">{b.description}</p>
              <div className="mt-2"><ProgressBar value={got ? 100 : (n / t) * 100} label={b.name} /></div>
            </Card></li>
          );
        })}
      </ul>
      <Card>
        <div className="mb-3 flex items-center justify-between"><h2 className="font-bold text-primary-deep">Ranking por curso</h2><DemoNote>Ranking demonstrativo</DemoNote></div>
        <ol className="space-y-2">{ranking.map((r, i) => (
          <li key={r.course} className="flex justify-between rounded-lg bg-primary-soft px-4 py-2"><span className="font-semibold">{i + 1}º {r.course}</span><span>{r.xp} XP</span></li>
        ))}</ol>
      </Card>
    </div>
  );
}
