/**
 * SOAP DTOs generated from WSDL. Do not edit manually.
 * Regenerate: npm run generate:soap-interfaces
 */
export interface IComprobantesModalidadConsultarInput {
}

export interface IComprobantesModalidadConsultarOutput {
    ComprobantesModalidadConsultarResult: ServiceSoapTypes.IComprobantesModalidadConsultarResult;
}

export interface IComprobantesTipoConsultarInput {
}

export interface IComprobantesTipoConsultarOutput {
    ComprobantesTipoConsultarResult: ServiceSoapTypes.IComprobantesTipoConsultarResult;
}

export interface IDocumentosTipoConsultarInput {
}

export interface IDocumentosTipoConsultarOutput {
    DocumentosTipoConsultarResult: ServiceSoapTypes.IDocumentosTipoConsultarResult;
}

export interface IOpcionalesTipoConsultarInput {
}

export interface IOpcionalesTipoConsultarOutput {
    OpcionalesTipoConsultarResult: ServiceSoapTypes.IOpcionalesTipoConsultarResult;
}

export interface IComprobanteConstatarInput {
    CmpReq: ServiceSoapTypes.ICmpReq;
}

export interface IComprobanteConstatarOutput {
    ComprobanteConstatarResult: ServiceSoapTypes.IComprobanteConstatarResult;
}

export interface IComprobanteDummyInput {}

export interface IComprobanteDummyOutput {
    ComprobanteDummyResult: ServiceSoapTypes.IComprobanteDummyResult;
}


export namespace ServiceSoapTypes {
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
        Err: ServiceSoapTypes.IErr[];
    }
    export interface IEvt {
        Code: number;
        Msg: string;
    }
    export interface IEvents {
        Evt: ServiceSoapTypes.IEvt[];
    }
    export interface IComprobantesModalidadConsultarResult {
        ResultGet: {
            FacModTipo: ServiceSoapTypes.IFacModTipo[];
        };
        Errors: ServiceSoapTypes.IErrors;
        Events: ServiceSoapTypes.IEvents;
    }
    export interface ICbteTipo {
        Id: number;
        Desc: string;
    }
    export interface IComprobantesTipoConsultarResult {
        ResultGet: {
            CbteTipo: ServiceSoapTypes.ICbteTipo[];
        };
        Errors: ServiceSoapTypes.IErrors;
        Events: ServiceSoapTypes.IEvents;
    }
    export interface IDocTipo {
        Id: string;
        Desc: string;
    }
    export interface IDocumentosTipoConsultarResult {
        ResultGet: {
            DocTipo: ServiceSoapTypes.IDocTipo[];
        };
        Errors: ServiceSoapTypes.IErrors;
        Events: ServiceSoapTypes.IEvents;
    }
    export interface IOpcionalTipo {
        Id: string;
        Desc: string;
    }
    export interface IOpcionalesTipoConsultarResult {
        ResultGet: {
            OpcionalTipo: ServiceSoapTypes.IOpcionalTipo[];
        };
        Errors: ServiceSoapTypes.IErrors;
        Events: ServiceSoapTypes.IEvents;
    }
    export interface IOpcional {
        Id: string;
        Valor: string;
    }
    export interface IOpcionales {
        Opcional: ServiceSoapTypes.IOpcional[];
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
        Opcionales: ServiceSoapTypes.IOpcionales;
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
        Opcionales: ServiceSoapTypes.IOpcionales;
    }
    export interface IObs {
        Code: number;
        Msg: string;
    }
    export interface IObservaciones {
        Obs: ServiceSoapTypes.IObs[];
    }
    export interface IComprobanteConstatarResult {
        CmpResp: ServiceSoapTypes.ICmpResp;
        Resultado: string;
        Observaciones: ServiceSoapTypes.IObservaciones;
        FchProceso: string;
        Events: ServiceSoapTypes.IEvents;
        Errors: ServiceSoapTypes.IErrors;
    }
    export interface IComprobanteDummyResult {
        AppServer: string;
        DbServer: string;
        AuthServer: string;
    }
}
