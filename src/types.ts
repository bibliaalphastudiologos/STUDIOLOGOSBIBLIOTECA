export type UserRole = 'user' | 'admin';
export type UserStatus = 'pending' | 'approved' | 'blocked';

export type ContentType = 'public_domain' | 'synthesis';
export type CopyrightStatus =
  | 'public_domain_verified'
  | 'summary_only'
  | 'licensed'
  | {
      isPublicDomain?: boolean;
      deathYear?: number;
      verifiedUnder?: string;
    };

export type MainCategory =
  | 'Teologia'
  | 'Filosofia'
  | 'Psicanálise'
  | 'Espiritualidade'
  | 'Literatura Brasileira'
  | 'Literatura Portuguesa'
  | 'História'
  | 'Humanidades'
  | 'Literatura';

export type SubcategoryTeologia =
  | 'Bíblia' | 'Comentários Bíblicos' | 'Doutrina Cristã' | 'História da Igreja'
  | 'Pais da Igreja' | 'Reforma Protestante' | 'Apologética' | 'Espiritualidade'
  | 'EBD' | 'Pregação' | 'Patrística' | 'Mística';

export type SubcategoryFilosofia =
  | 'Filosofia Clássica' | 'Filosofia Cristã' | 'Ética' | 'Metafísica'
  | 'Estoicismo' | 'Existencialismo' | 'Razão e Fé' | 'Sentido da Vida'
  | 'Filosofia Moderna' | 'Filosofia Contemporânea';

export type SubcategoryPsicanalise =
  | 'Freud' | 'Lacan' | 'Inconsciente' | 'Desejo' | 'Angústia'
  | 'Sintoma' | 'Sujeito' | 'Linguagem' | 'Cultura' | 'Clínica';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: any;
  approvedAt?: any;
  lastLoginAt: any;
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  estimatedMinutes?: number;
}

export interface ReaderFeatures {
  tableOfContents?: boolean;
  readingProgress?: boolean;
  fontSizeControl?: boolean;
  fontControl?: boolean;
  focusMode?: boolean;
  bookmarks?: boolean;
  notes?: boolean;
  highlights?: boolean;
  internalSearch?: boolean;
  search?: boolean;
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
  slug?: string;
  title: string;
  displayTitle?: string;
  fullTitle?: string;
  subtitle: string;
  category: MainCategory;
  subcategory: string;
  collection: string;
  brand: string;
  authorReference: string;
  workReference: string;
  originalWork?: string;
  yearPublished?: string;

  // Content type system
  contentType: string;
  contentTypeLabel?: 'public_domain' | 'synthesis';
  copyrightStatus?: CopyrightStatus;
  accessMode?: 'online_only';
  downloadAllowed?: false;
  fullTextAllowed?: boolean;
  isFree?: boolean;
  isPremium?: boolean;
  isFeatured?: boolean;
  isFromGutendex?: boolean;
  downloadUrl?: string;

  // Source info (for public domain)
  sourceApi?: string;
  sourceUrl?: string;
  sourceEdition?: string;
  importSource?: TechnicalImportSource;
  translator?: string;
  translationStatus?: string;
  publicDomainEvidence?: string;
  originalLanguage?: string;
  authorDeathYear?: number;

  level: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Introdutório';
  readingTime: string;
  estimatedReadTime?: string;
  featured?: boolean;
  isNew?: boolean;
  coverTheme: string;
  coverStyle?: string;
  cover?: string;
  description: string;
  learn: string[];
  recommendedFor: string[];
  chapters: Chapter[];
  editorialNotice: string;

  // Reader features
  readerFeatures?: ReaderFeatures;

  // Tags
  tags?: string[];
  chapterCount?: number;
  pageCount?: number;
}

export interface ReadingHistory {
  ebookId: string;
  readAt: string;
  progress: number;
  totalTime: number;
}

// Payment configuration
export const PAYMENT_LINKS = {
  studioLogosMonthly: 'https://mpago.la/1cFocZN',
  bibliaAlpha: 'https://mpago.la/1cFocZN',
  suporte: 'mailto:contato@studiologos.com.br',
} as const;

export const ADMIN_EMAIL = 'analista.ericksilva@gmail.com';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface ReadingStats {
  totalBooksRead?: number;
  totalReadingTime?: number;
  currentStreak?: number;
  longestStreak?: number;
  favoriteCategory?: string;
  lastReadDate?: any;
  totalRead: number;
  currentlyReading: number;
  favoritesCount: number;
  readingTime: number;
  lastReadAt: any;
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

// BookFilters for EbookFilters component
export interface BookFilters {
  category?: string;
  subcategory?: string;
  level?: string;
  searchTerm?: string;
  search?: string;
  minReadingTime?: number | null;
  maxReadingTime?: number | null;
  contentType?: string;
  tags?: string[];
  sortBy?: string;
  onlyFree?: boolean;
  author?: string;
  language?: string;
  yearFrom?: number | null;
  yearTo?: number | null;
  sortOrder?: 'asc' | 'desc' | string;
}
