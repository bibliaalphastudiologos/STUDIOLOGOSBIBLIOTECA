import { motion } from "framer-motion";
import { ChevronRight, BookOpen, Layers, Users } from "lucide-react";
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
      className="relative min-h-[68svh] md:min-h-[76vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-[140px] md:pt-[172px] pb-16 md:pb-24 overflow-hidden"
    >
      {/* Fundo: gradiente que harmoniza com o body branco abaixo */}
      <div className="absolute inset-0 z-0" style={{
        background: "linear-gradient(165deg, #0f172a 0%, #1e1b4b 40%, #312e81 70%, #1e3a5f 100%)"
      }} />

      {/* Linha de grade sutil */}
      <div className="absolute inset-0 z-0 opacity-[0.035]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
        backgroundSize: "48px 48px"
      }} />

      {/* Orbs coloridos */}
      <div className="absolute top-[20%] left-[15%] w-72 h-72 rounded-full blur-[90px] opacity-25 pointer-events-none"
        style={{ background: "radial-gradient(circle,#6366f1,transparent)" }} />
      <div className="absolute bottom-[20%] right-[15%] w-60 h-60 rounded-full blur-[70px] opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle,#f97316,transparent)" }} />
      <div className="absolute top-[50%] right-[30%] w-48 h-48 rounded-full blur-[60px] opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle,#a78bfa,transparent)" }} />

      {/* Fade para branco na base — une com o body */}
      <div className="absolute bottom-0 left-0 w-full h-56 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent 0%, #f0eee8 100%)" }} />

      {/* Conteúdo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="relative z-10 max-w-5xl w-full space-y-6 md:space-y-8"
      >
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-10 md:w-16" style={{ background: "linear-gradient(to right, transparent, #f97316)" }} />
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.45em] font-black text-orange-400">
            Curadoria Literária Superior
          </span>
          <span className="h-px w-10 md:w-16" style={{ background: "linear-gradient(to left, transparent, #f97316)" }} />
        </div>

        {/* Título */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-serif leading-[1.07] text-white">
          Conhecimento para a{" "}
          <span
            className="italic"
            style={{
              background: "linear-gradient(120deg,#fb923c,#fbbf24,#f97316)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Imortalidade
          </span>
        </h1>

        <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto font-serif leading-relaxed font-light">
          Alta curadoria em Filosofia, Teologia, Psicanálise e Literatura.
          A ponte entre o rigor clássico e a síntese contemporânea.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-1">
          <button
            type="button"
            onClick={() => requestScroll("shelf-Filosofia")}
            className="group inline-flex items-center justify-center gap-2.5 font-black py-4 px-9 text-[10px] uppercase tracking-[0.28em] text-white rounded-sm transition-all hover:-translate-y-1"
            style={{
              background: "linear-gradient(135deg,#f97316,#ea580c)",
              boxShadow: "0 8px 28px rgba(249,115,22,0.45)"
            }}
          >
            Iniciar Estudo
            <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button
            type="button"
            onClick={() => requestScroll("trilhas-estudo")}
            className="inline-flex items-center justify-center gap-2.5 font-bold py-4 px-9 text-[10px] uppercase tracking-[0.28em] text-white/80 rounded-sm border border-white/20 transition-all hover:-translate-y-1 hover:border-white/40 hover:text-white"
            style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(6px)" }}
          >
            <BookOpen size={14} />
            Explorar Acervo
          </button>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="flex flex-wrap justify-center gap-3 pt-2"
        >
          {[
            { icon: BookOpen, value: `${totalEbooks}+`, label: "Obras",      color: "#60a5fa" },
            { icon: Layers,   value: `${totalCategories}`,  label: "Áreas", color: "#a78bfa" },
            { icon: Users,    value: `${totalRoutes}`,      label: "Trilhas",color: "#34d399" },
          ].map(({ icon: Icon, value, label, color }) => (
            <div key={label}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.07)", border: `1px solid ${color}25` }}
            >
              <Icon size={12} style={{ color }} />
              <span className="font-serif font-bold text-base" style={{ color }}>{value}</span>
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/35">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
