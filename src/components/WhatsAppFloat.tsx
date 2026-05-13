import React, { useState } from "react";
import { X, MessageCircle, Users } from "lucide-react";

const SUPPORT_NUMBER = "5519993586153"; // +55 19 99358-6153
const GROUP_LINK    = "https://chat.whatsapp.com/Gt78A68duMBADzzuwnGmbb";
const SUPPORT_MSG   = encodeURIComponent(
  "Olá! Preciso de suporte com a plataforma Studio Logos Biblioteca."
);

export function WhatsAppFloat() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-[90] flex flex-col items-end gap-2">
      {/* Popup menu */}
      {open && (
        <div className="flex flex-col gap-2 mb-1 animate-whatsapp-in">
          {/* Grupo */}
          <a
            href={GROUP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-white rounded-full shadow-xl px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.15em] text-[#128C7E] border border-green-100 hover:bg-green-50 transition-colors whitespace-nowrap"
          >
            <Users size={15} className="text-[#128C7E]" />
            Entrar no Grupo
          </a>

          {/* Suporte */}
          <a
            href={`https://wa.me/${SUPPORT_NUMBER}?text=${SUPPORT_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-white rounded-full shadow-xl px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.15em] text-[#25D366] border border-green-100 hover:bg-green-50 transition-colors whitespace-nowrap"
          >
            <MessageCircle size={15} className="text-[#25D366]" />
            Falar com Suporte
          </a>
        </div>
      )}

      {/* Botão principal */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fechar WhatsApp" : "Abrir WhatsApp"}
        className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 active:scale-90 hover:scale-105"
        style={{
          background: open
            ? "linear-gradient(135deg, #075E54, #128C7E)"
            : "linear-gradient(135deg, #25D366, #128C7E)",
          boxShadow: "0 4px 24px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        {open ? (
          <X size={22} color="white" />
        ) : (
          /* WhatsApp SVG oficial */
          <svg viewBox="0 0 32 32" width="26" height="26" fill="white">
            <path d="M16 3C9.37 3 4 8.37 4 15c0 2.37.68 4.58 1.85 6.46L4 29l7.77-1.82A12.93 12.93 0 0016 28c6.63 0 12-5.37 12-12S22.63 3 16 3zm6.2 17.1c-.26.72-1.52 1.38-2.08 1.44-.54.06-1.06.26-3.57-.74-3.02-1.2-4.96-4.26-5.1-4.46-.14-.2-1.18-1.57-1.18-2.99s.75-2.12 1.02-2.42c.26-.3.58-.38.77-.38.2 0 .38 0 .55.01.18.01.42-.07.66.5.26.6.88 2.14.96 2.3.08.15.13.34.03.54-.1.2-.15.33-.3.5-.14.18-.3.4-.43.54-.14.14-.29.3-.12.58.16.29.73 1.2 1.57 1.94 1.08.96 1.98 1.26 2.28 1.4.3.14.47.12.65-.07.18-.2.76-.88.96-1.18.2-.3.4-.25.68-.15.28.1 1.78.84 2.08.99.3.15.5.22.58.34.07.14.07.8-.18 1.52z"/>
          </svg>
        )}
      </button>

      {/* Pulso de atenção (quando fechado) */}
      {!open && (
        <span className="absolute inset-0 rounded-full animate-ping"
          style={{ background: "rgba(37,211,102,0.3)", zIndex: -1 }} />
      )}
    </div>
  );
}
