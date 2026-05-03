import React from 'react';
import { BookOpen, Clock, Heart, TrendingUp, Award, BookMarked } from 'lucide-react';
import { ReadingStats } from '../types';

interface EbookStatsProps {
  stats: ReadingStats;
  totalEbooks: number;
  favoritesCount: number;
}

export const EbookStats: React.FC<EbookStatsProps> = ({
  stats,
  totalEbooks,
  favoritesCount,
}) => {
  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'Nunca';
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      {/* Total de ebooks */}
      <div className="bg-gradient-to-br from-navy/5 to-navy/10 rounded-sm p-4 border border-navy/10">
        <div className="flex items-center justify-between mb-2">
          <BookOpen className="w-5 h-5 text-navy" />
          <span className="text-xs font-medium text-gray-500">CATÁLOGO</span>
        </div>
        <p className="text-2xl font-bold text-navy">{totalEbooks}</p>
        <p className="text-xs text-gray-600">ebooks disponíveis</p>
      </div>

      {/* Lidos */}
      <div className="bg-gradient-to-br from-gold/5 to-gold/10 rounded-sm p-4 border border-gold/10">
        <div className="flex items-center justify-between mb-2">
          <BookMarked className="w-5 h-5 text-gold" />
          <span className="text-xs font-medium text-gray-500">LIDOS</span>
        </div>
        <p className="text-2xl font-bold text-gold">{stats.totalRead}</p>
        <p className="text-xs text-gray-600">obras concluídas</p>
      </div>

      {/* Lendo agora */}
      <div className="bg-gradient-to-br from-theology/5 to-theology/10 rounded-sm p-4 border border-theology/10">
        <div className="flex items-center justify-between mb-2">
          <TrendingUp className="w-5 h-5 text-theology" />
          <span className="text-xs font-medium text-gray-500">LENDO AGORA</span>
        </div>
        <p className="text-2xl font-bold text-theology">{stats.currentlyReading}</p>
        <p className="text-xs text-gray-600">em andamento</p>
      </div>

      {/* Tempo de leitura */}
      <div className="bg-gradient-to-br from-psicanalise/5 to-psicanalise/10 rounded-sm p-4 border border-psicanalise/10">
        <div className="flex items-center justify-between mb-2">
          <Clock className="w-5 h-5 text-psicanalise" />
          <span className="text-xs font-medium text-gray-500">TEMPO</span>
        </div>
        <p className="text-2xl font-bold text-psicanalise">{formatTime(stats.readingTime)}</p>
        <p className="text-xs text-gray-600">de leitura total</p>
      </div>

      {/* Favoritos */}
      <div className="bg-gradient-to-br from-red-500/5 to-red-500/10 rounded-sm p-4 border border-red-500/10">
        <div className="flex items-center justify-between mb-2">
          <Heart className="w-5 h-5 text-red-600" />
          <span className="text-xs font-medium text-gray-500">FAVORITOS</span>
        </div>
        <p className="text-2xl font-bold text-red-600">{favoritesCount}</p>
        <p className="text-xs text-gray-600">marcados</p>
      </div>
    </div>
  );
};
