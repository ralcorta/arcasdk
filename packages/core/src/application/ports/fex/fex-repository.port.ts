/**
 * WSFEX Repository Port
 * Port defined by the application layer for Export Electronic Billing
 */
import {
  FexAuthorizeRequestDto,
  FexAuthorizeResultDto,
  FexCheckPermisoRequestDto,
  FexCheckPermisoResultDto,
  FexGetCmpRequestDto,
  FexGetCmpResultDto,
  FexGetLastCmpRequestDto,
  FexGetLastCmpResultDto,
  FexGetLastIdResultDto,
  FexGetParamCtzRequestDto,
  FexParamActividadesResultDto,
  FexParamCbteTipoResultDto,
  FexParamCtzResultDto,
  FexParamDstCuitResultDto,
  FexParamDstPaisResultDto,
  FexParamIdiomasResultDto,
  FexParamIncotermsResultDto,
  FexParamMonCotizacionRequestDto,
  FexParamMonCotizacionResultDto,
  FexParamMonResultDto,
  FexParamOpcionalesResultDto,
  FexParamPtoVentaResultDto,
  FexParamTipoExpoResultDto,
  FexParamUmedResultDto,
  FexServerStatusDto,
} from "@application/dto/fex.dto";

export interface IWsfexRepositoryPort {
  getServerStatus(): Promise<FexServerStatusDto>;
  authorize(cmp: FexAuthorizeRequestDto): Promise<FexAuthorizeResultDto>;
  getCmp(params: FexGetCmpRequestDto): Promise<FexGetCmpResultDto>;
  getLastCmp(params: FexGetLastCmpRequestDto): Promise<FexGetLastCmpResultDto>;
  getLastId(): Promise<FexGetLastIdResultDto>;
  checkPermiso(
    params: FexCheckPermisoRequestDto
  ): Promise<FexCheckPermisoResultDto>;
  getParamPtoVenta(): Promise<FexParamPtoVentaResultDto>;
  getParamCbteTipo(): Promise<FexParamCbteTipoResultDto>;
  getParamTipoExpo(): Promise<FexParamTipoExpoResultDto>;
  getParamIncoterms(): Promise<FexParamIncotermsResultDto>;
  getParamIdiomas(): Promise<FexParamIdiomasResultDto>;
  getParamUmed(): Promise<FexParamUmedResultDto>;
  getParamDstPais(): Promise<FexParamDstPaisResultDto>;
  getParamDstCuit(): Promise<FexParamDstCuitResultDto>;
  getParamMon(): Promise<FexParamMonResultDto>;
  getParamMonCotizacion(
    params?: FexParamMonCotizacionRequestDto
  ): Promise<FexParamMonCotizacionResultDto>;
  getParamCtz(params?: FexGetParamCtzRequestDto): Promise<FexParamCtzResultDto>;
  getParamOpcionales(): Promise<FexParamOpcionalesResultDto>;
  getParamActividades(): Promise<FexParamActividadesResultDto>;
}