
/**
 * idComprobanteAsociado
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface IdComprobanteAsociado {
    /** CuitSimpleType|xsd:long|minExclusive,maxInclusive */
    CUITEmisor?: string;
    /** xsd:short */
    codTipoCmp?: number;
    /** PuntoVentaSimpleType|xsd:int|minInclusive,maxInclusive */
    ptoVta?: string;
    /** NumeroComprobanteSimpleType|xsd:long|minInclusive,maxInclusive */
    nroCmp?: string;
}
