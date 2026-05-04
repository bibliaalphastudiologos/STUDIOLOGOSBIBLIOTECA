import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Configurar escopos do Google OAuth
googleProvider.addScope('profile');
googleProvider.addScope('email');

// Configurar parâmetros customizados do Google OAuth
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

/**
 * Tenta login com popup (desktop). Se popup for bloqueado,
 * cai automaticamente para redirect (mobile/restrito).
 */
export const signInWithGoogle = async (): Promise<import('firebase/auth').User | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log('Login Google (popup) bem-sucedido:', result.user.email);
    return result.user;
  } catch (error: any) {
    console.error('Erro no popup de login:', error.code, error.message);

    // Fallback para redirect quando popup é bloqueado ou fechado
    if (
      error.code === 'auth/popup-blocked' ||
      error.code === 'auth/popup-closed-by-user' ||
      error.code === 'auth/cancelled-popup-request'
    ) {
      console.log('Popup bloqueado — usando redirect como fallback...');
      await signInWithRedirect(auth, googleProvider);
      return null; // Página vai recarregar após o redirect
    }

    // Mensagens de erro amigáveis
    if (error.code === 'auth/unauthorized-domain') {
      throw new Error(
        'Domínio não autorizado no Firebase. Acesse o Firebase Console → Authentication → Authorized Domains e adicione studiologos.com.br.'
      );
    }
    if (error.code === 'auth/network-request-failed') {
      throw new Error('Erro de conexão. Verifique sua internet e tente novamente.');
    }
    if (error.code === 'auth/internal-error') {
      throw new Error('Erro interno do servidor. Tente novamente em alguns instantes.');
    }

    throw error;
  }
};

/**
 * Deve ser chamado no mount do AuthContext para capturar o
 * resultado do login após um signInWithRedirect.
 */
export { getRedirectResult };

// ── Teste de conectividade Firestore ──────────────────────────────────────────
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Conexão Firebase OK');
  } catch (error: any) {
    if (error?.message?.includes('the client is offline')) {
      console.error('Firebase offline: verifique a conexão com a internet.');
    } else {
      console.warn('Aviso de conexão Firebase:', error?.message);
    }
  }
}

testConnection();
