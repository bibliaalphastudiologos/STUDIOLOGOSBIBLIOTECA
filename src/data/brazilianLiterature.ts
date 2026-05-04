import { Ebook } from '../types';

function bl(
  id: string, title: string, fullTitle: string, subtitle: string,
  author: string, originalWork: string, year: string, lang: string, deathYear: number,
  category: string, level: string, readTime: string, description: string,
  cover: string, chapters: { title: string; estimatedMinutes: number; content: string }[],
  tags: string[]
): Ebook {
  return {
    id, title, fullTitle, subtitle, authorReference: author,
    originalWork, yearPublished: year, originalLanguage: lang,
    category, level, estimatedReadTime: readTime, description,
    coverStyle: cover, chapters,
    tags: ['literatura', 'domínio público', ...tags],
    contentTypeLabel: 'public_domain',
    copyrightStatus: { isPublicDomain: true, deathYear, verifiedUnder: 'Lei 9.610/98 — 70 anos após falecimento do autor' },
    isFree: false, isPremium: true, isNew: false, isFeatured: true,
    chapterCount: chapters.length, pageCount: chapters.length * 25,
    readerFeatures: { bookmarks: true, notes: true, highlights: true, search: true, fontControl: true, focusMode: true },
  };
}

export const brazilianLiteratureWorks: Ebook[] = [

bl('machado-dom-casmurro', 'Dom Casmurro', 'Dom Casmurro — Machado de Assis', 'Capitu traiu Bentinho? O grande enigma da literatura brasileira',
  'Machado de Assis (1839–1908)', 'Dom Casmurro, 1899', '1899', 'Português', 1908,
  'Literatura', 'Intermediário', '5–6 horas',
  'Dom Casmurro é o romance mais célebre de Machado de Assis. Bentinho, narrador, conta a história de seu amor por Capitu e a suspeita de traição que destruiu seu casamento. A ambiguidade do narrador não-confiável é o maior legado literário do livro.',
  'navy',
  [
    { title: 'Capítulo I — Dom Casmurro', estimatedMinutes: 8, content: `<h2>Dom Casmurro</h2>
<p class="dropcap">Uma noite destas, vindo da cidade para o Engenho Novo, encontrei no trem da Central um rapaz aqui do bairro, que eu conheço de vista e de chapéu. Cumprimentou-me, sentou-se ao meu lado, falou da lua e dos ministros, e acabou recitando-me versos. A viagem era curta, e os versos pode ser que não fossem inteiramente maus. Sucedeu, porém, que, como eu estava cansado, fechei os olhos três ou quatro vezes; tanto bastou para que ele interrompesse a leitura e metesse os versos no bolso.</p>
<p>— Continue, disse eu acordando.</p>
<p>— Já acabei, murmurou ele.</p>
<p>— São bonitos os versos.</p>
<p>Vi-lhe fazer um gesto para tirá-los outra vez do bolso, mas não passou do gesto; estava amuado. No dia seguinte entrou a dizer de mim nomes que aqui não transcrevo. Conto-vos isto para que a minha história não comece pelo nascimento de um personagem, ao modo dos romancistas velhos, mas do meu próprio título. Dom Casmurro não está no dicionário; casmurro, sim, e quer dizer o homem calado e metido consigo. Dom foi ironia.</p>
<p>Não consultes dicionários. Casmurro não está lá com o sentido que lhe dou, que é o homem fechado em si mesmo, o homem que traz em si seu mundo, que anda pelos outros mas não com os outros. O título é do moço do trem. Entretanto, há quem diga que o meu título é do latim, de <em>casmurrus</em>, que quer dizer teimoso ou obstinado. Pode ser.</p>` },
    { title: 'Capítulo IX — A Ópera', estimatedMinutes: 10, content: `<h2>Capítulo IX — A Ópera</h2>
<p class="dropcap">Vou contar a gênese de Dom Casmurro, para ver se acho algum socorro contra as sugestões da curiosidade mundana. Vivíamos em Matacavalos, na rua de Mata-cavalos, e o meu nome é Bento de Albuquerque Santiago. O meu pai, Pedro de Albuquerque Santiago, que era fidalgo de solar e fazendeiro, morreu quando eu tinha cinco anos, e a minha mãe, D. Glória, enviuvou aos trinta e um anos.</p>
<p>Era uma senhora muito religiosa. Com a morte do marido, ficou com o coração numa devoção fervorosa, e fez uma promessa ao Céu. A promessa era de que, se tivesse um filho varão, o havia de meter em seminário de modo a fazê-lo padre. Tinha tido antes a minha irmã Cosinha, que havia de morrer. Depois de Cosinha, veio eu. E a promessa foi feita antes de eu nascer. Quando nasci, era a hora da satisfação.</p>
<blockquote><em>"Os olhos de ressaca de Capitu — eles me puxavam para dentro deles, como a maré que vai."</em></blockquote>
<p>O leitor vai entender quando chegar ao capítulo dos olhos. Os olhos de Capitu — minha Capitolina, que eu chamava Capitu desde a infância — eram oblíquos e disfarçados. Capitu tinha os olhos que o agregado José Dias chamou de "olhos de ressaca". Eu que saiba, Capitu os trazia consigo desde que nasceu; desde criança, eram uns olhos que puxavam para dentro como a vaga que se vai da praia quando o mar baixa.</p>` },
    { title: 'Capítulo LXII — O Retrato', estimatedMinutes: 12, content: `<h2>Capítulo LXII — A Fotografia</h2>
<p class="dropcap">Era a minha fotografia, mas juro-vos que me assustei. Os olhos eram os de Capitu, mas os demais traços não pareciam inteiramente os dela; eram ao mesmo tempo seus e de alguém mais. Certo sorriso do retrato não era o dela, mas era-lhe aparentado. Era o sorriso de outrem, debaixo do olhar de Capitu. Fiquei atônito um momento.</p>
<p>— Ah! disse eu, ficando de pé. Eram os olhos de Capitu e o sorriso de Escobar!</p>
<p>Escobar era meu amigo do seminário. Amigo de verdade, do mais fundo da amizade. Era moreno, delgado, com uns olhos claros de uma cor ambígua. Capitu é que tinha olhos negros, como sabe o leitor. Mas o sorriso era o de Escobar. Não sei que força me atirou para o quarto onde estava Capitu, com o filho ao colo, a falar com a criada sobre os baús da mudança.</p>
<blockquote><em>"Capitu olhou para mim com olhos de ressaca e perguntou o que havia. Disse-lhe tudo — ou nada. Não é fácil contar o que não pode ser contado."</em></blockquote>
<p>Ela deu um grito, não um grito alto, mas agudo e breve. O menino acordou e começou a chorar. Capitu chamou-o, aconchegou-o ao peito, sacudindo-o com mimo materno. Depois disse-me que estava doida, que não entendia nada, que eu fosse dormir. Tinha febre, continuou ela sentindo-me a testa com a mão. Mas eu não tinha febre nenhuma; tinha desespero.</p>` },
  ],
  ['machado de assis', 'capitu', 'realismo', 'romance', 'ciúme']),

bl('machado-memorias-postumas', 'Memórias Póstumas de Brás Cubas', 'Memórias Póstumas de Brás Cubas — Machado de Assis', 'O defunto-autor e a filosofia do humanitismo',
  'Machado de Assis (1839–1908)', 'Memórias Póstumas de Brás Cubas, 1881', '1881', 'Português', 1908,
  'Literatura', 'Intermediário', '5–6 horas',
  'O mais inovador romance brasileiro do século XIX. Brás Cubas narra sua vida a partir da morte, com liberdade total de opinião sobre vivos e mortos. O humanitismo de Quincas Borba é a filosofia satírica do livro.',
  'navy',
  [
    { title: 'Ao Leitor — O Defunto-Autor', estimatedMinutes: 8, content: `<h2>Ao Leitor</h2>
<p class="dropcap">Que Stendhal confessasse haver escrito um de seus livros para cem leitores, coisa é que admira e consterna. O que não admira, nem provavelmente consternará, é se este outro livro não tiver os cem leitores de Stendhal, nem cinquenta, nem vinte, e quando muito dez. Dez? Talvez cinco. Trata-se, na verdade, de uma obra difusa, na qual eu, Brás Cubas, se adotei a forma livre de um Sterne ou de um Xavier de Maistre, não sei se lhe meti algumas rabugens de pessimismo.</p>
<p>Pode ser. Obra de finado. Escrevi-a com a pena da galhofa e a tinta da melancolia, e não é difícil antever o que poderá sair desse conúbio. Acresce que a gente grave achará no livro umas aparências de puro romance, ao passo que a gente frívola não achará nele o seu romance usual; ei-lo aí fica privado da estima dos graves e do amor dos frívolos, que são as duas colunas máximas da opinião.</p>
<blockquote><em>"Algum tempo hesitei se devia abrir estas memórias pelo princípio ou pelo fim, isto é, se poria em primeiro lugar o meu nascimento ou a minha morte."</em></blockquote>
<p>Mas eu não escrevi para agradar. Escrevi porque sim. Sou o defunto-autor para quem a campa foi um novo berço. Morri aos sessenta e quatro anos, robusto e válido, e fui colhido por uma pneumonia; mas se a pneumonia foi a causa determinante da minha morte, a causa primária foi uma ideia, uma dessas ideias que nem há filosofia que a explique — a ideia de um emplastro.</p>` },
    { title: 'O Humanitismo de Quincas Borba', estimatedMinutes: 10, content: `<h2>O Humanitismo</h2>
<p class="dropcap">Humanitas é o princípio das coisas. Assim denominou o criador desta filosofia, Quincas Borba, ao princípio vital que governa o universo. Não confundas, Brás, o Humanitas com Deus dos padres, nem com o Deus dos filósofos. Humanitas não criou o mundo; é o próprio mundo. Tudo é Humanitas; Humanitas é tudo.</p>
<p>Daqui, o princípio: ao vencedor as batatas. Quando dois exércitos se digladiam, Humanitas está em ambos, e por isso não perde nunca. Assim, o vencido chora, mas Humanitas não perdeu; transpôs-se simplesmente do vencido para o vencedor. Ao vencedor as batatas.</p>
<blockquote><em>"Não há morte. O encontro de duas expansões, ou a expansão de duas formas, pode determinar a supressão de uma delas; mas, rigorosamente, não há morte, há vida, porque a supressão de uma é a condição da sobrevivência da outra, e a destruição não atinge o princípio universal e comum." — Quincas Borba</em></blockquote>
<p>Esta filosofia consolava Quincas Borba de todos os males. Quando lhe roubavam no jogo, ao vencedor as batatas; quando lhe roubavam a carteira na rua, ao vencedor as batatas; quando foi preso por engano, ao vencedor as batatas. A filosofia tornava-o imune à dor — o que era uma vantagem inestimável, ou um sinal de loucura profunda. Naquele tempo, ele era apenas excêntrico.</p>` },
  ],
  ['machado de assis', 'defunto-autor', 'humanitismo', 'pessimismo', 'romance']),

bl('machado-alienista', 'O Alienista', 'O Alienista — Machado de Assis', 'A loucura, a razão e o poder na ficção machadiana',
  'Machado de Assis (1839–1908)', 'O Alienista, 1882', '1882', 'Português', 1908,
  'Literatura', 'Iniciante', '2–3 horas',
  'Uma das mais brilhantes novelas brasileiras. O Dr. Simão Bacamarte, médico de Itaguaí, cria a Casa Verde para internar loucos — e vai internando cada vez mais pessoas, até quase toda a cidade. Sátira ao cientificismo e ao poder da medicina.',
  'navy',
  [
    { title: 'O Alienista e a Casa Verde', estimatedMinutes: 15, content: `<h2>O Alienista</h2>
<p class="dropcap">O alienista que deu nome a este conto chamava-se Simão Bacamarte, filho da nobreza da terra e o maior dos médicos do Brasil, de Portugal e das Espanhas. Estudara em Coimbra e Pádua. Aos trinta e quatro anos regressou ao Brasil, não podendo el-rei retê-lo em Lisboa, porque ele disse que a ciência era o emprego principal de sua vida, e a medicina, a forma da ciência.</p>
<p>— A saúde da alma, disse ele a Sua Majestade, é o mais nobre empreendimento do médico, e o único verdadeiro. Corpo, pode tratar qualquer rábula de medicina; alma, só eu. Eia, pois!</p>
<p>O rei tentou retê-lo com a promessa de um título nobre. Bacamarte recusou. Títulos eram para os que não tinham ciência. Voltou ao Brasil, casou-se, foi viver em Itaguaí, e criou a Casa Verde — o primeiro hospício da América Latina, segundo sua própria afirmação e do padre Lopes, que redigiu os registros da época.</p>
<blockquote><em>"Aos quarenta anos, Bacamarte tinha a ciência e a mulher. Aos sessenta, ia ter só a ciência."</em></blockquote>
<p>A ideia da Casa Verde nasceu de uma observação clínica: havia em Itaguaí vários doentes mentais dispersos pelas famílias, alguns soltos pelas ruas. Bacamarte resolveu fundá-la para estudo, tratamento e segurança pública. Em poucos meses, a Casa Verde tinha quatro internos. Em dois anos, tinha quatrocentos e sessenta. Em cinco anos, tinha dois terços da população de Itaguaí. O Dr. Bacamarte havia descoberto que a loucura era muito mais comum do que se supunha.</p>` },
  ],
  ['machado de assis', 'alienista', 'loucura', 'sátira', 'ciência']),

bl('alencar-guarani', 'O Guarani', 'O Guarani — José de Alencar', 'Peri e Ceci: amor, natureza e o mito fundador do Brasil',
  'José de Alencar (1829–1877)', 'O Guarani, 1857', '1857', 'Português', 1877,
  'Literatura', 'Iniciante', '5–6 horas',
  'O Guarani é o romance indianista mais importante da literatura brasileira. Peri, o índio guarani nobre e fiel, e Ceci, a jovem portuguesa, representam o mito da fusão das raças que fundou o Brasil. Romance de aventura e lirismo.',
  'forest',
  [
    { title: 'Parte I — Os Aventureiros', estimatedMinutes: 20, content: `<h2>Parte I — Os Aventureiros</h2>
<p class="dropcap">Quem quer que tenha viajado pelos sertões do Brasil certamente conhece aquelas casas ou ranchos que se encontram nas paragens mais ermas e desertas, onde muitas vezes o viajante fatigado vai buscar um abrigo e um pouco de repouso.</p>
<p>Eram onze horas da manhã quando, no ano de 1604, um cavaleiro seguia penosamente uma estreita picada aberta entre duas serras, que deve ser o começo da estrada que leva ao Rio Paquequer. Era um homem de talhe elevado, de fisionomia aberta e franca, de cor branca e de aspecto militar.</p>
<p>Dom Antônio de Mariz — era esse o nome do cavaleiro — vinha de uma excursão que fizera pelos sertões em serviço d'el-rei. Português de nascimento, mas brasileiro de coração, estimava aquelas terras como se fossem sua pátria.</p>
<blockquote><em>"Peri era a encarnação da força e da fidelidade. Ceci, da beleza e da inocência. Juntos, eram o Brasil."</em></blockquote>
<p>O índio que aparece neste capítulo é Peri — o guarani que dá nome ao romance. Alto, vigoroso, com traços que Alencar descreve com um lirismo quase homérico, Peri havia salvo a vida de Ceci na floresta. Desde então, tornara-se o guardião voluntário da jovem portuguesa. Entre eles havia um amor que a época e a raça tornavam impossível de nomear — mas que a narração de Alencar tornava a pedra fundamental de um Brasil imaginado.</p>` },
  ],
  ['alencar', 'indianismo', 'peri', 'guarani', 'natureza']),

bl('alencar-iracema', 'Iracema', 'Iracema — José de Alencar', 'Lenda do Ceará: o nascimento poético do Brasil',
  'José de Alencar (1829–1877)', 'Iracema — Lenda do Ceará, 1865', '1865', 'Português', 1877,
  'Literatura', 'Iniciante', '2–3 horas',
  'Iracema é a obra mais poética de Alencar. A índia Iracema ("América" em anagrama) e o guerreiro português Martim geram Moacir, o primeiro cearense. É a metáfora da formação do povo brasileiro através do cruzamento.',
  'forest',
  [
    { title: 'O Encontro de Iracema e Martim', estimatedMinutes: 12, content: `<h2>O Encontro</h2>
<p class="dropcap">Verdes mares bravios de minha terra natal, onde canta a jandaia nas frondes da carnaúba; verdes mares que brilhais como líquida esmeralda aos raios do sol nascente, perlongando as alvas praias ensombradas de coqueiros; serenai, verdes mares, e alisai docemente a vaga impetuosa, para que o barco aventureiro manso resvale à flor das águas.</p>
<p>Iracema, a virgem dos lábios de mel, que tinha os cabelos mais negros que a asa da graúna e mais longos que seu talhe de palmeira. O favo da jati não era doce como seu sorriso; nem a baunilha recendia no bosque como seu hálito perfumado.</p>
<blockquote><em>"O nome dela é Iracema — lábios de mel — virgem dos lábios de mel que tinha os cabelos mais negros que a asa da graúna."</em> — José de Alencar, Iracema, cap. I</blockquote>
<p>Ela era a filha de Araquém, o pajé da tribo dos tabajara, guardadora do segredo do jurema — a bebida sagrada que dava visões e que deveria ser virginalmente preservada. Ninguém da tribo deveria tocá-la. Mas na floresta, ela encontrou Martim — o guerreiro de rosto branco que vinha das terras além-mar.</p>
<p>Moacir — cujo nome significa "filho do meu sofrimento" — nasceria desse encontro impossível. Iracema morreria depois de dar à luz, como a terra indígena que se entregou ao colonizador e se extinguiu ao gerar o Brasil mestiço. Alencar escreveu não um romance de aventuras, mas um poema em prosa sobre a origem melancólica de uma nação.</p>` },
  ],
  ['alencar', 'iracema', 'indianismo', 'ceará', 'poesia']),

bl('euclides-sertoes', 'Os Sertões', 'Os Sertões — Euclides da Cunha', 'A guerra de Canudos e o drama do sertanejo brasileiro',
  'Euclides da Cunha (1866–1909)', 'Os Sertões, 1902', '1902', 'Português', 1909,
  'Literatura', 'Avançado', '8–10 horas',
  'Os Sertões é considerado o maior livro da prosa brasileira. Dividido em "A Terra", "O Homem" e "A Luta", narra a Guerra de Canudos (1896-1897), o extermínio de 30.000 sertanejos liderados por Antônio Conselheiro. Obra de ciência, literatura e consciência.',
  'terracotta',
  [
    { title: 'O Sertanejo — Antes de Tudo, um Forte', estimatedMinutes: 18, content: `<h2>O Sertanejo</h2>
<p class="dropcap">O sertanejo é, antes de tudo, um forte. Não tem o raquitismo exaustivo dos mestiços neurastênicos do litoral. A sua aparência, entretanto, ao primeiro lance de vista, revela o contrário. Falta-lhe a plástica impecável, o desempeno, a correção das linhas. É desgracioso, desengonçado, torto. Hércules-Quasímodo, reflete no aspecto a fealdade típica dos fracos.</p>
<p>O andar sem firmeza, sem aprumo, quase gigante e curvo, pernas e braços curvos, o tronco oscilante, a marcha descuidada e irregular, de cabeça inclinada para a frente — tudo isso denuncia ao primeiro golpe de vista, ao mais leve esforço, a atonia muscular de um homem cansado.</p>
<blockquote><em>"Mas é que esta aparência é enganadora. Nada é mais surpreendente do que vê-lo depois, a uma pressão de qualquer agente de atividade, recobrar de improviso atitude e atributos de que parecia desprovido."</em> — Os Sertões, O Homem</blockquote>
<p>Canudos não se rendeu. Exemplo único em toda a história, resistiu até o esgotamento completo. Expugnou-o palmo a palmo, na precisão integral do termo, após uma luta de quase um ano, e três formidáveis expedições militares. Caiu no dia 5 de outubro de 1897, quatro dias depois de atingida pelos últimos defensores — quatro apenas: um velho, dois homens feitos e uma criança, na frente dos quais rugiam raivosamente cinco mil soldados.</p>` },
    { title: 'A Terra — O Sertão de Pedra', estimatedMinutes: 15, content: `<h2>A Terra — A Caatinga</h2>
<p class="dropcap">O sertão é uma terra devastada, que a seca e o vento despem de folhas e de seiva. A caatinga cobre-o de um cobertura fantástica, de galhos retorcidos, espinhos, cactos, bromélias — uma flora toda ela armada, toda ela defensiva, que parece ter desenvolvido ao longo de milênios as mesmas estratégias de sobrevivência do sertanejo que a habita.</p>
<p>Na estação das chuvas, a transformação é milagrosa. Os galhos nus cobrem-se de flores. A terra rachada torna-se pastagem. Os riachos secos enchem-se de água barulhenta. O sertanejo sorri. Mas a seca volta — sempre volta.</p>
<blockquote><em>"A terra é, com efeito, um reflexo da vida do homem que a habita. Ambos partilham a dureza, a resistência, a alternância de secura e chuva, de morte e ressurreição."</em></blockquote>
<p>Euclides da Cunha foi como correspondente de guerra ao sertão baiano. Esperava encontrar fanáticos. Encontrou um povo — com sua cultura, sua fé, sua capacidade de sobreviver onde outros morreriam. Os Sertões é simultaneamente um tratado de geologia, antropologia, sociologia e o mais honesto mea culpa da imprensa e do Exército brasileiros diante de um genocídio que ajudaram a executar.</p>` },
  ],
  ['euclides da cunha', 'sertão', 'canudos', 'sertanejo', 'guerra']),

bl('lima-barreto-policarpo', 'Triste Fim de Policarpo Quaresma', 'Triste Fim de Policarpo Quaresma — Lima Barreto', 'O idealismo trágico do amor ao Brasil',
  'Lima Barreto (1881–1922)', 'Triste Fim de Policarpo Quaresma, 1911', '1911', 'Português', 1922,
  'Literatura', 'Iniciante', '4–5 horas',
  'O mais importante romance de Lima Barreto. Policarpo Quaresma, patriota ingênuo e idealista, propõe o tupi como língua nacional, tenta reformar o campo, e termina fuzilado pelos mesmos que deveria servir. Tragédia do amor ao Brasil.',
  'wine',
  [
    { title: 'Policarpo e o Amor ao Brasil', estimatedMinutes: 18, content: `<h2>Policarpo Quaresma</h2>
<p class="dropcap">Há anos, Quaresma estudava a pátria. Desde moço, procurava inteirar-se dela. Sabia as batalhas, as datas, a cronologia dos presidentes, dos ministros, as guerras, as revoluções; mas, ultimamente, em face dos seus trinta anos de contínuos estudos, verificava que não sabia nada de nada. A pátria que ele imaginara era uma coisa e a que existia era outra.</p>
<p>A ideia de estudar o tupi surgiu de uma necessidade lógica: se a língua portuguesa era a língua dos colonizadores, a língua verdadeira do Brasil deveria ser a dos seus habitantes originais. Quaresma apresentou ao Congresso Nacional uma petição para que o tupi fosse adotado como língua oficial do Brasil. A petição foi recusada. Quaresma foi internado num hospício.</p>
<blockquote><em>"A vida não perdoa os ingênuos. Policarpo amou o Brasil com um amor que o Brasil não era capaz de corresponder — porque o Brasil amado por ele nunca existiu."</em></blockquote>
<p>Quando saiu do hospício, Quaresma foi para o campo — tentou reformar uma fazenda abandonada do governo, mostrar que a agricultura nacional era possível. Encontrou burocracia, inércia, desconfiança. Quando a Revolta da Armada irrompeu, foi defender o governo de Floriano Peixoto. E foi fuzilado por esse mesmo governo. Lima Barreto escreveu este romance com a amargura de quem conhecia o Brasil por dentro — e o amava por isso.</p>` },
  ],
  ['lima barreto', 'patriotismo', 'ingenuidade', 'brasil', 'república']),

bl('castro-alves-espumas', 'Espumas Flutuantes', 'Espumas Flutuantes — Castro Alves', 'O poeta dos escravos e o romantismo social brasileiro',
  'Castro Alves (1847–1871)', 'Espumas Flutuantes, 1870', '1870', 'Português', 1871,
  'Literatura', 'Iniciante', '2–3 horas',
  'Primeiro livro publicado de Castro Alves. Contém algumas de suas mais famosas poesias abolicionistas e de amor. O "Navio Negreiro" é o maior poema de denúncia da escravidão na literatura brasileira.',
  'wine',
  [
    { title: 'O Navio Negreiro', estimatedMinutes: 10, content: `<h2>O Navio Negreiro</h2>
<p class="dropcap"><em>É crime ou prazer?</em><br/>
Nas ondas rutilantes,<br/>
A embarcação que avança, triumphante,<br/>
Sonora, alegre, ousada, ligeira?<br/>
Que vela o mar! que asas o vento!<br/>
Que recendência o seu alento!<br/>
Que movimento!<br/>
Que vida!</p>
<blockquote><em>"Era um sonho dantesco... o tombadilho / Que das luzernas avermelha o brilho / Em sangue a se banhar. / Tinir de ferros... estalar de açoite... / Legiões de homens negros como a noite, / Horrendos a dançar..."</em> — Castro Alves, O Navio Negreiro, canto IV</blockquote>
<p>O Navio Negreiro (publicado em 1869) é o poema mais poderoso da literatura brasileira sobre a escravidão. Castro Alves descreve o navio que transporta escravos africanos: no tombadilho ensanguentado, homens e mulheres acorrentados são obrigados a dançar pela saúde da "carga". O contraste entre a beleza do mar e o horror no porão do navio é o coração do poema.</p>
<p>Castro Alves morreu aos 24 anos, antes de ver a abolição. Mas sua poesia contribuiu para o movimento abolicionista e tornou-o o "Poeta dos Escravos" — o único grande poeta da literatura brasileira que fez da denúncia da escravidão seu tema central.</p>` },
  ],
  ['castro alves', 'abolição', 'escravidão', 'romantismo', 'poesia']),

bl('goncalves-dias-primeiros-cantos', 'Primeiros Cantos', 'Primeiros Cantos — Gonçalves Dias', 'A indianismo e o lirismo fundador do romantismo brasileiro',
  'Gonçalves Dias (1823–1864)', 'Primeiros Cantos, 1846', '1846', 'Português', 1864,
  'Literatura', 'Iniciante', '2–3 horas',
  'O livro inaugural do romantismo brasileiro. Contém "Canção do Exílio" (a mais famosa poesia brasileira) e "I-Juca Pirama" (o maior poema indianista). Gonçalves Dias criou o indianismo como escola literária.',
  'forest',
  [
    { title: 'Canção do Exílio e I-Juca Pirama', estimatedMinutes: 10, content: `<h2>Canção do Exílio</h2>
<p class="dropcap"><em>Minha terra tem palmeiras,<br/>
Onde canta o Sabiá;<br/>
As aves, que aqui gorjeiam,<br/>
Não gorjeiam como lá.</em></p>
<p>Escrita em Coimbra em 1843, a Canção do Exílio tornou-se o poema mais parodiado da literatura brasileira — sinal inequívoco de que entrou no imaginário coletivo. A saudade da terra natal, o contraste entre o Portugal chuvoso e o Brasil tropical, o sabiá como símbolo da pátria — tudo isso ressoou numa geração que buscava uma identidade nacional.</p>
<blockquote><em>"Não permita Deus que eu morra, / Sem que eu volte para lá; / Sem que desfrute os primores / Que não encontro por cá;"</em> — Gonçalves Dias, Canção do Exílio</blockquote>
<p>I-Juca Pirama é a outra face: o poema épico-dramático sobre o guerreiro tupinambá capturado por uma tribo inimiga que é condenado a ser comido — honra suprema para o prisioneiro guerreiro. Mas I-Juca chora ao saber que seu pai velho e cego morrerá sem quem o sustente. A covardia — chorar diante da morte — desonra o prisioneiro e o torna indigno de ser comido. Gonçalves Dias criou neste poema uma tragédia genuinamente brasileira, de dignidade e vergonha, de amor filial e honra guerreira.</p>` },
  ],
  ['gonçalves dias', 'indianismo', 'romantismo', 'exílio', 'natureza']),

bl('machado-quincas-borba', 'Quincas Borba', 'Quincas Borba — Machado de Assis', 'Humanitismo e loucura no Brasil do Segundo Reinado',
  'Machado de Assis (1839–1908)', 'Quincas Borba, 1891', '1891', 'Português', 1908,
  'Literatura', 'Intermediário', '5–6 horas',
  'Rubião herda a fortuna de Quincas Borba e vive em São Paulo e no Rio de Janeiro, destruído pela filosofia do humanitismo e pelo amor por Sofia. Um dos romances mais melancólicos e irônicos de Machado de Assis.',
  'navy',
  [
    { title: 'Rubião e o Humanitismo', estimatedMinutes: 15, content: `<h2>A Herança do Humanitismo</h2>
<p class="dropcap">Rubião, professor primário em Barbacena, cuidou de Quincas Borba nos últimos dias de sua doença — uma loucura progressiva que o levou a acreditar que era o fundador de uma grande filosofia: o humanitismo. Ao morrer, Quincas Borba deixou tudo para Rubião — a fortuna e o cachorro, que também se chamava Quincas Borba.</p>
<p>A condição era que Rubião estimasse e tratasse o cachorro com todo o cuidado. A fortuna era real; a condição, curiosa. Rubião aceitou as duas coisas. Foi para o Rio de Janeiro com o cachorro e uma cabeça cheia do humanitismo que mal entendia.</p>
<blockquote><em>"Ao vencedor, as batatas! Rubião, que não entendia bem o humanitismo, entendia ao menos que havia vencido — ele tinha a herança, o cão e o nome de filósofo."</em></blockquote>
<p>No Rio, conheceu Cristiano Palha e sua mulher Sofia. Sofia era linda. Rubião se apaixonou. Sofia era calculista — ela e o marido usaram Rubião sistematicamente, consumindo sua fortuna com jantares, viagens e presentes. Rubião via tudo e não via nada, porque amava Sofia com a mesma loucura com que Quincas Borba havia amado o humanitismo. No fim, Rubião perdeu a fortuna e a sanidade — e morreu acreditando que era Napoleão III.</p>` },
  ],
  ['machado de assis', 'humanitismo', 'loucura', 'segundo reinado', 'ironia']),

bl('eça-crime-padre-amaro', 'O Crime do Padre Amaro', 'O Crime do Padre Amaro — Eça de Queirós', 'A crítica ao clero e ao catolicismo português no realismo de Eça',
  'José Maria Eça de Queirós (1845–1900)', 'O Crime do Padre Amaro, 1876 (versão definitiva)', '1876', 'Português', 1900,
  'Literatura', 'Intermediário', '6–7 horas',
  'O romance mais polêmico da literatura portuguesa do século XIX. O padre Amaro seduz Amélia, uma jovem devota, em Leiria. A gravidez, o infanticídio e as hipocrisias do clero são narrados com implacável realismo por Eça.',
  'wine',
  [
    { title: 'Padre Amaro em Leiria', estimatedMinutes: 18, content: `<h2>O Padre na Cidade</h2>
<p class="dropcap">O padre Amaro Vieira chegou a Leiria em fins de novembro. Era um rapaz de vinte e seis anos, pequeno, com uma cara branca e suave de rapaz de seminário. Tinha os dentes muito brancos, os olhos muito negros, os cabelos muito brilhantes — a beleza ambígua de quem foi criado longe das mulheres e das paixões do mundo.</p>
<p>Leiria era uma pequena cidade episcopal, dominada pelo campanário da Sé. O clero era o poder — não tanto o poder do Estado ou da nobreza, mas o poder das consciências, das famílias, dos casamentos e dos enterros. Era um poder suave e total, que não se via e que estava em todo o lado.</p>
<blockquote><em>"Amélia era devota. Padre Amaro era padre. O desastre foi assim — não de uma só vez, mas como a chuva que amolece a pedra: gota a gota, visita a visita, olhar a olhar."</em></blockquote>
<p>Eça de Queirós escreveu este romance inspirado no Abbé Mouret de Zola, mas transpostando-o para o Portugal profundo e clerical da segunda metade do século XIX. A crítica ao catolicismo não é à religião em si, mas às estruturas de poder clerical que sufocavam a sinceridade e favoreciam a hipocrisia.</p>` },
  ],
  ['eça de queirós', 'realismo', 'clero', 'crítica', 'portugal']),

bl('camilo-amor-perdição', 'Amor de Perdição', 'Amor de Perdição — Camilo Castelo Branco', 'O amor impossível e o drama do romantismo português',
  'Camilo Castelo Branco (1825–1890)', 'Amor de Perdição, 1862', '1862', 'Português', 1890,
  'Literatura', 'Iniciante', '4–5 horas',
  'Escrito em prisão em quinze dias. Simão Botelho ama Teresa de Albuquerque mas suas famílias são inimigas. O amor impossível termina em tragédia. O mais popular romance do romantismo português.',
  'wine',
  [
    { title: 'Simão e Teresa', estimatedMinutes: 15, content: `<h2>O Amor Impossível</h2>
<p class="dropcap">Simão Botelho era filho de um magistrado de Viseu. Teresa de Albuquerque era filha de sua família vizinha e inimiga. Que poderia haver entre eles mais do que inimizade? O amor — que encontra sempre o caminho mais difícil, como a água que busca a pedra para contorná-la.</p>
<p>Camilo escreveu este romance na prisão, acusado de adultério por ter raptado Ana Plácido, por quem se apaixonara. A autobiografia transformou-se em ficção: Simão é Camilo, Teresa é Ana. A prisão real tornou-se a prisão dos amantes no livro.</p>
<blockquote><em>"Morrer antes de envelhecer o amor era o único modo de amá-lo eternamente. Simão e Teresa escolheram a morte — e com ela, a imortalidade."</em></blockquote>
<p>Amor de Perdição foi o maior best-seller do século XIX português. Vendeu mais de cem mil exemplares — uma cifra extraordinária para a época. Camilo escreveu mais de cem romances, mas este é o que ficou. Talvez porque a sua angústia pessoal torna o texto visceral de um modo que a literatura de gabinete não consegue.</p>` },
  ],
  ['camilo', 'romantismo', 'amor', 'portugal', 'tragédia']),

];
