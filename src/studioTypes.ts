export enum Category {
  PHILOSOPHY = 'Filosofia',
  THEOLOGY = 'Teologia',
  CHRISTIAN_SPIRITUALITY = 'Espiritualidade Cristã',
  PSYCHOANALYSIS = 'Psicanálise',
  BRAZILIAN_LITERATURE = 'Literatura Brasileira',
  PORTUGUESE_LITERATURE = 'Literatura Portuguesa',
  UNIVERSAL_LITERATURE = 'Literatura Clássica Universal',
  HISTORY = 'História',
  HUMANITIES = 'Ensaios e Humanidades',
  LITERATURE = 'Literatura',
  SPECIAL = 'Especial',
}

export type LicenseStatus = 'verified' | 'review' | 'summary_only' | 'licensed';
export type PublicationStatus = 'published' | 'review' | 'draft';

export interface StudioChapter {
  id: string;
  title: string;
  content: string;
  estimatedMinutes: number;
}

export interface TechnicalImportSource {
  provider: 'project_gutenberg' | 'wikisource' | 'internet_archive' | 'manual_review';
  providerId: string;
  textUrl?: string;
  htmlUrl?: string;
  validatedAt: string;
}

export interface Ebook {
  id: string;
  slug: string;
  title: string;
  author: string;
  category: Category;
  subcategory: string;
  collection: string;
  language: string;
  originalLanguage: string;
  approximateYear: string;
  content: string;
  description: string;
  longDescription: string;
  authorContext: string;
  chapters: StudioChapter[];
  tags: string[];
  sourceName: string;
  sourceUrl: string;
  sourceEdition: string;
  importSource?: TechnicalImportSource;
  licenseStatus: LicenseStatus;
  licenseNote: string;
  reviewStatus: 'validated' | 'needs-review' | 'editorial-only';
  publicationStatus: PublicationStatus;
  estimatedReadTime: string;
  translationAvailable: boolean;
  coverColor: string;
  coverAccent: string;
  coverMark: string;
  coverEdition: string;
  coverImage?: string;
  isSpecial?: boolean;
  link?: string;
}

export interface ReadingProgress {
  ebookId: string;
  scrollPosition: number;
}
