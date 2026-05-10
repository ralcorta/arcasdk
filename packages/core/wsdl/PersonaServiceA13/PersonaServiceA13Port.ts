/* tslint:disable:max-line-length no-empty-interface */
export interface IdummyInput {}

export interface IdummyOutput {
    return: PersonaServiceA13PortTypes.Ireturn;
}

export interface IgetIdPersonaListByDocumentoInput {
    /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
    token: string;
    /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
    sign: string;
    /** http://a13.soap.ws.server.puc.sr/#xs:long(undefined) */
    cuitRepresentada: long;
    /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
    documento: string;
}

export interface IgetIdPersonaListByDocumentoOutput {
    idPersonaListReturn: PersonaServiceA13PortTypes.IidPersonaListReturn;
}

export interface IgetPersonaInput {
    /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
    token: string;
    /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
    sign: string;
    /** http://a13.soap.ws.server.puc.sr/#xs:long(undefined) */
    cuitRepresentada: long;
    /** http://a13.soap.ws.server.puc.sr/#xs:long(undefined) */
    idPersona: long;
}

export interface IgetPersonaOutput {
    personaReturn: PersonaServiceA13PortTypes.IpersonaReturn;
}

export interface IPersonaServiceA13PortSoap {
    dummy: (input: IdummyInput, cb: (err: any | null, result: IdummyOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    getIdPersonaListByDocumento: (input: IgetIdPersonaListByDocumentoInput, cb: (err: any | null, result: IgetIdPersonaListByDocumentoOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    getPersona: (input: IgetPersonaInput, cb: (err: any | null, result: IgetPersonaOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
}

export namespace PersonaServiceA13PortTypes {
    export interface Ireturn {
        /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
        appserver: string;
        /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
        authserver: string;
        /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
        dbserver: string;
    }
    export interface Imetadata {
        /** http://a13.soap.ws.server.puc.sr/#xs:dateTime(undefined) */
        fechaHora: dateTime;
        /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
        servidor: string;
    }
    export interface IidPersonaListReturn {
        /** http://a13.soap.ws.server.puc.sr/#xs:long(undefined) */
        idPersona: long>;
        metadata: PersonaServiceA13PortTypes.Imetadata;
    }
    export interface Idomicilio {
        /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
        calle: string;
        /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
        codigoPostal: string;
        /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
        datoAdicional: string;
        /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
        descripcionProvincia: string;
        /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
        direccion: string;
        /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
        estadoDomicilio: string;
        /** http://a13.soap.ws.server.puc.sr/#xs:int(undefined) */
        idProvincia: int;
        /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
        localidad: string;
        /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
        manzana: string;
        /** http://a13.soap.ws.server.puc.sr/#xs:int(undefined) */
        numero: int;
        /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
        oficinaDptoLocal: string;
        /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
        piso: string;
        /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
        sector: string;
        /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
        tipoDatoAdicional: string;
        /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
        tipoDomicilio: string;
        /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
        torre: string;
    }
    export interface Ipersona {
        /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
        apellido: string;
        /** http://a13.soap.ws.server.puc.sr/#xs:long(undefined) */
        claveInactivaAsociada: long>;
        /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
        descripcionActividadPrincipal: string;
        domicilio: PersonaServiceA13PortTypes.Idomicilio[];
        /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
        estadoClave: string;
        /** http://a13.soap.ws.server.puc.sr/#xs:dateTime(undefined) */
        fechaContratoSocial: dateTime;
        /** http://a13.soap.ws.server.puc.sr/#xs:dateTime(undefined) */
        fechaFallecimiento: dateTime;
        /** http://a13.soap.ws.server.puc.sr/#xs:dateTime(undefined) */
        fechaNacimiento: dateTime;
        /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
        formaJuridica: string;
        /** http://a13.soap.ws.server.puc.sr/#xs:long(undefined) */
        idActividadPrincipal: long;
        /** http://a13.soap.ws.server.puc.sr/#xs:long(undefined) */
        idPersona: long;
        /** http://a13.soap.ws.server.puc.sr/#xs:int(undefined) */
        mesCierre: int;
        /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
        nombre: string;
        /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
        numeroDocumento: string;
        /** http://a13.soap.ws.server.puc.sr/#xs:int(undefined) */
        periodoActividadPrincipal: int;
        /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
        razonSocial: string;
        /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
        tipoClave: string;
        /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
        tipoDocumento: string;
        /** http://a13.soap.ws.server.puc.sr/#xs:string(undefined) */
        tipoPersona: string;
    }
    export interface IpersonaReturn {
        metadata: PersonaServiceA13PortTypes.Imetadata;
        persona: PersonaServiceA13PortTypes.Ipersona;
    }
}
