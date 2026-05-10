import { Evento } from "./Evento";

/**
 * arrayObservaciones
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface ArrayObservaciones {
    /** codigoDescripcion[] */
    codigoDescripcion?: Array<Evento>;
}
