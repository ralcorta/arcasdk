/**
 * SOAP DTOs generated from WSDL. Do not edit manually.
 * Regenerate: npm run generate:soap-interfaces
 */
export interface IgetPersonaInput {
    idPersona: number;
}

export interface IgetPersonaOutput {
    personaReturn: PersonaServiceA10PortTypes.IpersonaReturn;
}

export interface IdummyInput {}

export interface IdummyOutput {
    return: PersonaServiceA10PortTypes.Ireturn;
}


export namespace PersonaServiceA10PortTypes {
    export interface Imetadata {
        fechaHora: string;
        servidor: string;
    }
    export interface Idependencia {
        descripcionDependencia: string;
        idDependencia: number;
    }
    export interface Idomicilio {
        codPostal: string;
        datoAdicional: string;
        descripcionProvincia: string;
        direccion: string;
        idProvincia: number;
        localidad: string;
        tipoDatoAdicional: string;
        tipoDomicilio: string;
    }
    export interface Ipersona {
        apellido: string;
        claveInactivaAsociada: number;
        dependencia: PersonaServiceA10PortTypes.Idependencia;
        descripcionActividadPrincipal: string;
        domicilio: PersonaServiceA10PortTypes.Idomicilio[];
        estadoClave: string;
        idActividadPrincipal: number;
        idPersona: number;
        nombre: string;
        numeroDocumento: string;
        razonSocial: string;
        tipoClave: string;
        tipoDocumento: string;
        tipoPersona: string;
    }
    export interface IpersonaReturn {
        metadata: PersonaServiceA10PortTypes.Imetadata;
        persona: PersonaServiceA10PortTypes.Ipersona;
    }
    export interface Ireturn {
        appserver: string;
        authserver: string;
        dbserver: string;
    }
}
