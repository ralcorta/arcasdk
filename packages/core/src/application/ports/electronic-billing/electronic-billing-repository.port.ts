/**
 * Electronic Billing Repository Port
 * Port defined by the application layer
 * Infrastructure layer must implement this port
 * Uses DTOs to maintain independence from infrastructure
 */
import { Voucher } from "@domain/entities/voucher.entity";
import { ICreateVoucherResult } from "@application/types/result.types";
import {
  ServerStatusDto,
  SalesPointsResultDto,
  LastVoucherResultDto,
  VoucherInfoResultDto,
  VoucherTypesResultDto,
  ConceptTypesResultDto,
  DocumentTypesResultDto,
  AliquotTypesResultDto,
  CurrencyTypesResultDto,
  OptionalTypesResultDto,
  TaxTypesResultDto,
  IvaReceptorTypesResultDto,
  CaeaResultDto,
  CaeaUsageResultDto,
  CaeaNoMovementResultDto,
  CountriesResultDto,
  ActivitiesResultDto,
  QuotationResultDto,
  MaxRecordsResultDto,
} from "@application/dto/electronic-billing.dto";

export interface IElectronicBillingRepositoryPort {
  /**
   * Get server status
   * @returns Server status information
   */
  getServerStatus(): Promise<ServerStatusDto>;

  /**
   * Get available sales points
   * @returns Sales points information
   */
  getSalesPoints(): Promise<SalesPointsResultDto>;

  /**
   * Get last authorized voucher number
   * @param salesPoint Sales point number
   * @param voucherType Voucher type
   * @returns Last voucher information
   */
  getLastVoucher(
    salesPoint: number,
    voucherType: number
  ): Promise<LastVoucherResultDto>;

  /**
   * Create a voucher
   * @param voucher Voucher entity
   * @returns Created voucher result with CAE
   */
  createVoucher(voucher: Voucher): Promise<ICreateVoucherResult>;

  /**
   * Get voucher information
   * @param number Voucher number
   * @param salesPoint Sales point number
   * @param type Voucher type
   * @returns Voucher information or null if not found
   */
  getVoucherInfo(
    number: number,
    salesPoint: number,
    type: number
  ): Promise<VoucherInfoResultDto | null>;

  /**
   * Get available voucher types
   * @returns Voucher types information
   */
  getVoucherTypes(): Promise<VoucherTypesResultDto>;

  /**
   * Get available concept types
   * @returns Concept types information
   */
  getConceptTypes(): Promise<ConceptTypesResultDto>;

  /**
   * Get available document types
   * @returns Document types information
   */
  getDocumentTypes(): Promise<DocumentTypesResultDto>;

  /**
   * Get available aliquot types
   * @returns Aliquot types information
   */
  getAliquotTypes(): Promise<AliquotTypesResultDto>;

  /**
   * Get available currency types
   * @returns Currency types information
   */
  getCurrencyTypes(): Promise<CurrencyTypesResultDto>;

  /**
   * Get available optional types
   * @returns Optional types information
   */
  getOptionalTypes(): Promise<OptionalTypesResultDto>;

  /**
   * Get available tax types
   * @returns Tax types information
   */
  getTaxTypes(): Promise<TaxTypesResultDto>;

  /**
   * Get available IVA receptor types
   * @param claseCmp Voucher class (optional)
   * @returns IVA receptor types information
   */
  getIvaReceptorTypes(claseCmp?: string): Promise<IvaReceptorTypesResultDto>;

  /**
   * Request CAEA (Anticipated Electronic Authorization Code)
   * @param period Period (YYYYMM)
   * @param order Fortnight (1 or 2)
   * @returns CAEA information
   */
  getCaea(period: number, order: number): Promise<CaeaResultDto>;

  /**
   * Consult CAEA
   * @param period Period (YYYYMM)
   * @param order Fortnight (1 or 2)
   * @returns CAEA information
   */
  consultCaea(period: number, order: number): Promise<CaeaResultDto>;

  /**
   * Inform CAEA No Movement
   * @param caea CAEA number
   * @param salesPoint Sales point number
   * @returns CAEA No Movement information
   */
  informCaeaNoMovement(
    caea: string,
    salesPoint: number
  ): Promise<CaeaNoMovementResultDto>;

  /**
   * Consult CAEA No Movement
   * @param caea CAEA number
   * @param salesPoint Sales point number
   * @returns CAEA No Movement information
   */
  consultCaeaNoMovement(
    caea: string,
    salesPoint: number
  ): Promise<CaeaNoMovementResultDto>;

  /**
   * Inform CAEA Usage (Regimen Informativo)
   * @param caea CAEA number
   * @param salesPoint Sales point number
   * @returns CAEA Usage information
   */
  informCaeaUsage(voucher: Voucher, caea: string): Promise<CaeaUsageResultDto>;

  /**
   * Get Quotation
   * @param currencyId Currency ID
   * @returns Quotation information
   */
  getQuotation(currencyId: string): Promise<QuotationResultDto>;

  /**
   * Get Countries
   * @returns Countries information
   */
  getCountries(): Promise<CountriesResultDto>;

  /**
   * Get Activities
   * @returns Activities information
   */
  getActivities(): Promise<ActivitiesResultDto>;

  /**
   * Get Max Records per Request
   * @returns Max records number
   */
  getMaxRecordsPerRequest(): Promise<MaxRecordsResultDto>;
}
