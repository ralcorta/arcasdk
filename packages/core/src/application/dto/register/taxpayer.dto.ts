export interface RegisterMonotributoDto {
  categoriaMonotributo?: string;
  actividadMonotributista?: string;
  [key: string]: unknown;
}

export interface RegisterRegimenGeneralDto {
  actividad?: Array<{ idActividad?: number; descripcionActividad?: string }>;
  impuesto?: Array<{ idImpuesto?: number; descripcionImpuesto?: string }>;
  [key: string]: unknown;
}

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
  datosMonotributo?: RegisterMonotributoDto;
  datosRegimenGeneral?: RegisterRegimenGeneralDto;
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
