import { Category } from "../studioTypes";

const imageBank: Record<string, string[]> = {
  philosophy: [
    "https://commons.wikimedia.org/wiki/Special:FilePath/Plato%20Silanion%20Musei%20Capitolini%20MC1377.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Aristotle%20Altemps%20Inv8575.jpg",
    "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=900",
  ],
  theology: [
    "https://commons.wikimedia.org/wiki/Special:FilePath/Saint%20Augustine%20by%20Philippe%20de%20Champaigne.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Thomas%20Aquinas%20by%20Carlo%20Crivelli.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Martin%20Luther%20by%20Cranach-restoration.jpg",
    "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=900",
  ],
  spirituality: [
    "https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=900",
  ],
  psychoanalysis: [
    "https://commons.wikimedia.org/wiki/Special:FilePath/Sigmund%20Freud%2C%20by%20Max%20Halberstadt%20%28cropped%29.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Carl%20Jung%20portrait.jpg",
    "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?auto=format&fit=crop&q=80&w=900",
  ],
  brazil: [
    "https://commons.wikimedia.org/wiki/Special:FilePath/Machado%20de%20Assis%201904.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Jose%20de%20Alencar.jpg",
    "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&q=80&w=900",
  ],
  portugal: [
    "https://commons.wikimedia.org/wiki/Special:FilePath/Luis%20de%20Cam%C3%B5es%2C%20por%20Fern%C3%A3o%20Gomes.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/E%C3%A7a%20de%20Queir%C3%B3s.jpg",
    "https://images.unsplash.com/photo-1508015081974-9f6347163ebe?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=900",
  ],
  universal: [
    "https://commons.wikimedia.org/wiki/Special:FilePath/William%20Shakespeare%20by%20John%20Taylor%2C%20edited.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Franz%20Kafka%2C%201923.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Dante%20Alighieri%20-%20Domenico%20di%20Michelino%20-%20Duomo%20Florence.jpg",
    "https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&q=80&w=900",
  ],
  history: [
    "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80&w=900",
  ],
  humanities: [
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&q=80&w=900",
  ],
};

const authorImages: Array<[RegExp, string]> = [
  [/freud/i, "https://commons.wikimedia.org/wiki/Special:FilePath/Sigmund%20Freud%2C%20by%20Max%20Halberstadt%20%28cropped%29.jpg"],
  [/jung/i, "https://commons.wikimedia.org/wiki/Special:FilePath/Carl%20Jung%20portrait.jpg"],
  [/ferenczi|abraham|rank|tridon|flugel/i, imageBank.psychoanalysis[2]],
  [/kafka/i, "https://commons.wikimedia.org/wiki/Special:FilePath/Franz%20Kafka%2C%201923.jpg"],
  [/machado/i, "https://commons.wikimedia.org/wiki/Special:FilePath/Machado%20de%20Assis%201904.jpg"],
  [/alencar/i, "https://commons.wikimedia.org/wiki/Special:FilePath/Jose%20de%20Alencar.jpg"],
  [/lima barreto|aluisio|euclides|raul pompeia|gon(ç|c)alves dias/i, imageBank.brazil[2]],
  [/cam(ões|oes)/i, "https://commons.wikimedia.org/wiki/Special:FilePath/Luis%20de%20Cam%C3%B5es%2C%20por%20Fern%C3%A3o%20Gomes.jpg"],
  [/eça|eca/i, "https://commons.wikimedia.org/wiki/Special:FilePath/E%C3%A7a%20de%20Queir%C3%B3s.jpg"],
  [/garrett|camilo|vieira|herculano/i, imageBank.portugal[2]],
  [/plat(ão|ao)/i, "https://commons.wikimedia.org/wiki/Special:FilePath/Plato%20Silanion%20Musei%20Capitolini%20MC1377.jpg"],
  [/arist(ó|o)teles/i, "https://commons.wikimedia.org/wiki/Special:FilePath/Aristotle%20Altemps%20Inv8575.jpg"],
  [/s(ê|e)neca|epicteto|marco aur(é|e)lio|kant|nietzsche|schopenhauer|descartes|spinoza|hume|locke|rousseau/i, imageBank.philosophy[2]],
  [/agostinho/i, "https://commons.wikimedia.org/wiki/Special:FilePath/Saint%20Augustine%20by%20Philippe%20de%20Champaigne.jpg"],
  [/aquinas|tom(á|a)s/i, "https://commons.wikimedia.org/wiki/Special:FilePath/Thomas%20Aquinas%20by%20Carlo%20Crivelli.jpg"],
  [/lutero|luther/i, "https://commons.wikimedia.org/wiki/Special:FilePath/Martin%20Luther%20by%20Cranach-restoration.jpg"],
  [/calvino|spurgeon|wesley|bunyan|edwards/i, imageBank.theology[3]],
  [/shakespeare/i, "https://commons.wikimedia.org/wiki/Special:FilePath/William%20Shakespeare%20by%20John%20Taylor%2C%20edited.jpg"],
  [/dante/i, "https://commons.wikimedia.org/wiki/Special:FilePath/Dante%20Alighieri%20-%20Domenico%20di%20Michelino%20-%20Duomo%20Florence.jpg"],
  [/homero|virg(í|i)lio|cervantes|plutarco|her(ó|o)doto/i, imageBank.universal[3]],
];

const titleImages: Array<[RegExp, string]> = [
  [/sonho|dream|traum|psicopatologia|psychoanalysis|psican/i, imageBank.psychoanalysis[3]],
  [/confiss(ões|oes)|serm(ão|ao)|oração|prayer|fé|fe|alma/i, imageBank.spirituality[0]],
  [/rep(ú|u)blica|ethics|ética|metaphysics|metaf(í|i)sica|critique|raz(ão|ao)/i, imageBank.philosophy[2]],
  [/hist(ó|o)ria|war|guerra|revolu(ç|c)(ão|ao)|imp(é|e)rio|rome|roma/i, imageBank.history[0]],
  [/poemas|poesia|poems|versos|sonetos|lyrics/i, imageBank.humanities[0]],
  [/dom casmurro|mem(ó|o)rias|bras cubas|quincas/i, "https://commons.wikimedia.org/wiki/Special:FilePath/Machado%20de%20Assis%201904.jpg"],
  [/maias|crime do padre amaro|primo basilio/i, "https://commons.wikimedia.org/wiki/Special:FilePath/E%C3%A7a%20de%20Queir%C3%B3s.jpg"],
  [/amor|love|romance|madame/i, imageBank.universal[4]],
];

function hash(value: string): number {
  return value.split("").reduce((total, char) => ((total << 5) - total + char.charCodeAt(0)) | 0, 0);
}

function bankForCategory(category: Category): string[] {
  if (category === Category.PHILOSOPHY) return imageBank.philosophy;
  if (category === Category.THEOLOGY) return imageBank.theology;
  if (category === Category.CHRISTIAN_SPIRITUALITY) return imageBank.spirituality;
  if (category === Category.PSYCHOANALYSIS) return imageBank.psychoanalysis;
  if (category === Category.BRAZILIAN_LITERATURE) return imageBank.brazil;
  if (category === Category.PORTUGUESE_LITERATURE) return imageBank.portugal;
  if (category === Category.HISTORY) return imageBank.history;
  if (category === Category.HUMANITIES) return imageBank.humanities;
  return imageBank.universal;
}

function bankForCategoryText(category: string): string[] {
  if (/filosofia/i.test(category)) return imageBank.philosophy;
  if (/teologia/i.test(category)) return imageBank.theology;
  if (/espiritualidade/i.test(category)) return imageBank.spirituality;
  if (/psican/i.test(category)) return imageBank.psychoanalysis;
  if (/brasileira/i.test(category)) return imageBank.brazil;
  if (/portuguesa/i.test(category)) return imageBank.portugal;
  if (/hist/i.test(category)) return imageBank.history;
  if (/human/i.test(category)) return imageBank.humanities;
  return imageBank.universal;
}

export function getEditorialCoverImage(category: Category, title: string, author: string): string {
  const signal = `${title} ${author}`;
  const byAuthor = authorImages.find(([pattern]) => pattern.test(signal));
  if (byAuthor) return byAuthor[1];

  const byTitle = titleImages.find(([pattern]) => pattern.test(signal));
  if (byTitle) return byTitle[1];

  const bank = bankForCategory(category);
  return bank[Math.abs(hash(signal)) % bank.length];
}

export function getEditorialCoverImageForText(category: string, title: string, author: string): string {
  const signal = `${title} ${author}`;
  const byAuthor = authorImages.find(([pattern]) => pattern.test(signal));
  if (byAuthor) return byAuthor[1];

  const byTitle = titleImages.find(([pattern]) => pattern.test(signal));
  if (byTitle) return byTitle[1];

  const bank = bankForCategoryText(category);
  return bank[Math.abs(hash(signal)) % bank.length];
}
