import { IdComprobanteAsociado } from "./IdComprobanteAsociado";

/**
 * idCtaCte
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface IdCtaCte {
    /** xsd:long */
    codCtaCte?: number;
    /** idFactura */
    idFactura?: IdComprobanteAsociado;
}
