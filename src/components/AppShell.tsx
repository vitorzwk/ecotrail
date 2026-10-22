import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Início", icon: "🏠" },
  { to: "/trilhas", label: "Aprender", icon: "📚" },
  { to: "/residuos", label: "Resíduos", icon: "🗂️" },
  { to: "/pontos-de-coleta", label: "Pontos", icon: "📍" },
  { to: "/recompensas", label: "Recompensas", icon: "🏅" },
  { to: "/impacto", label: "Impacto", icon: "🌍" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-card focus:p-2">
        Pular para o conteúdo
      </a>
      <header className="sticky top-0 z-30 border-b bg-card/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 text-lg font-extrabold text-primary-deep">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground" aria-hidden>🌿</span>
            EcoTrilha
          </Link>
          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex gap-1">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    activeOptions={{ exact: n.to === "/" }}
                    className="rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-primary-soft hover:text-primary-deep"
                    activeProps={{ className: "bg-primary-soft !text-primary-deep" }}
                  >
                    {n.label === "Pontos" ? "Pontos de coleta" : n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="conteudo" className="mx-auto w-full max-w-6xl flex-1 px-4 pb-28 pt-6 md:pb-12">
        {children}
      </main>

      <footer className="border-t bg-card pb-24 md:pb-0">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>Este protótipo utiliza dados demonstrativos. Consulte os órgãos locais e os pontos oficiais antes de realizar o descarte.</p>
          <div className="flex gap-4 font-semibold">
            <Link to="/sobre" className="hover:text-primary-deep">Sobre o projeto</Link>
            <Link to="/admin" className="hover:text-primary-deep">Painel admin</Link>
          </div>
        </div>
      </footer>

      <nav aria-label="Navegação inferior" className="fixed inset-x-0 bottom-0 z-30 border-t bg-card md:hidden">
        <ul className="grid grid-cols-6">
          {nav.map((n) => (
            <li key={n.to}>
              <Link
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className="flex flex-col items-center gap-0.5 py-2 text-[10px] font-semibold text-muted-foreground"
                activeProps={{ className: "!text-primary-deep" }}
              >
                <span className="text-lg" aria-hidden>{n.icon}</span>
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
