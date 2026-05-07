const BRASILIA_TIME_ZONE = "America/Sao_Paulo";

export function formatBrasiliaDate(value: unknown): string {
  let date: Date | null = null;

  if (value instanceof Date) {
    date = value;
  } else if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) date = parsed;
  } else if (value && typeof value === "object" && "toDate" in value && typeof value.toDate === "function") {
    date = value.toDate();
  } else if (value && typeof value === "object" && "seconds" in value && typeof value.seconds === "number") {
    date = new Date(value.seconds * 1000);
  }

  if (!date) return "Não registrado";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: BRASILIA_TIME_ZONE,
  }).format(date);
}

export function getBrasiliaDateString(date: Date = new Date()): string {
  return formatBrasiliaDate(date);
}

export function getAnnualExpirationDate(from: Date = new Date()): Date {
  const next = new Date(from);
  next.setFullYear(next.getFullYear() + 1);
  return next;
}

export function getMonthlyExpirationDate(from: Date = new Date()): Date {
  const next = new Date(from);
  next.setMonth(next.getMonth() + 1);
  return next;
}
