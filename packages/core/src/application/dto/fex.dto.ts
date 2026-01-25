/**
 * WSFEX DTOs
 * Minimal typing for Export Electronic Billing service
 */
export interface FexServerStatusDto {
  appserver: string;
  dbserver: string;
  authserver: string;
}

export type FexAuthorizeRequestDto = Record<string, any>;
export type FexAuthorizeResultDto = Record<string, any>;

export interface FexGetCmpRequestDto {
  Cbte_tipo: number;
  Punto_vta: number;
  Cbte_nro: number;
}

export type FexGetCmpResultDto = Record<string, any>;

export interface FexGetLastCmpRequestDto {
  Pto_venta: number;
  Cbte_Tipo: number;
}

export type FexGetLastCmpResultDto = Record<string, any>;

export type FexGetLastIdResultDto = Record<string, any>;

export interface FexCheckPermisoRequestDto {
  ID_Permiso?: string;
  Dst_merc: number;
}

export type FexCheckPermisoResultDto = Record<string, any>;

export interface FexGetParamCtzRequestDto {
  Mon_id?: string;
  FchCotiz?: string;
}

export type FexParamCtzResultDto = Record<string, any>;
export type FexParamMonCotizacionResultDto = Record<string, any>;
export type FexParamMonResultDto = Record<string, any>;
export type FexParamPtoVentaResultDto = Record<string, any>;
export type FexParamCbteTipoResultDto = Record<string, any>;
export type FexParamTipoExpoResultDto = Record<string, any>;
export type FexParamIncotermsResultDto = Record<string, any>;
export type FexParamIdiomasResultDto = Record<string, any>;
export type FexParamUmedResultDto = Record<string, any>;
export type FexParamDstPaisResultDto = Record<string, any>;
export type FexParamDstCuitResultDto = Record<string, any>;
export type FexParamOpcionalesResultDto = Record<string, any>;
export type FexParamActividadesResultDto = Record<string, any>;

export interface FexParamMonCotizacionRequestDto {
  Fecha_CTZ?: string;
}