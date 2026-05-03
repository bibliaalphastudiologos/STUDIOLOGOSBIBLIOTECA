import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
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
  prompt: 'select_account'
});

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log('Google sign-in successful:', result.user.email);
    return result.user;
  } catch (error: any) {
    console.error('Error signing in with Google:', error);
    
    // Tratamento específico de erros
    if (error.code === 'auth/popup-blocked') {
      throw new Error('Pop-up foi bloqueado. Por favor, permita pop-ups para este site.');
    } else if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Login cancelado pelo usuário.');
    } else if (error.code === 'auth/unauthorized-domain') {
      throw new Error('Domínio não autorizado no Firebase. Verifique as configurações.');
    } else if (error.code === 'auth/network-request-failed') {
      throw new Error('Erro de conexão. Verifique sua internet.');
    }
    
    throw error;
  }
};

// Validate Connection
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firebase connection successful');
  } catch (error: any) {
    if (error?.message?.includes('the client is offline')) {
      console.error("Firebase offline: Please check your internet connection and Firebase configuration.");
    } else {
      console.warn("Firebase connection test warning:", error?.message);
    }
  }
}

testConnection();
