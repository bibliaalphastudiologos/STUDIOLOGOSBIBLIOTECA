import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from './firebase';
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

  useEffect(() => {
    let unsubProfile: (() => void) | null = null;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (unsubProfile) {
        unsubProfile();
        unsubProfile = null;
      }

      setUser(user);
      if (user) {
        const profileRef = doc(db, 'users', user.uid);
        const profileSnap = await getDoc(profileRef);

        if (!profileSnap.exists()) {
          const newProfile: UserProfile = {
            uid: user.uid,
            name: user.displayName || 'Usuário',
            email: user.email || '',
            photoURL: user.photoURL || '',
            role: user.email === 'analista.ericksilva@gmail.com' ? 'admin' : 'user',
            status: user.email === 'analista.ericksilva@gmail.com' ? 'approved' : 'pending',
            createdAt: new Date(),
            lastLoginAt: new Date(),
          };
          await setDoc(profileRef, newProfile);
          setProfile(newProfile);
        }

        unsubProfile = onSnapshot(profileRef, (doc) => {
          if (doc.exists()) {
            setProfile(doc.data() as UserProfile);
          }
          setLoading(false);
        }, (error) => {
          console.error("Profile snapshot error:", error);
          setLoading(false);
        });
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

  const isAdmin = !!user?.email && user.email.toLowerCase().trim() === 'analista.ericksilva@gmail.com';
  const isApproved = isAdmin || profile?.status === 'approved' || profile?.role === 'admin';
  const finalLoading = loading && !isAdmin;

  return (
    <AuthContext.Provider value={{ user, profile, loading: finalLoading, isAdmin, isApproved }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
