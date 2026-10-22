import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Card } from "@/components/ui-kit";
import { categoryLabels, getWaste } from "@/data/wastes";

export const Route = createFileRoute("/residuos/$id")({
  loader: ({ params }) => {
    const w = getWaste(params.id);
    if (!w) throw notFound();
    return { name: w.name };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name}: como descartar — EcoTrilha` : "Resíduo — EcoTrilha" },
      { name: "description", content: "Como preparar, o que não fazer e onde descartar este resíduo." },
      { property: "og:title", content: loaderData ? `${loaderData.name}: como descartar` : "Resíduo" },
      { property: "og:description", content: "Guia de descarte correto do EcoTrilha." },
    ],
  }),
  notFoundComponent: () => (
    <div className="card-surface p-10 text-center">
      <p className="font-bold">Resíduo não encontrado.</p>
      <Link to="/residuos" className="btn btn-primary mt-4">Voltar ao guia</Link>
    </div>
  ),
  component: WasteDetail,
});

function WasteDetail() {
  const { id } = Route.useParams();
  const w = getWaste(id)!;
  return (
    <div className="mx-auto max-w-3xl space-y-4 anim-rise">
      <Link to="/residuos" className="text-sm font-semibold text-primary hover:underline">← Todos os resíduos</Link>
      <Card className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <span className="grid size-20 place-items-center rounded-3xl bg-primary-soft text-5xl" aria-hidden>{w.icon}</span>
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">{categoryLabels[w.category]}</p>
          <h1 className="text-3xl font-extrabold text-primary-deep">{w.name}</h1>
          <p className="text-muted-foreground">{w.description}</p>
        </div>
      </Card>
      {w.safety && <p className="rounded-xl border-2 border-highlight bg-highlight/20 p-4 font-semibold text-highlight-foreground">⚠️ {w.safety}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <h2 className="font-bold text-primary-deep">✅ Como preparar</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{w.prepare.map((s) => <li key={s}>{s}</li>)}</ul>
          <p className="mt-3 text-sm"><strong>Descarte:</strong> {w.disposal}</p>
        </Card>
        <Card>
          <h2 className="font-bold text-destructive">🚫 O que não fazer</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{w.dont.map((s) => <li key={s}>{s}</li>)}</ul>
        </Card>
        <Card>
          <h2 className="font-bold text-primary-deep">🔁 Reutilização</h2>
          <p className="mt-2 text-sm">{w.reuse}</p>
        </Card>
        <Card>
          <h2 className="font-bold text-primary-deep">🌍 Benefício ambiental</h2>
          <p className="mt-2 text-sm">{w.benefit}</p>
        </Card>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link to="/pontos-de-coleta" search={{ residuo: w.id }} className="btn btn-primary">📍 Encontrar ponto de coleta</Link>
        {w.trailId ? (
          <Link to="/trilhas/$id" params={{ id: w.trailId }} className="btn btn-outline">📚 Aprender sobre este resíduo</Link>
        ) : (
          <button disabled className="btn btn-outline">📚 Trilha em breve</button>
        )}
      </div>
    </div>
  );
}
