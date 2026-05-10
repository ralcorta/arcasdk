
/**
 * ctaAgente
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface CtaAgente {
    /** CuitSimpleType|xsd:long|minExclusive,maxInclusive */
    cuitAgente?: string;
    /** xsd:string */
    razonSocialAgente?: string;
    /** IdCuentaAgenteSimpleType|xsd:string|minLength,maxLength */
    idCuenta?: string;
    /** Texto250SimpleType|xsd:string|minLength,maxLength */
    denominacion?: string;
}
