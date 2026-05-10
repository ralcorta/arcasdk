import { AuthRequest } from "./AuthRequest";
import { IdCtaCte } from "./IdCtaCte";
import { ArrayMotivosRechazo } from "./ArrayMotivosRechazo";

/** tns:RechazarFECredRequestType */
export interface TnsrechazarFeCredRequestType {
    /** authRequest */
    authRequest?: AuthRequest;
    /** idCtaCte */
    idCtaCte?: IdCtaCte;
    /** arrayMotivosRechazo */
    arrayMotivosRechazo?: ArrayMotivosRechazo;
}
