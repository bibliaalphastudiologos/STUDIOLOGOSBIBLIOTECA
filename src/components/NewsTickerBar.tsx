import React, { useEffect, useState } from "react";
import { Radio, ExternalLink } from "lucide-react";

const RSS_SOURCES = [
  { key: "g1",      label: "G1",       bg: "#D0021B", url: "https://g1.globo.com/rss/g1/",                                              maxItems: 6 },
  { key: "cnn-br",  label: "CNN BR",   bg: "#B00020", url: "https://admin.cnnbrasil.com.br/feed/",                                     maxItems: 5 },
  { key: "cnn-int", label: "CNN INT",  bg: "#8B0000", url: "https://rss.cnn.com/rss/edition.rss",                                      maxItems: 4 },
  { key: "senado",  label: "Senado",   bg: "#0D2B6B", url: "https://www12.senado.leg.br/noticias/rss.xml",                             maxItems: 5 },
  { key: "ebc",     label: "Ag. BR",   bg: "#145214", url: "https://agenciabrasil.ebc.com.br/feed/ultimasnoticias/feed.xml",           maxItems: 4 },
] as const;

const LIVE_CHANNELS = [
  { key: "tvj",    label: "TV Justiça", url: "https://www.youtube.com/watch?v=4NuQS6vAYAU" },
  { key: "tvs",    label: "TV Senado",  url: "https://www.youtube.com/tvsenado/live" },
];

type Src = (typeof RSS_SOURCES)[number];
interface NewsItem { source: Src; title: string; link: string; }

async function fetchFeed(src: Src): Promise<NewsItem[]> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 7000);
    const res = await fetch(
      "https://api.allorigins.win/raw?url=" + encodeURIComponent(src.url),
      { signal: controller.signal }
    );
    clearTimeout(timer);
    if (!res.ok) return [];
    const text = await res.text();
    const doc = new DOMParser().parseFromString(text, "text/xml");
    return Array.from(doc.querySelectorAll("item"))
      .slice(0, src.maxItems)
      .map(item => ({
        source: src,
        title: (item.querySelector("title")?.textContent ?? "")
          .replace(/<!\[CDATA\[|\]\]>/g, "").trim(),
        link: (
          item.querySelector("link")?.textContent ??
          item.querySelector("guid")?.textContent ?? ""
        ).trim(),
      }))
      .filter(n => n.title.length > 4);
  } catch {
    return [];
  }
}

function interleave(results: PromiseSettledResult<NewsItem[]>[]): NewsItem[] {
  const cols = RSS_SOURCES.map((_, i) =>
    results[i].status === "fulfilled" ? (results[i] as PromiseFulfilledResult<NewsItem[]>).value : []
  );
  const out: NewsItem[] = [];
  const len = Math.max(...cols.map(c => c.length));
  for (let i = 0; i < len; i++) cols.forEach(c => { if (c[i]) out.push(c[i]); });
  return out;
}

export function NewsTickerBar() {
  const [news, setNews]   = useState<NewsItem[]>([]);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "short", day: "2-digit", month: "2-digit",
  });

  async function load() {
    const r = await Promise.allSettled(RSS_SOURCES.map(fetchFeed));
    setNews(interleave(r));
    setReady(true);
  }

  useEffect(() => { load(); }, []);
  useEffect(() => {
    const id = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  // Duplica para loop contínuo
  const items = [...news, ...news];

  return (
    /* ── barra fixa 34px no topo ── */
    <div
      style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: "34px", zIndex: 9999,
        background: "#0d0d0d",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        display: "flex", alignItems: "center",
        overflow: "hidden", fontFamily: "sans-serif",
      }}
    >
      {/* Ao Vivo + canais */}
      <div style={{
        display: "flex", alignItems: "center", gap: "5px",
        padding: "0 10px", flexShrink: 0,
        borderRight: "1px solid rgba(255,255,255,0.08)",
        height: "100%", background: "#111",
      }}>
        <Radio size={10} color="#ff3b30" />
        <span style={{
          fontSize: "9px", fontWeight: 800, letterSpacing: "0.14em",
          color: "#ff3b30", textTransform: "uppercase", userSelect: "none",
        }}>
          Ao Vivo
        </span>
        {LIVE_CHANNELS.map(ch => (
          <a key={ch.key} href={ch.url} target="_blank" rel="noopener noreferrer"
            style={{
              fontSize: "9px", fontWeight: 700, letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.45)", textDecoration: "none",
              padding: "2px 6px",
              border: "1px solid rgba(255,255,255,0.12)", borderRadius: "2px",
              display: "inline-flex", alignItems: "center", gap: "3px",
              transition: "color .15s, border-color .15s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = "#fff";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.35)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.45)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.12)";
            }}
          >
            {ch.label}<ExternalLink size={7} />
          </a>
        ))}
      </div>

      {/* Faixa de manchetes */}
      <div
        style={{ flex: 1, overflow: "hidden", height: "100%", display: "flex", alignItems: "center" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {!ready ? (
          <span style={{ paddingLeft: 18, fontSize: "11px", color: "rgba(255,255,255,.2)", fontStyle: "italic" }}>
            Carregando notícias…
          </span>
        ) : items.length === 0 ? (
          <span style={{ paddingLeft: 18, fontSize: "11px", color: "rgba(255,255,255,.2)" }}>
            Notícias indisponíveis.
          </span>
        ) : (
          <div
            className={`ticker-track${paused ? " paused" : ""}`}
            style={{ animationDuration: `${Math.max(news.length * 7, 55)}s` }}
          >
            {items.map((item, idx) => (
              <React.Fragment key={`${item.source.key}-${idx}`}>
                {idx > 0 && (
                  <span style={{ color: "rgba(255,255,255,.12)", padding: "0 14px", fontSize: "10px" }}>◆</span>
                )}
                <span style={{
                  fontSize: "8px", fontWeight: 800, letterSpacing: "0.1em",
                  textTransform: "uppercase", background: item.source.bg,
                  color: "#fff", padding: "2px 5px", borderRadius: "2px",
                  marginRight: "7px", lineHeight: 1, flexShrink: 0,
                }}>
                  {item.source.label}
                </span>
                <a
                  href={item.link || "#"} target="_blank" rel="noopener noreferrer"
                  style={{
                    fontSize: "11.5px", color: "rgba(255,255,255,.68)",
                    textDecoration: "none", fontWeight: 400, lineHeight: 1,
                    transition: "color .15s",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.68)")}
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
        borderLeft: "1px solid rgba(255,255,255,.07)",
        fontSize: "9px", color: "rgba(255,255,255,.22)",
        fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase",
        height: "100%", display: "flex", alignItems: "center", background: "#111",
      }}>
        {today}
      </div>
    </div>
  );
}
