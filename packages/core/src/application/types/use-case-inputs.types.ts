/**
 * Use Case Input Types
 * Input interfaces for all use cases in the application layer
 */

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
