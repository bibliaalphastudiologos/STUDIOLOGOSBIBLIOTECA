import { Grade, ScheduleSlot, Unit } from './types';

const grammarCore = `
## Gramática em uso
A língua portuguesa deve ser estudada como sistema e como prática social. Em cada aula, a regra aparece ligada a uma situação real de leitura, escrita, oralidade ou análise linguística.

### Conceitos essenciais
- **Forma:** classe gramatical, flexão, estrutura do período e pontuação.
- **Sentido:** efeito produzido pela escolha das palavras, pela ordem dos termos e pela relação entre ideias.
- **Uso:** adequação ao gênero, ao interlocutor, à finalidade comunicativa e ao grau de formalidade.

### Método de leitura
1. Observe o gênero textual e sua finalidade.
2. Localize informações explícitas e inferências.
3. Identifique marcas linguísticas que sustentam humor, crítica, opinião ou argumentação.
4. Relacione o texto ao contexto de circulação.

### Método de escrita
Planeje antes de escrever: tema, tese ou objetivo, público, repertório, organização dos parágrafos, conectivos e revisão final. A reescrita é parte do processo, não apenas correção de erro.
`;

const aula = (topic: string, focus: string, practice: string) => `
${grammarCore}

## Aula-guia: ${topic}
${focus}

### Roteiro para o professor
- Ativação: recupere conhecimentos prévios com uma pergunta-problema.
- Exposição curta: apresente o conceito em até 12 minutos.
- Leitura orientada: modele uma análise no quadro.
- Oficina: faça os alunos aplicarem a regra em frases, parágrafos e textos reais.
- Fechamento: registre uma síntese com exemplo correto e contraexemplo.

### Aplicação prática
${practice}

### Avaliação formativa
Use respostas orais, miniquestionários, rubricas de produção textual e revisão entre pares. O objetivo é verificar se o estudante transfere o conceito para uma nova situação de leitura ou escrita.
`;

const exercises = (prefix: string, skill: string) => [
  {
    id: `${prefix}-e1`,
    question: 'Qual procedimento ajuda mais a interpretar um texto antes de responder às questões?',
    options: ['Ler apenas o título', 'Identificar gênero, finalidade e pistas linguísticas', 'Copiar o primeiro parágrafo', 'Ignorar o contexto'],
    correctOption: 1,
    explanation: 'A interpretação começa pela situação comunicativa: gênero, finalidade, interlocutor e marcas do texto.',
    difficulty: 'Básico' as const,
    skill,
    examStyle: 'SARESP' as const
  },
  {
    id: `${prefix}-e2`,
    question: 'Em uma produção textual, por que a revisão deve acontecer depois do rascunho?',
    options: ['Porque substitui o planejamento', 'Porque permite ajustar sentido, coesão, pontuação e norma-padrão', 'Porque elimina a necessidade de leitura', 'Porque serve apenas para trocar a letra'],
    correctOption: 1,
    explanation: 'A revisão melhora conteúdo e forma: coerência, coesão, escolha lexical, pontuação e adequação à proposta.',
    difficulty: 'Intermediário' as const,
    skill,
    examStyle: 'AAP' as const
  },
  {
    id: `${prefix}-e3`,
    question: 'Ao comparar duas alternativas em uma prova de leitura, qual delas costuma indicar uma resposta mais consistente?',
    options: ['A que repete uma palavra do texto sem explicar o sentido', 'A que se apoia em evidência textual e no comando da questão', 'A que apresenta opinião pessoal do leitor', 'A que ignora o gênero textual'],
    correctOption: 1,
    explanation: 'Itens de avaliação exigem leitura do comando e retorno ao texto; a alternativa correta costuma ser sustentada por pista textual clara.',
    difficulty: 'Intermediário' as const,
    skill,
    examStyle: 'SAEB' as const
  },
  {
    id: `${prefix}-e4`,
    question: 'Em uma questão argumentativa, que elemento torna uma resposta mais forte?',
    options: ['Generalização sem exemplo', 'Citação de uma fonte sem relação com o tema', 'Tese clara apoiada por evidência e explicação', 'Uso de muitas palavras difíceis'],
    correctOption: 2,
    explanation: 'A argumentação forte apresenta posição, dado ou repertório pertinente e explicação que liga a evidência à tese.',
    difficulty: 'Avançado' as const,
    skill,
    examStyle: 'ENEM' as const
  },
  {
    id: `${prefix}-e5`,
    question: 'Depois de errar uma questão no simulado, qual procedimento transforma o erro em aprendizagem?',
    options: ['Apagar a resposta e seguir sem analisar', 'Classificar a causa do erro e reescrever a justificativa correta', 'Memorizar apenas a letra correta', 'Evitar novas questões do mesmo tipo'],
    correctOption: 1,
    explanation: 'O diário de erro ajuda o estudante a reconhecer padrão de dificuldade, habilidade envolvida e estratégia de correção.',
    difficulty: 'Avançado' as const,
    skill,
    examStyle: 'Provão Paulista' as const
  }
];

const gradeMethod: Record<Grade, string[]> = {
  [Grade.EF6]: ['Leitura guiada com textos curtos e multimodais.', 'Rotina de vocabulário, inferência e reescrita.', 'Jogos rápidos para fixação gramatical sem perder o sentido do texto.'],
  [Grade.EF7]: ['Investigação de mídia, oralidade planejada e produção colaborativa.', 'Ênfase em coesão, verbos, argumentação inicial e combate à desinformação.', 'Debates curtos com critérios de escuta, evidência e respeito.'],
  [Grade.EM2]: ['Leitura crítica, repertório sociocultural e escrita argumentativa progressiva.', 'Análise de textos literários, midiáticos e acadêmicos em diálogo.', 'Produção com rubricas alinhadas a avaliações externas.'],
  [Grade.EM3]: ['Treino intensivo de redação, leitura estratégica e gestão de prova.', 'Banco de repertórios, modelos de parágrafo e simulados por habilidade.', 'Devolutiva por competência ENEM e plano de melhoria individual.'],
};

const enrichUnit = (unit: Unit): Unit => ({
  ...unit,
  curiosity: unit.curiosity ?? 'Curiosidade: escolhas de pontuação, vocabulário e imagem mudam a forma como o leitor interpreta a intenção do autor.',
  everydayPortuguese: unit.everydayPortuguese ?? 'Português no cotidiano: observe mensagens, notícias, memes e avisos da escola para identificar o mesmo conceito em circulação real.',
  teacherInstructions: unit.teacherInstructions ?? [
    'Comece pela situação-problema e registre no quadro a habilidade da aula.',
    'Modele uma resolução antes da prática independente.',
    'Use o gabarito comentado para discutir raciocínio, não apenas a letra correta.',
    'Finalize com autoavaliação de 1 minuto: entendi, preciso revisar ou consigo ensinar a alguém.'
  ],
  assessmentItems: unit.assessmentItems ?? ['SARESP', 'AAP', 'SAEB', unit.grade === Grade.EM2 || unit.grade === Grade.EM3 ? 'ENEM' : 'Provão Paulista'],
  visualSummary: unit.visualSummary ?? [
    'Conceito central',
    'Pistas no texto',
    'Estratégia de resposta',
    'Aplicação na escrita'
  ],
  mentalMap: unit.mentalMap ?? [
    unit.title.split('|')[1]?.trim() || unit.title,
    ...unit.objectives.slice(0, 3),
    'Avaliação por habilidade'
  ],
});

export const ALIGNMENT_REFERENCES = [
  {
    label: 'BNCC - Ensino Fundamental',
    description: 'Práticas de linguagem, campos de atuação, habilidades de Língua Portuguesa e competências gerais.',
    url: 'https://basenacionalcomum.mec.gov.br/images/BNCC_EI_EF_110518_versaofinal_site.pdf',
  },
  {
    label: 'BNCC - Ensino Médio',
    description: 'Área de Linguagens e suas Tecnologias, competências específicas e habilidades de Língua Portuguesa.',
    url: 'https://www.gov.br/mec/pt-br/cne/bncc_ensino_medio.pdf',
  },
  {
    label: 'Currículo Paulista',
    description: 'Documento curricular oficial do Estado de São Paulo para Ensino Fundamental e Ensino Médio.',
    url: 'https://efape.educacao.sp.gov.br/curriculopaulista/',
  },
  {
    label: 'Matriz SAEB/Inep',
    description: 'Matrizes de referência de Língua Portuguesa e Linguagens alinhadas à BNCC.',
    url: 'https://www.gov.br/inep/pt-br/centrais-de-conteudo/acervo-linha-editorial/publicacoes-institucionais/avaliacoes-e-exames-da-educacao-basica/matrizes-de-referencia-de-lingua-portuguesa-e-linguagens-alinhadas-a-bncc',
  },
];

export const METHOD_BY_GRADE = gradeMethod;

export const SCHEDULE: ScheduleSlot[] = [
  { day: 'Segunda-feira', period: 'Tarde', time: '13h00', type: 'Aula', activity: 'Português - 6º ano B', grade: Grade.EF6 },
  { day: 'Segunda-feira', period: 'Tarde', time: '13h50', type: 'Aula', activity: 'Português - 7º ano C', grade: Grade.EF7 },
  { day: 'Segunda-feira', period: 'Tarde', time: '15h00', type: 'Aula', activity: 'Português - 7º ano D', grade: Grade.EF7 },
  { day: 'Segunda-feira', period: 'Tarde', time: '15h50', type: 'Aula', activity: 'Português - 7º ano A', grade: Grade.EF7 },
  { day: 'Segunda-feira', period: 'Tarde', time: '16h40', type: 'Aula', activity: 'Português - 6º ano C', grade: Grade.EF6 },
  { day: 'Segunda-feira', period: 'Tarde', time: '17h30', type: 'Aula', activity: 'Português - 7º ano B', grade: Grade.EF7 },
  { day: 'Segunda-feira', period: 'Noite', time: '19h45', type: 'Aula', activity: 'RL - 2ª série D', grade: Grade.EM2 },
  { day: 'Segunda-feira', period: 'Noite', time: '20h30', type: 'Aula', activity: 'RL - 2ª série D', grade: Grade.EM2 },
  { day: 'Segunda-feira', period: 'Noite', time: '21h30', type: 'Aula', activity: 'RL - 2ª série B', grade: Grade.EM2 },
  { day: 'Segunda-feira', period: 'Noite', time: '22h15', type: 'Aula', activity: 'RL - 2ª série B', grade: Grade.EM2 },
  { day: 'Terça-feira', period: 'ATPC', time: '10h50 - 12h30', type: 'ATPC', activity: 'ATPC - Anos Finais' },
  { day: 'Terça-feira', period: 'Tarde', time: '13h00', type: 'Aula', activity: 'Português - 7º ano D', grade: Grade.EF7 },
  { day: 'Terça-feira', period: 'Tarde', time: '13h50', type: 'Aula', activity: 'Português - 7º ano D', grade: Grade.EF7 },
  { day: 'Terça-feira', period: 'Tarde', time: '15h50', type: 'Aula', activity: 'Português - 7º ano C', grade: Grade.EF7 },
  { day: 'Terça-feira', period: 'Tarde', time: '16h40', type: 'Aula', activity: 'Português - 7º ano B', grade: Grade.EF7 },
  { day: 'Terça-feira', period: 'ATPC', time: '16h50 - 18h30', type: 'ATPC', activity: 'ATPC - Ensino Médio' },
  { day: 'Terça-feira', period: 'Tarde', time: '17h30', type: 'Aula', activity: 'Português - 7º ano A', grade: Grade.EF7 },
  { day: 'Quarta-feira', period: 'ATPC', time: '10h50 - 12h30', type: 'ATPC', activity: 'ATPC - Anos Finais' },
  { day: 'Quarta-feira', period: 'Tarde', time: '13h00', type: 'Aula', activity: 'Português - 6º ano D', grade: Grade.EF6 },
  { day: 'Quarta-feira', period: 'Tarde', time: '13h50', type: 'Aula', activity: 'Português - 7º ano B', grade: Grade.EF7 },
  { day: 'Quarta-feira', period: 'Tarde', time: '15h00', type: 'Aula', activity: 'Português - 7º ano A', grade: Grade.EF7 },
  { day: 'Quarta-feira', period: 'Tarde', time: '15h50', type: 'Aula', activity: 'Português - 6º ano B', grade: Grade.EF6 },
  { day: 'Quarta-feira', period: 'Tarde', time: '16h40', type: 'Aula', activity: 'Português - 6º ano B', grade: Grade.EF6 },
  { day: 'Quarta-feira', period: 'ATPC', time: '16h50 - 18h30', type: 'ATPC', activity: 'ATPC - Ensino Médio' },
  { day: 'Quarta-feira', period: 'Tarde', time: '17h30', type: 'Aula', activity: 'Português - 6º ano C', grade: Grade.EF6 },
  { day: 'Quarta-feira', period: 'Noite', time: '19h45', type: 'Aula', activity: 'Orientação de Estudos de Português - 3ª série E', grade: Grade.EM3 },
  { day: 'Quarta-feira', period: 'Noite', time: '20h30', type: 'Aula', activity: 'Orientação de Estudos de Português - 3ª série E', grade: Grade.EM3 },
  { day: 'Quarta-feira', period: 'Noite', time: '21h30', type: 'Aula', activity: 'Orientação de Estudos de Português - 3ª série D', grade: Grade.EM3 },
  { day: 'Quarta-feira', period: 'Noite', time: '22h15', type: 'Aula', activity: 'Orientação de Estudos de Português - 3ª série D', grade: Grade.EM3 },
  { day: 'Quinta-feira', period: 'ATPC', time: '11h40 - 12h30', type: 'ATPC', activity: 'ATPC - Anos Finais' },
  { day: 'Quinta-feira', period: 'Tarde', time: '13h00', type: 'Aula', activity: 'Português - 7º ano C', grade: Grade.EF7 },
  { day: 'Quinta-feira', period: 'Tarde', time: '13h50', type: 'Aula', activity: 'Português - 7º ano C', grade: Grade.EF7 },
  { day: 'Quinta-feira', period: 'Tarde', time: '15h00', type: 'Aula', activity: 'Português - 6º ano B', grade: Grade.EF6 },
  { day: 'Quinta-feira', period: 'Tarde', time: '15h50', type: 'Aula', activity: 'Português - 7º ano B', grade: Grade.EF7 },
  { day: 'Quinta-feira', period: 'Tarde', time: '16h40', type: 'Aula', activity: 'Português - 6º ano C', grade: Grade.EF6 },
  { day: 'Quinta-feira', period: 'Tarde', time: '17h30', type: 'Aula', activity: 'Português - 6º ano D', grade: Grade.EF6 },
  { day: 'Quinta-feira', period: 'ATPC', time: '17h40 - 18h30', type: 'ATPC', activity: 'ATPC - Ensino Médio' },
  { day: 'Sexta-feira', period: 'Tarde', time: '13h00', type: 'Aula', activity: 'Português - 7º ano A', grade: Grade.EF7 },
  { day: 'Sexta-feira', period: 'Tarde', time: '13h50', type: 'Aula', activity: 'Português - 7º ano D', grade: Grade.EF7 },
  { day: 'Sexta-feira', period: 'Tarde', time: '15h00', type: 'Aula', activity: 'Português - 6º ano C', grade: Grade.EF6 },
  { day: 'Sexta-feira', period: 'Tarde', time: '15h50', type: 'Aula', activity: 'Português - 6º ano D', grade: Grade.EF6 },
  { day: 'Sexta-feira', period: 'Tarde', time: '16h40', type: 'Aula', activity: 'Português - 6º ano D', grade: Grade.EF6 },
];

const RAW_UNITS: Unit[] = [
  {
    id: 'ef6-b1-generos-multimodais',
    grade: Grade.EF6,
    bimester: 1,
    title: 'Unidade 1 | Tirinhas, Memes e Linguagem Multimodal',
    skills: ['EF69LP05', 'EF06LP01'],
    competencies: ['Multiletramentos', 'Leitura crítica', 'Inferência'],
    objectives: ['Reconhecer linguagem verbal e não verbal', 'Inferir humor', 'Produzir tirinha autoral'],
    content: aula('Tirinhas e memes', 'O humor nasce da quebra de expectativa, da relação entre imagem e palavra, da ironia e do conhecimento de mundo compartilhado.', 'Compare uma tirinha, um meme e uma campanha educativa. Peça que a turma identifique o que cada texto espera do leitor.'),
    examples: ['Tirinhas da Mafalda', 'Memes escolares', 'Campanhas de saúde pública'],
    exercises: exercises('ef6-b1-u1', 'EF69LP05'),
    dynamic: 'Galeria de memes comentados com justificativa linguística.',
    textProduction: 'Criação de tirinha com conflito, desfecho e legenda revisada.'
  },
  {
    id: 'ef6-b1-classes-palavras',
    grade: Grade.EF6,
    bimester: 1,
    title: 'Unidade 2 | Substantivos, Adjetivos e Artigos',
    skills: ['EF06LP04', 'EF06LP12'],
    competencies: ['Análise linguística', 'Vocabulário', 'Descrição'],
    objectives: ['Classificar substantivos', 'Usar adjetivos com precisão', 'Aplicar concordância nominal'],
    content: aula('Classes nominais', 'Substantivos nomeiam seres, ideias, sentimentos e lugares; adjetivos caracterizam; artigos delimitam e ajudam a construir referência.', 'Transforme uma descrição fraca em uma descrição expressiva, controlando adjetivos e evitando excesso.'),
    examples: ['Lendas brasileiras', 'Descrições de personagens', 'Verbete enciclopédico'],
    exercises: exercises('ef6-b1-u2', 'EF06LP04'),
    dynamic: 'Bingo da concordância nominal.',
    textProduction: 'Retrato escrito de personagem de lenda brasileira.'
  },
  {
    id: 'ef6-b2-narrativa',
    grade: Grade.EF6,
    bimester: 2,
    title: 'Unidade 3 | Conto, Narrador e Tempo Verbal',
    skills: ['EF67LP30', 'EF06LP05'],
    competencies: ['Narrativa', 'Verbos', 'Sequência temporal'],
    objectives: ['Distinguir narrador-personagem e observador', 'Usar pretéritos', 'Organizar conflito e clímax'],
    content: aula('Estrutura narrativa', 'Contos articulam situação inicial, conflito, desenvolvimento, clímax e desfecho. Os verbos localizam ações no tempo e constroem ritmo.', 'Leia um conto curto e monte uma linha do tempo dos acontecimentos. Depois, reescreva uma cena mudando o foco narrativo.'),
    examples: ['Contos populares', 'Lendas urbanas', 'Narrativas de aventura'],
    exercises: exercises('ef6-b2-u3', 'EF67LP30'),
    dynamic: 'Mapa do conflito em grupos.',
    textProduction: 'Conto breve com foco narrativo definido.'
  },
  {
    id: 'ef6-b2-pontuacao',
    grade: Grade.EF6,
    bimester: 2,
    title: 'Unidade 4 | Pontuação e Discurso Direto',
    skills: ['EF06LP10', 'EF67LP33'],
    competencies: ['Pontuação', 'Oralidade representada', 'Revisão'],
    objectives: ['Usar travessão e dois-pontos', 'Marcar falas', 'Revisar diálogos'],
    content: aula('Pontuação expressiva', 'Pontuação não é enfeite: organiza pausas, hierarquiza ideias, marca falas e evita ambiguidade.', 'Entregue um diálogo sem pontuação para a turma reconstruir. Depois compare versões e discuta mudança de sentido.'),
    examples: ['Entrevistas', 'Contos com diálogo', 'Roteiros curtos'],
    exercises: exercises('ef6-b2-u4', 'EF06LP10'),
    dynamic: 'Teatro de leitura com marcação de pausas.',
    textProduction: 'Diálogo narrativo com rubricas e pontuação correta.'
  },
  {
    id: 'ef6-b3-noticia',
    grade: Grade.EF6,
    bimester: 3,
    title: 'Unidade 5 | Notícia, Manchete e Informação',
    skills: ['EF67LP01', 'EF69LP03'],
    competencies: ['Jornalismo', 'Fato e opinião', 'Leitura de mídia'],
    objectives: ['Reconhecer lide', 'Diferenciar fato e opinião', 'Escrever notícia escolar'],
    content: aula('Notícia e objetividade', 'A notícia informa fatos de interesse público. O lide responde perguntas centrais: o quê, quem, quando, onde, como e por quê.', 'Compare duas manchetes sobre o mesmo fato e observe escolhas lexicais que alteram enfoque.'),
    examples: ['Jornais locais', 'Portal G1 Educação', 'Jornal da escola'],
    exercises: exercises('ef6-b3-u5', 'EF67LP01'),
    dynamic: 'Redação-relâmpago de lide.',
    textProduction: 'Notícia sobre evento da escola.'
  },
  {
    id: 'ef6-b4-revisao-gramatical',
    grade: Grade.EF6,
    bimester: 4,
    title: 'Unidade 6 | Revisão Geral: Coesão, Ortografia e Concordância',
    skills: ['EF06LP11', 'EF69LP56'],
    competencies: ['Revisão textual', 'Ortografia', 'Coesão'],
    objectives: ['Revisar texto próprio', 'Usar conectivos simples', 'Corrigir desvios recorrentes'],
    content: aula('Revisão como autoria', 'Revisar é reler com propósito: cortar repetições, esclarecer ideias, corrigir ortografia e melhorar a ligação entre frases.', 'Use uma lista de verificação: começo claro, sequência lógica, conectivos, pontuação, concordância e ortografia.'),
    examples: ['Bilhetes', 'Relatos pessoais', 'Parágrafos revisados'],
    exercises: exercises('ef6-b4-u6', 'EF69LP56'),
    dynamic: 'Mutirão de revisão por pares.',
    textProduction: 'Portfólio com versão inicial e versão revisada.'
  },
  {
    id: 'ef7-b1-fake-news',
    grade: Grade.EF7,
    bimester: 1,
    title: 'Unidade 7 | Fake News e Checagem de Fatos',
    skills: ['EF67LP01', 'EF67LP02'],
    competencies: ['Cultura digital', 'Argumentação', 'Curadoria'],
    objectives: ['Verificar fonte', 'Reconhecer manipulação', 'Produzir guia de checagem'],
    content: aula('Informação confiável', 'Fake news exploram emoção, urgência, autoridade falsa e ausência de fonte. A leitura crítica exige verificação antes do compartilhamento.', 'Faça uma investigação guiada: título, autor, data, fonte, evidências, imagens e comparação com veículos confiáveis.'),
    examples: ['Agência Lupa', 'Aos Fatos', 'Boatos.org'],
    exercises: exercises('ef7-b1-u7', 'EF67LP02'),
    dynamic: 'Tribunal da notícia duvidosa.',
    textProduction: 'Guia de checagem para a comunidade escolar.'
  },
  {
    id: 'ef7-b1-pronomes',
    grade: Grade.EF7,
    bimester: 1,
    title: 'Unidade 8 | Pronomes, Referência e Coesão',
    skills: ['EF07LP12', 'EF67LP25'],
    competencies: ['Coesão referencial', 'Reescrita', 'Clareza'],
    objectives: ['Evitar repetição', 'Identificar referentes', 'Usar pronomes adequadamente'],
    content: aula('Pronomes no texto', 'Pronomes retomam ou antecipam informações. Quando o referente fica ambíguo, a compreensão do texto se rompe.', 'Reescreva um parágrafo com repetições excessivas usando pronomes e sinônimos sem perder clareza.'),
    examples: ['Reportagens', 'Biografias', 'Textos de divulgação científica'],
    exercises: exercises('ef7-b1-u8', 'EF07LP12'),
    dynamic: 'Caça ao referente.',
    textProduction: 'Biografia curta com coesão referencial.'
  },
  {
    id: 'ef7-b2-verbo',
    grade: Grade.EF7,
    bimester: 2,
    title: 'Unidade 9 | Verbos, Modos e Efeitos de Sentido',
    skills: ['EF07LP04', 'EF67LP37'],
    competencies: ['Verbos', 'Modalização', 'Interpretação'],
    objectives: ['Distinguir indicativo, subjuntivo e imperativo', 'Reconhecer certeza e hipótese', 'Aplicar modos verbais'],
    content: aula('Modos verbais', 'O indicativo apresenta fatos ou certezas; o subjuntivo expressa dúvida, hipótese e desejo; o imperativo orienta pedidos, ordens e instruções.', 'Analise regras de jogo, receitas e campanhas para observar o imperativo em ação.'),
    examples: ['Receitas', 'Manuais', 'Campanhas de conscientização'],
    exercises: exercises('ef7-b2-u9', 'EF07LP04'),
    dynamic: 'Jogo dos modos verbais.',
    textProduction: 'Manual de convivência da turma.'
  },
  {
    id: 'ef7-b2-cronica',
    grade: Grade.EF7,
    bimester: 2,
    title: 'Unidade 10 | Crônica e Observação do Cotidiano',
    skills: ['EF67LP28', 'EF69LP51'],
    competencies: ['Literatura', 'Autoria', 'Estilo'],
    objectives: ['Reconhecer olhar subjetivo', 'Criar cena cotidiana', 'Trabalhar humor e reflexão'],
    content: aula('Crônica', 'A crônica parte de fatos simples do cotidiano para produzir humor, crítica ou reflexão. O estilo do narrador é decisivo.', 'Leia uma crônica brasileira e peça que os estudantes identifiquem detalhe cotidiano, comentário do narrador e efeito final.'),
    examples: ['Luis Fernando Verissimo', 'Rubem Braga', 'Clarice Lispector'],
    exercises: exercises('ef7-b2-u10', 'EF69LP51'),
    dynamic: 'Observatório do recreio.',
    textProduction: 'Crônica sobre uma cena escolar.'
  },
  {
    id: 'ef7-b3-periodo-composto',
    grade: Grade.EF7,
    bimester: 3,
    title: 'Unidade 11 | Período Composto e Conectivos',
    skills: ['EF07LP11', 'EF69LP18'],
    competencies: ['Sintaxe', 'Coesão sequencial', 'Argumentação'],
    objectives: ['Unir orações', 'Usar conectivos', 'Evitar frases truncadas'],
    content: aula('Conectivos', 'Conectivos indicam soma, oposição, causa, consequência, condição e conclusão. Eles orientam o leitor no caminho do raciocínio.', 'Entregue frases soltas e peça que os estudantes as reorganizem em um parágrafo coeso.'),
    examples: ['Artigos de opinião', 'Resenhas', 'Parágrafos argumentativos'],
    exercises: exercises('ef7-b3-u11', 'EF07LP11'),
    dynamic: 'Dominó dos conectivos.',
    textProduction: 'Parágrafo argumentativo com conectivos destacados.'
  },
  {
    id: 'ef7-b4-seminario',
    grade: Grade.EF7,
    bimester: 4,
    title: 'Unidade 12 | Seminário, Roteiro e Oralidade',
    skills: ['EF69LP38', 'EF67LP23'],
    competencies: ['Oralidade', 'Pesquisa', 'Apresentação'],
    objectives: ['Planejar fala pública', 'Selecionar fontes', 'Usar apoio visual'],
    content: aula('Seminário escolar', 'Falar em público exige planejamento: objetivo, organização, exemplos, tempo, postura e escuta da audiência.', 'Monte um roteiro com abertura, três pontos principais, exemplos e fechamento. O slide deve apoiar a fala, não substituir o apresentador.'),
    examples: ['Seminários de literatura', 'Apresentações científicas', 'Feira cultural'],
    exercises: exercises('ef7-b4-u12', 'EF69LP38'),
    dynamic: 'Ensaio com rubrica de oralidade.',
    textProduction: 'Roteiro de apresentação com referências.'
  },
  {
    id: 'em2-b1-argumentacao',
    grade: Grade.EM2,
    bimester: 1,
    title: 'Unidade 13 | Tese, Argumentos e Operadores Argumentativos',
    skills: ['EM13LP01', 'EM13LP05'],
    competencies: ['Pensamento crítico', 'Argumentação', 'Coerência'],
    objectives: ['Formular tese', 'Selecionar argumento', 'Usar operadores'],
    content: aula('Argumentação', 'Argumentar é defender uma posição com razões, evidências e organização lógica. A tese precisa ser clara e sustentável.', 'Compare opinião solta e argumento fundamentado. Depois construa uma tese e dois argumentos para um tema atual.'),
    examples: ['Artigos de opinião', 'Editorial', 'Debate regrado'],
    exercises: exercises('em2-b1-u13', 'EM13LP01'),
    dynamic: 'Batalha de argumentos com direito a réplica.',
    textProduction: 'Artigo de opinião com tese explícita.'
  },
  {
    id: 'em2-b1-literatura-realismo',
    grade: Grade.EM2,
    bimester: 1,
    title: 'Unidade 14 | Realismo, Naturalismo e Crítica Social',
    skills: ['EM13LP48', 'EM13LP52'],
    competencies: ['Literatura brasileira', 'Contexto histórico', 'Análise crítica'],
    objectives: ['Reconhecer traços realistas', 'Relacionar obra e sociedade', 'Analisar narrador'],
    content: aula('Realismo brasileiro', 'O Realismo observa a sociedade com ironia, análise psicológica e crítica às aparências. Machado de Assis é referência central.', 'Leia trecho de romance e identifique ironia, narrador, crítica social e conflito interno.'),
    examples: ['Machado de Assis', 'Aluísio Azevedo', 'O Cortiço'],
    exercises: exercises('em2-b1-u14', 'EM13LP48'),
    dynamic: 'Júri literário de personagens.',
    textProduction: 'Análise crítica de trecho literário.'
  },
  {
    id: 'em2-b2-regencia-crase',
    grade: Grade.EM2,
    bimester: 2,
    title: 'Unidade 15 | Regência, Crase e Norma-Padrão',
    skills: ['EM13LP08', 'EM13LP09'],
    competencies: ['Gramática normativa', 'Revisão', 'Adequação'],
    objectives: ['Identificar termos regidos', 'Usar crase em contextos frequentes', 'Revisar desvios'],
    content: aula('Regência e crase', 'Regência trata da relação entre termos e preposições. Crase ocorre, em geral, quando a preposição "a" encontra artigo feminino "a".', 'Monte uma tabela de casos frequentes: assistir a, chegar a, referir-se a, entregar a, dirigir-se a. Teste a troca por palavra masculina.'),
    examples: ['Redação ENEM', 'Notícias', 'Textos formais'],
    exercises: exercises('em2-b2-u15', 'EM13LP08'),
    dynamic: 'Clínica da crase com placas verdes e vermelhas.',
    textProduction: 'Revisão de parágrafo formal com justificativas.'
  },
  {
    id: 'em2-b2-resenha',
    grade: Grade.EM2,
    bimester: 2,
    title: 'Unidade 16 | Resenha Crítica e Repertório Cultural',
    skills: ['EM13LP30', 'EM13LP45'],
    competencies: ['Leitura crítica', 'Síntese', 'Avaliação'],
    objectives: ['Diferenciar resumo e avaliação', 'Organizar critérios', 'Sustentar opinião'],
    content: aula('Resenha crítica', 'A resenha apresenta uma obra, sintetiza aspectos centrais e avalia com critérios. Não basta dizer se gostou: é preciso justificar.', 'Analise resenhas de livros, filmes ou séries e identifique apresentação, síntese, avaliação e recomendação.'),
    examples: ['Resenhas literárias', 'Crítica de cinema', 'Podcast cultural'],
    exercises: exercises('em2-b2-u16', 'EM13LP30'),
    dynamic: 'Clube de crítica cultural.',
    textProduction: 'Resenha crítica de obra escolhida.'
  },
  {
    id: 'em2-b3-modernismo',
    grade: Grade.EM2,
    bimester: 3,
    title: 'Unidade 17 | Modernismo e Identidade Brasileira',
    skills: ['EM13LP48', 'EM13LP49'],
    competencies: ['Literatura', 'Intertextualidade', 'Identidade'],
    objectives: ['Reconhecer ruptura estética', 'Analisar manifesto', 'Relacionar linguagem e contexto'],
    content: aula('Modernismo', 'O Modernismo valoriza experimentação, oralidade, crítica à cópia europeia e busca de identidade brasileira.', 'Compare um poema parnasiano e um poema modernista. Observe forma, vocabulário, ritmo e projeto cultural.'),
    examples: ['Mário de Andrade', 'Oswald de Andrade', 'Semana de 22'],
    exercises: exercises('em2-b3-u17', 'EM13LP49'),
    dynamic: 'Manifesto da turma.',
    textProduction: 'Poema modernista comentado.'
  },
  {
    id: 'em2-b4-projeto-pesquisa',
    grade: Grade.EM2,
    bimester: 4,
    title: 'Unidade 18 | Projeto de Pesquisa e Divulgação Científica',
    skills: ['EM13LP32', 'EM13LP34'],
    competencies: ['Pesquisa', 'Citação', 'Divulgação científica'],
    objectives: ['Delimitar problema', 'Selecionar fontes', 'Divulgar resultados'],
    content: aula('Pesquisa escolar', 'Pesquisar envolve pergunta, método, fonte confiável, registro, síntese e comunicação clara para um público definido.', 'Construa um miniartigo com pergunta de pesquisa, justificativa, dados coletados, análise e conclusão.'),
    examples: ['Artigos de divulgação', 'Infográficos', 'Seminários científicos'],
    exercises: exercises('em2-b4-u18', 'EM13LP32'),
    dynamic: 'Feira de investigação linguística.',
    textProduction: 'Texto de divulgação científica.'
  },
  {
    id: 'em3-b1-enem-competencias',
    grade: Grade.EM3,
    bimester: 1,
    title: 'Unidade 19 | ENEM: Competências e Projeto de Texto',
    skills: ['EM13LP06', 'EM13LP12'],
    competencies: ['Redação ENEM', 'Planejamento', 'Intervenção'],
    objectives: ['Compreender as 5 competências', 'Planejar tese', 'Construir intervenção completa'],
    content: aula('Redação ENEM', 'A redação exige texto dissertativo-argumentativo, repertório pertinente, coesão e proposta de intervenção com agente, ação, meio, finalidade e detalhamento.', 'Antes de escrever, faça projeto de texto: problema, tese, argumento 1, argumento 2, repertório e intervenção.'),
    examples: ['Cartilha do Participante INEP', 'Redações nota 1000', 'Temas sociais brasileiros'],
    exercises: exercises('em3-b1-u19', 'EM13LP06'),
    dynamic: 'Oficina do parágrafo padrão.',
    textProduction: 'Redação ENEM completa com rubrica.'
  },
  {
    id: 'em3-b1-concordancia',
    grade: Grade.EM3,
    bimester: 1,
    title: 'Unidade 20 | Concordância Verbal e Nominal Avançada',
    skills: ['EM13LP08', 'EM13LP09'],
    competencies: ['Norma-padrão', 'Revisão ENEM', 'Precisão'],
    objectives: ['Resolver casos especiais', 'Evitar marcas de oralidade inadequadas', 'Justificar correções'],
    content: aula('Concordância avançada', 'Concordância é relação entre núcleo e termos associados. Em provas e redações, os casos com sujeito posposto, coletivo, porcentagem e expressões partitivas merecem atenção.', 'Crie um painel de frases problemáticas e peça correção com justificativa gramatical.'),
    examples: ['Redações', 'Editais', 'Textos jornalísticos'],
    exercises: exercises('em3-b1-u20', 'EM13LP08'),
    dynamic: 'Plantão de norma-padrão.',
    textProduction: 'Revisão comentada de introdução e desenvolvimento.'
  },
  {
    id: 'em3-b2-generos-argumentativos',
    grade: Grade.EM3,
    bimester: 2,
    title: 'Unidade 21 | Editorial, Artigo de Opinião e Carta Aberta',
    skills: ['EM13LP15', 'EM13LP23'],
    competencies: ['Gêneros argumentativos', 'Cidadania', 'Voz autoral'],
    objectives: ['Comparar gêneros', 'Adequar linguagem', 'Defender ponto de vista'],
    content: aula('Gêneros argumentativos', 'Editorial representa posição institucional; artigo de opinião assume autoria individual; carta aberta busca interlocutor público e mobilização social.', 'Compare os três gêneros sobre o mesmo tema e observe marcas de autoria, interlocução e finalidade.'),
    examples: ['Editorial de jornal', 'Artigo assinado', 'Manifesto estudantil'],
    exercises: exercises('em3-b2-u21', 'EM13LP15'),
    dynamic: 'Assembleia de pautas públicas.',
    textProduction: 'Carta aberta à comunidade escolar.'
  },
  {
    id: 'em3-b2-literatura-contemporanea',
    grade: Grade.EM3,
    bimester: 2,
    title: 'Unidade 22 | Literatura Contemporânea e Vozes Plurais',
    skills: ['EM13LP49', 'EM13LP52'],
    competencies: ['Literatura contemporânea', 'Diversidade', 'Interpretação'],
    objectives: ['Ler vozes periféricas e indígenas', 'Analisar forma e tema', 'Relacionar literatura e sociedade'],
    content: aula('Vozes contemporâneas', 'A literatura brasileira contemporânea amplia sujeitos, territórios e formas de narrar. A análise deve considerar estética, autoria, circulação e contexto.', 'Organize rodas de leitura com poemas, contos e trechos de romances de diferentes autorias brasileiras.'),
    examples: ['Conceição Evaristo', 'Ailton Krenak', 'Slam e poesia marginal'],
    exercises: exercises('em3-b2-u22', 'EM13LP52'),
    dynamic: 'Sarau crítico.',
    textProduction: 'Comentário literário com recorte temático.'
  },
  {
    id: 'em3-b3-simulados',
    grade: Grade.EM3,
    bimester: 3,
    title: 'Unidade 23 | Simulados, Estratégias de Prova e Gestão do Tempo',
    skills: ['EM13LP02', 'EM13LP03'],
    competencies: ['Avaliação externa', 'Leitura estratégica', 'Autonomia'],
    objectives: ['Resolver itens por habilidade', 'Gerir tempo', 'Analisar erros'],
    content: aula('Estratégia de prova', 'Prova não mede apenas conteúdo; mede leitura de comando, atenção às alternativas e gestão emocional. O erro precisa virar dado de estudo.', 'Após cada simulado, categorize erros: conteúdo, interpretação, distração, tempo ou repertório insuficiente.'),
    examples: ['ENEM', 'Provão Paulista', 'Vestibulares'],
    exercises: exercises('em3-b3-u23', 'EM13LP02'),
    dynamic: 'Laboratório de erros produtivos.',
    textProduction: 'Diário de desempenho com metas semanais.'
  },
  {
    id: 'em3-b4-revisao-final',
    grade: Grade.EM3,
    bimester: 4,
    title: 'Unidade 24 | Revisão Final: Gramática, Literatura e Redação',
    skills: ['REVISÃO', 'EM13LP06'],
    competencies: ['Síntese', 'Revisão final', 'Desempenho'],
    objectives: ['Consolidar conteúdos', 'Revisar repertórios', 'Produzir redação final'],
    content: aula('Síntese final', 'A revisão final deve priorizar recorrência de erros, habilidades de maior peso e conteúdos transferíveis para leitura, gramática e escrita.', 'Monte um plano de sete encontros: leitura, gramática, literatura, repertório, redação, simulado e devolutiva individual.'),
    examples: ['Mapas mentais', 'Quadros de conectivos', 'Rubricas de redação'],
    exercises: exercises('em3-b4-u24', 'EM13LP06'),
    dynamic: 'Semana intensiva de revisão.',
    textProduction: 'Redação final comparada à primeira produção do ano.'
  }
];

export const UNITS: Unit[] = RAW_UNITS.map(enrichUnit);
