import { Estado } from "./Estado";

/**
 * arrayHistorialEstados
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface ArrayHistorialEstados {
    /** estadoHistorico[] */
    estadoHistorico?: Array<Estado>;
}
