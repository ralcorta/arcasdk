
/**
 * ClsFEXResponse_Idi
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gov.afip.dif.fexv1/`
 */
export interface ClsFexResponseIdi {
    /** s:short */
    Idi_Id?: number;
    /** s:string */
    Idi_Ds?: string;
    /** s:string */
    Idi_vig_desde?: string;
    /** s:string */
    Idi_vig_hasta?: string;
}
