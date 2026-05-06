import { Ebook } from '../types';
import { GutendexService } from '../lib/gutendex';

// Dados demo como fallback e complemento
export const DEMO_EBOOKS: Ebook[] = [
  {
    id: 'demo-1',
    title: 'A Ética a Nicômaco',
    subtitle: '',
    category: 'Filosofia',
    subcategory: 'Ética',
    collection: 'Clássicos da Filosofia',
    brand: 'Studio Logos',
    authorReference: 'Aristóteles',
    workReference: 'Ética',
    contentType: 'Síntese',
    level: 'Avançado',
    readingTime: '45 min de leitura',
    coverTheme: 'navy',
    cover: 'https://www.gutenberg.org/covers/6763.jpg',
    description: 'Síntese da obra-prima de Aristóteles sobre ética e virtude. Análise detalhada dos conceitos de felicidade, justiça e vida boa.',
    learn: [
      'Compreender a virtude como meio-termo',
      'Analisar a relação entre ética e política',
      'Dominar a noção de eudaimonia',
    ],
    recommendedFor: ['Estudantes de filosofhia', 'Pesquisadores', 'Professores'],
    chapters: [],
    editorialNotice: 'Obra de domínio público disponibilizada gratuitamente através do Project Gutenberg.',
  },
  {
    id: 'demo-2',
    title: 'Assim Falou Zaratustra',
    subtitle: 'Um Livro para Todos e para Ninguém',
    category: 'Filosofia',
    subcategory: 'Existencialismo',
    collection: 'Nietzsche Integral',
    brand: 'Studio Logos',
    authorReference: 'Friedrich Nietzsche',
    workReference: 'Filosofia do eterno retorno',
    contentType: 'Análise',
    level: 'Intermediário',
    readingTime: '60 min de leitura',
    coverTheme: 'burgundy',
    cover: 'https://www.gutenberg.org/covers/1998.jpg',
    description: 'Estudo aprofundado da obra mais famosa de Nietzsche. Explicação do super-homem, da morte de Deus e da vontade de poder.',
    learn: [
      'Compreender a crítica nietzschiana à moral',
      'Diferenciar último homem e super-homem',
      'Aplicar o eterno retorno como ética',
    ],
    recommendedFor: ['Filósofos', 'Psicólogos', 'Sociólogos'],
    chapters: [],
    editorialNotice: 'Baseado em texto de domínio público, disponibilizado gratuitamente.',
  },
  {
    id: 'demo-3',
    title: 'O Processo',
    subtitle: '',
    category: 'Psicanálise',
    subcategory: 'Literatura Psicológica',
    collection: 'Kafka Essencial',
    brand: 'Studio Logos',
    authorReference: 'Franz Kafka',
    workReference: 'Alienação moderna e burocracia',
    contentType: 'Interpretação',
    level: 'Introdutório',
    readingTime: '40 min de leitura',
    coverTheme: 'burgundy',
    cover: 'https://www.gutenberg.org/covers/784.jpg',
    description: 'Análise do processo burocrático e da alienação moderna na obra de Kafka. Conexões com a teoria psicanalítica.',
    learn: [
      'Interpretar símbolos oníricos kafkianos',
      'Entender a burocracia como sintoma social',
      'Relacionar Kafka com a psicanálise',
    ],
    recommendedFor: ['Psicanalistas', 'Literatos', 'Sociólogos'],
    chapters: [],
    editorialNotice: 'Texto base domínio público, disponível gratuitamente.'
  },
];

/**
 * Obtém ebooks combinando Gutendex + DEMO
 */
export async function getAllEbooks(
  category?: 'Filosofia' | 'Psicanálise' | 'Teologia'
): Promise<Ebook[]> {
  try {
    // Tenta buscar da Gutendex
    if (category) {
      const response = await GutendexService.fetchByCategory(category);
      const converted = response.results.map(book =>
        GutendexService.convertToEbook(book, category)
      ) as Ebook[];

      // Mescla com DEMO (evita duplicatas por título+autor)
      const demoFiltered = DEMO_EBOOKS.filter(e => e.category === category);
      const all = [...converted, ...demoFiltered];

      // Deduplica (mantém Gutendex se houver conflito)
      const seen = new Set<string>();
      const unique: Ebook[] = [];
      for (const ebook of all) {
        const key = `${ebook.title.toLowerCase().trim()}-${ebook.authorReference.toLowerCase().trim()}`;
        if (!seen.has(key)) {
          seen.add(key);
          unique.push(ebook);
        }
      }

      return unique;
    }

    // Sem categoria: busca todos
    const response = await GutendexService.searchBooks('');
    const converted = response.results.map(book =>
      GutendexService.convertToEbook(book, 'Filosofia') // categoria padrão, será ajustada
    ) as Ebook[];

    return [...converted, ...DEMO_EBOOKS];
  } catch (error) {
    console.warn('Falha ao buscar Gutendex, usando apenas DEMO:', error);
    return DEMO_EBOOKS;
  }
}

/**
 * Busca ebooks com filtros
 */
export async function searchEbooks(
  query: string,
  category?: string
): Promise<Ebook[]> {
  try {
    const response = await GutendexService.searchBooks(query);
    const converted = response.results.map(book =>
      GutendexService.convertToEbook(book, 'Filosofia')
    ) as Ebook[];

    // Filtra por categoria se especificada
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

/**
 * Obtém um ebook específico por ID (pode ser Gutendex ou demo)
 */
export async function getEbookById(id: string): Promise<Ebook | null> {
  // Verifica se é Gutendex
  if (id.startsWith('gutendex-')) {
    const gutendexId = Number(id.replace('gutendex-', ''));
    const book = await GutendexService.getBook(gutendexId);
    if (book) {
      // Inferir categoria a partir dos subjects
      const category = inferCategory(book.subjects);
      return GutendexService.convertToEbook(book, category) as Ebook;
    }
    return null;
  }

  // Demo
  return DEMO_EBOOKS.find(e => e.id === id) || null;
}

/**
 * Infere categoria a partir dos subjects do Gutendex
 */
function inferCategory(subjects: string[]): 'Filosofia' | 'Psicanálise' | 'Teologia' {
  const text = subjects.join(' ').toLowerCase();

  if (text.includes('philosophy') || text.includes('metaphysic') || text.includes('ethics')) {
    return 'Filosofia';
  }
  if (text.includes('psychoanalysis') || text.includes('psychology') || text.includes('consciousness')) {
    return 'Psicanálise';
  }
  if (text.includes('theology') || text.includes('religion') || text.includes('church')) {
    return 'Teologia';
  }

  return 'Filosofia'; // padrão
}
