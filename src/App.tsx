import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/AuthContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EbookCard } from './components/EbookCard';
import { EbookModal } from './components/EbookModal';
import { AdminPanel } from './components/AdminPanel';
import OnlineReader from './components/OnlineReader';
import { DEMO_EBOOKS } from './data/ebooks';
import { Ebook, PAYMENT_LINKS } from './types';
import { Search, Filter, BookOpen, ScrollText, Brain, Heart, ChevronRight, Shield, Crown, ArrowRight } from 'lucide-react';
import { signInWithGoogle, auth } from './lib/firebase';
import { motion, AnimatePresence } from 'motion/react';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [selectedEbook, setSelectedEbook] = useState<Ebook | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 1000);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Mapping paths to categories
  const initialFilter = useMemo(() => {
    if (pathname.includes('teologia')) return 'Teologia';
    if (pathname.includes('filosofia')) return 'Filosofia';
    if (pathname.includes('psicanalise')) return 'Psicanálise';
    return 'Todos';
  }, [pathname]);

  const [filter, setFilter] = useState<'Todos' | 'Teologia' | 'Filosofia' | 'Psicanálise'>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [contentTypeFilter, setContentTypeFilter] = useState<'all' | 'public_domain' | 'synthesis'>('all');
  const [lastReadEbook, setLastReadEbook] = useState<Ebook | null>(null);

  React.useEffect(() => {
    const lastId = localStorage.getItem('last_read_ebook');
    if (lastId) {
      const found = DEMO_EBOOKS.find(e => e.id === lastId);
      if (found) setLastReadEbook(found);
    }
  }, []);

  // Update filter when pathname changes + scroll to library
  React.useEffect(() => {
    setFilter(initialFilter as any);
    if (pathname !== '/') {
      setTimeout(() => {
        document.getElementById('biblioteca')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, [initialFilter, pathname]);

  const filteredEbooks = useMemo(() => {
    return DEMO_EBOOKS.filter(e => {
      const matchesFilter = filter === 'Todos' || e.category === filter;
      const matchesSearch = !searchTerm || e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            e.authorReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (e.description || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLetter = !selectedLetter || e.title.startsWith(selectedLetter);
      const matchesContentType = contentTypeFilter === 'all' ||
        (contentTypeFilter === 'public_domain' && e.contentTypeLabel === 'public_domain') ||
        (contentTypeFilter === 'synthesis' && e.contentTypeLabel !== 'public_domain');
      return matchesFilter && matchesSearch && matchesLetter && matchesContentType;
    });
  }, [filter, searchTerm, selectedLetter, contentTypeFilter]);

  return (
    <div className="min-h-screen bg-background grain">
      <Hero />

      {/* Continue Reading Section */}
      <AnimatePresence>
        {lastReadEbook && (
          <motion.section 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-navy border-b border-white/5 py-8"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-16 bg-gold/10 rounded-sm flex items-center justify-center overflow-hidden border border-white/5">
                    {lastReadEbook.cover ? (
                      <img src={lastReadEbook.cover} alt="" className="w-full h-full object-cover opacity-60" />
                    ) : (
                      <BookOpen className="w-6 h-6 text-gold" />
                    )}
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
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Competitive Edge / Comparison */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-white border-y border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Shield, title: 'CURAÇÃO RIGOROSA', desc: 'Seleções exatas do pensamento clássico e contemporâneo.' },
              { icon: Crown, title: 'ACESSO EXCLUSIVO', desc: 'Sua biblioteca particular com as maiores mentes da história.' },
              { icon: BookOpen, title: 'SÍNTESES ÚNICAS', desc: 'Conteúdo autoral desenvolvido para o máximo aproveitamento.' }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-sm bg-[#f4f4f2] text-navy flex items-center justify-center mb-6 border border-gray-100 group-hover:bg-black group-hover:text-white transition-all duration-500 shadow-sm sheen-wrapper">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-[11px] uppercase tracking-[0.4em] font-black text-navy mb-4">{feature.title}</h3>
                <p className="text-sm text-muted leading-relaxed font-normal">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Knowledge Paths - Curated Journeys */}
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
            <div className="hidden md:flex items-center space-x-4 mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-navy/40">Role para explorar</span>
              <div className="w-12 h-px bg-navy/10" />
            </div>
          </div>

          <div className="flex overflow-x-auto pb-12 gap-8 no-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            {[
              { 
                title: 'Fundamentos da Patrística', 
                desc: 'Dos Padres Apostólicos a Santo Agostinho: A base do pensamento cristão.', 
                category: 'Teologia',
                count: '12 Estudos',
                image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800'
              },
              { 
                title: 'O Sujeito no Espelho', 
                desc: 'Aparelho psíquico, inconsciente e a estruturação do desejo em Freud e Lacan.', 
                category: 'Psicanálise',
                count: '15 Estudos',
                image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800'
              },
              { 
                title: 'A Cidade e o Sagrado', 
                desc: 'A interseção entre filosofia política e a teologia pública na modernidade.', 
                category: 'Filosofia',
                count: '10 Estudos',
                image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=800'
              },
              { 
                title: 'Clínica do Mal-Estar', 
                desc: 'Análise das patologias contemporâneas sob a ótica psicanalítica.', 
                category: 'Psicanálise',
                count: '08 Estudos',
                image: 'https://images.unsplash.com/photo-1516035054744-d474c5209db5?q=80&w=800'
              }
            ].map((path, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="flex-shrink-0 w-[400px] group cursor-pointer"
                onClick={() => {
                  setFilter(path.category as any);
                  setSelectedLetter(null);
                  setTimeout(() => document.getElementById('biblioteca')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm mb-8 shadow-2xl">
                  <img 
                    src={path.image} 
                    alt={path.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
                  />
                  <div className="absolute inset-0 bg-navy/60 group-hover:bg-navy/20 transition-all duration-700" />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-white/10 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-[0.4em] border border-white/20">
                      {path.category}
                    </span>
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

      {/* Master Thinkers Section */}
      <section className="py-32 bg-navy relative overflow-hidden">
        {/* Background Texture */}
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
              { name: 'Agostinho', role: 'Patrística', img: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=400' },
              { name: 'Freud', role: 'Psicanálise', img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=400' },
              { name: 'Calvino', role: 'Teologia', img: 'https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?q=80&w=400' },
              { name: 'Platão', role: 'Filosofia', img: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=400' },
              { name: 'Lacan', role: 'Psicanálise', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400' },
              { name: 'Lutero', role: 'Reforma', img: 'https://images.unsplash.com/photo-1533221300408-1751403324aa?q=80&w=400' }
            ].map((master, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col items-center text-center cursor-pointer"
                onClick={() => {
                  setSearchTerm(master.name);
                  setSelectedLetter(null);
                  setTimeout(() => document.getElementById('biblioteca')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }}
              >
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 border border-white/10 group-hover:border-gold transition-colors duration-500 shadow-2xl">
                  <img src={master.img} alt={master.name} referrerPolicy="no-referrer" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-navy/40 group-hover:bg-transparent transition-colors" />
                </div>
                <h4 className="font-serif text-xl text-white mb-1">{master.name}</h4>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gold/60">{master.role}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Tabs */}
      <section className="py-32 bg-[#f9f9f7]" id="biblioteca">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
          >
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-px bg-black" />
                <span className="text-[10px] uppercase tracking-[0.4em] text-navy font-black">PLATAFORMA PREMIUM</span>
              </div>
              <h2 className="font-serif text-4xl md:text-6xl text-navy leading-tight">Escolha sua jornada.</h2>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="relative group w-full md:w-auto">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-navy transition-colors" />
                <input
                  type="text"
                  placeholder="Buscar obra ou síntese..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-80 pl-14 pr-8 py-5 bg-white border border-border rounded-sm text-[11px] font-black uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-navy transition-all shadow-sm group-hover:shadow-md"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="flex flex-wrap md:flex-nowrap gap-2 bg-white p-2 rounded-sm border border-border shadow-sm">
                  {[
                    { label: 'TUDO', value: 'Todos', color: 'hover:bg-black hover:shadow-black/20' },
                    { label: 'TEOLOGIA', value: 'Teologia', color: 'hover:bg-theology hover:shadow-theology/20' },
                    { label: 'FILOSOFIA', value: 'Filosofia', color: 'hover:bg-philosophy hover:shadow-philosophy/20' },
                    { label: 'PSICANÁLISE', value: 'Psicanálise', color: 'hover:bg-psicanalise hover:shadow-psicanalise/20' }
                  ].map((cat) => (
                    <button
                      key={cat.label}
                      onClick={() => { setFilter(cat.value as any); setSelectedLetter(null); document.getElementById('biblioteca')?.scrollIntoView({ behavior: 'smooth' }); }}
                      className={`px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-black transition-all duration-300 rounded-sm shadow-sm ${
                        filter === cat.value
                          ? 'bg-black text-white'
                          : `text-muted bg-gray-50/50 ${cat.color} hover:text-white hover:-translate-y-0.5`
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 bg-white p-2 rounded-sm border border-border shadow-sm">
                  {[
                    { label: 'Todos', value: 'all' },
                    { label: '📜 Domínio Público', value: 'public_domain' },
                    { label: '✍ Sínteses', value: 'synthesis' },
                  ].map((ct) => (
                    <button
                      key={ct.value}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredEbooks.map((ebook, idx) => (
              <EbookCard 
                key={ebook.id} 
                ebook={ebook} 
                onClick={(e) => {
                  if (user) {
                    setSelectedEbook(e);
                  } else {
                    signInWithGoogle();
                  }
                }} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Biblical Alpha Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
             <h2 className="font-serif text-3xl md:text-5xl text-navy mb-4">Bibliográficas em Alpha</h2>
             <p className="text-[10px] uppercase tracking-[0.3em] text-muted font-black">UM MAPA COMPLETO DO CONHECIMENTO</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map((letter) => (
              <button 
                key={letter} 
                onClick={() => {
                  setSelectedLetter(selectedLetter === letter ? null : letter);
                  const el = document.getElementById('biblioteca');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-12 h-12 flex items-center justify-center font-serif text-lg border transition-all cursor-pointer rounded-sm ${
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
            <div className="text-center mt-12">
               <button 
                 onClick={() => setSelectedLetter(null)}
                 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold border-b border-gold pb-1 hover:text-navy hover:border-navy transition-colors"
               >
                 Limpar Filtro Alfabético
               </button>
            </div>
          )}
        </div>
      </section>

      {/* BÍBLIA ALPHA PRODUCT SECTION */}
      <section className="py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2d4a 50%, #0d1f36 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-[9px] font-black uppercase tracking-[0.6em] text-gold mb-4">PRODUTO ESPECIAL</div>
              <h2 className="font-serif text-4xl md:text-6xl text-white leading-tight mb-6">
                Bíblia Alpha<br/>
                <span className="text-gold">Studio Logos</span>
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-8">
                Acesso exclusivo à edição digital da Bíblia Alpha — com notas teológicas, referências cruzadas e o sistema de estudo do Studio Logos integrado. Para quem leva a Palavra a sério.
              </p>
              <div className="space-y-3 mb-10">
                {[
                  'Notas teológicas em cada capítulo',
                  'Referências cruzadas com obras clássicas',
                  'Leitor premium com destaques e anotações',
                  'Acesso vitalício após uma única compra',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/80 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <a
                href={PAYMENT_LINKS.bibliaAlpha}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-4 bg-gold text-navy text-[10px] font-black uppercase tracking-[0.4em] rounded-sm hover:bg-white transition-all shadow-2xl"
              >
                <BookOpen className="w-4 h-4" />
                ADQUIRIR BÍBLIA ALPHA
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square max-w-sm mx-auto rounded-sm overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1a3a5c, #2d5a8a)', border: '1px solid rgba(201,162,39,0.3)' }}
              >
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

      {/* PUBLIC DOMAIN HIGHLIGHT SECTION */}
      <section className="py-24 bg-[#f8f7f2] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest mb-6"
              style={{ background: '#f0faf4', color: '#2d6a4f', border: '1px solid #c3e6cb' }}>
              📜 Obras Integrais de Domínio Público
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-navy mb-4">
              Os Clássicos do Pensamento<br/>Ocidental
            </h2>
            <p className="text-muted text-sm max-w-2xl mx-auto leading-relaxed">
              Acesso às obras integrais de Agostinho, Platão, Marco Aurélio, Tomás de Kempis e outros — disponíveis na íntegra, verificadas juridicamente como domínio público, com leitor premium integrado.
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
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-sm p-6 text-center border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
                onClick={() => {
                  setSearchTerm(item.author);
                  setFilter('Todos');
                  setSelectedLetter(null);
                  setContentTypeFilter('public_domain');
                  setTimeout(() => document.getElementById('biblioteca')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }}
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="text-[8px] font-black uppercase tracking-widest text-gold mb-1">{item.year}</div>
                <div className="font-serif text-navy text-sm font-semibold mb-1">{item.work}</div>
                <div className="text-[9px] text-muted uppercase tracking-wider">{item.author}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-[9px] text-muted uppercase tracking-widest">
              Todas as obras verificadas nos termos da Lei 9.610/98 (70 anos após o falecimento do autor) · Leitura online exclusiva · Sem download
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="font-serif text-5xl text-navy mb-6">FAQ.</h2>
            <p className="text-muted text-[10px] uppercase tracking-[0.3em] font-black">Tudo o que você precisa saber.</p>
          </div>
          
          <div className="space-y-4">
            {[
              {
                q: 'O que é o Studio Logos?',
                a: 'É uma plataforma de leitura online por assinatura. Reunimos dois tipos de conteúdo: (1) Obras integrais de domínio público — textos clássicos de Agostinho, Platão, Marco Aurélio e outros, disponíveis na íntegra; e (2) Sínteses didáticas autorais — materiais criados pelo Studio Logos para facilitar o estudo de obras filosóficas, teológicas e psicanalíticas.'
              },
              {
                q: 'Qual o valor da assinatura?',
                a: 'R$ 11,00 por mês. Após o pagamento, seu acesso é ativado pelo administrador. Para a Bíblia Alpha, há uma compra única separada.'
              },
              {
                q: 'O que são "Obras de Domínio Público"?',
                a: 'São obras cujos direitos autorais expiraram — conforme a Lei 9.610/98, 70 anos após o falecimento do autor. O Studio Logos verifica juridicamente cada obra antes de disponibilizá-la. Você lê o texto completo, original, dentro do nosso leitor premium. Não há download disponível.'
              },
              {
                q: 'O que são "Sínteses Didáticas Autorais"?',
                a: 'São materiais originais criados pelo Studio Logos para introduzir e organizar o pensamento de grandes autores. Não são cópias dos livros originais — são conteúdos pedagógicos independentes, com linguagem acessível e estrutura organizada para estudo.'
              },
              {
                q: 'Posso baixar os conteúdos?',
                a: 'Não. Toda a leitura acontece exclusivamente dentro da plataforma Studio Logos, tanto para obras de domínio público quanto para sínteses autorais. Isso garante a melhor experiência de leitura e a proteção dos conteúdos.'
              },
              {
                q: 'O leitor tem recursos de estudo?',
                a: 'Sim. O leitor premium do Studio Logos inclui: destaques coloridos, notas pessoais, marcadores, índice interativo, controle de fonte, modo foco e progresso de leitura — tudo salvo automaticamente.'
              },
              {
                q: 'O que é a Bíblia Alpha?',
                a: 'É um produto separado do Studio Logos: uma edição digital da Bíblia com notas teológicas, referências cruzadas e integração com o leitor premium. Adquirida por compra única — independente da assinatura mensal.'
              },
            ].map((faq, i) => (
              <details key={i} className="group bg-[#f8f8f6] border border-gray-100 rounded-sm p-8 cursor-pointer outline-none transition-all hover:bg-[#f4f4f2]">
                <summary className="flex justify-between items-center font-black text-navy uppercase tracking-[0.2em] text-[10px] list-none">
                  {faq.q}
                  <ChevronRight className="w-4 h-4 group-open:rotate-90 transition-transform text-navy shrink-0 ml-4" />
                </summary>
                <div className="mt-6 text-muted text-sm leading-relaxed font-normal">
                  {faq.a}
                </div>
              </details>
            ))}
            
            <div className="p-12 text-center bg-[#f4f4f2] border border-gray-100 rounded-sm">
              <h4 className="font-serif text-2xl text-navy mb-4">Pronto para começar?</h4>
              <p className="text-muted mb-2 font-normal uppercase tracking-widest text-xs">Assinatura Studio Logos por R$ 11,00/mês.</p>
              <p className="text-muted mb-8 font-normal text-xs">Acesso a obras integrais de domínio público + sínteses didáticas.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => {
                    if (user) {
                      window.open(PAYMENT_LINKS.studioLogosMonthly, '_blank');
                    } else {
                      signInWithGoogle();
                    }
                  }}
                  className="premium-button px-10 py-4 text-[10px] uppercase tracking-[0.4em] font-black"
                >
                  ASSINAR STUDIO LOGOS
                </button>
                <a
                  href={PAYMENT_LINKS.bibliaAlpha}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-navy text-navy text-[10px] font-black uppercase tracking-[0.4em] hover:bg-navy hover:text-white transition-all"
                >
                  BÍBLIA ALPHA →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-center md:text-left">
              <span className="font-sans text-xl font-black tracking-[0.5em] text-navy">STUDIO LOGOS</span>
              <p className="mt-4 text-[10px] text-muted leading-relaxed font-normal uppercase tracking-widest">
                ESTRUTURA DIGITAL DE ALTA PERFORMANCE<br />
                PENSAMENTO. SÍNTESE. PROFUNDIDADE.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="text-center md:text-right">
                <div className="text-[10px] uppercase tracking-[0.4em] text-navy font-black mb-4">CONTATO</div>
                <p className="text-xs text-muted font-normal uppercase tracking-widest">contato@studiologos.com</p>
              </div>
              <div className="text-center md:text-right">
                <div className="text-[10px] uppercase tracking-[0.4em] text-navy font-black mb-4">PRIVACIDADE</div>
                <p className="text-xs text-muted font-normal uppercase tracking-widest">Termos de Uso</p>
              </div>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-gray-50 text-center text-gray-400">
            <p className="text-[9px] uppercase tracking-[0.3em] font-bold">
              © {new Date().getFullYear()} STUDIO LOGOS • TODOS OS DIREITOS RESERVADOS
            </p>
          </div>
        </div>
      </footer>

      <EbookModal 
        ebook={selectedEbook} 
        onClose={() => setSelectedEbook(null)} 
      />

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

const ReaderPage: React.FC = () => {
  const { ebookId } = useParams<{ ebookId: string }>();
  const navigate = useNavigate();
  const ebook = DEMO_EBOOKS.find(e => e.id === ebookId || e.slug === ebookId);

  React.useEffect(() => {
    if (ebookId) localStorage.setItem('last_read_ebook', ebookId);
  }, [ebookId]);

  if (!ebook) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-navy font-serif text-2xl mb-4">Obra não encontrada</p>
          <button onClick={() => navigate('/')} className="premium-button px-8 py-3 text-xs uppercase tracking-widest font-black">
            Voltar à Biblioteca
          </button>
        </div>
      </div>
    );
  }

  return <OnlineReader ebook={ebook} onClose={() => navigate('/')} />;
};


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

  if (!user) return <Navigate to="/" />;
  
  if (!isApproved) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-background">
        <div className="max-w-md text-center">
           <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <ScrollText className="w-10 h-10 text-gold" />
           </div>
           <h1 className="text-3xl font-serif font-bold text-navy mb-4">Seu acesso está em análise</h1>
           <p className="text-muted mb-8 leading-relaxed">
             Recebemos seu cadastro. Após a confirmação da assinatura, seu acesso será liberado pelo administrador.
           </p>
           <div className="premium-card p-6 mb-8 text-left bg-white border border-border">
              <div className="text-[10px] font-bold text-gold uppercase tracking-widest mb-2">Próximos passos</div>
              <ul className="text-xs space-y-3 text-muted">
                <li className="flex items-center">
                  <ChevronRight className="w-3 h-3 text-gold mr-2" /> 
                  <a href={PAYMENT_LINKS.studioLogosMonthly} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors underline">
                    Concluir pagamento de R$ 11,00
                  </a>
                </li>
                 <li className="flex items-center"><ChevronRight className="w-3 h-3 text-gold mr-2" /> Aguardar ativação administrativa</li>
                 <li className="flex items-center"><ChevronRight className="w-3 h-3 text-gold mr-2" /> Explorar toda a biblioteca online</li>
              </ul>
           </div>
           <button 
             onClick={() => auth.signOut()}
             className="text-[10px] font-black uppercase tracking-widest text-navy border-b border-navy pb-1"
           >
             Sair da Conta
           </button>
        </div>
      </div>
    );
  }

  if (profile?.status === 'blocked') {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-background">
        <div className="max-w-md text-center">
           <h1 className="text-3xl font-serif font-bold text-red-700 mb-4">Acesso Bloqueado</h1>
           <p className="text-muted">Entre em contato com o suporte para mais informações.</p>
           <button onClick={() => auth.signOut()} className="mt-8 text-xs underline">Sair</button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

function AppContent() {
  const { pathname } = useLocation();
  const isReader = pathname.startsWith('/leitor/');

  return (
    <div className="selection:bg-navy selection:text-white cursor-default">
      {!isReader && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route 
          path="/leitor/:ebookId" 
          element={
            <ProtectedRoute>
              <ReaderPage />
            </ProtectedRoute>
          } 
        />
        {/* Categorias */}
        <Route path="/teologia" element={<HomePage />} />
        <Route path="/filosofia" element={<HomePage />} />
        <Route path="/psicanalise" element={<HomePage />} />
      </Routes>
    </div>
  );
}
