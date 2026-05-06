#!/usr/bin/env python3
"""
Diagnóstico e correção automática do deploy no Hostinger
Verifica se a configuração do painel está correta e gera instruções.
"""

import os
import json
from pathlib import Path

REPO_DIR = Path(r"C:\Users\Acer\STUDIOLOGOSBIBLIOTECA")
DIST_DIR = REPO_DIR / "dist"

def check_build_output():
    """Verifica se o build gerou a estrutura esperada"""
    print("[*] Verificando build output...")
    
    if not DIST_DIR.exists():
        print("  ❌ Pasta dist/ não existe. Rode: npm run build")
        return False
    
    index_html = DIST_DIR / "index.html"
    assets_dir = DIST_DIR / "assets"
    
    if not index_html.exists():
        print("  ❌ index.html não encontrado em dist/")
        return False
    
    if not assets_dir.exists():
        print("  ❌ Pasta assets/ não encontrada em dist/")
        return False
    
    assets_files = list(assets_dir.glob("*"))
    if len(assets_files) == 0:
        print("  ❌ Pasta assets/ vazia")
        return False
    
    print("  [OK] Build OK: index.html + assets/")
    print(f"     - index.html: {index_html.stat().st_size} bytes")
    print(f"     - assets/: {len(assets_files)} arquivo(s)")
    return True

def check_vite_config():
    """Verifica se vite.config.ts está correto"""
    print("\n[*] Verificando vite.config.ts...")
    
    config_file = REPO_DIR / "vite.config.ts"
    if not config_file.exists():
        print("  ❌ vite.config.ts não encontrado")
        return False
    
    content = config_file.read_text()
    if 'outDir' in content and "'dist'" in content:
        print("   outDir configurado como 'dist'")
        return True
    else:
        print("  ⚠️  outDir não explícito (Vite usa 'dist' por padrão)")
        return True  # ainda é válido

def check_workflows():
    """Verifica se os workflows têm as configurações corretas"""
    print("\n[*] Verificando workflows GitHub Actions...")
    
    workflows_dir = REPO_DIR / ".github" / "workflows"
    issues = []
    
    for wf in workflows_dir.glob("*.yml"):
        content = wf.read_text()
        print(f"  [Arquivo] {wf.name}")
        
        # Verificar se local-dir/server-dir estão corretos
        if 'local-dir:' in content or 'local-dir :' in content:
            if './dist' not in content:
                print(f"    [Aviso] local-dir pode nao ser ./dist")
        
        # Verificar strip_components no SFTP
        if 'strip_components:' in content:
            if 'strip_components: 0' in content:
                print(f"    [Erro] strip_components: 0 (deve ser 1)")
                issues.append(wf.name)
            elif 'strip_components: 1' in content:
                print("    [OK] strip_components: 1")
        
        # Verificar se há verificação de arquivos
        if 'Verificar arquivos gerados' in content:
            print("    [OK] Verificacao previa presente")
        else:
            print("    [?] Sem verificacao de arquivos antes do deploy")
    
    return len(issues) == 0

def print_hostinger_setup():
    """Imprime instruções para configurar o Hostinger corretamente"""
    print("\n" + "="*60)
    print(" CONFIGURACAO NO HOSTINGER hPanel")
    print("="*60)
    print("""
1. Acesse: https://hpanel.hostinger.com
2. Vá em: Advanced -> Git
3. Verifique/Crie a integração para studiolgos.com.br:

   Repository: git@github.com:bibliaalphastudiologos/STUDIOLOGOSBIBLIOTECA.git
   Branch:      main
   Path:      	  /public_html  (ou public_html)

   [!] IMPORTANTE - Build settings:
   • Build command:        npm ci && npm run build
   • Build output directory: dist   <- DEVE SER 'dist'

   Se o campo 'Build output directory' estiver VAZIO:
   -> O Hostinger servirá os arquivos fonte (src/) causando tela branca
   -> Preencha com: dist

4. Após configurar, clique em "Pull" para fazer deploy inicial.

-------------------------------------------------------------

Se estiver usando GitHub Actions (recomendado):

1. No hPanel desative a integração Git (para evitar conflito)
2. Configure os Secrets no GitHub:
   Settings -> Secrets and variables -> Actions

   Necessários:
   • FTP_HOST         -> ftp.studiologos.com.br
   • FTP_USERNAME     -> analista.ericksilva@gmail.com
   • FTP_PASSWORD     -> <sua_senha_ftp>

   Opcionais (para fallbacks):
   • SFTP_HOST        -> studiologos.com.br
   • SSH_PRIVATE_KEY  -> chave privada SSH
   • HOSTINGER_USERNAME / HOSTINGER_PASSWORD

3. Faça push para main. O Actions executará.

-------------------------------------------------------------

VERIFICAÇÃO PÓS-DEPLOY:
1. Acesse https://studiologos.com.br
2. Abra DevTools (F12) -> Network
3. Recarregue a página (Ctrl+F5)
4. Verifique se index.html e assets/*.js são carregados com status 200

Se ainda mostrar tela branca:
• Limpe cache do navegador
• Verifique se os arquivos estão em /public_html/ (não /public_html/dist/)
• Verifique console do navegador para erros JavaScript
""")

def main():
    print("\n[DIAGNOSTICO] Deploy - StudioLogos Biblioteca\n")
    
    ok = True
    ok &= check_build_output()
    ok &= check_vite_config()
    ok &= check_workflows()
    
    print_hostinger_setup()
    
    print("\n" + "="*60)
    if ok:
        print(" Tudo OK. Siga as instruções acima para configurar o Hostinger.")
    else:
        print("❌ Há problemas. Corrija antes de fazer deploy.")
    print("="*60)

if __name__ == "__main__":
    main()
