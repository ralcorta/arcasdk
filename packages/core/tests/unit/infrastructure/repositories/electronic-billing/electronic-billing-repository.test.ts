import { ElectronicBillingRepository } from "@infrastructure/repositories/electronic-billing/electronic-billing-repository";
import { SoapClient } from "@infrastructure/soap/soap-client";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/types/soap-repository.types";
import { IServiceSoap12Soap } from "@infrastructure/soap/contracts/Service/ServiceSoap12";
import { IVoucher as IVoucherData } from "@domain/types/voucher.types";
import { data } from "../../../../mocks/data/voucher.mock";

jest.mock("@infrastructure/soap/soap-client");

describe("ElectronicBillingRepository", () => {
  let repository: ElectronicBillingRepository;
  let mockSoapClient: jest.Mocked<IServiceSoap12Soap>;
  let mockConfig: BaseSoapRepositoryConstructorConfig;
  const expectedAuth = {
    Auth: { Token: "token", Sign: "sign", Cuit: 12345678901 },
  };

  beforeEach(() => {
    mockSoapClient = {
      FECAESolicitarAsync: jest.fn(),
      FECompUltimoAutorizadoAsync: jest.fn(),
      FECompConsultarAsync: jest.fn(),
      FECAEASolicitarAsync: jest.fn(),
      FECAEAConsultarAsync: jest.fn(),
      FECAEASinMovimientoInformarAsync: jest.fn(),
      FECAEASinMovimientoConsultarAsync: jest.fn(),
      FECAEARegInformativoAsync: jest.fn(),
      FEParamGetCotizacionAsync: jest.fn(),
      FEParamGetTiposPaisesAsync: jest.fn(),
      FEParamGetActividadesAsync: jest.fn(),
      FECompTotXRequestAsync: jest.fn(),
      FEParamGetCondicionIvaReceptorAsync: jest.fn(),
      FEDummyAsync: jest.fn(),
      FEParamGetPtosVentaAsync: jest.fn(),
      FEParamGetTiposCbteAsync: jest.fn(),
      FEParamGetTiposConceptoAsync: jest.fn(),
      FEParamGetTiposDocAsync: jest.fn(),
      FEParamGetTiposIvaAsync: jest.fn(),
      FEParamGetTiposMonedasAsync: jest.fn(),
      FEParamGetTiposOpcionalAsync: jest.fn(),
      FEParamGetTiposTributosAsync: jest.fn(),
      setEndpoint: jest.fn(),
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
      mockSoapClient.FECAEASolicitarAsync.mockResolvedValue([
        mockResponse,
      ] as never);

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
      mockSoapClient.FECAEAConsultarAsync.mockResolvedValue([
        mockResponse,
      ] as never);

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
          CAEA: "12345678901234",
          FchProceso: "20231001100000",
          PtoVta: 1,
          Errors: undefined,
        },
      };
      mockSoapClient.FECAEASinMovimientoInformarAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.informCaeaNoMovement("12345678901234", 1);

      expect(result.resultGet).toEqual([
        {
          caea: "12345678901234",
          fchProceso: "20231001100000",
          ptoVta: 1,
        },
      ]);
      expect(
        mockSoapClient.FECAEASinMovimientoInformarAsync,
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
          ResultGet: {
            FECAEASinMov: [
              {
                CAEA: "12345678901234",
                FchProceso: "20231001100000",
                PtoVta: 1,
              },
            ],
          },
          Errors: undefined,
        },
      };
      mockSoapClient.FECAEASinMovimientoConsultarAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.consultCaeaNoMovement(
        "12345678901234",
        1,
      );

      expect(result.resultGet).toEqual([
        {
          caea: "12345678901234",
          fchProceso: "20231001100000",
          ptoVta: 1,
        },
      ]);
      expect(
        mockSoapClient.FECAEASinMovimientoConsultarAsync,
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
      mockSoapClient.FECAEARegInformativoAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const mockVoucher = {
        toDTO: jest.fn().mockReturnValue({
          CantReg: 1,
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
        } as IVoucherData),
      } as never;

      const result = await repository.informCaeaUsage(
        mockVoucher,
        "12345678901234",
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
      ] as never);

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
      ] as never);

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
      ] as never);

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
      mockSoapClient.FECompTotXRequestAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.getMaxRecordsPerRequest();

      expect(result.resultGet).toEqual(1000);
      expect(mockSoapClient.FECompTotXRequestAsync).toHaveBeenCalledWith({
        ...expectedAuth,
      });
    });
  });

  describe("getVoucherInfo", () => {
    it("should return null if voucher not found (error 602)", async () => {
      const error = { code: 602, message: "Comprobante inexistente" };
      mockSoapClient.FECompConsultarAsync.mockRejectedValue(error);

      const result = await repository.getVoucherInfo(1, 1, 1);

      expect(result).toBeNull();
    });

    it("should throw error for other SOAP failures", async () => {
      const error = new Error("Connection failed");
      mockSoapClient.FECompConsultarAsync.mockRejectedValue(error);

      await expect(repository.getVoucherInfo(1, 1, 1)).rejects.toThrow(
        "Connection failed",
      );
    });
  });

  describe("createVoucher", () => {
    it("should return empty CAE if voucher is rejected (Outcome R)", async () => {
      const mockResponse = {
        FECAESolicitarResult: {
          FeDetResp: {
            FECAEDetResponse: [
              {
                Resultado: "R",
                CAE: "",
                CAEFchVto: "",
                Observaciones: {
                  Obs: [{ Code: 1, Msg: "Error message" }],
                },
              },
            ],
          },
        },
      };
      mockSoapClient.FECAESolicitarAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const mockVoucher = {
        toDTO: jest.fn().mockReturnValue({
          ...data,
          PtoVta: 1,
          CbteTipo: 1,
          CbteDesde: 1,
          CbteHasta: 1,
        }),
      } as never;

      const result = await repository.createVoucher(mockVoucher);

      expect(result.cae).toBe("");
      expect(result.caeFchVto).toBe("");
      expect(result.response.FeDetResp?.FECAEDetResponse?.[0].Resultado).toBe(
        "R",
      );
    });

    it("should map multiple VAT aliquots and tributes correctly", async () => {
      const mockVoucher = {
        toDTO: jest.fn().mockReturnValue({
          ...data,
          PtoVta: 1,
          CbteTipo: 1,
          CbteDesde: 1,
          CbteHasta: 1,
          Iva: [
            { Id: 5, BaseImp: 100, Importe: 21 },
            { Id: 4, BaseImp: 100, Importe: 10.5 },
          ],
          Tributos: [
            { Id: 99, Desc: "Test", BaseImp: 100, Alic: 1, Importe: 1 },
          ],
        }),
      } as never;

      mockSoapClient.FECAESolicitarAsync.mockResolvedValue([
        {
          FECAESolicitarResult: {
            FeDetResp: { FECAEDetResponse: [{ Resultado: "A" }] },
          },
        },
      ] as never);

      await repository.createVoucher(mockVoucher);

      expect(mockSoapClient.FECAESolicitarAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          FeCAEReq: expect.objectContaining({
            FeDetReq: {
              FECAEDetRequest: [
                expect.objectContaining({
                  Iva: {
                    AlicIva: [
                      { Id: 5, BaseImp: 100, Importe: 21 },
                      { Id: 4, BaseImp: 100, Importe: 10.5 },
                    ],
                  },
                  Tributos: {
                    Tributo: [
                      {
                        Id: 99,
                        Desc: "Test",
                        BaseImp: 100,
                        Alic: 1,
                        Importe: 1,
                      },
                    ],
                  },
                }),
              ],
            },
          }),
        }),
      );
    });

    it("should return CAE and CAEFchVto when voucher is approved (Resultado A)", async () => {
      mockSoapClient.FECAESolicitarAsync.mockResolvedValue([
        {
          FECAESolicitarResult: {
            FeDetResp: {
              FECAEDetResponse: [
                {
                  Resultado: "A",
                  CAE: "12345678901234",
                  CAEFchVto: "20241231",
                },
              ],
            },
          },
        },
      ] as never);

      const mockVoucher = {
        toDTO: jest.fn().mockReturnValue({
          ...data,
          PtoVta: 1,
          CbteTipo: 1,
          CbteDesde: 5,
          CbteHasta: 5,
        }),
      } as never;

      const result = await repository.createVoucher(mockVoucher);

      expect(result.cae).toBe("12345678901234");
      expect(result.caeFchVto).toBe("20241231");
    });
  });

  describe("getVoucherInfo", () => {
    it("should return null when SOAP response has no ResultGet", async () => {
      mockSoapClient.FECompConsultarAsync.mockResolvedValue([
        {
          FECompConsultarResult: {
            ResultGet: undefined,
            Errors: undefined,
          },
        },
      ] as never);

      const result = await repository.getVoucherInfo(1, 1, 1);

      expect(result).toBeNull();
    });

    it("should return mapped voucher info when ResultGet is present", async () => {
      mockSoapClient.FECompConsultarAsync.mockResolvedValue([
        {
          FECompConsultarResult: {
            ResultGet: {
              CodAutorizacion: "12345678901234",
              EmisionTipo: "CAE",
              Resultado: "A",
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
              MonId: "PES",
              MonCotiz: 1,
            },
            Errors: undefined,
          },
        },
      ] as never);

      const result = await repository.getVoucherInfo(1, 1, 1);

      expect(result).not.toBeNull();
      expect(result!.codAutorizacion).toBe("12345678901234");
      expect(result!.resultado).toBe("A");
      expect(result!.docNro).toBe(20111111112);
    });
  });

  describe("invalidateClient", () => {
    it("should force SOAP client re-creation on next call", async () => {
      mockSoapClient.FEDummyAsync.mockResolvedValue([
        {
          FEDummyResult: { AppServer: "OK", DbServer: "OK", AuthServer: "OK" },
        },
      ] as never);

      await repository.getServerStatus();
      repository.invalidateClient();
      await repository.getServerStatus();

      expect(SoapClient.prototype.createClient).toHaveBeenCalledTimes(2);
    });
  });

  describe("client caching", () => {
    it("should reuse the cached SOAP client on consecutive calls", async () => {
      mockSoapClient.FEDummyAsync.mockResolvedValue([
        {
          FEDummyResult: { AppServer: "OK", DbServer: "OK", AuthServer: "OK" },
        },
      ] as never);

      await repository.getServerStatus();
      await repository.getServerStatus();

      expect(SoapClient.prototype.createClient).toHaveBeenCalledTimes(1);
    });
  });

  describe("getServerStatus", () => {
    it("should return mapped server status", async () => {
      mockSoapClient.FEDummyAsync.mockResolvedValue([
        {
          FEDummyResult: { AppServer: "OK", DbServer: "OK", AuthServer: "OK" },
        },
      ] as never);

      const result = await repository.getServerStatus();

      expect(result).toEqual({
        appServer: "OK",
        dbServer: "OK",
        authServer: "OK",
      });
      expect(mockSoapClient.FEDummyAsync).toHaveBeenCalledWith({});
    });
  });

  describe("getSalesPoints", () => {
    it("should return sales points list", async () => {
      mockSoapClient.FEParamGetPtosVentaAsync.mockResolvedValue([
        {
          FEParamGetPtosVentaResult: {
            ResultGet: {
              PtoVenta: [{ Nro: 1, EmisionTipo: "CAE", Bloqueado: "N" }],
            },
            Errors: undefined,
          },
        },
      ] as never);

      const result = await repository.getSalesPoints();

      expect(result.resultGet!.ptoVenta).toEqual([
        { nro: 1, emisionTipo: "CAE", bloqueado: "N", fechaBaja: undefined },
      ]);
      expect(result.errors).toBeUndefined();
    });

    it("should include mapped errors when present", async () => {
      mockSoapClient.FEParamGetPtosVentaAsync.mockResolvedValue([
        {
          FEParamGetPtosVentaResult: {
            ResultGet: { PtoVenta: [] },
            Errors: { Err: [{ Code: 602, Msg: "No hay PV registrados" }] },
          },
        },
      ] as never);

      const result = await repository.getSalesPoints();

      expect(result.errors).toEqual({
        err: [{ code: 602, msg: "No hay PV registrados" }],
      });
    });
  });

  describe("getLastVoucher", () => {
    it("should return mapped last voucher", async () => {
      mockSoapClient.FECompUltimoAutorizadoAsync.mockResolvedValue([
        {
          FECompUltimoAutorizadoResult: {
            CbteNro: 42,
            CbteTipo: 1,
            PtoVta: 1,
            Errors: undefined,
          },
        },
      ] as never);

      const result = await repository.getLastVoucher(1, 1);

      expect(result).toEqual({
        cbteNro: 42,
        cbteTipo: 1,
        ptoVta: 1,
        errors: undefined,
      });
      expect(mockSoapClient.FECompUltimoAutorizadoAsync).toHaveBeenCalledWith({
        PtoVta: 1,
        CbteTipo: 1,
      });
    });
  });

  describe("getVoucherTypes", () => {
    it("should return voucher types", async () => {
      mockSoapClient.FEParamGetTiposCbteAsync.mockResolvedValue([
        {
          FEParamGetTiposCbteResult: {
            ResultGet: {
              CbteTipo: [
                {
                  Id: 1,
                  Desc: "Factura A",
                  FchDesde: "20030401",
                  FchHasta: "99991231",
                },
              ],
            },
            Errors: undefined,
          },
        },
      ] as never);

      const result = await repository.getVoucherTypes();

      expect(result.resultGet!.cbteTipo).toEqual([
        {
          id: 1,
          desc: "Factura A",
          fchDesde: "20030401",
          fchHasta: "99991231",
        },
      ]);
    });
  });

  describe("getConceptTypes", () => {
    it("should return concept types", async () => {
      mockSoapClient.FEParamGetTiposConceptoAsync.mockResolvedValue([
        {
          FEParamGetTiposConceptoResult: {
            ResultGet: {
              ConceptoTipo: [
                {
                  Id: 1,
                  Desc: "Productos",
                  FchDesde: "20030401",
                  FchHasta: "99991231",
                },
              ],
            },
            Errors: undefined,
          },
        },
      ] as never);

      const result = await repository.getConceptTypes();

      expect(result.resultGet!.conceptoTipo).toEqual([
        {
          id: 1,
          desc: "Productos",
          fchDesde: "20030401",
          fchHasta: "99991231",
        },
      ]);
    });
  });

  describe("getDocumentTypes", () => {
    it("should return document types", async () => {
      mockSoapClient.FEParamGetTiposDocAsync.mockResolvedValue([
        {
          FEParamGetTiposDocResult: {
            ResultGet: {
              DocTipo: [
                {
                  Id: 80,
                  Desc: "CUIT",
                  FchDesde: "20030401",
                  FchHasta: "99991231",
                },
              ],
            },
            Errors: undefined,
          },
        },
      ] as never);

      const result = await repository.getDocumentTypes();

      expect(result.resultGet!.docTipo).toEqual([
        { id: 80, desc: "CUIT", fchDesde: "20030401", fchHasta: "99991231" },
      ]);
    });
  });

  describe("getAliquotTypes", () => {
    it("should return aliquot types with parsed integer Id", async () => {
      mockSoapClient.FEParamGetTiposIvaAsync.mockResolvedValue([
        {
          FEParamGetTiposIvaResult: {
            ResultGet: {
              IvaTipo: [
                {
                  Id: "5",
                  Desc: "21%",
                  FchDesde: "20030401",
                  FchHasta: "99991231",
                },
              ],
            },
            Errors: undefined,
          },
        },
      ] as never);

      const result = await repository.getAliquotTypes();

      expect(result.resultGet!.ivaTipo).toEqual([
        { id: 5, desc: "21%", fchDesde: "20030401", fchHasta: "99991231" },
      ]);
    });
  });

  describe("getCurrencyTypes", () => {
    it("should return currency types", async () => {
      mockSoapClient.FEParamGetTiposMonedasAsync.mockResolvedValue([
        {
          FEParamGetTiposMonedasResult: {
            ResultGet: {
              Moneda: [
                {
                  Id: "DOL",
                  Desc: "Dólar Americano",
                  FchDesde: "20030401",
                  FchHasta: "99991231",
                },
              ],
            },
            Errors: undefined,
          },
        },
      ] as never);

      const result = await repository.getCurrencyTypes();

      expect(result.resultGet!.moneda).toEqual([
        {
          id: "DOL",
          desc: "Dólar Americano",
          fchDesde: "20030401",
          fchHasta: "99991231",
        },
      ]);
    });
  });

  describe("getOptionalTypes", () => {
    it("should return optional types", async () => {
      mockSoapClient.FEParamGetTiposOpcionalAsync.mockResolvedValue([
        {
          FEParamGetTiposOpcionalResult: {
            ResultGet: {
              OpcionalTipo: [
                {
                  Id: "10",
                  Desc: "Dato Opcional 10",
                  FchDesde: "20030401",
                  FchHasta: "99991231",
                },
              ],
            },
            Errors: undefined,
          },
        },
      ] as never);

      const result = await repository.getOptionalTypes();

      expect(result.resultGet!.opcionalTipo).toEqual([
        {
          id: "10",
          desc: "Dato Opcional 10",
          fchDesde: "20030401",
          fchHasta: "99991231",
        },
      ]);
    });
  });

  describe("getTaxTypes", () => {
    it("should return tax types", async () => {
      mockSoapClient.FEParamGetTiposTributosAsync.mockResolvedValue([
        {
          FEParamGetTiposTributosResult: {
            ResultGet: {
              TributoTipo: [
                {
                  Id: 99,
                  Desc: "Otros tributos",
                  FchDesde: "20030401",
                  FchHasta: "99991231",
                },
              ],
            },
            Errors: undefined,
          },
        },
      ] as never);

      const result = await repository.getTaxTypes();

      expect(result.resultGet!.tributoTipo).toEqual([
        {
          id: 99,
          desc: "Otros tributos",
          fchDesde: "20030401",
          fchHasta: "99991231",
        },
      ]);
    });
  });

  describe("getIvaReceptorTypes", () => {
    it("should return IVA receptor types without filter", async () => {
      mockSoapClient.FEParamGetCondicionIvaReceptorAsync.mockResolvedValue([
        {
          FEParamGetCondicionIvaReceptorResult: {
            ResultGet: {
              CondicionIvaReceptor: [
                { Id: 1, Desc: "IVA Responsable Inscripto", Cmp_Clase: "A" },
              ],
            },
            Errors: undefined,
          },
        },
      ] as never);

      const result = await repository.getIvaReceptorTypes();

      expect(result.resultGet!.condicionIvaReceptor).toEqual([
        { id: 1, desc: "IVA Responsable Inscripto", cmp_Clase: "A" },
      ]);
      expect(
        mockSoapClient.FEParamGetCondicionIvaReceptorAsync,
      ).toHaveBeenCalledWith({});
    });

    it("should pass claseCmp filter when provided", async () => {
      mockSoapClient.FEParamGetCondicionIvaReceptorAsync.mockResolvedValue([
        {
          FEParamGetCondicionIvaReceptorResult: {
            ResultGet: { CondicionIvaReceptor: [] },
            Errors: undefined,
          },
        },
      ] as never);

      await repository.getIvaReceptorTypes("A");

      expect(
        mockSoapClient.FEParamGetCondicionIvaReceptorAsync,
      ).toHaveBeenCalledWith({
        ClaseCmp: "A",
      });
    });
  });
});
