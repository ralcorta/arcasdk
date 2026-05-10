
/**
 * motivoRechazo
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface MotivoRechazo {
    /** xsd:short */
    codMotivo?: number;
    /** Texto250SimpleType|xsd:string|minLength,maxLength */
    descMotivo?: string;
    /** Texto250SimpleType|xsd:string|minLength,maxLength */
    justificacion?: string;
}
