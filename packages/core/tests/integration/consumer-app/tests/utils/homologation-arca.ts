import { existsSync, mkdirSync } from "fs";
import { isAbsolute, resolve } from "path";
import {
  Arca,
  AuthRepository,
  FileSystemTicketStorage,
  ArcaServiceNames,
} from "@arcasdk/core";
import { buildContext, getCertPath, getKeyPath } from "./test-credentials";

/**
 * Carpeta donde se guardan los TA de WSAA (mismo CUIT/servicio = mismo archivo).
 * Sin esto, WSAA responde `alreadyAuthenticated` si ya emitió un TA válido y el
 * cliente vuelve a llamar a loginCms sin reutilizar el XML del ticket.
 */
function resolveTicketCachePath(): string {
  const raw = process.env.TEST_TICKET_CACHE_FOLDER;
  if (raw && isAbsolute(raw)) return raw;
  if (raw) return resolve(process.cwd(), raw);
  return resolve(process.cwd(), ".ticket-cache");
}

export async function createArcaForWsfeHomologation(): Promise<Arca> {
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

  const baseContext = buildContext({ cuit });

  const ticketPath = resolveTicketCachePath();
  mkdirSync(ticketPath, { recursive: true });

  const authRepository = new AuthRepository({
    cert: baseContext.cert,
    key: baseContext.key,
    cuit: baseContext.cuit,
    production: false,
    handleTicket: false,
    ticketStorage: new FileSystemTicketStorage({
      ticketPath,
      cuit,
      production: false,
    }),
  });

  const ticket = await authRepository.login(ArcaServiceNames.WSFE);
  if (!ticket) throw new Error("No se pudo obtener access ticket");

  return new Arca(
    buildContext({
      cuit,
      handleTicket: true,
      credentials: ticket.toLoginCredentials(),
    }),
  );
}
