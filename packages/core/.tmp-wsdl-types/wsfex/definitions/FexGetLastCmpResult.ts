import { FexResultLastCmp } from "./FexResultLastCmp";
import { FexErr } from "./FexErr";
import { FexEvents } from "./FexEvents";

/**
 * FEXGetLast_CMPResult
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gov.afip.dif.fexv1/`
 */
export interface FexGetLastCmpResult {
    /** FEXResult_LastCMP */
    FEXResult_LastCMP?: FexResultLastCmp;
    /** FEXErr */
    FEXErr?: FexErr;
    /** FEXEvents */
    FEXEvents?: FexEvents;
}
