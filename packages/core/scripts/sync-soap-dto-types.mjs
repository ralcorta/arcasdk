#!/usr/bin/env node
/**
 * Regenerates application-layer SOAP DTO type files from infrastructure WSDL codegen.
 * Run from repo root: node packages/core/scripts/sync-soap-dto-types.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const coreRoot = join(__dirname, "..");
const infraSoapRoot = join(
  coreRoot,
  "src/infrastructure/soap/contracts",
);

const SERVICES = [
  {
    name: "FEX",
    source: join(infraSoapRoot, "FEXService/ServiceSoap.ts"),
    target: join(coreRoot, "src/application/dto/fex/fex-types.ts"),
    clientMarker: "export interface IServiceSoapSoap extends Client",
    namespaceFrom: "ServiceSoapTypes",
    namespaceTo: "FexSoapTypes",
    header:
      "/**\n * Application-layer SOAP DTOs for FEXService.\n * Mirrors WSDL codegen shapes without importing infrastructure.\n */",
  },
  {
    name: "FECRED",
    source: join(infraSoapRoot, "FECredService/ServiceSoap.ts"),
    target: join(coreRoot, "src/application/dto/fecred/fecred-types.ts"),
    clientMarker: "export interface IFECredServiceSOAPSoap extends Client",
    namespaceFrom: "FECredServiceSOAPTypes",
    namespaceTo: "FecredSoapTypes",
    header:
      "/**\n * Application-layer SOAP DTOs for FECredService.\n * Mirrors WSDL codegen shapes without importing infrastructure.\n */",
  },
];

function extractDtoContent(source, clientMarker) {
  const lines = source.split("\n");
  const clientIndex = lines.findIndex((line) => line.startsWith(clientMarker));
  if (clientIndex === -1) {
    throw new Error(`Client marker not found: ${clientMarker}`);
  }

  const namespaceIndex = lines.findIndex(
    (line, index) =>
      index > clientIndex && line.startsWith("export namespace "),
  );
  if (namespaceIndex === -1) {
    throw new Error("Namespace block not found after client interface");
  }

  const inputOutputLines = lines.slice(1, clientIndex);
  const namespaceLines = lines.slice(namespaceIndex);

  return [...inputOutputLines, ...namespaceLines].join("\n").trimEnd();
}

for (const service of SERVICES) {
  const source = readFileSync(service.source, "utf8");
  let body = extractDtoContent(source, service.clientMarker);
  body = body.replaceAll(service.namespaceFrom, service.namespaceTo);
  body = body.replace(
    `export namespace ${service.namespaceFrom}`,
    `export namespace ${service.namespaceTo}`,
  );

  const output = `${service.header}\n${body}\n`;
  writeFileSync(service.target, output, "utf8");
  console.log(`Wrote ${service.name} types → ${service.target}`);
}
