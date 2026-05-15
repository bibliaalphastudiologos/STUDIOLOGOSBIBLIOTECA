import React from 'react';
import { motion } from 'motion/react';
import { Layers, Bookmark, ArrowRight } from 'lucide-react';

interface Props {
  bimester: number;
  title: string;
  grade: string;
}

export const PageDivider: React.FC<Props> = ({ bimester, title, grade }) => {
  return (
    <div className="ebook-page flex flex-col items-center justify-center text-center bg-slate-900 text-white p-0 overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="grid grid-cols-4 gap-8 rotate-12 scale-150">
           {Array.from({ length: 16 }).map((_, i) => (
             <Bookmark key={i} size={200} className="text-slate-400" />
           ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="z-10"
      >
        <div className="w-24 h-24 bg-em-gold rounded-full flex items-center justify-center mb-8 mx-auto shadow-2xl">
           <span className="text-slate-900 font-heading font-black text-4xl">{bimester}º</span>
        </div>
        
        <span className="text-em-gold font-bold tracking-[0.5em] uppercase text-xs mb-4 block">Bimestre Letivo</span>
        <h2 className="font-heading text-6xl font-black mb-4 tracking-tighter uppercase">{title}</h2>
        <div className="h-1 w-32 bg-white/20 mx-auto mb-8"></div>
        
        <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
          <span className="text-sm font-bold opacity-60 uppercase">{grade}</span>
          <ArrowRight className="text-em-gold" size={16} />
          <span className="text-sm font-bold uppercase">Material Premium</span>
        </div>
      </motion.div>

      <div className="absolute bottom-12 left-0 w-full flex justify-center gap-2">
         {[1,2,3,4].map(b => (
           <div key={b} className={`w-2 h-2 rounded-full ${b === bimester ? 'bg-em-gold w-8' : 'bg-white/20'} transition-all`} />
         ))}
      </div>
    </div>
  );
};
