import type { WasteCategory } from "./wastes";

export type Origin = "casa" | "faculdade" | "outro";
export const origins: { id: Origin; label: string; x: number; y: number }[] = [
  { id: "casa", label: "Minha casa", x: 60, y: 250 },
  { id: "faculdade", label: "Faculdade", x: 300, y: 70 },
  { id: "outro", label: "Outro local", x: 520, y: 260 },
];

export type CollectionPoint = {
  id: string;
  name: string;
  address: string;
  accepts: WasteCategory[];
  hours: string;
  open: boolean;
  simulated: true;
  /** coordenadas no mapa estilizado (0-600 x 0-320) */
  x: number;
  y: number;
  distanceKm: Record<Origin, number>;
};

export const points: CollectionPoint[] = [
  {
    id: "ponto-verde", name: "Ponto Verde — Bloco A da Faculdade", address: "Rua Fictícia das Árvores, 100 — Bloco A",
    accepts: ["papel", "plastico", "metal", "vidro"], hours: "Seg a sex, 7h às 22h", open: true, simulated: true,
    x: 250, y: 110, distanceKm: { casa: 3.2, faculdade: 0.2, outro: 2.8 },
  },
  {
    id: "ecocoleta", name: "EcoColeta — Bloco C da Faculdade", address: "Rua Fictícia das Árvores, 100 — Bloco C",
    accepts: ["especial", "eletronico"], hours: "Seg a sáb, 8h às 20h", open: true, simulated: true,
    x: 370, y: 120, distanceKm: { casa: 3.6, faculdade: 0.4, outro: 2.1 },
  },
  {
    id: "mercado", name: "Mercado Sustentável — Bairro Central", address: "Av. Exemplo Central, 450",
    accepts: ["especial", "oleo", "plastico", "metal"], hours: "Todos os dias, 8h às 21h", open: true, simulated: true,
    x: 140, y: 220, distanceKm: { casa: 0.9, faculdade: 2.5, outro: 3.9 },
  },
  {
    id: "estacao-reuso", name: "Estação Reuso — Bairro Universitário", address: "Travessa Imaginária, 12",
    accepts: ["eletronico", "papel", "vidro", "oleo"], hours: "Ter a sáb, 9h às 17h", open: false, simulated: true,
    x: 470, y: 230, distanceKm: { casa: 4.4, faculdade: 1.8, outro: 0.7 },
  },
];

export const getPoint = (id: string) => points.find((p) => p.id === id);
