import { Ebook } from '../types';

/**
 * Obras adicionais em domínio público — Studio Logos
 * Todas as obras são de autores falecidos há mais de 70 anos (domínio público)
 */
export const additionalWorks: Ebook[] = [

  // ─── TEOLOGIA ───────────────────────────────────────────────────────────────

  {
    id: 'pd-didache',
    slug: 'didache-doutrina-dos-doze-apostolos',
    title: 'Didaquê',
    displayTitle: 'Didaquê — A Doutrina dos Doze Apóstolos',
    subtitle: 'O mais antigo manual de instrução cristã, c. 50–120 d.C.',
    category: 'Teologia',
    subcategory: 'Patrística',
    collection: 'Pais Apostólicos',
    brand: 'Studio Logos',
    authorReference: 'Anônimo (séc. I–II d.C.)',
    workReference: 'c. 50–120 d.C.',
    contentType: 'public_domain',
    contentTypeLabel: 'public_domain',
    copyrightStatus: 'public_domain_verified',
    accessMode: 'online_only',
    downloadAllowed: false,
    fullTextAllowed: true,
    originalLanguage: 'Grego',
    authorDeathYear: 0,
    level: 'Iniciante',
    readingTime: '45 min',
    featured: true,
    isNew: false,
    coverTheme: 'gold',
    description: 'A Didaquê é o mais antigo manual de instrução cristã que sobreviveu até os dias atuais. Descoberta em 1873, esta obra do século I–II apresenta as regras de vida, liturgia e organização da comunidade cristã primitiva.',
    learn: [
      'Regras de vida cristã primitiva',
      'Liturgia do batismo e da eucaristia',
      'Organização da Igreja nascente',
      'Ética cristã do século I',
    ],
    recommendedFor: ['Estudantes de Teologia', 'Pastores', 'Historiadores da Igreja', 'Interessados no Cristianismo Primitivo'],
    editorialNotice: 'Texto em domínio público. Tradução baseada nas edições críticas do século XIX.',
    tags: ['patrística', 'cristianismo primitivo', 'liturgia', 'ética', 'apóstolos'],
    chapters: [
      {
        id: 'didache-1',
        title: 'Capítulo I — Os Dois Caminhos',
        estimatedMinutes: 8,
        content: `<h2>Os Dois Caminhos</h2>
<p class="dropcap">Há dois caminhos: um da vida e outro da morte; e grande é a diferença entre esses dois caminhos.</p>
<h3>O Caminho da Vida</h3>
<p>O caminho da vida é este: primeiro, amarás a Deus que te criou; segundo, amarás ao teu próximo como a ti mesmo; e tudo o que não quiseres que te façam, não o faças a outro.</p>
<p>A doutrina destas palavras é esta: bendizei os que vos amaldiçoam, e orai pelos vossos inimigos, e jejuai pelos que vos perseguem; porque que mérito há em amar os que vos amam? Não fazem o mesmo os gentios? Mas vós amai os que vos odeiam, e não tereis inimigo.</p>
<p>Abstende-vos dos desejos carnais e corporais. Se alguém te der uma bofetada na face direita, volta-lhe também a outra, e serás perfeito. Se alguém te obrigar a andar uma milha, vai com ele duas. Se alguém te tirar o manto, dá-lhe também a túnica. Se alguém tomar o que é teu, não o reclames, pois não podes.</p>
<p>Dá a todo o que te pede, e não reclames, porque o Pai quer que a todos se dê dos seus próprios dons. Bem-aventurado aquele que dá segundo o mandamento, pois é inocente. Ai daquele que recebe: se alguém recebe por necessidade, será inocente; mas o que recebe sem necessidade dará conta de por que recebeu e para que fim; e, sendo preso, será interrogado acerca do que fez, e não sairá dali até pagar o último centavo.</p>
<h3>O Segundo Mandamento</h3>
<p>O segundo mandamento da doutrina é: não matarás, não adulterarás, não corromperás meninos, não fornicarás, não roubarás, não usarás de magia, não prepararás venenos, não matarás o filho no ventre materno nem o matarás depois de nascido, não cobiçarás os bens do teu próximo.</p>
<p>Não perjurarás, não darás falso testemunho, não falarás mal, não guardarás rancor. Não serás de duplo ânimo nem de dupla língua, porque a duplicidade de língua é laço de morte. A tua palavra não será falsa nem vã, mas confirmada pela ação. Não serás avaro, nem rapace, nem hipócrita, nem mau, nem soberbo. Não tomarás mau conselho contra o teu próximo. Não odiarás nenhum homem; a uns repreenderás, por outros orarás, e a outros amarás mais do que à tua própria alma.</p>`,
      },
      {
        id: 'didache-2',
        title: 'Capítulo II — Sobre o Batismo',
        estimatedMinutes: 7,
        content: `<h2>Sobre o Batismo</h2>
<p class="dropcap">Quanto ao batismo, batizai assim: tendo ensinado previamente tudo isso, batizai em nome do Pai e do Filho e do Espírito Santo, em água viva.</p>
<p>Se não tens água viva, batiza em outra água; se não podes em fria, batiza em quente. Se não tens nem uma nem outra, derrama água sobre a cabeça três vezes em nome do Pai e do Filho e do Espírito Santo.</p>
<p>Antes do batismo, jejue o batizante e o batizado, e outros que possam. Mas ordena ao batizado que jejue um ou dois dias antes.</p>
<h3>Sobre a Oração</h3>
<p>Não oreis como os hipócritas, mas como o Senhor ordenou no seu Evangelho, orai assim:</p>
<p><em>Pai nosso que estás nos céus, santificado seja o teu nome, venha o teu reino, seja feita a tua vontade assim na terra como no céu; o pão nosso de cada dia nos dá hoje, e perdoa-nos as nossas dívidas como nós também perdoamos aos nossos devedores; e não nos deixes cair em tentação, mas livra-nos do mal; porque teu é o poder e a glória para sempre.</em></p>
<p>Orai assim três vezes por dia.</p>
<h3>Sobre o Jejum</h3>
<p>Os vossos jejuns não sejam com os hipócritas, pois eles jejuam na segunda e na quinta-feira; vós, porém, jejuai na quarta e na sexta-feira.</p>`,
      },
      {
        id: 'didache-3',
        title: 'Capítulo III — A Eucaristia',
        estimatedMinutes: 10,
        content: `<h2>A Eucaristia</h2>
<p class="dropcap">Quanto à Eucaristia, dai graças assim. Primeiro pelo cálice: Nós te damos graças, Pai nosso, pela santa videira de Davi, teu servo, que nos fizeste conhecer por Jesus, teu servo. A ti seja a glória para sempre.</p>
<p>Pelo pão partido: Nós te damos graças, Pai nosso, pela vida e pelo conhecimento que nos revelaste por Jesus, teu servo. A ti seja a glória para sempre. Como este pão partido estava disperso sobre os montes e, reunido, se tornou um, assim seja reunida a tua Igreja dos confins da terra no teu reino, porque tua é a glória e o poder por Jesus Cristo para sempre.</p>
<p>Que ninguém coma nem beba da vossa Eucaristia, senão os batizados em nome do Senhor; pois a este respeito disse o Senhor: Não deis o que é santo aos cães.</p>
<h3>Ação de Graças após a Comunhão</h3>
<p>Depois de vos saciardes, dai graças assim: Nós te damos graças, Pai santo, pelo teu santo nome que fizeste habitar em nossos corações, e pelo conhecimento e fé e imortalidade que nos revelaste por Jesus, teu servo. A ti seja a glória para sempre.</p>
<p>Tu, Senhor todo-poderoso, criaste todas as coisas por causa do teu nome, e deste aos homens alimento e bebida para que se deleitassem, a fim de que te dessem graças; a nós, porém, concedeste alimento e bebida espiritual e vida eterna por meio do teu servo. Antes de tudo, te damos graças porque és poderoso. A ti seja a glória para sempre.</p>
<p>Lembra-te, Senhor, da tua Igreja, para a livrar de todo o mal e aperfeiçoá-la no teu amor, e reúne-a dos quatro ventos, santificada, no teu reino que lhe preparaste; porque teu é o poder e a glória para sempre. Venha a graça e passe este mundo. Hosana ao Deus de Davi. Se alguém é santo, que venha; se não é, que se converta. Maranatha. Amém.</p>`,
      },
    ],
  },

  {
    id: 'pd-carta-diogneto',
    slug: 'carta-a-diogneto',
    title: 'Carta a Diogneto',
    subtitle: 'A mais bela apologia do Cristianismo primitivo',
    category: 'Teologia',
    subcategory: 'Patrística',
    collection: 'Pais Apostólicos',
    brand: 'Studio Logos',
    authorReference: 'Anônimo (séc. II d.C.)',
    workReference: 'c. 130–200 d.C.',
    contentType: 'public_domain',
    contentTypeLabel: 'public_domain',
    copyrightStatus: 'public_domain_verified',
    accessMode: 'online_only',
    downloadAllowed: false,
    fullTextAllowed: true,
    originalLanguage: 'Grego',
    authorDeathYear: 0,
    level: 'Iniciante',
    readingTime: '1h 20min',
    featured: true,
    coverTheme: 'gold',
    description: 'A Carta a Diogneto é uma das mais belas apologias do Cristianismo primitivo. Dirigida a um nobre pagão, descreve a vida dos cristãos no mundo com uma elegância literária incomparável.',
    learn: [
      'Visão cristã da vida no mundo',
      'Apologética do século II',
      'Relação entre fé e cultura',
      'Identidade cristã na sociedade pagã',
    ],
    recommendedFor: ['Estudantes de Teologia', 'Apologistas', 'Historiadores', 'Filósofos'],
    editorialNotice: 'Texto em domínio público. Tradução do grego clássico.',
    tags: ['patrística', 'apologia', 'cristianismo primitivo', 'identidade cristã'],
    chapters: [
      {
        id: 'diogneto-1',
        title: 'Capítulos I–III — Quem São os Cristãos',
        estimatedMinutes: 15,
        content: `<h2>Quem São os Cristãos</h2>
<p class="dropcap">Vejo, excelente Diogneto, que te aplicas com ardor a aprender a religião dos cristãos, e que perguntas com clareza e cuidado acerca deles: a que Deus confiam e como o adoram; como todos desprezam o mundo e a morte; como não reconhecem os deuses que os gregos consideram como tais e não observam a superstição dos judeus; qual é o amor que têm uns pelos outros; por que razão esta nova raça ou prática entrou no mundo agora e não antes.</p>
<p>Aprovo este teu desejo e peço a Deus que me dê a graça de falar e a ti de ouvir, de modo que eu possa falar sem te causar dano e tu possas ouvir sem que eu te cause tristeza.</p>
<h3>Sobre os Ídolos</h3>
<p>Vamos, pois, limpar-te de todos os preconceitos que ocupam a tua mente e afastar o engano que te ilude. Tornaste-te como um homem novo, como se fosses, como tu mesmo dizes, um ouvinte de um discurso novo. Vê não só com os olhos, mas também com a inteligência, de que substância ou de que forma são aqueles que chamais e considerais como deuses.</p>
<p>Não é um deles pedra, semelhante à que pisamos? Outro, bronze, não melhor do que os vasos que nos servem para uso doméstico? Outro, madeira, já apodrecida? Outro, prata, que precisa de um guarda para não ser roubada? Outro, ferro, corroído pela ferrugem? Outro, barro, não mais precioso do que o que é feito para o uso mais vil?</p>
<p>Não são todos eles perecíveis? Não foram feitos de matéria perecível? Não foram feitos por mãos de homens? Não são surdos? Não são cegos? Não são sem alma? Não são sem sentido? Não são sem movimento? Não apodrecem todos? Não se corrompem todos?</p>`,
      },
      {
        id: 'diogneto-2',
        title: 'Capítulos V–VI — Os Cristãos no Mundo',
        estimatedMinutes: 18,
        content: `<h2>Os Cristãos no Mundo</h2>
<p class="dropcap">Os cristãos não se distinguem dos outros homens nem pela terra em que habitam, nem pela língua que falam, nem pelos costumes que observam. Com efeito, não têm cidades próprias, nem usam um falar insólito, nem levam vida diferente.</p>
<p>A sua doutrina não foi inventada por curiosidade ou especulação de homens inquietos; eles não são, como alguns, campeões de uma doutrina meramente humana.</p>
<p>Habitando cidades gregas e bárbaras, conforme a sorte de cada um, e adaptando-se nos vestuários, alimentação e modo de vida às tradições e costumes locais, dão provas de um método de vida social admirável e, reconhecidamente, paradoxal.</p>
<h3>A Paradoxal Existência Cristã</h3>
<p>Habitam as suas próprias pátrias, mas como forasteiros; participam de tudo como cidadãos, e suportam tudo como estrangeiros; toda a terra estranha é para eles pátria, e toda a pátria é terra estranha.</p>
<p>Casam como todos, geram filhos, mas não expõem os recém-nascidos. Têm mesa comum, mas não leito comum. Estão na carne, mas não vivem segundo a carne. Passam o tempo na terra, mas têm a sua cidadania no céu. Obedecem às leis estabelecidas, e com o seu modo de vida superam as leis.</p>
<p>Amam a todos, e por todos são perseguidos. São desconhecidos, e são condenados; são mortos, e nisto encontram a vida. São pobres, e enriquecem a muitos; carecem de tudo, e em tudo abundam. São desonrados, e nas desonras se glorificam. São caluniados, e são justificados. São insultados, e eles abençoam; são maltratados, e eles honram. Fazendo o bem, são punidos como malfeitores; quando punidos, alegram-se como se recebessem a vida.</p>
<h3>A Alma do Mundo</h3>
<p>Em uma palavra: o que é a alma no corpo, isso são os cristãos no mundo. A alma está espalhada por todos os membros do corpo, e os cristãos estão espalhados pelas cidades do mundo. A alma habita no corpo, mas não é do corpo; os cristãos habitam no mundo, mas não são do mundo.</p>
<p>A alma invisível está guardada num corpo visível; os cristãos são conhecidos como estando no mundo, mas a sua religião permanece invisível. A carne odeia a alma e faz-lhe guerra, sem ter sofrido nenhum dano, porque ela se opõe aos seus prazeres; o mundo odeia os cristãos sem ter sofrido nenhum dano, porque eles se opõem aos seus prazeres.</p>`,
      },
    ],
  },

  // ─── FILOSOFIA ──────────────────────────────────────────────────────────────

  {
    id: 'pd-meditacoes-marco-aurelio',
    slug: 'meditacoes-marco-aurelio',
    title: 'Meditações',
    displayTitle: 'Meditações — Marco Aurélio',
    subtitle: 'O diário filosófico do imperador-filósofo estoico',
    category: 'Filosofia',
    subcategory: 'Estoicismo',
    collection: 'Clássicos do Estoicismo',
    brand: 'Studio Logos',
    authorReference: 'Marco Aurélio (121–180 d.C.)',
    workReference: 'c. 161–180 d.C.',
    contentType: 'public_domain',
    contentTypeLabel: 'public_domain',
    copyrightStatus: 'public_domain_verified',
    accessMode: 'online_only',
    downloadAllowed: false,
    fullTextAllowed: true,
    originalLanguage: 'Grego',
    authorDeathYear: 180,
    level: 'Iniciante',
    readingTime: '4h 30min',
    featured: true,
    isNew: false,
    coverTheme: 'navy',
    description: 'As Meditações de Marco Aurélio são um dos textos filosóficos mais influentes da história. Escritas como um diário pessoal, revelam a alma de um imperador que buscava a virtude e a sabedoria estoica em meio às pressões do poder.',
    learn: [
      'Filosofia estoica na prática',
      'Arte de viver com virtude',
      'Controle das emoções e pensamentos',
      'Sabedoria diante da adversidade',
      'Meditação e autoconhecimento',
    ],
    recommendedFor: ['Filósofos', 'Líderes', 'Estudantes de Filosofia', 'Buscadores de Sabedoria'],
    editorialNotice: 'Texto em domínio público. Tradução baseada nas edições críticas do grego.',
    tags: ['estoicismo', 'filosofia', 'virtude', 'meditação', 'marco aurélio', 'roma'],
    chapters: [
      {
        id: 'med-1',
        title: 'Livro I — Gratidão e Aprendizados',
        estimatedMinutes: 25,
        content: `<h2>Livro I — Gratidão e Aprendizados</h2>
<p class="dropcap">Do meu avô Vero aprendi a ser gentil e manso, e a refrear a ira.</p>
<p>Da fama e memória de meu pai, aprendi a modéstia e a virilidade.</p>
<p>De minha mãe aprendi a piedade e a liberalidade, e a abster-me não só de fazer o mal, mas até de pensar nele; aprendi também a simplicidade de vida, bem longe dos costumes dos ricos.</p>
<p>De meu bisavô aprendi a não frequentar as escolas públicas, a ter bons mestres em casa, e a compreender que nestas coisas é preciso gastar muito dinheiro.</p>
<h3>Dos Mestres</h3>
<p>De meu governante aprendi a não tomar partido nem dos Verdes nem dos Azuis no circo, nem dos parmulários nem dos escutários no anfiteatro; a suportar os trabalhos, a ter poucas necessidades, a trabalhar com as próprias mãos, a não me meter nos negócios alheios e a não dar ouvidos à calúnia.</p>
<p>De Diogneto aprendi a não me ocupar com coisas fúteis; a não crer nas promessas dos charlatães e dos feiticeiros sobre encantamentos e expulsão de demônios e outras coisas semelhantes; a não criar codornizes para pelejas, nem me apaixonar por essas coisas; a suportar a franqueza e a familiarizar-me com a filosofia; a ouvir primeiro Bacquio, depois Tandásio e Marciano; a escrever diálogos ainda na infância; a desejar um leito de tábuas e uma pele de animal, e tudo o mais que faz parte da disciplina grega.</p>
<p>De Rústico aprendi a conceber a necessidade de reformar e cuidar do meu caráter; a não me desviar para a emulação dos sofistas, nem escrever sobre especulações teóricas, nem fazer discursos de exortação, nem me exibir como homem de ascese ou de beneficência para impressionar os outros; a me afastar da retórica, da poesia e da linguagem rebuscada; a não andar pela casa com o manto de cerimônia, nem fazer coisas semelhantes; a escrever as cartas com simplicidade, como aquela que ele próprio escreveu de Sinuessa a minha mãe; a ser fácil de reconciliar com os que me ofendem e me magoam, logo que mostrem vontade de se reconciliar; a ler com atenção e não me contentar com uma compreensão superficial, nem dar facilmente meu assentimento aos que falam muito.</p>`,
      },
      {
        id: 'med-2',
        title: 'Livro II — Sobre a Brevidade da Vida',
        estimatedMinutes: 22,
        content: `<h2>Livro II — Sobre a Brevidade da Vida</h2>
<p class="dropcap">Dize a ti mesmo, ao amanhecer: encontrarei hoje um intrometido, um ingrato, um insolente, um enganador, um invejoso, um egoísta. Tudo isso lhes acontece por ignorância do bem e do mal. Mas eu, que reconheci a natureza do bem como bela, e a do mal como feia, e a natureza do pecador como aparentada com a minha — não porque seja da mesma raça ou do mesmo sangue, mas porque participa da mesma inteligência e da mesma parcela divina — eu não posso ser prejudicado por nenhum deles, pois ninguém pode me fazer participar do que é feio; nem posso me irritar com meu parente, nem odiá-lo. Pois nascemos para cooperar, como os pés, as mãos, as pálpebras, as fileiras dos dentes superiores e inferiores. Portanto, agir uns contra os outros é contrário à natureza; e é agir contra a natureza irritar-se e virar as costas.</p>
<h3>A Transitoriedade das Coisas</h3>
<p>Que tudo o que existe é efêmero e fugaz, e que ontem era apenas um germe, amanhã será múmia ou cinza. Passa por este instante de tempo conforme a natureza, e termina o teu caminho de bom grado, como a azeitona madura que cai louvando a terra que a nutriu e agradecida à árvore que a produziu.</p>
<p>Sê como o promontório contra o qual as ondas se quebram continuamente; ele permanece firme e à sua volta as ondas espumosas se acalmam. "Azar meu, que isso me aconteceu a mim!" Pelo contrário, dize: "Boa sorte minha, que, apesar disso, continuo sem tristeza, sem ser esmagado pelo presente nem temeroso do futuro." Pois isso poderia ter acontecido a qualquer um, mas nem todos teriam continuado sem tristeza.</p>
<h3>O Presente é Tudo</h3>
<p>Não percas mais tempo discutindo o que deve ser um homem bom. Sê um.</p>
<p>Pensa frequentemente na velocidade com que as coisas que existem e que existirão são arrastadas e desaparecem. Pois a substância é como um rio em fluxo contínuo, as atividades estão em constante mudança, as causas têm mil variações, e quase nada permanece fixo; e muito próxima está essa imensidão do passado e do futuro, na qual tudo se dissolve. Como então não seria tolo aquele que nessas coisas se ensoberbece, ou se aflige, ou se lamenta, como se por muito tempo o afligissem?</p>`,
      },
      {
        id: 'med-3',
        title: 'Livro IV — A Razão Universal',
        estimatedMinutes: 28,
        content: `<h2>Livro IV — A Razão Universal</h2>
<p class="dropcap">O que não é bom para o enxame não é bom para a abelha.</p>
<p>Retira-te para dentro de ti mesmo tanto quanto possas; e recebe na tua companhia aqueles que são melhores do que tu e que têm virtude, sem te afastares deles.</p>
<p>A vida de um homem é um momento, sua existência um fluxo, sua percepção turva, a composição de seu corpo corruptível, sua alma um turbilhão, seu destino obscuro, sua fama duvidosa. Em suma, tudo o que é do corpo é como um rio; tudo o que é da alma, como sonho e vapor; a vida é uma guerra e uma peregrinação no estrangeiro; a fama póstuma é o esquecimento.</p>
<h3>O Que Nos Perturba</h3>
<p>Não são as coisas que perturbam os homens, mas as opiniões sobre as coisas. Por exemplo, a morte não é terrível — pois se fosse, teria parecido assim a Sócrates — mas a opinião de que a morte é terrível, isso é terrível. Portanto, quando somos contrariados, perturbados ou entristecidos, nunca culpemos os outros, mas a nós mesmos, isto é, às nossas próprias opiniões.</p>
<p>Cada um de nós vive apenas no presente, neste instante fugaz; o resto é ou já foi vivido ou é incerto. Pequena, portanto, é a vida de cada um, pequeno o canto da terra em que vive, pequena até a mais longa fama póstuma — e mesmo esta é transmitida por uma cadeia de homens que morrerão em breve e que não se conhecem a si mesmos, muito menos àquele que morreu há muito.</p>
<h3>Sobre a Morte</h3>
<p>Não temas a morte, mas recebe-a de bom grado, como uma das coisas que a natureza quer. Pois assim como é da natureza ser jovem e envelhecer, crescer e chegar à maturidade, ter dentes, barba, cabelos brancos, gerar, estar grávida, dar à luz, e todas as outras operações naturais que as estações da tua vida trazem, assim também é da tua natureza a dissolução. Por isso, é próprio de um homem de bom senso não ser descuidado, impaciente ou desdenhoso em relação à morte, mas esperá-la como uma das operações naturais.</p>`,
      },
    ],
  },

  {
    id: 'pd-etica-nicomaqueia',
    slug: 'etica-a-nicomaqueia-aristoteles',
    title: 'Ética a Nicômaco',
    displayTitle: 'Ética a Nicômaco — Aristóteles',
    subtitle: 'A obra fundamental da ética ocidental',
    category: 'Filosofia',
    subcategory: 'Filosofia Clássica',
    collection: 'Clássicos da Filosofia Grega',
    brand: 'Studio Logos',
    authorReference: 'Aristóteles (384–322 a.C.)',
    workReference: 'c. 350 a.C.',
    contentType: 'public_domain',
    contentTypeLabel: 'public_domain',
    copyrightStatus: 'public_domain_verified',
    accessMode: 'online_only',
    downloadAllowed: false,
    fullTextAllowed: true,
    originalLanguage: 'Grego',
    authorDeathYear: -322,
    level: 'Intermediário',
    readingTime: '8h',
    featured: true,
    coverTheme: 'navy',
    description: 'A Ética a Nicômaco é a obra mais importante de Aristóteles sobre ética. Nela, o filósofo investiga a natureza da felicidade (eudaimonia), a virtude, a amizade e a vida boa, fundando a tradição da ética das virtudes.',
    learn: [
      'Conceito de eudaimonia (felicidade)',
      'Teoria das virtudes aristotélicas',
      'Ética do meio-termo',
      'Amizade como bem supremo',
      'Vida contemplativa e vida ativa',
    ],
    recommendedFor: ['Filósofos', 'Estudantes de Ética', 'Teólogos Morais', 'Líderes'],
    editorialNotice: 'Texto em domínio público. Tradução do grego clássico.',
    tags: ['aristóteles', 'ética', 'virtude', 'felicidade', 'filosofia grega', 'eudaimonia'],
    chapters: [
      {
        id: 'en-1',
        title: 'Livro I — O Bem Supremo e a Felicidade',
        estimatedMinutes: 35,
        content: `<h2>Livro I — O Bem Supremo e a Felicidade</h2>
<p class="dropcap">Toda arte e toda investigação, assim como toda ação e todo propósito, visam a algum bem; por isso foi dito, com razão, que o bem é aquilo a que todas as coisas tendem.</p>
<p>Mas nota-se uma certa diferença entre os fins: alguns são atividades, outros são obras distintas das atividades. Onde existem fins distintos das ações, as obras são por natureza superiores às atividades.</p>
<p>Como existem muitas ações, artes e ciências, seus fins também são muitos; o fim da medicina é a saúde, o da construção naval é o navio, o da estratégia é a vitória, o da economia é a riqueza. Mas onde quer que tais artes caiam sob uma única faculdade — como a fabricação de freios e as outras artes concernentes ao equipamento do cavalo caem sob a arte da equitação, e esta e toda ação militar caem, por sua vez, sob a estratégia, e do mesmo modo outras artes caem sob outras ainda — em todos esses casos os fins das artes mestras são preferíveis a todos os fins das artes subordinadas, pois estas últimas são buscadas em vista das primeiras.</p>
<h3>A Ciência Política</h3>
<p>Se, então, há algum fim de nossas ações que desejamos por si mesmo (sendo tudo o mais desejado por causa dele), e se não escolhemos tudo em vista de outra coisa — pois, se fosse assim, o processo se prolongaria ao infinito, de modo que o desejo seria vazio e vão — claramente esse fim deve ser o bem e o melhor dos bens.</p>
<p>O conhecimento desse bem tem, então, grande influência sobre a vida, e se o conhecermos, como arqueiros que têm um alvo em vista, não estaremos mais propensos a acertar no que é certo? Se assim for, devemos tentar, em linhas gerais pelo menos, determinar o que é esse bem e de qual das ciências ou faculdades ele é objeto.</p>
<p>Pareceria pertencer à mais autoritária das ciências e àquela que é mais verdadeiramente a ciência mestre. E a política parece ser dessa natureza; pois é ela que ordena quais das ciências devem existir nos estados, e quais cada classe de cidadãos deve aprender, e até que ponto; e vemos que até as faculdades mais estimadas, como a estratégia, a economia, a retórica, estão subordinadas a ela.</p>
<h3>O Que é a Felicidade</h3>
<p>Voltemos de novo ao bem que estamos buscando, e perguntemos o que ele pode ser. Parece diferente em diferentes ações e artes; é diferente na medicina, na estratégia, e nas outras artes. O que é então o bem de cada uma? Presumivelmente aquilo em vista do qual tudo o mais é feito. Na medicina isso é a saúde, na estratégia a vitória, na arquitetura uma casa, em qualquer outra esfera outra coisa, e em toda ação e propósito é o fim; pois é em vista do fim que todos os homens fazem tudo o mais. Portanto, se há um fim para tudo o que fazemos, esse será o bem realizável pela ação, e se há mais de um, esses serão os bens realizáveis pela ação.</p>
<p>Então, o que o bem supremo é? Quanto ao nome, há quase completo acordo; pois tanto o vulgo como as pessoas de refinamento dizem que é a felicidade, e identificam o viver bem e o ir bem com o ser feliz; mas com respeito ao que é a felicidade eles diferem, e o vulgo não dá a mesma resposta que os sábios.</p>`,
      },
      {
        id: 'en-2',
        title: 'Livro II — A Virtude Moral',
        estimatedMinutes: 30,
        content: `<h2>Livro II — A Virtude Moral</h2>
<p class="dropcap">A virtude, então, sendo de dois tipos, intelectual e moral, a virtude intelectual em sua origem e crescimento deve-se principalmente ao ensino (por isso requer experiência e tempo), enquanto a virtude moral vem como resultado do hábito, donde também seu nome (ethos) é formado por uma ligeira variação da palavra hábito (ethos).</p>
<p>Disto é claro que nenhuma das virtudes morais surge em nós por natureza; pois nada que existe por natureza pode ser alterado pelo hábito. Por exemplo, a pedra que por natureza se move para baixo não pode ser habituada a mover-se para cima, mesmo que se tente habituá-la jogando-a dez mil vezes para cima; nem o fogo pode ser habituado a mover-se para baixo, nem qualquer outra coisa que por natureza se comporta de um modo pode ser habituada a comportar-se de outro modo.</p>
<h3>O Meio-Termo</h3>
<p>A virtude, então, é um estado de caráter concernente com escolha, situando-se num meio-termo, isto é, o meio-termo relativo a nós, sendo determinado por um princípio racional, e pelo princípio pelo qual o homem de bom senso prático o determinaria.</p>
<p>Agora, é um meio-termo entre dois vícios, um que envolve excesso e o outro deficiência; e ainda mais porque os vícios respectivamente ficam aquém ou excedem o que é certo tanto nos sentimentos como nas ações, enquanto a virtude tanto encontra como escolhe o que é intermediário.</p>
<p>Por isso, com respeito à sua substância e à definição que enuncia o que ela realmente é, a virtude é um meio-termo, com respeito ao que é melhor e certo, um extremo.</p>
<h3>Exemplos das Virtudes</h3>
<p>Mas nem toda ação nem todo sentimento admite um meio-termo; pois alguns têm nomes que já implicam maldade, por exemplo, malícia, impudência, inveja, e nas ações adultério, roubo, assassinato; pois todas essas coisas e as semelhantes são chamadas assim porque elas próprias são más, não os seus excessos ou deficiências. Nunca é possível, portanto, estar certo com respeito a elas; sempre se erra. Tampouco importa, em tais casos, se é com a pessoa certa ou não, no momento certo, e da maneira certa; simplesmente fazê-las é errar.</p>`,
      },
    ],
  },

  // ─── PSICANÁLISE ────────────────────────────────────────────────────────────

  {
    id: 'pd-interpretacao-sonhos',
    slug: 'interpretacao-dos-sonhos-freud',
    title: 'A Interpretação dos Sonhos',
    displayTitle: 'A Interpretação dos Sonhos — Sigmund Freud',
    subtitle: 'A obra fundadora da psicanálise e do inconsciente',
    category: 'Psicanálise',
    subcategory: 'Freud',
    collection: 'Obras Completas de Freud',
    brand: 'Studio Logos',
    authorReference: 'Sigmund Freud (1856–1939)',
    workReference: '1900',
    contentType: 'public_domain',
    contentTypeLabel: 'public_domain',
    copyrightStatus: 'public_domain_verified',
    accessMode: 'online_only',
    downloadAllowed: false,
    fullTextAllowed: true,
    originalLanguage: 'Alemão',
    authorDeathYear: 1939,
    level: 'Intermediário',
    readingTime: '10h',
    featured: true,
    isNew: false,
    coverTheme: 'deep-purple',
    description: 'A Interpretação dos Sonhos (1900) é a obra fundadora da psicanálise. Nela, Freud apresenta sua teoria do inconsciente, o método de interpretação dos sonhos e a estrutura do aparelho psíquico, revolucionando a compreensão da mente humana.',
    learn: [
      'Teoria freudiana do inconsciente',
      'Método de interpretação dos sonhos',
      'Estrutura do aparelho psíquico',
      'Desejo e realização onírica',
      'Censura e elaboração onírica',
    ],
    recommendedFor: ['Psicanalistas', 'Psicólogos', 'Estudantes de Psicanálise', 'Filósofos da Mente'],
    editorialNotice: 'Texto em domínio público (Freud faleceu em 1939). Tradução baseada nas edições clássicas.',
    tags: ['freud', 'psicanálise', 'sonhos', 'inconsciente', 'desejo', 'psicologia'],
    chapters: [
      {
        id: 'sonhos-1',
        title: 'Capítulo I — A Literatura Científica sobre os Sonhos',
        estimatedMinutes: 40,
        content: `<h2>Capítulo I — A Literatura Científica sobre os Sonhos</h2>
<p class="dropcap">No texto que se segue, apresentarei provas de que existe uma técnica psicológica que torna possível interpretar sonhos, e que, quando esse procedimento é empregado, todo sonho se revela como uma estrutura psíquica que tem um significado e que pode ser inserida num ponto designável nas atividades mentais da vida de vigília.</p>
<p>Além disso, tentarei elucidar os processos que dão origem à estranheza e à obscuridade dos sonhos e deduzir desses processos a natureza das forças psíquicas cujo conflito ou cooperação é responsável pelos sonhos. Quando tiver chegado a esse ponto, minha descrição terá atingido seu fim, pois terá chegado ao ponto em que o problema do sonho se funde com problemas mais abrangentes, cuja solução deve ser tentada com base em material de uma natureza diferente.</p>
<h3>Relação do Sonho com a Vida de Vigília</h3>
<p>O leigo pressupõe que os sonhos, mesmo que não venham dos deuses, derivam pelo menos do mundo dos espíritos, e que, em todo caso, trazem uma parte de outro mundo para a vida humana. Não seria de esperar que o investigador científico partilhasse de tais suposições; mas, por outro lado, seria incorreto supor que ele tenha resolvido o problema dos sonhos.</p>
<p>O que é um sonho? Não é fácil responder a essa pergunta em poucas palavras. Não tentarei uma definição, embora seja possível dar uma descrição do fenômeno que todos reconhecerão. Mas devo chamar a atenção para a grande variedade que os sonhos apresentam.</p>
<p>Muitos sonhos são tão coerentes e inteligíveis quanto qualquer acontecimento de nossa vida de vigília; outros são confusos, absurdos, impossíveis. Alguns são agradáveis, outros desagradáveis ou mesmo aterrorizantes. Alguns são facilmente lembrados ao despertar; outros são esquecidos quase imediatamente.</p>
<h3>A Memória nos Sonhos</h3>
<p>Uma das características mais notáveis dos sonhos é a maneira como eles lidam com a memória. É um fato bem estabelecido que os sonhos frequentemente trazem de volta experiências e impressões que o sonhador havia esquecido, que não estavam mais acessíveis à memória de vigília.</p>
<p>Isso foi observado por muitos escritores. Delboeuf relata que encontrou num sonho dois lagartos de espécie rara que havia visto anos antes e cujo nome havia completamente esquecido. Maury descreve como sonhou com um lugar chamado Mussy, que não havia pensado por muitos anos.</p>`,
      },
      {
        id: 'sonhos-2',
        title: 'Capítulo II — O Método de Interpretação dos Sonhos',
        estimatedMinutes: 45,
        content: `<h2>Capítulo II — O Método de Interpretação dos Sonhos</h2>
<p class="dropcap">O título que escolhi para meu trabalho deixa claro qual das tradições relativas aos sonhos estou inclinado a seguir. O objetivo que me proponho é mostrar que os sonhos são passíveis de interpretação; e qualquer contribuição que eu possa fazer para a solução dos problemas discutidos no último capítulo surgirá apenas como subproduto necessário da realização adequada de minha tarefa peculiar.</p>
<p>Parto do pressuposto de que os sonhos são passíveis de interpretação. Interpretar um sonho significa determinar seu "significado", substituí-lo por algo que se encaixe na cadeia de nossos atos mentais como um elo de igual validade e importância com o resto.</p>
<h3>O Sonho da Injeção de Irma</h3>
<p>No verão de 1895, havia tratado psicanaliticamente de uma jovem que era amiga íntima de minha família. É fácil compreender que uma relação mista como essa pode ser uma fonte de muitos sentimentos perturbadores num médico. O interesse pessoal do médico é maior; sua autoridade é menor. Um fracasso ameaçaria abalar a amizade com a família do paciente.</p>
<p>O tratamento havia terminado de forma parcialmente bem-sucedida; a paciente havia sido aliviada de sua ansiedade histérica, mas não de todos os seus sintomas somáticos. Naquela época, eu não estava ainda muito certo dos critérios que indicavam que um caso histérico estava definitivamente encerrado, e propus à paciente uma solução que ela parecia não estar disposta a aceitar.</p>
<p>Nesse estado de coisas, recebi uma visita de um colega que era um dos meus amigos mais íntimos e que havia estudado o caso comigo. Ele me disse que havia encontrado a paciente — Irma — e que ela estava bem, mas não completamente bem. Lembro-me de que fiquei irritado com isso e considerei que meu colega estava errado. Naquela noite — ou talvez no dia seguinte — tive o seguinte sonho, que anotei logo ao acordar.</p>`,
      },
    ],
  },

  // ─── LITERATURA BRASILEIRA ──────────────────────────────────────────────────

  {
    id: 'pd-dom-casmurro',
    slug: 'dom-casmurro-machado-de-assis',
    title: 'Dom Casmurro',
    displayTitle: 'Dom Casmurro — Machado de Assis',
    subtitle: 'O maior romance da literatura brasileira',
    category: 'Literatura Brasileira',
    subcategory: 'Romance',
    collection: 'Obras Completas de Machado de Assis',
    brand: 'Studio Logos',
    authorReference: 'Machado de Assis (1839–1908)',
    workReference: '1899',
    contentType: 'public_domain',
    contentTypeLabel: 'public_domain',
    copyrightStatus: 'public_domain_verified',
    accessMode: 'online_only',
    downloadAllowed: false,
    fullTextAllowed: true,
    originalLanguage: 'Português',
    authorDeathYear: 1908,
    level: 'Intermediário',
    readingTime: '6h',
    featured: true,
    isNew: false,
    coverTheme: 'forest',
    description: 'Dom Casmurro (1899) é o romance mais famoso de Machado de Assis e um dos maiores da literatura brasileira. Narrado por Bentinho (Dom Casmurro), conta a história de seu amor por Capitu e a dúvida que perseguiu sua vida: teria ela o traído?',
    learn: [
      'Narrador não-confiável na literatura',
      'Realismo brasileiro do século XIX',
      'Psicologia dos personagens machadianos',
      'A questão da traição e do ciúme',
      'Técnica narrativa de Machado de Assis',
    ],
    recommendedFor: ['Amantes da Literatura', 'Estudantes de Letras', 'Professores', 'Leitores em Geral'],
    editorialNotice: 'Texto em domínio público. Machado de Assis faleceu em 1908.',
    tags: ['machado de assis', 'literatura brasileira', 'romance', 'realismo', 'capitu', 'ciúme'],
    chapters: [
      {
        id: 'dc-1',
        title: 'Capítulo I — Do Título',
        estimatedMinutes: 5,
        content: `<h2>Capítulo I — Do Título</h2>
<p class="dropcap">Uma noite destas, vindo da cidade para o Engenho Novo, encontrei no trem da Central um rapaz aqui do bairro, que eu conheço de vista e de chapéu. Cumprimentou-me, sentou-se ao pé de mim, falou da lua e dos ministros, e acabou recitando-me versos. A viagem era curta, e os versos pode ser que não fossem inteiramente maus. Sucedeu, porém, que, como eu estava cansado, fechei os olhos três ou quatro vezes; tanto bastou para que ele interrompesse a leitura e metesse os versos no bolso.</p>
<p>— Continue, disse eu acordando.</p>
<p>— Já acabei, murmurou ele.</p>
<p>— São muito bonitos.</p>
<p>Vi-lhe fazer um gesto para tirar os versos outra vez do bolso, mas não passou do gesto; estava amuado. No dia seguinte entrou a dizer de mim nomes feios, e acabou alcunhando-me Dom Casmurro. Os vizinhos, que não gostam dos meus hábitos reclusos e calados, deram curso à alcunha, que afinal pegou. Nem por isso me zanguei. Contei a anedota aos amigos da cidade, e eles, por graça, chamam-me assim, alguns em bilhetes: "Dom Casmurro, domingo vou jantar com você." — "Vou para Petrópolis, Dom Casmurro; a minha casinha de Renânia está ótima." — "Como vai, Dom Casmurro?"</p>
<p>Gostei do título, e escrevi-o neste frontispício.</p>`,
      },
      {
        id: 'dc-2',
        title: 'Capítulo II — Do Livro',
        estimatedMinutes: 5,
        content: `<h2>Capítulo II — Do Livro</h2>
<p class="dropcap">Agora que expliquei o título, passo a escrever o livro. Antes disso, porém, digamos os motivos que me põem a pena na mão.</p>
<p>Vivo só, com um criado. A casa em que moro é própria; fi-la construir de propósito, levado de um desejo tão particular que me vexa imprimi-lo, mas vá lá. Um dia, há bastantes anos, lembrou-me reproduzir no Engenho Novo a casa em que me criei na antiga Rua de Mata-Cavalos, dando-lhe o mesmo aspecto e economia daquela outra, que desapareceu. Construtor e pintor entenderam bem as indicações que lhes fiz: é o mesmo prédio assobradado, três janelas de frente, varanda ao fundo, as mesmas alcovas e salas. Na principal destas, a pintura do teto e das paredes é mais ou menos igual, umas grinaldas de flores miúdas e grandes pássaros que as tomam nos bicos, de espaço a espaço. Nos quatro cantos do teto as figuras das quatro estações, e ao centro das paredes os medalhões de César, Augusto, Nero e Massinissa, com os nomes por baixo... Não alcanço a razão de tais personagens. Quando fomos para a casa de Mata-Cavalos, já ela estava assim decorada; vinha do decênio anterior. Naturalmente era gosto do tempo meter sabor clássico e figuras antigas em pinturas americanas.</p>
<p>O meu fim evidente era atar as duas pontas da vida, e restaurar na velhice a adolescência. Pois, senhor, não consegui recompor o que foi nem o que fui. Em tudo, se o rosto é igual, a fisionomia é diferente. Se só me faltassem os outros, vá; um homem consola-se mais ou menos das pessoas que perde; mas falto eu mesmo, e esta lacuna é tudo.</p>`,
      },
      {
        id: 'dc-3',
        title: 'Capítulo III — A Denúncia',
        estimatedMinutes: 8,
        content: `<h2>Capítulo III — A Denúncia</h2>
<p class="dropcap">Não tardou muito que eu soubesse o que era. Tinha quinze anos, e estava a estudar latim com o padre Cabral, que me havia tomado em afeto, e me queria para a Igreja; minha mãe, que tinha prometido a Deus que eu havia de ser padre, concordava com o padre Cabral. Não era essa a minha vocação, como se verá.</p>
<p>Ora, uma tarde, a nossa agregada José Dias, que morava conosco, disse a minha mãe que era preciso separar-me de Capitu, porque a menina do Pádua estava ficando moça, e que eu andava muito com ela.</p>
<p>— Que é isso, José Dias? perguntou minha mãe.</p>
<p>— Nada, dona Glória; mas é sempre bom evitar. Aquela criança tem uns olhos que... Não estou dizendo nada; mas é bom evitar.</p>
<p>Minha mãe não disse nada; mas eu, que estava na sala contígua, ouvi tudo, e fiquei a tremer. Era a primeira vez que o nome de Capitu me entrava assim pelo coração. Não é que eu não gostasse dela; gostava muito, mas era um gostar de criança, sem nada de especial. Agora, com aquela denúncia, senti que o gostar era outra coisa, e fiquei a tremer.</p>`,
      },
    ],
  },

  {
    id: 'pd-memorias-postumas',
    slug: 'memorias-postumas-bras-cubas',
    title: 'Memórias Póstumas de Brás Cubas',
    displayTitle: 'Memórias Póstumas de Brás Cubas — Machado de Assis',
    subtitle: 'O romance que inaugurou o Realismo no Brasil',
    category: 'Literatura Brasileira',
    subcategory: 'Romance',
    collection: 'Obras Completas de Machado de Assis',
    brand: 'Studio Logos',
    authorReference: 'Machado de Assis (1839–1908)',
    workReference: '1881',
    contentType: 'public_domain',
    contentTypeLabel: 'public_domain',
    copyrightStatus: 'public_domain_verified',
    accessMode: 'online_only',
    downloadAllowed: false,
    fullTextAllowed: true,
    originalLanguage: 'Português',
    authorDeathYear: 1908,
    level: 'Intermediário',
    readingTime: '5h 30min',
    featured: true,
    coverTheme: 'forest',
    description: 'Memórias Póstumas de Brás Cubas (1881) é o romance que inaugurou o Realismo no Brasil. Narrado por um defunto-autor, é uma obra revolucionária pela ironia, pelo humor negro e pela crítica social implacável.',
    learn: [
      'Realismo brasileiro',
      'Narrador defunto-autor',
      'Ironia e humor negro machadiano',
      'Crítica social do século XIX',
      'Técnica do capítulo curto',
    ],
    recommendedFor: ['Amantes da Literatura', 'Estudantes de Letras', 'Professores', 'Leitores em Geral'],
    editorialNotice: 'Texto em domínio público. Machado de Assis faleceu em 1908.',
    tags: ['machado de assis', 'literatura brasileira', 'realismo', 'defunto-autor', 'ironia'],
    chapters: [
      {
        id: 'mpbc-1',
        title: 'Ao Leitor',
        estimatedMinutes: 5,
        content: `<h2>Ao Leitor</h2>
<p class="dropcap">Que Stendhal confessasse haver escrito um de seus livros para cem leitores, coisa é que admira e consterna. O que não admira, nem provavelmente consternará, é se este outro livro não tiver os cem leitores de Stendhal, nem cinquenta, nem vinte, e quando muito, dez. Dez? Talvez cinco. Trata-se, na verdade, de uma obra difusa, na qual eu, Brás Cubas, se adotei a forma livre de um Sterne ou de um Xavier de Maistre, não sei se lhe meti algumas rabugens de pessimismo. Pode ser. Obra de finado. Escrevi-a com a pena da galhofa e a tinta da melancolia, e não é difícil antever o que poderá sair desse conúbio. Acresce que a gente grave achará no livro umas aparências de puro romance, ao passo que a gente frívola não achará nele o seu romance usual; ei-lo aí fica privado da estima dos graves e do amor dos frívolos, que são as duas colunas máximas da opinião.</p>
<p>Mas eu ainda espero angariar as simpatias da opinião, e o primeiro remédio é fugir a um prólogo longo e minucioso. O melhor prólogo é o que contém menos coisas, ou o que as diz de um jeito obscuro e truncado. Conseguintemente, evito contar o processo extraordinário que empreguei na composição destas Memórias, trabalhadas cá no outro mundo. Seria curioso, mas nimiamente extenso, e, além disso, desnecessário ao entendimento da obra. A obra em si mesma é tudo: se te agradar, fino leitor, pago-me da tarefa; se te não agradar, pago-te com um piparote, e adeus.</p>
<p style="text-align: right"><em>Brás Cubas</em></p>`,
      },
      {
        id: 'mpbc-2',
        title: 'Capítulo I — Óbito do Autor',
        estimatedMinutes: 8,
        content: `<h2>Capítulo I — Óbito do Autor</h2>
<p class="dropcap">Algum tempo hesitei se devia abrir estas memórias pelo princípio ou pelo fim, isto é, se poria em primeiro lugar o meu nascimento ou a minha morte. Suposto o uso vulgar seja começar pelo nascimento, duas considerações me levaram a adotar diferente método: a primeira é que eu não sou propriamente um autor defunto, mas um defunto autor, para quem a campa foi outro berço; a segunda é que o escrito ficaria assim mais galante e mais novo. Moisés, que também contou a sua morte, não a pôs no introito, mas no cabo: diferença radical entre este livro e o Pentateuco.</p>
<p>Dito isto, expirei às duas horas da tarde de uma sexta-feira do mês de agosto de 1869, na minha bela chácara de Catumbi. Tinha uns sessenta e quatro anos, rijos e prósperos, era solteiro, possuía cerca de trezentos contos e fui acompanhado ao cemitério por onze amigos. Onze amigos! Verdade é que não houve cartas nem anúncios. Acresce que chovia — peneirava uma chuvinha miúda, triste e constante, tão constante e tão triste, que levou um daqueles fiéis a intercalar esta engenhosa ideia no discurso que proferiu à beira de minha cova: — "Vós, que o conhecestes, meus senhores, vós podeis dizer comigo que a natureza parece estar chorando a perda irreparável de um dos mais belos caracteres que têm honrado a humanidade. Este ar sombrio, estas gotas do céu, aquelas nuvens escuras que cobrem o azul como um crepe funéreo, tudo isso é a dor crua e má que lhe rói à natureza as mais íntimas entranhas; tudo isso é um sublime louvor ao nosso ilustre finado."</p>
<p>Bom e fiel amigo! Não, não me arrependo das vinte apólices que lhe deixei. E foi assim que cheguei à cláusula dos meus dias; foi assim que me encaminhei para o undiscovered country de Hamlet
, sem que o undiscovered country me assustasse; fui-me de mansinho, como quem adormece.</p>`,
      },
    ],
  },

  {
    id: 'pd-quincas-borba',
    slug: 'quincas-borba-machado-de-assis',
    title: 'Quincas Borba',
    displayTitle: 'Quincas Borba — Machado de Assis',
    subtitle: 'A filosofia do Humanitismo e a loucura humana',
    category: 'Literatura Brasileira',
    subcategory: 'Romance',
    collection: 'Obras Completas de Machado de Assis',
    brand: 'Studio Logos',
    authorReference: 'Machado de Assis (1839–1908)',
    workReference: '1891',
    contentType: 'public_domain',
    contentTypeLabel: 'public_domain',
    copyrightStatus: 'public_domain_verified',
    accessMode: 'online_only',
    downloadAllowed: false,
    fullTextAllowed: true,
    originalLanguage: 'Português',
    authorDeathYear: 1908,
    level: 'Intermediário',
    readingTime: '5h',
    coverTheme: 'forest',
    description: 'Quincas Borba (1891) é o segundo romance da fase realista de Machado de Assis. Apresenta a filosofia do "Humanitismo" — uma sátira ao positivismo — e acompanha a trajetória de Rubião, que herda uma fortuna e enlouquece.',
    learn: [
      'Sátira ao positivismo (Humanitismo)',
      'Crítica à ascensão social',
      'Psicologia da loucura em Machado',
      'Realismo machadiano',
    ],
    recommendedFor: ['Amantes da Literatura', 'Estudantes de Letras', 'Filósofos'],
    editorialNotice: 'Texto em domínio público. Machado de Assis faleceu em 1908.',
    tags: ['machado de assis', 'literatura brasileira', 'realismo', 'loucura', 'humanitismo'],
    chapters: [
      {
        id: 'qb-1',
        title: 'Capítulo I',
        estimatedMinutes: 10,
        content: `<h2>Capítulo I</h2>
<p class="dropcap">Rubião fitava a enseada — eram oito horas da manhã. Quem o visse, com os polegares metidos no cordão do chambre, à janela de uma grande casa de Botafogo, cuidaria que ele admirava aquele pedaço de água quieta; mas, em verdade, vos digo que pensava em outra coisa. Cotejava o passado com o presente. Que era há um ano? Professor. Que é agora? Capitalista. Olha para si, para as chinelas (umas chinelas de Túnis, que lhe deu recentemente um negociante), para a casa, para o jardim, para a enseada, para os morros e para o céu; e tudo, desde as chinelas até o céu, tudo entra na composição do novo estado.</p>
<p>— Ao vencedor, as batatas! concluiu ele, rindo.</p>
<p>Era uma reminiscência de Quincas Borba. Esse Quincas Borba, se ainda vivesse, acharia no discípulo o melhor documento da sua filosofia. Rubião possuía alguns milhares de contos; tinha-os herdado do filósofo, seu amigo e protetor, que morreu em Barbacena, havia um ano. Morreu um pouco louco; não, não, morreu louco de todo, — o que faz crer que a felicidade, como a razão, é às vezes uma questão de tempo.</p>`,
      },
    ],
  },

  {
    id: 'pd-iaiaia-garcia',
    slug: 'iaiaia-garcia-machado-de-assis',
    title: 'Iaiá Garcia',
    displayTitle: 'Iaiá Garcia — Machado de Assis',
    subtitle: 'O amor, a sociedade e os conflitos do coração',
    category: 'Literatura Brasileira',
    subcategory: 'Romance',
    collection: 'Obras Completas de Machado de Assis',
    brand: 'Studio Logos',
    authorReference: 'Machado de Assis (1839–1908)',
    workReference: '1878',
    contentType: 'public_domain',
    contentTypeLabel: 'public_domain',
    copyrightStatus: 'public_domain_verified',
    accessMode: 'online_only',
    downloadAllowed: false,
    fullTextAllowed: true,
    originalLanguage: 'Português',
    authorDeathYear: 1908,
    level: 'Iniciante',
    readingTime: '4h',
    coverTheme: 'forest',
    description: 'Iaiá Garcia (1878) é um dos romances da primeira fase de Machado de Assis. Narra os conflitos amorosos e sociais de personagens marcados pela ambição, pelo sacrifício e pelo amor impossível no Rio de Janeiro do século XIX.',
    learn: [
      'Romance da fase romântica de Machado',
      'Conflitos sociais do século XIX',
      'Psicologia feminina em Machado',
      'Rio de Janeiro imperial',
    ],
    recommendedFor: ['Amantes da Literatura', 'Estudantes de Letras'],
    editorialNotice: 'Texto em domínio público. Machado de Assis faleceu em 1908.',
    tags: ['machado de assis', 'literatura brasileira', 'romance', 'amor', 'sociedade'],
    chapters: [
      {
        id: 'ig-1',
        title: 'Capítulo I',
        estimatedMinutes: 12,
        content: `<h2>Capítulo I</h2>
<p class="dropcap">Luís Garcia era viúvo, com uma filha de sete anos, e morava nos arredores da cidade, numa casa pequena, mas sossegada e fresca. Tinha uns quarenta anos, era funcionário público, homem de poucas palavras e de vida regular. A filha chamava-se Lina, mas toda a gente lhe chamava Iaiá, nome que ficou.</p>
<p>Não era homem de ambições. Contentava-se com o que tinha, que era pouco, mas chegava para viver honestamente. A morte da mulher deixara-lhe uma tristeza surda, que o tempo foi apagando, sem nunca extinguir de todo. Iaiá era o seu consolo e a sua vida.</p>
<p>Naquele tempo, os arredores da cidade tinham um aspecto diferente do atual. As casas eram mais esparsas, os jardins mais largos, a vida mais tranquila. Luís Garcia gostava daquele sossego; fugia do bulício da cidade, onde ia apenas por obrigação do emprego.</p>`,
      },
    ],
  },

  {
    id: 'pd-o-cortico',
    slug: 'o-cortico-aluzio-azevedo',
    title: 'O Cortiço',
    displayTitle: 'O Cortiço — Aluísio Azevedo',
    subtitle: 'O grande romance naturalista brasileiro',
    category: 'Literatura Brasileira',
    subcategory: 'Romance',
    collection: 'Clássicos do Naturalismo Brasileiro',
    brand: 'Studio Logos',
    authorReference: 'Aluísio Azevedo (1857–1913)',
    workReference: '1890',
    contentType: 'public_domain',
    contentTypeLabel: 'public_domain',
    copyrightStatus: 'public_domain_verified',
    accessMode: 'online_only',
    downloadAllowed: false,
    fullTextAllowed: true,
    originalLanguage: 'Português',
    authorDeathYear: 1913,
    level: 'Intermediário',
    readingTime: '6h',
    featured: true,
    coverTheme: 'forest',
    description: 'O Cortiço (1890) é o principal romance naturalista brasileiro. Aluísio Azevedo retrata com crueza a vida nos cortiços cariocas do século XIX, explorando os determinismos sociais, raciais e biológicos que moldavam os personagens.',
    learn: [
      'Naturalismo brasileiro',
      'Determinismo social e biológico',
      'Vida nos cortiços cariocas',
      'Crítica social do século XIX',
    ],
    recommendedFor: ['Amantes da Literatura', 'Estudantes de Letras', 'Sociólogos'],
    editorialNotice: 'Texto em domínio público. Aluísio Azevedo faleceu em 1913.',
    tags: ['aluísio azevedo', 'naturalismo', 'literatura brasileira', 'cortiço', 'realismo'],
    chapters: [
      {
        id: 'cortico-1',
        title: 'Capítulo I',
        estimatedMinutes: 20,
        content: `<h2>Capítulo I</h2>
<p class="dropcap">João Romão veio para o Brasil aos onze anos de idade, logo após a morte do pai, trazido por um patrício que negociava em gêneros alimentícios. Trabalhou como caixeiro durante seis anos, dormindo na loja e economizando tudo quanto podia. Ao fim desse tempo, tinha alguma coisa de seu e, com ela, abriu uma venda no bairro de Botafogo.</p>
<p>Instalou-se com a maior economia; dormia sobre o balcão da própria venda, não tinha cozinheira, não acendia luz à noite para não gastar azeite, e, à força de privar-se de tudo, conseguiu, ao cabo de dois anos, comprar o prédio em que estava instalado.</p>
<p>Mas João Romão não se contentava; queria mais, sempre mais. A avareza era nele uma febre, uma loucura, uma necessidade física. Ele mesmo não sabia explicar o que sentia quando via dinheiro; era uma coisa assim como uma vontade de comer, de beber, de possuir, de acumular.</p>
<p>Ao lado da venda havia um terreno devoluto, onde João Romão, com a permissão do dono, havia plantado algumas couves e criado uns porcos. Esse terreno tornou-se o ponto de partida de um grande empreendimento: o cortiço.</p>`,
      },
    ],
  },

];
