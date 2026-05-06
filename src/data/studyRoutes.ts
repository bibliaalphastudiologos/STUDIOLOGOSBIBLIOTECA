import { Category } from '../studioTypes';

export interface StudyRoute {
  id: string;
  title: string;
  eyebrow: string;
  category: Category;
  term: string;
  description: string;
  steps: string[];
}

export const STUDY_ROUTES: StudyRoute[] = [
  {
    id: 'metafisica-existencia',
    title: 'Metafísica & Existência',
    eyebrow: 'Roteiro filosófico',
    category: Category.PHILOSOPHY,
    term: 'metaphysics',
    description: 'Da pergunta pelo ser à formação da vida interior e da razão.',
    steps: ['Conceitos fundamentais', 'Ser, substância e causa', 'Ética da vida boa'],
  },
  {
    id: 'tradicao-dogma',
    title: 'Tradição & Dogma',
    eyebrow: 'Roteiro teológico',
    category: Category.THEOLOGY,
    term: 'christian',
    description: 'Patrística, doutrina, igreja e grandes textos de formação cristã.',
    steps: ['Pais e doutores', 'Doutrina e Escritura', 'Pregação e apologética'],
  },
  {
    id: 'vida-interior',
    title: 'Vida Interior',
    eyebrow: 'Espiritualidade cristã',
    category: Category.CHRISTIAN_SPIRITUALITY,
    term: 'prayer',
    description: 'Leituras devocionais, oração, meditação e disciplina espiritual.',
    steps: ['Oração', 'Meditação', 'Formação do caráter'],
  },
  {
    id: 'classicos-brasil',
    title: 'Brasil Essencial',
    eyebrow: 'Literatura brasileira',
    category: Category.BRAZILIAN_LITERATURE,
    term: 'brazil',
    description: 'Autores e obras para ler o Brasil por dentro de sua linguagem.',
    steps: ['Romance urbano', 'Crítica social', 'Poesia e identidade'],
  },
  {
    id: 'portugal-essencial',
    title: 'Portugal Essencial',
    eyebrow: 'Literatura portuguesa',
    category: Category.PORTUGUESE_LITERATURE,
    term: 'portuguese',
    description: 'A tradição portuguesa em poesia, romance, sermão e ensaio.',
    steps: ['Épica e língua', 'Romance oitocentista', 'Sermão e crítica'],
  },
  {
    id: 'psique-cultura',
    title: 'Psique & Cultura',
    eyebrow: 'Psicanálise e psicologia',
    category: Category.PSYCHOANALYSIS,
    term: 'psychology',
    description: 'Textos clássicos para estudar sonho, desejo, sujeito e cultura.',
    steps: ['Sonhos e inconsciente', 'Família e linguagem', 'Cultura e sintoma'],
  },
  {
    id: 'historia-civilizacao',
    title: 'História & Civilização',
    eyebrow: 'Roteiro histórico',
    category: Category.HISTORY,
    term: 'history',
    description: 'Narrativas históricas, biografias e formação das civilizações.',
    steps: ['Mundo antigo', 'Impérios e revoluções', 'Biografias intelectuais'],
  },
  {
    id: 'humanidades-ensaio',
    title: 'Ensaios & Humanidades',
    eyebrow: 'Roteiro humanístico',
    category: Category.HUMANITIES,
    term: 'essay',
    description: 'Crítica, educação, política, linguagem e pensamento social.',
    steps: ['Crítica literária', 'Educação e sociedade', 'Política e linguagem'],
  },
];
