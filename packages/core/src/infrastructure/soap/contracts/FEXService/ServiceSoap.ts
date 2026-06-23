/**
 * SOAP client interface (generated). DTOs: @application/dto/fex/service-soap.types
 * Regenerate: npm run generate:soap-interfaces
 */
export * from "@application/dto/fex/service-soap.types";

import type {
  IFEXAuthorizeInput,
  IFEXAuthorizeOutput,
  IFEXCheck_PermisoInput,
  IFEXCheck_PermisoOutput,
  IFEXDummyInput,
  IFEXDummyOutput,
  IFEXGetCMPInput,
  IFEXGetCMPOutput,
  IFEXGetLast_CMPInput,
  IFEXGetLast_CMPOutput,
  IFEXGetLast_IDInput,
  IFEXGetLast_IDOutput,
  IFEXGetPARAM_ActividadesInput,
  IFEXGetPARAM_ActividadesOutput,
  IFEXGetPARAM_Cbte_TipoInput,
  IFEXGetPARAM_Cbte_TipoOutput,
  IFEXGetPARAM_CtzInput,
  IFEXGetPARAM_CtzOutput,
  IFEXGetPARAM_DST_CUITInput,
  IFEXGetPARAM_DST_CUITOutput,
  IFEXGetPARAM_DST_paisInput,
  IFEXGetPARAM_DST_paisOutput,
  IFEXGetPARAM_IdiomasInput,
  IFEXGetPARAM_IdiomasOutput,
  IFEXGetPARAM_IncotermsInput,
  IFEXGetPARAM_IncotermsOutput,
  IFEXGetPARAM_MONInput,
  IFEXGetPARAM_MONOutput,
  IFEXGetPARAM_MON_CON_COTIZACIONInput,
  IFEXGetPARAM_MON_CON_COTIZACIONOutput,
  IFEXGetPARAM_OpcionalesInput,
  IFEXGetPARAM_OpcionalesOutput,
  IFEXGetPARAM_PtoVentaInput,
  IFEXGetPARAM_PtoVentaOutput,
  IFEXGetPARAM_Tipo_ExpoInput,
  IFEXGetPARAM_Tipo_ExpoOutput,
  IFEXGetPARAM_UMedInput,
  IFEXGetPARAM_UMedOutput,
} from "@application/dto/fex/service-soap.types";

import { Client } from "soap";

export interface IServiceSoapSoap extends Client {
    FEXAuthorize: (input: IFEXAuthorizeInput, cb: (err: any | null, result: IFEXAuthorizeOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetCMP: (input: IFEXGetCMPInput, cb: (err: any | null, result: IFEXGetCMPOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetPARAM_Cbte_Tipo: (input: IFEXGetPARAM_Cbte_TipoInput, cb: (err: any | null, result: IFEXGetPARAM_Cbte_TipoOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetPARAM_Tipo_Expo: (input: IFEXGetPARAM_Tipo_ExpoInput, cb: (err: any | null, result: IFEXGetPARAM_Tipo_ExpoOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetPARAM_Incoterms: (input: IFEXGetPARAM_IncotermsInput, cb: (err: any | null, result: IFEXGetPARAM_IncotermsOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetPARAM_Idiomas: (input: IFEXGetPARAM_IdiomasInput, cb: (err: any | null, result: IFEXGetPARAM_IdiomasOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetPARAM_UMed: (input: IFEXGetPARAM_UMedInput, cb: (err: any | null, result: IFEXGetPARAM_UMedOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetPARAM_DST_pais: (input: IFEXGetPARAM_DST_paisInput, cb: (err: any | null, result: IFEXGetPARAM_DST_paisOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetPARAM_DST_CUIT: (input: IFEXGetPARAM_DST_CUITInput, cb: (err: any | null, result: IFEXGetPARAM_DST_CUITOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetPARAM_MON: (input: IFEXGetPARAM_MONInput, cb: (err: any | null, result: IFEXGetPARAM_MONOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetPARAM_MON_CON_COTIZACION: (input: IFEXGetPARAM_MON_CON_COTIZACIONInput, cb: (err: any | null, result: IFEXGetPARAM_MON_CON_COTIZACIONOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetLast_CMP: (input: IFEXGetLast_CMPInput, cb: (err: any | null, result: IFEXGetLast_CMPOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXDummy: (input: IFEXDummyInput, cb: (err: any | null, result: IFEXDummyOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetPARAM_Ctz: (input: IFEXGetPARAM_CtzInput, cb: (err: any | null, result: IFEXGetPARAM_CtzOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetLast_ID: (input: IFEXGetLast_IDInput, cb: (err: any | null, result: IFEXGetLast_IDOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetPARAM_PtoVenta: (input: IFEXGetPARAM_PtoVentaInput, cb: (err: any | null, result: IFEXGetPARAM_PtoVentaOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXCheck_Permiso: (input: IFEXCheck_PermisoInput, cb: (err: any | null, result: IFEXCheck_PermisoOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetPARAM_Opcionales: (input: IFEXGetPARAM_OpcionalesInput, cb: (err: any | null, result: IFEXGetPARAM_OpcionalesOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetPARAM_Actividades: (input: IFEXGetPARAM_ActividadesInput, cb: (err: any | null, result: IFEXGetPARAM_ActividadesOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;

    FEXAuthorizeAsync: (input: IFEXAuthorizeInput) => Promise<[IFEXAuthorizeOutput, string, {[k: string]: any}, any]>;
    FEXGetCMPAsync: (input: IFEXGetCMPInput) => Promise<[IFEXGetCMPOutput, string, {[k: string]: any}, any]>;
    FEXGetPARAM_Cbte_TipoAsync: (input: IFEXGetPARAM_Cbte_TipoInput) => Promise<[IFEXGetPARAM_Cbte_TipoOutput, string, {[k: string]: any}, any]>;
    FEXGetPARAM_Tipo_ExpoAsync: (input: IFEXGetPARAM_Tipo_ExpoInput) => Promise<[IFEXGetPARAM_Tipo_ExpoOutput, string, {[k: string]: any}, any]>;
    FEXGetPARAM_IncotermsAsync: (input: IFEXGetPARAM_IncotermsInput) => Promise<[IFEXGetPARAM_IncotermsOutput, string, {[k: string]: any}, any]>;
    FEXGetPARAM_IdiomasAsync: (input: IFEXGetPARAM_IdiomasInput) => Promise<[IFEXGetPARAM_IdiomasOutput, string, {[k: string]: any}, any]>;
    FEXGetPARAM_UMedAsync: (input: IFEXGetPARAM_UMedInput) => Promise<[IFEXGetPARAM_UMedOutput, string, {[k: string]: any}, any]>;
    FEXGetPARAM_DST_paisAsync: (input: IFEXGetPARAM_DST_paisInput) => Promise<[IFEXGetPARAM_DST_paisOutput, string, {[k: string]: any}, any]>;
    FEXGetPARAM_DST_CUITAsync: (input: IFEXGetPARAM_DST_CUITInput) => Promise<[IFEXGetPARAM_DST_CUITOutput, string, {[k: string]: any}, any]>;
    FEXGetPARAM_MONAsync: (input: IFEXGetPARAM_MONInput) => Promise<[IFEXGetPARAM_MONOutput, string, {[k: string]: any}, any]>;
    FEXGetPARAM_MON_CON_COTIZACIONAsync: (input: IFEXGetPARAM_MON_CON_COTIZACIONInput) => Promise<[IFEXGetPARAM_MON_CON_COTIZACIONOutput, string, {[k: string]: any}, any]>;
    FEXGetLast_CMPAsync: (input: IFEXGetLast_CMPInput) => Promise<[IFEXGetLast_CMPOutput, string, {[k: string]: any}, any]>;
    FEXDummyAsync: (input: IFEXDummyInput) => Promise<[IFEXDummyOutput, string, {[k: string]: any}, any]>;
    FEXGetPARAM_CtzAsync: (input: IFEXGetPARAM_CtzInput) => Promise<[IFEXGetPARAM_CtzOutput, string, {[k: string]: any}, any]>;
    FEXGetLast_IDAsync: (input: IFEXGetLast_IDInput) => Promise<[IFEXGetLast_IDOutput, string, {[k: string]: any}, any]>;
    FEXGetPARAM_PtoVentaAsync: (input: IFEXGetPARAM_PtoVentaInput) => Promise<[IFEXGetPARAM_PtoVentaOutput, string, {[k: string]: any}, any]>;
    FEXCheck_PermisoAsync: (input: IFEXCheck_PermisoInput) => Promise<[IFEXCheck_PermisoOutput, string, {[k: string]: any}, any]>;
    FEXGetPARAM_OpcionalesAsync: (input: IFEXGetPARAM_OpcionalesInput) => Promise<[IFEXGetPARAM_OpcionalesOutput, string, {[k: string]: any}, any]>;
    FEXGetPARAM_ActividadesAsync: (input: IFEXGetPARAM_ActividadesInput) => Promise<[IFEXGetPARAM_ActividadesOutput, string, {[k: string]: any}, any]>;
}
