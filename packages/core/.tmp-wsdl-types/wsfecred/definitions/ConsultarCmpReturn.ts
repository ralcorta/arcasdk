import { ArrayComprobantes } from "./ArrayComprobantes";
import { Evento } from "./Evento";
import { ArrayObservaciones } from "./ArrayObservaciones";
import { ArrayErroresFormato } from "./ArrayErroresFormato";

/**
 * consultarCmpReturn
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface ConsultarCmpReturn {
    /** arrayComprobantes */
    arrayComprobantes?: ArrayComprobantes;
    /** xsd:short */
    nroPagina?: number;
    /** SiNoSimpleType|xsd:string|length,S,N */
    hayMas?: string;
    /** evento */
    evento?: Evento;
    /** arrayObservaciones */
    arrayObservaciones?: ArrayObservaciones;
    /** arrayErrores */
    arrayErrores?: ArrayObservaciones;
    /** arrayErroresFormato */
    arrayErroresFormato?: ArrayErroresFormato;
}
