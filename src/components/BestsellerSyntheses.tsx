import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, Layers, Sparkles, X } from "lucide-react";
import { BESTSELLER_SYNTHESES, type BestsellerSynthesis } from "../data/bestsellerSyntheses";
import { PAYMENT_LINKS } from "../types";

function sourceLabel(item: BestsellerSynthesis): string {
  return item.sources.join(" · ");
}

function synthesisNotice(item: BestsellerSynthesis): string {
  return `Síntese editorial de ${item.title}, de ${item.author}, feita para estudo e compreensão dos temas principais. Não é o livro completo nem substitui a obra original.`;
}

function contextualBullet(item: BestsellerSynthesis, value: string): string {
  return `${value} em ${item.title}`;
}

function visualMotif(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes("café")) return "xícara · manhã · devoção";
  if (lower.includes("verity") || lower.includes("empregada") || lower.includes("minta")) return "suspense · sombra · segredo";
  if (lower.includes("psicologia financeira") || lower.includes("babilônia")) return "ouro · disciplina · patrimônio";
  if (lower.includes("bobbie")) return "cor · traço · pausa criativa";
  if (lower.includes("bíblia")) return "texto · estudo · aliança";
  if (lower.includes("amor") || lower.includes("esposa")) return "relacionamento · cuidado · oração";
  if (lower.includes("metamorfose") || lower.includes("estrela")) return "clássico · silêncio · existência";
  if (lower.includes("hábitos")) return "sistema · repetição · identidade";
  return "síntese · leitura · curadoria";
}

function coverTitleClass(title: string, large: boolean): string {
  if (large) return title.length > 34 ? "text-2xl md:text-4xl leading-[1.03]" : "text-3xl md:text-4xl leading-[1.04]";
  if (title.length > 34) return "text-[15px] sm:text-base md:text-xl leading-[1.04]";
  if (title.length > 22) return "text-base sm:text-lg md:text-2xl leading-[1.05]";
  return "text-lg md:text-2xl leading-[1.06]";
}

function Cover({ item, large = false }: { item: BestsellerSynthesis; large?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-sm border border-black/10 shadow-2xl bg-gradient-to-br ${item.palette} ${large ? "aspect-[2/3]" : "aspect-[3/4]"}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.38),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.16),transparent_38%,rgba(0,0,0,0.42))]" />
      <div className="absolute inset-3 md:inset-4 border border-white/25" />
      <div className="absolute left-0 top-5 md:top-7 bg-[#111] text-white px-3 md:px-5 py-1.5 md:py-2 text-[8px] md:text-[10px] font-black uppercase tracking-[0.18em] md:tracking-[0.24em] shadow-xl">
        SÍNTESE
      </div>
      <div className="absolute right-3 md:right-5 top-5 md:top-6 text-[6px] sm:text-[7px] md:text-[8px] uppercase tracking-[0.14em] md:tracking-[0.26em] font-black text-black/55 text-right max-w-[50%] line-clamp-2">
        {sourceLabel(item)}
      </div>
      <div className="absolute inset-x-4 md:inset-x-7 top-16 sm:top-18 md:top-24">
        <p className="text-[7px] md:text-[9px] uppercase tracking-[0.16em] md:tracking-[0.3em] font-black mb-2 md:mb-4" style={{ color: item.accent }}>
          Studio Logos
        </p>
        <h3 className={`${coverTitleClass(item.title, large)} font-serif text-white drop-shadow-xl line-clamp-5 break-words hyphens-auto`}>
          {item.title}
        </h3>
        <p className="mt-2 md:mt-4 text-[7px] sm:text-[8px] md:text-[10px] uppercase tracking-[0.12em] md:tracking-[0.18em] text-white/72 line-clamp-2">
          {item.author}
        </p>
      </div>
      <div className="absolute inset-x-4 md:inset-x-7 bottom-4 md:bottom-8">
        <div className="h-px bg-white/25 mb-2 md:mb-4" />
        <p className="text-[6px] sm:text-[7px] md:text-[9px] uppercase tracking-[0.12em] md:tracking-[0.22em] font-bold text-white/68 line-clamp-1">
          {visualMotif(item.title)}
        </p>
      </div>
      <div className="absolute -right-10 -bottom-8 font-serif text-[9rem] leading-none text-white/10 select-none">
        S
      </div>
    </div>
  );
}

function SynthesisModal({ item, onClose }: { item: BestsellerSynthesis; onClose: () => void }) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[130] bg-black/60 backdrop-blur-sm overflow-auto"
      onClick={onClose}
    >
      <div className="min-h-screen px-3 md:px-4 py-4 md:py-10 flex items-start justify-center">
        <motion.article
          initial={{ y: 24 }}
          animate={{ y: 0 }}
          className="w-full max-w-6xl bg-[#F9F7F2] border border-black/10 shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <header className="p-4 md:p-8 border-b border-black/10 flex items-center justify-between gap-4">
            <div>
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.24em] md:tracking-[0.34em] font-black accent-gold">Síntese editorial</p>
              <h2 className="text-xl md:text-3xl font-serif">{item.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-black/15 bg-white text-black shadow-md transition-colors hover:bg-[#1A1A1A] hover:text-white"
              aria-label="Fechar síntese"
              title="Fechar"
            >
              <X className="w-6 h-6" />
            </button>
          </header>

          <div className="grid lg:grid-cols-[300px_1fr] gap-6 md:gap-10 p-4 md:p-10">
            <div className="grid grid-cols-[112px_1fr] lg:grid-cols-1 gap-4 md:gap-5 lg:space-y-5">
              <Cover item={item} large />
              <a
                href={PAYMENT_LINKS.studioLogosMonthly}
                className="flex min-h-24 lg:min-h-0 items-center justify-center w-full py-4 px-4 bg-[#1A1A1A] text-white text-center text-[10px] uppercase tracking-[0.18em] md:tracking-[0.24em] font-bold hover:bg-black"
              >
                Conhecer Studio Logos
              </a>
            </div>

            <div className="space-y-5 md:space-y-8">
              <section>
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-black accent-gold mb-3">
                  {sourceLabel(item)} · {item.tone}
                </p>
                <h1 className="text-3xl md:text-5xl font-serif leading-tight mb-3 md:mb-4">{item.title}</h1>
                <p className="text-black/55 uppercase tracking-[0.18em] text-[11px] font-bold mb-5">{item.author}</p>
                <div className="border border-[#C5A059]/30 bg-[#C5A059]/10 p-3 md:p-4 text-sm leading-relaxed text-black/70">
                  {synthesisNotice(item)}
                </div>
              </section>

              <section className="grid md:grid-cols-2 gap-5 md:gap-8">
                <div>
                  <h3 className="font-serif text-xl md:text-2xl mb-2 md:mb-3">Apresentação da obra</h3>
                  <p className="text-sm leading-relaxed text-black/65">{item.presentation}</p>
                </div>
                <div>
                  <h3 className="font-serif text-xl md:text-2xl mb-2 md:mb-3">Base editorial</h3>
                  <p className="text-sm leading-relaxed text-black/65">{item.editorialBasis}</p>
                </div>
              </section>

              <section>
                <h3 className="font-serif text-xl md:text-2xl mb-2 md:mb-3">Descrição curta</h3>
                <div className="border border-black/10 bg-white/45 p-4 md:p-5">
                  <p className="text-sm leading-relaxed text-black/65">{item.shortDescription}</p>
                </div>
              </section>

              <section>
                <h3 className="font-serif text-2xl md:text-3xl mb-3 md:mb-4">Síntese profunda</h3>
                <p className="text-base leading-[1.75] md:leading-[1.9] text-black/70 font-serif">{item.synthesis}</p>
                {item.quote && (
                  <blockquote className="mt-6 border-l-2 border-[#C5A059] pl-5 text-sm italic text-black/55">
                    “{item.quote}”
                  </blockquote>
                )}
              </section>

              <div className="grid md:grid-cols-3 gap-3 md:gap-5">
                <section className="border border-black/10 bg-white/45 p-4 md:p-5">
                  <h3 className="text-[9px] md:text-[10px] uppercase tracking-[0.18em] md:tracking-[0.24em] font-black accent-gold mb-3 md:mb-4">Principais ideias</h3>
                  <ul className="space-y-2 md:space-y-3">
                    {item.mainIdeas.map((idea) => <li key={idea} className="text-sm text-black/65">{contextualBullet(item, idea)}</li>)}
                  </ul>
                </section>
                <section className="border border-black/10 bg-white/45 p-4 md:p-5">
                  <h3 className="text-[9px] md:text-[10px] uppercase tracking-[0.18em] md:tracking-[0.24em] font-black accent-gold mb-3 md:mb-4">Insights</h3>
                  <ul className="space-y-2 md:space-y-3">
                    {item.insights.map((insight) => <li key={insight} className="text-sm text-black/65">{contextualBullet(item, insight)}</li>)}
                  </ul>
                </section>
                <section className="border border-black/10 bg-white/45 p-4 md:p-5">
                  <h3 className="text-[9px] md:text-[10px] uppercase tracking-[0.18em] md:tracking-[0.24em] font-black accent-gold mb-3 md:mb-4">Público indicado</h3>
                  <ul className="space-y-2 md:space-y-3">
                    {item.audience.map((audience) => <li key={audience} className="text-sm text-black/65">{contextualBullet(item, audience)}</li>)}
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </motion.div>
  );
}

export function BestsellerSyntheses() {
  const [selected, setSelected] = useState<BestsellerSynthesis | null>(null);
  const [source, setSource] = useState<"Todos" | BestsellerSynthesis["sources"][number]>("Todos");
  const sources = useMemo(() => ["Todos", "Amazon", "CPAD", "Mundo Cristão", "Brasil"] as const, []);
  const visible = useMemo(
    () => source === "Todos" ? BESTSELLER_SYNTHESES : BESTSELLER_SYNTHESES.filter((item) => item.sources.includes(source)),
    [source],
  );

  return (
    <section id="sinteses-mais-vendidos" className="py-12 md:py-20 px-4 sm:px-6 lg:px-10 bg-[#11100E] text-white border-y border-white/10">
      <div className="max-w-7xl mx-auto space-y-7 md:space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 md:gap-8">
          <div className="max-w-3xl">
            <span className="text-[#D8B76C] text-[9px] md:text-[10px] uppercase tracking-[0.34em] md:tracking-[0.55em] font-black">Vitrine editorial</span>
            <h2 className="text-3xl md:text-5xl font-serif leading-tight mt-3 md:mt-5 text-white">Sínteses dos <span className="italic text-[#D8B76C]">Mais Vendidos</span></h2>
            <p className="mt-4 md:mt-6 text-white/78 font-serif text-base md:text-lg leading-relaxed">
              Uma vitrine complementar para descobrir temas atuais. A plataforma principal continua sendo a leitura de obras integrais, trilhas e estudo dentro do Studio Logos.
            </p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible">
            {sources.map((item) => (
              <button
                key={item}
                onClick={() => setSource(item)}
                className={`shrink-0 px-3 md:px-4 h-9 md:h-10 border text-[9px] md:text-[10px] uppercase tracking-[0.14em] md:tracking-[0.18em] font-bold ${source === item ? "border-[#D8B76C] bg-[#D8B76C] text-black" : "border-white/25 text-white/78 hover:text-white"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-6 md:gap-5">
          {visible.map((item) => (
            <motion.button
              key={item.id}
              type="button"
              whileHover={{ y: -6 }}
              onClick={() => setSelected(item)}
              className="group text-left min-w-0"
            >
              <Cover item={item} />
              <div className="mt-3 md:mt-4 space-y-1.5 md:space-y-2">
                <p className="text-[8px] md:text-[9px] uppercase tracking-[0.18em] md:tracking-[0.24em] font-black text-[#C5A059] truncate">{sourceLabel(item)}</p>
                <h3 className="font-serif text-base md:text-xl leading-tight text-white group-hover:text-[#C5A059] transition-colors line-clamp-2">{item.title}</h3>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.12em] md:tracking-[0.16em] text-white/58 truncate">{item.author}</p>
                <p className="text-xs leading-relaxed text-white/72 line-clamp-2">{synthesisNotice(item)}</p>
                <span className="inline-flex items-center gap-2 text-[9px] md:text-[10px] uppercase tracking-[0.16em] md:tracking-[0.2em] font-bold text-white/70 group-hover:text-white">
                  Abrir síntese <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-3 md:gap-5 pt-1 md:pt-3">
          {[
            { icon: Layers, title: "Sem reproduzir capítulos", text: "Conteúdo autoral, interpretativo e editorial, sem substituir a obra original." },
            { icon: Sparkles, title: "Capas com memória visual", text: "Composição inspirada no posicionamento do título, com selo SÍNTESE em destaque." },
            { icon: BookOpen, title: "Conversão para interesse", text: "A vitrine apresenta ideias centrais e chama o leitor para conhecer a plataforma." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="border border-white/10 p-4 md:p-6 bg-white/[0.03]">
              <Icon className="w-5 h-5 text-[#C5A059] mb-3 md:mb-4" />
              <h3 className="font-serif text-lg md:text-xl mb-2">{title}</h3>
              <p className="text-sm text-white/68 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <SynthesisModal item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
