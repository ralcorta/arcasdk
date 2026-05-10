
/**
 * estado
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface Estado {
    /** EstadoCmpSimpleType|xsd:string|PendienteRecepcion,Recepcionado,Aceptado,Rechazado,InformadaAgDpto */
    estado?: string;
    /** xsd:dateTime */
    fechaHoraEstado?: Date;
}
