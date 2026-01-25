import { Client } from "soap";
import { SoapAsyncFunc } from "@infrastructure/types";

export interface IFEXAuthorizeInput {
  Cmp: Record<string, any>;
}

export interface IFEXAuthorizeOutput {
  FEXAuthorizeResult: any;
}

export interface IFEXGetCMPInput {
  Cmp: Record<string, any>;
}

export interface IFEXGetCMPOutput {
  FEXGetCMPResult: any;
}

export interface IFEXGetLast_CMPInput {
  Auth: Record<string, any>;
}

export interface IFEXGetLast_CMPOutput {
  FEXGetLast_CMPResult: any;
}

export interface IFEXGetLast_IDInput {}

export interface IFEXGetLast_IDOutput {
  FEXGetLast_IDResult: any;
}

export interface IFEXCheck_PermisoInput {
  ID_Permiso?: string;
  Dst_merc: number;
}

export interface IFEXCheck_PermisoOutput {
  FEXCheck_PermisoResult: any;
}

export interface IFEXDummyInput {}

export interface IFEXDummyOutput {
  FEXDummyResult: any;
}

export interface IFEXGetPARAM_PtoVentaInput {}
export interface IFEXGetPARAM_PtoVentaOutput {
  FEXGetPARAM_PtoVentaResult: any;
}

export interface IFEXGetPARAM_Cbte_TipoInput {}
export interface IFEXGetPARAM_Cbte_TipoOutput {
  FEXGetPARAM_Cbte_TipoResult: any;
}

export interface IFEXGetPARAM_Tipo_ExpoInput {}
export interface IFEXGetPARAM_Tipo_ExpoOutput {
  FEXGetPARAM_Tipo_ExpoResult: any;
}

export interface IFEXGetPARAM_IncotermsInput {}
export interface IFEXGetPARAM_IncotermsOutput {
  FEXGetPARAM_IncotermsResult: any;
}

export interface IFEXGetPARAM_IdiomasInput {}
export interface IFEXGetPARAM_IdiomasOutput {
  FEXGetPARAM_IdiomasResult: any;
}

export interface IFEXGetPARAM_UMedInput {}
export interface IFEXGetPARAM_UMedOutput {
  FEXGetPARAM_UMedResult: any;
}

export interface IFEXGetPARAM_DST_paisInput {}
export interface IFEXGetPARAM_DST_paisOutput {
  FEXGetPARAM_DST_paisResult: any;
}

export interface IFEXGetPARAM_DST_CUITInput {}
export interface IFEXGetPARAM_DST_CUITOutput {
  FEXGetPARAM_DST_CUITResult: any;
}

export interface IFEXGetPARAM_MONInput {}
export interface IFEXGetPARAM_MONOutput {
  FEXGetPARAM_MONResult: any;
}

export interface IFEXGetPARAM_MON_CON_COTIZACIONInput {
  Fecha_CTZ?: string;
}

export interface IFEXGetPARAM_MON_CON_COTIZACIONOutput {
  FEXGetPARAM_MON_CON_COTIZACIONResult: any;
}

export interface IFEXGetPARAM_CtzInput {
  Mon_id?: string;
  FchCotiz?: string;
}

export interface IFEXGetPARAM_CtzOutput {
  FEXGetPARAM_CtzResult: any;
}

export interface IFEXGetPARAM_OpcionalesInput {}
export interface IFEXGetPARAM_OpcionalesOutput {
  FEXGetPARAM_OpcionalesResult: any;
}

export interface IFEXGetPARAM_ActividadesInput {}
export interface IFEXGetPARAM_ActividadesOutput {
  FEXGetPARAM_ActividadesResult: any;
}

export interface IFEXServiceSoap extends Client {
  FEXAuthorizeAsync: SoapAsyncFunc<IFEXAuthorizeInput, IFEXAuthorizeOutput>;
  FEXGetCMPAsync: SoapAsyncFunc<IFEXGetCMPInput, IFEXGetCMPOutput>;
  FEXGetLast_CMPAsync: SoapAsyncFunc<IFEXGetLast_CMPInput, IFEXGetLast_CMPOutput>;
  FEXGetLast_IDAsync: SoapAsyncFunc<IFEXGetLast_IDInput, IFEXGetLast_IDOutput>;
  FEXCheck_PermisoAsync: SoapAsyncFunc<
    IFEXCheck_PermisoInput,
    IFEXCheck_PermisoOutput
  >;
  FEXDummyAsync: SoapAsyncFunc<IFEXDummyInput, IFEXDummyOutput>;
  FEXGetPARAM_PtoVentaAsync: SoapAsyncFunc<
    IFEXGetPARAM_PtoVentaInput,
    IFEXGetPARAM_PtoVentaOutput
  >;
  FEXGetPARAM_Cbte_TipoAsync: SoapAsyncFunc<
    IFEXGetPARAM_Cbte_TipoInput,
    IFEXGetPARAM_Cbte_TipoOutput
  >;
  FEXGetPARAM_Tipo_ExpoAsync: SoapAsyncFunc<
    IFEXGetPARAM_Tipo_ExpoInput,
    IFEXGetPARAM_Tipo_ExpoOutput
  >;
  FEXGetPARAM_IncotermsAsync: SoapAsyncFunc<
    IFEXGetPARAM_IncotermsInput,
    IFEXGetPARAM_IncotermsOutput
  >;
  FEXGetPARAM_IdiomasAsync: SoapAsyncFunc<
    IFEXGetPARAM_IdiomasInput,
    IFEXGetPARAM_IdiomasOutput
  >;
  FEXGetPARAM_UMedAsync: SoapAsyncFunc<
    IFEXGetPARAM_UMedInput,
    IFEXGetPARAM_UMedOutput
  >;
  FEXGetPARAM_DST_paisAsync: SoapAsyncFunc<
    IFEXGetPARAM_DST_paisInput,
    IFEXGetPARAM_DST_paisOutput
  >;
  FEXGetPARAM_DST_CUITAsync: SoapAsyncFunc<
    IFEXGetPARAM_DST_CUITInput,
    IFEXGetPARAM_DST_CUITOutput
  >;
  FEXGetPARAM_MONAsync: SoapAsyncFunc<
    IFEXGetPARAM_MONInput,
    IFEXGetPARAM_MONOutput
  >;
  FEXGetPARAM_MON_CON_COTIZACIONAsync: SoapAsyncFunc<
    IFEXGetPARAM_MON_CON_COTIZACIONInput,
    IFEXGetPARAM_MON_CON_COTIZACIONOutput
  >;
  FEXGetPARAM_CtzAsync: SoapAsyncFunc<
    IFEXGetPARAM_CtzInput,
    IFEXGetPARAM_CtzOutput
  >;
  FEXGetPARAM_OpcionalesAsync: SoapAsyncFunc<
    IFEXGetPARAM_OpcionalesInput,
    IFEXGetPARAM_OpcionalesOutput
  >;
  FEXGetPARAM_ActividadesAsync: SoapAsyncFunc<
    IFEXGetPARAM_ActividadesInput,
    IFEXGetPARAM_ActividadesOutput
  >;
}