import { IdCtaCte } from "./IdCtaCte";
import { ArrayHistorialEstados1 } from "./ArrayHistorialEstados1";
import { ArrayObservaciones } from "./ArrayObservaciones";
import { ArrayErroresFormato } from "./ArrayErroresFormato";

/**
 * consultarHistorialEstadosCtaCteReturn
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface ConsultarHistorialEstadosCtaCteReturn {
    /** idCtaCte */
    idCtaCte?: IdCtaCte;
    /** arrayHistorialEstados */
    arrayHistorialEstados?: ArrayHistorialEstados1;
    /** arrayErrores */
    arrayErrores?: ArrayObservaciones;
    /** arrayErroresFormato */
    arrayErroresFormato?: ArrayErroresFormato;
}
