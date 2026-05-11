import { Client } from "soap";
export interface IdummyInput {}

export interface IdummyOutput {
    dummyReturn: FECredServiceSOAPTypes.IdummyReturn;
}

export interface IconsultarComprobantesInput {
    /** http://ar.gob.afip.wsfecred/FECredService/#RolSimpleType(Emisor,Receptor) */
    rolCUITRepresentada: "Emisor" | "Receptor";
    /** http://ar.gob.afip.wsfecred/FECredService/#CuitSimpleType(minExclusive,maxInclusive) */
    CUITContraparte: "minExclusive" | "maxInclusive";
    /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
    codTipoCmp: number;
    /** http://ar.gob.afip.wsfecred/FECredService/#EstadoCmpSimpleType(PendienteRecepcion,Recepcionado,Aceptado,Rechazado,InformadaAgDpto) */
    estadoCmp: "PendienteRecepcion" | "Recepcionado" | "Aceptado" | "Rechazado" | "InformadaAgDpto";
    fecha: FECredServiceSOAPTypes.Ifecha;
    /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
    codCtaCte: number;
    /** http://ar.gob.afip.wsfecred/FECredService/#EstadoCtaCteSimpleType(Modificable,Aceptada,Rechazada,CanceladaTotal,InformadaAgDpto) */
    estadoCtaCte: "Modificable" | "Aceptada" | "Rechazada" | "CanceladaTotal" | "InformadaAgDpto";
    /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
    nroPagina: number;
}

export interface IconsultarComprobantesOutput {
    consultarCmpReturn: FECredServiceSOAPTypes.IconsultarCmpReturn;
}

export interface IrechazarNotaDCInput {
    idComprobante: FECredServiceSOAPTypes.IidComprobante;
    arrayMotivosRechazo: FECredServiceSOAPTypes.IarrayMotivosRechazo;
}

export interface IrechazarNotaDCOutput {
    rechazarNotaDCReturn: FECredServiceSOAPTypes.IrechazarNotaDCReturn;
}

export interface IconsultarCtasCtesInput {
    /** http://ar.gob.afip.wsfecred/FECredService/#RolSimpleType(Emisor,Receptor) */
    rolCUITRepresentada: "Emisor" | "Receptor";
    /** http://ar.gob.afip.wsfecred/FECredService/#CuitSimpleType(minExclusive,maxInclusive) */
    CUITContraparte: "minExclusive" | "maxInclusive";
    fecha: FECredServiceSOAPTypes.Ifecha;
    /** http://ar.gob.afip.wsfecred/FECredService/#EstadoCtaCteSimpleType(Modificable,Aceptada,Rechazada,CanceladaTotal,InformadaAgDpto) */
    estadoCtaCte: "Modificable" | "Aceptada" | "Rechazada" | "CanceladaTotal" | "InformadaAgDpto";
    /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
    nroPagina: number;
    /** http://ar.gob.afip.wsfecred/FECredService/#OpcionTransferenciaSimpleType(SCA,ADC) */
    opcionTransferencia: "SCA" | "ADC";
}

export interface IconsultarCtasCtesOutput {
    consultarCtasCtesReturn: FECredServiceSOAPTypes.IconsultarCtasCtesReturn;
}

export interface IconsultarCtaCteInput {
    idCtaCte: FECredServiceSOAPTypes.IidCtaCte;
}

export interface IconsultarCtaCteOutput {
    consultarCtaCteReturn: FECredServiceSOAPTypes.IconsultarCtaCteReturn;
}

export interface IinformarCancelacionTotalFECredInput {
    idCtaCte: FECredServiceSOAPTypes.IidCtaCte;
    arrayFormasCancelacion: FECredServiceSOAPTypes.IarrayFormasCancelacion;
    /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
    importeCancelacion: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
}

export interface IinformarCancelacionTotalFECredOutput {
    operacionFECredReturn: FECredServiceSOAPTypes.IoperacionFECredReturn;
}

export interface IaceptarFECredInput {
    idCtaCte: FECredServiceSOAPTypes.IidCtaCte;
    arrayConfirmarNotasDC: FECredServiceSOAPTypes.IarrayConfirmarNotasDC;
    arrayFormasCancelacion: FECredServiceSOAPTypes.IarrayFormasCancelacion;
    arrayRetenciones: FECredServiceSOAPTypes.IarrayRetenciones;
    arrayAjustesOperacion: FECredServiceSOAPTypes.IarrayAjustesOperacion;
    /** http://ar.gob.afip.wsfecred/FECredService/#TipoCancelacionSimpleType(PAR,TOT) */
    tipoCancelacion: "PAR" | "TOT";
    /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
    importeCancelado: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
    /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
    importeTotalRetPesos: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
    /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
    importeEmbargoPesos: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
    /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
    saldoAceptado: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
    /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
    codMoneda: string;
    /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
    cotizacionMonedaUlt: number;
    /** http://ar.gob.afip.wsfecred/FECredService/#SiNoSimpleType(length,S,N) */
    informaCBU: "S" | "N";
    /** http://ar.gob.afip.wsfecred/FECredService/#CBUSimpleType(length) */
    CBUComprador: string;
}

export interface IaceptarFECredOutput {
    operacionFECredReturn: FECredServiceSOAPTypes.IoperacionFECredReturn;
}

export interface IrechazarFECredInput {
    idCtaCte: FECredServiceSOAPTypes.IidCtaCte;
    arrayMotivosRechazo: FECredServiceSOAPTypes.IarrayMotivosRechazo;
}

export interface IrechazarFECredOutput {
    operacionFECredReturn: FECredServiceSOAPTypes.IoperacionFECredReturn;
}

export interface IinformarFacturaAgtDptoCltvInput {
    idCtaCte: FECredServiceSOAPTypes.IidCtaCte;
    ctaAgente: FECredServiceSOAPTypes.IctaAgente;
}

export interface IinformarFacturaAgtDptoCltvOutput {
    operacionFECredReturn: FECredServiceSOAPTypes.IoperacionFECredReturn;
}

export interface IconsultarFacturasAgtDptoCltvInput {
    idCtaCte: FECredServiceSOAPTypes.IidCtaCte;
    filtroFecha: FECredServiceSOAPTypes.IfiltroFecha;
}

export interface IconsultarFacturasAgtDptoCltvOutput {
    consultarFacturasAgtDptoCltvReturn: FECredServiceSOAPTypes.IconsultarFacturasAgtDptoCltvReturn;
}

export interface IconsultarCuentasEnAgtDptoCltvInput {
}

export interface IconsultarCuentasEnAgtDptoCltvOutput {
    consultarCuentasEnAgtDptoCltvReturn: FECredServiceSOAPTypes.IconsultarCuentasEnAgtDptoCltvReturn;
}

export interface IconsultarObligadoRecepcionInput {
    /** http://ar.gob.afip.wsfecred/FECredService/#CuitSimpleType(minExclusive,maxInclusive) */
    cuitConsultada: "minExclusive" | "maxInclusive";
}

export interface IconsultarObligadoRecepcionOutput {
    consultarObligadoRecepcionReturn: FECredServiceSOAPTypes.IconsultarObligadoRecepcionReturn;
}

export interface IconsultarTiposRetencionesInput {
}

export interface IconsultarTiposRetencionesOutput {
    consultarTiposRetencionesReturn: FECredServiceSOAPTypes.IconsultarTiposRetencionesReturn;
}

export interface IconsultarTiposMotivosRechazoInput {
}

export interface IconsultarTiposMotivosRechazoOutput {
    codigoDescripcionReturn: FECredServiceSOAPTypes.IcodigoDescripcionReturn;
}

export interface IconsultarTiposFormasCancelacionInput {
}

export interface IconsultarTiposFormasCancelacionOutput {
    codigoDescripcionReturn: FECredServiceSOAPTypes.IcodigoDescripcionReturn;
}

export interface IobtenerRemitosInput {
    idComprobante: FECredServiceSOAPTypes.IidComprobante;
}

export interface IobtenerRemitosOutput {
    obtenerRemitosReturn: FECredServiceSOAPTypes.IobtenerRemitosReturn;
}

export interface IconsultarHistorialEstadosComprobanteInput {
    idComprobante: FECredServiceSOAPTypes.IidComprobante;
}

export interface IconsultarHistorialEstadosComprobanteOutput {
    consultarHistorialEstadosComprobanteReturn: FECredServiceSOAPTypes.IconsultarHistorialEstadosComprobanteReturn;
}

export interface IconsultarHistorialEstadosCtaCteInput {
    idCtaCte: FECredServiceSOAPTypes.IidCtaCte;
}

export interface IconsultarHistorialEstadosCtaCteOutput {
    consultarHistorialEstadosCtaCteReturn: FECredServiceSOAPTypes.IconsultarHistorialEstadosCtaCteReturn;
}

export interface IconsultarTiposAjustesOperacionInput {
}

export interface IconsultarTiposAjustesOperacionOutput {
    codigoDescripcionReturn: FECredServiceSOAPTypes.IcodigoDescripcionReturn;
}

export interface IconsultarMontoObligadoRecepcionInput {
    /** http://ar.gob.afip.wsfecred/FECredService/#CuitSimpleType(minExclusive,maxInclusive) */
    cuitConsultada: "minExclusive" | "maxInclusive";
    /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
    fechaEmision: string;
}

export interface IconsultarMontoObligadoRecepcionOutput {
    consultarMontoObligadoRecepcionReturn: FECredServiceSOAPTypes.IconsultarMontoObligadoRecepcionReturn;
}

export interface ImodificarOpcionTransferenciaInput {
    idCtaCte: FECredServiceSOAPTypes.IidCtaCte;
    /** http://ar.gob.afip.wsfecred/FECredService/#OpcionTransferenciaSimpleType(SCA,ADC) */
    opcionTransferencia: "SCA" | "ADC";
}

export interface ImodificarOpcionTransferenciaOutput {
    operacionFECredReturn: FECredServiceSOAPTypes.IoperacionFECredReturn;
}

export interface IFECredServiceSOAPSoap extends Client {
    dummy: (input: IdummyInput, cb: (err: any | null, result: IdummyOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    consultarComprobantes: (input: IconsultarComprobantesInput, cb: (err: any | null, result: IconsultarComprobantesOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    rechazarNotaDC: (input: IrechazarNotaDCInput, cb: (err: any | null, result: IrechazarNotaDCOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    consultarCtasCtes: (input: IconsultarCtasCtesInput, cb: (err: any | null, result: IconsultarCtasCtesOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    consultarCtaCte: (input: IconsultarCtaCteInput, cb: (err: any | null, result: IconsultarCtaCteOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    informarCancelacionTotalFECred: (input: IinformarCancelacionTotalFECredInput, cb: (err: any | null, result: IinformarCancelacionTotalFECredOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    aceptarFECred: (input: IaceptarFECredInput, cb: (err: any | null, result: IaceptarFECredOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    rechazarFECred: (input: IrechazarFECredInput, cb: (err: any | null, result: IrechazarFECredOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    informarFacturaAgtDptoCltv: (input: IinformarFacturaAgtDptoCltvInput, cb: (err: any | null, result: IinformarFacturaAgtDptoCltvOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    consultarFacturasAgtDptoCltv: (input: IconsultarFacturasAgtDptoCltvInput, cb: (err: any | null, result: IconsultarFacturasAgtDptoCltvOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    consultarCuentasEnAgtDptoCltv: (input: IconsultarCuentasEnAgtDptoCltvInput, cb: (err: any | null, result: IconsultarCuentasEnAgtDptoCltvOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    consultarObligadoRecepcion: (input: IconsultarObligadoRecepcionInput, cb: (err: any | null, result: IconsultarObligadoRecepcionOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    consultarTiposRetenciones: (input: IconsultarTiposRetencionesInput, cb: (err: any | null, result: IconsultarTiposRetencionesOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    consultarTiposMotivosRechazo: (input: IconsultarTiposMotivosRechazoInput, cb: (err: any | null, result: IconsultarTiposMotivosRechazoOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    consultarTiposFormasCancelacion: (input: IconsultarTiposFormasCancelacionInput, cb: (err: any | null, result: IconsultarTiposFormasCancelacionOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    obtenerRemitos: (input: IobtenerRemitosInput, cb: (err: any | null, result: IobtenerRemitosOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    consultarHistorialEstadosComprobante: (input: IconsultarHistorialEstadosComprobanteInput, cb: (err: any | null, result: IconsultarHistorialEstadosComprobanteOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    consultarHistorialEstadosCtaCte: (input: IconsultarHistorialEstadosCtaCteInput, cb: (err: any | null, result: IconsultarHistorialEstadosCtaCteOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    consultarTiposAjustesOperacion: (input: IconsultarTiposAjustesOperacionInput, cb: (err: any | null, result: IconsultarTiposAjustesOperacionOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    consultarMontoObligadoRecepcion: (input: IconsultarMontoObligadoRecepcionInput, cb: (err: any | null, result: IconsultarMontoObligadoRecepcionOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    modificarOpcionTransferencia: (input: ImodificarOpcionTransferenciaInput, cb: (err: any | null, result: ImodificarOpcionTransferenciaOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;

    dummyAsync: (input: IdummyInput) => Promise<[IdummyOutput, string, {[k: string]: any}, any]>;
    consultarComprobantesAsync: (input: IconsultarComprobantesInput) => Promise<[IconsultarComprobantesOutput, string, {[k: string]: any}, any]>;
    rechazarNotaDCAsync: (input: IrechazarNotaDCInput) => Promise<[IrechazarNotaDCOutput, string, {[k: string]: any}, any]>;
    consultarCtasCtesAsync: (input: IconsultarCtasCtesInput) => Promise<[IconsultarCtasCtesOutput, string, {[k: string]: any}, any]>;
    consultarCtaCteAsync: (input: IconsultarCtaCteInput) => Promise<[IconsultarCtaCteOutput, string, {[k: string]: any}, any]>;
    informarCancelacionTotalFECredAsync: (input: IinformarCancelacionTotalFECredInput) => Promise<[IinformarCancelacionTotalFECredOutput, string, {[k: string]: any}, any]>;
    aceptarFECredAsync: (input: IaceptarFECredInput) => Promise<[IaceptarFECredOutput, string, {[k: string]: any}, any]>;
    rechazarFECredAsync: (input: IrechazarFECredInput) => Promise<[IrechazarFECredOutput, string, {[k: string]: any}, any]>;
    informarFacturaAgtDptoCltvAsync: (input: IinformarFacturaAgtDptoCltvInput) => Promise<[IinformarFacturaAgtDptoCltvOutput, string, {[k: string]: any}, any]>;
    consultarFacturasAgtDptoCltvAsync: (input: IconsultarFacturasAgtDptoCltvInput) => Promise<[IconsultarFacturasAgtDptoCltvOutput, string, {[k: string]: any}, any]>;
    consultarCuentasEnAgtDptoCltvAsync: (input: IconsultarCuentasEnAgtDptoCltvInput) => Promise<[IconsultarCuentasEnAgtDptoCltvOutput, string, {[k: string]: any}, any]>;
    consultarObligadoRecepcionAsync: (input: IconsultarObligadoRecepcionInput) => Promise<[IconsultarObligadoRecepcionOutput, string, {[k: string]: any}, any]>;
    consultarTiposRetencionesAsync: (input: IconsultarTiposRetencionesInput) => Promise<[IconsultarTiposRetencionesOutput, string, {[k: string]: any}, any]>;
    consultarTiposMotivosRechazoAsync: (input: IconsultarTiposMotivosRechazoInput) => Promise<[IconsultarTiposMotivosRechazoOutput, string, {[k: string]: any}, any]>;
    consultarTiposFormasCancelacionAsync: (input: IconsultarTiposFormasCancelacionInput) => Promise<[IconsultarTiposFormasCancelacionOutput, string, {[k: string]: any}, any]>;
    obtenerRemitosAsync: (input: IobtenerRemitosInput) => Promise<[IobtenerRemitosOutput, string, {[k: string]: any}, any]>;
    consultarHistorialEstadosComprobanteAsync: (input: IconsultarHistorialEstadosComprobanteInput) => Promise<[IconsultarHistorialEstadosComprobanteOutput, string, {[k: string]: any}, any]>;
    consultarHistorialEstadosCtaCteAsync: (input: IconsultarHistorialEstadosCtaCteInput) => Promise<[IconsultarHistorialEstadosCtaCteOutput, string, {[k: string]: any}, any]>;
    consultarTiposAjustesOperacionAsync: (input: IconsultarTiposAjustesOperacionInput) => Promise<[IconsultarTiposAjustesOperacionOutput, string, {[k: string]: any}, any]>;
    consultarMontoObligadoRecepcionAsync: (input: IconsultarMontoObligadoRecepcionInput) => Promise<[IconsultarMontoObligadoRecepcionOutput, string, {[k: string]: any}, any]>;
    modificarOpcionTransferenciaAsync: (input: ImodificarOpcionTransferenciaInput) => Promise<[ImodificarOpcionTransferenciaOutput, string, {[k: string]: any}, any]>;
}

export namespace FECredServiceSOAPTypes {
    export interface IdummyReturn {
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        appserver: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        authserver: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        dbserver: string;
    }
    export interface IauthRequest {
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        token: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        sign: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#CuitSimpleType(minExclusive,maxInclusive) */
        cuitRepresentada: "minExclusive" | "maxInclusive";
    }
    export interface Ifecha {
        /** http://ar.gob.afip.wsfecred/FECredService/#TipoFechaSimpleType(Emision,PuestaDispo,VenPago,VenAcep,Acep,InfoAgDptoCltv) */
        tipo: "Emision" | "PuestaDispo" | "VenPago" | "VenAcep" | "Acep" | "InfoAgDptoCltv";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
        desde: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
        hasta: string;
    }
    export interface IidComprobanteAsociado {
        /** http://ar.gob.afip.wsfecred/FECredService/#CuitSimpleType(minExclusive,maxInclusive) */
        CUITEmisor: "minExclusive" | "maxInclusive";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codTipoCmp: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#PuntoVentaSimpleType(minInclusive,maxInclusive) */
        ptoVta: "minInclusive" | "maxInclusive";
        /** http://ar.gob.afip.wsfecred/FECredService/#NumeroComprobanteSimpleType(minInclusive,maxInclusive) */
        nroCmp: "minInclusive" | "maxInclusive";
    }
    export interface IreferenciasComerciales {
        /** http://ar.gob.afip.wsfecred/FECredService/#Texto250SimpleType(minLength,maxLength) */
        texto: string;
    }
    export interface IsubtotalIVA {
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codigo: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
        baseImponible: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
        importe: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
    }
    export interface IarraySubtotalesIVA {
        subtotalIVA: FECredServiceSOAPTypes.IsubtotalIVA[];
    }
    export interface IotroTributo {
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codigo: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#Texto250SimpleType(minLength,maxLength) */
        detalle: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
        baseImponible: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
        importe: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
    }
    export interface IarrayOtrosTributos {
        otroTributo: FECredServiceSOAPTypes.IotroTributo[];
    }
    export interface Iitem {
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        orden: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        unidadesMtx: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        codigoMtx: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        codigo: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        descripcion: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        codNomMercosur: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#DecimalSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
        cantidad: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codigoUnidadMedida: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
        precioUnitario: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
        importeBonificacion: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codigoCondicionIVA: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
        importeIVA: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
        importeItem: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
    }
    export interface IarrayItems {
        item: FECredServiceSOAPTypes.Iitem[];
    }
    export interface Iestado {
        /** http://ar.gob.afip.wsfecred/FECredService/#EstadoCmpSimpleType(PendienteRecepcion,Recepcionado,Aceptado,Rechazado,InformadaAgDpto) */
        estado: "PendienteRecepcion" | "Recepcionado" | "Aceptado" | "Rechazado" | "InformadaAgDpto";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
        fechaHoraEstado: string;
    }
    export interface ImotivoRechazo {
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codMotivo: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#Texto250SimpleType(minLength,maxLength) */
        descMotivo: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#Texto250SimpleType(minLength,maxLength) */
        justificacion: string;
    }
    export interface IarrayMotivosRechazo {
        motivoRechazo: FECredServiceSOAPTypes.ImotivoRechazo[];
    }
    export interface IctaAgente {
        /** http://ar.gob.afip.wsfecred/FECredService/#CuitSimpleType(minExclusive,maxInclusive) */
        cuitAgente: "minExclusive" | "maxInclusive";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        razonSocialAgente: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#IdCuentaAgenteSimpleType(minLength,maxLength) */
        idCuenta: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#Texto250SimpleType(minLength,maxLength) */
        denominacion: string;
    }
    export interface IinfoAgtDptoCltv {
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
        fechaInfo: string;
        ctaAgente: FECredServiceSOAPTypes.IctaAgente;
        /** http://ar.gob.afip.wsfecred/FECredService/#SiNoSimpleType(length,S,N) */
        recibida: "S" | "N";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
        fechaLectura: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
        fechaRecep: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#SiNoSimpleType(length,S,N) */
        aceptada: "S" | "N";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        motivoRechazo: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        idPagoAgtDptoCltv: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#CBUSimpleType(length) */
        CBUAgtDptoCltv: string;
    }
    export interface IinfoSCA {
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
        fechaAceptacionFactura: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#SiNoSimpleType(length,S,N) */
        informaCBUReceptor: "S" | "N";
        /** http://ar.gob.afip.wsfecred/FECredService/#CBUSimpleType(length) */
        CBUReceptor: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#SiNoSimpleType(length,S,N) */
        CBUValidada: "S" | "N";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
        fechaLecturaSCA: string;
    }
    export interface IinfoTransferencia {
        infoAgtDptoCltv: FECredServiceSOAPTypes.IinfoAgtDptoCltv;
        infoSCA: FECredServiceSOAPTypes.IinfoSCA;
    }
    export interface Icomprobante {
        /** http://ar.gob.afip.wsfecred/FECredService/#CuitSimpleType(minExclusive,maxInclusive) */
        cuitEmisor: "minExclusive" | "maxInclusive";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        razonSocialEmi: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codTipoCmp: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#PuntoVentaSimpleType(minInclusive,maxInclusive) */
        ptovta: "minInclusive" | "maxInclusive";
        /** http://ar.gob.afip.wsfecred/FECredService/#NumeroComprobanteSimpleType(minInclusive,maxInclusive) */
        nroCmp: "minInclusive" | "maxInclusive";
        /** http://ar.gob.afip.wsfecred/FECredService/#CuitSimpleType(minExclusive,maxInclusive) */
        cuitReceptor: "minExclusive" | "maxInclusive";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        razonSocialRecep: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#TipoCodAutorizacionType(A,E) */
        tipoCodAuto: "A" | "E";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codAutorizacion: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
        fechaEmision: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
        fechaPuestaDispo: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
        fechaVenPago: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
        fechaVenAcep: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
        importeTotal: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        codMoneda: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        cotizacionMoneda: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#CBUSimpleType(length) */
        CBUEmisor: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#Texto250SimpleType(minLength,maxLength) */
        AliasEmisor: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#SiNoSimpleType(length,S,N) */
        esAnulacion: "S" | "N";
        /** http://ar.gob.afip.wsfecred/FECredService/#SiNoSimpleType(length,S,N) */
        esPostAceptacion: "S" | "N";
        idComprobanteAsociado: FECredServiceSOAPTypes.IidComprobanteAsociado;
        referenciasComerciales: FECredServiceSOAPTypes.IreferenciasComerciales;
        arraySubtotalesIVA: FECredServiceSOAPTypes.IarraySubtotalesIVA;
        arrayOtrosTributos: FECredServiceSOAPTypes.IarrayOtrosTributos;
        arrayItems: FECredServiceSOAPTypes.IarrayItems;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        datosGenerales: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        datosComerciales: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#Texto250SimpleType(minLength,maxLength) */
        leyendaComercial: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codCtaCte: number;
        estado: FECredServiceSOAPTypes.Iestado;
        /** http://ar.gob.afip.wsfecred/FECredService/#TipoAceptacionSimpleType(Tacita,Expresa) */
        tipoAcep: "Tacita" | "Expresa";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
        fechaHoraAcep: string;
        arrayMotivosRechazo: FECredServiceSOAPTypes.IarrayMotivosRechazo;
        /** http://ar.gob.afip.wsfecred/FECredService/#OpcionTransferenciaSimpleType(SCA,ADC) */
        opcionTransferencia: "SCA" | "ADC";
        infoTransferencia: FECredServiceSOAPTypes.IinfoTransferencia;
    }
    export interface IarrayComprobantes {
        comprobante: FECredServiceSOAPTypes.Icomprobante[];
    }
    export interface Ievento {
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codigo: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        descripcion: string;
    }
    export interface IcodigoDescripcion {
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codigo: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        descripcion: string;
    }
    export interface IarrayObservaciones {
        codigoDescripcion: FECredServiceSOAPTypes.IcodigoDescripcion[];
    }
    export interface IarrayErrores {
        codigoDescripcion: FECredServiceSOAPTypes.IcodigoDescripcion[];
    }
    export interface IcodigoDescripcionString {
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        codigo: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        descripcion: string;
    }
    export interface IarrayErroresFormato {
        codigoDescripcionString: FECredServiceSOAPTypes.IcodigoDescripcionString[];
    }
    export interface IconsultarCmpReturn {
        arrayComprobantes: FECredServiceSOAPTypes.IarrayComprobantes;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        nroPagina: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#SiNoSimpleType(length,S,N) */
        hayMas: "S" | "N";
        evento: FECredServiceSOAPTypes.Ievento;
        arrayObservaciones: FECredServiceSOAPTypes.IarrayObservaciones;
        arrayErrores: FECredServiceSOAPTypes.IarrayErrores;
        arrayErroresFormato: FECredServiceSOAPTypes.IarrayErroresFormato;
    }
    export interface IidComprobante {
        /** http://ar.gob.afip.wsfecred/FECredService/#CuitSimpleType(minExclusive,maxInclusive) */
        CUITEmisor: "minExclusive" | "maxInclusive";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codTipoCmp: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#PuntoVentaSimpleType(minInclusive,maxInclusive) */
        ptoVta: "minInclusive" | "maxInclusive";
        /** http://ar.gob.afip.wsfecred/FECredService/#NumeroComprobanteSimpleType(minInclusive,maxInclusive) */
        nroCmp: "minInclusive" | "maxInclusive";
    }
    export interface IrechazarNotaDCReturn {
        idComprobante: FECredServiceSOAPTypes.IidComprobante;
        /** http://ar.gob.afip.wsfecred/FECredService/#ResultadoSimpleType(A,O,R) */
        resultado: "A" | "O" | "R";
        evento: FECredServiceSOAPTypes.Ievento;
        arrayObservaciones: FECredServiceSOAPTypes.IarrayObservaciones;
        arrayErrores: FECredServiceSOAPTypes.IarrayErrores;
        arrayErroresFormato: FECredServiceSOAPTypes.IarrayErroresFormato;
    }
    export interface IestadoCtaCte {
        /** http://ar.gob.afip.wsfecred/FECredService/#EstadoCtaCteSimpleType(Modificable,Aceptada,Rechazada,CanceladaTotal,InformadaAgDpto) */
        estado: "Modificable" | "Aceptada" | "Rechazada" | "CanceladaTotal" | "InformadaAgDpto";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
        fechaHoraEstado: string;
    }
    export interface IidFacturaCredito {
        /** http://ar.gob.afip.wsfecred/FECredService/#CuitSimpleType(minExclusive,maxInclusive) */
        CUITEmisor: "minExclusive" | "maxInclusive";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codTipoCmp: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#PuntoVentaSimpleType(minInclusive,maxInclusive) */
        ptoVta: "minInclusive" | "maxInclusive";
        /** http://ar.gob.afip.wsfecred/FECredService/#NumeroComprobanteSimpleType(minInclusive,maxInclusive) */
        nroCmp: "minInclusive" | "maxInclusive";
    }
    export interface IinfoCtaCte {
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codCtaCte: number;
        estadoCtaCte: FECredServiceSOAPTypes.IestadoCtaCte;
        idFacturaCredito: FECredServiceSOAPTypes.IidFacturaCredito;
        /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
        importeTotalFC: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
        saldo: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
        saldoAceptado: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        codMoneda: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#OpcionTransferenciaSimpleType(SCA,ADC) */
        opcionTransferencia: "SCA" | "ADC";
    }
    export interface IarrayInfosCtaCte {
        infoCtaCte: FECredServiceSOAPTypes.IinfoCtaCte[];
    }
    export interface IconsultarCtasCtesReturn {
        arrayInfosCtaCte: FECredServiceSOAPTypes.IarrayInfosCtaCte;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        nroPagina: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#SiNoSimpleType(length,S,N) */
        hayMas: "S" | "N";
        evento: FECredServiceSOAPTypes.Ievento;
        arrayObservaciones: FECredServiceSOAPTypes.IarrayObservaciones;
        arrayErrores: FECredServiceSOAPTypes.IarrayErrores;
        arrayErroresFormato: FECredServiceSOAPTypes.IarrayErroresFormato;
    }
    export interface IidFactura {
        /** http://ar.gob.afip.wsfecred/FECredService/#CuitSimpleType(minExclusive,maxInclusive) */
        CUITEmisor: "minExclusive" | "maxInclusive";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codTipoCmp: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#PuntoVentaSimpleType(minInclusive,maxInclusive) */
        ptoVta: "minInclusive" | "maxInclusive";
        /** http://ar.gob.afip.wsfecred/FECredService/#NumeroComprobanteSimpleType(minInclusive,maxInclusive) */
        nroCmp: "minInclusive" | "maxInclusive";
    }
    export interface IidCtaCte {
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codCtaCte: number;
        idFactura: FECredServiceSOAPTypes.IidFactura;
    }
    export interface Ifactura {
        /** http://ar.gob.afip.wsfecred/FECredService/#CuitSimpleType(minExclusive,maxInclusive) */
        cuitEmisor: "minExclusive" | "maxInclusive";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        razonSocialEmi: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codTipoCmp: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#PuntoVentaSimpleType(minInclusive,maxInclusive) */
        ptovta: "minInclusive" | "maxInclusive";
        /** http://ar.gob.afip.wsfecred/FECredService/#NumeroComprobanteSimpleType(minInclusive,maxInclusive) */
        nroCmp: "minInclusive" | "maxInclusive";
        /** http://ar.gob.afip.wsfecred/FECredService/#CuitSimpleType(minExclusive,maxInclusive) */
        cuitReceptor: "minExclusive" | "maxInclusive";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        razonSocialRecep: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#TipoCodAutorizacionType(A,E) */
        tipoCodAuto: "A" | "E";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codAutorizacion: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
        fechaEmision: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
        fechaPuestaDispo: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
        fechaVenPago: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
        fechaVenAcep: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
        importeTotal: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        codMoneda: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        cotizacionMoneda: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#CBUSimpleType(length) */
        CBUEmisor: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#Texto250SimpleType(minLength,maxLength) */
        AliasEmisor: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#SiNoSimpleType(length,S,N) */
        esAnulacion: "S" | "N";
        /** http://ar.gob.afip.wsfecred/FECredService/#SiNoSimpleType(length,S,N) */
        esPostAceptacion: "S" | "N";
        idComprobanteAsociado: FECredServiceSOAPTypes.IidComprobanteAsociado;
        referenciasComerciales: FECredServiceSOAPTypes.IreferenciasComerciales;
        arraySubtotalesIVA: FECredServiceSOAPTypes.IarraySubtotalesIVA;
        arrayOtrosTributos: FECredServiceSOAPTypes.IarrayOtrosTributos;
        arrayItems: FECredServiceSOAPTypes.IarrayItems;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        datosGenerales: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        datosComerciales: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#Texto250SimpleType(minLength,maxLength) */
        leyendaComercial: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codCtaCte: number;
        estado: FECredServiceSOAPTypes.Iestado;
        /** http://ar.gob.afip.wsfecred/FECredService/#TipoAceptacionSimpleType(Tacita,Expresa) */
        tipoAcep: "Tacita" | "Expresa";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
        fechaHoraAcep: string;
        arrayMotivosRechazo: FECredServiceSOAPTypes.IarrayMotivosRechazo;
        /** http://ar.gob.afip.wsfecred/FECredService/#OpcionTransferenciaSimpleType(SCA,ADC) */
        opcionTransferencia: "SCA" | "ADC";
        infoTransferencia: FECredServiceSOAPTypes.IinfoTransferencia;
    }
    export interface IarrayNotasDCAsociadas {
        comprobante: FECredServiceSOAPTypes.Icomprobante[];
    }
    export interface IarrayFormasCancelacion {
        codigoDescripcion: FECredServiceSOAPTypes.IcodigoDescripcion[];
    }
    export interface Iretencion {
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codTipo: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
        importe: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        /** http://ar.gob.afip.wsfecred/FECredService/#PorcentajeSimpleType(maxInclusive,minInclusive) */
        porcentaje: "maxInclusive" | "minInclusive";
        /** http://ar.gob.afip.wsfecred/FECredService/#Texto250SimpleType(minLength,maxLength) */
        descMotivo: string;
    }
    export interface IarrayRetenciones {
        retencion: FECredServiceSOAPTypes.Iretencion[];
    }
    export interface Iajuste {
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codigo: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
        importe: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
    }
    export interface IarrayAjustesOperacion {
        ajuste: FECredServiceSOAPTypes.Iajuste[];
    }
    export interface IctaCte {
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codCtaCte: number;
        estadoCtaCte: FECredServiceSOAPTypes.IestadoCtaCte;
        factura: FECredServiceSOAPTypes.Ifactura;
        arrayNotasDCAsociadas: FECredServiceSOAPTypes.IarrayNotasDCAsociadas;
        arrayFormasCancelacion: FECredServiceSOAPTypes.IarrayFormasCancelacion;
        arrayRetenciones: FECredServiceSOAPTypes.IarrayRetenciones;
        arrayAjustesOperacion: FECredServiceSOAPTypes.IarrayAjustesOperacion;
        /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
        importeInicial: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
        importeTotalNotasDC: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
        importeCancelado: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
        importeTotalRetPesos: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
        importeEmbargoPesos: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
        saldoAceptado: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
        saldo: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        codMoneda: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        cotizacionMonedaUlt: number;
    }
    export interface IconsultarCtaCteReturn {
        ctaCte: FECredServiceSOAPTypes.IctaCte;
        evento: FECredServiceSOAPTypes.Ievento;
        arrayObservaciones: FECredServiceSOAPTypes.IarrayObservaciones;
        arrayErrores: FECredServiceSOAPTypes.IarrayErrores;
        arrayErroresFormato: FECredServiceSOAPTypes.IarrayErroresFormato;
    }
    export interface IoperacionFECredReturn {
        /** http://ar.gob.afip.wsfecred/FECredService/#ResultadoSimpleType(A,O,R) */
        resultado: "A" | "O" | "R";
        idCtaCte: FECredServiceSOAPTypes.IidCtaCte;
        evento: FECredServiceSOAPTypes.Ievento;
        arrayObservaciones: FECredServiceSOAPTypes.IarrayObservaciones;
        arrayErrores: FECredServiceSOAPTypes.IarrayErrores;
        arrayErroresFormato: FECredServiceSOAPTypes.IarrayErroresFormato;
    }
    export interface IidNota {
        /** http://ar.gob.afip.wsfecred/FECredService/#CuitSimpleType(minExclusive,maxInclusive) */
        CUITEmisor: "minExclusive" | "maxInclusive";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codTipoCmp: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#PuntoVentaSimpleType(minInclusive,maxInclusive) */
        ptoVta: "minInclusive" | "maxInclusive";
        /** http://ar.gob.afip.wsfecred/FECredService/#NumeroComprobanteSimpleType(minInclusive,maxInclusive) */
        nroCmp: "minInclusive" | "maxInclusive";
    }
    export interface IconfirmarNota {
        /** http://ar.gob.afip.wsfecred/FECredService/#SiNoSimpleType(length,S,N) */
        acepta: "S" | "N";
        idNota: FECredServiceSOAPTypes.IidNota;
    }
    export interface IarrayConfirmarNotasDC {
        confirmarNota: FECredServiceSOAPTypes.IconfirmarNota[];
    }
    export interface IfiltroFecha {
        /** http://ar.gob.afip.wsfecred/FECredService/#TipoFechaSimpleType(Emision,PuestaDispo,VenPago,VenAcep,Acep,InfoAgDptoCltv) */
        tipo: "Emision" | "PuestaDispo" | "VenPago" | "VenAcep" | "Acep" | "InfoAgDptoCltv";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
        desde: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
        hasta: string;
    }
    export interface IfacturaInformada {
        idFactura: FECredServiceSOAPTypes.IidFactura;
        infoAgtDptoCltv: FECredServiceSOAPTypes.IinfoAgtDptoCltv;
    }
    export interface IarrayFacturasAgtDptoCltv {
        facturaInformada: FECredServiceSOAPTypes.IfacturaInformada[];
    }
    export interface IconsultarFacturasAgtDptoCltvReturn {
        arrayFacturasAgtDptoCltv: FECredServiceSOAPTypes.IarrayFacturasAgtDptoCltv;
        evento: FECredServiceSOAPTypes.Ievento;
        arrayObservaciones: FECredServiceSOAPTypes.IarrayObservaciones;
        arrayErrores: FECredServiceSOAPTypes.IarrayErrores;
        arrayErroresFormato: FECredServiceSOAPTypes.IarrayErroresFormato;
    }
    export interface IcuentaEnAgente {
        /** http://ar.gob.afip.wsfecred/FECredService/#CuitSimpleType(minExclusive,maxInclusive) */
        cuitAgente: "minExclusive" | "maxInclusive";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        razonSocialAgente: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#IdCuentaAgenteSimpleType(minLength,maxLength) */
        idCuenta: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#Texto250SimpleType(minLength,maxLength) */
        denominacion: string;
    }
    export interface IarrayCuentasEnAgente {
        cuentaEnAgente: FECredServiceSOAPTypes.IcuentaEnAgente[];
    }
    export interface IarrayObservacion {
        codigoDescripcion: FECredServiceSOAPTypes.IcodigoDescripcion[];
    }
    export interface IconsultarCuentasEnAgtDptoCltvReturn {
        arrayCuentasEnAgente: FECredServiceSOAPTypes.IarrayCuentasEnAgente;
        arrayObservacion: FECredServiceSOAPTypes.IarrayObservacion;
        arrayErrores: FECredServiceSOAPTypes.IarrayErrores;
        arrayErroresFormato: FECredServiceSOAPTypes.IarrayErroresFormato;
    }
    export interface IconsultarObligadoRecepcionReturn {
        /** http://ar.gob.afip.wsfecred/FECredService/#SiNoSimpleType(length,S,N) */
        respuesta: "S" | "N";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
        desde: string;
        arrayObservacion: FECredServiceSOAPTypes.IarrayObservacion;
        arrayErrores: FECredServiceSOAPTypes.IarrayErrores;
        arrayErroresFormato: FECredServiceSOAPTypes.IarrayErroresFormato;
    }
    export interface ItipoRetencion {
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codigoJurisdiccion: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        descripcionJurisdiccion: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#PorcentajeSimpleType(maxInclusive,minInclusive) */
        porcentajeRetencion: "maxInclusive" | "minInclusive";
    }
    export interface IarrayTiposRetenciones {
        tipoRetencion: FECredServiceSOAPTypes.ItipoRetencion[];
    }
    export interface IconsultarTiposRetencionesReturn {
        arrayTiposRetenciones: FECredServiceSOAPTypes.IarrayTiposRetenciones;
        arrayErroresFormato: FECredServiceSOAPTypes.IarrayErroresFormato;
    }
    export interface IarrayCodigoDescripcion {
        codigoDescripcion: FECredServiceSOAPTypes.IcodigoDescripcion[];
    }
    export interface IcodigoDescripcionReturn {
        arrayCodigoDescripcion: FECredServiceSOAPTypes.IarrayCodigoDescripcion;
        arrayErroresFormato: FECredServiceSOAPTypes.IarrayErroresFormato;
    }
    export interface IidsComprobantes {
        /** http://ar.gob.afip.wsfecred/FECredService/#CuitSimpleType(minExclusive,maxInclusive) */
        CUITEmisor: "minExclusive" | "maxInclusive";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codTipoCmp: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#PuntoVentaSimpleType(minInclusive,maxInclusive) */
        ptoVta: "minInclusive" | "maxInclusive";
        /** http://ar.gob.afip.wsfecred/FECredService/#NumeroComprobanteSimpleType(minInclusive,maxInclusive) */
        nroCmp: "minInclusive" | "maxInclusive";
    }
    export interface IarrayIdsRemitos {
        idsComprobantes: FECredServiceSOAPTypes.IidsComprobantes[];
    }
    export interface IobtenerRemitosReturn {
        arrayIdsRemitos: FECredServiceSOAPTypes.IarrayIdsRemitos;
        arrayErrores: FECredServiceSOAPTypes.IarrayErrores;
        arrayErroresFormato: FECredServiceSOAPTypes.IarrayErroresFormato;
    }
    export interface IconsultarHistorialEstadosComprobanteReturn {
        idComprobante: FECredServiceSOAPTypes.IidComprobante;
        arrayHistorialEstados: {
            estadoHistorico: Array<{
                /** http://ar.gob.afip.wsfecred/FECredService/#EstadoCmpSimpleType(PendienteRecepcion,Recepcionado,Aceptado,Rechazado,InformadaAgDpto) */
                estado: "PendienteRecepcion" | "Recepcionado" | "Aceptado" | "Rechazado" | "InformadaAgDpto";
                /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
                fechaHoraEstado: string;
            }>;
        };
        arrayErrores: FECredServiceSOAPTypes.IarrayErrores;
        arrayErroresFormato: FECredServiceSOAPTypes.IarrayErroresFormato;
    }
    export interface IconsultarHistorialEstadosCtaCteReturn {
        idCtaCte: FECredServiceSOAPTypes.IidCtaCte;
        arrayHistorialEstados: {
            estadoHistorico: Array<{
                /** http://ar.gob.afip.wsfecred/FECredService/#EstadoCtaCteSimpleType(Modificable,Aceptada,Rechazada,CanceladaTotal,InformadaAgDpto) */
                estado: "Modificable" | "Aceptada" | "Rechazada" | "CanceladaTotal" | "InformadaAgDpto";
                /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
                fechaHoraEstado: string;
            }>;
        };
        arrayErrores: FECredServiceSOAPTypes.IarrayErrores;
        arrayErroresFormato: FECredServiceSOAPTypes.IarrayErroresFormato;
    }
    export interface IconsultarMontoObligadoRecepcionReturn {
        /** http://ar.gob.afip.wsfecred/FECredService/#SiNoSimpleType(length,S,N) */
        obligado: "S" | "N";
        /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
        montoDesde: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        arrayObservacion: FECredServiceSOAPTypes.IarrayObservacion;
        arrayErrores: FECredServiceSOAPTypes.IarrayErrores;
        arrayErroresFormato: FECredServiceSOAPTypes.IarrayErroresFormato;
    }
}
