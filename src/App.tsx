import React, { useEffect, useMemo, useRef, useState } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { EbookShelf } from "./components/EbookShelf";
import { ThematicRow } from "./components/ThematicRow";
import { Reader } from "./components/Reader";
import { EbookPreview } from "./components/EbookPreview";
import { BestsellerSyntheses } from "./components/BestsellerSyntheses";
import { GoogleTranslatePrompt } from "./components/GoogleTranslatePrompt";
import { AdminPanel } from "./components/AdminPanel";
import { StudioEbookCover } from "./components/StudioEbookCover";
import { EBOOKS } from "./data";
import { STUDY_ROUTES } from "./data/studyRoutes";
import { Category, type Ebook } from "./studioTypes";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Check, ChevronRight, CreditCard, Lock, Search, Sparkles, X } from "lucide-react";
import { safeStorage } from "./lib/safeStorage";
import { useAuth } from "./components/AuthProvider";
import { PAYMENT_LINKS } from "./types";
import { useLocation } from "react-router-dom";

function normalizeSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

const ROUTE_SECTION_MAP: Record<string, string> = {
  "/filosofia": `shelf-${Category.PHILOSOPHY}`,
  "/teologia": `shelf-${Category.THEOLOGY}`,
  "/psicanalise": `shelf-${Category.PSYCHOANALYSIS}`,
  "/psicanálise": `shelf-${Category.PSYCHOANALYSIS}`,
  "/literatura": "shelf-literatura-geral",
};

function GuestSubscriptionBanner({ compact = false }: { compact?: boolean }) {
  return (
    <section className="px-4 sm:px-6 lg:px-10">
      <div className={`max-w-7xl mx-auto border border-[#C5A059]/35 bg-[#111318] text-white shadow-xl ${compact ? "p-4 md:p-5" : "p-5 md:p-7"}`}>
        <div className="grid lg:grid-cols-[1fr_auto] gap-4 md:gap-6 items-center">
          <div>
            <p className="text-[9px] md:text-[10px] uppercase tracking-[0.26em] md:tracking-[0.34em] font-black text-[#C5A059]">
              Acesso premium Studio Logos
            </p>
            <h2 className={`font-serif leading-tight mt-2 text-white ${compact ? "text-xl md:text-2xl" : "text-2xl md:text-4xl"}`}>
              Entre e libere a biblioteca completa por R$ 19,00/mês.
            </h2>
            {!compact && (
              <p className="mt-3 max-w-3xl text-sm md:text-base text-white/72 leading-relaxed">
                Leia obras integrais, salve seu progresso, continue de onde parou e use uma experiência organizada para estudo sério.
              </p>
            )}
            <div className="mt-4 flex flex-wrap gap-2 text-[9px] md:text-[10px] uppercase tracking-[0.14em] md:tracking-[0.18em] font-bold text-white/70">
              <span className="inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#C5A059]" /> Leitura online</span>
              <span className="inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#C5A059]" /> Progresso salvo</span>
              <span className="inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#C5A059]" /> Trilhas de estudo</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 min-w-[220px]">
            <a
              href={PAYMENT_LINKS.studioLogosMonthly}
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#C5A059] px-5 text-center text-[10px] uppercase tracking-[0.2em] font-black text-black transition-colors hover:bg-[#D8B76C]"
            >
              <CreditCard className="w-4 h-4" />
              Assinar agora
            </a>
            <span className="inline-flex min-h-10 items-center justify-center gap-2 border border-white/10 px-4 text-center text-[9px] uppercase tracking-[0.18em] font-bold text-white/65">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              Cancele quando quiser
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const { user, hasAccess, login, loading } = useAuth();
  const location = useLocation();
  const historyGuardReady = useRef(false);
  const lastHistoryLayer = useRef<string | null>(null);
  const [selectedEbook, setSelectedEbook] = useState<Ebook | null>(null);
  const [previewEbook, setPreviewEbook] = useState<Ebook | null>(null);
  const [lockedEbook, setLockedEbook] = useState<Ebook | null>(null);
  const [activeAxis, setActiveAxis] = useState<{ category: Category; term: string; label: string } | null>(null);
  const [globalSearch, setGlobalSearch] = useState("");
  const [resumeHidden, setResumeHidden] = useState(() => safeStorage.getItem("resume-card-hidden") === "true");
  const [lastRead, setLastRead] = useState<Ebook | null>(() => {
    const saved = safeStorage.getItem("last-read");
    try {
      if (saved) {
        const ebookId = JSON.parse(saved);
        return EBOOKS.find(b => b.id === ebookId) || null;
      }
    } catch {
      safeStorage.removeItem("last-read");
    }
    return null;
  });

  const handleRead = (ebook: Ebook) => {
    if (!user && !ebook.isSpecial) {
      setLockedEbook(ebook);
      return;
    }

    if (!hasAccess && !ebook.isSpecial) {
      setLockedEbook(ebook);
      return;
    }

    setSelectedEbook(ebook);
    setPreviewEbook(null);
    setLastRead(ebook);
    setResumeHidden(false);
    safeStorage.removeItem("resume-card-hidden");
    safeStorage.setItem("last-read", JSON.stringify(ebook.id));
  };

  const handlePreview = (ebook: Ebook) => {
    if (ebook.isSpecial && ebook.link) {
      window.location.href = ebook.link;
      return;
    }

    setPreviewEbook(ebook);
  };

  const handleAxisOpen = (axis: { category: Category; term: string; label: string }) => {
    setActiveAxis(axis);
    window.setTimeout(() => {
      document.getElementById(`shelf-${axis.category}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const scrollToSection = (targetId: string, attempts = 0) => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (attempts < 20) {
      window.setTimeout(() => scrollToSection(targetId, attempts + 1), 100);
    }
  };

  const goToCategory = (category: Category) => {
    setActiveAxis(null);
    scrollToSection(`shelf-${category}`);
  };

  useEffect(() => {
    if (!lockedEbook || !user || !hasAccess) return;

    setSelectedEbook(lockedEbook);
    setPreviewEbook(null);
    setLastRead(lockedEbook);
    setResumeHidden(false);
    safeStorage.removeItem("resume-card-hidden");
    safeStorage.setItem("last-read", JSON.stringify(lockedEbook.id));
    setLockedEbook(null);
  }, [hasAccess, lockedEbook, user]);

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveAxis(null);
      window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
      return;
    }

    const targetId = ROUTE_SECTION_MAP[location.pathname.toLowerCase()];
    if (!targetId) return;
    setActiveAxis(null);
    scrollToSection(targetId);
  }, [location.pathname]);

  useEffect(() => {
    const handleScrollRequest = (event: Event) => {
      const detail = (event as CustomEvent<{ targetId?: string; top?: boolean }>).detail;
      if (detail?.top) {
        setActiveAxis(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (detail?.targetId) {
        setActiveAxis(null);
        scrollToSection(detail.targetId);
      }
    };

    window.addEventListener("studiologos:scroll-to", handleScrollRequest);
    return () => window.removeEventListener("studiologos:scroll-to", handleScrollRequest);
  }, []);

  const hideResumeCard = () => {
    setResumeHidden(true);
    safeStorage.setItem("resume-card-hidden", "true");
  };

  useEffect(() => {
    if (!lockedEbook) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLockedEbook(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lockedEbook]);

  useEffect(() => {
    if (historyGuardReady.current) return;

    window.history.replaceState(
      { ...(window.history.state || {}), studioLogosHome: true },
      "",
      window.location.href,
    );
    window.history.pushState({ studioLogosGuard: true }, "", window.location.href);
    historyGuardReady.current = true;
  }, []);

  useEffect(() => {
    const layer = selectedEbook
      ? `reader:${selectedEbook.id}`
      : previewEbook
        ? `preview:${previewEbook.id}`
        : lockedEbook
          ? `locked:${lockedEbook.id}`
          : null;

    if (!historyGuardReady.current || !layer || lastHistoryLayer.current === layer) return;
    window.history.pushState({ studioLogosLayer: layer }, "", window.location.href);
    lastHistoryLayer.current = layer;
  }, [lockedEbook, previewEbook, selectedEbook]);

  useEffect(() => {
    const handlePopState = () => {
      if (selectedEbook) {
        setSelectedEbook(null);
        lastHistoryLayer.current = null;
      } else if (previewEbook) {
        setPreviewEbook(null);
        lastHistoryLayer.current = null;
      } else if (lockedEbook) {
        setLockedEbook(null);
        lastHistoryLayer.current = null;
      } else if (activeAxis) {
        setActiveAxis(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      window.history.pushState({ studioLogosGuard: true }, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [activeAxis, lockedEbook, previewEbook, selectedEbook]);

  const categories = [
    Category.SPECIAL,
    Category.PHILOSOPHY,
    Category.THEOLOGY,
    Category.CHRISTIAN_SPIRITUALITY,
    Category.BRAZILIAN_LITERATURE,
    Category.PORTUGUESE_LITERATURE,
    Category.UNIVERSAL_LITERATURE,
    Category.HISTORY,
    Category.HUMANITIES,
    Category.PSYCHOANALYSIS,
    Category.LITERATURE,
  ];

  const groupedEbooks = useMemo(() => {
    const result: Partial<Record<Category, Ebook[]>> = {};
    categories.forEach(cat => {
      result[cat] = EBOOKS.filter(e => e.category === cat);
    });
    return result;
  }, []);

  const showGuestBanners = !loading && !user;

  const globalSearchResults = useMemo(() => {
    const query = normalizeSearch(globalSearch);
    if (!query) return [];

    return EBOOKS.filter((ebook) => {
      const haystack = normalizeSearch([
        ebook.title,
        ebook.author,
        ebook.category,
        ebook.subcategory,
        ebook.collection,
        ebook.originalLanguage,
        ebook.description,
        ebook.longDescription,
        ebook.tags.join(" "),
      ].join(" "));
      return haystack.includes(query);
    }).slice(0, 12);
  }, [globalSearch]);

  if (location.pathname === "/admin") {
    return (
      <div className="min-h-screen relative font-sans">
        <Navigation />
        <main className="pt-24">
          <AdminPanel />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative font-sans">
      <Navigation />
      <GoogleTranslatePrompt />
      
      <main>
        <Hero />

        <section className="px-4 sm:px-6 lg:px-10 -mt-4 md:-mt-8 relative z-20">
          <div className="max-w-5xl mx-auto bg-[#F9F7F2] border border-black/10 shadow-2xl p-4 md:p-6">
            <div className="grid lg:grid-cols-[1fr_auto] gap-4 items-center">
              <label className="relative block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black/35" />
                <input
                  value={globalSearch}
                  onChange={(event) => setGlobalSearch(event.target.value)}
                  placeholder="Buscar eBook por nome da obra, autor ou tema..."
                  className="h-12 md:h-14 w-full border border-black/10 bg-white pl-12 pr-4 text-sm md:text-base font-serif outline-none transition-colors placeholder:text-black/35 focus:border-[#C5A059]"
                />
              </label>
              <div className="text-[9px] md:text-[10px] uppercase tracking-[0.18em] md:tracking-[0.24em] font-black text-black/45">
                {globalSearch.trim()
                  ? `${globalSearchResults.length} resultado${globalSearchResults.length === 1 ? "" : "s"}`
                  : "Título, autor ou tema"}
              </div>
            </div>

            {globalSearch.trim() && (
              <div className="mt-4 border-t border-black/10 pt-4">
                {globalSearchResults.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
                    {globalSearchResults.map((ebook) => (
                      <button
                        key={ebook.id}
                        onClick={() => {
                          setGlobalSearch("");
                          handlePreview(ebook);
                        }}
                        className="group text-left border border-black/10 bg-white p-3 md:p-4 transition-colors hover:border-[#C5A059]"
                      >
                        <p className="text-[8px] md:text-[9px] uppercase tracking-[0.18em] font-black text-[#8A682B] line-clamp-1">
                          {ebook.category} · {ebook.collection}
                        </p>
                        <h3 className="mt-2 font-serif text-base md:text-lg leading-tight text-[#111] line-clamp-2 group-hover:text-[#8A682B]">
                          {ebook.title}
                        </h3>
                        <p className="mt-1 text-xs text-black/55 line-clamp-1">{ebook.author}</p>
                        <p className="mt-2 text-[10px] text-black/40 line-clamp-2">
                          {ebook.tags.slice(0, 4).join(" · ")}
                        </p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white border border-black/10 p-4 text-sm text-black/55">
                    Nenhuma obra encontrada. Tente outro título, autor ou tema.
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {showGuestBanners && <GuestSubscriptionBanner />}

        {/* Section: Study Paths First */}
        <section id="trilhas-estudo" className="py-9 md:py-14 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[0.95fr_1.6fr] gap-5 md:gap-8 items-stretch">
            <div className="bg-[#1A1A1A] text-white p-5 md:p-7 rounded-sm border border-black/10 flex flex-col justify-between">
              <div>
                <span className="accent-gold text-[9px] md:text-[10px] uppercase tracking-[0.28em] md:tracking-[0.45em] font-black">Plataforma completa</span>
                <h2 className="text-3xl md:text-4xl font-serif mt-3 leading-tight text-white">Obras integrais, trilhas e sínteses no mesmo lugar.</h2>
                <p className="mt-4 text-sm md:text-base text-white/82 font-serif leading-relaxed">
                  O Studio Logos é uma biblioteca de leitura online com acervo completo, roteiros de formação e sínteses editoriais para descoberta.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-6">
                {[
                  { value: `${EBOOKS.length}+`, label: "obras" },
                  { value: String(categories.length), label: "áreas" },
                  { value: String(STUDY_ROUTES.length), label: "trilhas" },
                ].map((item) => (
                  <div key={item.label} className="border border-white/10 bg-white/[0.04] p-3">
                    <p className="font-serif text-2xl text-[#C5A059]">{item.value}</p>
                    <p className="text-[9px] uppercase tracking-[0.18em] text-white/70 font-bold">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {STUDY_ROUTES.slice(0, 3).map((route, index) => (
                <motion.div
                  key={route.id}
                  whileHover={{ y: -4 }}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleAxisOpen({ category: route.category, term: route.term, label: route.title })}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') handleAxisOpen({ category: route.category, term: route.term, label: route.title });
                  }}
                  className={`p-4 md:p-5 border border-black/5 shadow-sm flex flex-col justify-between min-h-32 md:min-h-full rounded-sm group cursor-pointer ${index === 1 ? 'bg-[#1A1A1A] text-white' : 'bg-white'}`}
                >
                  <div>
                    <span className="accent-gold text-[8px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-black">{route.eyebrow}</span>
                    <h3 className={`text-xl md:text-2xl font-serif mt-2 md:mt-3 leading-tight ${index === 1 ? 'text-white' : 'text-[#111]'}`}>{route.title}</h3>
                    <p className={`mt-3 text-xs leading-relaxed line-clamp-3 ${index === 1 ? 'text-white/78' : 'text-black/68'}`}>{route.description}</p>
                  </div>
                  <div className={`mt-4 flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold transition-opacity ${index === 1 ? 'text-white/75 group-hover:text-white' : 'text-black/60 group-hover:text-black'}`}>
                    Começar roteiro {index === 1 ? <ChevronRight className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <BestsellerSyntheses />

        {showGuestBanners && <GuestSubscriptionBanner compact />}
        
        {/* Continue Reading Shortcut - Editorial Sidebar Pattern */}
        {lastRead && !selectedEbook && !resumeHidden && (
          <div className="fixed left-10 bottom-24 z-40 hidden xl:block w-[280px]">
            <div className="relative bg-white p-8 rounded-sm border border-black/5 shadow-2xl">
              <button
                onClick={hideResumeCard}
                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-sm border border-black/15 bg-white text-black shadow-md transition-colors hover:bg-[#1A1A1A] hover:text-white"
                aria-label="Fechar retomar leitura"
                title="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-extrabold accent-gold mb-6 pr-8">Retomar Leitura</h3>
              <div className="flex gap-4 mb-6">
                <StudioEbookCover ebook={lastRead} compact showTitle={false} className="w-16 h-24 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-lg leading-tight mb-1 truncate text-[#0F0F0F]">{lastRead.title}</h4>
                  <p className="text-[9px] opacity-40 uppercase tracking-widest font-mono">Curadoria Studiologos</p>
                  <div className="w-full bg-black/5 h-[1px] mt-4">
                    <div className="bg-[#B48A3D] h-full w-2/3" />
                  </div>
                  <p className="text-[9px] mt-2 opacity-30 tracking-widest font-bold">SÍNTESE ATIVA</p>
                </div>
              </div>
              <button 
                onClick={() => handleRead(lastRead)}
                className="w-full py-3 bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all"
              >
                Retomar Agora
              </button>
            </div>
          </div>
        )}

        {/* Axis of knowledge */}
        <section className="py-14 md:py-24 px-4 sm:px-6 lg:px-10 bg-[#F2F0E9] border-y border-black/10">
          <div className="max-w-7xl mx-auto space-y-8 md:space-y-16">
            <div className="space-y-3 md:space-y-4">
              <span className="accent-gold text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] font-black">Navegação Curatorial</span>
              <h2 className="text-3xl md:text-4xl font-serif text-black leading-tight">Explorar por <br/> <span className="accent-gold">Dimensão de Conhecimento</span></h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8">
              {[
                { area: "Filosofia", category: Category.PHILOSOPHY, count: String(groupedEbooks[Category.PHILOSOPHY]?.length || 0), icon: "ALPHA", desc: "Clássicos essenciais do pensamento." },
                { area: "Teologia", category: Category.THEOLOGY, count: String(groupedEbooks[Category.THEOLOGY]?.length || 0), icon: "LOGOS", desc: "Patrística, Reforma e sermões." },
                { area: "Psicanálise", category: Category.PSYCHOANALYSIS, count: String(groupedEbooks[Category.PSYCHOANALYSIS]?.length || 0), icon: "PSIQUE", desc: "Freud, psicologia clássica e cultura." },
                { area: "Literatura", category: Category.LITERATURE, count: String(groupedEbooks[Category.LITERATURE]?.length || 0), icon: "LITTERA", desc: "Clássicos universais e roteiros literários." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -4, borderColor: "#B48A3D" }}
                  role="button"
                  tabIndex={0}
                  onClick={() => goToCategory(item.category)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") goToCategory(item.category);
                  }}
                  className="p-4 md:p-8 border border-black/5 bg-white/50 backdrop-blur-sm rounded-sm space-y-4 md:space-y-6 group cursor-pointer transition-all"
                >
                  <div className="text-[9px] md:text-[10px] font-black accent-gold tracking-[0.2em] md:tracking-[0.3em]">{item.icon}</div>
                  <div>
                    <h4 className="font-serif text-lg md:text-xl mb-2 leading-tight">{item.area}</h4>
                    <p className="text-[9px] md:text-[10px] text-black/40 font-mono tracking-widest uppercase mb-3 md:mb-4">{item.count} Obras</p>
                    <p className="text-xs text-black/60 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <ThematicRow />

        {showGuestBanners && <GuestSubscriptionBanner compact />}

        <section className="px-4 sm:px-6 lg:px-10 pb-14 md:pb-24 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-6 md:mb-10">
            <div>
              <span className="accent-gold text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] font-black">Roteiros de estudo</span>
              <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mt-3 md:mt-4">Leitura por tema</h2>
            </div>
            <p className="max-w-xl text-sm text-black/68 font-serif leading-relaxed">
              Percursos para entrar no acervo por problema, tradição e área de formação, sem transformar a biblioteca em uma lista solta de arquivos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-5">
            {STUDY_ROUTES.map((route) => (
              <button
                key={route.id}
                onClick={() => handleAxisOpen({ category: route.category, term: route.term, label: route.title })}
                className="text-left p-4 md:p-6 bg-white border border-black/5 hover:border-[#C5A059] transition-colors rounded-sm"
              >
                <p className="text-[9px] uppercase tracking-[0.22em] md:tracking-[0.28em] font-black accent-gold mb-2 md:mb-3">{route.eyebrow}</p>
                <h3 className="font-serif text-xl md:text-2xl mb-2 md:mb-3">{route.title}</h3>
                <p className="text-xs leading-relaxed text-black/68 mb-4 md:mb-5">{route.description}</p>
                <div className="space-y-1.5 md:space-y-2">
                  {route.steps.map((step) => (
                    <p key={step} className="text-[9px] md:text-[10px] uppercase tracking-[0.14em] md:tracking-[0.18em] font-bold text-black/55">{step}</p>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </section>

        <div className="space-y-16 md:space-y-32 pb-20 md:pb-40">
          {categories.map(cat => {
            const ebooks = groupedEbooks[cat];
            if (!ebooks || ebooks.length === 0) return null;
            const axisForCategory = activeAxis?.category === cat ? activeAxis : null;
            const visibleEbooks = axisForCategory
              ? ebooks.filter((ebook) => {
                  const haystack = `${ebook.title} ${ebook.author} ${ebook.subcategory} ${ebook.collection} ${ebook.description} ${ebook.tags.join(' ')}`.toLowerCase();
                  return haystack.includes(axisForCategory.term);
                })
              : ebooks;
            const shelfEbooks = visibleEbooks.length > 0 ? visibleEbooks : ebooks.slice(0, Math.min(12, ebooks.length));
            return (
              <div key={cat} id={`shelf-${cat}`} className="space-y-4 scroll-mt-28">
                {cat === Category.BRAZILIAN_LITERATURE && (
                  <span id="shelf-literatura-geral" className="block scroll-mt-28" aria-hidden="true" />
                )}
                {axisForCategory && (
                  <div className="px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
                    <div className="border border-[#C5A059]/30 bg-[#C5A059]/10 px-4 md:px-6 py-3 md:py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] font-black accent-gold">Eixo selecionado</p>
                        <p className="font-serif text-xl">{axisForCategory.label}</p>
                      </div>
                      <button
                        onClick={() => setActiveAxis(null)}
                        className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/50 hover:text-black"
                      >
                        Ver estante completa
                      </button>
                    </div>
                  </div>
                )}
                <EbookShelf 
                  category={cat} 
                  ebooks={shelfEbooks} 
                  onRead={handlePreview}
                />
                
                {/* Tactical Recommendation per category */}
                <div className="px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
                  <div className="bg-[#1A1A1A] p-4 md:p-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] accent-gold font-bold uppercase tracking-widest text-[#C5A059]">Leitura Recomendada</p>
                      <p className="text-sm font-serif opacity-80 text-white">Baseado no eixo de {cat}</p>
                    </div>
                    <button className="text-[10px] font-bold uppercase tracking-widest hover:underline text-[#C5A059] shrink-0">Explorar Guia →</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Engagement Section: Invitation to Depth */}
        <section className="py-20 md:py-40 bg-[#1A1A1A] text-white text-center space-y-8 md:space-y-10 px-4 sm:px-6">
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-5 md:space-y-6"
          >
            <span className="accent-gold text-[9px] md:text-[10px] uppercase tracking-[0.34em] md:tracking-[0.6em] font-black">Convite à Profundidade</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight text-white">
              Sua busca pelo <span className="accent-gold italic">Ser</span> começa aqui.
            </h2>
            <p className="text-white/55 text-base md:text-xl font-serif font-light leading-relaxed">
              Junte-se a uma comunidade de leitores que não se contentam com a superfície. Receba sínteses exclusivas e ensaios inéditos semanalmente.
            </p>
            
            <div className="pt-5 md:pt-10 max-w-md mx-auto">
              <div className="flex border-b border-white/20 pb-2 group focus-within:border-[#C5A059] transition-colors">
                <input 
                  type="email" 
                  placeholder="Seu melhor e-mail literário" 
                  className="bg-transparent flex-1 outline-none text-sm font-serif text-white placeholder:text-white/20"
                />
                <button className="accent-gold text-[10px] font-black uppercase tracking-widest hover:opacity-80 transition-opacity">Inscrever-se</button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="px-4 sm:px-6 lg:px-10 py-8 md:py-12 bg-[#F2F0E9] border-t border-black/5 flex flex-col md:flex-row items-center justify-between text-[10px] tracking-[0.18em] md:tracking-[0.3em] opacity-50 uppercase font-extrabold gap-5 md:gap-6">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <span className="accent-gold opacity-100">Curadoria Literária Superior</span>
          <span className="text-black">Cloud Sync: Ativo</span>
        </div>
        <div className="flex items-center gap-8">
          <a href="#" className="hover:text-[#C5A059] transition-colors text-black">Biblioteca Privada</a>
          <a href="#" className="hover:text-[#C5A059] transition-colors text-black">Studiologos.com.br</a>
        </div>
      </footer>

      <AnimatePresence>
        {lockedEbook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/50 backdrop-blur-sm flex items-center justify-center px-6"
            onClick={() => setLockedEbook(null)}
          >
            <div
              className="relative bg-[#F9F7F2] max-w-md w-full p-10 rounded-sm shadow-2xl border border-black/10 text-center"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                onClick={() => setLockedEbook(null)}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-sm border border-black/15 bg-white text-black shadow-md transition-colors hover:bg-[#1A1A1A] hover:text-white"
                aria-label="Fechar janela de acesso"
                title="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="w-14 h-14 rounded-full bg-[#1A1A1A] text-[#C5A059] flex items-center justify-center mx-auto mb-6">
                <Lock className="w-6 h-6" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.4em] font-black accent-gold mb-4">Acesso Studio Logos</p>
              <h2 className="text-3xl font-serif mb-4">{user ? 'Assinatura necessária' : 'Entre para continuar a leitura'}</h2>
              <p className="text-sm text-black/60 leading-relaxed mb-8">
                {user
                  ? `Seu login Google (${user.email || 'e-mail atual'}) ainda não possui pagamento aprovado no Mercado Pago para abrir ${lockedEbook.title}.`
                  : `Você pode explorar o acervo livremente. Para abrir o conteúdo de ${lockedEbook.title}, entre com o mesmo Gmail usado no pagamento.`}
              </p>
              <div className="space-y-3">
                {!user && (
                  <button
                    onClick={async () => {
                      await login();
                    }}
                    disabled={loading}
                    className="w-full py-4 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.24em] font-bold hover:bg-black disabled:opacity-50"
                  >
                    Entrar com Google
                  </button>
                )}
                {user && !hasAccess && (
                  <a
                    href={PAYMENT_LINKS.studioLogosMonthly}
                    className="block w-full py-4 bg-[#C5A059] text-black text-[10px] uppercase tracking-[0.24em] font-bold hover:bg-[#B48A3D]"
                  >
                    Assinar para liberar acesso
                  </a>
                )}
                <button
                  onClick={() => setLockedEbook(null)}
                  className="w-full py-3 text-[10px] uppercase tracking-[0.24em] font-bold text-black/50 hover:text-black"
                >
                  Continuar vendo o catálogo
                </button>
              </div>
            </div>
          </motion.div>
        )}
        {selectedEbook && (
          <Reader 
            ebook={selectedEbook} 
            onClose={() => setSelectedEbook(null)} 
            onRelatedRead={handleRead}
            related={EBOOKS.filter((item) => item.category === selectedEbook.category)}
          />
        )}
        {previewEbook && !selectedEbook && (
          <EbookPreview
            ebook={previewEbook}
            related={EBOOKS.filter((item) => item.category === previewEbook.category && item.id !== previewEbook.id)}
            canRead={Boolean(user && hasAccess)}
            onClose={() => setPreviewEbook(null)}
            onRead={handleRead}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
