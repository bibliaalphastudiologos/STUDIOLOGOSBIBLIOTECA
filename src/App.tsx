import React, { useState, useMemo, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/AuthContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EbookCard } from './components/EbookCard';
import { EbookModal } from './components/EbookModal';
import { AdminPanel } from './components/AdminPanel';
import { CategoryPage } from './components/CategoryPage';
import { NotFoundPage } from './components/NotFoundPage';
import OnlineReader from './components/OnlineReader';
import { FeaturedSection } from './components/FeaturedSection';
import { Footer } from './components/Footer';
import { DEMO_EBOOKS } from './data/ebooks';
import { Ebook, PAYMENT_LINKS } from './types';
import LibraryPage from './components/LibraryPage';
import EbookDetailPage from './components/EbookDetailPage';
import { Search, BookOpen, ScrollText, ChevronRight, Shield, Crown, ArrowRight } from 'lucide-react';
import { signInWithGoogle, auth } from './lib/firebase';
import { motion, AnimatePresence } from 'motion/react';

// ─── HomePage ────────────────────────────────────────────────────────────────
const HomePage: React.FC = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [selectedEbook, setSelectedEbook] = useState<Ebook | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [filter, setFilter] = useState<'Todos' | 'Teologia' | 'Filosofia' | 'Psicanálise'>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [contentTypeFilter, setContentTypeFilter] = useState<'all' | 'public_domain' | 'synthesis'>('all');
  const [lastReadEbook, setLastReadEbook] = useState<Ebook | null>(null);

  React.useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 1000);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    const lastId = localStorage.getItem('last_read_ebook');
    if (lastId) {
      const found = DEMO_EBOOKS.find(e => e.id === lastId);
      if (found) setLastReadEbook(found);
    }
  }, []);

  const scrollToBiblioteca = useCallback((delay = 100) => {
    setTimeout(() => document.getElementById('biblioteca')?.scrollIntoView({ behavior: 'smooth' }), delay);
  }, []);

  const handleEbookClick = useCallback(async (ebook: Ebook) => {
    if (user) {
      setSelectedEbook(ebook);
    } else {
      try { await signInWithGoogle(); } catch {}
    }
  }, [user]);

  const filteredEbooks = useMemo(() => DEMO_EBOOKS.filter(e => {
    const matchesFilter = filter === 'Todos' || e.category === filter;
    const matchesSearch = !searchTerm ||
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.authorReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLetter = !selectedLetter || e.title.startsWith(selectedLetter);
    const matchesType = contentTypeFilter === 'all' ||
      (contentTypeFilter === 'public_domain' && e.contentTypeLabel === 'public_domain') ||
      (contentTypeFilter === 'synthesis' && e.contentTypeLabel !== 'public_domain');
    return matchesFilter && matchesSearch && matchesLetter && matchesType;
  }), [filter, searchTerm, selectedLetter, contentTypeFilter]);

  return (
    <div className="min-h-screen bg-background grain">
      <Hero />

      {/* ── Continuar Leitura ── */}
      <AnimatePresence>
        {lastReadEbook && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-navy border-b border-white/5 py-8"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-6">
                <div className="w-12 h-16 bg-gold/10 rounded-sm flex items-center justify-center overflow-hidden border border-white/5">
                  {lastReadEbook.cover
                    ? <img src={lastReadEbook.cover} alt="" className="w-full h-full object-cover opacity-60" />
                    : <BookOpen className="w-6 h-6 text-gold" />}
                </div>
                <div>
                  <h3 className="text-[10px] font-black tracking-[0.5em] text-gold uppercase mb-1">CONTINUAR LEITURA</h3>
                  <p className="text-white text-lg font-serif">{lastReadEbook.title}</p>
                </div>
              </div>
              <Link
                to={`/leitor/${lastReadEbook.id}`}
                className="flex items-center space-x-3 px-8 py-3 bg-gold text-navy rounded-sm text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all shadow-xl group"
              >
                <ScrollText className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Retomar de Onde Parei</span>
              </Link>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── Diferenciais ── */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-white border-y border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Shield, title: 'CURAÇÃO RIGOROSA', desc: 'Seleções exatas do pensamento clássico e contemporâneo.' },
              { icon: Crown, title: 'ACESSO EXCLUSIVO', desc: 'Sua biblioteca particular com as maiores mentes da história.' },
              { icon: BookOpen, title: 'SÍNTESES ÚNICAS', desc: 'Conteúdo autoral desenvolvido para o máximo aproveitamento.' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-sm bg-[#f4f4f2] flex items-center justify-center mb-6 border border-gray-100 group-hover:bg-black group-hover:text-white transition-all duration-500 shadow-sm">
                  <f.icon className="w-6 h-6 text-navy group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-[11px] uppercase tracking-[0.4em] font-black text-navy mb-4">{f.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Trilhas do Saber ── */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20">
            <div className="max-w-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-px bg-gold" />
                <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-black">CURADORIA ACADÊMICA</span>
              </div>
              <h2 className="font-serif text-5xl md:text-7xl text-navy leading-tight mb-8">Trilhas do Saber</h2>
              <p className="text-muted text-lg font-serif italic">Jornadas estruturadas para uma compreensão profunda da condição humana.</p>
            </div>
          </div>

          <div className="flex overflow-x-auto pb-12 gap-8 no-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            {[
              { title: 'Fundamentos da Patrística', desc: 'Dos Padres Apostólicos a Santo Agostinho: a base do pensamento cristão.', category: 'Teologia', count: '12 Estudos', image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800', path: '/teologia' },
              { title: 'O Sujeito no Espelho', desc: 'Aparelho psíquico, inconsciente e a estruturação do desejo em Freud e Lacan.', category: 'Psicanálise', count: '15 Estudos', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800', path: '/psicanalise' },
              { title: 'A Cidade e o Sagrado', desc: 'A interseção entre filosofia política e a teologia pública na modernidade.', category: 'Filosofia', count: '10 Estudos', image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=800', path: '/filosofia' },
              { title: 'Clínica do Mal-Estar', desc: 'Análise das patologias contemporâneas sob a ótica psicanalítica.', category: 'Psicanálise', count: '08 Estudos', image: 'https://images.unsplash.com/photo-1516035054744-d474c5209db5?q=80&w=800', path: '/psicanalise' },
            ].map((path, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="flex-shrink-0 w-[400px] group cursor-pointer"
                onClick={() => navigate(path.path)}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm mb-8 shadow-2xl">
                  <img src={path.image} alt={path.title} referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-navy/60 group-hover:bg-navy/20 transition-all duration-700" />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-white/10 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-[0.4em] border border-white/20">{path.category}</span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-[10px] text-gold font-black uppercase tracking-[0.4em] mb-2">{path.count}</div>
                    <h3 className="font-serif text-3xl text-white leading-tight">{path.title}</h3>
                  </div>
                </div>
                <p className="text-muted text-sm leading-relaxed line-clamp-2 pr-8 group-hover:text-navy transition-colors">{path.desc}</p>
                <div className="mt-6 flex items-center space-x-3 text-[10px] font-black text-gold uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
                  <span>Iniciar Jornada</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mestrado dos Séculos ── */}
      <section className="py-32 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] grain pointer-events-none" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <div className="inline-flex items-center space-x-3 mb-6">
              <div className="w-8 h-px bg-gold" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60">AUTORIDADES DO PENSAMENTO</span>
              <div className="w-8 h-px bg-gold" />
            </div>
            <h2 className="font-serif text-5xl md:text-7xl text-white leading-tight">O Mestrado dos Séculos</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { name: 'Agostinho', role: 'Patrística', img: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=400', cat: 'Teologia' },
              { name: 'Freud', role: 'Psicanálise', img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=400', cat: 'Psicanalise' },
              { name: 'Calvino', role: 'Teologia', img: 'https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?q=80&w=400', cat: 'Teologia' },
              { name: 'Platão', role: 'Filosofia', img: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=400', cat: 'Filosofia' },
              { name: 'Lacan', role: 'Psicanálise', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400', cat: 'Psicanalise' },
              { name: 'Lutero', role: 'Reforma', img: 'https://images.unsplash.com/photo-1533221300408-1751403324aa?q=80&w=400', cat: 'Teologia' },
            ].map((master, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="group flex flex-col items-center text-center cursor-pointer"
                onClick={() => {
                  setSearchTerm(master.name);
                  setSelectedLetter(null);
                  scrollToBiblioteca();
                }}
              >
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 border border-white/10 group-hover:border-gold transition-colors duration-500 shadow-2xl">
                  <img src={master.img} alt={master.name} referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-navy/40 group-hover:bg-transparent transition-colors" />
                </div>
                <h4 className="font-serif text-xl text-white mb-1">{master.name}</h4>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gold/60">{master.role}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Biblioteca Principal ── */}
      <section className="py-32 bg-[#f9f9f7]" id="biblioteca">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-px bg-black" />
                <span className="text-[10px] uppercase tracking-[0.4em] text-navy font-black">PLATAFORMA PREMIUM</span>
              </div>
              <h2 className="font-serif text-4xl md:text-6xl text-navy leading-tight">Escolha sua jornada.</h2>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="relative group w-full md:w-auto">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-navy transition-colors" />
                <input
                  type="text"
                  placeholder="Buscar obra ou autor..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full md:w-80 pl-14 pr-8 py-5 bg-white border border-border rounded-sm text-[11px] font-black uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-navy transition-all shadow-sm"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="flex flex-wrap gap-2 bg-white p-2 rounded-sm border border-border shadow-sm">
                  {[
                    { label: 'TUDO', value: 'Todos' },
                    { label: 'TEOLOGIA', value: 'Teologia' },
                    { label: 'FILOSOFIA', value: 'Filosofia' },
                    { label: 'PSICANÁLISE', value: 'Psicanálise' },
                  ].map(cat => (
                    <button key={cat.value}
                      onClick={() => { setFilter(cat.value as any); setSelectedLetter(null); scrollToBiblioteca(); }}
                      className={`px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-black transition-all duration-300 rounded-sm ${
                        filter === cat.value ? 'bg-black text-white' : 'text-muted bg-gray-50 hover:bg-black hover:text-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 bg-white p-2 rounded-sm border border-border shadow-sm">
                  {[
                    { label: 'Todos', value: 'all' },
                    { label: '📜 Dom. Público', value: 'public_domain' },
                    { label: '✍ Sínteses', value: 'synthesis' },
                  ].map(ct => (
                    <button key={ct.value}
                      onClick={() => setContentTypeFilter(ct.value as any)}
                      className={`px-4 py-2 text-[9px] uppercase tracking-widest font-black rounded-sm transition-all ${
                        contentTypeFilter === ct.value ? 'bg-navy text-white' : 'text-muted hover:bg-gray-100'
                      }`}
                    >
                      {ct.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {filteredEbooks.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-muted text-lg font-serif mb-4">Nenhuma obra encontrada.</p>
              <button onClick={() => { setSearchTerm(''); setFilter('Todos'); setSelectedLetter(null); setContentTypeFilter('all'); }}
                className="text-[10px] font-black uppercase tracking-widest text-navy border-b border-navy">
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredEbooks.map(ebook => (
                <EbookCard key={ebook.id} ebook={ebook} onClick={handleEbookClick} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Índice Alfabético ── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-5xl text-navy mb-4">Bibliográficas em Alpha</h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted font-black">NAVEGUE PELO ÍNDICE COMPLETO</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
              <button key={letter}
                onClick={() => { setSelectedLetter(selectedLetter === letter ? null : letter); scrollToBiblioteca(); }}
                className={`w-12 h-12 flex items-center justify-center font-serif text-lg border transition-all rounded-sm ${
                  selectedLetter === letter
                    ? 'bg-gold text-white border-gold shadow-lg scale-110'
                    : 'text-muted border-gray-100 hover:bg-black hover:text-white'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
          {selectedLetter && (
            <div className="text-center mt-8">
              <button onClick={() => setSelectedLetter(null)}
                className="text-[10px] font-black uppercase tracking-[0.3em] text-gold border-b border-gold pb-1">
                Limpar filtro: {selectedLetter}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Bíblia Alpha ── */}
      <section className="py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2d4a 50%, #0d1f36 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="text-[9px] font-black uppercase tracking-[0.6em] text-gold mb-4">PRODUTO ESPECIAL</div>
              <h2 className="font-serif text-4xl md:text-6xl text-white leading-tight mb-6">
                Bíblia Alpha<br/><span className="text-gold">Studio Logos</span>
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-8">
                Acesso exclusivo à edição digital da Bíblia Alpha — com notas teológicas, referências cruzadas e o sistema de estudo do Studio Logos integrado.
              </p>
              <div className="space-y-3 mb-10">
                {['Notas teológicas em cada capítulo', 'Referências cruzadas com obras clássicas', 'Leitor premium com destaques e anotações', 'Acesso vitalício após uma única compra'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/80 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <a href={PAYMENT_LINKS.bibliaAlpha} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-4 bg-gold text-navy text-[10px] font-black uppercase tracking-[0.4em] rounded-sm hover:bg-white transition-all shadow-2xl">
                <BookOpen className="w-4 h-4" />
                ADQUIRIR BÍBLIA ALPHA
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
              {/* Fixed: added relative positioning */}
              <div className="relative aspect-square max-w-sm mx-auto rounded-sm overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1a3a5c, #2d5a8a)', border: '1px solid rgba(201,162,39,0.3)' }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                  <div className="text-6xl mb-6">✝</div>
                  <div className="text-gold text-[10px] font-black uppercase tracking-[0.6em] mb-3">BÍBLIA ALPHA</div>
                  <div className="text-white font-serif text-2xl mb-2">Studio Logos</div>
                  <div className="text-white/40 text-xs">Edição Digital Exclusiva</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Clássicos em Destaque ── */}
      <section className="py-24 bg-[#f8f7f2] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest mb-6"
              style={{ background: '#f0faf4', color: '#2d6a4f', border: '1px solid #c3e6cb' }}>
              📜 Obras Integrais de Domínio Público
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-navy mb-4">Os Clássicos do Pensamento<br/>Ocidental</h2>
            <p className="text-muted text-sm max-w-2xl mx-auto leading-relaxed">
              Obras integrais de Agostinho, Platão, Marco Aurélio, Tomás de Kempis e outros — cuidadosamente selecionadas e verificadas.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { author: 'Agostinho', work: 'Confissões', year: '397 d.C.', icon: '✝' },
              { author: 'Tomás de Kempis', work: 'Imitação de Cristo', year: '1418', icon: '🕊' },
              { author: 'Marco Aurélio', work: 'Meditações', year: '167 d.C.', icon: '⚖' },
              { author: 'Platão', work: 'A República', year: '375 a.C.', icon: '🏛' },
              { author: 'Tomás de Aquino', work: 'Suma Teológica', year: '1265', icon: '📖' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-sm p-6 text-center border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
                onClick={() => { setSearchTerm(item.author); setFilter('Todos'); setSelectedLetter(null); setContentTypeFilter('public_domain'); scrollToBiblioteca(); }}
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="text-[8px] font-black uppercase tracking-widest text-gold mb-1">{item.year}</div>
                <div className="font-serif text-navy text-sm font-semibold mb-1">{item.work}</div>
                <div className="text-[9px] text-muted uppercase tracking-wider">{item.author}</div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-[9px] text-muted uppercase tracking-widest mt-10">
            Verificadas nos termos da Lei 9.610/98 · Leitura online exclusiva · Sem download
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-32 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="font-serif text-5xl text-navy mb-6">FAQ.</h2>
            <p className="text-muted text-[10px] uppercase tracking-[0.3em] font-black">Tudo o que você precisa saber.</p>
          </div>
          <div className="space-y-4">
            {[
              { q: 'O que é o Studio Logos?', a: 'Uma plataforma de leitura online com obras integrais clássicas (Agostinho, Platão, Marco Aurélio...) e curadoria exclusiva sobre Teologia, Filosofia e Psicanálise.' },
              { q: 'Qual o valor da assinatura?', a: 'R$ 11,00 por mês. Após o pagamento, seu acesso é ativado pelo administrador. A Bíblia Alpha é uma compra única separada.' },
              { q: 'O que são Obras de Domínio Público?', a: 'Obras cujos direitos expiraram conforme a Lei 9.610/98 (70 anos após a morte do autor). Disponíveis na íntegra, sem download — exclusivamente no leitor premium.' },
              { q: 'O que são Sínteses Didáticas?', a: 'Materiais originais do Studio Logos para introduzir grandes autores com linguagem acessível e estrutura pedagógica. Não são cópias dos originais.' },
              { q: 'Posso baixar os conteúdos?', a: 'Não. Toda leitura acontece exclusivamente dentro da plataforma para garantir a melhor experiência e a proteção dos conteúdos.' },
              { q: 'O leitor tem recursos de estudo?', a: 'Sim. Inclui: destaques coloridos, notas pessoais, marcadores, índice interativo, controle de fonte, modo foco e progresso de leitura — tudo salvo automaticamente.' },
              { q: 'O que é a Bíblia Alpha?', a: 'Edição digital da Bíblia com notas teológicas e referências cruzadas integradas ao leitor premium. Compra única, independente da assinatura.' },
            ].map((faq, i) => (
              <details key={i} className="group bg-[#f8f8f6] border border-gray-100 rounded-sm p-8 cursor-pointer hover:bg-[#f4f4f2] transition-colors">
                <summary className="flex justify-between items-center font-black text-navy uppercase tracking-[0.2em] text-[10px] list-none">
                  {faq.q}
                  <ChevronRight className="w-4 h-4 group-open:rotate-90 transition-transform text-navy shrink-0 ml-4" />
                </summary>
                <div className="mt-6 text-muted text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
            <div className="p-12 text-center bg-[#f4f4f2] border border-gray-100 rounded-sm">
              <h4 className="font-serif text-2xl text-navy mb-4">Pronto para começar?</h4>
              <p className="text-muted mb-8 text-xs uppercase tracking-widest">Assinatura Studio Logos por R$ 11,00/mês.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={async () => { if (user) { window.open(PAYMENT_LINKS.studioLogosMonthly, '_blank'); } else { try { await signInWithGoogle(); } catch {} } }}
                  className="premium-button px-10 py-4 text-[10px] uppercase tracking-[0.4em] font-black">
                  ASSINAR STUDIO LOGOS
                </button>
                <a href={PAYMENT_LINKS.bibliaAlpha} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-navy text-navy text-[10px] font-black uppercase tracking-[0.4em] hover:bg-navy hover:text-white transition-all">
                  BÍBLIA ALPHA →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-center md:text-left">
              <span className="font-sans text-xl font-black tracking-[0.5em] text-navy">STUDIO LOGOS</span>
              <p className="mt-4 text-[10px] text-muted leading-relaxed uppercase tracking-widest">
                ESTRUTURA DIGITAL DE ALTA PERFORMANCE<br />PENSAMENTO. SÍNTESE. PROFUNDIDADE.
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="text-center">
                <div className="text-[10px] uppercase tracking-[0.4em] text-navy font-black mb-3">NAVEGAÇÃO</div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => navigate('/teologia')} className="text-xs text-muted hover:text-navy transition-colors">Teologia</button>
                  <button onClick={() => navigate('/filosofia')} className="text-xs text-muted hover:text-navy transition-colors">Filosofia</button>
                  <button onClick={() => navigate('/psicanalise')} className="text-xs text-muted hover:text-navy transition-colors">Psicanálise</button>
                </div>
              </div>
              <div className="text-center">
                <div className="text-[10px] uppercase tracking-[0.4em] text-navy font-black mb-3">CONTATO</div>
                <a href="mailto:contato@studiologos.com.br" className="text-xs text-muted hover:text-navy transition-colors">contato@studiologos.com.br</a>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-gray-50 text-center">
            <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-gray-400">
              © {new Date().getFullYear()} STUDIO LOGOS · TODOS OS DIREITOS RESERVADOS
            </p>
          </div>
        </div>
      </footer>

      <FeaturedSection />
      <EbookModal ebook={selectedEbook} onClose={() => setSelectedEbook(null)} />

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-10 right-10 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl z-40 hover:bg-navy transition-all group"
          >
            <ArrowRight className="w-6 h-6 -rotate-90 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── ReaderPage ───────────────────────────────────────────────────────────────
const ReaderPage: React.FC = () => {
  const { ebookId } = useParams<{ ebookId: string }>();
  const navigate = useNavigate();
  const ebook = DEMO_EBOOKS.find(e => e.id === ebookId || e.slug === ebookId);

  React.useEffect(() => {
    if (ebookId) localStorage.setItem('last_read_ebook', ebookId);
  }, [ebookId]);

  if (!ebook) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafaf9]">
        <div className="text-center">
          <p className="text-navy font-serif text-2xl mb-4">Obra não encontrada.</p>
          <button onClick={() => navigate('/')} className="premium-button px-8 py-3 text-xs uppercase tracking-widest font-black">
            Voltar à Biblioteca
          </button>
        </div>
      </div>
    );
  }

  return <OnlineReader ebook={ebook} onClose={() => navigate('/')} />;
};

// ─── ProtectedRoute ───────────────────────────────────────────────────────────
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile, isApproved, loading, isAdmin } = useAuth();

  if (loading && !isAdmin) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafaf9]">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-2 border-navy/10 border-t-gold rounded-full animate-spin mb-6" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-navy/40">Sincronizando Logos</span>
      </div>
    </div>
  );

  if (!user) return <Navigate to="/" replace />;

  if (profile?.status === 'blocked') return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-serif font-bold text-red-700 mb-4">Acesso Bloqueado</h1>
        <p className="text-muted mb-6">Entre em contato: contato@studiologos.com.br</p>
        <button onClick={() => auth.signOut()} className="text-xs underline text-navy">Sair da conta</button>
      </div>
    </div>
  );

  if (!isApproved) return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <div className="max-w-md text-center">
        <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <ScrollText className="w-10 h-10 text-gold" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-navy mb-4">Seu acesso está em análise</h1>
        <p className="text-muted mb-8 leading-relaxed">Após a confirmação da assinatura, seu acesso será liberado.</p>
        <div className="bg-white border border-border rounded-sm p-6 mb-8 text-left">
          <div className="text-[10px] font-bold text-gold uppercase tracking-widest mb-3">Próximos passos</div>
          <ul className="text-xs space-y-3 text-muted">
            <li className="flex items-center gap-2">
              <ChevronRight className="w-3 h-3 text-gold shrink-0" />
              <a href={PAYMENT_LINKS.studioLogosMonthly} target="_blank" rel="noopener noreferrer" className="underline hover:text-gold">
                Concluir pagamento de R$ 11,00/mês
              </a>
            </li>
            <li className="flex items-center gap-2"><ChevronRight className="w-3 h-3 text-gold shrink-0" /> Aguardar ativação pelo administrador</li>
            <li className="flex items-center gap-2"><ChevronRight className="w-3 h-3 text-gold shrink-0" /> Explorar toda a biblioteca online</li>
          </ul>
        </div>
        <button onClick={() => auth.signOut()} className="text-[10px] font-black uppercase tracking-widest text-navy border-b border-navy pb-1">
          Sair da Conta
        </button>
      </div>
    </div>
  );

  return <>{children}</>;
};

// ─── AppContent ───────────────────────────────────────────────────────────────
function AppContent() {
  const { pathname } = useLocation();
  const isReader = pathname.startsWith('/leitor/') || pathname.startsWith('/ebook/');

  return (
    <div className="selection:bg-navy selection:text-white cursor-default">
      {!isReader && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teologia" element={<CategoryPage category="Teologia" />} />
        <Route path="/filosofia" element={<CategoryPage category="Filosofia" />} />
        <Route path="/psicanalise" element={<CategoryPage category="Psicanálise" />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route
          path="/leitor/:ebookId"
          element={
            <ProtectedRoute>
              <ReaderPage />
            </ProtectedRoute>
          }
        />
        <Route path="/biblioteca" element={<LibraryPage />} />
        <Route path="/ebook/:slug" element={<EbookDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!isReader && <Footer />}
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}
