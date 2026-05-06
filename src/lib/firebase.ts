import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

export async function signInWithGoogle() {
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