import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, List, Maximize2, Type, ArrowLeft } from 'lucide-react';
import { DEMO_EBOOKS } from '../data/ebooks';
import { Ebook, Chapter } from '../types';
import { useAuth } from '../lib/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

export const OnlineReader: React.FC = () => {
  const { ebookId } = useParams();
  const { isApproved, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [ebook, setEbook] = useState<Ebook | null>(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [fontSize, setFontSize] = useState(20);
  const [theme, setTheme] = useState<'light' | 'sepia' | 'dark'>('light');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const themeConfig = {
    light: {
      bg: 'bg-[#fafaf9]',
      main: 'bg-white',
      text: 'text-[#1a1a1a]',
      sidebar: 'bg-[#f5f5f4]',
      header: 'bg-white/90',
      border: 'border-[#e7e7e4]',
      muted: 'text-[#787878]'
    },
    sepia: {
      bg: 'bg-[#f4ecd8]',
      main: 'bg-[#fbf0d9]',
      text: 'text-[#5b4636]',
      sidebar: 'bg-[#efe3c5]',
      header: 'bg-[#fbf0d9]/90',
      border: 'border-[#e2d5b5]',
      muted: 'text-[#8c7865]'
    },
    dark: {
      bg: 'bg-[#0f1115]',
      main: 'bg-[#1a1d23]',
      text: 'text-[#e2e8f0]',
      sidebar: 'bg-[#0a0c10]',
      header: 'bg-[#1a1d23]/90',
      border: 'border-[#2d333d]',
      muted: 'text-[#94a3b8]'
    }
  };

  const currentTheme = themeConfig[theme];

  useEffect(() => {
    console.log("OnlineReader: Initializing for ID:", ebookId);
    if (!ebookId) return;
    
    const found = DEMO_EBOOKS.find(e => 
      e.id === ebookId || e.id.toLowerCase() === ebookId.toLowerCase()
    );
    
    if (found) {
      console.log("OnlineReader: Ebook found:", found.title);
      setEbook(found);
      
      // Load saved progress for this specific ebook
      const savedProgress = localStorage.getItem(`progress_${found.id}`);
      if (savedProgress !== null) {
        setCurrentChapterIndex(parseInt(savedProgress, 10));
      }
    } else {
      console.error('Reader: Ebook not found for ID:', ebookId);
    }
  }, [ebookId]);

  useEffect(() => {
    // Automatically scroll to top when chapter changes
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.scrollTop = 0;
    }
    // Also scroll window just in case
    window.scrollTo(0, 0);

    // Save progress to localStorage
    if (ebookId) {
      localStorage.setItem('last_read_ebook', ebookId);
      localStorage.setItem(`progress_${ebookId}`, currentChapterIndex.toString());
      localStorage.setItem('last_read_timestamp', Date.now().toString());
    }
  }, [currentChapterIndex, ebookId]);

  if (loading && !isAdmin) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafaf9]">
       <div className="flex flex-col items-center">
         <div className="w-12 h-12 border-2 border-navy/10 border-t-gold rounded-full animate-spin mb-6" />
         <span className="text-[10px] font-black uppercase tracking-[0.4em] text-navy/40">Sincronizando Logos</span>
       </div>
    </div>
  );
  
  if (!isApproved && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-[#fafaf9]">
        <div className="max-w-md text-center">
           <h1 className="text-3xl font-serif font-bold text-navy mb-4">Acesso Restrito</h1>
           <p className="text-muted mb-8">Você precisa de uma assinatura ativa para ler este conteúdo.</p>
           <Link to="/" className="premium-button inline-block">Voltar para Início</Link>
        </div>
      </div>
    );
  }

  if (!ebook) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#fafaf9]">
        <div className="w-16 h-16 bg-navy/5 rounded-full flex items-center justify-center mb-6">
          <ArrowLeft className="w-8 h-8 text-navy/20" />
        </div>
        <h1 className="text-2xl font-serif text-navy mb-2">Obra não encontrada</h1>
        <p className="text-muted mb-8 text-[10px] uppercase tracking-widest font-black">ID: {ebookId}</p>
        <Link to="/" className="premium-button px-10">Voltar à Galeria</Link>
      </div>
    );
  }

  const currentChapter = ebook.chapters[currentChapterIndex];

  return (
    <div className={`min-h-screen ${currentTheme.bg} flex flex-col font-serif relative transition-colors duration-500`}>
      {/* Reader Header */}
      <header className={`h-20 border-b ${currentTheme.border} flex items-center justify-between px-6 sticky top-0 ${currentTheme.header} backdrop-blur-xl z-40 transition-colors duration-500`}>
        {/* Progress Bar */}
        <div className={`absolute bottom-0 left-0 h-[3px] ${theme === 'dark' ? 'bg-white/5' : 'bg-navy/5'} w-full overflow-hidden`}>
          <motion.div 
            className="h-full bg-gold origin-left shadow-[0_0_10px_rgba(234,179,8,0.5)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: (currentChapterIndex + 1) / ebook.chapters.length }}
            transition={{ duration: 0.8, ease: "circOut" }}
          />
        </div>

        <div className="flex items-center space-x-6">
          <Link to="/" className={`flex items-center p-2 hover:bg-black/5 rounded-lg transition-all group ${currentTheme.text}`}>
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform mr-2" />
            <span className="text-[10px] font-black uppercase tracking-widest">Voltar</span>
          </Link>
          <div className="hidden sm:block">
            <h1 className={`font-sans text-[10px] font-black uppercase tracking-[0.4em] ${currentTheme.text}`}>STUDIO LOGOS</h1>
            <div className="flex items-center space-x-2 mt-0.5">
              <span className={`text-[9px] uppercase tracking-widest font-black line-clamp-1 max-w-[200px] ${currentTheme.muted}`}>{ebook.title}</span>
              <span className="text-[9px] text-gold">•</span>
              <span className="text-[9px] text-gold font-black uppercase tracking-tighter">ESTUDO {currentChapterIndex + 1}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button 
             onClick={() => setSidebarOpen(!sidebarOpen)}
             className={`p-3 rounded-full transition-all relative ${sidebarOpen ? 'bg-gold text-white shadow-lg' : `${currentTheme.text} hover:bg-black/5`}`}
          >
            <List className="w-5 h-5" />
            {sidebarOpen && (
              <motion.div layoutId="sidebar-active" className="absolute inset-0 rounded-full bg-gold -z-10" />
            )}
          </button>

          <div className="relative">
            <button 
              onClick={() => setSettingsOpen(!settingsOpen)}
              className={`p-3 rounded-full transition-all ${settingsOpen ? 'bg-black text-white' : `${currentTheme.text} hover:bg-black/5`}`}
            >
              <Type className="w-5 h-5" />
            </button>

            <AnimatePresence>
              {settingsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className={`absolute right-0 mt-4 w-72 ${theme === 'dark' ? 'bg-[#1e2329]' : 'bg-white'} rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] p-6 border ${currentTheme.border} z-50`}
                >
                  <div className="space-y-8">
                    <div>
                      <h4 className={`text-[10px] font-black uppercase tracking-widest mb-5 ${currentTheme.muted}`}>Tamanho da Fonte</h4>
                      <div className="flex items-center space-x-4">
                        <button onClick={() => setFontSize(Math.max(14, fontSize - 2))} className={`flex-1 py-3 rounded-lg border ${currentTheme.border} ${currentTheme.text} font-black hover:bg-black/5 transition-colors`}>A-</button>
                        <span className={`text-sm font-black w-12 text-center ${currentTheme.text}`}>{fontSize}</span>
                        <button onClick={() => setFontSize(Math.min(32, fontSize + 2))} className={`flex-1 py-3 rounded-lg border ${currentTheme.border} ${currentTheme.text} font-black hover:bg-black/5 transition-colors`}>A+</button>
                      </div>
                    </div>

                    <div>
                      <h4 className={`text-[10px] font-black uppercase tracking-widest mb-5 ${currentTheme.muted}`}>Ambiente</h4>
                      <div className="grid grid-cols-3 gap-3">
                        <button 
                          onClick={() => setTheme('light')}
                          className={`aspect-square rounded-lg border-2 flex items-center justify-center transition-all ${theme === 'light' ? 'border-gold bg-white shadow-xl scale-105' : 'border-transparent bg-white'}`}
                        >
                          <div className="w-4 h-4 rounded-full bg-[#fafaf9] border border-gray-100" />
                        </button>
                        <button 
                          onClick={() => setTheme('sepia')}
                          className={`aspect-square rounded-lg border-2 flex items-center justify-center transition-all ${theme === 'sepia' ? 'border-gold bg-[#fbf0d9] shadow-xl scale-105' : 'border-transparent bg-[#fbf0d9]'}`}
                        >
                          <div className="w-4 h-4 rounded-full bg-[#f4ecd8]" />
                        </button>
                        <button 
                          onClick={() => setTheme('dark')}
                          className={`aspect-square rounded-lg border-2 flex items-center justify-center transition-all ${theme === 'dark' ? 'border-gold bg-[#1a1d23] shadow-xl scale-105' : 'border-transparent bg-[#1a1d23]'}`}
                        >
                          <div className="w-4 h-4 rounded-full bg-[#0f1115]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -400 }}
              animate={{ x: 0 }}
              exit={{ x: -400 }}
              transition={{ type: "spring", damping: 30, stiffness: 150 }}
              className={`w-80 border-r ${currentTheme.border} ${currentTheme.sidebar} overflow-y-auto hidden md:block sticky top-20 h-[calc(100vh-80px)] z-30 grain`}
            >
              <div className="p-10">
                <div className="flex items-center justify-between mb-12">
                  <h3 className={`text-[10px] font-black uppercase tracking-[0.4em] ${currentTheme.text}`}>SUMÁRIO ALPHA</h3>
                  <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                </div>
                <nav className="space-y-4">
                  {ebook.chapters.map((cap, i) => (
                    <button
                      key={cap.id}
                      onClick={() => {
                        setCurrentChapterIndex(i);
                      }}
                      className={`w-full text-left p-5 rounded-xl text-[10px] uppercase tracking-[0.2em] transition-all flex items-center group relative overflow-hidden active:scale-95 ${
                        i === currentChapterIndex 
                          ? 'bg-black text-white shadow-2xl translate-x-2' 
                          : `${currentTheme.text} hover:bg-black/5 hover:translate-x-1`
                      }`}
                    >
                      <span className={`mr-4 transition-colors font-black ${
                        i === currentChapterIndex ? 'text-gold' : `${currentTheme.muted}`
                      }`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-bold truncate">{cap.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Content Area */}
        <main 
          className={`flex-1 overflow-y-auto ${currentTheme.main} transition-colors duration-500`}
          onClick={() => settingsOpen && setSettingsOpen(false)}
        >
          <div className="max-w-2xl mx-auto px-8 py-20 md:py-40">
            <motion.div
              key={currentChapter.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="prose prose-slate max-w-none"
              style={{ fontSize: `${fontSize}px` }}
            >
              <div className="text-gold text-[10px] font-black uppercase tracking-[0.5em] mb-10 text-center">
                ESTUDO {String(currentChapterIndex + 1).padStart(2, '0')}
              </div>
              <h2 className={`font-serif text-5xl ${currentTheme.text} mb-24 leading-tight text-center max-w-xl mx-auto`}>
                {currentChapter.title}
              </h2>
              
              <div 
                className={`leading-[2] ${currentTheme.text} space-y-12 font-normal selection:bg-gold selection:text-white transition-colors duration-500`}
                style={{ 
                  lineHeight: '2.1',
                  letterSpacing: '-0.015em'
                 }}
              >
                {currentChapter.content.split('\n\n').map((para, i) => {
                   const cleanPara = para.trim();
                   if (!cleanPara) return null;
                   
                   return (
                     <p key={i} className="mb-0 text-justify hyphens-auto font-serif">
                       {i === 0 ? (
                         <span className={`float-left text-7xl font-bold mr-4 mt-2 leading-[0.8] font-serif ${
                           theme === 'dark' ? 'text-gold' : 
                           theme === 'sepia' ? 'text-[#8c7865]' : 
                           'text-gold'
                         }`}>
                           {cleanPara.charAt(0)}
                         </span>
                       ) : null}
                       {i === 0 ? cleanPara.slice(1) : cleanPara}
                     </p>
                   );
                })}
              </div>
            </motion.div>

            {/* Navigation Footer */}
            <div className={`mt-48 pt-12 border-t ${currentTheme.border} flex flex-col space-y-12`}>
              <div className="flex items-center justify-between">
                <button
                  disabled={currentChapterIndex === 0}
                  onClick={() => {
                    setCurrentChapterIndex(prev => prev - 1);
                  }}
                  className={`flex items-center space-x-4 text-[10px] uppercase tracking-[0.3em] font-black transition-all group ${
                    currentChapterIndex === 0 ? 'opacity-20 cursor-not-allowed' : `${currentTheme.text} hover:text-gold`
                  }`}
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span>Anterior</span>
                </button>
                
                <div className="flex flex-col items-center">
                  <div className="text-[10px] text-gold font-black tracking-[0.5em] uppercase mb-1">
                    PROGRESSO
                  </div>
                  <div className={`text-[12px] font-black ${currentTheme.text}`}>
                     {currentChapterIndex + 1} de {ebook.chapters.length}
                  </div>
                </div>

                <button
                  disabled={currentChapterIndex === ebook.chapters.length - 1}
                  onClick={() => {
                    setCurrentChapterIndex(prev => prev + 1);
                  }}
                  className={`flex items-center space-x-4 text-[10px] uppercase tracking-[0.3em] font-black transition-all group ${
                    currentChapterIndex === ebook.chapters.length - 1 ? 'opacity-20 cursor-not-allowed' : `${currentTheme.text} hover:text-gold`
                  }`}
                >
                  <span>Próximo</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="flex justify-center pt-8">
                <Link 
                  to="/" 
                  className={`flex items-center space-x-3 px-8 py-4 rounded-sm border ${currentTheme.border} ${currentTheme.text} text-[10px] font-black uppercase tracking-[0.4em] hover:bg-gold hover:text-white hover:border-gold transition-all group shadow-sm`}
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span>Finalizar Leitura e Voltar</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Scroll Indicator (Top) */}
      <AnimatePresence>
        {!sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none ${currentTheme.text}`}
          >
            <div className="w-[1px] h-12 bg-current mb-4" />
            <span className="text-[9px] uppercase tracking-[0.4em] font-black">Scroll</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Toggle (Bottom) */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gold text-white rounded-full flex items-center justify-center shadow-2xl z-50 md:hidden active:scale-95 transition-transform"
      >
        <List className="w-6 h-6" />
      </button>
    </div>
  );
};
