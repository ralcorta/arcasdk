
/**
 * infoSCA
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface InfoSca {
    /** xsd:date */
    fechaAceptacionFactura?: Date;
    /** SiNoSimpleType|xsd:string|length,S,N */
    informaCBUReceptor?: string;
    /** CBUSimpleType|xsd:string|length */
    CBUReceptor?: string;
    /** SiNoSimpleType|xsd:string|length,S,N */
    CBUValidada?: string;
    /** xsd:dateTime */
    fechaLecturaSCA?: Date;
}
