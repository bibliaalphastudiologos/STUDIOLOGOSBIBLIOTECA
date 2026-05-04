#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════
 *   STUDIO LOGOS — Setup Firebase Automático
 *   github.com/bibliaalphastudiologos/STUDIOLOGOSBIBLIOTECA
 * ═══════════════════════════════════════════════════
 *
  * Como usar (rode UMA ÚNICA VEZ no seu computador):
 *
 * GITHUB_TOKEN=seu_token node setup-firebase.js
 *
 * O que este script faz:
 *   1. Garante que firebase-tools está instalado
 *   2. Abre o Google para você autorizar (1 clique)
 *   3. Adiciona studiologos.com.br nos domínios autorizados do Firebase Auth
 *   4. Salva o FIREBASE_TOKEN no GitHub Actions (deploys automáticos)
 *
 * Requisitos: Node.js ≥ 18, acesso à internet
 */

const { execSync, spawnSync, exec } = require('child_process');
const https = require('https');
const readline = require('readline');
const fs = require('fs');
const os = require('os');

// ── Configuração do projeto ──────────────────────────────────────────────────
const CONFIG = {
  projectId:  'sentinela-ai-489015',
  githubRepo: 'bibliaalphastudiologos/STUDIOLOGOSBIBLIOTECA',
  githubToken: process.env.GITHUB_TOKEN || '',
  domains: ['studiologos.com.br', 'www.studiologos.com.br'],
};

// ── Cores no terminal ────────────────────────────────────────────────────────
const K = {
  reset: '\x1b[0m', bold: '\x1b[1m',
  green: '\x1b[32m', yellow: '\x1b[33m',
  blue: '\x1b[34m', red: '\x1b[31m', cyan: '\x1b[36m', dim: '\x1b[2m',
};
const log  = (m, c = '')  => console.log(`${c}${m}${K.reset}`);
const step = (n, m)       => log(`\n  [${n}] ${m}`, K.bold + K.cyan);
const ok   = m            => log(`      ✓ ${m}`, K.green);
const warn = m            => log(`      ⚠ ${m}`, K.yellow);
const fail = m            => log(`      ✗ ${m}`, K.red);

function ask(q) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(r => rl.question(`\n      ${q}: `, a => { rl.close(); r(a.trim()); }));
}

function httpRequest(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    if (body) req.write(typeof body === 'string' ? body : JSON.stringify(body));
    req.end();
  });
}

// ── 1. Firebase CLI ──────────────────────────────────────────────────────────
function ensureFirebaseCLI() {
  step(1, 'Verificando firebase-tools');
  try {
    const v = execSync('firebase --version', { stdio: 'pipe', encoding: 'utf8' }).trim();
    ok(`firebase-tools ${v} já instalado`);
    return 'firebase';
  } catch {
    warn('Não encontrado — instalando globalmente...');
    execSync('npm install -g firebase-tools', { stdio: 'inherit' });
    ok('firebase-tools instalado');
    return 'firebase';
  }
}

// ── 2. Login e obter access token ────────────────────────────────────────────
async function getAccessToken() {
  step(2, 'Login Firebase (Google OAuth)');
  log('', '');
  log('      O browser vai abrir. Autorize sua conta Google e volte aqui.', K.yellow);
  log('      Se não abrir automaticamente, copie a URL que aparecer.', K.dim);

  // Tenta login:ci (interativo — abre o browser)
  let ciToken = '';
  try {
    // Rodar em modo que herda stdin/stdout do terminal
    const result = spawnSync('firebase', ['login:ci', '--no-localhost'], {
      stdio: 'inherit',
      encoding: 'utf8',
      env: { ...process.env, TERM: process.env.TERM || 'xterm' }
    });
    // O token fica no stdout — mas com inherit ele já foi exibido
    // Então pedimos para o usuário colar
  } catch(e) {
    warn(`Erro ao executar login:ci: ${e.message}`);
  }

  ciToken = await ask('Cole aqui o token gerado pelo Firebase (começa com 1//)');

  if (!ciToken || !ciToken.startsWith('1//')) {
    throw new Error('Token inválido. Execute "firebase login:ci" manualmente e cole o resultado.');
  }

  // Trocar CI token por access token OAuth
  step('2b', 'Obtendo access token do Google');
  const tokenData = execSync(
    `node -e "
      try {
        const mod = require('firebase-tools/lib/auth') || require('/usr/local/lib/node_modules/firebase-tools/lib/auth');
        mod.getAccessToken('${ciToken}', ['https://www.googleapis.com/auth/firebase','https://www.googleapis.com/auth/cloud-platform'])
          .then(t => { console.log(JSON.stringify({token: t.access_token})); })
          .catch(e => { console.error('ERR:' + e.message); });
      } catch(e) { console.error('MODULE_ERR:' + e.message); }
    "`,
    { encoding: 'utf8', timeout: 30000 }
  ).trim();

  let accessToken = '';
  try {
    const parsed = JSON.parse(tokenData.split('\n').find(l => l.startsWith('{')));
    accessToken = parsed.token;
  } catch {
    // Tentar via firebase-tools diretamente
    const out = execSync(
      `firebase --token "${ciToken}" --project ${CONFIG.projectId} apps:list --json 2>&1`,
      { encoding: 'utf8', timeout: 30000 }
    );
    // Se chegou aqui, o token CI é válido — precisamos do access token de outra forma
    warn('Usando método alternativo para access token');
  }

  return { ciToken, accessToken };
}

// ── 3. Adicionar domínios via API ────────────────────────────────────────────
async function addAuthorizedDomains(ciToken) {
  step(3, `Adicionando domínios autorizados no Firebase Auth`);
  log(`      Domínios: ${CONFIG.domains.join(', ')}`, K.blue);

  // Primeiro obtemos o access token usando o firebase CLI diretamente
  let accessToken = '';
  try {
    const result = execSync(
      `node -e "
        const path = require('path');
        let auth;
        const paths = [
          'firebase-tools/lib/auth',
          '/usr/local/lib/node_modules/firebase-tools/lib/auth',
          path.join(require.resolve('firebase-tools'), '../../lib/auth')
        ];
        for (const p of paths) {
          try { auth = require(p); break; } catch {}
        }
        if (!auth) throw new Error('firebase-tools/lib/auth não encontrado');
        auth.getAccessToken('${ciToken}', [
          'https://www.googleapis.com/auth/firebase',
          'https://www.googleapis.com/auth/cloud-platform'
        ]).then(t => process.stdout.write(t.access_token)).catch(e => process.stderr.write(e.message));
      "`,
      { encoding: 'utf8', timeout: 30000 }
    );
    accessToken = result.trim();
  } catch (e) {
    // Alternativa: usar a gcloud se disponível
    try {
      accessToken = execSync('gcloud auth print-access-token 2>/dev/null', { encoding: 'utf8' }).trim();
    } catch {}
  }

  if (!accessToken) {
    warn('Não foi possível obter access token automaticamente.');
    accessToken = await ask('Cole aqui seu Google Access Token (ou deixe vazio para pular)');
    if (!accessToken) {
      warn('Pulando configuração automática de domínios.');
      warn('Faça manualmente em: console.firebase.google.com → Authentication → Settings → Authorized domains');
      warn(`Adicione: ${CONFIG.domains.join(' e ')}`);
      return;
    }
  }

  // GET config atual
  const getRes = await httpRequest({
    hostname: 'identitytoolkit.googleapis.com',
    path: `/v2/projects/${CONFIG.projectId}/config`,
    method: 'GET',
    headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' }
  });

  if (getRes.status !== 200) {
    fail(`Erro ao ler config: ${getRes.status} — ${JSON.stringify(getRes.body).slice(0, 200)}`);
    return;
  }

  const existing = getRes.body.authorizedDomains || [];
  const merged = [...new Set([...existing, ...CONFIG.domains])];
  const added = CONFIG.domains.filter(d => !existing.includes(d));

  if (added.length === 0) { ok('Domínios já estavam configurados!'); return; }

  // PATCH config
  const patchRes = await httpRequest({
    hostname: 'identitytoolkit.googleapis.com',
    path: `/v2/projects/${CONFIG.projectId}/config?updateMask=authorizedDomains`,
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' }
  }, { authorizedDomains: merged });

  if (patchRes.status !== 200) {
    fail(`Erro ao atualizar: ${patchRes.status} — ${JSON.stringify(patchRes.body).slice(0, 200)}`);
    return;
  }

  added.forEach(d => ok(`Adicionado: ${d}`));
  ok(`Total de domínios: ${merged.join(', ')}`);
}

// ── 4. Salvar token no GitHub Secrets ────────────────────────────────────────
async function saveToGitHubSecrets(ciToken) {
  step(4, 'Salvando FIREBASE_TOKEN no GitHub Actions');

  // Buscar public key do repo
  const pkRes = await httpRequest({
    hostname: 'api.github.com',
    path: `/repos/${CONFIG.githubRepo}/actions/secrets/public-key`,
    method: 'GET',
    headers: {
      'Authorization': `token ${CONFIG.githubToken}`,
      'User-Agent': 'StudioLogos-Setup',
      'Accept': 'application/vnd.github.v3+json'
    }
  });

  if (pkRes.status !== 200) {
    warn(`GitHub API: ${pkRes.status}. Salve manualmente: Settings → Secrets → FIREBASE_TOKEN`);
    log(`      Valor: ${ciToken.slice(0, 30)}...`, K.dim);
    return;
  }

  // Criptografar com libsodium
  try {
    const sodium = require('libsodium-wrappers');
    await sodium.ready;

    const keyBytes = Buffer.from(pkRes.body.key, 'base64');
    const msgBytes = Buffer.from(ciToken);
    const encrypted = Buffer.from(sodium.crypto_box_seal(msgBytes, keyBytes)).toString('base64');

    const putRes = await httpRequest({
      hostname: 'api.github.com',
      path: `/repos/${CONFIG.githubRepo}/actions/secrets/FIREBASE_TOKEN`,
      method: 'PUT',
      headers: {
        'Authorization': `token ${CONFIG.githubToken}`,
        'User-Agent': 'StudioLogos-Setup',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      }
    }, { encrypted_value: encrypted, key_id: pkRes.body.key_id });

    if ([201, 204].includes(putRes.status)) ok('FIREBASE_TOKEN salvo no GitHub!');
    else warn(`Resposta inesperada: ${putRes.status}`);

  } catch (sodiumErr) {
    warn('libsodium não disponível. Instale: npm install -g libsodium-wrappers');
    warn(`Salve manualmente em GitHub → Settings → Secrets → FIREBASE_TOKEN`);
    log(`      Valor: ${ciToken.slice(0, 30)}...`, K.dim);
  }
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  console.clear();
  log('\n' + '═'.repeat(55), K.bold + K.cyan);
  log('      STUDIO LOGOS — Firebase Setup Automático', K.bold + K.cyan);
  log('═'.repeat(55) + '\n', K.bold + K.cyan);
  log(`  Projeto: ${CONFIG.projectId}`, K.blue);
  log(`  Domínios: ${CONFIG.domains.join(', ')}`, K.blue);
  log(`  Repo: ${CONFIG.githubRepo}`, K.blue);

  try {
    ensureFirebaseCLI();
    const { ciToken } = await getAccessToken();
    await addAuthorizedDomains(ciToken);
    await saveToGitHubSecrets(ciToken);

    log('\n' + '═'.repeat(55), K.bold + K.green);
    log('   ✅  CONFIGURAÇÃO COMPLETA!', K.bold + K.green);
    log('═'.repeat(55), K.bold + K.green);
    log('\n   Teste em: https://studiologos.com.br', K.cyan);
    log('   Login com Google deve funcionar agora.\n', K.cyan);

  } catch (err) {
    log('\n' + '═'.repeat(55), K.red);
    fail(`Erro: ${err.message}`);
    log('═'.repeat(55), K.red);
    log('\n   Configuração manual necessária:', K.yellow);
    log('   1. console.firebase.google.com → Auth → Settings → Authorized Domains', K.yellow);
    log(`   2. Adicionar: ${CONFIG.domains.join(' e ')}`, K.yellow);
    process.exit(1);
  }
}

main();
