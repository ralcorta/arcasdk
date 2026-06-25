/**
 * Health check de servicios ARCA/AFIP vía métodos Dummy.
 * Usado por GitHub Actions; no requiere certificado real (los dummy no usan WSAA).
 */
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Arca, ArcaServiceNames } from "@arcasdk/core";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH =
  process.env.ARCA_STATUS_OUTPUT ??
  resolve(__dirname, "arca-status.json");

const REQUEST_TIMEOUT_MS = Number(process.env.ARCA_STATUS_TIMEOUT_MS ?? 30_000);

/** Cert/key placeholder: no se usan en llamadas dummy sin auth. */
const PLACEHOLDER_CERT = "-----BEGIN CERTIFICATE-----\nMIIB\n-----END CERTIFICATE-----";
const PLACEHOLDER_KEY = "-----BEGIN PRIVATE KEY-----\nMIIE\n-----END PRIVATE KEY-----";

/** @type {const} */
const SERVICE_CHECKS = [
  {
    id: "wsfe",
    name: "Facturación electrónica (WSFE)",
    serviceName: ArcaServiceNames.WSFE,
    method: "FEDummy",
    parseServers: (result) => ({
      app: result?.FEDummyResult?.AppServer,
      db: result?.FEDummyResult?.DbServer,
      auth: result?.FEDummyResult?.AuthServer,
    }),
  },
  {
    id: "wsfex",
    name: "Facturación de exportación (WSFEX)",
    serviceName: ArcaServiceNames.WSFEX,
    method: "FEXDummy",
    parseServers: (result) => ({
      app: result?.FEXDummyResult?.AppServer,
      db: result?.FEXDummyResult?.DbServer,
      auth: result?.FEXDummyResult?.AuthServer,
    }),
  },
  {
    id: "padron_a4",
    name: "Padrón alcance 4",
    serviceName: ArcaServiceNames.WSSR_PADRON_FOUR,
    method: "dummy",
    parseServers: (result) => ({
      app: result?.return?.appserver,
      db: result?.return?.dbserver,
      auth: result?.return?.authserver,
    }),
  },
  {
    id: "padron_a5",
    name: "Padrón alcance 5",
    serviceName: ArcaServiceNames.WSSR_PADRON_FIVE,
    method: "dummy",
    parseServers: (result) => ({
      app: result?.return?.appserver,
      db: result?.return?.dbserver,
      auth: result?.return?.authserver,
    }),
  },
  {
    id: "padron_a10",
    name: "Padrón alcance 10",
    serviceName: ArcaServiceNames.WSSR_PADRON_TEN,
    method: "dummy",
    parseServers: (result) => ({
      app: result?.return?.appserver,
      db: result?.return?.dbserver,
      auth: result?.return?.authserver,
    }),
  },
  {
    id: "padron_a13",
    name: "Padrón alcance 13",
    serviceName: ArcaServiceNames.WSSR_PADRON_THIRTEEN,
    method: "dummy",
    parseServers: (result) => ({
      app: result?.return?.appserver,
      db: result?.return?.dbserver,
      auth: result?.return?.authserver,
    }),
  },
  {
    id: "constancia_inscripcion",
    name: "Constancia de inscripción",
    serviceName: ArcaServiceNames.WSSR_INSCRIPTION_PROOF,
    method: "dummy",
    parseServers: (result) => ({
      app: result?.return?.appserver,
      db: result?.return?.dbserver,
      auth: result?.return?.authserver,
    }),
  },
];

/**
 * @param {string | undefined} value
 */
function isOk(value) {
  return typeof value === "string" && value.trim().toUpperCase() === "OK";
}

/**
 * @param {{ app?: string; db?: string; auth?: string }} servers
 */
function deriveStatus(servers) {
  const values = [servers.app, servers.db, servers.auth];
  if (values.every(isOk)) return "operational";
  if (values.some(isOk)) return "degraded";
  return "down";
}

/**
 * @param {Promise<unknown>} promise
 * @param {number} timeoutMs
 */
async function withTimeout(promise, timeoutMs) {
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = setTimeout(
      () => reject(new Error(`Timeout after ${timeoutMs}ms`)),
      timeoutMs,
    );
  });

  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * @param {boolean} production
 */
function createArca(production) {
  return new Arca({
    cuit: 20111111112,
    cert: PLACEHOLDER_CERT,
    key: PLACEHOLDER_KEY,
    production,
    handleTicket: false,
    useHttpsAgent: true,
  });
}

/**
 * @param {boolean} production
 */
async function checkEnvironment(production) {
  const arca = createArca(production);
  const services = [];

  for (const check of SERVICE_CHECKS) {
    const startedAt = Date.now();
    try {
      const result = await withTimeout(
        arca.genericService.call(check.serviceName, check.method, {}),
        REQUEST_TIMEOUT_MS,
      );

      const servers = check.parseServers(result);
      services.push({
        id: check.id,
        name: check.name,
        serviceName: check.serviceName,
        method: check.method,
        status: deriveStatus(servers),
        servers: {
          app: servers.app ?? null,
          db: servers.db ?? null,
          auth: servers.auth ?? null,
        },
        latencyMs: Date.now() - startedAt,
        error: null,
      });
    } catch (error) {
      services.push({
        id: check.id,
        name: check.name,
        serviceName: check.serviceName,
        method: check.method,
        status: "down",
        servers: { app: null, db: null, auth: null },
        latencyMs: Date.now() - startedAt,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return {
    label: production ? "Producción" : "Homologación",
    production,
    services,
  };
}

async function main() {
  const [production, homologation] = await Promise.all([
    checkEnvironment(true),
    checkEnvironment(false),
  ]);

  const payload = {
    updatedAt: new Date().toISOString(),
    checkedBy: "github-actions",
    disclaimer:
      "Monitoreo independiente vía métodos Dummy. No es un estado oficial de ARCA/AFIP.",
    environments: {
      production,
      homologation,
    },
  };

  writeFileSync(OUTPUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`Wrote ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
