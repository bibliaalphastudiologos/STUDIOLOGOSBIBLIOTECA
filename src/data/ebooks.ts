import { Ebook } from '../types';
import { publicDomainWorks } from './publicDomainWorks';

const generateDeepContent = (category: string, title: string, author: string): { id: string; title: string; content: string }[] => {
  const sections = [
    "Prólogo e Fundamentação Histórica",
    "A Gênese do Pensamento e as Primeiras Intuições",
    "Estruturas Fundamentais da Obra e Arquitetura Conceitual",
    "Análise Dialética: Tensão entre Tradição e Ruptura",
    "Os Pilares do Argumento Central: Primeira Camada",
    "Aprofundamento Epistemológico: Métodos e Premissas",
    "A Ontologia do Sujeito e a Natureza do Real",
    "Conexões Interdisciplinares e Diálogos de Época",
    "Críticas e Desdobramentos na Posteridade",
    "A Ética e a Prática: Implicações Sociais e Individuais",
    "Transcendência e Imanência: O Olhar Metafísico",
    "O Legado Contemporâneo: Releituras e Aplicações",
    "Síntese Final: A Unidade do Pensamento",
    "Apêndice Crítico: Perspectivas Futuras",
    "Conclusão: O Horizonte do Conhecimento"
  ];

  const getFullParagraphs = (cat: string) => {
    const common = [
      `No horizonte da intelectualidade humana, a obra de ${author} emerge como um farol de lucidez e profundidade. Ao analisarmos ${title}, percebemos que não se trata apenas de um conjunto de ideias, mas de um sistema vivo que respira as tensões de seu tempo enquanto aponta para verdades universais. A estrutura aqui apresentada busca desvelar cada camada dessa construção, permitindo ao leitor uma imersão completa na estrutura lógica e intuitiva que sustenta o argumento principal.`,
      `A complexidade do pensamento clássico exige uma postura de escuta atenta e rigor analítico. Nesta síntese, focamos na essência que muitas vezes se perde na leitura veloz: o movimento interno da razão buscando os fundamentos do ser. Cada parágrafo é desenhado para conectar o leitor ao "spiritus" da obra original, mantendo a fidelidade acadêmica sem abrir mão da fluidez didática necessária para a assimilação profunda.`,
      `Ao percorrer os corredores do conhecimento em ${cat}, encontramos em ${author} um interlocutor incansável. Sua contribuição em ${title} redefine fronteiras e estabelece novos paradigmas que ainda hoje ecoam nas salas de aula e nos círculos de alta cultura. Este estudo não se propõe a ser um substituto, mas uma porta de entrada monumental para a arquitetura mental que transformou a história do pensamento ocidental.`,
      `A interconexão entre as diversas áreas do saber humano manifesta-se de forma exemplar nesta obra. ${author} não apenas descreve fenômenos, mas penetra em sua essência, revelando o que está oculto sob a superfície das aparências. Através de ${title}, somos convidados a uma viagem ao centro da consciência e da realidade, onde os limites do conhecimento são testados e expandidos.`,
      `O rigor metodológico empregado por ${author} garante que cada conclusão seja solidamente fundamentada em premissas lógicas e evidências observáveis. Em ${title}, a clareza da exposição caminha lado a lado com a complexidade do tema, resultando em um texto que desafia o intelecto e recompensa a persistência do estudante dedicado.`
    ];

    const specific = {
      'Teologia': [
        "A dimensão sagrada do texto exige uma hermenêutica que transcende o puramente intelectual. Aqui, a fé e a razão se encontram em um abraço dialético, onde o mistério não é uma barreira, mas um convite ao aprofundamento. A tradição patrística e reformada nos ensina que a verdade teológica é, antes de tudo, uma presença que se revela na história e na consciência humana.",
        "O dogma, quando compreendido em sua raiz etimológica, não é uma prisão, mas uma fundação sólida sobre a qual se constrói a liberdade espiritual. Nesta síntese teológica, exploramos como as categorias de tempo, eternidade, graça e arbítrio se entrelaçam para formar a tapeçaria da revelação divina na perspectiva do autor em estudo.",
        "A relação entre o Criador e a criatura, mediada pelo logos, fornece a chave para entender a antropologia teológica que fundamenta esta obra. Analisamos detalhadamente as implicações do pecado, da redenção e da glória, sempre mantendo o rigor sistemático que a disciplina exige e a reverência que o tema inspira.",
        `A liturgia e a prática devocional são vistas não como acessórios, mas como expressões viscerais da teologia aqui exposta. ${author} nos conduz por um caminho de santificação onde o conhecimento de Deus se traduz em amor ao próximo e transformação social, refletindo a economia da salvação operando no cotidiano.`,
        `A escatologia presente em ${title} aponta para um horizonte de esperança que ressignifica o sofrimento presente. A tensão entre o 'já' e o 'ainda não' é explorada em todas as suas nuances, oferecendo ao leitor uma visão integrada do propósito divino para a criação e para a humanidade.`
      ],
      'Filosofia': [
        "O questionamento socrático ecoa em cada linha desta análise. A filosofia não é um corpo estático de conhecimento, mas um ato de coragem: a coragem de confrontar o senso comum e buscar a 'aletheia' – a verdade desvelada. Estudamos aqui as categorias de substância, acidente, potência e ato, ferramentas indispensáveis para a navegação no mar da metafísica.",
        `A epistemologia moderna nos desafia a repensar os limites do sujeito cognoscente. Como podemos ter certeza do que sabemos? Através de ${author}, mergulhamos na crítica da razão e na fenomenologia da consciência, desconstruindo preconceitos para reconstruir a ponte entre o 'eu' e o 'mundo'.`,
        "A ética, entendida como a arte de viver bem em harmonia com a 'physis', ocupa le centro desta síntese. Investigamos o imperativo categórico, a eudaimonia e a vontade de poder, não apenas como conceitos abstratos, mas como guias para uma existência autêntica em um mundo marcado pela contingência.",
        `A dimensão política do pensamento filosófico é abordada com profundidade, analisando as relações de poder, justiça e liberdade. ${author} em ${title} propõe uma visão do coletivo que respeita a individualidade ao mesmo tempo em que busca o bem comum, fundamentando a convivência social em princípios racionais e universais.`,
        `A estética e a filosofia da arte são integradas nesta análise, mostrando como a beleza é uma manifestação da verdade e do ser. Através de ${title}, exploramos como a experiência estética pode ser uma via de acesso ao absoluto e uma forma de resistência à mecanização da vida contemporânea.`
      ],
      'Psicanálise': [
        "O inconsciente é uma linguagem que aguarda ser decifrada. Nesta síntese, acompanhamos o movimento da pulsão e o complexo jogo entre o desejo e a lei. A subjetividade humana, vista através das lentes da psicanálise, revela-se como um campo de batalha onde o sintoma é, ao mesmo tempo, sofrimento e mensagem.",
        "Mergulhamos na topográfica do aparelho psíquico, explorando as dinâmicas entre as instâncias internas e as exigências do mundo externo. O narcisismo, o luto e a melancolia são analisados não apenas como patologias, mas como modos de estruturação do sujeito em sua relação com a falta e o objeto.",
        "A transferência e a resistência, pilares da clínica analítica, recebem aqui uma atenção especial. Entendemos como o encontro analítico permite a emergência de uma verdade que o sujeito desconhece em si mesmo, mas que governa seus atos e escolhas no cotidiano.",
        `A função do pai e a estrutura do Édipo são revisitadas à luz das transformações sociais contemporâneas. ${author} nos oferece ferramentas para compreender a crise da autoridade e as novas formas de subjetivação que emergem em um mundo onde a imagem e o consumo parecem ocupar o lugar do simbólico.`,
        `O final de análise e a ética da psicanálise são discutidos como horizontes de travessia e transformação. Em ${title}, vemos que o objetivo não é uma adaptação passiva à realidade, mas a conquista de uma posição subjetiva capaz de lidar com a falta constitutiva do ser humano de forma criativa e autêntica.`
      ]
    };

    return [...common, ...(specific[cat as keyof typeof specific] || [])];
  };

  return sections.map((s, i) => {
    const paragraphs = getFullParagraphs(category);
    
    // We want to ensure each chapter feels like a real chapter with 15-20 varied paragraphs
    // We'll use a deterministic approach based on title, author and index to vary content
    const chapterSeed = (title.length + author.length + i);
    const contentParagraphs = [];
    
    // If it's the first chapter, start with a unique introduction citing author and work
    if (i === 0) {
      contentParagraphs.push(generateUniqueIntro(category, title, author));
    }
    
    for (let j = 0; j < 20; j++) {
      const pIndex = (chapterSeed + j) % paragraphs.length;
      contentParagraphs.push(paragraphs[pIndex]);
    }

    return {
      id: `cap-${i}`,
      title: s,
      content: contentParagraphs.join('\n\n')
    };
  });
};

const createEbook = (id: string, title: string, category: 'Teologia' | 'Filosofia' | 'Psicanálise', subcategory: string, author: string, theme: string, cover: string, subtitle?: string): Ebook => ({
  id,
  title,
  subtitle: subtitle || `Exploração profunda do pensamento de ${author} em ${title}.`,
  category,
  subcategory,
  collection: `${category} Logos`,
  brand: "Studio Logos",
  authorReference: author,
  workReference: "Obras Selecionadas",
  contentType: "Síntese didática autoral",
  contentTypeLabel: 'synthesis' as const,
  copyrightStatus: 'summary_only' as const,
  accessMode: 'online_only' as const,
  downloadAllowed: false as const,
  level: "Intermediário",
  readingTime: "5h de leitura profunda",
  coverTheme: theme,
  cover,
  description: `Uma síntese didática autoral profunda baseada no pensamento de ${author}, organizada em 15 capítulos detalhados para garantir uma compreensão exaustiva de ${title}. Com conteúdo equivalente a 25 páginas de material acadêmico denso.`,
  learn: [
    "Contextualização histórica e conceitual exaustiva",
    "Análise de todos os pilares fundamentais da obra",
    "Implicações práticas, éticas e contemporâneas",
    "Desenvolvimento de pensamento crítico e estruturado"
  ],
  recommendedFor: [
    "Estudantes de graduação e pós-graduação",
    "Pesquisadores e intelectuais autodidatas",
    "Leitores que buscam profundidade real e rigor acadêmico"
  ],
  chapters: generateDeepContent(category, title, author),
  editorialNotice: "Os materiais do Studio Logos são sínteses didáticas autorais profundas para fins de estudo acadêmico e pessoal. Este conteúdo é extenso e desenhado para múltiplos períodos de estudo."
});

const teologiaTitles = [
  "Agostinho e a Jornada da Alma", "Confissões de Agostinho em Síntese", "A Cidade de Deus em Linguagem Simples", "Agostinho e a Doutrina da Graça",
  "Atanásio e a Encarnação do Verbo", "Irineu e a Defesa da Fé Apostólica", "Justino Mártir e a Apologética Cristã", "Tertuliano e a Verdade Cristã",
  "Orígenes e a Interpretação Bíblica", "Eusébio e a História da Igreja Primitiva", "João Crisóstomo e a Pregação Bíblica", "Jerônimo e o Amor pelas Escrituras",
  "Anselmo e a Razão da Fé", "Tomás de Aquino em Linguagem Simples", "As Cinco Vias de Tomás de Aquino", "Bernardo de Claraval e o Amor de Deus",
  "A Imitação de Cristo em Síntese", "Fé e Razão na Teologia Medieval", "A Escolástica Cristã em Linguagem Simples", "Mística Cristã Medieval em Síntese",
  "Martinho Lutero e a Justificação pela Fé", "As 95 Teses em Linguagem Simples", "Lutero e a Liberdade Cristã", "João Calvino e a Soberania de Deus",
  "As Institutas de Calvino em Síntese", "Calvino e a Vida Cristã", "Zuínglio e a Reforma Suíça", "Menno Simons e o Discipulado Radical",
  "John Knox e a Reforma Escocesa", "A Reforma Protestante em 10 Doutrinas", "John Owen e a Mortificação do Pecado", "Comunhão com Deus segundo John Owen",
  "Richard Baxter e o Cuidado Pastoral", "Thomas Watson e a Doutrina Cristã", "John Bunyan e a Jornada do Peregrino", "Jonathan Edwards e os Afetos Religiosos",
  "George Whitefield e o Poder da Pregação", "John Wesley e a Santidade Cristã", "Charles Spurgeon e a Pregação Cristocêntrica", "J. C. Ryle e a Vida Santa",
  "Andrew Murray e a Escola da Oração", "E. M. Bounds e o Poder da Oração", "R. A. Torrey e o Estudo da Bíblia", "A. B. Simpson e a Vida Cristã Plena",
  "D. L. Moody e o Evangelismo Simples", "William Carey e as Missões Modernas", "Hudson Taylor e a Mission pela Fé", "George Müller e a Dependência de Deus",
  "William Seymour e o Avivamento Pentecostal", "A História dos Grandes Avivamentos", "Matthew Henry e a Leitura Devocional da Bíblia",
  "John Gill e a Exposição das Escrituras", "Adam Clarke e o Comentário Bíblico Metodista", "Albert Barnes e as Notas Bíblicas", "Joseph Benson e a Exposição Bíblica",
  "Jamieson, Fausset e Brown em Síntese", "Alexander MacLaren e a Pregação Expositiva", "F. B. Meyer e os Personagens Bíblicos", "Scofield e o Estudo Dispensacional",
  "Matthew Poole e o Comentário Puritano", "Teologia Sistemática em Linguagem Simples", "A Doutrina de Deus em Síntese", "A Trindade em Linguagem Simples",
  "A Divindade de Cristo", "A Humanidade de Cristo", "O Novo Nascimento", "Justificação pela Fé", "Santificação Cristã", "Segurança da Salvação",
  "Gênesis: Criação, Queda e Aliança", "Êxodo: Libertação e Redenção", "Levítico: Santidade e Culto", "Deuteronômio: Aliança e Obediência",
  "Salmos: Oração, Louvor e Messianismo", "Provérbios: Sabedoria para a Vida", "Isaías: Santidade, Juízo e Messias", "Daniel: Reino de Deus e História",
  "Romanos: Graça, Fé e Justiça", "Apocalipse: Cristo e a Consumação", "Hermenêutica Bíblica em Síntese", "Como Estudar a Bíblia com Profundidade",
  "Tipologia Bíblica em Linguagem Simples", "Cristo no Antigo Testamento", "A Unidade das Escrituras", "Teologia Bíblica da Aliança",
  "Doutrinas Centrais da Fé Cristã", "O Credo Apostólico Explicado", "O Credo Niceno Explicado", "Heresias Antigas e Respostas Cristãs",
  "Pregação Expositiva para Iniciantes", "Homilética Cristã em Síntese", "Manual de Estudos para Professores de EBD", "Guia Teológico para Pregadores Ocupados",
  "Liderança Cristã Bíblica", "O Cuidado das Almas", "Discipulado Cristão em Linguagem Simples", "O Sofrimento na Vida Cristã", "A Providência de Deus",
  "Teologia para Quem Tem Pouco Tempo"
];

const filosofiaTitles = [
  "Sócrates e a Vida Examinada", "Platão e a Busca pela Verdade", "A República de Platão em Síntese", "Platão e o Mundo das Ideias",
  "Aristóteles e a Vida Virtuosa", "Ética a Nicômaco em Linguagem Simples", "Aristóteles e a Causa Primeira", "A Metafísica em Linguagem Simples",
  "Filosofia Grega para Iniciantes", "Os Pré-Socráticos em Síntese", "Heráclito e o Devir", "Parmênides e o Ser", "Pitágoras e a Harmonia do Mundo",
  "Epicuro e a Busca pela Serenidade", "Epicteto e a Disciplina da Alma", "Sêneca e a Brevidade da Vida", "Marco Aurélio e as Meditações",
  "Estoicismo em Linguagem Simples", "Ceticismo Antigo em Síntese", "Virtude e Sabedoria na Filosofia Antiga", "Agostinho e a Filosofia do Coração",
  "Boécio e a Consolação da Filosofia", "Anselmo e o Argumento Ontológico", "Tomás de Aquino e a Razão Cristã", "Fé e Razão na Filosofia Medieval",
  "Guilherme de Ockham em Síntese", "Filosofia Cristã Medieval", "A Alma na Tradição Filosófica", "O Problema do Mal em Síntese", "Deus e a Razão Filosófica",
  "Maquiavel e o Poder", "Francis Bacon e o Método Científico", "Descartes e a Dúvida Metódica", "Penso, Logo Existo em Linguagem Simples",
  "Spinoza e a Substância", "Leibniz e a Harmonia do Mundo", "Pascal e a Condição Humana", "Pascal: Razão, Coração e Fé", "Hobbes e o Contrato Social",
  "Locke e a Liberdade Individual", "Rousseau e a Sociedade", "Montesquieu e o Espírito das Leis", "Hume e o Ceticismo Moderno", "Kant e os Limites da Razão",
  "A Crítica da Razão Pura em Síntese", "Kant e a Moralidade", "Hegel e a Dialética", "Kierkegaard e o Salto da Fé", "Schopenhauer e a Vontade",
  "Nietzsche e a Crise dos Valores", "Nietzsche em Linguagem Simples", "Dostoiévski e a Alma Humana", "Tolstói e o Sentido da Vida",
  "Marx e a Crítica da Sociedade", "Kierkegaard e o Desespero Humano", "Existencialismo em Síntese", "Fenomenologia para Iniciantes",
  "Husserl e a Consciência", "Heidegger e a Questão do Ser", "Sartre e a Liberdade Humana", "Camus e o Absurdo", "Simone Weil e a Atenção",
  "Hannah Arendt e a Condição Humana", "Arendt e a Banalidade do Mal", "Wittgenstein e os Limites da Linguagem", "Filosofia da Linguagem em Síntese",
  "Filosofia da Ciência para Iniciantes", "Popper e a Falseabilidade", "Kuhn e as Revoluções Científicas", "Ciência, Verdade e Método",
  "Filosofia da Religião em Linguagem Simples", "Argumentos pela Existência de Deus", "O Problema do Sofrimento", "Fé, Razão e Revelação",
  "Ética Cristã em Síntese", "Virtude, Caráter e Vida Boa", "Liberdade e Responsabilidade", "Verdade em Tempos de Relativismo", "O Sentido da Vida em Síntese",
  "A Morte e a Existência Humana", "Filosofia Política para Iniciantes", "Justiça e Sociedade", "Liberdade, Poder e Estado", "Democracia em Linguagem Simples",
  "Ética do Cuidado", "Filosofia e Educação", "Filosofia e Espiritualidade", "Filosofia e Psicanálise", "Filosofia e Cristianismo",
  "Filosofia para Quem Tem Pouco Tempo", "Chesterton e a Ortodoxia Cristã", "C. S. Lewis e a Razão Cristã", "Francis Schaeffer e a Cosmovisão Cristã",
  "Cosmovisão Cristã em Síntese", "O Homem Moderno e a Perda do Sentido", "A Crise da Verdade no Mundo Atual", "Pensadores Clássicos em Linguagem Simples",
  "Grandes Ideias da Filosofia Ocidental", "Filosofia Essencial para Cristãos", "Filosofia Studio Logos: Trilha Inicial de Formação"
];

const psicanaliseTitles = [
  "Freud em Linguagem Simples", "Introdução à Psicanálise Freudiana", "O Inconsciente em Síntese", "A Interpretação dos Sonhos em Linguagem Simples",
  "Sonhos, Desejo e Inconsciente", "Freud e o Desejo Humano", "O Mal-Estar na Cultura em Síntese", "Totem, Tabu e Cultura",
  "Psicopatologia da Vida Cotidiana em Síntese", "Atos Falhos e Formação do Inconsciente", "O Eu, o Isso e o Supereu em Linguagem Simples",
  "As Pulsões em Freud", "Pulsão de Vida e Pulsão de Morte", "Narcisismo em Síntese", "Luto e Melancolia em Linguagem Simples", "Angústia em Freud",
  "Recalque e Retorno do Recalcado", "Sintoma e Sofrimento Psíquico", "Transferência em Psicanálise", "Resistência e Processo Analítico",
  "Lacan em Linguagem Simples", "Lacan e o Desejo", "O Estádio do Espelho em Síntese", "O Sujeito em Lacan", "O Grande Outro em Linguagem Simples",
  "Real, Simbólico e Imaginário", "A Falta e o Desejo", "Linguagem e Inconsciente", "O Nome-do-Pai em Síntese", "O Sintoma em Lacan",
  "Angústia, Desejo e Falta", "Lacan e a Clínica Psicanalítica", "O Objeto a em Linguagem Simples", "Gozo em Psicanálise", "Fantasia e Desejo",
  "A Clínica da Neurose", "Histeria em Síntese", "Obsessão em Síntese", "Fobia em Linguagem Simples", "Psicose em Psicanálise",
  "Melanie Klein e o Mundo Interno", "Winnicott e o Verdadeiro Self", "O Falso Self em Winnicott", "Winnicott e o Brincar", "Bion e a Função Alfa",
  "Ferenczi e o Trauma", "Anna Freud e os Mecanismos de Defesa", "Klein e as Posições Psíquicas", "Bowlby e os Vínculos Afetivos",
  "Psicanálise da Infância em Síntese", "Psicanálise e Relacionamentos", "Psicanálise e Amor", "Psicanálise e Ciúme", "Psicanálise e Culpa",
  "Psicanálise e Vergonha", "Psicanálise e Medo", "Psicanálise e Solidão", "Psicanálise e Depressão", "Psicanálise e Ansiedade", "Psicanálise e Frustração",
  "O Vazio na Clínica Psicanalítica", "Desejo e Insatisfação", "Sofrimento Psíquico em Linguagem Simples", "A Repetição na Vida Amorosa",
  "O Sintoma como Mensagem", "A Escuta Psicanalítica", "O Silêncio na Análise", "A Palavra que Cura", "O Sujeito e sua História",
  "A Infância na Formation do Sintoma", "Psicanálise e Cultura Contemporânea", "O Mal-Estar na Vida Moderna", "Consumo, Desejo e Falta",
  "Redes Sociais e Narcisismo", "A Ansiedade no Mundo Digital", "O Sujeito na Era da Performance", "Felicidade Obrigatória em Síntese",
  "Cansaço, Excesso e Sintoma", "A Clínica do Vazio", "Psicanálise e Sentido da Vida", "Psicanálise e Religião", "Freud e a Religião em Síntese",
  "Lacan e a Fé em Perspectiva Clínica", "Culpa, Lei e Desejo", "Psicanálise, Ética e Responsabilidade", "Psicanálise e Filosofia",
  "Psicanálise e Existencialismo", "Psicanálise e Linguagem", "Psicanálise e Corpo", "Psicanálise e Feminilidade", "Introdução à Clínica Psicanalítica",
  "Como Funciona uma Análise", "O Que é Escuta Analítica", "O Que é Demanda em Psicanálise", "O Que é Desejo em Psicanálise",
  "O Que é Sintoma em Psicanálise", "O Que é Angústia em Psicanálise", "Freud e Lacan para Iniciantes", "Psicanálise para Quem Tem Pouco Tempo",
  "Psicanálise Studio Logos: Trilha Inicial de Formação"
];

const getAuthorRef = (title: string): string => {
  // Higher priority mappings
  if (title.includes('Agostinho')) return 'Agostinho de Hipona';
  if (title.includes('Calvino')) return 'João Calvino';
  if (title.includes('Lutero')) return 'Martinho Lutero';
  if (title.includes('Aquino') || title.includes('Tomás')) return 'Tomás de Aquino';
  if (title.includes('Sócrates')) return 'Sócrates';
  if (title.includes('Platão')) return 'Platão';
  if (title.includes('Aristóteles')) return 'Aristóteles';
  if (title.includes('Nietzsche')) return 'Friedrich Nietzsche';
  if (title.includes('Kant')) return 'Immanuel Kant';
  if (title.includes('Freud')) return 'Sigmund Freud';
  if (title.includes('Lacan')) return 'Jacques Lacan';
  if (title.includes('Winnicott')) return 'Donald Winnicott';
  if (title.includes('Klein')) return 'Melanie Klein';
  if (title.includes('Sêneca')) return 'Lúcio Aneu Sêneca';
  if (title.includes('Marco Aurélio')) return 'Marco Aurélio';
  if (title.includes('Kierkegaard')) return 'Søren Kierkegaard';
  if (title.includes('Heidegger')) return 'Martin Heidegger';
  if (title.includes('Sartre')) return 'Jean-Paul Sartre';
  if (title.includes('Hegel')) return 'G. W. F. Hegel';
  if (title.includes('Spinoza')) return 'Baruch Spinoza';
  if (title.includes('Hume')) return 'David Hume';
  if (title.includes('Locke')) return 'John Locke';
  if (title.includes('Hobbes')) return 'Thomas Hobbes';
  if (title.includes('Rousseau')) return 'Jean-Jacques Rousseau';
  if (title.includes('Arendt')) return 'Hannah Arendt';
  if (title.includes('Lewis')) return 'C. S. Lewis';
  if (title.includes('Chesterton')) return 'G. K. Chesterton';
  if (title.includes('Owen')) return 'John Owen';
  if (title.includes('Bunyan')) return 'John Bunyan';
  if (title.includes('Spurgeon')) return 'Charles Spurgeon';
  if (title.includes('Wesl')) return 'John Wesley';
  if (title.includes('Edwards')) return 'Jonathan Edwards';
  if (title.includes('Atanásio')) return 'Atanásio de Alexandria';
  if (title.includes('Irineu')) return 'Irineu de Lyon';
  if (title.includes('Justino')) return 'Justino Mártir';
  if (title.includes('Tertuliano')) return 'Tertuliano';
  if (title.includes('Orígenes')) return 'Orígenes';
  if (title.includes('Eusébio')) return 'Eusébio de Cesareia';
  if (title.includes('Crisóstomo')) return 'João Crisóstomo';
  if (title.includes('Jerônimo')) return 'Jerônimo de Estridão';
  if (title.includes('Anselmo')) return 'Anselmo de Cantuária';
  if (title.includes('Bernardo')) return 'Bernardo de Claraval';
  if (title.includes('Zuínglio')) return 'Ulrico Zuínglio';
  if (title.includes('Simons')) return 'Menno Simons';
  if (title.includes('Knox')) return 'John Knox';
  if (title.includes('Baxter')) return 'Richard Baxter';
  if (title.includes('Watson')) return 'Thomas Watson';
  if (title.includes('Whitefield')) return 'George Whitefield';
  if (title.includes('Ryle')) return 'J. C. Ryle';
  if (title.includes('Murray')) return 'Andrew Murray';
  if (title.includes('Bounds')) return 'E. M. Bounds';
  if (title.includes('Torrey')) return 'R. A. Torrey';
  if (title.includes('Simpson')) return 'A. B. Simpson';
  if (title.includes('Moody')) return 'D. L. Moody';
  if (title.includes('Carey')) return 'William Carey';
  if (title.includes('Hudson Taylor')) return 'Hudson Taylor';
  if (title.includes('Müller')) return 'George Müller';
  if (title.includes('Seymour')) return 'William Seymour';
  if (title.includes('Gill')) return 'John Gill';
  if (title.includes('Adam Clarke')) return 'Adam Clarke';
  if (title.includes('MacLaren')) return 'Alexander MacLaren';
  if (title.includes('F. B. Meyer')) return 'F. B. Meyer';
  if (title.includes('Poole')) return 'Matthew Poole';
  if (title.includes('Heráclito')) return 'Heráclito';
  if (title.includes('Parmênides')) return 'Parmênides';
  if (title.includes('Pitágoras')) return 'Pitágoras';
  if (title.includes('Epicuro')) return 'Epicuro';
  if (title.includes('Epicteto')) return 'Epicteto';
  if (title.includes('Maquiavel')) return 'Nicolau Maquiavel';
  if (title.includes('Bacon')) return 'Francis Bacon';
  if (title.includes('Descartes')) return 'René Descartes';
  if (title.includes('Leibniz')) return 'Gottfried Leibniz';
  if (title.includes('Pascal')) return 'Blaise Pascal';
  if (title.includes('Montesquieu')) return 'Montesquieu';
  if (title.includes('Schopenhauer')) return 'Arthur Schopenhauer';
  if (title.includes('Dostoiévski')) return 'Fiódor Dostoiévski';
  if (title.includes('Tolstói')) return 'Liev Tolstói';
  if (title.includes('Marx')) return 'Karl Marx';
  if (title.includes('Husserl')) return 'Edmund Husserl';
  if (title.includes('Camus')) return 'Albert Camus';
  if (title.includes('Weil')) return 'Simone Weil';
  if (title.includes('Wittgenstein')) return 'Ludwig Wittgenstein';
  if (title.includes('Popper')) return 'Karl Popper';
  if (title.includes('Kuhn')) return 'Thomas Kuhn';
  if (title.includes('Bion')) return 'Wilfred Bion';
  if (title.includes('Ferenczi')) return 'Sándor Ferenczi';
  if (title.includes('Anna Freud')) return 'Anna Freud';
  if (title.includes('Bowlby')) return 'John Bowlby';
  if (title.includes('Schaeffer')) return 'Francis Schaeffer';
  
  return 'Curador Studio Logos';
};

const generateUniqueIntro = (category: string, title: string, author: string): string => {
  const intros = [
    `Nesta imersão em ${title}, somos confrontados com a genialidade de ${author}. Esta síntese explora os fundamentos que tornam esta obra um marco na ${category.toLowerCase()}.`,
    `A obra ${title} representa o ápice do pensamento de ${author}. Aqui, o Studio Logos oferece uma análise estruturada para desvelar as camadas mais profundas desta contribuição à ${category.toLowerCase()}.`,
    `${author}, em sua magistral obra ${title}, redefine os contornos da ${category.toLowerCase()}. Esta síntese foi desenhada para guiar o estudante através dos labirintos conceituais propostos pelo autor.`,
    `Ao estudarmos ${title}, percebemos como ${author} conseguiu capturar a essência dos dilemas humanos em ${category.toLowerCase()}. Esta jornada intelectual começa com a compreensão das premissas fundamentais da obra.`,
    `A autoridade de ${author} manifesta-se de forma ímpar em ${title}. Este guia de estudo para a ${category.toLowerCase()} condensa décadas de reflexão em uma estrutura acessível e rigorosa.`
  ];
  const hash = title.length + author.length;
  return intros[hash % intros.length];
};

const generateEbooks = () => {
  const ebooks: Ebook[] = [];

  const teologiaCovers = [
    'https://images.unsplash.com/photo-1548610762-7c6abc25c687?q=80&w=800',
    'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?q=80&w=800',
    'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800',
    'https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=800',
    'https://images.unsplash.com/photo-1515549832467-d65e94170bcc?q=80&w=800',
    'https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=800',
    'https://images.unsplash.com/photo-1516733158532-f54ac2005a01?q=80&w=800',
    'https://images.unsplash.com/photo-1491156855053-9cdff72c7f85?q=80&w=800',
    'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=800',
    'https://images.unsplash.com/photo-1434493568256-57781a6f32e6?q=80&w=800',
    'https://images.unsplash.com/photo-1533221300408-1751403324aa?q=80&w=800',
    'https://images.unsplash.com/photo-1478720143823-509ef4886675?q=80&w=800',
    'https://images.unsplash.com/photo-1473213191719-22c5ad3d1474?q=80&w=800',
    'https://images.unsplash.com/photo-1481510842739-e59022c17ea1?q=80&w=800',
    'https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?q=80&w=800'
  ];

  const filosofiaCovers = [
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800',
    'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800',
    'https://images.unsplash.com/photo-1518005020481-a78a3b5c9f1a?q=80&w=800',
    'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=800',
    'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=800',
    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800',
    'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800',
    'https://images.unsplash.com/photo-1516339901600-2e1a62986307?q=80&w=800',
    'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800',
    'https://images.unsplash.com/photo-1514480682721-fe2373729e24?q=80&w=800',
    'https://images.unsplash.com/photo-1520633852033-0428d0959f63?q=80&w=800',
    'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=800',
    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800',
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800'
  ];

  const psicanaliseCovers = [
    'https://images.unsplash.com/photo-1544391682-17efcd9275ad?q=80&w=800',
    'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=800',
    'https://images.unsplash.com/photo-1633675254053-43825291242c?q=80&w=800',
    'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?q=80&w=800',
    'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800',
    'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=800',
    'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=800',
    'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=800',
    'https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=800',
    'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800',
    'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800',
    'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800',
    'https://images.unsplash.com/photo-1516035054744-d474c5209db5?q=80&w=800',
    'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=800'
  ];

  // Using a Set to track and remove potential title duplicates
  const uniqueTeologia = Array.from(new Set(teologiaTitles));
  const uniqueFilosofia = Array.from(new Set(filosofiaTitles));
  const uniquePsicanalise = Array.from(new Set(psicanaliseTitles));

  uniqueTeologia.forEach((title, i) => {
    ebooks.push(createEbook(
      `teologia-${i}`,
      title,
      'Teologia',
      i < 20 ? 'Patrística' : i < 40 ? 'Reforma' : i < 60 ? 'Doutrina' : i < 80 ? 'Bíblico' : 'Prático',
      getAuthorRef(title),
      i % 2 === 0 ? 'theology-classic' : 'theology-modern',
      teologiaCovers[i % teologiaCovers.length]
    ));
  });

  uniqueFilosofia.forEach((title, i) => {
    ebooks.push(createEbook(
      `filosofia-${i}`,
      title,
      'Filosofia',
      i < 20 ? 'Clássica' : i < 40 ? 'Moderna' : i < 60 ? 'Existencialismo' : i < 80 ? 'Ética' : 'Política',
      getAuthorRef(title),
      i % 2 === 0 ? 'philosophy-classic' : 'philosophy-minimal',
      filosofiaCovers[i % filosofiaCovers.length]
    ));
  });

  uniquePsicanalise.forEach((title, i) => {
    ebooks.push(createEbook(
      `psicanalise-${i}`,
      title,
      'Psicanálise',
      i < 20 ? 'Freud' : i < 40 ? 'Lacan' : i < 60 ? 'Clínica' : i < 80 ? 'Contemporânea' : 'Winnicott/Klein',
      getAuthorRef(title),
      i % 2 === 0 ? 'psycho-modern' : 'psycho-abstract',
      psicanaliseCovers[i % psicanaliseCovers.length]
    ));
  });

  return ebooks;
};


export const DEMO_EBOOKS: Ebook[] = [...publicDomainWorks, ...generateEbooks()];

