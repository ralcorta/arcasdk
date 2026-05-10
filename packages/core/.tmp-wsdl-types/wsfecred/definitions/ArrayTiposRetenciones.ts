import { TipoRetencion } from "./TipoRetencion";

/**
 * arrayTiposRetenciones
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface ArrayTiposRetenciones {
    /** tipoRetencion[] */
    tipoRetencion?: Array<TipoRetencion>;
}
