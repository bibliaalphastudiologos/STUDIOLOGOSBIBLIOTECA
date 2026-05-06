import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg"
      >
        <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-10">
          <BookOpen className="w-10 h-10 text-gold" />
        </div>
        <div className="text-[10px] font-black uppercase tracking-[0.6em] text-gold mb-6">ERRO 404</div>
        <h1 className="font-serif text-6xl text-navy mb-6 leading-tight">
          Página não<br/>encontrada.
        </h1>
        <p className="text-muted text-base mb-12 leading-relaxed">
          Esta página não existe ou foi movida. Volte à biblioteca para continuar sua jornada.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="premium-button px-10 py-4 text-[10px] uppercase tracking-[0.4em] font-black flex items-center gap-3"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Voltar ao Início
          </button>
          <button
            onClick={() => { navigate('/'); setTimeout(() => document.getElementById('biblioteca')?.scrollIntoView({ behavior: 'smooth' }), 300); }}
            className="px-10 py-4 border border-navy text-navy text-[10px] uppercase tracking-[0.4em] font-black hover:bg-navy hover:text-white transition-all"
          >
            Ver Biblioteca
          </button>
        </div>
      </motion.div>
    </div>
  );
};
