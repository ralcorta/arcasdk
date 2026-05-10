import { ArrayTiposRetenciones } from "./ArrayTiposRetenciones";
import { ArrayErroresFormato } from "./ArrayErroresFormato";

/**
 * consultarTiposRetencionesReturn
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface ConsultarTiposRetencionesReturn {
    /** arrayTiposRetenciones */
    arrayTiposRetenciones?: ArrayTiposRetenciones;
    /** arrayErroresFormato */
    arrayErroresFormato?: ArrayErroresFormato;
}
