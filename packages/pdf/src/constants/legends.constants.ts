/**
 * Tipos de comprobante clase A con leyenda "OPERACIÓN SUJETA A RETENCIÓN"
 * (ex clase M, RG 5762/2025): Factura, Nota de Débito, Nota de Crédito y Recibo
 */
export const CLASE_A_SUJETA_A_RETENCION_TYPES = [51, 52, 53, 54];

/** Leyenda de cabecera de los tipos 51 a 54 (RG 5762/2025, arts. 10 y 31) */
export const LEYENDA_OPERACION_SUJETA_A_RETENCION =
  "OPERACIÓN SUJETA A RETENCIÓN";

/** Leyenda de cabecera de la clase A con pago en CBU informada (RG 5762/2025, art. 21) */
export const LEYENDA_PAGO_EN_CBU_INFORMADA = "PAGO EN CBU INFORMADA";

/** Título del Régimen de Transparencia Fiscal al Consumidor (RG 5614/2024) */
export const TITULO_TRANSPARENCIA_FISCAL =
  "Régimen de Transparencia Fiscal al Consumidor (Ley 27.743)";

/** Leyenda de la clase A emitida a monotributistas (RG 5003/2021, art. 20) */
export const LEYENDA_LEY_27618 =
  "El crédito fiscal discriminado en el presente comprobante, sólo podrá ser computado a efectos del Régimen de Sostenimiento e Inclusión Fiscal para Pequeños Contribuyentes de la Ley Nº 27.618";

/** CondicionIVAReceptorId de Consumidor Final */
export const CONDICION_IVA_CONSUMIDOR_FINAL = 5;

/** CondicionIVAReceptorId de Monotributo, Monotributista Social y Monotributo Trabajador Independiente Promovido */
export const CONDICIONES_IVA_MONOTRIBUTO = [6, 13, 16];

/** Ids de tributo (FEParamGetTiposTributos) que cuentan como otros impuestos nacionales indirectos */
export const TRIBUTOS_NACIONALES_INDIRECTOS = [1, 4];
