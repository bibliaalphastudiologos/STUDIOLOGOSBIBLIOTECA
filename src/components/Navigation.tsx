import { useState, useEffect } from "react";
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
  { label: "Filosofia",       targetId: "shelf-Filosofia",             accent: "#b9a46a" },
  { label: "Teologia",        targetId: "shelf-Teologia",              accent: "#c8a35b" },
  { label: "Espiritualidade", targetId: "shelf-Espiritualidade Cristã", accent: "#8cba6a" },
  { label: "Psicanálise",     targetId: "shelf-Psicanálise",           accent: "#a9a1b8" },
  { label: "Literatura",      targetId: "shelf-literatura-geral",       accent: "#d3a073" },
  { label: "História",        targetId: "shelf-História",               accent: "#9fb2c9" },
];

export function Navigation() {
  const { user, profile, hasAccess, loading, login, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll-aware: dark when at top (over hero), light when scrolled
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const handleNavClick = (targetId: string) => {
    requestScroll({ targetId });
    closeMobile();
  };

  const handleSearch = (_query: string) => {};

  // Dynamic classes/styles based on scroll position
  const navBg    = scrolled ? "rgba(250,247,240,0.97)" : "rgba(8,12,30,0.82)";
  const navBorder = scrolled ? "rgba(31,28,23,0.10)" : "rgba(79,70,229,0.20)";
  const navShadow = scrolled
    ? "0 1px 0 rgba(31,28,23,0.07), 0 8px 24px rgba(31,28,23,0.09)"
    : "0 1px 0 rgba(79,70,229,0.20), 0 8px 32px rgba(0,0,0,0.25)";
  const textPrimary   = scrolled ? "#0F0F0F"           : "#ffffff";
  const textSecondary = scrolled ? "rgba(15,15,15,0.55)" : "rgba(255,255,255,0.60)";
  const borderMuted   = scrolled ? "rgba(15,15,15,0.12)" : "rgba(255,255,255,0.18)";
  const btnBg         = scrolled ? "#111111"           : "rgba(255,255,255,0.10)";
  const btnText       = scrolled ? "#ffffff"           : "#ffffff";
  const btnBorder     = scrolled ? "transparent"       : "rgba(255,255,255,0.18)";
  const btnHoverBg    = scrolled ? "#000000"           : "rgba(255,255,255,0.20)";
  const logoFilter    = scrolled ? "none"              : "brightness(0) invert(1)";

  return (
    <>
      <nav
        className="fixed top-[44px] left-0 w-full z-50 backdrop-blur-xl px-4 sm:px-6 lg:px-10 py-3 md:py-4 flex items-center justify-between transition-all duration-300"
        style={{
          background: navBg,
          borderBottom: `1px solid ${navBorder}`,
          boxShadow: navShadow,
        }}
      >
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
              className="h-10 md:h-12 w-auto max-w-[128px] md:max-w-[160px] object-contain"
              style={{ filter: logoFilter, transition: "filter 0.3s ease" }}
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex gap-7 xl:gap-9 text-[10px] uppercase tracking-[0.2em] font-bold">
            {NAV_LINKS.slice(0, 5).map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNavClick(link.targetId)}
                className="relative pb-1 transition-colors"
                style={{ color: textSecondary }}
                onMouseEnter={e => (e.currentTarget.style.color = textPrimary)}
                onMouseLeave={e => (e.currentTarget.style.color = textSecondary)}
              >
                {link.label}
              </button>
            ))}
            {profile?.isAdmin && (
              <Link
                to="/admin"
                className="transition-colors text-[10px] uppercase tracking-[0.2em] font-bold"
                style={{ color: location.pathname === "/admin" ? "#f97316" : textSecondary }}
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
            <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: textSecondary }}>
              {user ? (hasAccess ? "Acesso liberado" : "Aguardando") : "Login Studio Logos"}
            </p>
            <p className="text-sm font-serif font-semibold" style={{ color: textPrimary }}>
              {profile?.nome || user?.displayName || user?.email || "Studio Logos"}
            </p>
            {user && hasAccess && (
              <p className="text-[9px] uppercase tracking-[0.14em] font-bold" style={{ color: textSecondary }}>
                Aprovado em {profile?.approvalDateBrasilia || formatBrasiliaDate(profile?.approvedAt)}
              </p>
            )}
          </div>

          {/* Desktop auth button */}
          {user ? (
            <button
              onClick={logout}
              className="hidden md:block h-10 px-4 rounded-sm text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-200"
              style={{ border: `1px solid ${borderMuted}`, background: "transparent", color: textSecondary }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = btnBg;
                (e.currentTarget as HTMLButtonElement).style.color = btnText;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = textSecondary;
              }}
            >
              Sair
            </button>
          ) : (
            <button
              onClick={login}
              disabled={loading}
              className="hidden md:block h-10 px-4 rounded-sm text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-200 disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg,#f97316,#ea580c)",
                color: "#fff",
                boxShadow: "0 4px 14px rgba(249,115,22,0.35)",
              }}
            >
              Entrar
            </button>
          )}

          {/* Hamburger — mobile only */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-sm transition-colors"
            style={{ border: `1px solid ${borderMuted}`, background: "transparent" }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileOpen
              ? <X size={18} style={{ color: textPrimary }} />
              : <Menu size={18} style={{ color: textPrimary }} />}
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
              className="fixed left-0 w-full z-50 lg:hidden backdrop-blur-xl border-b shadow-2xl"
              style={{
                top: "calc(44px + 56px)",
                background: "rgba(250,247,240,0.98)",
                borderColor: "rgba(31,28,23,0.08)",
              }}
            >
              <div className="px-4 py-4 space-y-1">
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
