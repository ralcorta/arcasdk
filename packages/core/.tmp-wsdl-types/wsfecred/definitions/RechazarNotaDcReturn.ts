import { IdComprobanteAsociado } from "./IdComprobanteAsociado";
import { Evento } from "./Evento";
import { ArrayObservaciones } from "./ArrayObservaciones";
import { ArrayErroresFormato } from "./ArrayErroresFormato";

/**
 * rechazarNotaDCReturn
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface RechazarNotaDcReturn {
    /** idComprobante */
    idComprobante?: IdComprobanteAsociado;
    /** ResultadoSimpleType|xsd:string|A,O,R */
    resultado?: string;
    /** evento */
    evento?: Evento;
    /** arrayObservaciones */
    arrayObservaciones?: ArrayObservaciones;
    /** arrayErrores */
    arrayErrores?: ArrayObservaciones;
    /** arrayErroresFormato */
    arrayErroresFormato?: ArrayErroresFormato;
}
