import { FexResultGet2 } from "./FexResultGet2";
import { FexErr } from "./FexErr";
import { FexEvents } from "./FexEvents";

/**
 * FEXGetPARAM_Tipo_ExpoResult
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gov.afip.dif.fexv1/`
 */
export interface FexGetParamTipoExpoResult {
    /** FEXResultGet */
    FEXResultGet?: FexResultGet2;
    /** FEXErr */
    FEXErr?: FexErr;
    /** FEXEvents */
    FEXEvents?: FexEvents;
}
