
/**
 * estadoCtaCte
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface EstadoCtaCte {
    /** EstadoCtaCteSimpleType|xsd:string|Modificable,Aceptada,Rechazada,CanceladaTotal,InformadaAgDpto */
    estado?: string;
    /** xsd:dateTime */
    fechaHoraEstado?: Date;
}
