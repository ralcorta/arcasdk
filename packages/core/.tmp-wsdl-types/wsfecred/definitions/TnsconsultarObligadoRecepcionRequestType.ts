import { AuthRequest } from "./AuthRequest";

/** tns:consultarObligadoRecepcionRequestType */
export interface TnsconsultarObligadoRecepcionRequestType {
    /** authRequest */
    authRequest?: AuthRequest;
    /** CuitSimpleType|xsd:long|minExclusive,maxInclusive */
    cuitConsultada?: string;
}
