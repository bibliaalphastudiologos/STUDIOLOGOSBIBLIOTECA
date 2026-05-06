import { useState, useEffect, useMemo, useCallback } from 'react';
import { Ebook, BookFilters, ReadingStats, ReadingHistory } from '../types';
import { GutendexService } from '../lib/gutendex';
import { GutendexBook } from '../types/gutendex';
import { DEMO_EBOOKS } from '../data/ebooks';
import { safeStorage } from '../lib/safeStorage';

const FAVORITES_KEY = 'studiologos_favorites';
const HISTORY_KEY = 'studiologos_history';
const READING_STATS_KEY = 'studiologos_stats';

interface UseEbooksResult {
  ebooks: Ebook[];
  filteredEbooks: Ebook[];
  loading: boolean;
  error: string | null;
  filters: BookFilters;
  setFilters: React.Dispatch<React.SetStateAction<BookFilters>>;
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
  history: ReadingHistory[];
  addToHistory: (ebookId: string, progress: number, time: number) => void;
  stats: ReadingStats;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  refresh: () => Promise<void>;
  hasMore: boolean;
  loadMore: () => Promise<void>;
}

export function useEbooks(initialCategory: string = 'Todos'): UseEbooksResult {
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [history, setHistory] = useState<ReadingHistory[]>([]);
  const [stats, setStats] = useState<ReadingStats>({
    totalRead: 0,
    currentlyReading: 0,
    favoritesCount: 0,
    readingTime: 0,
    lastReadAt: null,
  });

  const [filters, setFilters] = useState<BookFilters>({
    search: '',
    category: initialCategory === 'Teologia' || initialCategory === 'Filosofia' || initialCategory === 'Psicanálise'
      ? initialCategory
      : 'Todos',
    language: '',
    author: '',
    yearFrom: null,
    yearTo: null,
    onlyFree: false,
    sortBy: 'relevance',
    sortOrder: 'desc',
  });

  // Carrega favoritos/histórico do localStorage
  useEffect(() => {
    const fav = safeStorage.getItem(FAVORITES_KEY);
    const hist = safeStorage.getItem(HISTORY_KEY);
    const st = safeStorage.getItem(READING_STATS_KEY);

    try {
      if (fav) setFavorites(new Set(JSON.parse(fav)));
      if (hist) setHistory(JSON.parse(hist));
      if (st) setStats(JSON.parse(st));
    } catch {
      safeStorage.removeItem(FAVORITES_KEY);
      safeStorage.removeItem(HISTORY_KEY);
      safeStorage.removeItem(READING_STATS_KEY);
    }
  }, []);

  // Salva favoritos
  useEffect(() => {
    safeStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites]));
    setStats(s => ({ ...s, favoritesCount: favorites.size }));
  }, [favorites]);

  // Salva histórico
  useEffect(() => {
    safeStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  // Salva stats
  useEffect(() => {
    safeStorage.setItem(READING_STATS_KEY, JSON.stringify(stats));
  }, [stats]);

  // Carrega ebooks iniciais
  useEffect(() => {
    loadEbooks();
  }, [filters.category]);

  const loadEbooks = useCallback(async (pageNum: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      // Tenta buscar da Gutendex
      let gutendexBooks: GutendexBook[] = [];
      let totalCount = 0;

      const categoryMap: Record<string, string> = {
        'Filosofia': 'philosophy',
        'Psicanálise': 'psychoanalysis',
        'Teologia': 'theology',
      };

      const selectedCategory = filters.category ?? 'Todos';
      if (selectedCategory !== 'Todos' && categoryMap[selectedCategory]) {
        const topic = categoryMap[selectedCategory];
        const response = await GutendexService.fetchByCategory(
          selectedCategory as 'Filosofia' | 'Psicanálise' | 'Teologia',
          pageNum
        );
        gutendexBooks = response.results;
        totalCount = response.count;
        setHasMore(response.next !== null);
      } else {
        // Busca geral
        const response = await GutendexService.searchBooks('', pageNum);
        gutendexBooks = response.results;
        totalCount = response.count;
        setHasMore(response.next !== null);
      }

      // Converte para formato interno
      const converted: Ebook[] = gutendexBooks.map(book =>
        GutendexService.convertToEbook(book, filters.category as any)
      ) as Ebook[];

      // Mescla com DEMO_EBOOKS (prioriza Gutendex se duplicar)
      const demoFiltered = DEMO_EBOOKS.filter(
        e => selectedCategory === 'Todos' || e.category === selectedCategory
      );

      const merged = pageNum === 1
        ? [...converted, ...demoFiltered]
        : [...ebooks, ...converted];

      setEbooks(merged);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar ebooks');
      // Fallback: usa apenas DEMO_EBOOKS
      setEbooks(DEMO_EBOOKS);
    } finally {
      setLoading(false);
    }
  }, [filters.category]);

  // Filtros e ordenação
  const filteredEbooks = useMemo(() => {
    let result = [...ebooks];

    // Filtro de busca
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.authorReference.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
      );
    }

    // Filtro de idioma
    if (filters.language) {
      // Implementar se necessário
    }

    // Filtro de autor
    if (filters.author) {
      const authorFilter = filters.author.toLowerCase();
      result = result.filter(e =>
        e.authorReference.toLowerCase().includes(authorFilter)
      );
    }

    // Apenas gratuitos
    if (filters.onlyFree) {
      result = result.filter(e => 
        e.brand === 'Project Gutenberg' || 
        (e.editorialNotice && (
          e.editorialNotice.includes('gratuitamente') ||
          e.editorialNotice.includes('gratuito') ||
          e.editorialNotice.includes('domínio público') ||
          e.editorialNotice.includes('grátis')
        ))
      );
    }

    // Ordenação
    result.sort((a, b) => {
      let comparison = 0;
      switch (filters.sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'author':
          comparison = a.authorReference.localeCompare(b.authorReference);
          break;
        case 'downloads':
          // Usa contagem aproximada
          comparison = 0;
          break;
        default:
          comparison = 0;
      }
      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [ebooks, searchQuery, filters]);

  // Toggle favorito
  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // Adiciona histórico
  const addToHistory = useCallback((ebookId: string, progress: number, time: number) => {
    const entry: ReadingHistory = {
      ebookId,
      readAt: new Date().toISOString(),
      progress,
      totalTime: time,
    };
    setHistory(prev => [entry, ...prev.slice(0, 49)]); // mantém últimos 50

    // Atualiza stats
    setStats(s => ({
      ...s,
      totalRead: s.totalRead + (progress >= 90 ? 1 : 0),
      currentlyReading: progress < 90 ? s.currentlyReading + 1 : s.currentlyReading,
      readingTime: s.readingTime + time,
      lastReadAt: new Date().toISOString(),
    }));
  }, []);

  // Refresh manual
  const refresh = useCallback(async () => {
    await loadEbooks(1);
  }, [loadEbooks]);

  // Load more (infinite scroll)
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    await loadEbooks(page + 1);
    setPage(p => p + 1);
  }, [loading, hasMore, page]);

  return {
    ebooks,
    filteredEbooks,
    loading,
    error,
    filters,
    setFilters,
    favorites,
    toggleFavorite,
    history,
    addToHistory,
    stats,
    searchQuery,
    setSearchQuery,
    refresh,
    hasMore,
    loadMore,
  };
}
