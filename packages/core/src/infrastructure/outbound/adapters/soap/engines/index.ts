/**
 * SOAP Protocol Engines
 *
 * This module manages the low-level transport and security engines.
 * It provides a unified way to create a SOAP-compatible HttpClient
 * regardless of the environment (Node.js vs Universal/Fetch).
 */

export { createSoapEngine } from "./soap-engine.factory";
export type { EngineConfig } from "@infrastructure/types/soap-engine.types";
export { detectSoapRuntime, type SoapRuntime } from "@infrastructure/utils/soap-runtime";
