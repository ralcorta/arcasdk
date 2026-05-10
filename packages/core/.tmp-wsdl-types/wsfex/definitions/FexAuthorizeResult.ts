import { FexResultAuth } from "./FexResultAuth";
import { FexErr } from "./FexErr";
import { FexEvents } from "./FexEvents";

/**
 * FEXAuthorizeResult
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gov.afip.dif.fexv1/`
 */
export interface FexAuthorizeResult {
    /** FEXResultAuth */
    FEXResultAuth?: FexResultAuth;
    /** FEXErr */
    FEXErr?: FexErr;
    /** FEXEvents */
    FEXEvents?: FexEvents;
}
