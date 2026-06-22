import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
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
import { AceptarFECredUseCase } from "@application/use-cases/wsfecred/aceptar-fecred.use-case";
import { RechazarFECredUseCase } from "@application/use-cases/wsfecred/rechazar-fecred.use-case";
import { ConsultarComprobantesUseCase } from "@application/use-cases/wsfecred/consultar-comprobantes.use-case";
import { ConsultarCtasCtesUseCase } from "@application/use-cases/wsfecred/consultar-ctas-ctes.use-case";
import { ConsultarCtaCteUseCase } from "@application/use-cases/wsfecred/consultar-cta-cte.use-case";
import { InformarCancelacionTotalFECredUseCase } from "@application/use-cases/wsfecred/informar-cancelacion-total-fecred.use-case";
import { RechazarNotaDCUseCase } from "@application/use-cases/wsfecred/rechazar-nota-dc.use-case";
import { InformarFacturaAgtDptoCltvUseCase } from "@application/use-cases/wsfecred/informar-factura-agt-dpto-cltv.use-case";
import { ConsultarFacturasAgtDptoCltvUseCase } from "@application/use-cases/wsfecred/consultar-facturas-agt-dpto-cltv.use-case";
import { ConsultarCuentasEnAgtDptoCltvUseCase } from "@application/use-cases/wsfecred/consultar-cuentas-en-agt-dpto-cltv.use-case";
import { ConsultarObligadoRecepcionUseCase } from "@application/use-cases/wsfecred/consultar-obligado-recepcion.use-case";
import { ConsultarTiposRetencionesUseCase } from "@application/use-cases/wsfecred/consultar-tipos-retenciones.use-case";
import { ConsultarTiposMotivosRechazoUseCase } from "@application/use-cases/wsfecred/consultar-tipos-motivos-rechazo.use-case";
import { ConsultarTiposFormasCancelacionUseCase } from "@application/use-cases/wsfecred/consultar-tipos-formas-cancelacion.use-case";
import { ObtenerRemitosUseCase } from "@application/use-cases/wsfecred/obtener-remitos.use-case";
import { ConsultarHistorialEstadosComprobanteUseCase } from "@application/use-cases/wsfecred/consultar-historial-estados-comprobante.use-case";
import { ConsultarHistorialEstadosCtaCteUseCase } from "@application/use-cases/wsfecred/consultar-historial-estados-cta-cte.use-case";
import { ConsultarTiposAjustesOperacionUseCase } from "@application/use-cases/wsfecred/consultar-tipos-ajustes-operacion.use-case";
import { ConsultarMontoObligadoRecepcionUseCase } from "@application/use-cases/wsfecred/consultar-monto-obligado-recepcion.use-case";
import { ModificarOpcionTransferenciaUseCase } from "@application/use-cases/wsfecred/modificar-opcion-transferencia.use-case";

export class WsfecredService {
  private readonly aceptarFECredUseCase: AceptarFECredUseCase;
  private readonly rechazarFECredUseCase: RechazarFECredUseCase;
  private readonly consultarComprobantesUseCase: ConsultarComprobantesUseCase;
  private readonly consultarCtasCtesUseCase: ConsultarCtasCtesUseCase;
  private readonly consultarCtaCteUseCase: ConsultarCtaCteUseCase;
  private readonly informarCancelacionTotalFECredUseCase: InformarCancelacionTotalFECredUseCase;
  private readonly rechazarNotaDCUseCase: RechazarNotaDCUseCase;
  private readonly informarFacturaAgtDptoCltvUseCase: InformarFacturaAgtDptoCltvUseCase;
  private readonly consultarFacturasAgtDptoCltvUseCase: ConsultarFacturasAgtDptoCltvUseCase;
  private readonly consultarCuentasEnAgtDptoCltvUseCase: ConsultarCuentasEnAgtDptoCltvUseCase;
  private readonly consultarObligadoRecepcionUseCase: ConsultarObligadoRecepcionUseCase;
  private readonly consultarTiposRetencionesUseCase: ConsultarTiposRetencionesUseCase;
  private readonly consultarTiposMotivosRechazoUseCase: ConsultarTiposMotivosRechazoUseCase;
  private readonly consultarTiposFormasCancelacionUseCase: ConsultarTiposFormasCancelacionUseCase;
  private readonly obtenerRemitosUseCase: ObtenerRemitosUseCase;
  private readonly consultarHistorialEstadosComprobanteUseCase: ConsultarHistorialEstadosComprobanteUseCase;
  private readonly consultarHistorialEstadosCtaCteUseCase: ConsultarHistorialEstadosCtaCteUseCase;
  private readonly consultarTiposAjustesOperacionUseCase: ConsultarTiposAjustesOperacionUseCase;
  private readonly consultarMontoObligadoRecepcionUseCase: ConsultarMontoObligadoRecepcionUseCase;
  private readonly modificarOpcionTransferenciaUseCase: ModificarOpcionTransferenciaUseCase;

  constructor(private readonly repository: IFecredRepositoryPort) {
    this.aceptarFECredUseCase = new AceptarFECredUseCase(this.repository);
    this.rechazarFECredUseCase = new RechazarFECredUseCase(this.repository);
    this.consultarComprobantesUseCase = new ConsultarComprobantesUseCase(
      this.repository,
    );
    this.consultarCtasCtesUseCase = new ConsultarCtasCtesUseCase(
      this.repository,
    );
    this.consultarCtaCteUseCase = new ConsultarCtaCteUseCase(this.repository);
    this.informarCancelacionTotalFECredUseCase =
      new InformarCancelacionTotalFECredUseCase(this.repository);
    this.rechazarNotaDCUseCase = new RechazarNotaDCUseCase(this.repository);
    this.informarFacturaAgtDptoCltvUseCase =
      new InformarFacturaAgtDptoCltvUseCase(this.repository);
    this.consultarFacturasAgtDptoCltvUseCase =
      new ConsultarFacturasAgtDptoCltvUseCase(this.repository);
    this.consultarCuentasEnAgtDptoCltvUseCase =
      new ConsultarCuentasEnAgtDptoCltvUseCase(this.repository);
    this.consultarObligadoRecepcionUseCase =
      new ConsultarObligadoRecepcionUseCase(this.repository);
    this.consultarTiposRetencionesUseCase =
      new ConsultarTiposRetencionesUseCase(this.repository);
    this.consultarTiposMotivosRechazoUseCase =
      new ConsultarTiposMotivosRechazoUseCase(this.repository);
    this.consultarTiposFormasCancelacionUseCase =
      new ConsultarTiposFormasCancelacionUseCase(this.repository);
    this.obtenerRemitosUseCase = new ObtenerRemitosUseCase(this.repository);
    this.consultarHistorialEstadosComprobanteUseCase =
      new ConsultarHistorialEstadosComprobanteUseCase(this.repository);
    this.consultarHistorialEstadosCtaCteUseCase =
      new ConsultarHistorialEstadosCtaCteUseCase(this.repository);
    this.consultarTiposAjustesOperacionUseCase =
      new ConsultarTiposAjustesOperacionUseCase(this.repository);
    this.consultarMontoObligadoRecepcionUseCase =
      new ConsultarMontoObligadoRecepcionUseCase(this.repository);
    this.modificarOpcionTransferenciaUseCase =
      new ModificarOpcionTransferenciaUseCase(this.repository);
  }

  async aceptarFECred(
    input: IaceptarFECredInput,
  ): Promise<IaceptarFECredOutput> {
    return this.aceptarFECredUseCase.execute(input);
  }

  async rechazarFECred(
    input: IrechazarFECredInput,
  ): Promise<IrechazarFECredOutput> {
    return this.rechazarFECredUseCase.execute(input);
  }

  async consultarComprobantes(
    input: IconsultarComprobantesInput,
  ): Promise<IconsultarComprobantesOutput> {
    return this.consultarComprobantesUseCase.execute(input);
  }

  async consultarCtasCtes(
    input: IconsultarCtasCtesInput,
  ): Promise<IconsultarCtasCtesOutput> {
    return this.consultarCtasCtesUseCase.execute(input);
  }

  async consultarCtaCte(
    input: IconsultarCtaCteInput,
  ): Promise<IconsultarCtaCteOutput> {
    return this.consultarCtaCteUseCase.execute(input);
  }

  async informarCancelacionTotalFECred(
    input: IinformarCancelacionTotalFECredInput,
  ): Promise<IinformarCancelacionTotalFECredOutput> {
    return this.informarCancelacionTotalFECredUseCase.execute(input);
  }

  async rechazarNotaDC(
    input: IrechazarNotaDCInput,
  ): Promise<IrechazarNotaDCOutput> {
    return this.rechazarNotaDCUseCase.execute(input);
  }

  async informarFacturaAgtDptoCltv(
    input: IinformarFacturaAgtDptoCltvInput,
  ): Promise<IinformarFacturaAgtDptoCltvOutput> {
    return this.informarFacturaAgtDptoCltvUseCase.execute(input);
  }

  async consultarFacturasAgtDptoCltv(
    input: IconsultarFacturasAgtDptoCltvInput,
  ): Promise<IconsultarFacturasAgtDptoCltvOutput> {
    return this.consultarFacturasAgtDptoCltvUseCase.execute(input);
  }

  async consultarCuentasEnAgtDptoCltv(): Promise<IconsultarCuentasEnAgtDptoCltvOutput> {
    return this.consultarCuentasEnAgtDptoCltvUseCase.execute();
  }

  async consultarObligadoRecepcion(
    input: IconsultarObligadoRecepcionInput,
  ): Promise<IconsultarObligadoRecepcionOutput> {
    return this.consultarObligadoRecepcionUseCase.execute(input);
  }

  async consultarTiposRetenciones(): Promise<IconsultarTiposRetencionesOutput> {
    return this.consultarTiposRetencionesUseCase.execute();
  }

  async consultarTiposMotivosRechazo(): Promise<IconsultarTiposMotivosRechazoOutput> {
    return this.consultarTiposMotivosRechazoUseCase.execute();
  }

  async consultarTiposFormasCancelacion(): Promise<IconsultarTiposFormasCancelacionOutput> {
    return this.consultarTiposFormasCancelacionUseCase.execute();
  }

  async obtenerRemitos(
    input: IobtenerRemitosInput,
  ): Promise<IobtenerRemitosOutput> {
    return this.obtenerRemitosUseCase.execute(input);
  }

  async consultarHistorialEstadosComprobante(
    input: IconsultarHistorialEstadosComprobanteInput,
  ): Promise<IconsultarHistorialEstadosComprobanteOutput> {
    return this.consultarHistorialEstadosComprobanteUseCase.execute(input);
  }

  async consultarHistorialEstadosCtaCte(
    input: IconsultarHistorialEstadosCtaCteInput,
  ): Promise<IconsultarHistorialEstadosCtaCteOutput> {
    return this.consultarHistorialEstadosCtaCteUseCase.execute(input);
  }

  async consultarTiposAjustesOperacion(): Promise<IconsultarTiposAjustesOperacionOutput> {
    return this.consultarTiposAjustesOperacionUseCase.execute();
  }

  async consultarMontoObligadoRecepcion(
    input: IconsultarMontoObligadoRecepcionInput,
  ): Promise<IconsultarMontoObligadoRecepcionOutput> {
    return this.consultarMontoObligadoRecepcionUseCase.execute(input);
  }

  async modificarOpcionTransferencia(
    input: ImodificarOpcionTransferenciaInput,
  ): Promise<ImodificarOpcionTransferenciaOutput> {
    return this.modificarOpcionTransferenciaUseCase.execute(input);
  }

  // dummy() no expuesto: el WSDL de AFIP define dummyRequest sin body,
  // pero el servidor exige auth → incompatibilidad que impide su uso.
  // async dummy(): Promise<IdummyOutput> {
  //   return this.dummyUseCase.execute();
  // }
}
