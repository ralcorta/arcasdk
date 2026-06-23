/**
 * SOAP client interface (generated). DTOs: @application/dto/electronic-billing/wsfe-service-soap.types
 * Regenerate: npm run generate:soap-interfaces
 */
export * from "@application/dto/electronic-billing/wsfe-service-soap.types";

import type {
  IFECAEAConsultarInput,
  IFECAEAConsultarOutput,
  IFECAEARegInformativoInput,
  IFECAEARegInformativoOutput,
  IFECAEASinMovimientoConsultarInput,
  IFECAEASinMovimientoConsultarOutput,
  IFECAEASinMovimientoInformarInput,
  IFECAEASinMovimientoInformarOutput,
  IFECAEASolicitarInput,
  IFECAEASolicitarOutput,
  IFECAESolicitarInput,
  IFECAESolicitarOutput,
  IFECompConsultarInput,
  IFECompConsultarOutput,
  IFECompTotXRequestInput,
  IFECompTotXRequestOutput,
  IFECompUltimoAutorizadoInput,
  IFECompUltimoAutorizadoOutput,
  IFEDummyInput,
  IFEDummyOutput,
  IFEParamGetActividadesInput,
  IFEParamGetActividadesOutput,
  IFEParamGetCondicionIvaReceptorInput,
  IFEParamGetCondicionIvaReceptorOutput,
  IFEParamGetCotizacionInput,
  IFEParamGetCotizacionOutput,
  IFEParamGetPtosVentaInput,
  IFEParamGetPtosVentaOutput,
  IFEParamGetTiposCbteInput,
  IFEParamGetTiposCbteOutput,
  IFEParamGetTiposConceptoInput,
  IFEParamGetTiposConceptoOutput,
  IFEParamGetTiposDocInput,
  IFEParamGetTiposDocOutput,
  IFEParamGetTiposIvaInput,
  IFEParamGetTiposIvaOutput,
  IFEParamGetTiposMonedasInput,
  IFEParamGetTiposMonedasOutput,
  IFEParamGetTiposOpcionalInput,
  IFEParamGetTiposOpcionalOutput,
  IFEParamGetTiposPaisesInput,
  IFEParamGetTiposPaisesOutput,
  IFEParamGetTiposTributosInput,
  IFEParamGetTiposTributosOutput,
} from "@application/dto/electronic-billing/wsfe-service-soap.types";

import { Client } from "soap";

export interface IServiceSoapSoap extends Client {
    FECAESolicitar: (input: IFECAESolicitarInput, cb: (err: any | null, result: IFECAESolicitarOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FECompTotXRequest: (input: IFECompTotXRequestInput, cb: (err: any | null, result: IFECompTotXRequestOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEDummy: (input: IFEDummyInput, cb: (err: any | null, result: IFEDummyOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FECompUltimoAutorizado: (input: IFECompUltimoAutorizadoInput, cb: (err: any | null, result: IFECompUltimoAutorizadoOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FECompConsultar: (input: IFECompConsultarInput, cb: (err: any | null, result: IFECompConsultarOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FECAEARegInformativo: (input: IFECAEARegInformativoInput, cb: (err: any | null, result: IFECAEARegInformativoOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FECAEASolicitar: (input: IFECAEASolicitarInput, cb: (err: any | null, result: IFECAEASolicitarOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FECAEASinMovimientoConsultar: (input: IFECAEASinMovimientoConsultarInput, cb: (err: any | null, result: IFECAEASinMovimientoConsultarOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FECAEASinMovimientoInformar: (input: IFECAEASinMovimientoInformarInput, cb: (err: any | null, result: IFECAEASinMovimientoInformarOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FECAEAConsultar: (input: IFECAEAConsultarInput, cb: (err: any | null, result: IFECAEAConsultarOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEParamGetCotizacion: (input: IFEParamGetCotizacionInput, cb: (err: any | null, result: IFEParamGetCotizacionOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEParamGetTiposTributos: (input: IFEParamGetTiposTributosInput, cb: (err: any | null, result: IFEParamGetTiposTributosOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEParamGetTiposMonedas: (input: IFEParamGetTiposMonedasInput, cb: (err: any | null, result: IFEParamGetTiposMonedasOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEParamGetTiposIva: (input: IFEParamGetTiposIvaInput, cb: (err: any | null, result: IFEParamGetTiposIvaOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEParamGetTiposOpcional: (input: IFEParamGetTiposOpcionalInput, cb: (err: any | null, result: IFEParamGetTiposOpcionalOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEParamGetTiposConcepto: (input: IFEParamGetTiposConceptoInput, cb: (err: any | null, result: IFEParamGetTiposConceptoOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEParamGetPtosVenta: (input: IFEParamGetPtosVentaInput, cb: (err: any | null, result: IFEParamGetPtosVentaOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEParamGetTiposCbte: (input: IFEParamGetTiposCbteInput, cb: (err: any | null, result: IFEParamGetTiposCbteOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEParamGetCondicionIvaReceptor: (input: IFEParamGetCondicionIvaReceptorInput, cb: (err: any | null, result: IFEParamGetCondicionIvaReceptorOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEParamGetTiposDoc: (input: IFEParamGetTiposDocInput, cb: (err: any | null, result: IFEParamGetTiposDocOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEParamGetTiposPaises: (input: IFEParamGetTiposPaisesInput, cb: (err: any | null, result: IFEParamGetTiposPaisesOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEParamGetActividades: (input: IFEParamGetActividadesInput, cb: (err: any | null, result: IFEParamGetActividadesOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;

    FECAESolicitarAsync: (input: IFECAESolicitarInput) => Promise<[IFECAESolicitarOutput, string, {[k: string]: any}, any]>;
    FECompTotXRequestAsync: (input: IFECompTotXRequestInput) => Promise<[IFECompTotXRequestOutput, string, {[k: string]: any}, any]>;
    FEDummyAsync: (input: IFEDummyInput) => Promise<[IFEDummyOutput, string, {[k: string]: any}, any]>;
    FECompUltimoAutorizadoAsync: (input: IFECompUltimoAutorizadoInput) => Promise<[IFECompUltimoAutorizadoOutput, string, {[k: string]: any}, any]>;
    FECompConsultarAsync: (input: IFECompConsultarInput) => Promise<[IFECompConsultarOutput, string, {[k: string]: any}, any]>;
    FECAEARegInformativoAsync: (input: IFECAEARegInformativoInput) => Promise<[IFECAEARegInformativoOutput, string, {[k: string]: any}, any]>;
    FECAEASolicitarAsync: (input: IFECAEASolicitarInput) => Promise<[IFECAEASolicitarOutput, string, {[k: string]: any}, any]>;
    FECAEASinMovimientoConsultarAsync: (input: IFECAEASinMovimientoConsultarInput) => Promise<[IFECAEASinMovimientoConsultarOutput, string, {[k: string]: any}, any]>;
    FECAEASinMovimientoInformarAsync: (input: IFECAEASinMovimientoInformarInput) => Promise<[IFECAEASinMovimientoInformarOutput, string, {[k: string]: any}, any]>;
    FECAEAConsultarAsync: (input: IFECAEAConsultarInput) => Promise<[IFECAEAConsultarOutput, string, {[k: string]: any}, any]>;
    FEParamGetCotizacionAsync: (input: IFEParamGetCotizacionInput) => Promise<[IFEParamGetCotizacionOutput, string, {[k: string]: any}, any]>;
    FEParamGetTiposTributosAsync: (input: IFEParamGetTiposTributosInput) => Promise<[IFEParamGetTiposTributosOutput, string, {[k: string]: any}, any]>;
    FEParamGetTiposMonedasAsync: (input: IFEParamGetTiposMonedasInput) => Promise<[IFEParamGetTiposMonedasOutput, string, {[k: string]: any}, any]>;
    FEParamGetTiposIvaAsync: (input: IFEParamGetTiposIvaInput) => Promise<[IFEParamGetTiposIvaOutput, string, {[k: string]: any}, any]>;
    FEParamGetTiposOpcionalAsync: (input: IFEParamGetTiposOpcionalInput) => Promise<[IFEParamGetTiposOpcionalOutput, string, {[k: string]: any}, any]>;
    FEParamGetTiposConceptoAsync: (input: IFEParamGetTiposConceptoInput) => Promise<[IFEParamGetTiposConceptoOutput, string, {[k: string]: any}, any]>;
    FEParamGetPtosVentaAsync: (input: IFEParamGetPtosVentaInput) => Promise<[IFEParamGetPtosVentaOutput, string, {[k: string]: any}, any]>;
    FEParamGetTiposCbteAsync: (input: IFEParamGetTiposCbteInput) => Promise<[IFEParamGetTiposCbteOutput, string, {[k: string]: any}, any]>;
    FEParamGetCondicionIvaReceptorAsync: (input: IFEParamGetCondicionIvaReceptorInput) => Promise<[IFEParamGetCondicionIvaReceptorOutput, string, {[k: string]: any}, any]>;
    FEParamGetTiposDocAsync: (input: IFEParamGetTiposDocInput) => Promise<[IFEParamGetTiposDocOutput, string, {[k: string]: any}, any]>;
    FEParamGetTiposPaisesAsync: (input: IFEParamGetTiposPaisesInput) => Promise<[IFEParamGetTiposPaisesOutput, string, {[k: string]: any}, any]>;
    FEParamGetActividadesAsync: (input: IFEParamGetActividadesInput) => Promise<[IFEParamGetActividadesOutput, string, {[k: string]: any}, any]>;
}
