import { ICdcRepositoryPort } from "@application/ports/cdc/cdc-repository.port";
import { BaseSoapRepository } from "../../soap/base-soap-repository";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/types/soap-repository.types";
import { ArcaServiceNames } from "@application/types/service-name.types";
import { WsdlPaths } from "@infrastructure/soap/config/wsdl-path.types";
import { Endpoints } from "@infrastructure/soap/config/endpoints.types";
import { cdcExcludeMethods } from "@infrastructure/soap/config/auth-mappers";
import { ConstatarComprobanteInput } from "@application/dto/cdc";
import {
  IServiceSoapSoap,
  IComprobanteConstatarInput,
  IComprobanteConstatarOutput,
  IComprobanteDummyOutput,
  IComprobantesModalidadConsultarOutput,
  IComprobantesTipoConsultarOutput,
  IDocumentosTipoConsultarOutput,
  IOpcionalesTipoConsultarOutput,
} from "@infrastructure/soap/contracts/CDCService/ServiceSoap";
import { IServiceSoap12Soap } from "@infrastructure/soap/contracts/CDCService/ServiceSoap12";

type CdcSoapClient = IServiceSoapSoap | IServiceSoap12Soap;

export class CdcRepository
  extends BaseSoapRepository
  implements ICdcRepositoryPort
{
  private serviceClient?: CdcSoapClient;

  constructor(config: BaseSoapRepositoryConstructorConfig) {
    super(config);
  }

  private async getClient(): Promise<CdcSoapClient> {
    if (this.serviceClient) {
      return this.serviceClient;
    }

    const wsdlName = this.production
      ? WsdlPaths.WSCDC
      : WsdlPaths.WSCDC_TEST;
    const endpoint = this.production
      ? Endpoints.WSCDC
      : Endpoints.WSCDC_TEST;

    // WSCDC comparte host con WSFE (wswhomo / servicios1). Si reutiliza una
    // conexión keep-alive abierta por WSFE, ARCA la rutea al backend de WSFE y
    // responde con su página de error HTML.
    const { client, soapVersion } =
      await this.createSoapClient<CdcSoapClient>(wsdlName, {
        keepAlive: false,
      });

    this.soapClient.setEndpoint(client, endpoint);

    this.serviceClient = this.createAuthenticatedProxy(client, {
      serviceName: ArcaServiceNames.WSCDC,
      soapVersion,
      excludeMethods: cdcExcludeMethods,
    });

    return this.serviceClient;
  }

  async constatarComprobante(
    input: ConstatarComprobanteInput,
  ): Promise<IComprobanteConstatarOutput> {
    const client = await this.getClient();
    const [output] = await client.ComprobanteConstatarAsync(
      input as IComprobanteConstatarInput,
    );
    return output;
  }

  async getComprobantesModalidad(): Promise<IComprobantesModalidadConsultarOutput> {
    const client = await this.getClient();
    const [output] = await client.ComprobantesModalidadConsultarAsync({});
    return output;
  }

  async getComprobantesTipo(): Promise<IComprobantesTipoConsultarOutput> {
    const client = await this.getClient();
    const [output] = await client.ComprobantesTipoConsultarAsync({});
    return output;
  }

  async getDocumentosTipo(): Promise<IDocumentosTipoConsultarOutput> {
    const client = await this.getClient();
    const [output] = await client.DocumentosTipoConsultarAsync({});
    return output;
  }

  async getOpcionalesTipo(): Promise<IOpcionalesTipoConsultarOutput> {
    const client = await this.getClient();
    const [output] = await client.OpcionalesTipoConsultarAsync({});
    return output;
  }

  async dummy(): Promise<IComprobanteDummyOutput> {
    const client = await this.getClient();
    const [output] = await client.ComprobanteDummyAsync({});
    return output;
  }
}
