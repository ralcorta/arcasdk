/**
 * Register Repository Port
 * Port defined by the application layer for register/padron operations
 * Infrastructure layer must implement this port
 */
import {
  RegisterServerStatusDto,
  TaxpayerDetailsDto,
  TaxpayersDetailsDto,
  TaxIDByDocumentResultDto,
} from "@application/dto/register.dto";

export enum RegisterScope {
  FOUR = "WSSR_PADRON_FOUR",
  FIVE = "WSSR_PADRON_FIVE",
  TEN = "WSSR_PADRON_TEN",
  THIRTEEN = "WSSR_PADRON_THIRTEEN",
  INSCRIPTION_PROOF = "WSSR_INSCRIPTION_PROOF",
}

export interface IRegisterRepositoryPort {
  /**
   * Get server status for a register service
   * @param scope Register scope
   * @returns Server status information
   */
  getServerStatus(scope: RegisterScope): Promise<RegisterServerStatusDto>;

  /**
   * Get taxpayer details by identifier
   * @param scope Register scope
   * @param identifier Taxpayer identifier (CUIT or ID)
   * @returns Taxpayer details or null if not found
   */
  getTaxpayerDetails(
    scope: RegisterScope,
    identifier: number
  ): Promise<TaxpayerDetailsDto | null>;

  /**
   * Get multiple taxpayers details by identifiers
   * @param scope Register scope (only available for FIVE and INSCRIPTION_PROOF)
   * @param identifiers Array of taxpayer identifiers
   * @returns Taxpayers details
   */
  getTaxpayersDetails(
    scope: RegisterScope,
    identifiers: number[]
  ): Promise<TaxpayersDetailsDto>;

  /**
   * Get tax ID by document number
   * @param scope Register scope (only available for THIRTEEN)
   * @param documentNumber Document number
   * @returns Tax ID result
   */
  getTaxIDByDocument(
    scope: RegisterScope,
    documentNumber: string
  ): Promise<TaxIDByDocumentResultDto>;
}

