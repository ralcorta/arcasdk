/**
 * Use Case Input Types
 * Input interfaces for all use cases in the application layer
 */
import { RegisterScope } from "@application/ports/register/register-repository.port";

/**
 * Authentication Use Cases Inputs
 */
export interface GetAuthParamsInput {
  ticket: import("@domain/entities/access-ticket.entity").AccessTicket;
  cuit: number;
}

/**
 * Electronic Billing Use Cases Inputs
 */
export interface GetLastVoucherInput {
  salesPoint: number;
  voucherType: number;
}

export interface GetVoucherInfoInput {
  number: number;
  salesPoint: number;
  type: number;
}

/**
 * Register Use Cases Inputs
 */
export interface GetRegisterServerStatusInput {
  scope: RegisterScope;
}

export interface GetTaxpayerDetailsInput {
  scope: RegisterScope;
  identifier: number;
}

export interface GetTaxpayersDetailsInput {
  scope: RegisterScope;
  identifiers: number[];
}

export interface GetTaxIDByDocumentInput {
  scope: RegisterScope;
  documentNumber: string;
}

