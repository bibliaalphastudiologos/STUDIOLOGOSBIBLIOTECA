/**
 * Studio Logos — Gutenberg API Integration
 * Integra Gutendex, Project Gutenberg, Open Library e Internet Archive
 * para buscar obras de domínio público juridicamente verificadas.
 *
 * Regra: obra em domínio público comprovado → texto integral (leitura online)
 *        obra protegida ou incerta → apenas metadados para síntese autoral
 */

export interface GutenbergBook {
  id: number;
  title: string;
  authors: { name: string; birth_year: number | null; death_year: number | null }[];
  subjects: string[];
  languages: string[];
  formats: Record<string, string>;
  download_count: number;
  bookshelves: string[];
}

export interface GutendexResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: GutenbergBook[];
}

export interface OpenLibraryBook {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  subject?: string[];
  cover_i?: number;
  language?: string[];
}

const GUTENDEX_BASE = 'https://gutendex.com/books';
const GUTENBERG_TEXT_BASE = 'https://www.gutenberg.org/cache/epub';
const OPEN_LIBRARY_BASE = 'https://openlibrary.org';

/**
 * Verifica se obra é domínio público no Brasil (Lei 9.610/98 — 70 anos após morte)
 */
export function isPublicDomainBrazil(deathYear: number | null): boolean {
  if (!deathYear) return false;
  const currentYear = new Date().getFullYear();
  return currentYear - deathYear > 70;
}

/**
 * Busca obras por tópico na API Gutendex
 */
export async function searchGutendex(params: {
  search?: string;
  topic?: string;
  languages?: string;
  page?: number;
}): Promise<GutendexResponse> {
  const url = new URL(GUTENDEX_BASE);
  if (params.search) url.searchParams.set('search', params.search);
  if (params.topic) url.searchParams.set('topic', params.topic);
  if (params.languages) url.searchParams.set('languages', params.languages);
  if (params.page) url.searchParams.set('page', String(params.page));

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error(`Gutendex error: ${response.status}`);
  return response.json();
}

/**
 * Busca texto integral de obra do Project Gutenberg por ID
 */
export async function fetchGutenbergText(bookId: number): Promise<string> {
  // Tenta formato TXT simples
  const txtUrl = `${GUTENBERG_TEXT_BASE}/${bookId}/pg${bookId}.txt`;
  try {
    const res = await fetch(txtUrl);
    if (res.ok) return res.text();
  } catch {}

  // Fallback: formato UTF-8
  const utf8Url = `${GUTENBERG_TEXT_BASE}/${bookId}/pg${bookId}-h/${bookId}-h.htm`;
  const res2 = await fetch(utf8Url);
  if (!res2.ok) throw new Error(`Não foi possível obter texto do Gutenberg ID ${bookId}`);
  return res2.text();
}

/**
 * Busca metadados no Open Library
 */
export async function searchOpenLibrary(query: string, limit = 10): Promise<OpenLibraryBook[]> {
  const url = `${OPEN_LIBRARY_BASE}/search.json?q=${encodeURIComponent(query)}&limit=${limit}&fields=key,title,author_name,first_publish_year,subject,cover_i,language`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Open Library error: ${res.status}`);
  const data = await res.json();
  return data.docs || [];
}

/**
 * URL de capa do Open Library
 */
export function getOpenLibraryCover(coverId: number, size: 'S' | 'M' | 'L' = 'M'): string {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

/**
 * Obras de filosofia, teologia e psicanálise para busca automática
 */
export const CATALOG_QUERIES = {
  filosofia: [
    { search: 'plato republic', languages: 'en,pt' },
    { search: 'aristotle ethics', languages: 'en,pt' },
    { search: 'kant critique pure reason', languages: 'en,de,pt' },
    { search: 'hegel phenomenology', languages: 'en,de' },
    { search: 'nietzsche zarathustra', languages: 'en,de,pt' },
    { search: 'descartes meditations', languages: 'en,fr,pt' },
    { topic: 'philosophy', languages: 'pt' },
    { topic: 'ethics -- early works', languages: 'en' },
  ],
  teologia: [
    { search: 'augustine confessions', languages: 'en,pt,la' },
    { search: 'thomas aquinas summa', languages: 'en,la,pt' },
    { search: 'calvin institutes', languages: 'en' },
    { search: 'luther catechism', languages: 'en,de' },
    { search: 'spurgeon sermons', languages: 'en' },
    { search: 'john chrysostom homilies', languages: 'en' },
    { topic: 'theology', languages: 'en,pt' },
  ],
  literatura: [
    { search: 'machado de assis', languages: 'pt' },
    { search: 'jose de alencar', languages: 'pt' },
    { search: 'shakespeare plays', languages: 'en,pt' },
    { search: 'dante divine comedy', languages: 'en,it,pt' },
    { search: 'homer odyssey', languages: 'en,pt' },
    { search: 'tolstoy war peace', languages: 'en,pt' },
    { search: 'dostoevsky brothers karamazov', languages: 'en,pt' },
  ],
};

/**
 * Formata obra do Gutenberg como metadados para o Studio Logos
 */
export function formatGutenbergAsMetadata(book: GutenbergBook): {
  title: string;
  author: string;
  deathYear: number | null;
  isPublicDomain: boolean;
  languages: string[];
  subjects: string[];
  gutenbergId: number;
  textUrl: string | null;
} {
  const author = book.authors[0];
  const deathYear = author?.death_year ?? null;
  const isPublicDomain = isPublicDomainBrazil(deathYear);

  const textUrl = isPublicDomain
    ? (book.formats['text/plain; charset=utf-8'] ||
       book.formats['text/plain'] ||
       book.formats['text/html'] ||
       null)
    : null;

  return {
    title: book.title,
    author: author?.name ?? 'Desconhecido',
    deathYear,
    isPublicDomain,
    languages: book.languages,
    subjects: book.subjects.slice(0, 5),
    gutenbergId: book.id,
    textUrl,
  };
}
