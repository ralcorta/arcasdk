import { AuthRequest } from "./AuthRequest";
import { IdComprobanteAsociado } from "./IdComprobanteAsociado";

/** tns:ConsultarHistorialEstadosComprobanteRequestType */
export interface TnsconsultarHistorialEstadosComprobanteRequestType {
    /** authRequest */
    authRequest?: AuthRequest;
    /** idComprobante */
    idComprobante?: IdComprobanteAsociado;
}
