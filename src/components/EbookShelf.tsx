import React, { useEffect, useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import { type Ebook, Category } from "../studioTypes";

interface EbookShelfProps {
  category: Category;
  ebooks: Ebook[];
  onRead: (ebook: Ebook) => void;
}

function initials(value: string): string {
  return value
    .replace(/\([^)]*\)/g, '')
    .split(/\s+/)
    .filter((part) => part.length > 2)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export const EbookShelf: React.FC<EbookShelfProps> = ({ category, ebooks, onRead }) => {
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("Todos");
  const [collection, setCollection] = useState("Todas");
  const [visibleCount, setVisibleCount] = useState(24);

  const languages = useMemo(() => ["Todos", ...Array.from(new Set(ebooks.map((ebook) => ebook.originalLanguage).filter(Boolean))).slice(0, 6)], [ebooks]);
  const collections = useMemo(() => ["Todas", ...Array.from(new Set(ebooks.map((ebook) => ebook.collection).filter(Boolean))).slice(0, 6)], [ebooks]);
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return ebooks.filter((ebook) => {
      const matchesSearch = !query
        || ebook.title.toLowerCase().includes(query)
        || ebook.author.toLowerCase().includes(query)
        || ebook.tags.some((tag) => tag.toLowerCase().includes(query));
      const matchesLanguage = language === "Todos" || ebook.originalLanguage === language;
      const matchesCollection = collection === "Todas" || ebook.collection === collection;
      return matchesSearch && matchesLanguage && matchesCollection;
    });
  }, [collection, ebooks, language, search]);

  useEffect(() => {
    setVisibleCount(24);
  }, [category, collection, language, search]);

  const visible = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);

  return (
    <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto space-y-6 md:space-y-10">
      <div className="border-b border-black/5 pb-4 md:pb-5 space-y-4 md:space-y-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-[9px] md:text-[10px] uppercase tracking-[0.24em] md:tracking-[0.32em] font-black accent-gold">Estante digital</p>
            <h2 className="text-2xl md:text-3xl font-serif text-[#1A1A1A]">{category}</h2>
          </div>
          <p className="text-[9px] uppercase tracking-[0.16em] md:tracking-[0.2em] opacity-40 font-bold md:mb-1">
            {filtered.length} de {ebooks.length} obras selecionadas
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-[1fr_auto_auto] gap-2 md:gap-3">
          <label className="relative block col-span-2 lg:col-span-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-35" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por título, autor ou tema..."
              className="w-full h-10 md:h-11 pl-10 pr-4 bg-white border border-black/10 text-sm outline-none focus:border-[#C5A059]"
            />
          </label>
          <label className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-35" />
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="w-full h-10 md:h-11 pl-10 pr-7 bg-white border border-black/10 text-[10px] md:text-xs uppercase tracking-[0.08em] md:tracking-[0.12em] outline-none focus:border-[#C5A059]"
            >
              {languages.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <select
            value={collection}
            onChange={(event) => setCollection(event.target.value)}
            className="col-span-2 lg:col-span-1 h-10 md:h-11 px-3 bg-white border border-black/10 text-[10px] md:text-xs uppercase tracking-[0.08em] md:tracking-[0.12em] outline-none focus:border-[#C5A059]"
          >
            {collections.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-x-3 gap-y-5 md:gap-x-4 md:gap-y-7">
        {visible.map((ebook) => (
          <div
            key={ebook.id}
            className="group relative"
            onClick={() => onRead(ebook)}
          >
            {/* Book Cover Container */}
            <div className={`aspect-[2/3] relative overflow-hidden paper-texture ebook-shadow transition-all duration-500 group-hover:-translate-y-2 cursor-pointer ${ebook.isSpecial ? 'border border-[#C5A059]' : 'border border-black/5'}`}>
              <div className={`absolute inset-0 ${ebook.coverColor}`} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.12),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%,rgba(0,0,0,0.28))]" />
              <div className="absolute inset-2 md:inset-3 border border-white/10" />
              <div className="absolute inset-x-4 md:inset-x-6 top-6 md:top-8 h-px bg-white/15" />
              <div className="absolute inset-x-4 md:inset-x-6 bottom-6 md:bottom-8 h-px bg-white/15" />
              <div
                className="absolute -right-6 top-8 font-serif text-[6rem] leading-none opacity-[0.06] select-none"
                style={{ color: ebook.coverAccent }}
              >
                {ebook.coverMark}
              </div>

              {/* Cover Overlay Info */}
              <div className="absolute inset-0 flex flex-col justify-between py-4 md:py-7 px-3 md:px-5 text-center z-10">
                <div className="space-y-3 md:space-y-5">
                  <span
                    className="text-[6px] md:text-[7px] tracking-[0.16em] md:tracking-[0.26em] uppercase font-black"
                    style={{ color: ebook.coverAccent }}
                  >
                    {ebook.isSpecial ? "Premium" : ebook.category}
                  </span>

                  <div className="mx-auto h-7 w-7 md:h-10 md:w-10 rounded-full border border-white/10 flex items-center justify-center bg-black/10">
                    <span className="font-serif text-[10px] md:text-sm" style={{ color: ebook.coverAccent }}>
                      {initials(ebook.author) || ebook.coverMark}
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-1 items-center">
                    <h3 className="font-serif leading-[1.12] md:leading-[1.15] text-[11px] md:text-sm text-white drop-shadow-md line-clamp-4">
                      {ebook.title}
                    </h3>
                    <p className="text-[6px] md:text-[7px] text-white/35 uppercase tracking-[0.12em] md:tracking-[0.18em] line-clamp-2">
                      {ebook.coverEdition}
                    </p>
                  </div>
                </div>
                
                <span className="text-[6px] md:text-[8px] text-white/38 font-mono tracking-widest uppercase line-clamp-2">
                  {ebook.author}
                </span>
              </div>
              
              {/* Spine Effect */}
              <div className="absolute top-0 left-0 w-4 h-full bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
            </div>

            <div className="mt-2 md:mt-3 space-y-0.5 md:space-y-1">
              <p className={`text-[6px] md:text-[7px] uppercase font-black tracking-widest ${ebook.isSpecial ? 'accent-gold' : 'opacity-30'}`}>
                {ebook.category}
              </p>
              <p className="text-[9px] md:text-[10px] font-serif text-black/60 truncate">
                {ebook.author}
              </p>
              <p className="text-[8px] md:text-[9px] text-black/35 truncate">
                {ebook.chapters.length} capítulos · {ebook.originalLanguage}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length > visible.length && (
        <div className="flex justify-center pt-1 md:pt-2">
          <button
            onClick={() => setVisibleCount((value) => Math.min(value + 24, filtered.length))}
            className="h-10 md:h-11 px-5 md:px-6 border border-black/10 bg-white text-[10px] uppercase tracking-[0.18em] md:tracking-[0.22em] font-bold hover:border-[#C5A059] hover:text-[#8A682B] transition-colors"
          >
            Carregar mais obras
          </button>
        </div>
      )}
    </section>
  );
}
