import { AuthRequest } from "./AuthRequest";
import { Fecha } from "./Fecha";

/** tns:ConsultarComprobanteRequestType */
export interface TnsconsultarComprobanteRequestType {
    /** authRequest */
    authRequest?: AuthRequest;
    /** RolSimpleType|xsd:string|Emisor,Receptor */
    rolCUITRepresentada?: string;
    /** CuitSimpleType|xsd:long|minExclusive,maxInclusive */
    CUITContraparte?: string;
    /** xsd:short */
    codTipoCmp?: number;
    /** EstadoCmpSimpleType|xsd:string|PendienteRecepcion,Recepcionado,Aceptado,Rechazado,InformadaAgDpto */
    estadoCmp?: string;
    /** fecha */
    fecha?: Fecha;
    /** xsd:long */
    codCtaCte?: number;
    /** EstadoCtaCteSimpleType|xsd:string|Modificable,Aceptada,Rechazada,CanceladaTotal,InformadaAgDpto */
    estadoCtaCte?: string;
    /** xsd:short */
    nroPagina?: number;
}
