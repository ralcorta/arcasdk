import { AuthRequest } from "./AuthRequest";
import { IdCtaCte } from "./IdCtaCte";
import { ArrayConfirmarNotasDc } from "./ArrayConfirmarNotasDc";
import { ArrayObservaciones } from "./ArrayObservaciones";
import { ArrayRetenciones } from "./ArrayRetenciones";
import { ArrayAjustesOperacion } from "./ArrayAjustesOperacion";

/** tns:AceptarFECredRequestType */
export interface TnsaceptarFeCredRequestType {
    /** authRequest */
    authRequest?: AuthRequest;
    /** idCtaCte */
    idCtaCte?: IdCtaCte;
    /** arrayConfirmarNotasDC */
    arrayConfirmarNotasDC?: ArrayConfirmarNotasDc;
    /** arrayFormasCancelacion */
    arrayFormasCancelacion?: ArrayObservaciones;
    /** arrayRetenciones */
    arrayRetenciones?: ArrayRetenciones;
    /** arrayAjustesOperacion */
    arrayAjustesOperacion?: ArrayAjustesOperacion;
    /** TipoCancelacionSimpleType|xsd:string|PAR,TOT */
    tipoCancelacion?: string;
    /** ImporteSimpleType|xsd:decimal|minInclusive,maxInclusive,totalDigits,fractionDigits */
    importeCancelado?: string;
    /** ImporteSimpleType|xsd:decimal|minInclusive,maxInclusive,totalDigits,fractionDigits */
    importeTotalRetPesos?: string;
    /** ImporteSimpleType|xsd:decimal|minInclusive,maxInclusive,totalDigits,fractionDigits */
    importeEmbargoPesos?: string;
    /** ImporteSimpleType|xsd:decimal|minInclusive,maxInclusive,totalDigits,fractionDigits */
    saldoAceptado?: string;
    /** xsd:string */
    codMoneda?: string;
    /** xsd:decimal */
    cotizacionMonedaUlt?: number;
    /** SiNoSimpleType|xsd:string|length,S,N */
    informaCBU?: string;
    /** CBUSimpleType|xsd:string|length */
    CBUComprador?: string;
}
