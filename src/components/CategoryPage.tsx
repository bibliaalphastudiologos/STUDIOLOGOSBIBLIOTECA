import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Shield, Crown, Brain, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { EbookCard } from './EbookCard';
import { EBOOKS } from '../data';
import { Category, type Ebook } from '../studioTypes';
import { useAuth } from './AuthProvider';
import { PAYMENT_LINKS } from '../types';

interface CategoryPageProps {
  category: string;
}

const CATEGORY_CONFIG: Record<string, { title: string; subtitle: string; description: string; bgGradient: string; icon: React.ReactNode; accentColor: string; image: string }> = {
  'Filosofia': {
    title: 'Filosofia',
    subtitle: 'O Pensamento no Limite',
    description: 'De Platão a Nietzsche, de Kant a Heidegger: obras integrais que percorrem toda a história do pensamento ocidental. Para quem quer compreender o mundo em profundidade.',
    bgGradient: 'from-[#1a0a28] via-[#2d1a4a] to-[#1d0d36]',
    icon: <BookOpen className="w-8 h-8" />,
    accentColor: '#7c3aed',
    image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=1400',
  },
  'Teologia': {
    title: 'Teologia',
    subtitle: 'A Inteligência da Fé',
    description: 'De Agostinho a Calvino, dos Padres da Igreja à Reforma: textos integrais e sínteses que formam o alicerce do pensamento cristão ocidental. Uma biblioteca para quem leva a fé a sério.',
    bgGradient: 'from-[#0a1628] via-[#1a2d4a] to-[#0d1f36]',
    icon: <Shield className="w-8 h-8" />,
    accentColor: '#c9a227',
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1400',
  },
  'Psicanálise': {
    title: 'Psicanálise',
    subtitle: 'O Sujeito e o Inconsciente',
    description: 'Freud, Lacan, Klein e o pensamento psicanalítico em sua extensão completa. Sínteses didáticas para o estudo sistemático da clínica, do desejo e da estruturação do sujeito.',
    bgGradient: 'from-[#0a1a28] via-[#1a2d3a] to-[#0d1f2d]',
    icon: <Brain className="w-8 h-8" />,
    accentColor: '#0891b2',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1400',
  },
  'Literatura': {
    title: 'Literatura',
    subtitle: 'Os Grandes Épicos da Humanidade',
    description: 'Clássicos da literatura universal em suas formas mais puras. Uma jornada através dos séculos de criação literária que moldaram a civilização ocidental.',
    bgGradient: 'from-[#1a0a0a] via-[#2d1a1a] to-[#1d0d0d]',
    icon: <BookOpen className="w-8 h-8" />,
    accentColor: '#d3a073',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1400',
  },
};

export function CategoryPage({ category }: CategoryPageProps) {
  const navigate = useNavigate();
  const { user, hasAccess, login, loading } = useAuth();
  const [selectedEbook, setSelectedEbook] = useState<Ebook | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const config = CATEGORY_CONFIG[category];

  if (!config) {
    return <Navigate to="/" />;
  }

  const categoryEnum = Object.values(Category).find(c => c === category) as Category | undefined;
  
  const filteredEbooks = useMemo(() => {
    if (!categoryEnum) return [];
    return EBOOKS.filter(e => e.category === categoryEnum).filter(e => 
      !searchTerm || 
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categoryEnum, searchTerm]);

  const handleRead = (ebook: Ebook) => {
    if (!user && !ebook.isSpecial) {
      login();
      return;
    }

    if (!hasAccess && !ebook.isSpecial) {
      window.location.href = PAYMENT_LINKS.studioLogosMonthly;
      return;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className={`relative overflow-hidden pt-40 pb-32 bg-gradient-to-br ${config.bgGradient}`}>
        <div className="absolute inset-0">
          <img
            src={config.image}
            alt={category}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-10 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        </div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[200px] pointer-events-none"
          style={{ background: `${config.accentColor}15` }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-[10px] uppercase tracking-widest font-bold"
            >
              <ChevronLeft className="w-4 h-4" /> Voltar ao início
            </button>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-sm flex items-center justify-center"
                style={{ background: `${config.accentColor}20`, border: `1px solid ${config.accentColor}40` }}>
                <span style={{ color: config.accentColor }}>{config.icon}</span>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.6em]" style={{ color: config.accentColor }}>
                  STUDIO LOGOS · TRILHA ACADÊMICA
                </p>
              </div>
            </div>

            <h1 className="font-serif text-6xl sm:text-8xl lg:text-[9rem] text-white leading-[0.9] mb-8 tracking-tight">
              {config.title}
            </h1>
            <p className="text-white/50 text-xl font-serif italic mb-6">{config.subtitle}</p>
            <p className="text-white/70 text-base max-w-2xl leading-relaxed mb-12">{config.description}</p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="px-6 py-3 rounded-sm"
                style={{ background: `${config.accentColor}10`, border: `1px solid ${config.accentColor}25` }}>
                <div className="text-[8px] font-black uppercase tracking-widest mb-1" style={{ color: `${config.accentColor}99` }}>Total de Obras</div>
                <div className="text-white text-sm font-serif">{filteredEbooks.length} disponíveis</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12 items-start sm:items-center justify-between">
          <h2 className="font-serif text-3xl text-[#1A1A1A]">
            {filteredEbooks.length} {filteredEbooks.length === 1 ? 'obra' : 'obras'} em {category}
          </h2>
          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Buscar obra ou autor..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="px-5 py-3 border border-gray-200 rounded-sm text-[11px] font-black uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] w-56"
            />
          </div>
        </div>

        {filteredEbooks.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-600 text-lg font-serif">Nenhuma obra encontrada para "{searchTerm}"</p>
            <button onClick={() => setSearchTerm('')}
              className="mt-6 text-[10px] font-black uppercase tracking-widest text-[#1A1A1A] border-b border-[#1A1A1A]">
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredEbooks.map(ebook => (
              <motion.div 
                key={ebook.id}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
                onClick={() => handleRead(ebook)}
              >
                <div className={`aspect-[2/3] relative overflow-hidden paper-texture ebook-shadow transition-all duration-500 group-hover:-translate-y-2 border border-black/5 rounded-sm`}>
                  <div className={`absolute inset-0 ${ebook.coverColor}`} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.12),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%,rgba(0,0,0,0.28))]" />
                  <div className="absolute inset-3 border border-white/10" />
                  <div className="absolute inset-x-6 top-8 h-px bg-white/15" />
                  <div className="absolute inset-x-6 bottom-8 h-px bg-white/15" />
                  <div
                    className="absolute -right-6 top-8 font-serif text-[6rem] leading-none opacity-[0.06] select-none"
                    style={{ color: ebook.coverAccent }}
                  >
                    {ebook.coverMark}
                  </div>

                  {/* Cover Overlay Info */}
                  <div className="absolute inset-0 flex flex-col justify-between py-7 px-5 text-center z-10">
                    <div className="space-y-5">
                      <span
                        className="text-[7px] tracking-[0.26em] uppercase font-black"
                        style={{ color: ebook.coverAccent }}
                      >
                        {ebook.category}
                      </span>

                      <div className="mx-auto h-10 w-10 rounded-full border border-white/10 flex items-center justify-center bg-black/10">
                        <span className="font-serif text-sm" style={{ color: ebook.coverAccent }}>
                          {ebook.author.split(' ')[0][0]}
                        </span>
                      </div>
                      
                      <div className="flex flex-col gap-1 items-center">
                        <h3 className="font-serif leading-[1.15] text-base text-white drop-shadow-md line-clamp-4">
                          {ebook.title}
                        </h3>
                        <p className="text-[7px] text-white/35 uppercase tracking-[0.18em] line-clamp-2">
                          {ebook.coverEdition}
                        </p>
                      </div>
                    </div>
                    
                    <span className="text-[8px] text-white/38 font-mono tracking-widest uppercase line-clamp-2">
                      {ebook.author}
                    </span>
                  </div>
                  
                  {/* Spine Effect */}
                  <div className="absolute top-0 left-0 w-4 h-full bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                </div>

                <div className="mt-4 space-y-1">
                  <p className="text-[7px] uppercase font-black tracking-widest opacity-30">
                    {ebook.category}
                  </p>
                  <p className="text-[10px] font-serif text-black/60 truncate">
                    {ebook.author}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Navigate({ to }: { to: string }) {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate(to);
  }, [navigate, to]);
  return null;
}
