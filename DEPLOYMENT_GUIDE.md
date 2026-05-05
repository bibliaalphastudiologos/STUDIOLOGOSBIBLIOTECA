# Guia de Deployment - Studio Logos no Hostinger

## 📋 Pré-requisitos

- Acesso ao Hostinger (hpanel.hostinger.com)
- Domínio: studiologos.com.br
- FTP/SFTP configurado

## 🚀 Passos de Deployment

### 1. Preparar os Arquivos

A build de produção está em `/dist/` com os seguintes arquivos:

```
dist/
├── index.html          # Arquivo principal
├── 404.html            # Página de erro para SPA
├── .htaccess           # Configurações Apache para routing
└── assets/
    ├── index-*.css     # Estilos compilados
    └── index-*.js      # JavaScript compilado
```

### 2. Fazer Upload via FTP

1. Acesse **hpanel.hostinger.com**
2. Vá para **Gerenciador de Arquivos** ou use um cliente FTP (FileZilla, WinSCP)
3. Navegue até a pasta raiz do domínio (geralmente `public_html/`)
4. **Limpe a pasta** (delete arquivos antigos do WordPress se houver)
5. **Upload dos arquivos** de `dist/`:
   - Copie `index.html` para a raiz
   - Copie `404.html` para a raiz
   - Copie `.htaccess` para a raiz
   - Copie a pasta `assets/` para a raiz

### 3. Configurações no Hostinger

1. **Ativar HTTPS:**
   - Vá para **SSL/TLS** no hpanel
   - Ative **Let's Encrypt** (gratuito)

2. **Configurar Domínio:**
   - Verifique se o domínio aponta para o servidor correto
   - DNS deve estar configurado corretamente

3. **Ativar Mod_Rewrite (se necessário):**
   - Vá para **Configurações de Servidor**
   - Certifique-se de que **mod_rewrite** está ativado (geralmente já vem ativado)

### 4. Testar o Site

1. Acesse **https://studiologos.com.br**
2. Verifique se:
   - A página carrega corretamente
   - O Hero section aparece com o gradiente navy/gold
   - Os cards de livros são exibidos
   - A navegação funciona (clique em categorias)
   - O Footer aparece no final da página

### 5. Verificar Funcionalidades

- ✅ Login com Google funciona
- ✅ Biblioteca carrega corretamente
- ✅ Botões de assinatura redirecionam para Mercado Pago
- ✅ Responsividade em mobile/tablet
- ✅ Performance (carregamento rápido)

## 🔧 Troubleshooting

### Erro 404 em rotas
- Certifique-se de que `.htaccess` está na raiz
- Verifique se `mod_rewrite` está ativado

### CSS/JS não carregam
- Verifique se a pasta `assets/` foi copiada corretamente
- Limpe o cache do navegador (Ctrl+Shift+Delete)
- Verifique as permissões de arquivo (644 para arquivos, 755 para pastas)

### Problemas com Firebase
- Verifique se as variáveis de ambiente estão corretas
- Confirme que o domínio está autorizado no Firebase Console

## 📦 Atualizações Futuras

Para fazer updates:

1. Faça as alterações no código
2. Execute `npm run build`
3. Copie os novos arquivos de `dist/` para o servidor
4. Limpe o cache do navegador

## 📞 Suporte

Para problemas com o Hostinger, acesse: https://help.hostinger.com/

---

**Build gerada em:** 2026-05-05
**Versão:** 1.0.0
