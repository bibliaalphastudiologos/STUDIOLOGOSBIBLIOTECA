import React from "react";
import { Home, Search, BookOpen, User, LogIn } from "lucide-react";
import { useAuth } from "./AuthProvider";

function requestScroll(detail: { targetId?: string; top?: boolean }) {
  window.dispatchEvent(new CustomEvent("studiologos:scroll-to", { detail }));
}

export function MobileBottomNav() {
  const { user, login, loading } = useAuth();

  const handleSearchFocus = () => {
    const input = document.querySelector<HTMLInputElement>(
      "input[placeholder*='Buscar']"
    );
    if (input) {
      input.focus();
      input.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      requestScroll({ top: true });
    }
  };

  const handleAccount = () => {
    if (!user && !loading) login();
  };

  return (
    <nav
      className="mobile-bottom-nav md:hidden"
      role="navigation"
      aria-label="Navegação principal mobile"
    >
      <button
        className="mobile-bottom-nav-btn"
        onClick={() => requestScroll({ top: true })}
        aria-label="Início"
      >
        <Home size={18} />
        <span className="mobile-bottom-nav-label">Início</span>
      </button>

      <button
        className="mobile-bottom-nav-btn"
        onClick={handleSearchFocus}
        aria-label="Buscar"
      >
        <Search size={18} />
        <span className="mobile-bottom-nav-label">Buscar</span>
      </button>

      <button
        className="mobile-bottom-nav-btn"
        onClick={() => requestScroll({ targetId: "shelf-Filosofia" })}
        aria-label="Biblioteca"
      >
        <BookOpen size={18} />
        <span className="mobile-bottom-nav-label">Biblioteca</span>
      </button>

      <button
        className="mobile-bottom-nav-btn"
        onClick={handleAccount}
        disabled={loading}
        aria-label={user ? "Conta" : "Entrar"}
      >
        {user ? <User size={18} /> : <LogIn size={18} />}
        <span className="mobile-bottom-nav-label">
          {user ? "Conta" : "Entrar"}
        </span>
      </button>
    </nav>
  );
}
