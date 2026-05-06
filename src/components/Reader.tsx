import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, 
  Languages, Save, Menu, Book
} from "lucide-react";
import { type Ebook } from "../studioTypes";
import { translateChapter } from "../lib/translationService";
import { safeStorage } from "../lib/safeStorage";
import { useAuth } from "./AuthProvider";
import { loadEbookProgress, saveEbookProgress } from "../services/ebookProgress";

interface ReaderProps {
  ebook: Ebook;
  onClose: () => void;
}

export function Reader({ ebook, onClose }: ReaderProps) {
  const { user } = useAuth();
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [content, setContent] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [theme, setTheme] = useState<"dark" | "sepia" | "light">("light");
  const [showToc, setShowToc] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cloudLoaded, setCloudLoaded] = useState(false);

  const chapters = ebook.chapters || [{ id: 'main', title: 'Conteúdo Principal', content: ebook.content }];
  const currentChapter = chapters[currentChapterIndex];

  useEffect(() => {
    setCloudLoaded(false);
    setContent(currentChapter.content);

    const saved = safeStorage.getItem(`reading-${ebook.id}`);
    try {
      if (saved) {
        const data = JSON.parse(saved);
        setCurrentChapterIndex(data.chapterIndex || 0);
        setProgress(data.progress || 0);
      }
    } catch {
      safeStorage.removeItem(`reading-${ebook.id}`);
    }

    if (!user) {
      setCloudLoaded(true);
      return;
    }

    loadEbookProgress(user, ebook.id)
      .then((cloudProgress) => {
        if (!cloudProgress) return;
        setCurrentChapterIndex(cloudProgress.chapterIndex || 0);
        setProgress(cloudProgress.progress || 0);
      })
      .catch((error) => {
        console.warn('[StudioLogos Reader] Falha ao carregar progresso:', error);
      })
      .finally(() => setCloudLoaded(true));
  }, [ebook.id, user]);

  useEffect(() => {
    setContent(currentChapter.content);
    const nextProgress = Math.min(100, Math.round(((currentChapterIndex + 1) / chapters.length) * 100));
    setProgress(nextProgress);
    
    safeStorage.setItem(`reading-${ebook.id}`, JSON.stringify({ chapterIndex: currentChapterIndex, progress: nextProgress }));

    if (!user || !cloudLoaded) return;

    const timer = window.setTimeout(() => {
      saveEbookProgress(user, ebook.id, { chapterIndex: currentChapterIndex, progress: nextProgress }).catch((error) => {
        console.warn('[StudioLogos Reader] Falha ao salvar progresso:', error);
      });
    }, 500);

    return () => window.clearTimeout(timer);
  }, [currentChapterIndex, ebook.id, user, cloudLoaded]);

  const handleTranslate = async () => {
    if (isTranslating) return;
    setIsTranslating(true);
    try {
      const translated = await translateChapter(ebook.id, currentChapter.id, currentChapter.content, 'pt');
      setContent(translated);
    } catch (error) {
      console.error("Erro na tradução:", error);
      window.alert("Falha na tradução automática. Tente novamente em instantes.");
    } finally {
      setIsTranslating(false);
    }
  };

  const themes = {
    dark: "bg-[#0F0F0F] text-[#E0D7CC]/80",
    sepia: "bg-[#f4ecd8] text-[#5f4b32]",
    light: "bg-white text-gray-900"
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-[100] flex flex-col ${themes[theme]} transition-colors duration-500`}
    >
      {/* Top Toolbar */}
      <header className={`h-20 flex items-center justify-between px-10 border-b ${theme === 'light' ? 'border-black/5 bg-white/80' : 'border-white/10 bg-black/40'} backdrop-blur-md`}>
        <div className="flex items-center gap-6">
          <button onClick={onClose} className="p-3 hover:bg-black/5 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="hidden md:block">
            <h1 className={`font-serif text-lg font-bold leading-tight ${theme === 'light' ? 'text-black' : 'text-white'} truncate max-w-[300px]`}>{ebook.title}</h1>
            <p className="text-[9px] opacity-40 uppercase tracking-[0.2em] font-bold">{ebook.author}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => setShowToc(!showToc)}
            className={`p-3 rounded-sm transition-all ${showToc ? 'bg-[#C5A059] text-black' : 'hover:bg-black/5'}`}
            title="Sumário"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button 
            onClick={handleTranslate} 
            disabled={isTranslating}
            className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] text-white rounded-sm text-[10px] uppercase tracking-widest font-bold hover:opacity-90 transition-all disabled:opacity-50"
          >
            <Languages className={`w-3.5 h-3.5 ${isTranslating ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isTranslating ? 'Traduzindo...' : 'Traduzir'}</span>
          </button>
          
          <div className="h-6 w-[1px] bg-black/10 mx-1 hidden sm:block" />
          
          <div className="flex bg-black/5 rounded-sm p-1 border border-black/5">
            <button onClick={() => setZoom(z => Math.max(0.8, z - 0.1))} className="p-1.5 hover:bg-black/10 rounded-sm"><ZoomOut className="w-4 h-4" /></button>
            <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="p-1.5 hover:bg-black/10 rounded-sm"><ZoomIn className="w-4 h-4" /></button>
          </div>
          
          <div className="hidden lg:flex bg-black/5 rounded-sm p-1 border border-black/5">
            <button onClick={() => setTheme("dark")} className={`p-1.5 rounded-sm transition-all text-xs px-2 ${theme === 'dark' ? 'bg-[#C5A059] text-black font-bold' : 'hover:bg-black/5'}`}>Dark</button>
            <button onClick={() => setTheme("sepia")} className={`p-1.5 rounded-sm transition-all text-xs px-2 ${theme === 'sepia' ? 'bg-[#C5A059] text-black font-bold' : 'hover:bg-black/5'}`}>Sepia</button>
            <button onClick={() => setTheme("light")} className={`p-1.5 rounded-sm transition-all text-xs px-2 ${theme === 'light' ? 'bg-[#C5A059] text-black font-bold' : 'hover:bg-black/5'}`}>Light</button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Table of Contents Sidebar */}
        <AnimatePresence>
          {showToc && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className={`w-72 border-r ${theme === 'light' ? 'bg-[#F9F7F2] border-black/5' : 'bg-[#1A1A1A] border-white/5'} overflow-y-auto z-20 absolute md:relative h-full`}
            >
              <div className="p-6 space-y-4">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-black accent-gold">Sumário</h3>
                <div className="space-y-1">
                  {chapters.map((ch, idx) => (
                    <button
                      key={ch.id}
                      onClick={() => {
                        setCurrentChapterIndex(idx);
                        if (window.innerWidth < 768) setShowToc(false);
                      }}
                      className={`w-full text-left p-3 text-xs rounded-sm transition-all flex items-center gap-3 ${
                        currentChapterIndex === idx 
                        ? 'bg-[#C5A059] text-black font-bold' 
                        : 'hover:bg-black/5 opacity-60'
                      }`}
                    >
                      <span className="opacity-30 font-mono">{String(idx + 1).padStart(2, '0')}</span>
                      <span className="truncate">{ch.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-auto custom-scrollbar flex justify-center p-6 md:p-20">
          <motion.article 
            key={`${ebook.id}-${currentChapterIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: `${zoom}rem` }}
            className="max-w-2xl w-full font-serif leading-[2] space-y-12 hyphens-auto text-justify tracking-wide text-lg md:text-xl"
          >
            <div className="flex gap-4 mb-12 items-center text-[10px] uppercase tracking-[0.4em] accent-gold font-bold">
              <div className={`h-[1px] w-8 ${theme === 'light' ? 'bg-[#B48A3D]' : 'bg-[#C5A059]'}`} />
              <span>{currentChapter.title} • {currentChapterIndex + 1} de {chapters.length}</span>
            </div>
            
            <div 
              className="reader-content space-y-8"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            
            {/* Navigation Buttons inside content */}
            <div className="pt-20 flex justify-between border-t border-black/5">
              <button 
                onClick={() => setCurrentChapterIndex(i => Math.max(0, i - 1))}
                disabled={currentChapterIndex === 0}
                className="flex flex-col items-start gap-2 group disabled:opacity-20"
              >
                <span className="text-[9px] uppercase tracking-widest opacity-40 font-bold">Anterior</span>
                <span className="flex items-center gap-2 font-serif text-sm group-hover:accent-gold transition-colors">
                  <ChevronLeft className="w-4 h-4" /> 
                  {currentChapterIndex > 0 ? chapters[currentChapterIndex - 1].title : 'Início'}
                </span>
              </button>

              <button 
                onClick={() => setCurrentChapterIndex(i => Math.min(chapters.length - 1, i + 1))}
                disabled={currentChapterIndex === chapters.length - 1}
                className="flex flex-col items-end gap-2 group disabled:opacity-20 text-right"
              >
                <span className="text-[9px] uppercase tracking-widest opacity-40 font-bold">Próximo</span>
                <span className="flex items-center gap-2 font-serif text-sm group-hover:accent-gold transition-colors">
                  {currentChapterIndex < chapters.length - 1 ? chapters[currentChapterIndex + 1].title : 'Fim'}
                  <ChevronRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </motion.article>
        </main>
      </div>

      {/* Navigation Footer */}
      <footer className={`h-16 border-t ${theme === 'light' ? 'border-black/5 bg-white/90' : 'border-white/10 bg-black/60'} flex items-center justify-between px-6 md:px-16`}>
        <div className="flex items-center gap-4">
          <Book className="w-4 h-4 opacity-30" />
          <div className="hidden sm:block h-1 w-32 md:w-64 bg-black/5 rounded-full overflow-hidden">
            <div className="h-full bg-[#C5A059] transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-[9px] font-mono opacity-50 tracking-widest">{progress}% CONCLUÍDO</span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentChapterIndex(i => Math.max(0, i - 1))}
            disabled={currentChapterIndex === 0}
            className="p-2 hover:bg-black/5 rounded-full disabled:opacity-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-[10px] font-bold font-mono">{currentChapterIndex + 1} / {chapters.length}</span>
          <button 
            onClick={() => setCurrentChapterIndex(i => Math.min(chapters.length - 1, i + 1))}
            disabled={currentChapterIndex === chapters.length - 1}
            className="p-2 hover:bg-black/5 rounded-full disabled:opacity-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </motion.div>
  );
}
