import React from 'react';
import { motion } from 'motion/react';
import { Clock, BookOpen, Heart } from 'lucide-react';
import { Ebook } from '../types';
import { useNavigate } from 'react-router-dom';

interface EbookCardProps {
  ebook: Ebook;
  onClick: (ebook: Ebook) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export const EbookCard: React.FC<EbookCardProps> = ({
  ebook,
  onClick,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const navigate = useNavigate();

  const handleRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/leitor/${ebook.id}`);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(ebook.id);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Teologia': return 'text-theology';
      case 'Filosofia': return 'text-philosophy';
      case 'Psicanálise': return 'text-psicanalise';
      default: return 'text-navy';
    }
  };

  const getCategoryBg = (category: string) => {
    switch (category) {
      case 'Teologia': return 'bg-theology/5 hover:bg-theology/10';
      case 'Filosofia': return 'bg-philosophy/5 hover:bg-philosophy/10';
      case 'Psicanálise': return 'bg-psicanalise/5 hover:bg-psicanalise/10';
      default: return 'bg-gray-50';
    }
  };

  const getCategoryBorder = (category: string) => {
    switch (category) {
      case 'Teologia': return 'border-theology/20';
      case 'Filosofia': return 'border-philosophy/20';
      case 'Psicanálise': return 'border-psicanalise/20';
      default: return 'border-navy/5';
    }
  };

  const isPublicDomain = ebook.contentTypeLabel === 'public_domain';

  return (
    <motion.div
      onClick={() => onClick(ebook)}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer rounded-sm overflow-hidden flex flex-col h-full bg-white border border-gray-100 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] relative"
    >
      {/* Favorite button */}
      {onToggleFavorite && (
        <button
          onClick={handleFavorite}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-sm group-hover:scale-110"
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`}
          />
        </button>
      )}

      {/* COVER AREA */}
      <div className={`h-[380px] relative overflow-hidden flex flex-col p-10 transition-all duration-1000 ${getCategoryBg(ebook.category)} border-b border-gray-100 grain`}>
        <div className={`absolute inset-4 border ${getCategoryBorder(ebook.category)} opacity-0 group-hover:opacity-40 transition-opacity duration-1000 pointer-events-none z-10`} />

        {ebook.cover && (
          <div className="absolute inset-0 z-0">
            <img
              src={ebook.cover}
              alt=""
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale opacity-[0.05] group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          </div>
        )}

        {/* CONTENT TYPE BADGE */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5">
          {isPublicDomain ? (
            <div
              className="px-2.5 py-1 text-[8px] font-black uppercase tracking-widest rounded-sm shadow-lg"
              style={{ background: 'linear-gradient(135deg, #1a3a2a, #2d6a4f)', color: '#a8edbd' }}
            >
              📜 Obra Integral · Domínio Público
            </div>
          ) : (
            <div
              className="px-2.5 py-1 text-[8px] font-black uppercase tracking-widest rounded-sm shadow-lg"
              style={{ background: 'linear-gradient(135deg, #1a2a3a, #2d4a6a)', color: '#a8c8ed' }}
            >
              ✍ Síntese Autoral
            </div>
          )}
        </div>

        {/* NEW badge */}
        {ebook.isNew && (
          <div className="absolute top-16 left-4 z-20 px-3 py-1 bg-black text-white text-[8px] font-black uppercase tracking-widest rounded-sm shadow-2xl group-hover:bg-gold group-hover:text-black transition-colors duration-700">
            NOVO
          </div>
        )}

        <div className="relative z-20 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <div className={`text-[9px] font-black uppercase tracking-[0.6em] ${getCategoryColor(ebook.category)} group-hover:text-white transition-colors duration-700`}>
              STUDIO LOGOS
            </div>
            <div className={`w-1.5 h-1.5 rounded-full ${getCategoryColor(ebook.category).replace('text-', 'bg-')} group-hover:bg-gold group-hover:scale-150 transition-all duration-700`} />
          </div>

          <div className="mt-auto space-y-4">
            <div className="flex flex-col space-y-2">
              <span className={`text-[10px] uppercase tracking-[0.5em] font-black ${getCategoryColor(ebook.category)} group-hover:text-gold transition-colors duration-700`}>
                {ebook.category}
              </span>
              <div className={`w-12 h-px ${getCategoryColor(ebook.category).replace('text-', 'bg-')} group-hover:bg-gold group-hover:w-24 transition-all duration-700`} />
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl text-navy leading-[1.1] font-medium tracking-tight group-hover:text-white transition-colors duration-700">
              {ebook.displayTitle || ebook.title}
            </h3>

            {ebook.subtitle && (
              <p className="text-sm text-gray-600 group-hover:text-white/80 transition-colors italic">
                {ebook.subtitle}
              </p>
            )}

            <div className="pt-6 border-t border-navy/10 group-hover:border-white/20 flex flex-col space-y-2">
              <div className="text-[8px] font-black text-navy/20 group-hover:text-white/40 uppercase tracking-widest">
                {isPublicDomain ? 'AUTOR ORIGINAL' : 'AUTORIDADE'}
              </div>
              <div className="text-sm font-serif group-hover:text-gold text-navy transition-colors duration-700">
                {ebook.authorReference}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INFO AREA */}
      <div className="p-8 flex flex-col flex-grow bg-white relative z-10 group-hover:translate-y-[-2px] transition-transform duration-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 text-[9px] text-gray-400 font-black uppercase tracking-[0.4em]">
            <div className={`w-1 h-1 rounded-full bg-gray-200 group-hover:bg-gold transition-colors`} />
            <span>{ebook.subcategory || ebook.collection}</span>
          </div>
          {isPublicDomain && (
            <span className="text-[8px] font-semibold px-2 py-0.5 rounded-full" style={{ background: '#f0faf4', color: '#2d6a4f' }}>
              {ebook.originalLanguage ? `Original: ${ebook.originalLanguage}` : 'Domínio Público'}
            </span>
          )}
        </div>

        <p className="text-sm text-muted/80 leading-relaxed line-clamp-3 mb-6 flex-grow font-medium group-hover:text-navy transition-colors duration-700">
          {ebook.description}
        </p>

        {/* Content type info */}
        {isPublicDomain && ebook.copyrightStatus === 'public_domain_verified' && (
          <div className="mb-4 px-3 py-2 rounded text-[10px] leading-relaxed" style={{ background: '#f0faf4', color: '#2d6a4f', border: '1px solid #c3e6cb' }}>
            ✓ Obra integral verificada · Leitura online exclusiva · {ebook.translator ? `Trad. ${ebook.translator}` : 'Tradução de domínio público'}
          </div>
        )}

        <div className="flex items-center justify-between pt-5 border-t border-gray-100">
          <div className="flex items-center text-[9px] uppercase tracking-[0.3em] text-muted font-black group-hover:text-gold transition-colors duration-700">
            <Clock className="w-4 h-4 mr-2" />
            <span>{ebook.readingTime}</span>
          </div>

          <button
            onClick={handleRead}
            className="flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-sm text-[10px] font-black uppercase tracking-[0.3em] hover:bg-gold hover:text-black transition-all shadow-xl active:scale-95 cursor-pointer z-20"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isPublicDomain ? 'LER OBRA' : 'ESTUDAR'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
