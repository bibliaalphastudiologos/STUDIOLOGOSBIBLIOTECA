import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db, loginWithGoogle, logout, processRedirectLogin } from '../services/firebase';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    processRedirectLogin();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (!firebaseUser) return;

      try {
        const userRef = doc(db, 'users', firebaseUser.uid);
        const existing = await getDoc(userRef);
        if (existing.exists()) {
          await setDoc(
            userRef,
            {
              nome: firebaseUser.displayName || 'Leitor StudioLogos',
              foto: firebaseUser.photoURL || '',
              updatedAt: serverTimestamp(),
            },
            { merge: true },
          );
          return;
        }

        await setDoc(
          userRef,
          {
            email: firebaseUser.email || '',
            nome: firebaseUser.displayName || 'Leitor StudioLogos',
            foto: firebaseUser.photoURL || '',
            status: 'pending',
            isAdmin: false,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          },
        );
      } catch (error) {
        console.warn('[StudioLogos Auth] Não foi possível sincronizar o perfil:', error);
      }
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login: loginWithGoogle,
      logout,
    }),
    [loading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
