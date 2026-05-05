# Upload para Hostinger - Studio Logos

## 📋 Arquivos Prontos para Upload

Todos os arquivos estão em: `/public_html/`

```
public_html/
├── index.html          ← Página principal
├── 404.html            ← Página de erro
├── .htaccess           ← Configurações Apache (IMPORTANTE!)
└── assets/
    ├── index-*.css     ← Estilos compilados
    └── index-*.js      ← JavaScript compilado
```

## 🚀 Como Fazer Upload

### Via Hostinger File Manager

1. Acesse https://hpanel.hostinger.com/
2. Vá para **Gerenciador de Arquivos**
3. Navegue até **public_html/**
4. **Delete todos os arquivos antigos**
5. **Upload dos arquivos de `public_html/`:**
   - Selecione todos os arquivos (Ctrl+A)
   - Clique em Upload
   - Aguarde completar

### Via FTP (FileZilla, WinSCP)

1. Conecte-se ao servidor FTP
2. Navegue até **public_html/**
3. Delete todos os arquivos antigos
4. Copie todos os arquivos de `public_html/` local para remoto
5. **IMPORTANTE**: Certifique-se de que `.htaccess` foi copiado

## ✅ Verificação

Depois do upload, verifique:

1. Acesse **https://studiologos.com.br**
2. Verifique se carrega corretamente
3. Teste a navegação (clique em categorias)
4. Teste os botões de assinatura
5. Teste o login com Google

## 📊 Tamanho dos Arquivos

- **index.html**: 680 bytes
- **404.html**: 742 bytes
- **assets/**: ~1.3 MB
- **Total**: ~1.4 MB

## 🔧 Configurações Necessárias no Hostinger

1. **SSL/TLS**: Ative Let's Encrypt (gratuito)
2. **mod_rewrite**: Verifique se está ativado
3. **Domínio**: Certifique-se que aponta corretamente

## 📝 Conteúdo do .htaccess

Este arquivo é **ESSENCIAL** para o funcionamento da aplicação React.

Se não foi copiado, crie manualmente:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Redireciona requisições para arquivos/diretórios existentes
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Redireciona tudo para index.html para SPA routing
  RewriteRule ^ index.html [QSA,L]
</IfModule>
```

## 🎉 Pronto!

Após o upload, o Studio Logos estará online em: **https://studiologos.com.br**

---

**Data**: 2026-05-05
**Versão**: 1.0.0
**Status**: Pronto para Upload ✅
