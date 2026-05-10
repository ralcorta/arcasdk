import { ArrayObservaciones } from "./ArrayObservaciones";
import { ArrayErroresFormato } from "./ArrayErroresFormato";

/**
 * codigoDescripcionReturn
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface CodigoDescripcionReturn {
    /** arrayCodigoDescripcion */
    arrayCodigoDescripcion?: ArrayObservaciones;
    /** arrayErroresFormato */
    arrayErroresFormato?: ArrayErroresFormato;
}
