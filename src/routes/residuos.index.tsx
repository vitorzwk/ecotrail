import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { EmptyState, PageHeader } from "@/components/ui-kit";
import { categoryLabels, wastes, type WasteCategory } from "@/data/wastes";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/residuos/")({
  head: () => ({
    meta: [
      { title: "Guia de resíduos — EcoTrilha" },
      { name: "description", content: "Pesquise como separar e descartar papel, plástico, vidro, pilhas, eletrônicos e óleo." },
      { property: "og:title", content: "Guia de resíduos — EcoTrilha" },
      { property: "og:description", content: "Como separar e descartar cada tipo de resíduo." },
    ],
  }),
  component: Wastes,
});

const normalize = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function Wastes() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<WasteCategory | "todas">("todas");
  const list = useMemo(
    () => wastes.filter((w) => (cat === "todas" || w.category === cat) && normalize(w.name).includes(normalize(query.trim()))),
    [query, cat],
  );

  return (
    <div className="anim-rise">
      <PageHeader title="Resíduos" subtitle="Pesquise um material para saber como separar e onde descartar." />
      <div className="card-surface mb-5 space-y-4 p-4">
        <label className="block">
          <span className="text-sm font-semibold">Buscar material</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex.: pilha, garrafa, celular…"
            className="mt-1 w-full rounded-xl border-2 border-input bg-card px-4 py-2.5 outline-none focus:border-primary"
          />
        </label>
        <div role="group" aria-label="Filtrar por categoria" className="flex flex-wrap gap-2">
          {(["todas", ...Object.keys(categoryLabels)] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCat(c as WasteCategory | "todas")}
              aria-pressed={cat === c}
              className={cn("rounded-full border px-3 py-1.5 text-sm font-semibold transition", cat === c ? "border-primary-deep bg-primary-deep text-primary-foreground" : "bg-card hover:bg-primary-soft")}
            >
              {c === "todas" ? "Todas" : categoryLabels[c as WasteCategory]}
            </button>
          ))}
        </div>
      </div>

      {list.length === 0 ? (
        <EmptyState title="Nenhum resíduo encontrado" text="Tente outro nome ou limpe o filtro de categoria." />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((w) => (
            <li key={w.id} className="card-surface flex flex-col p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-xl bg-primary-soft text-2xl" aria-hidden>{w.icon}</span>
                <div>
                  <Link to="/residuos/$id" params={{ id: w.id }} className="text-lg font-bold text-primary-deep hover:underline">{w.name}</Link>
                  <p className="text-xs font-semibold text-muted-foreground">{categoryLabels[w.category]}</p>
                </div>
              </div>
              <dl className="mt-4 flex-1 space-y-2 text-sm">
                <div><dt className="font-semibold">Separação</dt><dd className="text-muted-foreground">{w.separation}</dd></div>
                <div><dt className="font-semibold">Descarte</dt><dd className="text-muted-foreground">{w.disposal}</dd></div>
              </dl>
              {w.safety && <p className="mt-3 rounded-lg bg-highlight/25 px-3 py-2 text-xs font-semibold text-highlight-foreground">⚠️ {w.safety}</p>}
              <div className="mt-4 flex gap-2">
                <Link to="/pontos-de-coleta" search={{ residuo: w.id }} className="btn btn-primary flex-1 text-sm">Encontrar ponto de coleta</Link>
                <Link to="/residuos/$id" params={{ id: w.id }} className="btn btn-outline text-sm" aria-label={`Detalhes de ${w.name}`}>Detalhes</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
