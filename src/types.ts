export type UserRole = 'user' | 'admin';
export type UserStatus = 'pending' | 'approved' | 'blocked';

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
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
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
  }
}
