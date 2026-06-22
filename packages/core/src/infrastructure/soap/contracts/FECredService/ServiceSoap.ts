/**
 * SOAP client interface (generated). DTOs: @application/dto/fecred/service-soap.types
 * Regenerate: npm run generate:soap-interfaces
 */
export * from "@application/dto/fecred/service-soap.types";

import type {
  IaceptarFECredInput,
  IaceptarFECredOutput,
  IconsultarComprobantesInput,
  IconsultarComprobantesOutput,
  IconsultarCtaCteInput,
  IconsultarCtaCteOutput,
  IconsultarCtasCtesInput,
  IconsultarCtasCtesOutput,
  IconsultarCuentasEnAgtDptoCltvInput,
  IconsultarCuentasEnAgtDptoCltvOutput,
  IconsultarFacturasAgtDptoCltvInput,
  IconsultarFacturasAgtDptoCltvOutput,
  IconsultarHistorialEstadosComprobanteInput,
  IconsultarHistorialEstadosComprobanteOutput,
  IconsultarHistorialEstadosCtaCteInput,
  IconsultarHistorialEstadosCtaCteOutput,
  IconsultarMontoObligadoRecepcionInput,
  IconsultarMontoObligadoRecepcionOutput,
  IconsultarObligadoRecepcionInput,
  IconsultarObligadoRecepcionOutput,
  IconsultarTiposAjustesOperacionInput,
  IconsultarTiposAjustesOperacionOutput,
  IconsultarTiposFormasCancelacionInput,
  IconsultarTiposFormasCancelacionOutput,
  IconsultarTiposMotivosRechazoInput,
  IconsultarTiposMotivosRechazoOutput,
  IconsultarTiposRetencionesInput,
  IconsultarTiposRetencionesOutput,
  IdummyInput,
  IdummyOutput,
  IinformarCancelacionTotalFECredInput,
  IinformarCancelacionTotalFECredOutput,
  IinformarFacturaAgtDptoCltvInput,
  IinformarFacturaAgtDptoCltvOutput,
  ImodificarOpcionTransferenciaInput,
  ImodificarOpcionTransferenciaOutput,
  IobtenerRemitosInput,
  IobtenerRemitosOutput,
  IrechazarFECredInput,
  IrechazarFECredOutput,
  IrechazarNotaDCInput,
  IrechazarNotaDCOutput,
} from "@application/dto/fecred/service-soap.types";

import { Client } from "soap";

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
