import { WsfexService } from "@application/services/wsfex.service";
import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";

describe("WsfexService", () => {
  let service: WsfexService;
  let mockRepository: jest.Mocked<IFexRepositoryPort>;

  beforeEach(() => {
    mockRepository = {
      authorize: jest.fn(),
      getCmp: jest.fn(),
      getLastCmp: jest.fn(),
      getLastId: jest.fn(),
      checkPermiso: jest.fn(),
      getParamCbteTipo: jest.fn(),
      getParamTipoExpo: jest.fn(),
      getParamIncoterms: jest.fn(),
      getParamIdiomas: jest.fn(),
      getParamUMed: jest.fn(),
      getParamDstPais: jest.fn(),
      getParamDstCuit: jest.fn(),
      getParamMon: jest.fn(),
      getParamMonConCotizacion: jest.fn(),
      getParamCtz: jest.fn(),
      getParamPtoVenta: jest.fn(),
      getParamOpcionales: jest.fn(),
      getParamActividades: jest.fn(),
      dummy: jest.fn(),
    } as jest.Mocked<IFexRepositoryPort>;

    service = new WsfexService(mockRepository);
  });

  it("authorize delegates to repository", async () => {
    const input = {} as never;
    const expected = { FEXAuthorizeResult: {} };
    mockRepository.authorize.mockResolvedValue(expected as never);

    const result = await service.authorize(input);

    expect(result).toEqual(expected);
  });

  it("getCmp delegates to repository", async () => {
    const input = {} as never;
    const expected = { FEXGetCMPResult: {} };
    mockRepository.getCmp.mockResolvedValue(expected as never);

    const result = await service.getCmp(input);

    expect(result).toEqual(expected);
  });

  it("getLastCmp delegates to repository", async () => {
    const input = {} as never;
    const expected = { FEXGetLast_CMPResult: {} };
    mockRepository.getLastCmp.mockResolvedValue(expected as never);

    const result = await service.getLastCmp(input);

    expect(result).toEqual(expected);
  });

  it("getLastId delegates to repository", async () => {
    const input = {} as never;
    const expected = { FEXGetLast_IDResult: {} };
    mockRepository.getLastId.mockResolvedValue(expected as never);

    const result = await service.getLastId(input);

    expect(result).toEqual(expected);
  });

  it("checkPermiso delegates to repository", async () => {
    const input = {} as never;
    const expected = { FEXCheck_PermisoResult: {} };
    mockRepository.checkPermiso.mockResolvedValue(expected as never);

    const result = await service.checkPermiso(input);

    expect(result).toEqual(expected);
  });

  it("getParamCbteTipo delegates to repository", async () => {
    const input = {} as never;
    const expected = { FEXGetPARAM_Cbte_TipoResult: {} };
    mockRepository.getParamCbteTipo.mockResolvedValue(expected as never);

    const result = await service.getParamCbteTipo(input);

    expect(result).toEqual(expected);
  });

  it("getParamTipoExpo delegates to repository", async () => {
    const input = {} as never;
    const expected = { FEXGetPARAM_Tipo_ExpoResult: {} };
    mockRepository.getParamTipoExpo.mockResolvedValue(expected as never);

    const result = await service.getParamTipoExpo(input);

    expect(result).toEqual(expected);
  });

  it("getParamIncoterms delegates to repository", async () => {
    const input = {} as never;
    const expected = { FEXGetPARAM_IncotermsResult: {} };
    mockRepository.getParamIncoterms.mockResolvedValue(expected as never);

    const result = await service.getParamIncoterms(input);

    expect(result).toEqual(expected);
  });

  it("getParamIdiomas delegates to repository", async () => {
    const input = {} as never;
    const expected = { FEXGetPARAM_IdiomasResult: {} };
    mockRepository.getParamIdiomas.mockResolvedValue(expected as never);

    const result = await service.getParamIdiomas(input);

    expect(result).toEqual(expected);
  });

  it("getParamUMed delegates to repository", async () => {
    const input = {} as never;
    const expected = { FEXGetPARAM_UMedResult: {} };
    mockRepository.getParamUMed.mockResolvedValue(expected as never);

    const result = await service.getParamUMed(input);

    expect(result).toEqual(expected);
  });

  it("getParamDstPais delegates to repository", async () => {
    const input = {} as never;
    const expected = { FEXGetPARAM_DST_paisResult: {} };
    mockRepository.getParamDstPais.mockResolvedValue(expected as never);

    const result = await service.getParamDstPais(input);

    expect(result).toEqual(expected);
  });

  it("getParamDstCuit delegates to repository", async () => {
    const input = {} as never;
    const expected = { FEXGetPARAM_DST_CUITResult: {} };
    mockRepository.getParamDstCuit.mockResolvedValue(expected as never);

    const result = await service.getParamDstCuit(input);

    expect(result).toEqual(expected);
  });

  it("getParamMon delegates to repository", async () => {
    const input = {} as never;
    const expected = { FEXGetPARAM_MONResult: {} };
    mockRepository.getParamMon.mockResolvedValue(expected as never);

    const result = await service.getParamMon(input);

    expect(result).toEqual(expected);
  });

  it("getParamMonConCotizacion delegates to repository", async () => {
    const input = {} as never;
    const expected = { FEXGetPARAM_MON_CON_COTIZACIONResult: {} };
    mockRepository.getParamMonConCotizacion.mockResolvedValue(
      expected as never,
    );

    const result = await service.getParamMonConCotizacion(input);

    expect(result).toEqual(expected);
  });

  it("getParamCtz delegates to repository", async () => {
    const input = {} as never;
    const expected = { FEXGetPARAM_CtzResult: {} };
    mockRepository.getParamCtz.mockResolvedValue(expected as never);

    const result = await service.getParamCtz(input);

    expect(result).toEqual(expected);
  });

  it("getParamPtoVenta delegates to repository", async () => {
    const input = {} as never;
    const expected = { FEXGetPARAM_PtoVentaResult: {} };
    mockRepository.getParamPtoVenta.mockResolvedValue(expected as never);

    const result = await service.getParamPtoVenta(input);

    expect(result).toEqual(expected);
  });

  it("getParamOpcionales delegates to repository", async () => {
    const input = {} as never;
    const expected = { FEXGetPARAM_OpcionalesResult: {} };
    mockRepository.getParamOpcionales.mockResolvedValue(expected as never);

    const result = await service.getParamOpcionales(input);

    expect(result).toEqual(expected);
  });

  it("getParamActividades delegates to repository", async () => {
    const input = {} as never;
    const expected = { FEXGetPARAM_ActividadesResult: {} };
    mockRepository.getParamActividades.mockResolvedValue(expected as never);

    const result = await service.getParamActividades(input);

    expect(result).toEqual(expected);
  });

  it("dummy delegates to repository", async () => {
    const expected = {
      FEXDummyResult: {
        AppServer: "OK",
        DbServer: "OK",
        AuthServer: "OK",
      },
    };
    mockRepository.dummy.mockResolvedValue(expected as never);

    const result = await service.dummy();

    expect(result).toEqual(expected);
  });
});
