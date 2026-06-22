export interface CreateVoucherSoapErrorDto {
  Code?: number;
  Msg?: string;
}

export interface CreateVoucherFeCabRespDto {
  Cuit?: number;
  PtoVta?: number;
  CbteTipo?: number;
  FchProceso?: string;
  CantReg?: number;
  Resultado?: string;
  Reproceso?: string;
}

export interface CreateVoucherFeDetResponseDto {
  Concepto?: number;
  DocTipo?: number;
  DocNro?: number;
  CbteDesde?: number;
  CbteHasta?: number;
  CbteFch?: string;
  Resultado?: string;
  CAE?: string;
  CAEFchVto?: string;
  Observaciones?: {
    Obs?: Array<{ Code?: number; Msg?: string }>;
  };
}

export interface CreateVoucherResponseDto {
  FeCabResp?: CreateVoucherFeCabRespDto;
  FeDetResp?: {
    FECAEDetResponse?: CreateVoucherFeDetResponseDto[];
  };
  Events?: {
    Evt?: Array<{ Code?: number; Msg?: string }>;
  };
  Errors?: {
    Err?: CreateVoucherSoapErrorDto[];
  };
}

export interface CreateVoucherResultDto {
  response: CreateVoucherResponseDto;
  cae: string;
  caeFchVto: string;
}
