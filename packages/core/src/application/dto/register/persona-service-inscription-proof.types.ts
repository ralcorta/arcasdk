/**
 * SOAP DTOs generated from WSDL. Do not edit manually.
 * Regenerate: npm run generate:soap-interfaces
 */
export interface IgetPersonaInput {
    idPersona: number;
}

export interface IgetPersonaOutput {
    personaReturn: PersonaServiceA5PortTypes.IpersonaReturn;
}

export interface IgetPersonaListInput {
    idPersona: number;
}

export interface IgetPersonaListOutput {
    personaListReturn: PersonaServiceA5PortTypes.IpersonaListReturn;
}

export interface IgetPersona_v2Input {
    idPersona: number;
}

export interface IgetPersona_v2Output {
    personaReturn: PersonaServiceA5PortTypes.IpersonaReturn;
}

export interface IdummyInput {}

export interface IdummyOutput {
    return: PersonaServiceA5PortTypes.Ireturn;
}

export interface IgetPersonaList_v2Input {
    idPersona: number;
}

export interface IgetPersonaList_v2Output {
    personaListReturn: PersonaServiceA5PortTypes.IpersonaListReturn;
}


export namespace PersonaServiceA5PortTypes {
    export interface Icaracterizacion {
        descripcionCaracterizacion: string;
        idCaracterizacion: number;
        periodo: number;
    }
    export interface Idependencia {
        codPostal: string;
        descripcionDependencia: string;
        descripcionProvincia: string;
        direccion: string;
        idDependencia: number;
        idProvincia: number;
        localidad: string;
    }
    export interface IdomicilioFiscal {
        codPostal: string;
        datoAdicional: string;
        descripcionProvincia: string;
        direccion: string;
        idProvincia: number;
        localidad: string;
        tipoDatoAdicional: string;
        tipoDomicilio: string;
    }
    export interface IdatosGenerales {
        apellido: string;
        caracterizacion: PersonaServiceA5PortTypes.Icaracterizacion[];
        dependencia: PersonaServiceA5PortTypes.Idependencia;
        domicilioFiscal: PersonaServiceA5PortTypes.IdomicilioFiscal;
        esSucesion: string;
        estadoClave: string;
        fechaContratoSocial: string;
        fechaFallecimiento: string;
        idPersona: number;
        mesCierre: number;
        nombre: string;
        razonSocial: string;
        tipoClave: string;
        tipoPersona: string;
    }
    export interface Iactividad {
        descripcionActividad: string;
        idActividad: number;
        nomenclador: number;
        orden: number;
        periodo: number;
    }
    export interface IactividadMonotributista {
        descripcionActividad: string;
        idActividad: number;
        nomenclador: number;
        orden: number;
        periodo: number;
    }
    export interface IcategoriaMonotributo {
        descripcionCategoria: string;
        idCategoria: number;
        idImpuesto: number;
        periodo: number;
    }
    export interface IcomponenteDeSociedad {
        apellidoPersonaAsociada: string;
        ffRelacion: string;
        ffVencimiento: string;
        idPersonaAsociada: number;
        nombrePersonaAsociada: string;
        razonSocialPersonaAsociada: string;
        tipoComponente: string;
    }
    export interface Iimpuesto {
        descripcionImpuesto: string;
        estadoImpuesto: string;
        idImpuesto: number;
        motivo: string;
        periodo: number;
    }
    export interface IdatosMonotributo {
        actividad: PersonaServiceA5PortTypes.Iactividad[];
        actividadMonotributista: PersonaServiceA5PortTypes.IactividadMonotributista;
        categoriaMonotributo: PersonaServiceA5PortTypes.IcategoriaMonotributo;
        componenteDeSociedad: PersonaServiceA5PortTypes.IcomponenteDeSociedad[];
        impuesto: PersonaServiceA5PortTypes.Iimpuesto[];
    }
    export interface IcategoriaAutonomo {
        descripcionCategoria: string;
        idCategoria: number;
        idImpuesto: number;
        periodo: number;
    }
    export interface Iregimen {
        descripcionRegimen: string;
        idImpuesto: number;
        idRegimen: number;
        periodo: number;
        tipoRegimen: string;
    }
    export interface IdatosRegimenGeneral {
        actividad: PersonaServiceA5PortTypes.Iactividad[];
        categoriaAutonomo: PersonaServiceA5PortTypes.IcategoriaAutonomo;
        impuesto: PersonaServiceA5PortTypes.Iimpuesto[];
        regimen: PersonaServiceA5PortTypes.Iregimen[];
    }
    export interface IerrorConstancia {
        apellido: string;
        error: string;
        idPersona: number;
        nombre: string;
    }
    export interface IerrorMonotributo {
        error: string;
        mensaje: string;
    }
    export interface IerrorRegimenGeneral {
        error: string;
        mensaje: string;
    }
    export interface Imetadata {
        fechaHora: string;
        servidor: string;
    }
    export interface IpersonaReturn {
        datosGenerales: PersonaServiceA5PortTypes.IdatosGenerales;
        datosMonotributo: PersonaServiceA5PortTypes.IdatosMonotributo;
        datosRegimenGeneral: PersonaServiceA5PortTypes.IdatosRegimenGeneral;
        errorConstancia: PersonaServiceA5PortTypes.IerrorConstancia;
        errorMonotributo: PersonaServiceA5PortTypes.IerrorMonotributo;
        errorRegimenGeneral: PersonaServiceA5PortTypes.IerrorRegimenGeneral;
        metadata: PersonaServiceA5PortTypes.Imetadata;
    }
    export interface Ipersona {
        datosGenerales: PersonaServiceA5PortTypes.IdatosGenerales;
        datosMonotributo: PersonaServiceA5PortTypes.IdatosMonotributo;
        datosRegimenGeneral: PersonaServiceA5PortTypes.IdatosRegimenGeneral;
        errorConstancia: PersonaServiceA5PortTypes.IerrorConstancia;
        errorMonotributo: PersonaServiceA5PortTypes.IerrorMonotributo;
        errorRegimenGeneral: PersonaServiceA5PortTypes.IerrorRegimenGeneral;
    }
    export interface IpersonaListReturn {
        metadata: PersonaServiceA5PortTypes.Imetadata;
        persona: PersonaServiceA5PortTypes.Ipersona[];
    }
    export interface Ireturn {
        appserver: string;
        authserver: string;
        dbserver: string;
    }
}
