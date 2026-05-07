import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { Timestamp, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db, loginWithGoogle, logout, processRedirectLogin } from '../services/firebase';
import { getAnnualExpirationDate, getBrasiliaDateString } from '../lib/brasiliaDate';

interface AuthContextValue {
  user: User | null;
  profile: StudioLogosProfile | null;
  hasAccess: boolean;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export interface StudioLogosProfile {
  email: string;
  nome: string;
  foto: string;
  status: 'pending' | 'approved' | 'blocked';
  isAdmin?: boolean;
  approvedAt?: unknown;
  approvalDateBrasilia?: string;
  subscriptionExpiresAt?: unknown;
  planPrice?: string;
  planPeriod?: string;
}

const ADMIN_EMAIL = 'analista.ericksilva@gmail.com';
const ANNUAL_PLAN_PRICE = 'R$ 47,00';
const ANNUAL_PLAN_PERIOD = '1 ano';

function approvalFields() {
  const now = new Date();
  return {
    approvedAt: serverTimestamp(),
    approvalDateBrasilia: getBrasiliaDateString(now),
    subscriptionExpiresAt: Timestamp.fromDate(getAnnualExpirationDate(now)),
    planPrice: ANNUAL_PLAN_PRICE,
    planPeriod: ANNUAL_PLAN_PERIOD,
  };
}

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
            approvedAt: existingProfile.approvedAt,
            approvalDateBrasilia: existingProfile.approvalDateBrasilia,
            subscriptionExpiresAt: existingProfile.subscriptionExpiresAt,
            planPrice: existingProfile.planPrice,
            planPeriod: existingProfile.planPeriod,
          };
          const isApproved = nextProfile.status === 'approved' || nextProfile.isAdmin === true;
          const missingApprovalRecord = isApproved && !existingProfile.approvedAt;

          await setDoc(
            userRef,
            {
              nome: nextProfile.nome,
              foto: nextProfile.foto,
              email: nextProfile.email,
              status: nextProfile.status,
              isAdmin: nextProfile.isAdmin,
              ...(missingApprovalRecord ? approvalFields() : {}),
              updatedAt: serverTimestamp(),
            },
            { merge: true },
          );
          const profileWithApproval = missingApprovalRecord
            ? {
                ...nextProfile,
                approvalDateBrasilia: getBrasiliaDateString(),
                planPrice: ANNUAL_PLAN_PRICE,
                planPeriod: ANNUAL_PLAN_PERIOD,
              }
            : nextProfile;
          setProfile(profileWithApproval);
          setHasAccess(isApproved);
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
            ...(newProfile.status === 'approved' ? approvalFields() : {}),
            updatedAt: serverTimestamp(),
          },
        );
        setProfile(newProfile.status === 'approved'
          ? {
              ...newProfile,
              approvalDateBrasilia: getBrasiliaDateString(),
              planPrice: ANNUAL_PLAN_PRICE,
              planPeriod: ANNUAL_PLAN_PERIOD,
            }
          : newProfile);
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
