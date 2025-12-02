/**
 * Domain Types - Electronic Billing
 * Types representing electronic billing domain concepts
 * These are business concepts, independent of infrastructure (SOAP, REST, etc.)
 */

/**
 * Sales Point (Punto de Venta)
 */
export interface SalesPoint {
  nro: number;
  emisionTipo: string;
  bloqueado: string;
  fechaBaja?: string;
}

/**
 * Server Status
 */
export interface ServerStatus {
  appServer: string;
  dbServer: string;
  authServer: string;
}

/**
 * Last Voucher Information
 */
export interface LastVoucher {
  cbteNro: number;
  cbteTipo: number;
  ptoVta: number;
}

/**
 * Voucher Information
 */
export interface VoucherInfo {
  codAutorizacion?: string;
  emisionTipo?: string;
  fchVto?: string;
  fchProceso?: string;
  resultado?: string;
  observaciones?: string; // Flattened from Observaciones?.Obs?.[0]?.Msg
  concepto?: number;
  docTipo?: number;
  docNro?: number;
  cbteDesde?: number;
  cbteHasta?: number;
  cbteFch?: string;
  impTotal?: number;
  impTotConc?: number;
  impNeto?: number;
  impOpEx?: number;
  impIVA?: number;
  impTrib?: number;
  monId?: string;
  monCotiz?: number;
}

/**
 * Parameter Type (base for all parameter types)
 */
export interface ParameterType {
  id: number | string;
  desc: string;
  fchDesde: string;
  fchHasta: string;
}

/**
 * Voucher Type
 */
export interface VoucherType extends ParameterType {
  id: number;
}

/**
 * Concept Type
 */
export interface ConceptType extends ParameterType {
  id: number;
}

/**
 * Document Type
 */
export interface DocumentType extends ParameterType {
  id: number;
}

/**
 * Aliquot Type (IVA)
 */
export interface AliquotType extends ParameterType {
  id: number;
}

/**
 * Currency Type
 */
export interface CurrencyType extends ParameterType {
  id: string;
}

/**
 * Optional Type
 */
export interface OptionalType extends ParameterType {
  id: string;
}

/**
 * Tax Type
 */
export interface TaxType extends ParameterType {
  id: number;
}

/**
 * Error Information
 */
export interface ErrorInfo {
  code: number;
  msg: string;
}

/**
 * Result with optional errors
 */
export interface ResultWithErrors<T> {
  result?: T;
  errors?: ErrorInfo[];
}

/**
 * CAEA Information
 */
export interface CaeaInfo {
  caea: string;
  periodo: number;
  orden: number;
  fchVigDesde: string;
  fchVigHasta: string;
  fchTopeInf: string;
  fchProceso: string;
  observaciones?: string;
}

/**
 * CAEA Usage Information
 */
export interface CaeaUsageInfo {
  concepto: number;
  docTipo: number;
  docNro: number;
  cbteDesde: number;
  cbteHasta: number;
  cbteFch: string;
  resultado: string;
  observaciones?: string;
  caea: string;
}
