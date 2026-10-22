export type WasteCategory = "papel" | "plastico" | "vidro" | "metal" | "especial" | "eletronico" | "oleo";

export const categoryLabels: Record<WasteCategory, string> = {
  papel: "Papel",
  plastico: "Plástico",
  vidro: "Vidro",
  metal: "Metal",
  especial: "Resíduo especial",
  eletronico: "Eletrônico",
  oleo: "Óleo",
};

export type Waste = {
  id: string;
  name: string;
  icon: string;
  category: WasteCategory;
  description: string;
  separation: string;
  disposal: string;
  prepare: string[];
  dont: string[];
  reuse: string;
  benefit: string;
  safety?: string;
  trailId?: string;
  /** kg estimados por descarte, usado no painel de impacto */
  estimatedKg: number;
};

export const wastes: Waste[] = [
  {
    id: "papel", name: "Papel", icon: "📄", category: "papel", trailId: "papel", estimatedKg: 0.5,
    description: "Folhas, cadernos, jornais e revistas.",
    separation: "Separe seco e limpo, sem grampos em excesso.",
    disposal: "Coletor azul de recicláveis ou ponto de coleta de papel.",
    prepare: ["Mantenha seco", "Retire plásticos e fitas", "Não amasse em bolas pequenas"],
    dont: ["Não misture com papel engordurado", "Não descarte papel higiênico usado"],
    reuse: "Use o verso como rascunho.",
    benefit: "Poupa madeira, água e energia.",
  },
  {
    id: "papelao", name: "Papelão", icon: "📦", category: "papel", trailId: "papel", estimatedKg: 1,
    description: "Caixas e embalagens de papelão.",
    separation: "Desmonte e achate as caixas.",
    disposal: "Coletor de papel ou ponto de coleta.",
    prepare: ["Desmonte a caixa", "Retire fitas adesivas", "Mantenha seco"],
    dont: ["Não descarte molhado", "Não deixe restos de comida"],
    reuse: "Caixas firmes servem para organizar ou mudanças.",
    benefit: "Papelão reciclado vira novas embalagens.",
  },
  {
    id: "garrafa-pet", name: "Garrafa PET", icon: "🧴", category: "plastico", trailId: "plastico", estimatedKg: 0.05,
    description: "Garrafas de refrigerante, água e sucos.",
    separation: "Esvazie, enxágue se possível e amasse.",
    disposal: "Coletor vermelho de plásticos.",
    prepare: ["Retire o excesso de líquido", "Amasse para reduzir volume", "Tampe a garrafa"],
    dont: ["Não queime", "Não descarte cheia de líquido"],
    reuse: "Pode virar vaso, regador ou organizador.",
    benefit: "Evita plástico em rios e oceanos.",
  },
  {
    id: "vidro", name: "Vidro", icon: "🫙", category: "vidro", trailId: "vidro", estimatedKg: 0.4,
    description: "Garrafas, potes e frascos de vidro.",
    separation: "Lave e retire as tampas.",
    disposal: "Coletor verde de vidro.",
    prepare: ["Lave para retirar resíduos", "Separe as tampas", "Embrulhe se estiver quebrado"],
    dont: ["Não misture espelhos, lâmpadas ou cerâmica"],
    reuse: "Potes servem para guardar alimentos.",
    benefit: "Reciclável infinitas vezes.",
    safety: "Vidro quebrado: embrulhe em jornal e identifique.",
  },
  {
    id: "lata", name: "Lata de alumínio", icon: "🥫", category: "metal", estimatedKg: 0.015,
    description: "Latas de bebidas e alimentos.",
    separation: "Esvazie e amasse.",
    disposal: "Coletor amarelo de metais.",
    prepare: ["Esvazie", "Amasse a lata"],
    dont: ["Não descarte com restos de comida"],
    reuse: "Pode virar porta-lápis.",
    benefit: "Reciclar alumínio economiza até 95% da energia.",
  },
  {
    id: "pilha", name: "Pilha", icon: "🔋", category: "especial", trailId: "pilhas", estimatedKg: 0.025,
    description: "Pilhas comuns e alcalinas (AA, AAA etc.).",
    separation: "Guarde separada dos demais resíduos.",
    disposal: "Encaminhe para um coletor específico de pilhas.",
    prepare: ["Mantenha em local seco até levar ao ponto", "Use um pote fechado"],
    dont: ["Não descarte no lixo comum", "Não abra nem queime"],
    reuse: "Prefira pilhas recarregáveis.",
    benefit: "Evita contaminação do solo e da água por metais pesados.",
    safety: "Pilhas vazando: manuseie com luvas.",
  },
  {
    id: "bateria", name: "Bateria", icon: "🪫", category: "especial", trailId: "pilhas", estimatedKg: 0.05,
    description: "Baterias de celular, notebook e outros aparelhos.",
    separation: "Isole os contatos com fita adesiva.",
    disposal: "Coletor de resíduos especiais ou eletrônicos.",
    prepare: ["Isole os polos com fita", "Guarde em local seco e fresco"],
    dont: ["Não fure, amasse ou aqueça", "Não descarte no lixo comum"],
    reuse: "Baterias boas podem ser reaproveitadas por técnicos.",
    benefit: "Recupera lítio e cobalto.",
    safety: "Baterias estufadas têm risco de incêndio.",
  },
  {
    id: "celular", name: "Celular", icon: "📱", category: "eletronico", trailId: "eletronicos", estimatedKg: 0.2,
    description: "Smartphones e celulares antigos.",
    separation: "Apague seus dados e retire o chip.",
    disposal: "Ponto de coleta de eletrônicos.",
    prepare: ["Faça backup e restaure de fábrica", "Remova chip e cartão de memória"],
    dont: ["Não descarte no lixo comum", "Não desmonte a bateria"],
    reuse: "Se funciona, doe.",
    benefit: "Recupera metais como ouro, cobre e prata.",
  },
  {
    id: "cabo", name: "Cabo eletrônico", icon: "🔌", category: "eletronico", trailId: "eletronicos", estimatedKg: 0.1,
    description: "Carregadores, fios e cabos USB.",
    separation: "Enrole e prenda com elástico.",
    disposal: "Ponto de coleta de eletrônicos.",
    prepare: ["Enrole os cabos", "Junte carregadores e fontes"],
    dont: ["Não queime para retirar o cobre"],
    reuse: "Cabos funcionando podem ser doados.",
    benefit: "Recupera cobre e plástico.",
  },
  {
    id: "oleo", name: "Óleo de cozinha", icon: "🛢️", category: "oleo", estimatedKg: 0.9,
    description: "Óleo usado em frituras.",
    separation: "Espere esfriar e armazene em garrafa PET fechada.",
    disposal: "Ponto de coleta de óleo.",
    prepare: ["Deixe esfriar", "Coe e guarde em garrafa fechada"],
    dont: ["Nunca jogue na pia ou no ralo"],
    reuse: "Pode virar sabão ou biodiesel.",
    benefit: "1 litro de óleo pode contaminar milhares de litros de água.",
    safety: "Não manuseie óleo quente.",
  },
];

export const getWaste = (id: string) => wastes.find((w) => w.id === id);
