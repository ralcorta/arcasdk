import { IdComprobanteAsociado } from "./IdComprobanteAsociado";

/**
 * confirmarNota
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface ConfirmarNota {
    /** SiNoSimpleType|xsd:string|length,S,N */
    acepta?: string;
    /** idNota */
    idNota?: IdComprobanteAsociado;
}
