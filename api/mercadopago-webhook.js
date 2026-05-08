import crypto from 'node:crypto';
import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

const MP_API = 'https://api.mercadopago.com';
const PAYMENTS_COLLECTION = 'studio_payments';
const PAYMENT_ACCESS_COLLECTION = 'studio_payment_access';
const USERS_COLLECTION = 'studio_users';

function getEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function initFirebase() {
  if (admin.apps.length) return admin.app();

  const rawServiceAccount = getEnv('FIREBASE_SERVICE_ACCOUNT_JSON');
  const serviceAccount = JSON.parse(rawServiceAccount);
  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

function db() {
  const app = initFirebase();
  return getFirestore(app, process.env.FIRESTORE_DATABASE_ID || '(default)');
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function brasiliaDateString(date = new Date()) {
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

function getSignatureParts(value = '') {
  return value.split(',').reduce((acc, part) => {
    const [key, val] = part.split('=');
    if (key && val) acc[key.trim()] = val.trim();
    return acc;
  }, {});
}

function getDataId(req, body) {
  return (
    req.query?.['data.id'] ||
    req.query?.id ||
    body?.data?.id ||
    body?.id ||
    body?.resource?.split('/')?.pop()
  );
}

function validateMercadoPagoSignature(req, body) {
  const secret = process.env.MERCADO_PAGO_WEBHOOK_SECRET;
  if (!secret) return true;

  const signature = req.headers['x-signature'];
  const requestId = req.headers['x-request-id'];
  const dataId = getDataId(req, body);
  if (!signature || !requestId || !dataId) return false;

  const parts = getSignatureParts(Array.isArray(signature) ? signature[0] : signature);
  const manifest = `id:${dataId};request-id:${Array.isArray(requestId) ? requestId[0] : requestId};ts:${parts.ts};`;
  const expected = crypto.createHmac('sha256', secret).update(manifest).digest('hex');
  const received = parts.v1 || '';
  if (expected.length !== received.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(received));
}

async function mercadoPagoGet(path) {
  const response = await fetch(`${MP_API}${path}`, {
    headers: {
      Authorization: `Bearer ${getEnv('MERCADO_PAGO_ACCESS_TOKEN')}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Mercado Pago API failed ${response.status}: ${text}`);
  }

  return response.json();
}

function paymentStatusFromMercadoPago(status) {
  if (status === 'approved' || status === 'authorized') return 'approved';
  if (status === 'rejected') return 'rejected';
  if (status === 'cancelled' || status === 'canceled') return 'cancelled';
  return 'pending';
}

async function loadPaymentPayload(req, body) {
  const type = req.query?.type || req.query?.topic || body?.type || body?.topic || body?.action?.split('.')?.[0] || '';
  const id = getDataId(req, body);

  if (!id) throw new Error('Webhook sem ID de pagamento/preapproval.');

  if (type.includes('preapproval')) {
    const preapproval = await mercadoPagoGet(`/preapproval/${id}`);
    return {
      paymentId: String(preapproval.id),
      email: normalizeEmail(preapproval.payer_email || preapproval.payer?.email),
      nome: preapproval.payer_first_name || preapproval.reason || 'Assinante Studio Logos',
      payment_status: paymentStatusFromMercadoPago(preapproval.status),
      rawStatus: preapproval.status,
      raw: preapproval,
    };
  }

  const payment = await mercadoPagoGet(`/v1/payments/${id}`);
  return {
    paymentId: String(payment.id),
    email: normalizeEmail(payment.payer?.email || payment.metadata?.email || payment.additional_info?.payer?.email),
    nome: payment.payer?.first_name || payment.payer?.nickname || payment.card?.cardholder?.name || 'Assinante Studio Logos',
    payment_status: paymentStatusFromMercadoPago(payment.status),
    rawStatus: payment.status,
    raw: payment,
  };
}

async function upsertAccess(payment) {
  if (!payment.email) throw new Error('Pagamento aprovado sem e-mail do pagador.');

  const firestore = db();
  const now = admin.firestore.FieldValue.serverTimestamp();
  const approved = payment.payment_status === 'approved';
  const accessStatus = approved ? 'active' : payment.payment_status === 'cancelled' ? 'blocked' : 'blocked';
  const approvalFields = approved ? {
    approvedAt: now,
    approvalDateBrasilia: brasiliaDateString(),
  } : {};

  const record = {
    nome: payment.nome,
    email: payment.email,
    payment_status: payment.payment_status,
    access_status: accessStatus,
    paymentId: payment.paymentId,
    rawStatus: payment.rawStatus,
    planPrice: 'R$ 19,00',
    planPeriod: 'mensal',
    updatedAt: now,
    ...approvalFields,
  };

  await firestore.collection(PAYMENTS_COLLECTION).doc(payment.paymentId).set({
    ...record,
    raw: payment.raw,
    receivedAt: now,
  }, { merge: true });

  await firestore.collection(PAYMENT_ACCESS_COLLECTION).doc(payment.email).set(record, { merge: true });

  const matchingUsers = await firestore.collection(USERS_COLLECTION).where('email', '==', payment.email).get();
  await Promise.all(matchingUsers.docs.map((userDoc) => userDoc.ref.set({
    nome: userDoc.data().nome || payment.nome,
    email: payment.email,
    status: approved ? 'approved' : userDoc.data().status || 'pending',
    payment_status: payment.payment_status,
    access_status: accessStatus,
    paymentId: payment.paymentId,
    updatedAt: now,
    ...approvalFields,
  }, { merge: true })));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!validateMercadoPagoSignature(req, body)) {
      return res.status(401).json({ error: 'Invalid Mercado Pago signature' });
    }

    const payment = await loadPaymentPayload(req, body);
    await upsertAccess(payment);

    return res.status(200).json({ ok: true, payment_status: payment.payment_status });
  } catch (error) {
    console.error('[Studio Logos Mercado Pago webhook]', error);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
}
