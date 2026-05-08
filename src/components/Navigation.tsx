import { motion } from "framer-motion";
import { useAuth } from "./AuthProvider";
import { Link, useLocation } from "react-router-dom";
import { formatBrasiliaDate } from "../lib/brasiliaDate";

function requestScroll(detail: { targetId?: string; top?: boolean }) {
  window.dispatchEvent(new CustomEvent("studiologos:scroll-to", { detail }));
}

export function Navigation() {
  const { user, profile, hasAccess, loading, login, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 premium-nav backdrop-blur-xl border-b border-black/5 px-4 sm:px-6 lg:px-10 py-3 md:py-4 flex items-center justify-between">
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
            className="premium-nav-link pb-1 text-black/62 transition-colors hover:text-black"
          >
            Filosofia
          </button>
          <button
            type="button"
            onClick={() => requestScroll({ targetId: "shelf-Teologia" })}
            className="premium-nav-link text-black/62 transition-colors hover:text-black"
          >
            Teologia
          </button>
          <button
            type="button"
            onClick={() => requestScroll({ targetId: "shelf-Psicanálise" })}
            className="premium-nav-link text-black/62 transition-colors hover:text-black"
          >
            Psicanálise
          </button>
          <button
            type="button"
            onClick={() => requestScroll({ targetId: "shelf-literatura-geral" })}
            className="premium-nav-link text-black/62 transition-colors hover:text-black"
          >
            Literatura
          </button>
          {profile?.isAdmin && (
            <Link to="/admin" className={`transition-colors ${location.pathname === '/admin' ? 'accent-gold border-b border-[#C5A059]' : 'text-black/60 hover:text-black'}`}>Admin</Link>
          )}
        </div>
      </motion.div>
      
      <div className="flex items-center gap-3 md:gap-6">
        <div className="hidden md:block text-right">
          <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">
            {user ? (hasAccess ? "Acesso liberado" : "Aguardando aprovação") : "Login Studio Logos"}
          </p>
          <p className="text-sm font-serif text-[#1A1A1A]">
            {profile?.nome || user?.displayName || user?.email || "Studio Logos"}
          </p>
          {user && hasAccess && (
            <p className="text-[9px] uppercase tracking-[0.14em] text-black/55 font-bold">
              Aprovado em {profile?.approvalDateBrasilia || formatBrasiliaDate(profile?.approvedAt)}
            </p>
          )}
        </div>
        {user ? (
          <button
            onClick={logout}
            className="h-10 px-4 border border-black/10 bg-white/50 rounded-sm text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black hover:text-white transition-colors"
          >
            Sair
          </button>
        ) : (
          <button
            onClick={login}
            disabled={loading}
            className="h-10 px-4 premium-button-dark text-white rounded-sm text-[10px] uppercase tracking-[0.2em] font-bold disabled:opacity-50 transition-colors"
          >
            Entrar
          </button>
        )}
      </div>
    </nav>
  );
}
