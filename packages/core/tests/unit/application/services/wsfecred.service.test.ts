import { WsfecredService } from "@application/services/wsfecred.service";
import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";

describe("WsfecredService", () => {
  let service: WsfecredService;
  let mockRepository: jest.Mocked<IFecredRepositoryPort>;

  beforeEach(() => {
    mockRepository = {
      aceptarFECred: jest.fn(),
      rechazarFECred: jest.fn(),
      consultarComprobantes: jest.fn(),
      consultarCtasCtes: jest.fn(),
      consultarCtaCte: jest.fn(),
      informarCancelacionTotalFECred: jest.fn(),
      rechazarNotaDC: jest.fn(),
      informarFacturaAgtDptoCltv: jest.fn(),
      consultarFacturasAgtDptoCltv: jest.fn(),
      consultarCuentasEnAgtDptoCltv: jest.fn(),
      consultarObligadoRecepcion: jest.fn(),
      consultarTiposRetenciones: jest.fn(),
      consultarTiposMotivosRechazo: jest.fn(),
      consultarTiposFormasCancelacion: jest.fn(),
      obtenerRemitos: jest.fn(),
      consultarHistorialEstadosComprobante: jest.fn(),
      consultarHistorialEstadosCtaCte: jest.fn(),
      consultarTiposAjustesOperacion: jest.fn(),
      consultarMontoObligadoRecepcion: jest.fn(),
      modificarOpcionTransferencia: jest.fn(),
    } as jest.Mocked<IFecredRepositoryPort>;

    service = new WsfecredService(mockRepository);
  });

  it("aceptarFECred delegates to repository", async () => {
    const input = {} as never;
    const expected = { aceptarFECredReturn: {} };
    mockRepository.aceptarFECred.mockResolvedValue(expected as never);

    const result = await service.aceptarFECred(input);

    expect(result).toEqual(expected);
  });

  it("rechazarFECred delegates to repository", async () => {
    const input = {} as never;
    const expected = { rechazarFECredReturn: {} };
    mockRepository.rechazarFECred.mockResolvedValue(expected as never);

    const result = await service.rechazarFECred(input);

    expect(result).toEqual(expected);
  });

  it("consultarComprobantes delegates to repository", async () => {
    const input = {} as never;
    const expected = { consultarComprobantesReturn: {} };
    mockRepository.consultarComprobantes.mockResolvedValue(expected as never);

    const result = await service.consultarComprobantes(input);

    expect(result).toEqual(expected);
  });

  it("consultarCtasCtes delegates to repository", async () => {
    const input = {} as never;
    const expected = { consultarCtasCtesReturn: {} };
    mockRepository.consultarCtasCtes.mockResolvedValue(expected as never);

    const result = await service.consultarCtasCtes(input);

    expect(result).toEqual(expected);
  });

  it("consultarCtaCte delegates to repository", async () => {
    const input = {} as never;
    const expected = { consultarCtaCteReturn: {} };
    mockRepository.consultarCtaCte.mockResolvedValue(expected as never);

    const result = await service.consultarCtaCte(input);

    expect(result).toEqual(expected);
  });

  it("informarCancelacionTotalFECred delegates to repository", async () => {
    const input = {} as never;
    const expected = { informarCancelacionTotalFECredReturn: {} };
    mockRepository.informarCancelacionTotalFECred.mockResolvedValue(
      expected as never,
    );

    const result = await service.informarCancelacionTotalFECred(input);

    expect(result).toEqual(expected);
  });

  it("rechazarNotaDC delegates to repository", async () => {
    const input = {} as never;
    const expected = { rechazarNotaDCReturn: {} };
    mockRepository.rechazarNotaDC.mockResolvedValue(expected as never);

    const result = await service.rechazarNotaDC(input);

    expect(result).toEqual(expected);
  });

  it("informarFacturaAgtDptoCltv delegates to repository", async () => {
    const input = {} as never;
    const expected = { informarFacturaAgtDptoCltvReturn: {} };
    mockRepository.informarFacturaAgtDptoCltv.mockResolvedValue(
      expected as never,
    );

    const result = await service.informarFacturaAgtDptoCltv(input);

    expect(result).toEqual(expected);
  });

  it("consultarFacturasAgtDptoCltv delegates to repository", async () => {
    const input = {} as never;
    const expected = { consultarFacturasAgtDptoCltvReturn: {} };
    mockRepository.consultarFacturasAgtDptoCltv.mockResolvedValue(
      expected as never,
    );

    const result = await service.consultarFacturasAgtDptoCltv(input);

    expect(result).toEqual(expected);
  });

  it("consultarCuentasEnAgtDptoCltv delegates to repository (no input)", async () => {
    const expected = { consultarCuentasEnAgtDptoCltvReturn: {} };
    mockRepository.consultarCuentasEnAgtDptoCltv.mockResolvedValue(
      expected as never,
    );

    const result = await service.consultarCuentasEnAgtDptoCltv();

    expect(result).toEqual(expected);
  });

  it("consultarObligadoRecepcion delegates to repository", async () => {
    const input = {} as never;
    const expected = { consultarObligadoRecepcionReturn: {} };
    mockRepository.consultarObligadoRecepcion.mockResolvedValue(
      expected as never,
    );

    const result = await service.consultarObligadoRecepcion(input);

    expect(result).toEqual(expected);
  });

  it("consultarTiposRetenciones delegates to repository (no input)", async () => {
    const expected = { consultarTiposRetencionesReturn: {} };
    mockRepository.consultarTiposRetenciones.mockResolvedValue(
      expected as never,
    );

    const result = await service.consultarTiposRetenciones();

    expect(result).toEqual(expected);
  });

  it("consultarTiposMotivosRechazo delegates to repository (no input)", async () => {
    const expected = { codigoDescripcionReturn: {} };
    mockRepository.consultarTiposMotivosRechazo.mockResolvedValue(
      expected as never,
    );

    const result = await service.consultarTiposMotivosRechazo();

    expect(result).toEqual(expected);
  });

  it("consultarTiposFormasCancelacion delegates to repository (no input)", async () => {
    const expected = { codigoDescripcionReturn: {} };
    mockRepository.consultarTiposFormasCancelacion.mockResolvedValue(
      expected as never,
    );

    const result = await service.consultarTiposFormasCancelacion();

    expect(result).toEqual(expected);
  });

  it("obtenerRemitos delegates to repository", async () => {
    const input = {} as never;
    const expected = { obtenerRemitosReturn: {} };
    mockRepository.obtenerRemitos.mockResolvedValue(expected as never);

    const result = await service.obtenerRemitos(input);

    expect(result).toEqual(expected);
  });

  it("consultarHistorialEstadosComprobante delegates to repository", async () => {
    const input = {} as never;
    const expected = { consultarHistorialEstadosComprobanteReturn: {} };
    mockRepository.consultarHistorialEstadosComprobante.mockResolvedValue(
      expected as never,
    );

    const result = await service.consultarHistorialEstadosComprobante(input);

    expect(result).toEqual(expected);
  });

  it("consultarHistorialEstadosCtaCte delegates to repository", async () => {
    const input = {} as never;
    const expected = { consultarHistorialEstadosCtaCteReturn: {} };
    mockRepository.consultarHistorialEstadosCtaCte.mockResolvedValue(
      expected as never,
    );

    const result = await service.consultarHistorialEstadosCtaCte(input);

    expect(result).toEqual(expected);
  });

  it("consultarTiposAjustesOperacion delegates to repository (no input)", async () => {
    const expected = { codigoDescripcionReturn: {} };
    mockRepository.consultarTiposAjustesOperacion.mockResolvedValue(
      expected as never,
    );

    const result = await service.consultarTiposAjustesOperacion();

    expect(result).toEqual(expected);
  });

  it("consultarMontoObligadoRecepcion delegates to repository", async () => {
    const input = {} as never;
    const expected = { consultarMontoObligadoRecepcionReturn: {} };
    mockRepository.consultarMontoObligadoRecepcion.mockResolvedValue(
      expected as never,
    );

    const result = await service.consultarMontoObligadoRecepcion(input);

    expect(result).toEqual(expected);
  });

  it("modificarOpcionTransferencia delegates to repository", async () => {
    const input = {} as never;
    const expected = { modificarOpcionTransferenciaReturn: {} };
    mockRepository.modificarOpcionTransferencia.mockResolvedValue(
      expected as never,
    );

    const result = await service.modificarOpcionTransferencia(input);

    expect(result).toEqual(expected);
  });
});
