import { IdComprobanteAsociado } from "./IdComprobanteAsociado";
import { ArrayHistorialEstados } from "./ArrayHistorialEstados";
import { ArrayObservaciones } from "./ArrayObservaciones";
import { ArrayErroresFormato } from "./ArrayErroresFormato";

/**
 * consultarHistorialEstadosComprobanteReturn
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface ConsultarHistorialEstadosComprobanteReturn {
    /** idComprobante */
    idComprobante?: IdComprobanteAsociado;
    /** arrayHistorialEstados */
    arrayHistorialEstados?: ArrayHistorialEstados;
    /** arrayErrores */
    arrayErrores?: ArrayObservaciones;
    /** arrayErroresFormato */
    arrayErroresFormato?: ArrayErroresFormato;
}
