import { WscdcService } from "@application/services/wscdc.service";
import { ICdcRepositoryPort } from "@application/ports/cdc/cdc-repository.port";

describe("WscdcService", () => {
  let service: WscdcService;
  let mockRepository: jest.Mocked<ICdcRepositoryPort>;

  beforeEach(() => {
    mockRepository = {
      constatarComprobante: jest.fn(),
      getComprobantesModalidad: jest.fn(),
      getComprobantesTipo: jest.fn(),
      getDocumentosTipo: jest.fn(),
      getOpcionalesTipo: jest.fn(),
      dummy: jest.fn(),
    } as jest.Mocked<ICdcRepositoryPort>;

    service = new WscdcService(mockRepository);
  });

  it("constatarComprobante delegates to repository", async () => {
    const input = {} as never;
    const expected = { ComprobanteConstatarResult: {} };
    mockRepository.constatarComprobante.mockResolvedValue(expected as never);

    const result = await service.constatarComprobante(input);

    expect(result).toEqual(expected);
    expect(mockRepository.constatarComprobante).toHaveBeenCalledWith(input);
  });

  it("getComprobantesModalidad delegates to repository", async () => {
    const expected = { ComprobantesModalidadConsultarResult: {} };
    mockRepository.getComprobantesModalidad.mockResolvedValue(expected as never);

    const result = await service.getComprobantesModalidad();

    expect(result).toEqual(expected);
  });

  it("getComprobantesTipo delegates to repository", async () => {
    const expected = { ComprobantesTipoConsultarResult: {} };
    mockRepository.getComprobantesTipo.mockResolvedValue(expected as never);

    const result = await service.getComprobantesTipo();

    expect(result).toEqual(expected);
  });

  it("getDocumentosTipo delegates to repository", async () => {
    const expected = { DocumentosTipoConsultarResult: {} };
    mockRepository.getDocumentosTipo.mockResolvedValue(expected as never);

    const result = await service.getDocumentosTipo();

    expect(result).toEqual(expected);
  });

  it("getOpcionalesTipo delegates to repository", async () => {
    const expected = { OpcionalesTipoConsultarResult: {} };
    mockRepository.getOpcionalesTipo.mockResolvedValue(expected as never);

    const result = await service.getOpcionalesTipo();

    expect(result).toEqual(expected);
  });

  it("dummy delegates to repository", async () => {
    const expected = { ComprobanteDummyResult: {} };
    mockRepository.dummy.mockResolvedValue(expected as never);

    const result = await service.dummy();

    expect(result).toEqual(expected);
  });
});
