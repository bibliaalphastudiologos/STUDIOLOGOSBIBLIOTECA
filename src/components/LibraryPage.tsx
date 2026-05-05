import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { DEMO_EBOOKS } from '../data/ebooks';
import { Ebook } from '../types';

const CATEGORIES = ['Todas', 'Teologia', 'Filosofia', 'Psicanálise', 'Literatura Brasileira'];
const LANGUAGES  = ['Todos', 'Português', 'Latim', 'Inglês', 'Grego', 'Francês', 'Alemão'];
const LEVELS     = ['Todos', 'Iniciante', 'Introdutório', 'Intermediário', 'Avançado'];
const SORT_OPTIONS = [
  { value: 'featured', label: 'Destaques' },
  { value: 'title',    label: 'Título A–Z' },
  { value: 'author',   label: 'Autor A–Z' },
  { value: 'new',      label: 'Mais Recentes' },
];

function getCoverGradient(theme: string, category: string) {
  const map: Record<string, string> = {
    'gold':          'linear-gradient(135deg, #1a1200 0%, #3d2c00 50%, #c9a227 100%)',
    'navy':          'linear-gradient(135deg, #0d1b2a 0%, #1a3a5c 100%)',
    'deep-purple':   'linear-gradient(135deg, #1a0a2e 0%, #3d1a6b 100%)',
    'forest':        'linear-gradient(135deg, #0a1f0a 0%, #1a4a1a 100%)',
    'crimson':       'linear-gradient(135deg, #1f0a0a 0%, #5c1a1a 100%)',
    'psycho-modern': 'linear-gradient(135deg, #0d1a2e 0%, #1a2e4a 100%)',
    'psycho-abstract':'linear-gradient(135deg, #1a0d2e 0%, #2e1a4a 100%)',
  };
  if (map[theme]) return map[theme];
  if (category === 'Teologia')            return 'linear-gradient(135deg, #1a1200 0%, #3d2c00 100%)';
  if (category === 'Filosofia')           return 'linear-gradient(135deg, #0d1b2a 0%, #1a3a5c 100%)';
  if (category === 'Psicanálise')         return 'linear-gradient(135deg, #1a0d2e 0%, #2e1a4a 100%)';
  if (category === 'Literatura Brasileira') return 'linear-gradient(135deg, #0a1f0a 0%, #1a4a1a 100%)';
  return 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)';
}

function BookCard({ ebook, index }: { ebook: Ebook; index: number }) {
  const navigate = useNavigate();
  const gradient = getCoverGradient(ebook.coverTheme, ebook.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.6) }}
      className="group cursor-pointer"
      onClick={() => navigate(`/ebook/${ebook.slug || ebook.id}`)}
    >
      {/* Cover */}
      <div className="relative overflow-hidden rounded-lg mb-3 shadow-lg"
        style={{ aspectRatio: '2/3', background: gradient }}>
        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)' }} />
        {/* Category badge */}
        <div className="absolute top-2 left-2">
          <span className="text-[9px] uppercase tracking-widest font-black px-2 py-0.5 rounded"
            style={{ background: 'rgba(201,162,39,0.9)', color: '#fff' }}>
            {ebook.category}
          </span>
        </div>
        {/* New badge */}
        {ebook.isNew && (
          <div className="absolute top-2 right-2">
            <span className="text-[9px] uppercase tracking-widest font-black px-2 py-0.5 rounded"
              style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>
              Novo
            </span>
          </div>
        )}
        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }}>
          <p className="text-white text-xs font-bold leading-tight line-clamp-2"
            style={{ fontFamily: 'Georgia, serif' }}>
            {ebook.title}
          </p>
          <p className="text-white/60 text-[10px] mt-0.5 truncate">{ebook.authorReference}</p>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ background: 'rgba(0,0,0,0.5)' }}>
          <span className="text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-lg"
            style={{ background: '#c9a227' }}>
            Ler Obra
          </span>
        </div>
      </div>
      {/* Info */}
      <div>
        <h3 className="text-navy text-xs font-bold leading-tight line-clamp-2 mb-0.5"
          style={{ fontFamily: 'Georgia, serif' }}>
          {ebook.title}
        </h3>
        <p className="text-navy/50 text-[10px] truncate">{ebook.authorReference?.split('(')[0]?.trim()}</p>
        {ebook.originalLanguage && ebook.originalLanguage !== 'Português' && (
          <p className="text-[9px] mt-0.5" style={{ color: '#c9a227' }}>
            🌐 {ebook.originalLanguage} · Tradução disponível
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function LibraryPage() {
  const navigate = useNavigate();
  const [search, setSearch]       = useState('');
  const [category, setCategory]   = useState('Todas');
  const [language, setLanguage]   = useState('Todos');
  const [level, setLevel]         = useState('Todos');
  const [sortBy, setSortBy]       = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage]           = useState(1);
  const PER_PAGE = 48;

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => { setPage(1); }, [search, category, language, level, sortBy]);

  const filtered = useMemo(() => {
    let list = [...DEMO_EBOOKS];
    if (category !== 'Todas')  list = list.filter(e => e.category === category);
    if (language !== 'Todos')  list = list.filter(e => e.originalLanguage === language || (language === 'Português' && !e.originalLanguage));
    if (level !== 'Todos')     list = list.filter(e => e.level === level);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(e =>
        e.title.toLowerCase().includes(q) ||
        (e.authorReference || '').toLowerCase().includes(q) ||
        (e.description || '').toLowerCase().includes(q) ||
        (e.tags || []).some(t => t.toLowerCase().includes(q))
      );
    }
    if (sortBy === 'title')    list.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
    else if (sortBy === 'author') list.sort((a, b) => (a.authorReference || '').localeCompare(b.authorReference || '', 'pt-BR'));
    else if (sortBy === 'new') list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    else list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return list;
  }, [search, category, language, level, sortBy]);

  const paginated = filtered.slice(0, page * PER_PAGE);
  const hasMore   = paginated.length < filtered.length;

  const stats = useMemo(() => ({
    total: DEMO_EBOOKS.length,
    byCategory: CATEGORIES.slice(1).map(c => ({ name: c, count: DEMO_EBOOKS.filter(e => e.category === c).length })),
    withTranslation: DEMO_EBOOKS.filter(e => e.originalLanguage && !e.originalLanguage.toLowerCase().includes('portugu')).length,
  }), []);

  return (
    <div className="min-h-screen bg-[#f9f9f7]">
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0d1b2a 0%, #1a2e4a 80%, #0d1b2a 100%)' }}
        className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs uppercase tracking-[0.4em] font-black mb-4" style={{ color: '#c9a227' }}>
              Estante Digital
            </div>
            <h1 className="text-white text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Biblioteca Studio Logos
            </h1>
            <p className="text-white/60 text-sm max-w-xl mx-auto">
              {stats.total}+ obras em domínio público — Teologia, Filosofia, Psicanálise e Literatura Brasileira.
              Leitura online exclusiva, sem downloads.
            </p>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.byCategory.map(c => (
              <button key={c.name}
                onClick={() => setCategory(c.name)}
                className="text-center p-3 rounded-xl transition-all hover:scale-105"
                style={{ background: category === c.name ? '#c9a227' : 'rgba(255,255,255,0.08)', color: '#fff' }}>
                <div className="text-xl font-black">{c.count}</div>
                <div className="text-xs opacity-70">{c.name}</div>
              </button>
            ))}
          </div>
          {/* Search */}
          <div className="relative max-w-2xl mx-auto">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por título, autor, tema..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' }}
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80">✕</button>
            )}
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{ background: category === c ? '#0d1b2a' : '#fff', color: category === c ? '#fff' : '#0d1b2a', border: '1px solid #0d1b2a20', boxShadow: category === c ? '0 2px 8px rgba(13,27,42,0.2)' : 'none' }}>
                {c}
              </button>
            ))}
          </div>
          <div className="flex-1" />
          {/* Sort */}
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg border focus:outline-none"
            style={{ borderColor: '#0d1b2a20', color: '#0d1b2a', background: '#fff' }}>
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {/* Advanced filters toggle */}
          <button onClick={() => setShowFilters(s => !s)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all"
            style={{ borderColor: showFilters ? '#c9a227' : '#0d1b2a20', color: showFilters ? '#c9a227' : '#0d1b2a', background: '#fff' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            Filtros
          </button>
        </div>

        {/* Advanced filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6">
              <div className="bg-white rounded-xl p-4 border flex flex-wrap gap-6" style={{ borderColor: '#0d1b2a10' }}>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-navy/40 mb-2">Idioma Original</div>
                  <div className="flex flex-wrap gap-2">
                    {LANGUAGES.map(l => (
                      <button key={l} onClick={() => setLanguage(l)}
                        className="px-2.5 py-1 rounded text-xs transition-all"
                        style={{ background: language === l ? '#0d1b2a' : '#f5f5f5', color: language === l ? '#fff' : '#0d1b2a' }}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-navy/40 mb-2">Nível</div>
                  <div className="flex flex-wrap gap-2">
                    {LEVELS.map(l => (
                      <button key={l} onClick={() => setLevel(l)}
                        className="px-2.5 py-1 rounded text-xs transition-all"
                        style={{ background: level === l ? '#0d1b2a' : '#f5f5f5', color: level === l ? '#fff' : '#0d1b2a' }}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-end">
                  <button onClick={() => { setCategory('Todas'); setLanguage('Todos'); setLevel('Todos'); setSearch(''); }}
                    className="text-xs px-3 py-1.5 rounded text-navy/50 hover:text-navy transition-colors underline">
                    Limpar filtros
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-xs text-navy/40">
            {filtered.length === DEMO_EBOOKS.length
              ? `${filtered.length} obras na biblioteca`
              : `${filtered.length} obras encontradas`}
          </p>
          {stats.withTranslation > 0 && (
            <p className="text-xs" style={{ color: '#c9a227' }}>
              🌐 {stats.withTranslation} obras com tradução automática disponível
            </p>
          )}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">📚</div>
            <p className="text-navy/40 text-sm">Nenhuma obra encontrada para esta busca.</p>
            <button onClick={() => { setSearch(''); setCategory('Todas'); setLanguage('Todos'); setLevel('Todos'); }}
              className="mt-4 text-xs underline text-navy/40 hover:text-navy">Limpar filtros</button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {paginated.map((ebook, i) => (
                <BookCard key={ebook.id} ebook={ebook} index={i} />
              ))}
            </div>
            {hasMore && (
              <div className="text-center mt-10">
                <button onClick={() => setPage(p => p + 1)}
                  className="px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all hover:opacity-90"
                  style={{ background: '#0d1b2a', color: '#fff' }}>
                  Carregar mais ({filtered.length - paginated.length} restantes)
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* CTA Subscription */}
      <section style={{ background: 'linear-gradient(135deg, #0d1b2a 0%, #1a2e4a 100%)' }} className="py-16 px-6 mt-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-xs uppercase tracking-[0.4em] font-black mb-4" style={{ color: '#c9a227' }}>
            Studio Logos Premium
          </div>
          <h2 className="text-white text-2xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Acesso ilimitado a toda a biblioteca
          </h2>
          <p className="text-white/60 text-sm mb-6">
            Por apenas R$ 11/mês, leia quantas obras quiser, com marcadores, notas, destaques e tradução automática.
          </p>
          <a href="https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=bcf17285bfd64b70b1892692538db1ed"
            target="_blank" rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all hover:opacity-90"
            style={{ background: '#c9a227', color: '#fff' }}>
            Assinar por R$ 11/mês
          </a>
          <p className="text-white/30 text-xs mt-3">Cancele quando quiser · Acesso imediato</p>
        </div>
      </section>
    </div>
  );
}
