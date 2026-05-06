import { GutendexBook, GutendexResponse } from '../types/gutendex';
import { safeStorage } from './safeStorage';

const GUTENDEX_BASE = 'https://gutendex.com';
const CACHE_KEY = 'studiologos_gutendex_cache';
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24h

// Mapeamento de temas Gutendex para categorias do Studio Logos
const THEME_MAPPING: Record<string, 'Teologia' | 'Filosofia' | 'Psicanálise'> = {
  'philosophy': 'Filosofia',
  'psychoanalysis': 'Psicanálise',
  'psychology': 'Psicanálise',
  'theology': 'Teologia',
  'religion': 'Teologia',
  'metaphysics': 'Filosofia',
  'ethics': 'Filosofia',
  'consciousness': 'Psicanálise',
  'mind': 'Psicanálise',
  'spirituality': 'Teologia',
  'medieval-philosophy': 'Filosofia',
  'greek-philosophy': 'Filosofia',
  'political-philosophy': 'Filosofia',
};

export class GutendexService {
  /**
   * Busca livros por tema/categoria com cache
   */
  static async fetchByCategory(
    category: 'Filosofia' | 'Psicanálise' | 'Teologia',
    page: number = 1
  ): Promise<GutendexResponse> {
    const cacheKey = `${CACHE_KEY}_${category}_${page}`;

    // Verifica cache
    const cached = safeStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }

    // Mapeia categoria para tema Gutendex
    const gutendexTopics = Object.entries(THEME_MAPPING)
      .filter(([_, cat]) => cat === category)
      .map(([topic]) => topic);

    const params = new URLSearchParams({
      copyright: 'false',
      page: page.toString(),
      topics: gutendexTopics.join(','),
    });

    const response = await fetch(`${GUTENDEX_BASE}/books?${params}`);

    if (!response.ok) {
      throw new Error(`Erro ${response.status} ao buscar livros`);
    }

    const data: GutendexResponse = await response.json();

    // Salva no cache
    safeStorage.setItem(cacheKey, JSON.stringify({
      data,
      timestamp: Date.now()
    }));

    return data;
  }

  /**
   * Busca livros por query livre
   */
  static async searchBooks(query: string, page: number = 1): Promise<GutendexResponse> {
    const cacheKey = `${CACHE_KEY}_search_${query}_${page}`;
    const cached = safeStorage.getItem(cacheKey);

    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }

    const params = new URLSearchParams({
      search: query,
      copyright: 'false',
      page: page.toString(),
    });

    const response = await fetch(`${GUTENDEX_BASE}/books?${params}`);
    const data: GutendexResponse = await response.json();

    safeStorage.setItem(cacheKey, JSON.stringify({
      data,
      timestamp: Date.now()
    }));

    return data;
  }

  /**
   * Obtém detalhes de um livro específico
   */
  static async getBook(id: number): Promise<GutendexBook | null> {
    const cacheKey = `${CACHE_KEY}_book_${id}`;
    const cached = safeStorage.getItem(cacheKey);

    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }

    try {
      const response = await fetch(`${GUTENDEX_BASE}/books/${id}`);
      if (!response.ok) return null;

      const data: GutendexBook = await response.json();
      safeStorage.setItem(cacheKey, JSON.stringify({
        data,
        timestamp: Date.now()
      }));

      return data;
    } catch {
      return null;
    }
  }

  /**
   * Converte livro Gutendex para formato interno Ebook
   */
  static convertToEbook(book: GutendexBook, category: 'Teologia' | 'Filosofia' | 'Psicanálise'): Partial<import('../types').Ebook> {
    const mainAuthor = book.authors[0]?.name || 'Autor Desconhecido';
    const birthYear = book.authors[0]?.birth_year;
    const deathYear = book.authors[0]?.death_year;

    // Pega formato HTML ou README se disponível
    const htmlFormat = book.formats['text/html'] || book.formats['text/plain'] || '';
    const coverUrl = book.formats['image/jpeg'] || `https://www.gutenberg.org/covers/${book.id}.jpg`;

    // Extrai informações dos subjects
    const subjects = book.subjects.slice(0, 3).join(', ');
    const workReference = subjects || `Obra clássica do domínio público`;

    return {
      id: `gutendex-${book.id}`,
      title: book.title,
      subtitle: '',
      category,
      subcategory: book.bookshelves?.[0] || '',
      collection: 'Gutendex',
      brand: 'Project Gutenberg',
      authorReference: mainAuthor,
      workReference,
      contentType: 'Texto Completo',
      level: 'Introdutório' as const,
      readingTime: this.estimateReadingTime(book.download_count),
      cover: coverUrl,
      coverTheme: category === 'Teologia' ? 'gold' : category === 'Filosofia' ? 'navy' : ' burgundy',
      description: `Clássico da ${category.toLowerCase()} disponível gratuitamente. ${book.authors.length > 0 ? `Por ${mainAuthor}` : ''}. ${birthYear && deathYear ? `(${birthYear}–${deathYear})` : ''}. Total de ${book.download_count.toLocaleString()} downloads no Project Gutenberg.`,
      learn: [
        'Conteúdo gratuito e de domínio público',
        'Clássico da literatura mundial',
        'Disponível para leitura online ou download',
      ],
      recommendedFor: ['Estudantes', 'Pesquisadores', 'Leitores avançados'],
      chapters: [], // Será preenchido após carregar conteúdo
      editorialNotice: 'Este ebook é disponibilizado gratuitamente através do Project Gutenberg.',
    };
  }

  /**
   * Estima tempo de leitura baseado no tamanho do texto
   */
  private static estimateReadingTime(downloadCount: number): string {
    // Heurística baseada em médias de livros do Gutenberg
    const words = downloadCount * 50; // estimativa grosseira
    const minutes = Math.round(words / 200);
    return `${minutes} min de leitura`;
  }

  /**
   * Busca livros com filtros avançados
   */
  static async searchWithFilters(
    filters: {
      category?: string;
      search?: string;
      language?: string;
      author?: string;
      topics?: string;
      page?: number;
    }
  ): Promise<GutendexResponse> {
    const params = new URLSearchParams({
      copyright: 'false',
      ...(filters.page && { page: filters.page.toString() }),
      ...(filters.search && { search: filters.search }),
      ...(filters.language && { languages: filters.language }),
      ...(filters.author && { author: filters.author }),
      ...(filters.topics && { topics: filters.topics }),
    });

    // Adiciona mapeamento de categoria
    if (filters.category && THEME_MAPPING[filters.category.toLowerCase()]) {
      params.set('topics', THEME_MAPPING[filters.category.toLowerCase()]);
    }

    const response = await fetch(`${GUTENDEX_BASE}/books?${params}`);
    return response.json();
  }

  /**
   * Limpa cache (útil para forçar atualização)
   */
  static clearCache(): void {
    safeStorage.keys()
      .filter(key => key.startsWith(CACHE_KEY))
      .forEach(key => safeStorage.removeItem(key));
  }
}
