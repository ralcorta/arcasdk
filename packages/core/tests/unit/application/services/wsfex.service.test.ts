import { WsfexService } from "@arcasdk/core/src/application/services/wsfex.service";
import { IWsfexRepositoryPort } from "@arcasdk/core/src/application/ports/fex/fex-repository.port";

describe("WsfexService", () => {
  let service: WsfexService;
  let repository: jest.Mocked<IWsfexRepositoryPort>;

  beforeEach(() => {
    repository = {
      getServerStatus: jest.fn(),
      authorize: jest.fn(),
      getCmp: jest.fn(),
      getLastCmp: jest.fn(),
      getLastId: jest.fn(),
      checkPermiso: jest.fn(),
      getParamPtoVenta: jest.fn(),
      getParamCbteTipo: jest.fn(),
      getParamTipoExpo: jest.fn(),
      getParamIncoterms: jest.fn(),
      getParamIdiomas: jest.fn(),
      getParamUmed: jest.fn(),
      getParamDstPais: jest.fn(),
      getParamDstCuit: jest.fn(),
      getParamMon: jest.fn(),
      getParamMonCotizacion: jest.fn(),
      getParamCtz: jest.fn(),
      getParamOpcionales: jest.fn(),
      getParamActividades: jest.fn(),
    };

    service = new WsfexService(repository);
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

  it("should authorize export voucher", async () => {
    const cmp = { Cbte_tipo: 19 };
    repository.authorize.mockResolvedValue({ Resultado: "A" } as any);

    const result = await service.authorize(cmp);

    expect(repository.authorize).toHaveBeenCalledWith(cmp);
    expect(result).toEqual({ Resultado: "A" });
  });

  it("should get export voucher data", async () => {
    const params = { Cbte_tipo: 19, Punto_vta: 1, Cbte_nro: 100 };
    repository.getCmp.mockResolvedValue({} as any);

    await service.getCmp(params);

    expect(repository.getCmp).toHaveBeenCalledWith(params);
  });

  it("should get currency quotation", async () => {
    const params = { Mon_id: "USD" };
    repository.getParamCtz.mockResolvedValue({} as any);

    await service.getParamCtz(params);

    expect(repository.getParamCtz).toHaveBeenCalledWith(params);
  });
});