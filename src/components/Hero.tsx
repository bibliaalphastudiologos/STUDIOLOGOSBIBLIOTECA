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
    <section className="relative min-h-[68svh] md:min-h-[78vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-[140px] md:pt-[172px] pb-14 md:pb-24 overflow-hidden bg-[#F7F2E8]">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=2000"
          alt="Ancient Library"
          className="w-full h-full object-cover opacity-[0.18] saturate-[0.6] contrast-[1.1]"
        />
        <div className="absolute inset-0 noble-gradient" />
      </div>

      {/* Ornamento central superior */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        className="absolute top-[130px] md:top-[160px] left-1/2 -translate-x-1/2 flex items-center gap-3 z-10"
      >
        <div className="h-px w-12 md:w-20" style={{ background: 'linear-gradient(to right, transparent, #B48A3D)' }} />
        <div className="w-1 h-1 rounded-full bg-[#B48A3D] opacity-70" />
        <div className="h-px w-12 md:w-20" style={{ background: 'linear-gradient(to left, transparent, #B48A3D)' }} />
      </motion.div>

      {/* Conteúdo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-5xl space-y-7 md:space-y-10 z-10 w-full"
      >
        <div className="space-y-4 md:space-y-5">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex border-y border-[#B48A3D]/30 py-2.5 accent-gold text-[8px] md:text-[9px] uppercase tracking-[0.45em] md:tracking-[0.6em] font-black"
          >
            Curadoria Literária Superior
          </motion.span>

          <h1 className="text-4xl sm:text-5xl md:text-[4.5rem] lg:text-[5.5rem] font-serif leading-[1.06] text-[#11100E] tracking-tight">
            Conhecimento para a <br className="hidden sm:block"/>
            <span className="accent-gold">Imortalidade</span>
          </h1>
        </div>

        <p className="text-[#1A1A1A]/65 text-[0.95rem] md:text-xl max-w-xl mx-auto font-serif leading-relaxed font-light">
          Alta curadoria em Filosofia, Teologia, Psicanálise e Literatura.
          A ponte entre o rigor clássico e a síntese contemporânea.
        </p>

        {/* CTAs */}
        <div className="pt-1 md:pt-2 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
          <button
            type="button"
            onClick={() => requestScroll("shelf-Filosofia")}
            className="premium-button-dark text-white font-bold py-4 md:py-[1.1rem] px-9 md:px-16 rounded-sm transition-all flex items-center justify-center gap-3 uppercase text-[9px] tracking-[0.28em] hover:-translate-y-0.5 hover:shadow-xl"
          >
            Iniciar Estudo
            <ChevronRight className="w-3.5 h-3.5 text-[#B48A3D]" />
          </button>
          <a
            href="#trilhas-estudo"
            className="premium-button-light backdrop-blur-sm hover:bg-white/90 py-4 md:py-[1.1rem] px-9 md:px-16 rounded-sm transition-all uppercase text-[9px] tracking-[0.28em] font-bold text-[#1A1A1A] hover:-translate-y-0.5"
          >
            Explorar Acervo
          </a>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-2 md:gap-4 pt-3 md:pt-4"
        >
          {[
            { icon: BookOpen, value: `${totalEbooks}+`, label: "Obras no acervo" },
            { icon: Layers,   value: `${totalCategories}`,  label: "Áreas do saber"  },
            { icon: Users,    value: `${totalRoutes}`,      label: "Trilhas de estudo" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="hero-stat-pill">
              <Icon size={12} style={{ color: "#B48A3D" }} />
              <span className="hero-stat-number">{value}</span>
              <span className="hero-stat-label">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Fade bottom */}
      <div className="absolute bottom-0 left-0 w-full h-44 bg-gradient-to-t from-[#F9F7F2] to-transparent z-1 pointer-events-none" />
    </section>
  );
}
