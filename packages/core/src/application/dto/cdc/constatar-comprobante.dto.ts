import { ServiceSoapTypes } from "./service-soap.types";

type OptionalCmpReqFields = "DocTipoReceptor" | "DocNroReceptor" | "Opcionales";

// El contrato generado marca todos los campos como obligatorios, pero ARCA
// sólo exige los datos del receptor en algunos tipos de comprobante y los
// opcionales son opcionales (minOccurs="0" en el WSDL).
export type ConstatarComprobanteRequest = Omit<
  ServiceSoapTypes.ICmpReq,
  OptionalCmpReqFields
> &
  Partial<Pick<ServiceSoapTypes.ICmpReq, OptionalCmpReqFields>>;

export interface ConstatarComprobanteInput {
  CmpReq: ConstatarComprobanteRequest;
}
