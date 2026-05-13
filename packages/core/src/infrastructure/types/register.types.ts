export interface ErrorConstancia {
  error?: string;
  codigo?: number;
}

export interface DatosGenerales {
  idPersona?: number;
  tipoPersona?: string;
  estadoClave?: string;
  [key: string]: unknown;
}

export interface PersonaReturnRaw {
  persona?: PersonaReturnRaw;
  idPersona?: number;
  tipoPersona?: string;
  estadoClave?: string;
  datosGenerales?: DatosGenerales;
  datosMonotributo?: Record<string, unknown>;
  datosRegimenGeneral?: Record<string, unknown>;
  errorConstancia?: ErrorConstancia;
  [key: string]: unknown;
}
