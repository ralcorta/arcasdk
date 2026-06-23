/**
 * SOAP DTOs generated from WSDL. Do not edit manually.
 * Regenerate: npm run generate:soap-interfaces
 */
export interface IdummyInput {}

export interface IdummyOutput {
    dummyReturn: FECredServiceSOAPTypes.IdummyReturn;
}

export interface IconsultarComprobantesInput {
    rolCUITRepresentada: "Emisor" | "Receptor";
    CUITContraparte: "minExclusive" | "maxInclusive";
    codTipoCmp: number;
    estadoCmp: "PendienteRecepcion" | "Recepcionado" | "Aceptado" | "Rechazado" | "InformadaAgDpto";
    fecha: FECredServiceSOAPTypes.Ifecha;
    codCtaCte: number;
    estadoCtaCte: "Modificable" | "Aceptada" | "Rechazada" | "CanceladaTotal" | "InformadaAgDpto";
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
    rolCUITRepresentada: "Emisor" | "Receptor";
    CUITContraparte: "minExclusive" | "maxInclusive";
    fecha: FECredServiceSOAPTypes.Ifecha;
    estadoCtaCte: "Modificable" | "Aceptada" | "Rechazada" | "CanceladaTotal" | "InformadaAgDpto";
    nroPagina: number;
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
    tipoCancelacion: "PAR" | "TOT";
    importeCancelado: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
    importeTotalRetPesos: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
    importeEmbargoPesos: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
    saldoAceptado: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
    codMoneda: string;
    cotizacionMonedaUlt: number;
    informaCBU: "S" | "N";
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
    cuitConsultada: "minExclusive" | "maxInclusive";
    fechaEmision: string;
}

export interface IconsultarMontoObligadoRecepcionOutput {
    consultarMontoObligadoRecepcionReturn: FECredServiceSOAPTypes.IconsultarMontoObligadoRecepcionReturn;
}

export interface ImodificarOpcionTransferenciaInput {
    idCtaCte: FECredServiceSOAPTypes.IidCtaCte;
    opcionTransferencia: "SCA" | "ADC";
}

export interface ImodificarOpcionTransferenciaOutput {
    operacionFECredReturn: FECredServiceSOAPTypes.IoperacionFECredReturn;
}


export namespace FECredServiceSOAPTypes {
    export interface IdummyReturn {
        appserver: string;
        authserver: string;
        dbserver: string;
    }
    export interface IauthRequest {
    }
    export interface Ifecha {
        tipo: "Emision" | "PuestaDispo" | "VenPago" | "VenAcep" | "Acep" | "InfoAgDptoCltv";
        desde: string;
        hasta: string;
    }
    export interface IidComprobanteAsociado {
        CUITEmisor: "minExclusive" | "maxInclusive";
        codTipoCmp: number;
        ptoVta: "minInclusive" | "maxInclusive";
        nroCmp: "minInclusive" | "maxInclusive";
    }
    export interface IreferenciasComerciales {
        texto: string;
    }
    export interface IsubtotalIVA {
        codigo: number;
        baseImponible: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        importe: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
    }
    export interface IarraySubtotalesIVA {
        subtotalIVA: FECredServiceSOAPTypes.IsubtotalIVA[];
    }
    export interface IotroTributo {
        codigo: number;
        detalle: string;
        baseImponible: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        importe: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
    }
    export interface IarrayOtrosTributos {
        otroTributo: FECredServiceSOAPTypes.IotroTributo[];
    }
    export interface Iitem {
        orden: number;
        unidadesMtx: number;
        codigoMtx: string;
        codigo: string;
        descripcion: string;
        codNomMercosur: string;
        cantidad: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        codigoUnidadMedida: number;
        precioUnitario: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        importeBonificacion: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        codigoCondicionIVA: number;
        importeIVA: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        importeItem: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
    }
    export interface IarrayItems {
        item: FECredServiceSOAPTypes.Iitem[];
    }
    export interface Iestado {
        estado: "PendienteRecepcion" | "Recepcionado" | "Aceptado" | "Rechazado" | "InformadaAgDpto";
        fechaHoraEstado: string;
    }
    export interface ImotivoRechazo {
        codMotivo: number;
        descMotivo: string;
        justificacion: string;
    }
    export interface IarrayMotivosRechazo {
        motivoRechazo: FECredServiceSOAPTypes.ImotivoRechazo[];
    }
    export interface IctaAgente {
        cuitAgente: "minExclusive" | "maxInclusive";
        razonSocialAgente: string;
        idCuenta: string;
        denominacion: string;
    }
    export interface IinfoAgtDptoCltv {
        fechaInfo: string;
        ctaAgente: FECredServiceSOAPTypes.IctaAgente;
        recibida: "S" | "N";
        fechaLectura: string;
        fechaRecep: string;
        aceptada: "S" | "N";
        motivoRechazo: string;
        idPagoAgtDptoCltv: string;
        CBUAgtDptoCltv: string;
    }
    export interface IinfoSCA {
        fechaAceptacionFactura: string;
        informaCBUReceptor: "S" | "N";
        CBUReceptor: string;
        CBUValidada: "S" | "N";
        fechaLecturaSCA: string;
    }
    export interface IinfoTransferencia {
        infoAgtDptoCltv: FECredServiceSOAPTypes.IinfoAgtDptoCltv;
        infoSCA: FECredServiceSOAPTypes.IinfoSCA;
    }
    export interface Icomprobante {
        cuitEmisor: "minExclusive" | "maxInclusive";
        razonSocialEmi: string;
        codTipoCmp: number;
        ptovta: "minInclusive" | "maxInclusive";
        nroCmp: "minInclusive" | "maxInclusive";
        cuitReceptor: "minExclusive" | "maxInclusive";
        razonSocialRecep: string;
        tipoCodAuto: "A" | "E";
        codAutorizacion: number;
        fechaEmision: string;
        fechaPuestaDispo: string;
        fechaVenPago: string;
        fechaVenAcep: string;
        importeTotal: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        codMoneda: string;
        cotizacionMoneda: number;
        CBUEmisor: string;
        AliasEmisor: string;
        esAnulacion: "S" | "N";
        esPostAceptacion: "S" | "N";
        idComprobanteAsociado: FECredServiceSOAPTypes.IidComprobanteAsociado;
        referenciasComerciales: FECredServiceSOAPTypes.IreferenciasComerciales;
        arraySubtotalesIVA: FECredServiceSOAPTypes.IarraySubtotalesIVA;
        arrayOtrosTributos: FECredServiceSOAPTypes.IarrayOtrosTributos;
        arrayItems: FECredServiceSOAPTypes.IarrayItems;
        datosGenerales: string;
        datosComerciales: string;
        leyendaComercial: string;
        codCtaCte: number;
        estado: FECredServiceSOAPTypes.Iestado;
        tipoAcep: "Tacita" | "Expresa";
        fechaHoraAcep: string;
        arrayMotivosRechazo: FECredServiceSOAPTypes.IarrayMotivosRechazo;
        opcionTransferencia: "SCA" | "ADC";
        infoTransferencia: FECredServiceSOAPTypes.IinfoTransferencia;
    }
    export interface IarrayComprobantes {
        comprobante: FECredServiceSOAPTypes.Icomprobante[];
    }
    export interface Ievento {
        codigo: number;
        descripcion: string;
    }
    export interface IcodigoDescripcion {
        codigo: number;
        descripcion: string;
    }
    export interface IarrayObservaciones {
        codigoDescripcion: FECredServiceSOAPTypes.IcodigoDescripcion[];
    }
    export interface IarrayErrores {
        codigoDescripcion: FECredServiceSOAPTypes.IcodigoDescripcion[];
    }
    export interface IcodigoDescripcionString {
        codigo: string;
        descripcion: string;
    }
    export interface IarrayErroresFormato {
        codigoDescripcionString: FECredServiceSOAPTypes.IcodigoDescripcionString[];
    }
    export interface IconsultarCmpReturn {
        arrayComprobantes: FECredServiceSOAPTypes.IarrayComprobantes;
        nroPagina: number;
        hayMas: "S" | "N";
        evento: FECredServiceSOAPTypes.Ievento;
        arrayObservaciones: FECredServiceSOAPTypes.IarrayObservaciones;
        arrayErrores: FECredServiceSOAPTypes.IarrayErrores;
        arrayErroresFormato: FECredServiceSOAPTypes.IarrayErroresFormato;
    }
    export interface IidComprobante {
        CUITEmisor: "minExclusive" | "maxInclusive";
        codTipoCmp: number;
        ptoVta: "minInclusive" | "maxInclusive";
        nroCmp: "minInclusive" | "maxInclusive";
    }
    export interface IrechazarNotaDCReturn {
        idComprobante: FECredServiceSOAPTypes.IidComprobante;
        resultado: "A" | "O" | "R";
        evento: FECredServiceSOAPTypes.Ievento;
        arrayObservaciones: FECredServiceSOAPTypes.IarrayObservaciones;
        arrayErrores: FECredServiceSOAPTypes.IarrayErrores;
        arrayErroresFormato: FECredServiceSOAPTypes.IarrayErroresFormato;
    }
    export interface IestadoCtaCte {
        estado: "Modificable" | "Aceptada" | "Rechazada" | "CanceladaTotal" | "InformadaAgDpto";
        fechaHoraEstado: string;
    }
    export interface IidFacturaCredito {
        CUITEmisor: "minExclusive" | "maxInclusive";
        codTipoCmp: number;
        ptoVta: "minInclusive" | "maxInclusive";
        nroCmp: "minInclusive" | "maxInclusive";
    }
    export interface IinfoCtaCte {
        codCtaCte: number;
        estadoCtaCte: FECredServiceSOAPTypes.IestadoCtaCte;
        idFacturaCredito: FECredServiceSOAPTypes.IidFacturaCredito;
        importeTotalFC: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        saldo: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        saldoAceptado: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        codMoneda: string;
        opcionTransferencia: "SCA" | "ADC";
    }
    export interface IarrayInfosCtaCte {
        infoCtaCte: FECredServiceSOAPTypes.IinfoCtaCte[];
    }
    export interface IconsultarCtasCtesReturn {
        arrayInfosCtaCte: FECredServiceSOAPTypes.IarrayInfosCtaCte;
        nroPagina: number;
        hayMas: "S" | "N";
        evento: FECredServiceSOAPTypes.Ievento;
        arrayObservaciones: FECredServiceSOAPTypes.IarrayObservaciones;
        arrayErrores: FECredServiceSOAPTypes.IarrayErrores;
        arrayErroresFormato: FECredServiceSOAPTypes.IarrayErroresFormato;
    }
    export interface IidFactura {
        CUITEmisor: "minExclusive" | "maxInclusive";
        codTipoCmp: number;
        ptoVta: "minInclusive" | "maxInclusive";
        nroCmp: "minInclusive" | "maxInclusive";
    }
    export interface IidCtaCte {
        codCtaCte: number;
        idFactura: FECredServiceSOAPTypes.IidFactura;
    }
    export interface Ifactura {
        cuitEmisor: "minExclusive" | "maxInclusive";
        razonSocialEmi: string;
        codTipoCmp: number;
        ptovta: "minInclusive" | "maxInclusive";
        nroCmp: "minInclusive" | "maxInclusive";
        cuitReceptor: "minExclusive" | "maxInclusive";
        razonSocialRecep: string;
        tipoCodAuto: "A" | "E";
        codAutorizacion: number;
        fechaEmision: string;
        fechaPuestaDispo: string;
        fechaVenPago: string;
        fechaVenAcep: string;
        importeTotal: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        codMoneda: string;
        cotizacionMoneda: number;
        CBUEmisor: string;
        AliasEmisor: string;
        esAnulacion: "S" | "N";
        esPostAceptacion: "S" | "N";
        idComprobanteAsociado: FECredServiceSOAPTypes.IidComprobanteAsociado;
        referenciasComerciales: FECredServiceSOAPTypes.IreferenciasComerciales;
        arraySubtotalesIVA: FECredServiceSOAPTypes.IarraySubtotalesIVA;
        arrayOtrosTributos: FECredServiceSOAPTypes.IarrayOtrosTributos;
        arrayItems: FECredServiceSOAPTypes.IarrayItems;
        datosGenerales: string;
        datosComerciales: string;
        leyendaComercial: string;
        codCtaCte: number;
        estado: FECredServiceSOAPTypes.Iestado;
        tipoAcep: "Tacita" | "Expresa";
        fechaHoraAcep: string;
        arrayMotivosRechazo: FECredServiceSOAPTypes.IarrayMotivosRechazo;
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
        codTipo: number;
        importe: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        porcentaje: "maxInclusive" | "minInclusive";
        descMotivo: string;
    }
    export interface IarrayRetenciones {
        retencion: FECredServiceSOAPTypes.Iretencion[];
    }
    export interface Iajuste {
        codigo: number;
        importe: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
    }
    export interface IarrayAjustesOperacion {
        ajuste: FECredServiceSOAPTypes.Iajuste[];
    }
    export interface IctaCte {
        codCtaCte: number;
        estadoCtaCte: FECredServiceSOAPTypes.IestadoCtaCte;
        factura: FECredServiceSOAPTypes.Ifactura;
        arrayNotasDCAsociadas: FECredServiceSOAPTypes.IarrayNotasDCAsociadas;
        arrayFormasCancelacion: FECredServiceSOAPTypes.IarrayFormasCancelacion;
        arrayRetenciones: FECredServiceSOAPTypes.IarrayRetenciones;
        arrayAjustesOperacion: FECredServiceSOAPTypes.IarrayAjustesOperacion;
        importeInicial: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        importeTotalNotasDC: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        importeCancelado: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        importeTotalRetPesos: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        importeEmbargoPesos: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        saldoAceptado: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        saldo: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        codMoneda: string;
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
        resultado: "A" | "O" | "R";
        idCtaCte: FECredServiceSOAPTypes.IidCtaCte;
        evento: FECredServiceSOAPTypes.Ievento;
        arrayObservaciones: FECredServiceSOAPTypes.IarrayObservaciones;
        arrayErrores: FECredServiceSOAPTypes.IarrayErrores;
        arrayErroresFormato: FECredServiceSOAPTypes.IarrayErroresFormato;
    }
    export interface IidNota {
        CUITEmisor: "minExclusive" | "maxInclusive";
        codTipoCmp: number;
        ptoVta: "minInclusive" | "maxInclusive";
        nroCmp: "minInclusive" | "maxInclusive";
    }
    export interface IconfirmarNota {
        acepta: "S" | "N";
        idNota: FECredServiceSOAPTypes.IidNota;
    }
    export interface IarrayConfirmarNotasDC {
        confirmarNota: FECredServiceSOAPTypes.IconfirmarNota[];
    }
    export interface IfiltroFecha {
        tipo: "Emision" | "PuestaDispo" | "VenPago" | "VenAcep" | "Acep" | "InfoAgDptoCltv";
        desde: string;
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
        cuitAgente: "minExclusive" | "maxInclusive";
        razonSocialAgente: string;
        idCuenta: string;
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
        respuesta: "S" | "N";
        desde: string;
        arrayObservacion: FECredServiceSOAPTypes.IarrayObservacion;
        arrayErrores: FECredServiceSOAPTypes.IarrayErrores;
        arrayErroresFormato: FECredServiceSOAPTypes.IarrayErroresFormato;
    }
    export interface ItipoRetencion {
        codigoJurisdiccion: number;
        descripcionJurisdiccion: string;
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
        CUITEmisor: "minExclusive" | "maxInclusive";
        codTipoCmp: number;
        ptoVta: "minInclusive" | "maxInclusive";
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
                estado: "PendienteRecepcion" | "Recepcionado" | "Aceptado" | "Rechazado" | "InformadaAgDpto";
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
                estado: "Modificable" | "Aceptada" | "Rechazada" | "CanceladaTotal" | "InformadaAgDpto";
                fechaHoraEstado: string;
            }>;
        };
        arrayErrores: FECredServiceSOAPTypes.IarrayErrores;
        arrayErroresFormato: FECredServiceSOAPTypes.IarrayErroresFormato;
    }
    export interface IconsultarMontoObligadoRecepcionReturn {
        obligado: "S" | "N";
        montoDesde: "minInclusive" | "maxInclusive" | "totalDigits" | "fractionDigits";
        arrayObservacion: FECredServiceSOAPTypes.IarrayObservacion;
        arrayErrores: FECredServiceSOAPTypes.IarrayErrores;
        arrayErroresFormato: FECredServiceSOAPTypes.IarrayErroresFormato;
    }
}
