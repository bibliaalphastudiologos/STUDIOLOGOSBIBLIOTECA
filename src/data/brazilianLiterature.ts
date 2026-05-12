import { Ebook } from '../types';

function bl(
  id: string, title: string, fullTitle: string, subtitle: string,
  author: string, originalWork: string, year: string, lang: string, deathYear: number,
  category: Ebook['category'], level: Ebook['level'], readTime: string, description: string,
  cover: string, chapters: { title: string; estimatedMinutes: number; content: string }[],
  tags: string[]
): Ebook {
  return {
    id, title, fullTitle, subtitle, authorReference: author,
    subcategory: 'Literatura Brasileira',
    collection: 'Literatura Brasileira',
    brand: 'StudioLogos',
    workReference: originalWork,
    originalWork, yearPublished: year, originalLanguage: lang,
    category, level, estimatedReadTime: readTime, description,
    contentType: 'public_domain',
    readingTime: readTime,
    coverTheme: cover,
    coverStyle: cover,
    learn: [],
    recommendedFor: [],
    editorialNotice: 'Obra em dominio publico conforme criterio editorial informado.',
    chapters: chapters.map((chapter, index) => ({
      id: `${id}-${index + 1}`,
      ...chapter,
    })),
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
  'Dom Casmurro é o romance mais célebre de Machado de Assis. Bentinho, narrador não-confiável, conta a história de seu amor por Capitu e a suspeita de traição que destruiu seu casamento.',
  'navy',
  [
    { title: 'Capítulo I — Dom Casmurro', estimatedMinutes: 8, content: `<h2>Dom Casmurro</h2>
<p class="dropcap">Uma noite destas, vindo da cidade para o Engenho Novo, encontrei no trem da Central um rapaz aqui do bairro, que eu conheço de vista e de chapéu. Cumprimentou-me, sentou-se ao meu lado, falou da lua e dos ministros, e acabou recitando-me versos. A viagem era curta, e os versos pode ser que não fossem inteiramente maus. Sucedeu, porém, que, como eu estava cansado, fechei os olhos três ou quatro vezes; tanto bastou para que ele interrompesse a leitura e metesse os versos no bolso.</p>
<p>— Continue, disse eu acordando.</p>
<p>— Já acabei, murmurou ele.</p>
<p>— São bonitos os versos.</p>
<p>Vi-lhe fazer um gesto para tirá-los outra vez do bolso, mas não passou do gesto; estava amuado. No dia seguinte entrou a dizer de mim nomes que aqui não transcrevo. Conto-vos isto para que a minha história não comece pelo nascimento de um personagem, mas do meu próprio título. Dom Casmurro não está no dicionário; casmurro, sim, e quer dizer o homem calado e metido consigo. Dom foi ironia.</p>
<p>Não consultes dicionários. Casmurro não está lá com o sentido que lhe dou. O título é do moço do trem. Entretanto, há quem diga que o meu título é do latim, de <em>casmurrus</em>, que quer dizer teimoso ou obstinado. Pode ser.</p>` },
    { title: 'Capítulo IX — Os Olhos de Ressaca', estimatedMinutes: 10, content: `<h2>Os Olhos de Ressaca</h2>
<p>Vivíamos em Mata-cavalos, eu, minha mãe, meu tio Cosme e a agregada Capitu. Capitu tinha então quinze anos, dois a menos que eu. Era morena, olhos de ressaca.</p>
<p>Capitu era Capitu, isto é, uma criatura mui particular, mais mulher do que eu era homem. Se não, vejam. Quando notou que eu estava parado, pregou em mim os olhos, e eu disse que me dolía a cabeça.</p>
<blockquote><em>"Era uma daquelas criaturas que cresciam às escondidas, e eu não era nada mais do que um menino diante dela."</em></blockquote>
<p>Os olhos de ressaca eram uns olhos que me puxavam para dentro. Dona Glória, minha mãe, queria que eu fosse padre; Capitu queria que eu fosse homem. E a verdade é que Capitu conseguiu o que quis, com aqueles olhos oblíquos e dissimulados que o agregado José Dias chamava de "olhos de ressaca".</p>
<p>Nunca vi olhos assim em outra pessoa. Eram verdes, mas pareciam pretos às vezes. Olhavam de soslaio, e quando você percebia, já estava dentro deles, sem poder sair, como a vaga que vai da praia e não volta mais.</p>` },
    { title: 'Capítulo LV — O Seminário', estimatedMinutes: 9, content: `<h2>O Seminário</h2>
<p>Minha mãe queria que eu fosse padre. Era uma promessa que fizera ao céu antes de eu nascer. Fiz o possível para não cumpri-la; Capitu fez o necessário para que eu tivesse forças de resistir.</p>
<p>No seminário conheci Escobar. Era um rapaz delgado, olhos claros, um pouco fugitivos, mas a fisionomia boa e aberta. Fomos amigos desde os primeiros dias. Escobar tinha o gênio vivo e penetrante; eu, mais lento, mais sentimental.</p>
<p>A amizade cresceu. Saindo do seminário, Escobar foi para o comércio e prosperou muito. Casou com Sancha, amiga de Capitu. Os quatro nos víamos com frequência — almoços, jantares, passeios. Escobar tornara-se, além de amigo, cunhado do coração.</p>
<p>Quantas vezes, naquele tempo, não olhei para ele com os olhos da gratidão! Quantas vezes, depois, não o encarei com outros olhos — olhos que eu preferiria não ter tido.</p>` },
    { title: 'Capítulo CXXXV — A Tempestade', estimatedMinutes: 12, content: `<h2>A Tempestade</h2>
<p>Escobar morreu afogado. A ressaca era grande naquela manhã. Ele foi ao mar, como fazia às vezes, e a ressaca levou-o. Toda a vila choraria a sua morte. Capitu também chorou.</p>
<p>Mas o choro de Capitu tinha umas reticências que eu não conseguia interpretar. Quando olhei para ela ao pé do caixão, vi que seus olhos não choravam como os olhos de viúva — choravam como os olhos de uma mulher que perdia algo mais do que um amigo do marido.</p>
<blockquote><em>"Fitou o defunto por um momento; depois não viu mais nada, estava tão cheia de lágrimas."</em></blockquote>
<p>Foi então que a dúvida entrou em mim como uma faca. Não saiu mais. Olhei para o filho que Capitu me dera — Ezequiel — e vi os olhos de Escobar. Vi o sorriso de Escobar. Vi os gestos de Escobar.</p>
<p>Mandei Capitu para a Europa com o filho. Não tornei a vê-la. Ela morreu lá fora, e o filho cresceu longe de mim. Fiquei só, nesta casa de Matacavalos, refazendo a vida de menino para ver se havia de lhe dar o mesmo desfecho.</p>
<p>Agora, casmurro, conto a história a quem a quiser ouvir. Capitu traiu-me? Não sei. Não sei mais. Os olhos de ressaca levaram tudo.</p>` },
  ],
  ['machado de assis', 'romance', 'narrativa', 'capitu', 'realismo']),

bl('machado-memorias-postumas', 'Memórias Póstumas de Brás Cubas', 'Memórias Póstumas de Brás Cubas', 'O defunto autor mais irônico da literatura brasileira',
  'Machado de Assis (1839–1908)', 'Memórias Póstumas de Brás Cubas, 1881', '1881', 'Português', 1908,
  'Literatura', 'Avançado', '4–5 horas',
  'Narrado por um defunto, este romance fundador do Realismo brasileiro subverte todas as convenções narrativas com ironia, pessimismo e genialidade.',
  'crimson',
  [
    { title: 'Ao Leitor', estimatedMinutes: 5, content: `<h2>Ao Leitor</h2>
<p>Que Stendhal confessasse haver escrito um de seus livros para cem leitores, coisa é que admira e consterna. O que não admira, nem provavelmente consternará, é se este livro não tiver os cem leitores de Stendhal, nem cinquenta, nem vinte, e quando muito, dez. Dez? Talvez cinco. Trata-se, na verdade, de uma obra difusa, na qual eu, Brás Cubas, se adotei a forma livre de um Sterne ou de um Xavier de Maistre, não sei se lhe meti algumas rabugens de pessimismo.</p>
<p>Ao meu amigo Virgília — que assim me chamou — devo a publicação desta obra. No momento em que a redigia, estava eu morto; e ainda estava morto quando a dei a ler. Tudo isso se passa muito devagar, porque os mortos não têm pressa.</p>
<blockquote><em>"Nasci em 1805. Morri em 1869. Neste livro conto o que vi e o que fui. Estou morto, e escrevo."</em></blockquote>` },
    { title: 'Capítulo I — Óbito do Autor', estimatedMinutes: 7, content: `<h2>Óbito do Autor</h2>
<p>Algum tempo hesitei se devia abrir estas memórias pelo princípio ou pelo fim, isto é, se poria em primeiro lugar o meu nascimento ou a minha morte. Suposto o uso vulgar seja começar pelo nascimento, duas considerações me levaram a adotar diferente método: a primeira é que eu não sou propriamente um autor defunto, mas um defunto autor, para quem a campa foi outro berço; a segunda é que o escrito ficaria assim mais galante e mais novo.</p>
<p>Morri de uma pneumonia; mas se lhes disser que foi menos a pneumonia do que uma ideia grandiosa e útil, a causa da minha morte, é possível que me não acreditem, e todavia é verdade. Vou expor-lhes sumariamente o caso. Julgue-o quem quiser.</p>
<p>Com efeito, um dia de manhã, estando a passear na chácara, pensei em escrever um livro filosófico. Nunca escribi filosofia; mas tinha umas notas e citações, e a ideia era grande, abrangente, humana. Chamei-a: o Emplasto Brás Cubas. Saí para tomar ar, molhei-me, pneumonia, e cá estou.</p>` },
    { title: 'Capítulo XI — O Menino é Pai do Homem', estimatedMinutes: 8, content: `<h2>O Menino é Pai do Homem</h2>
<p>Sou, disse eu, uma criança prodígio. Tinha-me dado na cabeça que era um daqueles espíritos superiores, nascidos para mudar a face do mundo. Era filho único, e a família toda me apontava como a maravilha do século. Meu pai era o homem mais orgulhoso do Rio de Janeiro.</p>
<p>Lembra-me uma ocasião em que me bateram, não sei por quê. Fugi de casa, fui até o Campo de Santana, chorei muito, e voltei à noite. Minha mãe me esperava na porta, trêmula e chorosa.</p>
<p>Fui crescendo. Aos dezoito anos, meu pai mandou-me para Coimbra. Lá estudei, namorei, endividei-me. Voltei doutor. O grau de bacharel fez de mim o que eu já era: um homem inútil, com verniz de cultura.</p>` },
    { title: 'Epílogo — Das Negativas', estimatedMinutes: 6, content: `<h2>Das Negativas</h2>
<p>Chegado este ponto, tomo a pena e concluo.</p>
<p>Ao fazer o balanço da minha existência, chego a uma conclusão que é o resultado natural de tudo o que narrei: não tive filhos, não transmiti a nenhuma criatura o legado da nossa miséria. Esta é a última das minhas negativas.</p>
<blockquote><em>"Não fui grande, não fui santo, não fui útil — mas tampouco transmiti a outrem o peso de existir."</em></blockquote>
<p>É tudo. O defunto autor abre mão da pena. Viveu bastante para saber que a vida é um defeito no nada. Mas como o nada não se sente, e a vida às vezes se sente, prefiro ter vivido a não ter vivido. E com esta conclusão — que não é conclusão — encerro o livro.</p>` },
  ],
  ['machado de assis', 'defunto autor', 'realismo', 'romance']),

bl('machado-alienista', 'O Alienista', 'O Alienista', 'A razão ou a loucura — quem define os limites?',
  'Machado de Assis (1839–1908)', 'O Alienista, 1882', '1882', 'Português', 1908,
  'Literatura', 'Intermediário', '2–3 horas',
  'Conto longo em que o Dr. Simão Bacamarte cria o primeiro hospício de Itaguaí, internando metade da cidade. Uma sátira magistral sobre ciência, poder e loucura.',
  'deep-purple',
  [
    { title: 'I — De como Itaguaí ganhou um hospício', estimatedMinutes: 8, content: `<h2>De como Itaguaí ganhou um hospício</h2>
<p>A câmara municipal de Itaguaí, numa das suas mais memoráveis sessões, deliberou construir uma Casa Verde para recolhimento e tratamento dos alienados do município. Em verdade, era tempo. A loucura vagava pelas ruas, sem método nem disciplina.</p>
<p>O Dr. Simão Bacamarte, filho da nobreza da terra e o maior dos médicos do Brasil, de Portugal e das Espanhas, foi o promotor da ideia e o homem destinado a dirigi-la. Era solteiro, e ninguém tinha conseguido arrancá-lo à ciência, ao contrário do que tentou uma dama de Itaguaí, que o amava muito, e em cujo amor ele via claro sinal de loucura.</p>
<blockquote><em>"A saúde da alma é como a do corpo: quem não a guarda não a merece."</em> — Dr. Simão Bacamarte</blockquote>
<p>Em 1762 casou com D. Evarista da Costa e Mascarenhas, senhora de vinte e cinco anos, viúva de um juiz de fora, e não bonita. O casamento escandalizou o povo. Mas Bacamarte explicou a escolha com rigor científico: D. Evarista reunia condições físicas e morais que garantiriam a procriação de filhos sãos e equilibrados.</p>` },
    { title: 'II — A Casa Verde se expande', estimatedMinutes: 10, content: `<h2>A Casa Verde se expande</h2>
<p>O hospício abriu, e Bacamarte começou a trabalhar. Nos primeiros meses, internava um ou dois por semana. À medida que seus estudos avançavam, porém, a teoria do alienista se aperfeiçoava — e com ela, o número de doentes.</p>
<p>Bacamarte percebeu que a loucura era muito mais ampla do que se supunha. Não era apenas o furioso e o melancólico — era também o orgulhoso, o covarde, o avarento, o mentiroso habitual. Cada vício era uma forma de alienação. E se cada vício era loucura, a Casa Verde devia expandir-se.</p>
<p>Em dois meses, a população de Itaguaí havia diminuído de um terço. Maridos, mulheres, filhos — todos com alguma forma de desvio da razão pura. A cidade ficou em silêncio. Os que restavam fora olhavam uns aos outros com desconfiança.</p>
<p>— Quem será o próximo? — perguntavam baixo.</p>
<p>Mas Bacamarte não parava. A ciência exigia sacrifício. A razão exigia clareza. E a Casa Verde era o templo da razão.</p>` },
    { title: 'III — A Reviravolta Final', estimatedMinutes: 9, content: `<h2>A Reviravolta Final</h2>
<p>Chegou o dia em que o próprio Bacamarte reviu suas teorias. Depois de anos classificando todos os desvios como loucura, o alienista chegou a uma conclusão nova e assombrosa: os verdadeiramente sãos eram exatamente os que ele havia internado. A sanidade estava nos chamados loucos — criaturas sinceras, espontâneas, sem máscara.</p>
<p>Os doentes, afinal, eram os que ficaram fora da Casa Verde — os normais, os contidos, os hipócritas, os calculistas.</p>
<p>Bacamarte libertou todos os internados e, sem hesitar, trancou-se no hospício. Ele próprio era o único doente verdadeiro: o homem que acreditara poder definir a loucura com critérios científicos.</p>
<blockquote><em>"A razão que classifica tudo e não se classifica a si mesma é a mais perigosa forma de loucura."</em></blockquote>
<p>Morreu dezoito meses depois, vítima da mais obstinada ciência. A Casa Verde ficou vazia. Itaguaí voltou à sua desordem alegre. E ninguém mais soube, por muito tempo, onde terminava a razão e começava a loucura.</p>` },
  ],
  ['machado de assis', 'conto', 'loucura', 'sátira', 'alienismo']),

bl('alencar-guarani', 'O Guarani', 'O Guarani', 'O amor impossível entre um índio e uma jovem colonial',
  'José de Alencar (1829–1877)', 'O Guarani, 1857', '1857', 'Português', 1877,
  'Literatura', 'Iniciante', '4–5 horas',
  'Romance indianista de José de Alencar. Peri, índio goitacá, dedica sua vida à proteção de Ceci, filha de um fidalgo português. Uma das obras fundadoras da identidade brasileira.',
  'forest',
  [
    { title: 'Parte I — A Casa do Fidalgo', estimatedMinutes: 9, content: `<h2>A Casa do Fidalgo</h2>
<p>Era o ano de 1604. À margem do Paquequer, perto da nascente do Rio de Janeiro, erguia-se a habitação de Dom Antônio de Mariz, fidalgo português de bom sangue. A casa era de pedra e cal, com um pátio amplo e uma varanda de onde se avistava o rio que corria ao fundo, entre pedras e arvoredos.</p>
<p>Dom Antônio tinha dois filhos: Álvaro, rapaz altivo e corajoso, e Cecília — Ceci — uma jovem de dezesseis anos, loura como o sol, com olhos azuis que pareciam pedaços de céu. Ao redor da casa de Mariz, a mata era densa e cheia de perigos: onças, cobras, índios hostis.</p>
<p>Mas havia um índio que não era hostil. Peri, goitacá, era o protetor silencioso da família. Vivia nas matas ao redor, como uma sombra fiel, e seu único pensamento era a segurança de Ceci.</p>` },
    { title: 'Parte II — Peri e Ceci', estimatedMinutes: 11, content: `<h2>Peri e Ceci</h2>
<p>Peri não era como os outros índios. Não media sua grandeza em guerras ou vitórias — media-a em fidelidade. Havia jurado proteger Ceci, e essa promessa era para ele mais sagrada que a própria vida.</p>
<p>Ceci gostava do índio com a ternura com que se gosta de um irmão selvagem. Ele lhe trazia flores da mata, frutas raras, penas de pássaros. Ela lhe ensinava palavras do português e às vezes lia para ele trechos da Bíblia que ele ouvia com olhos arregalados.</p>
<blockquote><em>"Peri é o escravo de Ceci. Peri morre se Ceci ordenar."</em></blockquote>
<p>Dom Antônio via com respeito aquela devoção estranha. Sabia que o índio era puro, que não havia maldade nele — só uma nobreza selvagem que poucos homens civilizados possuíam.</p>
<p>Álvaro, porém, desconfiava. Para ele, um índio era sempre um índio. Mas o tempo iria mostrar que Peri valia mais que todos os fidalgos juntos.</p>` },
    { title: 'Parte III — O Fim e o Começo', estimatedMinutes: 10, content: `<h2>O Fim e o Começo</h2>
<p>Os aimorés cercaram a casa de Mariz. Eram centenas, e os poucos defensores pouco podiam fazer. Dom Antônio tomou uma decisão suprema: explodiu os paióis de pólvora, destruindo a casa junto com os invasores.</p>
<p>Mas antes, encomendou Ceci a Peri. Pediu ao índio que salvasse a filha. E Peri partiu com Ceci nos braços, correndo pela mata em chamas.</p>
<p>A enchente do rio subia. A floresta ardia. Peri amarrou Ceci a uma palmeira enorme que as águas iam arrancar. Quando a árvore se soltou do chão, ele se agarrou também. Os dois foram levados pela correnteza, ao encontro do desconhecido.</p>
<blockquote><em>"— Você não tem medo, Peri? — Ceci tem Peri. Peri não tem medo."</em></blockquote>
<p>Alencar encerra o romance com a imagem dos dois sobre a palmeira flutuante — o índio e a europeia, juntos no caos das águas, fundando simbolicamente uma nova raça, uma nova nação. O Brasil nascendo das entranhas da floresta.</p>` },
  ],
  ['josé de alencar', 'indianismo', 'romance', 'peri', 'ceci']),

bl('alencar-iracema', 'Iracema', 'Iracema — A Virgem dos Lábios de Mel', 'A lenda do Ceará e o nascimento do povo brasileiro',
  'José de Alencar (1829–1877)', 'Iracema, 1865', '1865', 'Português', 1877,
  'Literatura', 'Iniciante', '2–3 horas',
  'Poema em prosa de José de Alencar. Iracema, índia tabajara, apaixona-se por Martim, guerreiro português. Da união nasce Moacir, o primeiro cearense.',
  'crimson',
  [
    { title: 'I — A Virgem dos Lábios de Mel', estimatedMinutes: 7, content: `<h2>A Virgem dos Lábios de Mel</h2>
<p>Verdes mares bravios de minha terra natal, onde canta a jandaia nas frondes da carnaúba; verdes mares que brilhais como líquida esmeralda aos raios do sol nascente, perlongando as alvas praias ensombradas de coqueiros.</p>
<p>Que importa que a aura do sertão não vos traga os perfumes de que está grávida a flor dos laranjais? Tendes outros, que não são os aromas das flores, mas exalações da terra virgem e das matas bravias.</p>
<blockquote><em>"Iracema, a virgem dos lábios de mel, que tinha os cabelos mais negros que a asa da graúna e mais longos que seu talhe de palmeira."</em></blockquote>
<p>Assim aparece Iracema: filha de Araquém, sacerdote tabajara, guardadora do segredo do jurema. Quando encontra Martim, o guerreiro branco que veio de além-mar, sua vida muda para sempre.</p>` },
    { title: 'II — O Amor Proibido', estimatedMinutes: 8, content: `<h2>O Amor Proibido</h2>
<p>Iracema sabia que não devia amar o guerreiro branco. Era a virgem consagrada a Tupã, guardiã dos mistérios da tribo. O amor proibido seria a traição ao pai, ao povo, à própria lei sagrada.</p>
<p>Mas os olhos de Martim eram claros como o céu, e sua voz era suave como o vento entre os coqueiros. E o coração de Iracema foi mais forte que a lei.</p>
<p>Ela lhe deu a beber o suco da jurema — a bebida que revela os segredos do deus. E nessa noite de sonhos e mistério, os dois se uniram.</p>
<p>Quando amanheceu, Iracema sabia que havia rompido a lei sagrada. Mas também sabia que havia encontrado seu destino. Partiu com Martim para longe da tribo, carregando no ventre o fruto de um amor impossível.</p>` },
    { title: 'III — Moacir, o Filho da Dor', estimatedMinutes: 8, content: `<h2>Moacir, o Filho da Dor</h2>
<p>Iracema peregrina com Martim pelas praias e sertões do Ceará. Ele é inquieto, nostálgico da terra de além-mar; ela é paciente, amorosa, adaptada à floresta.</p>
<p>Nasce Moacir — "o filho do sofrimento", como Iracema o nomeia. No parto, ela doa toda a força que tinha. O menino cresceu; a mãe definhava.</p>
<blockquote><em>"Moacir, filho da dor — a mais bela criança que a terra brasileira gerou."</em></blockquote>
<p>Iracema morreu olhando para o mar, esperando que Martim voltasse de uma de suas excursões. Quando ele retornou, encontrou apenas o corpo e o filho que ela lhe deixara.</p>
<p>Martim partiu para a Europa levando Moacir. Mas voltou. E o nome de Iracema ficou gravado na terra — anagrama de América, símbolo do que se perdeu para que um novo povo nascesse. O Brasil que vem do encontro, do amor e da dor.</p>` },
  ],
  ['josé de alencar', 'indianismo', 'poema em prosa', 'ceará', 'iracema']),

bl('euclides-sertoes', 'Os Sertões', 'Os Sertões — Canudos: luta e tragédia', 'A guerra de Canudos e a alma do Brasil profundo',
  'Euclides da Cunha (1866–1909)', 'Os Sertões, 1902', '1902', 'Português', 1909,
  'Literatura', 'Avançado', '8–10 horas',
  'Obra monumental que narra a Guerra de Canudos. Euclides une ciência, jornalismo e literatura para revelar a tragédia do sertão nordestino e a brutalidade do Estado republicano.',
  'gold',
  [
    { title: 'A Terra — O Sertão', estimatedMinutes: 10, content: `<h2>A Terra — O Sertão</h2>
<p>Quem entra no sertão, entra numa outra civilização. A paisagem é de apocalipse: o solo rachado, o sol inclemente, a caatinga torcida como almas em pena. Não é um lugar para fracos.</p>
<p>O sertanejo, antes de tudo, é um forte. O naturalismo determinista que guiava o pensamento do século XIX diria que ele deveria ser fraco — raça misturada, clima adverso, isolamento. Mas Euclides da Cunha viu o contrário.</p>
<blockquote><em>"O sertanejo é, antes de tudo, um forte. Não tem o raquitismo exaustivo dos mestiços neurastênicos do litoral."</em></blockquote>
<p>A seca é o grande personagem do sertão. Ela molda o homem, mata o gado, transforma a vegetação em espinhos. E quando a chuva volta, a caatinga ressurge com uma exuberância que parece milagre — como o próprio povo que sobrevive.</p>` },
    { title: 'O Homem — O Sertanejo', estimatedMinutes: 9, content: `<h2>O Homem — O Sertanejo</h2>
<p>Euclides descreve o sertanejo com a ambiguidade de quem admira e estranha ao mesmo tempo. Aquele homem moreno, magro, de movimentos lentos que enganam — na hora do perigo é ágil como uma onça.</p>
<p>Antônio Conselheiro era um desses homens. Penitente, pregador, líder. Fundou Canudos como uma cidade de Deus no sertão. Milhares o seguiram porque ele dava o que o Estado não dava: sentido, comunidade, esperança.</p>
<p>A República o via como inimigo. A Igreja o via como herege. Os fazendeiros o viam como ameaça. Todos concordavam que Canudos devia ser destruída.</p>` },
    { title: 'A Luta — O Massacre', estimatedMinutes: 12, content: `<h2>A Luta — O Massacre</h2>
<p>Quatro expedições militares foram enviadas contra Canudos. As três primeiras voltaram derrotadas — humilhadas por um punhado de sertanejos descalços e mal armados. O Brasil urbano ficou chocado.</p>
<p>A quarta expedição foi um exército. Canhões, fuzis, estratégia. E no final, genocídio.</p>
<blockquote><em>"Aquela campanha nos afigura-se a mais tremenda das guerras civis que temos tido. Mais do que guerra, foi extermínio."</em></blockquote>
<p>Euclides da Cunha estava lá como correspondente. Viu os últimos resistentes — velhos, mulheres, crianças — serem mortos um a um. Viu a cidade sendo dinamitada. Viu o Brasil matar o que havia de mais original em si mesmo.</p>
<p>Escreveu <em>Os Sertões</em> com a culpa de quem sobreviveu. É um livro de luto, de raiva, de amor pelo Brasil que não se quis entender a si mesmo.</p>` },
  ],
  ['euclides da cunha', 'sertão', 'canudos', 'guerra', 'nordeste']),

bl('lima-barreto-policarpo', 'Triste Fim de Policarpo Quaresma', 'Triste Fim de Policarpo Quaresma', 'O patriota incompreendido e a tragédia do ideal brasileiro',
  'Lima Barreto (1881–1922)', 'Triste Fim de Policarpo Quaresma, 1915', '1915', 'Português', 1922,
  'Literatura', 'Intermediário', '4–5 horas',
  'Policarpo Quaresma, major do exército, é um patriota apaixonado pelo Brasil que o Brasil nunca correspondeu. Uma das mais dolorosas críticas à República Velha.',
  'navy',
  [
    { title: 'Parte I — O Patriota', estimatedMinutes: 8, content: `<h2>O Patriota</h2>
<p>O major Policarpo Quaresma era diferente. Enquanto todos tratavam da vida, das promoções, dos bailes, ele se dedicava ao Brasil — ao Brasil verdadeiro, ao Brasil profundo que estava nos livros, nas lendas, nas raízes.</p>
<p>Aprendia tupi. Estudava folclore. Tocava violão com método, querendo dominar a música nacional. Seus colegas achavam graça ou pena. A irmã, Adelaide, resignada, deixava-o fazer.</p>
<blockquote><em>"Quaresma amava o Brasil mais do que qualquer brasileiro que ele conhecia. E era exatamente por isso que estava só."</em></blockquote>
<p>Um dia enviou ao Congresso um memorial propondo que o tupi fosse adotado como língua nacional. A proposta foi recebida com escárnio. O major foi internado num hospício por "alienação mental".</p>` },
    { title: 'Parte II — O Campo', estimatedMinutes: 9, content: `<h2>O Campo</h2>
<p>Saindo do hospício, Quaresma resolveu que o Brasil se salvaria pela terra. Comprou um sítio no interior do Rio de Janeiro e foi trabalhar. Queria provar que o solo brasileiro, bem cultivado, era o mais fértil do mundo.</p>
<p>Encontrou a burocracia, a descaso do governo, a falta de infraestrutura. O sítio prosperava, mas a luta era desigual. Quaresma escreveu ao governo pedindo estradas, crédito, apoio. Silêncio.</p>
<p>Depois veio a Revolução de 1893 — a Revolta da Armada. Quaresma, patriota até a alma, alistou-se como voluntário para defender a República de Floriano Peixoto, convicto de que estava servindo ao Brasil.</p>` },
    { title: 'Parte III — O Triste Fim', estimatedMinutes: 9, content: `<h2>O Triste Fim</h2>
<p>Quaresma serviu com lealdade. Mas quando pediu ao marechal Floriano que perdoasse os prisioneiros — homens que lutavam pela mesma pátria, só que do lado errado — foi preso por traição.</p>
<p>Na cela úmida, o major entendeu. O Brasil que ele amava não existia. Existia um país de interesses, de castas, de indiferenças. Sua vida inteira havia sido dedicada a uma ilusão.</p>
<blockquote><em>"Tinha havido engano. Tinha havido ilusão. O Brasil não era isso."</em></blockquote>
<p>Policarpo Quaresma foi fuzilado ao amanhecer. Morreu sem entender o crime que cometera — o crime de amar o Brasil de maneira inconveniente.</p>
<p>Lima Barreto escreveu este romance com suas próprias dores. Mulato, pobre, boêmio, internado num hospício como Quaresma — ele sabia bem o que era ser inconveniente no Brasil.</p>` },
  ],
  ['lima barreto', 'república', 'patriotismo', 'sátira', 'crítica social']),

bl('castro-alves-espumas', 'Espumas Flutuantes', 'Espumas Flutuantes — Poesias', 'O poeta dos escravos e o canto pela liberdade',
  'Castro Alves (1847–1871)', 'Espumas Flutuantes, 1870', '1870', 'Português', 1871,
  'Literatura', 'Intermediário', '2–3 horas',
  'Primeiro livro publicado em vida por Castro Alves. Reúne poemas líricos e poemas abolicionistas do maior poeta condoreiro do Brasil.',
  'deep-purple',
  [
    { title: 'Apresentação — O Poeta dos Escravos', estimatedMinutes: 6, content: `<h2>O Poeta dos Escravos</h2>
<p>Castro Alves tinha apenas vinte e três anos quando morreu, mas em vida já era famoso. Seus poemas circulavam em manuscritos, eram declamados nos salões e nas faculdades de direito, e enchiam olhos de lágrimas.</p>
<p>Em 1870 publicou <em>Espumas Flutuantes</em>, seu único livro em vida. Não eram apenas poemas de amor — eram gritos contra a escravidão, odes à liberdade, celebrações da natureza.</p>
<blockquote><em>"Auréola ou coroa de espinhos? Que importa! / O poeta morre — a lira não perece."</em></blockquote>
<p>O condoreirismo de Castro Alves era exaltado, grandioso, mas não vazio. Havia nele uma raiva genuína, uma dor real pelo sofrimento dos escravizados. Ele era o poeta que tomou partido quando tomar partido custava caro.</p>` },
    { title: 'Navio Negreiro', estimatedMinutes: 10, content: `<h2>O Navio Negreiro</h2>
<p><em>Era um sonho dantesco... o tombadilho / Que das luzernas avermelha o brilho. / Em sangue a se banhar. / Tinir de ferros... estalar de açoite... / Legiões de homens negros como a noite, / Horríveis a dançar...</em></p>
<p>Este é o poema mais famoso de Castro Alves, e talvez o mais importante da literatura brasileira sobre a escravidão. Ele descreve um navio negreiro com a força de quem viu — ou imaginou tão bem que é como se tivesse visto.</p>
<p><em>Quem são eles? Que são? De onde vêm eles? / Filhos do deserto, guerreiros, fiéis, / Que a tua América / Tornou escravos...</em></p>
<blockquote><em>"Senhor Deus dos desgraçados! / Dizei-me vós, Senhor Deus! / Se é loucura... se é verdade / Tanto horror perante os céus..."</em></blockquote>
<p>Castro Alves termina com um apelo que é ainda hoje perturbador: o poeta pede que o mar — símbolo da liberdade — engula o navio e liberte os cativos. A natureza como juíza da injustiça humana.</p>` },
    { title: 'Poemas de Amor e Liberdade', estimatedMinutes: 8, content: `<h2>Poemas de Amor e Liberdade</h2>
<p>Além dos poemas abolicionistas, <em>Espumas Flutuantes</em> tem uma face lírica e apaixonada. Castro Alves amou intensamente — Eugênia Câmara, a atriz que o inspirou e que terminou por deixá-lo.</p>
<p><em>Eu te amo! Eu te amo! Com frenesi! / Com delírio insano! Perdidamente! / Quando de ti me afasto, eu sinto / Falta de alguma coisa...</em></p>
<p>O amor e a liberdade se confundem na poesia de Castro Alves. Amar é ser livre. Ser escravo é não poder amar. Por isso a escravidão era para ele o maior de todos os crimes — não apenas contra o corpo, mas contra o coração humano.</p>
<p>Morreu jovem, deixando incompleto o poema <em>Os Escravos</em>, que prometia ser sua obra mais ambiciosa. Mas o que deixou foi suficiente para que nunca seja esquecido.</p>` },
  ],
  ['castro alves', 'poesia', 'abolicionismo', 'condoreirismo', 'escravidão']),

bl('goncalves-dias-primeiros-cantos', 'Primeiros Cantos', 'Primeiros Cantos — Gonçalves Dias', 'O canto da saudade e o nascimento do indianismo poético',
  'Gonçalves Dias (1823–1864)', 'Primeiros Cantos, 1846', '1846', 'Português', 1864,
  'Literatura', 'Intermediário', '2–3 horas',
  'Primeiro livro de Gonçalves Dias. Contém a célebre Canção do Exílio, poemas indianistas e elegias amorosas que fundaram o Romantismo brasileiro.',
  'forest',
  [
    { title: 'Apresentação — O Poeta Maranhense', estimatedMinutes: 6, content: `<h2>O Poeta Maranhense</h2>
<p>Gonçalves Dias nasceu no Maranhão, filho de pai português e mãe índia e negra. Essa origem mestiça marcou profundamente sua poesia: a saudade da terra, o amor à natureza brasileira, a dignidade dos povos indígenas.</p>
<p>Estudou em Coimbra, viveu na Europa, mas nunca deixou de ser brasileiro no fundo da alma. Quando escreveu a <em>Canção do Exílio</em>, tinha dezenove anos e estava em Portugal com frio no coração.</p>
<blockquote><em>"Minha terra tem palmeiras, / Onde canta o Sabiá; / As aves que aqui gorjeiam, / Não gorjeiam como lá."</em></blockquote>
<p>Poucos versos na história da literatura brasileira foram tão repetidos, tão parodiados, tão amados. A <em>Canção do Exílio</em> se tornou um símbolo — não apenas de saudade, mas de brasilidade.</p>` },
    { title: 'Canção do Exílio e Outros Poemas', estimatedMinutes: 9, content: `<h2>Canção do Exílio e Outros Poemas</h2>
<p>Além da <em>Canção do Exílio</em>, os <em>Primeiros Cantos</em> reúnem poemas indianistas de grande força. <em>I-Juca-Pirama</em> — "o que há de ser morto" — é a história de um guerreiro tupi capturado pelos inimigos.</p>
<p><em>Meu pai, o estrangeiro, / Com preso guerreiro / Te oferta este algoz: / Vê que entre os seus ares / Meus bravos são pares / À força a essa voz.</em></p>
<p>O herói tupi prefere a morte à desonra. Quando chora — porque está longe da família — os inimigos o liberam com desprezo: um homem que chora não é digno de ser comido. E essa libertação é para ele uma humilhação pior que a morte.</p>
<blockquote><em>"Meu pai vai matar-me! / Quem pode livrar-me? / Ninguém! Ninguém!"</em></blockquote>
<p>A grandeza dos <em>Primeiros Cantos</em> está em unir a emoção pessoal do exilado com a grandeza coletiva dos povos indígenas. Gonçalves Dias criou a voz do Brasil mestiço que ainda está aprendendo a se conhecer.</p>` },
    { title: 'O Legado', estimatedMinutes: 7, content: `<h2>O Legado</h2>
<p>Gonçalves Dias morreu tragicamente — o navio em que voltava ao Brasil naufragou perto do Maranhão, em 1864. Tinha quarenta e um anos. O poeta que tanto cantou a saudade da terra morreu sem vê-la pela última vez.</p>
<p>Mas seu legado foi imenso. Inaugurou o indianismo poético no Brasil — não o índio idealizado e domesticado, mas o índio como herói, como guerreiro, como ser humano completo com sua própria dignidade.</p>
<p>A <em>Canção do Exílio</em> foi parodiada por Oswald de Andrade, por Murilo Mendes, por Carlos Drummond — sinal de que um poema entrou para sempre na consciência coletiva de um povo.</p>
<blockquote><em>"Não permita Deus que eu morra / Sem que eu volte para lá; / Sem que desfrute os primores / Que não encontro por cá."</em></blockquote>
<p>Gonçalves Dias não voltou. Mas o Brasil que ele amou continua, nas palmeiras, nos sabiás, e nos versos que toda criança brasileira conhece de cor.</p>` },
  ],
  ['gonçalves dias', 'romantismo', 'indianismo', 'poesia', 'exílio']),

bl('machado-quincas-borba', 'Quincas Borba', 'Quincas Borba', 'O humanitismo e a tragédia do filósofo louco',
  'Machado de Assis (1839–1908)', 'Quincas Borba, 1891', '1891', 'Português', 1908,
  'Literatura', 'Avançado', '4–5 horas',
  'Rubião herda uma fortuna e um cachorro chamado Quincas Borba. Ambos carregam o peso de uma filosofia absurda e de um mundo que não tem piedade dos ingênuos.',
  'crimson',
  [
    { title: 'I — O Humanitismo', estimatedMinutes: 7, content: `<h2>O Humanitismo</h2>
<p>Quincas Borba era um filósofo. Havia inventado uma filosofia chamada Humanitismo, cujo princípio central era: <em>Ao vencedor as batatas!</em></p>
<p>O Humanitismo dizia que o sofrimento dos vencidos era parte necessária da vitória dos vencedores. As batatas — símbolo de sustento — vão para quem ganha. Os que perdem, perdem tudo, inclusive o direito de chorar.</p>
<blockquote><em>"Humanitas é o princípio. O mal não existe. A dor é ilusória. Quincas Borba é o profeta."</em></blockquote>
<p>Rubião, simples professor de Barbacena, tornou-se amigo de Quincas Borba nos últimos dias dele. Quando o filósofo morreu, deixou a Rubião toda a fortuna — com uma condição: que cuidasse do cachorro, também chamado Quincas Borba.</p>` },
    { title: 'II — A Fortuna e a Queda', estimatedMinutes: 9, content: `<h2>A Fortuna e a Queda</h2>
<p>Rubião foi para o Rio de Janeiro rico. E a riqueza foi sua perdição.</p>
<p>Conheceu Cristiano Palha e sua esposa Sofia. Sofia era bela, inteligente e calculista. Rubião apaixonou-se. Sofia o usou — deixava-o acreditar no amor, enquanto o marido extraía dinheiro do ingênuo provinciano.</p>
<p>A fortuna foi se esvaindo. Os amigos dos tempos de glória desapareceram. Rubião ficou cada vez mais excêntrico, falando sozinho, imaginando que era Napoleão III.</p>
<p>O cachorro Quincas Borba era o único que não o abandonava.</p>` },
    { title: 'III — O Fim do Jogo', estimatedMinutes: 8, content: `<h2>O Fim do Jogo</h2>
<p>Rubião voltou para Barbacena pobríssimo e louco. Corria pelas ruas proclamando que era imperador. As crianças riam. Os adultos desviavam.</p>
<p>O cachorro Quincas Borba morreu logo depois. E Rubião, ao ver o cão morto, também morreu — como se a última ligação com o mundo tivesse se partido.</p>
<blockquote><em>"Ao vencedor as batatas! — era a filosofia. E Rubião não era o vencedor."</em></blockquote>
<p>Machado encerra com a frieza habitual: a fortuna passou para outros, Sofia prosperou, Cristiano prosperou. O Humanitismo tinha razão — aos vencedores as batatas. Rubião foi a batata dos outros.</p>
<p>É um romance sobre a crueldade sistêmica de uma sociedade que devora os ingênuos e chama isso de lei natural.</p>` },
  ],
  ['machado de assis', 'humanitismo', 'realismo', 'sátira']),

bl('eça-crime-padre-amaro', 'O Crime do Padre Amaro', 'O Crime do Padre Amaro', 'A hipocrisia clerical e o amor proibido no Portugal oitocentista',
  'Eça de Queirós (1845–1900)', 'O Crime do Padre Amaro, 1875', '1875', 'Português', 1900,
  'Literatura', 'Avançado', '5–6 horas',
  'Romance naturalista de Eça de Queirós. O padre Amaro seduz Amélia, filha de uma beata. Obra fundadora do Realismo português, escandalosa e magistral.',
  'burgundy',
  [
    { title: 'I — O Padre e a Beata', estimatedMinutes: 9, content: `<h2>O Padre e a Beata</h2>
<p>O padre Amaro chegou a Leiria jovem, bem-parecido e sem vocação. Tinha se tornado padre porque não havia outra saída: filho de criada, sem dinheiro, a Igreja era o único caminho para ascender socialmente.</p>
<p>Ficou hospedado na casa de São Joaneira, uma beata devota que tinha uma filha — Amélia — de vinte anos, bonita, religiosa por educação, apaixonada por natureza.</p>
<blockquote><em>"Padre Amaro era jovem, e a batina não apagava a virilidade que havia nele."</em></blockquote>
<p>A amizade entre o padre e a família era natural — era o que se esperava de um clérigo respeitável. Mas os olhos de Amélia eram grandes e escuros, e o padre Amaro era humano demais para a promessa que havia feito.</p>` },
    { title: 'II — O Pecado', estimatedMinutes: 10, content: `<h2>O Pecado</h2>
<p>O amor cresceu em segredo, alimentado por missas, confissões, encontros na sacristia. Amélia confessava seus pensamentos ao padre, e o padre absolvia — enquanto compartilhava os mesmos pensamentos.</p>
<p>Eça narra tudo com uma frieza que é pior que qualquer condenação. Não há vilões — há apenas seres humanos presos em instituições que não foram feitas para a natureza humana.</p>
<p>A clandestinidade da relação era excitante e perigosa. Quando Amélia ficou grávida, o problema era grave: um escândalo destruiria o padre, a família, a reputação de todos.</p>
<p>Amaro encontrou uma solução — horrível, mas conveniente. Uma mulher chamada Dionísia ficou com a criança. O recém-nascido morreu logo depois, de maneira obscura.</p>` },
    { title: 'III — O Crime e o Silêncio', estimatedMinutes: 9, content: `<h2>O Crime e o Silêncio</h2>
<p>Amélia morreu no parto, de complicações. Padre Amaro sobreviveu — e prosperou. Foi transferido para outra paróquia, subiu na hierarquia eclesiástica, tornou-se um padre respeitado.</p>
<blockquote><em>"Ninguém soube. Ninguém perguntou. O padre rezou a missa de Amélia com a voz firme de quem está em paz com Deus."</em></blockquote>
<p>O título é preciso: houve um crime. Mas o crime não foi apenas a sedução — foi a impunidade, o silêncio, a instituição que protegeu o culpado e engoliu a vítima.</p>
<p>Eça de Queirós foi atacado pela Igreja, pelo governo, pelos conservadores. O livro foi proibido, depois relançado em versão revisada. Mas a acusação essencial permaneceu: a hipocrisia é o maior pecado — e é o único que a sociedade perdoa.</p>` },
  ],
  ['eça de queirós', 'naturalismo', 'portugal', 'crítica religiosa', 'clero']),

bl('camilo-amor-perdição', 'Amor de Perdição', 'Amor de Perdição', 'O amor impossível e a tragédia do romantismo português',
  'Camilo Castelo Branco (1825–1890)', 'Amor de Perdição, 1862', '1862', 'Português', 1890,
  'Literatura', 'Intermediário', '3–4 horas',
  'Romance semi-autobiográfico de Camilo Castelo Branco. Simão Botelho ama Teresa de Albuquerque, de família inimiga. O amor proibido leva à ruína, ao exílio e à morte.',
  'crimson',
  [
    { title: 'Parte I — O Amor Proibido', estimatedMinutes: 8, content: `<h2>O Amor Proibido</h2>
<p>Camilo Castelo Branco escreveu este romance na cadeia, em dezoito dias, enquanto aguardava julgamento por ter raptado Ana Plácido, mulher casada que amava. A velocidade e a dor estão em cada página.</p>
<p>Simão Botelho, filho de um corregedor de Viseu, apaixonou-se por Teresa de Albuquerque, filha de uma família rival. Em Portugal do século XVIII, esse amor era impossível — as famílias se odiavam, os pais proibiam, a sociedade fechava as portas.</p>
<blockquote><em>"Simão amava Teresa desde que a vira pela primeira vez da janela. E esse amor seria, desde o princípio, a sua perdição."</em></blockquote>
<p>Mas o amor não obedece a famílias nem a proibições. Os dois se encontravam em segredo, trocavam cartas, planejavam fugir.</p>` },
    { title: 'Parte II — O Crime e o Degredo', estimatedMinutes: 9, content: `<h2>O Crime e o Degredo</h2>
<p>Para defender Teresa da perseguição da família dela, Simão matou Baltasar Coutinho, o primo que a família queria que ela casasse. Foi preso, julgado, condenado ao degredo na Índia.</p>
<p>Teresa, por sua vez, foi encerrada num convento. Os dois nunca mais se veriam.</p>
<p>As cartas que trocaram na prisão são das mais belas páginas do Romantismo português. Não têm a afetação do sentimentalismo de segunda linha — têm uma autenticidade que vem da dor real de Camilo escrevendo sobre a sua própria situação.</p>
<blockquote><em>"Meu amor, se eu soubesse que te estava a custar a liberdade, teria morrido antes de te amar."</em></blockquote>` },
    { title: 'Parte III — O Fim no Mar', estimatedMinutes: 8, content: `<h2>O Fim no Mar</h2>
<p>No navio que o levava para a Índia, Simão soube que Teresa tinha morrido no convento. Morreu ele também, pouco depois — de desgosto, diz Camilo, como se a alma pudesse morrer de amor.</p>
<p>Baltatsar morreu por amor. Teresa morreu por amor. Simão morreu por amor. Camilo, ao escrever este romance, estava ele próprio numa prisão por amor.</p>
<p>O Romantismo acreditava que o amor era mais forte que tudo — mais forte que a sociedade, que as convenções, que a própria vida. E esse amor tinha que ser trágico para ser verdadeiro.</p>
<blockquote><em>"Dois esquifes saíram do mesmo porto naquele dia: o de Teresa, para o cemitério; o de Simão, para o oceano."</em></blockquote>
<p><em>Amor de Perdição</em> é o romance mais lido da literatura portuguesa do século XIX. É também o mais honesto — porque foi escrito por alguém que entendia o que significava perder tudo por amor.</p>` },
  ],
  ['camilo castelo branco', 'romantismo', 'portugal', 'amor', 'tragédia']),

];
