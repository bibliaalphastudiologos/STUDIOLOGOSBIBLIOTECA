import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db, loginWithGoogle, logout, processRedirectLogin } from '../services/firebase';

interface AuthContextValue {
  user: User | null;
  profile: StudioLogosProfile | null;
  hasAccess: boolean;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

interface StudioLogosProfile {
  email: string;
  nome: string;
  foto: string;
  status: 'pending' | 'approved' | 'blocked';
  isAdmin?: boolean;
}

const ADMIN_EMAIL = 'analista.ericksilva@gmail.com';

const AuthContext = createContext<AuthContextValue>({
  user: null,
  profile: null,
  hasAccess: false,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<StudioLogosProfile | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    processRedirectLogin();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      setUser(firebaseUser);

      if (!firebaseUser) {
        setProfile(null);
        setHasAccess(false);
        setLoading(false);
        return;
      }

      try {
        const isAdmin = firebaseUser.email?.toLowerCase() === ADMIN_EMAIL;
        const userRef = doc(db, 'users', firebaseUser.uid);
        const existing = await getDoc(userRef);
        if (existing.exists()) {
          const existingProfile = existing.data() as StudioLogosProfile;
          const nextProfile: StudioLogosProfile = {
            email: existingProfile.email || firebaseUser.email || '',
            nome: firebaseUser.displayName || existingProfile.nome || 'Leitor StudioLogos',
            foto: firebaseUser.photoURL || existingProfile.foto || '',
            status: isAdmin ? 'approved' : existingProfile.status || 'pending',
            isAdmin: existingProfile.isAdmin === true || isAdmin,
          };

          await setDoc(
            userRef,
            {
              nome: nextProfile.nome,
              foto: nextProfile.foto,
              updatedAt: serverTimestamp(),
            },
            { merge: true },
          );
          setProfile(nextProfile);
          setHasAccess(nextProfile.status === 'approved' || nextProfile.isAdmin === true);
          return;
        }

        const newProfile: StudioLogosProfile = {
          email: firebaseUser.email || '',
          nome: firebaseUser.displayName || 'Leitor StudioLogos',
          foto: firebaseUser.photoURL || '',
          status: isAdmin ? 'approved' : 'pending',
          isAdmin,
        };

        await setDoc(
          userRef,
          {
            ...newProfile,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          },
        );
        setProfile(newProfile);
        setHasAccess(newProfile.status === 'approved' || newProfile.isAdmin === true);
      } catch (error) {
        console.warn('[StudioLogos Auth] Não foi possível sincronizar o perfil:', error);
        setProfile(null);
        setHasAccess(false);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      user,
      profile,
      hasAccess,
      loading,
      login: loginWithGoogle,
      logout,
    }),
    [hasAccess, loading, profile, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
