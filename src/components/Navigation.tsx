import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "./AuthProvider";
import { Link, useLocation } from "react-router-dom";
import { formatBrasiliaDate } from "../lib/brasiliaDate";
import { SearchHeader } from "./SearchHeader";
import { Menu, X, BookOpen, LogIn, LogOut, ChevronRight } from "lucide-react";

function requestScroll(detail: { targetId?: string; top?: boolean }) {
  window.dispatchEvent(new CustomEvent("studiologos:scroll-to", { detail }));
}

const NAV_LINKS = [
  { label: "Filosofia",      targetId: "shelf-Filosofia",      accent: "#b9a46a" },
  { label: "Teologia",       targetId: "shelf-Teologia",       accent: "#c8a35b" },
  { label: "Espiritualidade", targetId: "shelf-Espiritualidade Cristã", accent: "#8cba6a" },
  { label: "Psicanálise",    targetId: "shelf-Psicanálise",    accent: "#a9a1b8" },
  { label: "Literatura",     targetId: "shelf-literatura-geral", accent: "#d3a073" },
  { label: "História",       targetId: "shelf-História",        accent: "#9fb2c9" },
];

export function Navigation() {
  const { user, profile, hasAccess, loading, login, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  const handleNavClick = (targetId: string) => {
    requestScroll({ targetId });
    closeMobile();
  };

  const handleSearch = (_query: string) => {};

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 premium-nav backdrop-blur-xl border-b border-black/5 px-4 sm:px-6 lg:px-10 py-3 md:py-4 flex items-center justify-between">
        {/* Logo + desktop links */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-6 xl:gap-12 min-w-0"
        >
          <Link
            to="/"
            onClick={() => { requestScroll({ top: true }); closeMobile(); }}
            className="flex items-center hover:opacity-80 transition-opacity shrink-0"
            aria-label="Voltar ao início do Studio Logos"
          >
            <img
              src="/logo.png"
              alt="Studio Logos"
              className="h-10 md:h-12 w-auto max-w-[128px] md:max-w-[160px] object-contain premium-logo-mark"
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex gap-7 xl:gap-9 text-[10px] uppercase tracking-[0.2em] font-bold">
            {NAV_LINKS.slice(0, 4).map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNavClick(link.targetId)}
                className="premium-nav-link pb-1 text-[#0F0F0F]/75 transition-colors hover:text-[#0F0F0F]"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleNavClick("shelf-literatura-geral")}
              className="premium-nav-link text-[#0F0F0F]/75 transition-colors hover:text-[#0F0F0F]"
            >
              Literatura
            </button>
            {profile?.isAdmin && (
              <Link
                to="/admin"
                className={`transition-colors text-[10px] uppercase tracking-[0.2em] font-bold ${
                  location.pathname === "/admin"
                    ? "accent-gold border-b border-[#C5A059]"
                    : "text-black/60 hover:text-black"
                }`}
              >
                Admin
              </Link>
            )}
          </div>
        </motion.div>

        {/* Right side */}
        <div className="flex items-center gap-2 md:gap-4">
          <SearchHeader onSearch={handleSearch} />

          {/* Desktop user info */}
          <div className="hidden lg:block text-right">
            <p className="text-[10px] uppercase tracking-widest opacity-60 font-bold text-[#0F0F0F]">
              {user ? (hasAccess ? "Acesso liberado" : "Aguardando") : "Login Studio Logos"}
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

          {/* Desktop auth button */}
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

          {/* Hamburger — mobile only */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-sm border border-black/10 bg-white/60 transition-colors hover:bg-white active:scale-95"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ─────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] lg:hidden"
              onClick={closeMobile}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed left-0 w-full z-50 lg:hidden bg-[#faf7f0]/98 backdrop-blur-xl border-b border-black/8 shadow-2xl"
              style={{ top: "56px" }}
            >
              <div className="px-4 py-4 space-y-1">
                {/* Category links */}
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.targetId)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-sm hover:bg-white/70 active:bg-white transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: link.accent }}
                      />
                      <span className="text-[11px] uppercase tracking-[0.18em] font-black text-[#0F0F0F]/80 group-hover:text-[#0F0F0F]">
                        {link.label}
                      </span>
                    </div>
                    <ChevronRight size={14} className="text-black/25 group-hover:text-black/50" />
                  </button>
                ))}

                <div className="h-px bg-black/8 my-2" />

                {/* Auth row */}
                {user ? (
                  <div className="px-4 py-3 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0F0F0F]/50">
                        {hasAccess ? "Acesso ativo" : "Conta"}
                      </p>
                      <p className="text-sm font-serif text-[#0F0F0F] font-semibold">
                        {profile?.nome || user.displayName || user.email}
                      </p>
                    </div>
                    <button
                      onClick={() => { logout(); closeMobile(); }}
                      className="flex items-center gap-2 h-9 px-3 border border-black/15 rounded-sm text-[10px] uppercase tracking-[0.15em] font-bold text-black/60 hover:bg-black hover:text-white transition-colors"
                    >
                      <LogOut size={13} />
                      Sair
                    </button>
                  </div>
                ) : (
                  <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] text-black/50 uppercase tracking-[0.15em] font-bold">
                      <BookOpen size={14} />
                      <span>R$ 19/mês — acesso total</span>
                    </div>
                    <button
                      onClick={() => { login(); closeMobile(); }}
                      disabled={loading}
                      className="flex items-center gap-2 h-9 px-4 bg-[#111] text-white rounded-sm text-[10px] uppercase tracking-[0.15em] font-bold hover:bg-black transition-colors disabled:opacity-50"
                    >
                      <LogIn size={13} />
                      Entrar
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
