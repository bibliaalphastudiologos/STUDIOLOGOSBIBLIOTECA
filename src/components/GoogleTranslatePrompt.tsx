import React, { useMemo, useState } from "react";
import { ExternalLink, Languages, X } from "lucide-react";

function getTranslateUrl(): string {
  const currentUrl = new URL(window.location.href);
  const translatedTarget = currentUrl.hostname === "localhost" || currentUrl.hostname === "127.0.0.1"
    ? `https://studiologos.com.br${currentUrl.pathname}${currentUrl.search}`
    : currentUrl.href;

  const translateUrl = new URL("https://translate.google.com/translate");
  translateUrl.searchParams.set("sl", "auto");
  translateUrl.searchParams.set("tl", "pt");
  translateUrl.searchParams.set("u", translatedTarget);
  return translateUrl.toString();
}

export function GoogleTranslatePrompt() {
  const [hidden, setHidden] = useState(false);
  const translateUrl = useMemo(() => getTranslateUrl(), []);

  if (hidden) return null;

  return (
    <div className="fixed right-4 bottom-4 z-[80] max-w-[calc(100vw-2rem)] sm:max-w-sm">
      <div className="border border-black/10 bg-[#F9F7F2]/95 shadow-2xl backdrop-blur-md rounded-sm p-3 flex items-center gap-3">
        <div className="h-9 w-9 shrink-0 rounded-sm bg-[#1A1A1A] text-[#D8B76C] flex items-center justify-center">
          <Languages className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <p className="text-[9px] uppercase tracking-[0.22em] font-black text-[#8A682B]">
            Google Tradutor
          </p>
          <a
            href={translateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1.5 text-xs font-bold text-[#1A1A1A] hover:text-[#8A682B]"
          >
            Traduzir para português
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <button
          type="button"
          onClick={() => setHidden(true)}
          className="ml-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-black/15 bg-white text-black shadow-sm transition-colors hover:bg-[#1A1A1A] hover:text-white"
          aria-label="Fechar convite de tradução"
          title="Fechar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
