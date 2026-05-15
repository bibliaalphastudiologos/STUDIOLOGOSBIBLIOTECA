const activities = [
  {
    title: "Auditoria SEO internacional",
    detail: "Mapeando oportunidades em ingles e espanhol",
    status: "done"
  },
  {
    title: "Prospecção de anunciantes",
    detail: "Lista de empresas com pagamento em USD",
    status: "active"
  },
  {
    title: "Posts para redes abertas",
    detail: "Rascunhos prontos para aprovacao",
    status: "pending"
  },
  {
    title: "Oferta comercial",
    detail: "Pacote de propaganda e afiliados",
    status: "pending"
  }
];

const activityList = document.querySelector("#activityList");
const successRange = document.querySelector("#successRange");
const successValue = document.querySelector("#successValue");
const revenue = document.querySelector("#revenue");
const leads = document.querySelector("#leads");
const tasksDone = document.querySelector("#tasksDone");
const cycleLabel = document.querySelector("#cycleLabel");
const startBtn = document.querySelector("#startBtn");
const siteUrl = document.querySelector("#siteUrl");
const repairState = document.querySelector("#repairState");
const healthScore = document.querySelector("#healthScore");
const repairLog = document.querySelector("#repairLog");
const scanBtn = document.querySelector("#scanBtn");
const repairBtn = document.querySelector("#repairBtn");
const rollbackBtn = document.querySelector("#rollbackBtn");

let cycle = 1;
let taskCount = 34;
let leadCount = 128;
let health = 98;

const repairEvents = [
  "Pagina inicial respondeu em 214ms.",
  "API principal estavel, sem erro 5xx.",
  "Certificado SSL valido.",
  "Build atual marcado como saudavel."
];

function normalizeSiteUrl(value) {
  const cleanValue = value.trim();
  if (!cleanValue) {
    return "";
  }
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(cleanValue) ? cleanValue : `https://${cleanValue}`;
}

function renderActivities() {
  activityList.innerHTML = activities
    .map((activity) => {
      const state = activity.status === "active" ? "em andamento" : activity.status === "done" ? "feito" : "fila";
      return `
        <article class="activity ${activity.status}">
          <span class="dot"></span>
          <div>
            <strong>${activity.title}</strong>
            <p>${activity.detail}</p>
          </div>
          <span>${state}</span>
        </article>
      `;
    })
    .join("");
}

function updateSuccess(value) {
  const numeric = Number(value);
  successValue.textContent = `${numeric}%`;
  revenue.textContent = `$${(1200 + numeric * 54).toLocaleString("en-US")}`;
  leads.textContent = String(Math.round(22 + numeric * 1.58));
}

function renderRepairLog() {
  repairLog.innerHTML = repairEvents
    .slice(-5)
    .reverse()
    .map((event) => `<p>${event}</p>`)
    .join("");
}

function setHealth(value, state) {
  health = Math.max(0, Math.min(100, value));
  healthScore.textContent = `${health}%`;
  repairState.textContent = state;
  document.querySelector(".health-ring").style.background = `
    radial-gradient(circle at center, #ffffff 0 55%, transparent 56%),
    conic-gradient(var(--green) 0 ${health}%, #e8ece8 ${health}% 100%)
  `;
}

async function scanSite() {
  const url = normalizeSiteUrl(siteUrl.value);
  if (!url) {
    repairEvents.push("Informe a URL real do site antes de detectar.");
    renderRepairLog();
    return;
  }

  setHealth(health, "checando site");
  repairEvents.push(`Verificacao real iniciada para ${url}.`);
  renderRepairLog();

  try {
    const response = await fetch(`/api/health?url=${encodeURIComponent(url)}`);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Falha ao checar site.");
    }
    setHealth(result.health, result.ok ? "site saudavel" : "problema detectado");
    repairEvents.push(result.message);
  } catch (error) {
    setHealth(20, "falha detectada");
    repairEvents.push(`Falha no monitoramento real: ${error.message}`);
  }

  renderRepairLog();
}

async function repairSite() {
  setHealth(health, "preparando reparo");
  try {
    const response = await fetch("/api/repair", { method: "POST" });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Falha ao preparar reparo.");
    }
    setHealth(Math.max(health, result.health), "reparo preparado");
    repairEvents.push(result.message);
  } catch (error) {
    repairEvents.push(`Nao foi possivel preparar o reparo: ${error.message}`);
  }

  renderRepairLog();
}

function rollbackSite() {
  setHealth(96, "rollback pronto");
  repairEvents.push("Rollback simulado para ultima versao saudavel.");
  repairEvents.push("Deploy anterior validado e pronto para ativacao.");
  renderRepairLog();
}

function advanceCycle() {
  const activeIndex = activities.findIndex((activity) => activity.status === "active");
  if (activeIndex >= 0) {
    activities[activeIndex].status = "done";
    const nextIndex = (activeIndex + 1) % activities.length;
    activities[nextIndex].status = "active";
  }

  cycle += 1;
  taskCount += 1;
  leadCount += Math.floor(Math.random() * 5) + 2;
  const nextSuccess = Math.min(100, Number(successRange.value) + Math.floor(Math.random() * 3));

  successRange.value = String(nextSuccess);
  tasksDone.textContent = String(taskCount);
  leads.textContent = String(leadCount);
  cycleLabel.textContent = `ciclo ${String(cycle).padStart(2, "0")}`;
  updateSuccess(nextSuccess);
  renderActivities();
}

document.querySelectorAll(".channel").forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
  });
});

successRange.addEventListener("input", (event) => {
  updateSuccess(event.target.value);
});

startBtn.addEventListener("click", async () => {
  const url = normalizeSiteUrl(siteUrl.value) || "https://meusite.com";
  siteUrl.value = url;
  activities[1].detail = `Buscando parceiros para ${url}`;
  try {
    const response = await fetch("/api/start", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ siteUrl: url })
    });
    const state = await response.json();
    if (!response.ok) {
      throw new Error(state.error || "Falha ao iniciar operacao.");
    }
    repairEvents.push("Operacao real local iniciada em modo seguro.");
    repairEvents.push(`${state.growthTasks.length} tarefas de crescimento foram carregadas.`);
  } catch (error) {
    repairEvents.push(`Nao foi possivel iniciar: ${error.message}`);
  }
  renderRepairLog();
  advanceCycle();
  scanSite();
});

scanBtn.addEventListener("click", scanSite);
repairBtn.addEventListener("click", repairSite);
rollbackBtn.addEventListener("click", rollbackSite);

renderActivities();
renderRepairLog();
updateSuccess(successRange.value);
setHealth(health, "monitorando");
window.setInterval(advanceCycle, 6500);
window.setInterval(scanSite, 12000);
