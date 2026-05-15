// src/components/PublicDomainSection.tsx
// Seção de obras de domínio público: literatura e gramática portuguesa
// Integra ebooks estáticos + busca dinâmica via Gutendex API

import { useState, useEffect, useCallback } from 'react';
import { BookOpen, Search, ExternalLink, GraduationCap, Globe, Library, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Ebook } from '../types';
import portugueseLiteratureGrammarBooks from '../data/portugueseLiteratureGrammar';
import { fetchPortugueseBooksCached, gutendexToEbook } from '../services/gutendexService';

type FilterCategory = 'todos' | 'literatura-brasileira' | 'literatura-portuguesa' | 'gramatica' | 'acervos' | 'gutenberg';

interface PublicDomainSectionProps {
  onReadEbook?: (ebook: Ebook) => void;
}

const CATEGORY_LABELS: Record<FilterCategory, string> = {
  'todos': 'Todos',
  'literatura-brasileira': 'Literatura Brasileira',
  'literatura-portuguesa': 'Literatura Portuguesa',
  'gramatica': 'Gramática',
  'acervos': 'Acervos Públicos',
  'gutenberg': 'Project Gutenberg',
};

function getCategoryFilter(ebook: Ebook): FilterCategory {
  if (ebook.isFromGutendex) return 'gutenberg';
  const sub = ebook.subcategory?.toLowerCase() ?? '';
  if (sub.includes('gramát') || sub.includes('acervo') || sub.includes('fontes')) {
    if (sub.includes('acervo') || sub.includes('fontes')) return 'acervos';
    return 'gramatica';
  }
  if (ebook.category === 'Literatura Portuguesa') return 'literatura-portuguesa';
  return 'literatura-brasileira';
}

function EbookCard({ ebook, onRead }: { ebook: Ebook; onRead?: (e: Ebook) => void }) {
  const coverColors: Record<string, string> = {
    'literature-sepia': 'from-amber-800 to-amber-600',
    'literature-dark': 'from-slate-800 to-slate-600',
    'literature-green': 'from-emerald-800 to-emerald-600',
    'literature-red': 'from-red-800 to-red-600',
    'literature-navy': 'from-indigo-900 to-indigo-700',
    'nature-amber': 'from-amber-700 to-yellow-600',
    'nature-green': 'from-green-800 to-green-600',
    'poetry-gold': 'from-yellow-700 to-amber-500',
    'grammar-blue': 'from-blue-800 to-blue-600',
    'gov-green': 'from-green-700 to-teal-600',
    'gov-blue': 'from-blue-700 to-cyan-600',
    'literature-desert': 'from-orange-700 to-amber-700',
  };
  const gradient = coverColors[ebook.coverTheme] ?? 'from-indigo-800 to-indigo-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
    >
      {/* Cover */}
      <div className={`bg-gradient-to-br ${gradient} p-5 flex items-center justify-center min-h-[100px] relative`}>
        <BookOpen className="w-10 h-10 text-white/80" />
        {ebook.isFeatured && (
          <span className="absolute top-2 right-2 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
            Destaque
          </span>
        )}
        {ebook.isFromGutendex && (
          <span className="absolute top-2 left-2 bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
            Gutenberg
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div>
          <p className="text-xs text-indigo-500 font-semibold uppercase tracking-wide">{ebook.category}</p>
          <h3 className="font-bold text-slate-800 text-sm leading-snug mt-0.5 line-clamp-2">{ebook.title}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{ebook.authorReference}</p>
        </div>

        <p className="text-xs text-slate-600 line-clamp-3 flex-1">{ebook.description}</p>

        <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
          <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">Domínio Público</span>
          <span className="bg-slate-100 px-2 py-0.5 rounded-full">{ebook.level}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-2">
          {onRead && (
            <button
              onClick={() => onRead(ebook)}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-2 rounded-xl flex items-center justify-center gap-1 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" /> Ler
            </button>
          )}
          {ebook.sourceUrl && (
            <a
              href={ebook.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-3 py-2 rounded-xl flex items-center justify-center gap-1 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Fonte
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function PublicDomainSection({ onReadEbook }: PublicDomainSectionProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterCategory>('todos');
  const [gutendexBooks, setGutendexBooks] = useState<Ebook[]>([]);
  const [gutendexLoading, setGutendexLoading] = useState(false);
  const [gutendexSearch, setGutendexSearch] = useState('');
  const [showGutendex, setShowGutendex] = useState(false);

  // Fetch Gutendex on demand
  const fetchGutendex = useCallback(async (query?: string) => {
    setGutendexLoading(true);
    try {
      const data = await fetchPortugueseBooksCached(query ? { search: query } : undefined);
      setGutendexBooks(data.results.slice(0, 12).map(gutendexToEbook));
    } catch {
      // silently fail
    } finally {
      setGutendexLoading(false);
    }
  }, []);

  useEffect(() => {
    if (showGutendex) fetchGutendex(gutendexSearch || undefined);
  }, [showGutendex, gutendexSearch, fetchGutendex]);

  const staticFiltered = portugueseLiteratureGrammarBooks.filter(ebook => {
    const matchSearch = !search ||
      ebook.title.toLowerCase().includes(search.toLowerCase()) ||
      ebook.authorReference.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'todos' || filter === 'gutenberg' || getCategoryFilter(ebook) === filter;
    return matchSearch && matchFilter;
  });

  const allDisplayed = filter === 'gutenberg' ? gutendexBooks : staticFiltered;

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Library className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-black text-slate-800">Domínio Público</h2>
            </div>
            <p className="text-slate-500 text-sm max-w-xl">
              Literatura brasileira e portuguesa, gramática e acervos públicos — todos gratuitos e de livre acesso.
              Fontes: Project Gutenberg, Wikisource, BNDigital, Portal MEC.
            </p>
            <div className="flex items-center gap-3 mt-3 text-xs text-slate-500">
              <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5 text-green-500" /> Fontes oficiais verificadas</span>
              <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5 text-indigo-500" /> Focado no ensino médio e ENEM</span>
              <span className="flex items-center gap-1"><Download className="w-3.5 h-3.5 text-amber-500" /> Download gratuito</span>
            </div>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar obra ou autor..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 w-64"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(Object.keys(CATEGORY_LABELS) as FilterCategory[]).map(cat => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                if (cat === 'gutenberg') setShowGutendex(true);
              }}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                filter === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* Gutendex live search bar */}
        {filter === 'gutenberg' && (
          <div className="flex gap-3 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar no Project Gutenberg..."
                value={gutendexSearch}
                onChange={e => setGutendexSearch(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && fetchGutendex(gutendexSearch)}
                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 w-full"
              />
            </div>
            <button
              onClick={() => fetchGutendex(gutendexSearch)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
            >
              Buscar
            </button>
            <a
              href="https://www.gutenberg.org/browse/languages/pt"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-50 flex items-center gap-2 transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> Ver todos
            </a>
          </div>
        )}

        {/* Loading */}
        {gutendexLoading && (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Grid */}
        {!gutendexLoading && (
          <>
            {allDisplayed.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>Nenhuma obra encontrada para "{search}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {allDisplayed.map((ebook, i) => (
                  <motion.div
                    key={ebook.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <EbookCard ebook={ebook} onRead={onReadEbook} />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Sources footer */}
            <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-xs text-slate-500 text-center">
                <strong>Fontes:</strong>{' '}
                <a href="https://www.gutenberg.org" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Project Gutenberg</a>
                {' · '}
                <a href="https://pt.wikisource.org" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Wikisource PT</a>
                {' · '}
                <a href="https://bndigital.bn.gov.br" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">BNDigital</a>
                {' · '}
                <a href="http://www.dominiopublico.gov.br" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Portal MEC</a>
                {' · '}
                <a href="https://archive.org" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Internet Archive</a>
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default PublicDomainSection;
