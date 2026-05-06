import { BookFilters, ReadingStats, ReadingHistory } from './gutendex';

export interface Chapter {
  id: string;
  title: string;
  content: string;
}

export interface Ebook {
  id: string;
  title: string;
  subtitle: string;
  category: 'Teologia' | 'Filosofia' | 'Psicanálise';
  subcategory: string;
  collection: string;
  brand: string;
  authorReference: string;
  workReference: string;
  contentType: string;
  level: 'Introdutório' | 'Intermediário' | 'Avançado';
  readingTime: string;
  coverTheme: string;
  cover?: string;
  description: string;
  learn: string[];
  recommendedFor: string[];
  chapters: Chapter[];
  editorialNotice?: string;
  isFromGutendex?: boolean;
  downloadUrl?: string;
  isNew?: boolean;
}

export type { BookFilters, ReadingStats, ReadingHistory };