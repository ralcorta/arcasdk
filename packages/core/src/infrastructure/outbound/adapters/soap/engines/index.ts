/**
 * SOAP Protocol Engines
 *
 * This module manages the low-level transport and security engines.
 * It provides a unified way to create a SOAP-compatible HttpClient
 * regardless of the environment (Node.js vs Universal/Fetch).
 */

export { createSoapEngine, type EngineConfig } from "./soap-engine.factory";
