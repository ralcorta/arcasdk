import { Retencion } from "./Retencion";

/**
 * arrayRetenciones
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface ArrayRetenciones {
    /** retencion[] */
    retencion?: Array<Retencion>;
}
