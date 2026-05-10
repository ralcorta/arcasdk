import { AuthRequest } from "./AuthRequest";
import { Fecha } from "./Fecha";

/** tns:ConsultarCtasCtesRequestType */
export interface TnsconsultarCtasCtesRequestType {
    /** authRequest */
    authRequest?: AuthRequest;
    /** RolSimpleType|xsd:string|Emisor,Receptor */
    rolCUITRepresentada?: string;
    /** CuitSimpleType|xsd:long|minExclusive,maxInclusive */
    CUITContraparte?: string;
    /** fecha */
    fecha?: Fecha;
    /** EstadoCtaCteSimpleType|xsd:string|Modificable,Aceptada,Rechazada,CanceladaTotal,InformadaAgDpto */
    estadoCtaCte?: string;
    /** xsd:short */
    nroPagina?: number;
    /** OpcionTransferenciaSimpleType|xsd:string|SCA,ADC */
    opcionTransferencia?: string;
}
