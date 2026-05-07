import { Category } from "../studioTypes";

const imageBank: Record<string, string[]> = {
  philosophy: [
    "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=900",
  ],
  theology: [
    "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&q=80&w=900",
  ],
  spirituality: [
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=900",
  ],
  psychoanalysis: [
    "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&q=80&w=900",
  ],
  brazil: [
    "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=900",
  ],
  portugal: [
    "https://images.unsplash.com/photo-1508015081974-9f6347163ebe?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1513735492246-483525079686?auto=format&fit=crop&q=80&w=900",
  ],
  universal: [
    "https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&q=80&w=900",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=900",
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
  [/freud|jung|ferenczi|abraham|rank|tridon|flugel/i, imageBank.psychoanalysis[0]],
  [/kafka/i, "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=900"],
  [/machado|alencar|lima barreto|aluisio|euclides|raul pompeia/i, imageBank.brazil[1]],
  [/cam(ões|oes)|eça|eca|garrett|camilo|vieira|herculano/i, imageBank.portugal[0]],
  [/plat(ão|ao)|arist(ó|o)teles|s(ê|e)neca|epicteto|marco aur(é|e)lio/i, imageBank.philosophy[0]],
  [/agostinho|aquinas|tom(á|a)s|calvino|lutero|spurgeon|wesley|bunyan|edwards/i, imageBank.theology[1]],
  [/homero|virg(í|i)lio|dante|cervantes|shakespeare|plutarco|her(ó|o)doto/i, imageBank.universal[0]],
];

const titleImages: Array<[RegExp, string]> = [
  [/sonho|dream|traum|psicopatologia|psychoanalysis|psican/i, imageBank.psychoanalysis[1]],
  [/confiss(ões|oes)|serm(ão|ao)|oração|prayer|fé|fe|alma/i, imageBank.spirituality[1]],
  [/rep(ú|u)blica|ethics|ética|metaphysics|metaf(í|i)sica|critique|raz(ão|ao)/i, imageBank.philosophy[1]],
  [/hist(ó|o)ria|war|guerra|revolu(ç|c)(ão|ao)|imp(é|e)rio|rome|roma/i, imageBank.history[0]],
  [/poemas|poesia|poems|versos|sonetos|lyrics/i, imageBank.humanities[0]],
  [/amor|love|romance|madame|dom casmurro|mem(ó|o)rias|maias/i, imageBank.universal[2]],
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
