
/**
 * tipoRetencion
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface TipoRetencion {
    /** xsd:short */
    codigoJurisdiccion?: number;
    /** xsd:string */
    descripcionJurisdiccion?: string;
    /** PorcentajeSimpleType|xsd:decimal|maxInclusive,minInclusive */
    porcentajeRetencion?: string;
}
