import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHeader } from "@/components/ui-kit";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o projeto — EcoTrilha" },
      { name: "description", content: "Problema, objetivo, tecnologias e próximos passos do MVP acadêmico EcoTrilha." },
      { property: "og:title", content: "Sobre o EcoTrilha" },
      { property: "og:description", content: "MVP acadêmico de educação ambiental gamificada." },
    ],
  }),
  component: About,
});

const sections = [
  ["Problema identificado", "Muitas pessoas não sabem separar resíduos nem onde descartar itens especiais, como pilhas e eletrônicos."],
  ["Objetivo da solução", "Ensinar com lições curtas e gamificadas e conectar o aprendizado a pontos de coleta."],
  ["Tecnologias", "React 19, TanStack Start (servidor Node/edge), Tailwind CSS e LocalStorage para o progresso."],
  ["Dados simulados", "Pontos de coleta, ranking e métricas são fictícios e identificados como simulados."],
  ["Próximos passos", "Pontos oficiais reais, mapa real, contas de usuário, validação de descartes e mais trilhas."],
  ["Declaração", "Esta plataforma é um MVP acadêmico."],
];

function About() {
  return (
    <div className="anim-rise">
      <PageHeader title="Sobre o projeto" />
      <div className="grid gap-4 sm:grid-cols-2">{sections.map(([t, d]) => <Card key={t}><h2 className="font-bold text-primary-deep">{t}</h2><p className="mt-1 text-sm">{d}</p></Card>)}</div>
    </div>
  );
}
