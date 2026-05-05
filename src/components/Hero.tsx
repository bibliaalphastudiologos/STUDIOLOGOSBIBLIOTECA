import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, BookOpen, Shield, Crown, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { signInWithGoogle } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLoginClick = async () => {
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      await signInWithGoogle();
    } catch (error: any) {
      setLoginError(error?.message || 'Erro ao conectar com Google');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleTopicClick = (path: string) => {
    navigate(path);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1a2847] to-[#fafaf9] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center space-y-12 w-full">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 text-gold text-xs font-black uppercase tracking-[0.4em]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Plataforma Premium de Leitura Online</span>
            <Sparkles className="w-4 h-4" />
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight"
          >
            Studio Logos
            <span className="block text-gold mt-2">
              Grandes Obras Clássicas
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-3xl mx-auto text-lg md:text-xl text-white/80 leading-relaxed font-medium"
          >
            O Studio Logos reúne grandes obras clássicas em uma experiência de leitura online premium, organizada para quem deseja estudar, pesquisar e crescer intelectualmente.
          </motion.p>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              Leia <strong>dentro do site</strong>, sem downloads. Acesso a obras em domínio público, traduções verificadas, e sínteses exclusivas de <strong>Filosofia, Teologia, Literatura Brasileira e Literatura Portuguesa</strong>.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full"
          >
            <button
              onClick={() => {
                if (profile?.status === 'approved') {
                  document.getElementById('biblioteca')?.scrollIntoView({ behavior: 'smooth' });
                } else if (user) {
                  window.open('https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=bcf17285bfd64b70b1892692538db1ed', '_blank');
                } else {
                  handleLoginClick();
                }
              }}
              disabled={isLoggingIn}
              className="w-full sm:w-auto px-12 py-5 bg-gold text-navy font-black text-sm uppercase tracking-[0.3em] rounded-sm hover:bg-white transition-all duration-300 shadow-2xl hover:shadow-gold/50 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
            >
              <Crown className="w-5 h-5" />
              <span>
                {isLoggingIn
                  ? 'CONECTANDO...'
                  : profile?.status === 'approved'
                  ? 'ABRIR BIBLIOTECA'
                  : user
                  ? 'REATIVAR ASSINATURA'
                  : 'ASSINAR AGORA'}
              </span>
              {!isLoggingIn && <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />}
            </button>

            <button
              onClick={() => document.getElementById('biblioteca')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-12 py-5 border-2 border-white/30 text-white font-black text-sm uppercase tracking-[0.3em] rounded-sm hover:border-white hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <BookOpen className="w-5 h-5" />
              <span>Explorar Catálogo</span>
            </button>
          </motion.div>

          {/* Login Error Alert */}
          <AnimatePresence>
            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-md mx-auto p-4 bg-red-500/20 border border-red-400/50 rounded-sm flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-200">Erro ao conectar</p>
                  <p className="text-sm text-red-100">{loginError}</p>
                </div>
                <button
                  onClick={() => setLoginError(null)}
                  className="text-red-400 hover:text-red-300 flex-shrink-0"
                >
                  ✕
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="pt-12 border-t border-white/10"
          >
            <p className="text-white/60 text-xs font-black uppercase tracking-[0.3em] mb-8">
              Especialidades do Studio Logos
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {[
                { label: 'TEOLOGIA', icon: Shield, path: '/teologia' },
                { label: 'FILOSOFIA', icon: BookOpen, path: '/filosofia' },
                { label: 'PSICANÁLISE', icon: Crown, path: '/psicanalise' }
              ].map((topic, idx) => (
                <motion.button
                  key={topic.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + idx * 0.1 }}
                  onClick={() => handleTopicClick(topic.path)}
                  className="group flex flex-col items-center cursor-pointer hover:scale-110 transition-transform duration-300"
                >
                  <topic.icon className="w-6 h-6 text-gold/60 group-hover:text-gold transition-colors mb-3" />
                  <span className="text-xs font-black uppercase tracking-[0.4em] text-white/60 group-hover:text-gold transition-colors">
                    {topic.label}
                  </span>
                  <div className="mt-3 w-6 h-px bg-gold/30 group-hover:w-12 group-hover:bg-gold transition-all duration-300" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="pt-12 grid grid-cols-3 gap-8 text-center"
          >
            <div>
              <p className="text-2xl md:text-3xl font-black text-gold">500+</p>
              <p className="text-xs text-white/60 uppercase tracking-widest mt-2">Obras em Domínio Público</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-black text-gold">100%</p>
              <p className="text-xs text-white/60 uppercase tracking-widest mt-2">Leitura Online Segura</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-black text-gold">4</p>
              <p className="text-xs text-white/60 uppercase tracking-widest mt-2">Categorias Premium</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/40 text-xs uppercase tracking-[0.3em] font-black"
        >
          ↓ Explore a Biblioteca
        </motion.div>
      </motion.div>
    </section>
  );
};
