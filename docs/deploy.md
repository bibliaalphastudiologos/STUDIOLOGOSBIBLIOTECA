# Checklist de Deploy

## Comum a qualquer ambiente

- O comando de build passa localmente.
- O projeto tem `.env.example` ou documentacao equivalente.
- Nenhum segredo foi commitado.
- Logs de erro estao acessiveis no ambiente final.
- Ha uma forma clara de voltar para a versao anterior.

## Vercel

Variaveis comuns:

- `DATABASE_URL`
- `NEXT_PUBLIC_*` somente para valores publicos
- chaves de APIs de terceiros

Verificacoes:

- Framework preset correto.
- Build command correto.
- Output directory padrao do framework.
- Preview deploy validado antes de producao.

## Netlify

Verificacoes:

- Build command correto.
- Publish directory correto.
- Redirects configurados em `_redirects` ou `netlify.toml`.
- Functions configuradas quando houver backend serverless.

## Render

Verificacoes:

- Start command correto.
- Health check path configurado.
- Variaveis de ambiente definidas.
- Banco ou servicos vinculados.

## VPS ou Docker

Verificacoes:

- Dockerfile ou processo de build testado.
- Porta exposta correta.
- Reverse proxy configurado.
- HTTPS configurado.
- Logs e restart policy ativos.

## Rollback

Antes do deploy, registre:

- versao ou commit anterior;
- comando ou acao de rollback;
- migracoes irreversiveis, se existirem;
- responsavel por validar producao.
