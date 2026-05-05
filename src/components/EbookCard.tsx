import React from 'react';
import { motion } from 'motion/react';
import { Clock, BookOpen, Heart, Star, Zap } from 'lucide-react';
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
      case 'Teologia': return { text: 'text-theology', bg: 'bg-theology', light: 'bg-theology/10' };
      case 'Filosofia': return { text: 'text-philosophy', bg: 'bg-philosophy', light: 'bg-philosophy/10' };
      case 'Psicanálise': return { text: 'text-psicanalise', bg: 'bg-psicanalise', light: 'bg-psicanalise/10' };
      default: return { text: 'text-navy', bg: 'bg-navy', light: 'bg-navy/10' };
    }
  };

  const isPublicDomain = ebook.contentTypeLabel === 'public_domain';
  const colors = getCategoryColor(ebook.category);

  return (
    <motion.div
      onClick={() => onClick(ebook)}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -16, scale: 1.04 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer rounded-lg overflow-hidden flex flex-col h-full bg-white border border-gray-200 transition-all duration-500 hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] relative"
    >
      {/* Favorite button */}
      {onToggleFavorite && (
        <motion.button
          onClick={handleFavorite}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-lg group-hover:shadow-xl"
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart
            className={`w-5 h-5 transition-all ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`}
          />
        </motion.button>
      )}

      {/* COVER AREA - Premium Design */}
      <div className={`relative h-[420px] overflow-hidden flex flex-col p-8 transition-all duration-1000 ${colors.light} border-b border-gray-200 grain`}>
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-5" />

        {/* Book cover image */}
        {ebook.cover && (
          <motion.div
            className="absolute inset-0 z-0"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 1.5 }}
          >
            <img
              src={ebook.cover}
              alt=""
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-[0.08] group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-[1.5s]"
            />
          </motion.div>
        )}

        {/* Content type badge */}
        <div className="relative z-20 flex items-center justify-between mb-auto">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className={`text-[9px] font-black uppercase tracking-[0.5em] ${colors.text} group-hover:text-gold transition-colors duration-700`}
          >
            {ebook.category}
          </motion.div>

          {isPublicDomain && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 border border-green-500/40"
            >
              <Zap className="w-3 h-3 text-green-600" />
              <span className="text-[7px] font-black text-green-700 uppercase tracking-widest">Domínio Público</span>
            </motion.div>
          )}
        </div>

        {/* NEW badge */}
        {ebook.isNew && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-4 z-20 px-3 py-1 bg-gold text-navy text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg"
          >
            ✨ NOVO
          </motion.div>
        )}

        {/* Title and subtitle */}
        <div className="relative z-20 mt-auto space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-1 h-1 rounded-full ${colors.bg} group-hover:bg-gold transition-colors duration-700`} />
            <span className={`text-[8px] font-black uppercase tracking-[0.4em] ${colors.text} group-hover:text-gold transition-colors duration-700`}>
              {ebook.subcategory || ebook.collection}
            </span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-navy leading-tight font-semibold group-hover:text-gold transition-colors duration-700">
            {ebook.displayTitle || ebook.title}
          </h3>

          {ebook.subtitle && (
            <p className="text-xs text-gray-600 group-hover:text-navy/70 transition-colors italic line-clamp-2">
              {ebook.subtitle}
            </p>
          )}

          {/* Author */}
          <div className="pt-4 border-t border-navy/10 group-hover:border-gold/30 transition-colors duration-700">
            <p className="text-[8px] font-black text-navy/40 group-hover:text-gold/60 uppercase tracking-widest mb-1">
              {isPublicDomain ? 'AUTOR CLÁSSICO' : 'AUTORIDADE'}
            </p>
            <p className="text-sm font-serif text-navy group-hover:text-gold transition-colors duration-700">
              {ebook.authorReference}
            </p>
          </div>
        </div>
      </div>

      {/* INFO AREA */}
      <div className="p-6 flex flex-col flex-grow bg-white relative z-10">
        {/* Description */}
        <p className="text-sm text-muted/80 leading-relaxed line-clamp-3 mb-4 flex-grow font-medium group-hover:text-navy transition-colors duration-700">
          {ebook.description}
        </p>

        {/* Public domain info */}
        {isPublicDomain && ebook.copyrightStatus === 'public_domain_verified' && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-4 px-3 py-2 rounded-lg text-[9px] leading-relaxed bg-green-50 border border-green-200 text-green-700 font-medium"
          >
            ✓ Obra integral verificada · Leitura 100% online · {ebook.translator ? `Trad. ${ebook.translator}` : 'Tradução verificada'}
          </motion.div>
        )}

        {/* Metadata */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mb-4">
          <div className="flex items-center text-[9px] uppercase tracking-[0.3em] text-muted font-black group-hover:text-gold transition-colors duration-700">
            <Clock className="w-4 h-4 mr-1.5" />
            <span>{ebook.readingTime}</span>
          </div>

          {ebook.level && (
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    (ebook.level === 'Iniciante' && i === 1) ||
                    (ebook.level === 'Intermediário' && i <= 2) ||
                    (ebook.level === 'Avançado' && i <= 3)
                      ? 'fill-gold text-gold'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* CTA Button */}
        <motion.button
          onClick={handleRead}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 shadow-lg hover:shadow-xl ${
            isPublicDomain
              ? 'bg-navy text-white hover:bg-gold hover:text-navy'
              : `${colors.bg} text-white hover:bg-gold hover:text-navy`
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{isPublicDomain ? 'LER OBRA' : 'ESTUDAR'}</span>
        </motion.button>
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-1000 pointer-events-none z-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />
      </div>
    </motion.div>
  );
};
