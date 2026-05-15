import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { Timestamp, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db, loginWithGoogle, logout, processRedirectLogin } from '../services/firebase';
import { getBrasiliaDateString, getMonthlyExpirationDate } from '../lib/brasiliaDate';

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
  payment_status?: 'pending' | 'approved' | 'rejected' | 'cancelled';
  access_status?: 'active' | 'blocked' | 'expired';
  manual_access?: boolean;
  isAdmin?: boolean;
  approvedAt?: unknown;
  approvalDateBrasilia?: string;
  subscriptionExpiresAt?: unknown;
  planPrice?: string;
  planPeriod?: string;
  paymentId?: string;
}

const MONTHLY_PLAN_PRICE = 'R$ 19,00';
const MONTHLY_PLAN_PERIOD = 'mensal';
const USERS_COLLECTION = 'studio_users';
const PAYMENT_ACCESS_COLLECTION = 'studio_payment_access';

function approvalFields() {
  const now = new Date();
  return {
    approvedAt: serverTimestamp(),
    approvalDateBrasilia: getBrasiliaDateString(now),
    subscriptionExpiresAt: Timestamp.fromDate(getMonthlyExpirationDate(now)),
    planPrice: MONTHLY_PLAN_PRICE,
    planPeriod: MONTHLY_PLAN_PERIOD,
  };
}

function normalizeEmail(email?: string | null): string {
  return (email || '').trim().toLowerCase();
}

function hasPaidAccess(profile: Partial<StudioLogosProfile> | null | undefined): boolean {
  return profile?.payment_status === 'approved' && profile?.access_status === 'active';
}

function hasEffectiveAccess(profile: Partial<StudioLogosProfile> | null | undefined): boolean {
  return hasPaidAccess(profile) || (profile?.manual_access === true && profile?.access_status === 'active');
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
        const normalizedEmail = normalizeEmail(firebaseUser.email);
        const userRef = doc(db, USERS_COLLECTION, firebaseUser.uid);
        const paymentRef = doc(db, PAYMENT_ACCESS_COLLECTION, normalizedEmail || '_missing_email');
        const existing = await getDoc(userRef);
        const paymentSnapshot = normalizedEmail ? await getDoc(paymentRef) : null;
        const paymentRecord = paymentSnapshot?.exists() ? paymentSnapshot.data() as Partial<StudioLogosProfile> : null;
        if (existing.exists()) {
          const existingProfile = existing.data() as StudioLogosProfile;
          const existingAdmin = existingProfile.isAdmin === true;
          const manualBlocked = !existingAdmin && existingProfile.status === 'blocked';
          const paymentApproved = hasPaidAccess(paymentRecord) || hasEffectiveAccess(existingProfile) || existingAdmin;
          const nextAccessStatus = manualBlocked ? 'blocked' : paymentApproved ? 'active' : existingProfile.access_status || 'blocked';
          const nextPaymentStatus = paymentRecord?.payment_status || existingProfile.payment_status || (paymentApproved ? 'approved' : 'pending');
          const nextProfile: StudioLogosProfile = {
            email: existingProfile.email || firebaseUser.email || '',
            nome: firebaseUser.displayName || existingProfile.nome || 'Leitor StudioLogos',
            foto: firebaseUser.photoURL || existingProfile.foto || '',
            status: existingAdmin || (nextPaymentStatus === 'approved' && nextAccessStatus === 'active') || existingProfile.manual_access === true ? 'approved' : manualBlocked ? 'blocked' : 'pending',
            payment_status: nextPaymentStatus,
            access_status: nextAccessStatus,
            manual_access: existingProfile.manual_access === true,
            isAdmin: existingAdmin,
            approvedAt: paymentRecord?.approvedAt || existingProfile.approvedAt,
            approvalDateBrasilia: paymentRecord?.approvalDateBrasilia || existingProfile.approvalDateBrasilia,
            subscriptionExpiresAt: paymentRecord?.subscriptionExpiresAt || existingProfile.subscriptionExpiresAt,
            planPrice: paymentRecord?.planPrice || existingProfile.planPrice,
            planPeriod: paymentRecord?.planPeriod || existingProfile.planPeriod,
            paymentId: paymentRecord?.paymentId || existingProfile.paymentId,
          };
          // Acesso liberado para qualquer usuário autenticado com Google
            const isApproved = true;
          const missingApprovalRecord = isApproved && !existingProfile.approvedAt;

          await setDoc(
            userRef,
            {
              nome: nextProfile.nome,
              foto: nextProfile.foto,
              email: nextProfile.email,
              status: nextProfile.status,
              payment_status: nextProfile.payment_status,
              access_status: nextProfile.access_status,
              manual_access: nextProfile.manual_access,
              isAdmin: nextProfile.isAdmin,
              paymentId: nextProfile.paymentId,
              ...(missingApprovalRecord ? approvalFields() : {}),
              updatedAt: serverTimestamp(),
            },
            { merge: true },
          );
          const profileWithApproval = missingApprovalRecord
            ? {
                ...nextProfile,
                approvalDateBrasilia: getBrasiliaDateString(),
                planPrice: MONTHLY_PLAN_PRICE,
                planPeriod: MONTHLY_PLAN_PERIOD,
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
          status: hasPaidAccess(paymentRecord) ? 'approved' : 'pending',
          payment_status: paymentRecord?.payment_status || 'pending',
          access_status: hasPaidAccess(paymentRecord) ? 'active' : 'blocked',
          isAdmin: false,
          approvedAt: paymentRecord?.approvedAt,
          approvalDateBrasilia: paymentRecord?.approvalDateBrasilia,
          paymentId: paymentRecord?.paymentId,
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
              approvalDateBrasilia: newProfile.approvalDateBrasilia || getBrasiliaDateString(),
              planPrice: MONTHLY_PLAN_PRICE,
              planPeriod: MONTHLY_PLAN_PERIOD,
            }
          : newProfile);
        setHasAccess(true); // Qualquer usuário Google tem acesso
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
