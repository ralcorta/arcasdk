/**
 * Application DTOs — contracts for ports, use cases, and public services.
 *
 * - Inputs and outputs of repository ports live under dto/<servicio>/
 * - Shared cross-service DTOs live in dto/common/
 * - Cross-cutting application types (Context, WSAuthParam) live in types/
 */
export * from "./authentication";
export * from "./common";
export * from "./electronic-billing";
export * from "./register";
