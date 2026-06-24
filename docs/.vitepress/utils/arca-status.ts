export type ServiceStatus = "operational" | "degraded" | "down";

export interface ServiceCheck {
  id: string;
  name: string;
  status: ServiceStatus;
  servers: { app: string | null; db: string | null; auth: string | null };
  latencyMs: number;
  error: string | null;
}

export interface EnvironmentStatus {
  label: string;
  production: boolean;
  services: ServiceCheck[];
}

export interface StatusPayload {
  updatedAt: string;
  environments: {
    production: EnvironmentStatus;
    homologation: EnvironmentStatus;
  };
}

export function deriveOverallStatus(
  services: Array<{ status: ServiceStatus }>,
): ServiceStatus {
  if (services.some((service) => service.status === "down")) return "down";
  if (services.some((service) => service.status === "degraded")) return "degraded";
  return "operational";
}

export function statusLabel(status: ServiceStatus): string {
  switch (status) {
    case "operational":
      return "Operativo";
    case "degraded":
      return "Degradado";
    default:
      return "Caído";
  }
}

export function formatUpdatedAt(iso: string): string {
  try {
    return new Intl.DateTimeFormat("es-AR", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "America/Argentina/Buenos_Aires",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function isStatusPayload(value: unknown): value is StatusPayload {
  if (!value || typeof value !== "object") return false;

  const payload = value as StatusPayload;
  const environments = payload.environments;

  return (
    typeof payload.updatedAt === "string" &&
    !!environments &&
    Array.isArray(environments.production?.services) &&
    environments.production.services.length > 0 &&
    Array.isArray(environments.homologation?.services) &&
    environments.homologation.services.length > 0
  );
}

export class StatusUnavailableError extends Error {
  constructor() {
    super("STATUS_UNAVAILABLE");
    this.name = "StatusUnavailableError";
  }
}

export async function fetchStatusPayload(
  url: string,
  timeoutMs = 12_000,
): Promise<StatusPayload> {
  if (!url) {
    throw new StatusUnavailableError();
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${url}${url.includes("?") ? "&" : "?"}t=${Date.now()}`, {
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data: unknown = await response.json();

    if (!isStatusPayload(data)) {
      throw new StatusUnavailableError();
    }

    return data;
  } finally {
    clearTimeout(timeoutId);
  }
}
