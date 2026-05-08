import { PAYMENT_LINKS } from '../types';

export const LEAD_INTERESTS = [
  'Bíblia Alpha',
  'E-books de Teologia',
  'Filosofia',
  'Psicanálise',
  'Biblioteca completa',
  'Assinatura Studio Logos',
] as const;

export type LeadInterest = typeof LEAD_INTERESTS[number];

export const EMAIL_FUNNEL = [
  {
    day: 0,
    subject: 'Bem-vindo ao Studio Logos',
    theme: 'Boas-vindas',
    objective: 'Apresentar a plataforma e gerar desejo.',
    body:
      'Você acaba de entrar em um ambiente criado para leitura profunda, formação intelectual e crescimento espiritual. O Studio Logos reúne Bíblia Alpha, eBooks, trilhas de estudo e conteúdos editoriais em uma experiência premium.',
    cta: 'Conheça a plataforma',
  },
  {
    day: 1,
    subject: 'Por que conhecimento profundo muda sua vida',
    theme: 'Autoridade',
    objective: 'Mostrar valor da biblioteca, Bíblia Alpha e conteúdos premium.',
    body:
      'Conteúdo raso informa por alguns minutos. Conhecimento profundo reorganiza a maneira como você pensa, decide, estuda e vive. O Studio Logos foi pensado para quem quer avançar com método, beleza e consistência.',
    cta: 'Ver conteúdos de alto valor',
  },
  {
    day: 2,
    subject: 'Veja o que você encontra dentro do Studio Logos',
    theme: 'Demonstração',
    objective: 'Apresentar eBooks, estudos, leitura online, Bíblia Alpha e recursos.',
    body:
      'Dentro da plataforma você encontra leitura online, biblioteca organizada, Bíblia Alpha, psicanálise clássica, filosofia, teologia, sínteses editoriais e recursos para continuar de onde parou.',
    cta: 'Explorar a biblioteca',
  },
  {
    day: 3,
    subject: 'Entre para o Studio Logos',
    theme: 'Oferta',
    objective: 'Apresentar assinatura, benefício e chamada para pagamento via Mercado Pago.',
    body:
      'A assinatura mensal libera a experiência completa: biblioteca premium, obras organizadas, leitura online e acesso pelo Gmail. O pagamento é feito pelo Mercado Pago e a liberação acontece pelo e-mail aprovado.',
    cta: 'Assinar Studio Logos',
    url: PAYMENT_LINKS.studioLogosMonthly,
  },
  {
    day: 5,
    subject: 'Sua oportunidade de acesso ainda está disponível',
    theme: 'Urgência',
    objective: 'Reforçar escassez, valor e conversão.',
    body:
      'Sua jornada de leitura pode começar hoje. Entre em uma plataforma para quem não quer apenas ler, mas crescer com direção, profundidade e constância.',
    cta: 'Liberar meu acesso',
    url: PAYMENT_LINKS.studioLogosMonthly,
  },
] as const;

export const WHATSAPP_INITIAL_MESSAGE =
  'Olá! Vi que você se interessou pelo Studio Logos. A plataforma reúne conteúdos de teologia, filosofia, psicanálise, eBooks e a Bíblia Alpha em um ambiente premium de estudo. Posso te mostrar como funciona?';

export const WHATSAPP_QUICK_REPLIES = [
  'Quero conhecer a Bíblia Alpha',
  'Quero ver os eBooks',
  'Quero saber o valor',
  'Quero assinar',
  'Tenho dúvidas',
] as const;

export const WHATSAPP_NURTURE_SEQUENCE = [
  {
    day: 1,
    title: 'Apresentação da plataforma',
    message:
      'O Studio Logos reúne leitura premium, Bíblia Alpha, eBooks, trilhas de estudo e sínteses editoriais em uma única plataforma de formação.',
  },
  {
    day: 2,
    title: 'Benefícios principais',
    message:
      'Você pode estudar por tema, continuar leituras, explorar autores clássicos e acessar uma experiência organizada para quem deseja profundidade.',
  },
  {
    day: 3,
    title: 'Destaque Bíblia Alpha',
    message:
      'A Bíblia Alpha integra estudo bíblico, leitura e organização em um produto exclusivo dentro do ecossistema Studio Logos.',
  },
  {
    day: 4,
    title: 'Biblioteca de eBooks',
    message:
      'A biblioteca oferece obras de teologia, filosofia, psicanálise, literatura e humanidades em uma experiência de leitura online.',
  },
  {
    day: 5,
    title: 'Chamada para assinatura',
    message:
      'A assinatura Studio Logos libera a plataforma completa por R$ 19,00/mês com pagamento seguro pelo Mercado Pago.',
  },
] as const;

