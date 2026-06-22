/**
 * Application-layer SOAP DTOs for FECredService.
 * Mirrors WSDL codegen shapes without importing infrastructure.
 */
export interface IdummyInput {}

export interface IdummyOutput {
    dummyReturn: FecredSoapTypes.IdummyReturn;
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
    fecha: FecredSoapTypes.Ifecha;
    /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
    codCtaCte: number;
    /** http://ar.gob.afip.wsfecred/FECredService/#EstadoCtaCteSimpleType(Modificable,Aceptada,Rechazada,CanceladaTotal,InformadaAgDpto) */
    estadoCtaCte: "Modificable" | "Aceptada" | "Rechazada" | "CanceladaTotal" | "InformadaAgDpto";
    /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
    nroPagina: number;
}

export interface IconsultarComprobantesOutput {
    consultarCmpReturn: FecredSoapTypes.IconsultarCmpReturn;
}

export interface IrechazarNotaDCInput {
    idComprobante: FecredSoapTypes.IidComprobante;
    arrayMotivosRechazo: FecredSoapTypes.IarrayMotivosRechazo;
}

export interface IrechazarNotaDCOutput {
    rechazarNotaDCReturn: FecredSoapTypes.IrechazarNotaDCReturn;
}

export interface IconsultarCtasCtesInput {
    /** http://ar.gob.afip.wsfecred/FECredService/#RolSimpleType(Emisor,Receptor) */
    rolCUITRepresentada: "Emisor" | "Receptor";
    /** http://ar.gob.afip.wsfecred/FECredService/#CuitSimpleType(minExclusive,maxInclusive) */
    CUITContraparte: "minExclusive" | "maxInclusive";
    fecha: FecredSoapTypes.Ifecha;
    /** http://ar.gob.afip.wsfecred/FECredService/#EstadoCtaCteSimpleType(Modificable,Aceptada,Rechazada,CanceladaTotal,InformadaAgDpto) */
    estadoCtaCte: "Modificable" | "Aceptada" | "Rechazada" | "CanceladaTotal" | "InformadaAgDpto";
    /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
    nroPagina: number;
    /** http://ar.gob.afip.wsfecred/FECredService/#OpcionTransferenciaSimpleType(SCA,ADC) */
    opcionTransferencia: "SCA" | "ADC";
}

export interface IconsultarCtasCtesOutput {
    consultarCtasCtesReturn: FecredSoapTypes.IconsultarCtasCtesReturn;
}

export interface IconsultarCtaCteInput {
    idCtaCte: FecredSoapTypes.IidCtaCte;
}

export interface IconsultarCtaCteOutput {
    consultarCtaCteReturn: FecredSoapTypes.IconsultarCtaCteReturn;
}

export interface IinformarCancelacionTotalFECredInput {
    idCtaCte: FecredSoapTypes.IidCtaCte;
    arrayFormasCancelacion: FecredSoapTypes.IarrayFormasCancelacion;
    /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
    importeCancelacion: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
}

export interface IinformarCancelacionTotalFECredOutput {
    operacionFECredReturn: FecredSoapTypes.IoperacionFECredReturn;
}

export interface IaceptarFECredInput {
    idCtaCte: FecredSoapTypes.IidCtaCte;
    arrayConfirmarNotasDC: FecredSoapTypes.IarrayConfirmarNotasDC;
    arrayFormasCancelacion: FecredSoapTypes.IarrayFormasCancelacion;
    arrayRetenciones: FecredSoapTypes.IarrayRetenciones;
    arrayAjustesOperacion: FecredSoapTypes.IarrayAjustesOperacion;
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
    operacionFECredReturn: FecredSoapTypes.IoperacionFECredReturn;
}

export interface IrechazarFECredInput {
    idCtaCte: FecredSoapTypes.IidCtaCte;
    arrayMotivosRechazo: FecredSoapTypes.IarrayMotivosRechazo;
}

export interface IrechazarFECredOutput {
    operacionFECredReturn: FecredSoapTypes.IoperacionFECredReturn;
}

export interface IinformarFacturaAgtDptoCltvInput {
    idCtaCte: FecredSoapTypes.IidCtaCte;
    ctaAgente: FecredSoapTypes.IctaAgente;
}

export interface IinformarFacturaAgtDptoCltvOutput {
    operacionFECredReturn: FecredSoapTypes.IoperacionFECredReturn;
}

export interface IconsultarFacturasAgtDptoCltvInput {
    idCtaCte: FecredSoapTypes.IidCtaCte;
    filtroFecha: FecredSoapTypes.IfiltroFecha;
}

export interface IconsultarFacturasAgtDptoCltvOutput {
    consultarFacturasAgtDptoCltvReturn: FecredSoapTypes.IconsultarFacturasAgtDptoCltvReturn;
}

export interface IconsultarCuentasEnAgtDptoCltvInput {
}

export interface IconsultarCuentasEnAgtDptoCltvOutput {
    consultarCuentasEnAgtDptoCltvReturn: FecredSoapTypes.IconsultarCuentasEnAgtDptoCltvReturn;
}

export interface IconsultarObligadoRecepcionInput {
    /** http://ar.gob.afip.wsfecred/FECredService/#CuitSimpleType(minExclusive,maxInclusive) */
    cuitConsultada: "minExclusive" | "maxInclusive";
}

export interface IconsultarObligadoRecepcionOutput {
    consultarObligadoRecepcionReturn: FecredSoapTypes.IconsultarObligadoRecepcionReturn;
}

export interface IconsultarTiposRetencionesInput {
}

export interface IconsultarTiposRetencionesOutput {
    consultarTiposRetencionesReturn: FecredSoapTypes.IconsultarTiposRetencionesReturn;
}

export interface IconsultarTiposMotivosRechazoInput {
}

export interface IconsultarTiposMotivosRechazoOutput {
    codigoDescripcionReturn: FecredSoapTypes.IcodigoDescripcionReturn;
}

export interface IconsultarTiposFormasCancelacionInput {
}

export interface IconsultarTiposFormasCancelacionOutput {
    codigoDescripcionReturn: FecredSoapTypes.IcodigoDescripcionReturn;
}

export interface IobtenerRemitosInput {
    idComprobante: FecredSoapTypes.IidComprobante;
}

export interface IobtenerRemitosOutput {
    obtenerRemitosReturn: FecredSoapTypes.IobtenerRemitosReturn;
}

export interface IconsultarHistorialEstadosComprobanteInput {
    idComprobante: FecredSoapTypes.IidComprobante;
}

export interface IconsultarHistorialEstadosComprobanteOutput {
    consultarHistorialEstadosComprobanteReturn: FecredSoapTypes.IconsultarHistorialEstadosComprobanteReturn;
}

export interface IconsultarHistorialEstadosCtaCteInput {
    idCtaCte: FecredSoapTypes.IidCtaCte;
}

export interface IconsultarHistorialEstadosCtaCteOutput {
    consultarHistorialEstadosCtaCteReturn: FecredSoapTypes.IconsultarHistorialEstadosCtaCteReturn;
}

export interface IconsultarTiposAjustesOperacionInput {
}

export interface IconsultarTiposAjustesOperacionOutput {
    codigoDescripcionReturn: FecredSoapTypes.IcodigoDescripcionReturn;
}

export interface IconsultarMontoObligadoRecepcionInput {
    /** http://ar.gob.afip.wsfecred/FECredService/#CuitSimpleType(minExclusive,maxInclusive) */
    cuitConsultada: "minExclusive" | "maxInclusive";
    /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
    fechaEmision: string;
}

export interface IconsultarMontoObligadoRecepcionOutput {
    consultarMontoObligadoRecepcionReturn: FecredSoapTypes.IconsultarMontoObligadoRecepcionReturn;
}

export interface ImodificarOpcionTransferenciaInput {
    idCtaCte: FecredSoapTypes.IidCtaCte;
    /** http://ar.gob.afip.wsfecred/FECredService/#OpcionTransferenciaSimpleType(SCA,ADC) */
    opcionTransferencia: "SCA" | "ADC";
}

export interface ImodificarOpcionTransferenciaOutput {
    operacionFECredReturn: FecredSoapTypes.IoperacionFECredReturn;
}

export namespace FecredSoapTypes {
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
        subtotalIVA: FecredSoapTypes.IsubtotalIVA[];
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
        otroTributo: FecredSoapTypes.IotroTributo[];
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
        item: FecredSoapTypes.Iitem[];
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
        motivoRechazo: FecredSoapTypes.ImotivoRechazo[];
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
        ctaAgente: FecredSoapTypes.IctaAgente;
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
        infoAgtDptoCltv: FecredSoapTypes.IinfoAgtDptoCltv;
        infoSCA: FecredSoapTypes.IinfoSCA;
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
        idComprobanteAsociado: FecredSoapTypes.IidComprobanteAsociado;
        referenciasComerciales: FecredSoapTypes.IreferenciasComerciales;
        arraySubtotalesIVA: FecredSoapTypes.IarraySubtotalesIVA;
        arrayOtrosTributos: FecredSoapTypes.IarrayOtrosTributos;
        arrayItems: FecredSoapTypes.IarrayItems;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        datosGenerales: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        datosComerciales: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#Texto250SimpleType(minLength,maxLength) */
        leyendaComercial: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codCtaCte: number;
        estado: FecredSoapTypes.Iestado;
        /** http://ar.gob.afip.wsfecred/FECredService/#TipoAceptacionSimpleType(Tacita,Expresa) */
        tipoAcep: "Tacita" | "Expresa";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
        fechaHoraAcep: string;
        arrayMotivosRechazo: FecredSoapTypes.IarrayMotivosRechazo;
        /** http://ar.gob.afip.wsfecred/FECredService/#OpcionTransferenciaSimpleType(SCA,ADC) */
        opcionTransferencia: "SCA" | "ADC";
        infoTransferencia: FecredSoapTypes.IinfoTransferencia;
    }
    export interface IarrayComprobantes {
        comprobante: FecredSoapTypes.Icomprobante[];
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
        codigoDescripcion: FecredSoapTypes.IcodigoDescripcion[];
    }
    export interface IarrayErrores {
        codigoDescripcion: FecredSoapTypes.IcodigoDescripcion[];
    }
    export interface IcodigoDescripcionString {
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        codigo: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        descripcion: string;
    }
    export interface IarrayErroresFormato {
        codigoDescripcionString: FecredSoapTypes.IcodigoDescripcionString[];
    }
    export interface IconsultarCmpReturn {
        arrayComprobantes: FecredSoapTypes.IarrayComprobantes;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        nroPagina: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#SiNoSimpleType(length,S,N) */
        hayMas: "S" | "N";
        evento: FecredSoapTypes.Ievento;
        arrayObservaciones: FecredSoapTypes.IarrayObservaciones;
        arrayErrores: FecredSoapTypes.IarrayErrores;
        arrayErroresFormato: FecredSoapTypes.IarrayErroresFormato;
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
        idComprobante: FecredSoapTypes.IidComprobante;
        /** http://ar.gob.afip.wsfecred/FECredService/#ResultadoSimpleType(A,O,R) */
        resultado: "A" | "O" | "R";
        evento: FecredSoapTypes.Ievento;
        arrayObservaciones: FecredSoapTypes.IarrayObservaciones;
        arrayErrores: FecredSoapTypes.IarrayErrores;
        arrayErroresFormato: FecredSoapTypes.IarrayErroresFormato;
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
        estadoCtaCte: FecredSoapTypes.IestadoCtaCte;
        idFacturaCredito: FecredSoapTypes.IidFacturaCredito;
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
        infoCtaCte: FecredSoapTypes.IinfoCtaCte[];
    }
    export interface IconsultarCtasCtesReturn {
        arrayInfosCtaCte: FecredSoapTypes.IarrayInfosCtaCte;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        nroPagina: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#SiNoSimpleType(length,S,N) */
        hayMas: "S" | "N";
        evento: FecredSoapTypes.Ievento;
        arrayObservaciones: FecredSoapTypes.IarrayObservaciones;
        arrayErrores: FecredSoapTypes.IarrayErrores;
        arrayErroresFormato: FecredSoapTypes.IarrayErroresFormato;
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
        idFactura: FecredSoapTypes.IidFactura;
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
        idComprobanteAsociado: FecredSoapTypes.IidComprobanteAsociado;
        referenciasComerciales: FecredSoapTypes.IreferenciasComerciales;
        arraySubtotalesIVA: FecredSoapTypes.IarraySubtotalesIVA;
        arrayOtrosTributos: FecredSoapTypes.IarrayOtrosTributos;
        arrayItems: FecredSoapTypes.IarrayItems;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        datosGenerales: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd:string(undefined) */
        datosComerciales: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#Texto250SimpleType(minLength,maxLength) */
        leyendaComercial: string;
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codCtaCte: number;
        estado: FecredSoapTypes.Iestado;
        /** http://ar.gob.afip.wsfecred/FECredService/#TipoAceptacionSimpleType(Tacita,Expresa) */
        tipoAcep: "Tacita" | "Expresa";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
        fechaHoraAcep: string;
        arrayMotivosRechazo: FecredSoapTypes.IarrayMotivosRechazo;
        /** http://ar.gob.afip.wsfecred/FECredService/#OpcionTransferenciaSimpleType(SCA,ADC) */
        opcionTransferencia: "SCA" | "ADC";
        infoTransferencia: FecredSoapTypes.IinfoTransferencia;
    }
    export interface IarrayNotasDCAsociadas {
        comprobante: FecredSoapTypes.Icomprobante[];
    }
    export interface IarrayFormasCancelacion {
        codigoDescripcion: FecredSoapTypes.IcodigoDescripcion[];
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
        retencion: FecredSoapTypes.Iretencion[];
    }
    export interface Iajuste {
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codigo: number;
        /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
        importe: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
    }
    export interface IarrayAjustesOperacion {
        ajuste: FecredSoapTypes.Iajuste[];
    }
    export interface IctaCte {
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: number(undefined) */
        codCtaCte: number;
        estadoCtaCte: FecredSoapTypes.IestadoCtaCte;
        factura: FecredSoapTypes.Ifactura;
        arrayNotasDCAsociadas: FecredSoapTypes.IarrayNotasDCAsociadas;
        arrayFormasCancelacion: FecredSoapTypes.IarrayFormasCancelacion;
        arrayRetenciones: FecredSoapTypes.IarrayRetenciones;
        arrayAjustesOperacion: FecredSoapTypes.IarrayAjustesOperacion;
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
        ctaCte: FecredSoapTypes.IctaCte;
        evento: FecredSoapTypes.Ievento;
        arrayObservaciones: FecredSoapTypes.IarrayObservaciones;
        arrayErrores: FecredSoapTypes.IarrayErrores;
        arrayErroresFormato: FecredSoapTypes.IarrayErroresFormato;
    }
    export interface IoperacionFECredReturn {
        /** http://ar.gob.afip.wsfecred/FECredService/#ResultadoSimpleType(A,O,R) */
        resultado: "A" | "O" | "R";
        idCtaCte: FecredSoapTypes.IidCtaCte;
        evento: FecredSoapTypes.Ievento;
        arrayObservaciones: FecredSoapTypes.IarrayObservaciones;
        arrayErrores: FecredSoapTypes.IarrayErrores;
        arrayErroresFormato: FecredSoapTypes.IarrayErroresFormato;
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
        idNota: FecredSoapTypes.IidNota;
    }
    export interface IarrayConfirmarNotasDC {
        confirmarNota: FecredSoapTypes.IconfirmarNota[];
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
        idFactura: FecredSoapTypes.IidFactura;
        infoAgtDptoCltv: FecredSoapTypes.IinfoAgtDptoCltv;
    }
    export interface IarrayFacturasAgtDptoCltv {
        facturaInformada: FecredSoapTypes.IfacturaInformada[];
    }
    export interface IconsultarFacturasAgtDptoCltvReturn {
        arrayFacturasAgtDptoCltv: FecredSoapTypes.IarrayFacturasAgtDptoCltv;
        evento: FecredSoapTypes.Ievento;
        arrayObservaciones: FecredSoapTypes.IarrayObservaciones;
        arrayErrores: FecredSoapTypes.IarrayErrores;
        arrayErroresFormato: FecredSoapTypes.IarrayErroresFormato;
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
        cuentaEnAgente: FecredSoapTypes.IcuentaEnAgente[];
    }
    export interface IarrayObservacion {
        codigoDescripcion: FecredSoapTypes.IcodigoDescripcion[];
    }
    export interface IconsultarCuentasEnAgtDptoCltvReturn {
        arrayCuentasEnAgente: FecredSoapTypes.IarrayCuentasEnAgente;
        arrayObservacion: FecredSoapTypes.IarrayObservacion;
        arrayErrores: FecredSoapTypes.IarrayErrores;
        arrayErroresFormato: FecredSoapTypes.IarrayErroresFormato;
    }
    export interface IconsultarObligadoRecepcionReturn {
        /** http://ar.gob.afip.wsfecred/FECredService/#SiNoSimpleType(length,S,N) */
        respuesta: "S" | "N";
        /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
        desde: string;
        arrayObservacion: FecredSoapTypes.IarrayObservacion;
        arrayErrores: FecredSoapTypes.IarrayErrores;
        arrayErroresFormato: FecredSoapTypes.IarrayErroresFormato;
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
        tipoRetencion: FecredSoapTypes.ItipoRetencion[];
    }
    export interface IconsultarTiposRetencionesReturn {
        arrayTiposRetenciones: FecredSoapTypes.IarrayTiposRetenciones;
        arrayErroresFormato: FecredSoapTypes.IarrayErroresFormato;
    }
    export interface IarrayCodigoDescripcion {
        codigoDescripcion: FecredSoapTypes.IcodigoDescripcion[];
    }
    export interface IcodigoDescripcionReturn {
        arrayCodigoDescripcion: FecredSoapTypes.IarrayCodigoDescripcion;
        arrayErroresFormato: FecredSoapTypes.IarrayErroresFormato;
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
        idsComprobantes: FecredSoapTypes.IidsComprobantes[];
    }
    export interface IobtenerRemitosReturn {
        arrayIdsRemitos: FecredSoapTypes.IarrayIdsRemitos;
        arrayErrores: FecredSoapTypes.IarrayErrores;
        arrayErroresFormato: FecredSoapTypes.IarrayErroresFormato;
    }
    export interface IconsultarHistorialEstadosComprobanteReturn {
        idComprobante: FecredSoapTypes.IidComprobante;
        arrayHistorialEstados: {
            estadoHistorico: Array<{
                /** http://ar.gob.afip.wsfecred/FECredService/#EstadoCmpSimpleType(PendienteRecepcion,Recepcionado,Aceptado,Rechazado,InformadaAgDpto) */
                estado: "PendienteRecepcion" | "Recepcionado" | "Aceptado" | "Rechazado" | "InformadaAgDpto";
                /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
                fechaHoraEstado: string;
            }>;
        };
        arrayErrores: FecredSoapTypes.IarrayErrores;
        arrayErroresFormato: FecredSoapTypes.IarrayErroresFormato;
    }
    export interface IconsultarHistorialEstadosCtaCteReturn {
        idCtaCte: FecredSoapTypes.IidCtaCte;
        arrayHistorialEstados: {
            estadoHistorico: Array<{
                /** http://ar.gob.afip.wsfecred/FECredService/#EstadoCtaCteSimpleType(Modificable,Aceptada,Rechazada,CanceladaTotal,InformadaAgDpto) */
                estado: "Modificable" | "Aceptada" | "Rechazada" | "CanceladaTotal" | "InformadaAgDpto";
                /** http://ar.gob.afip.wsfecred/FECredService/#xsd: string(undefined) */
                fechaHoraEstado: string;
            }>;
        };
        arrayErrores: FecredSoapTypes.IarrayErrores;
        arrayErroresFormato: FecredSoapTypes.IarrayErroresFormato;
    }
    export interface IconsultarMontoObligadoRecepcionReturn {
        /** http://ar.gob.afip.wsfecred/FECredService/#SiNoSimpleType(length,S,N) */
        obligado: "S" | "N";
        /** http://ar.gob.afip.wsfecred/FECredService/#ImporteSimpleType(minInclusive,maxInclusive,totalDigits,fractionDigits) */
        montoDesde: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        arrayObservacion: FecredSoapTypes.IarrayObservacion;
        arrayErrores: FecredSoapTypes.IarrayErrores;
        arrayErroresFormato: FecredSoapTypes.IarrayErroresFormato;
    }
}
