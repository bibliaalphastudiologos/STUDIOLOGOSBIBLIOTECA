import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Heart } from 'lucide-react';
import { Ebook } from '../types';
import { useNavigate } from 'react-router-dom';
import { getEditorialCoverImageForText } from '../lib/coverArt';

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
    navigate(`/reader/${ebook.id}`);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(ebook.id);
  };

  const coverImage = getEditorialCoverImageForText(ebook.category, ebook.title, ebook.authorReference || '');

  // Accent color por categoria — linha no topo do card
  const getCategoryAccent = (category: string): string => {
    switch (category) {
      case 'Teologia':               return '#c9a227';
      case 'Filosofia':              return '#7ba7d4';
      case 'Psicanálise':            return '#b89fd4';
      case 'Espiritualidade':
      case 'Espiritualidade Cristã': return '#7ac49a';
      case 'Literatura':
      case 'Literatura Brasileira':  return '#e8905a';
      case 'História':               return '#9fb2c9';
      default:                       return '#c9a227';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Teologia':               return 'text-theology';
      case 'Filosofia':              return 'text-philosophy';
      case 'Psicanálise':            return 'text-psicanalise';
      default:                       return 'text-navy';
    }
  };

  const getCategoryBg = (category: string) => {
    switch (category) {
      case 'Teologia':               return 'bg-theology/5 hover:bg-theology/10';
      case 'Filosofia':              return 'bg-philosophy/5 hover:bg-philosophy/10';
      case 'Psicanálise':            return 'bg-psicanalise/5 hover:bg-psicanalise/10';
      default:                       return 'bg-gray-50';
    }
  };

  const accent = getCategoryAccent(ebook.category);

  return (
    <motion.div
      onClick={() => onClick(ebook)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer rounded-sm overflow-hidden flex flex-col h-full bg-white border border-gray-100 transition-shadow duration-500 hover:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.14)] relative"
    >
      {/* Linha accent de categoria no topo */}
      <div
        className="absolute top-0 left-0 w-full h-[3px] z-30 transition-all duration-500 group-hover:h-[4px]"
        style={{ background: accent }}
      />

      {/* Botão favorito */}
      {onToggleFavorite && (
        <button
          onClick={handleFavorite}
          className="absolute top-5 right-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-sm"
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'
            }`}
          />
        </button>
      )}

      {/* Capa */}
      <div className={`h-[320px] relative overflow-hidden flex flex-col p-10 transition-all duration-1000 ${getCategoryBg(ebook.category)} border-b border-gray-100`}>
        <div className="absolute inset-0 z-0">
          <img
            src={coverImage}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-80 saturate-[0.88] contrast-[1.06] group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.4s] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/8 transition-opacity duration-700" />
        </div>

        <div className="relative z-20 flex flex-col h-full">
          {/* Topo */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-[8px] font-black uppercase tracking-[0.55em] text-white/50 group-hover:text-white/70 transition-colors duration-500">
              STUDIO LOGOS
            </div>
            <div
              className="w-1.5 h-1.5 rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"
              style={{ background: accent }}
            />
          </div>

          {/* Info na base da capa */}
          <div className="mt-auto space-y-3">
            <div className="flex flex-col space-y-1.5">
              <span
                className="text-[9px] uppercase tracking-[0.48em] font-black transition-colors duration-500"
                style={{ color: accent }}
              >
                {ebook.category}
              </span>
              <div
                className="h-px w-10 group-hover:w-20 transition-all duration-700"
                style={{ background: accent }}
              />
            </div>

            <h3 className="font-serif text-[1.7rem] sm:text-[2rem] text-white leading-[1.1] font-bold tracking-tight">
              {ebook.title}
            </h3>

            {ebook.subtitle && (
              <p className="text-sm text-white/70 italic font-medium leading-snug">
                {ebook.subtitle}
              </p>
            )}

            <div className="pt-4 border-t border-white/15 flex flex-col space-y-1">
              <div className="text-[7px] font-black text-white/35 uppercase tracking-widest">
                AUTOR
              </div>
              <div className="text-sm font-serif text-white/85 font-medium">
                {ebook.authorReference}
              </div>
            </div>
          </div>
        </div>

        {ebook.isNew && (
          <div
            className="absolute top-6 left-4 px-3 py-1 text-[8px] font-black uppercase tracking-widest text-white rounded-sm shadow-lg z-30"
            style={{ background: accent }}
          >
            NOVO
          </div>
        )}
      </div>

      {/* Corpo do card */}
      <div className="p-7 flex flex-col flex-grow bg-white relative z-10">
        {/* Subcategoria */}
        <div className="flex items-center gap-2 text-[8px] text-[#1A1A1A]/45 font-black uppercase tracking-[0.4em] mb-4">
          <div className="w-1 h-1 rounded-full" style={{ background: accent }} />
          <span>{ebook.subcategory || ebook.collection}</span>
        </div>

        {/* Descrição */}
        <p className="text-[0.82rem] text-[#1A1A1A]/70 leading-relaxed line-clamp-3 mb-5 flex-grow">
          {ebook.description}
        </p>

        {/* Tags */}
        {ebook.learn && ebook.learn.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {ebook.learn.slice(0, 2).map((item, i) => (
              <span
                key={i}
                className="text-[8px] px-2 py-0.5 rounded-sm font-semibold"
                style={{
                  background: `${accent}14`,
                  color: accent,
                  border: `1px solid ${accent}30`,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {/* Rodapé */}
        <div className="pt-5 border-t border-gray-100 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[8px] uppercase tracking-[0.28em] text-[#1A1A1A]/45 font-black">
            <Clock className="w-3.5 h-3.5" />
            <span>{ebook.readingTime}</span>
          </div>

          {onToggleFavorite ? (
            <button
              onClick={handleFavorite}
              className="p-2 rounded-full hover:bg-red-50 transition-colors self-end"
              aria-label="Favoritar"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-300 hover:text-red-500'
                }`}
              />
            </button>
          ) : (
            <button
              onClick={handleRead}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-sm text-[9px] font-black uppercase tracking-[0.28em] transition-all duration-300 active:scale-[0.98] cursor-pointer"
              style={{
                background: accent,
                color: '#fff',
              }}
              onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.1)')}
              onMouseLeave={e => (e.currentTarget.style.filter = 'brightness(1)')}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Estudar Agora</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
