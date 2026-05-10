import { ClsFexResponseMon } from "./ClsFexResponseMon";

/**
 * FEXResultGet
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gov.afip.dif.fexv1/`
 */
export interface FexResultGet8 {
    /** ClsFEXResponse_Mon[] */
    ClsFEXResponse_Mon?: Array<ClsFexResponseMon>;
}
