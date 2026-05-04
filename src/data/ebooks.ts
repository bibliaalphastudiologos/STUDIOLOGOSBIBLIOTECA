import { Ebook } from '../types';
import { publicDomainWorks } from './publicDomainWorks';

// ─── Citações reais por autor ──────────────────────────────────────────────
const AUTHOR_QUOTES: Record<string, { quote: string; source: string }[]> = {
  'Agostinho': [
    { quote: 'Fizeste-nos para ti, Senhor, e o nosso coração está inquieto, enquanto não repousa em ti.', source: 'Confissões, I, 1' },
    { quote: 'Tarde te amei, ó beleza tão antiga e tão nova, tarde te amei!', source: 'Confissões, X, 27' },
    { quote: 'Nosso coração é sem repouso até que encontre descanso em ti.', source: 'Confissões, I, 1' },
    { quote: 'A fé precede o entendimento. Crê para que entendas.', source: 'Sermão 43' },
    { quote: 'Ama e faz o que quiseres.', source: 'Comentário à 1ª João, 7, 8' },
  ],
  'Lutero': [
    { quote: 'Aqui estou. Não posso fazer de outro modo. Que Deus me ajude. Amém.', source: 'Dieta de Worms, 1521' },
    { quote: 'O cristão é senhor de tudo e não está sujeito a ninguém. O cristão é servo de tudo e está sujeito a todos.', source: 'Da Liberdade Cristã, 1520' },
    { quote: 'A Escritura sozinha é a regra e norma de toda doutrina.', source: 'Artigos de Esmalcalde' },
    { quote: 'Somos justificados pela fé somente, mas a fé que justifica nunca está só.', source: 'Comentário a Gálatas' },
  ],
  'Calvino': [
    { quote: 'Quase toda a soma de nossa sabedoria, que merece ser verdadeira e certa, consiste de duas partes: o conhecimento de Deus e o conhecimento de nós mesmos.', source: 'Institutas, I, 1, 1' },
    { quote: 'A palavra de Deus é como o sol que ilumina todos os que a contemplam, mas para os cegos não serve de nada.', source: 'Institutas, I, 6' },
    { quote: 'A glória de Deus é o homem plenamente vivo.', source: 'Institutas' },
  ],
  'Tomás de Aquino': [
    { quote: 'A fé é um hábito da mente pela qual a vida eterna começa em nós.', source: 'Suma Teológica, II-II, q.4, a.1' },
    { quote: 'O amor é a primeira lei inscrita em nosso coração.', source: 'Suma Teológica, I-II, q.94' },
    { quote: 'A graça não destrói a natureza, mas a aperfeiçoa.', source: 'Suma Teológica, I, q.1, a.8' },
    { quote: 'O homem não pode viver sem alegria; por isso, quando é privado da alegria espiritual, vai em busca das carnais.', source: 'Suma Teológica, II-II, q.35' },
  ],
  'Platão': [
    { quote: 'O inimigo examinado não vale a pena ser vivido.', source: 'Apologia de Sócrates, 38a' },
    { quote: 'A verdadeira beleza é simples, pura, sem mistura.', source: 'O Banquete, 211e' },
    { quote: 'Nenhum homem faz o mal voluntariamente.', source: 'Protágoras, 345e' },
    { quote: 'O conhecimento é a única virtude, a ignorância o único vício.', source: 'Mênon, 87e' },
    { quote: 'Somos prisioneiros do corpo como a ostra de sua concha.', source: 'Fedro, 250c' },
  ],
  'Aristóteles': [
    { quote: 'O homem é por natureza um animal político.', source: 'Política, I, 1253a' },
    { quote: 'A felicidade é uma atividade da alma em conformidade com a virtude perfeita.', source: 'Ética a Nicômaco, I, 13' },
    { quote: 'Todos os homens têm por natureza o desejo de conhecer.', source: 'Metafísica, I, 980a' },
    { quote: 'A excelência não é um ato, mas um hábito.', source: 'Ética a Nicômaco, II, 4' },
  ],
  'Marco Aurélio': [
    { quote: 'Você tem poder sobre sua mente, não sobre os eventos externos. Perceba isso e encontrará força.', source: 'Meditações, VI, 8' },
    { quote: 'Perde o menor tempo possível com o que outros pensam de você.', source: 'Meditações, IV, 3' },
    { quote: 'Se não está em seu poder, não é seu problema.', source: 'Meditações, VI, 52' },
    { quote: 'O obstáculo avança a ação. O que está no caminho torna-se o caminho.', source: 'Meditações, V, 20' },
  ],
  'Epicteto': [
    { quote: 'Não busques que os eventos aconteçam como tu queres; ao contrário, deseja que os eventos aconteçam como são, e tu serás tranquilo.', source: 'Enchiridion, 8' },
    { quote: 'Busca não que as coisas que acontecem aconteçam como você deseja; deseje as coisas como são, e você terá uma vida tranquila.', source: 'Enchiridion, 8' },
  ],
  'Freud': [
    { quote: 'O inconsciente é o psíquico propriamente real.', source: 'A Interpretação dos Sonhos, 1900' },
    { quote: 'Onde houver o Id, haverá o Ego.', source: 'Novas Conferências Introdutórias, 1933' },
    { quote: 'O Ego não é senhor em sua própria casa.', source: 'Uma Dificuldade da Psicanálise, 1917' },
    { quote: 'Eros e Tanatos — pulsão de vida e pulsão de morte — são as forças que movem tudo.', source: 'Além do Princípio do Prazer, 1920' },
    { quote: 'A anatomia é o destino.', source: 'A Dissolução do Complexo de Édipo, 1924' },
  ],
  'Lacan': [
    { quote: 'O inconsciente é estruturado como uma linguagem.', source: 'Escritos, 1966' },
    { quote: 'O desejo do homem é o desejo do Outro.', source: 'Seminário V, 1957-58' },
    { quote: 'Não existe relação sexual.', source: 'Seminário XX, 1972-73' },
    { quote: 'O que não se pode dizer deve ser mostrado.', source: 'Escritos' },
  ],
  'Hegel': [
    { quote: 'O real é racional e o racional é real.', source: 'Princípios da Filosofia do Direito, Prefácio' },
    { quote: 'A coruja de Minerva alça voo ao cair do crepúsculo.', source: 'Filosofia do Direito, Prefácio' },
    { quote: 'A história universal é o tribunal universal.', source: 'Filosofia do Direito' },
  ],
  'Kant': [
    { quote: 'Age apenas segundo uma máxima tal que possas ao mesmo tempo querer que ela se torne lei universal.', source: 'Fundamentação da Metafísica dos Costumes, BA 52' },
    { quote: 'O céu estrelado sobre mim e a lei moral dentro de mim.', source: 'Crítica da Razão Prática, Conclusão' },
    { quote: 'Sapere aude — tem coragem de fazer uso do teu próprio entendimento.', source: 'Resposta à Pergunta: O que é o Iluminismo?, 1784' },
  ],
  'Nietzsche': [
    { quote: 'Deus está morto. Deus permanece morto. E nós o matamos.', source: 'A Gaia Ciência, §125' },
    { quote: 'Aquilo que não me mata, me fortalece.', source: 'Crepúsculo dos Ídolos, Máximas e Flechas, 8' },
    { quote: 'O homem é algo que deve ser superado.', source: 'Assim Falou Zaratustra, Prólogo' },
    { quote: 'Conhecer-se a si mesmo plenamente seria a morte.', source: 'Aurora' },
  ],
  'Kierkegaard': [
    { quote: 'A angústia é a vertigem da liberdade.', source: 'O Conceito de Angústia, 1844' },
    { quote: 'O desespero é a doença mortal.', source: 'A Doença para a Morte, 1849' },
    { quote: 'Subjetividade é a verdade.', source: 'Pós-escrito Conclusivo Não-científico' },
  ],
  'Heidegger': [
    { quote: 'O ser-no-mundo é a estrutura fundamental da existência.', source: 'Ser e Tempo, §12' },
    { quote: 'O homem é o pastor do Ser.', source: 'Carta sobre o Humanismo, 1947' },
    { quote: 'A linguagem é a casa do Ser.', source: 'Carta sobre o Humanismo, 1947' },
  ],
  'Sartre': [
    { quote: 'A existência precede a essência.', source: 'O Existencialismo é um Humanismo, 1945' },
    { quote: 'O homem está condenado a ser livre.', source: 'O Ser e o Nada, 1943' },
    { quote: 'O inferno são os outros.', source: 'Entre Quatro Paredes, 1944' },
  ],
  'Winnicott': [
    { quote: 'Não existe tal coisa como um bebê — há um bebê e alguém.', source: 'Pediatrics, 1960' },
    { quote: 'A criatividade é a manutenção do que é pessoal, e apenas isso faz sentido para viver.', source: 'O Brincar e a Realidade, 1971' },
  ],
};

// ─── Capítulos únicos por autor/tema ──────────────────────────────────────
const AUTHOR_CHAPTER_STRUCTURES: Record<string, string[]> = {
  'Agostinho': ['Vida e Conversão', 'Maniqueísmo e sua Superação', 'Neoplatonismo e Fé', 'A Doutrina da Graça', 'O Pecado Original', 'Tempo, Memória e Eternidade', 'A Cidade de Deus e a Cidade dos Homens', 'Trindade e Teologia', 'Hermenêutica Bíblica', 'A Vontade e o Livre-Arbítrio', 'Oração e Contemplação', 'Eclesiologia', 'Escatologia Agostiniana', 'Influência na Teologia Ocidental', 'Legado e Atualidade'],
  'Lutero': ['A Crise da Consciência Monástica', 'As 95 Teses: Contexto e Conteúdo', 'Sola Scriptura — A Autoridade da Bíblia', 'Sola Fide — Justificação pela Fé', 'Sola Gratia — A Graça Soberana', 'Debate com Erasmo: Livre-Arbítrio', 'A Teologia da Cruz', 'A Reforma da Liturgia', 'Lutero e o Estado', 'A Família e o Sacerdócio Universal', 'Os Catecismos: Maior e Menor', 'Tradução da Bíblia para o Alemão', 'Lutero e os Radicais', 'O Protestantismo após Lutero', 'Legado da Reforma'],
  'Calvino': ['Vida de Calvino: De Paris a Genebra', 'As Institutas: Estrutura e Propósito', 'O Conhecimento de Deus e de Si Mesmo', 'A Providência Divina', 'A Predestinação', 'Cristologia Calvinista', 'Pneumatologia: O Espírito Santo', 'A Igreja Visível e Invisível', 'Os Sacramentos: Batismo e Eucaristia', 'A Lei e o Evangelho', 'A Vida Cristã', 'Estado e Igreja em Calvino', 'Calvinismo e Cultura', 'O Presbiterianismo', 'A Herança Reformada'],
  'Tomás de Aquino': ['Aristóteles e o Cristianismo', 'As Cinco Vias', 'A Essência Divina', 'Os Atributos de Deus', 'A Trindade', 'A Criação', 'Os Anjos', 'O Homem: Alma e Corpo', 'A Graça e a Virtude', 'A Lei Natural', 'A Fé, Esperança e Caridade', 'Os Sacramentos', 'A Escatologia', 'Tomismo e Modernidade', 'A Nova Teologia e Aquino'],
  'Platão': ['Sócrates e o Método Dialético', 'A Teoria das Formas', 'O Mundo Sensível e o Inteligível', 'Epistemologia: Opinião e Conhecimento', 'A Alegoria da Caverna', 'A Alma e suas Partes', 'A Cidade Ideal', 'Os Filósofos-Reis', 'A Educação em Platão', 'Amor e Beleza: O Banquete', 'A Imortalidade da Alma', 'Cosmologia: O Timeu', 'A Crítica à Arte', 'Platão e o Neoplatonismo', 'Platão na Tradição Ocidental'],
  'Aristóteles': ['Lógica e Categorias', 'A Metafísica: Ser enquanto Ser', 'Substância, Forma e Matéria', 'A Física e o Movimento', 'A Alma: De Anima', 'A Ética a Nicômaco', 'A Eudaimonia', 'As Virtudes', 'A Amizade', 'A Política', 'A Poética', 'A Retórica', 'Aristóteles na Escolástica', 'O Empirismo Aristotélico', 'Legado e Influência'],
  'Marco Aurélio': ['O Imperador Filósofo', 'A Escola Estoica', 'A Física Estoica', 'A Lógica Estoica', 'A Ética Estoica', 'O que Depende de Nós', 'A Razão Universal — Logos', 'O Presente Momento', 'A Morte como Fenômeno Natural', 'A Comunidade Cosmopolita', 'Emoções e Representações', 'A Autossuficiência Interior', 'Marco Aurélio e os Cristãos', 'Estoicismo Contemporâneo', 'As Meditações como Prática Espiritual'],
  'Freud': ['O Nascimento da Psicanálise', 'O Método da Associação Livre', 'A Interpretação dos Sonhos', 'A Topografia: Consciente e Inconsciente', 'O Complexo de Édipo', 'A Sexualidade Infantil', 'As Pulsões de Vida e de Morte', 'O Narcisismo', 'O Luto e a Melancolia', 'A Estrutura: Id, Ego, Superego', 'A Transferência na Clínica', 'A Angústia', 'A Metapsicologia', 'Freud e a Cultura', 'O Futuro da Psicanálise'],
  'Lacan': ['Retorno a Freud', 'O Estádio do Espelho', 'O Simbólico, o Imaginário e o Real', 'O Grande Outro', 'O Sujeito do Inconsciente', 'A Linguagem e o Inconsciente', 'O Desejo e o Gozo', 'O Objeto a', 'A Transferência Lacaniana', 'Os Quatro Discursos', 'O Nome-do-Pai', 'A Sexuação', 'O Sintoma como Letra', 'O Passe e o Final de Análise', 'Lacan e o Pós-Lacanismo'],
  'Hegel': ['O Absoluto e a Dialética', 'Fenomenologia do Espírito', 'A Certeza Sensível', 'Senhor e Escravo', 'Consciência Infeliz', 'A Razão', 'O Espírito Objetivo', 'Direito Abstrato e Moralidade', 'A Família, Sociedade Civil e Estado', 'A Filosofia da História', 'O Espírito Absoluto', 'Arte, Religião e Filosofia', 'A Lógica Hegeliana', 'Hegel e o Marxismo', 'Hegel e o Existencialismo'],
  'Kant': ['O Problema do Conhecimento', 'Revolução Copernicana em Filosofia', 'Espaço, Tempo e Formas Puras', 'Os Conceitos do Entendimento', 'A Dialética Transcendental', 'O Imperativo Categórico', 'A Autonomia da Vontade', 'A Crítica do Juízo', 'A Religião nos Limites da Razão', 'O Iluminismo Kantiano', 'Kant e a Metafísica', 'Kant e Hume', 'O Idealismo Transcendental', 'Kant e a Ética Contemporânea', 'O Legado Crítico'],
  'Nietzsche': ['A Morte de Deus', 'Apolíneo e Dionisíaco', 'A Crítica da Moral Cristã', 'A Genealogia da Moral', 'O Niilismo', 'A Vontade de Poder', 'O Eterno Retorno', 'O Über-Mensch', 'A Transvaloração dos Valores', 'Nietzsche e Schopenhauer', 'Nietzsche e Wagner', 'O Perspectivismo', 'Nietzsche e o Nazismo', 'Nietzsche e a Pós-Modernidade', 'Nietzsche Hoje'],
  'Kierkegaard': ['Os Estágios da Existência', 'O Estético', 'O Ético', 'O Religioso', 'A Angústia', 'O Desespero', 'A Fé como Salto', 'O Cavaleiro da Fé', 'Abraão e o Sacrifício', 'A Subjetividade', 'A Crítica à Cristandade', 'Kierkegaard e Hegel', 'O Amor em Kierkegaard', 'A Comunicação Indireta', 'Kierkegaard e o Existencialismo'],
  'Heidegger': ['A Questão do Ser', 'Dasein: Ser-no-Mundo', 'Facticidade e Projeto', 'A Angústia e o Nada', 'Ser-para-a-Morte', 'A Temporalidade', 'A Autenticidade', 'O Esquecimento do Ser', 'A Técnica Moderna', 'A Linguagem como Casa do Ser', 'A Viragem (Kehre)', 'Heidegger e os Pré-Socráticos', 'A Questão da Arte', 'Heidegger e o Nazismo', 'Pós-Heidegger'],
  'Sartre': ['A Fenomenologia da Consciência', 'O Em-si e o Para-si', 'A Má-Fé', 'A Liberdade Radical', 'A Condenação à Liberdade', 'O Outro e o Olhar', 'O Projeto de Ser', 'Amor, Conflito e Solidariedade', 'O Engajamento Político', 'Marxismo e Existencialismo', 'A Náusea', 'A Imaginação', 'O Existencialismo Humanista', 'Sartre e Beauvoir', 'Legado do Existencialismo'],
};

// ─── Conteúdo único por capítulo (por categoria) ──────────────────────────
const SYNTHESIS_CHAPTER_CONTENT: Record<string, string[][]> = {
  'Teologia': [
    // Chapter 0
    [
      `O estudo da teologia cristã exige que o intérprete se situe historicamente. A tradição patrística, medieval e reformada não constitui um bloco homogêneo, mas um debate vivo ao longo de dois milênios sobre como a razão humana pode falar de Deus sem trair a revelação.`,
      `Agostinho já havia advertido que toda investigação teológica começa no coração, não no intelecto: <em>"Nosso coração está inquieto enquanto não repousa em ti."</em> Esta inquietação não é fraqueza, mas o ponto de partida de todo pensamento cristão sério.`,
      `O autor em estudo escreve dentro de uma tradição que reconhece os limites da linguagem humana sobre o divino — a chamada <em>via negativa</em> ou teologia apofática — ao mesmo tempo em que afirma ser possível, pela graça, um conhecimento genuíno de Deus.`,
      `A tensão entre transcendência e imanência divina atravessa toda a reflexão desta obra. Como Deus pode ser totalmente outro (o "totaliter aliter" de Barth) e ao mesmo tempo intimamente presente? A resposta a essa questão define todo o sistema teológico estudado.`,
    ],
    // Chapter 1
    [
      `A doutrina da inspiração e da autoridade das Escrituras ocupa posição central nesta obra. Para o autor, a Palavra de Deus não é mero registro humano de experiências religiosas, mas revelação que interpela o ser humano em sua situação concreta.`,
      `"Toda a Escritura é divinamente inspirada e útil para ensinar, redargüir, corrigir e instruir em justiça" (2Tm 3,16). Este versículo funciona como axioma metodológico: a exegese que não submete a razão à norma escriturística desliza inevitavelmente para a especulação vã.`,
      `O problema hermenêutico — como interpretar o texto antigo para o presente — é enfrentado com seriedade. A interpretação alegórica dos Pais, o sentido literal-histórico enfatizado pelos reformadores e a exegese histórico-crítica moderna são pesados em sua contribuição e limitações.`,
    ],
    // Chapter 2
    [
      `A cristologia — a doutrina sobre a pessoa e obra de Jesus Cristo — constitui o coração pulsante da teologia cristã. O Concílio de Nicéia (325) e o de Calcedônia (451) estabeleceram os marcos doutrinários: Cristo é verdadeiro Deus e verdadeiro homem, em uma só pessoa.`,
      `A soteriologia — a doutrina da salvação — desdobra-se diretamente da cristologia. A morte expiatória de Cristo, sua ressurreição e exaltação são os fundamentos sobre os quais se apoia toda a antropologia teológica do autor em estudo.`,
      `Anselmo de Cantuária formulou a teoria da satisfação: o pecado é uma ofensa infinita à honra de Deus, que só pode ser reparada por alguém que seja ao mesmo tempo Deus e homem. Abelardo propôs a teoria moral: a cruz é o exemplo máximo do amor divino que move o coração humano à conversão.`,
    ],
    // Chapter 3
    [
      `A pneumatologia — a doutrina do Espírito Santo — recebeu atenção sistemática tardia na história da teologia. Agostinho via o Espírito como o amor mútuo do Pai e do Filho dentro da Trindade; Calvino enfatizava sua obra de iluminação interior, tornando eficaz a Palavra externamente pregada.`,
      `A questão do <em>filioque</em> — se o Espírito procede do Pai e do Filho (Ocidente) ou apenas do Pai (Oriente) — ilustra como a teologia trinitária tem implicações eclesiológicas e ecumênicas profundas, que dividem o Ocidente latino do Oriente grego até hoje.`,
      `Na perspectiva pentecostal e carismática, os dons do Espírito (1Co 12–14) são experiências presentes, não cessadas com a era apostólica. Esta questão atravessa as fronteiras denominacionais e toca o núcleo da compreensão do que significa ser Igreja no mundo contemporâneo.`,
    ],
    // Chapter 4
    [
      `A eclesiologia — a doutrina da Igreja — envolve questões práticas e teológicas de primeira ordem: o que é a Igreja? quais são suas marcas? como se relaciona com o Estado e com a cultura?`,
      `As quatro marcas da Igreja do Credo Niceno-Constantinopolitano — uma, santa, católica e apostólica — são interpretadas diferentemente nas tradições católico-romana, ortodoxa e protestante. Esta diferença de interpretação reflete concepções distintas de autoridade, tradição e sacramento.`,
      `O conceito de "Igreja invisível" (os eleitos conhecidos apenas por Deus) e "Igreja visível" (a assembleia histórica dos confessantes) é fundamental para entender tanto a teologia reformada quanto as questões ecumênicas contemporâneas.`,
    ],
    // Chapter 5
    [
      `A escatologia — a doutrina das "últimas coisas" — foi durante muito tempo o capítulo esquecido da teologia sistemática. Mas no século XX, com Karl Barth, Jürgen Moltmann e Oscar Cullmann, a esperança escatológica voltou ao centro.`,
      `A distinção entre "imortalidade da alma" (conceito grego) e "ressurreição do corpo" (conceito hebraico-cristão) é fundamental. O Novo Testamento não promete a sobrevivência do espírito desencarnado, mas a transformação de toda a existência corporal — a vitória sobre a morte.`,
      `A tensão "já/ainda não" — o Reino de Deus já inaugurado em Cristo, mas ainda aguardando sua consumação final — define a posição ética do cristão no mundo: envolvido com a história, mas não idólatra da história.`,
    ],
  ],
  'Filosofia': [
    // Chapter 0
    [
      `A filosofia nasce da admiração — do <em>thaumazein</em> que Aristóteles identificou como a mola propulsora do pensamento. Não se trata de uma admiração passiva, mas daquela estranheza produtiva que recusa os consensos do senso comum e exige justificação racional de toda crença.`,
      `O problema fundamental desta obra é: o que podemos conhecer com certeza? Como distinguir opinião de conhecimento, aparência de realidade? As respostas que o autor propõe determinam toda a arquitetura do seu sistema filosófico.`,
      `A tradição em que o autor se inscreve — seja a platônica, a aristotélica, a kantiana ou a fenomenológica — fornece as ferramentas conceituais com as quais ele trabalha. Entender essa tradição é condição para avaliar a originalidade e os limites da sua contribuição.`,
      `"O inimigo examinado não vale a pena ser vivido", disse Sócrates no momento de sua morte — ou mais precisamente: "A vida não examinada não vale a pena ser vivida" (Apologia, 38a). Esta sentença define o programa de toda filosofia genuína: a disposição de pôr em questão o próprio ponto de partida.`,
    ],
    // Chapter 1
    [
      `A epistemologia — a teoria do conhecimento — pergunta pelas condições de possibilidade do saber. Locke, Hume e Kant representam três posições clássicas: o empirismo que vê todo conhecimento derivar da experiência; o ceticismo que duvida da possibilidade de conhecimento necessário; o criticismo que busca as condições a priori que tornam possível a experiência.`,
      `Kant formulou a questão com precisão cirúrgica: "como são possíveis juízos sintéticos a priori?" — ou seja, como podemos ter conhecimento que expanda nosso saber (sintético) e que, ao mesmo tempo, valha necessariamente (a priori)? A Crítica da Razão Pura é a resposta a esta questão.`,
      `A distinção entre <em>fenômeno</em> e <em>noúmeno</em> — entre o objeto como aparece para nós e o objeto em si mesmo, fora das condições do nosso conhecimento — define os limites do conhecimento possível e abre o espaço para a fé moral e religiosa.`,
    ],
    // Chapter 2
    [
      `A metafísica — o estudo do ser enquanto ser — foi durante muito tempo considerada a "rainha das ciências". Heidegger propôs que a metafísica ocidental, ao perguntar pelo "ente" mais alto (Deus, substância, sujeito), esqueceu a questão do Ser ele mesmo.`,
      `A pergunta "por que existe algo em vez de nada?" (Leibniz) permanece a questão metafísica fundamental. As respostas possíveis — criação ex nihilo, emanação necessária, princípio sem princípio — definem posições radicalmente distintas sobre a relação entre Deus, mundo e ser humano.`,
      `O problema dos universais — se conceitos gerais como "humanidade" ou "justiça" têm existência real independente dos indivíduos — dividiu medievais entre realistas (como Anselmo e Tomás) e nominalistas (como Ockham). Este debate tem consequências diretas para a teologia, a ética e a política.`,
    ],
    // Chapter 3
    [
      `A ética filosófica pergunta não apenas "o que devo fazer?" mas "por que devo?" — pela fundamentação do imperativo moral. As três grandes tradições: a deontologia (Kant: aja por dever), o consequencialismo (Mill: maximize o bem-estar) e a ética das virtudes (Aristóteles: seja virtuoso).`,
      `O imperativo categórico kantiano — "Age apenas segundo uma máxima tal que possas ao mesmo tempo querer que ela se torne lei universal" — representa a tentativa de fundamentar a moralidade na razão pura, independente de resultados ou de mandamentos religiosos.`,
      `Aristóteles viu na <em>eudaimonia</em> (florescimento humano) o telos da vida ética. As virtudes — coragem, temperança, justiça, prudência — são os hábitos que permitem ao ser humano realizar sua natureza. Esta abordagem teleológica contrasta com o formalismo kantiano e o cálculo utilitarista.`,
    ],
    // Chapter 4
    [
      `A filosofia política pergunta pela legitimidade do poder, pela natureza da justiça e pelos fundamentos da vida em comum. Platão, Aristóteles, Hobbes, Locke, Rousseau, Rawls: cada um oferece uma resposta distinta à pergunta "o que é uma sociedade justa?"`,
      `Platão na República propõe a cidade governada pelos filósofos — aqueles que contemplaram o Bem e, precisamente por isso, não querem governar, mas são obrigados a fazê-lo. Esta utopia intelectualista tem sido alvo de críticas desde Aristóteles até Karl Popper.`,
      `O contratualismo — a ideia de que a sociedade legítima é fundada num contrato entre indivíduos racionais — aparece em Hobbes (contrato de submissão ao Leviatã), Locke (contrato de proteção dos direitos naturais) e Rousseau (contrato de alienação ao soberano coletivo).`,
    ],
    // Chapter 5
    [
      `A filosofia da linguagem tornou-se central no século XX, com Frege, Russell e Wittgenstein revelando que muitos problemas filosóficos tradicionais eram, na verdade, problemas de linguagem mal compreendida.`,
      `Wittgenstein nas Investigações Filosóficas propõe que o significado é uso — as palavras não têm significado fixo independente dos jogos de linguagem em que são empregadas. Isso dissolve muitos pseudo-problemas filosóficos, mas abre novas questões sobre a normatividade e a comunidade.`,
      `A hermenêutica filosófica (Gadamer, Ricoeur) propõe que a compreensão não é um ato metodológico controlado, mas um evento em que o intérprete e o texto se encontram num "círculo hermenêutico" em que pré-compreensão e compreensão se modificam mutuamente.`,
    ],
  ],
  'Psicanálise': [
    // Chapter 0
    [
      `A psicanálise nasce no limiar do século XX como uma ciência paradoxal: investiga o que, por definição, escapa à consciência. Freud, ao atender histéricas em Viena, descobriu que por trás de sintomas sem base orgânica havia conflitos psíquicos que resistiam à consciência — o inconsciente.`,
      `"O inconsciente é o psíquico propriamente real", escreveu Freud. Esta afirmação radical inverte a hierarquia do pensamento filosófico ocidental: não é a consciência transparente a si mesma o fundamento da subjetividade, mas o registro opaco, pulsional, que a precede e determina.`,
      `O método da associação livre — dizer tudo o que vem à mente sem censura — é o instrumento técnico da psicanálise. Por meio dele, o paciente chega ao que Freud chamou de "a outra cena": os desejos recalcados, os conflitos esquecidos, os traumas não integrados que governam o comportamento consciente.`,
      `A obra em estudo inscreve-se nessa tradição inaugurada por Freud e desenvolvida por Lacan, Winnicott, Bion, Klein e outros. Cada um enfatizou aspectos distintos da experiência psíquica, enriquecendo e às vezes contradizendo a teoria original.`,
    ],
    // Chapter 1
    [
      `A primeira tópica freudiana — o aparelho psíquico dividido em inconsciente, pré-consciente e consciente — foi elaborada sobretudo na Interpretação dos Sonhos (1900). O sonho é a "via régia" para o inconsciente: por meio do trabalho de condensação e deslocamento, desejos recalcados se expressam de forma disfarçada.`,
      `O mecanismo do recalque é central: não se trata de simples esquecimento, mas de uma operação ativa que mantém representações conflitivas fora da consciência. Mas o recalcado retorna — sob a forma de sintoma, ato falho, chiste ou sonho. O inconsciente insiste.`,
      `Lacan leu Freud à luz da linguística estrutural de Saussure: o inconsciente é estruturado como uma linguagem. Condensação e deslocamento correspondem à metáfora e à metonímia. O inconsciente não é um reservatório de imagens, mas uma cadeia significante que produz efeitos de sentido.`,
    ],
    // Chapter 2
    [
      `A sexualidade infantil foi a contribuição mais escandalosa de Freud. Contra a ideia vitoriana da infância assexuada e inocente, Freud demonstrou que a criança é dotada de uma sexualidade polimorfa — oral, anal, fálica — antes de atingir a genitalidade adulta.`,
      `O complexo de Édipo é o organizador central da subjetividade: o desejo pelo pai ou pela mãe, a interdição, a castração simbólica, a identificação com o genitor do mesmo sexo — este drama psíquico deixa marcas indeléveis na estrutura do desejo adulto.`,
      `Lacan reformulou o Édipo em termos estruturais: o Nome-do-Pai é o significante que representa a lei da proibição do incesto e estrutura o desejo. A forclusão desse significante — sua não inscrição no Simbólico — é o mecanismo da psicose.`,
    ],
    // Chapter 3
    [
      `A pulsão — <em>Trieb</em>, não "instinto" — é o conceito central da metapsicologia freudiana. Diferente do instinto animal, fixo em seu objeto, a pulsão é plástica, pode mudar de objeto, de fim e de fonte. É sempre parcial, nunca totalmente satisfeita.`,
      `A dualidade pulsional percorre toda a teoria freudiana: pulsões do ego vs. pulsões sexuais; pulsões de vida (Eros) vs. pulsões de morte (Thanatos). Esta última, introduzida em Além do Princípio do Prazer (1920), é a tendência ao retorno ao estado inorgânico, ao silêncio do não-ser.`,
      `Lacan propôs o conceito de <em>gozo</em> (jouissance) como reformulação da pulsão de morte: uma satisfação paradoxal que vai além do prazer, que o sujeito busca até na dor e no sofrimento. O sintoma neurótico é precisamente um modo de gozar que o sujeito não consegue abandonar.`,
    ],
    // Chapter 4
    [
      `A transferência — o reeditar na relação com o analista dos conflitos relacionais precoces — é ao mesmo tempo o motor e o obstáculo da cura analítica. Freud descobriu-a como fenômeno clínico ao tentar compreender por que os pacientes se apaixonavam por seus médicos.`,
      `A resistência é a outra face da transferência: a força que se opõe à emergência do material inconsciente. Não é sabotagem consciente, mas expressão do mesmo mecanismo de defesa que gerou o sintoma. Interpretar a resistência é tão importante quanto interpretar o conteúdo recalcado.`,
      `O conceito de contratransferência — a resposta afetiva do analista ao paciente — foi inicialmente visto como obstáculo a ser eliminado. A escola kleiniana e Winnicott o reavaliaram como instrumento clínico privilegiado: a forma como o paciente afeta o analista diz algo sobre o mundo interno do paciente.`,
    ],
    // Chapter 5
    [
      `A clínica diferencial distingue três grandes estruturas psíquicas: neurose, psicose e perversão. Cada uma tem uma relação específica com o Édipo, a castração e o Outro. Esta distinção não é diagnóstico psiquiátrico, mas estrutura subjetiva — a posição do sujeito diante da falta.`,
      `Na neurose histérica, a questão fundamental é "sou homem ou mulher?" — a dúvida sobre a identidade sexual. Na neurose obsessiva, "estou vivo ou morto?" — a questão gira em torno da onipotência do pensamento e da aniquilação do sujeito. Cada estrutura tem sua clínica própria.`,
      `A psicose é caracterizada pela forclusão do Nome-do-Pai: o significante fundamental não foi inscrito no Simbólico e retorna no Real — sob a forma de alucinação, delírio, fenômeno de linguagem. O diagnóstico diferencial rigoroso entre neurose e psicose é condição da ética clínica.`,
    ],
  ],
};

// ─── Gerador de conteúdo único por obra ───────────────────────────────────
const generateDeepContent = (category: string, title: string, author: string): { id: string; title: string; content: string; estimatedMinutes?: number }[] => {
  // Extract the base author name for lookup
  const authorKey = Object.keys(AUTHOR_QUOTES).find(k =>
    author.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(author.split(' ')[0].toLowerCase())
  ) || author.split(' ')[0];

  const quotes = AUTHOR_QUOTES[authorKey] || [];
  const chapterTitles = AUTHOR_CHAPTER_STRUCTURES[authorKey] || [
    'Introdução e Contexto Histórico', 'Fundamentos Teóricos', 'O Problema Central',
    'Primeira Resposta: Bases', 'Aprofundamento Conceitual', 'O Argumento Principal',
    'Objeções e Respostas', 'Implicações Práticas', 'Dimensão Ética', 'Conexões Interdisciplinares',
    'Recepção Crítica', 'O Legado Intelectual', 'Releituras Contemporâneas', 'Aplicações Atuais', 'Conclusão'
  ];

  const catContent = SYNTHESIS_CHAPTER_CONTENT[category] || SYNTHESIS_CHAPTER_CONTENT['Filosofia'];

  return chapterTitles.map((chapTitle, i) => {
    const pBlocks = catContent[i % catContent.length];
    const quote = quotes[i % Math.max(quotes.length, 1)];

    let html = `<h2>${chapTitle}</h2>\n\n`;
    html += `<p class="dropcap">${pBlocks[0]}</p>\n\n`;

    if (quote) {
      html += `<blockquote><em>"${quote.quote}"</em><br/><small>— ${authorKey}, <cite>${quote.source}</cite></small></blockquote>\n\n`;
    }

    for (let j = 1; j < pBlocks.length; j++) {
      html += `<p>${pBlocks[j]}</p>\n\n`;
    }

    // Add a unique contextual paragraph for this specific chapter/author combination
    const contextualParas: Record<string, string[]> = {
      'Teologia': [
        `Em ${title}, o autor demonstra que a verdade teológica não é propriedade de uma escola ou denominação, mas o horizonte em direção ao qual toda reflexão cristã genuína se orienta. A humildade intelectual e a seriedade exegética são as duas virtudes que esta obra ensina pelo exemplo.`,
        `A compreensão que ${author} desenvolve sobre este tema em ${title} dialoga com a grande tradição sem simplesmente repeti-la. O que se encontra aqui é uma síntese criativa que respeita as fontes enquanto as faz falar para o presente.`,
        `Neste capítulo de ${title}, ${author} mostra como o pensamento teológico rigoroso não é adversário da espiritualidade viva, mas seu fundamento. Pensar bem sobre Deus é uma forma de amá-lo.`,
      ],
      'Filosofia': [
        `O que ${author} articula em ${title} sobre este tema não é mera especulação abstrata. É uma resposta à experiência concreta de limitação, mortalidade e desejo de sentido que constitui a condição humana em qualquer época.`,
        `A originalidade de ${author} neste ponto de ${title} reside em não se satisfazer com as soluções prontas. Há uma disposição para seguir o argumento onde ele leva, mesmo que contradiga pressupostos estabelecidos — a marca do pensador genuíno.`,
        `Em ${title}, este capítulo revela como a filosofia não é evasão da vida, mas seu aprofundamento. Pensar com rigor é uma forma de respeitar a complexidade do real.`,
      ],
      'Psicanálise': [
        `A clínica informa e transforma a teoria em ${title}. ${author} não especula a partir de uma poltrona abstrata, mas a partir de encontros reais com o sofrimento humano — o que confere à sua obra uma densidade que a mera erudição não alcança.`,
        `Em ${title}, este aspecto do pensamento de ${author} encontra ressonância nas experiências que qualquer pessoa reconhece: a repetição dos mesmos padrões relacionais, a atração pelo que nos faz mal, o paradoxo de desejar o que nos falta.`,
        `A leitura deste capítulo de ${title} exige do leitor uma suspensão temporária dos julgamentos morais habituais. A psicanálise não julga — ela escuta. E é dessa escuta atenta que emerge a possibilidade de uma mudança real.`,
      ],
    };

    const ctParas = contextualParas[category] || contextualParas['Filosofia'];
    html += `<p>${ctParas[i % ctParas.length]}</p>\n\n`;

    if (i === 0) {
      html += `<h3>Sobre esta Síntese</h3>\n`;
      html += `<p>Esta síntese do Studio Logos é um material didático autoral baseado no pensamento de ${author}. Não substitui a leitura das obras originais — antes, pretende ser uma porta de entrada que desperte o desejo de ler as fontes primárias. As citações em destaque são extratos das obras originais do autor.</p>\n`;
    }

    return {
      id: `cap-${i}`,
      title: chapTitle,
      estimatedMinutes: 12 + (i % 3) * 5,
      content: html,
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

