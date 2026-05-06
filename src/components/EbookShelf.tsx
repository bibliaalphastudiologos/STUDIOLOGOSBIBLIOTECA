import React, { useMemo, useState } from "react";
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

  return (
    <section className="py-12 px-10 max-w-7xl mx-auto space-y-10">
      <div className="border-b border-black/5 pb-5 space-y-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] font-black accent-gold">Estante digital</p>
            <h2 className="text-3xl font-serif text-[#1A1A1A]">{category}</h2>
          </div>
          <p className="text-[9px] uppercase tracking-[0.2em] opacity-40 font-bold mb-1">
            {filtered.length} de {ebooks.length} obras selecionadas
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_auto_auto] gap-3">
          <label className="relative block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-35" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por título, autor ou tema..."
              className="w-full h-11 pl-10 pr-4 bg-white border border-black/10 text-sm outline-none focus:border-[#C5A059]"
            />
          </label>
          <label className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-35" />
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="h-11 pl-10 pr-8 bg-white border border-black/10 text-xs uppercase tracking-[0.12em] outline-none focus:border-[#C5A059]"
            >
              {languages.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <select
            value={collection}
            onChange={(event) => setCollection(event.target.value)}
            className="h-11 px-3 bg-white border border-black/10 text-xs uppercase tracking-[0.12em] outline-none focus:border-[#C5A059]"
          >
            {collections.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
        {filtered.map((ebook) => (
          <div
            key={ebook.id}
            className="group relative"
            onClick={() => onRead(ebook)}
          >
            {/* Book Cover Container */}
            <div className={`aspect-[2/3] relative overflow-hidden paper-texture ebook-shadow transition-all duration-500 group-hover:-translate-y-2 cursor-pointer ${ebook.isSpecial ? 'border border-[#C5A059]' : 'border border-black/5'}`}>
              <div className={`absolute inset-0 ${ebook.coverColor}`} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.12),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%,rgba(0,0,0,0.28))]" />
              <div className="absolute inset-3 border border-white/10" />
              <div className="absolute inset-x-6 top-8 h-px bg-white/15" />
              <div className="absolute inset-x-6 bottom-8 h-px bg-white/15" />
              <div
                className="absolute -right-6 top-8 font-serif text-[6rem] leading-none opacity-[0.06] select-none"
                style={{ color: ebook.coverAccent }}
              >
                {ebook.coverMark}
              </div>

              {/* Cover Overlay Info */}
              <div className="absolute inset-0 flex flex-col justify-between py-7 px-5 text-center z-10">
                <div className="space-y-5">
                  <span
                    className="text-[7px] tracking-[0.26em] uppercase font-black"
                    style={{ color: ebook.coverAccent }}
                  >
                    {ebook.isSpecial ? "Premium" : ebook.category}
                  </span>

                  <div className="mx-auto h-10 w-10 rounded-full border border-white/10 flex items-center justify-center bg-black/10">
                    <span className="font-serif text-sm" style={{ color: ebook.coverAccent }}>
                      {initials(ebook.author) || ebook.coverMark}
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-1 items-center">
                    <h3 className="font-serif leading-[1.15] text-base text-white drop-shadow-md line-clamp-4">
                      {ebook.title}
                    </h3>
                    <p className="text-[7px] text-white/35 uppercase tracking-[0.18em] line-clamp-2">
                      {ebook.coverEdition}
                    </p>
                  </div>
                </div>
                
                <span className="text-[8px] text-white/38 font-mono tracking-widest uppercase line-clamp-2">
                  {ebook.author}
                </span>
              </div>
              
              {/* Spine Effect */}
              <div className="absolute top-0 left-0 w-4 h-full bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
            </div>

            <div className="mt-4 space-y-1">
              <p className={`text-[7px] uppercase font-black tracking-widest ${ebook.isSpecial ? 'accent-gold' : 'opacity-30'}`}>
                {ebook.category}
              </p>
              <p className="text-[10px] font-serif text-black/60 truncate">
                {ebook.author}
              </p>
              <p className="text-[9px] text-black/35 truncate">
                {ebook.chapters.length} capítulos · {ebook.originalLanguage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
