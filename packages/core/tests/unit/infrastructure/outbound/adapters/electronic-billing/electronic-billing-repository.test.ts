import { ElectronicBillingRepository } from "@arcasdk/core/src/infrastructure/outbound/adapters/electronic-billing/electronic-billing-repository";
import { SoapClient } from "@arcasdk/core/src/infrastructure/outbound/adapters/soap/soap-client";
import { Voucher } from "@arcasdk/core/src/domain/entities/voucher.entity";
import { ServiceNamesEnum } from "@arcasdk/core/src/infrastructure/outbound/ports/soap/enums/service-names.enum";

jest.mock("@infrastructure/outbound/adapters/soap/soap-client");

describe("ElectronicBillingRepository", () => {
  let repository: ElectronicBillingRepository;
  let mockSoapClientInstance: any;

  const config = {
    cert: "mock-cert",
    key: "mock-key",
    cuit: 20111111111,
    production: false,
    authRepository: {} as any,
    logger: {} as any,
  };

  beforeEach(() => {
    mockSoapClientInstance = {
      createClient: jest.fn(),
      setEndpoint: jest.fn(),
      call: jest.fn(),
      FECAEARegInformativoAsync: jest.fn(),
    };

    (SoapClient as jest.MockedClass<typeof SoapClient>).mockImplementation(
      () => mockSoapClientInstance
    );

    repository = new ElectronicBillingRepository(config);
    // Mock createAuthenticatedProxy to return the mock client directly for simplicity in this test
    // or mock the internal serviceClient if possible.
    // Since createAuthenticatedProxy is protected/private in BaseSoapRepository, we might need to mock getClient or the proxy creation.
    // However, looking at BaseSoapRepository, it uses soapClient.createClient.
    // Let's mock the getClient method of the repository if possible, or ensure getClient uses our mockSoapClientInstance.

    // We need to mock the private getClient or ensure it returns our mock.
    // Since we can't easily mock private methods, we rely on the SoapClient mock.
    // But getClient also calls createAuthenticatedProxy.
    // A simpler approach for this unit test is to mock the serviceClient property if it was accessible,
    // or mock the method that calls the soap service.

    // Let's mock the `getClient` method by casting to any to access private method
    (repository as any).getClient = jest
      .fn()
      .mockResolvedValue(mockSoapClientInstance);
  });

  describe("getServerStatus", () => {
    it("should return server status", async () => {
      const mockResponse = {
        FEDummyResult: {
          AppServer: "OK",
          DbServer: "OK",
          AuthServer: "OK",
        },
      };
      mockSoapClientInstance.FEDummyAsync = jest
        .fn()
        .mockResolvedValue([mockResponse]);

      const result = await repository.getServerStatus();

      expect(result).toEqual({
        appServer: "OK",
        dbServer: "OK",
        authServer: "OK",
      });
      expect(mockSoapClientInstance.FEDummyAsync).toHaveBeenCalled();
    });
  });

  describe("getSalesPoints", () => {
    it("should return sales points", async () => {
      const mockResponse = {
        FEParamGetPtosVentaResult: {
          ResultGet: {
            PtoVenta: [
              {
                Nro: 1,
                EmisionTipo: "Online",
                Bloqueado: "N",
                FchBaja: null,
              },
            ],
          },
          Errors: {},
        },
      };
      mockSoapClientInstance.FEParamGetPtosVentaAsync = jest
        .fn()
        .mockResolvedValue([mockResponse]);

      const result = await repository.getSalesPoints();

      expect(result.resultGet?.ptoVenta).toHaveLength(1);
      expect(result.resultGet?.ptoVenta?.[0].nro).toBe(1);
      expect(
        mockSoapClientInstance.FEParamGetPtosVentaAsync
      ).toHaveBeenCalled();
    });

    it("should handle errors in getSalesPoints", async () => {
      const mockResponse = {
        FEParamGetPtosVentaResult: {
          Errors: {
            Err: [{ Code: 600, Msg: "Error" }],
          },
        },
      };
      mockSoapClientInstance.FEParamGetPtosVentaAsync = jest
        .fn()
        .mockResolvedValue([mockResponse]);

      const result = await repository.getSalesPoints();

      expect(result.errors?.err).toHaveLength(1);
      expect(result.errors?.err?.[0].code).toBe(600);
    });
  });

  describe("getLastVoucher", () => {
    it("should return last voucher", async () => {
      const mockResponse = {
        FECompUltimoAutorizadoResult: {
          CbteNro: 100,
          CbteTipo: 1,
          PtoVta: 1,
          Errors: {},
        },
      };
      mockSoapClientInstance.FECompUltimoAutorizadoAsync = jest
        .fn()
        .mockResolvedValue([mockResponse]);

      const result = await repository.getLastVoucher(1, 1);

      expect(result.cbteNro).toBe(100);
      expect(result.cbteTipo).toBe(1);
      expect(result.ptoVta).toBe(1);
      expect(
        mockSoapClientInstance.FECompUltimoAutorizadoAsync
      ).toHaveBeenCalledWith({
        PtoVta: 1,
        CbteTipo: 1,
      });
    });
  });

  describe("createVoucher", () => {
    it("should create voucher successfully", async () => {
      const voucherData = {
        CantReg: 1,
        PtoVta: 1,
        CbteTipo: 1,
        Concepto: 1,
        DocTipo: 80,
        DocNro: 20111111111,
        CbteDesde: 1,
        CbteHasta: 1,
        CbteFch: "20230101",
        ImpTotal: 121,
        ImpTotConc: 0,
        ImpNeto: 100,
        ImpOpEx: 0,
        ImpIVA: 21,
        ImpTrib: 0,
        MonId: "PES",
        MonCotiz: 1,
        CondicionIVAReceptorId: 1,
      };
      const voucher = Voucher.create(voucherData);

      const mockResponse = {
        FECAESolicitarResult: {
          FeDetResp: {
            FECAEDetResponse: [
              {
                Resultado: "A",
                CAE: "12345678901234",
                CAEFchVto: "20230111",
              },
            ],
          },
          Errors: {},
        },
      };
      mockSoapClientInstance.FECAESolicitarAsync = jest
        .fn()
        .mockResolvedValue([mockResponse]);

      const result = await repository.createVoucher(voucher);

      expect(result.cae).toBe("12345678901234");
      expect(result.caeFchVto).toBe("20230111");
      expect(result.response).toBeDefined();
      expect(mockSoapClientInstance.FECAESolicitarAsync).toHaveBeenCalled();
    });

    it("should handle rejected voucher", async () => {
      const voucherData = {
        CantReg: 1,
        PtoVta: 1,
        CbteTipo: 1,
        Concepto: 1,
        DocTipo: 80,
        DocNro: 20111111111,
        CbteDesde: 1,
        CbteHasta: 1,
        CbteFch: "20230101",
        ImpTotal: 121,
        ImpTotConc: 0,
        ImpNeto: 100,
        ImpOpEx: 0,
        ImpIVA: 21,
        ImpTrib: 0,
        MonId: "PES",
        MonCotiz: 1,
        CondicionIVAReceptorId: 1,
      };
      const voucher = Voucher.create(voucherData);

      const mockResponse = {
        FECAESolicitarResult: {
          FeDetResp: {
            FECAEDetResponse: [
              {
                Resultado: "R",
                CAE: "",
                CAEFchVto: "",
                Observaciones: { Obs: [{ Code: 100, Msg: "Error" }] },
              },
            ],
          },
          Errors: {},
        },
      };
      mockSoapClientInstance.FECAESolicitarAsync = jest
        .fn()
        .mockResolvedValue([mockResponse]);

      const result = await repository.createVoucher(voucher);

      expect(result.cae).toBe("");
      expect(result.caeFchVto).toBe("");
    });
  });

  describe("getVoucherInfo", () => {
    it("should return voucher info", async () => {
      const mockResponse = {
        FECompConsultarResult: {
          ResultGet: {
            CbteDesde: 1,
            CbteHasta: 1,
            Concepto: 1,
            DocTipo: 80,
            DocNro: 20111111111,
            CbteFch: "20230101",
            ImpTotal: 121,
            ImpTotConc: 0,
            ImpNeto: 100,
            ImpOpEx: 0,
            ImpIVA: 21,
            ImpTrib: 0,
            MonId: "PES",
            MonCotiz: 1,
            Resultado: "A",
            CodAutorizacion: "12345678901234",
            FchVto: "20230111",
          },
          Errors: {},
        },
      };
      mockSoapClientInstance.FECompConsultarAsync = jest
        .fn()
        .mockResolvedValue([mockResponse]);

      const result = await repository.getVoucherInfo(1, 1, 1);

      expect(result).toBeDefined();
      expect(result?.cbteDesde).toBe(1);
      expect(result?.codAutorizacion).toBe("12345678901234");
      expect(mockSoapClientInstance.FECompConsultarAsync).toHaveBeenCalled();
    });

    it("should return null if voucher not found (error 602)", async () => {
      const error = { code: 602 };
      mockSoapClientInstance.FECompConsultarAsync = jest
        .fn()
        .mockRejectedValue(error);

      const result = await repository.getVoucherInfo(1, 1, 1);

      expect(result).toBeNull();
    });

    it("should throw error for other errors", async () => {
      const error = { code: 500 };
      mockSoapClientInstance.FECompConsultarAsync = jest
        .fn()
        .mockRejectedValue(error);

      await expect(repository.getVoucherInfo(1, 1, 1)).rejects.toEqual(error);
    });
  });

  describe("Parameter Getters", () => {
    it("should get voucher types", async () => {
      const mockResponse = {
        FEParamGetTiposCbteResult: {
          ResultGet: {
            CbteTipo: [{ Id: 1, Desc: "Factura A" }],
          },
          Errors: {},
        },
      };
      mockSoapClientInstance.FEParamGetTiposCbteAsync = jest
        .fn()
        .mockResolvedValue([mockResponse]);

      const result = await repository.getVoucherTypes();
      expect(result.resultGet?.cbteTipo).toHaveLength(1);
    });

    it("should get concept types", async () => {
      const mockResponse = {
        FEParamGetTiposConceptoResult: {
          ResultGet: {
            ConceptoTipo: [{ Id: 1, Desc: "Productos" }],
          },
          Errors: {},
        },
      };
      mockSoapClientInstance.FEParamGetTiposConceptoAsync = jest
        .fn()
        .mockResolvedValue([mockResponse]);

      const result = await repository.getConceptTypes();
      expect(result.resultGet?.conceptoTipo).toHaveLength(1);
    });

    it("should get document types", async () => {
      const mockResponse = {
        FEParamGetTiposDocResult: {
          ResultGet: {
            DocTipo: [{ Id: 80, Desc: "CUIT" }],
          },
          Errors: {},
        },
      };
      mockSoapClientInstance.FEParamGetTiposDocAsync = jest
        .fn()
        .mockResolvedValue([mockResponse]);

      const result = await repository.getDocumentTypes();
      expect(result.resultGet?.docTipo).toHaveLength(1);
    });

    it("should get aliquot types", async () => {
      const mockResponse = {
        FEParamGetTiposIvaResult: {
          ResultGet: {
            IvaTipo: [{ Id: "5", Desc: "21%" }],
          },
          Errors: {},
        },
      };
      mockSoapClientInstance.FEParamGetTiposIvaAsync = jest
        .fn()
        .mockResolvedValue([mockResponse]);

      const result = await repository.getAliquotTypes();
      expect(result.resultGet?.ivaTipo).toHaveLength(1);
      expect(result.resultGet?.ivaTipo?.[0].id).toBe(5);
    });

    it("should get currency types", async () => {
      const mockResponse = {
        FEParamGetTiposMonedasResult: {
          ResultGet: {
            Moneda: [{ Id: "PES", Desc: "Pesos Argentinos" }],
          },
          Errors: {},
        },
      };
      mockSoapClientInstance.FEParamGetTiposMonedasAsync = jest
        .fn()
        .mockResolvedValue([mockResponse]);

      const result = await repository.getCurrencyTypes();
      expect(result.resultGet?.moneda).toHaveLength(1);
    });

    it("should get optional types", async () => {
      const mockResponse = {
        FEParamGetTiposOpcionalResult: {
          ResultGet: {
            OpcionalTipo: [{ Id: "91", Desc: "Opcional" }],
          },
          Errors: {},
        },
      };
      mockSoapClientInstance.FEParamGetTiposOpcionalAsync = jest
        .fn()
        .mockResolvedValue([mockResponse]);

      const result = await repository.getOptionalTypes();
      expect(result.resultGet?.opcionalTipo).toHaveLength(1);
    });

    it("should get tax types", async () => {
      const mockResponse = {
        FEParamGetTiposTributosResult: {
          ResultGet: {
            TributoTipo: [{ Id: 1, Desc: "Impuestos nacionales" }],
          },
          Errors: {},
        },
      };
      mockSoapClientInstance.FEParamGetTiposTributosAsync = jest
        .fn()
        .mockResolvedValue([mockResponse]);

      const result = await repository.getTaxTypes();
      expect(result.resultGet?.tributoTipo).toHaveLength(1);
    });
  });

  describe("informCaeaUsage", () => {
    it("should correctly map the response using mapCaeaUsage", async () => {
      const voucherData = {
        CantReg: 1,
        PtoVta: 1,
        CbteTipo: 1,
        Concepto: 1,
        DocTipo: 80,
        DocNro: 20111111111,
        CbteDesde: 1,
        CbteHasta: 1,
        CbteFch: "20230101",
        ImpTotal: 121,
        ImpTotConc: 0,
        ImpNeto: 100,
        ImpOpEx: 0,
        ImpIVA: 21,
        ImpTrib: 0,
        MonId: "PES",
        MonCotiz: 1,
        CondicionIVAReceptorId: 1,
      };
      const voucher = Voucher.create(voucherData);
      const caea = "12345678901234";
      const cbteFchHsGen = "20230101101010";

      const mockResponse = {
        FECAEARegInformativoResult: {
          FeDetResp: {
            FECAEADetResponse: [
              {
                Concepto: 1,
                DocTipo: 80,
                DocNro: 20111111111,
                CbteDesde: 1,
                CbteHasta: 1,
                CbteFch: "20230101",
                Resultado: "A",
                CAEA: caea,
                Observaciones: { Obs: [{ Msg: "Observacion" }] },
              },
            ],
          },
          Errors: {},
        },
      };

      mockSoapClientInstance.FECAEARegInformativoAsync.mockResolvedValue([
        mockResponse,
      ]);

      const result = await repository.informCaeaUsage(
        voucher,
        caea,
        cbteFchHsGen
      );

      expect(result.resultGet).toBeDefined();
      expect(result.resultGet?.caea).toBe(caea);
      expect(result.resultGet?.resultado).toBe("A");
      expect(result.resultGet?.observaciones).toBe("Observacion");
      expect(result.resultGet?.docNro).toBe(20111111111);
    });
  });
});
