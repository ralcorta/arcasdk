/**
 * SOAP DTOs generated from WSDL. Do not edit manually.
 * Regenerate: npm run generate:soap-interfaces
 */
export interface IFECAESolicitarInput {
    FeCAEReq: ServiceSoap12Types.IFeCAEReq;
}

export interface IFECAESolicitarOutput {
    FECAESolicitarResult: ServiceSoap12Types.IFECAESolicitarResult;
}

export interface IFECompTotXRequestInput {
}

export interface IFECompTotXRequestOutput {
    FECompTotXRequestResult: ServiceSoap12Types.IFECompTotXRequestResult;
}

export interface IFEDummyInput {}

export interface IFEDummyOutput {
    FEDummyResult: ServiceSoap12Types.IFEDummyResult;
}

export interface IFECompUltimoAutorizadoInput {
    PtoVta: number;
    CbteTipo: number;
}

export interface IFECompUltimoAutorizadoOutput {
    FECompUltimoAutorizadoResult: ServiceSoap12Types.IFECompUltimoAutorizadoResult;
}

export interface IFECompConsultarInput {
    FeCompConsReq: ServiceSoap12Types.IFeCompConsReq;
}

export interface IFECompConsultarOutput {
    FECompConsultarResult: ServiceSoap12Types.IFECompConsultarResult;
}

export interface IFECAEARegInformativoInput {
    FeCAEARegInfReq: ServiceSoap12Types.IFeCAEARegInfReq;
}

export interface IFECAEARegInformativoOutput {
    FECAEARegInformativoResult: ServiceSoap12Types.IFECAEARegInformativoResult;
}

export interface IFECAEASolicitarInput {
    Periodo: number;
    Orden: number;
}

export interface IFECAEASolicitarOutput {
    FECAEASolicitarResult: ServiceSoap12Types.IFECAEASolicitarResult;
}

export interface IFECAEASinMovimientoConsultarInput {
    CAEA: string;
    PtoVta: number;
}

export interface IFECAEASinMovimientoConsultarOutput {
    FECAEASinMovimientoConsultarResult: ServiceSoap12Types.IFECAEASinMovimientoConsultarResult;
}

export interface IFECAEASinMovimientoInformarInput {
    PtoVta: number;
    CAEA: string;
}

export interface IFECAEASinMovimientoInformarOutput {
    FECAEASinMovimientoInformarResult: ServiceSoap12Types.IFECAEASinMovimientoInformarResult;
}

export interface IFECAEAConsultarInput {
    Periodo: number;
    Orden: number;
}

export interface IFECAEAConsultarOutput {
    FECAEAConsultarResult: ServiceSoap12Types.IFECAEAConsultarResult;
}

export interface IFEParamGetCotizacionInput {
    MonId: string;
    FchCotiz: string;
}

export interface IFEParamGetCotizacionOutput {
    FEParamGetCotizacionResult: ServiceSoap12Types.IFEParamGetCotizacionResult;
}

export interface IFEParamGetTiposTributosInput {
}

export interface IFEParamGetTiposTributosOutput {
    FEParamGetTiposTributosResult: ServiceSoap12Types.IFEParamGetTiposTributosResult;
}

export interface IFEParamGetTiposMonedasInput {
}

export interface IFEParamGetTiposMonedasOutput {
    FEParamGetTiposMonedasResult: ServiceSoap12Types.IFEParamGetTiposMonedasResult;
}

export interface IFEParamGetTiposIvaInput {
}

export interface IFEParamGetTiposIvaOutput {
    FEParamGetTiposIvaResult: ServiceSoap12Types.IFEParamGetTiposIvaResult;
}

export interface IFEParamGetTiposOpcionalInput {
}

export interface IFEParamGetTiposOpcionalOutput {
    FEParamGetTiposOpcionalResult: ServiceSoap12Types.IFEParamGetTiposOpcionalResult;
}

export interface IFEParamGetTiposConceptoInput {
}

export interface IFEParamGetTiposConceptoOutput {
    FEParamGetTiposConceptoResult: ServiceSoap12Types.IFEParamGetTiposConceptoResult;
}

export interface IFEParamGetPtosVentaInput {
}

export interface IFEParamGetPtosVentaOutput {
    FEParamGetPtosVentaResult: ServiceSoap12Types.IFEParamGetPtosVentaResult;
}

export interface IFEParamGetTiposCbteInput {
}

export interface IFEParamGetTiposCbteOutput {
    FEParamGetTiposCbteResult: ServiceSoap12Types.IFEParamGetTiposCbteResult;
}

export interface IFEParamGetCondicionIvaReceptorInput {
    ClaseCmp: string;
}

export interface IFEParamGetCondicionIvaReceptorOutput {
    FEParamGetCondicionIvaReceptorResult: ServiceSoap12Types.IFEParamGetCondicionIvaReceptorResult;
}

export interface IFEParamGetTiposDocInput {
}

export interface IFEParamGetTiposDocOutput {
    FEParamGetTiposDocResult: ServiceSoap12Types.IFEParamGetTiposDocResult;
}

export interface IFEParamGetTiposPaisesInput {
}

export interface IFEParamGetTiposPaisesOutput {
    FEParamGetTiposPaisesResult: ServiceSoap12Types.IFEParamGetTiposPaisesResult;
}

export interface IFEParamGetActividadesInput {
}

export interface IFEParamGetActividadesOutput {
    FEParamGetActividadesResult: ServiceSoap12Types.IFEParamGetActividadesResult;
}


export namespace ServiceSoap12Types {
    export interface IAuth {
        Token: string;
        Sign: string;
        Cuit: number;
    }
    export interface IFeCabReq {
        CantReg: number;
        PtoVta: number;
        CbteTipo: number;
    }
    export interface ICbteAsoc {
        Tipo: number;
        PtoVta: number;
        Nro: number;
        Cuit: string;
        CbteFch: string;
    }
    export interface ICbtesAsoc {
        CbteAsoc: ServiceSoap12Types.ICbteAsoc[];
    }
    export interface ITributo {
        Id: number;
        Desc: string;
        BaseImp: number;
        Alic: number;
        Importe: number;
    }
    export interface ITributos {
        Tributo: ServiceSoap12Types.ITributo[];
    }
    export interface IAlicIva {
        Id: number;
        BaseImp: number;
        Importe: number;
    }
    export interface IIva {
        AlicIva: ServiceSoap12Types.IAlicIva[];
    }
    export interface IOpcional {
        Id: string;
        Valor: string;
    }
    export interface IOpcionales {
        Opcional: ServiceSoap12Types.IOpcional[];
    }
    export interface IComprador {
        DocTipo: number;
        DocNro: number;
        Porcentaje: number;
    }
    export interface ICompradores {
        Comprador: ServiceSoap12Types.IComprador[];
    }
    export interface IPeriodoAsoc {
        FchDesde: string;
        FchHasta: string;
    }
    export interface IActividad {
        Id: number;
    }
    export interface IActividades {
        Actividad: ServiceSoap12Types.IActividad[];
    }
    export interface IFECAEDetRequest {
        Concepto: number;
        DocTipo: number;
        DocNro: number;
        CbteDesde: number;
        CbteHasta: number;
        CbteFch: string;
        ImpTotal: number;
        ImpTotConc: number;
        ImpNeto: number;
        ImpOpEx: number;
        ImpTrib: number;
        ImpIVA: number;
        FchServDesde: string;
        FchServHasta: string;
        FchVtoPago: string;
        MonId: string;
        MonCotiz: number;
        CanMisMonExt: string;
        CondicionIVAReceptorId: number;
        CbtesAsoc: ServiceSoap12Types.ICbtesAsoc;
        Tributos: ServiceSoap12Types.ITributos;
        Iva: ServiceSoap12Types.IIva;
        Opcionales: ServiceSoap12Types.IOpcionales;
        Compradores: ServiceSoap12Types.ICompradores;
        PeriodoAsoc: ServiceSoap12Types.IPeriodoAsoc;
        Actividades: ServiceSoap12Types.IActividades;
    }
    export interface IFeCAEReq {
        FeCabReq: ServiceSoap12Types.IFeCabReq;
        FeDetReq: {
            FECAEDetRequest: ServiceSoap12Types.IFECAEDetRequest[];
        };
    }
    export interface IFeCabResp {
        Cuit: number;
        PtoVta: number;
        CbteTipo: number;
        FchProceso: string;
        CantReg: number;
        Resultado: string;
        Reproceso: string;
    }
    export interface IObs {
        Code: number;
        Msg: string;
    }
    export interface IObservaciones {
        Obs: ServiceSoap12Types.IObs[];
    }
    export interface IFECAEDetResponse {
        Concepto: number;
        DocTipo: number;
        DocNro: number;
        CbteDesde: number;
        CbteHasta: number;
        CbteFch: string;
        Resultado: string;
        Observaciones: ServiceSoap12Types.IObservaciones;
        CAE: string;
        CAEFchVto: string;
    }
    export interface IEvt {
        Code: number;
        Msg: string;
    }
    export interface IEvents {
        Evt: ServiceSoap12Types.IEvt[];
    }
    export interface IErr {
        Code: number;
        Msg: string;
    }
    export interface IErrors {
        Err: ServiceSoap12Types.IErr[];
    }
    export interface IFECAESolicitarResult {
        FeCabResp: ServiceSoap12Types.IFeCabResp;
        FeDetResp: {
            FECAEDetResponse: ServiceSoap12Types.IFECAEDetResponse[];
        };
        Events: ServiceSoap12Types.IEvents;
        Errors: ServiceSoap12Types.IErrors;
    }
    export interface IFECompTotXRequestResult {
        RegXReq: number;
        Errors: ServiceSoap12Types.IErrors;
        Events: ServiceSoap12Types.IEvents;
    }
    export interface IFEDummyResult {
        AppServer: string;
        DbServer: string;
        AuthServer: string;
    }
    export interface IFECompUltimoAutorizadoResult {
        PtoVta: number;
        CbteTipo: number;
        CbteNro: number;
        Errors: ServiceSoap12Types.IErrors;
        Events: ServiceSoap12Types.IEvents;
    }
    export interface IFeCompConsReq {
        CbteTipo: number;
        CbteNro: number;
        PtoVta: number;
    }
    export interface IFECompConsultarResult {
        ResultGet: {
            Concepto: number;
            DocTipo: number;
            DocNro: number;
            CbteDesde: number;
            CbteHasta: number;
            CbteFch: string;
            ImpTotal: number;
            ImpTotConc: number;
            ImpNeto: number;
            ImpOpEx: number;
            ImpTrib: number;
            ImpIVA: number;
            FchServDesde: string;
            FchServHasta: string;
            FchVtoPago: string;
            MonId: string;
            MonCotiz: number;
            CanMisMonExt: string;
            CondicionIVAReceptorId: number;
            CbtesAsoc: ServiceSoap12Types.ICbtesAsoc;
            Tributos: ServiceSoap12Types.ITributos;
            Iva: ServiceSoap12Types.IIva;
            Opcionales: ServiceSoap12Types.IOpcionales;
            Compradores: ServiceSoap12Types.ICompradores;
            PeriodoAsoc: ServiceSoap12Types.IPeriodoAsoc;
            Actividades: ServiceSoap12Types.IActividades;
            Resultado: string;
            CodAutorizacion: string;
            EmisionTipo: string;
            FchVto: string;
            FchProceso: string;
            Observaciones: ServiceSoap12Types.IObservaciones;
            PtoVta: number;
            CbteTipo: number;
        };
        Errors: ServiceSoap12Types.IErrors;
        Events: ServiceSoap12Types.IEvents;
    }
    export interface IFECAEADetRequest {
        Concepto: number;
        DocTipo: number;
        DocNro: number;
        CbteDesde: number;
        CbteHasta: number;
        CbteFch: string;
        ImpTotal: number;
        ImpTotConc: number;
        ImpNeto: number;
        ImpOpEx: number;
        ImpTrib: number;
        ImpIVA: number;
        FchServDesde: string;
        FchServHasta: string;
        FchVtoPago: string;
        MonId: string;
        MonCotiz: number;
        CanMisMonExt: string;
        CondicionIVAReceptorId: number;
        CbtesAsoc: ServiceSoap12Types.ICbtesAsoc;
        Tributos: ServiceSoap12Types.ITributos;
        Iva: ServiceSoap12Types.IIva;
        Opcionales: ServiceSoap12Types.IOpcionales;
        Compradores: ServiceSoap12Types.ICompradores;
        PeriodoAsoc: ServiceSoap12Types.IPeriodoAsoc;
        Actividades: ServiceSoap12Types.IActividades;
        CAEA: string;
        CbteFchHsGen: string;
    }
    export interface IFeCAEARegInfReq {
        FeCabReq: ServiceSoap12Types.IFeCabReq;
        FeDetReq: {
            FECAEADetRequest: ServiceSoap12Types.IFECAEADetRequest[];
        };
    }
    export interface IFECAEADetResponse {
        Concepto: number;
        DocTipo: number;
        DocNro: number;
        CbteDesde: number;
        CbteHasta: number;
        CbteFch: string;
        Resultado: string;
        Observaciones: ServiceSoap12Types.IObservaciones;
        CAEA: string;
    }
    export interface IFECAEARegInformativoResult {
        FeCabResp: ServiceSoap12Types.IFeCabResp;
        FeDetResp: {
            FECAEADetResponse: ServiceSoap12Types.IFECAEADetResponse[];
        };
        Events: ServiceSoap12Types.IEvents;
        Errors: ServiceSoap12Types.IErrors;
    }
    export interface IFECAEASolicitarResult {
        ResultGet: {
            CAEA: string;
            Periodo: number;
            Orden: number;
            FchVigDesde: string;
            FchVigHasta: string;
            FchTopeInf: string;
            FchProceso: string;
            Observaciones: ServiceSoap12Types.IObservaciones;
        };
        Errors: ServiceSoap12Types.IErrors;
        Events: ServiceSoap12Types.IEvents;
    }
    export interface IFECAEASinMov {
        CAEA: string;
        FchProceso: string;
        PtoVta: number;
    }
    export interface IFECAEASinMovimientoConsultarResult {
        ResultGet: {
            FECAEASinMov: ServiceSoap12Types.IFECAEASinMov[];
        };
        Errors: ServiceSoap12Types.IErrors;
        Events: ServiceSoap12Types.IEvents;
    }
    export interface IFECAEASinMovimientoInformarResult {
        CAEA: string;
        FchProceso: string;
        PtoVta: number;
        Resultado: string;
        Errors: ServiceSoap12Types.IErrors;
        Events: ServiceSoap12Types.IEvents;
    }
    export interface IFECAEAConsultarResult {
        ResultGet: {
            CAEA: string;
            Periodo: number;
            Orden: number;
            FchVigDesde: string;
            FchVigHasta: string;
            FchTopeInf: string;
            FchProceso: string;
            Observaciones: ServiceSoap12Types.IObservaciones;
        };
        Errors: ServiceSoap12Types.IErrors;
        Events: ServiceSoap12Types.IEvents;
    }
    export interface IFEParamGetCotizacionResult {
        ResultGet: {
            MonId: string;
            MonCotiz: number;
            FchCotiz: string;
        };
        Errors: ServiceSoap12Types.IErrors;
        Events: ServiceSoap12Types.IEvents;
    }
    export interface ITributoTipo {
        Id: number;
        Desc: string;
        FchDesde: string;
        FchHasta: string;
    }
    export interface IFEParamGetTiposTributosResult {
        ResultGet: {
            TributoTipo: ServiceSoap12Types.ITributoTipo[];
        };
        Errors: ServiceSoap12Types.IErrors;
        Events: ServiceSoap12Types.IEvents;
    }
    export interface IMoneda {
        Id: string;
        Desc: string;
        FchDesde: string;
        FchHasta: string;
    }
    export interface IFEParamGetTiposMonedasResult {
        ResultGet: {
            Moneda: ServiceSoap12Types.IMoneda[];
        };
        Errors: ServiceSoap12Types.IErrors;
        Events: ServiceSoap12Types.IEvents;
    }
    export interface IIvaTipo {
        Id: string;
        Desc: string;
        FchDesde: string;
        FchHasta: string;
    }
    export interface IFEParamGetTiposIvaResult {
        ResultGet: {
            IvaTipo: ServiceSoap12Types.IIvaTipo[];
        };
        Errors: ServiceSoap12Types.IErrors;
        Events: ServiceSoap12Types.IEvents;
    }
    export interface IOpcionalTipo {
        Id: string;
        Desc: string;
        FchDesde: string;
        FchHasta: string;
    }
    export interface IFEParamGetTiposOpcionalResult {
        ResultGet: {
            OpcionalTipo: ServiceSoap12Types.IOpcionalTipo[];
        };
        Errors: ServiceSoap12Types.IErrors;
        Events: ServiceSoap12Types.IEvents;
    }
    export interface IConceptoTipo {
        Id: number;
        Desc: string;
        FchDesde: string;
        FchHasta: string;
    }
    export interface IFEParamGetTiposConceptoResult {
        ResultGet: {
            ConceptoTipo: ServiceSoap12Types.IConceptoTipo[];
        };
        Errors: ServiceSoap12Types.IErrors;
        Events: ServiceSoap12Types.IEvents;
    }
    export interface IPtoVenta {
        Nro: number;
        EmisionTipo: string;
        Bloqueado: string;
        FchBaja: string;
    }
    export interface IFEParamGetPtosVentaResult {
        ResultGet: {
            PtoVenta: ServiceSoap12Types.IPtoVenta[];
        };
        Errors: ServiceSoap12Types.IErrors;
        Events: ServiceSoap12Types.IEvents;
    }
    export interface ICbteTipo {
        Id: number;
        Desc: string;
        FchDesde: string;
        FchHasta: string;
    }
    export interface IFEParamGetTiposCbteResult {
        ResultGet: {
            CbteTipo: ServiceSoap12Types.ICbteTipo[];
        };
        Errors: ServiceSoap12Types.IErrors;
        Events: ServiceSoap12Types.IEvents;
    }
    export interface ICondicionIvaReceptor {
        Id: number;
        Desc: string;
        Cmp_Clase: string;
    }
    export interface IFEParamGetCondicionIvaReceptorResult {
        ResultGet: {
            CondicionIvaReceptor: ServiceSoap12Types.ICondicionIvaReceptor[];
        };
        Errors: ServiceSoap12Types.IErrors;
        Events: ServiceSoap12Types.IEvents;
    }
    export interface IDocTipo {
        Id: number;
        Desc: string;
        FchDesde: string;
        FchHasta: string;
    }
    export interface IFEParamGetTiposDocResult {
        ResultGet: {
            DocTipo: ServiceSoap12Types.IDocTipo[];
        };
        Errors: ServiceSoap12Types.IErrors;
        Events: ServiceSoap12Types.IEvents;
    }
    export interface IPaisTipo {
        Id: number;
        Desc: string;
    }
    export interface IFEParamGetTiposPaisesResult {
        ResultGet: {
            PaisTipo: ServiceSoap12Types.IPaisTipo[];
        };
        Errors: ServiceSoap12Types.IErrors;
        Events: ServiceSoap12Types.IEvents;
    }
    export interface IActividadesTipo {
        Id: number;
        Orden: number;
        Desc: string;
    }
    export interface IFEParamGetActividadesResult {
        ResultGet: {
            ActividadesTipo: ServiceSoap12Types.IActividadesTipo[];
        };
        Errors: ServiceSoap12Types.IErrors;
        Events: ServiceSoap12Types.IEvents;
    }
}
