export type Question = {
  explanation: string;
  question: string;
  options: string[];
  correctIndex: number;
  feedback: string;
};

export type Trail = {
  id: string;
  title: string;
  icon: string;
  description: string;
  available: boolean;
  wasteId?: string;
  questions: Question[];
};

export const trails: Trail[] = [
  {
    id: "papel",
    title: "Papel e papelão",
    icon: "📄",
    description: "Separe papéis limpos e secos para que voltem a virar papel.",
    available: true,
    wasteId: "papel",
    questions: [
      {
        explanation: "Papel só é reciclável quando está limpo e seco. Gordura e umidade estragam as fibras.",
        question: "Qual destes papéis pode ir para a reciclagem?",
        options: ["Guardanapo engordurado", "Folha de caderno seca", "Papel higiênico usado", "Caixa de pizza suja"],
        correctIndex: 1,
        feedback: "Folhas secas e limpas são recicláveis. Papéis sujos vão para o rejeito.",
      },
      {
        explanation: "Caixas de papelão ocupam menos espaço quando desmontadas.",
        question: "O que fazer com uma caixa de papelão antes do descarte?",
        options: ["Molhar", "Desmontar e achatar", "Queimar", "Encher de lixo orgânico"],
        correctIndex: 1,
        feedback: "Desmontar facilita o transporte e a triagem.",
      },
      {
        explanation: "Reciclar papel reduz o corte de árvores e o consumo de água.",
        question: "Qual benefício a reciclagem de papel traz?",
        options: ["Aumenta o uso de água", "Reduz a extração de madeira", "Polui rios", "Nenhum"],
        correctIndex: 1,
        feedback: "Papel reciclado poupa madeira, água e energia.",
      },
    ],
  },
  {
    id: "plastico",
    title: "Plásticos",
    icon: "🧴",
    description: "Garrafas, potes e embalagens: como preparar cada um.",
    available: true,
    wasteId: "garrafa-pet",
    questions: [
      {
        explanation: "Resíduos de líquido e comida dificultam a reciclagem do plástico.",
        question: "O que deve ser feito antes de encaminhar uma garrafa plástica?",
        options: ["Retirar o excesso de líquido", "Quebrar em pedaços", "Misturar com pilhas", "Colocar dentro de uma lâmpada"],
        correctIndex: 0,
        feedback: "Esvaziar (e, se possível, enxaguar) evita contaminar outros materiais.",
      },
      {
        explanation: "Amassar a garrafa reduz o volume no coletor.",
        question: "Por que amassar uma garrafa PET?",
        options: ["Para ela pesar mais", "Para ocupar menos espaço", "Para virar vidro", "Não se deve amassar"],
        correctIndex: 1,
        feedback: "Menos volume significa mais material por viagem de coleta.",
      },
      {
        explanation: "Plástico pode levar centenas de anos para se decompor na natureza.",
        question: "Onde a garrafa PET vazia deve ir?",
        options: ["Lixo orgânico", "Coletor de recicláveis (plástico)", "Rio", "Vaso sanitário"],
        correctIndex: 1,
        feedback: "O coletor de plástico (geralmente vermelho) é o destino certo.",
      },
    ],
  },
  {
    id: "vidro",
    title: "Vidros",
    icon: "🫙",
    description: "Vidro é 100% reciclável, mas precisa de cuidado no manuseio.",
    available: true,
    wasteId: "vidro",
    questions: [
      {
        explanation: "Vidro quebrado pode ferir quem faz a coleta.",
        question: "Como descartar um copo de vidro quebrado?",
        options: ["Solto no saco de lixo", "Embrulhado em jornal e identificado", "No vaso sanitário", "Na pia"],
        correctIndex: 1,
        feedback: "Embrulhe e escreva “vidro quebrado” para proteger os coletores.",
      },
      {
        explanation: "Espelhos, lâmpadas e cerâmica não são reciclados junto com vidro comum.",
        question: "Qual destes itens vai no coletor de vidro comum?",
        options: ["Lâmpada", "Espelho", "Pote de conserva limpo", "Prato de cerâmica"],
        correctIndex: 2,
        feedback: "Potes e garrafas de vidro limpos são o destino correto do coletor verde.",
      },
      {
        explanation: "O vidro pode ser reciclado infinitas vezes sem perder qualidade.",
        question: "Quantas vezes o vidro pode ser reciclado?",
        options: ["Apenas uma", "Duas vezes", "Indefinidamente", "Nenhuma"],
        correctIndex: 2,
        feedback: "Vidro mantém a qualidade a cada ciclo de reciclagem.",
      },
    ],
  },
  {
    id: "pilhas",
    title: "Pilhas e baterias",
    icon: "🔋",
    description: "Resíduos especiais que contêm metais pesados.",
    available: true,
    wasteId: "pilha",
    questions: [
      {
        explanation: "Pilhas contêm metais que contaminam solo e água se forem para o lixo comum.",
        question: "Onde uma pilha usada deve ser descartada?",
        options: ["Lixo comum", "Pia", "Ponto de coleta específico", "Vaso de planta"],
        correctIndex: 2,
        feedback: "Pilhas devem ir para coletores específicos de resíduos especiais.",
      },
      {
        explanation: "Até levar ao ponto de coleta, guarde as pilhas de forma segura.",
        question: "Como armazenar pilhas usadas em casa?",
        options: ["Em local úmido", "Em pote seco e fechado", "Perto do fogão", "Dentro da geladeira"],
        correctIndex: 1,
        feedback: "Local seco e fechado evita vazamentos e curtos.",
      },
      {
        explanation: "Baterias de lítio podem pegar fogo se forem perfuradas.",
        question: "O que NÃO fazer com uma bateria de celular estufada?",
        options: ["Levar ao ponto de coleta", "Furar ou amassar", "Guardar em local seco", "Isolar os contatos com fita"],
        correctIndex: 1,
        feedback: "Nunca fure ou amasse baterias: há risco de incêndio.",
      },
    ],
  },
  {
    id: "eletronicos",
    title: "Equipamentos eletrônicos",
    icon: "📱",
    description: "Celulares, cabos e aparelhos têm materiais valiosos e perigosos.",
    available: true,
    wasteId: "celular",
    questions: [
      {
        explanation: "Eletrônicos têm metais recuperáveis e componentes tóxicos.",
        question: "Um aparelho eletrônico quebrado deve ser descartado onde?",
        options: ["Em ponto de coleta de eletrônicos", "No vaso sanitário", "No lixo orgânico", "Em qualquer lixeira"],
        correctIndex: 0,
        feedback: "Pontos de coleta de eletrônicos encaminham o aparelho para desmontagem correta.",
      },
      {
        explanation: "Seus dados pessoais podem continuar no aparelho.",
        question: "O que fazer antes de descartar um celular?",
        options: ["Nada", "Apagar dados e remover o chip", "Molhar o aparelho", "Quebrar a tela"],
        correctIndex: 1,
        feedback: "Restaurar o aparelho protege sua privacidade.",
      },
      {
        explanation: "Muitos eletrônicos ainda funcionam e podem ser doados.",
        question: "Qual é a melhor opção para um notebook antigo que ainda liga?",
        options: ["Jogar fora", "Doar ou reaproveitar", "Enterrar", "Queimar"],
        correctIndex: 1,
        feedback: "Reutilizar vem antes de reciclar.",
      },
    ],
  },
  { id: "metais", title: "Metais", icon: "🥫", description: "Latas e objetos metálicos.", available: false, questions: [] },
  { id: "oleo", title: "Óleo de cozinha", icon: "🛢️", description: "Nunca na pia: aprenda o caminho certo.", available: false, questions: [] },
  { id: "reuso", title: "Reutilização e redução", icon: "♻️", description: "O melhor resíduo é o que não é gerado.", available: false, questions: [] },
];

export const getTrail = (id: string) => trails.find((t) => t.id === id);
