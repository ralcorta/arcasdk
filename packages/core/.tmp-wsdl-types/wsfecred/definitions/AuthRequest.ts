
/**
 * authRequest
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface AuthRequest {
    /** xsd:string */
    token?: string;
    /** xsd:string */
    sign?: string;
    /** CuitSimpleType|xsd:long|minExclusive,maxInclusive */
    cuitRepresentada?: string;
}
