import React, { useEffect, useState } from "react";
import { Radio, ExternalLink, X } from "lucide-react";

const LIVE_CHANNELS = [
  { key: "tvj",  label: "TV Justiça", url: "https://www.youtube.com/watch?v=4NuQS6vAYAU" },
  { key: "tvs",  label: "TV Senado",  url: "https://www.youtube.com/tvsenado/live" },
  { key: "tvc",  label: "TV Câmara",  url: "https://www.youtube.com/tvcamara/live" },
  { key: "tvbr", label: "TV Brasil",  url: "https://www.youtube.com/@tvbrasil/live" },
];

interface NewsItem {
  source: string;
  color:  string;
  title:  string;
  link:   string;
}

export function NewsTickerBar() {
  const [news,   setNews]   = useState<NewsItem[]>([]);
  const [ready,  setReady]  = useState(false);
  const [paused, setPaused] = useState(false);
  const [updated, setUpdated] = useState("");
  const [hidden, setHidden] = useState(() => {
    try {
      return window.sessionStorage.getItem("studiologos-news-hidden") === "true";
    } catch {
      return false;
    }
  });

  async function load() {
    try {
      // Lê o news.json gerado pelo GitHub Actions no próprio servidor
      const res = await fetch(`/news.json?t=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json() as { items: NewsItem[]; updated: string };
      setNews(data.items ?? []);
      setUpdated(data.updated ?? "");
      setReady(true);
    } catch {
      setReady(true);
    }
  }

  useEffect(() => { load(); }, []);
  // Recarrega a cada 10 min (o arquivo no servidor já atualiza a cada 30 min)
  useEffect(() => {
    const id = setInterval(load, 10 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const items   = [...news, ...news]; // duplica para loop infinito
  const duration = Math.max(news.length * 6, 80);

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "short", day: "2-digit", month: "2-digit",
  });

  if (hidden) return null;

  return (
    <section className="news-strip" aria-label="Notícias e canais ao vivo">
      <div className="news-strip-card">
        {/* ── Ao Vivo + canais ── */}
        <div className="news-live-links">
        <Radio size={11} color="#ff3b30" />
        <span style={{
          fontSize: "9px", fontWeight: 900, letterSpacing: "0.16em",
          color: "#ff3b30", textTransform: "uppercase",
          marginRight: 4, userSelect: "none",
        }}>
          Ao Vivo
        </span>

        {LIVE_CHANNELS.map(ch => (
          <a key={ch.key} href={ch.url} target="_blank" rel="noopener noreferrer"
            style={{
              fontSize: "9px", fontWeight: 700, letterSpacing: "0.05em",
              color: "rgba(255,255,255,0.5)", textDecoration: "none",
              padding: "3px 7px", border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: "3px", display: "inline-flex", alignItems: "center",
              gap: "3px", transition: "all .15s", whiteSpace: "nowrap",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "#fff";
              el.style.borderColor = "rgba(255,255,255,.35)";
              el.style.background  = "rgba(255,255,255,.06)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "rgba(255,255,255,.5)";
              el.style.borderColor = "rgba(255,255,255,.14)";
              el.style.background  = "transparent";
            }}
          >
            {ch.label}<ExternalLink size={8} />
          </a>
        ))}
        </div>

        {/* ── Ticker ── */}
        <div
          className="news-ticker-window"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {!ready ? (
            <span style={{ paddingLeft: 20, fontSize: "12px", color: "rgba(255,255,255,.35)", fontStyle: "italic" }}>
              Carregando notícias do dia…
            </span>
          ) : news.length === 0 ? (
            <span style={{ paddingLeft: 20, fontSize: "12px", color: "rgba(255,255,255,.35)" }}>
              Aguardando atualização das notícias…
            </span>
          ) : (
            <div
              className={`ticker-track${paused ? " paused" : ""}`}
              style={{ animationDuration: `${duration}s` }}
            >
              {items.map((item, idx) => (
                <React.Fragment key={`${item.source}-${idx}`}>
                  {idx > 0 && (
                    <span style={{ color: "rgba(255,255,255,.16)", padding: "0 16px", fontSize: "11px", flexShrink: 0 }}>
                      ◆
                    </span>
                  )}
                  <span style={{
                    fontSize: "8.5px", fontWeight: 900, letterSpacing: "0.09em",
                    textTransform: "uppercase", background: item.color,
                    color: "#fff", padding: "2px 6px", borderRadius: "3px",
                    marginRight: "8px", lineHeight: 1, flexShrink: 0, userSelect: "none",
                  }}>
                    {item.source}
                  </span>
                  <a
                    href={item.link || "#"} target="_blank" rel="noopener noreferrer"
                    style={{
                      fontSize: "12.5px", color: "rgba(255,255,255,.82)",
                      textDecoration: "none", fontWeight: 500, lineHeight: 1,
                      transition: "color .15s", letterSpacing: "0.01em",
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.82)")}
                  >
                    {item.title.length > 100 ? item.title.slice(0, 98) + "…" : item.title}
                  </a>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* ── Data / horário da última atualização ── */}
        <div className="news-ticker-date">
          <span style={{ fontSize: "9.5px", color: "rgba(255,255,255,.48)", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {today}
          </span>
          {updated && (
            <span style={{ fontSize: "8px", color: "rgba(255,255,255,.32)", letterSpacing: "0.04em" }}>
              atualizado {new Date(updated).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            try {
              window.sessionStorage.setItem("studiologos-news-hidden", "true");
            } catch {}
            setHidden(true);
          }}
          aria-label="Fechar faixa de notícias"
          title="Fechar faixa de notícias"
          className="news-close-button"
        >
          <X size={16} />
        </button>
      </div>
    </section>
  );
}
