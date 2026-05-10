import { CtaAgente } from "./CtaAgente";

/**
 * infoAgtDptoCltv
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface InfoAgtDptoCltv {
    /** xsd:date */
    fechaInfo?: Date;
    /** ctaAgente */
    ctaAgente?: CtaAgente;
    /** SiNoSimpleType|xsd:string|length,S,N */
    recibida?: string;
    /** xsd:date */
    fechaLectura?: Date;
    /** xsd:date */
    fechaRecep?: Date;
    /** SiNoSimpleType|xsd:string|length,S,N */
    aceptada?: string;
    /** xsd:string */
    motivoRechazo?: string;
    /** xsd:string */
    idPagoAgtDptoCltv?: string;
    /** CBUSimpleType|xsd:string|length */
    CBUAgtDptoCltv?: string;
}
