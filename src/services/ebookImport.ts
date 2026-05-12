import { safeStorage } from '../lib/safeStorage';
import type { Ebook, StudioChapter } from '../studioTypes';

const CACHE_PREFIX = 'sl_imported_ebook_v2_';
const START_MARKER = '*** START OF';
const END_MARKER = '*** END OF';
const REQUEST_TIMEOUT_MS = 20000;
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

function isLikelyHeading(line: string): boolean {
  const clean = line.trim();
  if (clean.length < 3 || clean.length > 90) return false;
  if (/^(chapter|lecture|part|book|section|preface|introduction|cap[ií]tulo|livro|canto|acto|ato)\b/i.test(clean)) return true;
  if (/^[IVXLCDM]+[.\s\-–—]+[A-ZÁÉÍÓÚÀÂÊÔÃÕÇ]/u.test(clean)) return true;
  if (/^\d{1,2}[.\s\-–]+[A-ZÁÉÍÓÚÀÂÊÔÃÕÇ]/u.test(clean)) return true;
  return clean === clean.toUpperCase() && /[A-ZÁÉÍÓÚÀÂÊÔÃÕÇ]/u.test(clean) && clean.split(/\s+/).length <= 10;
}

function estimateMinutes(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(4, Math.ceil(words / 210));
}

function paragraphHtml(block: string): string {
  const lines = block
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.map((line) => `<p>${escapeHtml(line)}</p>`).join('\n');
}

function splitIntoChapters(text: string, fallbackTitle: string): StudioChapter[] {
  const lines = text.split('\n');
  const chapters: Array<{ title: string; blocks: string[] }> = [];
  let current = { title: 'Abertura editorial', blocks: [] as string[] };
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    current.blocks.push(paragraph.join(' '));
    paragraph = [];
  };

  for (const line of lines) {
    const clean = line.trim();
    if (!clean) {
      flushParagraph();
      continue;
    }

    if (isLikelyHeading(clean) && current.blocks.length > 2) {
      flushParagraph();
      chapters.push(current);
      current = { title: clean, blocks: [] };
      continue;
    }

    paragraph.push(clean);
  }

  flushParagraph();
  chapters.push(current);

  const meaningful = chapters
    .filter((chapter) => chapter.blocks.join(' ').length > 500);

  if (!meaningful.length) {
    return [{
      id: 'imported-1',
      title: fallbackTitle,
      content: paragraphHtml(text),
      estimatedMinutes: estimateMinutes(text),
    }];
  }

  return meaningful.map((chapter, index) => {
    const plain = chapter.blocks.join('\n\n');
    return {
      id: `imported-${index + 1}`,
      title: chapter.title,
      content: paragraphHtml(plain),
      estimatedMinutes: estimateMinutes(plain),
    };
  });
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
  safeStorage.setItem(cacheKey(ebook), JSON.stringify({
    chapters,
    timestamp: Date.now(),
  }));
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
  // Jina.ai reader — strips HTML navigation, returns clean markdown/text
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
  const words = clean.split(/\s+/).filter(Boolean).length;
  return words > 350;
}

function buildUrlList(
  provider: string,
  providerId: string,
  textUrl: string | undefined,
): string[] {
  const urls: string[] = [];

  if (textUrl) urls.push(textUrl);

  // Only generate Gutenberg URL patterns when the ID is numeric
  if (provider === 'project_gutenberg' && /^\d+$/.test(providerId)) {
    const id = providerId;
    urls.push(
      `https://www.gutenberg.org/cache/epub/${id}/pg${id}.txt`,
      `https://www.gutenberg.org/cache/epub/${id}/pg${id}-0.txt`,
      `https://www.gutenberg.org/cache/epub/${id}/${id}-0.txt`,
      `https://www.gutenberg.org/cache/epub/${id}/${id}.txt`,
      `https://www.gutenberg.org/files/${id}/${id}-0.txt`,
      `https://www.gutenberg.org/files/${id}/${id}.txt`,
    );
  }

  // Deduplicate
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

  for (const url of urls) {
    // For each candidate URL, build fetch attempts in order of preference:
    // 1. Local PHP proxy (only for real Gutenberg numeric IDs)
    // 2. Direct URL
    // 3. Jina.ai reader proxy (best for Wikisource HTML pages)
    const attempts: string[] = [];
    if (isGutenberg) attempts.push(localProxyUrl(providerId, url));
    attempts.push(url);
    attempts.push(readableProxyUrl(url));

    for (const attempt of attempts) {
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
