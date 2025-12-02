import { ElectronicBillingRepository } from "@infrastructure/outbound/adapters/electronic-billing/electronic-billing-repository";
import { SoapClientFacade } from "@infrastructure/outbound/adapters/soap/soap-client-facade";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/outbound/ports/soap/soap-repository.types";

jest.mock("@infrastructure/outbound/adapters/soap/soap-client-facade");

describe("ElectronicBillingRepository", () => {
  let repository: ElectronicBillingRepository;
  let mockSoapClient: any;
  let mockConfig: BaseSoapRepositoryConstructorConfig;
  const expectedAuth = {
    Auth: { Token: "token", Sign: "sign", Cuit: 12345678901 },
  };

  beforeEach(() => {
    mockSoapClient = {
      FECAEASolicitarAsync: jest.fn(),
      FECAEAConsultarAsync: jest.fn(),
      FECAEASinMovimientoInformarAsync: jest.fn(),
      FECAEASinMovimientoConsultarAsync: jest.fn(),
      FEParamGetCotizacionAsync: jest.fn(),
      FEParamGetTiposPaisesAsync: jest.fn(),
      FEParamGetActividadesAsync: jest.fn(),
      FECompTotXRequestAsync: jest.fn(),
      FEParamGetCondicionIvaReceptorAsync: jest.fn(),
      describe: jest.fn().mockReturnValue({
        Service: {
          ServiceSoap12: {
            FECAEASolicitar: { input: { Auth: {} } },
            FECAEAConsultar: { input: { Auth: {} } },
            FECAEASinMovimientoInformar: { input: { Auth: {} } },
            FECAEASinMovimientoConsultar: { input: { Auth: {} } },
            FECAEARegInformativo: { input: { Auth: {} } },
            FEParamGetCotizacion: { input: { Auth: {} } },
            FEParamGetTiposPaises: { input: { Auth: {} } },
            FEParamGetActividades: { input: { Auth: {} } },
            FECompTotXRequest: { input: { Auth: {} } },
          },
        },
      }),
    };

    (SoapClientFacade.create as jest.Mock).mockResolvedValue(mockSoapClient);

    mockConfig = {
      ticketPath: "/tmp/ticket.xml",
      authRepository: {
        login: jest.fn().mockResolvedValue({ token: "token", sign: "sign" }),
        getAuthParams: jest.fn().mockReturnValue({
          Auth: { Token: "token", Sign: "sign", Cuit: 12345678901 },
        }),
      } as any,
      cuit: 12345678901,
    } as any;

    repository = new ElectronicBillingRepository(mockConfig);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getCaea", () => {
    it("should return CAEA result", async () => {
      const mockResponse = {
        FECAEASolicitarResult: {
          ResultGet: {
            CAEA: "12345678901234",
            Periodo: 202310,
            Orden: 1,
            FchVigDesde: "20231001",
            FchVigHasta: "20231015",
            FchTopeInf: "20231020",
            FchProceso: "20231001100000",
            Observaciones: { Obs: [{ Msg: "Observation" }] },
          },
          Errors: undefined,
        },
      };
      mockSoapClient.FECAEASolicitarAsync.mockResolvedValue([mockResponse]);

      const result = await repository.getCaea(202310, 1);

      expect(result.resultGet).toEqual({
        caea: "12345678901234",
        periodo: 202310,
        orden: 1,
        fchVigDesde: "20231001",
        fchVigHasta: "20231015",
        fchTopeInf: "20231020",
        fchProceso: "20231001100000",
        observaciones: "Observation",
      });
      expect(mockSoapClient.FECAEASolicitarAsync).toHaveBeenCalledWith({
        Periodo: 202310,
        Orden: 1,
        ...expectedAuth,
      });
    });
  });

  describe("consultCaea", () => {
    it("should return CAEA result", async () => {
      const mockResponse = {
        FECAEAConsultarResult: {
          ResultGet: {
            CAEA: "12345678901234",
            Periodo: 202310,
            Orden: 1,
            FchVigDesde: "20231001",
            FchVigHasta: "20231015",
            FchTopeInf: "20231020",
            FchProceso: "20231001100000",
          },
          Errors: undefined,
        },
      };
      mockSoapClient.FECAEAConsultarAsync.mockResolvedValue([mockResponse]);

      const result = await repository.consultCaea(202310, 1);

      expect(result.resultGet).toEqual({
        caea: "12345678901234",
        periodo: 202310,
        orden: 1,
        fchVigDesde: "20231001",
        fchVigHasta: "20231015",
        fchTopeInf: "20231020",
        fchProceso: "20231001100000",
        observaciones: undefined,
      });
      expect(mockSoapClient.FECAEAConsultarAsync).toHaveBeenCalledWith({
        Periodo: 202310,
        Orden: 1,
        ...expectedAuth,
      });
    });
  });

  describe("informCaeaNoMovement", () => {
    it("should return CAEA no movement result", async () => {
      const mockResponse = {
        FECAEASinMovimientoInformarResult: {
          ResultGet: {
            CAEA: "12345678901234",
            FchProceso: "20231001100000",
            PtoVta: 1,
          },
          Errors: undefined,
        },
      };
      mockSoapClient.FECAEASinMovimientoInformarAsync.mockResolvedValue([
        mockResponse,
      ]);

      const result = await repository.informCaeaNoMovement("12345678901234", 1);

      expect(result.resultGet).toEqual([
        {
          caea: "12345678901234",
          fchProceso: "20231001100000",
          ptoVta: 1,
        },
      ]);
      expect(
        mockSoapClient.FECAEASinMovimientoInformarAsync
      ).toHaveBeenCalledWith({
        CAEA: "12345678901234",
        PtoVta: 1,
        ...expectedAuth,
      });
    });
  });

  describe("consultCaeaNoMovement", () => {
    it("should return CAEA no movement result", async () => {
      const mockResponse = {
        FECAEASinMovimientoConsultarResult: {
          ResultGet: [
            {
              CAEA: "12345678901234",
              FchProceso: "20231001100000",
              PtoVta: 1,
            },
          ],
          Errors: undefined,
        },
      };
      mockSoapClient.FECAEASinMovimientoConsultarAsync.mockResolvedValue([
        mockResponse,
      ]);

      const result = await repository.consultCaeaNoMovement(
        "12345678901234",
        1
      );

      expect(result.resultGet).toEqual([
        {
          caea: "12345678901234",
          fchProceso: "20231001100000",
          ptoVta: 1,
        },
      ]);
      expect(
        mockSoapClient.FECAEASinMovimientoConsultarAsync
      ).toHaveBeenCalledWith({
        CAEA: "12345678901234",
        PtoVta: 1,
        ...expectedAuth,
      });
    });
  });

  describe("informCaeaUsage", () => {
    it("should return CAEA usage result", async () => {
      const mockResponse = {
        FECAEARegInformativoResult: {
          FeDetResp: {
            FECAEADetResponse: [
              {
                CAEA: "12345678901234",
                Concepto: 1,
                DocTipo: 80,
                DocNro: 20111111112,
                CbteDesde: 1,
                CbteHasta: 1,
                CbteFch: "20231001",
                Resultado: "A",
                Observaciones: { Obs: [{ Msg: "Observation" }] },
              },
            ],
          },
          Errors: undefined,
        },
      };
      mockSoapClient.FECAEARegInformativoAsync = jest
        .fn()
        .mockResolvedValue([mockResponse]);

      const mockVoucher = {
        toDTO: jest.fn().mockReturnValue({
          Concepto: 1,
          DocTipo: 80,
          DocNro: 20111111112,
          CbteDesde: 1,
          CbteHasta: 1,
          CbteFch: "20231001",
          ImpTotal: 121,
          ImpTotConc: 0,
          ImpNeto: 100,
          ImpOpEx: 0,
          ImpIVA: 21,
          ImpTrib: 0,
          FchServDesde: "20231001",
          FchServHasta: "20231031",
          FchVtoPago: "20231031",
          MonId: "PES",
          MonCotiz: 1,
          CondicionIVAReceptorId: 1,
          PtoVta: 1,
          CbteTipo: 1,
        }),
      } as any;

      const result = await repository.informCaeaUsage(
        mockVoucher,
        "12345678901234"
      );

      expect(result.resultGet).toEqual({
        caea: "12345678901234",
        concepto: 1,
        docTipo: 80,
        docNro: 20111111112,
        cbteDesde: 1,
        cbteHasta: 1,
        cbteFch: "20231001",
        resultado: "A",
        observaciones: "Observation",
      });

      expect(mockSoapClient.FECAEARegInformativoAsync).toHaveBeenCalledWith({
        FeCAEARegInfReq: {
          FeCabReq: {
            CantReg: 1,
            PtoVta: 1,
            CbteTipo: 1,
          },
          FeDetReq: {
            FECAEADetRequest: [
              {
                Concepto: 1,
                DocTipo: 80,
                DocNro: 20111111112,
                CbteDesde: 1,
                CbteHasta: 1,
                CbteFch: "20231001",
                ImpTotal: 121,
                ImpTotConc: 0,
                ImpNeto: 100,
                ImpOpEx: 0,
                ImpIVA: 21,
                ImpTrib: 0,
                FchServDesde: "20231001",
                FchServHasta: "20231031",
                FchVtoPago: "20231031",
                MonId: "PES",
                MonCotiz: 1,
                CondicionIVAReceptorId: 1,
                Tributos: undefined,
                Iva: undefined,
                CbtesAsoc: undefined,
                Compradores: undefined,
                Opcionales: undefined,
                CAEA: "12345678901234",
                PeriodoAsoc: undefined,
                CbteFchHsGen: undefined,
              },
            ],
          },
        },
        ...expectedAuth,
      });
    });
  });

  describe("getQuotation", () => {
    it("should return quotation", async () => {
      const mockResponse = {
        FEParamGetCotizacionResult: {
          ResultGet: {
            MonId: "DOL",
            MonCotiz: 350,
            FchCotiz: "20231001",
          },
          Errors: undefined,
        },
      };
      mockSoapClient.FEParamGetCotizacionAsync.mockResolvedValue([
        mockResponse,
      ]);

      const result = await repository.getQuotation("DOL");

      expect(result.resultGet).toEqual({
        monId: "DOL",
        monCotiz: 350,
        fchCotiz: "20231001",
      });
      expect(mockSoapClient.FEParamGetCotizacionAsync).toHaveBeenCalledWith({
        MonId: "DOL",
        ...expectedAuth,
      });
    });
  });

  describe("getCountries", () => {
    it("should return countries", async () => {
      const mockResponse = {
        FEParamGetTiposPaisesResult: {
          ResultGet: {
            PaisTipo: [
              {
                Id: 200,
                Desc: "Argentina",
              },
            ],
          },
          Errors: undefined,
        },
      };
      mockSoapClient.FEParamGetTiposPaisesAsync.mockResolvedValue([
        mockResponse,
      ]);

      const result = await repository.getCountries();

      expect(result.resultGet?.paisTipo).toEqual([
        {
          id: 200,
          desc: "Argentina",
        },
      ]);
      expect(mockSoapClient.FEParamGetTiposPaisesAsync).toHaveBeenCalledWith({
        ...expectedAuth,
      });
    });
  });

  describe("getActivities", () => {
    it("should return activities", async () => {
      const mockResponse = {
        FEParamGetActividadesResult: {
          ResultGet: {
            ActividadesTipo: [
              {
                Id: 1,
                Orden: 1,
                Desc: "Activity 1",
              },
            ],
          },
          Errors: undefined,
        },
      };
      mockSoapClient.FEParamGetActividadesAsync.mockResolvedValue([
        mockResponse,
      ]);

      const result = await repository.getActivities();

      expect(result.resultGet?.actividadesTipo).toEqual([
        {
          id: 1,
          orden: 1,
          desc: "Activity 1",
        },
      ]);
      expect(mockSoapClient.FEParamGetActividadesAsync).toHaveBeenCalledWith({
        ...expectedAuth,
      });
    });
  });

  describe("getMaxRecordsPerRequest", () => {
    it("should return max records", async () => {
      const mockResponse = {
        FECompTotXRequestResult: {
          RegXReq: 1000,
          Errors: undefined,
        },
      };
      mockSoapClient.FECompTotXRequestAsync.mockResolvedValue([mockResponse]);

      const result = await repository.getMaxRecordsPerRequest();

      expect(result.resultGet).toEqual(1000);
      expect(mockSoapClient.FECompTotXRequestAsync).toHaveBeenCalledWith({
        ...expectedAuth,
      });
    });
  });
});
