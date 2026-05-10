import { FexResultGet7 } from "./FexResultGet7";
import { FexErr } from "./FexErr";
import { FexEvents } from "./FexEvents";

/**
 * FEXGetPARAM_DST_CUITResult
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gov.afip.dif.fexv1/`
 */
export interface FexGetParamDstCuitResult {
    /** FEXResultGet */
    FEXResultGet?: FexResultGet7;
    /** FEXErr */
    FEXErr?: FexErr;
    /** FEXEvents */
    FEXEvents?: FexEvents;
}
