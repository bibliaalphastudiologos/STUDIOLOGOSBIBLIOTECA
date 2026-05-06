# Deploy Studio Logos - Biblioteca Premium

## 🎯 Problema Resolvido

**Sintoma**: Tela branca após deploy, arquivos indo para pasta pública errada.

**Causa raiz**:
- Workflow `full-deploy.yml` utilizava `strip_components: 0` no SFTP, enviando arquivos para `/public_html/dist/` em vez de `/public_html/`
- Envio incorreto da pasta `assets` via API (removido)
- Falta de verificação dos arquivos buildados

**Solução aplicada**:
- `.github/workflows/full-deploy.yml`: `strip_components` alterado para `1` (SFTP)
- Removida tentativa de deploy via API malformada
- Adicionada verificação de arquivos (`ls -la dist/`) antes de todos os deploys
- `vite.config.ts`: `outDir` explicitado como `dist`
- `src/index.css`: ordem de `@import` corrigida (antes de @tailwind)

---

## 📦 Estrutura de Deploy

```
Repositório Git (main)
    ↓ npm run build
Pasta dist/ (com index.html + assets/)
    ↓ GitHub Actions / FTP / SFTP
Hostinger → /public_html/  (arquivos devem ficar aqui)
```

**Importante**: Os arquivos dentro de `dist/` devem ser copiados **diretamente** para `/public_html/`, **não** para `/public_html/dist/`.

---

## 🔧 Workflows Disponíveis

### 1. Deploy Padrão (FTP) - Recomendado
**Arquivo**: `.github/workflows/deploy.yml`

Usa FTP com exclusive de arquivos desnecessários. Requer secrets:
- `FTP_HOST`
- `FTP_USERNAME`
- `FTP_PASSWORD`

### 2. Deploy Final (FTP)
**Arquivo**: `.github/workflows/deploy_final.yml`

Similar ao deploy.yml, sem exclusões. Use se precisar de todos os arquivos.

### 3. Deploy Completo (Hostinger Action + SFTP + FTP fallback)
**Arquivo**: `.github/workflows/full-deploy.yml`

Três tentativas em ordem:
1. **Hostinger Action** (se secrets `HOSTINGER_USERNAME` e `HOSTINGER_PASSWORD` estiverem definidos)
2. **SFTP/SSH** (se keys `SSH_PRIVATE_KEY` estiverem definidas)
3. **FTP** (fallback final)

### 4. Deploy via Hostinger Action Apenas
**Arquivo**: `.github/workflows/hostinger-deploy.yml`

Usa exclusivamente a action oficial do Hostinger.

### 5. Build e Commit no branch `deploy`
**Arquivo**: `.github/workflows/build-deploy.yml`

Gera `dist/` e faz commit forçado no branch `deploy`. Use se o Hostinger estiver configurado para puxar desse branch.

---

## ⚙️ Configuração no Hostinger

### Opção A: Usar GitHub Actions + FTP/SFTP (Recomendado)

1. No Hostinger hPanel:
   - **Advanced** → **SSH Access** → **Generate Key** (se for usar SFTP)
   - Copie a **Public Key**

2. No GitHub → Settings → Deploy Keys:
   - Adicione a public key do Hostinger
   - ✅ Allow write access

3. No GitHub → Settings → Secrets and variables → Actions:
   Adicione os seguintes secrets:

   | Name | Valor (exemplo) |
   |------|-----------------|
   | `FTP_HOST` | `ftp.studiologos.com.br` |
   | `FTP_USERNAME` | `analista.ericksilva@gmail.com` |
   | `FTP_PASSWORD` | `<senha_ftp>` |
   | `SFTP_HOST` | `studiologos.com.br` |
   | `SFTP_USERNAME` | `analista.ericksilva@gmail.com` |
   | `SSH_PRIVATE_KEY` | chave privada SSH |

4. Faça push para `main`. O Actions executará automaticamente.

### Opção B: Integração Direta do Hostinger (Webhook)

1. No hPanel → **Advanced** → **Git**:
   - Repository: `git@github.com:bibliaalphastudiologos/STUDIOLOGOSBIBLIOTECA.git`
   - Branch: `main`
   - Install Path: `public_html`
   - **Build command**: `npm ci && npm run build`
   - **Build output directory**: `dist`

2. Clique em **Create** e depois **Pull**.

3. **Importante**: O campo **Build output directory** deve ser `dist`. O Hostinger moverá automaticamente o conteúdo de `dist/` para `public_html/` após o build. Se estiver vazio, os arquivos fonte (src/) serão servidos, causando tela branca.

---

## 🚨 Problemas Comuns

### Tela branca após deploy
**Causa**: Arquivos foram para `/public_html/dist/` em vez de `/public_html/`.

**Solução**:
- Se usar SFTP: `strip_components: 1` (já corrigido)
- Se usar FTP: `local-dir: ./dist` (já correto)
- Se usar Hostinger Git: **Build output directory** = `dist`

### Erro 530 FTP
Use SFTP (SSH) que é mais confiável, ou verifique usuário/senha.

### CSS não carrega
O `@import` de fontes deve vir antes das diretivas `@tailwind`. Já corrigido.

---

## 🔄 Workflow Recomendado

Use o **deploy.yml** (FTP) ou **hostinger-deploy.yml** (Action oficial) como Padrão. Desabilite o webhook do Hostinger se usar GitHub Actions para evitar conflitos.

Para desativar o webhook:
- No hPanel → **Advanced** → **Git** → Delete ou desative a integração.

---

## 📝 Notas

- A pasta `dist/` é gerada automaticamente por `npm run build` e **não** deve ser comitada.
- Não há pasta `public/` no repositório. O destino final é sempre `/public_html/` no servidor.
- O arquivo `index.html` em `dist/` é o entrypoint. Todos os assets são referenciados automaticamente com hash.
