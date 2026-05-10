
/**
 * item
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface Item {
    /** xsd:int */
    orden?: number;
    /** xsd:int */
    unidadesMtx?: number;
    /** xsd:string */
    codigoMtx?: string;
    /** xsd:string */
    codigo?: string;
    /** xsd:string */
    descripcion?: string;
    /** xsd:string */
    codNomMercosur?: string;
    /** DecimalSimpleType|xsd:decimal|minInclusive,maxInclusive,totalDigits,fractionDigits */
    cantidad?: string;
    /** xsd:short */
    codigoUnidadMedida?: number;
    /** ImporteSimpleType|xsd:decimal|minInclusive,maxInclusive,totalDigits,fractionDigits */
    precioUnitario?: string;
    /** ImporteSimpleType|xsd:decimal|minInclusive,maxInclusive,totalDigits,fractionDigits */
    importeBonificacion?: string;
    /** xsd:short */
    codigoCondicionIVA?: number;
    /** ImporteSimpleType|xsd:decimal|minInclusive,maxInclusive,totalDigits,fractionDigits */
    importeIVA?: string;
    /** ImporteSimpleType|xsd:decimal|minInclusive,maxInclusive,totalDigits,fractionDigits */
    importeItem?: string;
}
