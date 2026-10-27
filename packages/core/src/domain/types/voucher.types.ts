/** Códigos `CbteTipo` de WSFE usados por el SDK. Catálogo completo: `getVoucherTypes()`. */
export const VoucherTypes = {
  FACTURA_A: 1,
  NOTA_DEBITO_A: 2,
  NOTA_CREDITO_A: 3,
  RECIBO_A: 4,
  FACTURA_B: 6,
  NOTA_DEBITO_B: 7,
  NOTA_CREDITO_B: 8,
  RECIBO_B: 9,
  FACTURA_C: 11,
  NOTA_DEBITO_C: 12,
  NOTA_CREDITO_C: 13,
  RECIBO_C: 15,
  BIENES_USADOS: 49,
  FACTURA_M: 51,
  NOTA_DEBITO_M: 52,
  NOTA_CREDITO_M: 53,
  RECIBO_M: 54,
} as const;

/** Códigos `Cbte_Tipo` de WSFEX (exportación). Catálogo completo: `wsfexService.getParamCbteTipo()`. */
export const ExportVoucherTypes = {
  FACTURA_E: 19,
  NOTA_DEBITO_E: 20,
  NOTA_CREDITO_E: 21,
} as const;

/** Códigos de moneda de ARCA (`MonId` en WSFE, `Moneda_Id` en WSFEX). Catálogo completo: `getCurrencyTypes()`. */
export const CurrencyIds = {
  PESOS: "PES",
  USD: "DOL",
  EUR: "060",
} as const;

/** Clase fiscal A/B/C/M: factura, ND, NC y recibo de esa letra. */
export const VoucherTypesByClass: Record<"A" | "B" | "C" | "M", number[]> = {
  A: [
    VoucherTypes.FACTURA_A,
    VoucherTypes.NOTA_DEBITO_A,
    VoucherTypes.NOTA_CREDITO_A,
    VoucherTypes.RECIBO_A,
  ],
  B: [
    VoucherTypes.FACTURA_B,
    VoucherTypes.NOTA_DEBITO_B,
    VoucherTypes.NOTA_CREDITO_B,
    VoucherTypes.RECIBO_B,
  ],
  C: [
    VoucherTypes.FACTURA_C,
    VoucherTypes.NOTA_DEBITO_C,
    VoucherTypes.NOTA_CREDITO_C,
    VoucherTypes.RECIBO_C,
  ],
  M: [
    VoucherTypes.FACTURA_M,
    VoucherTypes.NOTA_DEBITO_M,
    VoucherTypes.NOTA_CREDITO_M,
    VoucherTypes.RECIBO_M,
  ],
};

export interface IVoucher {
  CantReg: number;
  PtoVta: number;
  CbteTipo: number;
  Concepto: number;
  DocTipo: number;
  DocNro: number;
  CbteDesde: number;
  CbteHasta: number;
  CbteFch: string;
  ImpTotal: number;
  ImpTotConc: number;
  ImpNeto: number;
  ImpOpEx: number;
  ImpIVA: number;
  ImpTrib: number;
  FchServDesde?: string;
  FchServHasta?: string;
  FchVtoPago?: string;
  MonId: string;
  MonCotiz: number;
  CanMisMonExt?: string;
  CondicionIVAReceptorId: number;
  CbtesAsoc?: ICbtesAsoc[];
  /** Periodo asociado (NC/ND). Alternativa a CbtesAsoc cuando no se informa comprobante puntual. */
  PeriodoAsoc?: IPeriodoAsoc | null;
  Tributos?: ITributo[];
  Iva?: IIva[];
  Opcionales?: IOpcional[];
  Compradores?: IComprador[];
  /** Actividades del emisor vinculadas al comprobante. Listado habilitado: `getActivities()`. */
  Actividades?: IActividad[];
}

export interface INextVoucher extends Omit<
  IVoucher,
  "CbteDesde" | "CbteHasta"
> {
  CbteDesde?: number;
  CbteHasta?: number;
}

export interface ICbtesAsoc {
  Tipo: number;
  PtoVta: number;
  Nro: number;
  Cuit: string;
  CbteFch?: string;
}

/** Periodo asociado a NC/ND (YYYYMMDD). Requerido por ARCA si no se envía CbtesAsoc. */
export interface IPeriodoAsoc {
  FchDesde: string;
  FchHasta: string;
}

export interface IComprador {
  DocTipo: number;
  DocNro: number;
  Porcentaje: number;
}

export interface IIva {
  Id: number;
  BaseImp: number;
  Importe: number;
}

export interface IOpcional {
  Id: string;
  Valor: string;
}

/** Código de actividad (nomenclador CLAE / F.883), como lo devuelve `getActivities()`. */
export interface IActividad {
  Id: number;
}

export interface ITributo {
  Id: number;
  Desc: string;
  BaseImp: number;
  Alic: number;
  Importe: number;
}
