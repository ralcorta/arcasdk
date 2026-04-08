import { readFileSync } from "fs";
import { resolve } from "path";
import type { Context } from "@arcasdk/core";

export function getKeyPath(): string {
  const folder =
    process.env.TEST_CREDENTIALS_FOLDER ?? "test-credentials";
  const name = process.env.TEST_PRIVATE_KEY_FILE_NAME ?? "homologacion.key";
  if (folder.startsWith("/")) return resolve(folder, name);
  return resolve(process.cwd(), folder, name);
}

export function getCertPath(): string {
  const folder =
    process.env.TEST_CREDENTIALS_FOLDER ?? "test-credentials";
  const name = process.env.TEST_CERT_FILE_NAME ?? "homologacion.crt";
  if (folder.startsWith("/")) return resolve(folder, name);
  return resolve(process.cwd(), folder, name);
}

export function buildContext(opts: {
  cuit: number;
  handleTicket?: boolean;
  credentials?: Context["credentials"];
}): Context {
  const keyPath = getKeyPath();
  const certPath = getCertPath();
  const key = readFileSync(keyPath, "utf8");
  const cert = readFileSync(certPath, "utf8");
  return {
    production: false,
    cert,
    key,
    cuit: opts.cuit,
    handleTicket: opts.handleTicket,
    credentials: opts.credentials,
  };
}
