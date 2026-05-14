import { Category } from "../studioTypes";

// ─────────────────────────────────────────────────────────────────
// Banco de imagens de capa — somente arte clássica, arquitetura,
// manuscritos, retratos históricos e paisagens atemporais.
// SEM fotografias de pessoas modernas.
// ─────────────────────────────────────────────────────────────────

const WK = "https://commons.wikimedia.org/wiki/Special:FilePath/";

const imageBank: Record<string, string[]> = {
  philosophy: [
    // Busto de Platão — escultura clássica (Museus Capitolinos)
    `${WK}Plato%20Silanion%20Musei%20Capitolini%20MC1377.jpg`,
    // Busto de Aristóteles — escultura clássica (Inv8575)
    `${WK}Aristotle%20Altemps%20Inv8575.jpg`,
    // Raphael — Escola de Atenas (afresco, 1511)
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg/1280px-%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg",
    // Rembrandt — O Filósofo em Meditação (1632)
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Rembrandt_-_The_Philosopher_in_Meditation.jpg/800px-Rembrandt_-_The_Philosopher_in_Meditation.jpg",
    // Biblioteca antiga — interior atemporal
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=900",
  ],

  theology: [
    // Santo Agostinho — Philippe de Champaigne (séc. XVII)
    `${WK}Saint%20Augustine%20by%20Philippe%20de%20Champaigne.jpg`,
    // São Tomás de Aquino — Carlo Crivelli (séc. XV)
    `${WK}Thomas%20Aquinas%20by%20Carlo%20Crivelli.jpg`,
    // Martinho Lutero — Lucas Cranach (séc. XVI)
    `${WK}Martin%20Luther%20by%20Cranach-restoration.jpg`,
    // Bíblia aberta com vela — objeto, sem pessoas
    "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=900",
    // Catedral gótica — interior iluminado
    "https://images.unsplash.com/photo-1548625149-720754874f8a?auto=format&fit=crop&q=80&w=900",
  ],

  spirituality: [
    // Interior de catedral gótica
    "https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&q=80&w=900",
    // Manuscrito iluminado — Livro de Kells (Wikimedia)
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Folio_292r_-_Incipit_of_the_Gospel_of_John.jpg/800px-Folio_292r_-_Incipit_of_the_Gospel_of_John.jpg",
    // Vela acesa — luz e devoção
    "https://images.unsplash.com/photo-1510051640316-cee39563ddab?auto=format&fit=crop&q=80&w=900",
    // Claustro / mosteiro — arquitetura sacra
    "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=80&w=900",
  ],

  psychoanalysis: [
    // Sigmund Freud — retrato histórico (Max Halberstadt, 1921)
    `${WK}Sigmund%20Freud%2C%20by%20Max%20Halberstadt%20%28cropped%29.jpg`,
    // Carl Jung — retrato histórico
    `${WK}Carl%20Jung%20portrait.jpg`,
    // Rembrandt — Dr. Nicolaes Tulp (aula de anatomia, 1632)
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/The_Anatomy_Lesson_of_Dr_Nicolaes_Tulp.jpg/1280px-The_Anatomy_Lesson_of_Dr_Nicolaes_Tulp.jpg",
    // Livros antigos empilhados — objeto, sem pessoas
    "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=900",
  ],

  brazil: [
    // Machado de Assis — retrato histórico (1904)
    `${WK}Machado%20de%20Assis%201904.jpg`,
    // José de Alencar — retrato histórico
    `${WK}Jose%20de%20Alencar.jpg`,
    // Rio de Janeiro — paisagem urbana atemporal
    "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=900",
    // Floresta tropical brasileira — natureza, sem pessoas
    "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?auto=format&fit=crop&q=80&w=900",
  ],

  portugal: [
    // Luís de Camões — retrato histórico
    `${WK}Luis%20de%20Cam%C3%B5es%2C%20por%20Fern%C3%A3o%20Gomes.jpg`,
    // Eça de Queirós — retrato histórico
    `${WK}E%C3%A7a%20de%20Queir%C3%B3s.jpg`,
    // Mosteiro dos Jerónimos — azulejo / arquitetura manuelina
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=900",
    // Azulejos portugueses — arte decorativa atemporal
    "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=900",
  ],

  universal: [
    // Shakespeare — óleo sobre tela (John Taylor, séc. XVII)
    `${WK}William%20Shakespeare%20by%20John%20Taylor%2C%20edited.jpg`,
    // Franz Kafka — fotografia histórica (1923)
    `${WK}Franz%20Kafka%2C%201923.jpg`,
    // Dante — Domenico di Michelino, afresco no Duomo (séc. XV)
    `${WK}Dante%20Alighieri%20-%20Domenico%20di%20Michelino%20-%20Duomo%20Florence.jpg`,
    // Biblioteca secular — estantes sem pessoas
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=900",
    // Livros antigos — objetos atemporais
    "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=900",
  ],

  history: [
    // Coliseu Romano — arquitetura antiga
    "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=900",
    // Mapa antigo / cartografia histórica
    "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=900",
    // Castelo medieval — pedra e tempo
    "https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80&w=900",
  ],

  humanities: [
    // Pergaminho / manuscrito antigo — escrita sem pessoas
    "https://images.unsplash.com/photo-1519567770579-c2fc5836898e?auto=format&fit=crop&q=80&w=900",
    // Biblioteca clássica — estantes de madeira
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=900",
    // Livros antigos empilhados — objetos
    "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=900",
  ],
};

// ─── Mapeamento por autor — retratos históricos prioritários ─────
const authorImages: Array<[RegExp, string]> = [
  [/freud/i,                    `${WK}Sigmund%20Freud%2C%20by%20Max%20Halberstadt%20%28cropped%29.jpg`],
  [/jung/i,                     `${WK}Carl%20Jung%20portrait.jpg`],
  [/ferenczi|abraham|rank|tridon|flugel/i, imageBank.psychoanalysis[3]],
  [/kafka/i,                    `${WK}Franz%20Kafka%2C%201923.jpg`],
  [/machado/i,                  `${WK}Machado%20de%20Assis%201904.jpg`],
  [/alencar/i,                  `${WK}Jose%20de%20Alencar.jpg`],
  [/lima barreto|aluisio|euclides|raul pompeia|gon(ç|c)alves dias/i, imageBank.brazil[2]],
  [/cam(ões|oes)/i,             `${WK}Luis%20de%20Cam%C3%B5es%2C%20por%20Fern%C3%A3o%20Gomes.jpg`],
  [/eça|eca/i,                  `${WK}E%C3%A7a%20de%20Queir%C3%B3s.jpg`],
  [/garrett|camilo|vieira|herculano/i, imageBank.portugal[2]],
  [/plat(ão|ao)/i,              `${WK}Plato%20Silanion%20Musei%20Capitolini%20MC1377.jpg`],
  [/arist(ó|o)teles/i,         `${WK}Aristotle%20Altemps%20Inv8575.jpg`],
  [/s(ê|e)neca|epicteto|marco aur(é|e)lio/i,
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Rembrandt_-_The_Philosopher_in_Meditation.jpg/800px-Rembrandt_-_The_Philosopher_in_Meditation.jpg"],
  [/kant|nietzsche|schopenhauer|hegel|descartes|spinoza|hume|locke|rousseau|leibniz|voltaire/i,
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg/1280px-%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg"],
  [/agostinho/i,                `${WK}Saint%20Augustine%20by%20Philippe%20de%20Champaigne.jpg`],
  [/aquinas|tom(á|a)s/i,       `${WK}Thomas%20Aquinas%20by%20Carlo%20Crivelli.jpg`],
  [/lutero|luther/i,            `${WK}Martin%20Luther%20by%20Cranach-restoration.jpg`],
  [/calvino|spurgeon|wesley|bunyan|edwards|murray|tozer|ryle|kempis|brother lawrence/i,
    imageBank.spirituality[0]],
  [/shakespeare/i,              `${WK}William%20Shakespeare%20by%20John%20Taylor%2C%20edited.jpg`],
  [/dante/i,                    `${WK}Dante%20Alighieri%20-%20Domenico%20di%20Michelino%20-%20Duomo%20Florence.jpg`],
  [/homero|virg(í|i)lio|cervantes|plutarco|her(ó|o)doto|ovídio|ovidio/i, imageBank.history[0]],
];

// ─── Mapeamento por título — tema e gênero ────────────────────────
const titleImages: Array<[RegExp, string]> = [
  [/sonho|dream|traum|psicopatologia|psychoanalysis|psican|inconsciente/i,
    imageBank.psychoanalysis[3]],
  [/confiss(ões|oes)|serm(ão|ao)|oração|prayer|fé|alma|imita(ção|cao)|devocional|devoção/i,
    imageBank.spirituality[2]],
  [/bíblia|biblia|salmos|ev|evangel|genesis|apocalipse|testamento/i,
    imageBank.theology[3]],
  [/rep(ú|u)blica|ethics|ética|metaphysics|metaf(í|i)sica|critique|raz(ão|ao)|dialét/i,
    imageBank.philosophy[2]],
  [/hist(ó|o)ria|war|guerra|revolu(ç|c)(ão|ao)|imp(é|e)rio|rome|roma|ancient|antigo/i,
    imageBank.history[0]],
  [/poemas|poesia|poems|versos|sonetos|lyrics|l(í|i)rica/i,
    imageBank.humanities[0]],
  [/dom casmurro|mem(ó|o)rias|bras cubas|quincas|alienista/i,
    `${WK}Machado%20de%20Assis%201904.jpg`],
  [/maias|crime do padre amaro|primo basilio|cidade e as serras/i,
    `${WK}E%C3%A7a%20de%20Queir%C3%B3s.jpg`],
  [/peregrino|pilgrim|puritan|puritano/i,
    imageBank.spirituality[0]],
  [/humildade|humility|santidade|holiness|abide|arrependimento/i,
    imageBank.spirituality[2]],
];

function hash(value: string): number {
  return value
    .split("")
    .reduce((total, char) => ((total << 5) - total + char.charCodeAt(0)) | 0, 0);
}

function bankForCategory(category: Category): string[] {
  if (category === Category.PHILOSOPHY)            return imageBank.philosophy;
  if (category === Category.THEOLOGY)              return imageBank.theology;
  if (category === Category.CHRISTIAN_SPIRITUALITY) return imageBank.spirituality;
  if (category === Category.PSYCHOANALYSIS)        return imageBank.psychoanalysis;
  if (category === Category.BRAZILIAN_LITERATURE)  return imageBank.brazil;
  if (category === Category.PORTUGUESE_LITERATURE) return imageBank.portugal;
  if (category === Category.HISTORY)               return imageBank.history;
  if (category === Category.HUMANITIES)            return imageBank.humanities;
  return imageBank.universal;
}

function bankForCategoryText(category: string): string[] {
  if (/filosofia/i.test(category))    return imageBank.philosophy;
  if (/teologia/i.test(category))     return imageBank.theology;
  if (/espiritualidade/i.test(category)) return imageBank.spirituality;
  if (/psican/i.test(category))       return imageBank.psychoanalysis;
  if (/brasileira/i.test(category))   return imageBank.brazil;
  if (/portuguesa/i.test(category))   return imageBank.portugal;
  if (/hist/i.test(category))         return imageBank.history;
  if (/human/i.test(category))        return imageBank.humanities;
  return imageBank.universal;
}

export function getEditorialCoverImage(
  category: Category,
  title: string,
  author: string
): string {
  const signal = `${title} ${author}`;
  const byAuthor = authorImages.find(([pattern]) => pattern.test(signal));
  if (byAuthor) return byAuthor[1];

  const byTitle = titleImages.find(([pattern]) => pattern.test(signal));
  if (byTitle) return byTitle[1];

  const bank = bankForCategory(category);
  return bank[Math.abs(hash(signal)) % bank.length];
}

export function getEditorialCoverImageForText(
  category: string,
  title: string,
  author: string
): string {
  const signal = `${title} ${author}`;
  const byAuthor = authorImages.find(([pattern]) => pattern.test(signal));
  if (byAuthor) return byAuthor[1];

  const byTitle = titleImages.find(([pattern]) => pattern.test(signal));
  if (byTitle) return byTitle[1];

  const bank = bankForCategoryText(category);
  return bank[Math.abs(hash(signal)) % bank.length];
}
