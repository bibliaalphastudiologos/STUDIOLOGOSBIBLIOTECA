import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, 
  Languages, Save
} from "lucide-react";
import { type Ebook } from "../studioTypes";
import { translateToPortuguese } from "../services/gemini";
import { safeStorage } from "../lib/safeStorage";
import { useAuth } from "./AuthProvider";
import { loadEbookProgress, saveEbookProgress } from "../services/ebookProgress";

interface ReaderProps {
  ebook: Ebook;
  onClose: () => void;
}

export function Reader({ ebook, onClose }: ReaderProps) {
  const { user } = useAuth();
  const [content, setContent] = useState(ebook.content);
  const [isTranslating, setIsTranslating] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [theme, setTheme] = useState<"dark" | "sepia" | "light">("light");
  const [page, setPage] = useState(1);
  const [progress, setProgress] = useState(0);
  const [cloudLoaded, setCloudLoaded] = useState(false);

  useEffect(() => {
    setCloudLoaded(false);
    setContent(ebook.content);

    const saved = safeStorage.getItem(`reading-${ebook.id}`);
    try {
      if (saved) {
        const data = JSON.parse(saved);
        setPage(data.page || 1);
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
        setPage(cloudProgress.page || 1);
        setProgress(cloudProgress.progress || 0);
      })
      .catch((error) => {
        console.warn('[StudioLogos Reader] Falha ao carregar progresso:', error);
      })
      .finally(() => setCloudLoaded(true));
  }, [ebook, user]);

  useEffect(() => {
    const nextProgress = Math.min(100, Math.max(10, Math.round((page / 10) * 100)));
    setProgress(nextProgress);
    safeStorage.setItem(`reading-${ebook.id}`, JSON.stringify({ page, progress: nextProgress }));

    if (!user || !cloudLoaded) return;

    const timer = window.setTimeout(() => {
      saveEbookProgress(user, ebook.id, { page, progress: nextProgress }).catch((error) => {
        console.warn('[StudioLogos Reader] Falha ao salvar progresso:', error);
      });
    }, 500);

    return () => window.clearTimeout(timer);
  }, [cloudLoaded, ebook.id, page, user]);

  const saveProgress = () => {
    const nextProgress = Math.min(100, Math.max(10, Math.round((page / 10) * 100)));
    safeStorage.setItem(`reading-${ebook.id}`, JSON.stringify({ page, progress: nextProgress }));
    if (!user) {
      window.alert("Entre com Google para salvar seu progresso na conta.");
      return;
    }

    saveEbookProgress(user, ebook.id, { page, progress: nextProgress })
      .then(() => window.alert("Progresso salvo na sua conta."))
      .catch(() => window.alert("Não foi possível salvar na nuvem agora."));
  };

  const handleTranslate = async () => {
    setIsTranslating(true);
    const translated = await translateToPortuguese(ebook.content);
    setContent(translated);
    setIsTranslating(false);
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
          <div>
            <h1 className={`font-serif text-lg font-bold leading-tight ${theme === 'light' ? 'text-black' : 'text-white'}`}>{ebook.title}</h1>
            <p className="text-[9px] opacity-40 uppercase tracking-[0.2em] font-bold">{ebook.author}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={handleTranslate} 
            disabled={isTranslating}
            className="flex items-center gap-2 px-5 py-2 bg-[#1A1A1A] text-white rounded-sm text-[10px] uppercase tracking-widest font-bold hover:opacity-90 transition-all disabled:opacity-50"
          >
            <Languages className={`w-3.5 h-3.5 ${isTranslating ? 'animate-spin' : ''}`} />
            {isTranslating ? 'Preparando...' : 'Normalizar texto'}
          </button>
          
          <div className="h-6 w-[1px] bg-black/10 mx-2" />
          
          <div className="flex bg-black/5 rounded-sm p-1 border border-black/5">
            <button onClick={() => setZoom(z => Math.max(0.8, z - 0.1))} className="p-1.5 hover:bg-black/10 rounded-sm"><ZoomOut className="w-4 h-4" /></button>
            <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="p-1.5 hover:bg-black/10 rounded-sm"><ZoomIn className="w-4 h-4" /></button>
          </div>
          
          <div className="flex bg-black/5 rounded-sm p-1 border border-black/5">
            <button onClick={() => setTheme("dark")} className={`p-1.5 rounded-sm transition-all text-xs px-2 ${theme === 'dark' ? 'bg-[#C5A059] text-black font-bold' : 'hover:bg-black/5'}`}>Dark</button>
            <button onClick={() => setTheme("sepia")} className={`p-1.5 rounded-sm transition-all text-xs px-2 ${theme === 'sepia' ? 'bg-[#C5A059] text-black font-bold' : 'hover:bg-black/5'}`}>Sepia</button>
            <button onClick={() => setTheme("light")} className={`p-1.5 rounded-sm transition-all text-xs px-2 ${theme === 'light' ? 'bg-[#C5A059] text-black font-bold' : 'hover:bg-black/5'}`}>Light</button>
          </div>

          <button onClick={saveProgress} className="p-3 hover:bg-black/5 rounded-sm text-[#B48A3D]">
            <Save className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-auto custom-scrollbar flex justify-center p-10 md:p-20">
        <motion.article 
          key={page}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: `${zoom}rem` }}
          className="max-w-2xl w-full font-serif leading-[2] space-y-12 hyphens-auto text-justify tracking-wide text-lg md:text-xl"
        >
          <div className="flex gap-4 mb-12 items-center text-[10px] uppercase tracking-[0.4em] accent-gold font-bold">
            <div className={`h-[1px] w-8 ${theme === 'light' ? 'bg-[#B48A3D]' : 'bg-[#C5A059]'}`} />
            <span>Capítulo Central • Página {page}</span>
          </div>
          
          <div className="space-y-8">
            {content.split('\n').map((paragraph, idx) => (
              <p 
                key={idx} 
                className={`${idx === 0 ? 'first-letter:text-7xl first-letter:font-bold first-letter:mr-4 first-letter:float-left' : ''} ${theme === 'light' ? 'first-letter:text-[#B48A3D]' : 'first-letter:text-[#C5A059]'} mb-6`}
              >
                {paragraph}
              </p>
            ))}
          </div>   
          {/* Decorative Illustration */}
          <div className="py-8">
            <div className={`aspect-video w-full overflow-hidden rounded-sm border border-black/5 ebook-shadow relative group`}>
              <img 
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1200" 
                alt="Atmospheric Library" 
                className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 ${theme === 'light' ? 'grayscale opacity-70' : 'brightness-75'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
            <p className="mt-3 text-[8px] uppercase tracking-[0.4em] opacity-30 text-center font-bold">Documentação Fotográfica | Acervo Studiologos</p>
          </div>
          
          {page > 1 && (
            <p className="opacity-90">
              A curadoria literária superior do STUDIOLOGOS assegura que a profundidade do pensamento original seja mantida, 
              mesmo através das ferramentas de síntese mais sofisticadas da atualidade. Esta obra representa um marco na 
              evolução da consciência humana.
            </p>
          )}
        </motion.article>
      </main>

      {/* Navigation Footer */}
      <footer className={`h-20 border-t ${theme === 'light' ? 'border-black/5 bg-white/90' : 'border-white/10 bg-black/60'} flex items-center justify-between px-16`}>
        <button 
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold disabled:opacity-20 hover:text-[#B48A3D] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Anterior
        </button>

        <div className="flex items-center gap-8">
          <div className="w-64 md:w-96 h-0.5 bg-black/5 rounded-full overflow-hidden">
            <div className="h-full bg-[#C5A059]" style={{ width: `${(page/10)*100}%` }} />
          </div>
          <span className="text-[9px] font-mono opacity-50 tracking-widest">{progress}% CONCLUÍDO</span>
        </div>

        <button 
          onClick={() => setPage(p => p + 1)}
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold hover:text-[#B48A3D] transition-colors"
        >
          Próxima <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </motion.div>
  );
}
