import { IdCtaCte } from "./IdCtaCte";
import { Evento } from "./Evento";
import { ArrayObservaciones } from "./ArrayObservaciones";
import { ArrayErroresFormato } from "./ArrayErroresFormato";

/**
 * operacionFECredReturn
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface OperacionFeCredReturn {
    /** ResultadoSimpleType|xsd:string|A,O,R */
    resultado?: string;
    /** idCtaCte */
    idCtaCte?: IdCtaCte;
    /** evento */
    evento?: Evento;
    /** arrayObservaciones */
    arrayObservaciones?: ArrayObservaciones;
    /** arrayErrores */
    arrayErrores?: ArrayObservaciones;
    /** arrayErroresFormato */
    arrayErroresFormato?: ArrayErroresFormato;
}
