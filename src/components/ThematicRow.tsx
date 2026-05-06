import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export function ThematicRow() {
  const themes = [
    { title: "Estética Transcendental", author: "Kant & Schiller", image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=800" },
    { title: "Soberania e Poder", author: "Hobbes & Schmitt", image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800" },
    { title: "Mística e Oculto", author: "Eckhart & Jung", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800" }
  ];

  return (
    <section className="py-32 px-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-6">
        <div className="space-y-4">
          <span className="accent-gold text-[10px] uppercase tracking-[0.6em] font-black">Trilhas de Estudo</span>
          <h2 className="text-5xl font-serif text-[#1A1A1A]">Eixos <span className="italic">Providenciais</span></h2>
        </div>
        <p className="max-w-md text-sm text-black/50 font-serif leading-relaxed text-left">
          Curadorias transversais que conectam diferentes autores sob um único prisma intelectual.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {themes.map((theme, idx) => (
          <motion.div 
            key={idx}
            initial={{ scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm ebook-shadow mb-8">
              <img 
                src={theme.image} 
                alt={theme.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0 brightness-75 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-[9px] accent-gold font-black uppercase tracking-widest mb-2 block text-left">Dossiê Exclusivo</span>
                <h3 className="text-2xl text-white font-serif mb-4 text-left">{theme.title}</h3>
                <div className="flex items-center gap-3 text-[10px] text-white/60 tracking-widest uppercase font-bold">
                  SÍNTESE ATIVA <BookOpen className="w-3 h-3" />
                </div>
              </div>
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30 group-hover:text-[#B48A3D] transition-colors">Referência: {theme.author}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
