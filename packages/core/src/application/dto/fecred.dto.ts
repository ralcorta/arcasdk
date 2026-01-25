/**
 * WSFEcred DTOs
 * Data transfer objects for Factura de Crédito Electrónica
 */
export interface FecredServerStatusDto {
  appserver: string;
  dbserver: string;
  authserver: string;
}

export type FecredAcceptRequestDto = Record<string, any>;
export type FecredAcceptResultDto = Record<string, any>;

export type FecredRejectRequestDto = Record<string, any>;
export type FecredRejectResultDto = Record<string, any>;

export type FecredRejectNoteRequestDto = Record<string, any>;
export type FecredRejectNoteResultDto = Record<string, any>;

export type FecredInformFacturaAgtDptoCltvRequestDto = Record<string, any>;
export type FecredInformFacturaAgtDptoCltvResultDto = Record<string, any>;

export type FecredInformCancelacionTotalRequestDto = Record<string, any>;
export type FecredInformCancelacionTotalResultDto = Record<string, any>;

export type FecredModifyTransferOptionRequestDto = Record<string, any>;
export type FecredModifyTransferOptionResultDto = Record<string, any>;

export type FecredConsultarComprobantesRequestDto = Record<string, any>;
export type FecredConsultarComprobantesResultDto = Record<string, any>;

export type FecredConsultarCtaCteRequestDto = Record<string, any>;
export type FecredConsultarCtaCteResultDto = Record<string, any>;

export type FecredConsultarCtasCtesRequestDto = Record<string, any>;
export type FecredConsultarCtasCtesResultDto = Record<string, any>;

export type FecredConsultarCuentasEnAgtDptoCltvRequestDto = Record<string, any>;
export type FecredConsultarCuentasEnAgtDptoCltvResultDto = Record<string, any>;

export type FecredConsultarFacturasAgtDptoCltvRequestDto = Record<string, any>;
export type FecredConsultarFacturasAgtDptoCltvResultDto = Record<string, any>;

export type FecredConsultarHistorialEstadosComprobanteRequestDto =
  Record<string, any>;
export type FecredConsultarHistorialEstadosComprobanteResultDto =
  Record<string, any>;

export type FecredConsultarHistorialEstadosCtaCteRequestDto = Record<string, any>;
export type FecredConsultarHistorialEstadosCtaCteResultDto =
  Record<string, any>;

export type FecredConsultarMontoObligadoRecepcionRequestDto = Record<string, any>;
export type FecredConsultarMontoObligadoRecepcionResultDto = Record<string, any>;

export type FecredConsultarObligadoRecepcionRequestDto = Record<string, any>;
export type FecredConsultarObligadoRecepcionResultDto = Record<string, any>;

export type FecredConsultarTiposAjustesOperacionRequestDto = Record<string, any>;
export type FecredConsultarTiposAjustesOperacionResultDto = Record<string, any>;

export type FecredConsultarTiposFormasCancelacionRequestDto = Record<string, any>;
export type FecredConsultarTiposFormasCancelacionResultDto = Record<string, any>;

export type FecredConsultarTiposMotivosRechazoRequestDto = Record<string, any>;
export type FecredConsultarTiposMotivosRechazoResultDto = Record<string, any>;

export type FecredConsultarTiposRetencionesRequestDto = Record<string, any>;
export type FecredConsultarTiposRetencionesResultDto = Record<string, any>;

export type FecredObtenerRemitosRequestDto = Record<string, any>;
export type FecredObtenerRemitosResultDto = Record<string, any>;
