import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, BookOpen, Crown, Shield, AlertCircle, X } from 'lucide-react';
import { signInWithGoogle } from '../lib/firebase';
import { useAuth } from '../lib/AuthContext';

export const Hero: React.FC = () => {
  const { user, profile } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLoginClick = async () => {
    setLoginError(null);
    setIsLoggingIn(true);
    try {
      await signInWithGoogle();
    } catch (error: any) {
      console.error('Login error:', error);
      setLoginError(error.message || 'Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <section className="relative overflow-hidden pt-24 pb-32 lg:pt-40 lg:pb-64 bg-[#fafaf9] map-grid">
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-[#fafaf9] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none grain" />
      
      {/* Atmospheric Accents */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-gold/10 rounded-full blur-[150px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-navy/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-4 mb-16"
          >
            <div className="h-px w-8 bg-gold opacity-50" />
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-gold/80">Academia Presidencial studio logos</span>
            <div className="h-px w-8 bg-gold opacity-50" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-6xl sm:text-8xl lg:text-[10rem] text-navy leading-[0.85] tracking-tight mb-16"
          >
            Poder para <br />
            <span className="relative inline-block font-medium">
              compreender.
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
                className="absolute -bottom-2 left-0 h-[2px] bg-gold/30"
              />
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-2xl mx-auto text-base md:text-lg text-muted/80 leading-relaxed mb-20 font-medium uppercase tracking-[0.2em] px-4"
          >
            O epicentro da síntese intelectual. <br />
            <span className="text-navy font-black">Teologia, Filosofia e Psicanálise para a Elite do Pensamento.</span>
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-32 w-full"
          >
             <button
               onClick={() => {
                 if (profile?.status === 'approved') {
                   const el = document.getElementById('biblioteca');
                   el?.scrollIntoView({ behavior: 'smooth' });
                 } else if (user) {
                   window.open('https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=bcf17285bfd64b70b1892692538db1ed', '_blank');
                 } else {
                   handleLoginClick();
                 }
               }}
               disabled={isLoggingIn}
               className="premium-button w-full sm:w-auto text-[11px] uppercase tracking-[0.6em] font-black px-20 py-8 flex items-center justify-center group shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-all duration-500 sheen-wrapper disabled:opacity-50 disabled:cursor-not-allowed"
             >
               <span>
                 {isLoggingIn 
                   ? 'CONECTANDO...' 
                   : profile?.status === 'approved' 
                   ? 'ABRIR BIBLIOTECA ALPHA' 
                   : user 
                   ? 'REATIVAR MEMBRESIA' 
                   : 'TORNAR-SE ALUNO ALPHA'}
               </span>
               {!isLoggingIn && <ArrowRight className="w-4 h-4 ml-6 group-hover:translate-x-3 transition-transform duration-500" />}
             </button>
             <a
               href="#biblioteca"
               className="w-full sm:w-auto flex items-center justify-center px-16 py-8 border border-navy/10 text-[11px] uppercase tracking-[0.6em] font-black opacity-40 hover:opacity-100 hover:border-navy transition-all duration-500"
             >
               CATÁLOGO DE ESTUDOS
             </a>
          </motion.div>

          {/* Login Error Alert */}
          <AnimatePresence>
            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-8 p-4 bg-red-50 border border-red-200 rounded-sm flex items-start gap-3 max-w-md w-full"
              >
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-900">Erro ao conectar</p>
                  <p className="text-sm text-red-700">{loginError}</p>
                </div>
                <button
                  onClick={() => setLoginError(null)}
                  className="text-red-600 hover:text-red-900 flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expert Segments */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="flex flex-wrap justify-center gap-x-16 gap-y-12"
          >
            {[
              { label: 'TEOLOGIA', icon: Shield },
              { label: 'FILOSOFIA', icon: BookOpen },
              { label: 'PSICANÁLISE', icon: Crown }
            ].map((topic, i) => (
              <div key={topic.label} className="group flex flex-col items-center">
                <topic.icon className="w-5 h-5 text-gold opacity-30 group-hover:opacity-100 transition-opacity mb-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-navy/40 group-hover:text-navy transition-colors">{topic.label}</span>
                <div className="mt-4 w-4 h-px bg-gold/20 group-hover:w-8 transition-all" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
