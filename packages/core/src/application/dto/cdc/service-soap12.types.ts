/**
 * SOAP DTOs generated from WSDL. Do not edit manually.
 * Regenerate: npm run generate:soap-interfaces
 */
export interface IComprobantesModalidadConsultarInput {
}

export interface IComprobantesModalidadConsultarOutput {
    ComprobantesModalidadConsultarResult: ServiceSoap12Types.IComprobantesModalidadConsultarResult;
}

export interface IComprobantesTipoConsultarInput {
}

export interface IComprobantesTipoConsultarOutput {
    ComprobantesTipoConsultarResult: ServiceSoap12Types.IComprobantesTipoConsultarResult;
}

export interface IDocumentosTipoConsultarInput {
}

export interface IDocumentosTipoConsultarOutput {
    DocumentosTipoConsultarResult: ServiceSoap12Types.IDocumentosTipoConsultarResult;
}

export interface IOpcionalesTipoConsultarInput {
}

export interface IOpcionalesTipoConsultarOutput {
    OpcionalesTipoConsultarResult: ServiceSoap12Types.IOpcionalesTipoConsultarResult;
}

export interface IComprobanteConstatarInput {
    CmpReq: ServiceSoap12Types.ICmpReq;
}

export interface IComprobanteConstatarOutput {
    ComprobanteConstatarResult: ServiceSoap12Types.IComprobanteConstatarResult;
}

export interface IComprobanteDummyInput {}

export interface IComprobanteDummyOutput {
    ComprobanteDummyResult: ServiceSoap12Types.IComprobanteDummyResult;
}


export namespace ServiceSoap12Types {
    export interface IAuth {
        Token: string;
        Sign: string;
        Cuit: number;
    }
    export interface IFacModTipo {
        Cod: string;
        Desc: string;
        FchDesde: string;
        FchHasta: string;
    }
    export interface IErr {
        Code: number;
        Msg: string;
    }
    export interface IErrors {
        Err: ServiceSoap12Types.IErr[];
    }
    export interface IEvt {
        Code: number;
        Msg: string;
    }
    export interface IEvents {
        Evt: ServiceSoap12Types.IEvt[];
    }
    export interface IComprobantesModalidadConsultarResult {
        ResultGet: {
            FacModTipo: ServiceSoap12Types.IFacModTipo[];
        };
        Errors: ServiceSoap12Types.IErrors;
        Events: ServiceSoap12Types.IEvents;
    }
    export interface ICbteTipo {
        Id: number;
        Desc: string;
    }
    export interface IComprobantesTipoConsultarResult {
        ResultGet: {
            CbteTipo: ServiceSoap12Types.ICbteTipo[];
        };
        Errors: ServiceSoap12Types.IErrors;
        Events: ServiceSoap12Types.IEvents;
    }
    export interface IDocTipo {
        Id: string;
        Desc: string;
    }
    export interface IDocumentosTipoConsultarResult {
        ResultGet: {
            DocTipo: ServiceSoap12Types.IDocTipo[];
        };
        Errors: ServiceSoap12Types.IErrors;
        Events: ServiceSoap12Types.IEvents;
    }
    export interface IOpcionalTipo {
        Id: string;
        Desc: string;
    }
    export interface IOpcionalesTipoConsultarResult {
        ResultGet: {
            OpcionalTipo: ServiceSoap12Types.IOpcionalTipo[];
        };
        Errors: ServiceSoap12Types.IErrors;
        Events: ServiceSoap12Types.IEvents;
    }
    export interface IOpcional {
        Id: string;
        Valor: string;
    }
    export interface IOpcionales {
        Opcional: ServiceSoap12Types.IOpcional[];
    }
    export interface ICmpReq {
        CbteModo: string;
        CuitEmisor: number;
        PtoVta: number;
        CbteTipo: number;
        CbteNro: number;
        CbteFch: string;
        ImpTotal: number;
        CodAutorizacion: string;
        DocTipoReceptor: string;
        DocNroReceptor: string;
        Opcionales: ServiceSoap12Types.IOpcionales;
    }
    export interface ICmpResp {
        CbteModo: string;
        CuitEmisor: number;
        PtoVta: number;
        CbteTipo: number;
        CbteNro: number;
        CbteFch: string;
        ImpTotal: number;
        CodAutorizacion: string;
        DocTipoReceptor: string;
        DocNroReceptor: string;
        Opcionales: ServiceSoap12Types.IOpcionales;
    }
    export interface IObs {
        Code: number;
        Msg: string;
    }
    export interface IObservaciones {
        Obs: ServiceSoap12Types.IObs[];
    }
    export interface IComprobanteConstatarResult {
        CmpResp: ServiceSoap12Types.ICmpResp;
        Resultado: string;
        Observaciones: ServiceSoap12Types.IObservaciones;
        FchProceso: string;
        Events: ServiceSoap12Types.IEvents;
        Errors: ServiceSoap12Types.IErrors;
    }
    export interface IComprobanteDummyResult {
        AppServer: string;
        DbServer: string;
        AuthServer: string;
    }
}
