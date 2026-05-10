import { EstadoCtaCte } from "./EstadoCtaCte";
import { Comprobante } from "./Comprobante";
import { ArrayComprobantes } from "./ArrayComprobantes";
import { ArrayObservaciones } from "./ArrayObservaciones";
import { ArrayRetenciones } from "./ArrayRetenciones";
import { ArrayAjustesOperacion } from "./ArrayAjustesOperacion";

/**
 * ctaCte
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface CtaCte {
    /** xsd:long */
    codCtaCte?: number;
    /** estadoCtaCte */
    estadoCtaCte?: EstadoCtaCte;
    /** factura */
    factura?: Comprobante;
    /** arrayNotasDCAsociadas */
    arrayNotasDCAsociadas?: ArrayComprobantes;
    /** arrayFormasCancelacion */
    arrayFormasCancelacion?: ArrayObservaciones;
    /** arrayRetenciones */
    arrayRetenciones?: ArrayRetenciones;
    /** arrayAjustesOperacion */
    arrayAjustesOperacion?: ArrayAjustesOperacion;
    /** ImporteSimpleType|xsd:decimal|minInclusive,maxInclusive,totalDigits,fractionDigits */
    importeInicial?: string;
    /** ImporteSimpleType|xsd:decimal|minInclusive,maxInclusive,totalDigits,fractionDigits */
    importeTotalNotasDC?: string;
    /** ImporteSimpleType|xsd:decimal|minInclusive,maxInclusive,totalDigits,fractionDigits */
    importeCancelado?: string;
    /** ImporteSimpleType|xsd:decimal|minInclusive,maxInclusive,totalDigits,fractionDigits */
    importeTotalRetPesos?: string;
    /** ImporteSimpleType|xsd:decimal|minInclusive,maxInclusive,totalDigits,fractionDigits */
    importeEmbargoPesos?: string;
    /** ImporteSimpleType|xsd:decimal|minInclusive,maxInclusive,totalDigits,fractionDigits */
    saldoAceptado?: string;
    /** ImporteSimpleType|xsd:decimal|minInclusive,maxInclusive,totalDigits,fractionDigits */
    saldo?: string;
    /** xsd:string */
    codMoneda?: string;
    /** xsd:decimal */
    cotizacionMonedaUlt?: number;
}
