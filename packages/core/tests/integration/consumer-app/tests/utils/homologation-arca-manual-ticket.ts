import { existsSync, mkdirSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import { isAbsolute, resolve } from "path";
import {
  Arca,
  AuthRepository,
  AccessTicket,
  ArcaServiceNames,
  type ILoginCredentials,
} from "@arcasdk/core";
import { buildContext, getCertPath, getKeyPath } from "./test-credentials";

/**
 * Misma carpeta de TA que el setup de Jest (`TEST_TICKET_CACHE_FOLDER`).
 */
function ticketsDir(): string {
  const raw = process.env.TEST_TICKET_CACHE_FOLDER;
  if (raw && isAbsolute(raw)) return raw;
  if (raw) return resolve(process.cwd(), raw);
  return resolve(process.cwd(), ".ticket-cache");
}

/**
 * WSAA vía `AuthRepository` **sin** `ticketStorage`; el TA se persiste a mano en disco
 * y luego `Arca` con `handleTicket: true` (equivalente al antiguo test en packages/core).
 */
export async function createArcaForWsfeHomologationManualTicket(): Promise<Arca> {
  const keyPath = getKeyPath();
  const certPath = getCertPath();
  if (!existsSync(keyPath) || !existsSync(certPath)) {
    throw new Error(
      "Faltan certificados de homologación. Configure TEST_CREDENTIALS_FOLDER, " +
        "TEST_PRIVATE_KEY_FILE_NAME, TEST_CERT_FILE_NAME (o rutas absolutas).",
    );
  }

  const cuit = parseInt(
    process.env.TEST_CUIT ?? process.env.CUIT ?? "20111111112",
    10,
  );
  const production = false;
  const serviceName = ArcaServiceNames.WSFE;

  const baseContext = buildContext({ cuit });
  const dir = ticketsDir();
  mkdirSync(dir, { recursive: true });

  const ticketFileName = `TA-${cuit}-${serviceName}${
    production ? "-production" : ""
  }.json`;
  const ticketFilePath = resolve(dir, ticketFileName);

  let ticket: AccessTicket | null = null;

  if (existsSync(ticketFilePath)) {
    try {
      const fileData = await readFile(ticketFilePath, "utf8");
      const ticketData = JSON.parse(fileData) as ILoginCredentials;
      ticket = AccessTicket.create(ticketData);
      if (ticket.isExpired()) ticket = null;
    } catch {
      ticket = null;
    }
  }

  if (!ticket) {
    const authRepository = new AuthRepository({
      cert: baseContext.cert,
      key: baseContext.key,
      cuit: baseContext.cuit,
      production,
      handleTicket: false,
    });

    ticket = await authRepository.login(serviceName);
    if (!ticket) throw new Error("No se pudo obtener access ticket");

    const ticketData = {
      header: ticket.getHeaders(),
      credentials: ticket.getCredentials(),
    };
    await writeFile(
      ticketFilePath,
      JSON.stringify(ticketData, null, 2),
      "utf8",
    );
  }

  return new Arca(
    buildContext({
      cuit,
      handleTicket: true,
      credentials: ticket.toLoginCredentials(),
    }),
  );
}
