import { FexResultGet } from "./FexResultGet";
import { FexErr } from "./FexErr";
import { FexEvents } from "./FexEvents";

/**
 * FEXGetCMPResult
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gov.afip.dif.fexv1/`
 */
export interface FexGetCmpResult {
    /** FEXResultGet */
    FEXResultGet?: FexResultGet;
    /** FEXErr */
    FEXErr?: FexErr;
    /** FEXEvents */
    FEXEvents?: FexEvents;
}
