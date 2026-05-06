import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

// Proteção contra variáveis ausentes ou inválidas
const isFirebaseConfigValid = !!firebaseConfig.apiKey && firebaseConfig.apiKey !== 'undefined';

// Inicializa o app apenas se a config for válida
const app = (isFirebaseConfigValid && getApps().length === 0) 
  ? initializeApp(firebaseConfig) 
  : (getApps()[0] || null);

// Exporta auth e db com segurança (podem ser null se a config for inválida)
export const auth = isFirebaseConfigValid ? getAuth(app!) : null;
export const db = isFirebaseConfigValid ? getFirestore(app!) : null;

const googleProvider = isFirebaseConfigValid ? new GoogleAuthProvider() : null;
if (googleProvider) {
  googleProvider.addScope('profile');
  googleProvider.addScope('email');
}

export async function signInWithGoogle() {
  if (!isFirebaseConfigValid || !auth || !googleProvider) {
    return { user: null, error: 'Login temporariamente em manutenção' };
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user, error: null };
  } catch (error: any) {
    let message = 'Erro desconhecido';
    if (error.code === 'auth/popup-blocked') {
      message = 'Pop-up bloqueado. Permita pop-ups neste site.';
    } else if (error.code === 'auth/popup-closed-by-user') {
      message = 'Login cancelado.';
    } else if (error.code === 'auth/unauthorized-domain') {
      message = 'Domínio não autorizado.';
    } else if (error.code === 'auth/network-request-failed') {
      message = 'Erro de conexão. Verifique sua internet.';
    }
    console.error('Login error:', error);
    return { user: null, error: message };
  }
}
