export type UserRole = 'user' | 'admin';
export type UserStatus = 'pending' | 'approved' | 'blocked';

export type ContentType = 'public_domain' | 'synthesis';
export type CopyrightStatus = 'public_domain_verified' | 'summary_only' | 'licensed';

export type MainCategory = 'Teologia' | 'Filosofia' | 'Psicanálise' | 'Literatura Brasileira';

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
  tableOfContents: boolean;
  readingProgress: boolean;
  fontSizeControl: boolean;
  focusMode: boolean;
  bookmarks: boolean;
  notes: boolean;
  highlights: boolean;
  internalSearch: boolean;
}

export interface Ebook {
  id: string;
  slug?: string;
  title: string;
  displayTitle?: string;
  subtitle: string;
  category: MainCategory;
  subcategory: string;
  collection: string;
  brand: string;
  authorReference: string;
  workReference: string;

  // Content type system
  contentType: string;
  contentTypeLabel?: 'public_domain' | 'synthesis';
  copyrightStatus?: CopyrightStatus;
  accessMode?: 'online_only';
  downloadAllowed?: false;
  fullTextAllowed?: boolean;

  // Source info (for public domain)
  sourceApi?: string;
  sourceUrl?: string;
  sourceEdition?: string;
  translator?: string;
  translationStatus?: string;
  publicDomainEvidence?: string;
  originalLanguage?: string;
  authorDeathYear?: number;

  level: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Introdutório';
  readingTime: string;
  featured?: boolean;
  isNew?: boolean;
  coverTheme: string;
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
}

// Payment configuration
export const PAYMENT_LINKS = {
  studioLogosMonthly: 'https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=bcf17285bfd64b70b1892692538db1ed',
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
  totalBooksRead: number;
  totalReadingTime: number;
  currentStreak: number;
  longestStreak: number;
  favoriteCategory: string;
  lastReadDate: any;
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
  minReadingTime?: number;
  maxReadingTime?: number;
  contentType?: string;
  tags?: string[];
  sortBy?: string;
  onlyFree?: boolean;
  author?: string;
  language?: string;
  yearFrom?: number;
  yearTo?: number;
}
