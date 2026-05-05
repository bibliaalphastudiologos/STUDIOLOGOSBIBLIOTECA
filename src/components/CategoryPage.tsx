import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Shield, Crown, Brain } from 'lucide-react';
import { EbookCard } from './EbookCard';
import { EbookModal } from './EbookModal';
import { DEMO_EBOOKS } from '../data/ebooks';
import { Ebook } from '../types';
import { useAuth } from '../lib/AuthContext';
import { signInWithGoogle } from '../lib/firebase';

type Category = 'Teologia' | 'Filosofia' | 'Psicanálise';

interface CategoryConfig {
  title: string;
  subtitle: string;
  description: string;
  color: string;
  bgGradient: string;
  icon: React.ReactNode;
  accentColor: string;
  highlights: { label: string; value: string }[];
  image: string;
}

const CATEGORY_CONFIG: Record<Category, CategoryConfig> = {
  Teologia: {
    title: 'Teologia',
    subtitle: 'A Inteligência da Fé',
    description: 'De Agostinho a Calvino, dos Padres da Igreja à Reforma: textos integrais e sínteses que formam o alicerce do pensamento cristão ocidental. Uma biblioteca para quem leva a fé a sério.',
    color: 'text-theology',
    bgGradient: 'from-[#0a1628] via-[#1a2d4a] to-[#0d1f36]',
    icon: <Shield className="w-8 h-8" />,
    accentColor: '#c9a227',
    highlights: [
      { label: 'Patrística', value: 'Padres da Igreja' },
      { label: 'Reforma', value: 'Lutero & Calvino' },
      { label: 'Escolástica', value: 'Tomás de Aquino' },
      { label: 'Obras Integrais', value: 'Obras Integrais' },
    ],
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1400',
  },
  Filosofia: {
    title: 'Filosofia',
    subtitle: 'O Pensamento no Limite',
    description: 'De Platão a Nietzsche, de Kant a Heidegger: obras integrais que percorrem toda a história do pensamento ocidental. Para quem quer compreender o mundo em profundidade.',
    color: 'text-philosophy',
    bgGradient: 'from-[#1a0a28] via-[#2d1a4a] to-[#1d0d36]',
    icon: <BookOpen className="w-8 h-8" />,
    accentColor: '#7c3aed',
    highlights: [
      { label: 'Filosofia Clássica', value: 'Platão & Aristóteles' },
      { label: 'Filosofia Moderna', value: 'Kant & Hegel' },
      { label: 'Existencialismo', value: 'Nietzsche & Kierkegaard' },
      { label: '100+ Obras', value: 'Obras Clássicas' },
    ],
    image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=1400',
  },
  Psicanálise: {
    title: 'Psicanálise',
    subtitle: 'O Sujeito e o Inconsciente',
    description: 'Freud, Lacan, Klein e o pensamento psicanalítico em sua extensão completa. Sínteses didáticas para o estudo sistemático da clínica, do desejo e da estruturação do sujeito.',
    color: 'text-psicanalise',
    bgGradient: 'from-[#0a1a28] via-[#1a2d3a] to-[#0d1f2d]',
    icon: <Brain className="w-8 h-8" />,
    accentColor: '#0891b2',
    highlights: [
      { label: 'Freudiano', value: 'Inconsciente & Pulsão' },
      { label: 'Lacaniano', value: 'Sujeito & Gozo' },
      { label: 'Clínica', value: 'Neuroses & Psicoses' },
      { label: 'Cultura', value: 'Mal-estar & Desejo' },
    ],
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1400',
  },
};

interface CategoryPageProps {
  category: Category;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const { user } = useAuth();
  const [selectedEbook, setSelectedEbook] = useState<Ebook | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [contentTypeFilter, setContentTypeFilter] = useState<'all' | 'public_domain' | 'synthesis'>('all');
  const config = CATEGORY_CONFIG[category];

  const filteredEbooks = useMemo(() => {
    return DEMO_EBOOKS.filter(e => {
      const matchesCategory = e.category === category;
      const matchesSearch = !searchTerm ||
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.authorReference.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = contentTypeFilter === 'all' ||
        (contentTypeFilter === 'public_domain' && e.contentTypeLabel === 'public_domain') ||
        (contentTypeFilter === 'synthesis' && e.contentTypeLabel !== 'public_domain');
      return matchesCategory && matchesSearch && matchesType;
    });
  }, [category, searchTerm, contentTypeFilter]);

  const handleEbookClick = async (ebook: Ebook) => {
    if (user) {
      setSelectedEbook(ebook);
    } else {
      try { await signInWithGoogle(); } catch {}
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9]">
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
              {config.highlights.map((h, i) => (
                <div key={i} className="px-6 py-3 rounded-sm"
                  style={{ background: `${config.accentColor}10`, border: `1px solid ${config.accentColor}25` }}>
                  <div className="text-[8px] font-black uppercase tracking-widest mb-1" style={{ color: `${config.accentColor}99` }}>{h.label}</div>
                  <div className="text-white text-sm font-serif">{h.value}</div>
                </div>
              ))}
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
          <h2 className="font-serif text-3xl text-navy">
            {filteredEbooks.length} {filteredEbooks.length === 1 ? 'obra' : 'obras'} em {category}
          </h2>
          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Buscar obra ou autor..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="px-5 py-3 border border-gray-200 rounded-sm text-[11px] font-black uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-navy w-56"
            />
            <div className="flex gap-2 bg-white p-2 rounded-sm border border-gray-200">
              {[
                { label: 'Todos', value: 'all' },
                { label: 'Obras Clássicas', value: 'public_domain' },
                { label: 'Curadoria', value: 'synthesis' },
              ].map(ct => (
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

        {filteredEbooks.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted text-lg font-serif">Nenhuma obra encontrada para "{searchTerm}"</p>
            <button onClick={() => { setSearchTerm(''); setContentTypeFilter('all'); }}
              className="mt-6 text-[10px] font-black uppercase tracking-widest text-navy border-b border-navy">
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
      </section>

      <EbookModal ebook={selectedEbook} onClose={() => setSelectedEbook(null)} />
    </div>
  );
};
