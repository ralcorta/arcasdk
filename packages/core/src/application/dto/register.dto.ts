/**
 * Server Status DTO (for Register services)
 */
export interface RegisterServerStatusDto {
  appserver: string;
  dbserver: string;
  authserver: string;
}

/**
 * Taxpayer Details DTO
 */
export interface TaxpayerDetailsDto {
  idPersona?: number;
  tipoPersona?: string;
  estadoClave?: string;
  datosGenerales?: {
    piso?: string;
    departamento?: string;
    numeroCalle?: number;
    codPostal?: string;
    tipoDomicilio?: string;
    domicilio?: string;
    dataFiscal?: Record<string, unknown>;
    [key: string]: unknown;
  };
  datosMonotributo?: Record<string, unknown>;
  datosRegimenGeneral?: Record<string, unknown>;
  errorConstancia?: {
    error?: string;
    codigo?: number;
  };
  [key: string]: unknown;
}

/**
 * Taxpayers Details DTO (for multiple taxpayers)
 */
export interface TaxpayersDetailsDto {
  persona?: TaxpayerDetailsDto[];
  cantidadRegistros?: number;
  errorConstancia?: {
    error?: string;
    codigo?: number;
  };
  [key: string]: unknown;
}

/**
 * Tax ID by Document Result DTO
 */
export interface TaxIDByDocumentResultDto {
  idPersona?: number[];
  errorConstancia?: {
    error?: string;
    codigo?: number;
  };
  [key: string]: unknown;
}
