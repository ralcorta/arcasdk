import { ArrayIdsRemitos } from "./ArrayIdsRemitos";
import { ArrayObservaciones } from "./ArrayObservaciones";
import { ArrayErroresFormato } from "./ArrayErroresFormato";

/**
 * obtenerRemitosReturn
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface ObtenerRemitosReturn {
    /** arrayIdsRemitos */
    arrayIdsRemitos?: ArrayIdsRemitos;
    /** arrayErrores */
    arrayErrores?: ArrayObservaciones;
    /** arrayErroresFormato */
    arrayErroresFormato?: ArrayErroresFormato;
}
