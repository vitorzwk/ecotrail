import { createFileRoute } from "@tanstack/react-router";
import { BarChart, Card, DemoNote, PageHeader, Stat } from "@/components/ui-kit";
import { categoryLabels, wastes } from "@/data/wastes";
import { distinctPoints } from "@/lib/game";
import { useProgress } from "@/lib/progress-store";

export const Route = createFileRoute("/impacto")({
  head: () => ({
    meta: [
      { title: "Impacto ambiental — EcoTrilha" },
      { name: "description", content: "Indicadores simulados de descartes e materiais encaminhados." },
      { property: "og:title", content: "Impacto — EcoTrilha" },
      { property: "og:description", content: "Veja o impacto estimado da comunidade." },
    ],
  }),
  component: Impact,
});

function Impact() {
  const p = useProgress();
  const kg = p.disposals.reduce((s, d) => s + (wastes.find((w) => w.id === d.wasteId)?.estimatedKg ?? 0), 0);
  const byCat: Record<string, number> = {};
  p.disposals.forEach((d) => {
    const w = wastes.find((x) => x.id === d.wasteId);
    if (w) byCat[categoryLabels[w.category]] = (byCat[categoryLabels[w.category]] ?? 0) + 1;
  });
  return (
    <div className="space-y-5 anim-rise">
      <PageHeader title="Impacto"><DemoNote>Dados simulados para demonstração</DemoNote></PageHeader>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat icon="♻️" label="Descartes" value={p.disposals.length} />
        <Stat icon="⚖️" label="Materiais" value={`${kg.toFixed(2)} kg`} />
        <Stat icon="📍" label="Pontos usados" value={distinctPoints(p)} />
        <Stat icon="⭐" label="XP comunidade" value={12080 + p.xp} />
      </div>
      <Card>
        <h2 className="mb-4 font-bold text-primary-deep">Participação por categoria</h2>
        <BarChart data={Object.entries(byCat).map(([label, value]) => ({ label, value }))} />
      </Card>
    </div>
  );
}
