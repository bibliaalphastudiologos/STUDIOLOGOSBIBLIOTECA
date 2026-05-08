import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative min-h-[58svh] md:min-h-[70vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-24 md:pt-32 pb-10 md:pb-16 overflow-hidden bg-[#F9F7F2]">
      {/* Premium Background Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=2000" 
          alt="Ancient Library" 
          className="w-full h-full object-cover opacity-10 filter blur-[2px]"
        />
        <div className="absolute inset-0 noble-gradient" />
      </div>

      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-4xl space-y-6 md:space-y-10 z-10"
      >
        <div className="space-y-3 md:space-y-4">
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="StudioLogos" className="h-24 md:h-32 w-auto" />
          </div>
          <span className="accent-gold text-[9px] md:text-[10px] uppercase tracking-[0.32em] md:tracking-[0.5em] font-black border-b border-accent-gold/20 pb-2">Curadoria Literária Superior</span>
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-serif leading-[1.08] md:leading-[1.1] text-[#0F0F0F]">
            Conhecimento para a <br/>
            <span className="accent-gold drop-shadow-sm">Imortalidade</span>
          </h1>
        </div>
        
        <p className="text-[#1A1A1A]/70 text-base md:text-2xl max-w-2xl mx-auto font-serif leading-relaxed font-light">
          Alta curadoria em Filosofia, Teologia, Psicanálise e Literatura. 
          A ponte entre o rigor clássico e a síntese contemporânea.
        </p>
        
        <div className="pt-2 md:pt-8 flex flex-col sm:flex-row gap-3 md:gap-8 justify-center">
          <Link to="/filosofia" className="bg-[#1A1A1A] hover:bg-black text-white font-bold py-4 md:py-6 px-8 md:px-16 rounded-sm transition-all flex items-center justify-center gap-3 md:gap-4 uppercase text-[10px] tracking-[0.22em] md:tracking-[0.3em] shadow-xl hover:-translate-y-1">
            Iniciar Estudo
            <ChevronRight className="w-4 h-4 text-accent-gold" />
          </Link>
          <a href="#trilhas-estudo" className="border border-black/10 bg-white/50 backdrop-blur-sm hover:bg-white/80 py-4 md:py-6 px-8 md:px-16 rounded-sm transition-all uppercase text-[10px] tracking-[0.22em] md:tracking-[0.3em] font-bold text-[#1A1A1A] hover:-translate-y-1">
            Explorar Acervo
          </a>
        </div>
      </motion.div>
      
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#F9F7F2] to-transparent z-1" />
    </section>
  );
}
