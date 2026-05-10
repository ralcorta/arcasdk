import { ArrayFacturasAgtDptoCltv } from "./ArrayFacturasAgtDptoCltv";
import { Evento } from "./Evento";
import { ArrayObservaciones } from "./ArrayObservaciones";
import { ArrayErroresFormato } from "./ArrayErroresFormato";

/**
 * consultarFacturasAgtDptoCltvReturn
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface ConsultarFacturasAgtDptoCltvReturn {
    /** arrayFacturasAgtDptoCltv */
    arrayFacturasAgtDptoCltv?: ArrayFacturasAgtDptoCltv;
    /** evento */
    evento?: Evento;
    /** arrayObservaciones */
    arrayObservaciones?: ArrayObservaciones;
    /** arrayErrores */
    arrayErrores?: ArrayObservaciones;
    /** arrayErroresFormato */
    arrayErroresFormato?: ArrayErroresFormato;
}
