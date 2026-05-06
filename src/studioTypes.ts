export enum Category {
  PHILOSOPHY = 'Filosofia',
  THEOLOGY = 'Teologia',
  PSYCHOANALYSIS = 'Psicanálise',
  LITERATURE = 'Literatura',
  SPECIAL = 'Especial',
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
}

export interface Ebook {
  id: string;
  title: string;
  author: string;
  category: Category;
  language: string;
  originalLanguage: string;
  content: string;
  chapters?: Chapter[];
  coverColor: string;
  coverAccent: string;
  coverMark: string;
  coverEdition: string;
  coverImage?: string;
  isSpecial?: boolean;
  isPublicDomain?: boolean;
  link?: string;
}

export interface ReadingProgress {
  ebookId: string;
  scrollPosition: number;
}
