import React, { useEffect, useRef, useState } from "react";
import { Radio, ExternalLink } from "lucide-react";

const RSS_SOURCES = [
  { key: "g1",      label: "G1",       bg: "#E8003D", url: "https://g1.globo.com/rss/g1/",                                               maxItems: 6 },
  { key: "cnn-br",  label: "CNN BR",   bg: "#cc0000", url: "https://admin.cnnbrasil.com.br/feed/",                                      maxItems: 5 },
  { key: "cnn-int", label: "CNN INT",  bg: "#a00020", url: "https://rss.cnn.com/rss/edition.rss",                                       maxItems: 4 },
  { key: "senado",  label: "Senado",   bg: "#1a3a6b", url: "https://www12.senado.leg.br/noticias/rss.xml",                              maxItems: 5 },
  { key: "ebc",     label: "Ag. BR",   bg: "#1a6b2f", url: "https://agenciabrasil.ebc.com.br/feed/ultimasnoticias/feed.xml",            maxItems: 4 },
] as const;

const LIVE_CHANNELS = [
  { key: "tv-justica", label: "TV Justiça", url: "https://www.youtube.com/watch?v=4NuQS6vAYAU" },
  { key: "tv-senado",  label: "TV Senado",  url: "https://www.youtube.com/tvsenado/live" },
];

const PROXY = "https://api.allorigins.win/raw?url=";

type Src = (typeof RSS_SOURCES)[number];
interface NewsItem { source: Src; title: string; link: string; }

async function fetchFeed(src: Src): Promise<NewsItem[]> {
  try {
    const res = await fetch(PROXY + encodeURIComponent(src.url), { signal: AbortSignal.timeout(7000) });
    if (!res.ok) return [];
    const text = await res.text();
    const doc = new DOMParser().parseFromString(text, "text/xml");
    return Array.from(doc.querySelectorAll("item"))
      .slice(0, src.maxItems)
      .map(item => ({
        source: src,
        title: (item.querySelector("title")?.textContent ?? "").replace(/<!\[CDATA\[|\]\]>/g, "").trim(),
        link: (item.querySelector("link")?.textContent ?? item.querySelector("guid")?.textContent ?? "").trim(),
      }))
      .filter(n => n.title.length > 4);
  } catch { return []; }
}

function buildMixed(results: PromiseSettledResult<NewsItem[]>[]): NewsItem[] {
  const bySource = RSS_SOURCES.map((_, i) =>
    results[i].status === "fulfilled" ? results[i].value : []
  );
  const mixed: NewsItem[] = [];
  const maxLen = Math.max(...bySource.map(a => a.length));
  for (let i = 0; i < maxLen; i++)
    bySource.forEach(arr => { if (arr[i]) mixed.push(arr[i]); });
  return mixed;
}

export function NewsTickerBar() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [paused, setPaused] = useState(false);

  const today = new Date().toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit" });

  async function loadNews() {
    const results = await Promise.allSettled(RSS_SOURCES.map(fetchFeed));
    setNews(buildMixed(results));
    setLoaded(true);
  }

  useEffect(() => { loadNews(); }, []);
  useEffect(() => {
    const id = setInterval(() => { setLoaded(false); loadNews(); }, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const display = [...news, ...news];
  const duration = Math.max(news.length * 7, 55);

  return (
    <>
      <style>{`
        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: "34px", zIndex: 100,
        background: "#0d0d0d",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex", alignItems: "center", overflow: "hidden",
      }}>
        {/* AO VIVO + canais */}
        <div style={{
          display: "flex", alignItems: "center", gap: "6px",
          padding: "0 10px", flexShrink: 0,
          borderRight: "1px solid rgba(255,255,255,0.09)",
          height: "100%", background: "#111",
        }}>
          <Radio size={10} style={{ color: "#ff3b30" }} />
          <span style={{ fontSize: "9px", fontWeight: 800, letterSpacing: "0.12em", color: "#ff3b30", textTransform: "uppercase" }}>
            Ao Vivo
          </span>
          {LIVE_CHANNELS.map(ch => (
            <a key={ch.key} href={ch.url} target="_blank" rel="noopener noreferrer"
              style={{
                fontSize: "9px", fontWeight: 700, letterSpacing: "0.07em",
                color: "rgba(255,255,255,0.5)", textDecoration: "none",
                padding: "2px 6px", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "2px", display: "flex", alignItems: "center", gap: "3px",
                transition: "all 0.15s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "rgba(255,255,255,0.9)";
                el.style.borderColor = "rgba(255,255,255,0.3)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "rgba(255,255,255,0.5)";
                el.style.borderColor = "rgba(255,255,255,0.12)";
              }}
            >
              {ch.label} <ExternalLink size={7} />
            </a>
          ))}
        </div>

        {/* Ticker */}
        <div style={{ flex: 1, overflow: "hidden", height: "100%", display: "flex", alignItems: "center" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {!loaded ? (
            <span style={{ padding: "0 20px", fontSize: "11px", color: "rgba(255,255,255,0.22)", fontStyle: "italic" }}>
              Carregando notícias…
            </span>
          ) : news.length === 0 ? (
            <span style={{ padding: "0 20px", fontSize: "11px", color: "rgba(255,255,255,0.22)" }}>
              Nenhuma notícia disponível.
            </span>
          ) : (
            <div style={{
              display: "flex", alignItems: "center", whiteSpace: "nowrap",
              animation: paused ? "none" : `tickerScroll ${duration}s linear infinite`,
              willChange: "transform",
            }}>
              {display.map((item, idx) => (
                <React.Fragment key={`${item.source.key}-${idx}`}>
                  {idx > 0 && (
                    <span style={{ color: "rgba(255,255,255,0.13)", padding: "0 14px", fontSize: "10px" }}>◆</span>
                  )}
                  <span style={{
                    fontSize: "8px", fontWeight: 800, letterSpacing: "0.1em",
                    textTransform: "uppercase", background: item.source.bg,
                    color: "#fff", padding: "2px 5px", borderRadius: "2px",
                    marginRight: "7px", lineHeight: 1,
                  }}>
                    {item.source.label}
                  </span>
                  <a href={item.link || "#"} target="_blank" rel="noopener noreferrer"
                    style={{
                      fontSize: "11.5px", color: "rgba(255,255,255,0.7)",
                      textDecoration: "none", fontWeight: 400, lineHeight: 1,
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)")}
                  >
                    {item.title.length > 90 ? item.title.slice(0, 88) + "…" : item.title}
                  </a>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* Data */}
        <div style={{
          padding: "0 12px", flexShrink: 0,
          borderLeft: "1px solid rgba(255,255,255,0.07)",
          fontSize: "9px", color: "rgba(255,255,255,0.25)",
          fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
          height: "100%", display: "flex", alignItems: "center", background: "#111",
        }}>
          {today}
        </div>
      </div>

      {/* Espaçador para compensar o ticker fixo */}
      <div style={{ height: "34px", flexShrink: 0 }} />
    </>
  );
}
