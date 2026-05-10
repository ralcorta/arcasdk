
/**
 * retencion
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface Retencion {
    /** xsd:short */
    codTipo?: number;
    /** ImporteSimpleType|xsd:decimal|minInclusive,maxInclusive,totalDigits,fractionDigits */
    importe?: string;
    /** PorcentajeSimpleType|xsd:decimal|maxInclusive,minInclusive */
    porcentaje?: string;
    /** Texto250SimpleType|xsd:string|minLength,maxLength */
    descMotivo?: string;
}
