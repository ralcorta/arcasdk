import { FexResultGet9 } from "./FexResultGet9";
import { FexErr } from "./FexErr";
import { FexEvents } from "./FexEvents";

/**
 * FEXGetPARAM_MON_CON_COTIZACIONResult
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gov.afip.dif.fexv1/`
 */
export interface FexGetParamMonConCotizacionResult {
    /** FEXResultGet */
    FEXResultGet?: FexResultGet9;
    /** FEXErr */
    FEXErr?: FexErr;
    /** FEXEvents */
    FEXEvents?: FexEvents;
}
