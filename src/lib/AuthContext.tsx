import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { auth, db, getRedirectResult } from './firebase';
import { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  isApproved: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
  isApproved: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // ── Tratar resultado de signInWithRedirect ao montar ──────────────────────
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log('Login Google (redirect) bem-sucedido:', result.user.email);
        }
      })
      .catch((error) => {
        // Erros de redirect são silenciosos — o onAuthStateChanged vai cuidar do estado
        console.error('Erro no resultado do redirect:', error?.code, error?.message);
      });
  }, []);

  // ── Listener principal de autenticação ────────────────────────────────────
  useEffect(() => {
    let unsubProfile: (() => void) | null = null;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // Limpa listener de perfil anterior
      if (unsubProfile) {
        unsubProfile();
        unsubProfile = null;
      }

      setUser(firebaseUser);

      if (firebaseUser) {
        const profileRef = doc(db, 'users', firebaseUser.uid);
        const profileSnap = await getDoc(profileRef);

        if (!profileSnap.exists()) {
          // Primeiro login — cria perfil
          const isAdminEmail = firebaseUser.email === 'analista.ericksilva@gmail.com';
          const newProfile: UserProfile = {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || 'Usuário',
            email: firebaseUser.email || '',
            photoURL: firebaseUser.photoURL || '',
            role: isAdminEmail ? 'admin' : 'user',
            status: isAdminEmail ? 'approved' : 'pending',
            createdAt: new Date(),
            lastLoginAt: new Date(),
          };
          await setDoc(profileRef, newProfile);
          setProfile(newProfile);
        } else {
          // Logins subsequentes — atualiza lastLoginAt
          try {
            await updateDoc(profileRef, { lastLoginAt: new Date() });
          } catch (e) {
            // Regra Firestore impede usuários comuns de atualizar outros campos,
            // mas lastLoginAt deve estar liberado pela regra de update.
            console.warn('Não foi possível atualizar lastLoginAt:', e);
          }
        }

        // Listener em tempo real para mudanças no perfil (ex.: admin aprovar)
        unsubProfile = onSnapshot(
          profileRef,
          (snap) => {
            if (snap.exists()) {
              setProfile(snap.data() as UserProfile);
            }
            setLoading(false);
          },
          (error) => {
            console.error('Erro no snapshot do perfil:', error);
            setLoading(false);
          }
        );
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
      if (unsubProfile) unsubProfile();
    };
  }, []);

  const isAdmin =
    !!user?.email && user.email.toLowerCase().trim() === 'analista.ericksilva@gmail.com';
  const isApproved =
    isAdmin || profile?.status === 'approved' || profile?.role === 'admin';
  const finalLoading = loading && !isAdmin;

  return (
    <AuthContext.Provider
      value={{ user, profile, loading: finalLoading, isAdmin, isApproved }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
