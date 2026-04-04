/**
 * ARCA SDK - Main Entry Point
 * Exports the main facade class and public types
 */
export * from "./application";
export * from "./domain";
export * from "./infrastructure";

export { Arca } from "./infrastructure/composition/arca";
export { FileSystemTicketStorage } from "./infrastructure/outbound/adapters/storage/file-system-ticket-storage";
export { AuthRepository } from "./infrastructure/outbound/adapters/repositories/auth/auth.repository";
export { SoapRuntime } from "./infrastructure/utils/soap-runtime";
export { DateTimeRef } from "./infrastructure/utils/datetime-ref";
export {
  MS_PER_MINUTE,
  MS_PER_SECOND,
  WSAA_TRA_VALIDITY_WINDOW_MS,
} from "./infrastructure/constants/time.constants";
export { Context } from "./application/types";
