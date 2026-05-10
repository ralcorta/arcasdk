import { ClsFexResponsePtoVenta } from "./ClsFexResponsePtoVenta";

/**
 * FEXResultGet
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gov.afip.dif.fexv1/`
 */
export interface FexResultGet12 {
    /** ClsFEXResponse_PtoVenta[] */
    ClsFEXResponse_PtoVenta?: Array<ClsFexResponsePtoVenta>;
}
