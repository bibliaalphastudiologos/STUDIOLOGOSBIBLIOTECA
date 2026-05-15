import { motion } from "framer-motion";
import { ChevronRight, BookOpen, Users, Layers, GraduationCap } from "lucide-react";
import { EBOOKS } from "../data";
import { STUDY_ROUTES } from "../data/studyRoutes";
import { useAuth } from "./AuthProvider";

function requestScroll(targetId: string) {
  window.dispatchEvent(new CustomEvent("studiologos:scroll-to", { detail: { targetId } }));
}

export function Hero() {
  const { login, user, loading } = useAuth();
  const totalEbooks = EBOOKS.length;
  const totalCategories = new Set(EBOOKS.map((e) => e.category)).size;
  const totalRoutes = STUDY_ROUTES.length;

  return (
    <section className="relative min-h-[72svh] md:min-h-[78vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-[112px] md:pt-[136px] pb-14 md:pb-24 overflow-hidden">
      {/* Background gradient — indigo/violet */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, #0F172A 0%, #1E1B4B 40%, #312E81 70%, #0F172A 100%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 70% 30%, rgba(124,58,237,0.35), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(13,148,136,0.20), transparent 50%)"
        }} />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=60&w=1600')", backgroundSize: "cover", backgroundPosition: "center" }}
        />
      </div>

      {/* Conteúdo */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="max-w-4xl space-y-6 md:space-y-8 z-10 w-full"
      >
        <div className="space-y-4 md:space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-4 py-2"
          >
            <GraduationCap size={14} className="text-[#F59E0B]" />
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-black text-white/90">
              Plataforma de Ensino Médio
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] text-white tracking-tight"
            style={{ fontFamily: "'Nunito', 'Inter', sans-serif" }}>
            Sua biblioteca<br />
            para o{" "}
            <span style={{ background: "linear-gradient(90deg, #818CF8, #F59E0B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              sucesso
            </span>
          </h1>
        </div>

        <p className="text-white/70 text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
          Acesse obras completas de Filosofia, Literatura, Sociologia, Gramática e muito mais.
          Conteúdo de qualidade para o ENEM, vestibulares e formação geral.
        </p>

        {/* CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
          {!user ? (
            <button
              type="button"
              onClick={login}
              disabled={loading}
              className="inline-flex items-center justify-center gap-3 py-4 md:py-[1.1rem] px-10 md:px-14 rounded-xl font-black uppercase text-[10px] tracking-[0.22em] text-white transition-all hover:-translate-y-1 disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)", boxShadow: "0 8px 32px rgba(79,70,229,0.45)" }}
            >
              <GraduationCap className="w-4 h-4" />
              Entrar com Google — Grátis
            </button>
          ) : (
            <button
              type="button"
              onClick={() => requestScroll("shelf-Filosofia")}
              className="inline-flex items-center justify-center gap-3 py-4 md:py-[1.1rem] px-10 md:px-14 rounded-xl font-black uppercase text-[10px] tracking-[0.22em] text-white transition-all hover:-translate-y-1"
              style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)", boxShadow: "0 8px 32px rgba(79,70,229,0.45)" }}
            >
              Explorar acervo
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
          <a
            href="#trilhas-estudo"
            className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/25 backdrop-blur-sm hover:bg-white/20 py-4 md:py-[1.1rem] px-10 md:px-14 rounded-xl transition-all uppercase text-[10px] tracking-[0.22em] font-black text-white hover:-translate-y-1"
          >
            <BookOpen className="w-4 h-4 text-[#F59E0B]" />
            Ver Trilhas de Estudo
          </a>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 pt-4"
        >
          {[
            { icon: BookOpen, value: `${totalEbooks}+`, label: "Obras disponíveis" },
            { icon: Layers, value: `${totalCategories}`, label: "Disciplinas" },
            { icon: Users, value: `${totalRoutes}`, label: "Trilhas de estudo" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="hero-stat-pill">
              <Icon size={13} style={{ color: "#F59E0B" }} />
              <span className="hero-stat-number">{value}</span>
              <span className="hero-stat-label">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Fade bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F1F5F9] to-transparent z-[1] pointer-events-none" />
    </section>
  );
}
