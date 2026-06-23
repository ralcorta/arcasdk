import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import { BaseSoapRepository } from "../../soap/base-soap-repository";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/types/soap-repository.types";
import { ArcaServiceNames } from "@application/types/service-name.types";
import { WsdlPaths } from "@infrastructure/soap/config/wsdl-path.types";
import { Endpoints } from "@infrastructure/soap/config/endpoints.types";
import { mapFecredAuth } from "@infrastructure/soap/config/auth-mappers";
import {
  IFECredServiceSOAPSoap,
  IaceptarFECredInput,
  IaceptarFECredOutput,
  IrechazarFECredInput,
  IrechazarFECredOutput,
  IconsultarComprobantesInput,
  IconsultarComprobantesOutput,
  IconsultarCtasCtesInput,
  IconsultarCtasCtesOutput,
  IconsultarCtaCteInput,
  IconsultarCtaCteOutput,
  IinformarCancelacionTotalFECredInput,
  IinformarCancelacionTotalFECredOutput,
  IrechazarNotaDCInput,
  IrechazarNotaDCOutput,
  IinformarFacturaAgtDptoCltvInput,
  IinformarFacturaAgtDptoCltvOutput,
  IconsultarFacturasAgtDptoCltvInput,
  IconsultarFacturasAgtDptoCltvOutput,
  IconsultarCuentasEnAgtDptoCltvOutput,
  IconsultarObligadoRecepcionInput,
  IconsultarObligadoRecepcionOutput,
  IconsultarTiposRetencionesOutput,
  IconsultarTiposMotivosRechazoOutput,
  IconsultarTiposFormasCancelacionOutput,
  IobtenerRemitosInput,
  IobtenerRemitosOutput,
  IconsultarHistorialEstadosComprobanteInput,
  IconsultarHistorialEstadosComprobanteOutput,
  IconsultarHistorialEstadosCtaCteInput,
  IconsultarHistorialEstadosCtaCteOutput,
  IconsultarTiposAjustesOperacionOutput,
  IconsultarMontoObligadoRecepcionInput,
  IconsultarMontoObligadoRecepcionOutput,
  ImodificarOpcionTransferenciaInput,
  ImodificarOpcionTransferenciaOutput,
} from "@infrastructure/soap/contracts/FECredService/ServiceSoap";

export class FecredRepository
  extends BaseSoapRepository
  implements IFecredRepositoryPort
{
  private serviceClient?: IFECredServiceSOAPSoap;

  constructor(config: BaseSoapRepositoryConstructorConfig) {
    super(config);
  }

  private async getClient(): Promise<IFECredServiceSOAPSoap> {
    if (this.serviceClient) {
      return this.serviceClient;
    }

    const wsdlName = this.production
      ? WsdlPaths.WSFECRED
      : WsdlPaths.WSFECRED_TEST;
    const endpoint = this.production
      ? Endpoints.WSFECRED
      : Endpoints.WSFECRED_TEST;

    const { client, soapVersion } =
      await this.createSoapClient<IFECredServiceSOAPSoap>(wsdlName, {
        forceSoap12Headers: false,
      });

    this.soapClient.setEndpoint(client, endpoint);

    this.serviceClient = this.createAuthenticatedProxy(client, {
      serviceName: ArcaServiceNames.WSFECRED,
      soapVersion,
      authMapper: mapFecredAuth,
    });

    return this.serviceClient;
  }

  async aceptarFECred(
    input: IaceptarFECredInput,
  ): Promise<IaceptarFECredOutput> {
    const client = await this.getClient();
    const [output] = await client.aceptarFECredAsync(input);
    return output;
  }

  async rechazarFECred(
    input: IrechazarFECredInput,
  ): Promise<IrechazarFECredOutput> {
    const client = await this.getClient();
    const [output] = await client.rechazarFECredAsync(input);
    return output;
  }

  async consultarComprobantes(
    input: IconsultarComprobantesInput,
  ): Promise<IconsultarComprobantesOutput> {
    const client = await this.getClient();
    const [output] = await client.consultarComprobantesAsync(input);
    return output;
  }

  async consultarCtasCtes(
    input: IconsultarCtasCtesInput,
  ): Promise<IconsultarCtasCtesOutput> {
    const client = await this.getClient();
    const [output] = await client.consultarCtasCtesAsync(input);
    return output;
  }

  async consultarCtaCte(
    input: IconsultarCtaCteInput,
  ): Promise<IconsultarCtaCteOutput> {
    const client = await this.getClient();
    const [output] = await client.consultarCtaCteAsync(input);
    return output;
  }

  async informarCancelacionTotalFECred(
    input: IinformarCancelacionTotalFECredInput,
  ): Promise<IinformarCancelacionTotalFECredOutput> {
    const client = await this.getClient();
    const [output] = await client.informarCancelacionTotalFECredAsync(input);
    return output;
  }

  async rechazarNotaDC(
    input: IrechazarNotaDCInput,
  ): Promise<IrechazarNotaDCOutput> {
    const client = await this.getClient();
    const [output] = await client.rechazarNotaDCAsync(input);
    return output;
  }

  async informarFacturaAgtDptoCltv(
    input: IinformarFacturaAgtDptoCltvInput,
  ): Promise<IinformarFacturaAgtDptoCltvOutput> {
    const client = await this.getClient();
    const [output] = await client.informarFacturaAgtDptoCltvAsync(input);
    return output;
  }

  async consultarFacturasAgtDptoCltv(
    input: IconsultarFacturasAgtDptoCltvInput,
  ): Promise<IconsultarFacturasAgtDptoCltvOutput> {
    const client = await this.getClient();
    const [output] = await client.consultarFacturasAgtDptoCltvAsync(input);
    return output;
  }

  async consultarCuentasEnAgtDptoCltv(): Promise<IconsultarCuentasEnAgtDptoCltvOutput> {
    const client = await this.getClient();
    const [output] = await client.consultarCuentasEnAgtDptoCltvAsync({});
    return output;
  }

  async consultarObligadoRecepcion(
    input: IconsultarObligadoRecepcionInput,
  ): Promise<IconsultarObligadoRecepcionOutput> {
    const client = await this.getClient();
    const [output] = await client.consultarObligadoRecepcionAsync(input);
    return output;
  }

  async consultarTiposRetenciones(): Promise<IconsultarTiposRetencionesOutput> {
    const client = await this.getClient();
    const [output] = await client.consultarTiposRetencionesAsync({});
    return output;
  }

  async consultarTiposMotivosRechazo(): Promise<IconsultarTiposMotivosRechazoOutput> {
    const client = await this.getClient();
    const [output] = await client.consultarTiposMotivosRechazoAsync({});
    return output;
  }

  async consultarTiposFormasCancelacion(): Promise<IconsultarTiposFormasCancelacionOutput> {
    const client = await this.getClient();
    const [output] = await client.consultarTiposFormasCancelacionAsync({});
    return output;
  }

  async obtenerRemitos(
    input: IobtenerRemitosInput,
  ): Promise<IobtenerRemitosOutput> {
    const client = await this.getClient();
    const [output] = await client.obtenerRemitosAsync(input);
    return output;
  }

  async consultarHistorialEstadosComprobante(
    input: IconsultarHistorialEstadosComprobanteInput,
  ): Promise<IconsultarHistorialEstadosComprobanteOutput> {
    const client = await this.getClient();
    const [output] =
      await client.consultarHistorialEstadosComprobanteAsync(input);
    return output;
  }

  async consultarHistorialEstadosCtaCte(
    input: IconsultarHistorialEstadosCtaCteInput,
  ): Promise<IconsultarHistorialEstadosCtaCteOutput> {
    const client = await this.getClient();
    const [output] = await client.consultarHistorialEstadosCtaCteAsync(input);
    return output;
  }

  async consultarTiposAjustesOperacion(): Promise<IconsultarTiposAjustesOperacionOutput> {
    const client = await this.getClient();
    const [output] = await client.consultarTiposAjustesOperacionAsync({});
    return output;
  }

  async consultarMontoObligadoRecepcion(
    input: IconsultarMontoObligadoRecepcionInput,
  ): Promise<IconsultarMontoObligadoRecepcionOutput> {
    const client = await this.getClient();
    const [output] = await client.consultarMontoObligadoRecepcionAsync(input);
    return output;
  }

  async modificarOpcionTransferencia(
    input: ImodificarOpcionTransferenciaInput,
  ): Promise<ImodificarOpcionTransferenciaOutput> {
    const client = await this.getClient();
    const [output] = await client.modificarOpcionTransferenciaAsync(input);
    return output;
  }

  // dummy() no expuesto: AFIP define dummyRequest sin body pero exige auth.
  // async dummy(): Promise<IdummyOutput> {
  //   const client = await this.getClient();
  //   const [output] = await client.dummyAsync({});
  //   return output;
  // }
}
