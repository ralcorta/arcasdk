/**
 * WSFEX Repository
 * Implements IWsfexRepositoryPort for Export Electronic Billing
 */
import { BaseSoapRepository } from "../soap/base-soap-repository";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/outbound/ports/soap/soap-repository.types";
import { IWsfexRepositoryPort } from "@application/ports/fex/fex-repository.port";
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
import { ServiceNamesEnum } from "@infrastructure/outbound/ports/soap/enums/service-names.enum";
import { WsdlPathEnum } from "@infrastructure/outbound/ports/soap/enums/wsdl-path.enum";
import {
  EndpointsEnum,
  SoapServiceVersion,
} from "@infrastructure/outbound/ports/soap/enums/endpoints.enum";
import { IFEXServiceSoap } from "@infrastructure/outbound/ports/soap/interfaces/FEXService/ServiceSoap";
import { IFEXServiceSoap12 } from "@infrastructure/outbound/ports/soap/interfaces/FEXService/ServiceSoap12";

export class WsfexRepository
  extends BaseSoapRepository
  implements IWsfexRepositoryPort
{
  private client?: IFEXServiceSoap | IFEXServiceSoap12;

  constructor(config: BaseSoapRepositoryConstructorConfig) {
    super(config);
  }

  private async getClient(): Promise<IFEXServiceSoap | IFEXServiceSoap12> {
    if (this.client) {
      return this.client;
    }

    const wsdlName = this.production
      ? WsdlPathEnum.WSFEX
      : WsdlPathEnum.WSFEX_TEST;
    const endpoint = this.production
      ? EndpointsEnum.WSFEX
      : EndpointsEnum.WSFEX_TEST;

    let client: IFEXServiceSoap | IFEXServiceSoap12;
    let soapVersion: SoapServiceVersion;

    if (this.useSoap12) {
      client = await this.soapClient.createClient<IFEXServiceSoap12>(
        wsdlName,
        {
          forceSoap12Headers: true,
        }
      );
      soapVersion = SoapServiceVersion.ServiceSoap12;
    } else {
      client = await this.soapClient.createClient<IFEXServiceSoap>(wsdlName, {
        forceSoap12Headers: false,
      });
      soapVersion = SoapServiceVersion.ServiceSoap;
    }

    this.soapClient.setEndpoint(client, endpoint);

    this.client = this.createAuthenticatedProxy(client, {
      serviceName: ServiceNamesEnum.WSFEX,
      injectAuthProperty: false,
      soapVersion,
      excludeMethods: ["FEXGetLast_CMP"],
    }) as IFEXServiceSoap | IFEXServiceSoap12;

    return this.client;
  }

  async getServerStatus(): Promise<FexServerStatusDto> {
    const client = await this.getClient();
    const [output] = await client.FEXDummyAsync({});
    const result = output.FEXDummyResult;

    return {
      appserver: result?.AppServer ?? "",
      dbserver: result?.DbServer ?? "",
      authserver: result?.AuthServer ?? "",
    };
  }

  async authorize(cmp: FexAuthorizeRequestDto): Promise<FexAuthorizeResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEXAuthorizeAsync({ Cmp: cmp });
    return output.FEXAuthorizeResult;
  }

  async getCmp(params: FexGetCmpRequestDto): Promise<FexGetCmpResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEXGetCMPAsync({ Cmp: params });
    return output.FEXGetCMPResult;
  }

  async getLastCmp(
    params: FexGetLastCmpRequestDto
  ): Promise<FexGetLastCmpResultDto> {
    const client = await this.getClient();
    const ticket = await this.authRepository.login(ServiceNamesEnum.WSFEX);
    const auth = this.authRepository.getAuthParams(ticket, this.cuit).Auth;

    const [output] = await client.FEXGetLast_CMPAsync({
      Auth: {
        Token: auth.Token,
        Sign: auth.Sign,
        Cuit: auth.Cuit,
        Pto_venta: params.Pto_venta,
        Cbte_Tipo: params.Cbte_Tipo,
      },
    });

    return output.FEXGetLast_CMPResult;
  }

  async getLastId(): Promise<FexGetLastIdResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEXGetLast_IDAsync({});
    return output.FEXGetLast_IDResult;
  }

  async checkPermiso(
    params: FexCheckPermisoRequestDto
  ): Promise<FexCheckPermisoResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEXCheck_PermisoAsync({
      ID_Permiso: params.ID_Permiso,
      Dst_merc: params.Dst_merc,
    });
    return output.FEXCheck_PermisoResult;
  }

  async getParamPtoVenta(): Promise<FexParamPtoVentaResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEXGetPARAM_PtoVentaAsync({});
    return output.FEXGetPARAM_PtoVentaResult;
  }

  async getParamCbteTipo(): Promise<FexParamCbteTipoResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEXGetPARAM_Cbte_TipoAsync({});
    return output.FEXGetPARAM_Cbte_TipoResult;
  }

  async getParamTipoExpo(): Promise<FexParamTipoExpoResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEXGetPARAM_Tipo_ExpoAsync({});
    return output.FEXGetPARAM_Tipo_ExpoResult;
  }

  async getParamIncoterms(): Promise<FexParamIncotermsResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEXGetPARAM_IncotermsAsync({});
    return output.FEXGetPARAM_IncotermsResult;
  }

  async getParamIdiomas(): Promise<FexParamIdiomasResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEXGetPARAM_IdiomasAsync({});
    return output.FEXGetPARAM_IdiomasResult;
  }

  async getParamUmed(): Promise<FexParamUmedResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEXGetPARAM_UMedAsync({});
    return output.FEXGetPARAM_UMedResult;
  }

  async getParamDstPais(): Promise<FexParamDstPaisResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEXGetPARAM_DST_paisAsync({});
    return output.FEXGetPARAM_DST_paisResult;
  }

  async getParamDstCuit(): Promise<FexParamDstCuitResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEXGetPARAM_DST_CUITAsync({});
    return output.FEXGetPARAM_DST_CUITResult;
  }

  async getParamMon(): Promise<FexParamMonResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEXGetPARAM_MONAsync({});
    return output.FEXGetPARAM_MONResult;
  }

  async getParamMonCotizacion(
    params?: FexParamMonCotizacionRequestDto
  ): Promise<FexParamMonCotizacionResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEXGetPARAM_MON_CON_COTIZACIONAsync({
      Fecha_CTZ: params?.Fecha_CTZ,
    });
    return output.FEXGetPARAM_MON_CON_COTIZACIONResult;
  }

  async getParamCtz(
    params?: FexGetParamCtzRequestDto
  ): Promise<FexParamCtzResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEXGetPARAM_CtzAsync({
      Mon_id: params?.Mon_id,
      FchCotiz: params?.FchCotiz,
    });
    return output.FEXGetPARAM_CtzResult;
  }

  async getParamOpcionales(): Promise<FexParamOpcionalesResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEXGetPARAM_OpcionalesAsync({});
    return output.FEXGetPARAM_OpcionalesResult;
  }

  async getParamActividades(): Promise<FexParamActividadesResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEXGetPARAM_ActividadesAsync({});
    return output.FEXGetPARAM_ActividadesResult;
  }
}