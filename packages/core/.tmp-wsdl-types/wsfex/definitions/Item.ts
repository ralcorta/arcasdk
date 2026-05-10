
/**
 * Item
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gov.afip.dif.fexv1/`
 */
export interface Item {
    /** s:string */
    Pro_codigo?: string;
    /** s:string */
    Pro_ds?: string;
    /** s:decimal */
    Pro_qty?: number;
    /** s:int */
    Pro_umed?: number;
    /** s:decimal */
    Pro_precio_uni?: number;
    /** s:decimal */
    Pro_bonificacion?: number;
    /** s:decimal */
    Pro_total_item?: number;
}
