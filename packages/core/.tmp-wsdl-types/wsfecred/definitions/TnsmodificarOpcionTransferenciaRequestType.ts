import { AuthRequest } from "./AuthRequest";
import { IdCtaCte } from "./IdCtaCte";

/** tns:ModificarOpcionTransferenciaRequestType */
export interface TnsmodificarOpcionTransferenciaRequestType {
    /** authRequest */
    authRequest?: AuthRequest;
    /** idCtaCte */
    idCtaCte?: IdCtaCte;
    /** OpcionTransferenciaSimpleType|xsd:string|SCA,ADC */
    opcionTransferencia?: string;
}
