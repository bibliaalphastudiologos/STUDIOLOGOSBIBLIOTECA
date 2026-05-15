/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Grid, 
  BookOpen, 
  Layout, 
  Calendar, 
  PenTool,
  Trophy,
  Menu,
  X,
  Info,
  Link2
} from 'lucide-react';
import { PageCover } from './components/PageCover.tsx';
import { PageCalendar } from './components/PageCalendar.tsx';
import { PageIntro } from './components/PageIntro.tsx';
import { PageUnit } from './components/PageUnit.tsx';
import { PageWritingHighSchool } from './components/PageWritingHighSchool.tsx';
import { LanguageLab } from './components/LanguageLab.tsx';
import { PageTeacherPlanner } from './components/PageTeacherPlanner.tsx';
import { PageAssessments } from './components/PageAssessments.tsx';
import { PagePowerBI } from './components/PagePowerBI.tsx';
import { UNITS } from './data.ts';
import { Grade } from './types.ts';

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filterGrade, setFilterGrade] = useState<Grade | 'all'>('all');

  const filteredUnits = filterGrade === 'all' 
    ? UNITS 
    : UNITS.filter(u => u.grade === filterGrade);

  // Total pages logic for a massive book experience
  const totalPages = 4 + filteredUnits.length + 4;

  const getVirtualPage = (idx: number) => {
    if (idx === 0) return 1;
    if (idx === 1) return 3;
    if (idx === 2) return 8;
    if (idx === 3) return 12;
    return 20 + (idx - 4) * 15; // Simulate 15 pages per unit
  };

  const renderPage = (index: number) => {
    if (index === 0) return <PageCover />;
    if (index === 1) return <PageIntro />;
    if (index === 2) return <PageCalendar />;
    if (index === 3) return <PageTeacherPlanner />;
    
    const unitIndex = index - 4;
    if (unitIndex >= 0 && unitIndex < filteredUnits.length) {
      const unit = filteredUnits[unitIndex];
      // Every first unit of a bimester gets a virtual divider or extra space
      return <PageUnit unit={unit} pageNumber={getVirtualPage(index)} />;
    }
    
    if (index === 4 + filteredUnits.length) return <PageAssessments />;
    if (index === 5 + filteredUnits.length) return <PageWritingHighSchool />;
    if (index === 6 + filteredUnits.length) return <PagePowerBI />;
    if (index === 7 + filteredUnits.length) return <LanguageLab />;
    return <div>Página não encontrada</div>;
  };

  const nextPage = () => setCurrentPage(p => Math.min(p + 1, totalPages - 1));
  const prevPage = () => setCurrentPage(p => Math.max(p - 1, 0));

  const goToPage = (idx: number) => {
    setCurrentPage(idx);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex text-slate-100 font-sans selection:bg-em-purple selection:text-white">
      {/* Premium Sidebar Navigation */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside 
            initial={{ x: -400 }}
            animate={{ x: 0 }}
            exit={{ x: -400 }}
            className="fixed inset-y-0 left-0 w-96 bg-slate-800 z-50 border-r border-slate-700 shadow-2xl overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-em-purple to-em-gold rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">P</div>
                  <div className="flex flex-col">
                    <span className="font-heading font-bold text-lg">Índice Geral</span>
                    <span className="text-[10px] text-slate-400 font-bold tracking-widest leading-none">400+ PÁGINAS DE AULA</span>
                  </div>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-slate-700 rounded-lg transition-colors border border-slate-600">
                  <X size={20} />
                </button>
              </div>

              {/* Grade Filter Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['all', ...Object.values(Grade)].map((g) => (
                  <button
                    key={g}
                    onClick={() => { setFilterGrade(g as any); setCurrentPage(0); }}
                    className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-tighter transition-all border ${
                      filterGrade === g ? 'bg-em-purple border-em-purple text-white' : 'bg-slate-700 border-slate-600 text-slate-400 hover:text-white'
                    }`}
                  >
                    {g === 'all' ? 'Tudo' : g.split(' ')[0]}
                  </button>
                ))}
              </div>

              <nav className="space-y-8">
                <section>
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-700 pb-2">Fundamentais</h4>
                  <div className="space-y-1">
                    <button onClick={() => goToPage(0)} className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${currentPage === 0 ? 'bg-em-purple text-white shadow-lg' : 'hover:bg-slate-700'}`}>
                      <div className="flex items-center gap-3">
                        <Layout size={18} /> <span className="text-sm font-medium">Capa do Livro</span>
                      </div>
                      <span className="text-[10px] opacity-40 font-mono">01</span>
                    </button>
                    <button onClick={() => goToPage(1)} className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${currentPage === 1 ? 'bg-em-purple text-white shadow-lg' : 'hover:bg-slate-700'}`}>
                      <div className="flex items-center gap-3">
                        <Info size={18} /> <span className="text-sm font-medium">Manual e Alinhamento</span>
                      </div>
                      <span className="text-[10px] opacity-40 font-mono">03</span>
                    </button>
                    <button onClick={() => goToPage(2)} className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${currentPage === 2 ? 'bg-em-purple text-white shadow-lg' : 'hover:bg-slate-700'}`}>
                      <div className="flex items-center gap-3">
                        <Calendar size={18} /> <span className="text-sm font-medium">Calendário 2026</span>
                      </div>
                      <span className="text-[10px] opacity-40 font-mono">08</span>
                    </button>
                    <button onClick={() => goToPage(3)} className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${currentPage === 3 ? 'bg-em-purple text-white shadow-lg' : 'hover:bg-slate-700'}`}>
                      <div className="flex items-center gap-3">
                        <Grid size={18} /> <span className="text-sm font-medium">Grade Semanal</span>
                      </div>
                      <span className="text-[10px] opacity-40 font-mono">12</span>
                    </button>
                  </div>
                </section>

                <section>
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-700 pb-2">Unidades Didáticas</h4>
                  <div className="space-y-2">
                    {filteredUnits.length > 0 ? filteredUnits.map((unit, i) => (
                      <button 
                        key={unit.id} 
                        onClick={() => goToPage(i + 4)} 
                        className={`w-full group text-left p-3 rounded-xl transition-all border border-transparent ${currentPage === i + 4 ? 'bg-slate-700 border-em-purple text-white' : 'hover:bg-slate-700/50'}`}
                      >
                        <div className="flex items-baseline justify-between mb-1">
                          <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${unit.grade.includes('Médio') ? 'bg-em-purple/20 text-em-purple' : 'bg-ef-blue/20 text-ef-blue'}`}>
                            {unit.grade}
                          </span>
                          <span className="text-[8px] font-mono opacity-30 group-hover:opacity-100">PDF PAGE {20 + i * 5}</span>
                        </div>
                        <p className="text-xs font-semibold leading-tight">{unit.title.split('|')[1] || unit.title}</p>
                      </button>
                    )) : (
                      <div className="text-center py-8 border-2 border-dashed border-slate-700 rounded-2xl text-slate-500 italic text-sm">
                        Nenhuma unidade disponível para este filtro.
                      </div>
                    )}
                  </div>
                </section>

                <section>
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-700 pb-2">Ferramentas e Bônus</h4>
                  <button onClick={() => goToPage(4 + filteredUnits.length)} className={`w-full flex items-center justify-between p-4 rounded-xl transition-all border-2 mb-2 ${currentPage === 4 + filteredUnits.length ? 'bg-ef-blue border-ef-blue text-white font-bold' : 'bg-slate-800 border-slate-700 hover:border-ef-blue hover:text-ef-blue'}`}>
                    <div className="flex items-center gap-3">
                      <Grid size={20} /> <span className="text-xs uppercase tracking-tight">Simulados e avaliações</span>
                    </div>
                    <span className="text-[10px] font-mono">PROVA</span>
                  </button>
                  <button onClick={() => goToPage(5 + filteredUnits.length)} className={`w-full flex items-center justify-between p-4 rounded-xl transition-all border-2 mb-2 ${currentPage === 5 + filteredUnits.length ? 'bg-em-gold border-em-gold text-slate-900 font-bold' : 'bg-slate-800 border-slate-700 hover:border-em-gold hover:text-em-gold'}`}>
                    <div className="flex items-center gap-3">
                      <Trophy size={20} /> <span className="text-xs uppercase tracking-tight">Manual da Redação 1000</span>
                    </div>
                    <span className="text-[10px] font-mono">EXTRA</span>
                  </button>
                  <button onClick={() => goToPage(6 + filteredUnits.length)} className={`w-full flex items-center justify-between p-4 rounded-xl transition-all border-2 mb-2 ${currentPage === 6 + filteredUnits.length ? 'bg-ef-blue border-ef-blue text-white font-bold' : 'bg-slate-800 border-slate-700 hover:border-ef-blue hover:text-ef-blue'}`}>
                    <div className="flex items-center gap-3">
                      <Layout size={20} /> <span className="text-xs uppercase tracking-tight">Base Power BI</span>
                    </div>
                    <span className="text-[10px] font-mono">CSV</span>
                  </button>
                  <button onClick={() => goToPage(7 + filteredUnits.length)} className={`w-full flex items-center justify-between p-4 rounded-xl transition-all border-2 ${currentPage === 7 + filteredUnits.length ? 'bg-ef-blue border-ef-blue text-white font-bold' : 'bg-slate-800 border-slate-700 hover:border-ef-blue hover:text-ef-blue'}`}>
                    <div className="flex items-center gap-3">
                      <Link2 size={20} /> <span className="text-xs uppercase tracking-tight">Laboratório conectado</span>
                    </div>
                    <span className="text-[10px] font-mono">API</span>
                  </button>
                </section>
              </nav>

              <div className="mt-12 p-4 bg-slate-900/50 rounded-2xl border border-slate-700">
                <p className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest">Suporte Pedagógico</p>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  Material atualizado v3.2 (Maio 2026)
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col h-screen relative">
        <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/40 backdrop-blur-xl z-40">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-3 bg-slate-800 rounded-xl hover:bg-em-purple hover:text-white transition-all shadow-lg group"
            >
              <Menu size={24} className="group-hover:scale-110 transition-transform" />
            </button>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.2em] mb-1">Erick P. Silva © 2026</span>
              <h1 className="text-xl font-heading font-black text-white italic tracking-tighter">PORTUGUÊS EM AÇÃO</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-slate-800/50 rounded-full px-5 py-2 border border-slate-700 shadow-inner">
                 <span className="text-[10px] font-bold text-slate-500">PÁGINA VIRTUAL</span>
                 <div className="flex items-center gap-1">
                   <span className="text-lg font-mono font-bold text-em-purple">{(currentPage + 1).toString().padStart(3, '0')}</span>
                 <span className="text-xs font-bold text-slate-600">/ 400</span>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-help">
                <Info size={20} />
             </div>
             <button onClick={() => goToPage(7 + filteredUnits.length)} className="px-6 py-2 bg-white text-slate-900 font-bold rounded-xl text-xs hover:bg-em-gold transition-all shadow-xl shadow-white/5">
                LAB CONECTADO
             </button>
          </div>
        </header>

        {/* Content Area with Enhanced Background */}
        <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-950 relative overflow-x-hidden">
          <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none">
            <BookOpen size={400} />
          </div>
          <div className="absolute bottom-0 left-0 p-32 opacity-5 pointer-events-none">
            <PenTool size={400} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full max-w-4xl z-10"
            >
              {renderPage(currentPage)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Improved Navigation Controls */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none z-50">
          <div className="flex flex-col items-center gap-4 bg-slate-900/95 backdrop-blur-2xl border border-slate-700/50 rounded-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto">
            <button 
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
              className="p-4 bg-slate-800 rounded-xl hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-all transform active:scale-95 group"
            >
              <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
            </button>

            <div className="flex flex-col items-center px-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Navegação Rápida</span>
              <div className="grid grid-cols-3 gap-1.5">
                {Array.from({ length: Math.min(totalPages, 12) }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all ${currentPage === i ? 'w-8 bg-em-purple shadow-[0_0_10px_rgba(78,49,170,0.8)]' : 'w-1.5 bg-slate-700 hover:bg-slate-500'}`}
                  />
                ))}
              </div>
            </div>

            <button 
              disabled={currentPage === totalPages - 1}
              onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
              className="p-4 bg-em-purple rounded-xl hover:bg-white hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-all transform active:scale-95 shadow-[0_0_30px_rgba(78,49,170,0.3)] group"
            >
              <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </main>

      <style>{`
        .ebook-page {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ebook-page:hover {
          transform: translateY(-4px);
        }
      `}</style>
    </div>
  );
}
