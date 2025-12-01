/* eslint-disable @typescript-eslint/no-empty-interface */
import { Client } from "soap";
import { SoapAsyncFunc } from "../../../types";
/* tslint:disable:max-line-length no-empty-interface */
export interface IgetPersonaInput {
  /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
  token: string;
  /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
  sign: string;
  /** http://a5.soap.ws.server.puc.sr/#xs:long(undefined) */
  cuitRepresentada: number;
  /** http://a5.soap.ws.server.puc.sr/#xs:long(undefined) */
  idPersona: number;
}

export interface IgetPersonaOutput {
  personaReturn: PersonaServiceInscriptionProofPortTypes.IpersonaReturn;
}

export interface IgetPersonaListInput {
  /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
  token: string;
  /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
  sign: string;
  /** http://a5.soap.ws.server.puc.sr/#xs:long(undefined) */
  cuitRepresentada: number;
  /** http://a5.soap.ws.server.puc.sr/#xs:long(undefined) */
  idPersona: number;
}

export interface IgetPersonaListOutput {
  personaListReturn: PersonaServiceInscriptionProofPortTypes.IpersonaListReturn;
}

export interface IgetPersona_v2Input {
  /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
  token: string;
  /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
  sign: string;
  /** http://a5.soap.ws.server.puc.sr/#xs:long(undefined) */
  cuitRepresentada: number;
  /** http://a5.soap.ws.server.puc.sr/#xs:long(undefined) */
  idPersona: number;
}

export interface IgetPersona_v2Output {
  personaReturn: PersonaServiceInscriptionProofPortTypes.IpersonaReturn;
}

export interface IdummyInput {}

export interface IdummyOutput {
  return: PersonaServiceInscriptionProofPortTypes.Ireturn;
}

export interface IgetPersonaList_v2Input {
  /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
  token: string;
  /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
  sign: string;
  /** http://a5.soap.ws.server.puc.sr/#xs:long(undefined) */
  cuitRepresentada: number;
  /** http://a5.soap.ws.server.puc.sr/#xs:long(undefined) */
  idPersona: number[];
}

export interface IgetPersonaList_v2Output {
  personaListReturn: PersonaServiceInscriptionProofPortTypes.IpersonaListReturn;
}

export interface IPersonaServiceInscriptionProofPortSoap extends Client {
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
  getPersonaList: (
    input: IgetPersonaListInput,
    cb: (
      err: any | null,
      result: IgetPersonaListOutput,
      raw: string,
      soapHeader: { [k: string]: any }
    ) => any,
    options?: any,
    extraHeaders?: any
  ) => void;
  getPersonaListAsync: SoapAsyncFunc<
    IgetPersonaListInput,
    IgetPersonaListOutput
  >;
  getPersona_v2: (
    input: IgetPersona_v2Input,
    cb: (
      err: any | null,
      result: IgetPersona_v2Output,
      raw: string,
      soapHeader: { [k: string]: any }
    ) => any,
    options?: any,
    extraHeaders?: any
  ) => void;
  getPersona_v2Async: SoapAsyncFunc<IgetPersona_v2Input, IgetPersona_v2Output>;
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
  getPersonaList_v2: (
    input: IgetPersonaList_v2Input,
    cb: (
      err: any | null,
      result: IgetPersonaList_v2Output,
      raw: string,
      soapHeader: { [k: string]: any }
    ) => any,
    options?: any,
    extraHeaders?: any
  ) => void;
  getPersonaList_v2Async: SoapAsyncFunc<
    IgetPersonaList_v2Input,
    IgetPersonaList_v2Output
  >;
}

export namespace PersonaServiceInscriptionProofPortTypes {
  export interface Icaracterizacion {
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    descripcionCaracterizacion: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:int(undefined) */
    idCaracterizacion: number; // int;
    /** http://a5.soap.ws.server.puc.sr/#xs:int(undefined) */
    periodo: number; // int;
  }
  export interface Idependencia {
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    codPostal: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    descripcionDependencia: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    descripcionProvincia: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    direccion: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:int(undefined) */
    idDependencia: number; // int;
    /** http://a5.soap.ws.server.puc.sr/#xs:int(undefined) */
    idProvincia: number; // int;
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    localidad: string;
  }
  export interface IdomicilioFiscal {
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    codPostal: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    datoAdicional: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    descripcionProvincia: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    direccion: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:int(undefined) */
    idProvincia: number; // int;
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    localidad: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    tipoDatoAdicional: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    tipoDomicilio: string;
  }
  export interface IdatosGenerales {
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    apellido: string;
    caracterizacion: PersonaServiceInscriptionProofPortTypes.Icaracterizacion[];
    dependencia: PersonaServiceInscriptionProofPortTypes.Idependencia;
    domicilioFiscal: PersonaServiceInscriptionProofPortTypes.IdomicilioFiscal;
    esSucesion: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    estadoClave: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:dateTime(undefined) */
    fechaContratoSocial: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:dateTime(undefined) */
    fechaFallecimiento: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:long(undefined) */
    idPersona: number;
    /** http://a5.soap.ws.server.puc.sr/#xs:int(undefined) */
    mesCierre: number; // int;
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    nombre: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    razonSocial: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    tipoClave: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    tipoPersona: string;
  }
  export interface Iactividad {
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    descripcionActividad: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:long(undefined) */
    idActividad: number;
    /** http://a5.soap.ws.server.puc.sr/#xs:int(undefined) */
    nomenclador: number; // int;
    /** http://a5.soap.ws.server.puc.sr/#xs:int(undefined) */
    orden: number; // int;
    /** http://a5.soap.ws.server.puc.sr/#xs:int(undefined) */
    periodo: number; // int;
  }
  export interface IactividadMonotributista {
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    descripcionActividad: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:long(undefined) */
    idActividad: number;
    /** http://a5.soap.ws.server.puc.sr/#xs:int(undefined) */
    nomenclador: number; // int;
    /** http://a5.soap.ws.server.puc.sr/#xs:int(undefined) */
    orden: number; // int;
    /** http://a5.soap.ws.server.puc.sr/#xs:int(undefined) */
    periodo: number; // int;
  }
  export interface IcategoriaMonotributo {
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    descripcionCategoria: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:int(undefined) */
    idCategoria: number; // int;
    /** http://a5.soap.ws.server.puc.sr/#xs:int(undefined) */
    idImpuesto: number; // int;
    /** http://a5.soap.ws.server.puc.sr/#xs:int(undefined) */
    periodo: number; // int;
  }
  export interface IcomponenteDeSociedad {
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    apellidoPersonaAsociada: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:dateTime(undefined) */
    ffRelacion: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:dateTime(undefined) */
    ffVencimiento: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:long(undefined) */
    idPersonaAsociada: number;
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    nombrePersonaAsociada: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    razonSocialPersonaAsociada: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    tipoComponente: string;
  }
  export interface Iimpuesto {
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    descripcionImpuesto: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:int(undefined) */
    idImpuesto: number; // int;
    /** http://a5.soap.ws.server.puc.sr/#xs:int(undefined) */
    periodo: number; // int;
  }
  export interface IdatosMonotributo {
    actividad: PersonaServiceInscriptionProofPortTypes.Iactividad[];
    actividadMonotributista: PersonaServiceInscriptionProofPortTypes.IactividadMonotributista;
    categoriaMonotributo: PersonaServiceInscriptionProofPortTypes.IcategoriaMonotributo;
    componenteDeSociedad: PersonaServiceInscriptionProofPortTypes.IcomponenteDeSociedad[];
    impuesto: PersonaServiceInscriptionProofPortTypes.Iimpuesto[];
  }
  export interface IcategoriaAutonomo {
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    descripcionCategoria: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:int(undefined) */
    idCategoria: number; // int;
    /** http://a5.soap.ws.server.puc.sr/#xs:int(undefined) */
    idImpuesto: number; // int;
    /** http://a5.soap.ws.server.puc.sr/#xs:int(undefined) */
    periodo: number; // int;
  }
  export interface Iregimen {
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    descripcionRegimen: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:int(undefined) */
    idImpuesto: number; // int;
    /** http://a5.soap.ws.server.puc.sr/#xs:int(undefined) */
    idRegimen: number; // int;
    /** http://a5.soap.ws.server.puc.sr/#xs:int(undefined) */
    periodo: number; // int;
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    tipoRegimen: string;
  }
  export interface IdatosRegimenGeneral {
    actividad: PersonaServiceInscriptionProofPortTypes.Iactividad[];
    categoriaAutonomo: PersonaServiceInscriptionProofPortTypes.IcategoriaAutonomo;
    impuesto: PersonaServiceInscriptionProofPortTypes.Iimpuesto[];
    regimen: PersonaServiceInscriptionProofPortTypes.Iregimen[];
  }
  export interface IerrorConstancia {
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    apellido: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    error: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:long(undefined) */
    idPersona: number;
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    nombre: string;
  }
  export interface IerrorMonotributo {
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    error: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    mensaje: string;
  }
  export interface IerrorRegimenGeneral {
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    error: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    mensaje: string;
  }
  export interface Imetadata {
    /** http://a5.soap.ws.server.puc.sr/#xs:dateTime(undefined) */
    fechaHora: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    servidor: string;
  }
  export interface IpersonaReturn {
    datosGenerales: PersonaServiceInscriptionProofPortTypes.IdatosGenerales;
    datosMonotributo: PersonaServiceInscriptionProofPortTypes.IdatosMonotributo;
    datosRegimenGeneral: PersonaServiceInscriptionProofPortTypes.IdatosRegimenGeneral;
    errorConstancia: PersonaServiceInscriptionProofPortTypes.IerrorConstancia;
    errorMonotributo: PersonaServiceInscriptionProofPortTypes.IerrorMonotributo;
    errorRegimenGeneral: PersonaServiceInscriptionProofPortTypes.IerrorRegimenGeneral;
    metadata: PersonaServiceInscriptionProofPortTypes.Imetadata;
  }
  export interface Ipersona {
    datosGenerales: PersonaServiceInscriptionProofPortTypes.IdatosGenerales;
    datosMonotributo: PersonaServiceInscriptionProofPortTypes.IdatosMonotributo;
    datosRegimenGeneral: PersonaServiceInscriptionProofPortTypes.IdatosRegimenGeneral;
    errorConstancia: PersonaServiceInscriptionProofPortTypes.IerrorConstancia;
    errorMonotributo: PersonaServiceInscriptionProofPortTypes.IerrorMonotributo;
    errorRegimenGeneral: PersonaServiceInscriptionProofPortTypes.IerrorRegimenGeneral;
  }
  export interface IpersonaListReturn {
    metadata: PersonaServiceInscriptionProofPortTypes.Imetadata;
    persona: PersonaServiceInscriptionProofPortTypes.Ipersona[];
  }
  export interface Ireturn {
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    appserver: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    authserver: string;
    /** http://a5.soap.ws.server.puc.sr/#xs:string(undefined) */
    dbserver: string;
  }
}
