/**
 * WSFEcred Repository
 * Implements IWsfecredRepositoryPort for Factura de Crédito Electrónica
 */
import { BaseSoapRepository } from "../soap/base-soap-repository";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/outbound/ports/soap/soap-repository.types";
import { IWsfecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import {
  FecredAcceptRequestDto,
  FecredAcceptResultDto,
  FecredConsultarComprobantesRequestDto,
  FecredConsultarComprobantesResultDto,
  FecredConsultarCtaCteRequestDto,
  FecredConsultarCtaCteResultDto,
  FecredConsultarCtasCtesRequestDto,
  FecredConsultarCtasCtesResultDto,
  FecredConsultarCuentasEnAgtDptoCltvRequestDto,
  FecredConsultarCuentasEnAgtDptoCltvResultDto,
  FecredConsultarFacturasAgtDptoCltvRequestDto,
  FecredConsultarFacturasAgtDptoCltvResultDto,
  FecredConsultarHistorialEstadosComprobanteRequestDto,
  FecredConsultarHistorialEstadosComprobanteResultDto,
  FecredConsultarHistorialEstadosCtaCteRequestDto,
  FecredConsultarHistorialEstadosCtaCteResultDto,
  FecredConsultarMontoObligadoRecepcionRequestDto,
  FecredConsultarMontoObligadoRecepcionResultDto,
  FecredConsultarObligadoRecepcionRequestDto,
  FecredConsultarObligadoRecepcionResultDto,
  FecredConsultarTiposAjustesOperacionRequestDto,
  FecredConsultarTiposAjustesOperacionResultDto,
  FecredConsultarTiposFormasCancelacionRequestDto,
  FecredConsultarTiposFormasCancelacionResultDto,
  FecredConsultarTiposMotivosRechazoRequestDto,
  FecredConsultarTiposMotivosRechazoResultDto,
  FecredConsultarTiposRetencionesRequestDto,
  FecredConsultarTiposRetencionesResultDto,
  FecredInformCancelacionTotalRequestDto,
  FecredInformCancelacionTotalResultDto,
  FecredInformFacturaAgtDptoCltvRequestDto,
  FecredInformFacturaAgtDptoCltvResultDto,
  FecredModifyTransferOptionRequestDto,
  FecredModifyTransferOptionResultDto,
  FecredObtenerRemitosRequestDto,
  FecredObtenerRemitosResultDto,
  FecredRejectNoteRequestDto,
  FecredRejectNoteResultDto,
  FecredRejectRequestDto,
  FecredRejectResultDto,
  FecredServerStatusDto,
} from "@application/dto/fecred.dto";
import { ServiceNamesEnum } from "@infrastructure/outbound/ports/soap/enums/service-names.enum";
import { WsdlPathEnum } from "@infrastructure/outbound/ports/soap/enums/wsdl-path.enum";
import {
  EndpointsEnum,
  SoapServiceVersion,
} from "@infrastructure/outbound/ports/soap/enums/endpoints.enum";
import { IFECredServiceSoap } from "@infrastructure/outbound/ports/soap/interfaces/FECredService/ServiceSoap";

export class WsfecredRepository
  extends BaseSoapRepository
  implements IWsfecredRepositoryPort
{
  private client?: IFECredServiceSoap;

  constructor(config: BaseSoapRepositoryConstructorConfig) {
    super(config);
  }

  private async getClient(): Promise<IFECredServiceSoap> {
    if (this.client) {
      return this.client;
    }

    const wsdlName = this.production
      ? WsdlPathEnum.WSFECRED
      : WsdlPathEnum.WSFECRED_TEST;
    const endpoint = this.production
      ? EndpointsEnum.WSFECRED
      : EndpointsEnum.WSFECRED_TEST;

    const client = await this.soapClient.createClient<IFECredServiceSoap>(
      wsdlName,
      {
        forceSoap12Headers: false,
      }
    );

    this.soapClient.setEndpoint(client, endpoint);

    this.client = this.createAuthenticatedProxy(client, {
      serviceName: ServiceNamesEnum.WSFECRED,
      injectAuthProperty: false,
      soapVersion: SoapServiceVersion.ServiceSoap,
      authMapper: (auth: any) => ({
        authRequest: {
          token: auth.Auth.Token,
          sign: auth.Auth.Sign,
          cuitRepresentada: auth.Auth.Cuit,
        },
      }),
      excludeMethods: ["dummy"],
    }) as IFECredServiceSoap;

    return this.client;
  }

  private unwrapReturn<T>(
    output: any,
    returnKey: string,
    responseKey?: string
  ): T {
    if (output?.[returnKey] !== undefined) {
      return output[returnKey] as T;
    }

    if (responseKey && output?.[responseKey]?.[returnKey] !== undefined) {
      return output[responseKey][returnKey] as T;
    }

    if (responseKey && output?.[responseKey] !== undefined) {
      return output[responseKey] as T;
    }

    return output as T;
  }

  async getServerStatus(): Promise<FecredServerStatusDto> {
    const client = await this.getClient();
    const [output] = await client.dummyAsync({});
    const result = output?.dummyReturn ?? output?.dummyResponse?.dummyReturn;

    return {
      appserver: result?.appserver ?? "",
      dbserver: result?.dbserver ?? "",
      authserver: result?.authserver ?? "",
    };
  }

  async aceptarFECred(
    params: FecredAcceptRequestDto
  ): Promise<FecredAcceptResultDto> {
    const client = await this.getClient();
    const [output] = await client.aceptarFECredAsync(params as any);
    return this.unwrapReturn(output, "operacionFECredReturn", "aceptarFECredResponse");
  }

  async rechazarFECred(
    params: FecredRejectRequestDto
  ): Promise<FecredRejectResultDto> {
    const client = await this.getClient();
    const [output] = await client.rechazarFECredAsync(params as any);
    return this.unwrapReturn(output, "operacionFECredReturn", "rechazarFECredResponse");
  }

  async rechazarNotaDC(
    params: FecredRejectNoteRequestDto
  ): Promise<FecredRejectNoteResultDto> {
    const client = await this.getClient();
    const [output] = await client.rechazarNotaDCAsync(params as any);
    return this.unwrapReturn(output, "rechazarNotaDCReturn", "rechazarNotaDCResponse");
  }

  async informarFacturaAgtDptoCltv(
    params: FecredInformFacturaAgtDptoCltvRequestDto
  ): Promise<FecredInformFacturaAgtDptoCltvResultDto> {
    const client = await this.getClient();
    const [output] = await client.informarFacturaAgtDptoCltvAsync(params as any);
    return this.unwrapReturn(
      output,
      "operacionFECredReturn",
      "informarFacturaAgtDptoCltvResponse"
    );
  }

  async informarCancelacionTotalFECred(
    params: FecredInformCancelacionTotalRequestDto
  ): Promise<FecredInformCancelacionTotalResultDto> {
    const client = await this.getClient();
    const [output] = await client.informarCancelacionTotalFECredAsync(
      params as any
    );
    return this.unwrapReturn(
      output,
      "operacionFECredReturn",
      "informarCancelacionTotalFECredResponse"
    );
  }

  async modificarOpcionTransferencia(
    params: FecredModifyTransferOptionRequestDto
  ): Promise<FecredModifyTransferOptionResultDto> {
    const client = await this.getClient();
    const [output] = await client.modificarOpcionTransferenciaAsync(
      params as any
    );
    return this.unwrapReturn(
      output,
      "operacionFECredReturn",
      "modificarOpcionTransferenciaResponse"
    );
  }

  async consultarComprobantes(
    params: FecredConsultarComprobantesRequestDto
  ): Promise<FecredConsultarComprobantesResultDto> {
    const client = await this.getClient();
    const [output] = await client.consultarComprobantesAsync(params as any);
    return this.unwrapReturn(
      output,
      "consultarCmpReturn",
      "consultarComprobantesResponse"
    );
  }

  async consultarCtaCte(
    params: FecredConsultarCtaCteRequestDto
  ): Promise<FecredConsultarCtaCteResultDto> {
    const client = await this.getClient();
    const [output] = await client.consultarCtaCteAsync(params as any);
    return this.unwrapReturn(
      output,
      "consultarCtaCteReturn",
      "consultarCtaCteResponse"
    );
  }

  async consultarCtasCtes(
    params: FecredConsultarCtasCtesRequestDto
  ): Promise<FecredConsultarCtasCtesResultDto> {
    const client = await this.getClient();
    const [output] = await client.consultarCtasCtesAsync(params as any);
    return this.unwrapReturn(
      output,
      "consultarCtasCtesReturn",
      "consultarCtasCtesResponse"
    );
  }

  async consultarCuentasEnAgtDptoCltv(
    params: FecredConsultarCuentasEnAgtDptoCltvRequestDto
  ): Promise<FecredConsultarCuentasEnAgtDptoCltvResultDto> {
    const client = await this.getClient();
    const [output] = await client.consultarCuentasEnAgtDptoCltvAsync(
      params as any
    );
    return this.unwrapReturn(
      output,
      "consultarCuentasEnAgtDptoCltvReturn",
      "consultarCuentasEnAgtDptoCltvResponse"
    );
  }

  async consultarFacturasAgtDptoCltv(
    params: FecredConsultarFacturasAgtDptoCltvRequestDto
  ): Promise<FecredConsultarFacturasAgtDptoCltvResultDto> {
    const client = await this.getClient();
    const [output] = await client.consultarFacturasAgtDptoCltvAsync(
      params as any
    );
    return this.unwrapReturn(
      output,
      "consultarFacturasAgtDptoCltvReturn",
      "consultarFacturasAgtDptoCltvResponse"
    );
  }

  async consultarHistorialEstadosComprobante(
    params: FecredConsultarHistorialEstadosComprobanteRequestDto
  ): Promise<FecredConsultarHistorialEstadosComprobanteResultDto> {
    const client = await this.getClient();
    const [output] = await client.consultarHistorialEstadosComprobanteAsync(
      params as any
    );
    return this.unwrapReturn(
      output,
      "consultarHistorialEstadosComprobanteReturn",
      "consultarHistorialEstadosComprobanteResponse"
    );
  }

  async consultarHistorialEstadosCtaCte(
    params: FecredConsultarHistorialEstadosCtaCteRequestDto
  ): Promise<FecredConsultarHistorialEstadosCtaCteResultDto> {
    const client = await this.getClient();
    const [output] = await client.consultarHistorialEstadosCtaCteAsync(
      params as any
    );
    return this.unwrapReturn(
      output,
      "consultarHistorialEstadosCtaCteReturn",
      "consultarHistorialEstadosCtaCteResponse"
    );
  }

  async consultarMontoObligadoRecepcion(
    params: FecredConsultarMontoObligadoRecepcionRequestDto
  ): Promise<FecredConsultarMontoObligadoRecepcionResultDto> {
    const client = await this.getClient();
    const [output] = await client.consultarMontoObligadoRecepcionAsync(
      params as any
    );
    return this.unwrapReturn(
      output,
      "consultarMontoObligadoRecepcionReturn",
      "consultarMontoObligadoRecepcionResponse"
    );
  }

  async consultarObligadoRecepcion(
    params: FecredConsultarObligadoRecepcionRequestDto
  ): Promise<FecredConsultarObligadoRecepcionResultDto> {
    const client = await this.getClient();
    const [output] = await client.consultarMontoObligadoRecepcionAsync(
      params as any
    );
    return this.unwrapReturn(
      output,
      "consultarMontoObligadoRecepcionReturn",
      "consultarMontoObligadoRecepcionResponse"
    );
  }

  async consultarTiposAjustesOperacion(
    params: FecredConsultarTiposAjustesOperacionRequestDto
  ): Promise<FecredConsultarTiposAjustesOperacionResultDto> {
    const client = await this.getClient();
    const [output] = await client.consultarTiposAjustesOperacionAsync(
      params as any
    );
    return this.unwrapReturn(
      output,
      "codigoDescripcionReturn",
      "consultarTiposAjustesOperacionResponse"
    );
  }

  async consultarTiposFormasCancelacion(
    params: FecredConsultarTiposFormasCancelacionRequestDto
  ): Promise<FecredConsultarTiposFormasCancelacionResultDto> {
    const client = await this.getClient();
    const [output] = await client.consultarTiposFormasCancelacionAsync(
      params as any
    );
    return this.unwrapReturn(
      output,
      "codigoDescripcionReturn",
      "consultarTiposFormasCancelacionResponse"
    );
  }

  async consultarTiposMotivosRechazo(
    params: FecredConsultarTiposMotivosRechazoRequestDto
  ): Promise<FecredConsultarTiposMotivosRechazoResultDto> {
    const client = await this.getClient();
    const [output] = await client.consultarTiposMotivosRechazoAsync(
      params as any
    );
    return this.unwrapReturn(
      output,
      "codigoDescripcionReturn",
      "consultarTiposMotivosRechazoResponse"
    );
  }

  async consultarTiposRetenciones(
    params: FecredConsultarTiposRetencionesRequestDto
  ): Promise<FecredConsultarTiposRetencionesResultDto> {
    const client = await this.getClient();
    const [output] = await client.consultarTiposRetencionesAsync(params as any);
    return this.unwrapReturn(
      output,
      "consultarTiposRetencionesReturn",
      "consultarTiposRetencionesResponse"
    );
  }

  async obtenerRemitos(
    params: FecredObtenerRemitosRequestDto
  ): Promise<FecredObtenerRemitosResultDto> {
    const client = await this.getClient();
    const [output] = await client.obtenerRemitosAsync(params as any);
    return this.unwrapReturn(
      output,
      "obtenerRemitosReturn",
      "obtenerRemitosResponse"
    );
  }
}
