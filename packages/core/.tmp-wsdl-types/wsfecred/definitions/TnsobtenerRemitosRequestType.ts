import { AuthRequest } from "./AuthRequest";
import { IdComprobanteAsociado } from "./IdComprobanteAsociado";

/** tns:ObtenerRemitosRequestType */
export interface TnsobtenerRemitosRequestType {
    /** authRequest */
    authRequest?: AuthRequest;
    /** idComprobante */
    idComprobante?: IdComprobanteAsociado;
}
