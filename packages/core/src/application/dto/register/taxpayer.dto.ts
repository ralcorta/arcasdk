export interface RegisterErrorConstanciaDto {
  error?: string;
  codigo?: number;
}

export interface TaxpayerGeneralDataDto {
  piso?: string;
  departamento?: string;
  numeroCalle?: number;
  codPostal?: string;
  tipoDomicilio?: string;
  domicilio?: string;
  dataFiscal?: Record<string, unknown>;
  idPersona?: number;
  tipoPersona?: string;
  estadoClave?: string;
}

export interface TaxpayerDetailsDto {
  idPersona?: number;
  tipoPersona?: string;
  estadoClave?: string;
  datosGenerales?: TaxpayerGeneralDataDto;
  datosMonotributo?: Record<string, unknown>;
  datosRegimenGeneral?: Record<string, unknown>;
  errorConstancia?: RegisterErrorConstanciaDto;
}

export interface TaxpayersDetailsDto {
  persona?: TaxpayerDetailsDto[];
  cantidadRegistros?: number;
  errorConstancia?: RegisterErrorConstanciaDto;
}

export interface TaxIDByDocumentResultDto {
  idPersona?: number[];
  errorConstancia?: RegisterErrorConstanciaDto;
}
