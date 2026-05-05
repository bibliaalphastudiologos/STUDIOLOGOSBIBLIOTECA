// ─── Translation Service — Studio Logos ──────────────────────────────────────
// Tradução por capítulo via Google Translate (API gratuita não oficial)
// com cache em localStorage para evitar chamadas repetidas.

const CACHE_PREFIX = 'sl_translation_';
const CACHE_VERSION = 'v1';

function getCacheKey(ebookId: string, chapterId: string, targetLang: string): string {
  return `${CACHE_PREFIX}${CACHE_VERSION}_${ebookId}_${chapterId}_${targetLang}`;
}

function getFromCache(key: string): string | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Cache válido por 30 dias
    if (Date.now() - parsed.timestamp > 30 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(key);
      return null;
    }
    return parsed.text;
  } catch {
    return null;
  }
}

function saveToCache(key: string, text: string): void {
  try {
    localStorage.setItem(key, JSON.stringify({ text, timestamp: Date.now() }));
  } catch {
    // localStorage cheio — limpar cache antigo
    clearOldCache();
  }
}

function clearOldCache(): void {
  try {
    const keys = Object.keys(localStorage).filter(k => k.startsWith(CACHE_PREFIX));
    // Remover os mais antigos
    keys.slice(0, Math.floor(keys.length / 2)).forEach(k => localStorage.removeItem(k));
  } catch {}
}

// Divide texto HTML em blocos menores para evitar limite da API
function splitHtmlIntoChunks(html: string, maxChars = 4000): string[] {
  const chunks: string[] = [];
  // Dividir por parágrafos
  const paragraphs = html.split(/(<\/p>|<\/h[1-6]>|<\/blockquote>)/gi);
  let current = '';
  for (const p of paragraphs) {
    if ((current + p).length > maxChars && current) {
      chunks.push(current);
      current = p;
    } else {
      current += p;
    }
  }
  if (current) chunks.push(current);
  return chunks.filter(c => c.trim());
}

// Traduz um bloco de texto via Google Translate (API não oficial)
async function translateChunk(text: string, targetLang = 'pt'): Promise<string> {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Translation API error: ${response.status}`);
  const data = await response.json();
  // Reconstruir texto traduzido
  let translated = '';
  if (Array.isArray(data[0])) {
    for (const segment of data[0]) {
      if (segment && segment[0]) translated += segment[0];
    }
  }
  return translated;
}

// Traduz conteúdo HTML de um capítulo completo
export async function translateChapter(
  ebookId: string,
  chapterId: string,
  htmlContent: string,
  targetLang = 'pt',
  onProgress?: (pct: number) => void
): Promise<string> {
  const cacheKey = getCacheKey(ebookId, chapterId, targetLang);

  // Verificar cache
  const cached = getFromCache(cacheKey);
  if (cached) {
    onProgress?.(100);
    return cached;
  }

  // Dividir em blocos
  const chunks = splitHtmlIntoChunks(htmlContent);
  if (!chunks.length) return htmlContent;

  const translated: string[] = [];
  for (let i = 0; i < chunks.length; i++) {
    try {
      const result = await translateChunk(chunks[i], targetLang);
      translated.push(result);
    } catch {
      // Em caso de erro, manter original
      translated.push(chunks[i]);
    }
    onProgress?.(Math.round(((i + 1) / chunks.length) * 100));
    // Pequeno delay para não sobrecarregar a API
    if (i < chunks.length - 1) await new Promise(r => setTimeout(r, 200));
  }

  const result = translated.join('');
  saveToCache(cacheKey, result);
  return result;
}

// Verificar se uma tradução já está em cache
export function isTranslationCached(ebookId: string, chapterId: string, targetLang = 'pt'): boolean {
  return getFromCache(getCacheKey(ebookId, chapterId, targetLang)) !== null;
}

// Detectar idioma do texto
export function detectLanguage(text: string): string {
  // Heurística simples baseada em caracteres e palavras comuns
  const sample = text.slice(0, 500).toLowerCase();
  if (/\b(the|and|of|in|to|is|that|for|it|with)\b/.test(sample)) return 'en';
  if (/\b(le|la|les|de|du|et|en|un|une|pour)\b/.test(sample)) return 'fr';
  if (/\b(el|la|los|las|de|del|en|un|una|para)\b/.test(sample)) return 'es';
  if (/\b(et|in|est|non|sed|ad|cum|ut|qui|quod)\b/.test(sample)) return 'la';
  if (/\b(und|die|der|das|in|ist|von|mit|zu|auf)\b/.test(sample)) return 'de';
  if (/\b(e|o|a|os|as|de|do|da|em|um|uma|para|que)\b/.test(sample)) return 'pt';
  return 'unknown';
}

export const SUPPORTED_LANGUAGES: Record<string, string> = {
  en: 'Inglês',
  fr: 'Francês',
  es: 'Espanhol',
  la: 'Latim',
  de: 'Alemão',
  el: 'Grego',
  it: 'Italiano',
  pt: 'Português',
};
