// ─── Translation Service — Studio Logos ──────────────────────────────────────
// Tradução por capítulo. Quando VITE_TRANSLATION_ENDPOINT estiver configurado,
// o endpoint deve usar Google Cloud Translation e cache compartilhado por
// obra/capítulo/idioma. Sem endpoint, o front mantém cache local e preserva o
// fluxo de leitura sem travar a plataforma.

import { safeStorage } from './safeStorage';

const CACHE_PREFIX = 'sl_translation_';
const CACHE_VERSION = 'v1';

function getCacheKey(ebookId: string, chapterId: string, targetLang: string): string {
  return `${CACHE_PREFIX}${CACHE_VERSION}_${ebookId}_${chapterId}_${targetLang}`;
}

function getTextCacheKey(scopeId: string, fieldId: string, targetLang: string): string {
  return `${CACHE_PREFIX}${CACHE_VERSION}_text_${scopeId}_${fieldId}_${targetLang}`;
}

function getFromCache(key: string): string | null {
  try {
    const raw = safeStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Cache válido por 30 dias
    if (Date.now() - parsed.timestamp > 30 * 24 * 60 * 60 * 1000) {
      safeStorage.removeItem(key);
      return null;
    }
    return parsed.text;
  } catch {
    return null;
  }
}

function saveToCache(key: string, text: string): void {
  try {
    safeStorage.setItem(key, JSON.stringify({ text, timestamp: Date.now() }));
  } catch {
    // localStorage cheio — limpar cache antigo
    clearOldCache();
  }
}

function clearOldCache(): void {
  try {
    const keys = safeStorage.keys().filter(k => k.startsWith(CACHE_PREFIX));
    // Remover os mais antigos
    keys.slice(0, Math.floor(keys.length / 2)).forEach(k => safeStorage.removeItem(k));
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

async function translateViaConfiguredEndpoint(
  ebookId: string,
  itemId: string,
  content: string,
  targetLang: string,
  format: 'html' | 'text' = 'html',
): Promise<string | null> {
  const endpoint = import.meta.env.VITE_TRANSLATION_ENDPOINT;
  if (!endpoint) return null;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ebookId,
      chapterId: itemId,
      fieldId: itemId,
      sourceLanguage: 'auto',
      targetLanguage: targetLang,
      format,
      content,
    }),
  });

  if (!response.ok) throw new Error(`Translation endpoint error: ${response.status}`);
  const data = await response.json() as { translatedHtml?: string; translatedText?: string; text?: string };
  return data.translatedHtml || data.translatedText || data.text || null;
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

  const endpointResult = await translateViaConfiguredEndpoint(ebookId, chapterId, htmlContent, targetLang, 'html');
  if (endpointResult) {
    saveToCache(cacheKey, endpointResult);
    onProgress?.(100);
    return endpointResult;
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

// Traduz textos curtos de interface editorial: título, descrição e sumário.
// Usa cache separado para evitar retraduzir metadados sempre que o leitor abre.
export async function translateText(
  scopeId: string,
  fieldId: string,
  text: string,
  targetLang = 'pt',
): Promise<string> {
  const normalized = text.trim();
  if (!normalized) return text;

  const cacheKey = getTextCacheKey(scopeId, fieldId, targetLang);
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  try {
    const endpointResult = await translateViaConfiguredEndpoint(scopeId, fieldId, normalized, targetLang, 'text');
    if (endpointResult) {
      saveToCache(cacheKey, endpointResult);
      return endpointResult;
    }
  } catch {
    // O fallback abaixo mantém a experiência funcionando mesmo sem endpoint próprio.
  }

  try {
    const translated = await translateChunk(normalized, targetLang);
    const result = translated.trim() || text;
    saveToCache(cacheKey, result);
    return result;
  } catch {
    return text;
  }
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
