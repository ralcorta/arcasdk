import { FexResultGet13 } from "./FexResultGet13";
import { FexErr } from "./FexErr";
import { FexEvents } from "./FexEvents";

/**
 * FEXCheck_PermisoResult
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gov.afip.dif.fexv1/`
 */
export interface FexCheckPermisoResult {
    /** FEXResultGet */
    FEXResultGet?: FexResultGet13;
    /** FEXErr */
    FEXErr?: FexErr;
    /** FEXEvents */
    FEXEvents?: FexEvents;
}
