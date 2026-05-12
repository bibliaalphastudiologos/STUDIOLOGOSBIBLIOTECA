import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { DEMO_EBOOKS } from '../data/ebooks';
import { Ebook, PAYMENT_LINKS } from '../types';
import { getEditorialCoverImageForText } from '../lib/coverArt';

const CATEGORIES = ['Todas', 'Teologia', 'Filosofia', 'Psicanálise', 'Literatura Brasileira'];
const LANGUAGES  = ['Todos', 'Português', 'Latim', 'Inglês', 'Grego', 'Hebraico', 'Francês', 'Alemão'];
const LEVELS     = ['Todos', 'Iniciante', 'Introdutório', 'Intermediário', 'Avançado'];
const THEOLOGY_SUBCATS = ['Todas', 'Bíblia', 'Pais da Igreja', 'Patrística', 'Escolástica', 'Reforma Protestante', 'Puritanos'];
const SORT_OPTIONS = [
  { value: 'featured', label: 'Destaques' },
  { value: 'title',    label: 'Título A–Z' },
  { value: 'author',   label: 'Autor A–Z' },
  { value: 'new',      label: 'Mais Recentes' },
];

const CAT_COLORS: Record<string, { bg: string; accent: string; badge: string }> = {
  'Teologia':           { bg: 'linear-gradient(135deg,#1a1200 0%,#3a2800 60%,#0d1b2a 100%)', accent: '#c9a227', badge: '#c9a227' },
  'Filosofia':          { bg: 'linear-gradient(135deg,#0d1b2a 0%,#1a3a5c 100%)', accent: '#7ba7d4', badge: '#7ba7d4' },
  'Psicanálise':        { bg: 'linear-gradient(135deg,#1a0d2e 0%,#2e1a4a 100%)', accent: '#c9a0e0', badge: '#c9a0e0' },
  'Literatura Brasileira': { bg: 'linear-gradient(135deg,#0a1f0a 0%,#1a4a1a 100%)', accent: '#7db87d', badge: '#7db87d' },
  'default':            { bg: 'linear-gradient(135deg,#11100e 0%,#23211d 100%)', accent: '#c9a227', badge: '#c9a227' },
};

function getCoverGradient(theme: string, category: string) {
  const m: Record<string,string> = {
    gold:         'linear-gradient(135deg,#1a1200 0%,#3d2c00 50%,#c9a227 100%)',
    navy:         'linear-gradient(135deg,#0d1b2a 0%,#1a3a5c 100%)',
    'deep-purple':'linear-gradient(135deg,#1a0a2e 0%,#3d1a6b 100%)',
    forest:       'linear-gradient(135deg,#0a1f0a 0%,#1a4a1a 100%)',
    crimson:      'linear-gradient(135deg,#1f0a0a 0%,#5c1a1a 100%)',
    burgundy:     'linear-gradient(135deg,#1a0808 0%,#4a1212 100%)',
  };
  if (m[theme]) return m[theme];
  const cat = CAT_COLORS[category] || CAT_COLORS.default;
  return cat.bg;
}

function SubcategoryBadge({ subcat }: { subcat: string }) {
  const colors: Record<string,string> = {
    'Bíblia': '#c9a227', 'Pais da Igreja': '#d4956a', 'Patrística': '#c9a227',
    'Escolástica': '#7db87d', 'Reforma Protestante': '#a07dd8', 'Puritanos': '#7ba7d4',
  };
  const c = colors[subcat] || '#c9a227';
  return (
    <span className="text-[8px] uppercase tracking-widest font-black px-1.5 py-0.5 rounded"
      style={{ background: `${c}22`, color: c, border: `1px solid ${c}44` }}>
      {subcat}
    </span>
  );
}

function BookCard({ ebook, index }: { ebook: Ebook; index: number }) {
  const navigate = useNavigate();
  const gradient = getCoverGradient(ebook.coverTheme, ebook.category);
  const coverImage = getEditorialCoverImageForText(ebook.category, ebook.title, ebook.authorReference || '');
  const catColor = (CAT_COLORS[ebook.category] || CAT_COLORS.default).accent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.5) }}
      className="group cursor-pointer"
      onClick={() => navigate(`/ebook/${ebook.slug || ebook.id}`)}
    >
      {/* Cover */}
      <div className="relative overflow-hidden rounded-md mb-2.5 shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1"
        style={{ aspectRatio: '2/3', background: gradient }}>
        <img src={coverImage} alt="" loading="lazy" referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover opacity-80 saturate-[0.9] contrast-[1.08] transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(0,0,0,0.2),rgba(0,0,0,0.05) 35%,rgba(0,0,0,0.82))' }} />
        {/* Spine shimmer */}
        <div className="absolute top-0 left-0 w-[3px] h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(180deg, ${catColor}88, ${catColor}22)` }} />
        {/* Category badge */}
        <div className="absolute top-2 left-2">
          <span className="text-[8px] uppercase tracking-widest font-black px-1.5 py-0.5 rounded"
            style={{ background: `${catColor}cc`, color: '#fff' }}>
            {ebook.subcategory || ebook.category}
          </span>
        </div>
        {/* Public domain badge */}
        {(ebook.contentType === 'public_domain' || ebook.contentTypeLabel === 'public_domain') && (
          <div className="absolute top-2 right-2">
            <span className="text-[7px] uppercase tracking-widest font-black px-1.5 py-0.5 rounded"
              style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.18)' }}>
              DP
            </span>
          </div>
        )}
        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-2.5">
          <p className="text-white text-[11px] font-bold leading-tight line-clamp-2" style={{ fontFamily: 'Georgia, serif' }}>
            {ebook.title}
          </p>
          <p className="text-white/55 text-[9px] mt-0.5 truncate">
            {(ebook.authorReference || '').split('(')[0].trim()}
          </p>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-250"
          style={{ background: 'rgba(0,0,0,0.52)' }}>
          <span className="text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded"
            style={{ background: catColor }}>
            Ler Obra
          </span>
        </div>
      </div>
      {/* Meta */}
      <div className="px-0.5">
        <h3 className="text-[#151411] text-[11px] font-bold leading-snug line-clamp-2 mb-0.5" style={{ fontFamily: 'Georgia, serif' }}>
          {ebook.title}
        </h3>
        <p className="text-[#151411]/45 text-[9px] truncate">
          {(ebook.authorReference || '').split('(')[0].trim()}
        </p>
        {ebook.originalLanguage && !/portugu/i.test(ebook.originalLanguage) && (
          <p className="text-[8px] mt-0.5 opacity-60" style={{ color: catColor }}>
            {ebook.originalLanguage}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function LibraryPage() {
  const navigate = useNavigate();
  const [search, setSearch]         = useState('');
  const [category, setCategory]     = useState('Todas');
  const [subcat, setSubcat]         = useState('Todas');
  const [language, setLanguage]     = useState('Todos');
  const [level, setLevel]           = useState('Todos');
  const [sortBy, setSortBy]         = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage]             = useState(1);
  const PER_PAGE = 48;

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => { setPage(1); setSubcat('Todas'); }, [category]);
  useEffect(() => { setPage(1); }, [search, subcat, language, level, sortBy]);

  const filtered = useMemo(() => {
    let list = [...DEMO_EBOOKS];
    if (category !== 'Todas') list = list.filter(e => e.category === category);
    if (category === 'Teologia' && subcat !== 'Todas') list = list.filter(e => e.subcategory === subcat);
    if (language !== 'Todos') list = list.filter(e => e.originalLanguage === language || (language === 'Português' && !e.originalLanguage));
    if (level !== 'Todos') list = list.filter(e => e.level === level);
    if (search.trim()) {
      const q = search.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
      list = list.filter(e => {
        const haystack = `${e.title} ${e.authorReference||''} ${e.description||''} ${(e.tags||[]).join(' ')}`
          .toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
        return haystack.includes(q);
      });
    }
    if (sortBy === 'title')  list.sort((a,b) => a.title.localeCompare(b.title,'pt-BR'));
    else if (sortBy === 'author') list.sort((a,b) => (a.authorReference||'').localeCompare(b.authorReference||'','pt-BR'));
    else if (sortBy === 'new') list.sort((a,b) => (b.isNew?1:0)-(a.isNew?1:0));
    else list.sort((a,b) => (b.featured?1:0)-(a.featured?1:0));
    return list;
  }, [search, category, subcat, language, level, sortBy]);

  const paginated = filtered.slice(0, page * PER_PAGE);
  const hasMore   = paginated.length < filtered.length;

  const heroStyle = CAT_COLORS[category] || CAT_COLORS.default;

  const stats = useMemo(() => {
    const total = DEMO_EBOOKS.length;
    const byCategory = CATEGORIES.slice(1).map(c => ({
      name: c, count: DEMO_EBOOKS.filter(e => e.category === c).length
    }));
    const theologyBySubcat = THEOLOGY_SUBCATS.slice(1).map(s => ({
      name: s, count: DEMO_EBOOKS.filter(e => e.category === 'Teologia' && e.subcategory === s).length
    }));
    return { total, byCategory, theologyBySubcat };
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#f7f4ee' }}>

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden py-14 px-6 transition-all duration-700"
        style={{ background: heroStyle.bg }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }} />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[10px] uppercase tracking-[0.45em] font-black mb-3"
              style={{ color: heroStyle.accent }}>Biblioteca Studio Logos</p>
            <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight mb-4"
              style={{ fontFamily: 'Georgia, serif' }}>
              {category === 'Todas' ? 'Acervo Completo' : category}
            </h1>
            <p className="text-white/55 text-sm max-w-xl mx-auto leading-relaxed">
              {stats.total.toLocaleString('pt-BR')} obras · Teologia, Filosofia, Psicanálise e Literatura
              · Leitura integral online
            </p>
          </div>

          {/* Category stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-7">
            {stats.byCategory.map(c => {
              const cc = CAT_COLORS[c.name] || CAT_COLORS.default;
              return (
                <button key={c.name} onClick={() => setCategory(c.name)}
                  className="text-center p-3 rounded-xl border transition-all duration-200 hover:scale-[1.03]"
                  style={{
                    background: category === c.name ? cc.accent : 'rgba(255,255,255,0.07)',
                    borderColor: category === c.name ? cc.accent : 'rgba(255,255,255,0.1)',
                    color: '#fff',
                    boxShadow: category === c.name ? `0 4px 20px ${cc.accent}44` : 'none',
                  }}>
                  <div className="text-2xl font-black" style={{ color: category === c.name ? '#fff' : cc.accent }}>
                    {c.count.toLocaleString('pt-BR')}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider opacity-80 mt-0.5">{c.name}</div>
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative max-w-2xl mx-auto">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por título, autor, tema, idioma..."
              className="w-full pl-11 pr-10 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 transition-all"
              style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.18)',
                caretColor: heroStyle.accent }}
            />
            {search && (
              <button onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors text-lg leading-none">×</button>
            )}
          </div>
        </div>
      </section>

      {/* ─── THEOLOGY SUBCATEGORY PILLS ─── */}
      <AnimatePresence>
        {category === 'Teologia' && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} className="overflow-hidden"
            style={{ background: 'linear-gradient(135deg,#1a1200,#23180a)' }}>
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap gap-2 items-center">
              <span className="text-[9px] uppercase tracking-[0.3em] font-black mr-2" style={{ color: '#c9a22788' }}>Período:</span>
              {stats.theologyBySubcat.map(s => (
                <button key={s.name} onClick={() => setSubcat(subcat === s.name ? 'Todas' : s.name)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
                  style={{
                    background: subcat === s.name ? '#c9a227' : 'rgba(201,162,39,0.12)',
                    color: subcat === s.name ? '#fff' : '#c9a22799',
                    border: `1px solid ${subcat === s.name ? '#c9a227' : '#c9a22733'}`,
                  }}>
                  {s.name}
                  <span className="text-[9px] opacity-70">{s.count}</span>
                </button>
              ))}
              <button onClick={() => setSubcat('Todas')}
                className="ml-auto text-[9px] uppercase tracking-wider opacity-40 hover:opacity-70 text-white transition-opacity">
                Ver todas
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FILTERS + GRID ─── */}
      <section className="max-w-6xl mx-auto px-4 py-7">

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-2.5 mb-5">
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  background: category === c ? '#11100e' : '#fff',
                  color: category === c ? '#fff' : '#11100e',
                  border: `1px solid ${category === c ? '#11100e' : '#11100e18'}`,
                  boxShadow: category === c ? '0 2px 10px rgba(17,16,14,0.18)' : 'none',
                }}>
                {c}
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg border bg-white focus:outline-none cursor-pointer"
            style={{ borderColor: '#11100e18', color: '#11100e' }}>
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <button onClick={() => setShowFilters(s => !s)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all bg-white"
            style={{ borderColor: showFilters ? '#c9a227' : '#11100e18', color: showFilters ? '#c9a227' : '#11100e' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            Filtros avançados
          </button>
        </div>

        {/* Advanced filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-5">
              <div className="bg-white rounded-2xl p-4 border flex flex-wrap gap-6" style={{ borderColor: '#11100e0a' }}>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-black/35 mb-2">Idioma Original</div>
                  <div className="flex flex-wrap gap-1.5">
                    {LANGUAGES.map(l => (
                      <button key={l} onClick={() => setLanguage(l)}
                        className="px-2.5 py-1 rounded text-xs transition-all"
                        style={{ background: language === l ? '#11100e' : '#f5f5f3', color: language === l ? '#fff' : '#11100e' }}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-black/35 mb-2">Nível</div>
                  <div className="flex flex-wrap gap-1.5">
                    {LEVELS.map(l => (
                      <button key={l} onClick={() => setLevel(l)}
                        className="px-2.5 py-1 rounded text-xs transition-all"
                        style={{ background: level === l ? '#11100e' : '#f5f5f3', color: level === l ? '#fff' : '#11100e' }}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-end">
                  <button onClick={() => { setCategory('Todas'); setSubcat('Todas'); setLanguage('Todos'); setLevel('Todos'); setSearch(''); }}
                    className="text-xs px-3 py-1.5 rounded underline text-black/40 hover:text-black transition-colors">
                    Limpar todos os filtros
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-[11px] text-black/40 font-medium">
            {filtered.length === DEMO_EBOOKS.length
              ? `${filtered.length.toLocaleString('pt-BR')} obras na biblioteca`
              : `${filtered.length.toLocaleString('pt-BR')} obras encontradas`}
            {(language !== 'Todos' || level !== 'Todos' || subcat !== 'Todas') && (
              <button onClick={() => { setLanguage('Todos'); setLevel('Todos'); setSubcat('Todas'); }}
                className="ml-2 underline hover:text-black transition-colors">limpar</button>
            )}
          </p>
          <p className="text-[10px]" style={{ color: '#c9a227' }}>
            {DEMO_EBOOKS.filter(e => e.originalLanguage && !/portugu/i.test(e.originalLanguage)).length.toLocaleString('pt-BR')} obras em idioma original com tradução disponível
          </p>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-5">📚</div>
            <p className="text-black/40 text-sm mb-4">Nenhuma obra encontrada para esta busca.</p>
            <button onClick={() => { setSearch(''); setCategory('Todas'); setLanguage('Todos'); setLevel('Todos'); setSubcat('Todas'); }}
              className="text-xs underline text-black/40 hover:text-black transition-colors">
              Limpar filtros
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3 md:gap-4">
              {paginated.map((ebook, i) => (
                <BookCard key={ebook.id} ebook={ebook} index={i} />
              ))}
            </div>
            {hasMore && (
              <div className="text-center mt-10">
                <button onClick={() => setPage(p => p + 1)}
                  className="px-8 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all hover:opacity-90 hover:-translate-y-0.5"
                  style={{ background: '#11100e', color: '#fff' }}>
                  Carregar mais
                  <span className="ml-2 opacity-55 font-normal">
                    ({(filtered.length - paginated.length).toLocaleString('pt-BR')} restantes)
                  </span>
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 px-6 mt-4"
        style={{ background: 'linear-gradient(135deg,#0d1b2a 0%,#1a2e4a 100%)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] font-black mb-4" style={{ color: '#c9a227' }}>
            Studio Logos Premium
          </p>
          <h2 className="text-white text-2xl font-bold mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            Acesso ilimitado a toda a biblioteca
          </h2>
          <p className="text-white/55 text-sm mb-6 leading-relaxed">
            Leia as {stats.total.toLocaleString('pt-BR')} obras com marcadores, notas, destaques e tradução automática por apenas R$ 19/mês.
          </p>
          <a href={PAYMENT_LINKS.studioLogosMonthly} target="_blank" rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: '#c9a227', color: '#fff' }}>
            Assinar por R$ 19/mês
          </a>
          <p className="text-white/25 text-xs mt-3">Cancelamento a qualquer momento · Sem vínculo</p>
        </div>
      </section>
    </div>
  );
}
