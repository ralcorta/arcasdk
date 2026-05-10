import { FexResultGet14 } from "./FexResultGet14";
import { FexErr } from "./FexErr";
import { FexEvents } from "./FexEvents";

/**
 * FEXGetPARAM_OpcionalesResult
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gov.afip.dif.fexv1/`
 */
export interface FexGetParamOpcionalesResult {
    /** FEXResultGet */
    FEXResultGet?: FexResultGet14;
    /** FEXErr */
    FEXErr?: FexErr;
    /** FEXEvents */
    FEXEvents?: FexEvents;
}
