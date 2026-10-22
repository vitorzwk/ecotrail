import { createFileRoute } from "@tanstack/react-router";
import { BarChart, Card, DemoNote, PageHeader, Stat } from "@/components/ui-kit";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel demonstrativo — EcoTrilha" },
      { name: "description", content: "Painel administrativo demonstrativo do EcoTrilha." },
      { property: "og:title", content: "Painel demonstrativo — EcoTrilha" },
      { property: "og:description", content: "Métricas simuladas de uso da plataforma." },
    ],
  }),
  component: Admin,
});

function Admin() {
  return (
    <div className="space-y-5 anim-rise">
      <PageHeader title="Painel demonstrativo" subtitle="Área da organização (sem autenticação no MVP)."><DemoNote>Dados simulados</DemoNote></PageHeader>
      <div className="grid grid-cols-2 gap-3"><Stat icon="👀" label="Acessos" value="1.284" /><Stat icon="♻️" label="Descartes" value="342" /></div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card><h2 className="mb-3 font-bold">Trilhas mais acessadas</h2><BarChart data={[{ label: "Pilhas", value: 410 }, { label: "Plástico", value: 380 }, { label: "Eletrônicos", value: 290 }]} /></Card>
        <Card><h2 className="mb-3 font-bold">Resíduos mais pesquisados</h2><BarChart data={[{ label: "Pilha", value: 220 }, { label: "Celular", value: 180 }, { label: "Óleo", value: 140 }]} /></Card>
        <Card><h2 className="mb-3 font-bold">Pontos mais consultados</h2><BarChart data={[{ label: "EcoColeta", value: 160 }, { label: "Ponto Verde", value: 150 }, { label: "Mercado Sustentável", value: 90 }]} /></Card>
      </div>
    </div>
  );
}
