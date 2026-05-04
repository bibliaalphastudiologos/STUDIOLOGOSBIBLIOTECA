import { Ebook } from '../types';

// ─── Helper: obra de filosofia de domínio público ─────────────────────────
const pd = (
  id: string, title: string, displayTitle: string, subtitle: string,
  author: string, work: string, year: string, lang: string, deathYear: number,
  subcategory: string, level: 'Iniciante' | 'Intermediário' | 'Avançado',
  readingTime: string, description: string, coverTheme: string,
  chapters: { title: string; content: string; estimatedMinutes?: number }[],
  tags: string[] = [],
): Ebook => ({
  id: `pd-fil-${id}`,
  slug: `filosofia-${id}`,
  title,
  displayTitle,
  subtitle,
  category: 'Filosofia',
  subcategory,
  collection: 'Biblioteca Filosófica',
  brand: 'Domínio Público',
  authorReference: author,
  workReference: work,
  contentType: 'public_domain',
  contentTypeLabel: 'public_domain',
  copyrightStatus: 'public_domain_verified',
  accessMode: 'online_only',
  downloadAllowed: false,
  fullTextAllowed: true,
  publicDomainEvidence: `Obra de ${year}. Autor falecido há mais de 70 anos (${deathYear} d.C.). Domínio público nos termos da Lei 9.610/98.`,
  originalLanguage: lang,
  authorDeathYear: deathYear,
  level,
  readingTime,
  featured: false,
  isNew: false,
  coverTheme,
  description,
  learn: ['Contexto histórico e filosófico', 'Argumentos centrais da obra', 'Influência na tradição filosófica', 'Conexões com debates contemporâneos'],
  recommendedFor: ['Estudantes de filosofia', 'Pesquisadores', 'Leitores autodidatas'],
  editorialNotice: `Texto de domínio público — ${work} (${year}), por ${author.split('(')[0].trim()}. Língua original: ${lang}. Studio Logos não detém direitos sobre o conteúdo.`,
  tags: ['filosofia', 'domínio público', ...tags],
  readerFeatures: { tableOfContents: true, readingProgress: true, fontSizeControl: true, focusMode: true, bookmarks: true, notes: true, highlights: true, internalSearch: true },
  chapters: chapters.map((c, i) => ({ id: `${id}-c${i}`, ...c })),
});

// ══════════════════════════════════════════════════════════════════════════
// GRÉCIA ANTIGA
// ══════════════════════════════════════════════════════════════════════════

export const philosophyPublicDomainWorks: Ebook[] = [

pd('plato-apology', 'Apologia de Sócrates', 'Apologia de Sócrates — Platão', 'O discurso de Sócrates em seu julgamento — a defesa da filosofia diante da morte',
  'Platão (428–347 a.C.)', 'Ἀπολογία Σωκράτους (Apologia Socratis), c. 399 a.C.', 'c. 399 a.C.', 'Grego Antigo', -347,
  'Filosofia Clássica', 'Iniciante', '1–2 horas',
  'A Apologia de Sócrates é o relato platônico do discurso proferido por Sócrates em seu julgamento por impiedade e corrupção da juventude ateniense em 399 a.C. O texto apresenta os fundamentos da filosofia socrática: o exame da vida, a ignorância como sabedoria, e a indiferença à morte.',
  'marble',
  [
    { title: 'O Processo e a Acusação', estimatedMinutes: 20, content: `<h2>O Processo e a Acusação</h2>
<p class="dropcap">Não sei, atenienses, como fostes afetados pelos meus acusadores; mas eu, por minha parte, fui quase levado a esquecer-me de mim mesmo por causa deles, tão convincentemente falaram. E, no entanto, verdade, por assim dizer, não disseram nada. — <cite>Apologia, 17a</cite></p>
<p>A Apologia não é um texto de defesa pessoal, mas a exposição sistemática de uma forma de vida: a filosofia como serviço divino à cidade. Sócrates começa por distinguir sua maneira de falar — simples, direta, sem ornamentos retóricos — da habilidade dos acusadores.</p>
<blockquote><em>"Uma vida não examinada não vale a pena ser vivida."</em> — Sócrates, Apologia 38a</blockquote>
<p>As acusações formais eram: não reconhecer os deuses da cidade, introduzir novidades divinas, e corromper a juventude. Mas Sócrates propõe que a acusação real é outra: ele perturbou o sono da cidade ao mostrar que seus líderes não sabem o que julgam saber.</p>
<p>O episódio do Oráculo de Delfos é central: a pitonisa declarou que ninguém era mais sábio que Sócrates. Perplexo, ele saiu a interrogar políticos, poetas e artesãos — e descobriu que nenhum sabia nada de essencial, mas todos julgavam saber. Sócrates concluiu: sua sabedoria consiste em saber que não sabe.</p>` },
    { title: 'Sócrates Diante da Morte', estimatedMinutes: 18, content: `<h2>Sócrates Diante da Morte</h2>
<p class="dropcap">Talvez algum de vós se ofenda quando me recorda como ele próprio, em situação de perigo inferior a esta, suplicou e implorou aos juízes com muitas lágrimas, trazendo seus filhos ao tribunal para despertar o máximo de compaixão... Eu, entretanto, nada disto farei. — Apologia, 34c</p>
<blockquote><em>"Temo a morte, ó Atenienses, mais do que ninguém? Isso seria bastante estranho, se alguém que nada sabe ousasse pensar que sabe... Temer a morte nada mais é do que parecer ser sábio sem o ser."</em> — Apologia, 29a</blockquote>
<p>A parte final da Apologia, após a condenação, é a mais comovente. Sócrates recusa a proposta de exílio — prefere a morte em Atenas ao silêncio filosófico fora dela. O filósofo não pode parar de filosofar, porque essa é sua missão divina.</p>
<p>A sentença final de Sócrates dirigida aos juízes que o condenaram: "Mas já é hora de partir — eu para morrer, vós para viver. Qual de nós dois vai para o melhor destino, só o deus sabe." Esta serenidade diante da morte inaugura uma tradição filosófica que verá a filosofia como <em>meletē thanatou</em> — meditação sobre a morte.</p>` },
  ],
  ['sócrates', 'processo', 'morte', 'sabedoria', 'vida examinada']),

pd('plato-phaedo', 'Fédon', 'Fédon — Platão', 'A imortalidade da alma e o último dia de Sócrates',
  'Platão (428–347 a.C.)', 'Φαίδων (Phaidon), c. 380 a.C.', 'c. 380 a.C.', 'Grego Antigo', -347,
  'Filosofia Clássica', 'Intermediário', '3–4 horas',
  'O Fédon narra as últimas horas de Sócrates na prisão, no dia de sua execução. O diálogo é uma investigação sobre a imortalidade da alma, apresentando quatro argumentos clássicos, e culmina com o relato do último momento de Sócrates tomando a cicuta.',
  'marble',
  [
    { title: 'O Filósofo e a Morte', estimatedMinutes: 25, content: `<h2>O Filósofo e a Morte</h2>
<p class="dropcap">A filosofia é uma preparação para a morte — esta é a tese central do Fédon. Para Sócrates, a morte é a separação da alma do corpo. O filósofo passa a vida se libertando do corpo — de seus apetites, prazeres, dores — para que a alma possa contemplar as Formas em sua pureza.</p>
<blockquote><em>"Os verdadeiros filósofos se exercitam no morrer, e a morte lhes é menos temível do que a qualquer outro homem."</em> — Fédon, 67e</blockquote>
<p>O argumento da reminiscência: se o conhecimento é recordação de Formas que a alma contemplou antes do nascimento, então a alma existia antes do corpo. Quando vemos dois objetos iguais e pensamos "Igualdade", não aprendemos isso dos sentidos — reconhecemos algo que já sabíamos.</p>
<p>O argumento dos opostos: tudo o que vive morre, e o que morre retorna à vida — como o sono e a vigília, o quente e o frio, se alternam. A alma que desceu ao Hades deve retornar. O ciclo da vida não pode se interromper.</p>
<h3>O Argumento Final: A Forma da Vida</h3>
<p>O argumento final e mais poderoso: a alma é o que torna o corpo vivo. Ela participa da Forma da Vida. Mas a Forma da Vida não pode admitir a morte. Portanto a alma é imortal. Este argumento antecipa a tradição filosófica que identificará alma, vida e imortalidade como inseparáveis.</p>` },
    { title: 'A Morte de Sócrates', estimatedMinutes: 20, content: `<h2>A Morte de Sócrates</h2>
<p class="dropcap">Quando chegou a hora, o carcereiro trouxe a cicuta. Sócrates a tomou com a maior serenidade, como se fosse beber um medicamento corriqueiro. Seus amigos, que haviam se contido até então, romperam em choro.</p>
<blockquote><em>"Calma, meus amigos. Por isso enviei as mulheres embora — para que não perturbassem com lamentos. Tenho ouvido que é bom morrer em silêncio. Sede fortes e tende coragem."</em> — Fédon, 117d</blockquote>
<p>O relato da morte é de uma sobriedade impressionante. O frio sobe pelos pés, pelas pernas. Sócrates, já coberto pelo manto, descobre o rosto pela última vez para dizer a Críton: "Devemos um galo a Asclépio. Não se esqueçam de pagar." — uma última ironia: a morte como cura.</p>
<p>Fédon encerra com as palavras: "Tal foi o fim, Equécrates, do nosso amigo — o homem mais sábio, mais justo e o melhor de todos os que tive oportunidade de conhecer."</p>` },
  ],
  ['imortalidade', 'alma', 'morte', 'sócrates', 'formas']),

pd('plato-symposium', 'O Banquete', 'O Banquete — Platão', 'Os discursos sobre o Amor — Eros, Beleza e Filosofia',
  'Platão (428–347 a.C.)', 'Συμπόσιον (Symposion), c. 380 a.C.', 'c. 380 a.C.', 'Grego Antigo', -347,
  'Filosofia Clássica', 'Intermediário', '3–4 horas',
  'O Banquete é um dos mais belos diálogos de Platão — uma série de discursos sobre o amor (Eros), cada qual revelando uma face do tema, culminando no discurso de Sócrates/Diotima sobre a ascensão da alma do belo particular até a Beleza em si.',
  'marble',
  [
    { title: 'Os Discursos sobre Eros', estimatedMinutes: 30, content: `<h2>Os Discursos sobre Eros</h2>
<p class="dropcap">Fedro abre os discursos louvando Eros como o mais antigo dos deuses — fonte de vergonha ante a covardia e inspiração para a bravura. Pausânias distingue dois Eros: o vulgar, que busca satisfação corporal, e o celestial, que busca a beleza da alma.</p>
<p>Aristófanes apresenta o discurso mais famoso: os seres humanos foram originalmente esferas com quatro braços e quatro pernas, tão poderosos que ameaçaram os deuses. Zeus os cortou ao meio. Desde então, cada metade busca a outra — o amor é a saudade da inteireza perdida.</p>
<blockquote><em>"O amor é simplesmente o nome que damos ao desejo e à busca da inteireza."</em> — O Banquete, 192e–193a</blockquote>
<p>Agatão defende que Eros é o mais belo e bom dos deuses — jovem, delicado, justo e sábio. Sócrates vai desfazer gentilmente este elogio: Eros não <em>tem</em> o belo, ele <em>deseja</em> o belo — portanto não é belo em si, mas intermediário entre o ter e o não ter.</p>` },
    { title: 'O Discurso de Diotima — A Escada do Amor', estimatedMinutes: 28, content: `<h2>O Discurso de Diotima — A Escada do Amor</h2>
<p class="dropcap">Sócrates narra o ensinamento de Diotima, a sacerdotisa de Mantinéia: o amor é um <em>daimon</em> — um intermediário entre os deuses e os homens, entre o saber e a ignorância. O amante deseja imortalidade, e por isso busca procriar — no corpo ou na alma.</p>
<h3>A Ascensão ao Belo em Si</h3>
<blockquote><em>"Aquele que foi educado até este ponto nas coisas do amor, contemplando sucessivamente e corretamente as coisas belas, já ao aproximar-se do fim dessas coisas do amor, verá de repente algo de belo admirável por natureza — isso mesmo, Sócrates, pelo qual todos os esforços anteriores existiram."</em> — O Banquete, 210e</blockquote>
<p>A escada do amor: do amor a um belo corpo → a todos os belos corpos → à beleza das almas → às belas ações → às belas ciências → à Beleza em si. No cume, a contemplação do Belo absoluto, eterno, simples, puro — o único que merece ser amado por si mesmo.</p>
<p>Este trecho inaugura toda a tradição mística ocidental — de Plotino a João da Cruz — que vê o amor como força que eleva a alma ao divino.</p>` },
  ],
  ['amor', 'eros', 'beleza', 'diotima', 'ascensão']),

pd('plato-meno', 'Mênon', 'Mênon — Platão', 'A teoria da reminiscência e a origem do conhecimento',
  'Platão (428–347 a.C.)', 'Μένων (Menon), c. 380 a.C.', 'c. 380 a.C.', 'Grego Antigo', -347,
  'Filosofia Clássica', 'Iniciante', '2–3 horas',
  'O Mênon investiga se a virtude pode ser ensinada e desenvolve a revolucionária teoria da reminiscência: todo aprendizado é recordação de conhecimentos que a alma já possui de uma existência anterior.',
  'marble',
  [
    { title: 'A Virtude Pode Ser Ensinada?', estimatedMinutes: 22, content: `<h2>A Virtude Pode Ser Ensinada?</h2>
<p class="dropcap">Mênon: "Podes me dizer, Sócrates — a virtude pode ser ensinada? Ou é adquirida pela prática? Ou vem aos homens por natureza, ou de alguma outra forma?" — Mênon, 70a</p>
<p>Sócrates responde que não sabe o que é a virtude — como poderia saber se pode ser ensinada? Começa a investigação socrática típica: cada definição que Mênon propõe é desmontada por Sócrates. A virtude do homem, da mulher, da criança, do escravo — são diferentes, não há essência comum.</p>
<blockquote><em>"Não busques que os eventos aconteçam como tu queres; ao contrário, deseja que os eventos aconteçam como são, e terás uma vida tranquila."</em></blockquote>
<p>Mênon, frustrado, lança o famoso "paradoxo de Mênon": se não sei o que é a virtude, como vou procurá-la? E se soubesse, para que procurar? Este é o argumento do "dilema do pesquisador" — que Platão resolve com a teoria da reminiscência.</p>` },
    { title: 'A Reminiscência — Conhecer é Recordar', estimatedMinutes: 20, content: `<h2>A Reminiscência — Conhecer é Recordar</h2>
<p class="dropcap">Para demonstrar a reminiscência, Sócrates chama um escravo sem instrução matemática e, fazendo apenas perguntas (sem ensinar), o conduz a descobrir que o quadrado de lado duplo tem área quádrupla, não dupla — um teorema geométrico.</p>
<blockquote><em>"E se a verdade das coisas está sempre em nossa alma, então a alma deve ser imortal; de modo que devemos corajosamente tentar descobrir o que não sabemos."</em> — Mênon, 86b</blockquote>
<p>O argumento: o escravo não aprendeu esse conhecimento nesta vida. Logo, a alma o trouxe de outra existência. Conhecer é <em>anamnesis</em> — des-encobrimento do que já está na alma. A educação não transmite conhecimento de fora; ela estimula a alma a rememorar o que já sabe.</p>
<p>A conclusão sobre a virtude é paradoxal: se os homens virtuosos não podem ensiná-la a seus filhos (o que é empiricamente observável), então a virtude não vem por ensinamento, mas por uma espécie de graça divina — os virtuosos são "inspirados pelos deuses" sem saber por quê.</p>` },
  ],
  ['reminiscência', 'virtude', 'conhecimento', 'alma', 'educação']),

pd('plato-phaedrus', 'Fedro', 'Fedro — Platão', 'O amor, a alma, a escrita e a verdadeira retórica',
  'Platão (428–347 a.C.)', 'Φαῖδρος (Phaidros), c. 370 a.C.', 'c. 370 a.C.', 'Grego Antigo', -347,
  'Filosofia Clássica', 'Avançado', '3–4 horas',
  'O Fedro combina uma investigação sobre Eros com uma crítica à escrita e à retórica sofística, propondo uma retórica filosófica fundada no conhecimento da alma. Contém o famoso mito da biga alada da alma.',
  'marble',
  [
    { title: 'O Mito da Biga Alada', estimatedMinutes: 25, content: `<h2>O Mito da Biga Alada — A Natureza da Alma</h2>
<p class="dropcap">A natureza da alma é comparada a uma biga alada: o auriga (a razão) conduz dois cavalos — um nobre e branco (o thymos, o espírito irascível), outro indócil e negro (o apetite). A harmonia entre os três determina a saúde da alma.</p>
<blockquote><em>"A alma na sua totalidade cuida de tudo que é inanimado, e percorre todo o céu, assumindo ora uma forma ora outra."</em> — Fedro, 246b</blockquote>
<p>As almas, na sua jornada celestial, contemplam o lugar supra-celeste — a planície da Verdade — onde residem as Formas: Justiça, Temperança, Ciência. As almas que mais contemplaram voltam ao mundo como filósofos; as que menos contemplaram voltam como tiranos.</p>
<p>Quando o amante vê um belo corpo, a memória das Formas contempladas se desperta — é o que chamamos de amor. As asas da alma começam a crescer novamente. O amor é o impulso de retornar ao lugar de onde a alma veio.</p>` },
    { title: 'A Crítica à Escrita', estimatedMinutes: 18, content: `<h2>A Crítica Platônica à Escrita</h2>
<p class="dropcap">No final do Fedro, Sócrates narra o mito de Theuth, o deus egípcio que inventou a escrita, e Thamus, o rei que a recusou. A escrita enfraquece a memória — quem escreve não precisa mais lembrar. E o texto não pode responder perguntas — repete sempre a mesma coisa.</p>
<blockquote><em>"A escrita é como a pintura: os produtos da pintura parecem vivos, mas se os interrogarmos, guardam um silêncio majestoso."</em> — Fedro, 275d</blockquote>
<p>O paradoxo óbvio: Platão escreve diálogos para criticar a escrita. A solução: o diálogo escrito imita a conversa viva; nele, a doutrina mais profunda ("doutrinas não escritas") permanece ausente — disponível apenas para quem participa do diálogo filosófico real.</p>` },
  ],
  ['alma', 'amor', 'escrita', 'retórica', 'biga alada']),


pd('aristotle-nicomachean', 'Ética a Nicômaco', 'Ética a Nicômaco — Aristóteles', 'A ciência da felicidade e das virtudes humanas',
  'Aristóteles (384–322 a.C.)', 'Ἠθικὰ Νικομάχεια (Ethika Nikomacheia), c. 340 a.C.', 'c. 340 a.C.', 'Grego Antigo', -322,
  'Filosofia Clássica', 'Intermediário', '8–10 horas',
  'A Ética a Nicômaco é a principal obra de ética de Aristóteles. Investiga o bem supremo humano — a eudaimonia (florescimento, felicidade) — e analisa as virtudes éticas e intelectuais como caminhos para alcançá-la.',
  'marble',
  [
    { title: 'Livro I — O Bem Supremo e a Eudaimonia', estimatedMinutes: 35, content: `<h2>Livro I — O Bem Supremo: A Eudaimonia</h2>
<p class="dropcap">Todo arte e toda investigação, toda ação e todo projeto, parece almejar algum bem. Por isso o bem foi justamente definido como aquilo a que todas as coisas tendem. — EN, I, 1094a</p>
<blockquote><em>"A felicidade é uma atividade da alma em conformidade com a virtude perfeita."</em> — EN, I, 1102a5</blockquote>
<p>Aristóteles busca o bem supremo — aquele que é desejado por si mesmo e não pelo bem de outro. O prazer, as riquezas, a honra são bens, mas instrumentais. O bem supremo deve ser autossuficiente — quem o possui não precisa de nada mais para ser feliz.</p>
<p>A <em>eudaimonia</em> (traduzida como felicidade, mas melhor como "florescimento") é esse bem: uma atividade, não um estado passivo. O homem feliz está exercendo o que é próprio do ser humano: a atividade racional da alma em conformidade com a virtude. É o ergon — a função específica — do ser humano.</p>
<p>O argumento do ergon: cada coisa tem uma função. A função do olho é ver; a do carpinteiro, fazer móveis. A função do ser humano é a atividade racional. O bem do ser humano é a excelência nessa atividade. A virtude é a excelência — <em>arete</em> — da função humana.</p>` },
    { title: 'Livro II — A Teoria das Virtudes', estimatedMinutes: 32, content: `<h2>Livro II — As Virtudes como Hábito</h2>
<p class="dropcap">As virtudes éticas não são inatas nem contraditórias à natureza — são adquiridas pelo hábito. "Tornamo-nos justos praticando atos justos, temperantes praticando atos de temperança, corajosos praticando atos de coragem." — EN, II, 1103b</p>
<blockquote><em>"A excelência moral não é, portanto, uma aptidão da natureza nem contrária à natureza: é pela natureza que somos capazes de adquiri-la, e é pelo hábito que nos tornamos perfeitos."</em> — EN, II, 1103a</blockquote>
<p>A doutrina do meio-termo: a virtude é uma disposição para escolher o meio-termo relativo a nós — nem o excesso nem a deficiência. A coragem é o meio entre a covardia (deficiência) e a temeridade (excesso). A generosidade, entre a avareza e a prodigalidade.</p>
<p>O meio-termo não é matemático, mas relativo a cada pessoa e circunstância — por isso a virtude requer <em>phronesis</em> (prudência, sabedoria prática): a capacidade de deliberar corretamente sobre o que conduz ao bem em cada situação concreta.</p>` },
    { title: 'Livro X — O Prazer e a Vida Contemplativa', estimatedMinutes: 28, content: `<h2>Livro X — A Vida Contemplativa como Ideal</h2>
<p class="dropcap">No livro final, Aristóteles conclui que a felicidade suprema é a <em>theoria</em> — a contemplação filosófica. A vida do filósofo, que contempla as verdades eternas, é a mais autossuficiente, a mais contínua e a mais prazerosa.</p>
<blockquote><em>"Se a felicidade consiste em atividade em conformidade com a virtude, é razoável que seja em conformidade com a virtude mais elevada; e esta será a virtude da parte melhor de nós."</em> — EN, X, 1177a</blockquote>
<p>A contemplação é divina — é a atividade do nous (intelecto), a parte mais elevada do ser humano. Viver segundo ela é viver segundo o que há de mais divino em nós. "Na medida em que é mortal, o homem não deve pensar em coisas mortais, mas se esforçar para se tornar imortal tanto quanto possível."</p>
<p>A tensão entre a vida contemplativa (o ideal filosófico) e a vida política (a vida prática) percorre toda a Ética. Aristóteles não a resolve definitivamente — ambas são formas de eudaimonia, mas em graus distintos.</p>` },
  ],
  ['virtude', 'eudaimonia', 'felicidade', 'ética', 'hábito']),

pd('aristotle-politics', 'Política', 'Política — Aristóteles', 'A natureza da cidade e as formas de governo',
  'Aristóteles (384–322 a.C.)', 'Πολιτικά (Politika), c. 335 a.C.', 'c. 335 a.C.', 'Grego Antigo', -322,
  'Filosofia Clássica', 'Intermediário', '6–8 horas',
  'A Política de Aristóteles analisa as formas de governo, a natureza da cidade (polis) e as condições da boa vida política. Contém a célebre afirmação de que o homem é por natureza um animal político.',
  'marble',
  [
    { title: 'Livro I — O Homem como Animal Político', estimatedMinutes: 28, content: `<h2>Livro I — O Homem é por Natureza um Animal Político</h2>
<p class="dropcap">Como vemos que toda cidade é uma espécie de comunidade e toda comunidade se constitui tendo em vista algum bem, é evidente que todas têm como finalidade algum bem — e a que é a mais elevada de todas e que inclui todas as outras visa ao maior bem de todos. — Política, I, 1252a</p>
<blockquote><em>"O homem é por natureza um animal político."</em> — Política, I, 1253a</blockquote>
<p>Aristóteles argumenta que a cidade (polis) é anterior ao indivíduo — não temporalmente, mas ontologicamente. O indivíduo só se realiza plenamente em comunidade. Quem vive fora da polis é ou uma besta ou um deus.</p>
<p>A análise da família e da aldeia como etapas na constituição da polis. A escravidão natural — um dos temas mais polêmicos de Aristóteles: haveria "escravos por natureza" — aqueles cujo intelecto é suficiente para entender ordens, mas não para dar ordens? Esta doutrina foi criticada desde a Antiguidade.</p>` },
    { title: 'Livros III–VI — As Formas de Governo', estimatedMinutes: 30, content: `<h2>As Formas de Governo</h2>
<p class="dropcap">Aristóteles classifica as formas de governo segundo dois critérios: o número de governantes e se governam no interesse de todos ou apenas dos próprios governantes.</p>
<p>Corretas: Monarquia (um, bem comum), Aristocracia (poucos, bem comum), Politia (muitos, bem comum). Degeneradas: Tirania (um, interesse pessoal), Oligarquia (poucos ricos, interesse pessoal), Democracia (muitos pobres, interesse pessoal).</p>
<blockquote><em>"A democracia existe quando os que não têm nascimento nobre e são pobres detêm o poder; a oligarquia, quando o poder está nas mãos dos que têm nobreza de nascimento e riqueza."</em> — Política, IV, 1290b</blockquote>
<p>A politia — forma mista que combina elementos oligárquicos e democráticos — é a constituição mais praticável. A classe média é seu sustentáculo: não é pobre demais para inveja nem rica demais para arrogância. A estabilidade política depende de uma classe média forte.</p>` },
  ],
  ['política', 'cidade', 'governo', 'democracia', 'aristoteles']),

pd('aristotle-metaphysics', 'Metafísica', 'Metafísica — Aristóteles', 'O estudo do ser enquanto ser — a obra fundadora da ontologia',
  'Aristóteles (384–322 a.C.)', 'Τὰ μετὰ τὰ φυσικά (Metaphysika), c. 340–330 a.C.', 'c. 340 a.C.', 'Grego Antigo', -322,
  'Metafísica', 'Avançado', '10–12 horas',
  'A Metafísica de Aristóteles é a investigação do ser enquanto ser — a "filosofia primeira" que pergunta pelo fundamento último de toda realidade. Contém a doutrina das quatro causas, da substância, da potência e ato, e o argumento do Motor Imóvel.',
  'marble',
  [
    { title: 'Livro I — O Desejo de Saber', estimatedMinutes: 25, content: `<h2>Livro I — "Todos os Homens Têm por Natureza o Desejo de Saber"</h2>
<p class="dropcap">Πάντες ἄνθρωποι τοῦ εἰδέναι ὀρέγονται φύσει — Todos os homens têm por natureza o desejo de saber. Prova disso é o amor pelas percepções sensoriais. — Metafísica, I, 980a</p>
<blockquote><em>"A filosofia começa no assombro: os que hoje e antes filosofaram começaram a filosofar por assombro das coisas. Primeiro se assombraram com as dificuldades óbvias; depois, avançando pouco a pouco, chegaram a perguntar sobre coisas maiores: sobre as mudanças da lua, do sol, das estrelas, e sobre a origem do universo."</em> — Met., I, 982b</blockquote>
<p>Aristóteles traça uma genealogia do conhecimento humano: sensação → memória → experiência → arte → ciência. A ciência é superior à experiência porque conhece o porquê, não apenas o que. O médico que sabe por que uma droga cura é superior ao que sabe apenas que ela cura.</p>
<p>A "filosofia primeira" (depois chamada Metafísica) pergunta pelo ser enquanto ser e pelos primeiros princípios. Ela é a mais livre de todas as ciências — não serve a nenhum fim prático, é desejada por si mesma.</p>` },
    { title: 'As Quatro Causas e o Motor Imóvel', estimatedMinutes: 30, content: `<h2>As Quatro Causas e o Motor Imóvel</h2>
<p class="dropcap">Aristóteles identifica quatro tipos de "causa" (aitia — melhor: razão de ser) de qualquer coisa: material (do que é feita), formal (o que é), eficiente (quem a fez), final (para que existe).</p>
<p>Uma estátua: causa material = mármore; formal = a forma do Apolo; eficiente = o escultor; final = ornamento do templo. Na natureza: a semente (material), o carvalho (formal), o sol e a terra (eficiente), crescer e reproduzir (final).</p>
<blockquote><em>"O bem e o excelente são o fim de todas as coisas geradas e em movimento. E uma vez que a causa final é algo de que determinadas coisas dependem, e que se move sem ser movida, sendo eterna, substância e atividade pura — é evidente que é de tal princípio que dependem o céu e a natureza."</em> — Met., XII, 1072b</blockquote>
<p>O Motor Imóvel: toda a cadeia de causas não pode ir ao infinito. Deve haver um primeiro movente que não é movido por nada. Esse Motor Imóvel move pelo desejo e pelo amor — as coisas o desejam como o amado é desejado pelo amante. É pensamento do pensamento — noesis noeseos. Esta doutrina influenciou profundamente Tomás de Aquino e a teologia medieval.</p>` },
  ],
  ['ser', 'ontologia', 'substância', 'causas', 'motor imóvel']),

pd('aristotle-de-anima', 'De Anima', 'De Anima — Aristóteles', 'Sobre a natureza da alma — a filosofia da mente antiga',
  'Aristóteles (384–322 a.C.)', 'Περὶ Ψυχῆς (Peri Psyches), c. 350 a.C.', 'c. 350 a.C.', 'Grego Antigo', -322,
  'Filosofia Clássica', 'Avançado', '4–5 horas',
  'De Anima é o tratado de Aristóteles sobre a alma — aqui entendida não como substância imaterial separada, mas como a forma do corpo vivo. A obra funda a filosofia da mente e da percepção no Ocidente.',
  'marble',
  [
    { title: 'A Alma como Forma do Corpo', estimatedMinutes: 28, content: `<h2>A Alma como Forma do Corpo Vivo</h2>
<p class="dropcap">A alma é a forma primeira de um corpo natural que tem em potência a vida. — De Anima, II, 412a27</p>
<p>Aristóteles rejeita tanto o dualismo platônico (alma como prisioneira no corpo) quanto o materialismo bruto (alma como mero conjunto de partículas). A alma é a forma — o princípio organizador — do corpo vivo. Separada do corpo, não é mais alma da mesma forma que um olho artificial não é um olho real.</p>
<blockquote><em>"Se o olho fosse um animal, a visão seria sua alma; pois a visão é a substância do olho segundo a forma."</em> — De Anima, II, 412b18</blockquote>
<p>A hierarquia das almas: alma nutritiva (plantas), alma sensitiva (animais), alma racional (humanos). Cada nível superior inclui e pressupõe o inferior. O humano é animal — mas animal racional.</p>
<p>O debate sobre o intelecto ativo (nous poiētikos): Aristóteles descreve um intelecto que é "em ato, sempre" e "imortal e eterno" — o que levou a séculos de interpretação. Para Alexandre de Afrodísias, é o intelecto divino; para Averróis, um único intelecto universal compartilhado por todos os humanos; para Tomás de Aquino, o intelecto agente individual e imortal.</p>` },
  ],
  ['alma', 'forma', 'percepção', 'intelecto', 'corpo']),

pd('aristotle-poetics', 'Poética', 'Poética — Aristóteles', 'A teoria da tragédia, da catarse e da mimesis',
  'Aristóteles (384–322 a.C.)', 'Περὶ ποιητικῆς (Peri Poietikes), c. 335 a.C.', 'c. 335 a.C.', 'Grego Antigo', -322,
  'Filosofia Clássica', 'Iniciante', '2–3 horas',
  'A Poética é o mais influente tratado de teoria literária da Antiguidade. Define a tragédia, analisa seus elementos (mythos, ethos, dianoia, lexis, melos, opsis) e propõe o conceito de catarse como finalidade da arte trágica.',
  'marble',
  [
    { title: 'A Tragédia e a Catarse', estimatedMinutes: 22, content: `<h2>A Tragédia e a Catarse</h2>
<p class="dropcap">A tragédia é uma imitação de uma ação séria, completa e de certa magnitude, em linguagem embelezada, com as várias espécies de adornos distribuídas pelas partes do drama; na forma de ação, não de narrativa; através da compaixão e do terror realizando a catarse dessas emoções. — Poética, 1449b</p>
<blockquote><em>"O poeta é mais filósofo do que o historiador, pois o poeta trata do universal, o historiador do particular."</em> — Poética, 1451b5</blockquote>
<p>A mimesis aristotélica não é cópia da realidade — é recriação que revela o universal no particular. A tragédia mostra não o que Édipo fez, mas o que qualquer homem faria em tal situação. Por isso a arte é mais filosófica que a história.</p>
<p>A catarse: a tragédia, ao provocar compaixão e terror, purga (ou purifica) essas emoções. Este conceito foi interpretado de forma radicalmente diferente: como purificação moral (Bernays), como clarificação intelectual (Nussbaum), como prazer próprio da arte (Halliwell).</p>
<p>O herói trágico deve ser alguém eminente, mas não perfeitamente bom — que cai na desgraça não por maldade, mas por <em>hamartia</em> (erro, falta). Édipo, que buscou a verdade com tanta persistência que a verdade o destruiu, é o modelo perfeito.</p>` },
  ],
  ['tragédia', 'catarse', 'mimesis', 'literatura', 'arte']),

pd('epictetus-enchiridion', 'Enquirídio', 'Enquirídio — Epicteto', 'Manual do estoicismo prático — o guia de vida do filósofo escravo',
  'Epicteto (c. 50–135 d.C.)', 'Ἐγχειρίδιον (Encheiridion), c. 108 d.C.', 'c. 108 d.C.', 'Grego Antigo', 135,
  'Estoicismo', 'Iniciante', '1–2 horas',
  'O Enquirídio é um manual de vida estoica compilado por Arriano a partir das lições de Epicteto, um escravo que se tornou filósofo. Em 53 aforismos, apresenta o núcleo do estoicismo: a distinção entre o que depende de nós e o que não depende.',
  'stone',
  [
    { title: 'O que Depende de Nós', estimatedMinutes: 20, content: `<h2>O que Depende de Nós e o que Não Depende</h2>
<p class="dropcap">De todas as coisas existentes, algumas dependem de nós e outras não. De nós dependem: julgamento, impulso, desejo, aversão — em suma, tudo que é nossa atividade. Não dependem de nós: o corpo, a reputação, os cargos — em suma, tudo que não é nossa atividade. — Enchiridion, 1</p>
<blockquote><em>"Não busques que os eventos aconteçam como tu queres; ao contrário, deseja que os eventos aconteçam como são, e terás uma vida tranquila."</em> — Enchiridion, 8</blockquote>
<p>Esta distinção fundamental — <em>eph' hēmin / ouk eph' hēmin</em> — é o coração do estoicismo de Epicteto. O que não depende de nós é indiferente (<em>adiaphoron</em>). Só o que depende de nós tem valor moral. Adoecer não é um mal; ter medo da doença é o mal.</p>
<blockquote><em>"Os homens perturbam-se não pelas coisas, mas pelas opiniões sobre as coisas."</em> — Enchiridion, 5</blockquote>
<p>Epicteto foi escravo — Epafrodito, seu dono, quebraria uma vez sua perna deliberadamente para testá-lo. A resposta de Epicteto: "Vou quebrá-la." Quando quebrou: "Não disse eu que ia quebrá-la?" A liberdade interior sobrevive à escravidão corporal — esta é a demonstração viva da filosofia de Epicteto.</p>` },
    { title: 'A Vida como Teatro', estimatedMinutes: 15, content: `<h2>A Vida como Teatro</h2>
<p class="dropcap">Lembra-te de que és ator num drama, cujo caráter é determinado pelo autor: se curto, um curto; se longo, um longo; e se ele quer que faças o papel de um pobre, até esse papel deves representar naturalmente; e o mesmo se for o papel de um coxo, um oficial ou um homem particular. Pois isso é teu dever — representar bem o papel que te foi dado; mas selecionar o papel pertence a outro. — Enchiridion, 17</p>
<blockquote><em>"Não digas sobre coisa alguma 'perdi isso', mas 'devolvi'. Teu filho morreu? Foi devolvido. Tua esposa morreu? Foi devolvida."</em> — Enchiridion, 11</blockquote>
<p>A serenidade estoica não é insensibilidade, mas perspectiva correta. Preferimos a saúde à doença, mas não precisamos da saúde para ser felizes. O estoico usa os bens que tem com gratidão, sem se apegar a eles.</p>` },
  ],
  ['estoicismo', 'liberdade', 'controle', 'serenidade', 'epicteto']),

pd('epictetus-discourses', 'Diatribes', 'Diatribes — Epicteto', 'As conversas filosóficas do filósofo escravo',
  'Epicteto (c. 50–135 d.C.)', 'Διατριβαί (Diatribai), c. 108 d.C.', 'c. 108 d.C.', 'Grego Antigo', 135,
  'Estoicismo', 'Intermediário', '6–8 horas',
  'As Diatribes (Discourses) são quatro livros de conversas e lições de Epicteto registradas por Arriano. Muito mais extensas que o Enquirídio, apresentam o estoicismo em sua dimensão pedagógica, existencial e espiritual.',
  'stone',
  [
    { title: 'Livro I — Sobre a Liberdade Interior', estimatedMinutes: 25, content: `<h2>Sobre a Liberdade Interior</h2>
<p class="dropcap">Queres ser invencível? Então nunca entres em um combate que não depende de ti. — Diatribes, I, 18</p>
<blockquote><em>"Não é o sofrimento que nos danifica, mas nossa reação ao sofrimento."</em> — Diatribes, I, 11</blockquote>
<p>Epicteto propõe uma psicologia radical: toda perturbação tem sua origem em um julgamento equivocado. A morte não é um mal — o medo da morte é o mal. A dor não é um mal — a aversão à dor é o mal. Mudar os julgamentos é o único caminho para a felicidade duradoura.</p>
<p>A distinção entre o filósofo e o profano: o profano espera que as circunstâncias mudem para ser feliz; o filósofo muda suas atitudes diante das circunstâncias. Um é dependente; o outro é livre.</p>` },
  ],
  ['estoicismo', 'liberdade', 'julgamento', 'educação filosófica']),

pd('seneca-letters', 'Cartas a Lucílio', 'Cartas a Lucílio — Sêneca', 'A correspondência filosófica mais influente da Antiguidade',
  'Sêneca (c. 4 a.C. – 65 d.C.)', 'Epistulae Morales ad Lucilium, c. 65 d.C.', 'c. 65 d.C.', 'Latim', 65,
  'Estoicismo', 'Iniciante', '8–10 horas',
  'As Cartas a Lucílio são 124 cartas filosóficas de Sêneca ao seu amigo Lucílio. Combinam reflexões pessoais, conselhos práticos e argumentação filosófica, tornando-se o grande modelo da filosofia como forma de vida.',
  'stone',
  [
    { title: 'Carta I — Sobre o Uso do Tempo', estimatedMinutes: 15, content: `<h2>Carta I — Recupera o Tempo</h2>
<p class="dropcap"><em>Ita fac, mi Lucili: vindica te tibi.</em> — Faz assim, meu Lucílio: reivindica a ti mesmo para ti mesmo. — Ep. I</p>
<blockquote><em>"Omnia, Lucili, aliena sunt, tempus tantum nostrum est."</em><br/><small>Tudo, Lucílio, é alheio — somente o tempo é nosso.</small> — Ep. I</blockquote>
<p>Sêneca abre com a obsessão central de toda sua filosofia: o tempo. Não o tempo do relógio, mas o tempo vivido — aproveitado, desperdiçado, roubado. Observa como cedemos o tempo a qualquer um que o peça, mas negamos apenas a nós mesmos.</p>
<p>A urgência: a morte não espera. Qualquer momento pode ser o último. Portanto, não aja como se tivesse tempo para tudo amanhã. "Collige et serva tempus" — colhe e guarda o tempo. A filosofia é precisamente isso: o aprendizado de viver o que se tem.</p>` },
    { title: 'Carta VII — Sobre os Males da Multidão', estimatedMinutes: 14, content: `<h2>Carta VII — Foge da Multidão</h2>
<p class="dropcap">Sêneca recomenda evitar os espetáculos públicos — não por elitismo, mas porque o contato com a multidão sem preparo filosófico contamina o caráter. "Diz-me com quem andas, e dir-te-ei quem és" — o princípio vale para as multidões.</p>
<blockquote><em>"Recede in te ipse quantum potes."</em><br/><small>Retira-te para dentro de ti mesmo, tanto quanto possível.</small> — Ep. VII</blockquote>
<p>O modelo de vida filosófica não é a reclusão total (Sêneca era senador), mas a capacidade de encontrar dentro de si um centro estável que não depende de aprovação externa. A solidão como prática filosófica.</p>` },
    { title: 'Carta XLVII — Sobre os Escravos', estimatedMinutes: 16, content: `<h2>Carta XLVII — Trata os Escravos como Seres Humanos</h2>
<p class="dropcap">Esta carta é notável pela modernidade de suas posições. Sêneca exorta Lucílio a tratar seus escravos como seres humanos — <em>homines sunt</em> — não como ferramentas. A alma não tem classe social.</p>
<blockquote><em>"Ille servus est. Sed fortasse liber animo. Ille servus est. Hoc illi nocebit? Ostende quis non sit: alius libidini servit, alius avaritiae, alius ambitioni."</em><br/><small>Ele é escravo. Mas talvez seja livre em espírito. Ele é escravo. Isso lhe fará mal? Mostra-me quem não é escravo: um é escravo da luxúria, outro da avareza, outro da ambição.</small> — Ep. XLVII</blockquote>
<p>A crítica estoica da escravidão: a verdadeira escravidão é interna — a das paixões. Liberdade interior pode coexistir com escravidão exterior. Esta posição não elimina a escravidão como instituição (algo que Sêneca também não faz), mas a subverte filosoficamente.</p>` },
  ],
  ['estoicismo', 'tempo', 'amizade', 'morte', 'escravidão']),

pd('seneca-shortness', 'Da Brevidade da Vida', 'Da Brevidade da Vida — Sêneca', 'A vida não é curta — nós a tornamos curta',
  'Sêneca (c. 4 a.C. – 65 d.C.)', 'De Brevitate Vitae, c. 49 d.C.', 'c. 49 d.C.', 'Latim', 65,
  'Estoicismo', 'Iniciante', '1–2 horas',
  'Em De Brevitate Vitae, Sêneca argumenta que a vida não é curta por natureza — nós a tornamos curta ao desperdiçá-la em ocupações fúteis. A vida de quem vive intensamente é longa o suficiente.',
  'stone',
  [
    { title: 'A Vida Não é Curta', estimatedMinutes: 18, content: `<h2>A Vida Não é Curta — Nós a Tornamos Curta</h2>
<p class="dropcap"><em>Omnes, Pauline, in hoc dissentire mortales videntur, sed ideo tam exiguum nobis tempus est: non accipimus brevem vitam sed fecimus.</em> — De todos os mortais, Paulino, esta é a queixa comum: mas a vida não nos foi dada breve — nós a tornamos breve. — De Brev. Vitae, 1</p>
<blockquote><em>"Non est quod roges an contingat vitae satis: id agitur ne transeat inaniter."</em><br/><small>Não perguntes se a vida é suficiente: o que importa é não deixá-la passar em vão.</small></blockquote>
<p>Os três tipos de ocupação que roubam a vida: os que são arrastados pela ambição (negotiosi), os que são escravos dos prazeres (delicati), os que são sorvidos pela inércia (otiosi). Nenhum deles vive — vegetam.</p>
<p>O único que realmente vive é o filósofo: "Somente os que dedicam o tempo à filosofia têm lazeres, somente eles vivem. Pois não guardam somente seus próprios anos — ajuntam a si todos os séculos. Sócrates, Platão, Zenão são seus contemporâneos."</p>` },
  ],
  ['tempo', 'vida', 'estoicismo', 'brevidade', 'filosofia']),

pd('cicero-duties', 'Dos Deveres', 'Dos Deveres — Cícero', 'O tratado de ética prática do maior orador romano',
  'Marco Túlio Cícero (106–43 a.C.)', 'De Officiis, 44 a.C.', '44 a.C.', 'Latim', -43,
  'Estoicismo', 'Intermediário', '4–5 horas',
  'De Officiis é o último grande tratado filosófico de Cícero, escrito em 44 a.C., meses antes de seu assassinato. Investiga os deveres morais e os conflitos entre o honesto e o útil, tornando-se o manual de ética prática da tradição ocidental.',
  'marble',
  [
    { title: 'O Honesto e o Útil', estimatedMinutes: 22, content: `<h2>O Honesto e o Útil — O Conflito Central da Ética</h2>
<p class="dropcap">Toda a questão dos deveres pode ser reduzida a dois princípios: o honesto (honestum) e o útil (utile). Os conflitos entre eles são o problema central da ética prática. — De Officiis, I, 3</p>
<blockquote><em>"Nihil honestum esse potest quod iustitia vacat."</em><br/><small>Nada pode ser honesto que careça de justiça.</small> — De Officiis, I, 62</blockquote>
<p>Cícero adapta o estoicismo grego para a vida romana ativa. O dever (officium) não é uma obrigação externa — brota da natureza racional e social do ser humano. Temos deveres para com os deuses, os pais, a pátria, os amigos.</p>
<p>A tese central: quando o honesto e o útil parecem conflitar, é porque entendemos mal o que é verdadeiramente útil. A desonestidade pode parecer útil a curto prazo, mas corrói o tecido social e, no longo prazo, destrói o próprio agente.</p>
<p>O exemplo de Régulo: o general romano capturado pelos cartagineses, enviado a Roma para negociar a paz, que voltou para a Cartago para ser executado por não poder trair sua palavra — mesmo tendo a alternativa de ficar. Para Cícero, este é o modelo perfeito de dever cumprido contra o interesse pessoal.</p>` },
  ],
  ['dever', 'ética', 'justiça', 'estoicismo', 'cícero']),

pd('cicero-friendship', 'Da Amizade', 'Da Amizade — Cícero', 'O maior tratado sobre a amizade verdadeira na filosofia antiga',
  'Marco Túlio Cícero (106–43 a.C.)', 'De Amicitia, 44 a.C.', '44 a.C.', 'Latim', -43,
  'Filosofia Clássica', 'Iniciante', '1–2 horas',
  'De Amicitia é um diálogo sobre a natureza e o valor da amizade verdadeira, colocado na boca de Lélio, amigo do general Cipião. Cícero argumenta que a amizade verdadeira só é possível entre pessoas virtuosas.',
  'marble',
  [
    { title: 'A Amizade Verdadeira', estimatedMinutes: 18, content: `<h2>A Amizade Verdadeira — Só entre Virtuosos</h2>
<p class="dropcap">A amizade verdadeira não é a utilidade mútua, nem o prazer compartilhado — é a concordância perfeita na virtude, nos estudos e nas opiniões, acompanhada de benevolência e afeto. — De Amicitia, 6</p>
<blockquote><em>"Amicitia nisi in bonis esse non potest."</em><br/><small>A amizade só pode existir entre homens de bem.</small> — De Amicitia, 18</blockquote>
<p>Cícero distingue três tipos de "amizade": utilitária (busca de vantagem mútua), hedônica (prazer compartilhado) e virtuosa (amor ao amigo pelo que ele é). Apenas o terceiro tipo merece o nome de amizade.</p>
<p>A máxima central: no amigo verdadeiro, é como se você amasse a si mesmo. "Qui est igitur amicus? Alter ego" — o amigo é um outro eu. A relação de amizade expande o eu sem dissolvê-lo.</p>` },
  ],
  ['amizade', 'virtude', 'cícero', 'ética', 'relações']),

pd('plotinus-enneads', 'Enéadas', 'Enéadas — Plotino', 'O neoplatonismo: a ascensão do Uno ao múltiplo e o retorno do múltiplo ao Uno',
  'Plotino (204–270 d.C.)', 'Ἐννεάδες (Enneades), c. 254–270 d.C.', 'c. 254–270 d.C.', 'Grego Antigo', 270,
  'Filosofia Clássica', 'Avançado', '12–15 horas',
  'As Enéadas de Plotino são o maior monumento do neoplatonismo. Organizadas por Porfírio em seis tríades de nove tratados, expõem a hierarquia metafísica: o Uno, o Intelecto (Nous), a Alma do Mundo — e a possibilidade de retorno extático ao Uno.',
  'marble',
  [
    { title: 'O Uno — Além do Ser e do Pensamento', estimatedMinutes: 30, content: `<h2>O Uno — Além do Ser e do Pensamento</h2>
<p class="dropcap">O Uno é aquilo de que tudo provém e para o qual tudo tende. Mas o Uno em si não pode ser pensado — pensamento implica dualidade entre pensante e pensado. O Uno é antes de toda dualidade: antes do Ser, antes do Pensamento, antes da Beleza. — Enn. V, 4</p>
<blockquote><em>"O Uno é perfeito porque não busca nada, não tem nada, não precisa de nada, e como que transborda... e esse transbordamento produz outro ser."</em> — Enn. V, 2, 1</blockquote>
<p>A processão: do Uno emana o Intelecto (Nous), que contempla o Uno e ao fazê-lo se pluraliza — é o mundo das Formas platônicas pensando-se a si mesmo. Do Intelecto emana a Alma do Mundo, que produz a matéria e o tempo ao organizar o cosmos.</p>
<p>O retorno: a alma individual, descendida da Alma do Mundo, pode retornar ao Uno pela via da contemplação filosófica. O êxtase místico — experiência em que o sujeito se dissolve no Uno — é o cume da filosofia plotiniana. Porfírio relata que Plotino experimentou quatro vezes esse êxtase durante os anos em que conviveram.</p>` },
  ],
  ['neoplatonismo', 'uno', 'alma', 'êxtase', 'plotino']),


// ══════════════════════════════════════════════════════════════════════════
// FILOSOFIA MEDIEVAL E RENASCENTISTA
// ══════════════════════════════════════════════════════════════════════════

pd('boethius-consolation', 'Consolação da Filosofia', 'Consolação da Filosofia — Boécio', 'O livro escrito na prisão à espera da execução — a filosofia como consolo',
  'Boécio (c. 480–524 d.C.)', 'De Consolatione Philosophiae, c. 524 d.C.', 'c. 524 d.C.', 'Latim', 524,
  'Filosofia Cristã', 'Iniciante', '3–4 horas',
  'Boécio escreveu a Consolação da Filosofia enquanto aguardava a execução por traição a Teodorico. A Filosofia personificada aparece e guia o autor da queixa pela sorte à compreensão da providência divina e do verdadeiro bem. Um dos livros mais lidos de toda a Idade Média.',
  'gold',
  [
    { title: 'A Visita da Filosofia', estimatedMinutes: 22, content: `<h2>A Visita da Filosofia</h2>
<p class="dropcap">Enquanto meditava em silêncio estas coisas e punha minha dor em escritos, pareceu-me que uma mulher de aspecto venerável se pôs sobre minha cabeça... de estatura incerta e variável, ora de altura vulgar, ora tocando com o alto da cabeça os próprios céus. — Consolação, I, 1</p>
<p>A Filosofia expulsa as Musas da poesia — "não musas da filosofia, mas musas de teatro" — que estimulam o lamento em vez da cura. Ela assumirá a tarefa de curar Boécio do erro fundamental: crer que a fortuna é um bem real.</p>
<blockquote><em>"Haec nostra vis est, hunc continuum ludum ludimus. Rotam volubili orbe versamus, infima summis, summa infimis mutare gaudemus."</em><br/><small>Este é o meu poder, este o jogo que jogo continuamente. Giro a roda que gira; prazo mudar o que está em cima pelo que está em baixo.</small> — A Fortuna fala, Consolação, II, 2</blockquote>
<p>A Roda da Fortuna — um dos símbolos mais duradouros da Idade Média — aparece aqui pela primeira vez de forma filosófica. A fortuna não promete constância; sua natureza é a mudança. Confundir bens da fortuna (riqueza, poder, fama) com o verdadeiro bem é o erro fundamental do homem infeliz.</p>` },
    { title: 'O Verdadeiro Bem e a Providência', estimatedMinutes: 20, content: `<h2>O Verdadeiro Bem e a Providência</h2>
<p class="dropcap">Boécio pergunta: se Deus existe e governa tudo com providência, como existe o mal? Por que os maus prosperam e os bons sofrem? A Filosofia responde com a doutrina do verdadeiro bem.</p>
<blockquote><em>"Bonorum omnium te esse participem necesse est, si in ipso bono manseris."</em><br/><small>É necessário que sejas participante de todos os bens, se permaneceres no bem mesmo.</small></blockquote>
<p>O argumento: os maus nunca são felizes, mesmo quando prosperam. Pois a felicidade verdadeira é o Bem em si — que os maus, por definição, não possuem. Os bens da fortuna são alugados, não próprios; a fortuna pode retirá-los a qualquer momento.</p>
<p>A providência e o destino: a providência é o plano de Deus visto do alto, na eternidade; o destino é esse mesmo plano desdobrado no tempo. O que parece irracional na perspectiva humana é parte de uma ordem superior que nossa visão limitada não alcança.</p>` },
  ],
  ['providência', 'fortuna', 'bem', 'estoicismo', 'medieval']),

pd('descartes-meditations', 'Meditações sobre Filosofia Primeira', 'Meditações — Descartes', 'A fundação da filosofia moderna: a dúvida, o cogito e a existência de Deus',
  'René Descartes (1596–1650)', 'Meditationes de Prima Philosophia, 1641', '1641', 'Latim', 1650,
  'Filosofia Moderna', 'Intermediário', '3–4 horas',
  'As Meditações de Descartes inauguram a filosofia moderna com um método radical: a dúvida metódica. O resultado é o cogito ergo sum — a primeira certeza inabalável — e a fundação de toda a epistemologia e metafísica modernas.',
  'parchment',
  [
    { title: 'Meditação I — A Dúvida Metódica', estimatedMinutes: 22, content: `<h2>Meditação I — A Dúvida como Método</h2>
<p class="dropcap">Há já algum tempo que percebi que, desde meus primeiros anos, recebera muitas falsas opiniões como verdadeiras, e que o que depois fundei em princípios tão mal assegurados não podia ser senão muito duvidoso e incerto; de forma que me era necessário tentar seriamente... desfazer-me de todas as opiniões a que até então dera crédito. — Meditação I</p>
<blockquote><em>"Sed sicut mihi persuasum est quod nihil omnino verum esse potest, ita me persuadeo quod nihil omnino falsum esse potest."</em><br/><small>Assim como me convenci de que nada pode ser verdadeiro, assim me convenço de que nada pode ser completamente falso.</small></blockquote>
<p>Os três níveis de dúvida: (1) Os sentidos enganam — não podemos confiar plenamente na percepção sensorial; (2) Posso estar sonhando — a distinção vigília/sonho pode não ser sempre clara; (3) O Deus enganador (Gênio Maligno) — e se uma potência onipotente me faz errar mesmo nas verdades matemáticas?</p>
<p>O hiperbólico Gênio Maligno não é crença sincera de Descartes — é instrumento metodológico. Duvidar de tudo revela o que não pode ser posto em dúvida. A dúvida é purificadora: queima tudo até restar apenas o ouro do indubitável.</p>` },
    { title: 'Meditação II — O Cogito', estimatedMinutes: 20, content: `<h2>Meditação II — Cogito Ergo Sum</h2>
<p class="dropcap">Mas logo depois notei que, enquanto queria pensar que tudo era falso, era necessário que eu, que pensava, fosse alguma coisa. E notando que esta verdade: eu penso, logo existo, era tão firme e tão certa que todas as mais extravagantes suposições dos céticos não seriam capazes de a abalar, julguei que podia admiti-la como o primeiro princípio da filosofia que procurava. — Discurso, IV (cf. Med. II)</p>
<blockquote><em>"Cogito, ergo sum."</em><br/><small>Penso, logo existo.</small> — (formulação do Discurso do Método)</blockquote>
<p>O argumento: o ato de duvidar é um ato de pensar. Pensar pressupõe um sujeito que pensa. Logo, enquanto duvido, existo necessariamente. O Gênio Maligno pode enganar meus sentidos e meus raciocínios, mas não pode me fazer crer que existo quando não existo — pois se não existisse, não poderia ser enganado.</p>
<p>Mas o que sou? "Uma coisa que pensa" — <em>res cogitans</em>. Não um corpo (que pode ser ilusório), não um ser encarnado — mas puro pensamento. Este dualismo entre substância pensante (mente) e substância extensa (corpo) inaugura um dos problemas mais persistentes da filosofia: como elas interagem?</p>` },
    { title: 'Meditações III–V — Deus e o Mundo', estimatedMinutes: 20, content: `<h2>Meditações III–V — Deus como Garantia da Razão</h2>
<p class="dropcap">Descartes percebe que não pode sair do isolamento solipsista do cogito sem uma garantia externa. Deus é essa garantia: se existe um Deus perfeito e veraz, ele não me criaria para errar sistematicamente.</p>
<blockquote><em>"Dei nomine intelligo substantiam quandam infinitam, independentem, summe intelligentem, summe potentem."</em><br/><small>Por nome de Deus entendo certa substância infinita, independente, sumamente inteligente, sumamente poderosa.</small> — Meditação III</blockquote>
<p>O argumento cosmológico: tenho a ideia de infinito em mim. Mas como poderia ter essa ideia se eu sou finito? A ideia de infinito deve ter por causa algo realmente infinito — Deus. A causa deve ser pelo menos tão real quanto o efeito.</p>
<p>O "círculo cartesiano": Descartes usa a razão para provar Deus, e Deus para garantir a razão. Hume e Kant verão aqui uma petição de princípio. Mas para Descartes, o cogito é garantido antes de Deus — é a única pedra sobre a qual todo o edifício é construído.</p>` },
  ],
  ['cogito', 'dúvida', 'deus', 'mente', 'modernidade']),

pd('descartes-discourse', 'Discurso do Método', 'Discurso do Método — Descartes', 'As quatro regras do método científico-filosófico moderno',
  'René Descartes (1596–1650)', 'Discours de la Méthode, 1637', '1637', 'Francês', 1650,
  'Filosofia Moderna', 'Iniciante', '1–2 horas',
  'O Discurso do Método é o manifesto da modernidade filosófica: Descartes propõe quatro regras para conduzir corretamente a razão e encontrar a verdade nas ciências. É aqui que aparece pela primeira vez a formulação "je pense donc je suis".',
  'parchment',
  [
    { title: 'As Quatro Regras do Método', estimatedMinutes: 18, content: `<h2>As Quatro Regras do Método Cartesiano</h2>
<p class="dropcap">O bom senso é a coisa do mundo melhor distribuída; pois cada qual pensa estar tão bem provido dele que mesmo os mais difíceis de se satisfazer no que toca a qualquer outra coisa não costumam desejar mais bom senso do que têm. — Discurso, I</p>
<p>As quatro regras: (1) Evidência — só aceitar como verdadeiro o que se apresenta claramente ao espírito, sem nenhuma dúvida; (2) Análise — dividir cada dificuldade em tantas partes quantas seja possível; (3) Síntese — conduzir os pensamentos em ordem, dos simples para os complexos; (4) Enumeração — fazer enumerações completas para nada omitir.</p>
<blockquote><em>"Je pense, donc je suis."</em><br/><small>Penso, logo sou.</small> — Discurso IV</blockquote>
<p>O método é inspirado na matemática — a única ciência em que Descartes via certeza indubitável. O ideal cartesiano: tornar a filosofia tão certa quanto a geometria, fundando-a sobre princípios absolutamente indubitáveis.</p>` },
  ],
  ['método', 'razão', 'cogito', 'ciência', 'modernidade']),

pd('spinoza-ethics', 'Ética', 'Ética — Espinoza', 'A metafísica more geometrico: Deus, natureza, mente e liberdade',
  'Benedictus de Spinoza (1632–1677)', 'Ethica Ordine Geometrico Demonstrata, 1677', '1677 (póstumo)', 'Latim', 1677,
  'Metafísica', 'Avançado', '10–12 horas',
  'A Ética de Espinoza é escrita no estilo geométrico — definições, axiomas, proposições, demonstrações, escólios. Propõe um monismo radical: só existe uma substância (Deus ou Natureza), da qual mente e corpo são atributos paralelos. A liberdade é conhecimento das causas necessárias.',
  'parchment',
  [
    { title: 'Parte I — Deus, a Substância Única', estimatedMinutes: 30, content: `<h2>Parte I — De Deo: Deus ou Natureza</h2>
<p class="dropcap">Por substância entendo o que existe em si mesmo e por si mesmo é concebido; isto é, aquilo cujo conceito não necessita do conceito de outra coisa do qual deva ser formado. — Ética, I, Def. 3</p>
<blockquote><em>"Deus, sive Natura."</em><br/><small>Deus, ou seja, a Natureza.</small> — Ética, IV, Prefácio</blockquote>
<p>O argumento da substância única: se houvesse duas substâncias, elas se limitariam mutuamente. Mas a substância é por definição ilimitada. Logo, só pode existir uma substância — infinita, com infinitos atributos. Esta substância é Deus, idêntico à Natureza. O panteísmo espinozista escandalizou a Europa do século XVII.</p>
<p>Os dois atributos que conhecemos: o Pensamento e a Extensão. Mente e corpo não são substâncias diferentes (como em Descartes), mas dois atributos da mesma substância. O paralelismo psicofísico: não há causação entre mente e corpo — cada um é a expressão, em seu atributo, do mesmo modo da substância única.</p>` },
    { title: 'Partes III–V — As Paixões e a Liberdade', estimatedMinutes: 25, content: `<h2>Partes III–V — Das Paixões à Liberdade Humana</h2>
<p class="dropcap">As paixões — amor, ódio, alegria, tristeza, esperança, medo — são modos de ser da mente que buscam aumentar seu poder de agir (<em>conatus</em>). Não devem ser suprimidas, mas compreendidas e transformadas em ações.</p>
<blockquote><em>"Non ridere, non lugere, neque detestari, sed intelligere."</em><br/><small>Não rir, não chorar, nem detestar — mas entender.</small> — Tratado Político, I, 4</blockquote>
<p>A servidão humana: somos escravos das paixões quando as sofremos passivamente, sem entender suas causas. A liberdade não é ausência de paixão, mas compreensão das causas necessárias que determinam o que sentimos e desejamos.</p>
<p>O amor intelectual de Deus (<em>amor intellectualis Dei</em>): o grau supremo de conhecimento — a intuição sub specie aeternitatis — produz o afeto mais poderoso e estável: o amor à Natureza/Deus entendida como totalidade necessária. O ser humano que alcança esse amor alcança a beatitude — a liberdade genuína que, paradoxalmente, é total submissão à necessidade.</p>` },
  ],
  ['spinoza', 'deus', 'natureza', 'paixões', 'liberdade', 'substância']),

pd('leibniz-monadology', 'Monadologia', 'Monadologia — Leibniz', 'O universo como uma harmonia de mônadas — a metafísica otimista',
  'Gottfried Wilhelm Leibniz (1646–1716)', 'La Monadologie, 1714', '1714', 'Francês', 1716,
  'Metafísica', 'Avançado', '1–2 horas',
  'A Monadologia é o texto mais compacto e famoso de Leibniz: 90 parágrafos que expõem seu sistema metafísico completo. As mônadas — unidades simples, indivisíveis, sem janelas — são os elementos últimos da realidade. Deus é a mônada das mônadas.',
  'parchment',
  [
    { title: 'As Mônadas e a Harmonia Pré-Estabelecida', estimatedMinutes: 20, content: `<h2>As Mônadas e a Harmonia Pré-Estabelecida</h2>
<p class="dropcap">A Mônada, de que aqui falaremos, nada mais é do que uma substância simples que entra nos compostos; simples quer dizer: sem partes. — Monadologia, §1</p>
<blockquote><em>"Les Monades n'ont point de fenêtres par lesquelles quelque chose y puisse entrer ou sortir."</em><br/><small>As Mônadas não têm janelas pelas quais algo possa entrar ou sair.</small> — Monadologia, §7</blockquote>
<p>Se as mônadas não têm janelas, como se coordenam? Pela harmonia pré-estabelecida: Deus criou cada mônada de modo que o desenrolar de seus estados internos coincida perfeitamente com os de todas as outras. Não há causação real entre mônadas — só paralelismo perfeito ordenado por Deus.</p>
<p>O melhor dos mundos possíveis: Deus, que é onisciente, onipotente e infinitamente bom, escolheu criar este mundo — que portanto deve ser o melhor dos mundos possíveis. Esta tese foi alvo da famosa sátira de Voltaire no Cândido, após o terremoto de Lisboa (1755).</p>` },
  ],
  ['leibniz', 'mônadas', 'harmonia', 'deus', 'metafísica']),

pd('locke-understanding', 'Ensaio sobre o Entendimento Humano', 'Ensaio sobre o Entendimento Humano — Locke', 'O fundamento do empirismo: todo conhecimento vem da experiência',
  'John Locke (1632–1704)', 'An Essay Concerning Human Understanding, 1689', '1689', 'Inglês', 1704,
  'Filosofia Moderna', 'Intermediário', '10–12 horas',
  'O Ensaio de Locke inaugura o empirismo britânico: rejeita as ideias inatas (Descartes, Leibniz) e argumenta que toda ideia vem da experiência — sensação ou reflexão. A mente ao nascer é uma tabula rasa.',
  'parchment',
  [
    { title: 'Livro I — Contra as Ideias Inatas', estimatedMinutes: 22, content: `<h2>Livro I — Não Existem Ideias Inatas</h2>
<p class="dropcap">É uma opinião estabelecida entre alguns homens que há princípios inatos — alguns caracteres primários impressos, por assim dizer, na mente do homem que a alma recebe em seu primeiro ser, e traz consigo ao mundo. — Ensaio, I, 1</p>
<p>Locke ataca a teoria das ideias inatas de Descartes e os nativistas: se houvesse ideias inatas, todos as teriam, incluindo crianças e povos sem escrita. Mas o princípio de não-contradição, por exemplo, é desconhecido para crianças e muitos adultos. Logo, não é inato.</p>
<blockquote><em>"Let us then suppose the mind to be, as we say, white paper, void of all characters, without any ideas."</em><br/><small>Suponhamos a mente, como dizemos, um papel branco, vazio de todos os caracteres, sem nenhuma ideia.</small> — Ensaio, II, 1</blockquote>
<p>A tabula rasa: a mente ao nascer é uma folha em branco. A experiência escreve nela. As duas fontes de ideia: sensação (impressões do mundo externo) e reflexão (percepção das operações da própria mente). Tudo o que temos na mente — seja a mais abstrata ideia matemática — pode ser rastreado até a experiência.</p>` },
  ],
  ['empirismo', 'locke', 'tabula rasa', 'experiência', 'conhecimento']),

pd('locke-government', 'Dois Tratados sobre o Governo', 'Dois Tratados sobre o Governo — Locke', 'O fundamento filosófico da democracia liberal e dos direitos naturais',
  'John Locke (1632–1704)', 'Two Treatises of Government, 1689', '1689', 'Inglês', 1704,
  'Filosofia Política', 'Intermediário', '6–8 horas',
  'Os Dois Tratados são o texto fundador do liberalismo político. O Segundo Tratado desenvolve a teoria dos direitos naturais (vida, liberdade, propriedade), o estado de natureza e o consentimento como fundamento da autoridade legítima.',
  'parchment',
  [
    { title: 'Estado de Natureza e Direitos Naturais', estimatedMinutes: 25, content: `<h2>Estado de Natureza e Direitos Naturais</h2>
<p class="dropcap">Para entender o poder político corretamente e derivá-lo de sua origem, devemos considerar em que estado todos os homens se encontram naturalmente — um estado de perfeita liberdade para ordenar suas ações e dispor de suas posses e pessoas como julgarem conveniente. — Segundo Tratado, §4</p>
<blockquote><em>"The state of nature has a law of nature to govern it, which obliges every one: and reason, which is that law, teaches all mankind, who will but consult it, that being all equal and independent, no one ought to harm another in his life, health, liberty, or possessions."</em><br/><small>O estado de natureza tem uma lei da natureza que o governa, que obriga a todos: e a razão, que é essa lei, ensina a toda a humanidade que todos são iguais e independentes, e que nenhum deve prejudicar o outro em sua vida, saúde, liberdade ou posses.</small> — Segundo Tratado, §6</blockquote>
<p>Ao contrário de Hobbes, o estado de natureza de Locke não é uma guerra de todos contra todos — é um estado de liberdade e igualdade governado pela lei da razão. Mas é instável: sem árbitro imparcial para resolver disputas. Por isso os homens consentem em constituir o governo civil.</p>
<p>Os três direitos inalienáveis: vida, liberdade e propriedade. A propriedade é gerada pelo trabalho — ao misturar seu trabalho com os recursos naturais, o homem os torna seus. Esta teoria do valor-trabalho influenciará tanto o liberalismo (Nozick) quanto o marxismo (Marx).</p>` },
  ],
  ['liberalismo', 'direitos naturais', 'contrato social', 'propriedade', 'governo']),

pd('hume-treatise', 'Tratado da Natureza Humana', 'Tratado da Natureza Humana — Hume', 'O empirismo radical: céticismo, causalidade e o eu como ficção',
  'David Hume (1711–1776)', 'A Treatise of Human Nature, 1739–1740', '1739–1740', 'Inglês', 1776,
  'Filosofia Moderna', 'Avançado', '12–15 horas',
  'O Tratado de Hume é o mais ambicioso projeto empirista: aplicar o método experimental de Newton ao estudo da mente humana. O resultado é devastador para a metafísica, a religião e a ideia de um eu substancial.',
  'parchment',
  [
    { title: 'Impressões, Ideias e Causalidade', estimatedMinutes: 28, content: `<h2>Impressões, Ideias e o Problema da Causalidade</h2>
<p class="dropcap">Todas as percepções da mente humana se reduzem a dois tipos distintos, que chamarei de Impressões e Ideias. A diferença entre elas consiste nos graus de força e vividez com que atingem a mente. — Tratado, I, i, 1</p>
<blockquote><em>"Reason is, and ought only to be the slave of the passions."</em><br/><small>A razão é, e deve apenas ser, a escrava das paixões.</small> — Tratado, II, iii, 3</blockquote>
<p>O problema da causalidade: observamos que após A, B se segue regularmente. Mas nunca observamos a conexão necessária entre A e B — apenas a conjunção constante. A necessidade é projetada pela mente sobre o mundo, não descoberta nele. Este argumento é o que "acordou Kant do sono dogmático".</p>
<p>O eu como ficção: procuro o eu e encontro apenas um feixe de percepções — imagens, sentimentos, pensamentos em fluxo. Não existe um eu substancial, permanente, idêntico a si mesmo. O "eu" é uma construção da imaginação sobre a sequência das percepções. Esta tese antecipa Hume, Nietzsche e o budismo.</p>` },
  ],
  ['hume', 'empirismo', 'causalidade', 'eu', 'ceticismo']),

pd('hume-enquiry', 'Investigação sobre o Entendimento Humano', 'Investigação — Hume', 'O ceticismo mitigado e a impossibilidade dos milagres',
  'David Hume (1711–1776)', 'An Enquiry Concerning Human Understanding, 1748', '1748', 'Inglês', 1776,
  'Filosofia Moderna', 'Intermediário', '3–4 horas',
  'A Investigação é a reformulação madura e mais acessível do Tratado. Inclui o famoso ensaio sobre os milagres e a seção sobre a liberdade e a necessidade.',
  'parchment',
  [
    { title: 'Sobre os Milagres', estimatedMinutes: 20, content: `<h2>Sobre os Milagres</h2>
<p class="dropcap">Hume propõe a regra: para qualquer testemunho de um milagre, devemos pesar a probabilidade de que o testemunho seja falso contra a probabilidade de que a lei da natureza seja violada. O milagre, por definição, é a violação de uma lei da natureza estabelecida por uma experiência firme e inalterável. — Investigação, §10</p>
<blockquote><em>"No testimony is sufficient to establish a miracle, unless the testimony be of such a kind, that its falsehood would be more miraculous than the fact which it endeavours to establish."</em><br/><small>Nenhum testemunho é suficiente para estabelecer um milagre, a menos que o testemunho seja de tal natureza que sua falsidade seria mais milagrosa do que o fato que tenta estabelecer.</small> — Investigação, §91</blockquote>
<p>O argumento: como nunca ocorreu um conjunto de testemunhos tão confiável que sua falsidade fosse mais improvável do que a violação de uma lei natural, nenhuma religião histórica foi jamais estabelecida sobre bases milagrosas suficientes.</p>` },
  ],
  ['hume', 'milagres', 'religião', 'ceticismo', 'empirismo']),

pd('hobbes-leviathan', 'Leviatã', 'Leviatã — Hobbes', 'O Estado como deus mortal — a filosofia política do absolutismo racional',
  'Thomas Hobbes (1588–1679)', 'Leviathan, 1651', '1651', 'Inglês', 1679,
  'Filosofia Política', 'Intermediário', '8–10 horas',
  'O Leviatã de Hobbes é um dos textos mais importantes da filosofia política ocidental. Parte de uma psicologia materialista e chega ao Estado soberano absoluto como único remédio para a guerra de todos contra todos.',
  'parchment',
  [
    { title: 'O Estado de Natureza', estimatedMinutes: 25, content: `<h2>O Estado de Natureza: A Guerra de Todos contra Todos</h2>
<p class="dropcap">Nesta situação não há lugar para a indústria, pois o fruto dela é incerto; e consequentemente não há cultivo da terra; não há navegação nem uso das mercadorias importadas do mar; não há construção confortável; não há instrumentos para mover e remover as coisas que requerem muita força; não há conhecimento da face da terra; não há cômputo do tempo; não há artes; não há letras; não há sociedade; e, o que é pior de tudo, há um medo continual e o perigo de morte violenta; e a vida do homem é solitária, pobre, sórdida, brutal e curta. — Leviatã, XIII</p>
<blockquote><em>"Bellum omnium contra omnes."</em><br/><small>A guerra de todos contra todos.</small> — Leviatã, XIII</blockquote>
<p>Hobbes descreve o estado de natureza como o estado sem governo civil. Nele, os humanos são movidos por desejo de poder — não por maldade, mas pela lógica da sobrevivência: se não te superar ao vizinho, ele te superará. A igualdade natural de capacidades implica igualdade de esperança — e portanto conflito.</p>
<p>A solução: o contrato social. Os indivíduos cedem seus direitos naturais (de fazer o que bem entendem para sobreviver) a um soberano — o Leviatã — em troca de proteção. O soberano não faz parte do contrato: não está submetido à lei. É o deus mortal que cria a paz civil.</p>` },
  ],
  ['hobbes', 'estado', 'contrato', 'poder', 'soberania']),

pd('rousseau-social-contract', 'O Contrato Social', 'O Contrato Social — Rousseau', 'A soberania popular e a vontade geral como fundamento da liberdade',
  'Jean-Jacques Rousseau (1712–1778)', 'Du Contrat Social, 1762', '1762', 'Francês', 1778,
  'Filosofia Política', 'Intermediário', '3–4 horas',
  'O Contrato Social abre com uma das frases mais famosas da filosofia política: "O homem nasce livre, e em todo lugar está acorrentado." Rousseau propõe uma forma de associação política que preserve a liberdade natural através da soberania da vontade geral.',
  'parchment',
  [
    { title: 'A Vontade Geral', estimatedMinutes: 22, content: `<h2>A Vontade Geral e a Soberania Popular</h2>
<p class="dropcap"><em>"L'homme est né libre, et partout il est dans les fers."</em> — O homem nasce livre, e em todo lugar está acorrentado. — Contrato Social, I, 1</p>
<blockquote><em>"Trouver une forme d'association qui défende et protège de toute la force commune la personne et les biens de chaque associé."</em><br/><small>Encontrar uma forma de associação que defenda e proteja com toda a força comum a pessoa e os bens de cada associado.</small> — Contrato Social, I, 6</blockquote>
<p>A vontade geral (volonté générale) é distinta da vontade de todos (volonté de tous): a vontade de todos é a soma dos interesses particulares; a vontade geral é o interesse comum que subsiste quando os interesses particulares se cancelam. A soberania é a expressão da vontade geral — é inalienável e indivisível.</p>
<p>O paradoxo rousseauísta: ao obedecer à lei que ele mesmo votou, o cidadão obedece a si mesmo — e portanto é livre. A lei não é uma restrição à liberdade, mas sua expressão superior. Esta ideia será central na filosofia do direito de Hegel e na teoria democrática contemporânea.</p>` },
  ],
  ['rousseau', 'democracia', 'liberdade', 'vontade geral', 'soberania']),

pd('kant-critique-pure', 'Crítica da Razão Pura', 'Crítica da Razão Pura — Kant', 'A revolução copernicana na filosofia: os limites e as condições do conhecimento',
  'Immanuel Kant (1724–1804)', 'Kritik der reinen Vernunft, 1781 (2ª ed. 1787)', '1781', 'Alemão', 1804,
  'Filosofia Moderna', 'Avançado', '15–20 horas',
  'A Crítica da Razão Pura é a obra mais importante da filosofia moderna. Kant propõe a "revolução copernicana": não conhecemos as coisas como são em si, mas apenas como nos aparecem, moldadas pelas estruturas a priori da nossa faculdade de conhecer.',
  'parchment',
  [
    { title: 'A Revolução Copernicana na Filosofia', estimatedMinutes: 28, content: `<h2>A Revolução Copernicana — O Sujeito Constitui o Objeto</h2>
<p class="dropcap">Até agora se supôs que todo o nosso conhecimento tinha que se regular pelos objetos... Se o conhecimento tem que se regular pelos objetos, não se compreende como poderíamos saber algo deles a priori. Façamos, pois, a tentativa de ver se nos sairemos melhor com os problemas da metafísica se admitirmos que os objetos têm que se regular pelo nosso conhecimento. — Crítica, Prefácio B xvi</p>
<blockquote><em>"Gedanken ohne Inhalt sind leer, Anschauungen ohne Begriffe sind blind."</em><br/><small>Pensamentos sem conteúdo são vazios; intuições sem conceitos são cegas.</small> — Crítica, A 51/B 75</blockquote>
<p>A intuição pura: espaço e tempo não são coisas no mundo — são as formas a priori da nossa sensibilidade, as molduras nas quais toda experiência é recebida. Portanto, a geometria (que estuda o espaço) e a aritmética (que estuda o tempo como número) são ciências a priori com validade objetiva — mas apenas para o mundo dos fenômenos.</p>
<p>Os conceitos puros do entendimento (categorias): substância, causalidade, necessidade etc. não são aprendidos da experiência — são estruturas do nosso entendimento que aplicamos à experiência para organizá-la. Daí a validade objetiva da causalidade: não descobrimos causalidade no mundo (Hume tinha razão), mas a impomos ao mundo.</p>` },
    { title: 'Os Limites da Razão e as Ideias da Razão', estimatedMinutes: 25, content: `<h2>Os Limites da Razão — Deus, Alma e Mundo</h2>
<p class="dropcap">A dialética transcendental mostra que a razão, ao tentar ultrapassar os limites da experiência possível, cai em contradições inevitáveis — as antinomias. Por isso a metafísica como ciência teórica é impossível.</p>
<blockquote><em>"Ich musste also das Wissen aufheben, um zum Glauben Platz zu bekommen."</em><br/><small>Tive de suprimir o saber para obter lugar para a fé.</small> — Crítica, Prefácio B xxx</blockquote>
<p>As três ideias da razão pura — Deus, alma, mundo como totalidade — não são conhecimentos, mas ideias regulativas. Não podemos provar nem refutar a existência de Deus ou a imortalidade da alma com a razão teórica. Mas o espaço vazio que a crítica cria pode ser preenchido pela fé moral — como Kant fará na Crítica da Razão Prática.</p>` },
  ],
  ['kant', 'conhecimento', 'categorias', 'fenômeno', 'crítica']),

pd('kant-groundwork', 'Fundamentos da Metafísica dos Costumes', 'Fundamentos da Metafísica dos Costumes — Kant', 'O imperativo categórico e a lei moral como autonomia da razão',
  'Immanuel Kant (1724–1804)', 'Grundlegung zur Metaphysik der Sitten, 1785', '1785', 'Alemão', 1804,
  'Filosofia Moral', 'Intermediário', '2–3 horas',
  'Os Fundamentos são a obra mais acessível de ética kantiana. Kant formula o imperativo categórico — a lei moral que vale para todo ser racional — e argumenta que a ética se funda na autonomia da razão, não em resultados ou sentimentos.',
  'parchment',
  [
    { title: 'A Boa Vontade e o Imperativo Categórico', estimatedMinutes: 22, content: `<h2>A Boa Vontade e o Imperativo Categórico</h2>
<p class="dropcap">Nada no mundo — e fora dele — pode ser pensado como absolutamente bom, excepto uma Boa Vontade. Inteligência, espírito, discernimento, coragem... todas estas qualidades são boas em muitas situações, mas podem ser usadas para fins maus. — Fundamentos, I</p>
<blockquote><em>"Handle nur nach derjenigen Maxime, durch die du zugleich wollen kannst, daß sie ein allgemeines Gesetz werde."</em><br/><small>Age apenas segundo uma máxima tal que possas ao mesmo tempo querer que ela se torne lei universal.</small> — Fundamentos, II, BA 52</blockquote>
<p>O imperativo categórico: imperativo porque obriga; categórico porque vale incondicionalmente, sem "se" (diferente dos imperativos hipotéticos: "se queres X, faz Y"). Uma ação é moralmente correta se e somente se sua máxima pode ser universalizada sem contradição.</p>
<p>A segunda formulação — "Age de tal modo que trates a humanidade, tanto na tua pessoa como na de qualquer outro, sempre e simultaneamente como fim, nunca meramente como meio" — expressa a dignidade incondicional de todo ser racional: não pode ser instrumentalizado para fins alheios.</p>
<p>A autonomia: a lei moral não vem de fora (de Deus, da natureza, da sociedade) — vem da própria razão prática. O ser racional é legislador de si mesmo. Esta é a fundação da dignidade humana e dos direitos humanos na tradição kantiana.</p>` },
  ],
  ['kant', 'imperativo categórico', 'dever', 'autonomia', 'moral']),

pd('hegel-phenomenology', 'Fenomenologia do Espírito', 'Fenomenologia do Espírito — Hegel', 'A jornada da consciência até o Saber Absoluto',
  'Georg Wilhelm Friedrich Hegel (1770–1831)', 'Phänomenologie des Geistes, 1807', '1807', 'Alemão', 1831,
  'Metafísica', 'Avançado', '15–20 horas',
  'A Fenomenologia do Espírito é o tour de force filosófico mais ambicioso da modernidade. Hegel traça o caminho da consciência desde a certeza sensível mais imediata até o Saber Absoluto — passando por dialética do senhor e escravo, consciência infeliz, razão, espírito e religião.',
  'parchment',
  [
    { title: 'Dialética do Senhor e do Escravo', estimatedMinutes: 30, content: `<h2>Dialética do Senhor e do Escravo</h2>
<p class="dropcap">A autoconsciência existe em e para si quando e porque existe em e para si para outra autoconsciência; isto é, ela existe somente na medida em que é reconhecida. — Fenomenologia, §178</p>
<blockquote><em>"Cada consciência persegue a morte da outra."</em> — Fenomenologia, §187</blockquote>
<p>O encontro de duas autoconscências: cada uma precisa ser reconhecida pela outra para se saber livre. O conflito é inevitável — um luta até a morte, o outro recua (medo da morte). Nasce a relação senhor-escravo: o senhor é reconhecido, mas pelo escravo — cujo reconhecimento não tem valor. O escravo não é reconhecido, mas trabalha — e pelo trabalho transforma o mundo e a si mesmo.</p>
<p>A inversão dialética: o senhor torna-se dependente do escravo (que produz) e do mundo (que consome). O escravo torna-se independente pelo trabalho — aprende a superar o medo da morte e a se reconhecer no produto de seu trabalho. A liberdade emerge do lado que parecia mais dependente. Marx lerá esta dialética como luta de classes.</p>` },
    { title: 'A Consciência Infeliz', estimatedMinutes: 25, content: `<h2>A Consciência Infeliz</h2>
<p class="dropcap">A consciência infeliz é a consciência que se vê dividida entre o imutável (o Infinito, Deus) e o mutável (o finito, o eu empírico). É a alma que busca o absoluto e sente a distância intransponível entre si e ele — a "consciência dilacerada".</p>
<blockquote><em>"Die unglückliche Bewußtsein ist... das Bewußtsein seiner als des gedoppelten, nur widersprechenden Wesens."</em><br/><small>A consciência infeliz é... a consciência de si como de uma essência duplicada, apenas contraditória.</small> — Fenomenologia, §206</blockquote>
<p>Hegel vê aqui a experiência religiosa medieval — a devoção cristã que se sente indigna da graça, que mortifica o corpo para elevar a alma, que entrega sua vontade a um mediador (padre, confessor). A consciência infeliz é a proto-fenomenologia da alienação religiosa — que Marx secularizará como alienação econômica.</p>` },
  ],
  ['hegel', 'dialética', 'senhor', 'escravo', 'consciência']),

pd('schopenhauer-world', 'O Mundo como Vontade e Representação', 'O Mundo como Vontade e Representação — Schopenhauer', 'O pessimismo metafísico: o sofrimento como essência da existência',
  'Arthur Schopenhauer (1788–1860)', 'Die Welt als Wille und Vorstellung, 1818', '1818', 'Alemão', 1860,
  'Metafísica', 'Avançado', '10–12 horas',
  'Schopenhauer propõe que a realidade em si (o noúmeno de Kant) é uma Vontade cega, irracional e insaciável. O mundo como representação é o véu de Maia. O sofrimento é constitutivo da existência. A saída: a negação da vontade pela arte, compaixão e ascetismo.',
  'parchment',
  [
    { title: 'O Mundo como Representação e como Vontade', estimatedMinutes: 28, content: `<h2>O Mundo como Representação e como Vontade</h2>
<p class="dropcap"><em>"Die Welt ist meine Vorstellung."</em> — O mundo é minha representação. Esta é uma verdade que vale para todo ser vivente e cognoscente. — O Mundo, I, §1</p>
<blockquote><em>"Das Ding an sich ist der Wille zum Leben."</em><br/><small>A coisa em si é a vontade de viver.</small></blockquote>
<p>Schopenhauer aceita a distinção kantiana fenômeno/noúmeno, mas vai além: o noúmeno não é incognoscível. Nós o conhecemos de dentro — como vontade. Quando levanto o braço, não vivo primeiro a causa e depois o efeito: o querer e o mover são um e o mesmo ato visto de dentro e de fora.</p>
<p>A Vontade é cega, irracional, sem propósito. Não é vontade de algo — é puro querer. Manifesta-se em todos os níveis da natureza: na gravidade, no crescimento das plantas, na sexualidade dos animais, na ambição dos humanos. O sofrimento é constitutivo: a Vontade nunca é satisfeita; quando um desejo é atendido, outro emerge.</p>
<p>O pêndulo da existência: entre sofrimento (quando o desejo não é satisfeito) e tédio (quando é). A felicidade é ausência temporária de sofrimento — não um estado positivo.</p>` },
    { title: 'A Negação da Vontade — Arte, Compaixão, Ascetismo', estimatedMinutes: 25, content: `<h2>Arte, Compaixão e Ascetismo — As Saídas</h2>
<p class="dropcap">Há três caminhos de alívio do sofrimento: a contemplação estética, a compaixão moral e a negação ascética da vontade.</p>
<blockquote><em>"A música não é a imagem das ideias, mas a imagem da vontade ela mesma."</em> — O Mundo, III, §52</blockquote>
<p>A arte: no contemplar estético, o sujeito transcende momentaneamente a Vontade — torna-se "puro sujeito do conhecimento", sem querer nada, vendo apenas a Forma. A música é a arte suprema — não imita a realidade, mas expressa diretamente a Vontade.</p>
<p>A compaixão: a ética de Schopenhauer se funda na identificação com o sofrimento alheio. A compaixão dissolve o egoísmo ao revelar que o sofredor e o compassivo são, no fundo, a mesma Vontade. É a versão filosófica do ahimsa budista.</p>
<p>O ascetismo: a negação definitiva da Vontade de viver — como nos santos e nos budistas. A castidade, o jejum, a mortificação não são patologias — são a mais alta afirmação da liberdade: a Vontade voltar-se contra si mesma e auto-anular-se.</p>` },
  ],
  ['schopenhauer', 'vontade', 'sofrimento', 'pessimismo', 'budismo']),


pd('nietzsche-zarathustra', 'Assim Falou Zaratustra', 'Assim Falou Zaratustra — Nietzsche', 'O Übermensch, o eterno retorno e a transvaloração de todos os valores',
  'Friedrich Nietzsche (1844–1900)', 'Also sprach Zarathustra, 1883–1885', '1883–1885', 'Alemão', 1900,
  'Existencialismo', 'Intermediário', '6–8 horas',
  'Zaratustra é a obra mais literária e profética de Nietzsche. Em forma de parábola, propõe os conceitos centrais de seu pensamento: a morte de Deus, o Übermensch (super-homem), a vontade de poder e o eterno retorno.',
  'parchment',
  [
    { title: 'Prólogo — A Morte de Deus e o Übermensch', estimatedMinutes: 25, content: `<h2>Prólogo de Zaratustra — A Morte de Deus</h2>
<p class="dropcap">Zaratustra deixou sua caverna nos montes após dez anos de solidão. Descendo ao mercado, encontrou um palhaço equilibrando-se sobre uma corda bamba — metáfora do ser humano entre o animal e o Übermensch. — Zaratustra, Prólogo</p>
<blockquote><em>"Ich lehre euch den Übermenschen. Der Mensch ist etwas, das überwunden werden soll."</em><br/><small>Eu vos ensino o super-homem. O homem é algo que deve ser superado.</small> — Zaratustra, Prólogo, §3</blockquote>
<p>O homem não é um fim, mas uma ponte — uma tensão entre o animal e o Übermensch. O Übermensch não é um ser sobrenatural, mas aquele que criou novos valores após a morte de Deus — que se autogoverna sem a muleta da metafísica ou da religião.</p>
<blockquote><em>"O que é o grande no homem é ser uma ponte, não um fim."</em> — Zaratustra, Prólogo, §4</blockquote>
<p>A morte de Deus não é um evento cronológico — é o colapso da ordem simbólica que fundamentava os valores ocidentais. Sem Deus, não há fundamento objetivo para o bem e o mal. O niilismo — a sensação de que nada tem sentido — é a consequência. O Übermensch é a resposta: não a restauração dos antigos valores, mas a criação de novos.</p>` },
    { title: 'O Eterno Retorno', estimatedMinutes: 22, content: `<h2>O Eterno Retorno do Mesmo</h2>
<p class="dropcap">O pensamento mais pesado: e se uma tarde ou uma noite um demônio se esgueirasse até ti na tua mais solitária solidão e dissesse: "Esta vida como a vives agora e como a viveste, terás de vivê-la mais uma vez e inumeráveis vezes mais." — A Gaia Ciência, §341</p>
<blockquote><em>"Dies ist mein letzter Wille, der lebt: schaffe, wer leidet!"</em><br/><small>Esta é minha última vontade: que crie, quem sofre!</small></blockquote>
<p>O eterno retorno não é uma tese cosmológica (o universo se repete literalmente) — é um imperativo existencial: vive de tal modo que desejes que tua vida se repita eternamente. É o teste supremo da amor fati — do amor ao destino. Aquele que ama sua vida sem reservas dirá "Sim" ao eterno retorno.</p>
<p>A relação com o niilismo: se Deus está morto e a vida não tem significado externo, o eterno retorno oferece um critério interno de valor — a afirmação incondicional da vida tal como é, sem escapismos ou ressentimentos.</p>` },
  ],
  ['nietzsche', 'übermensch', 'eterno retorno', 'morte de deus', 'valores']),

pd('nietzsche-beyond-good', 'Além do Bem e do Mal', 'Além do Bem e do Mal — Nietzsche', 'Crítica da filosofia dogmática e a vontade de poder como princípio do real',
  'Friedrich Nietzsche (1844–1900)', 'Jenseits von Gut und Böse, 1886', '1886', 'Alemão', 1900,
  'Existencialismo', 'Intermediário', '4–5 horas',
  'Além do Bem e do Mal é a obra sistemática mais importante de Nietzsche. Critica os filósofos dogmáticos (Platão, Kant) e propõe a vontade de poder como a verdade mais fundamental — a vida como expansão, criação, domínio.',
  'parchment',
  [
    { title: 'A Crítica dos Filósofos e a Vontade de Poder', estimatedMinutes: 22, content: `<h2>A Crítica dos Filósofos Dogmáticos</h2>
<p class="dropcap">A superstição dos filósofos: sua crença na oposição de valores — verdade vs. aparência, espírito vs. matéria, bem vs. mal. Nietzsche pergunta: e se estas oposições forem apenas ilusões? E se a "verdade" for apenas um tipo de erro útil para a conservação da vida? — Além do Bem e do Mal, §2</p>
<blockquote><em>"Der Wille zur Macht ist das Wesen des Lebens."</em><br/><small>A vontade de poder é a essência da vida.</small></blockquote>
<p>A vontade de poder não é desejo de dominação política — é o impulso fundamental de toda vida: crescer, expandir, superar-se a si mesmo. O artista, o filósofo, o santo — cada um manifesta vontade de poder em seu domínio específico. A morte (enquanto cessação de expansão) é a manifestação contrária.</p>
<p>A genealogia da moral: os valores de bondade, humildade, igualdade são, segundo Nietzsche, valores dos fracos disfarçados de virtudes universais. A "moral de rebanho" nega os valores aristocráticos de força, criatividade e excelência. A transvaloração de todos os valores é o projeto filosófico central de Nietzsche.</p>` },
  ],
  ['nietzsche', 'vontade de poder', 'moral', 'valores', 'crítica']),

pd('nietzsche-genealogy', 'Genealogia da Moral', 'Genealogia da Moral — Nietzsche', 'A história do bem e do mal como história do ressentimento',
  'Friedrich Nietzsche (1844–1900)', 'Zur Genealogie der Moral, 1887', '1887', 'Alemão', 1900,
  'Filosofia Moral', 'Intermediário', '3–4 horas',
  'A Genealogia da Moral é o texto mais rigoroso de Nietzsche. Em três ensaios, investiga a origem histórica dos valores morais: o ressentimento, a má consciência e os ideais ascéticos.',
  'parchment',
  [
    { title: 'O Ressentimento e a Moral dos Escravos', estimatedMinutes: 22, content: `<h2>O Ressentimento — A Origem da Moral dos Escravos</h2>
<p class="dropcap">A moral dos nobres é criativa — define o bem a partir de si mesma e posteriormente designa o mau como seu oposto. A moral dos escravos começa pelo não — diz "o mal" (o poderoso, o nobre) e deriva o "bom" (o fraco, o humilde) apenas como negação. — Genealogia, I, §10</p>
<blockquote><em>"Das Ressentiment selbst, wenn es schöpferisch wird, Werte gebiert..."</em><br/><small>O ressentimento, ao tornar-se criativo, gera valores...</small> — Genealogia, I, §10</blockquote>
<p>O ressentimento: os fracos, incapazes de agir diretamente, transferem sua impotência para uma imaginária vingança — "Deus punirá os poderosos". A promessa do céu como compensação pelo sofrimento terreno. A beatitude dos humildes como inversão dos valores aristocráticos.</p>
<p>A má consciência (segundo ensaio): o instinto de crueldade, bloqueado pela civilização, volta-se para dentro. O arrependimento, a culpa, a autopunição — são crueldade introjetada. A dívida com Deus (pecado original) é a expressão religiosa da má consciência.</p>
<p>Os ideais ascéticos (terceiro ensaio): por que a filosofia e a religião elogiam a renúncia, o celibato, a pobreza? Porque dão sentido ao sofrimento. "Não é o sofrimento que os homens recusam — é o sofrimento sem sentido." O niilismo é menos terrível que o absurdo.</p>` },
  ],
  ['nietzsche', 'moral', 'ressentimento', 'valores', 'genealogia']),

pd('kierkegaard-fear-trembling', 'Temor e Tremor', 'Temor e Tremor — Kierkegaard', 'Abraão e o salto da fé — a suspensão teleológica do ético',
  'Søren Kierkegaard (1813–1855)', 'Frygt og Bæven, 1843', '1843', 'Dinamarquês', 1855,
  'Existencialismo', 'Avançado', '3–4 horas',
  'Temor e Tremor medita sobre o episódio bíblico de Abraão e o sacrifício de Isaque. Kierkegaard propõe que a fé é um paradoxo irracional que vai além da ética — o "cavaleiro da fé" suspende o universal ético por uma relação absoluta com o Absoluto.',
  'parchment',
  [
    { title: 'Abraão — O Cavaleiro da Fé', estimatedMinutes: 25, content: `<h2>Abraão — O Cavaleiro da Fé</h2>
<p class="dropcap">Abraão é ordenado por Deus a sacrificar seu filho Isaque — o único filho, através de quem a promessa de descendência seria cumprida. Abraão obedece. Mas no último momento, Deus intervém. Kierkegaard pergunta: o que Abraão estava fazendo? — Temor e Tremor, Prelúdio</p>
<blockquote><em>"A angústia é a vertigem da liberdade."</em> — O Conceito de Angústia</blockquote>
<p>Três estágios da existência: o estético (busca do prazer e da autorrealização), o ético (submissão ao universal moral), o religioso (relação absoluta com o Absoluto). Abraão não é um herói trágico — que sacrificaria Isaque por um bem maior compreensível (salvar o povo, por exemplo). Abraão sacrifica Isaque por nenhuma razão ética — somente pela fé.</p>
<p>A "suspensão teleológica do ético": a fé coloca o indivíduo acima do universal ético. O cavaleiro da fé age por uma relação absolutamente privada e incompreensível com Deus. Esta é a grandeza e o terror de Abraão: não pode explicar o que faz. Se explicasse, seria compreendido — e não seria fé.</p>
<p>O paradoxo da fé: "pela fé, Abraão não renunciou a Isaque, mas pela fé Abraão recebeu Isaque de volta." A fé não é resignação — é um movimento duplo: primeiro a resignação infinita (aceitar a perda), depois a fé (receber de volta o perdido pelo absurdo).</p>` },
  ],
  ['kierkegaard', 'abraão', 'fé', 'ética', 'paradoxo']),

pd('kierkegaard-anxiety', 'O Conceito de Angústia', 'O Conceito de Angústia — Kierkegaard', 'A angústia como vertigem da liberdade e a possibilidade do pecado',
  'Søren Kierkegaard (1813–1855)', 'Begrebet Angest, 1844', '1844', 'Dinamarquês', 1855,
  'Existencialismo', 'Intermediário', '3–4 horas',
  'O Conceito de Angústia é a mais psicológica das obras de Kierkegaard. A angústia não é medo de algo determinado — é o vértigo diante da liberdade. É a condição humana diante da possibilidade: podemos fazer tudo, mas isso é exatamente o que nos aterroriza.',
  'parchment',
  [
    { title: 'A Angústia como Vertigem da Liberdade', estimatedMinutes: 22, content: `<h2>A Angústia — Vertigem da Liberdade</h2>
<p class="dropcap">Angústia pode ser comparada à vertigem. Aquele cujos olhos mergulham no abismo tonteia. Mas o que é a vertigem? É tanto a fraqueza dos olhos quanto a do abismo. Assim é a angústia: a vertigem da liberdade que surge quando o espírito quer pôr a síntese, e a liberdade então olha para a sua própria possibilidade. — Conceito de Angústia, IV</p>
<blockquote><em>"Angst ist die Schwindel der Freiheit."</em><br/><small>Angústia é a vertigem da liberdade.</small></blockquote>
<p>A angústia precede o pecado: não é culpa (que pressupõe ação), mas a condição da possibilidade do pecado. Adão antes da queda não sabe o que é o bem e o mal — mas a proibição cria a possibilidade da transgressão, e esta possibilidade produz a angústia.</p>
<p>A angústia não é neurose — é a marca da espiritualidade. O animal não tem angústia (não tem liberdade real). O humano tem porque pode escolher. A angústia é o preço da liberdade — e somente quem suporta a angústia (em vez de fugir para o imediato, o hábito, a religiosidade superficial) está em condições de alcançar a fé.</p>` },
  ],
  ['kierkegaard', 'angústia', 'liberdade', 'possibilidade', 'pecado']),

pd('mill-utilitarianism', 'Utilitarismo', 'Utilitarismo — John Stuart Mill', 'O maior bem para o maior número — a ética consequencialista',
  'John Stuart Mill (1806–1873)', 'Utilitarianism, 1863', '1863', 'Inglês', 1873,
  'Filosofia Moral', 'Iniciante', '1–2 horas',
  'O Utilitarismo de Mill é a formulação mais influente do consequencialismo moral. A ação correta é aquela que maximiza a felicidade (utilidade) do maior número de pessoas. Mill refina o utilitarismo de Bentham distinguindo prazeres superiores e inferiores.',
  'parchment',
  [
    { title: 'O Princípio da Utilidade', estimatedMinutes: 18, content: `<h2>O Princípio da Maior Felicidade</h2>
<p class="dropcap">O credo que aceita a Utilidade ou o Princípio da Maior Felicidade como fundamento da moral sustenta que as ações são corretas na proporção em que tendem a promover a felicidade; erradas na proporção em que tendem a produzir o oposto da felicidade. — Utilitarismo, II</p>
<blockquote><em>"It is better to be Socrates dissatisfied than a fool satisfied."</em><br/><small>É melhor ser Sócrates insatisfeito do que um tolo satisfeito.</small> — Utilitarismo, II</blockquote>
<p>Mill refina Bentham: não só a quantidade de prazer importa, mas a qualidade. Prazeres intelectuais e morais são superiores aos prazeres físicos — quem os experimentou não trocaria uns pelos outros. Assim, o utilitarismo não é um hedonismo grosseiro, mas inclui valores culturais e espirituais.</p>
<p>A prova da utilidade: Mill argumenta que a única evidência de que algo é desejável é que as pessoas o desejam. O desejo universal por felicidade é a evidência de que a felicidade é um bem. Críticos (G.E. Moore) verão aqui uma falácia naturalista: do fato de que algo é desejado não se segue que deve ser desejado.</p>` },
  ],
  ['mill', 'utilitarismo', 'felicidade', 'ética', 'consequencialismo']),

pd('mill-liberty', 'Sobre a Liberdade', 'Sobre a Liberdade — John Stuart Mill', 'O princípio do dano e os limites da autoridade sobre o indivíduo',
  'John Stuart Mill (1806–1873)', 'On Liberty, 1859', '1859', 'Inglês', 1873,
  'Filosofia Política', 'Iniciante', '2–3 horas',
  'On Liberty é o clássico liberal de Mill: o Estado (e a sociedade) só pode interferir na liberdade individual para prevenir dano a outros. A diversidade de modos de vida é um bem em si mesmo.',
  'parchment',
  [
    { title: 'O Princípio do Dano', estimatedMinutes: 20, content: `<h2>O Princípio do Dano</h2>
<p class="dropcap">O único propósito pelo qual o poder pode ser corretamente exercido sobre qualquer membro de uma comunidade civilizada, contra sua vontade, é prevenir dano a outros. A vontade do próprio indivíduo, seja física, moral ou intelectual, não é uma justificativa suficiente. — Sobre a Liberdade, I</p>
<blockquote><em>"The only freedom which deserves the name, is that of pursuing our own good in our own way, so long as we do not attempt to deprive others of theirs."</em><br/><small>A única liberdade que merece o nome é a de buscar nosso próprio bem a nosso próprio modo, desde que não tentemos privar os outros do seu.</small></blockquote>
<p>A liberdade de pensamento e expressão: mesmo opiniões erradas devem ser toleradas — pois a certeza de que estamos certos pode ser equivocada, e a verdade emerge do conflito de ideias. A censura presume infabilidade. Além disso, mesmo uma verdade não contestada se torna uma crença morta — não uma verdade vivida.</p>
<p>O experimento de vida: a diversidade de caráter e modo de vida enriquece o tecido social. A uniformidade produzida pela pressão social ("tirania da opinião") é tão perigosa quanto a tirania legal. Mill defende o direito à excentricidade — ao estilo de vida não convencional — como condição do progresso humano.</p>` },
  ],
  ['mill', 'liberdade', 'liberalismo', 'censura', 'princípio do dano']),

pd('pascal-pensees', 'Pensamentos', 'Pensamentos — Pascal', 'O coração tem razões que a razão desconhece — apologética e existência',
  'Blaise Pascal (1623–1662)', 'Pensées, 1670 (póstumo)', '1670', 'Francês', 1662,
  'Filosofia Cristã', 'Iniciante', '4–5 horas',
  'Os Pensamentos de Pascal são fragmentos de uma apologética do cristianismo nunca concluída. Contêm reflexões profundas sobre a condição humana, a razão e o coração, e a famosa "aposta de Pascal".',
  'parchment',
  [
    { title: 'O Coração e a Miséria do Homem', estimatedMinutes: 22, content: `<h2>A Miséria do Homem sem Deus</h2>
<p class="dropcap">O homem não é senão um junco, o mais fraco da natureza; mas é um junco pensante. Não é preciso que o universo inteiro se arme para esmagá-lo: um vapor, uma gota d'água basta para matá-lo. Mas mesmo que o universo o esmagasse, o homem seria ainda mais nobre do que o que o mata, porque sabe que morre. — Pensamentos, §347</p>
<blockquote><em>"Le cœur a ses raisons que la raison ne connaît point."</em><br/><small>O coração tem razões que a razão desconhece.</small> — Pensamentos, §277</blockquote>
<p>Pascal diagnostica a condição humana: o homem é uma mistura de grandeza e miséria. Sua grandeza: é um animal pensante, capaz de conceber o infinito. Sua miséria: é mortal, limitado, cheio de contradições, incapaz de encontrar repouso.</p>
<p>O divertissement (divertimento): os homens fogem de si mesmos pela ocupação incessante — caça, jogos, conversas fúteis. Não porque o divertimento os torne felizes, mas porque os impede de pensar em sua condição. A solidão é insuportável — e no entanto é o único lugar onde a verdade pode ser encontrada.</p>` },
    { title: 'A Aposta de Pascal', estimatedMinutes: 18, content: `<h2>A Aposta de Pascal</h2>
<p class="dropcap">Deus existe ou não existe. Para qual lado nos inclinaremos? A razão não pode decidir nada. Há um caos infinito que nos separa. Uma aposta se joga na extremidade desta distância infinita. — Pensamentos, §233</p>
<blockquote><em>"Si vous gagnez, vous gagnez tout; si vous perdez, vous ne perdez rien."</em><br/><small>Se ganhardes, ganhareis tudo; se perderdes, não perderdes nada.</small> — Pensamentos, §233</blockquote>
<p>O argumento: dado que a existência de Deus é uma questão indecidível pela razão, devemos usar o cálculo de probabilidade. Se Deus existe e acreditarmos: ganho infinito (salvação). Se Deus não existe e acreditarmos: perco apenas alguns prazeres mundanos (finito). Conclusão: é racional apostar em Deus.</p>
<p>Objeções clássicas: (1) E se o Deus errado? (2) A crença não pode ser escolhida por cálculo. Pascal responde à segunda: aja como se acreditasse — vá à missa, reze, pratique. Os hábitos moldarão a crença. "Isso vos tornará crente e vos embrutecerá" (no bom sentido: tornará a fé natural, não forçada).</p>` },
  ],
  ['pascal', 'fé', 'razão', 'aposta', 'condição humana']),

pd('berkeley-principles', 'Princípios do Conhecimento Humano', 'Princípios do Conhecimento Humano — Berkeley', 'O idealismo imaterialista: esse est percipi',
  'George Berkeley (1685–1753)', 'A Treatise Concerning the Principles of Human Knowledge, 1710', '1710', 'Inglês', 1753,
  'Filosofia Moderna', 'Avançado', '3–4 horas',
  'Berkeley propõe o idealismo imaterialista: não existem objetos materiais independentes da mente. "Existir é ser percebido" (esse est percipi). A matéria de Locke e Newton é uma ficção filosófica.',
  'parchment',
  [
    { title: 'Esse Est Percipi — Existir é Ser Percebido', estimatedMinutes: 22, content: `<h2>Esse Est Percipi — Existir é Ser Percebido</h2>
<p class="dropcap">É evidente para qualquer um que examinar os objetos do conhecimento humano que eles são ideias, quer impressas nos sentidos, quer percebidas ao atender às paixões e operações da mente, quer finalmente formadas com a ajuda da memória e imaginação. — Princípios, §1</p>
<blockquote><em>"Esse est percipi aut percipere."</em><br/><small>Existir é ser percebido ou perceber.</small> — Princípios, §3</blockquote>
<p>O argumento de Berkeley: nossas ideias são imediatamente conhecidas. O que chamamos de "matéria" é apenas um conjunto de ideias. A ideia de uma "substância material" que seria distinta e subjacente às nossas percepções é uma ideia incoerente — nunca percebemos a "matéria", apenas qualidades.</p>
<p>O problema: se existir é ser percebido, a mesa deixa de existir quando ninguém está no quarto? Berkeley responde: Deus percebe todas as coisas continuamente. Deus é a mente infinita que garante a continuidade e regularidade da experiência. O imaterialismo de Berkeley é, paradoxalmente, uma apologética cristã.</p>` },
  ],
  ['berkeley', 'idealismo', 'percepção', 'imaterialismo', 'deus']),

pd('bacon-novum-organum', 'Novum Organum', 'Novum Organum — Francis Bacon', 'O método indutivo e a crítica dos ídolos do pensamento',
  'Francis Bacon (1561–1626)', 'Novum Organum Scientiarum, 1620', '1620', 'Latim', 1626,
  'Filosofia Moderna', 'Intermediário', '4–5 horas',
  'O Novum Organum é o manifesto da ciência experimental moderna. Bacon critica o silogismo aristotélico e propõe a indução como método. Identifica quatro "ídolos" — preconceitos que distorcem o pensamento humano.',
  'parchment',
  [
    { title: 'Os Quatro Ídolos do Pensamento', estimatedMinutes: 22, content: `<h2>Os Quatro Ídolos — Preconceitos da Razão Humana</h2>
<p class="dropcap">O conhecimento humano e o poder humano coincidem: onde a causa é ignorada, o efeito não pode ser produzido. A natureza só é dominada quando é obedecida. — Novum Organum, I, 3</p>
<blockquote><em>"Idola Tribus... Idola Specus... Idola Fori... Idola Theatri."</em><br/><small>Ídolos da Tribo... da Caverna... do Foro... do Teatro.</small> — Novum Organum, I, 39–44</blockquote>
<p>Ídolos da Tribo: erros inerentes à natureza humana em geral — como a tendência a generalizar a partir de poucos casos, ou a selecionar evidências que confirmam nossas crenças (viés de confirmação). Ídolos da Caverna: preconceitos individuais — cada pessoa tem uma "caverna" de experiências, educação e temperamento que distorce sua visão. Ídolos do Foro: erros produzidos pela linguagem — palavras que designam coisas inexistentes ou que são vagas demais. Ídolos do Teatro: falsas filosofias — sistemas filosóficos que são como peças de teatro, plausíveis mas desconectados da realidade.</p>
<p>O método indutivo: em vez de partir de axiomas gerais e deduzir conclusões (como Aristóteles), deve-se partir de observações particulares, acumular fatos, e ascender gradualmente a princípios cada vez mais gerais. A ciência deve ser uma colmeia — nem abelha que transforma tudo no próprio mel (racionalismo), nem formiga que apenas acumula (empirismo bruto), mas síntese das duas.</p>` },
  ],
  ['bacon', 'ídolos', 'método', 'indução', 'ciência']),

pd('machiavelli-prince', 'O Príncipe', 'O Príncipe — Maquiavel', 'A política como técnica do poder — o fundador do pensamento político moderno',
  'Niccolò Machiavelli (1469–1527)', 'Il Principe, escrito c. 1513, publicado 1532', '1532', 'Italiano', 1527,
  'Filosofia Política', 'Iniciante', '2–3 horas',
  'O Príncipe é o texto fundador da ciência política moderna. Maquiavel separa a política da moral e da religião, analisando o poder como ele é, não como deveria ser. A virtú, a fortuna e a necessidade são seus conceitos centrais.',
  'parchment',
  [
    { title: 'Virtú, Fortuna e Necessidade', estimatedMinutes: 22, content: `<h2>Virtú, Fortuna e Necessidade</h2>
<p class="dropcap">Muitos imaginaram repúblicas e principados que nunca foram vistos nem conhecidos como realmente existentes; pois há tanta distância entre como se vive e como se deveria viver, que quem abandona o que se faz pelo que se deveria fazer aprende mais a arruinar-se do que a conservar-se. — O Príncipe, XV</p>
<blockquote><em>"È meglio essere impetuoso che rispettivo, perché la fortuna è donna."</em><br/><small>É melhor ser impetuoso que respeitoso, porque a fortuna é mulher.</small> — O Príncipe, XXV</blockquote>
<p>Virtú (não virtude moral, mas excelência técnica no exercício do poder): a capacidade de usar todos os meios disponíveis — força e astúcia, leão e raposa — para atingir os fins políticos. O príncipe virtuoso é aquele que se adapta às circunstâncias (fortuna) com máxima eficácia.</p>
<p>A famosa questão do capítulo XVII: é melhor ser amado ou temido? Maquiavel responde: os dois, mas se tiver que escolher, é mais seguro ser temido. O amor é voluntário — pode ser retirado quando o interesse do povo muda. O medo depende do príncipe — pode ser mantido. Mas é necessário não ser odiado, o que significa não tocar nos bens e nas mulheres do povo.</p>` },
  ],
  ['maquiavel', 'poder', 'política', 'príncipe', 'virtù']),

pd('thomas-more-utopia', 'Utopia', 'Utopia — Thomas More', 'A ilha perfeita onde não existe propriedade privada — o nascimento da palavra "utopia"',
  'Thomas More (1478–1535)', 'De optimo reipublicae statu deque nova insula Utopia, 1516', '1516', 'Latim', 1535,
  'Filosofia Política', 'Iniciante', '2–3 horas',
  'A Utopia de Thomas More criou uma palavra — e um gênero literário. A ilha imaginária de Utopia não tem propriedade privada, tem jornada de trabalho de 6 horas, tolerância religiosa e igualdade entre homens e mulheres. Crítica velada da Inglaterra dos Tudors.',
  'parchment',
  [
    { title: 'A Ilha de Utopia', estimatedMinutes: 20, content: `<h2>A Ilha de Utopia — "Em nenhum lugar"</h2>
<p class="dropcap">O nome "Utopia" combina o grego ou (não) e topos (lugar) — "em lugar nenhum". More joga com oikia (boa) e eu (bom): utopia é também "lugar nenhum bom" e "lugar bom nenhum". A ambiguidade é deliberada: a sociedade perfeita pode não existir.</p>
<blockquote><em>"Prima facie recte constitutas respublicas... Quid aliud est nisi conspiratio divitum?"</em><br/><small>O que é um Estado bem ordenado... senão uma conspiração dos ricos?</small> — Utopia, II</blockquote>
<p>Em Utopia: todos trabalham 6 horas por dia; o resto é dedicado ao lazer e às artes. Não existe propriedade privada — tudo é comunitário. Não existem pobres nem ricos. A tolerância religiosa é obrigatória (exceto para os ateus, paradoxalmente). As mulheres podem ser sacerdotisas. A guerra é evitada ao máximo — e quando necessária, usa mercenários.</p>
<p>A ironia de More: Utopia é uma sociedade pagã mais racional e justa que a cristandade europeia. A crítica implícita é devastadora: a propriedade privada e a desigualdade são os males fundamentais da sociedade europeia — e não há reforma possível dentro dela.</p>` },
  ],
  ['utopia', 'thomas more', 'comunismo', 'política', 'renascimento']),

pd('montaigne-essays', 'Ensaios', 'Ensaios — Montaigne', 'O eu como laboratório filosófico — o fundador do ensaio moderno',
  'Michel de Montaigne (1533–1592)', 'Essais, 1580–1588', '1580–1588', 'Francês', 1592,
  'Filosofia Clássica', 'Iniciante', '6–8 horas',
  'Os Ensaios de Montaigne inauguram o ensaio como gênero e a autoanálise como método filosófico. "Que sais-je?" (O que sei eu?) é seu lema. A própria experiência pessoal — com seus preconceitos, contradições e limitações — é o material da filosofia.',
  'parchment',
  [
    { title: 'Que Sais-Je? O Ceticismo de Montaigne', estimatedMinutes: 20, content: `<h2>Que Sais-Je? — O Ceticismo Humanista</h2>
<p class="dropcap">Cada homem traz em si a forma inteira da condição humana. — Ensaios, III, 2</p>
<blockquote><em>"Que sais-je?"</em><br/><small>O que sei eu?</small> — Lema de Montaigne (Ensaios, II, 12)</blockquote>
<p>O método de Montaigne é radicalmente pessoal: "Eu sou minha própria matéria." Os Ensaios não são tratados sistemáticos — são explorações do eu, com todas suas contradições, incertezas e mudanças. O eu que escreve no segundo capítulo pode contradizer o do primeiro — e isso é honesto.</p>
<p>O ensaio "Que sais-je?" (Da Apologia de Ramon Sebond) apresenta o ceticismo mais radical de Montaigne: uma coleta exaustiva de evidências de que o conhecimento humano é incerto, os costumes são relativos, e a razão não pode se fundar a si mesma. Mas Montaigne não é um cético paralisante — é um cético que aprende a viver bem com a incerteza.</p>
<p>A diversidade dos costumes: Montaigne é um dos primeiros pensadores europeus a tratar os costumes não-europeus (canibais, índios americanos) sem horror moral automático. Sua relativização dos costumes é antecipação do relativismo cultural moderno — e uma crítica indireta às guerras religiosas europeias.</p>` },
  ],
  ['montaigne', 'ceticismo', 'ensaio', 'relativismo', 'humanismo']),

pd('james-pragmatism', 'Pragmatismo', 'Pragmatismo — William James', 'A verdade como aquilo que funciona — o método filosófico americano',
  'William James (1842–1910)', 'Pragmatism: A New Name for Some Old Ways of Thinking, 1907', '1907', 'Inglês', 1910,
  'Filosofia Contemporânea', 'Iniciante', '3–4 horas',
  'O Pragmatismo de William James apresenta o método pragmático: a diferença entre duas teorias só é real se produz diferença prática. A verdade não é correspondência com a realidade — é o que funciona, o que satisfaz as exigências da experiência.',
  'parchment',
  [
    { title: 'O Método Pragmático', estimatedMinutes: 20, content: `<h2>O Método Pragmático</h2>
<p class="dropcap">O pragmatismo é primeiro um método, e depois uma teoria genética sobre o que conta como verdade. O método consiste, essencialmente, em tentar interpretar cada noção rastreando suas consequências práticas respectivas. — Pragmatismo, II</p>
<blockquote><em>"The true is the name of whatever proves itself to be good in the way of belief."</em><br/><small>O verdadeiro é o nome do que prova ser bom no modo de crença.</small> — Pragmatismo, VI</blockquote>
<p>James apresenta o pragmatismo através de um exemplo: a disputa sobre se um homem que persegue um esquilo ao redor de uma árvore "rodeia" o esquilo. Depende do que se quer dizer com "rodear". O método pragmático: identifica as diferenças práticas — se não há diferença prática, a disputa é verbal.</p>
<p>A teoria pragmática da verdade: uma ideia é verdadeira se "trabalha" — se nos permite agir efetivamente, se concilia com outras crenças, se satisfaz. A verdade não é estática — é um processo. As ideias tornam-se verdadeiras enquanto nos ajudam a nos relacionar com partes da experiência.</p>` },
  ],
  ['pragmatismo', 'verdade', 'método', 'james', 'experiência']),

pd('bergson-creative-evolution', 'A Evolução Criadora', 'A Evolução Criadora — Bergson', 'O élan vital e a crítica do mecanicismo — vida como criação pura',
  'Henri Bergson (1859–1941)', "L'Évolution Créatrice, 1907", '1907', 'Francês', 1941,
  'Filosofia Contemporânea', 'Avançado', '6–8 horas',
  'A Evolução Criadora é a obra principal de Bergson. Propõe o "élan vital" (impulso vital) como força criadora da evolução, critica o mecanicismo darwiniano e o finalismo, e argumenta que a inteligência é inadequada para compreender a vida e o tempo real (durée).',
  'parchment',
  [
    { title: 'O Élan Vital e a Durée', estimatedMinutes: 25, content: `<h2>O Élan Vital e o Tempo Real</h2>
<p class="dropcap">A vida é mobilidade — não uma soma de estados, mas uma melodia contínua que não pode ser dividida sem perder sua natureza. O tempo real (durée) não é o tempo dos relógios — é a experiência interior da duração, onde passado e presente se interpenetram. — Evolução Criadora, I</p>
<blockquote><em>"La vie est une action, et la conscience en est le reflet."</em><br/><small>A vida é uma ação, e a consciência é seu reflexo.</small> — Evolução Criadora</blockquote>
<p>O élan vital: a evolução não é um mecanismo cego (Darwin) nem um plano finalístico pré-determinado (criacionismo). É um impulso criador que se bifurca em novas formas ao encontrar obstáculos — como uma mão que penetra na areia e se divide em dedos. A criação é real — o futuro não está contido no passado.</p>
<p>A crítica da inteligência: a inteligência humana, formada pela ação sobre a matéria, é naturalmente espacializante — representa o movimento como série de posições estáticas, o tempo como linha. Para compreender a vida e o tempo real, é necessária a intuição — que consiste em coincidir com a mobilidade da vida de dentro.</p>` },
  ],
  ['bergson', 'vida', 'tempo', 'evolução', 'intuição']),

pd('peirce-writings', 'Como Tornar Nossas Ideias Claras', 'Como Tornar Nossas Ideias Claras — Peirce', 'O fundador do pragmatismo e a lógica dos signos',
  'Charles Sanders Peirce (1839–1914)', 'How to Make Our Ideas Clear, 1878', '1878', 'Inglês', 1914,
  'Filosofia Contemporânea', 'Intermediário', '1–2 horas',
  'Este ensaio de Peirce é o texto fundador do pragmatismo americano. Propõe a máxima pragmática: o significado de qualquer conceito é determinado pelas diferenças práticas que sua aplicação produziria.',
  'parchment',
  [
    { title: 'A Máxima Pragmática', estimatedMinutes: 15, content: `<h2>A Máxima Pragmática de Peirce</h2>
<p class="dropcap">Considere que efeitos, que poderiam concebivelmente ter consequências práticas, concebemos que o objeto de nossa concepção tem. Então, nossa concepção desses efeitos é a totalidade de nossa concepção do objeto. — Como Tornar Nossas Ideias Claras, §7</p>
<blockquote><em>"The whole function of thought is to produce habits of action."</em><br/><small>Toda a função do pensamento é produzir hábitos de ação.</small></blockquote>
<p>Peirce distingue três graus de clareza: (1) clareza de uso (saber usar a palavra); (2) clareza de definição (saber defini-la); (3) clareza pragmática (saber quais diferenças práticas decorreram de sua aplicação). A maioria das disputas filosóficas fica no segundo nível — Peirce quer elevar ao terceiro.</p>
<p>A semiótica de Peirce: signo, objeto e interpretante. O signo não é apenas uma palavra — é qualquer coisa que represente outra coisa para alguém. A semiose é um processo potencialmente infinito de interpretação. Esta teoria influenciou profundamente a filosofia da linguagem, a linguística (Saussure) e a teoria da comunicação do século XX.</p>` },
  ],
  ['peirce', 'pragmatismo', 'signos', 'semiótica', 'hábito']),

pd('dewey-experience-education', 'Experiência e Educação', 'Experiência e Educação — John Dewey', 'A filosofia da educação como reconstrução da experiência',
  'John Dewey (1859–1952)', 'Experience and Education, 1938', '1938', 'Inglês', 1952,
  'Filosofia Contemporânea', 'Iniciante', '2–3 horas',
  'Dewey critica tanto a educação tradicional quanto a educação progressista mal compreendida. Propõe a educação como crescimento — a reconstrução contínua da experiência que amplia o controle humano sobre o mundo.',
  'parchment',
  [
    { title: 'Experiência e Crescimento', estimatedMinutes: 18, content: `<h2>Experiência como Base da Educação</h2>
<p class="dropcap">A questão central na educação baseada na experiência é selecionar o tipo de experiências presentes que vivem frutíferamente e criativamente nas experiências subsequentes. — Experiência e Educação, I</p>
<blockquote><em>"Education is not preparation for life; education is life itself."</em><br/><small>A educação não é preparação para a vida; a educação é a própria vida.</small></blockquote>
<p>Dewey critica a educação tradicional (transmissão de um corpo fixo de conhecimentos) e a progressista ingênua (qualquer experiência é boa, qualquer preferência do aluno é válida). A educação genuína baseia-se em experiências de qualidade: aquelas que criam conexões, ampliam o horizonte e abrem novas possibilidades de experiência.</p>
<p>O critério: uma experiência educativa amplia a capacidade de ter experiências futuras mais ricas. Uma experiência des-educativa é aquela que embota a sensibilidade, cria hábitos rígidos ou distorce o crescimento.</p>` },
  ],
  ['dewey', 'educação', 'experiência', 'crescimento', 'pragmatismo']),

pd('wittgenstein-tractatus', 'Tractatus Logico-Philosophicus', 'Tractatus Logico-Philosophicus — Wittgenstein', 'Os limites da linguagem e o mundo como totalidade dos fatos',
  'Ludwig Wittgenstein (1889–1951)', 'Tractatus Logico-Philosophicus, 1921', '1921', 'Alemão', 1951,
  'Filosofia Contemporânea', 'Avançado', '3–4 horas',
  'O Tractatus é uma das obras mais influentes da filosofia analítica. Wittgenstein propõe que o mundo é a totalidade dos fatos, que a linguagem é uma imagem lógica da realidade, e que o que não pode ser dito deve ser silenciado.',
  'parchment',
  [{ title: 'O Mundo e a Linguagem', estimatedMinutes: 25, content: `<h2>O Mundo como Totalidade dos Fatos</h2>
<p class="dropcap">O mundo é tudo o que é o caso. O mundo é a totalidade dos fatos, não das coisas. Os fatos no espaço lógico são o mundo. — Tractatus, 1–1.13</p>
<blockquote><em>"Die Grenzen meiner Sprache bedeuten die Grenzen meiner Welt."</em><br/><small>Os limites da minha linguagem significam os limites do meu mundo.</small> — Tractatus, 5.6</blockquote>
<p>A teoria pictórica da linguagem: uma proposição é uma imagem lógica de um fato. Assim como uma fotografia representa um arranjo de objetos, uma proposição representa um arranjo de elementos no mundo. A forma lógica é partilhada pelo pensamento, pela linguagem e pela realidade.</p>
<p>A conclusão do Tractatus é paradoxal: as próprias proposições do livro são sem sentido — escadas que devem ser descartadas após a subida. "Sobre o que não se pode falar, deve-se calar" — esta última proposição aponta para o místico: os valores éticos, estéticos e religiosos não podem ser ditos, apenas mostrados.</p>` }],
  ['wittgenstein', 'linguagem', 'lógica', 'silêncio', 'analítica']),

pd('russell-problems-philosophy', 'Os Problemas da Filosofia', 'Os Problemas da Filosofia — Bertrand Russell', 'Introdução à epistemologia e à questão da matéria e percepção',
  'Bertrand Russell (1872–1970)', 'The Problems of Philosophy, 1912', '1912', 'Inglês', 1970,
  'Filosofia Contemporânea', 'Iniciante', '3–4 horas',
  'Russell examina o problema clássico da percepção e a distinção entre aparência e realidade. É uma das melhores introduções à epistemologia filosófica do século XX.',
  'parchment',
  [{ title: 'Aparência, Realidade e Conhecimento', estimatedMinutes: 20, content: `<h2>Aparência e Realidade</h2>
<p class="dropcap">Existe alguma coisa no mundo de que podemos saber? Esta pergunta deceptivamente simples é o ponto de partida de toda filosofia genuína. — Os Problemas da Filosofia, cap. I</p>
<blockquote><em>"The man who has no tincture of philosophy goes through life imprisoned in the prejudices derived from common sense."</em><br/><small>O homem que não tem nenhum toque de filosofia atravessa a vida prisioneiro dos preconceitos derivados do senso comum.</small></blockquote>
<p>Russell distingue dados dos sentidos (sense-data) — as cores, sons e texturas imediatos — da matéria física que os causa. A mesa que vejo parece diferente de ângulos diferentes; qual é sua cor "real"? A física diz que a mesa é principalmente espaço vazio com partículas — nada como o que vejo. Assim, matéria e aparência divergem radicalmente.</p>
<p>O problema da indução: por que acreditar que o sol nascerá amanhã? Porque sempre nasceu no passado — mas isso assume que o futuro se assemelhará ao passado, que é exatamente o que precisamos provar. Russell mostra que a indução não pode ser justificada logicamente; é um princípio fundamental que assumimos.</p>` }],
  ['russell', 'epistemologia', 'percepção', 'indução', 'analítica']),

pd('frege-foundations-arithmetic', 'Os Fundamentos da Aritmética', 'Os Fundamentos da Aritmética — Gottlob Frege', 'A origem lógica do conceito de número',
  'Gottlob Frege (1848–1925)', 'Die Grundlagen der Arithmetik, 1884', '1884', 'Alemão', 1925,
  'Filosofia Contemporânea', 'Avançado', '4–5 horas',
  'Frege argumenta que a aritmética é redutível à lógica pura (logicismo). Examina as definições de número de Kant, Mill e Leibniz, rejeita-as, e propõe que números são extensões de conceitos.',
  'parchment',
  [{ title: 'O Que é um Número?', estimatedMinutes: 22, content: `<h2>A Natureza Lógica do Número</h2>
<p class="dropcap">O número não é coisa nem ideia subjetiva, mas algo objetivo que pertence ao conceito — um objeto lógico apreensível pela razão pura. — Fundamentos da Aritmética, §55</p>
<blockquote><em>"Frege's central claim: numbers are logical objects, grasped by pure reason."</em><br/><small>A tese central de Frege: números são objetos lógicos, apreensíveis pela razão pura.</small></blockquote>
<p>Frege distingue função de objeto, conceito de extensão. O número pertence ao conceito: "há 0 luas de Vênus" predica algo do conceito "lua de Vênus". O zero é a extensão do conceito "não idêntico a si mesmo". O um é a extensão do conceito "idêntico ao zero". A aritmética é derivável da lógica.</p>
<p>A distinção sentido/referência (Sinn/Bedeutung): "a estrela da manhã" e "a estrela da tarde" têm a mesma referência (Vênus) mas sentidos diferentes. Esta distinção revolucionou a filosofia da linguagem e a semântica formal do século XX.</p>` }],
  ['frege', 'número', 'lógica', 'aritmética', 'linguagem']),

pd('husserl-logical-investigations', 'Investigações Lógicas', 'Investigações Lógicas — Edmund Husserl', 'A fundação da fenomenologia e a crítica do psicologismo',
  'Edmund Husserl (1859–1938)', 'Logische Untersuchungen, 1900–1901', '1900', 'Alemão', 1938,
  'Filosofia Contemporânea', 'Avançado', '6–8 horas',
  'As Investigações Lógicas fundam a fenomenologia. Husserl critica o psicologismo (redução da lógica à psicologia) e propõe uma análise da consciência intencional como acesso ao ser.',
  'parchment',
  [{ title: 'Intencionalidade e Fenomenologia', estimatedMinutes: 25, content: `<h2>A Consciência como Intencionalidade</h2>
<p class="dropcap">Toda consciência é consciência de algo — esta é a tese da intencionalidade, herdada de Brentano e radicalizada por Husserl como fundamento de toda fenomenologia. — Inv. Lógicas, V, §10</p>
<blockquote><em>"Zu den Sachen selbst!" — Aos próprios assuntos! Este é o lema da fenomenologia husserliana.</em></blockquote>
<p>A epoché fenomenológica: suspender o "juízo natural" sobre a existência do mundo externo para analisar como os fenômenos se apresentam à consciência. Não é ceticismo — é metodologia. A análise intencional descreve a estrutura do ato (noesis) e do objeto intencional (noema).</p>
<p>A crítica ao psicologismo: a lógica não é sobre processos mentais reais — as leis lógicas são ideais, atemporais, necessárias. "2+2=4" não é verdadeiro porque assim pensamos; pensamos assim porque é verdadeiro. Esta distinção entre o ideal e o real é o ponto de partida da fenomenologia como ciência rigorosa.</p>` }],
  ['husserl', 'fenomenologia', 'intencionalidade', 'consciência', 'psicologismo']),

pd('brentano-psychology-empirical', 'Psicologia de um Ponto de Vista Empírico', 'Psicologia de um Ponto de Vista Empírico — Franz Brentano', 'A intencionalidade como marca do psíquico',
  'Franz Brentano (1838–1917)', 'Psychologie vom empirischen Standpunkt, 1874', '1874', 'Alemão', 1917,
  'Filosofia Contemporânea', 'Avançado', '4–5 horas',
  'Brentano propõe a intencionalidade como critério distintivo do psíquico: todo fenômeno mental se dirige a um objeto. Esta tese influenciou profundamente Husserl, Heidegger e a fenomenologia.',
  'parchment',
  [{ title: 'A Intencionalidade do Psíquico', estimatedMinutes: 20, content: `<h2>A Marca do Mental: Intencionalidade</h2>
<p class="dropcap">Todo fenômeno psíquico é caracterizado pelo que os escolásticos medievais chamavam de inexistência intencional (ou mental) de um objeto — o que podemos chamar, de forma não totalmente inequívoca, de referência a um conteúdo, direção para um objeto. — Psicologia, Livro II, cap. 1</p>
<blockquote><em>"Every mental phenomenon includes something as object within itself."</em><br/><small>Todo fenômeno mental inclui algo como objeto dentro de si mesmo.</small></blockquote>
<p>Brentano distingue fenômenos físicos (cores, sons, calor) de fenômenos psíquicos (percepções, julgamentos, emoções). A característica essencial do psíquico é a intencionalidade — o ato de estar dirigido a algo. Posso ver o vermelho (físico), mas minha percepção do vermelho (psíquico) intenciona esse vermelho.</p>
<p>A classificação dos fenômenos psíquicos em representações, julgamentos e fenômenos de amor e ódio (emoções) influenciou a psicologia experimental e a fenomenologia. A distinção de Brentano entre ato e objeto intentado é o germe da noese/noema husserliana.</p>` }],
  ['brentano', 'intencionalidade', 'psicologia', 'fenômenos', 'mente']),

pd('feuerbach-essence-christianity', 'A Essência do Cristianismo', 'A Essência do Cristianismo — Ludwig Feuerbach', 'A religião como projeção da natureza humana',
  'Ludwig Feuerbach (1804–1872)', 'Das Wesen des Christentums, 1841', '1841', 'Alemão', 1872,
  'Filosofia Contemporânea', 'Intermediário', '4–5 horas',
  'Feuerbach argumenta que a teologia é antropologia invertida: Deus é a essência do homem projetada e alienada. A religião é a consciência que o homem tem de si mesmo de forma infinita.',
  'parchment',
  [{ title: 'Deus como Projeção do Humano', estimatedMinutes: 22, content: `<h2>A Essência da Religião como Antropologia</h2>
<p class="dropcap">A consciência de Deus é a autoconsciência do homem; o conhecimento de Deus é o autoconhecimento do homem. — A Essência do Cristianismo, cap. I</p>
<blockquote><em>"Der Mensch schuf Gott nach seinem Bilde."</em><br/><small>O homem criou Deus à sua imagem.</small></blockquote>
<p>Feuerbach inverte Hegel: não é o Espírito Absoluto que se manifesta no homem, mas o homem que projeta sua essência infinita em Deus. Os atributos de Deus — onisciência, onipotência, amor infinito — são atributos humanos alienados, projetados em um ser transcendente. A religião é o sonho do espírito humano.</p>
<p>A crítica: ao adorar Deus, o homem empobrece a si mesmo, transferindo para o divino as qualidades que deveriam reconhecer em si. A emancipação passa pelo reconhecimento: o que chamamos de Deus é a nossa própria essência genérica — a razão, o amor, a vontade — projetada no infinito.</p>` }],
  ['feuerbach', 'religião', 'projeção', 'antropologia', 'crítica']),

pd('marx-1844-manuscripts', 'Manuscritos Econômico-Filosóficos', 'Manuscritos Econômico-Filosóficos — Karl Marx', 'Alienação, trabalho e a essência humana',
  'Karl Marx (1818–1883)', 'Ökonomisch-philosophische Manuskripte, 1844 (pub. 1932)', '1844', 'Alemão', 1883,
  'Filosofia Contemporânea', 'Avançado', '4–5 horas',
  'Os Manuscritos de 1844 são o texto mais filosófico de Marx. Desenvolvem o conceito de alienação do trabalho: o trabalhador se aliena do produto, do processo, de sua essência genérica e de outros homens.',
  'parchment',
  [{ title: 'Alienação e Trabalho', estimatedMinutes: 24, content: `<h2>O Trabalho Alienado</h2>
<p class="dropcap">O trabalhador se torna mais pobre à medida que produz mais riqueza, e à medida que sua produção cresce em poder e volume. O trabalhador se torna uma mercadoria tão mais barata quanto mais mercadorias cria. — Manuscritos, I</p>
<blockquote><em>"Der Arbeiter wird ärmer, je mehr Reichtum er produziert."</em><br/><small>O trabalhador fica mais pobre quanto mais riqueza produz.</small></blockquote>
<p>Quatro formas de alienação: (1) alienação do produto — o objeto que o trabalhador produz torna-se alheio a ele, domina-o; (2) alienação do ato de produção — o trabalho é externo ao trabalhador, não pertence à sua essência; (3) alienação da essência genérica — o homem, único animal que faz de sua atividade vital objeto de sua consciência, é alienado desta especificidade; (4) alienação dos outros homens — se me alieno de minha essência, alieno-me dos outros.</p>
<p>A proposta: o comunismo como supressão positiva da propriedade privada, como retorno do homem a si mesmo — não como negação simples, mas como reapropiação da essência humana que fora alienada no capitalismo.</p>` }],
  ['marx', 'alienação', 'trabalho', 'capitalismo', 'essência']),

pd('spencer-first-principles', 'Primeiros Princípios', 'Primeiros Princípios — Herbert Spencer', 'A síntese evolucionária de toda realidade',
  'Herbert Spencer (1820–1903)', 'First Principles, 1862', '1862', 'Inglês', 1903,
  'Filosofia Contemporânea', 'Avançado', '5–6 horas',
  'Spencer propõe uma filosofia sintética que unifica todas as ciências sob o princípio da evolução. O cosmos passa da homogeneidade incoerente para a heterogeneidade coerente.',
  'parchment',
  [{ title: 'Evolução como Lei Universal', estimatedMinutes: 20, content: `<h2>A Lei Universal da Evolução</h2>
<p class="dropcap">A evolução é uma integração de matéria e uma dissipação concomitante de movimento; durante a qual a matéria passa de uma homogeneidade incoerente e indefinida para uma heterogeneidade coerente e definida. — Primeiros Princípios, §145</p>
<blockquote><em>"Survival of the fittest" — A sobrevivência do mais apto, formulada por Spencer antes de Darwin.</em></blockquote>
<p>Spencer aplica o princípio evolucionário a todo domínio: matéria inorgânica, vida orgânica, mente, sociedade. As sociedades evoluem do simples ao complexo, da homogeneidade para a diferenciação especializada. O Estado é um organismo social — os indivíduos são suas células.</p>
<p>O incognoscível: Spencer postula que por trás do cognoscível há uma Realidade incognoscível — o substrato de toda manifestação. Ciência e religião concordam nisto: ambas reconhecem um mistério último. O conflito entre ciência e religião é sobre o cognoscível; o incognoscível é território de ambas.</p>` }],
  ['spencer', 'evolução', 'síntese', 'sociedade', 'positivismo']),

pd('fichte-vocation-of-man', 'A Vocação do Homem', 'A Vocação do Homem — Johann Gottlieb Fichte', 'Dúvida, conhecimento e fé na filosofia do Eu',
  'Johann Gottlieb Fichte (1762–1814)', 'Die Bestimmung des Menschen, 1800', '1800', 'Alemão', 1814,
  'Filosofia Alemã', 'Intermediário', '3–4 horas',
  'Fichte apresenta seu idealismo através de três estágios: dúvida, conhecimento e fé. O Eu absoluto é o princípio de toda realidade; o mundo é posto pelo Eu como condição de sua ação moral.',
  'parchment',
  [{ title: 'O Eu Absoluto e a Liberdade', estimatedMinutes: 20, content: `<h2>O Eu como Princípio de Toda Realidade</h2>
<p class="dropcap">Age de acordo com o teu melhor conhecimento do dever — esta é a suma de toda ética fichtiana, a voz do Eu prático que supera o atoleiro do idealismo teórico. — Vocação do Homem, III</p>
<blockquote><em>"Im Anfang war die Tat." — No princípio era o ato.</em> (Goethe, influenciado por Fichte)</blockquote>
<p>Fichte parte de Kant mas radicaliza: se o Eu constitui a experiência, então o não-Eu (mundo) é posto pelo Eu como condição de sua atividade. O mundo existe para que o Eu possa agir, se superar, realizar-se moralmente. O conhecimento teórico termina em paradoxos; só a fé prática — o comprometimento com a ação moral — fornece terreno firme.</p>
<p>A Doutrina da Ciência (Wissenschaftslehre): o princípio absoluto é "O Eu se põe a si mesmo". Do Eu absoluto derivam-se o Eu empírico e o não-Eu. Esta dedução do mundo a partir da atividade do Eu é o núcleo do idealismo alemão, que influenciou Schelling e Hegel.</p>` }],
  ['fichte', 'eu', 'idealismo', 'liberdade', 'moral']),

pd('schelling-system-idealism', 'Sistema do Idealismo Transcendental', 'Sistema do Idealismo Transcendental — Schelling', 'Natureza, Eu e a identidade do real e do ideal',
  'Friedrich Wilhelm Joseph Schelling (1775–1854)', 'System des transcendentalen Idealismus, 1800', '1800', 'Alemão', 1854,
  'Filosofia Alemã', 'Avançado', '5–6 horas',
  'Schelling propõe que Natureza e Eu são dois aspectos do Absoluto. A Filosofia da Natureza e a Filosofia Transcendental são dois caminhos que se encontram na arte como intuição intelectual objetivada.',
  'parchment',
  [{ title: 'Natureza, Espírito e Arte', estimatedMinutes: 22, content: `<h2>A Identidade de Natureza e Espírito</h2>
<p class="dropcap">A arte é o único verdadeiro e eterno órganon e documento da filosofia — o que a filosofia apenas pode demonstrar exteriormente, a arte expressa interiormente. — Sistema do Idealismo Transcendental, VI</p>
<blockquote><em>"Die Natur ist der sichtbare Geist, der Geist die unsichtbare Natur."</em><br/><small>A Natureza é o Espírito visível; o Espírito é a Natureza invisível.</small></blockquote>
<p>Schelling critica Fichte: o Eu não pode ser o único ponto de partida, pois a Natureza tem sua própria vida, sua própria produtividade inconsciente. A Natureza é Espírito adormecido; o Espírito é Natureza que despertou para si mesma. O Absoluto é a identidade de ambos.</p>
<p>A arte como cume: na criação artística, o inconsciente (Natureza) e o consciente (Espírito) se reconciliam. O gênio produz mais do que sabe; a obra de arte é o produto do livre jogo entre necessidade e liberdade. Por isso a arte é o órganon da filosofia — onde a identidade se manifesta sensivelmente.</p>` }],
  ['schelling', 'natureza', 'espírito', 'arte', 'absoluto']),

pd('vico-new-science', 'A Nova Ciência', 'A Nova Ciência — Giambattista Vico', 'A ciência histórica dos ciclos das nações',
  'Giambattista Vico (1668–1744)', 'Scienza Nuova, 1725 (3ª ed. 1744)', '1725', 'Italiano', 1744,
  'Filosofia Moderna', 'Avançado', '5–6 horas',
  'Vico propõe que as nações percorrem ciclos históricos (ricorsi): idade dos deuses, dos heróis e dos homens. A verdade histórica é compreensível porque os homens criaram a história — verum et factum convertuntur.',
  'parchment',
  [{ title: 'Os Ciclos das Nações', estimatedMinutes: 22, content: `<h2>Verum et Factum: Verdade e Fazer</h2>
<p class="dropcap">O princípio desta ciência deve ser tomado como aquele: que o mundo civil foi certamente feito pelos homens, e portanto seus princípios devem ser encontrados nas modificações de nossa própria mente humana. — Nova Ciência, §331</p>
<blockquote><em>"Verum ipsum factum." — O verdadeiro é o próprio feito.</em> A verdade do mundo histórico só pode ser conhecida por quem o fez: o homem.</blockquote>
<p>Vico inverte Descartes: a matemática é conhecível com certeza porque nós a criamos; a história é conhecível porque nós a fazemos. A natureza, feita por Deus, só Deus conhece em profundidade. Os cursos das nações seguem três idades: dos deuses (teocracia, mito), dos heróis (aristocracia, epopeia), dos homens (democracia, prosa). E depois o ricorso — recomeço.</p>
<p>A linguagem e o mito: os primeiros homens pensavam em poesia, por imagens e metáforas, não em conceitos. Homero não é um indivíduo genial — é a voz coletiva da Grécia heroica. O mito não é mentira, mas a forma como povos primitivos compreenderam a realidade.</p>` }],
  ['vico', 'história', 'ciclos', 'mitologia', 'linguagem']),

pd('bruno-infinite-universe', 'Do Infinito, do Universo e dos Mundos', 'Do Infinito, do Universo e dos Mundos — Giordano Bruno', 'O universo infinito e a pluralidade dos mundos',
  'Giordano Bruno (1548–1600)', 'De l\'Infinito, Universo e Mondi, 1584', '1584', 'Italiano', 1600,
  'Filosofia Renascentista', 'Avançado', '4–5 horas',
  'Bruno defende que o universo é infinito, sem centro, habitado por inúmeros mundos. Foi queimado pela Inquisição em 1600. Sua filosofia une a física de Copérnico com o neoplatonismo e antecipa a cosmologia moderna.',
  'parchment',
  [{ title: 'O Universo Infinito', estimatedMinutes: 20, content: `<h2>A Infinitude do Cosmos</h2>
<p class="dropcap">O universo é, portanto, uno, infinito, imóvel. Uma é a causa absoluta possível, uma é a origem, uma é a origem única de toda coisa. Assim o universo é uno, infinito, imóvel. — Do Infinito, Diálogo I</p>
<blockquote><em>"Innumerabiles soles, innumerabiles terrae."</em><br/><small>Inumeráveis sóis, inumeráveis terras.</small></blockquote>
<p>Bruno aceita Copérnico mas vai além: não apenas a Terra orbita o Sol — o próprio Sol não é o centro do universo. O universo não tem centro porque é infinito. Cada estrela é um sol; em torno de cada sol pode haver mundos habitados. Esta visão antecipou a astrofísica moderna em trezentos anos.</p>
<p>A monadologia: cada coisa particular é uma expressão do Todo infinito. O infinito se contrai em cada indivíduo — ideia que influenciou Leibniz. O Uno-Todo panteísta de Bruno é Deus = Natureza, o que o tornava herético aos olhos da Igreja. Morreu na fogueira sem retratar-se.</p>` }],
  ['bruno', 'infinito', 'universo', 'cosmologia', 'renascimento']),

pd('pico-oration-dignity', 'Discurso sobre a Dignidade do Homem', 'Discurso sobre a Dignidade do Homem — Pico della Mirandola', 'O humanismo renascentista e a liberdade humana',
  'Giovanni Pico della Mirandola (1463–1494)', 'Oratio de hominis dignitate, 1486', '1486', 'Latim', 1494,
  'Filosofia Renascentista', 'Iniciante', '1–2 horas',
  'O "manifesto do Renascimento". Pico argumenta que o homem é o único ser sem natureza fixa — pode tornar-se o que quiser. Deus disse ao homem: "podes degenerar até os animais; podes elevar-te até os anjos".',
  'parchment',
  [{ title: 'A Dignidade e a Liberdade Humana', estimatedMinutes: 15, content: `<h2>O Camaleão do Universo</h2>
<p class="dropcap">Não te dei, ó Adão, nem lugar determinado, nem aspecto próprio, nem dom algum peculiar, a fim de que o lugar, o aspecto e os dons que tu desejares, tudo isso tu obtenhas e conserves segundo o teu desejo e o teu juízo. — Discurso, §5</p>
<blockquote><em>"O grande milagre: o homem é o único ser que pode tornar-se qualquer coisa."</em> — Parafraseando Pico</blockquote>
<p>Pico propõe que o homem é o único ser sem essência fixada. Os anjos são espíritos puros; os animais são corpos com instintos fixos. Mas o homem é livre para escolher sua natureza — pode degradar-se para o nível animal ou elevar-se até o divino. Esta plasticidade é sua dignidade.</p>
<p>O syncretismo de Pico: ele queria harmonizar Platão, Aristóteles, Averróis, Avicena, Moisés, Zoroastro e o Evangelho em 900 teses filosóficas. Esta ambição enciclopédica é o espírito do humanismo renascentista: não há verdade incompatível com outra; toda tradição aponta para o mesmo Uno.</p>` }],
  ['pico', 'dignidade', 'humanismo', 'liberdade', 'renascimento']),

pd('erasmus-praise-folly', 'O Elogio da Loucura', 'O Elogio da Loucura — Erasmo de Roterdão', 'A sátira humanista da tolice humana e eclesiástica',
  'Erasmo de Roterdão (1469–1536)', 'Moriae Encomium, 1509', '1509', 'Latim', 1536,
  'Filosofia Renascentista', 'Iniciante', '2–3 horas',
  'A Loucura se auto-elogia em discurso irônico, revelando que governa o mundo — reis, papas, filósofos e teólogos são todos seus servos. Erasmo critica a Igreja sem romper com ela, satirizando a escolástica vazia e a corrupção clerical.',
  'parchment',
  [{ title: 'O Reino da Loucura', estimatedMinutes: 15, content: `<h2>A Loucura Governa o Mundo</h2>
<p class="dropcap">Eu, a Loucura, sou quem governa o mundo — os reis que não consultam sábios mas aduladores, os filósofos que se perdem em silogismos, os teólogos que disputam o sexo dos anjos. — Elogio da Loucura, §8</p>
<blockquote><em>"Stultitiam simulare in loco summa est sapientia."</em><br/><small>Simular loucura no momento certo é a suprema sabedoria.</small></blockquote>
<p>Erasmo faz a Loucura discursar em elogio a si mesma — ironia perfeita: a Loucura é sábia porque sabe que governa. Os chamados sábios são mais loucos: fingem saber o que não sabem. O humanista cristão satira a guerra, a avareza dos príncipes, a superstição popular e a pedanteria dos teólogos.</p>
<p>A loucura cristã: no final, Erasmo ressignifica a loucura positivamente — a loucura da Cruz, dos santos, dos contemplativos. O sábio cristão parece louco ao mundo. Este paradoxo final mostra que o elogio é também sério: há uma sabedoria superior que passa por loucura aos olhos do mundo.</p>` }],
  ['erasmo', 'loucura', 'sátira', 'humanismo', 'crítica']),

pd('sextus-outlines-pyrrhonism', 'Esbozos Pirrônicos', 'Esbozos Pirrônicos — Sexto Empírico', 'O ceticismo radical e a suspensão do juízo',
  'Sexto Empírico (séc. II–III d.C.)', 'Pyrrhōneioi Hypotypōseis, c. 200 d.C.', '200', 'Grego', 210,
  'Filosofia Antiga', 'Avançado', '5–6 horas',
  'Sexto Empírico é a principal fonte do pirronismo antigo. Os Esbozos apresentam os Dez Tropos de Enesidemo e os Cinco de Agripa para justificar a epoche (suspensão do juízo) e alcançar a ataraxia (tranquilidade da alma).',
  'parchment',
  [{ title: 'Os Tropos e a Suspensão do Juízo', estimatedMinutes: 22, content: `<h2>Isostenia e Epoche</h2>
<p class="dropcap">O ceticismo é uma capacidade de opor fenômenos e pensamentos uns aos outros de todas as maneiras possíveis, capacidade que nos conduz, por causa da equipolência nas coisas e discursos opostos, primeiro à suspensão do juízo, e depois à tranquilidade. — Esbozos Pirrônicos, I.8</p>
<blockquote><em>"Ou mallon." — Não mais (isto do que aquilo). A fórmula cética por excelência.</em></blockquote>
<p>Os Dez Tropos de Enesidemo: diferenças entre animais, entre homens, entre sentidos, circunstâncias, posições, misturas, quantidades, relações, frequência de ocorrências, costumes. Em cada caso, os fenômenos se contradizem e não podemos decidir qual é o verdadeiro. A equipolência (isostenia) das razões nos força à suspensão.</p>
<p>Os Cinco Tropos de Agripa (mais rigorosos): dissenso, regressão ao infinito, relação, hipótese, circularidade. Qualquer argumento ou é contestado, ou requer prova infinita, ou é relativo, ou é assumido sem prova, ou é circular. Nenhuma afirmação pode ser fundada. Portanto: epoche — e daqui, inesperadamente, a ataraxia.</p>` }],
  ['sexto', 'ceticismo', 'pirronismo', 'suspensão', 'tranquilidade']),

pd('malebranche-search-truth', 'A Busca da Verdade', 'A Busca da Verdade — Nicolas Malebranche', 'O ocasionalismo e a visão de todas as coisas em Deus',
  'Nicolas Malebranche (1638–1715)', 'De la Recherche de la vérité, 1674', '1674', 'Francês', 1715,
  'Filosofia Moderna', 'Avançado', '5–6 horas',
  'Malebranche desenvolve o ocasionalismo: as causas naturais são apenas ocasiões para que Deus, a única causa eficiente, produza os efeitos. Vemos todas as coisas em Deus — a mente intui as ideias na mente divina.',
  'parchment',
  [{ title: 'Ocasionalismo e Visão em Deus', estimatedMinutes: 22, content: `<h2>Vemos Tudo em Deus</h2>
<p class="dropcap">A razão que nos faz conhecer os corpos e que nos faz criar ciência sobre eles é inteiramente espiritual, imutável, necessária — só pode ser a própria razão de Deus, comunicada à nossa mente. — Busca da Verdade, III.ii.6</p>
<blockquote><em>"Nous voyons toutes choses en Dieu."</em><br/><small>Vemos todas as coisas em Deus.</small></blockquote>
<p>O ocasionalismo: quando minha vontade move meu braço, não é minha vontade a causa eficiente do movimento — Deus intervém nessa ocasião e produz o movimento. A matéria é incapaz de agir sobre a mente; a mente é incapaz de mover a matéria diretamente. Deus é a única causa real; as criaturas são causas ocasionais.</p>
<p>A teoria das ideias: não posso ter na minha mente finita ideias adequadas dos infinitos corpos. Conheço os corpos porque Deus me faz ver suas ideias arquetípicas na mente divina. Esta teoria — que nos conhecemos Deus antes dos objetos externos — é uma síntese radical de Agostinho e Descartes.</p>` }],
  ['malebranche', 'ocasionalismo', 'deus', 'visão', 'descartes']),

pd('voltaire-philosophical-dictionary', 'Dicionário Filosófico', 'Dicionário Filosófico — Voltaire', 'O iluminismo radical em forma de verbetes irônicos',
  'Voltaire (1694–1778)', 'Dictionnaire philosophique, 1764', '1764', 'Francês', 1778,
  'Filosofia Moderna', 'Iniciante', '3–4 horas',
  'O Dicionário Filosófico é a arma mais afiada do Iluminismo. Voltaire ataca o fanatismo religioso, a superstição, a intolerância e a metafísica vazia em verbetes curtos, irônicos e devastadores.',
  'parchment',
  [{ title: 'Fanatismo, Tolerância e Razão', estimatedMinutes: 18, content: `<h2>Écrasez l\'Infâme — Esmagai o Infame</h2>
<p class="dropcap">O fanatismo é para a superstição o que o acesso é para a febre, o que a raiva é para a ira. O homem que tem êxtases, visões, que toma seus sonhos por realidades e suas imaginações por profecias, é um entusiasta; o que apoia sua loucura com assassinato, é um fanático. — Dicionário Filosófico, "Fanatismo"</p>
<blockquote><em>"Si Dieu n'existait pas, il faudrait l'inventer."</em><br/><small>Se Deus não existisse, seria preciso inventá-lo.</small> — Voltaire (irônico)</blockquote>
<p>Verbetes como "Deus", "Alma", "Milagres", "Inquisição", "Tolerância" mostram Voltaire desmontando dogmas com a navalha da razão histórica e empírica. Qual a diferença entre fé e superstição? A sanção da maioria. Qual a diferença entre milagre e absurdo? A autoridade que o declara.</p>
<p>O deísmo de Voltaire: ele crê em Deus como princípio racional, mas rejeita as religiões reveladas. "Deus fez o homem à sua imagem, e o homem o pagou na mesma moeda" — as religiões são projeções dos vícios humanos: um Deus que odeia, pune e favorece nações é apenas um rei tribal elevado ao infinito.</p>` }],
  ['voltaire', 'iluminismo', 'tolerância', 'fanatismo', 'deísmo']),

pd('rousseau-emile', 'Emílio ou Da Educação', 'Emílio ou Da Educação — Jean-Jacques Rousseau', 'A educação natural e o homem corrompido pela sociedade',
  'Jean-Jacques Rousseau (1712–1778)', 'Émile, ou De l\'éducation, 1762', '1762', 'Francês', 1778,
  'Filosofia Moderna', 'Intermediário', '6–8 horas',
  'Rousseau apresenta a educação ideal através de Emílio, criança fictícia. O homem nasce bom; a sociedade o corrompe. A educação deve seguir a natureza, protegendo a criança das influências sociais até que a razão amadureça.',
  'parchment',
  [{ title: 'A Natureza e a Educação', estimatedMinutes: 22, content: `<h2>Tudo é Bom ao Sair das Mãos do Criador</h2>
<p class="dropcap">Tudo é bom ao sair das mãos do Autor das coisas; tudo degenera nas mãos do homem. — Emílio, Livro I</p>
<blockquote><em>"Vivre est le métier que je veux lui apprendre."</em><br/><small>Viver é o ofício que quero ensiná-lo.</small></blockquote>
<p>Rousseau distingue três tipos de educação: da natureza (interna, o desenvolvimento das faculdades), dos homens (social, os costumes) e das coisas (a experiência). A educação ideal harmoniza as três, dando prioridade à natureza. Emílio aprende fazendo, não ouvindo; experiencia as consequências naturais de seus atos.</p>
<p>A "Profissão de Fé do Vigário Saboiano": no livro IV, Rousseau desenvolve uma religião natural deísta — o sentimento interior de Deus, moral e beleza dispensam dogmas e clero. Este capítulo levou o Emílio a ser condenado e Rousseau a fugir de Paris.</p>` }],
  ['rousseau', 'educação', 'natureza', 'criança', 'sociedade']),

pd('kant-critique-judgment', 'Crítica da Faculdade do Juízo', 'Crítica da Faculdade do Juízo — Immanuel Kant', 'A estética e a teleologia como ponte entre natureza e liberdade',
  'Immanuel Kant (1724–1804)', 'Kritik der Urteilskraft, 1790', '1790', 'Alemão', 1804,
  'Filosofia Moderna', 'Avançado', '6–8 horas',
  'A terceira crítica de Kant examina o belo, o sublime e o julgamento teleológico. O belo agrada sem conceito; o sublime eleva a alma pelo confronto com o ilimitado. A teleologia sugere uma finalidade na natureza sem postulá-la dogmaticamente.',
  'parchment',
  [{ title: 'O Belo e o Sublime', estimatedMinutes: 24, content: `<h2>A Analítica do Belo e do Sublime</h2>
<p class="dropcap">O belo é o que agrada universalmente sem conceito — não por interesse, não por conceito determinado, mas pela livre harmonia da imaginação com o entendimento. — Crítica do Juízo, §9</p>
<blockquote><em>"Das Erhabene erschüttert; das Schöne rührt."</em><br/><small>O sublime abala; o belo comove.</small></blockquote>
<p>Quatro momentos do juízo estético do belo: (1) desinteresse — agrada sem interesse em existência; (2) universalidade sem conceito — exijo que todos concordem; (3) finalidade sem fim — a forma parece feita para ser apreciada, mas sem propósito definido; (4) necessidade subjetiva — o prazer é necessário, não contingente.</p>
<p>O sublime matemático e dinâmico: uma montanha esmaga nossa sensibilidade, mas nossa razão contém ideias que superam qualquer grandeza — o infinito, a lei moral. O sublime é o sentimento de que somos superiores à natureza porque nossa razão é suprassensível. O medo que converte-se em elevação — esta é a experiência do sublime.</p>` }],
  ['kant', 'estética', 'belo', 'sublime', 'teleologia']),

pd('hegel-philosophy-right', 'Filosofia do Direito', 'Filosofia do Direito — Georg Wilhelm Friedrich Hegel', 'O Estado como realidade da liberdade concreta',
  'Georg Wilhelm Friedrich Hegel (1770–1831)', 'Grundlinien der Philosophie des Rechts, 1820', '1820', 'Alemão', 1831,
  'Filosofia Alemã', 'Avançado', '6–8 horas',
  'Hegel desenvolve a filosofia do espírito objetivo: direito abstrato, moralidade e eticidade (família, sociedade civil, Estado). O Estado é a realidade da Ideia ética — não instrumento dos indivíduos, mas a substância da liberdade concreta.',
  'parchment',
  [{ title: 'Estado, Liberdade e Eticidade', estimatedMinutes: 24, content: `<h2>O Estado como Realidade da Ideia Ética</h2>
<p class="dropcap">O que é racional é real; e o que é real é racional. — Filosofia do Direito, Prefácio</p>
<blockquote><em>"Der Staat ist die Wirklichkeit der sittlichen Idee."</em><br/><small>O Estado é a realidade da ideia ética.</small></blockquote>
<p>A tríade da eticidade: família (amor imediato, unidade natural), sociedade civil (sistema de necessidades, atomismo, classes), Estado (síntese, unidade concreta da liberdade). O Estado não é um contrato entre indivíduos — é a substância ética que os precede e constitui.</p>
<p>A liberdade concreta: a liberdade abstrata (fazer o que quero) é a negação da liberdade real. A liberdade concreta é a identificação do indivíduo com as instituições éticas — família, corporação, Estado. Sou livre não quando faço o que quero, mas quando quero o que as instituições racionais exigem. Esta tese contrasta com o liberalismo contratualista.</p>` }],
  ['hegel', 'estado', 'liberdade', 'direito', 'eticidade']),

pd('hegel-science-logic', 'Ciência da Lógica', 'Ciência da Lógica — Georg Wilhelm Friedrich Hegel', 'O pensamento puro e a auto-determinação do Ser',
  'Georg Wilhelm Friedrich Hegel (1770–1831)', 'Wissenschaft der Logik, 1812–1816', '1812', 'Alemão', 1831,
  'Filosofia Alemã', 'Avançado', '8–10 horas',
  'A obra mais difícil de Hegel. A Lógica examina o pensamento puro — não pensamento sobre algo, mas o automovimento das categorias do Ser ao Nada, ao Devir, à Essência, ao Conceito. É a ontologia do Espírito Absoluto.',
  'parchment',
  [{ title: 'Ser, Nada e Devir', estimatedMinutes: 25, content: `<h2>O Começo da Lógica</h2>
<p class="dropcap">O ser, o imediato indeterminado, é na realidade o nada, nem mais nem menos que o nada. — Ciência da Lógica, I.i.A</p>
<blockquote><em>"Das reine Sein und das reine Nichts ist also dasselbe."</em><br/><small>O ser puro e o nada puro são, portanto, o mesmo.</small></blockquote>
<p>O começo da Lógica: o Ser puro — sem determinação, sem qualidade — é idêntico ao Nada puro (também indeterminado). Mas são diferentes — o pensamento passa de um ao outro. Esta passagem é o Devir. Hegel não declara Ser = Nada; declara que o pensamento que tenta pensar o Ser puro descobre nele o Nada e o Devir — a dialética está no próprio movimento do pensamento.</p>
<p>A estrutura dialética: tese, antítese, síntese — embora Hegel raramente use esses termos. O método é imanente: cada categoria gera sua negação a partir de si mesma, e a contradição é resolvida numa categoria superior que as contém. A Lógica culmina na Ideia Absoluta — o pensamento que pensa a si mesmo.</p>` }],
  ['hegel', 'lógica', 'ser', 'dialética', 'absoluto']),

pd('schopenhauer-parerga', 'Parerga e Paralipomena', 'Parerga e Paralipomena — Schopenhauer', 'Aforismos sobre a sabedoria de vida',
  'Arthur Schopenhauer (1788–1860)', 'Parerga und Paralipomena, 1851', '1851', 'Alemão', 1860,
  'Filosofia Contemporânea', 'Iniciante', '4–5 horas',
  'A obra mais lida de Schopenhauer em vida, contendo os "Aforismos sobre a Sabedoria de Vida" — conselhos práticos derivados de sua metafísica pessimista. Beleza, riqueza, saúde e caráter como condições da felicidade.',
  'parchment',
  [{ title: 'Aforismos sobre a Sabedoria de Vida', estimatedMinutes: 20, content: `<h2>O Que Somos Vale Mais do Que Temos</h2>
<p class="dropcap">A riqueza se assemelha à água do mar: quanto mais se bebe, mais sede se tem. O mesmo vale para a fama. — Parerga, Aforismos, §2</p>
<blockquote><em>"Die größte Weisheit ist, die Gegenwart zu genießen."</em><br/><small>A maior sabedoria é desfrutar o presente.</small></blockquote>
<p>Schopenhauer distingue três classes de bens: o que somos (saúde, inteligência, caráter — os únicos verdadeiros), o que temos (riqueza, propriedades) e o que representamos (reputação, honra). Os homens sacrificam o primeiro pelo segundo e pelo terceiro — erro fundamental.</p>
<p>A solidão como privilégio: o homem de espírito superior sente a necessidade da solidão. A sociabilidade é, na maioria dos casos, fuga de si mesmo — os medíocres precisam dos outros porque não suportam sua própria companhia. O sábio é autossuficiente. O mais alto prazer é o prazer da contemplação — estética, intelectual, espiritual.</p>` }],
  ['schopenhauer', 'sabedoria', 'aforismos', 'vida', 'felicidade']),

pd('nietzsche-gay-science', 'A Gaia Ciência', 'A Gaia Ciência — Friedrich Nietzsche', 'A morte de Deus e o eterno retorno',
  'Friedrich Nietzsche (1844–1900)', 'Die fröhliche Wissenschaft, 1882', '1882', 'Alemão', 1900,
  'Filosofia Contemporânea', 'Intermediário', '4–5 horas',
  'A Gaia Ciência contém as teses mais explosivas de Nietzsche: a morte de Deus, o anúncio do eterno retorno e o ideal de amor fati. O título homenageia a gaya scienza dos trovadores — a alegria da criação intelectual.',
  'parchment',
  [{ title: 'A Morte de Deus e o Eterno Retorno', estimatedMinutes: 22, content: `<h2>Deus Está Morto — e Nós o Matamos</h2>
<p class="dropcap">Deus está morto. Deus continua morto. E nós o matamos. Como nos consolar, nós, os assassinos dos assassinos? — A Gaia Ciência, §125 (O Homem Louco)</p>
<blockquote><em>"Amor fati: ame seu destino."</em> A fórmula da filosofia afirmativa de Nietzsche.</blockquote>
<p>O homem louco procura Deus com uma lanterna no mercado: os homens o riram. Ele proclama que matamos Deus — e que não sabemos o que fizemos. O ato maior da história ainda não chegou à consciência dos homens. O niilismo é a consequência: sem Deus, sem fundamento, sem valor objetivo.</p>
<p>O eterno retorno (§341): "E se um demônio te dissesse: esta vida, tu deverás vivê-la novamente, incontáveis vezes?" Esta é a questão mais pesada. A resposta afirmativa — querer que cada instante se repita eternamente — é o amor fati, a afirmação dionisíaca da vida que supera o niilismo.</p>` }],
  ['nietzsche', 'morte de deus', 'eterno retorno', 'nihilismo', 'alegria']),

pd('nietzsche-human-all-too-human', 'Humano, Demasiado Humano', 'Humano, Demasiado Humano — Friedrich Nietzsche', 'A crítica da metafísica pelo método histórico-psicológico',
  'Friedrich Nietzsche (1844–1900)', 'Menschliches, Allzumenschliches, 1878', '1878', 'Alemão', 1900,
  'Filosofia Contemporânea', 'Intermediário', '4–5 horas',
  'Nietzsche abandona o romantismo wagneriano e adota o "espírito livre" — um método histórico-psicológico de desmascaramento das ilusões metafísicas, morais e artísticas. Influenciado por Voltaire e Diderot.',
  'parchment',
  [{ title: 'O Espírito Livre e a Química dos Conceitos', estimatedMinutes: 20, content: `<h2>A Filosofia como Química das Ilusões</h2>
<p class="dropcap">Quase tudo o que chamamos de "cultura superior" repousa sobre a espiritualização e aprofundamento da crueldade — esta é a minha tese. — Humano, Demasiado Humano, §229</p>
<blockquote><em>"Der Mensch ist das nicht festgestellte Tier."</em><br/><small>O homem é o animal não fixado.</small> (antecipando Nietzsche tardio)</blockquote>
<p>O método: assim como a química dissolve substâncias complexas em elementos simples, a filosofia deve dissolver as ideias nobres (moral, religião, arte, metafísica) em seus componentes psicológicos e históricos. A moral do sacrifício vem do medo; a compaixão vem do prazer de sentir superioridade; o entusiasmo religioso é sublimação de impulsos sexuais.</p>
<p>O "espírito livre" é aquele que se liberta das convenções, dos deuses, das pátrias e das certezas. Nietzsche saúda a ciência como desencantamento — mas não se contenta com o positivismo: a ciência também tem seus pressupostos não examinados. O espírito livre examina tudo, incluindo o desejo de examinar tudo.</p>` }],
  ['nietzsche', 'psicologia', 'espírito livre', 'crítica', 'moral']),

pd('darwin-origin-species', 'A Origem das Espécies', 'A Origem das Espécies — Charles Darwin', 'Seleção natural e a evolução da vida',
  'Charles Darwin (1809–1882)', 'On the Origin of Species, 1859', '1859', 'Inglês', 1882,
  'Filosofia Contemporânea', 'Iniciante', '6–8 horas',
  'A obra mais influente da ciência moderna. Darwin demonstra que as espécies não são fixas — variam e são selecionadas pelo ambiente. A seleção natural como mecanismo da evolução substitui o criacionismo como explicação da diversidade da vida.',
  'parchment',
  [{ title: 'Seleção Natural e Evolução', estimatedMinutes: 22, content: `<h2>A Grande Ideia: Seleção Natural</h2>
<p class="dropcap">Como um geólogo que estuda a história de um continente, podemos dizer da Natureza: ela revela o longo curso do tempo. — Origem das Espécies, cap. XIV</p>
<blockquote><em>"There is grandeur in this view of life."</em><br/><small>Há grandiosidade nesta visão da vida.</small> — Origem das Espécies, última frase</blockquote>
<p>Darwin acumulou evidências por vinte anos antes de publicar: anatomia comparada, fósseis, distribuição geográfica das espécies, estruturas vestigiais, embriologia. O argumento: variação existe em toda população; mais indivíduos nascem do que podem sobreviver; quem tem variações vantajosas tende a sobreviver e reproduzir-se; ao longo de gerações, variações vantajosas acumulam-se.</p>
<p>As implicações filosóficas foram devastadoras: o homem não é criação especial — é primata modificado. O design aparente na natureza não exige um designer — é produto cego da seleção. A teleologia natural colapsa. Marx queria dedicar O Capital a Darwin (Darwin recusou). Freud viu a teoria como o segundo grande golpe no narcisismo humano (o primeiro foi Copérnico).</p>` }],
  ['darwin', 'evolução', 'seleção natural', 'espécies', 'biologia']),

pd('whitehead-process-reality', 'Processo e Realidade', 'Processo e Realidade — Alfred North Whitehead', 'A cosmologia dos processos e a filosofia do organismo',
  'Alfred North Whitehead (1861–1947)', 'Process and Reality, 1929', '1929', 'Inglês', 1947,
  'Filosofia Contemporânea', 'Avançado', '8–10 horas',
  'A obra mestra da filosofia do processo. Whitehead propõe que a realidade é constituída por "ocasiões de experiência" — eventos de tornar-se, não substâncias estáticas. Deus é o fundamento criativo que lures o mundo para a novidade.',
  'parchment',
  [{ title: 'Processo, Experiência e Deus', estimatedMinutes: 25, content: `<h2>A Realidade como Processo</h2>
<p class="dropcap">A filosofia especulativa é o esforço de enquadrar um sistema coerente, lógico, necessário e aplicável de ideias gerais em termos do qual todo elemento de nossa experiência pode ser interpretado. — Processo e Realidade, I.1</p>
<blockquote><em>"The many become one, and are increased by one."</em><br/><small>Os muitos tornam-se um, e são aumentados por um.</small> — Processo e Realidade</blockquote>
<p>A filosofia do organismo: ao contrário de Descartes (substâncias estáticas), Whitehead propõe que a unidade básica da realidade é a "ocasião de experiência" — um evento de tornar-se, com sua própria subjetividade. Até os elétrons têm uma forma primitiva de experiência. A matéria inerte é abstração.</p>
<p>Deus na filosofia do processo: Deus tem duas naturezas — a natureza primordial (o conjunto de todas as possibilidades, o eterno) e a natureza consequente (Deus recebendo e preservando o mundo). Deus não é onipotente no sentido tradicional; persuade o mundo para o bem sem coerção. Esta visão influenciou a teologia do processo.</p>` }],
  ['whitehead', 'processo', 'experiência', 'deus', 'cosmologia']),

pd('santayana-sense-beauty', 'O Sentido da Beleza', 'O Sentido da Beleza — George Santayana', 'O prazer objetivado como fundamento do belo',
  'George Santayana (1863–1952)', 'The Sense of Beauty, 1896', '1896', 'Inglês', 1952,
  'Filosofia Contemporânea', 'Intermediário', '3–4 horas',
  'Santayana define o belo como "prazer objetivado" — um prazer que parece qualidade do objeto, não do sujeito. É a primeira grande estética naturalista americana.',
  'parchment',
  [{ title: 'O Prazer Objetivado', estimatedMinutes: 18, content: `<h2>Beleza como Prazer Objetivado</h2>
<p class="dropcap">A beleza é prazer objetivado — prazer que, em vez de ser sentido como estado do sujeito, parece ser uma qualidade do objeto percebido. — O Sentido da Beleza, §10</p>
<blockquote><em>"Beauty is a pledge of the possible conformity between the soul and nature."</em><br/><small>A beleza é o penhor da possível conformidade entre a alma e a natureza.</small></blockquote>
<p>Santayana distingue três elementos do belo: o material (qualidades sensoriais — cor, som, ritmo), a forma (relação entre partes — harmonia, proporção, equilíbrio) e a expressão (associações que o objeto evoca). A beleza mais alta combina os três.</p>
<p>O naturalismo de Santayana: a estética não precisa de fundamentos transcendentes. O prazer estético é a mais completa e desinteressada experiência humana — não porque aponte além de si, mas porque é suficiente em si. A arte é a mais alta resposta humana ao mundo, e essa resposta é suficientemente digna sem precisar de Deus ou do Absoluto.</p>` }],
  ['santayana', 'beleza', 'prazer', 'estética', 'naturalismo']),

pd('bradley-appearance-reality', 'Aparência e Realidade', 'Aparência e Realidade — F.H. Bradley', 'O Absoluto e a crítica das categorias do entendimento',
  'Francis Herbert Bradley (1846–1924)', 'Appearance and Reality, 1893', '1893', 'Inglês', 1924,
  'Filosofia Contemporânea', 'Avançado', '6–7 horas',
  'Bradley argumenta que todas as categorias do entendimento — relação, causalidade, espaço, tempo, eu — são contraditórias quando analisadas. A realidade verdadeira é o Absoluto, experiência total onde sujeito e objeto são superados.',
  'parchment',
  [{ title: 'O Absoluto e as Contradições do Entendimento', estimatedMinutes: 22, content: `<h2>As Relações e o Absoluto</h2>
<p class="dropcap">A realidade é uma e é experiência. Fora da experiência nada existe, e toda experiência deve pertencer ao Absoluto. — Aparência e Realidade, cap. XIV</p>
<blockquote><em>"The Absolute is not many; it is One."</em><br/><small>O Absoluto não é múltiplo; é Um.</small></blockquote>
<p>O argumento de Bradley contra as relações: se A e B são relacionados por R, então R deve estar relacionado a A e B por novas relações R1 e R2, que por sua vez precisam de relações... — regressão infinita. A relação, como categoria, é contraditória. Portanto o mundo das relações — a realidade ordinária — é mera aparência.</p>
<p>A realidade como sentimento imediato: antes de toda distinção sujeito-objeto, antes de toda relação, há a experiência imediata e indiferenciada. O Absoluto é esta experiência total e harmoniosa onde todas as contradições são superadas. O idealismo britânico de Bradley influenciou o jovem Russell, que depois o refutou e fundou a filosofia analítica na crítica a Bradley.</p>` }],
  ['bradley', 'absoluto', 'relações', 'idealismo', 'experiência']),

pd('royce-world-individual', 'O Mundo e o Indivíduo', 'O Mundo e o Indivíduo — Josiah Royce', 'O idealismo absoluto americano e a comunidade da interpretação',
  'Josiah Royce (1855–1916)', 'The World and the Individual, 1900', '1900', 'Inglês', 1916,
  'Filosofia Contemporânea', 'Avançado', '5–6 horas',
  'Royce desenvolve o idealismo absoluto na tradição americana. O indivíduo só é real como parte do Absoluto; a comunidade de interpretação é a forma social do espírito.',
  'parchment',
  [{ title: 'O Absoluto e a Comunidade', estimatedMinutes: 20, content: `<h2>A Comunidade como Forma do Espírito</h2>
<p class="dropcap">O real é o que satisfaz a vontade intelectual. E a vontade intelectual, em sua completude, é insatisfeita por qualquer coisa menos que a experiência total, harmoniosa, do Absoluto. — O Mundo e o Indivíduo, I.i</p>
<blockquote><em>"Loyalty is the will to manifest the eternal in the temporal."</em><br/><small>A lealdade é a vontade de manifestar o eterno no temporal.</small></blockquote>
<p>Royce critica o realismo (o mundo existe independente de ser conhecido) e o misticismo (o Absoluto é inefável). Sua posição: o ser é o que seria conhecido em uma experiência absolutamente completa. O Absoluto é esta experiência total — não um sujeito separado do mundo, mas a realidade do próprio processo de conhecimento realizado.</p>
<p>A comunidade de interpretação: influenciado por Peirce, Royce propõe que o conhecimento não é ato individual mas processo comunitário e temporal. A verdade se realiza através de uma comunidade ilimitada de intérpretes que compartilham signos ao longo do tempo. O amor é a forma mais alta de lealdade — ao ser amado, à comunidade, ao Absoluto.</p>` }],
  ['royce', 'absoluto', 'comunidade', 'idealismo', 'interpretação']),

pd('croce-aesthetic', 'Estética como Ciência da Expressão', 'Estética como Ciência da Expressão — Benedetto Croce', 'A arte como intuição e expressão puras',
  'Benedetto Croce (1866–1952)', 'Estetica come scienza dell\'espressione, 1902', '1902', 'Italiano', 1952,
  'Filosofia Contemporânea', 'Avançado', '4–5 horas',
  'Croce identifica intuição com expressão: conhecer intuitivamente é expressar. A arte não é imitação, nem moral, nem conhecimento conceitual — é pura intuição-expressão, forma sem conceito.',
  'parchment',
  [{ title: 'Intuição, Expressão e Arte', estimatedMinutes: 20, content: `<h2>A Arte como Intuição-Expressão</h2>
<p class="dropcap">Conhecer intuitivamente é expressar; e nada mais, nada menos que isso. — Estética, cap. I</p>
<blockquote><em>"L\'arte è intuizione, e l\'intuizione è espressione."</em><br/><small>A arte é intuição, e a intuição é expressão.</small></blockquote>
<p>Croce distingue quatro formas do espírito: intuição (arte), conceito (filosofia/ciência), utilidade (economia/política) e moral. A arte é a forma mais primitiva e fundamental — precede o conceito. O artista não representa a realidade — expressa uma intuição particular, individual, irrepetível.</p>
<p>Consequências: não existe distinção de valor entre arte "alta" e "baixa" — qualquer expressão genuína é arte. A crítica literária e artística é a reprodução da intuição original na mente do crítico. A tradução é impossível em princípio — cada obra é expressão única, e trocar palavras é mudar a intuição. Estas teses influenciaram profundamente a crítica literária do século XX.</p>` }],
  ['croce', 'estética', 'intuição', 'expressão', 'arte']),

pd('mach-analysis-sensations', 'A Análise das Sensações', 'A Análise das Sensações — Ernst Mach', 'O empiriocriticismo e os elementos do mundo',
  'Ernst Mach (1838–1916)', 'Beiträge zur Analyse der Empfindungen, 1886', '1886', 'Alemão', 1916,
  'Filosofia Contemporânea', 'Avançado', '4–5 horas',
  'Mach propõe que a realidade é constituída por "elementos" — as sensações — que são ao mesmo tempo físicos e psíquicos, dependendo das relações que se consideram. Não há Eu permanente; há apenas feixe de sensações.',
  'parchment',
  [{ title: 'Sensações, Elementos e o Eu Insalvável', estimatedMinutes: 20, content: `<h2>O Eu é Insalvável</h2>
<p class="dropcap">O Eu não pode ser salvo. — A Análise das Sensações, cap. I. Mach descreve sua descoberta de que o "Eu" é um complexo de sensações, não uma substância.</p>
<blockquote><em>"Das Ich ist unrettbar."</em><br/><small>O Eu é insalvável.</small></blockquote>
<p>Os elementos de Mach: cor, som, calor, pressão, espaço, tempo — estes "elementos" não são primariamente psíquicos nem físicos. São psíquicos quando considerados em relação ao organismo; são físicos quando considerados em suas relações mútuas. A distinção mente-matéria é uma distinção de perspectiva, não de substância.</p>
<p>A economia do pensamento: a ciência não descreve a realidade em si — formula relações funcionais entre elementos que nos permitem antecipar experiências futuras com o menor esforço intelectual. Esta é a função adaptativa da ciência. O conceito de "átomo" é útil na medida em que organiza experiências — não porque descreve uma realidade invisível.</p>` }],
  ['mach', 'sensações', 'elementos', 'ciência', 'empirismo']),

pd('campanella-city-sun', 'A Cidade do Sol', 'A Cidade do Sol — Tommaso Campanella', 'A utopia teocrática e comunista do Renascimento',
  'Tommaso Campanella (1568–1639)', 'La Città del Sole, 1602 (pub. 1623)', '1602', 'Italiano', 1639,
  'Filosofia Renascentista', 'Iniciante', '1–2 horas',
  'Campanella descreve uma cidade ideal governada por um sacerdote-filósofo. Propriedade, família e educação são coletivas. A obra foi escrita na prisão, onde Campanella permaneceu 27 anos por heresia.',
  'parchment',
  [{ title: 'A República Solar', estimatedMinutes: 12, content: `<h2>A Cidade Governada pelo Sol</h2>
<p class="dropcap">Descreveram-me uma cidade chamada Cidade do Sol, construída sobre uma colina e dividida em sete círculos, um dentro do outro, chamados pelos sete planetas. — Cidade do Sol, início</p>
<blockquote><em>"Todo é do comum: a comida, as mulheres, os filhos, a honra e o prazer, segundo a lei e a razão."</em></blockquote>
<p>A Cidade do Sol é governada por um Sacerdote-Filósofo chamado "Hoh" (Sol), auxiliado por três príncipes: Pon (Poder), Sin (Sabedoria) e Mor (Amor). Todos os habitantes contribuem igualmente; o trabalho é obrigatório para todos, logo ninguém trabalha mais de quatro horas por dia.</p>
<p>A educação: as crianças são educadas coletivamente na contemplação de pinturas que cobrem as muralhas da cidade — toda a ciência, história natural, matemática e moral estão representadas em imagens. Campanella antecipa os museus e a pedagogia visual. Escrita enquanto preso pela Inquisição, é ao mesmo tempo utopia política e protesto pela liberdade intelectual.</p>` }],
  ['campanella', 'utopia', 'comunismo', 'renascimento', 'cidade']),

pd('diderot-dalembert-dream', 'O Sonho de d\'Alembert', 'O Sonho de d\'Alembert — Denis Diderot', 'O materialismo radical e a continuidade da matéria sensível',
  'Denis Diderot (1713–1784)', 'Le Rêve de d\'Alembert, 1769 (pub. 1830)', '1769', 'Francês', 1784,
  'Filosofia Moderna', 'Intermediário', '2–3 horas',
  'Diderot propõe que matéria e sensibilidade são inseparáveis. A vida não é distinta da matéria inerte — é matéria organizada de certa forma. O homem é um instrumento sensível.',
  'parchment',
  [{ title: 'Matéria, Vida e Sensibilidade', estimatedMinutes: 18, content: `<h2>A Sensibilidade Universal da Matéria</h2>
<p class="dropcap">Se a sensibilidade é uma propriedade geral da matéria, então a pedra deve sentir algo. Mas o mármore não tem a organização necessária para sentir como eu sinto — a diferença é de organização, não de princípio. — O Sonho de d\'Alembert</p>
<blockquote><em>"De la matière inerte à la matière sensible — voilà le grand saut."</em><br/><small>Da matéria inerte à matéria sensível — eis o grande salto.</small></blockquote>
<p>Diderot é um dos primeiros materialistas radicais modernos. Refuta o dualismo cartesiano: não há duas substâncias — só matéria. A vida é matéria organizada de certa forma; a morte é desorganização. O que chamamos de "alma" é a função do cérebro — como a digestão é a função do estômago.</p>
<p>O sonho de d\'Alembert: enquanto dormindo, o matemático divaga em voz alta sobre o problema da sensibilidade e do continuum. Diderot usa o sonho para dizer o que não poderia dizer acordado — as consequências radicais do materialismo: a ausência de livre-arbítrio, a continuidade do homem com os animais, a imortalidade impossível.</p>` }],
  ['diderot', 'materialismo', 'matéria', 'sensibilidade', 'iluminismo']),

pd('holbach-system-nature', 'Sistema da Natureza', 'Sistema da Natureza — Baron d\'Holbach', 'O ateísmo filosófico e o determinismo natural',
  'Paul-Henri Thiry, Barão d\'Holbach (1723–1789)', 'Système de la Nature, 1770', '1770', 'Francês', 1789,
  'Filosofia Moderna', 'Avançado', '5–6 horas',
  'O "catecismo do ateísmo" do Iluminismo. d\'Holbach defende que a natureza é tudo, Deus não existe, e o homem é determinado pela necessidade natural. A religião é fruto do medo e instrumento de opressão.',
  'parchment',
  [{ title: 'A Natureza como Único Princípio', estimatedMinutes: 22, content: `<h2>A Natureza é Tudo — Deus é Nada</h2>
<p class="dropcap">O universo, esta vasta assembleia de tudo que existe, não nos oferece nada além de matéria e movimento: o conjunto nos apresenta apenas uma cadeia imensa de causas e efeitos. — Sistema da Natureza, I.1</p>
<blockquote><em>"A teologia não é senão a ignorância das causas naturais elevada à categoria de ciência."</em></blockquote>
<p>d\'Holbach é o mais radical dos filósofos iluministas. Contra Voltaire (deísta), propõe o ateísmo completo: Deus é uma hipótese inútil. As causas naturais explicam tudo. A religião surgiu do medo diante do incompreensível e foi explorada pelos sacerdotes para dominar os povos.</p>
<p>O determinismo radical: não há livre-arbítrio. O homem é uma máquina — um autômato movido por causas externas. Mas esta conclusão não é desoladora: uma vez que compreendemos as causas do comportamento, podemos modificá-las. A educação, as leis e as instituições moldaram o homem que é — podem moldá-lo melhor. O determinismo é a base de uma política racional.</p>` }],
  ['holbach', 'ateísmo', 'materialismo', 'natureza', 'determinismo']),

pd('proclus-elements-theology', 'Elementos de Teologia', 'Elementos de Teologia — Proclo', 'O sistema neoplatônico completo da emanação e retorno',
  'Proclo Diádoco (412–485 d.C.)', 'Stoicheiosis Theologike, séc. V d.C.', '450', 'Grego', 485,
  'Filosofia Antiga', 'Avançado', '5–6 horas',
  'Os Elementos de Teologia são a mais sistemática exposição do neoplatonismo tardio. 211 proposições demonstradas more geometrico derivam toda a realidade do Uno como sistema de emanações e retornos.',
  'parchment',
  [{ title: 'O Uno e a Hierarquia do Ser', estimatedMinutes: 22, content: `<h2>A Estrutura Triádica do Real</h2>
<p class="dropcap">Todo o que é capaz de retornar a si mesmo é incorpóreo. — Elementos de Teologia, prop. 15</p>
<blockquote><em>"Πᾶν τὸ αὐτοκίνητον αἴτιον ἑαυτῷ τῆς εἰς ἀεὶ ὑπάρξεως."</em><br/><small>Todo o que se move a si mesmo é a causa de sua própria existência eterna.</small></blockquote>
<p>Proclo sistematiza o neoplatonismo em tríades: permanência, processão, retorno (monē, proodos, epistrophē). Todo ser procede do Uno sem que o Uno se diminua; e todo ser tende a retornar à sua fonte. Esta estrutura triádica permeia cada nível da realidade: Uno, Inteligência, Alma, Natureza, Matéria.</p>
<p>A influência: os Elementos de Teologia influenciaram o Pseudo-Dionísio Areopagita, Johannes Scotus Eriúgena, São Tomás de Aquino (que o conheceu através do Liber de Causis) e toda a mística cristã medieval. A estrutura neoplatônica da emanação e retorno tornou-se o esquema cosmológico dominante do mundo medieval cristão e islâmico.</p>` }],
  ['proclo', 'neoplatonismo', 'uno', 'emanação', 'metafísica']),

pd('porphyry-isagoge', 'Isagoge', 'Isagoge — Porfírio de Tiro', 'Introdução às Categorias de Aristóteles e o problema dos universais',
  'Porfírio de Tiro (234–305 d.C.)', 'Isagoge eis tas Kategorias, c. 270 d.C.', '270', 'Grego', 305,
  'Filosofia Antiga', 'Intermediário', '2–3 horas',
  'A Isagoge é uma introdução às Categorias de Aristóteles que se tornou o texto filosófico mais comentado da Idade Média. A pergunta de Porfírio sobre os universais — se são reais, conceptuais ou verbais — gerou o debate medieval entre realismo e nominalismo.',
  'parchment',
  [{ title: 'O Problema dos Universais', estimatedMinutes: 18, content: `<h2>Gêneros, Espécies e o Problema dos Universais</h2>
<p class="dropcap">Evitarei aprofundar-me aqui na questão de saber se os gêneros e as espécies subsistem em si mesmos, ou se apenas existem nos pensamentos; e se subsistindo, são corpóreos ou incorpóreos... — Isagoge, Prefácio</p>
<blockquote><em>"Os universais existem ou são meras palavras?" — A questão que dividiu toda a Filosofia Medieval.</em></blockquote>
<p>Porfírio apresenta os cinco predicáveis: gênero, espécie, diferença específica, próprio e acidente. Estes são as categorias básicas de todo predicado possível. Mas levanta e evita responder a questão que dominará séculos: os universais (homem, animal, planta) existem fora da mente, ou são apenas conceitos, ou apenas palavras?</p>
<p>O debate medieval: Boécio traduziu a Isagoge para o latim e comentou-a — essa tradução foi o canal pelo qual Porfírio chegou à Idade Média. A questão dos universais opôs realistas (os universais existem: Platão, Anselmo, Alberto Magno) a nominalistas (são apenas palavras: Roscelino, Ockham) e conceptualistas (existem na mente: Abelardo, Tomás de Aquino).</p>` }],
  ['porfírio', 'universais', 'categorias', 'neoplatonismo', 'medieval']),

pd('diogenes-laertius-lives', 'Vidas dos Filósofos', 'Vidas dos Filósofos — Diógenes Laércio', 'Biografia e doutrinas dos filósofos gregos',
  'Diógenes Laércio (séc. III d.C.)', 'Bioi kai gnomai ton en philosophia eudokimesanton, c. 230 d.C.', '230', 'Grego', 240,
  'Filosofia Antiga', 'Iniciante', '6–8 horas',
  'A principal fonte de informações biográficas e doutrinárias sobre os filósofos gregos. Dez livros cobrindo Tales, Sócrates, Platão, Aristóteles, os estoicos, os epicuristas e muitos outros.',
  'parchment',
  [{ title: 'Histórias e Máximas dos Filósofos', estimatedMinutes: 20, content: `<h2>A Vida e as Palavras dos Sábios</h2>
<p class="dropcap">Tales de Mileto foi o primeiro a dizer que a água é o princípio de tudo; e foi ele o primeiro a usar o nome de sábio. — Vidas, I.24</p>
<blockquote><em>"Sócrates dizia que há uma única coisa que sabe: que nada sabe."</em> — Vidas, II.32</blockquote>
<p>Diógenes Laércio preservou fragmentos e anedotas que de outra forma se perderiam. Sabemos que Heráclito acreditava no fogo como princípio universal através de Laércio. A morte de Sócrates, os paradoxos de Zenão, a vida excêntrica de Diógenes de Sínope no barril — são histórias transmitidas por Laércio.</p>
<p>O valor histórico: embora não seja um filósofo original, Laércio é indispensável. Citou fontes hoje perdidas, transmitiu anedotas que revelam caracteres filosóficos, e listou as obras de cada filósofo. Para os estoicos e epicuristas, é frequentemente a única fonte detalhada. As Máximas Capitais de Epicuro, transmitidas por Laércio, são o texto epicurista mais completo que possuímos.</p>` }],
  ['diógenes laércio', 'história', 'filósofos', 'grécia', 'biografias']),

pd('ficino-symposium-commentary', 'Comentário ao Banquete de Platão', 'Comentário ao Banquete de Platão — Marsilio Ficino', 'O amor platônico e a teologia do belo',
  'Marsilio Ficino (1433–1499)', 'De Amore — Commentarium in Convivium Platonis, 1469', '1469', 'Latim', 1499,
  'Filosofia Renascentista', 'Intermediário', '3–4 horas',
  'Ficino traduz e comenta o Banquete de Platão, criando a teoria do "amor platônico" que influenciou toda a cultura renascentista. O belo sensível é degrau de ascensão ao belo inteligível e a Deus.',
  'parchment',
  [{ title: 'O Amor Platônico e a Beleza Divina', estimatedMinutes: 18, content: `<h2>Do Belo Sensível ao Belo Divino</h2>
<p class="dropcap">O amor é o desejo de fruir a beleza. A beleza é um certo esplendor de Deus que, penetrando nos anjos primeiro, na alma depois e nos corpos em seguida, atrai a si tudo pelo maravilhoso. — De Amore, I.3</p>
<blockquote><em>"Amor est desiderium pulchritudinis."</em><br/><small>O amor é o desejo da beleza.</small></blockquote>
<p>Ficino lidera a Academia Platônica de Florença, patrocinada pelos Médici. Ele traduz Platão, Plotino e os herméticos para o latim — sem ele, o Renascimento não teria acesso direto a Platão. O "amor platônico" no sentido ficineano é o impulso do belo sensível para o belo inteligível — dos corpos belos para a beleza das almas, das almas para a beleza divina.</p>
<p>A síntese neoplatônica-cristã: para Ficino, Platão e Cristo ensinam a mesma verdade em linguagens diferentes. O Deus cristão é o Uno de Plotino; a ascensão platônica é a contemplação mística cristã. Esta síntese tornou Ficino suspeito de heresia, mas também o tornou o mais influente filósofo do Renascimento italiano.</p>` }],
  ['ficino', 'amor platônico', 'beleza', 'renascimento', 'neoplatonismo']),

pd('condillac-essay-knowledge', 'Ensaio sobre a Origem dos Conhecimentos Humanos', 'Ensaio sobre a Origem dos Conhecimentos — Condillac', 'O sensacionismo e a origem linguística do pensamento',
  'Étienne Bonnot de Condillac (1715–1780)', 'Essai sur l\'origine des connaissances humaines, 1746', '1746', 'Francês', 1780,
  'Filosofia Moderna', 'Intermediário', '3–4 horas',
  'Condillac radicaliza Locke: não apenas todo conhecimento vem dos sentidos — o próprio pensamento é transformado pela linguagem. Sem signos linguísticos, não haveria operações complexas do espírito.',
  'parchment',
  [{ title: 'Sensação, Linguagem e Pensamento', estimatedMinutes: 18, content: `<h2>A Linguagem como Condição do Pensamento</h2>
<p class="dropcap">As operações da alma são apenas transformações das sensações originais. E a linguagem não é apenas instrumento do pensamento — é sua condição de possibilidade. — Ensaio, II.i.1</p>
<blockquote><em>"Les langues sont des méthodes analytiques."</em><br/><small>As línguas são métodos analíticos.</small></blockquote>
<p>Condillac parte de Locke mas vai além: não é suficiente dizer que as ideias vêm dos sentidos. É preciso explicar como simples sensações se tornam memória, imaginação, atenção, raciocínio. A resposta: pela linguagem. Os signos linguísticos permitem fixar, comparar e encadear as sensações — sem eles, o pensamento permanece no imediato.</p>
<p>O homem-estátua: em seu Tratado das Sensações (1754), Condillac imagina uma estátua humana que vai gradualmente adquirindo os sentidos, um a um, e explica como todas as faculdades intelectuais emergem das sensações organizadas por signos. Esta experiência de pensamento influenciou a linguística e a psicologia modernas.</p>` }],
  ['condillac', 'sensação', 'linguagem', 'pensamento', 'empirismo']),

pd('helvetius-de-esprit', 'Do Espírito', 'Do Espírito — Claude Adrien Helvétius', 'O hedonismo moral e a reforma da educação',
  'Claude Adrien Helvétius (1715–1771)', 'De l\'Esprit, 1758', '1758', 'Francês', 1771,
  'Filosofia Moderna', 'Intermediário', '3–4 horas',
  'Helvétius propõe que o interesse (busca do prazer, fuga da dor) é o único motor da ação humana. O espírito é produto da educação e do ambiente — não do gênio inato. Foi queimado pela censura e condenado pelo Papa.',
  'parchment',
  [{ title: 'Interesse, Educação e Virtude', estimatedMinutes: 18, content: `<h2>O Interesse como Princípio Universal</h2>
<p class="dropcap">O interesse pessoal é o único e universal estimador do mérito das ações humanas. — Do Espírito, I.i</p>
<blockquote><em>"L\'éducation peut tout."</em><br/><small>A educação pode tudo.</small></blockquote>
<p>Helvétius é o mais radical dos materialistas do Iluminismo na esfera moral. Se o interesse é o único motor, então a virtude pode ser promovida reformando as leis e instituições de modo que o interesse privado coincida com o bem público. A educação, não o gênio inato, determina o caráter — todos nascem com capacidade igual; são as circunstâncias que os diferenciam.</p>
<p>A reação: o livro foi queimado publicamente, condenado pela Sorbonne e pelo Papa. Rousseau o criticou. Kant o refutou. Mas Bentham, pai do utilitarismo, reconheceu Helvétius como seu precursor imediato — o princípio da máxima felicidade do maior número é a versão benthamita do interesse de Helvétius.</p>` }],
  ['helvetius', 'interesse', 'educação', 'hedonismo', 'iluminismo']),

pd('kierkegaard-either-or', 'Ou/Ou', 'Ou/Ou — Søren Kierkegaard', 'Os estágios estético e ético da existência humana',
  'Søren Kierkegaard (1813–1855)', 'Enten – Eller, 1843', '1843', 'Dinamarquês', 1855,
  'Filosofia Contemporânea', 'Avançado', '6–8 horas',
  'Ou/Ou apresenta dois manuscritos fictícios: o Diário do Sedutor (estágio estético — viver para o prazer, o interessante) e os Papéis de Wilhelm o Juiz (estágio ético — compromisso com o dever, o casamento). Kierkegaard não resolve — o leitor deve escolher.',
  'parchment',
  [{ title: 'O Estético e o Ético', estimatedMinutes: 24, content: `<h2>O Dilema dos Estágios da Existência</h2>
<p class="dropcap">A escolha autêntica é aquela que me constitui como Eu — não a escolha de isto ou aquilo, mas a escolha de mim mesmo como ser que escolhe, que assume responsabilidade. — Ou/Ou, II (Wilhelm)</p>
<blockquote><em>"O esteta pula de possibilidade em possibilidade, nunca se tornando ele mesmo."</em></blockquote>
<p>O estágio estético: viver no imediato, na variação, no prazer do momento. O Don Juan é o esteta musical puro — cada conquista é completa em si, não tem história. O "Diário do Sedutor" mostra o esteta intelectual — que planeja a sedução como obra de arte. O problema do estético: a melancolia, o tdio, o desespero vazio quando o prazer se esgota.</p>
<p>O estágio ético: a escolha de si mesmo, o compromisso. Wilhelm defende o casamento como a escolha ética por excelência — não por prazer, mas por dever, continuidade, história. O ético tem profundidade porque tem passado e futuro. Mas Kierkegaard (através de um terceiro pseudônimo, Victor Eremita) sugere que nem o estético nem o ético são suficientes — falta o estágio religioso.</p>` }],
  ['kierkegaard', 'estético', 'ético', 'existência', 'escolha']),

pd('huxley-evolution-ethics', 'Evolução e Ética', 'Evolução e Ética — Thomas Henry Huxley', 'O conflito entre o processo cósmico e o processo ético',
  'Thomas Henry Huxley (1825–1895)', 'Evolution and Ethics, 1893', '1893', 'Inglês', 1895,
  'Filosofia Contemporânea', 'Intermediário', '2–3 horas',
  'Huxley, o "Buldogue de Darwin", argumenta paradoxalmente que a evolução não pode ser o fundamento da ética. O progresso moral consiste em resistir ao processo cósmico, não em segui-lo.',
  'parchment',
  [{ title: 'Evolução Contra Ética', estimatedMinutes: 15, content: `<h2>A Ética Como Resistência à Natureza</h2>
<p class="dropcap">O processo cósmico não tem relação com fins morais; a espécie mais apta a sobreviver não é necessariamente a mais desejável moralmente. — Evolução e Ética, §11</p>
<blockquote><em>"The ethical process is in opposition to the cosmic process."</em><br/><small>O processo ético está em oposição ao processo cósmico.</small></blockquote>
<p>Huxley refuta o darwinismo social: a sobrevivência do mais apto não é norma moral — é descrição de fato. O tigre sobrevive por ser feroz; isso não o torna moralmente superior. A civilização humana é precisamente o esforço de criar um jardim cultivado dentro da selva do processo cósmico.</p>
<p>A ética como jardinagem: assim como o jardineiro modifica a natureza selecionando plantas, a civilização modifica a natureza humana através de instituições, educação e leis. Esta modificação não segue a natureza — resiste a ela. A compaixão, a justiça e a cooperação são conquistas contra os impulsos naturais.</p>` }],
  ['huxley', 'evolução', 'ética', 'darwinismo', 'natureza']),

pd('james-varieties-religious', 'As Variedades da Experiência Religiosa', 'As Variedades da Experiência Religiosa — William James', 'A psicologia e a filosofia da experiência mística',
  'William James (1842–1910)', 'The Varieties of Religious Experience, 1902', '1902', 'Inglês', 1910,
  'Filosofia Contemporânea', 'Iniciante', '5–6 horas',
  'James examina a experiência religiosa de modo empírico e psicológico. Recusa tanto o ateísmo que nega quanto o dogmatismo que afirma sem experiência. O critério pragmático: os "frutos" da experiência religiosa na vida do crente.',
  'parchment',
  [{ title: 'Experiência Mística e Pragmatismo', estimatedMinutes: 22, content: `<h2>Os Frutos da Experiência Religiosa</h2>
<p class="dropcap">A experiência religiosa deve ser julgada por seus frutos — não por suas raízes (origem psicológica) nem por seus ramos (doutrina teológica). Pelo que produz na vida, julgamos se é boa ou má. — Variedades, Conferência XIV</p>
<blockquote><em>"God is real since he produces real effects."</em><br/><small>Deus é real pois produz efeitos reais.</small></blockquote>
<p>As quatro marcas do misticismo (James): inefabilidade (não pode ser transmitida por palavras), qualidade noética (revela algo), transitoriedade (dura pouco) e passividade (o sujeito sente-se apreendido por algo maior). James descreve centenas de experiências místicas — cristãs, budistas, islâmicas, filosóficas — com imparcialidade científica.</p>
<p>O pragmatismo religioso: James não afirma nem nega Deus como fato metafísico. Afirma que a crença religiosa pode ser "verdadeira" no sentido pragmático: produz bem, orienta a vida, fortalece o caráter. O "universo mais amplo" que o religioso vislumbra pode ser real — e nossa fé pode ser a condição de sua realização.</p>` }],
  ['james', 'religião', 'misticismo', 'experiência', 'pragmatismo']),

pd('bergson-time-free-will', 'Ensaio sobre os Dados Imediatos da Consciência', 'Ensaio sobre os Dados Imediatos da Consciência — Henri Bergson', 'O tempo vivido e a crítica do determinismo',
  'Henri Bergson (1859–1941)', 'Essai sur les données immédiates de la conscience, 1889', '1889', 'Francês', 1941,
  'Filosofia Contemporânea', 'Avançado', '4–5 horas',
  'A tese de doutorado de Bergson distingue o tempo espacializado (dos relógios, da ciência) do tempo vivido (durée) — a pura qualidade da consciência. Nesta duração interior, o determinismo não se aplica: há liberdade genuína.',
  'parchment',
  [{ title: 'Durée e Liberdade Interior', estimatedMinutes: 20, content: `<h2>O Tempo Vivido e a Liberdade</h2>
<p class="dropcap">A duração é o progresso contínuo do passado que corrói o futuro e incha enquanto avança. Passado e presente não são partes do tempo — o passado é o que age no presente. — Dados Imediatos, cap. II</p>
<blockquote><em>"La durée est le fond de notre être et le fond des choses."</em><br/><small>A duração é o fundo de nosso ser e o fundo das coisas.</small></blockquote>
<p>Bergson critica a psicologia associacionista: ela representa os estados mentais como partes justapostas no espaço — como grânulos de areia. Mas a vida interior é fluída, interpenetrante, sem partes nítidas. A tristeza de hoje não é a mesma de ontem — está carregada de tudo o que vivemos. O tempo interior é qualitativo, não quantitativo.</p>
<p>A liberdade: o determinismo supõe que dado o estado interior em T1, o ato em T2 é necessário. Mas o estado interior nunca se repete — a duração é criação contínua. O "eu profundo" que age livremente não é aquele que o determinista considera — é a duração em seu fluir criativo.</p>` }],
  ['bergson', 'tempo', 'duração', 'liberdade', 'consciência']),

pd('plotinus-on-beauty', 'Sobre o Belo — Enéada I.6', 'Sobre o Belo — Plotino', 'A ascensão neoplatônica do belo sensível ao belo inteligível',
  'Plotino (205–270 d.C.)', 'Enneads I.6, c. 255 d.C.', '255', 'Grego', 270,
  'Filosofia Antiga', 'Intermediário', '1–2 horas',
  'O tratado mais poético de Plotino. A alma reconhece a beleza porque é ela mesma bela — parente do Belo em si. A ascensão do belo corporal ao belo das almas, das almas à Inteligência, da Inteligência ao Uno.',
  'parchment',
  [{ title: 'A Ascensão ao Belo Supremo', estimatedMinutes: 15, content: `<h2>Do Belo dos Corpos ao Uno</h2>
<p class="dropcap">O belo está fundamentalmente no que é visto; mas é buscado também no que é ouvido, nas combinações de palavras e em toda a música... — Sobre o Belo, I.6.1</p>
<blockquote><em>"Πρόσθεν δεῖ ψυχὴν θεάσασθαι ἑαυτὴν καλήν."</em><br/><small>Antes de tudo, a alma deve contemplar a si mesma como bela.</small></blockquote>
<p>Por que algo é belo? Plotino rejeita a teoria da simetria (beleza = proporção das partes): uma face simétrica pode ser feia; uma cor simples e pura é bela sem simetria. A beleza é a Forma que penetra na matéria — a matéria é bela na medida em que participa da Forma.</p>
<p>A ascensão: do belo dos corpos (o brilho da Forma na matéria), ao belo das almas (virtudes, sabedoria), ao belo da Inteligência (as Formas em si mesmas), ao Uno que é além da beleza — o princípio do qual a beleza flui. "Foge a ti mesmo para dentro de ti mesmo" — o retorno ao Uno é retorno ao fundo mais profundo da própria alma.</p>` }],
  ['plotino', 'beleza', 'ascensão', 'uno', 'neoplatonismo']),

pd('mill-subjection-women', 'A Sujeição das Mulheres', 'A Sujeição das Mulheres — John Stuart Mill', 'O argumento filosófico pela igualdade entre os sexos',
  'John Stuart Mill (1806–1873)', 'The Subjection of Women, 1869', '1869', 'Inglês', 1873,
  'Filosofia Contemporânea', 'Iniciante', '3–4 horas',
  'Mill argumenta que a subordinação legal das mulheres é injusta e contrária ao bem público. A igualdade entre os sexos não é apenas justa — é benéfica para a civilização. É o texto filosófico mais importante do feminismo do século XIX.',
  'parchment',
  [{ title: 'Igualdade, Liberdade e o Argumento Filosófico', estimatedMinutes: 18, content: `<h2>Por Que a Igualdade dos Sexos é Justa e Necessária</h2>
<p class="dropcap">O princípio que regula as relações sociais existentes entre os dois sexos — a subordinação legal de um ao outro — é errado em si mesmo, e agora um dos principais obstáculos ao melhoramento humano. — A Sujeição das Mulheres, cap. I</p>
<blockquote><em>"The legal subordination of one sex to the other is wrong in itself."</em></blockquote>
<p>Mill identifica dois argumentos comuns para a subordinação: (1) é natural; (2) as mulheres preferem assim. Refuta ambos: o que se chama de "natureza" feminina é produto da educação e das circunstâncias — nunca houve condições para observar a natureza feminina livre. E as "preferências" são adaptações à sujeição, não preferências livres.</p>
<p>O argumento positivo: a igualdade dos sexos duplica o reservatório de talentos disponíveis para a civilização. A exclusão das mulheres das profissões, da política, da educação superior é um desperdício colossal. E a família baseada na dominância masculina é a escola do despotismo — os filhos aprendem que quem tem poder pode dominar.</p>` }],
  ['mill', 'feminismo', 'igualdade', 'liberdade', 'mulheres']),

pd('locke-letter-toleration', 'Carta sobre a Tolerância', 'Carta sobre a Tolerância — John Locke', 'Os limites do governo e a liberdade de consciência',
  'John Locke (1632–1704)', 'Epistola de Tolerantia, 1689', '1689', 'Latim', 1704,
  'Filosofia Moderna', 'Iniciante', '1–2 horas',
  'Locke argumenta que o governo tem poder sobre corpos e propriedades, mas não sobre almas. A coerção religiosa é ineficaz e injusta. Cada homem deve responder por sua própria alma perante Deus.',
  'parchment',
  [{ title: 'A Separação entre Igreja e Estado', estimatedMinutes: 15, content: `<h2>O Governo Não Pode Salvar Almas</h2>
<p class="dropcap">A tolerância de quem têm opiniões religiosas diferentes é tão conforme ao evangelho de Jesus Cristo, e tão conforme à razão da humanidade genuína, que parece monstruoso que os homens sejam cegos a uma luz tão clara. — Carta sobre a Tolerância</p>
<blockquote><em>"O poder civil não tem jurisdição sobre a salvação das almas."</em></blockquote>
<p>Locke distingue dois tipos de poder: o civil (corpos, propriedades, paz externa) e o eclesiástico (almas, adoração, salvação). São por natureza distintos — nenhum pode invadir o terreno do outro. A coerção religiosa é inútil: uma crença forçada não é crença — e mesmo que o soberano pudesse forçar a aparência de crença, não poderia forçar a salvação.</p>
<p>Os limites da tolerância: Locke não tolera ateus (que nega a base dos juramentos) nem os que devem obediência a um poder estrangeiro (alusão aos católicos). Estas exclusões revelam os limites do liberalismo lockiano — mas o princípio geral da separação Igreja-Estado tornou-se pedra angular das constituições modernas.</p>` }],
  ['locke', 'tolerância', 'liberdade', 'religião', 'estado']),

pd('augustine-city-god', 'A Cidade de Deus', 'A Cidade de Deus — Santo Agostinho', 'As duas cidades e a filosofia cristã da história',
  'Santo Agostinho de Hipona (354–430 d.C.)', 'De Civitate Dei, 413–426 d.C.', '426', 'Latim', 430,
  'Teologia', 'Avançado', '8–10 horas',
  'A grande obra política e filosófica de Agostinho, escrita após o saque de Roma em 410. Distingue a Cidade de Deus (amor a Deus até o desprezo de si) da Cidade do Homem (amor a si até o desprezo de Deus). A história é campo de batalha entre as duas.',
  'parchment',
  [{ title: 'As Duas Cidades', estimatedMinutes: 25, content: `<h2>Amor Dei e Amor Sui — As Duas Cidades</h2>
<p class="dropcap">Dois amores fundaram duas cidades: o amor de si até o desprezo de Deus fundou a cidade terrena; o amor de Deus até o desprezo de si fundou a cidade celestial. — Cidade de Deus, XIV.28</p>
<blockquote><em>"Fecerunt itaque civitates duas amores duo."</em><br/><small>Dois amores, portanto, fundaram duas cidades.</small></blockquote>
<p>Agostinho escreve em resposta aos pagãos que culpam o Cristianismo pela queda de Roma. Sua resposta histórica: Roma nunca foi justa — foi construída sobre fratricídio (Rômulo matou Remo), sobre domínio e libido. Os deuses de Roma não a salvaram em seus piores momentos; os mártires cristãos suportaram o saque com dignidade.</p>
<p>A filosofia da história: o tempo linear tem sentido — vai da Criação à Queda, da Redenção ao Juízo Final. Esta visão cristã da história como drama com início, meio e fim se opõe à visão cíclica greco-romana. Agostinho é o fundador da filosofia cristã da história — e influenciou diretamente Hegel, Marx e todos que concebem a história como processo com direção e sentido.</p>` }],
  ['agostinho', 'cidade de deus', 'história', 'política', 'teologia']),

pd('aquinas-summa-contra-gentiles', 'Suma Contra os Gentios', 'Suma Contra os Gentios — Tomás de Aquino', 'A defesa racional da fé cristã contra os não-cristãos',
  'Tomás de Aquino (1225–1274)', 'Summa contra Gentiles, 1259–1264', '1264', 'Latim', 1274,
  'Teologia', 'Avançado', '8–10 horas',
  'Escrita para missionários que dialogavam com muçulmanos e judeus, a Suma contra os Gentios argumenta a fé cristã por razão natural. Alguns artigos são demonstráveis pela razão (existência de Deus); outros apenas pela revelação (Trindade, Encarnação).',
  'parchment',
  [{ title: 'Razão, Fé e as Verdades Demonstráveis', estimatedMinutes: 22, content: `<h2>O que a Razão Pode Demonstrar sobre Deus</h2>
<p class="dropcap">Como a fé da Sagrada Escritura não pode ser contrária à razão natural, da qual vem a ciência, é preciso que qualquer aparente conflito provenha de uma compreensão defeituosa da razão ou da Escritura. — Suma contra os Gentios, I.7</p>
<blockquote><em>"Gratia non tollit naturam, sed perficit."</em><br/><small>A graça não suprime a natureza, mas a aperfeiçoa.</small></blockquote>
<p>Aquino distingue verdades de razão (existência de Deus, unicidade divina, espiritualidade da alma) de verdades de fé (Trindade, Encarnação, Ressurreição). As primeiras podem ser demonstradas por argumentos racionais acessíveis a todos; as segundas são reveladas e aceitas pela fé, mas não são irracionais — são suprarracionais.</p>
<p>O argumento para o diálogo: porque as verdades de razão são comuns, é possível dialogar com muçulmanos, judeus e pagãos usando a razão compartilhada. Só após estabelecer as verdades naturais se apela à Revelação. Esta metodologia missionária e apologética tornou Aquino o modelo da teologia dialogal até hoje.</p>` }],
  ['aquino', 'razão', 'fé', 'deus', 'teologia']),

pd('anselm-cur-deus-homo', 'Por Que Deus Se Fez Homem', 'Por Que Deus Se Fez Homem — Santo Anselmo', 'A teoria da satisfação e a necessidade racional da Encarnação',
  'Santo Anselmo de Cantuária (1033–1109)', 'Cur Deus Homo, 1098', '1098', 'Latim', 1109,
  'Teologia', 'Avançado', '3–4 horas',
  'Anselmo demonstra por razão necessária (sem apelar à Escritura) que a Encarnação do Filho de Deus era necessária para a salvação humana. Introduz a teoria da satisfação vicária, que influenciou toda a soteriologia ocidental.',
  'parchment',
  [{ title: 'A Necessidade Racional da Encarnação', estimatedMinutes: 20, content: `<h2>Remoto Christo — Fides Quaerens Intellectum</h2>
<p class="dropcap">Proponho-me mostrar por razões necessárias, deixando Cristo de lado como se nunca tivesse existido, que nenhum homem pode ser salvo sem ele. — Cur Deus Homo, I.25</p>
<blockquote><em>"Necesse est ergo ut pro peccato hominis satisfactio fiat."</em><br/><small>É necessário, portanto, que seja feita satisfação pelo pecado do homem.</small></blockquote>
<p>O argumento: o pecado é uma infinita ofensa à honra de Deus — porque Deus é infinito, qualquer ofensa a Ele é infinita. A satisfação deve ser proporcionada à ofensa: deve ser infinita. Mas apenas um ser infinito pode oferecer satisfação infinita. E apenas um ser humano pode satisfazer em nome da humanidade. Logo: o satisfator deve ser simultaneamente Deus e homem — a Encarnação é logicamente necessária.</p>
<p>A influência: a teoria da satisfação de Anselmo tornou-se dominante na teologia ocidental (tanto católica quanto protestante). A soteriologia reformada (expiação penal substitutiva) é um desenvolvimento desta teoria. Abelardo a criticou propondo a teoria moral (a salvação como exemplo e inspiração). O debate continua até hoje.</p>` }],
  ['anselmo', 'encarnação', 'satisfação', 'soteriologia', 'teologia']),

pd('calvin-institutes', 'Institutos da Religião Cristã', 'Institutos da Religião Cristã — João Calvino', 'A teologia sistemática da Reforma',
  'João Calvino (1509–1564)', 'Institutio Christianae Religionis, 1536 (ed. def. 1559)', '1559', 'Latim', 1564,
  'Teologia', 'Avançado', '10+ horas',
  'A obra mestra da teologia reformada. Calvino expõe sistematicamente a doutrina cristã: o conhecimento de Deus e de nós mesmos, a Trindade, o pecado, a graça, a predestinação, os sacramentos e o governo da Igreja.',
  'parchment',
  [{ title: 'O Conhecimento de Deus e de Nós Mesmos', estimatedMinutes: 25, content: `<h2>Duplo Conhecimento: Deus e o Homem</h2>
<p class="dropcap">Quase toda a soma de nossa sabedoria — em que consiste o verdadeiro e sólido saber — está contida em duas partes: o conhecimento de Deus e o de nós mesmos. — Institutos, I.1.1</p>
<blockquote><em>"Nusquam tutus quies nisi Deum contemplemur."</em><br/><small>Em nenhum lugar há descanso seguro a não ser que contemplemos a Deus.</small></blockquote>
<p>Calvino abre os Institutos com uma afirmação epistemológica fundamental: conhecimento de Deus e autoconhecimento são inseparáveis. Sem conhecer a majestade de Deus, não percebemos nossa miséria; sem perceber nossa miséria, não buscamos a Deus. Os dois conhecimentos se implicam mutuamente.</p>
<p>A predestinação: Deus elegeu desde antes da criação quem seria salvo e quem seria condenado — não por previsão de méritos futuros, mas por pura soberania. Esta doutrina, que Calvino defende como humildade teológica máxima (nega qualquer mérito humano na salvação), tornou-se a marca distintiva do calvinismo e gerou séculos de debate. A "eleição dupla" — eleição e reprovação — é a formulação mais rigorosa e mais contestada de Calvino.</p>` }],
  ['calvino', 'predestinação', 'graça', 'teologia', 'reforma']),

];
