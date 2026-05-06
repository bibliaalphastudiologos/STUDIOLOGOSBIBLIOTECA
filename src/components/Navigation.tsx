import { Library } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "./AuthProvider";

export function Navigation() {
  const { user, profile, hasAccess, loading, login, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-black/5 px-10 py-6 flex items-center justify-between">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-12"
      >
        <div className="flex items-center">
          <span className="font-serif text-2xl tracking-widest font-bold text-[#0F0F0F] uppercase">
            STUDIOLOGOS<span className="accent-gold">.</span>
          </span>
        </div>
        
        <div className="hidden lg:flex gap-8 text-[10px] uppercase tracking-[0.2em] font-bold">
          <a href="#" className="accent-gold border-b border-[#C5A059] pb-1">Filosofia</a>
          <a href="#" className="text-black/60 hover:text-black transition-colors">Teologia</a>
          <a href="#" className="text-black/60 hover:text-black transition-colors">Psicanálise</a>
          <a href="#" className="text-black/60 hover:text-black transition-colors">Literatura</a>
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
