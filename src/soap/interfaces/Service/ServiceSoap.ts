import { Client } from "soap";

/* tslint:disable:max-line-length no-empty-interface */
export interface IFECAESolicitarInput {
  // Auth: ServiceSoapTypes.IAuth;
  FeCAEReq: ServiceSoapTypes.IFeCAEReq;
}

export interface IFECAESolicitarOutput {
  FECAESolicitarResult: ServiceSoapTypes.IFECAESolicitarResult;
}

export interface IFECompTotXRequestInput {
  Auth: ServiceSoapTypes.IAuth;
}

export interface IFECompTotXRequestOutput {
  FECompTotXRequestResult: ServiceSoapTypes.IFECompTotXRequestResult;
}

export interface IFEDummyInput {}

export interface IFEDummyOutput {
  FEDummyResult: ServiceSoapTypes.IFEDummyResult;
}

export interface IFECompUltimoAutorizadoInput {
  // Auth: ServiceSoapTypes.IAuth;
  /** s:int(undefined) */
  PtoVta: number;
  /** s:int(undefined) */
  CbteTipo: number;
}

export interface IFECompUltimoAutorizadoOutput {
  FECompUltimoAutorizadoResult: ServiceSoapTypes.IFECompUltimoAutorizadoResult;
}

export interface IFECompConsultarInput {
  Auth: ServiceSoapTypes.IAuth;
  FeCompConsReq: ServiceSoapTypes.IFeCompConsReq;
}

export interface IFECompConsultarOutput {
  FECompConsultarResult: ServiceSoapTypes.IFECompConsultarResult;
}

export interface IFECAEARegInformativoInput {
  Auth: ServiceSoapTypes.IAuth;
  FeCAEARegInfReq: ServiceSoapTypes.IFeCAEARegInfReq;
}

export interface IFECAEARegInformativoOutput {
  FECAEARegInformativoResult: ServiceSoapTypes.IFECAEARegInformativoResult;
}

export interface IFECAEASolicitarInput {
  Auth: ServiceSoapTypes.IAuth;
  /** s:int(undefined) */
  Periodo: number;
  /** s:short(undefined) */
  Orden: number;
}

export interface IFECAEASolicitarOutput {
  FECAEASolicitarResult: ServiceSoapTypes.IFECAEASolicitarResult;
}

export interface IFECAEASinMovimientoConsultarInput {
  Auth: ServiceSoapTypes.IAuth;
  /** s:string(undefined) */
  CAEA: string;
  /** s:int(undefined) */
  PtoVta: number;
}

export interface IFECAEASinMovimientoConsultarOutput {
  FECAEASinMovimientoConsultarResult: ServiceSoapTypes.IFECAEASinMovimientoConsultarResult;
}

export interface IFECAEASinMovimientoInformarInput {
  Auth: ServiceSoapTypes.IAuth;
  /** s:int(undefined) */
  PtoVta: number;
  /** s:string(undefined) */
  CAEA: string;
}

export interface IFECAEASinMovimientoInformarOutput {
  FECAEASinMovimientoInformarResult: ServiceSoapTypes.IFECAEASinMovimientoInformarResult;
}

export interface IFECAEAConsultarInput {
  Auth: ServiceSoapTypes.IAuth;
  /** s:int(undefined) */
  Periodo: number;
  /** s:short(undefined) */
  Orden: number;
}

export interface IFECAEAConsultarOutput {
  FECAEAConsultarResult: ServiceSoapTypes.IFECAEAConsultarResult;
}

export interface IFEParamGetCotizacionInput {
  Auth: ServiceSoapTypes.IAuth;
  /** s:string(undefined) */
  MonId: string;
}

export interface IFEParamGetCotizacionOutput {
  FEParamGetCotizacionResult: ServiceSoapTypes.IFEParamGetCotizacionResult;
}

export interface IFEParamGetTiposTributosInput {
  Auth: ServiceSoapTypes.IAuth;
}

export interface IFEParamGetTiposTributosOutput {
  FEParamGetTiposTributosResult: ServiceSoapTypes.IFEParamGetTiposTributosResult;
}

export interface IFEParamGetTiposMonedasInput {
  Auth: ServiceSoapTypes.IAuth;
}

export interface IFEParamGetTiposMonedasOutput {
  FEParamGetTiposMonedasResult: ServiceSoapTypes.IFEParamGetTiposMonedasResult;
}

export interface IFEParamGetTiposIvaInput {
  Auth: ServiceSoapTypes.IAuth;
}

export interface IFEParamGetTiposIvaOutput {
  FEParamGetTiposIvaResult: ServiceSoapTypes.IFEParamGetTiposIvaResult;
}

export interface IFEParamGetTiposOpcionalInput {
  Auth: ServiceSoapTypes.IAuth;
}

export interface IFEParamGetTiposOpcionalOutput {
  FEParamGetTiposOpcionalResult: ServiceSoapTypes.IFEParamGetTiposOpcionalResult;
}

export interface IFEParamGetTiposConceptoInput {
  Auth: ServiceSoapTypes.IAuth;
}

export interface IFEParamGetTiposConceptoOutput {
  FEParamGetTiposConceptoResult: ServiceSoapTypes.IFEParamGetTiposConceptoResult;
}

export interface IFEParamGetPtosVentaInput {
  // Auth: ServiceSoapTypes.IAuth;
}

export interface IFEParamGetPtosVentaOutput {
  FEParamGetPtosVentaResult: ServiceSoapTypes.IFEParamGetPtosVentaResult;
}

export interface IFEParamGetTiposCbteInput {
  Auth: ServiceSoapTypes.IAuth;
}

export interface IFEParamGetTiposCbteOutput {
  FEParamGetTiposCbteResult: ServiceSoapTypes.IFEParamGetTiposCbteResult;
}

export interface IFEParamGetTiposDocInput {
  Auth: ServiceSoapTypes.IAuth;
}

export interface IFEParamGetTiposDocOutput {
  FEParamGetTiposDocResult: ServiceSoapTypes.IFEParamGetTiposDocResult;
}

export interface IFEParamGetTiposPaisesInput {
  Auth: ServiceSoapTypes.IAuth;
}

export interface IFEParamGetTiposPaisesOutput {
  FEParamGetTiposPaisesResult: ServiceSoapTypes.IFEParamGetTiposPaisesResult;
}

export interface IServiceSoapSoap extends Client {
  FECAESolicitar: (
    input: IFECAESolicitarInput,
    cb: (
      err: any | null,
      result: IFECAESolicitarOutput,
      raw: string,
      soapHeader: { [k: string]: any }
    ) => any,
    options?: any,
    extraHeaders?: any
  ) => void;
  FECAESolicitarAsync: (
    input: IFECAESolicitarInput,
    options?: any,
    extraHeaders?: any
  ) => Promise<[IFECAESolicitarOutput, string, { [k: string]: any }, string]>;

  FECompTotXRequest: (
    input: IFECompTotXRequestInput,
    cb: (
      err: any | null,
      result: IFECompTotXRequestOutput,
      raw: string,
      soapHeader: { [k: string]: any }
    ) => any,
    options?: any,
    extraHeaders?: any
  ) => void;
  FEDummy: (
    input: IFEDummyInput,
    cb: (
      err: any | null,
      result: IFEDummyOutput,
      raw: string,
      soapHeader: { [k: string]: any }
    ) => any,
    options?: any,
    extraHeaders?: any
  ) => void;
  FEDummyAsync: (
    input: IFEDummyInput,
    options?: any,
    extraHeaders?: any
  ) => Promise<[IFEDummyOutput, string, { [k: string]: any }, string]>;
  FECompUltimoAutorizado: (
    input: IFECompUltimoAutorizadoInput,
    cb: (
      err: any | null,
      result: IFECompUltimoAutorizadoOutput,
      raw: string,
      soapHeader: { [k: string]: any }
    ) => any,
    options?: any,
    extraHeaders?: any
  ) => void;
  FECompUltimoAutorizadoAsync: (
    input: IFECompUltimoAutorizadoInput,
    options?: any,
    extraHeaders?: any
  ) => Promise<
    [IFECompUltimoAutorizadoOutput, string, { [k: string]: any }, string]
  >;
  FECompConsultar: (
    input: IFECompConsultarInput,
    cb: (
      err: any | null,
      result: IFECompConsultarOutput,
      raw: string,
      soapHeader: { [k: string]: any }
    ) => any,
    options?: any,
    extraHeaders?: any
  ) => void;
  FECAEARegInformativo: (
    input: IFECAEARegInformativoInput,
    cb: (
      err: any | null,
      result: IFECAEARegInformativoOutput,
      raw: string,
      soapHeader: { [k: string]: any }
    ) => any,
    options?: any,
    extraHeaders?: any
  ) => void;
  FECAEASolicitar: (
    input: IFECAEASolicitarInput,
    cb: (
      err: any | null,
      result: IFECAEASolicitarOutput,
      raw: string,
      soapHeader: { [k: string]: any }
    ) => any,
    options?: any,
    extraHeaders?: any
  ) => void;
  FECAEASinMovimientoConsultar: (
    input: IFECAEASinMovimientoConsultarInput,
    cb: (
      err: any | null,
      result: IFECAEASinMovimientoConsultarOutput,
      raw: string,
      soapHeader: { [k: string]: any }
    ) => any,
    options?: any,
    extraHeaders?: any
  ) => void;
  FECAEASinMovimientoInformar: (
    input: IFECAEASinMovimientoInformarInput,
    cb: (
      err: any | null,
      result: IFECAEASinMovimientoInformarOutput,
      raw: string,
      soapHeader: { [k: string]: any }
    ) => any,
    options?: any,
    extraHeaders?: any
  ) => void;
  FECAEAConsultar: (
    input: IFECAEAConsultarInput,
    cb: (
      err: any | null,
      result: IFECAEAConsultarOutput,
      raw: string,
      soapHeader: { [k: string]: any }
    ) => any,
    options?: any,
    extraHeaders?: any
  ) => void;
  FEParamGetCotizacion: (
    input: IFEParamGetCotizacionInput,
    cb: (
      err: any | null,
      result: IFEParamGetCotizacionOutput,
      raw: string,
      soapHeader: { [k: string]: any }
    ) => any,
    options?: any,
    extraHeaders?: any
  ) => void;
  FEParamGetTiposTributos: (
    input: IFEParamGetTiposTributosInput,
    cb: (
      err: any | null,
      result: IFEParamGetTiposTributosOutput,
      raw: string,
      soapHeader: { [k: string]: any }
    ) => any,
    options?: any,
    extraHeaders?: any
  ) => void;
  FEParamGetTiposMonedas: (
    input: IFEParamGetTiposMonedasInput,
    cb: (
      err: any | null,
      result: IFEParamGetTiposMonedasOutput,
      raw: string,
      soapHeader: { [k: string]: any }
    ) => any,
    options?: any,
    extraHeaders?: any
  ) => void;
  FEParamGetTiposIva: (
    input: IFEParamGetTiposIvaInput,
    cb: (
      err: any | null,
      result: IFEParamGetTiposIvaOutput,
      raw: string,
      soapHeader: { [k: string]: any }
    ) => any,
    options?: any,
    extraHeaders?: any
  ) => void;
  FEParamGetTiposOpcional: (
    input: IFEParamGetTiposOpcionalInput,
    cb: (
      err: any | null,
      result: IFEParamGetTiposOpcionalOutput,
      raw: string,
      soapHeader: { [k: string]: any }
    ) => any,
    options?: any,
    extraHeaders?: any
  ) => void;
  FEParamGetTiposConcepto: (
    input: IFEParamGetTiposConceptoInput,
    cb: (
      err: any | null,
      result: IFEParamGetTiposConceptoOutput,
      raw: string,
      soapHeader: { [k: string]: any }
    ) => any,
    options?: any,
    extraHeaders?: any
  ) => void;
  FEParamGetPtosVentaAsync: (
    input: IFEParamGetPtosVentaInput,
    options?: any,
    extraHeaders?: any
  ) => Promise<
    [IFEParamGetPtosVentaOutput, string, { [k: string]: any }, string]
  >;
  FEParamGetPtosVenta: (
    input: IFEParamGetPtosVentaInput,
    cb: (
      err: any | null,
      result: IFEParamGetPtosVentaOutput,
      raw: string,
      soapHeader: { [k: string]: any }
    ) => any,
    options?: any,
    extraHeaders?: any
  ) => void;
  FEParamGetTiposCbte: (
    input: IFEParamGetTiposCbteInput,
    cb: (
      err: any | null,
      result: IFEParamGetTiposCbteOutput,
      raw: string,
      soapHeader: { [k: string]: any }
    ) => any,
    options?: any,
    extraHeaders?: any
  ) => void;
  FEParamGetTiposDoc: (
    input: IFEParamGetTiposDocInput,
    cb: (
      err: any | null,
      result: IFEParamGetTiposDocOutput,
      raw: string,
      soapHeader: { [k: string]: any }
    ) => any,
    options?: any,
    extraHeaders?: any
  ) => void;
  FEParamGetTiposPaises: (
    input: IFEParamGetTiposPaisesInput,
    cb: (
      err: any | null,
      result: IFEParamGetTiposPaisesOutput,
      raw: string,
      soapHeader: { [k: string]: any }
    ) => any,
    options?: any,
    extraHeaders?: any
  ) => void;
}

export namespace ServiceSoapTypes {
  export interface IAuth {
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    Token: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    Sign: string;
    /** http://ar.gov.afip.dif.FEV1/#s:long(undefined) */
    Cuit: number;
  }
  export interface IFeCabReq {
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    CantReg: number;
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    PtoVta: number;
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    CbteTipo: number;
  }
  export interface ICbteAsoc {
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    Tipo: number;
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    PtoVta: number;
    /** http://ar.gov.afip.dif.FEV1/#s:long(undefined) */
    Nro: number;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    Cuit: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    CbteFch?: string;
  }
  export interface ICbtesAsoc {
    CbteAsoc: ServiceSoapTypes.ICbteAsoc[];
  }
  export interface ITributo {
    /** http://ar.gov.afip.dif.FEV1/#s:short(undefined) */
    Id: number;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    Desc: string;
    /** http://ar.gov.afip.dif.FEV1/#s:double(undefined) */
    BaseImp: number;
    /** http://ar.gov.afip.dif.FEV1/#s:double(undefined) */
    Alic: number;
    /** http://ar.gov.afip.dif.FEV1/#s:double(undefined) */
    Importe: number;
  }

  export interface ITributos {
    Tributo: ServiceSoapTypes.ITributo[];
  }
  export interface IAlicIva {
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    Id: number;
    /** http://ar.gov.afip.dif.FEV1/#s:double(undefined) */
    BaseImp: number;
    /** http://ar.gov.afip.dif.FEV1/#s:double(undefined) */
    Importe: number;
  }
  export interface IIva {
    AlicIva: ServiceSoapTypes.IAlicIva[];
  }
  export interface IOpcional {
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    Id: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    Valor: string;
  }
  export interface IOpcionales {
    Opcional: ServiceSoapTypes.IOpcional[];
  }
  export interface IComprador {
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    DocTipo: number;
    /** http://ar.gov.afip.dif.FEV1/#s:long(undefined) */
    DocNro: number;
    /** http://ar.gov.afip.dif.FEV1/#s:double(undefined) */
    Porcentaje: number;
  }
  export interface ICompradores {
    Comprador: ServiceSoapTypes.IComprador[];
  }
  export interface IPeriodoAsoc {
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    FchDesde: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    FchHasta: string;
  }
  export interface IFECAEDetRequest {
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    Concepto: number;
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    DocTipo: number;
    /** http://ar.gov.afip.dif.FEV1/#s:long(undefined) */
    DocNro: number;
    /** http://ar.gov.afip.dif.FEV1/#s:long(undefined) */
    CbteDesde: number;
    /** http://ar.gov.afip.dif.FEV1/#s:long(undefined) */
    CbteHasta: number;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    CbteFch: string;
    /** http://ar.gov.afip.dif.FEV1/#s:double(undefined) */
    ImpTotal: number;
    /** http://ar.gov.afip.dif.FEV1/#s:double(undefined) */
    ImpTotConc: number;
    /** http://ar.gov.afip.dif.FEV1/#s:double(undefined) */
    ImpNeto: number;
    /** http://ar.gov.afip.dif.FEV1/#s:double(undefined) */
    ImpOpEx: number;
    /** http://ar.gov.afip.dif.FEV1/#s:double(undefined) */
    ImpTrib: number;
    /** http://ar.gov.afip.dif.FEV1/#s:double(undefined) */
    ImpIVA: number;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    FchServDesde?: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    FchServHasta?: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    FchVtoPago?: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    MonId: string;
    /** http://ar.gov.afip.dif.FEV1/#s:double(undefined) */
    MonCotiz: number;
    CbtesAsoc?: ServiceSoapTypes.ICbtesAsoc;
    Tributos?: ServiceSoapTypes.ITributos;
    Iva?: ServiceSoapTypes.IIva;
    Opcionales?: ServiceSoapTypes.IOpcionales;
    Compradores?: ServiceSoapTypes.ICompradores;
    PeriodoAsoc?: ServiceSoapTypes.IPeriodoAsoc;
  }
  export interface IFeCAEReq {
    FeCabReq: ServiceSoapTypes.IFeCabReq;
    FeDetReq: {
      FECAEDetRequest: ServiceSoapTypes.IFECAEDetRequest[];
    };
  }
  export interface IFeCabResp {
    /** http://ar.gov.afip.dif.FEV1/#s:long(undefined) */
    Cuit: number;
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    PtoVta: number;
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    CbteTipo: number;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    FchProceso: string;
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    CantReg: number;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    Resultado: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    Reproceso: string;
  }
  export interface IObs {
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    Code: number;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    Msg: string;
  }
  export interface IObservaciones {
    Obs: ServiceSoapTypes.IObs[];
  }
  export interface IFECAEDetResponse {
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    Concepto: number;
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    DocTipo: number;
    /** http://ar.gov.afip.dif.FEV1/#s:long(undefined) */
    DocNro: number;
    /** http://ar.gov.afip.dif.FEV1/#s:long(undefined) */
    CbteDesde: number;
    /** http://ar.gov.afip.dif.FEV1/#s:long(undefined) */
    CbteHasta: number;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    CbteFch: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    Resultado: string;
    Observaciones: ServiceSoapTypes.IObservaciones;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    CAE: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    CAEFchVto: string;
  }
  export interface IEvt {
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    Code: number;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    Msg: string;
  }
  export interface IEvents {
    Evt: ServiceSoapTypes.IEvt[];
  }
  export interface IErr {
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    Code: number;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    Msg: string;
  }
  export interface IErrors {
    Err: ServiceSoapTypes.IErr[];
  }
  export interface IFECAESolicitarResult {
    FeCabResp: ServiceSoapTypes.IFeCabResp;
    FeDetResp: {
      FECAEDetResponse: ServiceSoapTypes.IFECAEDetResponse[];
    };
    Events: ServiceSoapTypes.IEvents;
    Errors: ServiceSoapTypes.IErrors;
  }
  export interface IFECompTotXRequestResult {
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    RegXReq: number;
    Errors: ServiceSoapTypes.IErrors;
    Events: ServiceSoapTypes.IEvents;
  }
  export interface IFEDummyResult {
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    AppServer: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    DbServer: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    AuthServer: string;
  }
  export interface IFECompUltimoAutorizadoResult {
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    PtoVta: number;
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    CbteTipo: number;
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    CbteNro: number;
    Errors: ServiceSoapTypes.IErrors;
    Events: ServiceSoapTypes.IEvents;
  }
  export interface IFeCompConsReq {
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    CbteTipo: number;
    /** http://ar.gov.afip.dif.FEV1/#s:long(undefined) */
    CbteNro: number;
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    PtoVta: number;
  }
  export interface IFECompConsultarResult {
    ResultGet: {
      /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
      Concepto: number;
      /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
      DocTipo: number;
      /** http://ar.gov.afip.dif.FEV1/#s:long(undefined) */
      DocNro: number;
      /** http://ar.gov.afip.dif.FEV1/#s:long(undefined) */
      CbteDesde: number;
      /** http://ar.gov.afip.dif.FEV1/#s:long(undefined) */
      CbteHasta: number;
      /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
      CbteFch: string;
      /** http://ar.gov.afip.dif.FEV1/#s:double(undefined) */
      ImpTotal: number;
      /** http://ar.gov.afip.dif.FEV1/#s:double(undefined) */
      ImpTotConc: number;
      /** http://ar.gov.afip.dif.FEV1/#s:double(undefined) */
      ImpNeto: number;
      /** http://ar.gov.afip.dif.FEV1/#s:double(undefined) */
      ImpOpEx: number;
      /** http://ar.gov.afip.dif.FEV1/#s:double(undefined) */
      ImpTrib: number;
      /** http://ar.gov.afip.dif.FEV1/#s:double(undefined) */
      ImpIVA: number;
      /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
      FchServDesde: string;
      /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
      FchServHasta: string;
      /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
      FchVtoPago: string;
      /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
      MonId: string;
      /** http://ar.gov.afip.dif.FEV1/#s:double(undefined) */
      MonCotiz: number;
      CbtesAsoc: ServiceSoapTypes.ICbtesAsoc;
      Tributos: ServiceSoapTypes.ITributos;
      Iva: ServiceSoapTypes.IIva;
      Opcionales: ServiceSoapTypes.IOpcionales;
      Compradores: ServiceSoapTypes.ICompradores;
      PeriodoAsoc: ServiceSoapTypes.IPeriodoAsoc;
      /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
      Resultado: string;
      /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
      CodAutorizacion: string;
      /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
      EmisionTipo: string;
      /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
      FchVto: string;
      /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
      FchProceso: string;
      Observaciones: ServiceSoapTypes.IObservaciones;
      /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
      PtoVta: number;
      /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
      CbteTipo: number;
    };
    Errors: ServiceSoapTypes.IErrors;
    Events: ServiceSoapTypes.IEvents;
  }
  export interface IFECAEADetRequest {
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    Concepto: number;
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    DocTipo: number;
    /** http://ar.gov.afip.dif.FEV1/#s:long(undefined) */
    DocNro: number;
    /** http://ar.gov.afip.dif.FEV1/#s:long(undefined) */
    CbteDesde: number;
    /** http://ar.gov.afip.dif.FEV1/#s:long(undefined) */
    CbteHasta: number;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    CbteFch: string;
    /** http://ar.gov.afip.dif.FEV1/#s:double(undefined) */
    ImpTotal: number;
    /** http://ar.gov.afip.dif.FEV1/#s:double(undefined) */
    ImpTotConc: number;
    /** http://ar.gov.afip.dif.FEV1/#s:double(undefined) */
    ImpNeto: number;
    /** http://ar.gov.afip.dif.FEV1/#s:double(undefined) */
    ImpOpEx: number;
    /** http://ar.gov.afip.dif.FEV1/#s:double(undefined) */
    ImpTrib: number;
    /** http://ar.gov.afip.dif.FEV1/#s:double(undefined) */
    ImpIVA: number;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    FchServDesde: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    FchServHasta: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    FchVtoPago: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    MonId: string;
    /** http://ar.gov.afip.dif.FEV1/#s:double(undefined) */
    MonCotiz: number;
    CbtesAsoc: ServiceSoapTypes.ICbtesAsoc;
    Tributos: ServiceSoapTypes.ITributos;
    Iva: ServiceSoapTypes.IIva;
    Opcionales: ServiceSoapTypes.IOpcionales;
    Compradores: ServiceSoapTypes.ICompradores;
    PeriodoAsoc: ServiceSoapTypes.IPeriodoAsoc;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    CAEA: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    CbteFchHsGen: string;
  }
  export interface IFeCAEARegInfReq {
    FeCabReq: ServiceSoapTypes.IFeCabReq;
    FeDetReq: {
      FECAEADetRequest: ServiceSoapTypes.IFECAEADetRequest[];
    };
  }
  export interface IFECAEADetResponse {
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    Concepto: number;
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    DocTipo: number;
    /** http://ar.gov.afip.dif.FEV1/#s:long(undefined) */
    DocNro: number;
    /** http://ar.gov.afip.dif.FEV1/#s:long(undefined) */
    CbteDesde: number;
    /** http://ar.gov.afip.dif.FEV1/#s:long(undefined) */
    CbteHasta: number;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    CbteFch: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    Resultado: string;
    Observaciones: ServiceSoapTypes.IObservaciones;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    CAEA: string;
  }
  export interface IFECAEARegInformativoResult {
    FeCabResp: ServiceSoapTypes.IFeCabResp;
    FeDetResp: {
      FECAEADetResponse: ServiceSoapTypes.IFECAEADetResponse[];
    };
    Events: ServiceSoapTypes.IEvents;
    Errors: ServiceSoapTypes.IErrors;
  }
  export interface IFECAEASolicitarResult {
    ResultGet: {
      /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
      CAEA: string;
      /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
      Periodo: number;
      /** http://ar.gov.afip.dif.FEV1/#s:short(undefined) */
      Orden: number;
      /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
      FchVigDesde: string;
      /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
      FchVigHasta: string;
      /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
      FchTopeInf: string;
      /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
      FchProceso: string;
      Observaciones: ServiceSoapTypes.IObservaciones;
    };
    Errors: ServiceSoapTypes.IErrors;
    Events: ServiceSoapTypes.IEvents;
  }
  export interface IFECAEASinMov {
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    CAEA: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    FchProceso: string;
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    PtoVta: number;
  }
  export interface IFECAEASinMovimientoConsultarResult {
    ResultGet: {
      FECAEASinMov: ServiceSoapTypes.IFECAEASinMov[];
    };
    Errors: ServiceSoapTypes.IErrors;
    Events: ServiceSoapTypes.IEvents;
  }
  export interface IFECAEASinMovimientoInformarResult {
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    CAEA: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    FchProceso: string;
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    PtoVta: number;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    Resultado: string;
    Errors: ServiceSoapTypes.IErrors;
    Events: ServiceSoapTypes.IEvents;
  }
  export interface IFECAEAConsultarResult {
    ResultGet: {
      /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
      CAEA: string;
      /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
      Periodo: number;
      /** http://ar.gov.afip.dif.FEV1/#s:short(undefined) */
      Orden: number;
      /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
      FchVigDesde: string;
      /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
      FchVigHasta: string;
      /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
      FchTopeInf: string;
      /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
      FchProceso: string;
      Observaciones: ServiceSoapTypes.IObservaciones;
    };
    Errors: ServiceSoapTypes.IErrors;
    Events: ServiceSoapTypes.IEvents;
  }
  export interface IFEParamGetCotizacionResult {
    ResultGet: {
      /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
      MonId: string;
      /** http://ar.gov.afip.dif.FEV1/#s:double(undefined) */
      MonCotiz: number;
      /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
      FchCotiz: string;
    };
    Errors: ServiceSoapTypes.IErrors;
    Events: ServiceSoapTypes.IEvents;
  }
  export interface ITributoTipo {
    /** http://ar.gov.afip.dif.FEV1/#s:short(undefined) */
    Id: number;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    Desc: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    FchDesde: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    FchHasta: string;
  }
  export interface IFEParamGetTiposTributosResult {
    ResultGet: {
      TributoTipo: ServiceSoapTypes.ITributoTipo[];
    };
    Errors: ServiceSoapTypes.IErrors;
    Events: ServiceSoapTypes.IEvents;
  }
  export interface IMoneda {
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    Id: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    Desc: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    FchDesde: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    FchHasta: string;
  }
  export interface IFEParamGetTiposMonedasResult {
    ResultGet: {
      Moneda: ServiceSoapTypes.IMoneda[];
    };
    Errors: ServiceSoapTypes.IErrors;
    Events: ServiceSoapTypes.IEvents;
  }
  export interface IIvaTipo {
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    Id: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    Desc: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    FchDesde: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    FchHasta: string;
  }
  export interface IFEParamGetTiposIvaResult {
    ResultGet: {
      IvaTipo: ServiceSoapTypes.IIvaTipo[];
    };
    Errors: ServiceSoapTypes.IErrors;
    Events: ServiceSoapTypes.IEvents;
  }
  export interface IOpcionalTipo {
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    Id: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    Desc: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    FchDesde: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    FchHasta: string;
  }
  export interface IFEParamGetTiposOpcionalResult {
    ResultGet: {
      OpcionalTipo: ServiceSoapTypes.IOpcionalTipo[];
    };
    Errors: ServiceSoapTypes.IErrors;
    Events: ServiceSoapTypes.IEvents;
  }
  export interface IConceptoTipo {
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    Id: number;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    Desc: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    FchDesde: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    FchHasta: string;
  }
  export interface IFEParamGetTiposConceptoResult {
    ResultGet: {
      ConceptoTipo: ServiceSoapTypes.IConceptoTipo[];
    };
    Errors: ServiceSoapTypes.IErrors;
    Events: ServiceSoapTypes.IEvents;
  }
  export interface IPtoVenta {
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    Nro: number;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    EmisionTipo: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    Bloqueado: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    FchBaja: string;
  }
  export interface IFEParamGetPtosVentaResult {
    ResultGet: {
      PtoVenta: ServiceSoapTypes.IPtoVenta[];
    };
    Errors: ServiceSoapTypes.IErrors;
    Events: ServiceSoapTypes.IEvents;
  }
  export interface ICbteTipo {
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    Id: number;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    Desc: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    FchDesde: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    FchHasta: string;
  }
  export interface IFEParamGetTiposCbteResult {
    ResultGet: {
      CbteTipo: ServiceSoapTypes.ICbteTipo[];
    };
    Errors: ServiceSoapTypes.IErrors;
    Events: ServiceSoapTypes.IEvents;
  }
  export interface IDocTipo {
    /** http://ar.gov.afip.dif.FEV1/#s:int(undefined) */
    Id: number;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    Desc: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    FchDesde: string;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    FchHasta: string;
  }
  export interface IFEParamGetTiposDocResult {
    ResultGet: {
      DocTipo: ServiceSoapTypes.IDocTipo[];
    };
    Errors: ServiceSoapTypes.IErrors;
    Events: ServiceSoapTypes.IEvents;
  }
  export interface IPaisTipo {
    /** http://ar.gov.afip.dif.FEV1/#s:short(undefined) */
    Id: number;
    /** http://ar.gov.afip.dif.FEV1/#s:string(undefined) */
    Desc: string;
  }
  export interface IFEParamGetTiposPaisesResult {
    ResultGet: {
      PaisTipo: ServiceSoapTypes.IPaisTipo[];
    };
    Errors: ServiceSoapTypes.IErrors;
    Events: ServiceSoapTypes.IEvents;
  }
}
