import { WsfecredService } from "@arcasdk/core/src/application/services/wsfecred.service";
import { IWsfecredRepositoryPort } from "@arcasdk/core/src/application/ports/fecred/fecred-repository.port";

describe("WsfecredService", () => {
  let service: WsfecredService;
  let repository: jest.Mocked<IWsfecredRepositoryPort>;

  beforeEach(() => {
    repository = {
      getServerStatus: jest.fn(),
      aceptarFECred: jest.fn(),
      rechazarFECred: jest.fn(),
      rechazarNotaDC: jest.fn(),
      informarFacturaAgtDptoCltv: jest.fn(),
      informarCancelacionTotalFECred: jest.fn(),
      modificarOpcionTransferencia: jest.fn(),
      consultarComprobantes: jest.fn(),
      consultarCtaCte: jest.fn(),
      consultarCtasCtes: jest.fn(),
      consultarCuentasEnAgtDptoCltv: jest.fn(),
      consultarFacturasAgtDptoCltv: jest.fn(),
      consultarHistorialEstadosComprobante: jest.fn(),
      consultarHistorialEstadosCtaCte: jest.fn(),
      consultarMontoObligadoRecepcion: jest.fn(),
      consultarObligadoRecepcion: jest.fn(),
      consultarTiposAjustesOperacion: jest.fn(),
      consultarTiposFormasCancelacion: jest.fn(),
      consultarTiposMotivosRechazo: jest.fn(),
      consultarTiposRetenciones: jest.fn(),
      obtenerRemitos: jest.fn(),
    };

    service = new WsfecredService(repository);
  });

  it("should return server status", async () => {
    repository.getServerStatus.mockResolvedValue({
      appserver: "OK",
      dbserver: "OK",
      authserver: "OK",
    });

    const result = await service.getServerStatus();

    expect(repository.getServerStatus).toHaveBeenCalled();
    expect(result).toEqual({
      appserver: "OK",
      dbserver: "OK",
      authserver: "OK",
    });
  });

  it("should accept a FECred invoice", async () => {
    const params = { idCtaCte: 123456 };
    repository.aceptarFECred.mockResolvedValue({ resultado: "A" } as any);

    const result = await service.aceptarFECred(params);

    expect(repository.aceptarFECred).toHaveBeenCalledWith(params);
    expect(result).toEqual({ resultado: "A" });
  });

  it("should consult comprobantes", async () => {
    const params = { rolCUITRepresentada: "COMPRADOR", nroPagina: 1 };
    repository.consultarComprobantes.mockResolvedValue({} as any);

    await service.consultarComprobantes(params);

    expect(repository.consultarComprobantes).toHaveBeenCalledWith(params);
  });

  it("should fetch rejection reasons", async () => {
    const params = { rolCUITRepresentada: "COMPRADOR" };
    repository.consultarTiposMotivosRechazo.mockResolvedValue({} as any);

    await service.consultarTiposMotivosRechazo(params);

    expect(repository.consultarTiposMotivosRechazo).toHaveBeenCalledWith(params);
  });

  it("should use consultarMontoObligadoRecepcion for legacy consultarObligadoRecepcion", async () => {
    const params = { cuitConsultada: 20210861220, importeComprobante: 1000 };
    repository.consultarMontoObligadoRecepcion.mockResolvedValue({} as any);

    await service.consultarObligadoRecepcion(params as any);

    expect(repository.consultarMontoObligadoRecepcion).toHaveBeenCalledWith(
      params
    );
  });
});
