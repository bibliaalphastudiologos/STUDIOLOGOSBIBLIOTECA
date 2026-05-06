import { Library } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "./AuthProvider";
import { useLocation } from "react-router-dom";

export function Navigation() {
  const { user, profile, hasAccess, loading, login, logout } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-black/5 px-10 py-6 flex items-center justify-between">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-12"
      >
        <a href="/" className="flex items-center hover:opacity-70 transition-opacity">
          <span className="font-serif text-2xl tracking-widest font-bold text-[#0F0F0F] uppercase">
            STUDIOLOGOS<span className="accent-gold">.</span>
          </span>
        </a>
        
        <div className="hidden lg:flex gap-8 text-[10px] uppercase tracking-[0.2em] font-bold">
          <a href="/filosofia" className={`pb-1 transition-colors ${location.pathname === '/filosofia' ? 'accent-gold border-b border-[#C5A059]' : 'text-black/60 hover:text-black'}`}>Filosofia</a>
          <a href="/teologia" className={`transition-colors ${location.pathname === '/teologia' ? 'accent-gold border-b border-[#C5A059]' : 'text-black/60 hover:text-black'}`}>Teologia</a>
          <a href="/psicanalise" className={`transition-colors ${location.pathname === '/psicanalise' ? 'accent-gold border-b border-[#C5A059]' : 'text-black/60 hover:text-black'}`}>Psicanálise</a>
          <a href="/literatura" className={`transition-colors ${location.pathname === '/literatura' ? 'accent-gold border-b border-[#C5A059]' : 'text-black/60 hover:text-black'}`}>Literatura</a>
        </div>
      </motion.div>
      
      <div className="flex items-center gap-6">
        <div className="hidden md:block text-right">
          <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">
            {user ? (hasAccess ? "Acesso liberado" : "Aguardando aprovação") : "Login único"}
          </p>
          <p className="text-sm font-serif text-[#1A1A1A]">
            {profile?.nome || user?.displayName || user?.email || "Bíblia Alpha"}
          </p>
        </div>
        {user ? (
          <button
            onClick={logout}
            className="h-10 px-4 border border-black/10 rounded-sm text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black hover:text-white transition-colors"
          >
            Sair
          </button>
        ) : (
          <button
            onClick={login}
            disabled={loading}
            className="h-10 px-4 bg-[#1A1A1A] text-white rounded-sm text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black disabled:opacity-50 transition-colors"
          >
            Entrar
          </button>
        )}
      </div>
    </nav>
  );
}
