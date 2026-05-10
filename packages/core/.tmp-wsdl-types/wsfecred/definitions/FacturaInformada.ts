import { IdComprobanteAsociado } from "./IdComprobanteAsociado";
import { InfoAgtDptoCltv } from "./InfoAgtDptoCltv";

/**
 * facturaInformada
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface FacturaInformada {
    /** idFactura */
    idFactura?: IdComprobanteAsociado;
    /** infoAgtDptoCltv */
    infoAgtDptoCltv?: InfoAgtDptoCltv;
}
