import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BrotoSays } from "@/components/Broto";
import { Card, EmptyState, PageHeader } from "@/components/ui-kit";
import { origins, points, getPoint, type Origin } from "@/data/points";
import { getWaste, wastes } from "@/data/wastes";
import { registerDisposal, type Badge } from "@/lib/game";
import { getProgress, setProgress } from "@/lib/progress-store";
import { cn } from "@/lib/utils";

type Search = { residuo?: string };

export const Route = createFileRoute("/pontos-de-coleta")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    residuo: typeof s.residuo === "string" ? s.residuo : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Pontos de coleta e rotas — EcoTrilha" },
      { name: "description", content: "Encontre pontos de coleta (simulados) compatíveis com seu resíduo e veja a rota." },
      { property: "og:title", content: "Pontos de coleta — EcoTrilha" },
      { property: "og:description", content: "Encontre onde descartar cada resíduo." },
    ],
  }),
  component: Points,
});

function Points() {
  const search = Route.useSearch();
  const [wasteId, setWasteId] = useState(search.residuo ?? "");
  const [origin, setOrigin] = useState<Origin>("faculdade");
  const [maxKm, setMaxKm] = useState(5);
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [done, setDone] = useState<{ gained: number; xp: number; unlocked: Badge[]; date: string } | null>(null);

  const waste = getWaste(wasteId);
  const list = points
    .filter((p) => !waste || p.accepts.includes(waste.category))
    .filter((p) => p.distanceKm[origin] <= maxKm && (!onlyOpen || p.open))
    .sort((a, b) => a.distanceKm[origin] - b.distanceKm[origin]);
  const point = selected ? getPoint(selected) : undefined;
  const o = origins.find((x) => x.id === origin)!;

  function register() {
    if (!waste) return setError("Escolha um resíduo antes de registrar o descarte.");
    if (!point) return setError("Selecione um ponto de coleta.");
    setError("");
    const date = new Date().toLocaleDateString("pt-BR");
    const r = registerDisposal(getProgress(), waste.id, point.id, date);
    setProgress(r.progress);
    setDone({ gained: r.gained, xp: r.progress.xp, unlocked: r.unlocked, date });
  }

  return (
    <div className="anim-rise">
      <PageHeader title="Pontos de coleta" subtitle="Todos os pontos abaixo são simulados para demonstração." />
      <Card className="mb-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-sm font-semibold">1. Resíduo
          <select value={wasteId} onChange={(e) => { setWasteId(e.target.value); setSelected(null); setDone(null); }} className="mt-1 w-full rounded-xl border-2 border-input bg-card px-3 py-2">
            <option value="">Todos</option>
            {wastes.map((w) => <option key={w.id} value={w.id}>{w.name}</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold">2. Sua localização
          <select value={origin} onChange={(e) => setOrigin(e.target.value as Origin)} className="mt-1 w-full rounded-xl border-2 border-input bg-card px-3 py-2">
            {origins.map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold">Distância máx.: {maxKm} km
          <input type="range" min={1} max={5} value={maxKm} onChange={(e) => setMaxKm(+e.target.value)} className="mt-3 w-full accent-primary" />
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold">
          <input type="checkbox" checked={onlyOpen} onChange={(e) => setOnlyOpen(e.target.checked)} className="size-4 accent-primary" />
          Apenas abertos agora
        </label>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-3">
          {list.length === 0 ? (
            <EmptyState title="Nenhum ponto compatível" text="Aumente a distância ou mude o resíduo/localização." />
          ) : list.map((p) => (
            <button key={p.id} onClick={() => { setSelected(p.id); setDone(null); }} aria-pressed={selected === p.id}
              className={cn("card-surface block w-full p-4 text-left transition hover:border-primary", selected === p.id && "border-2 border-primary")}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-primary-deep">{p.name}</span>
                <span className="tag-sim">Ponto simulado</span>
              </div>
              <p className="text-sm text-muted-foreground">{p.address} · {p.hours}</p>
              <p className="mt-1 text-sm"><strong>{p.distanceKm[origin]} km</strong> · <span className={p.open ? "text-primary" : "text-destructive"}>{p.open ? "Aberto" : "Fechado"}</span></p>
            </button>
          ))}
        </div>

        <Card>
          <h2 className="mb-2 font-bold text-primary-deep">Mapa simplificado <span className="tag-sim">Simulado</span></h2>
          <svg viewBox="0 0 600 320" role="img" aria-label="Mapa estilizado com pontos de coleta" className="w-full rounded-xl bg-primary-soft">
            <path d="M0 160 H600 M300 0 V320" className="stroke-border" strokeWidth="18" />
            {point && <polyline key={point.id + origin} points={`${o.x},${o.y} ${point.x},${o.y} ${point.x},${point.y}`} fill="none" strokeWidth="5" strokeLinecap="round" className="stroke-info anim-route" />}
            {origins.map((x) => (
              <g key={x.id}><circle cx={x.x} cy={x.y} r={x.id === origin ? 10 : 6} className={x.id === origin ? "fill-info" : "fill-muted-foreground"} />
                <text x={x.x} y={x.y + 26} textAnchor="middle" className="fill-foreground text-[13px] font-semibold">{x.label}</text></g>
            ))}
            {points.map((p) => (
              <g key={p.id} opacity={list.includes(p) ? 1 : 0.3}><circle cx={p.x} cy={p.y} r={selected === p.id ? 13 : 9} className={selected === p.id ? "fill-primary-deep" : "fill-primary"} /></g>
            ))}
          </svg>
          {point ? (
            <div className="mt-4 space-y-3">
              <p className="text-sm">Rota simulada até <strong>{point.name}</strong>: ~{point.distanceKm[origin]} km (~{Math.round(point.distanceKm[origin] * 12)} min a pé).</p>
              {!done && <button onClick={register} className="btn btn-primary w-full">Marcar descarte como realizado</button>}
            </div>
          ) : <p className="mt-4 text-sm text-muted-foreground">Selecione um ponto para ver a rota.</p>}
          {error && <p role="alert" className="mt-3 text-sm font-semibold text-destructive">{error}</p>}
          {done && waste && point && (
            <div className="mt-4 space-y-2 rounded-xl border-2 border-primary p-4">
              <BrotoSays mood="comemorando">Descarte registrado! +{done.gained} XP (total {done.xp}).</BrotoSays>
              <p className="text-sm">{waste.name} · {point.name} · {done.date}</p>
              {done.unlocked.map((b) => <p key={b.id} className="font-bold">🏅 Medalha: {b.icon} {b.name}</p>)}
              <p className="text-xs text-muted-foreground">Registro demonstrativo, sem validação física do descarte.</p>
              <Link to="/recompensas" className="btn btn-outline text-sm">Ver recompensas</Link>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
