import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookmarkPlus,
  ChevronLeft,
  ChevronRight,
  Languages,
  List,
  Maximize2,
  Minimize2,
  Save,
  Type,
  X,
} from "lucide-react";
import { type Ebook } from "../studioTypes";
import { safeStorage } from "../lib/safeStorage";
import { useAuth } from "./AuthProvider";
import { loadEbookProgress, saveEbookProgress } from "../services/ebookProgress";
import { isTranslationCached, translateChapter } from "../lib/translationService";
import { PAYMENT_LINKS } from "../types";
import { loadImportedChapters } from "../services/ebookImport";
import { StudioEbookCover } from "./StudioEbookCover";

interface ReaderProps {
  ebook: Ebook;
  onClose: () => void;
  onRelatedRead?: (ebook: Ebook) => void;
  related?: Ebook[];
}

function sanitizeHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/javascript:/gi, "");
}

function stripHtml(html: string): string {
  return sanitizeHtml(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function Reader({ ebook, onClose, onRelatedRead, related = [] }: ReaderProps) {
  const { user } = useAuth();
  const [chapterIndex, setChapterIndex] = useState(0);
  const [zoom, setZoom] = useState(1.08);
  const [theme, setTheme] = useState<"sepia" | "light" | "dark">("sepia");
  const [focusMode, setFocusMode] = useState(false);
  const [tocOpen, setTocOpen] = useState(true);
  const [translatedContent, setTranslatedContent] = useState<Record<string, string>>({});
  const [languageMode, setLanguageMode] = useState<"original" | "pt">("original");
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationProgress, setTranslationProgress] = useState(0);
  const [cloudLoaded, setCloudLoaded] = useState(false);
  const [importedChapters, setImportedChapters] = useState<Ebook["chapters"] | null>(null);
  const [importingText, setImportingText] = useState(false);
  const [importError, setImportError] = useState(false);

  const chapters = importedChapters || (ebook.chapters.length ? ebook.chapters : [{
    id: `${ebook.id}-chapter-1`,
    title: "Apresentação da obra",
    content: `<p>${ebook.content}</p>`,
    estimatedMinutes: 5,
  }]);
  const currentChapter = chapters[Math.min(chapterIndex, chapters.length - 1)];
  const translationKey = currentChapter.id;
  const currentHtml = languageMode === "pt" && translatedContent[translationKey]
    ? translatedContent[translationKey]
    : currentChapter.content;
  const progress = Math.round(((chapterIndex + 1) / chapters.length) * 100);
  const hasTranslation = ebook.translationAvailable || ebook.originalLanguage !== "Português";
  const cached = isTranslationCached(ebook.id, currentChapter.id);

  const themeClasses = {
    sepia: "bg-[#F4EBDD] text-[#2f281f]",
    light: "bg-[#fbfaf6] text-[#171717]",
    dark: "bg-[#11100e] text-[#e8dece]",
  };

  const relatedWorks = useMemo(
    () => related.filter((item) => item.id !== ebook.id).slice(0, 4),
    [ebook.id, related],
  );

  useEffect(() => {
    setCloudLoaded(false);
    setChapterIndex(0);
    setLanguageMode("original");
    setTranslatedContent({});
    setImportedChapters(null);
    setImportError(false);

    if (ebook.importSource) {
      setImportingText(true);
      loadImportedChapters(ebook)
        .then((chaptersFromSource) => {
          if (chaptersFromSource?.length) setImportedChapters(chaptersFromSource);
        })
        .catch((error) => {
          console.warn("[StudioLogos Reader] Falha ao importar texto técnico:", error);
          setImportError(true);
        })
        .finally(() => setImportingText(false));
    }

    const saved = safeStorage.getItem(`reading-${ebook.id}`);
    try {
      if (saved) {
        const data = JSON.parse(saved);
        setChapterIndex(Math.min(Math.max(data.chapterIndex || data.page - 1 || 0, 0), chapters.length - 1));
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
        const nextIndex = cloudProgress.chapterIndex ?? ((cloudProgress.page || 1) - 1);
        setChapterIndex(Math.min(Math.max(nextIndex || 0, 0), chapters.length - 1));
      })
      .catch((error) => console.warn("[StudioLogos Reader] Falha ao carregar progresso:", error))
      .finally(() => setCloudLoaded(true));
  }, [ebook, user]);

  useEffect(() => {
    safeStorage.setItem(`reading-${ebook.id}`, JSON.stringify({
      chapterIndex,
      chapterId: currentChapter.id,
      progress,
    }));

    if (!user || !cloudLoaded) return;

    const timer = window.setTimeout(() => {
      saveEbookProgress(user, ebook.id, {
        chapterIndex,
        chapterId: currentChapter.id,
        page: chapterIndex + 1,
        progress,
      }).catch((error) => console.warn("[StudioLogos Reader] Falha ao salvar progresso:", error));
    }, 500);

    return () => window.clearTimeout(timer);
  }, [chapterIndex, cloudLoaded, currentChapter.id, ebook.id, progress, user]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleTranslate = async () => {
    if (!hasTranslation) return;
    setIsTranslating(true);
    setTranslationProgress(0);
    try {
      const translated = await translateChapter(
        ebook.id,
        currentChapter.id,
        currentChapter.content,
        "pt",
        setTranslationProgress,
      );
      setTranslatedContent((current) => ({ ...current, [currentChapter.id]: translated }));
      setLanguageMode("pt");
    } finally {
      setIsTranslating(false);
    }
  };

  const saveProgress = () => {
    safeStorage.setItem(`reading-${ebook.id}`, JSON.stringify({
      chapterIndex,
      chapterId: currentChapter.id,
      progress,
    }));

    if (!user) {
      window.alert("Entre com Google para salvar seu progresso na conta.");
      return;
    }

    saveEbookProgress(user, ebook.id, {
      chapterIndex,
      chapterId: currentChapter.id,
      page: chapterIndex + 1,
      progress,
    })
      .then(() => window.alert("Progresso salvo na sua conta."))
      .catch(() => window.alert("Não foi possível salvar na nuvem agora."));
  };

  const goToChapter = (index: number) => {
    setChapterIndex(Math.min(Math.max(index, 0), chapters.length - 1));
    setLanguageMode("original");
    window.setTimeout(() => {
      document.querySelector(".reader-scroll")?.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-[100] ${themeClasses[theme]} transition-colors duration-300`}
    >
      <header className={`h-auto md:h-20 px-4 md:px-8 py-3 md:py-0 border-b flex flex-col md:flex-row md:items-center justify-between gap-3 ${theme === "dark" ? "border-white/10 bg-black/50" : "border-black/10 bg-white/65"} backdrop-blur-xl`}>
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={onClose} className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-black/15 bg-white/70 text-black shadow-sm transition-colors hover:bg-[#1A1A1A] hover:text-white" aria-label="Voltar à estante">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <p className="text-[9px] uppercase tracking-[0.24em] font-black accent-gold">Leitor Studio Logos</p>
            <h1 className="font-serif text-lg leading-tight truncate">{ebook.title}</h1>
            <p className="text-[10px] opacity-50 uppercase tracking-[0.16em] truncate">{ebook.author}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setTocOpen((value) => !value)} className="reader-icon-button" title="Sumário">
            <List className="w-4 h-4" />
          </button>
          <button onClick={() => setZoom((value) => Math.max(0.95, value - 0.08))} className="reader-icon-button" title="Diminuir fonte">
            <Type className="w-3.5 h-3.5" />
            <span className="text-[10px]">-</span>
          </button>
          <button onClick={() => setZoom((value) => Math.min(1.4, value + 0.08))} className="reader-icon-button" title="Aumentar fonte">
            <Type className="w-4 h-4" />
            <span className="text-[10px]">+</span>
          </button>
          <button onClick={() => setFocusMode((value) => !value)} className="reader-icon-button" title="Modo sem distrações">
            {focusMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          {(["sepia", "light", "dark"] as const).map((item) => (
            <button
              key={item}
              onClick={() => setTheme(item)}
              className={`px-3 py-2 text-[10px] uppercase tracking-[0.16em] font-bold border rounded-sm ${theme === item ? "bg-[#C5A059] text-black border-[#C5A059]" : "border-black/10"}`}
            >
              {item === "sepia" ? "Sépia" : item === "light" ? "Claro" : "Noite"}
            </button>
          ))}
          {hasTranslation && (
            <button
              onClick={languageMode === "pt" ? () => setLanguageMode("original") : handleTranslate}
              disabled={isTranslating}
              className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] text-white rounded-sm text-[10px] uppercase tracking-[0.16em] font-bold disabled:opacity-50"
            >
              <Languages className="w-4 h-4" />
              {languageMode === "pt" ? "Original" : isTranslating ? `${translationProgress}%` : cached ? "Português" : "Traduzir"}
            </button>
          )}
          <button onClick={saveProgress} className="reader-icon-button text-[#B48A3D]" title="Salvar progresso">
            <Save className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-sm border border-black/20 bg-white text-black shadow-md transition-colors hover:bg-[#1A1A1A] hover:text-white"
            title="Fechar leitor"
            aria-label="Fechar leitor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="h-[calc(100vh-92px)] md:h-[calc(100vh-80px)] flex">
        {tocOpen && !focusMode && (
          <aside className={`hidden lg:flex w-80 shrink-0 border-r flex-col ${theme === "dark" ? "border-white/10 bg-black/20" : "border-black/10 bg-white/40"}`}>
            <div className="p-6 border-b border-inherit">
              <p className="text-[9px] uppercase tracking-[0.3em] font-black accent-gold mb-3">Sumário</p>
              <p className="text-sm opacity-60">{chapters.length} capítulos · {ebook.estimatedReadTime}</p>
            </div>
            <nav className="overflow-auto custom-scrollbar p-3">
              {chapters.map((chapter, index) => (
                <button
                  key={chapter.id}
                  onClick={() => goToChapter(index)}
                  className={`w-full text-left px-4 py-3 rounded-sm mb-1 transition-colors ${index === chapterIndex ? "bg-[#C5A059] text-black" : "hover:bg-black/5"}`}
                >
                  <span className="block text-[9px] uppercase tracking-[0.18em] opacity-50">Capítulo {index + 1}</span>
                  <span className="block text-sm font-serif leading-snug">{chapter.title}</span>
                  <span className="block text-[10px] opacity-50 mt-1">{chapter.estimatedMinutes} min</span>
                </button>
              ))}
            </nav>
          </aside>
        )}

        <main className="reader-scroll flex-1 overflow-auto custom-scrollbar">
          <div className={`${focusMode ? "max-w-[46rem]" : "max-w-4xl"} mx-auto px-5 md:px-12 py-10 md:py-16`}>
            {!focusMode && (
              <section className="mb-10 grid md:grid-cols-[120px_1fr] gap-8 items-start">
                <StudioEbookCover ebook={ebook} compact showTitle={false} className="hidden md:block" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.32em] font-black accent-gold mb-3">{ebook.category} · {ebook.collection}</p>
                  <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-4">{ebook.title}</h2>
                  <p className="text-sm opacity-60 leading-relaxed max-w-2xl">{ebook.description}</p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {[ebook.originalLanguage, ebook.approximateYear, `${chapters.length} capítulos`, ebook.estimatedReadTime].map((item) => (
                      <span key={item} className="text-[10px] uppercase tracking-[0.16em] border border-current/15 px-3 py-1 opacity-70">{item}</span>
                    ))}
                  </div>
                </div>
              </section>
            )}

            <article className="reader-article">
              <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] font-black accent-gold mb-2">Capítulo {chapterIndex + 1}</p>
                  <h3 className="text-2xl md:text-3xl font-serif">{currentChapter.title}</h3>
                </div>
                <button className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-bold opacity-60 hover:opacity-100">
                  <BookmarkPlus className="w-4 h-4" />
                  Adicionar à minha biblioteca
                </button>
              </div>

              {importingText && (
                <div className="mb-8 border border-[#C5A059]/30 bg-[#C5A059]/10 px-5 py-4 text-sm">
                  Preparando texto integral no leitor Studio Logos...
                </div>
              )}

              {importError && (
                <div className="mb-8 border border-red-900/20 bg-red-900/5 px-5 py-4 text-sm leading-relaxed">
                  Esta obra entrou em revisão técnica porque o texto integral não respondeu corretamente agora. Ela continua catalogada, mas não será apresentada como leitura vazia.
                </div>
              )}

              <div
                className="studio-prose"
                style={{ fontSize: `${zoom}rem` }}
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(currentHtml) }}
              />
            </article>

            {chapterIndex === chapters.length - 1 && (
              <section className={`mt-16 p-8 border ${theme === "dark" ? "border-white/10 bg-white/5" : "border-black/10 bg-white/60"}`}>
                <p className="text-[10px] uppercase tracking-[0.3em] font-black accent-gold mb-4">Próxima leitura</p>
                <h3 className="font-serif text-2xl mb-3">Continue sua formação com obras relacionadas.</h3>
                <p className="text-sm opacity-60 mb-6">Acesse centenas de obras integrais em uma experiência premium organizada para estudo e leitura contínua.</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {relatedWorks.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onRelatedRead?.(item)}
                      className="text-left p-4 border border-current/10 hover:border-[#C5A059] transition-colors"
                    >
                      <span className="text-[9px] uppercase tracking-[0.2em] opacity-40">{item.category}</span>
                      <span className="block font-serif text-lg">{item.title}</span>
                      <span className="block text-xs opacity-50">{item.author}</span>
                    </button>
                  ))}
                </div>
                <a href={PAYMENT_LINKS.studioLogosMonthly} className="inline-block mt-6 px-5 py-3 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.22em] font-bold">
                  Acessar biblioteca completa
                </a>
              </section>
            )}

            <div className="mt-14 pt-6 border-t border-current/10 text-[10px] leading-relaxed opacity-45">
              Crédito técnico: {ebook.sourceName}{ebook.sourceUrl ? ` · ${ebook.sourceUrl}` : ""}. Conteúdo tratado editorialmente para leitura online no Studio Logos.
            </div>
          </div>
        </main>
      </div>

      <footer className={`fixed bottom-0 left-0 right-0 h-16 border-t flex items-center justify-between px-5 md:px-10 ${theme === "dark" ? "border-white/10 bg-black/80" : "border-black/10 bg-white/90"} backdrop-blur-xl`}>
        <button
          onClick={() => goToChapter(chapterIndex - 1)}
          disabled={chapterIndex === 0}
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold disabled:opacity-20 hover:text-[#B48A3D]"
        >
          <ChevronLeft className="w-4 h-4" /> Anterior
        </button>
        <div className="flex items-center gap-4 min-w-0 w-1/2 md:w-auto">
          <div className="w-full md:w-80 h-1 bg-black/10 overflow-hidden">
            <div className="h-full bg-[#C5A059]" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-[9px] font-mono opacity-50 tracking-widest whitespace-nowrap">{progress}%</span>
        </div>
        <button
          onClick={() => goToChapter(chapterIndex + 1)}
          disabled={chapterIndex === chapters.length - 1}
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold disabled:opacity-20 hover:text-[#B48A3D]"
        >
          Próximo <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </motion.div>
  );
}
