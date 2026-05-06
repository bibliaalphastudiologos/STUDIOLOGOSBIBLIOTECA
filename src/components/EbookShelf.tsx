import React from "react";
import { type Ebook, Category } from "../studioTypes";

interface EbookShelfProps {
  category: Category;
  ebooks: Ebook[];
  onRead: (ebook: Ebook) => void;
}

export const EbookShelf: React.FC<EbookShelfProps> = ({ category, ebooks, onRead }) => {
  return (
    <section className="py-12 px-10 max-w-7xl mx-auto space-y-10">
      <div className="flex items-baseline justify-between border-b border-black/5 pb-4">
        <h2 className="text-3xl font-serif text-[#1A1A1A]">{category}</h2>
        <p className="text-[9px] uppercase tracking-[0.2em] opacity-40 font-bold mb-1">
          Acervo de 1.000+ Obras em Síntese
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
              
              {/* Cover Image Background */}
              {ebook.coverImage ? (
                <div className="absolute inset-0">
                  <img 
                    src={ebook.coverImage} 
                    alt={ebook.title}
                    className="w-full h-full object-cover filter brightness-[0.8] group-hover:scale-110 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />
                </div>
              ) : (
                <div className={`absolute inset-0 ${ebook.coverColor} opacity-90`} />
              )}

              {/* Cover Overlay Info */}
              <div className="absolute inset-0 flex flex-col justify-between py-6 px-4 text-center z-10">
                <div className="space-y-2">
                  <span className={`text-[7px] tracking-[0.2em] uppercase font-black ${ebook.isSpecial ? 'accent-gold' : 'text-white/50'}`}>
                    {ebook.isSpecial ? "Premium" : ebook.originalLanguage}
                  </span>
                  
                  <div className="flex flex-col gap-1 items-center">
                    <h3 className={`font-serif leading-[1.2] ${ebook.isSpecial ? 'italic text-md text-white' : 'text-sm text-white'} drop-shadow-md line-clamp-3`}>
                      {ebook.title}
                    </h3>
                  </div>
                </div>
                
                <span className="text-[8px] text-white/30 font-mono tracking-widest uppercase">
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
