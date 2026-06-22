import {
  IFEXAuthorizeInput,
  IFEXAuthorizeOutput,
  IFEXGetCMPInput,
  IFEXGetCMPOutput,
  IFEXGetLast_CMPInput,
  IFEXGetLast_CMPOutput,
  IFEXGetLast_IDInput,
  IFEXGetLast_IDOutput,
  IFEXCheck_PermisoInput,
  IFEXCheck_PermisoOutput,
  IFEXGetPARAM_Cbte_TipoInput,
  IFEXGetPARAM_Cbte_TipoOutput,
  IFEXGetPARAM_Tipo_ExpoInput,
  IFEXGetPARAM_Tipo_ExpoOutput,
  IFEXGetPARAM_IncotermsInput,
  IFEXGetPARAM_IncotermsOutput,
  IFEXGetPARAM_IdiomasInput,
  IFEXGetPARAM_IdiomasOutput,
  IFEXGetPARAM_UMedInput,
  IFEXGetPARAM_UMedOutput,
  IFEXGetPARAM_DST_paisInput,
  IFEXGetPARAM_DST_paisOutput,
  IFEXGetPARAM_DST_CUITInput,
  IFEXGetPARAM_DST_CUITOutput,
  IFEXGetPARAM_MONInput,
  IFEXGetPARAM_MONOutput,
  IFEXGetPARAM_MON_CON_COTIZACIONInput,
  IFEXGetPARAM_MON_CON_COTIZACIONOutput,
  IFEXGetPARAM_CtzInput,
  IFEXGetPARAM_CtzOutput,
  IFEXGetPARAM_PtoVentaInput,
  IFEXGetPARAM_PtoVentaOutput,
  IFEXGetPARAM_OpcionalesInput,
  IFEXGetPARAM_OpcionalesOutput,
  IFEXGetPARAM_ActividadesInput,
  IFEXGetPARAM_ActividadesOutput,
  IFEXDummyOutput,
} from "@application/dto/fex";

export interface IFexRepositoryPort {
  
  authorize(input: IFEXAuthorizeInput): Promise<IFEXAuthorizeOutput>;

  
  getCmp(input: IFEXGetCMPInput): Promise<IFEXGetCMPOutput>;

  
  getLastCmp(input: IFEXGetLast_CMPInput): Promise<IFEXGetLast_CMPOutput>;

  
  getLastId(input: IFEXGetLast_IDInput): Promise<IFEXGetLast_IDOutput>;

  
  checkPermiso(input: IFEXCheck_PermisoInput): Promise<IFEXCheck_PermisoOutput>;

  
  getParamCbteTipo(input: IFEXGetPARAM_Cbte_TipoInput): Promise<IFEXGetPARAM_Cbte_TipoOutput>;

  
  getParamTipoExpo(input: IFEXGetPARAM_Tipo_ExpoInput): Promise<IFEXGetPARAM_Tipo_ExpoOutput>;

  
  getParamIncoterms(input: IFEXGetPARAM_IncotermsInput): Promise<IFEXGetPARAM_IncotermsOutput>;

  
  getParamIdiomas(input: IFEXGetPARAM_IdiomasInput): Promise<IFEXGetPARAM_IdiomasOutput>;

  
  getParamUMed(input: IFEXGetPARAM_UMedInput): Promise<IFEXGetPARAM_UMedOutput>;

  
  getParamDstPais(input: IFEXGetPARAM_DST_paisInput): Promise<IFEXGetPARAM_DST_paisOutput>;

  
  getParamDstCuit(input: IFEXGetPARAM_DST_CUITInput): Promise<IFEXGetPARAM_DST_CUITOutput>;

  
  getParamMon(input: IFEXGetPARAM_MONInput): Promise<IFEXGetPARAM_MONOutput>;

  
  getParamMonConCotizacion(input: IFEXGetPARAM_MON_CON_COTIZACIONInput): Promise<IFEXGetPARAM_MON_CON_COTIZACIONOutput>;

  
  getParamCtz(input: IFEXGetPARAM_CtzInput): Promise<IFEXGetPARAM_CtzOutput>;

  
  getParamPtoVenta(input: IFEXGetPARAM_PtoVentaInput): Promise<IFEXGetPARAM_PtoVentaOutput>;

  
  getParamOpcionales(input: IFEXGetPARAM_OpcionalesInput): Promise<IFEXGetPARAM_OpcionalesOutput>;

  
  getParamActividades(input: IFEXGetPARAM_ActividadesInput): Promise<IFEXGetPARAM_ActividadesOutput>;

  
  dummy(): Promise<IFEXDummyOutput>;
}
