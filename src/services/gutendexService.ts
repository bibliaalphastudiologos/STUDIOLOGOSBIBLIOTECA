// src/services/gutendexService.ts
// Integração com a API Gutendex (Project Gutenberg) para obras de domínio público em português
// Documentação: https://gutendex.com

import type { Ebook } from '../types';

export interface GutendexBook {
  id: number;
  title: string;
  authors: Array<{ name: string; birth_year: number | null; death_year: number | null }>;
  translators: Array<{ name: string }>;
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean | null;
  media_type: string;
  formats: Record<string, string>;
  download_count: number;
}

export interface GutendexResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: GutendexBook[];
}

const GUTENDEX_BASE = 'https://gutendex.com/books';

/**
 * Busca livros em português no Project Gutenberg via Gutendex API
 */
export async function fetchPortugueseBooks(params?: {
  search?: string;
  topic?: string;
  page?: number;
  ids?: number[];
}): Promise<GutendexResponse> {
  const url = new URL(GUTENDEX_BASE);
  url.searchParams.set('languages', 'pt');
  if (params?.search) url.searchParams.set('search', params.search);
  if (params?.topic) url.searchParams.set('topic', params.topic);
  if (params?.page && params.page > 1) url.searchParams.set('page', String(params.page));
  if (params?.ids?.length) url.searchParams.set('ids', params.ids.join(','));

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Gutendex API error: ' + res.status);
  return res.json();
}

/**
 * Converte um livro Gutendex para o formato Ebook da plataforma
 */
export function gutendexToEbook(book: GutendexBook): Ebook {
  const author = book.authors[0]?.name?.replace(/,\s*/, ' ').split(' ').reverse().join(' ') ?? 'Autor Desconhecido';
  const deathYear = book.authors[0]?.death_year ?? null;
  const textUrl = book.formats['text/html'] || book.formats['text/plain; charset=utf-8'] || book.formats['text/plain'] || '';
  const epubUrl = book.formats['application/epub+zip'] || '';

  return {
    id: 'gutenberg-' + book.id,
    slug: 'gutenberg-' + book.id,
    title: book.title,
    subtitle: 'Obra de domínio público — Project Gutenberg',
    category: 'Literatura Brasileira',
    subcategory: 'Prosa',
    collection: 'Gutenberg PT',
    brand: 'Studio Logos',
    authorReference: author,
    workReference: book.title,
    yearPublished: String(deathYear ? deathYear - 10 : ''),
    contentType: 'public_domain',
    contentTypeLabel: 'public_domain',
    copyrightStatus: 'public_domain_verified',
    isFree: true,
    isPremium: false,
    isFromGutendex: true,
    downloadUrl: epubUrl || textUrl,
    sourceApi: 'gutendex',
    sourceUrl: textUrl || 'https://www.gutenberg.org/ebooks/' + book.id,
    authorDeathYear: deathYear ?? undefined,
    publicDomainEvidence: deathYear ? 'Autor falecido em ' + deathYear + ' — obra em domínio público' : 'Sem direitos autorais registrados',
    level: 'Intermediário',
    readingTime: '6-10 horas',
    coverTheme: 'literature-green',
    description: 'Obra clássica da literatura em língua portuguesa disponível gratuitamente pelo Project Gutenberg. Domínio público verificado.',
    learn: [
      'Literatura em língua portuguesa',
      'Contexto histórico e literário',
      'Análise de texto clássico',
    ],
    recommendedFor: [
      'Estudantes do ensino médio',
      'Vestibulandos e candidatos ao ENEM',
      'Apreciadores da literatura clássica',
    ],
    chapters: [],
    editorialNotice: 'Esta obra está em domínio público. Fonte: Project Gutenberg (gutenberg.org).',
    readerFeatures: {
      tableOfContents: false,
      readingProgress: false,
      fontSizeControl: false,
    },
    tags: ['domínio público', 'literature', 'gutenberg', 'português'],
  };
}

/**
 * Busca os principais autores clássicos brasileiros no Gutendex
 */
export async function fetchClassicBrazilianAuthors(): Promise<Ebook[]> {
  const searches = [
    'Machado de Assis',
    'José de Alencar',
    'Lima Barreto',
    'Aluísio Azevedo',
    'Euclides da Cunha',
  ];

  const results: Ebook[] = [];
  for (const query of searches) {
    try {
      const data = await fetchPortugueseBooks({ search: query });
      const books = data.results.slice(0, 3).map(gutendexToEbook);
      results.push(...books);
    } catch {
      // Continuar mesmo se uma busca falhar
    }
  }
  return results;
}

/**
 * Hook de cache simples para evitar requisições repetidas
 */
const _cache: Map<string, { data: GutendexResponse; ts: number }> = new Map();
const CACHE_TTL = 1000 * 60 * 30; // 30 minutos

export async function fetchPortugueseBooksCached(params?: Parameters<typeof fetchPortugueseBooks>[0]): Promise<GutendexResponse> {
  const key = JSON.stringify(params ?? {});
  const cached = _cache.get(key);
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data;
  const data = await fetchPortugueseBooks(params);
  _cache.set(key, { data, ts: Date.now() });
  return data;
}
