import { Comprobante } from "./Comprobante";

/**
 * arrayComprobantes
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface ArrayComprobantes {
    /** comprobante[] */
    comprobante?: Array<Comprobante>;
}
