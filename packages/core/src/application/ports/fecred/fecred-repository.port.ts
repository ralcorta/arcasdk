import {
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
} from "@application/dto/fecred";

export interface IFecredRepositoryPort {
  aceptarFECred(input: IaceptarFECredInput): Promise<IaceptarFECredOutput>;

  rechazarFECred(input: IrechazarFECredInput): Promise<IrechazarFECredOutput>;

  consultarComprobantes(
    input: IconsultarComprobantesInput,
  ): Promise<IconsultarComprobantesOutput>;

  consultarCtasCtes(
    input: IconsultarCtasCtesInput,
  ): Promise<IconsultarCtasCtesOutput>;

  consultarCtaCte(
    input: IconsultarCtaCteInput,
  ): Promise<IconsultarCtaCteOutput>;

  informarCancelacionTotalFECred(
    input: IinformarCancelacionTotalFECredInput,
  ): Promise<IinformarCancelacionTotalFECredOutput>;

  rechazarNotaDC(input: IrechazarNotaDCInput): Promise<IrechazarNotaDCOutput>;

  informarFacturaAgtDptoCltv(
    input: IinformarFacturaAgtDptoCltvInput,
  ): Promise<IinformarFacturaAgtDptoCltvOutput>;

  consultarFacturasAgtDptoCltv(
    input: IconsultarFacturasAgtDptoCltvInput,
  ): Promise<IconsultarFacturasAgtDptoCltvOutput>;

  consultarCuentasEnAgtDptoCltv(): Promise<IconsultarCuentasEnAgtDptoCltvOutput>;

  consultarObligadoRecepcion(
    input: IconsultarObligadoRecepcionInput,
  ): Promise<IconsultarObligadoRecepcionOutput>;

  consultarTiposRetenciones(): Promise<IconsultarTiposRetencionesOutput>;

  consultarTiposMotivosRechazo(): Promise<IconsultarTiposMotivosRechazoOutput>;

  consultarTiposFormasCancelacion(): Promise<IconsultarTiposFormasCancelacionOutput>;

  obtenerRemitos(input: IobtenerRemitosInput): Promise<IobtenerRemitosOutput>;

  consultarHistorialEstadosComprobante(
    input: IconsultarHistorialEstadosComprobanteInput,
  ): Promise<IconsultarHistorialEstadosComprobanteOutput>;

  consultarHistorialEstadosCtaCte(
    input: IconsultarHistorialEstadosCtaCteInput,
  ): Promise<IconsultarHistorialEstadosCtaCteOutput>;

  consultarTiposAjustesOperacion(): Promise<IconsultarTiposAjustesOperacionOutput>;

  consultarMontoObligadoRecepcion(
    input: IconsultarMontoObligadoRecepcionInput,
  ): Promise<IconsultarMontoObligadoRecepcionOutput>;

  modificarOpcionTransferencia(
    input: ImodificarOpcionTransferenciaInput,
  ): Promise<ImodificarOpcionTransferenciaOutput>;
}
