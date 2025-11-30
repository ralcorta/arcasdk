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

/**
 * Register Service Result DTOs
 * These DTOs represent the return types for register services
 * They maintain compatibility with legacy API while being independent of SOAP types
 */

/**
 * Register Server Status Result DTO
 */
export interface RegisterServerStatusResultDto {
  appserver: string;
  dbserver: string;
  authserver: string;
}

/**
 * Register Taxpayer Details Result DTO
 * Wraps TaxpayerDetailsDto with metadata for compatibility
 */
export interface RegisterTaxpayerDetailsResultDto {
  metadata?: {
    fechaHora?: string;
    servidor?: string;
  };
  persona?: TaxpayerDetailsDto;
  datosGenerales?: TaxpayerDetailsDto["datosGenerales"];
  datosMonotributo?: TaxpayerDetailsDto["datosMonotributo"];
  datosRegimenGeneral?: TaxpayerDetailsDto["datosRegimenGeneral"];
  errorConstancia?: TaxpayerDetailsDto["errorConstancia"];
  errorMonotributo?: any;
  errorRegimenGeneral?: any;
}

/**
 * Register Taxpayers List Result DTO
 */
export interface RegisterTaxpayersListResultDto {
  metadata?: {
    fechaHora?: string;
    servidor?: string;
  };
  persona?: TaxpayerDetailsDto[];
  cantidadRegistros?: number;
  errorConstancia?: {
    error?: string;
    codigo?: number;
  };
}

/**
 * Register Tax ID by Document Result DTO
 */
export interface RegisterTaxIDByDocumentResultDto {
  idPersona?: number;
  metadata?: {
    fechaHora?: string;
    servidor?: string;
  };
}
