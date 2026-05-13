import { motion } from "framer-motion";
import { ChevronRight, BookOpen, Layers, Users, Play } from "lucide-react";
import { EBOOKS } from "../data";
import { STUDY_ROUTES } from "../data/studyRoutes";

function requestScroll(targetId: string) {
  window.dispatchEvent(new CustomEvent("studiologos:scroll-to", { detail: { targetId } }));
}

export function Hero() {
  const totalEbooks     = EBOOKS.length;
  const totalCategories = new Set(EBOOKS.map((e) => e.category)).size;
  const totalRoutes     = STUDY_ROUTES.length;

  return (
    <section
      className="relative min-h-[70svh] md:min-h-[78vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-[140px] md:pt-[172px] pb-12 md:pb-20 overflow-hidden"
      style={{
        background: "linear-gradient(155deg, #060818 0%, #0d1a3a 35%, #1a0a2e 65%, #0d1428 100%)",
      }}
    >
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #4f46e5, transparent)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-[80px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #f97316, transparent)" }} />
      <div className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full opacity-10 blur-[60px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #a855f7, transparent)" }} />

      {/* Conteúdo */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="max-w-5xl space-y-6 md:space-y-8 z-10 w-full"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-orange-400/60" />
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-black"
            style={{ color: "#f97316" }}>
            Curadoria Literária Superior
          </span>
          <span className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-orange-400/60" />
        </motion.div>

        {/* Título */}
        <div className="space-y-2 md:space-y-3">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.06] text-white">
            Conhecimento para a{" "}
            <br className="hidden sm:block" />
            <span
              className="font-serif"
              style={{
                background: "linear-gradient(135deg, #f97316, #fbbf24, #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Imortalidade
            </span>
          </h1>
        </div>

        <p className="text-white/65 text-base md:text-xl max-w-2xl mx-auto font-serif leading-relaxed font-light">
          Alta curadoria em Filosofia, Teologia, Psicanálise e Literatura.
          A ponte entre o rigor clássico e a síntese contemporânea.
        </p>

        {/* CTAs */}
        <div className="pt-2 md:pt-3 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
          <button
            type="button"
            onClick={() => requestScroll("shelf-Filosofia")}
            className="group relative overflow-hidden font-bold py-4 md:py-5 px-8 md:px-12 rounded-sm flex items-center justify-center gap-3 uppercase text-[10px] tracking-[0.25em] text-white transition-all hover:-translate-y-1 hover:shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #f97316, #ea580c)",
              boxShadow: "0 8px 32px rgba(249,115,22,0.4)",
            }}
          >
            <Play size={14} className="fill-white" />
            Iniciar Estudo
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            type="button"
            onClick={() => requestScroll("trilhas-estudo")}
            className="group font-bold py-4 md:py-5 px-8 md:px-12 rounded-sm flex items-center justify-center gap-3 uppercase text-[10px] tracking-[0.25em] text-white transition-all hover:-translate-y-1"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(8px)",
            }}
          >
            <BookOpen size={14} />
            Explorar Acervo
          </button>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="flex flex-wrap justify-center gap-3 md:gap-5 pt-3 md:pt-4"
        >
          {[
            { icon: BookOpen, value: `${totalEbooks}+`, label: "Obras",         color: "#40c4ff" },
            { icon: Layers,   value: `${totalCategories}`,  label: "Áreas",    color: "#a855f7" },
            { icon: Users,    value: `${totalRoutes}`,      label: "Trilhas",  color: "#69f0ae" },
          ].map(({ icon: Icon, value, label, color }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 px-5 py-3 rounded-sm"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: `1px solid ${color}30`,
                backdropFilter: "blur(8px)",
              }}
            >
              <Icon size={13} style={{ color }} />
              <span className="font-serif text-xl md:text-2xl font-bold" style={{ color }}>{value}</span>
              <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-white/40">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Fade para o conteúdo abaixo */}
      <div
        className="absolute bottom-0 left-0 w-full h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0f0f0f20)" }}
      />
    </section>
  );
}
