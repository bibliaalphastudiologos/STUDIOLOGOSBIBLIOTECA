#!/bin/bash

# ============================================================================
# Studio Logos - Deployment Script for Hostinger
# ============================================================================
# Este script executa automaticamente após o clone do repositório
# Instala dependências, compila o projeto e configura o servidor
# ============================================================================

set -e  # Exit on error

echo "=================================================="
echo "Studio Logos - Deployment Automático"
echo "=================================================="
echo ""

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo "[1/5] Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale Node.js no Hostinger."
    exit 1
fi
echo "✅ Node.js encontrado: $(node --version)"
echo ""

echo "[2/5] Instalando dependências..."
npm install --production
echo "✅ Dependências instaladas com sucesso"
echo ""

echo "[3/5] Compilando projeto para produção..."
npm run build
echo "✅ Build compilada com sucesso"
echo ""

echo "[4/5] Configurando arquivos para deployment..."

# Criar diretório public_html se não existir
if [ ! -d "public_html" ]; then
    mkdir -p public_html
fi

# O build já é gerado em public_html pelo vite.config.ts
echo "  Build já gerado em public_html/ pelo Vite."

# Garantir que .htaccess está presente
if [ ! -f "public_html/.htaccess" ]; then
    echo "  Criando .htaccess para SPA routing..."
    cat > public_html/.htaccess << 'HTACCESS'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Redireciona requisições para arquivos/diretórios existentes
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Redireciona tudo para index.html para SPA routing
  RewriteRule ^ index.html [QSA,L]
</IfModule>
HTACCESS
fi

echo "✅ Arquivos configurados com sucesso"
echo ""

echo "[5/5] Verificando deployment..."
if [ -f "public_html/index.html" ]; then
    echo "✅ index.html encontrado em public_html/"
else
    echo "❌ Erro: index.html não encontrado"
    exit 1
fi

if [ -f "public_html/.htaccess" ]; then
    echo "✅ .htaccess configurado"
else
    echo "⚠️  Aviso: .htaccess não encontrado"
fi

if [ -d "public_html/assets" ]; then
    echo "✅ Pasta assets encontrada"
else
    echo "❌ Erro: Pasta assets não encontrada"
    exit 1
fi

echo ""
echo "=================================================="
echo "✅ DEPLOYMENT CONCLUÍDO COM SUCESSO!"
echo "=================================================="
echo ""
echo "Studio Logos está pronto em: https://studiologos.com.br"
echo ""
echo "Próximas etapas:"
echo "1. Acesse https://studiologos.com.br"
echo "2. Verifique se a página carrega corretamente"
echo "3. Teste a navegação e os botões"
echo ""
echo "Para atualizações futuras:"
echo "1. Faça push das mudanças para GitHub"
echo "2. O Hostinger detectará automaticamente e executará este script"
echo ""
