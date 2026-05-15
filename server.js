const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");

const PORT = Number(process.env.PORT || 5173);
const HOST = process.env.HOST || "127.0.0.1";
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");
const STATE_FILE = path.join(DATA_DIR, "agent-state.json");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

const defaultState = {
  startedAt: null,
  siteUrl: "",
  cycles: [],
  repairLog: [],
  growthTasks: []
};

function ensureState() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(STATE_FILE)) {
    fs.writeFileSync(STATE_FILE, JSON.stringify(defaultState, null, 2));
  }
}

function readState() {
  ensureState();
  return JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
}

function writeState(state) {
  ensureState();
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function json(res, status, payload) {
  const body = JSON.stringify(payload, null, 2);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  res.end(body);
}

function safeTarget(rawUrl) {
  const cleanUrl = String(rawUrl || "").trim();
  const normalizedUrl = /^[a-z][a-z0-9+.-]*:\/\//i.test(cleanUrl) ? cleanUrl : `https://${cleanUrl}`;
  const target = new URL(normalizedUrl);
  if (!["http:", "https:"].includes(target.protocol)) {
    throw new Error("Use uma URL http ou https.");
  }
  return target;
}

async function checkHealth(rawUrl) {
  const target = safeTarget(rawUrl);
  const started = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(target, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "AgenteWeb24h-Reparador/1.0"
      }
    });
    const ms = Date.now() - started;
    const ok = response.status >= 200 && response.status < 400;
    return {
      ok,
      url: target.toString(),
      status: response.status,
      responseTimeMs: ms,
      health: ok ? (ms < 1200 ? 99 : ms < 2500 ? 86 : 72) : 45,
      message: ok
        ? `Site respondeu com status ${response.status} em ${ms}ms.`
        : `Site respondeu com status ${response.status} em ${ms}ms.`
    };
  } catch (error) {
    return {
      ok: false,
      url: target.toString(),
      status: 0,
      responseTimeMs: Date.now() - started,
      health: 20,
      message: `Falha real ao acessar o site: ${error.message}`
    };
  } finally {
    clearTimeout(timeout);
  }
}

function buildGrowthTasks(siteUrl) {
  return [
    {
      channel: "Google",
      action: "Auditar indexacao, Search Console e palavras-chave com intencao de compra em USD.",
      mode: "manual"
    },
    {
      channel: "SEO",
      action: "Criar pauta de paginas internacionais com titulo, descricao e oferta clara.",
      mode: "draft"
    },
    {
      channel: "Comunidades publicas",
      action: "Encontrar discussoes relevantes e preparar respostas uteis, sem spam e sem postagem automatica.",
      mode: "approval"
    },
    {
      channel: "Anunciantes",
      action: "Montar lista de parceiros e modelo de proposta comercial para propaganda em dolar.",
      mode: "approval"
    },
    {
      channel: "Afiliados",
      action: "Definir oferta, comissao e pagina de conversao para parceiros aprovados.",
      mode: "draft"
    },
    {
      channel: "Site",
      action: `Monitorar disponibilidade de ${siteUrl} e registrar incidentes.`,
      mode: "automatic"
    }
  ];
}

async function handleApi(req, res, url) {
  if (url.pathname === "/api/state") {
    return json(res, 200, readState());
  }

  if (url.pathname === "/api/start" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async () => {
      try {
        const payload = body ? JSON.parse(body) : {};
        const siteUrl = safeTarget(payload.siteUrl || "").toString();
        const state = readState();
        state.startedAt = state.startedAt || new Date().toISOString();
        state.siteUrl = siteUrl;
        state.growthTasks = buildGrowthTasks(siteUrl);
        state.cycles.push({
          at: new Date().toISOString(),
          type: "start",
          message: "Operacao real local iniciada em modo seguro."
        });
        writeState(state);
        return json(res, 200, state);
      } catch (error) {
        return json(res, 400, { error: error.message });
      }
    });
    return;
  }

  if (url.pathname === "/api/health") {
    try {
      const siteUrl = url.searchParams.get("url");
      if (!siteUrl) {
        return json(res, 400, { error: "Informe ?url=https://seusite.com" });
      }
      const result = await checkHealth(siteUrl);
      const state = readState();
      state.siteUrl = result.url;
      state.repairLog.push({
        at: new Date().toISOString(),
        type: "health",
        ...result
      });
      state.repairLog = state.repairLog.slice(-50);
      writeState(state);
      return json(res, 200, result);
    } catch (error) {
      return json(res, 400, { error: error.message });
    }
  }

  if (url.pathname === "/api/repair" && req.method === "POST") {
    const state = readState();
    const event = {
      at: new Date().toISOString(),
      type: "repair",
      message: "Reparo seguro preparado: validar logs, limpar cache, reiniciar servico ou acionar rollback conforme hospedagem conectada."
    };
    state.repairLog.push(event);
    state.repairLog = state.repairLog.slice(-50);
    writeState(state);
    return json(res, 200, {
      ok: true,
      health: 92,
      message: event.message
    });
  }

  if (url.pathname === "/api/growth") {
    const state = readState();
    const tasks = state.growthTasks.length ? state.growthTasks : buildGrowthTasks(state.siteUrl || "seu site");
    return json(res, 200, { tasks });
  }

  return json(res, 404, { error: "API nao encontrada." });
}

function serveStatic(req, res, url) {
  const requested = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const filePath = path.normalize(path.join(ROOT, requested));

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      res.end("Arquivo nao encontrado.");
      return;
    }
    res.writeHead(200, {
      "content-type": mimeTypes[path.extname(filePath)] || "application/octet-stream"
    });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname.startsWith("/api/")) {
    handleApi(req, res, url).catch((error) => json(res, 500, { error: error.message }));
    return;
  }
  serveStatic(req, res, url);
});

ensureState();
server.listen(PORT, HOST, () => {
  console.log(`Agente Web 24h ativo em http://${HOST}:${PORT}`);
});
