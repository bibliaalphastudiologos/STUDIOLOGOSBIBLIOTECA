import React, { useState } from 'react';
import { Check, Mail, MessageCircle, UserRound } from 'lucide-react';
import { LEAD_INTERESTS, type LeadInterest } from '../data/growthFunnels';
import { buildWhatsAppUrl } from '../lib/whatsapp';
import { saveStudioLead } from '../services/leads';

interface LeadCaptureProps {
  source: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
  dark?: boolean;
}

const defaultTitle = 'Receba conteúdos gratuitos e conheça a plataforma por dentro.';
const defaultSubtitle = 'Deixe seu contato para receber uma curadoria inicial do Studio Logos e falar com nossa equipe.';

export const LeadCapture: React.FC<LeadCaptureProps> = ({
  source,
  title = defaultTitle,
  subtitle = defaultSubtitle,
  compact = false,
  dark = false,
}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [interesse, setInteresse] = useState<LeadInterest>('Biblioteca completa');
  const [lgpdConsent, setLgpdConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const canSubmit = nome.trim().length >= 2 && email.includes('@') && whatsapp.trim().length >= 8 && lgpdConsent;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSubmit || status === 'saving') return;

    setStatus('saving');
    try {
      await saveStudioLead({ nome, email, whatsapp, interesse, source, lgpdConsent });
      setStatus('saved');
    } catch (error) {
      console.error('[Studio Logos] Erro ao salvar lead:', error);
      setStatus('error');
    }
  }

  const inputClass = `h-11 w-full border px-3 text-sm outline-none transition-colors ${
    dark
      ? 'border-white/15 bg-white/8 text-white placeholder:text-white/35 focus:border-[#C5A059]'
      : 'border-black/10 bg-white text-black placeholder:text-black/35 focus:border-[#C5A059]'
  }`;

  if (status === 'saved') {
    return (
      <div className={`border p-5 ${dark ? 'border-[#C5A059]/35 bg-white/[0.06] text-white' : 'border-[#C5A059]/35 bg-[#FFF9EA] text-black'}`}>
        <div className="flex items-start gap-3">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C5A059] text-black">
            <Check className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-serif text-xl">Cadastro recebido.</h3>
            <p className={`mt-1 text-sm leading-relaxed ${dark ? 'text-white/70' : 'text-black/60'}`}>
              Sua jornada no Studio Logos foi iniciada. Você já pode falar conosco pelo WhatsApp para conhecer a plataforma.
            </p>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 bg-[#C5A059] px-5 text-[10px] font-black uppercase tracking-[0.2em] text-black"
            >
              <MessageCircle className="h-4 w-4" />
              Abrir WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${dark ? 'text-white' : 'text-black'}`}>
      <div className={compact ? 'space-y-2' : 'space-y-3'}>
        <p className="text-[9px] font-black uppercase tracking-[0.28em] text-[#C5A059]">Conteúdo e acesso</p>
        <h3 className={`font-serif leading-tight ${compact ? 'text-xl' : 'text-2xl md:text-3xl'}`}>{title}</h3>
        {!compact && <p className={`text-sm leading-relaxed ${dark ? 'text-white/68' : 'text-black/62'}`}>{subtitle}</p>}
      </div>

      <div className={`grid gap-3 ${compact ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
        <label className="relative">
          <UserRound className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${dark ? 'text-white/35' : 'text-black/35'}`} />
          <input className={`${inputClass} pl-9`} value={nome} onChange={(event) => setNome(event.target.value)} placeholder="Nome" />
        </label>
        <label className="relative">
          <Mail className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${dark ? 'text-white/35' : 'text-black/35'}`} />
          <input className={`${inputClass} pl-9`} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="E-mail" type="email" />
        </label>
        <label className="relative">
          <MessageCircle className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${dark ? 'text-white/35' : 'text-black/35'}`} />
          <input className={`${inputClass} pl-9`} value={whatsapp} onChange={(event) => setWhatsapp(event.target.value)} placeholder="WhatsApp" inputMode="tel" />
        </label>
        <select className={`${inputClass} ${compact ? 'md:col-span-1' : 'md:col-span-2'}`} value={interesse} onChange={(event) => setInteresse(event.target.value as LeadInterest)}>
          {LEAD_INTERESTS.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <button
          type="submit"
          disabled={!canSubmit || status === 'saving'}
          className="min-h-11 bg-[#C5A059] px-5 text-[10px] font-black uppercase tracking-[0.18em] text-black transition-colors hover:bg-[#D8B76C] disabled:cursor-not-allowed disabled:opacity-45"
        >
          {status === 'saving' ? 'Enviando...' : 'Receber conteúdos'}
        </button>
      </div>

      <label className={`flex items-start gap-2 text-xs leading-relaxed ${dark ? 'text-white/65' : 'text-black/55'}`}>
        <input
          type="checkbox"
          checked={lgpdConsent}
          onChange={(event) => setLgpdConsent(event.target.checked)}
          className="mt-1 accent-[#C5A059]"
        />
        <span>Autorizo receber comunicações do Studio Logos por e-mail e WhatsApp.</span>
      </label>

      {status === 'error' && (
        <p className="text-xs font-bold text-red-600">Não foi possível registrar agora. Tente novamente em alguns instantes.</p>
      )}
    </form>
  );
};

