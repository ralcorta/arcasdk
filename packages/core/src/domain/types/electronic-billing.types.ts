
export interface SalesPoint {
  nro: number;
  emisionTipo: string;
  bloqueado: string;
  fechaBaja?: string;
}

export interface LastVoucher {
  cbteNro: number;
  cbteTipo: number;
  ptoVta: number;
}

export interface VoucherInfo {
  codAutorizacion?: string;
  emisionTipo?: string;
  fchVto?: string;
  fchProceso?: string;
  resultado?: string;
  observaciones?: string; // Flattened from Observaciones?.Obs?.[0]?.Msg
  observacionesDetalle?: VoucherInfoObservacion[];
  ptoVta?: number;
  cbteTipo?: number;
  concepto?: number;
  docTipo?: number;
  docNro?: number;
  condicionIVAReceptorId?: number;
  cbteDesde?: number;
  cbteHasta?: number;
  cbteFch?: string;
  impTotal?: number;
  impTotConc?: number;
  impNeto?: number;
  impOpEx?: number;
  impIVA?: number;
  impTrib?: number;
  fchServDesde?: string;
  fchServHasta?: string;
  fchVtoPago?: string;
  monId?: string;
  monCotiz?: number;
  canMisMonExt?: string;
  iva?: VoucherInfoIva[];
  tributos?: VoucherInfoTributo[];
  cbtesAsoc?: VoucherInfoCbteAsoc[];
  periodoAsoc?: VoucherInfoPeriodoAsoc;
  opcionales?: VoucherInfoOpcional[];
  compradores?: VoucherInfoComprador[];
  actividades?: VoucherInfoActividad[];
}

export interface VoucherInfoObservacion {
  code: number;
  msg: string;
}

export interface VoucherInfoIva {
  id: number;
  baseImp: number;
  importe: number;
}

export interface VoucherInfoTributo {
  id: number;
  desc?: string;
  baseImp: number;
  alic: number;
  importe: number;
}

export interface VoucherInfoCbteAsoc {
  tipo: number;
  ptoVta: number;
  nro: number;
  cuit?: string;
  cbteFch?: string;
}

export interface VoucherInfoPeriodoAsoc {
  fchDesde: string;
  fchHasta: string;
}

export interface VoucherInfoOpcional {
  id: string;
  valor: string;
}

export interface VoucherInfoComprador {
  docTipo: number;
  docNro: number;
  porcentaje: number;
}

export interface VoucherInfoActividad {
  id: number;
}

export interface ParameterType {
  id: number | string;
  desc: string;
  fchDesde: string;
  fchHasta: string;
}

export interface VoucherType extends ParameterType {
  id: number;
}

export interface ConceptType extends ParameterType {
  id: number;
}

export interface DocumentType extends ParameterType {
  id: number;
}

export interface AliquotType extends ParameterType {
  id: number;
}

export interface CurrencyType extends ParameterType {
  id: string;
}

export interface OptionalType extends ParameterType {
  id: string;
}

export interface TaxType extends ParameterType {
  id: number;
}

export interface IvaReceptorType {
  id: number;
  desc: string;
  cmp_Clase: string;
}

export interface ErrorInfo {
  code: number;
  msg: string;
}

export interface ResultWithErrors<T> {
  result?: T;
  errors?: ErrorInfo[];
}

export interface CaeaRequest {
  periodo: number;
  orden: number;
}

export interface CaeaResponse {
  caea: string;
  periodo: number;
  orden: number;
  fchVigDesde: string;
  fchVigHasta: string;
  fchTopeInf: string;
  fchProceso: string;
  observaciones?: string;
}

export interface CaeaUsageResponse {
  caea: string;
  concepto: number;
  docTipo: number;
  docNro: number;
  cbteDesde: number;
  cbteHasta: number;
  cbteFch: string;
  resultado: string;
  observaciones?: string;
}

export interface CaeaNoMovement {
  caea: string;
  fchProceso: string;
  ptoVta: number;
}

export interface PaisType {
  id: number;
  desc: string;
}

export interface ActividadType {
  id: number;
  orden: number;
  desc: string;
}

export interface CotizacionType {
  monId: string;
  monCotiz: number;
  fchCotiz: string;
}
