/**
 * SOAP DTOs generated from WSDL. Do not edit manually.
 * Regenerate: npm run generate:soap-interfaces
 */
export interface IFECAESolicitarInput {
    FeCAEReq: ServiceSoapTypes.IFeCAEReq;
}

export interface IFECAESolicitarOutput {
    FECAESolicitarResult: ServiceSoapTypes.IFECAESolicitarResult;
}

export interface IFECompTotXRequestInput {
}

export interface IFECompTotXRequestOutput {
    FECompTotXRequestResult: ServiceSoapTypes.IFECompTotXRequestResult;
}

export interface IFEDummyInput {}

export interface IFEDummyOutput {
    FEDummyResult: ServiceSoapTypes.IFEDummyResult;
}

export interface IFECompUltimoAutorizadoInput {
    PtoVta: number;
    CbteTipo: number;
}

export interface IFECompUltimoAutorizadoOutput {
    FECompUltimoAutorizadoResult: ServiceSoapTypes.IFECompUltimoAutorizadoResult;
}

export interface IFECompConsultarInput {
    FeCompConsReq: ServiceSoapTypes.IFeCompConsReq;
}

export interface IFECompConsultarOutput {
    FECompConsultarResult: ServiceSoapTypes.IFECompConsultarResult;
}

export interface IFECAEARegInformativoInput {
    FeCAEARegInfReq: ServiceSoapTypes.IFeCAEARegInfReq;
}

export interface IFECAEARegInformativoOutput {
    FECAEARegInformativoResult: ServiceSoapTypes.IFECAEARegInformativoResult;
}

export interface IFECAEASolicitarInput {
    Periodo: number;
    Orden: number;
}

export interface IFECAEASolicitarOutput {
    FECAEASolicitarResult: ServiceSoapTypes.IFECAEASolicitarResult;
}

export interface IFECAEASinMovimientoConsultarInput {
    CAEA: string;
    PtoVta: number;
}

export interface IFECAEASinMovimientoConsultarOutput {
    FECAEASinMovimientoConsultarResult: ServiceSoapTypes.IFECAEASinMovimientoConsultarResult;
}

export interface IFECAEASinMovimientoInformarInput {
    PtoVta: number;
    CAEA: string;
}

export interface IFECAEASinMovimientoInformarOutput {
    FECAEASinMovimientoInformarResult: ServiceSoapTypes.IFECAEASinMovimientoInformarResult;
}

export interface IFECAEAConsultarInput {
    Periodo: number;
    Orden: number;
}

export interface IFECAEAConsultarOutput {
    FECAEAConsultarResult: ServiceSoapTypes.IFECAEAConsultarResult;
}

export interface IFEParamGetCotizacionInput {
    MonId: string;
    FchCotiz: string;
}

export interface IFEParamGetCotizacionOutput {
    FEParamGetCotizacionResult: ServiceSoapTypes.IFEParamGetCotizacionResult;
}

export interface IFEParamGetTiposTributosInput {
}

export interface IFEParamGetTiposTributosOutput {
    FEParamGetTiposTributosResult: ServiceSoapTypes.IFEParamGetTiposTributosResult;
}

export interface IFEParamGetTiposMonedasInput {
}

export interface IFEParamGetTiposMonedasOutput {
    FEParamGetTiposMonedasResult: ServiceSoapTypes.IFEParamGetTiposMonedasResult;
}

export interface IFEParamGetTiposIvaInput {
}

export interface IFEParamGetTiposIvaOutput {
    FEParamGetTiposIvaResult: ServiceSoapTypes.IFEParamGetTiposIvaResult;
}

export interface IFEParamGetTiposOpcionalInput {
}

export interface IFEParamGetTiposOpcionalOutput {
    FEParamGetTiposOpcionalResult: ServiceSoapTypes.IFEParamGetTiposOpcionalResult;
}

export interface IFEParamGetTiposConceptoInput {
}

export interface IFEParamGetTiposConceptoOutput {
    FEParamGetTiposConceptoResult: ServiceSoapTypes.IFEParamGetTiposConceptoResult;
}

export interface IFEParamGetPtosVentaInput {
}

export interface IFEParamGetPtosVentaOutput {
    FEParamGetPtosVentaResult: ServiceSoapTypes.IFEParamGetPtosVentaResult;
}

export interface IFEParamGetTiposCbteInput {
}

export interface IFEParamGetTiposCbteOutput {
    FEParamGetTiposCbteResult: ServiceSoapTypes.IFEParamGetTiposCbteResult;
}

export interface IFEParamGetCondicionIvaReceptorInput {
    ClaseCmp: string;
}

export interface IFEParamGetCondicionIvaReceptorOutput {
    FEParamGetCondicionIvaReceptorResult: ServiceSoapTypes.IFEParamGetCondicionIvaReceptorResult;
}

export interface IFEParamGetTiposDocInput {
}

export interface IFEParamGetTiposDocOutput {
    FEParamGetTiposDocResult: ServiceSoapTypes.IFEParamGetTiposDocResult;
}

export interface IFEParamGetTiposPaisesInput {
}

export interface IFEParamGetTiposPaisesOutput {
    FEParamGetTiposPaisesResult: ServiceSoapTypes.IFEParamGetTiposPaisesResult;
}

export interface IFEParamGetActividadesInput {
}

export interface IFEParamGetActividadesOutput {
    FEParamGetActividadesResult: ServiceSoapTypes.IFEParamGetActividadesResult;
}


export namespace ServiceSoapTypes {
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
        CbteAsoc: ServiceSoapTypes.ICbteAsoc[];
    }
    export interface ITributo {
        Id: number;
        Desc: string;
        BaseImp: number;
        Alic: number;
        Importe: number;
    }
    export interface ITributos {
        Tributo: ServiceSoapTypes.ITributo[];
    }
    export interface IAlicIva {
        Id: number;
        BaseImp: number;
        Importe: number;
    }
    export interface IIva {
        AlicIva: ServiceSoapTypes.IAlicIva[];
    }
    export interface IOpcional {
        Id: string;
        Valor: string;
    }
    export interface IOpcionales {
        Opcional: ServiceSoapTypes.IOpcional[];
    }
    export interface IComprador {
        DocTipo: number;
        DocNro: number;
        Porcentaje: number;
    }
    export interface ICompradores {
        Comprador: ServiceSoapTypes.IComprador[];
    }
    export interface IPeriodoAsoc {
        FchDesde: string;
        FchHasta: string;
    }
    export interface IActividad {
        Id: number;
    }
    export interface IActividades {
        Actividad: ServiceSoapTypes.IActividad[];
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
        CbtesAsoc: ServiceSoapTypes.ICbtesAsoc;
        Tributos: ServiceSoapTypes.ITributos;
        Iva: ServiceSoapTypes.IIva;
        Opcionales: ServiceSoapTypes.IOpcionales;
        Compradores: ServiceSoapTypes.ICompradores;
        PeriodoAsoc: ServiceSoapTypes.IPeriodoAsoc;
        Actividades: ServiceSoapTypes.IActividades;
    }
    export interface IFeCAEReq {
        FeCabReq: ServiceSoapTypes.IFeCabReq;
        FeDetReq: {
            FECAEDetRequest: ServiceSoapTypes.IFECAEDetRequest[];
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
        Obs: ServiceSoapTypes.IObs[];
    }
    export interface IFECAEDetResponse {
        Concepto: number;
        DocTipo: number;
        DocNro: number;
        CbteDesde: number;
        CbteHasta: number;
        CbteFch: string;
        Resultado: string;
        Observaciones: ServiceSoapTypes.IObservaciones;
        CAE: string;
        CAEFchVto: string;
    }
    export interface IEvt {
        Code: number;
        Msg: string;
    }
    export interface IEvents {
        Evt: ServiceSoapTypes.IEvt[];
    }
    export interface IErr {
        Code: number;
        Msg: string;
    }
    export interface IErrors {
        Err: ServiceSoapTypes.IErr[];
    }
    export interface IFECAESolicitarResult {
        FeCabResp: ServiceSoapTypes.IFeCabResp;
        FeDetResp: {
            FECAEDetResponse: ServiceSoapTypes.IFECAEDetResponse[];
        };
        Events: ServiceSoapTypes.IEvents;
        Errors: ServiceSoapTypes.IErrors;
    }
    export interface IFECompTotXRequestResult {
        RegXReq: number;
        Errors: ServiceSoapTypes.IErrors;
        Events: ServiceSoapTypes.IEvents;
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
        Errors: ServiceSoapTypes.IErrors;
        Events: ServiceSoapTypes.IEvents;
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
            CbtesAsoc: ServiceSoapTypes.ICbtesAsoc;
            Tributos: ServiceSoapTypes.ITributos;
            Iva: ServiceSoapTypes.IIva;
            Opcionales: ServiceSoapTypes.IOpcionales;
            Compradores: ServiceSoapTypes.ICompradores;
            PeriodoAsoc: ServiceSoapTypes.IPeriodoAsoc;
            Actividades: ServiceSoapTypes.IActividades;
            Resultado: string;
            CodAutorizacion: string;
            EmisionTipo: string;
            FchVto: string;
            FchProceso: string;
            Observaciones: ServiceSoapTypes.IObservaciones;
            PtoVta: number;
            CbteTipo: number;
        };
        Errors: ServiceSoapTypes.IErrors;
        Events: ServiceSoapTypes.IEvents;
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
        CbtesAsoc: ServiceSoapTypes.ICbtesAsoc;
        Tributos: ServiceSoapTypes.ITributos;
        Iva: ServiceSoapTypes.IIva;
        Opcionales: ServiceSoapTypes.IOpcionales;
        Compradores: ServiceSoapTypes.ICompradores;
        PeriodoAsoc: ServiceSoapTypes.IPeriodoAsoc;
        Actividades: ServiceSoapTypes.IActividades;
        CAEA: string;
        CbteFchHsGen: string;
    }
    export interface IFeCAEARegInfReq {
        FeCabReq: ServiceSoapTypes.IFeCabReq;
        FeDetReq: {
            FECAEADetRequest: ServiceSoapTypes.IFECAEADetRequest[];
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
        Observaciones: ServiceSoapTypes.IObservaciones;
        CAEA: string;
    }
    export interface IFECAEARegInformativoResult {
        FeCabResp: ServiceSoapTypes.IFeCabResp;
        FeDetResp: {
            FECAEADetResponse: ServiceSoapTypes.IFECAEADetResponse[];
        };
        Events: ServiceSoapTypes.IEvents;
        Errors: ServiceSoapTypes.IErrors;
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
            Observaciones: ServiceSoapTypes.IObservaciones;
        };
        Errors: ServiceSoapTypes.IErrors;
        Events: ServiceSoapTypes.IEvents;
    }
    export interface IFECAEASinMov {
        CAEA: string;
        FchProceso: string;
        PtoVta: number;
    }
    export interface IFECAEASinMovimientoConsultarResult {
        ResultGet: {
            FECAEASinMov: ServiceSoapTypes.IFECAEASinMov[];
        };
        Errors: ServiceSoapTypes.IErrors;
        Events: ServiceSoapTypes.IEvents;
    }
    export interface IFECAEASinMovimientoInformarResult {
        CAEA: string;
        FchProceso: string;
        PtoVta: number;
        Resultado: string;
        Errors: ServiceSoapTypes.IErrors;
        Events: ServiceSoapTypes.IEvents;
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
            Observaciones: ServiceSoapTypes.IObservaciones;
        };
        Errors: ServiceSoapTypes.IErrors;
        Events: ServiceSoapTypes.IEvents;
    }
    export interface IFEParamGetCotizacionResult {
        ResultGet: {
            MonId: string;
            MonCotiz: number;
            FchCotiz: string;
        };
        Errors: ServiceSoapTypes.IErrors;
        Events: ServiceSoapTypes.IEvents;
    }
    export interface ITributoTipo {
        Id: number;
        Desc: string;
        FchDesde: string;
        FchHasta: string;
    }
    export interface IFEParamGetTiposTributosResult {
        ResultGet: {
            TributoTipo: ServiceSoapTypes.ITributoTipo[];
        };
        Errors: ServiceSoapTypes.IErrors;
        Events: ServiceSoapTypes.IEvents;
    }
    export interface IMoneda {
        Id: string;
        Desc: string;
        FchDesde: string;
        FchHasta: string;
    }
    export interface IFEParamGetTiposMonedasResult {
        ResultGet: {
            Moneda: ServiceSoapTypes.IMoneda[];
        };
        Errors: ServiceSoapTypes.IErrors;
        Events: ServiceSoapTypes.IEvents;
    }
    export interface IIvaTipo {
        Id: string;
        Desc: string;
        FchDesde: string;
        FchHasta: string;
    }
    export interface IFEParamGetTiposIvaResult {
        ResultGet: {
            IvaTipo: ServiceSoapTypes.IIvaTipo[];
        };
        Errors: ServiceSoapTypes.IErrors;
        Events: ServiceSoapTypes.IEvents;
    }
    export interface IOpcionalTipo {
        Id: string;
        Desc: string;
        FchDesde: string;
        FchHasta: string;
    }
    export interface IFEParamGetTiposOpcionalResult {
        ResultGet: {
            OpcionalTipo: ServiceSoapTypes.IOpcionalTipo[];
        };
        Errors: ServiceSoapTypes.IErrors;
        Events: ServiceSoapTypes.IEvents;
    }
    export interface IConceptoTipo {
        Id: number;
        Desc: string;
        FchDesde: string;
        FchHasta: string;
    }
    export interface IFEParamGetTiposConceptoResult {
        ResultGet: {
            ConceptoTipo: ServiceSoapTypes.IConceptoTipo[];
        };
        Errors: ServiceSoapTypes.IErrors;
        Events: ServiceSoapTypes.IEvents;
    }
    export interface IPtoVenta {
        Nro: number;
        EmisionTipo: string;
        Bloqueado: string;
        FchBaja: string;
    }
    export interface IFEParamGetPtosVentaResult {
        ResultGet: {
            PtoVenta: ServiceSoapTypes.IPtoVenta[];
        };
        Errors: ServiceSoapTypes.IErrors;
        Events: ServiceSoapTypes.IEvents;
    }
    export interface ICbteTipo {
        Id: number;
        Desc: string;
        FchDesde: string;
        FchHasta: string;
    }
    export interface IFEParamGetTiposCbteResult {
        ResultGet: {
            CbteTipo: ServiceSoapTypes.ICbteTipo[];
        };
        Errors: ServiceSoapTypes.IErrors;
        Events: ServiceSoapTypes.IEvents;
    }
    export interface ICondicionIvaReceptor {
        Id: number;
        Desc: string;
        Cmp_Clase: string;
    }
    export interface IFEParamGetCondicionIvaReceptorResult {
        ResultGet: {
            CondicionIvaReceptor: ServiceSoapTypes.ICondicionIvaReceptor[];
        };
        Errors: ServiceSoapTypes.IErrors;
        Events: ServiceSoapTypes.IEvents;
    }
    export interface IDocTipo {
        Id: number;
        Desc: string;
        FchDesde: string;
        FchHasta: string;
    }
    export interface IFEParamGetTiposDocResult {
        ResultGet: {
            DocTipo: ServiceSoapTypes.IDocTipo[];
        };
        Errors: ServiceSoapTypes.IErrors;
        Events: ServiceSoapTypes.IEvents;
    }
    export interface IPaisTipo {
        Id: number;
        Desc: string;
    }
    export interface IFEParamGetTiposPaisesResult {
        ResultGet: {
            PaisTipo: ServiceSoapTypes.IPaisTipo[];
        };
        Errors: ServiceSoapTypes.IErrors;
        Events: ServiceSoapTypes.IEvents;
    }
    export interface IActividadesTipo {
        Id: number;
        Orden: number;
        Desc: string;
    }
    export interface IFEParamGetActividadesResult {
        ResultGet: {
            ActividadesTipo: ServiceSoapTypes.IActividadesTipo[];
        };
        Errors: ServiceSoapTypes.IErrors;
        Events: ServiceSoapTypes.IEvents;
    }
}
