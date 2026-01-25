/**
 * WSFEcred Repository Port
 * Port defined by the application layer for Factura de Crédito Electrónica
 */
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

export interface IWsfecredRepositoryPort {
  getServerStatus(): Promise<FecredServerStatusDto>;
  aceptarFECred(params: FecredAcceptRequestDto): Promise<FecredAcceptResultDto>;
  rechazarFECred(params: FecredRejectRequestDto): Promise<FecredRejectResultDto>;
  rechazarNotaDC(
    params: FecredRejectNoteRequestDto
  ): Promise<FecredRejectNoteResultDto>;
  informarFacturaAgtDptoCltv(
    params: FecredInformFacturaAgtDptoCltvRequestDto
  ): Promise<FecredInformFacturaAgtDptoCltvResultDto>;
  informarCancelacionTotalFECred(
    params: FecredInformCancelacionTotalRequestDto
  ): Promise<FecredInformCancelacionTotalResultDto>;
  modificarOpcionTransferencia(
    params: FecredModifyTransferOptionRequestDto
  ): Promise<FecredModifyTransferOptionResultDto>;
  consultarComprobantes(
    params: FecredConsultarComprobantesRequestDto
  ): Promise<FecredConsultarComprobantesResultDto>;
  consultarCtaCte(
    params: FecredConsultarCtaCteRequestDto
  ): Promise<FecredConsultarCtaCteResultDto>;
  consultarCtasCtes(
    params: FecredConsultarCtasCtesRequestDto
  ): Promise<FecredConsultarCtasCtesResultDto>;
  consultarCuentasEnAgtDptoCltv(
    params: FecredConsultarCuentasEnAgtDptoCltvRequestDto
  ): Promise<FecredConsultarCuentasEnAgtDptoCltvResultDto>;
  consultarFacturasAgtDptoCltv(
    params: FecredConsultarFacturasAgtDptoCltvRequestDto
  ): Promise<FecredConsultarFacturasAgtDptoCltvResultDto>;
  consultarHistorialEstadosComprobante(
    params: FecredConsultarHistorialEstadosComprobanteRequestDto
  ): Promise<FecredConsultarHistorialEstadosComprobanteResultDto>;
  consultarHistorialEstadosCtaCte(
    params: FecredConsultarHistorialEstadosCtaCteRequestDto
  ): Promise<FecredConsultarHistorialEstadosCtaCteResultDto>;
  consultarMontoObligadoRecepcion(
    params: FecredConsultarMontoObligadoRecepcionRequestDto
  ): Promise<FecredConsultarMontoObligadoRecepcionResultDto>;
  consultarObligadoRecepcion(
    params: FecredConsultarObligadoRecepcionRequestDto
  ): Promise<FecredConsultarObligadoRecepcionResultDto>;
  consultarTiposAjustesOperacion(
    params: FecredConsultarTiposAjustesOperacionRequestDto
  ): Promise<FecredConsultarTiposAjustesOperacionResultDto>;
  consultarTiposFormasCancelacion(
    params: FecredConsultarTiposFormasCancelacionRequestDto
  ): Promise<FecredConsultarTiposFormasCancelacionResultDto>;
  consultarTiposMotivosRechazo(
    params: FecredConsultarTiposMotivosRechazoRequestDto
  ): Promise<FecredConsultarTiposMotivosRechazoResultDto>;
  consultarTiposRetenciones(
    params: FecredConsultarTiposRetencionesRequestDto
  ): Promise<FecredConsultarTiposRetencionesResultDto>;
  obtenerRemitos(
    params: FecredObtenerRemitosRequestDto
  ): Promise<FecredObtenerRemitosResultDto>;
}
