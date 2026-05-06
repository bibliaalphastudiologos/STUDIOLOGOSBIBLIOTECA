import React from "react";
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
  return (
    <section className="py-12 px-10 max-w-7xl mx-auto space-y-10">
      <div className="flex items-baseline justify-between border-b border-black/5 pb-4">
        <h2 className="text-3xl font-serif text-[#1A1A1A]">{category}</h2>
        <p className="text-[9px] uppercase tracking-[0.2em] opacity-40 font-bold mb-1">
          {ebooks.length} obras curadas
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
        {ebooks.map((ebook, idx) => (
          <div
            key={ebook.id}
            className="group relative"
            onClick={() => ebook.isSpecial ? window.open(ebook.link, '_blank') : onRead(ebook)}
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
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
