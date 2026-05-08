import { WHATSAPP_INITIAL_MESSAGE } from '../data/growthFunnels';

function configuredWhatsAppNumber() {
  const env = import.meta.env?.VITE_STUDIOLOGOS_WHATSAPP_NUMBER || '';
  return String(env).replace(/\D/g, '');
}

export function buildWhatsAppUrl(message = WHATSAPP_INITIAL_MESSAGE) {
  const encoded = encodeURIComponent(message);
  const number = configuredWhatsAppNumber();
  if (number) return `https://wa.me/${number}?text=${encoded}`;
  return `https://api.whatsapp.com/send?text=${encoded}`;
}

