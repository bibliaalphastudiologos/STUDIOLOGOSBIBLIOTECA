import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DEMO_EBOOKS } from '../data/ebooks';
import { useAuth } from '../lib/AuthContext';
import { PAYMENT_LINKS } from '../types';

function getCoverGradient(theme: string, category: string) {
  const map: Record<string, string> = {
    'gold':           'linear-gradient(135deg, #1a1200 0%, #3d2c00 50%, #c9a227 100%)',
    'navy':           'linear-gradient(135deg, #0d1b2a 0%, #1a3a5c 100%)',
    'deep-purple':    'linear-gradient(135deg, #1a0a2e 0%, #3d1a6b 100%)',
    'forest':         'linear-gradient(135deg, #0a1f0a 0%, #1a4a1a 100%)',
    'crimson':        'linear-gradient(135deg, #1f0a0a 0%, #5c1a1a 100%)',
    'psycho-modern':  'linear-gradient(135deg, #0d1a2e 0%, #1a2e4a 100%)',
    'psycho-abstract':'linear-gradient(135deg, #1a0d2e 0%, #2e1a4a 100%)',
  };
  if (map[theme]) return map[theme];
  if (category === 'Teologia')             return 'linear-gradient(135deg, #1a1200 0%, #3d2c00 100%)';
  if (category === 'Filosofia')            return 'linear-gradient(135deg, #0d1b2a 0%, #1a3a5c 100%)';
  if (category === 'Psicanálise')          return 'linear-gradient(135deg, #1a0d2e 0%, #2e1a4a 100%)';
  if (category === 'Literatura Brasileira') return 'linear-gradient(135deg, #0a1f0a 0%, #1a4a1a 100%)';
  return 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)';
}

export default function EbookDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate  = useNavigate();
  const ebook = DEMO_EBOOKS.find(e => e.slug === slug || e.id === slug);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!ebook) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f9f7]">
        <div className="text-center">
          <div className="text-5xl mb-4">📚</div>
          <p className="text-navy font-serif text-xl mb-4">Obra não encontrada.</p>
          <button onClick={() => navigate('/biblioteca')}
            className="px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest"
            style={{ background: '#0d1b2a', color: '#fff' }}>
            Voltar à Biblioteca
          </button>
        </div>
      </div>
    );
  }

  const gradient = getCoverGradient(ebook.coverTheme, ebook.category);
  const canRead  = true; // Acesso liberado conforme solicitado
  const hasTranslation = ebook.originalLanguage && !ebook.originalLanguage.toLowerCase().includes('portugu');
  const tags = ebook.tags ?? [];

  // Related books (same category, excluding current)
  const related = DEMO_EBOOKS
    .filter(e => e.category === ebook.category && e.id !== ebook.id && e.chapters?.length > 0)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-[#f9f9f7]">
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0d1b2a 0%, #1a2e4a 100%)' }} className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-8">
            <Link to="/" className="hover:text-white/70 transition-colors">Início</Link>
            <span>/</span>
            <Link to="/biblioteca" className="hover:text-white/70 transition-colors">Biblioteca</Link>
            <span>/</span>
            <Link to={`/${ebook.category.toLowerCase().replace('é', 'e').replace(' ', '-')}`}
              className="hover:text-white/70 transition-colors">{ebook.category}</Link>
            <span>/</span>
            <span className="text-white/60 truncate">{ebook.title}</span>
          </nav>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Cover */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
              className="shrink-0 w-36 md:w-48">
              <div className="rounded-xl shadow-2xl overflow-hidden" style={{ aspectRatio: '2/3', background: gradient }}>
                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                  <div className="text-white/20 text-5xl mb-3">📖</div>
                  <p className="text-white text-xs font-bold leading-tight" style={{ fontFamily: 'Georgia, serif' }}>{ebook.title}</p>
                  <p className="text-white/50 text-[10px] mt-1">{ebook.authorReference?.split('(')[0]?.trim()}</p>
                </div>
              </div>
              {/* Badges */}
              <div className="flex flex-wrap gap-1 mt-3">
                <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-black"
                  style={{ background: '#c9a22720', color: '#c9a227' }}>
                  Obra Clássica
                </span>
                {hasTranslation && (
                  <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-black"
                    style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
                    🌐 Tradução
                  </span>
                )}
              </div>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="flex-1 min-w-0">
              <div className="text-xs uppercase tracking-[0.3em] font-black mb-2" style={{ color: '#c9a227' }}>
                {ebook.category} · {ebook.subcategory}
              </div>
              <h1 className="text-white text-2xl md:text-3xl font-bold mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                {ebook.displayTitle || ebook.title}
              </h1>
              {ebook.subtitle && (
                <p className="text-white/60 text-sm mb-4 italic">{ebook.subtitle}</p>
              )}

              {/* Meta */}
              <div className="flex flex-wrap gap-4 mb-5 text-xs text-white/50">
                <span>✍️ {ebook.authorReference}</span>
                {ebook.workReference && <span>📅 {ebook.workReference}</span>}
                {ebook.originalLanguage && <span>🗣 {ebook.originalLanguage}</span>}
                <span>⏱ {ebook.readingTime}</span>
                <span>📖 {ebook.chapters?.length || 0} capítulos</span>
                <span>📊 {ebook.level}</span>
              </div>

              {/* Description */}
              <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-2xl">
                {ebook.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <button onClick={() => navigate(`/leitor/${ebook.id}`)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all hover:opacity-90"
                  style={{ background: '#c9a227', color: '#fff' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                  Ler Agora
                </button>
                <button onClick={() => navigate('/biblioteca')}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
                  style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                  Biblioteca
                </button>
              </div>

              {/* Translation notice */}
              {hasTranslation && (
                <div className="mt-4 flex items-center gap-2 text-xs" style={{ color: '#c9a227' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 8l6 6M4 14l6-6 2-3M2 5h7M7 2v3M22 22l-5-10-5 10M14 18h6"/>
                  </svg>
                  Obra em {ebook.originalLanguage} · Tradução automática para português disponível no leitor
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="md:col-span-2 space-y-8">
            {/* What you'll learn */}
            {ebook.learn?.length > 0 && (
              <div>
                <h2 className="text-navy text-lg font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                  O que você vai aprender
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {ebook.learn.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border"
                      style={{ borderColor: '#0d1b2a10' }}>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: '#c9a22720' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <span className="text-navy/70 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Table of Contents */}
            {ebook.chapters?.length > 0 && (
              <div>
                <h2 className="text-navy text-lg font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                  Sumário — {ebook.chapters.length} capítulos
                </h2>
                <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: '#0d1b2a10' }}>
                  {ebook.chapters.map((ch, i) => (
                    <div key={ch.id}
                      className="flex items-center gap-3 px-4 py-3 border-b last:border-0 hover:bg-navy/5 transition-colors cursor-pointer"
                      style={{ borderColor: '#0d1b2a08' }}
                      onClick={() => canRead ? navigate(`/leitor/${ebook.id}`) : undefined}>
                      <span className="text-xs font-black opacity-30 w-6 text-right shrink-0">{i + 1}</span>
                      <span className="text-navy/80 text-sm flex-1">{ch.title}</span>
                      {!canRead && i > 0 && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
                {!canRead && (
                  <p className="text-xs text-navy/40 mt-2 text-center">
                    🔒 Assine para desbloquear todos os capítulos
                  </p>
                )}
              </div>
            )}

            {/* Recommended for */}
            {ebook.recommendedFor?.length > 0 && (
              <div>
                <h2 className="text-navy text-lg font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                  Recomendado para
                </h2>
                <div className="flex flex-wrap gap-2">
                  {ebook.recommendedFor.map((r, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{ background: '#0d1b2a10', color: '#0d1b2a' }}>
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Editorial notice */}
            {ebook.editorialNotice && (
              <div className="p-4 rounded-xl text-xs leading-relaxed" style={{ background: '#c9a22710', color: '#8a6e1a', border: '1px solid #c9a22730' }}>
                <strong>Nota Editorial:</strong> {ebook.editorialNotice}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Quick info */}
            <div className="bg-white rounded-xl border p-5 space-y-3" style={{ borderColor: '#0d1b2a10' }}>
              <h3 className="text-navy text-sm font-bold">Informações da Obra</h3>
              {[
                { label: 'Categoria', value: ebook.category },
                { label: 'Subcategoria', value: ebook.subcategory },
                { label: 'Nível', value: ebook.level },
                { label: 'Tempo de Leitura', value: ebook.readingTime },
                { label: 'Idioma Original', value: ebook.originalLanguage || 'Português' },
                { label: 'Capítulos', value: `${ebook.chapters?.length || 0}` },
                { label: 'Status', value: 'Obra Clássica' },
                { label: 'Acesso', value: 'Somente Online' },
              ].map(item => (
                <div key={item.label} className="flex justify-between gap-2 text-xs">
                  <span className="text-navy/40">{item.label}</span>
                  <span className="text-navy/80 font-medium text-right">{item.value}</span>
                </div>
              ))}
              {ebook.translator && (
                <div className="flex justify-between gap-2 text-xs">
                  <span className="text-navy/40">Tradução</span>
                  <span className="text-navy/80 font-medium text-right text-[10px]">{ebook.translator}</span>
                </div>
              )}
            </div>

            {/* CTA box */}
            {!canRead && (
              <div className="rounded-xl p-5 text-center" style={{ background: 'linear-gradient(135deg, #0d1b2a 0%, #1a2e4a 100%)' }}>
                <div className="text-xs uppercase tracking-widest font-black mb-2" style={{ color: '#c9a227' }}>Premium</div>
                <div className="text-white text-sm font-bold mb-1">Acesso Completo</div>
                <div className="text-white/50 text-xs mb-4">R$ 47,00 · 1 ano de acesso</div>
                <a href={PAYMENT_LINKS.studioLogosMonthly} target="_blank" rel="noopener noreferrer"
                  className="block w-full py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all hover:opacity-90"
                  style={{ background: '#c9a227', color: '#fff' }}>
                  Assinar Agora
                </a>
              </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div>
                <h3 className="text-navy text-sm font-bold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded"
                      style={{ background: '#0d1b2a08', color: '#0d1b2a60' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related books */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-navy text-xl font-bold mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              Mais em {ebook.category}
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {related.map((rel, i) => (
                <motion.div key={rel.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="cursor-pointer group"
                  onClick={() => navigate(`/ebook/${rel.slug || rel.id}`)}>
                  <div className="rounded-lg overflow-hidden shadow mb-2"
                    style={{ aspectRatio: '2/3', background: getCoverGradient(rel.coverTheme, rel.category) }}>
                    <div className="w-full h-full flex items-end p-2"
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }}>
                      <p className="text-white text-[10px] font-bold leading-tight line-clamp-2"
                        style={{ fontFamily: 'Georgia, serif' }}>{rel.title}</p>
                    </div>
                  </div>
                  <p className="text-navy/60 text-[10px] truncate">{rel.authorReference?.split('(')[0]?.trim()}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
