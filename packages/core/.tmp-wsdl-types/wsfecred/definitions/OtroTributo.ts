
/**
 * otroTributo
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface OtroTributo {
    /** xsd:short */
    codigo?: number;
    /** Texto250SimpleType|xsd:string|minLength,maxLength */
    detalle?: string;
    /** ImporteSimpleType|xsd:decimal|minInclusive,maxInclusive,totalDigits,fractionDigits */
    baseImponible?: string;
    /** ImporteSimpleType|xsd:decimal|minInclusive,maxInclusive,totalDigits,fractionDigits */
    importe?: string;
}
