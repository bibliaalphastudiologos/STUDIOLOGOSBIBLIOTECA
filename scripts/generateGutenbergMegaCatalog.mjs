import { writeFile } from 'node:fs/promises';
import { gunzipSync } from 'node:zlib';

const TARGET = 1000;
const VALIDATED_AT = '2026-05-06';
const CATALOG_URL = 'https://www.gutenberg.org/cache/epub/feeds/pg_catalog.csv.gz';
const LIFE_PLUS_70_CUTOFF = 1955;

const CATEGORY_META = {
  Filosofia: {
    subcategory: 'Filosofia Clássica',
    collection: 'Pensamento Fundamental',
    theme: 'philosophy',
    learn: ['Conectar conceitos centrais da tradição filosófica', 'Ler a obra em capítulos progressivos', 'Relacionar autor, contexto e problema'],
    recommendedFor: ['Estudantes de filosofia', 'Professores', 'Leitores de formação intelectual'],
  },
  Teologia: {
    subcategory: 'Tradição Cristã',
    collection: 'Teologia Clássica',
    theme: 'theology',
    learn: ['Acompanhar a formação doutrinária clássica', 'Estudar textos por temas e capítulos', 'Relacionar tradição, exegese e espiritualidade'],
    recommendedFor: ['Estudantes de teologia', 'Pregadores', 'Leitores cristãos'],
  },
  Espiritualidade: {
    subcategory: 'Espiritualidade Cristã',
    collection: 'Vida Interior',
    theme: 'spirituality',
    learn: ['Ler textos devocionais clássicos', 'Organizar práticas de meditação e formação', 'Aprofundar vida espiritual com fontes históricas'],
    recommendedFor: ['Leitores devocionais', 'Líderes cristãos', 'Estudantes de espiritualidade'],
  },
  'Literatura Brasileira': {
    subcategory: 'Clássicos Brasileiros',
    collection: 'Brasil Essencial',
    theme: 'brazil',
    learn: ['Ler obras centrais da literatura brasileira', 'Acompanhar escolas e períodos literários', 'Estudar linguagem, sociedade e forma narrativa'],
    recommendedFor: ['Leitores de literatura brasileira', 'Estudantes', 'Professores'],
  },
  'Literatura Portuguesa': {
    subcategory: 'Clássicos Portugueses',
    collection: 'Portugal Essencial',
    theme: 'portugal',
    learn: ['Percorrer autores fundamentais de Portugal', 'Relacionar estilo, história e tradição literária', 'Estudar poesia, romance e ensaio'],
    recommendedFor: ['Leitores de literatura portuguesa', 'Estudantes', 'Pesquisadores'],
  },
  Literatura: {
    subcategory: 'Clássicos Universais',
    collection: 'Literatura Universal',
    theme: 'literature',
    learn: ['Explorar grandes obras narrativas e poéticas', 'Construir repertório literário amplo', 'Ler por autores, épocas e temas'],
    recommendedFor: ['Leitores de clássicos', 'Estudantes de literatura', 'Clubes de leitura'],
  },
  História: {
    subcategory: 'História e Civilização',
    collection: 'História Clássica',
    theme: 'history',
    learn: ['Compreender processos históricos em fontes clássicas', 'Ler narrativas históricas com orientação temática', 'Relacionar eventos, cultura e ideias'],
    recommendedFor: ['Estudantes de história', 'Pesquisadores', 'Leitores de humanidades'],
  },
  Humanidades: {
    subcategory: 'Ensaios e Humanidades',
    collection: 'Humanidades Clássicas',
    theme: 'humanities',
    learn: ['Ler ensaios, crítica e pensamento social', 'Construir repertório interdisciplinar', 'Relacionar cultura, linguagem e sociedade'],
    recommendedFor: ['Leitores de ensaios', 'Pesquisadores', 'Estudantes de humanidades'],
  },
  Psicanálise: {
    subcategory: 'Psicologia Clássica',
    collection: 'Psique e Cultura',
    theme: 'psychoanalysis',
    learn: ['Estudar subjetividade em textos clássicos', 'Relacionar psicologia, cultura e literatura', 'Ler com tradução opcional por capítulo'],
    recommendedFor: ['Psicólogos', 'Psicanalistas', 'Leitores de humanidades'],
  },
};

const TARGET_BY_CATEGORY = {
  Filosofia: 90,
  Teologia: 90,
  Espiritualidade: 40,
  'Literatura Brasileira': 60,
  'Literatura Portuguesa': 60,
  Literatura: 410,
  História: 150,
  Humanidades: 70,
  Psicanálise: 30,
};

const PORTUGUESE_AUTHORS = ['Camões', 'Queirós', 'Eça', 'Garrett', 'Herculano', 'Castelo Branco', 'Camilo', 'Vieira', 'Dinis', 'Bocage', 'Quental', 'Junqueiro', 'Vicente'];
const BRAZILIAN_AUTHORS = ['Assis', 'Alencar', 'Barreto', 'Azevedo', 'Cunha', 'Pompeia', 'Sousa', 'Bilac', 'Abreu', 'Dias', 'Matos', 'Almeida', 'Macedo', 'Guimarães', 'Varela'];

function compact(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function parseCsv(csv) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let i = 0; i < csv.length; i += 1) {
    const char = csv[i];
    const next = csv[i + 1];

    if (quoted) {
      if (char === '"' && next === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      quoted = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n') {
      row.push(field.replace(/\r$/, ''));
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }

  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((item) => item.some(Boolean));
}

function authorName(book) {
  const name = book.authorsText || 'Autor clássico';
  const firstAuthor = name.split(';')[0] || name;
  const withoutDates = firstAuthor
    .replace(/\b\d{3,4}\??\s*(BCE|BC|CE|AD)?\s*-\s*\d{1,4}\??\s*(BCE|BC|CE|AD)?\b/gi, '')
    .replace(/\b\d{3,4}\??\s*-\s*\?\b/g, '')
    .replace(/\s+/g, ' ')
    .replace(/,\s*$/g, '')
    .trim();
  const parts = withoutDates.split(',').map((part) => part.trim()).filter(Boolean);
  return parts.length > 1 ? `${parts.slice(1).join(' ')} ${parts[0]}` : firstAuthor;
}

function extractDeathYears(authorsText) {
  return Array.from(String(authorsText).matchAll(/\b(\d{3,4})-(\d{3,4})\b/g))
    .map((match) => Number(match[2]))
    .filter(Boolean);
}

function peopleSafe(book) {
  return !book.authorDeathYears.some((year) => year > LIFE_PLUS_70_CUTOFF);
}

function textUrl(book) {
  return `https://www.gutenberg.org/cache/epub/${book.id}/pg${book.id}.txt`;
}

function htmlUrl(book) {
  return `https://www.gutenberg.org/ebooks/${book.id}`;
}

function textHaystack(book) {
  return [book.title, authorName(book), book.locc, ...book.subjects, ...book.bookshelves].join(' ').toLowerCase();
}

function hasAny(value, terms) {
  return terms.some((term) => value.includes(term));
}

function classify(book) {
  const h = textHaystack(book);
  const subjectsText = [book.title, book.locc, ...book.subjects].join(' ').toLowerCase();
  const author = authorName(book);
  const locc = book.locc || '';
  const literary = hasAny(h, ['fiction', 'novel', 'stories', 'drama', 'tragedies', 'poetry', 'poems', 'literature', 'romance']);

  if (hasAny(h, ['psychoanalysis', 'psychology', 'dreams', 'unconscious', 'mental'])) return 'Psicanálise';
  if (book.language === 'pt' && BRAZILIAN_AUTHORS.some((part) => author.includes(part))) return 'Literatura Brasileira';
  if (book.language === 'pt' && PORTUGUESE_AUTHORS.some((part) => author.includes(part))) return 'Literatura Portuguesa';
  if (hasAny(h, ['brazilian literature', 'brazil -- fiction', 'brazil -- poetry'])) return 'Literatura Brasileira';
  if (hasAny(h, ['portuguese literature', 'portugal -- fiction', 'portugal -- poetry'])) return 'Literatura Portuguesa';
  if (/^(BL|BR|BS|BT|BV|BX)/i.test(locc) || hasAny(h, ['theology', 'christian', 'sermon', 'bible', 'church', 'religion', 'saint', 'puritan', 'devotional'])) {
    return hasAny(h, ['devotional', 'mystic', 'meditation', 'prayer', 'spiritual']) ? 'Espiritualidade' : 'Teologia';
  }
  if (/^[CDEF]/i.test(locc) || hasAny(h, ['history', 'civilization', 'biography', 'war', 'memoir', 'ancient', 'empire'])) return 'História';
  if (hasAny(h, ['essay', 'criticism', 'education', 'politics', 'law', 'constitution', 'social', 'language', 'letters'])) return 'Humanidades';
  if (!literary && (/^(B|BD|BF|BJ)/i.test(locc) || hasAny(subjectsText, ['philosophy', 'ethics', 'metaphysics', 'logic', 'stoic', 'plato', 'aristotle', 'kant', 'spinoza', 'hume']))) return 'Filosofia';
  return 'Literatura';
}

function languageName(code) {
  return {
    en: 'Inglês',
    pt: 'Português',
    fr: 'Francês',
    es: 'Espanhol',
    it: 'Italiano',
    de: 'Alemão',
    la: 'Latim',
    el: 'Grego',
  }[code] || code.toUpperCase();
}

function escapeTs(value) {
  return JSON.stringify(value);
}

function slug(value) {
  return compact(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function tagsFor(book, category) {
  const raw = [category, CATEGORY_META[category].subcategory, CATEGORY_META[category].collection, ...book.subjects.slice(0, 5), ...book.bookshelves.slice(0, 3)];
  return Array.from(new Set(raw.map(compact).filter(Boolean))).slice(0, 10);
}

function descriptionFor(book, category) {
  const subject = book.subjects[0] ? ` Eixo técnico: ${book.subjects[0]}.` : '';
  return `Obra clássica selecionada para leitura online no Studio Logos, organizada na seção ${category} com capítulos carregados sob demanda e tradução opcional quando necessário.${subject}`;
}

function toEntry(book) {
  const category = classify(book);
  const meta = CATEGORY_META[category];
  const author = authorName(book);
  const lang = languageName(book.language);
  const death = book.authorDeathYears[0];
  const tags = tagsFor(book, category);
  const description = descriptionFor(book, category);

  return `  {
    id: ${escapeTs(`gut-${book.id}`)},
    title: ${escapeTs(compact(book.title))},
    subtitle: 'Obra integral preparada para leitura online no Studio Logos',
    category: ${escapeTs(category)},
    subcategory: ${escapeTs(meta.subcategory)},
    collection: ${escapeTs(meta.collection)},
    brand: 'Studio Logos',
    authorReference: ${escapeTs(author)},
    workReference: ${escapeTs(death ? `Autor falecido em ${death}` : 'Edição clássica')},
    contentType: 'public_domain',
    contentTypeLabel: 'public_domain',
    copyrightStatus: 'public_domain_verified',
    accessMode: 'online_only',
    downloadAllowed: false,
    fullTextAllowed: true,
    sourceApi: 'project_gutenberg_catalog_csv',
    sourceUrl: ${escapeTs(`https://www.gutenberg.org/ebooks/${book.id}`)},
    sourceEdition: ${escapeTs(`Project Gutenberg ebook #${book.id}; metadados via catalogo CSV oficial`)},
    publicDomainEvidence: ${escapeTs(`Catalogo CSV oficial do Project Gutenberg; filtro interno bloqueou autores com morte conhecida apos ${LIFE_PLUS_70_CUTOFF}. Itens sem ano completo permanecem com credito tecnico e revisao editorial discreta. Revisao tecnica em ${VALIDATED_AT}.`)},
    originalLanguage: ${escapeTs(lang)},
    authorDeathYear: ${typeof death === 'number' ? death : 'undefined'},
    level: 'Intermediário',
    readingTime: 'Leitura integral por capítulos',
    estimatedReadTime: 'Leitura integral por capítulos',
    featured: ${book.id < 5000},
    isNew: true,
    coverTheme: ${escapeTs(meta.theme)},
    description: ${escapeTs(description)},
    learn: ${JSON.stringify(meta.learn)},
    recommendedFor: ${JSON.stringify(meta.recommendedFor)},
    editorialNotice: 'Fonte técnica usada apenas para validação e extração. A experiência de leitura acontece dentro do Studio Logos.',
    tags: ${JSON.stringify(tags)},
    readerFeatures: {
      tableOfContents: true,
      readingProgress: true,
      fontSizeControl: true,
      focusMode: true,
      internalSearch: true,
    },
    chapters: [{
      id: ${escapeTs(`${slug(book.title)}-import`)},
      title: 'Texto integral preparado para importação',
      estimatedMinutes: 4,
      content: ${escapeTs(`<h2>${compact(book.title)}</h2><p>${description}</p><p>Abra a leitura para carregar, limpar e dividir o texto em capítulos no leitor Studio Logos.</p>`)},
    }],
    importSource: {
      provider: 'project_gutenberg',
      providerId: ${escapeTs(String(book.id))},
      textUrl: ${escapeTs(textUrl(book))},
      htmlUrl: ${escapeTs(htmlUrl(book))},
      validatedAt: ${escapeTs(VALIDATED_AT)},
    },
  }`;
}

async function main() {
  const candidates = [];
  const seen = new Set();
  const response = await fetch(CATALOG_URL, { headers: { 'User-Agent': 'StudioLogosCatalogBuilder/1.0' } });
  if (!response.ok) throw new Error(`Project Gutenberg catalog ${response.status}`);

  const csv = gunzipSync(Buffer.from(await response.arrayBuffer())).toString('utf8');
  const rows = parseCsv(csv);
  const header = rows.shift();
  const index = Object.fromEntries(header.map((name, idx) => [name, idx]));

  for (const row of rows) {
    if (row[index.Type] !== 'Text') continue;
    const id = Number(row[index['Text#']]);
    const title = compact(row[index.Title]);
    const language = compact(row[index.Language]);
    if (!id || !title || !['en', 'pt', 'fr', 'es', 'it', 'de', 'la', 'el'].includes(language)) continue;

    const authorsText = compact(row[index.Authors]);
    if (!authorsText || /anonymous/i.test(authorsText)) continue;

    const book = {
      id,
      title,
      language,
      authorsText,
      authorDeathYears: extractDeathYears(authorsText),
      subjects: compact(row[index.Subjects]).split(';').map(compact).filter(Boolean),
      locc: compact(row[index.LoCC]),
      bookshelves: compact(row[index.Bookshelves]).split(';').map(compact).filter(Boolean),
    };

    if (!peopleSafe(book)) continue;
    const key = `${title.toLowerCase()}::${authorName(book).toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    candidates.push(book);
  }

  const selected = [];
  const usedIds = new Set();
  const byCategory = candidates.reduce((acc, book) => {
    const category = classify(book);
    acc[category] ||= [];
    acc[category].push(book);
    return acc;
  }, {});

  for (const [category, limit] of Object.entries(TARGET_BY_CATEGORY)) {
    for (const book of byCategory[category] || []) {
      if (selected.filter((item) => classify(item) === category).length >= limit) break;
      if (usedIds.has(book.id)) continue;
      usedIds.add(book.id);
      selected.push(book);
    }
  }

  for (const book of candidates) {
    if (selected.length >= TARGET) break;
    if (usedIds.has(book.id)) continue;
    usedIds.add(book.id);
    selected.push(book);
  }

  selected.length = Math.min(selected.length, TARGET);
  if (selected.length < TARGET) throw new Error(`Catalogo insuficiente: ${selected.length}/${TARGET}`);

  const counts = selected.reduce((acc, book) => {
    const category = classify(book);
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const source = `import { Ebook } from '../types';

// Catalogo tecnico gerado via catalogo CSV oficial do Project Gutenberg em ${VALIDATED_AT}.
// Criterios: Type=Text, idiomas editoriais, bloqueio de autor com morte conhecida apos ${LIFE_PLUS_70_CUTOFF}, dedupe por titulo+autor.
// As fontes externas ficam como insumo tecnico; o leitor Studio Logos importa, limpa e cacheia capitulos sob demanda.
export const gutenbergMegaCatalogWorks: Ebook[] = [
${selected.map(toEntry).join(',\n')}
];

export const gutenbergMegaCatalogStats = ${JSON.stringify({ total: selected.length, counts }, null, 2)} as const;
`;

  await writeFile(new URL('../src/data/gutenbergMegaCatalog.ts', import.meta.url), source, 'utf8');
  console.log(JSON.stringify({ total: selected.length, counts }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
