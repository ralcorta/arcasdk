/**
 * WSFEX Service
 * Application service for Export Electronic Billing
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
import { IWsfexRepositoryPort } from "@application/ports/fex/fex-repository.port";

export class WsfexService {
  constructor(private readonly repository: IWsfexRepositoryPort) {}

  async getServerStatus(): Promise<FexServerStatusDto> {
    return this.repository.getServerStatus();
  }

  async authorize(cmp: FexAuthorizeRequestDto): Promise<FexAuthorizeResultDto> {
    return this.repository.authorize(cmp);
  }

  async getCmp(params: FexGetCmpRequestDto): Promise<FexGetCmpResultDto> {
    return this.repository.getCmp(params);
  }

  async getLastCmp(
    params: FexGetLastCmpRequestDto
  ): Promise<FexGetLastCmpResultDto> {
    return this.repository.getLastCmp(params);
  }

  async getLastId(): Promise<FexGetLastIdResultDto> {
    return this.repository.getLastId();
  }

  async checkPermiso(
    params: FexCheckPermisoRequestDto
  ): Promise<FexCheckPermisoResultDto> {
    return this.repository.checkPermiso(params);
  }

  async getParamPtoVenta(): Promise<FexParamPtoVentaResultDto> {
    return this.repository.getParamPtoVenta();
  }

  async getParamCbteTipo(): Promise<FexParamCbteTipoResultDto> {
    return this.repository.getParamCbteTipo();
  }

  async getParamTipoExpo(): Promise<FexParamTipoExpoResultDto> {
    return this.repository.getParamTipoExpo();
  }

  async getParamIncoterms(): Promise<FexParamIncotermsResultDto> {
    return this.repository.getParamIncoterms();
  }

  async getParamIdiomas(): Promise<FexParamIdiomasResultDto> {
    return this.repository.getParamIdiomas();
  }

  async getParamUmed(): Promise<FexParamUmedResultDto> {
    return this.repository.getParamUmed();
  }

  async getParamDstPais(): Promise<FexParamDstPaisResultDto> {
    return this.repository.getParamDstPais();
  }

  async getParamDstCuit(): Promise<FexParamDstCuitResultDto> {
    return this.repository.getParamDstCuit();
  }

  async getParamMon(): Promise<FexParamMonResultDto> {
    return this.repository.getParamMon();
  }

  async getParamMonCotizacion(
    params?: FexParamMonCotizacionRequestDto
  ): Promise<FexParamMonCotizacionResultDto> {
    return this.repository.getParamMonCotizacion(params);
  }

  async getParamCtz(
    params?: FexGetParamCtzRequestDto
  ): Promise<FexParamCtzResultDto> {
    return this.repository.getParamCtz(params);
  }

  async getParamOpcionales(): Promise<FexParamOpcionalesResultDto> {
    return this.repository.getParamOpcionales();
  }

  async getParamActividades(): Promise<FexParamActividadesResultDto> {
    return this.repository.getParamActividades();
  }
}