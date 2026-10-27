import { IFEXAuthorizeInput, ServiceSoapTypes } from "./service-soap.types";

/**
 * Input de `getLastCmp`. ARCA recibe estos campos dentro de `Auth`, junto al token,
 * por eso el DTO generado (que quita `Auth`) queda vacío.
 */
export interface IFexLastCmpInput {
  Pto_venta: number;
  Cbte_Tipo: number;
}

type FexCmp = IFEXAuthorizeInput["Cmp"];

/** Campos `minOccurs="0"` del WSDL que no aplican a todo comprobante. */
type FexOptionalCmpField =
  | "Fecha_cbte"
  | "Permiso_existente"
  | "Permisos"
  | "Id_impositivo"
  | "CanMisMonExt"
  | "Obs_comerciales"
  | "Obs"
  | "Cmps_asoc"
  | "Forma_pago"
  | "Incoterms"
  | "Incoterms_Ds"
  | "Opcionales"
  | "Fecha_pago"
  | "Actividades";

/** Comprobante de exportación sin `Id` ni `Cbte_nro`: los asigna `createNextVoucher`. */
export type IFexNextVoucher = Omit<
  FexCmp,
  "Id" | "Cbte_nro" | FexOptionalCmpField
> &
  Partial<Pick<FexCmp, FexOptionalCmpField>>;

export interface FexCreateVoucherResultDto {
  response: ServiceSoapTypes.IFEXAuthorizeResult;
  /** Vacío si ARCA no aprobó el comprobante: ver `response.FEXErr` y `response.FEXResultAuth`. */
  cae: string;
  caeFchVto: string;
}
