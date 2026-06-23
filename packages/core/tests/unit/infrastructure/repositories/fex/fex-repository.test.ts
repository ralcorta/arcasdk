import { FexRepository } from "@infrastructure/repositories/fex/fex.repository";
import { SoapClient } from "@infrastructure/soap/soap-client";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/types/soap-repository.types";
import { IServiceSoapSoap } from "@infrastructure/soap/contracts/FEXService/ServiceSoap";

jest.mock("@infrastructure/soap/soap-client");

describe("FexRepository", () => {
  let repository: FexRepository;
  let mockSoapClient: jest.Mocked<IServiceSoapSoap>;
  let mockConfig: BaseSoapRepositoryConstructorConfig;
  const expectedAuth = {
    Auth: { Token: "token", Sign: "sign", Cuit: 12345678901 },
  };

  beforeEach(() => {
    mockSoapClient = {
      FEXAuthorizeAsync: jest.fn(),
      FEXGetCMPAsync: jest.fn(),
      FEXGetLast_CMPAsync: jest.fn(),
      FEXGetLast_IDAsync: jest.fn(),
      FEXCheck_PermisoAsync: jest.fn(),
      FEXGetPARAM_Cbte_TipoAsync: jest.fn(),
      FEXGetPARAM_Tipo_ExpoAsync: jest.fn(),
      FEXGetPARAM_IncotermsAsync: jest.fn(),
      FEXGetPARAM_IdiomasAsync: jest.fn(),
      FEXGetPARAM_UMedAsync: jest.fn(),
      FEXGetPARAM_DST_paisAsync: jest.fn(),
      FEXGetPARAM_DST_CUITAsync: jest.fn(),
      FEXGetPARAM_MONAsync: jest.fn(),
      FEXGetPARAM_MON_CON_COTIZACIONAsync: jest.fn(),
      FEXGetPARAM_CtzAsync: jest.fn(),
      FEXGetPARAM_PtoVentaAsync: jest.fn(),
      FEXGetPARAM_OpcionalesAsync: jest.fn(),
      FEXGetPARAM_ActividadesAsync: jest.fn(),
      FEXDummyAsync: jest.fn(),
      setEndpoint: jest.fn(),
      describe: jest.fn().mockReturnValue({
        Service: {
          ServiceSoap12: {
            FEXAuthorize: { input: { Auth: {} } },
            FEXGetCMP: { input: { Auth: {} } },
            FEXGetLast_CMP: { input: { Auth: {} } },
            FEXGetLast_ID: { input: { Auth: {} } },
            FEXCheck_Permiso: { input: { Auth: {} } },
            FEXGetPARAM_Cbte_Tipo: { input: { Auth: {} } },
            FEXGetPARAM_Tipo_Expo: { input: { Auth: {} } },
            FEXGetPARAM_Incoterms: { input: { Auth: {} } },
            FEXGetPARAM_Idiomas: { input: { Auth: {} } },
            FEXGetPARAM_UMed: { input: { Auth: {} } },
            FEXGetPARAM_DST_pais: { input: { Auth: {} } },
            FEXGetPARAM_DST_CUIT: { input: { Auth: {} } },
            FEXGetPARAM_MON: { input: { Auth: {} } },
            FEXGetPARAM_MON_CON_COTIZACION: { input: { Auth: {} } },
            FEXGetPARAM_Ctz: { input: { Auth: {} } },
            FEXGetPARAM_PtoVenta: { input: { Auth: {} } },
            FEXGetPARAM_Opcionales: { input: { Auth: {} } },
            FEXGetPARAM_Actividades: { input: { Auth: {} } },
          },
        },
      }),
    } as never;

    (SoapClient.prototype.createClient as jest.Mock).mockResolvedValue(
      mockSoapClient,
    );

    const mockAuthRepository = {
      login: jest.fn().mockResolvedValue({ token: "token", sign: "sign" }),
      getAuthParams: jest.fn().mockReturnValue({
        Auth: { Token: "token", Sign: "sign", Cuit: 12345678901 },
      }),
    } as never;

    mockConfig = {
      authRepository: mockAuthRepository,
      cuit: 12345678901,
      production: false,
    };

    repository = new FexRepository(mockConfig);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("authorize", () => {
    it("should return authorization result", async () => {
      const mockResponse = {
        FEXAuthorizeResult: { FEXResultAuth: { CbteNro: 1 } },
      };
      mockSoapClient.FEXAuthorizeAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const input = { Cmp: { Cbte_Tipo: 19, Punto_vta: 1 } };
      const result = await repository.authorize(input as never);

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.FEXAuthorizeAsync).toHaveBeenCalledWith({
        ...input,
        ...expectedAuth,
      });
    });
  });

  describe("getCmp", () => {
    it("should return invoice details", async () => {
      const mockResponse = {
        FEXGetCMPResult: { FEXResultGet: { Cbte_nro: 1 } },
      };
      mockSoapClient.FEXGetCMPAsync.mockResolvedValue([mockResponse] as never);

      const input = {
        Cmp: { Cbte_tipo: 19, Punto_vta: 1, Cbte_nro: 1 },
      };
      const result = await repository.getCmp(input as never);

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.FEXGetCMPAsync).toHaveBeenCalledWith({
        ...input,
        ...expectedAuth,
      });
    });
  });

  describe("getLastCmp", () => {
    it("should return last invoice number", async () => {
      const mockResponse = {
        FEXGetLast_CMPResult: { FEXResult_LastCMP: { Cbte_nro: 42 } },
      };
      mockSoapClient.FEXGetLast_CMPAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const input = { Cbte_Tipo: 19, Pto_venta: 1 };
      const result = await repository.getLastCmp(input as never);

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.FEXGetLast_CMPAsync).toHaveBeenCalledWith({
        ...input,
        ...expectedAuth,
      });
    });
  });

  describe("getLastId", () => {
    it("should return last request ID", async () => {
      const mockResponse = {
        FEXGetLast_IDResult: { FEXResultGet: { Id: 100 } },
      };
      mockSoapClient.FEXGetLast_IDAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.getLastId({} as never);

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.FEXGetLast_IDAsync).toHaveBeenCalledWith({
        ...expectedAuth,
      });
    });
  });

  describe("checkPermiso", () => {
    it("should return permit check result", async () => {
      const mockResponse = {
        FEXCheck_PermisoResult: {
          FEXResultGet: { Status: "OK" },
        },
      };
      mockSoapClient.FEXCheck_PermisoAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const input = {
        ID_Permiso: "99999MANI123456A",
        Dst_merc: 203,
      };
      const result = await repository.checkPermiso(input as never);

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.FEXCheck_PermisoAsync).toHaveBeenCalledWith({
        ...input,
        ...expectedAuth,
      });
    });
  });

  describe("getParamCbteTipo", () => {
    it("should return invoice types", async () => {
      const mockResponse = {
        FEXGetPARAM_Cbte_TipoResult: {
          FEXResultGet: {
            ClsFEXResponse_Cbte_Tipo: [{ Cbte_Id: 19, Cbte_Ds: "Factura E" }],
          },
        },
      };
      mockSoapClient.FEXGetPARAM_Cbte_TipoAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.getParamCbteTipo({} as never);

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.FEXGetPARAM_Cbte_TipoAsync).toHaveBeenCalledWith({
        ...expectedAuth,
      });
    });
  });

  describe("getParamTipoExpo", () => {
    it("should return export types", async () => {
      const mockResponse = {
        FEXGetPARAM_Tipo_ExpoResult: {
          FEXResultGet: {
            ClsFEXResponse_Tex: [
              { Tex_Id: 1, Tex_Ds: "Exportación definitiva de bienes" },
            ],
          },
        },
      };
      mockSoapClient.FEXGetPARAM_Tipo_ExpoAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.getParamTipoExpo({} as never);

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.FEXGetPARAM_Tipo_ExpoAsync).toHaveBeenCalledWith({
        ...expectedAuth,
      });
    });
  });

  describe("getParamIncoterms", () => {
    it("should return incoterms", async () => {
      const mockResponse = {
        FEXGetPARAM_IncotermsResult: {
          FEXResultGet: {
            ClsFEXResponse_Inc: [{ Inc_Id: 1, Inc_Ds: "FOB" }],
          },
        },
      };
      mockSoapClient.FEXGetPARAM_IncotermsAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.getParamIncoterms({} as never);

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.FEXGetPARAM_IncotermsAsync).toHaveBeenCalledWith({
        ...expectedAuth,
      });
    });
  });

  describe("getParamIdiomas", () => {
    it("should return languages", async () => {
      const mockResponse = {
        FEXGetPARAM_IdiomasResult: {
          FEXResultGet: {
            ClsFEXResponse_Idi: [{ Idi_Id: 1, Idi_Ds: "Español" }],
          },
        },
      };
      mockSoapClient.FEXGetPARAM_IdiomasAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.getParamIdiomas({} as never);

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.FEXGetPARAM_IdiomasAsync).toHaveBeenCalledWith({
        ...expectedAuth,
      });
    });
  });

  describe("getParamUMed", () => {
    it("should return units of measurement", async () => {
      const mockResponse = {
        FEXGetPARAM_UMedResult: {
          FEXResultGet: {
            ClsFEXResponse_UMed: [{ Umed_Id: 1, Umed_Ds: "Kilogramo" }],
          },
        },
      };
      mockSoapClient.FEXGetPARAM_UMedAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.getParamUMed({} as never);

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.FEXGetPARAM_UMedAsync).toHaveBeenCalledWith({
        ...expectedAuth,
      });
    });
  });

  describe("getParamDstPais", () => {
    it("should return destination countries", async () => {
      const mockResponse = {
        FEXGetPARAM_DST_paisResult: {
          FEXResultGet: {
            ClsFEXResponse_DST_pais: [{ DST_Id: 203, DST_Ds: "Brasil" }],
          },
        },
      };
      mockSoapClient.FEXGetPARAM_DST_paisAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.getParamDstPais({} as never);

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.FEXGetPARAM_DST_paisAsync).toHaveBeenCalledWith({
        ...expectedAuth,
      });
    });
  });

  describe("getParamDstCuit", () => {
    it("should return destination CUITs", async () => {
      const mockResponse = {
        FEXGetPARAM_DST_CUITResult: {
          FEXResultGet: {
            ClsFEXResponse_DST_cuit: [
              { DST_CUIT: 55000000016, DST_Ds: "BRASIL" },
            ],
          },
        },
      };
      mockSoapClient.FEXGetPARAM_DST_CUITAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.getParamDstCuit({} as never);

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.FEXGetPARAM_DST_CUITAsync).toHaveBeenCalledWith({
        ...expectedAuth,
      });
    });
  });

  describe("getParamMon", () => {
    it("should return currencies", async () => {
      const mockResponse = {
        FEXGetPARAM_MONResult: {
          FEXResultGet: {
            ClsFEXResponse_Mon: [
              {
                Mon_Id: "DOL",
                Mon_Ds: "Dólar",
                Mon_vig_desde: "20030401",
                Mon_vig_hasta: "99991231",
              },
            ],
          },
        },
      };
      mockSoapClient.FEXGetPARAM_MONAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.getParamMon({} as never);

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.FEXGetPARAM_MONAsync).toHaveBeenCalledWith({
        ...expectedAuth,
      });
    });
  });

  describe("getParamMonConCotizacion", () => {
    it("should return currencies with exchange rates", async () => {
      const mockResponse = {
        FEXGetPARAM_MON_CON_COTIZACIONResult: {
          FEXResultGet: {
            ClsFEXResponse_Mon_CON_Cotizacion: [
              { Mon_Id: "DOL", Mon_Ds: "Dólar", Mon_ctz: 350 },
            ],
          },
        },
      };
      mockSoapClient.FEXGetPARAM_MON_CON_COTIZACIONAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const input = { Fecha_CTZ: "20231001" };
      const result = await repository.getParamMonConCotizacion(input as never);

      expect(result).toEqual(mockResponse);
      expect(
        mockSoapClient.FEXGetPARAM_MON_CON_COTIZACIONAsync,
      ).toHaveBeenCalledWith({
        ...input,
        ...expectedAuth,
      });
    });
  });

  describe("getParamCtz", () => {
    it("should return exchange rate", async () => {
      const mockResponse = {
        FEXGetPARAM_CtzResult: {
          FEXResultGet: { Mon_ctz: 350, Mon_Id: "DOL" },
        },
      };
      mockSoapClient.FEXGetPARAM_CtzAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const input = { Mon_id: "DOL", Fecha_ctz: "20231001" };
      const result = await repository.getParamCtz(input as never);

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.FEXGetPARAM_CtzAsync).toHaveBeenCalledWith({
        ...input,
        ...expectedAuth,
      });
    });
  });

  describe("getParamPtoVenta", () => {
    it("should return sales points", async () => {
      const mockResponse = {
        FEXGetPARAM_PtoVentaResult: {
          FEXResultGet: {
            ClsFEXResponse_PtoVenta: [
              { Pve_Nro: 1, Pve_Tipo: "CAE", Pve_Bloqueado: "N" },
            ],
          },
        },
      };
      mockSoapClient.FEXGetPARAM_PtoVentaAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.getParamPtoVenta({} as never);

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.FEXGetPARAM_PtoVentaAsync).toHaveBeenCalledWith({
        ...expectedAuth,
      });
    });
  });

  describe("getParamOpcionales", () => {
    it("should return optional fields", async () => {
      const mockResponse = {
        FEXGetPARAM_OpcionalesResult: {
          FEXResultGet: {
            ClsFEXResponse_Opc: [{ Opc_Id: "1", Opc_Ds: "Opcional 1" }],
          },
        },
      };
      mockSoapClient.FEXGetPARAM_OpcionalesAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.getParamOpcionales({} as never);

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.FEXGetPARAM_OpcionalesAsync).toHaveBeenCalledWith({
        ...expectedAuth,
      });
    });
  });

  describe("getParamActividades", () => {
    it("should return economic activities", async () => {
      const mockResponse = {
        FEXGetPARAM_ActividadesResult: {
          FEXResultGet: {
            ClsFEXResponse_Act: [{ Act_Id: 1, Act_Ds: "Actividad 1" }],
          },
        },
      };
      mockSoapClient.FEXGetPARAM_ActividadesAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.getParamActividades({} as never);

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.FEXGetPARAM_ActividadesAsync).toHaveBeenCalledWith({
        ...expectedAuth,
      });
    });
  });

  describe("dummy", () => {
    it("should return server status without auth", async () => {
      const mockResponse = {
        FEXDummyResult: {
          AppServer: "OK",
          DbServer: "OK",
          AuthServer: "OK",
        },
      };
      mockSoapClient.FEXDummyAsync.mockResolvedValue([mockResponse] as never);

      const result = await repository.dummy();

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.FEXDummyAsync).toHaveBeenCalledWith({});
    });
  });

  describe("client caching", () => {
    it("should reuse the cached SOAP client on consecutive calls", async () => {
      mockSoapClient.FEXDummyAsync.mockResolvedValue([
        {
          FEXDummyResult: {
            AppServer: "OK",
            DbServer: "OK",
            AuthServer: "OK",
          },
        },
      ] as never);

      await repository.dummy();
      await repository.dummy();

      expect(SoapClient.prototype.createClient).toHaveBeenCalledTimes(1);
    });
  });
});
