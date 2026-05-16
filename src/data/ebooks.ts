import { Ebook } from '../types';
import { GutendexService } from '../lib/gutendex';
import { additionalWorks } from './additionalWorks';
import { brazilianLiteratureWorks } from './brazilianLiterature';
import { publicDomainWorks } from './publicDomainWorks';

function dedupeEbooks(ebooks: Ebook[]): Ebook[] {
  const seen = new Set<string>();
  const unique: Ebook[] = [];
  for (const ebook of ebooks) {
    const key = ebook.id || `${ebook.title}-${ebook.authorReference}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(ebook);
  }
  return unique;
}

export const DEMO_EBOOKS: Ebook[] = dedupeEbooks([
  ...publicDomainWorks,
  ...additionalWorks,
  ...brazilianLiteratureWorks,
]);

export async function getAllEbooks(
  category?: 'Filosofia' | 'Psicanálise' | 'Teologia'
): Promise<Ebook[]> {
  try {
    if (category) {
      const response = await GutendexService.fetchByCategory(category);
      const converted = response.results.map(book =>
        GutendexService.convertToEbook(book, category)
      ) as Ebook[];
      const demoFiltered = DEMO_EBOOKS.filter(e => e.category === category);
      const all = [...converted, ...demoFiltered];
      const seen = new Set<string>();
      const unique: Ebook[] = [];
      for (const ebook of all) {
        const key = `${ebook.title.toLowerCase().trim()}-${ebook.authorReference.toLowerCase().trim()}`;
        if (!seen.has(key)) { seen.add(key); unique.push(ebook); }
      }
      return unique;
    }
    const response = await GutendexService.searchBooks('');
    const converted = response.results.map(book =>
      GutendexService.convertToEbook(book, 'Filosofia')
    ) as Ebook[];
    return [...converted, ...DEMO_EBOOKS];
  } catch (error) {
    console.warn('Falha ao buscar Gutendex, usando apenas DEMO:', error);
    return DEMO_EBOOKS;
  }
}

export async function searchEbooks(query: string, category?: string): Promise<Ebook[]> {
  try {
    const response = await GutendexService.searchBooks(query);
    const converted = response.results.map(book =>
      GutendexService.convertToEbook(book, 'Filosofia')
    ) as Ebook[];
    if (category && category !== 'Todos') {
      return converted.filter(e => e.category === category);
    }
    return converted;
  } catch (error) {
    console.warn('Erro na busca Gutendex:', error);
    return DEMO_EBOOKS.filter(e =>
      !query || e.title.toLowerCase().includes(query.toLowerCase())
    );
  }
}

export async function getEbookById(id: string): Promise<Ebook | null> {
  if (id.startsWith('gutendex-')) {
    const gutendexId = Number(id.replace('gutendex-', ''));
    const book = await GutendexService.getBook(gutendexId);
    if (book) {
      const category = inferCategory(book.subjects);
      return GutendexService.convertToEbook(book, category) as Ebook;
    }
    return null;
  }
  return DEMO_EBOOKS.find(e => e.id === id) || null;
}

function inferCategory(subjects: string[]): 'Filosofia' | 'Psicanálise' | 'Teologia' {
  const text = subjects.join(' ').toLowerCase();
  if (text.includes('theology') || text.includes('religion') || text.includes('church')) return 'Teologia';
  if (text.includes('philosophy') || text.includes('metaphysic') || text.includes('ethics')) return 'Filosofia';
  if (text.includes('psychoanalysis') || text.includes('psychology')) return 'Psicanálise';
  return 'Filosofia';
}
