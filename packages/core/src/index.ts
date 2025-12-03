/**
 * ARCA SDK - Main Entry Point
 * Exports the main facade class and public types
 */
export * from "./application";
export * from "./domain";
export * from "./infrastructure";

export { Arca } from "./infrastructure/inbound/adapters/arca";
export { FileSystemTicketStorage } from "./infrastructure/outbound/adapters/storage/file-system-ticket-storage";
export { AuthRepository } from "./infrastructure/outbound/adapters/auth/auth.repository";
export { Context } from "./application/types";
