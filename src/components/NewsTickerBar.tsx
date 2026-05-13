import React, { useEffect, useState } from "react";
import { Radio, ExternalLink } from "lucide-react";

// ── Fontes RSS ────────────────────────────────────────────────────────────────
const RSS_SOURCES = [
  { key: "g1",      label: "G1",        bg: "#D0021B", url: "https://g1.globo.com/rss/g1/",                                           max: 6 },
  { key: "folha",   label: "Folha",     bg: "#003399", url: "https://feeds.folha.uol.com.br/emcimadahora/rss091.xml",                 max: 5 },
  { key: "cnn-br",  label: "CNN BR",    bg: "#AA0000", url: "https://admin.cnnbrasil.com.br/feed/",                                  max: 5 },
  { key: "uol",     label: "UOL",       bg: "#E85D04", url: "https://rss.uol.com.br/feed/noticias.xml",                              max: 4 },
  { key: "jp",      label: "Jovem Pan", bg: "#006633", url: "https://jovempan.com.br/feed",                                          max: 4 },
  { key: "veja",    label: "Veja",      bg: "#B30000", url: "https://veja.abril.com.br/feed/",                                       max: 4 },
  { key: "poder",   label: "Poder360",  bg: "#1A237E", url: "https://www.poder360.com.br/feed/",                                     max: 4 },
  { key: "bbc",     label: "BBC",       bg: "#BB1919", url: "https://feeds.bbci.co.uk/news/world/rss.xml",                           max: 4 },
  { key: "senado",  label: "Senado",    bg: "#0D2B6B", url: "https://www12.senado.leg.br/noticias/rss.xml",                         max: 4 },
  { key: "ebc",     label: "Ag. BR",    bg: "#1B5E20", url: "https://agenciabrasil.ebc.com.br/feed/ultimasnoticias/feed.xml",       max: 4 },
] as const;

const LIVE_CHANNELS = [
  { key: "tvj",  label: "TV Justiça", url: "https://www.youtube.com/watch?v=4NuQS6vAYAU" },
  { key: "tvs",  label: "TV Senado",  url: "https://www.youtube.com/tvsenado/live" },
  { key: "tvc",  label: "TV Câmara",  url: "https://www.youtube.com/tvcamara/live" },
  { key: "tvbr", label: "TV Brasil",  url: "https://www.youtube.com/@tvbrasil/live" },
];

type Src = (typeof RSS_SOURCES)[number];
interface NewsItem { source: Src; title: string; link: string; }

// ── Proxy: usa o PHP no próprio servidor (sem CORS) ──────────────────────────
const PHP_PROXY = "/rss-proxy.php?url=";

async function fetchFeed(src: Src): Promise<NewsItem[]> {
  try {
    const ctrl = new AbortController();
    const tid = setTimeout(() => ctrl.abort(), 10000);
    const res = await fetch(PHP_PROXY + encodeURIComponent(src.url), {
      signal: ctrl.signal,
      cache: "no-store",
    });
    clearTimeout(tid);
    if (!res.ok) return [];
    const data = await res.json() as { items?: { title: string; link: string }[]; error?: string };
    if (data.error || !data.items) return [];
    return data.items
      .slice(0, src.max)
      .map(it => ({ source: src, title: it.title, link: it.link }));
  } catch {
    return [];
  }
}

function interleave(settled: PromiseSettledResult<NewsItem[]>[]): NewsItem[] {
  const cols = RSS_SOURCES.map((_, i) =>
    settled[i].status === "fulfilled"
      ? (settled[i] as PromiseFulfilledResult<NewsItem[]>).value
      : []
  );
  const out: NewsItem[] = [];
  const max = Math.max(...cols.map(c => c.length));
  for (let i = 0; i < max; i++) cols.forEach(c => { if (c[i]) out.push(c[i]); });
  return out;
}

// ── Componente ────────────────────────────────────────────────────────────────
export function NewsTickerBar() {
  const [news,   setNews]   = useState<NewsItem[]>([]);
  const [ready,  setReady]  = useState(false);
  const [paused, setPaused] = useState(false);

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "short", day: "2-digit", month: "2-digit",
  });

  async function load() {
    const results = await Promise.allSettled(RSS_SOURCES.map(fetchFeed));
    const mixed = interleave(results);
    setNews(mixed);
    setReady(true);
  }

  useEffect(() => { load(); }, []);
  useEffect(() => {
    const id = setInterval(load, 5 * 60 * 1000); // Atualiza a cada 5 min
    return () => clearInterval(id);
  }, []);

  const items = [...news, ...news]; // duplica para loop contínuo
  const duration = Math.max(news.length * 6, 80);

  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: "44px", zIndex: 9999,
        background: "#111214",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        display: "flex", alignItems: "center",
        overflow: "hidden", fontFamily: "system-ui, sans-serif",
        boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
      }}
    >
      {/* ── Ao Vivo + canais ── */}
      <div style={{
        display: "flex", alignItems: "center", gap: "5px",
        padding: "0 12px 0 14px", flexShrink: 0,
        borderRight: "1px solid rgba(255,255,255,0.1)",
        height: "100%", background: "#0d0e10",
      }}>
        <Radio size={11} color="#ff3b30" />
        <span style={{
          fontSize: "9px", fontWeight: 900, letterSpacing: "0.16em",
          color: "#ff3b30", textTransform: "uppercase", marginRight: 4,
          userSelect: "none",
        }}>
          Ao Vivo
        </span>

        {LIVE_CHANNELS.map(ch => (
          <a key={ch.key} href={ch.url} target="_blank" rel="noopener noreferrer"
            style={{
              fontSize: "9px", fontWeight: 700, letterSpacing: "0.05em",
              color: "rgba(255,255,255,0.5)", textDecoration: "none",
              padding: "3px 7px",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: "3px",
              display: "inline-flex", alignItems: "center", gap: "3px",
              transition: "all .15s", whiteSpace: "nowrap",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "#fff";
              el.style.borderColor = "rgba(255,255,255,.35)";
              el.style.background = "rgba(255,255,255,.06)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "rgba(255,255,255,.5)";
              el.style.borderColor = "rgba(255,255,255,.14)";
              el.style.background = "transparent";
            }}
          >
            {ch.label}<ExternalLink size={8} />
          </a>
        ))}
      </div>

      {/* ── Ticker ── */}
      <div
        style={{
          flex: 1, overflow: "hidden",
          height: "100%", display: "flex", alignItems: "center",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {!ready ? (
          <span style={{ paddingLeft: 20, fontSize: "12px", color: "rgba(255,255,255,.25)", fontStyle: "italic" }}>
            Carregando notícias do dia…
          </span>
        ) : news.length === 0 ? (
          <span style={{ paddingLeft: 20, fontSize: "12px", color: "rgba(255,255,255,.25)" }}>
            Nenhuma notícia disponível no momento.
          </span>
        ) : (
          <div
            className={`ticker-track${paused ? " paused" : ""}`}
            style={{ animationDuration: `${duration}s` }}
          >
            {items.map((item, idx) => (
              <React.Fragment key={`${item.source.key}-${idx}`}>
                {idx > 0 && (
                  <span style={{
                    color: "rgba(255,255,255,.13)",
                    padding: "0 16px",
                    fontSize: "11px",
                    flexShrink: 0,
                  }}>
                    ◆
                  </span>
                )}
                <span style={{
                  fontSize: "8.5px", fontWeight: 900, letterSpacing: "0.09em",
                  textTransform: "uppercase",
                  background: item.source.bg, color: "#fff",
                  padding: "2px 6px", borderRadius: "3px",
                  marginRight: "8px", lineHeight: 1, flexShrink: 0,
                  userSelect: "none",
                }}>
                  {item.source.label}
                </span>
                <a
                  href={item.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "12.5px",
                    color: "rgba(255,255,255,.78)",
                    textDecoration: "none",
                    fontWeight: 400, lineHeight: 1,
                    transition: "color .15s",
                    letterSpacing: "0.01em",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.78)")}
                >
                  {item.title.length > 100 ? item.title.slice(0, 98) + "…" : item.title}
                </a>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* ── Data ── */}
      <div style={{
        padding: "0 14px", flexShrink: 0,
        borderLeft: "1px solid rgba(255,255,255,.08)",
        fontSize: "9.5px", color: "rgba(255,255,255,.28)",
        fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
        height: "100%", display: "flex", alignItems: "center",
        background: "#0d0e10", whiteSpace: "nowrap",
      }}>
        {today}
      </div>
    </div>
  );
}
