import React, { useState, useMemo } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { EbookShelf } from "./components/EbookShelf";
import { ThematicRow } from "./components/ThematicRow";
import { Reader } from "./components/Reader";
import { EBOOKS } from "./data";
import { Category, type Ebook } from "./studioTypes";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ChevronRight, Lock } from "lucide-react";
import { safeStorage } from "./lib/safeStorage";
import { useAuth } from "./components/AuthProvider";

export default function App() {
  const { user, login, loading } = useAuth();
  const [selectedEbook, setSelectedEbook] = useState<Ebook | null>(null);
  const [lockedEbook, setLockedEbook] = useState<Ebook | null>(null);
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

    setSelectedEbook(ebook);
    setLastRead(ebook);
    safeStorage.setItem("last-read", JSON.stringify(ebook.id));
  };

  const categories = [
    Category.SPECIAL,
    Category.PHILOSOPHY,
    Category.THEOLOGY,
    Category.PSYCHOANALYSIS,
    Category.LITERATURE
  ];

  const groupedEbooks = useMemo(() => {
    const result: Partial<Record<Category, Ebook[]>> = {};
    categories.forEach(cat => {
      result[cat] = EBOOKS.filter(e => e.category === cat);
    });
    return result;
  }, []);

  return (
    <div className="min-h-screen relative font-sans">
      <Navigation />
      
      <main>
        <Hero />

        {/* Section: Recommended Axis */}
        <section className="py-20 px-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-10 border border-black/5 bg-white shadow-sm flex flex-col justify-between aspect-video rounded-sm group cursor-pointer"
          >
            <div>
              <span className="accent-gold text-[10px] uppercase tracking-[0.4em] font-black">Eixo Temático</span>
              <h3 className="text-3xl font-serif mt-4">Metafísica & Existência</h3>
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold opacity-40 group-hover:opacity-100 transition-opacity">
              Explorar Conceitos <BookOpen className="w-3 h-3" />
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-10 border border-black/5 bg-[#1A1A1A] text-white shadow-sm flex flex-col justify-between aspect-video rounded-sm group cursor-pointer"
          >
            <div>
              <span className="accent-gold text-[10px] uppercase tracking-[0.4em] font-black">Curadoria do Editor</span>
              <h3 className="text-3xl font-serif mt-4">O Despertar da Psique</h3>
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold opacity-40 group-hover:opacity-100 transition-opacity">
              Ver Coleção <ChevronRight className="w-3 h-3" />
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-10 border border-black/5 bg-white shadow-sm flex flex-col justify-between aspect-video rounded-sm group cursor-pointer"
          >
            <div>
              <span className="accent-gold text-[10px] uppercase tracking-[0.4em] font-black">Área de Pesquisa</span>
              <h3 className="text-3xl font-serif mt-4">Tradição & Dogma</h3>
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold opacity-40 group-hover:opacity-100 transition-opacity">
              Recomendações <BookOpen className="w-3 h-3" />
            </div>
          </motion.div>
        </section>
        
        {/* Continue Reading Shortcut - Editorial Sidebar Pattern */}
        {lastRead && !selectedEbook && (
          <div className="fixed left-10 bottom-24 z-40 hidden xl:block w-[280px]">
            <div className="bg-white p-8 rounded-sm border border-black/5 shadow-2xl">
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-extrabold accent-gold mb-6">Retomar Leitura</h3>
              <div className="flex gap-4 mb-6">
                <div className={`w-16 h-24 ${lastRead.coverColor} border border-black/10 shadow-lg flex-shrink-0 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute inset-2 border border-white/10" />
                  <span className="absolute inset-0 flex items-center justify-center font-serif text-xl" style={{ color: lastRead.coverAccent }}>
                    {lastRead.coverMark}
                  </span>
                </div>
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
        <section className="py-24 px-10 bg-[#F2F0E9] border-y border-black/10">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="space-y-4">
              <span className="accent-gold text-[10px] uppercase tracking-[0.5em] font-black">Navegação Curatorial</span>
              <h2 className="text-4xl font-serif text-black leading-tight">Explorar por <br/> <span className="accent-gold">Dimensão de Conhecimento</span></h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { area: "Filosofia Clássica", count: "32", icon: "ALPHA", desc: "Do pré-socrático ao idealismo." },
                { area: "Teologia Sistemática", count: "18", icon: "LOGOS", desc: "Dogmática e hermenêutica sacra." },
                { area: "Psicanálise Clínica", count: "14", icon: "PSYCHE", desc: "Tradição freudiana e lacaniana." },
                { area: "Literatura Universal", count: "56", icon: "NOMOS", desc: "Os grandes épicos da humanidade." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -4, borderColor: "#B48A3D" }}
                  className="p-8 border border-black/5 bg-white/50 backdrop-blur-sm rounded-sm space-y-6 group cursor-pointer transition-all"
                >
                  <div className="text-[10px] font-black accent-gold tracking-[0.3em]">{item.icon}</div>
                  <div>
                    <h4 className="font-serif text-xl mb-2">{item.area}</h4>
                    <p className="text-[10px] text-black/40 font-mono tracking-widest uppercase mb-4">{item.count} Obras</p>
                    <p className="text-xs text-black/60 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <ThematicRow />

        <div className="space-y-32 pb-40">
          {categories.map(cat => {
            const ebooks = groupedEbooks[cat];
            if (!ebooks || ebooks.length === 0) return null;
            return (
              <div key={cat} className="space-y-4">
                <EbookShelf 
                  category={cat} 
                  ebooks={ebooks} 
                  onRead={handleRead}
                />
                
                {/* Tactical Recommendation per category */}
                <div className="px-10 max-w-7xl mx-auto">
                  <div className="bg-[#1A1A1A] p-6 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] accent-gold font-bold uppercase tracking-widest text-[#C5A059]">Leitura Recomendada</p>
                      <p className="text-sm font-serif opacity-80 text-white">Baseado no eixo de {cat}</p>
                    </div>
                    <button className="text-[10px] font-bold uppercase tracking-widest hover:underline text-[#C5A059]">Explorar Guia →</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Engagement Section: Invitation to Depth */}
        <section className="py-40 bg-[#1A1A1A] text-white text-center space-y-10 px-6">
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <span className="accent-gold text-[10px] uppercase tracking-[0.6em] font-black">Convite à Profundidade</span>
            <h2 className="text-5xl md:text-6xl font-serif leading-tight text-white">
              Sua busca pelo <span className="accent-gold italic">Ser</span> começa aqui.
            </h2>
            <p className="text-white/50 text-lg md:text-xl font-serif font-light leading-relaxed">
              Junte-se a uma comunidade de leitores que não se contentam com a superfície. Receba sínteses exclusivas e ensaios inéditos semanalmente.
            </p>
            
            <div className="pt-10 max-w-md mx-auto">
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

      <footer className="px-10 py-12 bg-[#F2F0E9] border-t border-black/5 flex flex-col md:flex-row items-center justify-between text-[10px] tracking-[0.3em] opacity-50 uppercase font-extrabold gap-6">
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
          >
            <div className="bg-[#F9F7F2] max-w-md w-full p-10 rounded-sm shadow-2xl border border-black/10 text-center">
              <div className="w-14 h-14 rounded-full bg-[#1A1A1A] text-[#C5A059] flex items-center justify-center mx-auto mb-6">
                <Lock className="w-6 h-6" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.4em] font-black accent-gold mb-4">Login único Bíblia Alpha</p>
              <h2 className="text-3xl font-serif mb-4">Entre para continuar a leitura</h2>
              <p className="text-sm text-black/60 leading-relaxed mb-8">
                Você pode explorar o acervo livremente. Para abrir o conteúdo de {lockedEbook.title}, use o mesmo login Google da Bíblia Alpha.
              </p>
              <div className="space-y-3">
                <button
                  onClick={async () => {
                    await login();
                    setLockedEbook(null);
                  }}
                  disabled={loading}
                  className="w-full py-4 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.24em] font-bold hover:bg-black disabled:opacity-50"
                >
                  Entrar com Google
                </button>
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
          />
        )}
      </AnimatePresence>
    </div>
  );
}
