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
  /**
   * Authorize an export invoice
   * @param input Authorization request data
   * @returns Authorization result with CAE
   */
  authorize(input: IFEXAuthorizeInput): Promise<IFEXAuthorizeOutput>;

  /**
   * Get an existing export invoice
   * @param input Invoice query parameters
   * @returns Invoice details
   */
  getCmp(input: IFEXGetCMPInput): Promise<IFEXGetCMPOutput>;

  /**
   * Get last authorized export invoice number
   * @param input Point of sale and invoice type
   * @returns Last invoice number
   */
  getLastCmp(input: IFEXGetLast_CMPInput): Promise<IFEXGetLast_CMPOutput>;

  /**
   * Get last used request ID
   * @param input Authentication data
   * @returns Last request ID
   */
  getLastId(input: IFEXGetLast_IDInput): Promise<IFEXGetLast_IDOutput>;

  /**
   * Check export permit validity
   * @param input Permit ID and destination
   * @returns Permit check result
   */
  checkPermiso(input: IFEXCheck_PermisoInput): Promise<IFEXCheck_PermisoOutput>;

  /**
   * Get available invoice types
   * @param input Authentication data
   * @returns Invoice types list
   */
  getParamCbteTipo(input: IFEXGetPARAM_Cbte_TipoInput): Promise<IFEXGetPARAM_Cbte_TipoOutput>;

  /**
   * Get available export types
   * @param input Authentication data
   * @returns Export types list
   */
  getParamTipoExpo(input: IFEXGetPARAM_Tipo_ExpoInput): Promise<IFEXGetPARAM_Tipo_ExpoOutput>;

  /**
   * Get available Incoterms
   * @param input Authentication data
   * @returns Incoterms list
   */
  getParamIncoterms(input: IFEXGetPARAM_IncotermsInput): Promise<IFEXGetPARAM_IncotermsOutput>;

  /**
   * Get available languages
   * @param input Authentication data
   * @returns Languages list
   */
  getParamIdiomas(input: IFEXGetPARAM_IdiomasInput): Promise<IFEXGetPARAM_IdiomasOutput>;

  /**
   * Get available units of measurement
   * @param input Authentication data
   * @returns Units of measurement list
   */
  getParamUMed(input: IFEXGetPARAM_UMedInput): Promise<IFEXGetPARAM_UMedOutput>;

  /**
   * Get available destination countries
   * @param input Authentication data
   * @returns Countries list
   */
  getParamDstPais(input: IFEXGetPARAM_DST_paisInput): Promise<IFEXGetPARAM_DST_paisOutput>;

  /**
   * Get available destination CUITs
   * @param input Authentication data
   * @returns Destination CUITs list
   */
  getParamDstCuit(input: IFEXGetPARAM_DST_CUITInput): Promise<IFEXGetPARAM_DST_CUITOutput>;

  /**
   * Get available currencies
   * @param input Authentication data
   * @returns Currencies list
   */
  getParamMon(input: IFEXGetPARAM_MONInput): Promise<IFEXGetPARAM_MONOutput>;

  /**
   * Get currencies with current exchange rates
   * @param input Authentication data and date
   * @returns Currencies with exchange rates
   */
  getParamMonConCotizacion(input: IFEXGetPARAM_MON_CON_COTIZACIONInput): Promise<IFEXGetPARAM_MON_CON_COTIZACIONOutput>;

  /**
   * Get exchange rate for a specific currency
   * @param input Currency ID and date
   * @returns Exchange rate
   */
  getParamCtz(input: IFEXGetPARAM_CtzInput): Promise<IFEXGetPARAM_CtzOutput>;

  /**
   * Get available sales points
   * @param input Authentication data
   * @returns Sales points list
   */
  getParamPtoVenta(input: IFEXGetPARAM_PtoVentaInput): Promise<IFEXGetPARAM_PtoVentaOutput>;

  /**
   * Get available optional fields
   * @param input Authentication data
   * @returns Optional fields list
   */
  getParamOpcionales(input: IFEXGetPARAM_OpcionalesInput): Promise<IFEXGetPARAM_OpcionalesOutput>;

  /**
   * Get available economic activities
   * @param input Authentication data
   * @returns Activities list
   */
  getParamActividades(input: IFEXGetPARAM_ActividadesInput): Promise<IFEXGetPARAM_ActividadesOutput>;

  /**
   * Check server status
   * @returns Server status information
   */
  dummy(): Promise<IFEXDummyOutput>;
}
