import { motion } from "framer-motion";
import { useAuth } from "./AuthProvider";
import { Link, useLocation } from "react-router-dom";
import { formatBrasiliaDate } from "../lib/brasiliaDate";
import { SearchHeader } from "./SearchHeader";

function requestScroll(detail: { targetId?: string; top?: boolean }) {
  window.dispatchEvent(new CustomEvent("studiologos:scroll-to", { detail }));
}

export function Navigation() {
  const { user, profile, hasAccess, loading, login, logout } = useAuth();
  const location = useLocation();

  const handleSearch = (query: string) => {
    // Implementar busca global aqui
    console.log('Buscar:', query);
  };

  return (
    <nav className="fixed top-[34px] left-0 w-full z-50 premium-nav backdrop-blur-xl border-b border-black/5 px-4 sm:px-6 lg:px-10 py-3 md:py-4 flex items-center justify-between">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-6 xl:gap-12 min-w-0"
      >
        <Link
          to="/"
          onClick={() => requestScroll({ top: true })}
          className="flex items-center hover:opacity-80 transition-opacity shrink-0"
          aria-label="Voltar ao início do Studio Logos"
          title="Voltar ao início"
        >
          <img
            src="/logo.png"
            alt="Studio Logos"
            className="h-10 md:h-12 w-auto max-w-[128px] md:max-w-[160px] object-contain premium-logo-mark"
          />
        </Link>
        
        <div className="hidden lg:flex gap-7 xl:gap-9 text-[10px] uppercase tracking-[0.2em] font-bold">
          <button
            type="button"
            onClick={() => requestScroll({ targetId: "shelf-Filosofia" })}
            className="premium-nav-link pb-1 text-[#0F0F0F]/75 transition-colors hover:text-[#0F0F0F]"
          >
            Filosofia
          </button>
          <button
            type="button"
            onClick={() => requestScroll({ targetId: "shelf-Teologia" })}
            className="premium-nav-link text-[#0F0F0F]/75 transition-colors hover:text-[#0F0F0F]"
          >
            Teologia
          </button>
          <button
            type="button"
            onClick={() => requestScroll({ targetId: "shelf-Psicanálise" })}
            className="premium-nav-link text-[#0F0F0F]/75 transition-colors hover:text-[#0F0F0F]"
          >
            Psicanálise
          </button>
          <button
            type="button"
            onClick={() => requestScroll({ targetId: "shelf-literatura-geral" })}
            className="premium-nav-link text-[#0F0F0F]/75 transition-colors hover:text-[#0F0F0F]"
          >
            Literatura
          </button>
          {profile?.isAdmin && (
            <Link to="/admin" className={`transition-colors ${location.pathname === '/admin' ? 'accent-gold border-b border-[#C5A059]' : 'text-black/60 hover:text-black'}`}>Admin</Link>
          )}
        </div>
      </motion.div>
      
      <div className="flex items-center gap-2 md:gap-6">
        <SearchHeader onSearch={handleSearch} />
        <div className="hidden lg:block text-right">
          <p className="text-[10px] uppercase tracking-widest opacity-60 font-bold text-[#0F0F0F]">
            {user ? (hasAccess ? "Acesso liberado" : "Aguardando aprovação") : "Login Studio Logos"}
          </p>
          <p className="text-sm font-serif text-[#0F0F0F] font-semibold">
            {profile?.nome || user?.displayName || user?.email || "Studio Logos"}
          </p>
          {user && hasAccess && (
            <p className="text-[9px] uppercase tracking-[0.14em] text-[#0F0F0F]/70 font-bold">
              Aprovado em {profile?.approvalDateBrasilia || formatBrasiliaDate(profile?.approvedAt)}
            </p>
          )}
        </div>
        {user ? (
          <button
            onClick={logout}
            className="hidden md:block h-10 px-4 border border-[#0F0F0F]/20 bg-white/70 rounded-sm text-[10px] uppercase tracking-[0.2em] font-bold text-[#0F0F0F] hover:bg-[#0F0F0F] hover:text-white transition-colors"
          >
            Sair
          </button>
        ) : (
          <button
            onClick={login}
            disabled={loading}
            className="hidden md:block h-10 px-4 premium-button-dark text-white rounded-sm text-[10px] uppercase tracking-[0.2em] font-bold disabled:opacity-50 transition-colors hover:shadow-lg"
          >
            Entrar
          </button>
        )}
      </div>
    </nav>
  );
}
