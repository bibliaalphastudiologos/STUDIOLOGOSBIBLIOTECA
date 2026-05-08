import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { EMAIL_FUNNEL, WHATSAPP_NURTURE_SEQUENCE, type LeadInterest } from '../data/growthFunnels';
import { buildWhatsAppUrl } from '../lib/whatsapp';
import { db } from './firebase';
import { PAYMENT_LINKS } from '../types';

export type LeadStatus = 'Novo lead' | 'Em conversa' | 'Interessado' | 'Pagou' | 'Aprovado';

export interface StudioLeadInput {
  nome: string;
  email: string;
  whatsapp: string;
  interesse: LeadInterest;
  source: string;
  lgpdConsent: boolean;
}

export async function saveStudioLead(input: StudioLeadInput) {
  const cleanLead = {
    nome: input.nome.trim(),
    email: input.email.trim().toLowerCase(),
    whatsapp: input.whatsapp.trim(),
    interesse: input.interesse,
    lgpdConsent: input.lgpdConsent,
    source: input.source,
    status: 'Novo lead' as LeadStatus,
    paymentLink: PAYMENT_LINKS.studioLogosMonthly,
    whatsappUrl: buildWhatsAppUrl(),
    emailFunnelStatus: 'queued',
    whatsappFunnelStatus: 'queued',
    emailFunnel: EMAIL_FUNNEL.map((email) => ({
      day: email.day,
      subject: email.subject,
      theme: email.theme,
      objective: email.objective,
      cta: email.cta,
      url: 'url' in email ? email.url : null,
      status: 'pending',
    })),
    whatsappSequence: WHATSAPP_NURTURE_SEQUENCE.map(({ day, title, message }) => ({
      day,
      title,
      message,
      status: 'pending',
    })),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, 'studio_leads'), cleanLead);

  const webhookUrl = import.meta.env?.VITE_LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: docRef.id, ...cleanLead }),
      keepalive: true,
    }).catch((error) => {
      console.warn('[Studio Logos] Falha no webhook de lead:', error);
    });
  }

  return docRef.id;
}
