/**
 * Studio Logos — API Service
 * Integra Open Library, Internet Archive e Google Books
 * para buscar metadados e conteúdo de obras em domínio público.
 */

export interface BookMetadata {
  title: string;
  author: string;
  year?: number;
  description?: string;
  coverUrl?: string;
  subjects?: string[];
  source: 'open_library' | 'internet_archive' | 'google_books';
  sourceKey?: string;
  isPublicDomain?: boolean;
  language?: string;
}

export interface ArchiveTextContent {
  title: string;
  chapters: { id: string; title: string; content: string }[];
  source: string;
}

// ── Open Library ──────────────────────────────────────────────────────────────

export async function searchOpenLibrary(query: string, limit = 10): Promise<BookMetadata[]> {
  try {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${limit}&language=por`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Open Library request failed');
    const data = await res.json();
    return (data.docs || []).map((doc: any) => ({
      title: doc.title,
      author: doc.author_name?.[0] || 'Autor desconhecido',
      year: doc.first_publish_year,
      coverUrl: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg` : undefined,
      subjects: doc.subject?.slice(0, 5),
      source: 'open_library' as const,
      sourceKey: doc.key,
      isPublicDomain: doc.first_publish_year ? doc.first_publish_year < 1928 : false,
      language: 'pt',
    }));
  } catch (e) {
    console.warn('[APIService] Open Library error:', e);
    return [];
  }
}

export async function getOpenLibraryCover(coverId: string, size: 'S' | 'M' | 'L' = 'L'): Promise<string> {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

// ── Internet Archive ──────────────────────────────────────────────────────────

export async function searchInternetArchive(query: string, subject = 'theology', limit = 10): Promise<BookMetadata[]> {
  try {
    const url = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(query)}+AND+subject:${subject}&fl=identifier,title,creator,year,description,language&rows=${limit}&output=json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Internet Archive request failed');
    const data = await res.json();
    return (data.response?.docs || []).map((doc: any) => ({
      title: doc.title,
      author: doc.creator || 'Autor desconhecido',
      year: parseInt(doc.year) || undefined,
      description: doc.description,
      coverUrl: `https://archive.org/services/img/${doc.identifier}`,
      source: 'internet_archive' as const,
      sourceKey: doc.identifier,
      isPublicDomain: true,
      language: doc.language,
    }));
  } catch (e) {
    console.warn('[APIService] Internet Archive error:', e);
    return [];
  }
}

// ── Google Books ──────────────────────────────────────────────────────────────

export async function searchGoogleBooks(query: string, limit = 10): Promise<BookMetadata[]> {
  try {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=${limit}&langRestrict=pt`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Google Books request failed');
    const data = await res.json();
    return (data.items || []).map((item: any) => {
      const info = item.volumeInfo;
      return {
        title: info.title,
        author: info.authors?.[0] || 'Autor desconhecido',
        year: info.publishedDate ? parseInt(info.publishedDate) : undefined,
        description: info.description,
        coverUrl: info.imageLinks?.thumbnail?.replace('http:', 'https:'),
        subjects: info.categories,
        source: 'google_books' as const,
        sourceKey: item.id,
        isPublicDomain: info.accessInfo?.publicDomain === true,
        language: info.language,
      };
    });
  } catch (e) {
    console.warn('[APIService] Google Books error:', e);
    return [];
  }
}

// ── Verificador de Domínio Público ────────────────────────────────────────────

export function checkPublicDomainStatus(authorDeathYear?: number, country = 'BR'): {
  isPublicDomain: boolean;
  evidence: string;
  protectionUntil?: number;
} {
  if (!authorDeathYear) {
    return { isPublicDomain: false, evidence: 'Ano de falecimento desconhecido — verifique manualmente.' };
  }

  // Brazil: 70 years after death
  const brazilExpiry = authorDeathYear + 70;
  const currentYear = new Date().getFullYear();

  if (currentYear >= brazilExpiry) {
    return {
      isPublicDomain: true,
      evidence: `Autor faleceu em ${authorDeathYear}. Proteção expirou em ${brazilExpiry} (70 anos, Lei 9.610/98 — Brasil).`,
    };
  }

  return {
    isPublicDomain: false,
    evidence: `Autor faleceu em ${authorDeathYear}. Proteção vigente até ${brazilExpiry} no Brasil.`,
    protectionUntil: brazilExpiry,
  };
}

// ── Cache simples (memory) ─────────────────────────────────────────────────────
const cache = new Map<string, { data: any; ts: number }>();
const CACHE_TTL = 10 * 60 * 1000; // 10 min

export function withCache<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.ts < CACHE_TTL) return Promise.resolve(hit.data);
  return fn().then(data => {
    cache.set(key, { data, ts: Date.now() });
    return data;
  });
}
