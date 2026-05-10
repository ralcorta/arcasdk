import { FacturaInformada } from "./FacturaInformada";

/**
 * arrayFacturasAgtDptoCltv
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface ArrayFacturasAgtDptoCltv {
    /** facturaInformada[] */
    facturaInformada?: Array<FacturaInformada>;
}
