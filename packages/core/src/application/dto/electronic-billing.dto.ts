/**
 * Electronic Billing DTOs
 * Data Transfer Objects for electronic billing operations
 * These DTOs use domain types and are independent of infrastructure concerns
 */
import {
  SalesPoint,
  ServerStatus,
  LastVoucher,
  VoucherInfo,
  VoucherType,
  ConceptType,
  DocumentType,
  AliquotType,
  CurrencyType,
  OptionalType,
  TaxType,
  IvaReceptorType,
  ErrorInfo,
} from "@domain/types/electronic-billing.types";

/**
 * Server Status DTO (uses domain type)
 */
export type ServerStatusDto = ServerStatus;

/**
 * Sales Points Result DTO
 */
export interface SalesPointsResultDto {
  resultGet?: {
    ptoVenta?: SalesPoint[];
  };
  errors?: {
    err?: ErrorInfo[];
  };
}

/**
 * Last Voucher Result DTO
 */
export interface LastVoucherResultDto extends LastVoucher {
  errors?: {
    err?: ErrorInfo[];
  };
}

/**
 * Voucher Info Result DTO
 */
export interface VoucherInfoResultDto extends VoucherInfo {
  errors?: {
    err?: ErrorInfo[];
  };
}

/**
 * Voucher Types Result DTO
 */
export interface VoucherTypesResultDto {
  resultGet?: {
    cbteTipo?: VoucherType[];
  };
  errors?: {
    err?: ErrorInfo[];
  };
}

/**
 * Concept Types Result DTO
 */
export interface ConceptTypesResultDto {
  resultGet?: {
    conceptoTipo?: ConceptType[];
  };
  errors?: {
    err?: ErrorInfo[];
  };
}

/**
 * Document Types Result DTO
 */
export interface DocumentTypesResultDto {
  resultGet?: {
    docTipo?: DocumentType[];
  };
  errors?: {
    err?: ErrorInfo[];
  };
}

/**
 * Aliquot Types Result DTO
 */
export interface AliquotTypesResultDto {
  resultGet?: {
    ivaTipo?: AliquotType[];
  };
  errors?: {
    err?: ErrorInfo[];
  };
}

/**
 * Currency Types Result DTO
 */
export interface CurrencyTypesResultDto {
  resultGet?: {
    moneda?: CurrencyType[];
  };
  errors?: {
    err?: ErrorInfo[];
  };
}

/**
 * Optional Types Result DTO
 */
export interface OptionalTypesResultDto {
  resultGet?: {
    opcionalTipo?: OptionalType[];
  };
  errors?: {
    err?: ErrorInfo[];
  };
}

/**
 * Tax Types Result DTO
 */
export interface TaxTypesResultDto {
  resultGet?: {
    tributoTipo?: TaxType[];
  };
  errors?: {
    err?: ErrorInfo[];
  };
}

/**
 * IVA Receptor Types Result DTO
 */
export interface IvaReceptorTypesResultDto {
  resultGet?: {
    condicionIvaReceptor?: IvaReceptorType[];
  };
  errors?: {
    err?: ErrorInfo[];
  };
}
