import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, GraduationCap, Cpu, PenTool, Layout, Users } from 'lucide-react';

export const PageCover: React.FC = () => {
  return (
    <div className="ebook-page flex flex-col justify-between items-center text-center p-0">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="grid grid-cols-8 gap-4 p-4 text-slate-400">
          {Array.from({ length: 120 }).map((_, i) => (
            <div key={i} className="text-2xl font-bold">
              {String.fromCharCode(65 + (i % 26))}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-[32%] bg-gradient-to-br from-blue-900 to-em-purple flex items-center justify-center relative overflow-hidden">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="z-10 text-white"
        >
          <GraduationCap size={96} className="mb-4 opacity-80" />
        </motion.div>
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-em-gold opacity-20 rounded-full blur-3xl"></div>
      </div>

      <div className="px-12 py-6 z-10">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-heading text-5xl font-bold text-em-dark tracking-tighter mb-2"
        >
          PORTUGUÊS EM AÇÃO <span className="text-em-purple">2026</span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg font-light text-slate-600 mb-6 max-w-lg"
        >
          Linguagem, leitura, produção textual e desempenho escolar
        </motion.p>

        <div className="flex justify-center gap-8 mb-8">
           <div className="flex flex-col items-center gap-2">
             <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-em-purple shadow-sm">
               <Cpu size={24} />
             </div>
             <span className="text-[9px] uppercase tracking-[0.2em] font-black text-slate-400">Tecnologia</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-ef-orange shadow-sm">
               <PenTool size={24} />
             </div>
             <span className="text-[9px] uppercase tracking-[0.2em] font-black text-slate-400">Escrita</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-ef-blue shadow-sm">
               <BookOpen size={24} />
             </div>
             <span className="text-[9px] uppercase tracking-[0.2em] font-black text-slate-400">Leitura</span>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8">
            <div className="p-3 bg-slate-50 rounded-xl text-left border border-slate-100">
                <span className="text-[8px] font-bold text-em-purple uppercase">Alinhamento</span>
                <p className="text-[10px] font-bold text-slate-800">BNCC & Currículo Paulista</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl text-left border border-slate-100">
                <span className="text-[8px] font-bold text-em-gold uppercase">Avaliações</span>
                <p className="text-[10px] font-bold text-slate-800">SARESP, AAP, ENEM</p>
            </div>
        </div>

        <div className="border-t border-slate-200 pt-6 mt-2">
          <p className="text-sm font-medium text-slate-400 mb-1">AUTOR</p>
          <p className="text-2xl font-heading font-bold text-slate-800">Professor Erick P. Silva</p>
        </div>
      </div>

      <div className="w-full p-6 bg-slate-50 flex justify-between items-center border-t border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-em-dark rounded flex items-center justify-center text-white text-xs font-bold">
            SP
          </div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Currículo Paulista & BNCC</span>
        </div>
        <div className="text-[10px] text-slate-400 font-mono">EDITION 2026_PREMIUM</div>
      </div>
    </div>
  );
};
