/**
 * Electronic Billing DTOs
 * Data Transfer Objects for electronic billing operations
 * These DTOs are independent of infrastructure concerns
 */

/**
 * Server Status DTO
 */
export interface ServerStatusDto {
  appServer: string;
  dbServer: string;
  authServer: string;
}

/**
 * Sales Point DTO
 */
export interface SalesPointDto {
  nro: number;
  emisionTipo: string;
  bloqueado: string;
  fechaBaja?: string;
}

/**
 * Sales Points Result DTO
 */
export interface SalesPointsResultDto {
  resultGet?: {
    ptoVenta?: SalesPointDto[];
  };
  errors?: {
    err?: Array<{
      code: number;
      msg: string;
    }>;
  };
}

/**
 * Last Voucher Result DTO
 */
export interface LastVoucherResultDto {
  cbteNro: number;
  cbteTipo: number;
  ptoVta: number;
  errors?: {
    err?: Array<{
      code: number;
      msg: string;
    }>;
  };
}

/**
 * Voucher Info Result DTO
 */
export interface VoucherInfoResultDto {
  codAutorizacion?: string;
  emisionTipo?: string;
  fchVto?: string;
  fchProceso?: string;
  resultado?: string;
  observaciones?: string;
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
  errors?: {
    err?: Array<{
      code: number;
      msg: string;
    }>;
  };
}

/**
 * Voucher Type DTO
 */
export interface VoucherTypeDto {
  id: number;
  desc: string;
  fchDesde: string;
  fchHasta: string;
}

/**
 * Voucher Types Result DTO
 */
export interface VoucherTypesResultDto {
  resultGet?: {
    cbteTipo?: VoucherTypeDto[];
  };
  errors?: {
    err?: Array<{
      code: number;
      msg: string;
    }>;
  };
}

/**
 * Concept Type DTO
 */
export interface ConceptTypeDto {
  id: number;
  desc: string;
  fchDesde: string;
  fchHasta: string;
}

/**
 * Concept Types Result DTO
 */
export interface ConceptTypesResultDto {
  resultGet?: {
    conceptoTipo?: ConceptTypeDto[];
  };
  errors?: {
    err?: Array<{
      code: number;
      msg: string;
    }>;
  };
}

/**
 * Document Type DTO
 */
export interface DocumentTypeDto {
  id: number;
  desc: string;
  fchDesde: string;
  fchHasta: string;
}

/**
 * Document Types Result DTO
 */
export interface DocumentTypesResultDto {
  resultGet?: {
    docTipo?: DocumentTypeDto[];
  };
  errors?: {
    err?: Array<{
      code: number;
      msg: string;
    }>;
  };
}

/**
 * Aliquot Type DTO
 */
export interface AliquotTypeDto {
  id: number;
  desc: string;
  fchDesde: string;
  fchHasta: string;
}

/**
 * Aliquot Types Result DTO
 */
export interface AliquotTypesResultDto {
  resultGet?: {
    ivaTipo?: AliquotTypeDto[];
  };
  errors?: {
    err?: Array<{
      code: number;
      msg: string;
    }>;
  };
}

/**
 * Currency Type DTO
 */
export interface CurrencyTypeDto {
  id: string;
  desc: string;
  fchDesde: string;
  fchHasta: string;
}

/**
 * Currency Types Result DTO
 */
export interface CurrencyTypesResultDto {
  resultGet?: {
    moneda?: CurrencyTypeDto[];
  };
  errors?: {
    err?: Array<{
      code: number;
      msg: string;
    }>;
  };
}

/**
 * Optional Type DTO
 */
export interface OptionalTypeDto {
  id: string;
  desc: string;
  fchDesde: string;
  fchHasta: string;
}

/**
 * Optional Types Result DTO
 */
export interface OptionalTypesResultDto {
  resultGet?: {
    opcionalTipo?: OptionalTypeDto[];
  };
  errors?: {
    err?: Array<{
      code: number;
      msg: string;
    }>;
  };
}

/**
 * Tax Type DTO
 */
export interface TaxTypeDto {
  id: number;
  desc: string;
  fchDesde: string;
  fchHasta: string;
}

/**
 * Tax Types Result DTO
 */
export interface TaxTypesResultDto {
  resultGet?: {
    tributoTipo?: TaxTypeDto[];
  };
  errors?: {
    err?: Array<{
      code: number;
      msg: string;
    }>;
  };
}
