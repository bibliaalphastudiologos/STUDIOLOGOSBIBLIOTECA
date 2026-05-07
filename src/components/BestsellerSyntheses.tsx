import React, { useMemo, useState } from "react";
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

function Cover({ item, large = false }: { item: BestsellerSynthesis; large?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-sm border border-black/10 shadow-2xl bg-gradient-to-br ${item.palette} ${large ? "aspect-[2/3]" : "aspect-[3/4]"}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.38),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.16),transparent_38%,rgba(0,0,0,0.42))]" />
      <div className="absolute inset-4 border border-white/25" />
      <div className="absolute left-0 top-7 bg-[#111] text-white px-5 py-2 text-[10px] font-black uppercase tracking-[0.24em] shadow-xl">
        SÍNTESE
      </div>
      <div className="absolute right-5 top-6 text-[8px] uppercase tracking-[0.26em] font-black text-black/45 text-right max-w-[55%]">
        {sourceLabel(item)}
      </div>
      <div className="absolute inset-x-7 top-24">
        <p className="text-[9px] uppercase tracking-[0.3em] font-black mb-4" style={{ color: item.accent }}>
          Studio Logos
        </p>
        <h3 className={`${large ? "text-4xl" : "text-2xl"} font-serif leading-[1.04] text-white drop-shadow-xl`}>
          {item.title}
        </h3>
        <p className="mt-4 text-[10px] uppercase tracking-[0.18em] text-white/65 line-clamp-2">
          {item.author}
        </p>
      </div>
      <div className="absolute inset-x-7 bottom-8">
        <div className="h-px bg-white/25 mb-4" />
        <p className="text-[9px] uppercase tracking-[0.22em] font-bold text-white/60">
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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[130] bg-black/60 backdrop-blur-sm overflow-auto"
    >
      <div className="min-h-screen px-4 py-10 flex items-start justify-center">
        <motion.article
          initial={{ y: 24 }}
          animate={{ y: 0 }}
          className="w-full max-w-6xl bg-[#F9F7F2] border border-black/10 shadow-2xl"
        >
          <header className="p-5 md:p-8 border-b border-black/10 flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.34em] font-black accent-gold">Síntese editorial</p>
              <h2 className="text-2xl md:text-3xl font-serif">{item.title}</h2>
            </div>
            <button onClick={onClose} className="p-3 hover:bg-black/5 rounded-sm" aria-label="Fechar síntese">
              <X className="w-5 h-5" />
            </button>
          </header>

          <div className="grid lg:grid-cols-[300px_1fr] gap-10 p-5 md:p-10">
            <div className="space-y-5">
              <Cover item={item} large />
              <a
                href={PAYMENT_LINKS.studioLogosMonthly}
                className="block w-full py-4 bg-[#1A1A1A] text-white text-center text-[10px] uppercase tracking-[0.24em] font-bold hover:bg-black"
              >
                Conhecer Studio Logos
              </a>
            </div>

            <div className="space-y-8">
              <section>
                <p className="text-[10px] uppercase tracking-[0.3em] font-black accent-gold mb-3">
                  {sourceLabel(item)} · {item.tone}
                </p>
                <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-4">{item.title}</h1>
                <p className="text-black/55 uppercase tracking-[0.18em] text-[11px] font-bold mb-5">{item.author}</p>
                <div className="border border-[#C5A059]/30 bg-[#C5A059]/10 p-4 text-sm leading-relaxed text-black/70">
                  {synthesisNotice(item)}
                </div>
              </section>

              <section className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-serif text-2xl mb-3">Apresentação da obra</h3>
                  <p className="text-sm leading-relaxed text-black/65">{item.presentation}</p>
                </div>
                <div>
                  <h3 className="font-serif text-2xl mb-3">Base editorial</h3>
                  <p className="text-sm leading-relaxed text-black/65">{item.editorialBasis}</p>
                </div>
              </section>

              <section>
                <h3 className="font-serif text-2xl mb-3">Descrição curta</h3>
                <div className="border border-black/10 bg-white/45 p-5">
                  <p className="text-sm leading-relaxed text-black/65">{item.shortDescription}</p>
                </div>
              </section>

              <section>
                <h3 className="font-serif text-3xl mb-4">Síntese profunda</h3>
                <p className="text-base leading-[1.9] text-black/70 font-serif">{item.synthesis}</p>
                {item.quote && (
                  <blockquote className="mt-6 border-l-2 border-[#C5A059] pl-5 text-sm italic text-black/55">
                    “{item.quote}”
                  </blockquote>
                )}
              </section>

              <div className="grid md:grid-cols-3 gap-5">
                <section className="border border-black/10 bg-white/45 p-5">
                  <h3 className="text-[10px] uppercase tracking-[0.24em] font-black accent-gold mb-4">Principais ideias</h3>
                  <ul className="space-y-3">
                    {item.mainIdeas.map((idea) => <li key={idea} className="text-sm text-black/65">{contextualBullet(item, idea)}</li>)}
                  </ul>
                </section>
                <section className="border border-black/10 bg-white/45 p-5">
                  <h3 className="text-[10px] uppercase tracking-[0.24em] font-black accent-gold mb-4">Insights</h3>
                  <ul className="space-y-3">
                    {item.insights.map((insight) => <li key={insight} className="text-sm text-black/65">{contextualBullet(item, insight)}</li>)}
                  </ul>
                </section>
                <section className="border border-black/10 bg-white/45 p-5">
                  <h3 className="text-[10px] uppercase tracking-[0.24em] font-black accent-gold mb-4">Público indicado</h3>
                  <ul className="space-y-3">
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
    <section id="sinteses-mais-vendidos" className="py-28 px-10 bg-[#11100E] text-white border-y border-white/10">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <span className="text-[#C5A059] text-[10px] uppercase tracking-[0.55em] font-black">Vitrine editorial</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight mt-5">Sínteses dos <span className="italic text-[#C5A059]">Mais Vendidos</span></h2>
            <p className="mt-6 text-white/55 font-serif text-lg leading-relaxed">
              Leituras editoriais profundas de obras muito procuradas, criadas para estudo, descoberta e apresentação. Cada card é uma síntese, não o livro completo.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {sources.map((item) => (
              <button
                key={item}
                onClick={() => setSource(item)}
                className={`px-4 h-10 border text-[10px] uppercase tracking-[0.18em] font-bold ${source === item ? "border-[#C5A059] bg-[#C5A059] text-black" : "border-white/15 text-white/55 hover:text-white"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {visible.map((item) => (
            <motion.button
              key={item.id}
              type="button"
              whileHover={{ y: -6 }}
              onClick={() => setSelected(item)}
              className="group text-left"
            >
              <Cover item={item} />
              <div className="mt-5 space-y-3">
                <p className="text-[9px] uppercase tracking-[0.24em] font-black text-[#C5A059]">{sourceLabel(item)}</p>
                <h3 className="font-serif text-2xl leading-tight text-white group-hover:text-[#C5A059] transition-colors">{item.title}</h3>
                <p className="text-xs uppercase tracking-[0.16em] text-white/35">{item.author}</p>
                <p className="text-sm leading-relaxed text-white/55 line-clamp-3">{synthesisNotice(item)}</p>
                <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-white/45 group-hover:text-white">
                  Abrir síntese <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-5 pt-3">
          {[
            { icon: Layers, title: "Sem reproduzir capítulos", text: "Conteúdo autoral, interpretativo e editorial, sem substituir a obra original." },
            { icon: Sparkles, title: "Capas com memória visual", text: "Composição inspirada no posicionamento do título, com selo SÍNTESE em destaque." },
            { icon: BookOpen, title: "Conversão para interesse", text: "A vitrine apresenta ideias centrais e chama o leitor para conhecer a plataforma." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="border border-white/10 p-6 bg-white/[0.03]">
              <Icon className="w-5 h-5 text-[#C5A059] mb-4" />
              <h3 className="font-serif text-xl mb-2">{title}</h3>
              <p className="text-sm text-white/45 leading-relaxed">{text}</p>
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
