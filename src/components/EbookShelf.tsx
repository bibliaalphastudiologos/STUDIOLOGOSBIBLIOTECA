import React, { useEffect, useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import { type Ebook, Category } from "../studioTypes";
import { StudioEbookCover } from "./StudioEbookCover";

interface EbookShelfProps {
  category: Category;
  ebooks: Ebook[];
  onRead: (ebook: Ebook) => void;
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
            <StudioEbookCover
              ebook={ebook}
              compact
              className={`transition-all duration-500 group-hover:-translate-y-2 cursor-pointer ${ebook.isSpecial ? 'border-[#C5A059]' : ''}`}
            />

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
