/**
 * SOAP DTOs generated from WSDL. Do not edit manually.
 * Regenerate: npm run generate:soap-interfaces
 */
export interface IdummyInput {}

export interface IdummyOutput {
    return: PersonaServiceA4PortTypes.Ireturn;
}

export interface IgetPersonaInput {
    idPersona: number;
}

export interface IgetPersonaOutput {
    personaReturn: PersonaServiceA4PortTypes.IpersonaReturn;
}


export namespace PersonaServiceA4PortTypes {
    export interface Ireturn {
        appserver: string;
        authserver: string;
        dbserver: string;
    }
    export interface Imetadata {
        fechaHora: string;
        servidor: string;
    }
    export interface Iactividad {
        descripcionActividad: string;
        idActividad: number;
        nomenclador: number;
        orden: number;
        periodo: number;
    }
    export interface Icategoria {
        descripcionCategoria: string;
        estado: string;
        idCategoria: number;
        idImpuesto: number;
        periodo: number;
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
        orden: number;
        tipoDatoAdicional: string;
        tipoDomicilio: string;
    }
    export interface Iemail {
        direccion: string;
        estado: string;
        tipoEmail: string;
    }
    export interface Iimpuesto {
        descripcionImpuesto: string;
        diaPeriodo: number;
        estado: string;
        ffInscripcion: string;
        idImpuesto: number;
        periodo: number;
    }
    export interface Iregimen {
        descripcionRegimen: string;
        diaPeriodo: number;
        estado: string;
        idImpuesto: number;
        idRegimen: number;
        periodo: number;
        tipoRegimen: string;
    }
    export interface Irelacion {
        ffRelacion: string;
        ffVencimiento: string;
        idPersona: number;
        idPersonaAsociada: number;
        subtipoRelacion: string;
        tipoRelacion: string;
    }
    export interface Itelefono {
        numero: number;
        tipoLinea: string;
        tipoTelefono: string;
    }
    export interface Ipersona {
        actividad: PersonaServiceA4PortTypes.Iactividad[];
        apellido: string;
        cantidadSociosEmpresaMono: number;
        categoria: PersonaServiceA4PortTypes.Icategoria[];
        claveInactivaAsociada: number;
        dependencia: PersonaServiceA4PortTypes.Idependencia;
        domicilio: PersonaServiceA4PortTypes.Idomicilio[];
        email: PersonaServiceA4PortTypes.Iemail[];
        estadoClave: string;
        fechaContratoSocial: string;
        fechaFallecimiento: string;
        fechaInscripcion: string;
        fechaJubilado: string;
        fechaNacimiento: string;
        fechaVencimientoMigracion: string;
        formaJuridica: string;
        idPersona: number;
        impuesto: PersonaServiceA4PortTypes.Iimpuesto[];
        leyJubilacion: number;
        localidadInscripcion: string;
        mesCierre: number;
        nombre: string;
        numeroDocumento: string;
        numeroInscripcion: string;
        organismoInscripcion: string;
        organismoOriginante: string;
        porcentajeCapitalNacional: number;
        provinciaInscripcion: string;
        razonSocial: string;
        regimen: PersonaServiceA4PortTypes.Iregimen[];
        relacion: PersonaServiceA4PortTypes.Irelacion[];
        sexo: string;
        telefono: PersonaServiceA4PortTypes.Itelefono[];
        tipoClave: string;
        tipoDocumento: string;
        tipoOrganismoOriginante: string;
        tipoPersona: string;
        tipoResidencia: string;
    }
    export interface IpersonaReturn {
        metadata: PersonaServiceA4PortTypes.Imetadata;
        persona: PersonaServiceA4PortTypes.Ipersona;
    }
}
