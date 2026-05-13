import { motion } from "framer-motion";
import { ChevronRight, BookOpen, Users, Layers } from "lucide-react";
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
    <section className="relative min-h-[62svh] md:min-h-[74vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-[140px] md:pt-[172px] pb-12 md:pb-20 overflow-hidden bg-[#F7F2E8]">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=2000"
          alt="Ancient Library"
          className="w-full h-full object-cover opacity-[0.13] saturate-[0.78] contrast-[1.04]"
        />
        <div className="absolute inset-0 noble-gradient" />
      </div>

      {/* Conteúdo principal */}
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-5xl space-y-6 md:space-y-9 z-10 w-full"
      >
        <div className="space-y-3 md:space-y-4">
          <span className="inline-flex border-y border-[#B48A3D]/25 py-2 accent-gold text-[9px] md:text-[10px] uppercase tracking-[0.32em] md:tracking-[0.5em] font-black">
            Curadoria Literária Superior
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.08] md:leading-[1.07] text-[#11100E]">
            Conhecimento para a <br/>
            <span className="accent-gold drop-shadow-sm">Imortalidade</span>
          </h1>
        </div>

        <p className="text-[#1A1A1A]/74 text-base md:text-[1.35rem] max-w-2xl mx-auto font-serif leading-relaxed font-light">
          Alta curadoria em Filosofia, Teologia, Psicanálise e Literatura.
          A ponte entre o rigor clássico e a síntese contemporânea.
        </p>

        {/* CTAs */}
        <div className="pt-2 md:pt-4 flex flex-col sm:flex-row gap-3 md:gap-5 justify-center">
          <button
            type="button"
            onClick={() => requestScroll("shelf-Filosofia")}
            className="premium-button-dark text-white font-bold py-4 md:py-5 px-8 md:px-14 rounded-sm transition-all flex items-center justify-center gap-3 md:gap-4 uppercase text-[10px] tracking-[0.22em] md:tracking-[0.3em] hover:-translate-y-1"
          >
            Iniciar Estudo
            <ChevronRight className="w-4 h-4 text-accent-gold" />
          </button>
          <a
            href="#trilhas-estudo"
            className="premium-button-light backdrop-blur-sm hover:bg-white/80 py-4 md:py-5 px-8 md:px-14 rounded-sm transition-all uppercase text-[10px] tracking-[0.22em] md:tracking-[0.3em] font-bold text-[#1A1A1A] hover:-translate-y-1"
          >
            Explorar Acervo
          </a>
        </div>

        {/* Barra de estatísticas */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-3 md:gap-5 pt-2 md:pt-4"
        >
          {[
            { icon: BookOpen, value: `${totalEbooks}+`, label: "Obras no acervo" },
            { icon: Layers,   value: `${totalCategories}`,  label: "Áreas do saber"  },
            { icon: Users,    value: `${totalRoutes}`,      label: "Trilhas de estudo" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="hero-stat-pill">
              <Icon size={13} style={{ color: "#B48A3D", marginBottom: 4 }} />
              <span className="hero-stat-number">{value}</span>
              <span className="hero-stat-label">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Fade bottom */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#F9F7F2] to-transparent z-1" />
    </section>
  );
}
