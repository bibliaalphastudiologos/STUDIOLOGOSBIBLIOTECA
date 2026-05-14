import React, { useEffect, useState } from 'react';
import { BookOpen, Brain, ChevronRight, Mail, MessageCircle, Sparkles, X } from 'lucide-react';
import { PAYMENT_LINKS } from '../types';
import { buildWhatsAppUrl } from '../lib/whatsapp';
import { safeStorage } from '../lib/safeStorage';
import { LeadCapture } from './LeadCapture';

function ProductCard({ icon: Icon, title, text }: { icon: React.ElementType; title: string; text: string }) {
  return (
    <div className="premium-card p-4 md:p-5">
      <Icon className="mb-4 h-6 w-6 text-[#C5A059]" />
      <h3 className="font-serif text-xl leading-tight text-[#111]">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-black/62">{text}</p>
    </div>
  );
}

export const GrowthMarketing: React.FC<{ showLeadTools: boolean }> = ({ showLeadTools }) => {
  const [exitOpen, setExitOpen] = useState(false);
  const [footerHidden, setFooterHidden] = useState(() => safeStorage.getItem('growth-footer-hidden') === 'true');

  useEffect(() => {
    if (!showLeadTools || safeStorage.getItem('growth-exit-dismissed') === 'true') return;

    const timer = window.setTimeout(() => setExitOpen(true), 45000);
    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0) setExitOpen(true);
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [showLeadTools]);

  const closeExit = () => {
    setExitOpen(false);
    safeStorage.setItem('growth-exit-dismissed', 'true');
  };

  const closeFooter = () => {
    setFooterHidden(true);
    safeStorage.setItem('growth-footer-hidden', 'true');
  };

  return (
    <>
      <section id="conheca-plataforma" className="px-4 sm:px-6 lg:px-10 py-8 md:py-12">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="bg-[#111318] p-6 text-white shadow-2xl md:p-9">
            <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#C5A059]">Studio Logos Premium</p>
            <h2 className="mt-4 max-w-4xl font-serif text-3xl leading-tight text-white md:text-5xl">
              Conhecimento transformador em uma única plataforma.
            </h2>
            <p className="mt-5 max-w-3xl font-serif text-base leading-relaxed text-white/74 md:text-lg">
              Pare de consumir conteúdo raso. Entre em uma experiência que reúne Bíblia, teologia, filosofia, psicanálise e biblioteca digital para transformar sua mente.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#captacao-studiologos" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#C5A059] px-5 text-[10px] font-black uppercase tracking-[0.2em] text-black">
                Comece agora
                <ChevronRight className="h-4 w-4" />
              </a>
              <a href={PAYMENT_LINKS.studioLogosMonthly} className="inline-flex min-h-12 items-center justify-center border border-white/15 px-5 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                Assinar Studio Logos
              </a>
              <a href={buildWhatsAppUrl()} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#C5A059]/40 px-5 text-[10px] font-black uppercase tracking-[0.2em] text-[#C5A059]">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>

          <div id="captacao-studiologos" className="border border-[#C5A059]/25 bg-white p-5 shadow-xl md:p-6">
            <LeadCapture
              source="home-top"
              title="Receba uma curadoria inicial gratuita."
              subtitle="Conte para nós seu interesse principal e receba o melhor caminho para começar no Studio Logos."
            />
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 pb-8 md:pb-14">
        <div className="mx-auto grid max-w-7xl gap-3 md:grid-cols-4">
          <ProductCard icon={BookOpen} title="Biblioteca completa" text="Grandes obras, trilhas e leitura online em uma experiência organizada para estudo sério." />
          <ProductCard icon={Sparkles} title="Bíblia Alpha" text="Produto exclusivo do ecossistema Studio Logos para estudo bíblico com profundidade e fluidez." />
          <ProductCard icon={Brain} title="Psicanálise e filosofia" text="Roteiros de leitura para compreender ideias, cultura, mente, desejo e formação humana." />
          <ProductCard icon={Mail} title="Relacionamento guiado" text="Atendimento por e-mail e WhatsApp para tirar dúvidas e ajudar em sua jornada na plataforma." />
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 pb-10 md:pb-16">
        <div className="mx-auto grid max-w-7xl gap-5 bg-[#EEE4D2]/80 p-5 md:grid-cols-[0.9fr_1.1fr] md:p-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8A682B]">Bíblia Alpha</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-[#111] md:text-4xl">
              Uma experiência bíblica exclusiva dentro do Studio Logos.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-black/66 md:text-base">
              O Studio Logos não é apenas uma estante. É um ecossistema de formação com Bíblia Alpha, eBooks e trilhas de formação para quem deseja crescer com profundidade.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#captacao-meio" className="inline-flex min-h-11 items-center justify-center bg-black px-5 text-[10px] font-black uppercase tracking-[0.2em] text-white">Receba conteúdos gratuitos</a>
              <a href={PAYMENT_LINKS.studioLogosMonthly} className="inline-flex min-h-11 items-center justify-center border border-black/15 px-5 text-[10px] font-black uppercase tracking-[0.2em] text-black">Liberar acesso completo</a>
            </div>
          </div>
          <div id="captacao-meio" className="border border-black/10 bg-white p-5 shadow-sm">
            <LeadCapture
              source="home-middle"
              compact
              title="A mudança começa na mente. O acesso começa aqui."
            />
          </div>
        </div>
      </section>


      {showLeadTools && !footerHidden && (
        <div className="fixed inset-x-0 bottom-0 z-[95] border-t border-[#C5A059]/25 bg-[#111318]/96 px-4 py-3 text-white shadow-2xl backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#C5A059]">Studio Logos</p>
              <p className="font-serif text-lg leading-tight">Uma plataforma para quem não quer apenas ler, mas crescer.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href="#captacao-studiologos" className="inline-flex min-h-10 items-center justify-center bg-[#C5A059] px-4 text-[10px] font-black uppercase tracking-[0.18em] text-black">Receber conteúdos</a>
              <a href={PAYMENT_LINKS.studioLogosMonthly} className="inline-flex min-h-10 items-center justify-center border border-white/15 px-4 text-[10px] font-black uppercase tracking-[0.18em] text-white">Assinar</a>
              <button onClick={closeFooter} aria-label="Fechar banner" className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-white hover:bg-white hover:text-black">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {showLeadTools && exitOpen && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm" onClick={closeExit}>
          <div className="relative w-full max-w-2xl bg-[#111318] p-5 text-white shadow-2xl md:p-7" onClick={(event) => event.stopPropagation()}>
            <button onClick={closeExit} aria-label="Fechar captação" className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center border border-white/15 bg-white text-black shadow-lg hover:bg-[#C5A059]">
              <X className="h-4 w-4" />
            </button>
            <LeadCapture
              source="exit-intent"
              dark
              title="Antes de sair, receba uma rota de leitura premium."
              subtitle="Você recebe uma curadoria inicial e pode conversar pelo WhatsApp para entender a plataforma."
            />
          </div>
        </div>
      )}
    </>
  );
};

