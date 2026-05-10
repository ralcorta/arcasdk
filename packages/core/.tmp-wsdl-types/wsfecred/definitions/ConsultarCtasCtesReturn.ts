import { ArrayInfosCtaCte } from "./ArrayInfosCtaCte";
import { Evento } from "./Evento";
import { ArrayObservaciones } from "./ArrayObservaciones";
import { ArrayErroresFormato } from "./ArrayErroresFormato";

/**
 * consultarCtasCtesReturn
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface ConsultarCtasCtesReturn {
    /** arrayInfosCtaCte */
    arrayInfosCtaCte?: ArrayInfosCtaCte;
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
