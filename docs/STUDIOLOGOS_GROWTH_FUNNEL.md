# Studio Logos - funil de captacao e conversao

## Captacao

O site agora possui pontos de captura para visitantes:

- banner principal na home;
- formulario no topo;
- formulario no meio da pagina;
- formulario no convite final;
- popup suave de intencao de saida;
- banner fixo discreto no rodape.

Campos captados:

- nome;
- e-mail;
- WhatsApp;
- interesse principal;
- consentimento LGPD.

Os leads sao salvos na colecao `studio_leads` com status inicial `Novo lead`.

## Sequencia de e-mail

1. Boas-vindas: apresentar a plataforma.
2. Autoridade: reforcar profundidade e valor.
3. Demonstracao: mostrar biblioteca, Biblia Alpha e recursos.
4. Oferta: convite para assinatura pelo Mercado Pago.
5. Urgencia: reforco final de conversao.

Os modelos estao em `src/data/growthFunnels.ts` e sao gravados junto ao lead para permitir integracao com Brevo, MailerLite, Resend, Make ou Zapier.

## WhatsApp

Mensagem inicial:

> Ola! Vi que voce se interessou pelo Studio Logos. A plataforma reune conteudos de teologia, filosofia, psicanalise, eBooks e a Biblia Alpha em um ambiente premium de estudo. Posso te mostrar como funciona?

Respostas rapidas:

- Quero conhecer a Biblia Alpha
- Quero ver os eBooks
- Quero saber o valor
- Quero assinar
- Tenho duvidas

Sequencia sugerida:

- Dia 1: apresentacao da plataforma.
- Dia 2: beneficios principais.
- Dia 3: destaque da Biblia Alpha.
- Dia 4: biblioteca de eBooks.
- Dia 5: chamada para assinatura.

## Automacao recomendada

Configure uma destas rotas:

- Firestore trigger lendo `studio_leads`;
- Make/Zapier via `VITE_LEAD_WEBHOOK_URL`;
- Brevo/MailerLite/Resend por backend seguro.

Nao coloque chaves secretas de e-mail marketing no frontend.

## Variaveis opcionais

```env
VITE_STUDIOLOGOS_WHATSAPP_NUMBER=5511999999999
VITE_LEAD_WEBHOOK_URL=https://hook.make.com/seu-webhook
```

## Status do painel admin

O painel `/admin` mostra leads com:

- nome;
- e-mail;
- WhatsApp;
- interesse;
- data;
- status: Novo lead, Em conversa, Interessado, Pagou, Aprovado.

