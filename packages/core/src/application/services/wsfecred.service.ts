/**
 * WSFEcred Service
 * Application service for Factura de Crédito Electrónica
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
import { IWsfecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";

export class WsfecredService {
  constructor(private readonly repository: IWsfecredRepositoryPort) {}

  async getServerStatus(): Promise<FecredServerStatusDto> {
    return this.repository.getServerStatus();
  }

  async aceptarFECred(
    params: FecredAcceptRequestDto
  ): Promise<FecredAcceptResultDto> {
    return this.repository.aceptarFECred(params);
  }

  async rechazarFECred(
    params: FecredRejectRequestDto
  ): Promise<FecredRejectResultDto> {
    return this.repository.rechazarFECred(params);
  }

  async rechazarNotaDC(
    params: FecredRejectNoteRequestDto
  ): Promise<FecredRejectNoteResultDto> {
    return this.repository.rechazarNotaDC(params);
  }

  async informarFacturaAgtDptoCltv(
    params: FecredInformFacturaAgtDptoCltvRequestDto
  ): Promise<FecredInformFacturaAgtDptoCltvResultDto> {
    return this.repository.informarFacturaAgtDptoCltv(params);
  }

  async informarCancelacionTotalFECred(
    params: FecredInformCancelacionTotalRequestDto
  ): Promise<FecredInformCancelacionTotalResultDto> {
    return this.repository.informarCancelacionTotalFECred(params);
  }

  async modificarOpcionTransferencia(
    params: FecredModifyTransferOptionRequestDto
  ): Promise<FecredModifyTransferOptionResultDto> {
    return this.repository.modificarOpcionTransferencia(params);
  }

  async consultarComprobantes(
    params: FecredConsultarComprobantesRequestDto
  ): Promise<FecredConsultarComprobantesResultDto> {
    return this.repository.consultarComprobantes(params);
  }

  async consultarCtaCte(
    params: FecredConsultarCtaCteRequestDto
  ): Promise<FecredConsultarCtaCteResultDto> {
    return this.repository.consultarCtaCte(params);
  }

  async consultarCtasCtes(
    params: FecredConsultarCtasCtesRequestDto
  ): Promise<FecredConsultarCtasCtesResultDto> {
    return this.repository.consultarCtasCtes(params);
  }

  async consultarCuentasEnAgtDptoCltv(
    params: FecredConsultarCuentasEnAgtDptoCltvRequestDto
  ): Promise<FecredConsultarCuentasEnAgtDptoCltvResultDto> {
    return this.repository.consultarCuentasEnAgtDptoCltv(params);
  }

  async consultarFacturasAgtDptoCltv(
    params: FecredConsultarFacturasAgtDptoCltvRequestDto
  ): Promise<FecredConsultarFacturasAgtDptoCltvResultDto> {
    return this.repository.consultarFacturasAgtDptoCltv(params);
  }

  async consultarHistorialEstadosComprobante(
    params: FecredConsultarHistorialEstadosComprobanteRequestDto
  ): Promise<FecredConsultarHistorialEstadosComprobanteResultDto> {
    return this.repository.consultarHistorialEstadosComprobante(params);
  }

  async consultarHistorialEstadosCtaCte(
    params: FecredConsultarHistorialEstadosCtaCteRequestDto
  ): Promise<FecredConsultarHistorialEstadosCtaCteResultDto> {
    return this.repository.consultarHistorialEstadosCtaCte(params);
  }

  async consultarMontoObligadoRecepcion(
    params: FecredConsultarMontoObligadoRecepcionRequestDto
  ): Promise<FecredConsultarMontoObligadoRecepcionResultDto> {
    return this.repository.consultarMontoObligadoRecepcion(params);
  }

  async consultarObligadoRecepcion(
    params: FecredConsultarObligadoRecepcionRequestDto
  ): Promise<FecredConsultarObligadoRecepcionResultDto> {
    return this.repository.consultarMontoObligadoRecepcion(params);
  }

  async consultarTiposAjustesOperacion(
    params: FecredConsultarTiposAjustesOperacionRequestDto
  ): Promise<FecredConsultarTiposAjustesOperacionResultDto> {
    return this.repository.consultarTiposAjustesOperacion(params);
  }

  async consultarTiposFormasCancelacion(
    params: FecredConsultarTiposFormasCancelacionRequestDto
  ): Promise<FecredConsultarTiposFormasCancelacionResultDto> {
    return this.repository.consultarTiposFormasCancelacion(params);
  }

  async consultarTiposMotivosRechazo(
    params: FecredConsultarTiposMotivosRechazoRequestDto
  ): Promise<FecredConsultarTiposMotivosRechazoResultDto> {
    return this.repository.consultarTiposMotivosRechazo(params);
  }

  async consultarTiposRetenciones(
    params: FecredConsultarTiposRetencionesRequestDto
  ): Promise<FecredConsultarTiposRetencionesResultDto> {
    return this.repository.consultarTiposRetenciones(params);
  }

  async obtenerRemitos(
    params: FecredObtenerRemitosRequestDto
  ): Promise<FecredObtenerRemitosResultDto> {
    return this.repository.obtenerRemitos(params);
  }
}
