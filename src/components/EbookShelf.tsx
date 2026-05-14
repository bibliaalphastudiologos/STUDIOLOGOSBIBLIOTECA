import React, { useEffect, useMemo, useState } from "react";
import { Filter, Search, ChevronRight } from "lucide-react";
import { type Ebook, Category } from "../studioTypes";
import { StudioEbookCover } from "./StudioEbookCover";

interface EbookShelfProps {
  category: Category;
  ebooks: Ebook[];
  onRead: (ebook: Ebook) => void;
}

// Cor de acento por categoria
const CATEGORY_ACCENT: Partial<Record<Category, string>> = {
  [Category.PHILOSOPHY]:          "#b9a46a",
  [Category.THEOLOGY]:            "#c8a35b",
  [Category.CHRISTIAN_SPIRITUALITY]: "#8cba6a",
  [Category.PSYCHOANALYSIS]:      "#a9a1b8",
  [Category.BRAZILIAN_LITERATURE]: "#90b77d",
  [Category.PORTUGUESE_LITERATURE]: "#c7a0d6",
  [Category.UNIVERSAL_LITERATURE]: "#d3a073",
  [Category.HISTORY]:             "#9fb2c9",
  [Category.HUMANITIES]:          "#d0bd8a",
  [Category.LITERATURE]:          "#d3a073",
  [Category.SPECIAL]:             "#f2c86b",
};

function EbookBadge({ ebook }: { ebook: Ebook }) {
  if (ebook.isSpecial) return <span className="badge-premium">Premium</span>;
  return null;
}

export const EbookShelf: React.FC<EbookShelfProps> = ({ category, ebooks, onRead }) => {
  const [search, setSearch]         = useState("");
  const [language, setLanguage]     = useState("Todos");
  const [collection, setCollection] = useState("Todas");
  const [visibleCount, setVisibleCount] = useState(24);
  const [showGrid, setShowGrid]     = useState(false);

  const accent = CATEGORY_ACCENT[category] ?? "#C5A059";

  const languages   = useMemo(() => ["Todos", ...Array.from(new Set(ebooks.map((e) => e.originalLanguage).filter(Boolean))).slice(0, 6)], [ebooks]);
  const collections = useMemo(() => ["Todas", ...Array.from(new Set(ebooks.map((e) => e.collection).filter(Boolean))).slice(0, 6)], [ebooks]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return ebooks.filter((ebook) => {
      const matchesSearch = !query
        || ebook.title.toLowerCase().includes(query)
        || ebook.author.toLowerCase().includes(query)
        || ebook.tags.some((tag) => tag.toLowerCase().includes(query));
      const matchesLang   = language   === "Todos" || ebook.originalLanguage === language;
      const matchesColl   = collection === "Todas" || ebook.collection === collection;
      return matchesSearch && matchesLang && matchesColl;
    });
  }, [collection, ebooks, language, search]);

  useEffect(() => { setVisibleCount(24); }, [category, collection, language, search]);

  const visible    = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);
  const isFiltered = search.trim() || language !== "Todos" || collection !== "Todas";

  return (
    <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto space-y-5 md:space-y-9">

      {/* ── Cabeçalho da estante ────────────────────────────────── */}
      <div className="premium-shell px-4 md:px-6 py-4 md:py-6 space-y-4 md:space-y-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            {/* Linha de acento colorida por categoria */}
            <span
              className="shelf-header-accent"
              style={{ background: accent }}
            />
            <p className="text-[9px] md:text-[10px] uppercase tracking-[0.28em] font-black" style={{ color: accent }}>
              Estante digital
            </p>
            <h2 className="text-2xl md:text-4xl font-serif text-[#151411] leading-tight">{category}</h2>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-[9px] uppercase tracking-[0.16em] text-black/45 font-bold">
              {filtered.length}/{ebooks.length} obras
            </p>
            {/* Botão grade/rail — só no mobile */}
            <button
              className="md:hidden text-[8px] uppercase tracking-[0.15em] font-black border border-black/15 px-2 py-1 rounded-sm transition-colors hover:border-[#C5A059]"
              style={{ color: showGrid ? "#C5A059" : "rgba(0,0,0,0.4)" }}
              onClick={() => setShowGrid(!showGrid)}
            >
              {showGrid ? "Rail" : "Grade"}
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-2 lg:grid-cols-[1fr_auto_auto] gap-2 md:gap-3">
          <label className="relative block col-span-2 lg:col-span-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-35" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por título, autor ou tema..."
              className="w-full h-10 md:h-11 pl-10 pr-4 bg-white/80 border border-black/10 text-sm outline-none transition-colors focus:border-[#C5A059]"
            />
          </label>
          <label className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-35" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full h-10 md:h-11 pl-10 pr-7 bg-white/80 border border-black/10 text-[10px] md:text-xs uppercase tracking-[0.08em] outline-none transition-colors focus:border-[#C5A059]"
            >
              {languages.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <select
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
            className="col-span-2 lg:col-span-1 h-10 md:h-11 px-3 bg-white/80 border border-black/10 text-[10px] md:text-xs uppercase tracking-[0.08em] outline-none transition-colors focus:border-[#C5A059]"
          >
            {collections.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          MOBILE — Rail horizontal (scroll tipo Netflix)
          Oculto quando showGrid=true ou quando há filtro ativo
          ══════════════════════════════════════════════════════════ */}
      {!isFiltered && !showGrid && (
        <div className="md:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide pb-2">
          <div className="shelf-rail">
            {visible.map((ebook) => (
              <div
                key={ebook.id}
                className="shelf-rail-card group relative w-[112px]"
                onClick={() => onRead(ebook)}
              >
                {/* Capa com overlay */}
                <div className="relative">
                  <StudioEbookCover
                    ebook={ebook}
                    compact
                    className={`w-full shelf-grid-cover ${ebook.isSpecial ? "ring-1 ring-[#C5A059]/60" : ""}`}
                  />
                  <div className="cover-play-overlay" />
                  {/* Badge no topo direito */}
                  <div className="absolute top-1.5 right-1.5 z-30">
                    <EbookBadge ebook={ebook} />
                  </div>
                </div>
                {/* Info abaixo da capa */}
                <div className="mt-2 space-y-0.5 px-0.5">
                  <p className="text-[9px] font-serif font-semibold text-black/75 line-clamp-2 leading-tight">
                    {ebook.title}
                  </p>
                  <p className="text-[7.5px] text-black/40 truncate">{ebook.author}</p>
                </div>
              </div>
            ))}

            {/* Card "Ver todos" ao final do rail */}
            {filtered.length > visible.length && (
              <div
                className="shelf-rail-card w-[112px] flex flex-col items-center justify-center gap-2 border border-dashed border-black/15 rounded-sm bg-white/40"
                style={{ aspectRatio: "2/3" }}
                onClick={() => { setShowGrid(true); setVisibleCount(filtered.length); }}
              >
                <ChevronRight
                  size={22}
                  style={{ color: accent }}
                />
                <span
                  className="text-[7px] font-black uppercase tracking-[0.15em] text-center px-2"
                  style={{ color: accent }}
                >
                  Ver todas<br/>{filtered.length} obras
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          DESKTOP — Grade (e mobile em modo grade)
          ══════════════════════════════════════════════════════════ */}
      <div className={`
        grid gap-x-3 gap-y-6 md:gap-x-5 md:gap-y-8
        ${(!isFiltered && !showGrid) ? "hidden md:grid" : "grid"}
        grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8
      `}>
        {visible.map((ebook) => (
          <div
            key={ebook.id}
            className="shelf-grid-card group"
            onClick={() => onRead(ebook)}
          >
            {/* Capa */}
            <div className="relative">
              <StudioEbookCover
                ebook={ebook}
                compact
                className={`shelf-grid-cover transition-all duration-300 cursor-pointer ${
                  ebook.isSpecial ? "ring-1 ring-[#C5A059]/50" : ""
                }`}
              />
              <div className="cover-play-overlay" />
              {/* Badge */}
              <div className="absolute top-1.5 right-1.5 z-30">
                <EbookBadge ebook={ebook} />
              </div>
            </div>

            {/* Info */}
            <div className="mt-2.5 space-y-0.5">
              <p
                className="text-[6px] md:text-[7px] uppercase font-black tracking-widest"
                style={{ color: ebook.isSpecial ? accent : "rgba(0,0,0,0.3)" }}
              >
                {ebook.isSpecial ? "Premium" : ebook.category}
              </p>
              <p className="text-[9px] md:text-[10px] font-serif text-black/70 truncate leading-tight">
                {ebook.author}
              </p>
              <p className="text-[7px] md:text-[8px] text-black/30 truncate">
                {ebook.chapters.length} cap. · {ebook.originalLanguage}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Carregar mais (somente na grade) */}
      {(isFiltered || showGrid || true) && filtered.length > visible.length && (
        <div className={`flex justify-center pt-1 md:pt-2 ${(!isFiltered && !showGrid) ? "hidden md:flex" : "flex"}`}>
          <button
            onClick={() => setVisibleCount((v) => Math.min(v + 24, filtered.length))}
            className="h-10 md:h-11 px-5 md:px-6 premium-button-light text-[10px] uppercase tracking-[0.18em] font-bold hover:border-[#C5A059] hover:text-[#8A682B] transition-colors"
          >
            Carregar mais obras
          </button>
        </div>
      )}
    </section>
  );
};
