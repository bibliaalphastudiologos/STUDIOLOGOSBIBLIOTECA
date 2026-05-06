import type { User } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const PROGRESS_DOC = 'studiologos-ebook-progress';

export interface EbookProgressState {
  page?: number;
  chapterIndex?: number;
  chapterId?: string;
  progress?: number;
  ebookId?: string;
  updatedAt?: unknown;
}

export async function loadEbookProgress(user: User, ebookId: string): Promise<EbookProgressState | null> {
  const ref = doc(db, 'users', user.uid, 'notes', PROGRESS_DOC);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;

  const data = snap.data() as { ebooks?: Record<string, EbookProgressState> };
  return data.ebooks?.[ebookId] || null;
}

export async function saveEbookProgress(
  user: User,
  ebookId: string,
  progress: EbookProgressState,
): Promise<void> {
  const ref = doc(db, 'users', user.uid, 'notes', PROGRESS_DOC);
  await setDoc(
    ref,
    {
      ebooks: {
        [ebookId]: {
          ...progress,
          ebookId,
          updatedAt: serverTimestamp(),
        },
      },
      source: 'studiologos',
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}
