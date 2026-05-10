import { ArrayObservaciones } from "./ArrayObservaciones";
import { ArrayErroresFormato } from "./ArrayErroresFormato";

/**
 * consultarObligadoRecepcionReturn
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface ConsultarObligadoRecepcionReturn {
    /** SiNoSimpleType|xsd:string|length,S,N */
    respuesta?: string;
    /** xsd:date */
    desde?: Date;
    /** arrayObservacion */
    arrayObservacion?: ArrayObservaciones;
    /** arrayErrores */
    arrayErrores?: ArrayObservaciones;
    /** arrayErroresFormato */
    arrayErroresFormato?: ArrayErroresFormato;
}
