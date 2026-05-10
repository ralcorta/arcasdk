import { AuthRequest } from "./AuthRequest";

/** tns:ConsultarMontoObligadoRecepcionRequestType */
export interface TnsconsultarMontoObligadoRecepcionRequestType {
    /** authRequest */
    authRequest?: AuthRequest;
    /** CuitSimpleType|xsd:long|minExclusive,maxInclusive */
    cuitConsultada?: string;
    /** xsd:date */
    fechaEmision?: Date;
}
