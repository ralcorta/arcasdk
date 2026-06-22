/**
 * SOAP DTOs generated from WSDL. Do not edit manually.
 * Regenerate: npm run generate:soap-interfaces
 */
export interface IdummyInput {}

export interface IdummyOutput {
    return: PersonaServiceA13PortTypes.Ireturn;
}

export interface IgetIdPersonaListByDocumentoInput {
    documento: string;
}

export interface IgetIdPersonaListByDocumentoOutput {
    idPersonaListReturn: PersonaServiceA13PortTypes.IidPersonaListReturn;
}

export interface IgetPersonaInput {
    idPersona: number;
}

export interface IgetPersonaOutput {
    personaReturn: PersonaServiceA13PortTypes.IpersonaReturn;
}


export namespace PersonaServiceA13PortTypes {
    export interface Ireturn {
        appserver: string;
        authserver: string;
        dbserver: string;
    }
    export interface Imetadata {
        fechaHora: string;
        servidor: string;
    }
    export interface IidPersonaListReturn {
        idPersona: number;
        metadata: PersonaServiceA13PortTypes.Imetadata;
    }
    export interface Idomicilio {
        calle: string;
        codigoPostal: string;
        datoAdicional: string;
        descripcionProvincia: string;
        direccion: string;
        estadoDomicilio: string;
        idProvincia: number;
        localidad: string;
        manzana: string;
        numero: number;
        oficinaDptoLocal: string;
        piso: string;
        sector: string;
        tipoDatoAdicional: string;
        tipoDomicilio: string;
        torre: string;
    }
    export interface Ipersona {
        apellido: string;
        claveInactivaAsociada: number;
        descripcionActividadPrincipal: string;
        domicilio: PersonaServiceA13PortTypes.Idomicilio[];
        estadoClave: string;
        fechaContratoSocial: string;
        fechaFallecimiento: string;
        fechaNacimiento: string;
        formaJuridica: string;
        idActividadPrincipal: number;
        idPersona: number;
        mesCierre: number;
        nombre: string;
        numeroDocumento: string;
        periodoActividadPrincipal: number;
        razonSocial: string;
        tipoClave: string;
        tipoDocumento: string;
        tipoPersona: string;
    }
    export interface IpersonaReturn {
        metadata: PersonaServiceA13PortTypes.Imetadata;
        persona: PersonaServiceA13PortTypes.Ipersona;
    }
}
