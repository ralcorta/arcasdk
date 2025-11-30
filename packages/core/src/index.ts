/**
 * ARCA SDK - Main Entry Point
 * Exports the main facade class and public types
 */
export { Arca } from "./arca";
export type { Context } from "./application/types";
export type { IVoucher, INextVoucher } from "./domain/types/voucher.types";
export type { ICreateVoucherResult } from "./application/types/result.types";

// Export services for type inference
export { ElectronicBillingService } from "./application/services/electronic-billing.service";
export { RegisterInscriptionProofService } from "./application/services/register-inscription-proof.service";
export { RegisterScopeFourService } from "./application/services/register-scope-four.service";
export { RegisterScopeFiveService } from "./application/services/register-scope-five.service";
export { RegisterScopeTenService } from "./application/services/register-scope-ten.service";
export { RegisterScopeThirteenService } from "./application/services/register-scope-thirteen.service";
