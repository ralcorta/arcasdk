import { AuthRequest } from "./AuthRequest";
import { IdComprobanteAsociado } from "./IdComprobanteAsociado";
import { ArrayMotivosRechazo } from "./ArrayMotivosRechazo";

/** tns:RechazarNotaDCRequestType */
export interface TnsrechazarNotaDcRequestType {
    /** authRequest */
    authRequest?: AuthRequest;
    /** idComprobante */
    idComprobante?: IdComprobanteAsociado;
    /** arrayMotivosRechazo */
    arrayMotivosRechazo?: ArrayMotivosRechazo;
}
