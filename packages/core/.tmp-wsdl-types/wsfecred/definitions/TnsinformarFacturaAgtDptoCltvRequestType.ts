import { AuthRequest } from "./AuthRequest";
import { IdCtaCte } from "./IdCtaCte";
import { CtaAgente } from "./CtaAgente";

/** tns:InformarFacturaAgtDptoCltvRequestType */
export interface TnsinformarFacturaAgtDptoCltvRequestType {
    /** authRequest */
    authRequest?: AuthRequest;
    /** idCtaCte */
    idCtaCte?: IdCtaCte;
    /** ctaAgente */
    ctaAgente?: CtaAgente;
}
