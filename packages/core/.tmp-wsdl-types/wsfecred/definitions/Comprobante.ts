import { IdComprobanteAsociado } from "./IdComprobanteAsociado";
import { ReferenciasComerciales } from "./ReferenciasComerciales";
import { ArraySubtotalesIva } from "./ArraySubtotalesIva";
import { ArrayOtrosTributos } from "./ArrayOtrosTributos";
import { ArrayItems } from "./ArrayItems";
import { Estado } from "./Estado";
import { ArrayMotivosRechazo } from "./ArrayMotivosRechazo";
import { InfoTransferencia } from "./InfoTransferencia";

/**
 * comprobante
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface Comprobante {
    /** CuitSimpleType|xsd:long|minExclusive,maxInclusive */
    cuitEmisor?: string;
    /** xsd:string */
    razonSocialEmi?: string;
    /** xsd:short */
    codTipoCmp?: number;
    /** PuntoVentaSimpleType|xsd:int|minInclusive,maxInclusive */
    ptovta?: string;
    /** NumeroComprobanteSimpleType|xsd:long|minInclusive,maxInclusive */
    nroCmp?: string;
    /** CuitSimpleType|xsd:long|minExclusive,maxInclusive */
    cuitReceptor?: string;
    /** xsd:string */
    razonSocialRecep?: string;
    /** TipoCodAutorizacionType|xsd:string|A,E */
    tipoCodAuto?: string;
    /** xsd:long */
    codAutorizacion?: number;
    /** xsd:date */
    fechaEmision?: Date;
    /** xsd:date */
    fechaPuestaDispo?: Date;
    /** xsd:date */
    fechaVenPago?: Date;
    /** xsd:date */
    fechaVenAcep?: Date;
    /** ImporteSimpleType|xsd:decimal|minInclusive,maxInclusive,totalDigits,fractionDigits */
    importeTotal?: string;
    /** xsd:string */
    codMoneda?: string;
    /** xsd:decimal */
    cotizacionMoneda?: number;
    /** CBUSimpleType|xsd:string|length */
    CBUEmisor?: string;
    /** Texto250SimpleType|xsd:string|minLength,maxLength */
    AliasEmisor?: string;
    /** SiNoSimpleType|xsd:string|length,S,N */
    esAnulacion?: string;
    /** SiNoSimpleType|xsd:string|length,S,N */
    esPostAceptacion?: string;
    /** idComprobanteAsociado */
    idComprobanteAsociado?: IdComprobanteAsociado;
    /** referenciasComerciales */
    referenciasComerciales?: ReferenciasComerciales;
    /** arraySubtotalesIVA */
    arraySubtotalesIVA?: ArraySubtotalesIva;
    /** arrayOtrosTributos */
    arrayOtrosTributos?: ArrayOtrosTributos;
    /** arrayItems */
    arrayItems?: ArrayItems;
    /** xsd:string */
    datosGenerales?: string;
    /** xsd:string */
    datosComerciales?: string;
    /** Texto250SimpleType|xsd:string|minLength,maxLength */
    leyendaComercial?: string;
    /** xsd:long */
    codCtaCte?: number;
    /** estado */
    estado?: Estado;
    /** TipoAceptacionSimpleType|xsd:string|Tacita,Expresa */
    tipoAcep?: string;
    /** xsd:dateTime */
    fechaHoraAcep?: Date;
    /** arrayMotivosRechazo */
    arrayMotivosRechazo?: ArrayMotivosRechazo;
    /** OpcionTransferenciaSimpleType|xsd:string|SCA,ADC */
    opcionTransferencia?: string;
    /** infoTransferencia */
    infoTransferencia?: InfoTransferencia;
}
