import { SubtotalIva } from "./SubtotalIva";

/**
 * arraySubtotalesIVA
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface ArraySubtotalesIva {
    /** subtotalIVA[] */
    subtotalIVA?: Array<SubtotalIva>;
}
