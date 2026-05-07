import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Check, Languages, Library, Lock, Plus, X } from "lucide-react";
import { type Ebook } from "../studioTypes";
import { PAYMENT_LINKS } from "../types";

interface EbookPreviewProps {
  ebook: Ebook;
  related: Ebook[];
  canRead: boolean;
  onClose: () => void;
  onRead: (ebook: Ebook) => void;
}

function isLightCover(coverColor: string): boolean {
  const value = coverColor.toLowerCase();
  const lightTokens = [
    "white",
    "yellow",
    "amber",
    "lime",
    "stone-50",
    "stone-100",
    "neutral-50",
    "neutral-100",
    "zinc-50",
    "zinc-100",
    "slate-50",
    "slate-100",
    "rose-50",
    "rose-100",
    "pink-50",
    "pink-100",
    "orange-50",
    "orange-100",
    "emerald-50",
    "emerald-100",
    "green-50",
    "green-100",
    "sky-50",
    "sky-100",
    "cyan-50",
    "cyan-100",
    "blue-50",
    "blue-100",
    "purple-50",
    "purple-100",
    "violet-50",
    "violet-100",
  ];

  return lightTokens.some((token) => value.includes(token));
}

function coverTone(coverColor: string) {
  return isLightCover(coverColor)
    ? {
        title: "text-[#17130d] [text-shadow:0_1px_0_rgba(255,255,255,0.82),0_8px_18px_rgba(255,255,255,0.34)]",
        frame: "border-black/12",
        rule: "bg-black/14",
        author: "text-black/62",
      }
    : {
        title: "text-white drop-shadow-md",
        frame: "border-white/10",
        rule: "bg-white/15",
        author: "text-white/45",
      };
}

export function EbookPreview({ ebook, related, canRead, onClose, onRead }: EbookPreviewProps) {
  const tone = coverTone(ebook.coverColor);

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
      className="fixed inset-0 z-[90] bg-black/55 backdrop-blur-sm overflow-auto"
      onClick={onClose}
    >
      <div className="min-h-screen px-4 py-10 flex items-start justify-center">
        <motion.section
          initial={{ y: 24 }}
          animate={{ y: 0 }}
          className="w-full max-w-6xl bg-[#F9F7F2] shadow-2xl border border-black/10"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="p-5 md:p-8 border-b border-black/10 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.34em] font-black accent-gold">Página da obra</p>
              <h2 className="text-2xl md:text-3xl font-serif">{ebook.title}</h2>
            </div>
            <button onClick={onClose} className="p-3 hover:bg-black/5 rounded-sm" aria-label="Fechar">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid lg:grid-cols-[260px_1fr] gap-8 p-5 md:p-10">
            <div>
              <div className={`aspect-[2/3] ${ebook.coverColor} relative overflow-hidden shadow-2xl border border-black/10`}>
                <div className={`absolute inset-4 border ${tone.frame}`} />
                <div className={`absolute inset-x-8 top-10 h-px ${tone.rule}`} />
                <div className={`absolute inset-x-8 bottom-10 h-px ${tone.rule}`} />
                <span className="absolute inset-x-6 top-8 text-[9px] uppercase tracking-[0.28em] font-black text-center" style={{ color: ebook.coverAccent }}>
                  {ebook.collection}
                </span>
                <span className="absolute inset-0 flex items-center justify-center font-serif text-6xl" style={{ color: ebook.coverAccent }}>
                  {ebook.coverMark}
                </span>
                <div className="absolute inset-x-6 bottom-16 text-center">
                  <h3 className={`font-serif text-xl leading-tight ${tone.title}`}>{ebook.title}</h3>
                  <p className={`mt-3 text-[10px] uppercase tracking-[0.18em] ${tone.author}`}>{ebook.author}</p>
                </div>
              </div>
              <button
                onClick={() => onRead(ebook)}
                className="mt-6 w-full py-4 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.24em] font-bold flex items-center justify-center gap-2"
              >
                {canRead ? <BookOpen className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                {canRead ? "Ler agora" : "Entrar para ler"}
              </button>
              {!canRead && (
                <a
                  href={PAYMENT_LINKS.studioLogosMonthly}
                  className="mt-3 block w-full py-4 bg-[#C5A059] text-black text-center text-[10px] uppercase tracking-[0.24em] font-bold"
                >
                  Assinar Studio Logos
                </a>
              )}
            </div>

            <div className="space-y-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-black accent-gold mb-3">
                  {ebook.category} · {ebook.subcategory}
                </p>
                <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-5">{ebook.title}</h1>
                <p className="text-black/65 leading-relaxed max-w-3xl">{ebook.longDescription}</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  ["Autor", ebook.author],
                  ["Idioma original", ebook.originalLanguage],
                  ["Ano aproximado", ebook.approximateYear],
                  ["Leitura", ebook.estimatedReadTime],
                ].map(([label, value]) => (
                  <div key={label} className="border border-black/10 bg-white/45 p-4">
                    <p className="text-[9px] uppercase tracking-[0.2em] opacity-40 font-black">{label}</p>
                    <p className="mt-2 text-sm font-serif">{value}</p>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <section>
                  <h3 className="font-serif text-2xl mb-3">Apresentação</h3>
                  <p className="text-sm leading-relaxed text-black/65">{ebook.description}</p>
                </section>
                <section>
                  <h3 className="font-serif text-2xl mb-3">Contexto do autor</h3>
                  <p className="text-sm leading-relaxed text-black/65">{ebook.authorContext}</p>
                </section>
              </div>

              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-2xl">Sumário navegável</h3>
                  <span className="text-[10px] uppercase tracking-[0.2em] opacity-40 font-black">{ebook.chapters.length} capítulos</span>
                </div>
                <div className="grid md:grid-cols-2 gap-2">
                  {ebook.chapters.slice(0, 12).map((chapter, index) => (
                    <button
                      key={chapter.id}
                      onClick={() => onRead(ebook)}
                      className="text-left px-4 py-3 border border-black/10 bg-white/45 hover:border-[#C5A059] transition-colors"
                    >
                      <span className="text-[9px] uppercase tracking-[0.18em] opacity-40">Capítulo {index + 1}</span>
                      <span className="block text-sm font-serif">{chapter.title}</span>
                    </button>
                  ))}
                </div>
              </section>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 px-3 py-2 border border-black/10 text-[10px] uppercase tracking-[0.16em] font-bold">
                  <Library className="w-4 h-4" /> Adicionar à minha biblioteca
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-2 border border-black/10 text-[10px] uppercase tracking-[0.16em] font-bold">
                  <Languages className="w-4 h-4" /> Original / Português
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-2 border border-black/10 text-[10px] uppercase tracking-[0.16em] font-bold">
                  <Check className="w-4 h-4" /> Leitura online premium
                </span>
              </div>

              {related.length > 0 && (
                <section>
                  <h3 className="font-serif text-2xl mb-4">Obras relacionadas</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {related.slice(0, 6).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => onRead(item)}
                        className="text-left p-4 border border-black/10 hover:border-[#C5A059] bg-white/45"
                      >
                        <Plus className="w-4 h-4 mb-3 text-[#B48A3D]" />
                        <p className="font-serif leading-tight">{item.title}</p>
                        <p className="text-xs opacity-45 mt-1">{item.author}</p>
                      </button>
                    ))}
                  </div>
                </section>
              )}

              <p className="text-[10px] leading-relaxed text-black/35 border-t border-black/10 pt-5">
                Crédito técnico: {ebook.sourceName}{ebook.sourceUrl ? ` · ${ebook.sourceUrl}` : ""}. Informação mantida como referência editorial, sem alterar a experiência de leitura interna.
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
