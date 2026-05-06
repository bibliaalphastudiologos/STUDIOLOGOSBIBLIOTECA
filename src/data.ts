import { DEMO_EBOOKS } from './data/ebooks';
import { Category, type Ebook } from './studioTypes';

const categoryMap: Record<string, Category> = {
  Filosofia: Category.PHILOSOPHY,
  Teologia: Category.THEOLOGY,
  Psicanálise: Category.PSYCHOANALYSIS,
  Literatura: Category.LITERATURE,
  'Literatura Brasileira': Category.LITERATURE,
};

const categoryImages: Record<Category, string> = {
  [Category.SPECIAL]: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
  [Category.PHILOSOPHY]: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
  [Category.THEOLOGY]: 'https://images.unsplash.com/photo-1474932430478-3a7fb0500e3f?auto=format&fit=crop&q=80&w=800',
  [Category.PSYCHOANALYSIS]: 'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?auto=format&fit=crop&q=80&w=800',
  [Category.LITERATURE]: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800',
};

const coverColors: Record<Category, string> = {
  [Category.SPECIAL]: 'bg-amber-950',
  [Category.PHILOSOPHY]: 'bg-stone-900',
  [Category.THEOLOGY]: 'bg-amber-900',
  [Category.PSYCHOANALYSIS]: 'bg-zinc-900',
  [Category.LITERATURE]: 'bg-red-950',
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
  const cover = source.cover && /^https?:\/\//.test(source.cover) ? source.cover : categoryImages[category];

  return {
    id: source.id,
    title: source.displayTitle || source.fullTitle || source.title,
    author: source.authorReference || source.brand || 'StudioLogos',
    category,
    language: 'Português',
    originalLanguage: source.originalLanguage || source.workReference || 'Português',
    content: buildContent(source),
    coverColor: coverColors[category],
    coverImage: cover,
  };
}

function dedupe(ebooks: Ebook[]): Ebook[] {
  const seen = new Set<string>();
  return ebooks.filter((ebook) => {
    const key = `${ebook.title.toLowerCase()}-${ebook.author.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
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
    coverImage: categoryImages[Category.SPECIAL],
    isSpecial: true,
    link: 'https://bibliaalpha.org',
  },
  ...DEMO_EBOOKS.map(toStudioEbook),
]);
