import React, { useEffect, useMemo, useRef, useState } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { EbookShelf } from "./components/EbookShelf";
import { ThematicRow } from "./components/ThematicRow";
import { Reader } from "./components/Reader";
import { EbookPreview } from "./components/EbookPreview";
import { GoogleTranslatePrompt } from "./components/GoogleTranslatePrompt";
import { AdminPanel } from "./components/AdminPanel";
import { GrowthMarketing } from "./components/GrowthMarketing";
import { LeadCapture } from "./components/LeadCapture";
import { StudioEbookCover } from "./components/StudioEbookCover";
import { EBOOKS } from "./data";
import { STUDY_ROUTES } from "./data/studyRoutes";
import { Category, type Ebook } from "./studioTypes";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Check, ChevronRight, Lock, Search, Sparkles, X } from "lucide-react";
import { safeStorage } from "./lib/safeStorage";
import { useAuth } from "./components/AuthProvider";
import { NewsTickerBar } from "./components/NewsTickerBar";
import { MobileBottomNav } from "./components/MobileBottomNav";
import { WhatsAppFloat } from "./components/WhatsAppFloat";
import { useLocation, useNavigate } from "react-router-dom";
import { PublicDomainSection } from './components/PublicDomainSection';

function requestScroll(detail: { targetId?: string; top?: boolean }) {
  window.dispatchEvent(new CustomEvent("studiologos:scroll-to", { detail }));
}

function normalizeSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getReaderPath(ebook: Ebook): string {
  return `/ler/${ebook.slug || ebook.id}`;
}

function getReaderSlug(pathname: string): string | null {
  const match = pathname.match(/^\/ler\/([^/]+)\/?$/i);
  return match ? decodeURIComponent(match[1]) : null;
}

const ROUTE_SECTION_MAP: Record<string, string> = {
  "/filosofia": `shelf-${Category.PHILOSOPHY}`,
  "/teologia": `shelf-${Category.THEOLOGY}`,
  "/psicanalise": `shelf-${Category.PSYCHOANALYSIS}`,
  "/psicanÃ¡lise": `shelf-${Category.PSYCHOANALYSIS}`,
  "/literatura": "shelf-literatura-geral",
};

const LITERATURE_CATEGORIES = [
  Category.BRAZILIAN_LITERATURE,
  Category.PORTUGUESE_LITERATURE,
  Category.UNIVERSAL_LITERATURE,
  Category.LITERATURE,
];

const FOOTER_SECTION_TARGETS: Record<string, string> = {
  Filosofia: `shelf-${Category.PHILOSOPHY}`,
  Teologia: `shelf-${Category.THEOLOGY}`,
  PsicanÃ¡lise: `shelf-${Category.PSYCHOANALYSIS}`,
  Literatura: "shelf-literatura-geral",
};

function GuestSubscriptionBanner({ compact = false }: { compact?: boolean }) {
  const { login, loading } = useAuth();
  return (
    <section className="px-4 sm:px-6 lg:px-10">
      <div className={`max-w-7xl mx-auto text-white shadow-2xl ${compact ? "p-4 md:p-5" : "p-5 md:p-7"}`} style={{background:"linear-gradient(135deg,#0d1a3a,#1a0a2e)",border:"1px solid rgba(249,115,22,0.2)"}}>
        <div className="grid lg:grid-cols-[1fr_auto] gap-4 md:gap-6 items-center">
          <div>
            <p className="text-[9px] md:text-[10px] uppercase tracking-[0.26em] md:tracking-[0.34em] font-black text-[#C5A059]">
              Acesso Studio Logos
            </p>
            <h2 className={`font-serif leading-tight mt-2 text-white ${compact ? "text-xl md:text-2xl" : "text-2xl md:text-4xl"}`}>
              Entre e libere a biblioteca completa por R$ 19,00/mÃªs.
            </h2>
            {!compact && (
              <p className="mt-3 max-w-3xl text-sm md:text-base text-white/72 leading-relaxed">
                Leia obras integrais, salve seu progresso, continue de onde parou e use uma experiÃªncia organizada para estudo sÃ©rio.
              </p>
            )}
            <div className="mt-4 flex flex-wrap gap-2 text-[9px] md:text-[10px] uppercase tracking-[0.14em] md:tracking-[0.18em] font-bold text-white/70">
              <span className="inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#C5A059]" /> Leitura online</span>
              <span className="inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#C5A059]" /> Progresso salvo</span>
              <span className="inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#C5A059]" /> Trilhas de estudo</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 min-w-[220px]">
            <button
              onClick={login}
              disabled={loading}
              className="inline-flex min-h-12 items-center justify-center gap-2 px-5 text-center text-[10px] uppercase tracking-[0.2em] font-black text-white transition-all hover:shadow-xl hover:-translate-y-0.5 btn-vibrant-primary disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              Entrar com Google
            </button>
            <span className="inline-flex min-h-10 items-center justify-center gap-2 border border-white/10 px-4 text-center text-[9px] uppercase tracking-[0.18em] font-bold text-white/65">
              <Check className="w-3.5 h-3.5 text-[#C5A059]" />
              Acesso gratuito
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
  const navigate = useNavigate();
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
  const readerSlug = getReaderSlug(location.pathname);
  const routedReaderEbook = useMemo(
    () => readerSlug
      ? EBOOKS.find((ebook) => ebook.slug === readerSlug || ebook.id === readerSlug) || null
      : null,
    [readerSlug],
  );
  const readerEbook = routedReaderEbook || selectedEbook;
  const isReaderRoute = Boolean(readerSlug);

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
    navigate(getReaderPath(ebook));
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
      scrollToSection(axis.category === Category.LITERATURE ? 'shelf-literatura-geral' : `shelf-${axis.category}`);
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
    scrollToSection(category === Category.LITERATURE ? "shelf-literatura-geral" : `shelf-${category}`);
  };

  useEffect(() => {
    if (!lockedEbook || !user || !hasAccess) return;

    const nextEbook = lockedEbook;
    setSelectedEbook(nextEbook);
    setPreviewEbook(null);
    setLastRead(nextEbook);
    setResumeHidden(false);
    safeStorage.removeItem("resume-card-hidden");
    safeStorage.setItem("last-read", JSON.stringify(nextEbook.id));
    setLockedEbook(null);
    navigate(getReaderPath(nextEbook));
  }, [hasAccess, lockedEbook, user]);

  useEffect(() => {
    if (!routedReaderEbook) return;
    if ((!user || !hasAccess) && !routedReaderEbook.isSpecial) {
      setSelectedEbook(null);
      setPreviewEbook(null);
      setLockedEbook(routedReaderEbook);
      return;
    }

    setSelectedEbook(routedReaderEbook);
    setPreviewEbook(null);
    setLastRead(routedReaderEbook);
    setResumeHidden(false);
    safeStorage.removeItem("resume-card-hidden");
    safeStorage.setItem("last-read", JSON.stringify(routedReaderEbook.id));
  }, [hasAccess, routedReaderEbook, user]);

  useEffect(() => {
    const section = new URLSearchParams(location.search).get("section");
    if (section) {
      const targetId = {
        filosofia: `shelf-${Category.PHILOSOPHY}`,
        teologia: `shelf-${Category.THEOLOGY}`,
        psicanalise: `shelf-${Category.PSYCHOANALYSIS}`,
        literatura: "shelf-literatura-geral",
      }[section.toLowerCase()];

      if (targetId) {
        setActiveAxis(null);
        scrollToSection(targetId);
        return;
      }
    }

    if (isReaderRoute) return;

    if (location.pathname === "/") {
      setActiveAxis(null);
      window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
      return;
    }

    const targetId = ROUTE_SECTION_MAP[location.pathname.toLowerCase()];
    if (!targetId) return;
    setActiveAxis(null);
    scrollToSection(targetId);
  }, [isReaderRoute, location.pathname, location.search]);

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

  const closeLockedAccess = () => {
    setLockedEbook(null);
    if (isReaderRoute) navigate("/");
  };

  useEffect(() => {
    if (!lockedEbook) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLockedAccess();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lockedEbook, isReaderRoute]);

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
      if (isReaderRoute) {
        setSelectedEbook(null);
        lastHistoryLayer.current = null;
        return;
      }

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
  }, [activeAxis, isReaderRoute, lockedEbook, previewEbook, selectedEbook]);

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
        <main className="pt-[96px]">
          <AdminPanel />
        </main>
        <WhatsAppFloat />
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative font-sans">
      <Navigation />
      <GoogleTranslatePrompt />
      
      <main>
        <Hero />
        {!readerEbook && <NewsTickerBar />}

        <section className="px-4 sm:px-6 lg:px-10 -mt-4 md:-mt-10 relative z-20">
          <div className="max-w-5xl mx-auto premium-shell p-4 md:p-6 backdrop-blur-xl">
            <div className="grid lg:grid-cols-[1fr_auto] gap-4 items-center">
              <label className="relative block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black/35" />
                <input
                  value={globalSearch}
                  onChange={(event) => setGlobalSearch(event.target.value)}
                  placeholder="Buscar eBook por nome da obra, autor ou tema..."
                  className="h-12 md:h-14 w-full border border-black/10 bg-white/82 pl-12 pr-4 text-sm md:text-base font-serif outline-none transition-colors placeholder:text-black/35 focus:border-[#C5A059]"
                />
              </label>
              <div className="text-[9px] md:text-[10px] uppercase tracking-[0.18em] md:tracking-[0.24em] font-black text-black/45">
                {globalSearch.trim()
                  ? `${globalSearchResults.length} resultado${globalSearchResults.length === 1 ? "" : "s"}`
                  : "TÃ­tulo, autor ou tema"}
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
                          {ebook.category} Â· {ebook.collection}
                        </p>
                        <h3 className="mt-2 font-serif text-base md:text-lg leading-tight text-[#111] line-clamp-2 group-hover:text-[#8A682B]">
                          {ebook.title}
                        </h3>
                        <p className="mt-1 text-xs text-black/55 line-clamp-1">{ebook.author}</p>
                        <p className="mt-2 text-[10px] text-black/40 line-clamp-2">
                          {ebook.tags.slice(0, 4).join(" Â· ")}
                        </p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white border border-black/10 p-4 text-sm text-black/55">
                    Nenhuma obra encontrada. Tente outro tÃ­tulo, autor ou tema.
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {showGuestBanners && <GuestSubscriptionBanner />}

        <GrowthMarketing showLeadTools={showGuestBanners} />

        {/* Section: Study Paths First */}
        <section id="trilhas-estudo" className="py-9 md:py-14 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[0.95fr_1.6fr] gap-5 md:gap-8 items-stretch">
            <div className="bg-[#151411] text-white p-5 md:p-7 rounded-sm border border-black/10 shadow-2xl flex flex-col justify-between">
              <div>
                <span className="accent-gold text-[9px] md:text-[10px] uppercase tracking-[0.28em] md:tracking-[0.45em] font-black">Plataforma completa</span>
                <h2 className="text-3xl md:text-4xl font-serif mt-3 leading-tight text-white">Obras integrais e trilhas de formaÃ§Ã£o no mesmo lugar.</h2>
                <p className="mt-4 text-sm md:text-base text-white/82 font-serif leading-relaxed">
                  O Studio Logos Ã© uma biblioteca de leitura online com acervo completo e roteiros de formaÃ§Ã£o para descoberta.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-6">
                {[
                  { value: `${EBOOKS.length}+`, label: "obras" },
                  { value: String(categories.length), label: "Ã¡reas" },
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
                  className={`p-4 md:p-5 border border-black/5 shadow-sm flex flex-col justify-between min-h-32 md:min-h-full rounded-sm group cursor-pointer ${index === 1 ? 'bg-[#151411] text-white' : 'premium-card'}`}
                >
                  <div>
                    <span className="accent-gold text-[8px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-black">{route.eyebrow}</span>
                    <h3 className={`text-xl md:text-2xl font-serif mt-2 md:mt-3 leading-tight ${index === 1 ? 'text-white' : 'text-[#111]'}`}>{route.title}</h3>
                    <p className={`mt-3 text-xs leading-relaxed line-clamp-3 ${index === 1 ? 'text-white/78' : 'text-black/68'}`}>{route.description}</p>
                  </div>
                  <div className={`mt-4 flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold transition-opacity ${index === 1 ? 'text-white/75 group-hover:text-white' : 'text-black/60 group-hover:text-black'}`}>
                    ComeÃ§ar roteiro {index === 1 ? <ChevronRight className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {showGuestBanners && <GuestSubscriptionBanner compact />}
        
        {/* Continue Reading Shortcut - Editorial Sidebar Pattern */}
        {lastRead && !readerEbook && !resumeHidden && (
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
                  <p className="text-[9px] mt-2 opacity-30 tracking-widest font-bold">SÃNTESE ATIVA</p>
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

        {/* Axis of knowledge â quick-access category grid */}
        <section className="py-10 md:py-20 px-4 sm:px-6 lg:px-10 section-dark-vibe border-y border-white/5">
          <div className="max-w-7xl mx-auto space-y-5 md:space-y-12">
            <div className="flex items-end justify-between gap-4">
              <div className="space-y-1 md:space-y-2">
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] font-black" style={{color:"#f97316"}}>Acervo por Ãrea</span>
                <h2 className="text-2xl md:text-4xl font-serif text-white leading-tight">Explorar por <span style={{color:"#f97316"}}>DimensÃ£o</span></h2>
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/30 hidden md:block">Toque para navegar</span>
            </div>

            {/* 4-col grid â horizontal scroll on mobile */}
            <div className="-mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto scrollbar-hide">
              <div className="flex md:grid md:grid-cols-4 gap-3 md:gap-6" style={{ minWidth: "max-content" }}>
                {[
                  { area: "Filosofia",  category: Category.PHILOSOPHY,    count: groupedEbooks[Category.PHILOSOPHY]?.length || 0,    icon: "Î±", desc: "ClÃ¡ssicos do pensamento.", accent: "#b9a46a" },
                  { area: "Teologia",   category: Category.THEOLOGY,      count: groupedEbooks[Category.THEOLOGY]?.length || 0,      icon: "â", desc: "PatrÃ­stica, Reforma, sermÃµes.", accent: "#c8a35b" },
                  { area: "PsicanÃ¡lise",category: Category.PSYCHOANALYSIS,count: groupedEbooks[Category.PSYCHOANALYSIS]?.length || 0, icon: "Ï", desc: "Freud e psicologia clÃ¡ssica.", accent: "#a9a1b8" },
                  { area: "Literatura", category: Category.LITERATURE,    count: LITERATURE_CATEGORIES.reduce((sum, cat) => sum + (groupedEbooks[cat]?.length || 0), 0), icon: "â", desc: "Brasileira, portuguesa e universal.", accent: "#d3a073" },
                ].map((item) => (
                  <motion.button
                    key={item.area}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => goToCategory(item.category)}
                    className="w-[160px] md:w-auto text-left p-4 md:p-7 rounded-sm cursor-pointer transition-all group flex-shrink-0"
                    style={{background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderTopWidth: 2, borderTopColor: item.accent}}
                  >
                    <div className="font-serif text-2xl md:text-3xl mb-3" style={{ color: item.accent }}>{item.icon}</div>
                    <h4 className="font-serif text-base md:text-lg mb-1 leading-tight text-white">{item.area}</h4>
                    <p className="text-[9px] font-mono tracking-widest uppercase text-white/35 mb-2">{item.count} obras</p>
                    <p className="text-[10px] md:text-xs text-white/45 leading-relaxed hidden md:block">{item.desc}</p>
                  </motion.button>
                ))}
              </div>
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
              Percursos para entrar no acervo por problema, tradiÃ§Ã£o e Ã¡rea de formaÃ§Ã£o, sem transformar a biblioteca em uma lista solta de arquivos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-5">
            {STUDY_ROUTES.map((route) => (
              <button
                key={route.id}
                onClick={() => handleAxisOpen({ category: route.category, term: route.term, label: route.title })}
                className="text-left p-4 md:p-6 premium-card hover:border-[#C5A059] transition-colors rounded-sm"
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

        <div className="space-y-16 md:space-y-32 pb-32 md:pb-40">
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
                
                {/* Divisor visual entre categorias â linha fina com acento */}
                <div className="px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
                  <div className="flex items-center gap-4 py-2">
                    <div className="flex-1 h-px bg-black/6" />
                    <span className="text-[8px] uppercase tracking-[0.28em] font-black text-black/20">
                      {cat} Â· {ebooks.length} obras
                    </span>
                    <div className="flex-1 h-px bg-black/6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Engagement Section: Invitation to Depth */}
        <section className="py-20 md:py-36 bg-[#151411] text-white text-center space-y-8 md:space-y-10 px-4 sm:px-6">
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-5 md:space-y-6"
          >
            <span className="accent-gold text-[9px] md:text-[10px] uppercase tracking-[0.34em] md:tracking-[0.6em] font-black">Convite Ã  Profundidade</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight text-white">
              Sua busca pelo <span className="accent-gold italic">Ser</span> comeÃ§a aqui.
            </h2>
            <p className="text-white/55 text-base md:text-xl font-serif font-light leading-relaxed">
              Junte-se a uma comunidade de leitores que nÃ£o se contentam com a superfÃ­cie. Receba ensaios inÃ©ditos e curadoria exclusiva semanalmente.
            </p>
            
            <div className="pt-5 md:pt-10 max-w-4xl mx-auto text-left">
              <LeadCapture
                source="home-final"
                dark
                title="Receba conteÃºdos gratuitos e uma rota de entrada no Studio Logos."
                subtitle="Cadastre seu interesse para receber uma curadoria inicial por e-mail e WhatsApp."
              />
            </div>
          </motion.div>
        

      {/* Seção de Domínio Público — Literatura e Gramática Portuguesa */}
      <PublicDomainSection onReadEbook={handlePreview} />
</section>
      </main>

      <footer className="bg-[#111318] border-t border-white/5 pb-16 md:pb-0">
        {/* Footer principal */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 md:py-14 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <img src="/logo.png" alt="Studio Logos" className="h-10 w-auto opacity-90 object-contain" />
            <p className="text-[10px] text-white/45 leading-relaxed font-serif">
              Biblioteca digital de alta curadoria em Filosofia, Teologia, PsicanÃ¡lise e Literatura.
            </p>
          </div>
          {/* Acervo */}
          <div className="space-y-3">
            <p className="text-[9px] uppercase tracking-[0.3em] font-black text-[#C5A059]">Acervo</p>
            {["Filosofia","Teologia","PsicanÃ¡lise","Literatura"].map((item) => (
              <button key={item} onClick={() => requestScroll({ targetId: FOOTER_SECTION_TARGETS[item] })}
                className="block text-[11px] text-white/50 hover:text-white/90 transition-colors font-serif">
                {item}
              </button>
            ))}
          </div>
          {/* Plataforma */}
          <div className="space-y-3">
            <p className="text-[9px] uppercase tracking-[0.3em] font-black text-[#C5A059]">Plataforma</p>
            {["Trilhas de estudo","Busca avanÃ§ada","Leitura online"].map((item) => (
              <span key={item} className="block text-[11px] text-white/50 font-serif">{item}</span>
            ))}
          </div>
          {/* Acesso */}
          <div className="space-y-3">
            <p className="text-[9px] uppercase tracking-[0.3em] font-black text-[#C5A059]">Acesso</p>
            <p className="text-[11px] text-white/50 font-serif leading-relaxed">Assinatura mensal<br/>R$ 19,00/mÃªs</p>
            <a href="https://studiologos.com.br" className="block text-[10px] text-[#C5A059] hover:text-[#D8B76C] font-bold uppercase tracking-[0.18em] transition-colors">
              studiologos.com.br â
            </a>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="border-t border-white/5 px-4 sm:px-6 lg:px-10 py-4 flex flex-col md:flex-row items-center justify-between gap-3 max-w-7xl mx-auto">
          <span className="text-[9px] uppercase tracking-[0.22em] font-black text-white/25">
            Studio Logos Â· Curadoria LiterÃ¡ria Superior
          </span>
          <span className="text-[9px] uppercase tracking-[0.18em] font-bold text-white/20">
            Â© {new Date().getFullYear()} Â· Todos os direitos reservados
          </span>
        </div>
      </footer>

      <AnimatePresence>
        {lockedEbook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/50 backdrop-blur-sm flex items-center justify-center px-6"
            onClick={closeLockedAccess}
          >
            <div
              className="relative bg-[#F9F7F2] max-w-md w-full p-10 rounded-sm shadow-2xl border border-black/10 text-center"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                onClick={closeLockedAccess}
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
              <h2 className="text-3xl font-serif mb-4">{user ? `Seu acesso está sendo processado. Tente recarregar a página.` : `Para acessar ${lockedEbook.title}, entre com sua conta Google.`}
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
                
                <button
                  onClick={closeLockedAccess}
                  className="w-full py-3 text-[10px] uppercase tracking-[0.24em] font-bold text-black/50 hover:text-black"
                >
                  Continuar vendo o catÃ¡logo
                </button>
              </div>
            </div>
          </motion.div>
        )}
        {readerEbook && user && hasAccess && (
          <Reader 
            ebook={readerEbook} 
            onClose={() => {
              setSelectedEbook(null);
              navigate("/");
            }}
            onRelatedRead={handleRead}
            related={EBOOKS.filter((item) => item.category === readerEbook.category)}
            readerUrl={getReaderPath(readerEbook)}
          />
        )}
        {previewEbook && !readerEbook && (
          <EbookPreview
            ebook={previewEbook}
            related={EBOOKS.filter((item) => item.category === previewEbook.category && item.id !== previewEbook.id)}
            canRead={Boolean(user && hasAccess)}
            onClose={() => setPreviewEbook(null)}
            onRead={handleRead}
          />
        )}
      </AnimatePresence>
      <WhatsAppFloat />
      <MobileBottomNav />
    </div>
  );
}
