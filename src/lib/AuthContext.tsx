import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  login: async () => {},
  logout: async () => {},
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const userDoc = await getDoc(doc(db, 'users', u.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setIsAdmin(data.role === 'admin');
        }
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login = async () => {
    const { signInWithGoogle } = await import('./firebase');
    const { user: u, error } = await signInWithGoogle();
    if (error) throw new Error(error);
    if (u) {
      const userRef = doc(db, 'users', u.uid);
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        await setDoc(userRef, {
          uid: u.uid,
          name: u.displayName,
          email: u.email,
          photoURL: u.photoURL,
          role: u.email === 'analista.ericksilva@gmail.com' ? 'admin' : 'user',
          status: u.email === 'analista.ericksilva@gmail.com' ? 'approved' : 'pending',
          createdAt: new Date(),
          lastLoginAt: new Date(),
        });
        if (u.email === 'analista.ericksilva@gmail.com') setIsAdmin(true);
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};