import { Client } from "soap";
import { SoapAsyncFunc } from "../../../types";

/* tslint:disable:max-line-length no-empty-interface */
export interface IgetPersonaInput {
  /** http://a10.soap.ws.server.puc.sr/#xs:string(undefined) */
  token: string;
  /** http://a10.soap.ws.server.puc.sr/#xs:string(undefined) */
  sign: string;
  /** http://a10.soap.ws.server.puc.sr/#xs:long(undefined) */
  cuitRepresentada: number;
  /** http://a10.soap.ws.server.puc.sr/#xs:long(undefined) */
  idPersona: number;
}

export interface IgetPersonaOutput {
  personaReturn: PersonaServiceA10PortTypes.IpersonaReturn;
}

export interface IdummyInput {}

export interface IdummyOutput {
  return: PersonaServiceA10PortTypes.Ireturn;
}

export interface IPersonaServiceA10PortSoap extends Client {
  getPersona: (
    input: IgetPersonaInput,
    cb: (
      err: any | null,
      result: IgetPersonaOutput,
      raw: string,
      soapHeader: { [k: string]: any }
    ) => any,
    options?: any,
    extraHeaders?: any
  ) => void;
  getPersonaAsync: SoapAsyncFunc<IgetPersonaInput, IgetPersonaOutput>;
  dummy: (
    input: IdummyInput,
    cb: (
      err: any | null,
      result: IdummyOutput,
      raw: string,
      soapHeader: { [k: string]: any }
    ) => any,
    options?: any,
    extraHeaders?: any
  ) => void;
  dummyAsync: SoapAsyncFunc<IdummyInput, IdummyOutput>;
}

export namespace PersonaServiceA10PortTypes {
  export interface Imetadata {
    /** http://a10.soap.ws.server.puc.sr/#xs:dateTime(undefined) */
    fechaHora: string;
    /** http://a10.soap.ws.server.puc.sr/#xs:string(undefined) */
    servidor: string;
  }
  export interface Idependencia {
    /** http://a10.soap.ws.server.puc.sr/#xs:string(undefined) */
    descripcionDependencia: string;
    /** http://a10.soap.ws.server.puc.sr/#xs:int(undefined) */
    idDependencia: number; // int;
  }
  export interface Idomicilio {
    /** http://a10.soap.ws.server.puc.sr/#xs:string(undefined) */
    codPostal: string;
    /** http://a10.soap.ws.server.puc.sr/#xs:string(undefined) */
    datoAdicional: string;
    /** http://a10.soap.ws.server.puc.sr/#xs:string(undefined) */
    descripcionProvincia: string;
    /** http://a10.soap.ws.server.puc.sr/#xs:string(undefined) */
    direccion: string;
    /** http://a10.soap.ws.server.puc.sr/#xs:int(undefined) */
    idProvincia: number; // int;
    /** http://a10.soap.ws.server.puc.sr/#xs:string(undefined) */
    localidad: string;
    /** http://a10.soap.ws.server.puc.sr/#xs:string(undefined) */
    tipoDatoAdicional: string;
    /** http://a10.soap.ws.server.puc.sr/#xs:string(undefined) */
    tipoDomicilio: string;
  }
  export interface Ipersona {
    /** http://a10.soap.ws.server.puc.sr/#xs:string(undefined) */
    apellido: string;
    /** http://a10.soap.ws.server.puc.sr/#xs:long(undefined) */
    claveInactivaAsociada: number;
    dependencia: PersonaServiceA10PortTypes.Idependencia;
    /** http://a10.soap.ws.server.puc.sr/#xs:string(undefined) */
    descripcionActividadPrincipal: string;
    domicilio: PersonaServiceA10PortTypes.Idomicilio[];
    /** http://a10.soap.ws.server.puc.sr/#xs:string(undefined) */
    estadoClave: string;
    /** http://a10.soap.ws.server.puc.sr/#xs:long(undefined) */
    idActividadPrincipal: number;
    /** http://a10.soap.ws.server.puc.sr/#xs:long(undefined) */
    idPersona: number;
    /** http://a10.soap.ws.server.puc.sr/#xs:string(undefined) */
    nombre: string;
    /** http://a10.soap.ws.server.puc.sr/#xs:string(undefined) */
    numeroDocumento: string;
    /** http://a10.soap.ws.server.puc.sr/#xs:string(undefined) */
    razonSocial: string;
    /** http://a10.soap.ws.server.puc.sr/#xs:string(undefined) */
    tipoClave: string;
    /** http://a10.soap.ws.server.puc.sr/#xs:string(undefined) */
    tipoDocumento: string;
    /** http://a10.soap.ws.server.puc.sr/#xs:string(undefined) */
    tipoPersona: string;
  }
  export interface IpersonaReturn {
    metadata: PersonaServiceA10PortTypes.Imetadata;
    persona: PersonaServiceA10PortTypes.Ipersona;
  }
  export interface Ireturn {
    /** http://a10.soap.ws.server.puc.sr/#xs:string(undefined) */
    appserver: string;
    /** http://a10.soap.ws.server.puc.sr/#xs:string(undefined) */
    authserver: string;
    /** http://a10.soap.ws.server.puc.sr/#xs:string(undefined) */
    dbserver: string;
  }
}
