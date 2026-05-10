
/**
 * FEXResultAuth
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gov.afip.dif.fexv1/`
 */
export interface FexResultAuth {
    /** s:long */
    Id?: number;
    /** s:long */
    Cuit?: number;
    /** s:short */
    Cbte_tipo?: number;
    /** s:int */
    Punto_vta?: number;
    /** s:long */
    Cbte_nro?: number;
    /** s:string */
    Cae?: string;
    /** s:string */
    Fch_venc_Cae?: string;
    /** s:string */
    Fch_cbte?: string;
    /** s:string */
    Resultado?: string;
    /** s:string */
    Reproceso?: string;
    /** s:string */
    Motivos_Obs?: string;
}
