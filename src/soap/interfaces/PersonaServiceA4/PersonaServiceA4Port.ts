import { Client } from "soap";
import { SoapAsyncFunc } from "../../../types";
/* tslint:disable:max-line-length no-empty-interface */
export interface IdummyInput {}

export interface IdummyOutput {
  return: PersonaServiceA4PortTypes.Ireturn;
}

export interface IgetPersonaInput {
  /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
  token: string;
  /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
  sign: string;
  /** http://a4.soap.ws.server.puc.sr/#xs:long(undefined) */
  cuitRepresentada: number;
  /** http://a4.soap.ws.server.puc.sr/#xs:long(undefined) */
  idPersona: number;
}

export interface IgetPersonaOutput {
  personaReturn: PersonaServiceA4PortTypes.IpersonaReturn;
}

export interface IPersonaServiceA4PortSoap extends Client {
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
}

export namespace PersonaServiceA4PortTypes {
  export interface Ireturn {
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    appserver: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    authserver: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    dbserver: string;
  }
  export interface Imetadata {
    /** http://a4.soap.ws.server.puc.sr/#xs:dateTime(undefined) */
    fechaHora: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    servidor: string;
  }
  export interface Iactividad {
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    descripcionActividad: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:long(undefined) */
    idActividad: number;
    /** http://a4.soap.ws.server.puc.sr/#xs:int(undefined) */
    nomenclador: number; // int;
    /** http://a4.soap.ws.server.puc.sr/#xs:int(undefined) */
    orden: number; // int;
    /** http://a4.soap.ws.server.puc.sr/#xs:int(undefined) */
    periodo: number; // int;
  }
  export interface Icategoria {
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    descripcionCategoria: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    estado: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:int(undefined) */
    idCategoria: number; // int;
    /** http://a4.soap.ws.server.puc.sr/#xs:int(undefined) */
    idImpuesto: number; // int;
    /** http://a4.soap.ws.server.puc.sr/#xs:int(undefined) */
    periodo: number; // int;
  }
  export interface Idependencia {
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    descripcionDependencia: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:int(undefined) */
    idDependencia: number; // int;
  }
  export interface Idomicilio {
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    codPostal: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    datoAdicional: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    descripcionProvincia: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    direccion: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:int(undefined) */
    idProvincia: number; // int;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    localidad: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    tipoDatoAdicional: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    tipoDomicilio: string;
  }
  export interface Iemail {
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    direccion: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    estado: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    tipoEmail: string;
  }
  export interface Iimpuesto {
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    descripcionImpuesto: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:int(undefined) */
    diaPeriodo: number; // int;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    estado: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:dateTime(undefined) */
    ffInscripcion: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:int(undefined) */
    idImpuesto: number; // int;
    /** http://a4.soap.ws.server.puc.sr/#xs:int(undefined) */
    periodo: number; // int;
  }
  export interface Iregimen {
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    descripcionRegimen: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:int(undefined) */
    diaPeriodo: number; // int;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    estado: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:int(undefined) */
    idImpuesto: number; // int;
    /** http://a4.soap.ws.server.puc.sr/#xs:int(undefined) */
    idRegimen: number; // int;
    /** http://a4.soap.ws.server.puc.sr/#xs:int(undefined) */
    periodo: number; // int;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    tipoRegimen: string;
  }
  export interface Irelacion {
    /** http://a4.soap.ws.server.puc.sr/#xs:dateTime(undefined) */
    ffRelacion: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:dateTime(undefined) */
    ffVencimiento: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:long(undefined) */
    idPersona: number;
    /** http://a4.soap.ws.server.puc.sr/#xs:long(undefined) */
    idPersonaAsociada: number;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    subtipoRelacion: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    tipoRelacion: string;
  }
  export interface Itelefono {
    /** http://a4.soap.ws.server.puc.sr/#xs:long(undefined) */
    numero: number;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    tipoLinea: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    tipoTelefono: string;
  }
  export interface Ipersona {
    actividad: PersonaServiceA4PortTypes.Iactividad[];
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    apellido: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:int(undefined) */
    cantidadSociosEmpresaMono: number; // int;
    categoria: PersonaServiceA4PortTypes.Icategoria[];
    /** http://a4.soap.ws.server.puc.sr/#xs:long(undefined) */
    claveInactivaAsociada: number;
    dependencia: PersonaServiceA4PortTypes.Idependencia;
    domicilio: PersonaServiceA4PortTypes.Idomicilio[];
    email: PersonaServiceA4PortTypes.Iemail[];
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    estadoClave: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:dateTime(undefined) */
    fechaContratoSocial: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:dateTime(undefined) */
    fechaFallecimiento: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:dateTime(undefined) */
    fechaInscripcion: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:dateTime(undefined) */
    fechaJubilado: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:dateTime(undefined) */
    fechaNacimiento: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:dateTime(undefined) */
    fechaVencimientoMigracion: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    formaJuridica: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:long(undefined) */
    idPersona: number;
    impuesto: PersonaServiceA4PortTypes.Iimpuesto[];
    /** http://a4.soap.ws.server.puc.sr/#xs:int(undefined) */
    leyJubilacion: number; // int;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    localidadInscripcion: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:int(undefined) */
    mesCierre: number; // int;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    nombre: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    numeroDocumento: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:long(undefined) */
    numeroInscripcion: number;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    organismoInscripcion: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    organismoOriginante: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:double(undefined) */
    porcentajeCapitalNacional: number;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    provinciaInscripcion: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    razonSocial: string;
    regimen: PersonaServiceA4PortTypes.Iregimen[];
    relacion: PersonaServiceA4PortTypes.Irelacion[];
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    sexo: string;
    telefono: PersonaServiceA4PortTypes.Itelefono[];
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    tipoClave: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    tipoDocumento: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    tipoOrganismoOriginante: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    tipoPersona: string;
    /** http://a4.soap.ws.server.puc.sr/#xs:string(undefined) */
    tipoResidencia: string;
  }
  export interface IpersonaReturn {
    metadata: PersonaServiceA4PortTypes.Imetadata;
    persona: PersonaServiceA4PortTypes.Ipersona;
  }
}
