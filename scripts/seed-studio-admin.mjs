import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';

const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
if (!serviceAccountJson) {
  throw new Error('Defina FIREBASE_SERVICE_ACCOUNT_JSON antes de executar o seed.');
}

const uid = process.env.STUDIO_ADMIN_UID;
const email = (process.env.STUDIO_ADMIN_EMAIL || 'analista.ericksilva@gmail.com').trim().toLowerCase();

if (!uid) {
  throw new Error('Defina STUDIO_ADMIN_UID com o UID do usuario no Firebase Authentication.');
}

initializeApp({
  credential: cert(JSON.parse(serviceAccountJson)),
});

const db = getFirestore(process.env.FIRESTORE_DATABASE_ID || 'ai-studio-d00d75cd-ea9b-4bf1-9db1-7ac14eff586f');
const now = new Date();

await db.collection('studio_users').doc(uid).set({
  email,
  nome: 'Administrador Studio Logos',
  foto: '',
  status: 'approved',
  payment_status: 'approved',
  access_status: 'active',
  manual_access: true,
  isAdmin: true,
  planPrice: 'R$ 19,00',
  planPeriod: 'mensal',
  approvedAt: FieldValue.serverTimestamp(),
  approvalDateBrasilia: new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(now),
  subscriptionExpiresAt: Timestamp.fromDate(new Date(now.getTime() + 31 * 24 * 60 * 60 * 1000)),
  updatedAt: FieldValue.serverTimestamp(),
}, { merge: true });

await db.collection('studio_payment_access').doc(email).set({
  email,
  nome: 'Administrador Studio Logos',
  payment_status: 'approved',
  access_status: 'active',
  manual_access: true,
  paymentId: `admin_seed_${Date.now()}`,
  rawStatus: 'manual',
  planPrice: 'R$ 19,00',
  planPeriod: 'mensal',
  approvedAt: FieldValue.serverTimestamp(),
  approvalDateBrasilia: new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(now),
  updatedAt: FieldValue.serverTimestamp(),
}, { merge: true });

console.log(`Admin Studio Logos liberado para ${email}.`);
