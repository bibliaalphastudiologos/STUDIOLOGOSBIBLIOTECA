import { safeStorage } from '../lib/safeStorage';
import type { Ebook, StudioChapter } from '../studioTypes';

const CACHE_PREFIX = 'sl_imported_ebook_v2_';
const START_MARKER = '*** START OF';
const END_MARKER = '*** END OF';
const REQUEST_TIMEOUT_MS = 45000;
const MIN_IMPORTED_TEXT_LENGTH = 2500;

function cacheKey(ebook: Ebook): string {
  return `${CACHE_PREFIX}${ebook.id}`;
}

function stripProjectGutenbergBoilerplate(text: string): string {
  const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const startIndex = normalized.indexOf(START_MARKER);
  const afterStart = startIndex >= 0
    ? normalized.slice(normalized.indexOf('\n', startIndex) + 1)
    : normalized;
  const endIndex = afterStart.indexOf(END_MARKER);
  const body = endIndex >= 0 ? afterStart.slice(0, endIndex) : afterStart;
  return body
    .replace(/\n{4,}/g, '\n\n\n')
    .replace(/[ \t]+\n/g, '\n')
    .trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Detects chapter / section headings.
 *
 * Intentionally conservative: only recognises patterns that are
 * unambiguously chapter markers, NOT generic all-caps lines (which
 * also appear on title pages, dedications, publisher info, etc.).
 */
function isLikelyHeading(line: string): boolean {
  const clean = line.trim();
  if (!clean || clean.length > 90) return false;

  // Standalone Roman numeral (I, II, IV, VIII, XLII, CXLVIII …) with optional period
  if (/^[IVXLCDM]{1,8}\.?$/.test(clean)) return true;

  // Keyword-led patterns: "Capítulo I", "Chapter 3", "Parte II", "Livro III", "Canto IV" …
  if (/^(cap[ií]tulo|chapter|lecture|parte?|livro|canto|acto?|cena|pr[oó]logo|ep[ií]logo|preface|introduction|epilogue)\b/i.test(clean)) return true;

  // Roman numeral followed by separator: "IV." / "IV—" / "IV — Título"
  if (/^[IVXLCDM]{1,8}[.\-–—\s]/.test(clean)) return true;

  // Numeric: "12." / "12 —" / "12 - Título"
  if (/^\d{1,3}[.\-–—\s]+[A-ZÁÉÍÓÚÀÂÊÔÃÕÇ]/u.test(clean)) return true;

  return false;
}

function estimateMinutes(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 210));
}

function paragraphHtml(block: string): string {
  return block
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => `<p>${escapeHtml(l)}</p>`)
    .join('\n');
}

/**
 * Splits plain text into chapters.
 *
 * Strategy:
 * 1. Accumulate content into the current chapter.
 * 2. When a heading is detected AND the current chapter already has
 *    content (blocks > 0), flush and start a new chapter.
 * 3. Peek at the line after the heading: if it is a short non-heading
 *    subtitle, absorb it into the chapter title ("I — Do título.").
 */
function splitIntoChapters(text: string, fallbackTitle: string): StudioChapter[] {
  const lines = text.split('\n');
  const chapters: Array<{ title: string; blocks: string[] }> = [];
  let current = { title: fallbackTitle, blocks: [] as string[] };
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    current.blocks.push(paragraph.join(' '));
    paragraph = [];
  };

  let i = 0;
  while (i < lines.length) {
    const clean = lines[i].trim();

    if (!clean) {
      flushParagraph();
      i++;
      continue;
    }

    if (isLikelyHeading(clean)) {
      if (current.blocks.length > 0) {
        // Save current chapter
        flushParagraph();
        chapters.push(current);

        // Peek at next non-blank line for subtitle
        let j = i + 1;
        while (j < lines.length && !lines[j].trim()) j++;
        const nextLine = lines[j]?.trim() ?? '';
        let subtitle = '';
        if (nextLine && !isLikelyHeading(nextLine) && nextLine.length < 80) {
          subtitle = nextLine;
          i = j; // consume subtitle line
        }

        current = { title: subtitle ? `${clean} — ${subtitle}` : clean, blocks: [] };
      } else {
        // No content yet — heading is part of front-matter, treat as text
        paragraph.push(clean);
      }
      i++;
      continue;
    }

    paragraph.push(clean);
    i++;
  }

  flushParagraph();
  chapters.push(current);

  // Filter out near-empty front-matter fragments
  const meaningful = chapters.filter(
    (ch) => ch.blocks.join(' ').trim().length > 80,
  );

  if (!meaningful.length) {
    return [{
      id: 'imported-1',
      title: fallbackTitle,
      content: paragraphHtml(text),
      estimatedMinutes: estimateMinutes(text),
    }];
  }

  return meaningful.map((ch, index) => ({
    id: `imported-${index + 1}`,
    title: ch.title,
    content: paragraphHtml(ch.blocks.join('\n\n')),
    estimatedMinutes: estimateMinutes(ch.blocks.join(' ')),
  }));
}

function readCache(ebook: Ebook): StudioChapter[] | null {
  const raw = safeStorage.getItem(cacheKey(ebook));
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { chapters?: StudioChapter[]; timestamp?: number };
    if (!parsed.chapters?.length) return null;
    return parsed.chapters;
  } catch {
    safeStorage.removeItem(cacheKey(ebook));
    return null;
  }
}

function writeCache(ebook: Ebook, chapters: StudioChapter[]): void {
  safeStorage.setItem(cacheKey(ebook), JSON.stringify({ chapters, timestamp: Date.now() }));
}

async function fetchText(url: string): Promise<{ ok: boolean; status: number; text: string }> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal });
    const text = response.ok ? await response.text() : '';
    return { ok: response.ok, status: response.status, text };
  } finally {
    window.clearTimeout(timer);
  }
}

function readableProxyUrl(url: string): string {
  return `https://r.jina.ai/${url}`;
}

function localProxyUrl(gutenbergId: string, url?: string): string {
  const params = new URLSearchParams({ id: gutenbergId });
  if (url) params.set('url', url);
  return `/api/gutenberg-proxy/index.php?${params.toString()}`;
}

function isUsableImportedText(text: string): boolean {
  const clean = stripProjectGutenbergBoilerplate(text);
  if (clean.length < MIN_IMPORTED_TEXT_LENGTH) return false;
  return clean.split(/\s+/).filter(Boolean).length > 350;
}

function buildUrlList(provider: string, providerId: string, textUrl?: string): string[] {
  const urls: string[] = [];
  if (textUrl) urls.push(textUrl);

  // Only generate Gutenberg URL patterns for numeric IDs
  if (provider === 'project_gutenberg' && /^\d+$/.test(providerId)) {
    const id = providerId;
    urls.push(
      `https://www.gutenberg.org/ebooks/${id}.txt.utf-8`,
      `https://www.gutenberg.org/ebooks/${id}.txt`,
      `https://www.gutenberg.org/cache/epub/${id}/pg${id}.txt`,
      `https://www.gutenberg.org/cache/epub/${id}/pg${id}-0.txt`,
      `https://www.gutenberg.org/cache/epub/${id}/${id}-0.txt`,
      `https://www.gutenberg.org/cache/epub/${id}/${id}.txt`,
      `https://www.gutenberg.org/files/${id}/${id}-0.txt`,
      `https://www.gutenberg.org/files/${id}/${id}.txt`,
    );
  }

  return [...new Set(urls)];
}

export async function loadImportedChapters(ebook: Ebook): Promise<StudioChapter[] | null> {
  if (!ebook.importSource?.textUrl && !ebook.importSource?.providerId) return null;

  const cached = readCache(ebook);
  if (cached) return cached;

  const { provider = 'project_gutenberg', providerId, textUrl } = ebook.importSource;
  const isGutenberg = provider === 'project_gutenberg' && /^\d+$/.test(providerId);
  const urls = buildUrlList(provider, providerId, textUrl);

  let raw = '';
  let lastStatus = 0;
  const attempted = new Set<string>();

  for (const url of urls) {
    const attempts: string[] = [];
    if (isGutenberg && !attempted.has(localProxyUrl(providerId))) attempts.push(localProxyUrl(providerId));
    attempts.push(readableProxyUrl(url));
    attempts.push(url);

    for (const attempt of attempts) {
      if (attempted.has(attempt)) continue;
      attempted.add(attempt);
      try {
        const response = await fetchText(attempt);
        lastStatus = response.status;
        if (response.ok && isUsableImportedText(response.text)) {
          raw = response.text;
          break;
        }
      } catch {
        lastStatus = 0;
      }
    }
    if (raw) break;
  }

  if (!raw) throw new Error(`Falha ao importar texto: ${lastStatus}`);

  const clean = stripProjectGutenbergBoilerplate(raw);
  const chapters = splitIntoChapters(clean, ebook.title);
  writeCache(ebook, chapters);
  return chapters;
}
