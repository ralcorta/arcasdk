import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";
import { BaseSoapRepository } from "../../soap/base-soap-repository";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/types/soap-repository.types";
import { ArcaServiceNames } from "@application/types/service-name.types";
import { WsdlPaths } from "@infrastructure/soap/config/wsdl-path.types";
import { Endpoints } from "@infrastructure/soap/config/endpoints.types";
import { fexExcludeMethods } from "@infrastructure/soap/config/auth-mappers";
import {
  IServiceSoapSoap,
} from "@infrastructure/soap/contracts/FEXService/ServiceSoap";
import { IServiceSoap12Soap } from "@infrastructure/soap/contracts/FEXService/ServiceSoap12";
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
} from "@infrastructure/soap/contracts/FEXService/ServiceSoap";

type FexSoapClient = IServiceSoapSoap | IServiceSoap12Soap;

export class FexRepository
  extends BaseSoapRepository
  implements IFexRepositoryPort
{
  private serviceClient?: FexSoapClient;

  constructor(config: BaseSoapRepositoryConstructorConfig) {
    super(config);
  }

  private async getClient(): Promise<FexSoapClient> {
    if (this.serviceClient) {
      return this.serviceClient;
    }

    const wsdlName = this.production
      ? WsdlPaths.WSFEX
      : WsdlPaths.WSFEX_TEST;
    const endpoint = this.production
      ? Endpoints.WSFEX
      : Endpoints.WSFEX_TEST;

    const { client, soapVersion } =
      await this.createSoapClient<FexSoapClient>(wsdlName);

    this.soapClient.setEndpoint(client, endpoint);

    this.serviceClient = this.createAuthenticatedProxy(client, {
      serviceName: ArcaServiceNames.WSFEX,
      soapVersion,
      excludeMethods: fexExcludeMethods,
    });

    return this.serviceClient;
  }

  async authorize(input: IFEXAuthorizeInput): Promise<IFEXAuthorizeOutput> {
    const client = await this.getClient();
    const [output] = await client.FEXAuthorizeAsync(input);
    return output;
  }

  async getCmp(input: IFEXGetCMPInput): Promise<IFEXGetCMPOutput> {
    const client = await this.getClient();
    const [output] = await client.FEXGetCMPAsync(input);
    return output;
  }

  async getLastCmp(input: IFEXGetLast_CMPInput): Promise<IFEXGetLast_CMPOutput> {
    const client = await this.getClient();
    const [output] = await client.FEXGetLast_CMPAsync(input);
    return output;
  }

  async getLastId(input: IFEXGetLast_IDInput): Promise<IFEXGetLast_IDOutput> {
    const client = await this.getClient();
    const [output] = await client.FEXGetLast_IDAsync(input);
    return output;
  }

  async checkPermiso(input: IFEXCheck_PermisoInput): Promise<IFEXCheck_PermisoOutput> {
    const client = await this.getClient();
    const [output] = await client.FEXCheck_PermisoAsync(input);
    return output;
  }

  async getParamCbteTipo(input: IFEXGetPARAM_Cbte_TipoInput): Promise<IFEXGetPARAM_Cbte_TipoOutput> {
    const client = await this.getClient();
    const [output] = await client.FEXGetPARAM_Cbte_TipoAsync(input);
    return output;
  }

  async getParamTipoExpo(input: IFEXGetPARAM_Tipo_ExpoInput): Promise<IFEXGetPARAM_Tipo_ExpoOutput> {
    const client = await this.getClient();
    const [output] = await client.FEXGetPARAM_Tipo_ExpoAsync(input);
    return output;
  }

  async getParamIncoterms(input: IFEXGetPARAM_IncotermsInput): Promise<IFEXGetPARAM_IncotermsOutput> {
    const client = await this.getClient();
    const [output] = await client.FEXGetPARAM_IncotermsAsync(input);
    return output;
  }

  async getParamIdiomas(input: IFEXGetPARAM_IdiomasInput): Promise<IFEXGetPARAM_IdiomasOutput> {
    const client = await this.getClient();
    const [output] = await client.FEXGetPARAM_IdiomasAsync(input);
    return output;
  }

  async getParamUMed(input: IFEXGetPARAM_UMedInput): Promise<IFEXGetPARAM_UMedOutput> {
    const client = await this.getClient();
    const [output] = await client.FEXGetPARAM_UMedAsync(input);
    return output;
  }

  async getParamDstPais(input: IFEXGetPARAM_DST_paisInput): Promise<IFEXGetPARAM_DST_paisOutput> {
    const client = await this.getClient();
    const [output] = await client.FEXGetPARAM_DST_paisAsync(input);
    return output;
  }

  async getParamDstCuit(input: IFEXGetPARAM_DST_CUITInput): Promise<IFEXGetPARAM_DST_CUITOutput> {
    const client = await this.getClient();
    const [output] = await client.FEXGetPARAM_DST_CUITAsync(input);
    return output;
  }

  async getParamMon(input: IFEXGetPARAM_MONInput): Promise<IFEXGetPARAM_MONOutput> {
    const client = await this.getClient();
    const [output] = await client.FEXGetPARAM_MONAsync(input);
    return output;
  }

  async getParamMonConCotizacion(input: IFEXGetPARAM_MON_CON_COTIZACIONInput): Promise<IFEXGetPARAM_MON_CON_COTIZACIONOutput> {
    const client = await this.getClient();
    const [output] = await client.FEXGetPARAM_MON_CON_COTIZACIONAsync(input);
    return output;
  }

  async getParamCtz(input: IFEXGetPARAM_CtzInput): Promise<IFEXGetPARAM_CtzOutput> {
    const client = await this.getClient();
    const [output] = await client.FEXGetPARAM_CtzAsync(input);
    return output;
  }

  async getParamPtoVenta(input: IFEXGetPARAM_PtoVentaInput): Promise<IFEXGetPARAM_PtoVentaOutput> {
    const client = await this.getClient();
    const [output] = await client.FEXGetPARAM_PtoVentaAsync(input);
    return output;
  }

  async getParamOpcionales(input: IFEXGetPARAM_OpcionalesInput): Promise<IFEXGetPARAM_OpcionalesOutput> {
    const client = await this.getClient();
    const [output] = await client.FEXGetPARAM_OpcionalesAsync(input);
    return output;
  }

  async getParamActividades(input: IFEXGetPARAM_ActividadesInput): Promise<IFEXGetPARAM_ActividadesOutput> {
    const client = await this.getClient();
    const [output] = await client.FEXGetPARAM_ActividadesAsync(input);
    return output;
  }

  async dummy(): Promise<IFEXDummyOutput> {
    const client = await this.getClient();
    const [output] = await client.FEXDummyAsync({});
    return output;
  }
}
