
/**
 * Auth
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gov.afip.dif.fexv1/`
 */
export interface Auth1 {
    /** s:string */
    Token?: string;
    /** s:string */
    Sign?: string;
    /** s:long */
    Cuit?: number;
    /** s:int */
    Pto_venta?: number;
    /** s:short */
    Cbte_Tipo?: number;
}
