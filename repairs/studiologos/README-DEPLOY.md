# Reparo StudioLogos

Este pacote corrige o caso em que o site abre apenas um logo pequeno e nao renderiza o app completo.

## O que foi corrigido

- Limpeza de Service Workers antigos antes do React iniciar.
- Limpeza de caches antigos do navegador.
- Cache-busting nos arquivos JS e CSS publicados.
- Fallback visual dentro de `#root` enquanto o app carrega.
- `.htaccess` para rotas SPA e cache correto no LiteSpeed/Hostinger.

## Como aplicar na Hostinger

1. Entre no Gerenciador de Arquivos da Hostinger.
2. Abra a pasta publica do site, normalmente `public_html`.
3. Faca backup do `index.html` atual.
4. Envie este `index.html` para substituir o atual.
5. Envie o arquivo `.htaccess` para a mesma pasta.
6. Confirme que estes arquivos continuam existindo:
   - `/assets/index-DP27ukIr.js`
   - `/assets/index-C78zwPTd.css`
7. Limpe o cache da Hostinger/LiteSpeed.
8. Abra `https://studiologos.com.br/?v=20260506-repair1` e pressione `Ctrl + F5`.

## Se ainda aparecer apenas o logo

Abra o console do navegador com `F12` e veja a aba `Console`. O erro mais importante costuma ser:

- erro JavaScript;
- arquivo bloqueado por cache;
- arquivo JS/CSS com 404;
- extensao do navegador bloqueando scripts;
- service worker antigo ainda ativo.
