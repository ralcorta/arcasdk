import { AuthRequest } from "./AuthRequest";
import { IdCtaCte } from "./IdCtaCte";
import { Fecha } from "./Fecha";

/** tns:ConsultarFacturasAgtDptoCltvRequestType */
export interface TnsconsultarFacturasAgtDptoCltvRequestType {
    /** authRequest */
    authRequest?: AuthRequest;
    /** idCtaCte */
    idCtaCte?: IdCtaCte;
    /** filtroFecha */
    filtroFecha?: Fecha;
}
