import {
  SalesPoint,
  LastVoucher,
  VoucherInfo,
  VoucherType,
  ConceptType,
  DocumentType,
  AliquotType,
  CurrencyType,
  OptionalType,
  TaxType,
  IvaReceptorType,
  CaeaResponse,
  CaeaUsageResponse,
  CaeaNoMovement,
  PaisType,
  ActividadType,
  CotizacionType,
} from "@domain/types/electronic-billing.types";
import { AfipResultDto, ResultWithAfipErrors } from "./common.dto";

export type SalesPointsResultDto = AfipResultDto<{
  ptoVenta?: SalesPoint[];
}>;

export type LastVoucherResultDto = ResultWithAfipErrors<LastVoucher>;

export type VoucherInfoResultDto = ResultWithAfipErrors<VoucherInfo>;

export type VoucherTypesResultDto = AfipResultDto<{
  cbteTipo?: VoucherType[];
}>;

export type ConceptTypesResultDto = AfipResultDto<{
  conceptoTipo?: ConceptType[];
}>;

export type DocumentTypesResultDto = AfipResultDto<{
  docTipo?: DocumentType[];
}>;

export type AliquotTypesResultDto = AfipResultDto<{
  ivaTipo?: AliquotType[];
}>;

export type CurrencyTypesResultDto = AfipResultDto<{
  moneda?: CurrencyType[];
}>;

export type OptionalTypesResultDto = AfipResultDto<{
  opcionalTipo?: OptionalType[];
}>;

export type TaxTypesResultDto = AfipResultDto<{
  tributoTipo?: TaxType[];
}>;

export type IvaReceptorTypesResultDto = AfipResultDto<{
  condicionIvaReceptor?: IvaReceptorType[];
}>;

export type CaeaResultDto = AfipResultDto<CaeaResponse>;

export type CaeaUsageResultDto = AfipResultDto<CaeaUsageResponse>;

export type CaeaNoMovementResultDto = AfipResultDto<CaeaNoMovement[]>;

export type CountriesResultDto = AfipResultDto<{
  paisTipo?: PaisType[];
}>;

export type ActivitiesResultDto = AfipResultDto<{
  actividadesTipo?: ActividadType[];
}>;

export type QuotationResultDto = AfipResultDto<CotizacionType>;

export type MaxRecordsResultDto = AfipResultDto<number>;
