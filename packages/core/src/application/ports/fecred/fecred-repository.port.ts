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
  // IdummyOutput,
} from "@application/dto/fecred";

export interface IFecredRepositoryPort {
  /**
   * Accept an electronic credit invoice (Cuenta Corriente)
   * @param input Acceptance data including account ID and cancellation details
   * @returns Operation result
   */
  aceptarFECred(input: IaceptarFECredInput): Promise<IaceptarFECredOutput>;

  /**
   * Reject an electronic credit invoice
   * @param input Rejection data including account ID and rejection reasons
   * @returns Operation result
   */
  rechazarFECred(input: IrechazarFECredInput): Promise<IrechazarFECredOutput>;

  /**
   * Query invoices
   * @param input Query filters (role, counterpart, type, status, dates)
   * @returns Matching invoices list
   */
  consultarComprobantes(
    input: IconsultarComprobantesInput,
  ): Promise<IconsultarComprobantesOutput>;

  /**
   * Query current accounts (Cuentas Corrientes)
   * @param input Query filters (role, counterpart, dates, status)
   * @returns Matching current accounts list
   */
  consultarCtasCtes(
    input: IconsultarCtasCtesInput,
  ): Promise<IconsultarCtasCtesOutput>;

  /**
   * Query a specific current account
   * @param input Current account ID
   * @returns Current account details
   */
  consultarCtaCte(
    input: IconsultarCtaCteInput,
  ): Promise<IconsultarCtaCteOutput>;

  /**
   * Report total cancellation of an electronic credit invoice
   * @param input Account ID, cancellation forms and amount
   * @returns Operation result
   */
  informarCancelacionTotalFECred(
    input: IinformarCancelacionTotalFECredInput,
  ): Promise<IinformarCancelacionTotalFECredOutput>;

  /**
   * Reject a debit/credit note
   * @param input Invoice ID and rejection reasons
   * @returns Operation result
   */
  rechazarNotaDC(input: IrechazarNotaDCInput): Promise<IrechazarNotaDCOutput>;

  /**
   * Report invoice to collection agent (Agente de Depósito Colectivo)
   * @param input Account ID and agent account data
   * @returns Operation result
   */
  informarFacturaAgtDptoCltv(
    input: IinformarFacturaAgtDptoCltvInput,
  ): Promise<IinformarFacturaAgtDptoCltvOutput>;

  /**
   * Query invoices in collection agent
   * @param input Account ID and date filter
   * @returns Invoices in collection agent
   */
  consultarFacturasAgtDptoCltv(
    input: IconsultarFacturasAgtDptoCltvInput,
  ): Promise<IconsultarFacturasAgtDptoCltvOutput>;

  /**
   * Query accounts in collection agent
   * @returns Accounts in collection agent
   */
  consultarCuentasEnAgtDptoCltv(): Promise<IconsultarCuentasEnAgtDptoCltvOutput>;

  /**
   * Check if a taxpayer is required to receive electronic credit invoices
   * @param input CUIT to query
   * @returns Obligation status
   */
  consultarObligadoRecepcion(
    input: IconsultarObligadoRecepcionInput,
  ): Promise<IconsultarObligadoRecepcionOutput>;

  /**
   * Get available retention types
   * @returns Retention types list
   */
  consultarTiposRetenciones(): Promise<IconsultarTiposRetencionesOutput>;

  /**
   * Get available rejection reason types
   * @returns Rejection reason types list
   */
  consultarTiposMotivosRechazo(): Promise<IconsultarTiposMotivosRechazoOutput>;

  /**
   * Get available cancellation form types
   * @returns Cancellation form types list
   */
  consultarTiposFormasCancelacion(): Promise<IconsultarTiposFormasCancelacionOutput>;

  /**
   * Get remitos (delivery notes) for an invoice
   * @param input Invoice ID
   * @returns Remitos list
   */
  obtenerRemitos(input: IobtenerRemitosInput): Promise<IobtenerRemitosOutput>;

  /**
   * Get status history for an invoice
   * @param input Invoice ID
   * @returns Status history
   */
  consultarHistorialEstadosComprobante(
    input: IconsultarHistorialEstadosComprobanteInput,
  ): Promise<IconsultarHistorialEstadosComprobanteOutput>;

  /**
   * Get status history for a current account
   * @param input Current account ID
   * @returns Status history
   */
  consultarHistorialEstadosCtaCte(
    input: IconsultarHistorialEstadosCtaCteInput,
  ): Promise<IconsultarHistorialEstadosCtaCteOutput>;

  /**
   * Get available operation adjustment types
   * @returns Adjustment types list
   */
  consultarTiposAjustesOperacion(): Promise<IconsultarTiposAjustesOperacionOutput>;

  /**
   * Check the mandatory reception amount for a taxpayer
   * @param input CUIT and emission date
   * @returns Mandatory reception amount
   */
  consultarMontoObligadoRecepcion(
    input: IconsultarMontoObligadoRecepcionInput,
  ): Promise<IconsultarMontoObligadoRecepcionOutput>;

  /**
   * Modify transfer option for a current account
   * @param input Current account ID and transfer option (SCA/ADC)
   * @returns Operation result
   */
  modificarOpcionTransferencia(
    input: ImodificarOpcionTransferenciaInput,
  ): Promise<ImodificarOpcionTransferenciaOutput>;

  // dummy() no expuesto: AFIP define dummyRequest sin body pero exige auth.
  // dummy(): Promise<IdummyOutput>;
}
