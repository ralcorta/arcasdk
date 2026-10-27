/**
 * SOAP client interface (generated). DTOs: @application/dto/cdc/service-soap.types
 * Regenerate: npm run generate:soap-interfaces
 */
export * from "@application/dto/cdc/service-soap.types";

import type {
  IComprobanteConstatarInput,
  IComprobanteConstatarOutput,
  IComprobanteDummyInput,
  IComprobanteDummyOutput,
  IComprobantesModalidadConsultarInput,
  IComprobantesModalidadConsultarOutput,
  IComprobantesTipoConsultarInput,
  IComprobantesTipoConsultarOutput,
  IDocumentosTipoConsultarInput,
  IDocumentosTipoConsultarOutput,
  IOpcionalesTipoConsultarInput,
  IOpcionalesTipoConsultarOutput,
} from "@application/dto/cdc/service-soap.types";

import { Client } from "soap";

export interface IServiceSoapSoap extends Client {
    ComprobantesModalidadConsultar: (input: IComprobantesModalidadConsultarInput, cb: (err: any | null, result: IComprobantesModalidadConsultarOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    ComprobantesTipoConsultar: (input: IComprobantesTipoConsultarInput, cb: (err: any | null, result: IComprobantesTipoConsultarOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    DocumentosTipoConsultar: (input: IDocumentosTipoConsultarInput, cb: (err: any | null, result: IDocumentosTipoConsultarOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    OpcionalesTipoConsultar: (input: IOpcionalesTipoConsultarInput, cb: (err: any | null, result: IOpcionalesTipoConsultarOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    ComprobanteConstatar: (input: IComprobanteConstatarInput, cb: (err: any | null, result: IComprobanteConstatarOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    ComprobanteDummy: (input: IComprobanteDummyInput, cb: (err: any | null, result: IComprobanteDummyOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;

    ComprobantesModalidadConsultarAsync: (input: IComprobantesModalidadConsultarInput) => Promise<[IComprobantesModalidadConsultarOutput, string, {[k: string]: any}, any]>;
    ComprobantesTipoConsultarAsync: (input: IComprobantesTipoConsultarInput) => Promise<[IComprobantesTipoConsultarOutput, string, {[k: string]: any}, any]>;
    DocumentosTipoConsultarAsync: (input: IDocumentosTipoConsultarInput) => Promise<[IDocumentosTipoConsultarOutput, string, {[k: string]: any}, any]>;
    OpcionalesTipoConsultarAsync: (input: IOpcionalesTipoConsultarInput) => Promise<[IOpcionalesTipoConsultarOutput, string, {[k: string]: any}, any]>;
    ComprobanteConstatarAsync: (input: IComprobanteConstatarInput) => Promise<[IComprobanteConstatarOutput, string, {[k: string]: any}, any]>;
    ComprobanteDummyAsync: (input: IComprobanteDummyInput) => Promise<[IComprobanteDummyOutput, string, {[k: string]: any}, any]>;
}
