import React, { useState, useMemo, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/AuthContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EbookCard } from './components/EbookCard';
import { EbookModal } from './components/EbookModal';
import { AdminPanel } from './components/AdminPanel';
import { OnlineReader } from './components/OnlineReader';
import { SearchBar } from './components/SearchBar';
import { EbookFilters } from './components/EbookFilters';
import { EbookStats } from './components/EbookStats';
import { DEMO_EBOOKS } from './data/ebooks';
import { Ebook, BookFilters, ReadingStats } from './types';
import {
  Search,
  Filter,
  BookOpen,
  ScrollText,
  Brain,
  Heart,
  ChevronRight,
  Shield,
  Crown,
  ArrowRight,
  Loader2,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================
// HOOK PERSONALIZADO DE EBOOKS
// ============================================
function useEbooksWithGutendex(initialCategory = 'Todos') {
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<BookFilters>({
    search: '',
    category: initialCategory === 'Teologia' || initialCategory === 'Filosofia' || initialCategory === 'Psicanálise'
      ? initialCategory
      : 'Todos',
    language: '',
    author: '',
    yearFrom: null,
    yearTo: null,
    onlyFree: true,
    sortBy: 'relevance',
    sortOrder: 'desc',
  });
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [history, setHistory] = useState<any[]>([]);
  const [stats, setStats] = useState<ReadingStats>({
    totalRead: 0,
    currentlyReading: 0,
    favoritesCount: 0,
    readingTime: 0,
    lastReadAt: null,
  });

  // Carregar persistências
  useEffect(() => {
    const fav = localStorage.getItem('studiologos_favorites');
    const hist = localStorage.getItem('studiologos_history');
    const st = localStorage.getItem('studiologos_stats');

    if (fav) setFavorites(new Set(JSON.parse(fav)));
    if (hist) setHistory(JSON.parse(hist));
    if (st) setStats(JSON.parse(st));
  }, []);

  // Salvar favoritos
  useEffect(() => {
    localStorage.setItem('studiologos_favorites', JSON.stringify([...favorites]));
    setStats(s => ({ ...s, favoritesCount: favorites.size }));
  }, [favorites]);

  // Carregar ebooks iniciais
  useEffect(() => {
    loadEbooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.category]);

  const loadEbooks = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simula busca na Gutendex (ou usa DEMO)
      // Aqui você Integrating real
      await new Promise(r => setTimeout(r, 800)); // simula network delay

      // Por enquanto usa DEMO + simula enriquecimento Gutendex
      const enriched = DEMO_EBOOKS.map(ebook => ({
        ...ebook,
        isFromGutendex: false, // marcar depois
        downloadUrl: `https://www.gutenberg.org/ebooks/${ebook.id.replace('demo-', '')}.epub`,
      }));

      setEbooks(enriched);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar');
      setEbooks(DEMO_EBOOKS);
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => loadEbooks();

  // Filtragem
  const filteredEbooks = useMemo(() => {
    let result = [...ebooks];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.authorReference.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
      );
    }

    if (filters.category !== 'Todos') {
      result = result.filter(e => e.category === filters.category);
    }

    if (filters.author) {
      result = result.filter(e =>
        e.authorReference.toLowerCase().includes(filters.author.toLowerCase())
      );
    }

    if (filters.onlyFree) {
      result = result.filter(e => e.brand === 'Project Gutenberg' || e.editorialNotice?.includes('gratuitamente'));
    }

    // Ordenação
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.authorReference.localeCompare(b.authorReference);
        default:
          return 0;
      }
    });

    return result;
  }, [ebooks, searchQuery, filters]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const addToHistory = (ebookId: string, progress: number, time: number) => {
    const entry = {
      ebookId,
      readAt: new Date().toISOString(),
      progress,
      totalTime: time,
    };
    setHistory(prev => [entry, ...prev.slice(0, 49)]);

    setStats(s => ({
      ...s,
      totalRead: s.totalRead + (progress >= 90 ? 1 : 0),
      currentlyReading: progress < 90 ? s.currentlyReading + 1 : s.currentlyReading,
      readingTime: s.readingTime + time,
      lastReadAt: new Date().toISOString(),
    }));
  };

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
  };
}

// ============================================
// COMPONENTE PRINCIPAL HOME
// ============================================
const HomePage: React.FC = () => {
   const { user } = useAuth();
   const { pathname } = useLocation();

   useEffect(() => {
   }, []);

  // Categoria inicial baseada na URL
  const initialCategory = useMemo(() => {
    if (pathname.includes('teologia')) return 'Teologia';
    if (pathname.includes('filosofia')) return 'Filosofia';
    if (pathname.includes('psicanalise')) return 'Psicanálise';
    return 'Todos';
  }, [pathname]);

  const {
    filteredEbooks,
    loading,
    error,
    filters,
    setFilters,
    favorites,
    toggleFavorite,
    stats,
    searchQuery,
    setSearchQuery,
    refresh,
  } = useEbooksWithGutendex(initialCategory);

  const [selectedEbook, setSelectedEbook] = useState<Ebook | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Leitura contínua
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 1000);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Continuação da última leitura
  useEffect(() => {
    const lastId = localStorage.getItem('last_read_ebook');
    if (lastId && !selectedEbook) {
      const found = DEMO_EBOOKS.find(e => e.id === lastId);
      if (found) setSelectedEbook(found);
    }
  }, []);

  // Atualiza filtro quando a rota muda
  useEffect(() => {
    const category = initialCategory as any;
    if (category !== filters.category) {
      setFilters(prev => ({ ...prev, category }));
    }
  }, [initialCategory, filters.category, setFilters]);

  // Categorias disponíveis
  const categories = [
    { key: 'Todos', label: 'Todos', icon: '📚', count: filteredEbooks.length },
    { key: 'Filosofia', label: 'Filosofia', icon: '🧠', count: filteredEbooks.filter(e => e.category === 'Filosofia').length },
    { key: 'Psicanálise', label: 'Psicanálise', icon: '🔍', count: filteredEbooks.filter(e => e.category === 'Psicanálise').length },
    { key: 'Teologia', label: 'Teologia', icon: '✝️', count: filteredEbooks.filter(e => e.category === 'Teologia').length },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background grain pt-16">
        <Hero />

      {/* Barra de busca principal */}
      <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Buscar por título, autor, assunto..."
            suggestions={['Aristóteles', 'Nietzsche', 'Freud', 'Kant', 'Heidegger']}
          />
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Estatísticas */}
        <EbookStats
          stats={stats}
          totalEbooks={filteredEbooks.length}
          favoritesCount={favorites.size}
        />

        {/* Filtros */}
        <div className="mb-8">
          <EbookFilters
            filters={filters}
            onFilterChange={setFilters}
            onClearFilters={() => setFilters({
              ...filters,
              search: '',
              author: '',
              language: '',
              yearFrom: null,
              yearTo: null,
            })}
          />
        </div>

        {/* Categorias rápidas */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setFilters(prev => ({ ...prev, category: cat.key as any }))}
              className={`
                group relative px-5 py-3 rounded-sm border-2 transition-all duration-300
                ${filters.category === cat.key
                  ? 'border-navy bg-navy text-white shadow-lg shadow-navy/20'
                  : 'border-gray-200 bg-white hover:border-navy/30 hover:shadow-md'
                }
              `}
            >
              <span className="text-xl mr-2">{cat.icon}</span>
              <span className="font-semibold">{cat.label}</span>
              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                filters.category === cat.key
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Botão refresh */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif text-navy">
            {filters.category === 'Todos' ? 'Acervo Completo' : filters.category}
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({filteredEbooks.length} {filteredEbooks.length === 1 ? 'obra' : 'obras'})
            </span>
          </h2>
          <button
            onClick={refresh}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-navy hover:bg-navy/5 rounded-sm transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Atualizar</span>
          </button>
        </div>

        {/* Error state */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-sm p-6 text-center mb-8">
            <p className="text-red-700 mb-3">{error}</p>
            <button
              onClick={refresh}
              className="px-4 py-2 bg-red-600 text-white rounded-sm hover:bg-red-700"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Grid de ebooks */}
        {loading && filteredEbooks.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <EbookSkeleton key={i} />
            ))}
          </div>
        ) : filteredEbooks.length === 0 ? (
          <EmptyState onClearFilters={() => setFilters(prev => ({ ...prev, search: '', author: '', category: 'Todos' }))} />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredEbooks.map((ebook, idx) => (
                  <motion.div
                    key={ebook.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <EbookCard
                      ebook={ebook}
                      onClick={() => setSelectedEbook(ebook)}
                      isFavorite={favorites.has(ebook.id)}
                      onToggleFavorite={() => toggleFavorite(ebook.id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Load more (se houver mais) */}
            {!loading && filteredEbooks.length < 50 && (
              <div className="text-center mt-12">
                <p className="text-gray-500 text-sm">
                  Mostrando {filteredEbooks.length} obras
                </p>
              </div>
            )}
          </>
        )}

        {/* Back to top */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-8 right-8 z-50 p-3 bg-navy text-white rounded-full shadow-lg hover:bg-navy/90 transition-colors"
            >
              <ChevronRight className="w-5 h-5 rotate-[-90deg]" />
            </motion.button>
          )}
        </AnimatePresence>
      </main>

      {/* Modal do ebook */}
      <AnimatePresence>
        {selectedEbook && (
          <EbookModal
            ebook={selectedEbook}
            onClose={() => setSelectedEbook(null)}
            isFavorite={favorites.has(selectedEbook.id)}
            onToggleFavorite={() => toggleFavorite(selectedEbook.id)}
            onRead={() => {
              // Navega para o leitor
              window.location.href = `/reader/${selectedEbook.id}`;
            }}
          />
        )}
      </AnimatePresence>
    </div>
    </>
  );
};

// Skeleton loader
const EbookSkeleton: React.FC = () => (
  <div className="bg-white rounded-sm border border-gray-100 overflow-hidden animate-pulse">
    <div className="h-80 bg-gradient-to-br from-gray-200 to-gray-300" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-3 bg-gray-200 rounded w-2/3" />
    </div>
  </div>
);

// Empty state
const EmptyState: React.FC<{ onClearFilters: () => void }> = ({ onClearFilters }) => (
  <div className="text-center py-20">
    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
    <h3 className="text-xl font-serif text-navy mb-2">Nenhum ebook encontrado</h3>
    <p className="text-gray-500 mb-6">Tente ajustar seus filtros ou busca.</p>
    <button
      onClick={onClearFilters}
      className="px-6 py-3 bg-navy text-white rounded-sm hover:bg-navy/90 transition-colors"
    >
      Limpar filtros
    </button>
  </div>
);

// ============================================
// APP PRINCIPAL
// ============================================
const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminPanel />
              </RequireAdmin>
            }
          />
          <Route path="/reader/:id" element={<OnlineReader />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

// HOC para admin
function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = useAuth();
  const isAdminEmail = user?.email?.toLowerCase().trim() === 'analista.ericksilva@gmail.com';

  if (!isAdmin && !isAdminEmail) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default App;
