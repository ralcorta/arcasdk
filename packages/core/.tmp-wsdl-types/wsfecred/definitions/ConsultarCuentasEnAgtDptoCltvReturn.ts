import { ArrayCuentasEnAgente } from "./ArrayCuentasEnAgente";
import { ArrayObservaciones } from "./ArrayObservaciones";
import { ArrayErroresFormato } from "./ArrayErroresFormato";

/**
 * consultarCuentasEnAgtDptoCltvReturn
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface ConsultarCuentasEnAgtDptoCltvReturn {
    /** arrayCuentasEnAgente */
    arrayCuentasEnAgente?: ArrayCuentasEnAgente;
    /** arrayObservacion */
    arrayObservacion?: ArrayObservaciones;
    /** arrayErrores */
    arrayErrores?: ArrayObservaciones;
    /** arrayErroresFormato */
    arrayErroresFormato?: ArrayErroresFormato;
}
