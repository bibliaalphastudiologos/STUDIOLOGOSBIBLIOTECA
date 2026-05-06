export enum Category {
  PHILOSOPHY = 'Filosofia',
  THEOLOGY = 'Teologia',
  PSYCHOANALYSIS = 'Psicanálise',
  LITERATURE = 'Literatura',
  SPECIAL = 'Especial',
}

export interface Ebook {
  id: string;
  title: string;
  author: string;
  category: Category;
  language: string;
  originalLanguage: string;
  content: string;
  coverColor: string;
  coverImage?: string;
  isSpecial?: boolean;
  link?: string;
}

export interface ReadingProgress {
  ebookId: string;
  scrollPosition: number;
}
