import { InfoAgtDptoCltv } from "./InfoAgtDptoCltv";
import { InfoSca } from "./InfoSca";

/**
 * infoTransferencia
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface InfoTransferencia {
    /** infoAgtDptoCltv */
    infoAgtDptoCltv?: InfoAgtDptoCltv;
    /** infoSCA */
    infoSCA?: InfoSca;
}
