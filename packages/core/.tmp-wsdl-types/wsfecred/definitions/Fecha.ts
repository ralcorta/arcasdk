
/**
 * fecha
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface Fecha {
    /** TipoFechaSimpleType|xsd:string|Emision,PuestaDispo,VenPago,VenAcep,Acep,InfoAgDptoCltv */
    tipo?: string;
    /** xsd:date */
    desde?: Date;
    /** xsd:date */
    hasta?: Date;
}
