/**
 * Register DTOs
 * Data Transfer Objects for register/padron operations
 * These DTOs are independent of infrastructure concerns
 */

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
    dataFiscal?: any;
    [key: string]: any;
  };
  datosMonotributo?: any;
  datosRegimenGeneral?: any;
  errorConstancia?: {
    error?: string;
    codigo?: number;
  };
  [key: string]: any;
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
  [key: string]: any;
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
  [key: string]: any;
}
