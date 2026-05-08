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
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-black/5 px-10 py-6 flex items-center justify-between">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-12"
      >
        <Link
          to="/"
          onClick={() => requestScroll({ top: true })}
          className="flex items-center hover:opacity-75 transition-opacity"
          aria-label="Voltar ao início do Studio Logos"
          title="Voltar ao início"
        >
          <img
            src="/logo.png"
            alt="Studio Logos"
            className="h-11 w-auto max-w-[150px] object-contain"
          />
        </Link>
        
        <div className="hidden lg:flex gap-8 text-[10px] uppercase tracking-[0.2em] font-bold">
          <Link
            to="/filosofia"
            onClick={() => requestScroll({ targetId: "shelf-Filosofia" })}
            className={`pb-1 transition-colors ${location.pathname === '/filosofia' ? 'accent-gold border-b border-[#C5A059]' : 'text-black/60 hover:text-black'}`}
          >
            Filosofia
          </Link>
          <Link
            to="/teologia"
            onClick={() => requestScroll({ targetId: "shelf-Teologia" })}
            className={`transition-colors ${location.pathname === '/teologia' ? 'accent-gold border-b border-[#C5A059]' : 'text-black/60 hover:text-black'}`}
          >
            Teologia
          </Link>
          <Link
            to="/psicanalise"
            onClick={() => requestScroll({ targetId: "shelf-Psicanálise" })}
            className={`transition-colors ${location.pathname === '/psicanalise' ? 'accent-gold border-b border-[#C5A059]' : 'text-black/60 hover:text-black'}`}
          >
            Psicanálise
          </Link>
          <Link
            to="/literatura"
            onClick={() => requestScroll({ targetId: "shelf-literatura-geral" })}
            className={`transition-colors ${location.pathname === '/literatura' ? 'accent-gold border-b border-[#C5A059]' : 'text-black/60 hover:text-black'}`}
          >
            Literatura
          </Link>
          {profile?.isAdmin && (
            <Link to="/admin" className={`transition-colors ${location.pathname === '/admin' ? 'accent-gold border-b border-[#C5A059]' : 'text-black/60 hover:text-black'}`}>Admin</Link>
          )}
        </div>
      </motion.div>
      
      <div className="flex items-center gap-6">
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
