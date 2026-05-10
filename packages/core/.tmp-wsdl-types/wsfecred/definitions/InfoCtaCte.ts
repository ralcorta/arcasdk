import { EstadoCtaCte } from "./EstadoCtaCte";
import { IdComprobanteAsociado } from "./IdComprobanteAsociado";

/**
 * infoCtaCte
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface InfoCtaCte {
    /** xsd:long */
    codCtaCte?: number;
    /** estadoCtaCte */
    estadoCtaCte?: EstadoCtaCte;
    /** idFacturaCredito */
    idFacturaCredito?: IdComprobanteAsociado;
    /** ImporteSimpleType|xsd:decimal|minInclusive,maxInclusive,totalDigits,fractionDigits */
    importeTotalFC?: string;
    /** ImporteSimpleType|xsd:decimal|minInclusive,maxInclusive,totalDigits,fractionDigits */
    saldo?: string;
    /** ImporteSimpleType|xsd:decimal|minInclusive,maxInclusive,totalDigits,fractionDigits */
    saldoAceptado?: string;
    /** xsd:string */
    codMoneda?: string;
    /** OpcionTransferenciaSimpleType|xsd:string|SCA,ADC */
    opcionTransferencia?: string;
}
