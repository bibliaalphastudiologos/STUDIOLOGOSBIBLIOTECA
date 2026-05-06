import { DEMO_EBOOKS } from './data/ebooks';
import { Category, type Ebook } from './studioTypes';

const categoryMap: Record<string, Category> = {
  Filosofia: Category.PHILOSOPHY,
  Teologia: Category.THEOLOGY,
  Psicanálise: Category.PSYCHOANALYSIS,
  Literatura: Category.LITERATURE,
  'Literatura Brasileira': Category.LITERATURE,
};

const coverColors: Record<Category, string> = {
  [Category.SPECIAL]: 'bg-amber-950',
  [Category.PHILOSOPHY]: 'bg-[#171512]',
  [Category.THEOLOGY]: 'bg-[#2b2116]',
  [Category.PSYCHOANALYSIS]: 'bg-[#18181b]',
  [Category.LITERATURE]: 'bg-[#281717]',
};

const coverAccents: Record<Category, string> = {
  [Category.SPECIAL]: '#f2c86b',
  [Category.PHILOSOPHY]: '#b9a46a',
  [Category.THEOLOGY]: '#c8a35b',
  [Category.PSYCHOANALYSIS]: '#a9a1b8',
  [Category.LITERATURE]: '#d3a073',
};

const coverMarks: Record<Category, string> = {
  [Category.SPECIAL]: 'SL',
  [Category.PHILOSOPHY]: 'Φ',
  [Category.THEOLOGY]: 'Λ',
  [Category.PSYCHOANALYSIS]: 'Ψ',
  [Category.LITERATURE]: '§',
};

function stripHtml(value: string): string {
  return value
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildContent(source: (typeof DEMO_EBOOKS)[number]): string {
  const firstChapter = source.chapters?.[0]?.content;
  const chapterText = firstChapter ? stripHtml(firstChapter) : '';
  const description = source.description || source.editorialNotice || '';
  const text = chapterText || description;
  return text.length > 1200 ? `${text.slice(0, 1200).trim()}...` : text;
}

function toStudioEbook(source: (typeof DEMO_EBOOKS)[number]): Ebook {
  const category = categoryMap[source.category] || Category.LITERATURE;

  return {
    id: source.id,
    title: cleanDisplayTitle(source.displayTitle || source.fullTitle || source.title),
    author: source.authorReference || source.brand || 'StudioLogos',
    category,
    language: 'Português',
    originalLanguage: source.originalLanguage || source.workReference || 'Português',
    content: buildContent(source),
    coverColor: coverColors[category],
    coverAccent: coverAccents[category],
    coverMark: coverMarks[category],
    coverEdition: source.collection || source.subcategory || 'StudioLogos',
  };
}

function removeDiacritics(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function cleanDisplayTitle(value: string): string {
  return value
    .replace(/\s+—\s+.+$/g, '')
    .replace(/\s+-\s+.+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanAuthor(value: string): string {
  return value
    .replace(/\([^)]*\)/g, '')
    .replace(/\b(santo|santa|são|saint|st\.)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function canonicalTitle(value: string): string {
  return removeDiacritics(cleanDisplayTitle(value))
    .toLowerCase()
    .replace(/\b(a|o|os|as|um|uma|the|la|le|les|el)\b/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function canonicalAuthor(value: string): string {
  const cleaned = removeDiacritics(cleanAuthor(value))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

  return cleaned
    .split(' ')
    .filter((part) => part.length > 2)
    .slice(0, 3)
    .join(' ');
}

function ebookScore(ebook: Ebook): number {
  return ebook.content.length + (ebook.isSpecial ? 10000 : 0);
}

function dedupe(ebooks: Ebook[]): Ebook[] {
  const map = new Map<string, Ebook>();

  for (const ebook of ebooks) {
    const key = `${canonicalTitle(ebook.title)}:${canonicalAuthor(ebook.author)}`;
    const existing = map.get(key);
    if (!existing || ebookScore(ebook) > ebookScore(existing)) {
      map.set(key, ebook);
    }
  }

  return Array.from(map.values());
}

export const EBOOKS: Ebook[] = dedupe([
  {
    id: 'biblia-alpha',
    title: 'BibliaAlpha.org',
    author: 'Alpha Collective',
    category: Category.SPECIAL,
    language: 'Português',
    originalLanguage: 'Multilingual',
    content: 'A experiência definitiva de estudo bíblico digital.',
    coverColor: 'bg-amber-900',
    coverAccent: coverAccents[Category.SPECIAL],
    coverMark: coverMarks[Category.SPECIAL],
    coverEdition: 'Ecossistema Alpha',
    isSpecial: true,
    link: 'https://bibliaalpha.org',
  },
  ...DEMO_EBOOKS.map(toStudioEbook),
]);
