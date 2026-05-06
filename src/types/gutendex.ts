// Tipos para integração Gutendex
export interface GutendexBook {
  id: number;
  title: string;
  authors: GutendexAuthor[];
  translators: GutendexAuthor[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean;
  media_type: string;
  formats: Record<string, string>;
  download_count: number;
}

export interface GutendexAuthor {
  name: string;
  birth_year: number | null;
  death_year: number | null;
}

export interface GutendexResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: GutendexBook[];
}

export interface BookFilters {
  search: string;
  category: 'Teologia' | 'Filosofia' | 'Psicanálise' | 'Todos';
  language: string;
  author: string;
  yearFrom: number | null;
  yearTo: number | null;
  onlyFree: boolean;
  sortBy: 'relevance' | 'title' | 'author' | 'year' | 'downloads';
  sortOrder: 'asc' | 'desc';
}

export interface ReadingStats {
  totalRead: number;
  currentlyReading: number;
  favoritesCount: number;
  readingTime: number;
  lastReadAt: string | null;
}

export interface ReadingHistory {
  ebookId: string;
  readAt: string;
  progress: number;
  totalTime: number;
}