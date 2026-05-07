import { DEMO_EBOOKS } from './data/ebooks';
import { Category, type Ebook } from './studioTypes';
import { getEditorialCoverImage } from './lib/coverArt';

const categoryMap: Record<string, Category> = {
  Filosofia: Category.PHILOSOPHY,
  'Filosofia Clássica': Category.PHILOSOPHY,
  Estoicismo: Category.PHILOSOPHY,
  Ética: Category.PHILOSOPHY,
  Existencialismo: Category.PHILOSOPHY,
  'Filosofia Cristã': Category.PHILOSOPHY,
  Teologia: Category.THEOLOGY,
  Patrística: Category.THEOLOGY,
  'Doutrina Cristã': Category.THEOLOGY,
  Espiritualidade: Category.CHRISTIAN_SPIRITUALITY,
  Psicanálise: Category.PSYCHOANALYSIS,
  Romance: Category.UNIVERSAL_LITERATURE,
  Literatura: Category.UNIVERSAL_LITERATURE,
  'Literatura Brasileira': Category.BRAZILIAN_LITERATURE,
  'Literatura Portuguesa': Category.PORTUGUESE_LITERATURE,
  História: Category.HISTORY,
  Humanidades: Category.HUMANITIES,
};

const coverColors: Record<Category, string> = {
  [Category.SPECIAL]: 'bg-amber-950',
  [Category.PHILOSOPHY]: 'bg-[#171512]',
  [Category.THEOLOGY]: 'bg-[#2b2116]',
  [Category.CHRISTIAN_SPIRITUALITY]: 'bg-[#253025]',
  [Category.PSYCHOANALYSIS]: 'bg-[#18181b]',
  [Category.BRAZILIAN_LITERATURE]: 'bg-[#1f3026]',
  [Category.PORTUGUESE_LITERATURE]: 'bg-[#2c2330]',
  [Category.UNIVERSAL_LITERATURE]: 'bg-[#281717]',
  [Category.HISTORY]: 'bg-[#20252d]',
  [Category.HUMANITIES]: 'bg-[#2c2922]',
  [Category.LITERATURE]: 'bg-[#281717]',
};

const coverAccents: Record<Category, string> = {
  [Category.SPECIAL]: '#f2c86b',
  [Category.PHILOSOPHY]: '#b9a46a',
  [Category.THEOLOGY]: '#c8a35b',
  [Category.CHRISTIAN_SPIRITUALITY]: '#b9c87a',
  [Category.PSYCHOANALYSIS]: '#a9a1b8',
  [Category.BRAZILIAN_LITERATURE]: '#90b77d',
  [Category.PORTUGUESE_LITERATURE]: '#c7a0d6',
  [Category.UNIVERSAL_LITERATURE]: '#d3a073',
  [Category.HISTORY]: '#9fb2c9',
  [Category.HUMANITIES]: '#d0bd8a',
  [Category.LITERATURE]: '#d3a073',
};

const coverMarks: Record<Category, string> = {
  [Category.SPECIAL]: 'SL',
  [Category.PHILOSOPHY]: 'Φ',
  [Category.THEOLOGY]: 'Λ',
  [Category.CHRISTIAN_SPIRITUALITY]: '✦',
  [Category.PSYCHOANALYSIS]: 'Ψ',
  [Category.BRAZILIAN_LITERATURE]: 'BR',
  [Category.PORTUGUESE_LITERATURE]: 'PT',
  [Category.UNIVERSAL_LITERATURE]: '§',
  [Category.HISTORY]: 'H',
  [Category.HUMANITIES]: 'M',
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

function slugify(value: string): string {
  return removeDiacritics(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96);
}

function estimateMinutes(html: string): number {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.ceil(words / 210));
}

function splitIntoEditorialChapters(text: string, title: string): Ebook['chapters'] {
  const clean = stripHtml(text);
  const parts = clean
    .split(/(?<=\.)\s+(?=[A-ZÁÉÍÓÚÂÊÔÃÕÇ])/)
    .reduce<string[]>((acc, sentence) => {
      const last = acc[acc.length - 1] || '';
      if (!last || last.length > 1200) acc.push(sentence);
      else acc[acc.length - 1] = `${last} ${sentence}`;
      return acc;
    }, [])
    .slice(0, 8);

  if (!parts.length) {
    return [{
      id: `${slugify(title)}-apresentacao`,
      title: 'Apresentação da obra',
      content: `<p>${clean || 'Conteúdo em preparação editorial para leitura online.'}</p>`,
      estimatedMinutes: 4,
    }];
  }

  return parts.map((part, index) => ({
    id: `${slugify(title)}-${index + 1}`,
    title: index === 0 ? 'Apresentação da obra' : `Seção ${index + 1}`,
    content: `<p>${part}</p>`,
    estimatedMinutes: estimateMinutes(part),
  }));
}

function buildChapters(source: (typeof DEMO_EBOOKS)[number], title: string): Ebook['chapters'] {
  const sourceChapters = source.chapters || [];
  if (sourceChapters.length > 0) {
    return sourceChapters.map((chapter, index) => ({
      id: chapter.id || `${slugify(title)}-${index + 1}`,
      title: chapter.title || `Capítulo ${index + 1}`,
      content: chapter.content || '<p>Capítulo em preparação editorial.</p>',
      estimatedMinutes: chapter.estimatedMinutes || estimateMinutes(chapter.content || ''),
    }));
  }

  return splitIntoEditorialChapters(source.description || source.editorialNotice || '', title);
}

function buildAuthorContext(source: (typeof DEMO_EBOOKS)[number], author: string): string {
  const reference = source.workReference ? ` Esta obra se situa no eixo ${source.workReference}.` : '';
  return `${author} integra a curadoria clássica do Studio Logos para leitura, estudo e formação intelectual.${reference}`;
}

function isTranslationAvailable(language: string): boolean {
  return Boolean(language && !/portugu[eê]s/i.test(language));
}

function toStudioEbook(source: (typeof DEMO_EBOOKS)[number]): Ebook {
  const category = categoryMap[source.category] || Category.LITERATURE;
  const title = cleanDisplayTitle(source.displayTitle || source.fullTitle || source.title);
  const author = source.authorReference || source.brand || 'StudioLogos';
  const chapters = buildChapters(source, title);
  const originalLanguage = source.originalLanguage || 'Português';
  const sourceName = source.sourceApi || source.sourceEdition || 'Arquivo técnico Studio Logos';
  const sourceUrl = source.sourceUrl || '';
  const fullTextAllowed = source.fullTextAllowed !== false && source.copyrightStatus !== 'summary_only';

  return {
    id: source.id,
    slug: source.slug || `${slugify(category)}-${slugify(author)}-${slugify(title)}`,
    title,
    author,
    category,
    subcategory: source.subcategory || category,
    collection: source.collection || 'Biblioteca Clássica Studio Logos',
    language: 'Português',
    originalLanguage,
    approximateYear: source.yearPublished || source.workReference || 'Edição clássica',
    content: buildContent(source),
    description: source.description || 'Obra selecionada para leitura online premium no Studio Logos.',
    longDescription: source.description || source.editorialNotice || 'Texto organizado em capítulos para leitura online no Studio Logos.',
    authorContext: buildAuthorContext(source, author),
    chapters: fullTextAllowed ? chapters : splitIntoEditorialChapters(source.description || '', title),
    tags: source.tags || [String(category), source.subcategory || '', author].filter(Boolean),
    sourceName,
    sourceUrl,
    sourceEdition: source.sourceEdition || 'Edição técnica em revisão',
    importSource: source.importSource,
    licenseStatus: fullTextAllowed ? 'verified' : 'summary_only',
    licenseNote: source.publicDomainEvidence || source.editorialNotice || 'Registro técnico interno para validação editorial.',
    reviewStatus: fullTextAllowed ? 'validated' : 'editorial-only',
    publicationStatus: 'published',
    estimatedReadTime: source.estimatedReadTime || source.readingTime || `${chapters.reduce((sum, chapter) => sum + chapter.estimatedMinutes, 0)} min de leitura`,
    translationAvailable: isTranslationAvailable(originalLanguage),
    coverColor: coverColors[category],
    coverAccent: coverAccents[category],
    coverMark: coverMarks[category],
    coverEdition: source.collection || source.subcategory || 'StudioLogos',
    coverImage: getEditorialCoverImage(category, title, author),
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
    slug: 'biblia-alpha',
    title: 'BibliaAlpha.org',
    author: 'Alpha Collective',
    category: Category.SPECIAL,
    subcategory: 'Ecossistema',
    collection: 'Ecossistema Alpha',
    language: 'Português',
    originalLanguage: 'Multilingual',
    approximateYear: 'Plataforma contemporânea',
    content: 'A experiência definitiva de estudo bíblico digital.',
    description: 'A experiência definitiva de estudo bíblico digital integrada ao ecossistema Studio Logos.',
    longDescription: 'Plataforma complementar do ecossistema Alpha para estudo bíblico, pesquisa e aprofundamento teológico.',
    authorContext: 'Alpha Collective desenvolve recursos digitais de estudo bíblico e formação cristã.',
    chapters: [{
      id: 'biblia-alpha-apresentacao',
      title: 'Apresentação',
      content: '<p>A experiência definitiva de estudo bíblico digital.</p>',
      estimatedMinutes: 3,
    }],
    tags: ['bíblia', 'estudo bíblico', 'ecossistema alpha'],
    sourceName: 'Studio Logos',
    sourceUrl: 'https://bibliaalpha.org',
    sourceEdition: 'Plataforma oficial',
    licenseStatus: 'licensed',
    licenseNote: 'Produto próprio do ecossistema Alpha.',
    reviewStatus: 'validated',
    publicationStatus: 'published',
    estimatedReadTime: '3 min',
    translationAvailable: false,
    coverColor: 'bg-amber-900',
    coverAccent: coverAccents[Category.SPECIAL],
    coverMark: coverMarks[Category.SPECIAL],
    coverEdition: 'Ecossistema Alpha',
    isSpecial: true,
    link: 'https://bibliaalpha.org',
  },
  ...DEMO_EBOOKS.map(toStudioEbook),
]);
