import { AuthRequest } from "./AuthRequest";
import { IdCtaCte } from "./IdCtaCte";
import { ArrayObservaciones } from "./ArrayObservaciones";

/** tns:InformarCancelacionTotalFECredRequestType */
export interface TnsinformarCancelacionTotalFeCredRequestType {
    /** authRequest */
    authRequest?: AuthRequest;
    /** idCtaCte */
    idCtaCte?: IdCtaCte;
    /** arrayFormasCancelacion */
    arrayFormasCancelacion?: ArrayObservaciones;
    /** ImporteSimpleType|xsd:decimal|minInclusive,maxInclusive,totalDigits,fractionDigits */
    importeCancelacion?: string;
}
