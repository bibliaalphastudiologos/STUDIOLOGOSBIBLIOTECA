import React, { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { BookOpen, Brain, Heart, User, Loader2 } from 'lucide-react';

export const Hero: React.FC = () => {
  // Autenticação removida

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-navy via-navy/90 to-black grain">
      <div className="max-w-4xl mx-auto px-4 text-center text-white relative z-10">
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6">
          Biblioteca Premium
          <span className="block text-gold text-2xl md:text-3xl mt-2">de Conhecimento</span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Acesso a milhares de obras clássicas de Teologia, Filosofia e Psicanálise
        </p>

        {/* Autenticação removida */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-gold" />
            </div>
            <h3 className="font-serif text-xl mb-2">Teologia</h3>
            <p className="text-white/70">Obras clássicas e estudos bíblicos</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
              <Brain className="w-8 h-8 text-gold" />
            </div>
            <h3 className="font-serif text-xl mb-2">Filosofia</h3>
            <p className="text-white/70">Grandes filósofos da humanidade</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-gold" />
            </div>
            <h3 className="font-serif text-xl mb-2">Psicanálise</h3>
            <p className="text-white/70">Fundamentos e desenvolvimento</p>
          </div>
        </div>
      </div>
    </section>
  );
};