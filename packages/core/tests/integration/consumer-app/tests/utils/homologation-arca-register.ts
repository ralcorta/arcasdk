import { existsSync } from "fs";
import { resolve } from "path";
import { Arca } from "@arcasdk/core";
import { buildContext, getCertPath, getKeyPath } from "./test-credentials";

export function createArcaForHomologation(): Arca {
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

  const baseContext = buildContext({ cuit, handleTicket: false });

  return new Arca({
    ...baseContext,
    handleTicket: false,
    ticketPath: resolve(process.cwd(), ".ticket-cache"),
  });
}

export const createArcaForRegisterHomologation = createArcaForHomologation;
export const createArcaForWsfexHomologation = createArcaForHomologation;
export const createArcaForWsfecredHomologation = createArcaForHomologation;
export const createArcaForGenericHomologation = createArcaForHomologation;
