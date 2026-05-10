import { FexResultGet6 } from "./FexResultGet6";
import { FexErr } from "./FexErr";
import { FexEvents } from "./FexEvents";

/**
 * FEXGetPARAM_DST_paisResult
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gov.afip.dif.fexv1/`
 */
export interface FexGetParamDstPaisResult {
    /** FEXResultGet */
    FEXResultGet?: FexResultGet6;
    /** FEXErr */
    FEXErr?: FexErr;
    /** FEXEvents */
    FEXEvents?: FexEvents;
}
