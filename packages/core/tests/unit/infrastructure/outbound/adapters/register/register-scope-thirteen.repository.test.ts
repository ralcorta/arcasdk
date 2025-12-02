import { RegisterScopeThirteenRepository } from "@arcasdk/core/src/infrastructure/outbound/adapters/register/register-scope-thirteen.repository";
import { SoapClient } from "@arcasdk/core/src/infrastructure/outbound/adapters/soap/soap-client";

jest.mock("@infrastructure/outbound/adapters/soap/soap-client");

describe("RegisterScopeThirteenRepository", () => {
  let repository: RegisterScopeThirteenRepository;
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
      dummyAsync: jest.fn(),
      getPersonaAsync: jest.fn(),
      getIdPersonaListByDocumentoAsync: jest.fn(),
    };

    (SoapClient as jest.MockedClass<typeof SoapClient>).mockImplementation(
      () => mockSoapClientInstance
    );

    repository = new RegisterScopeThirteenRepository(config);
    (repository as any).getClient = jest
      .fn()
      .mockResolvedValue(mockSoapClientInstance);
  });

  describe("getServerStatus", () => {
    it("should return server status", async () => {
      const mockResponse = {
        return: {
          appserver: "OK",
          dbserver: "OK",
          authserver: "OK",
        },
      };
      mockSoapClientInstance.dummyAsync.mockResolvedValue([mockResponse]);

      const result = await repository.getServerStatus();

      expect(result).toEqual({
        appserver: "OK",
        dbserver: "OK",
        authserver: "OK",
      });
      expect(mockSoapClientInstance.dummyAsync).toHaveBeenCalled();
    });
  });

  describe("getTaxpayerDetails", () => {
    it("should return taxpayer details when found", async () => {
      const mockResponse = {
        personaReturn: {
          persona: {
            idPersona: 20111111111,
            tipoPersona: "FISICA",
            estadoClave: "ACTIVO",
            datosGenerales: {
              nombre: "Juan Perez",
              apellido: "Perez",
            },
          },
        },
      };
      mockSoapClientInstance.getPersonaAsync.mockResolvedValue([mockResponse]);

      const result = await repository.getTaxpayerDetails(20111111111);

      expect(result).toBeDefined();
      expect(result?.idPersona).toBe(20111111111);
      expect(result?.tipoPersona).toBe("FISICA");
      expect(mockSoapClientInstance.getPersonaAsync).toHaveBeenCalledWith({
        idPersona: 20111111111,
      });
    });

    it("should return null if taxpayer not found (error 602)", async () => {
      const error = { code: 602 };
      mockSoapClientInstance.getPersonaAsync.mockRejectedValue(error);

      const result = await repository.getTaxpayerDetails(20111111111);

      expect(result).toBeNull();
    });

    it("should throw error for other errors", async () => {
      const error = { code: 500 };
      mockSoapClientInstance.getPersonaAsync.mockRejectedValue(error);

      await expect(repository.getTaxpayerDetails(20111111111)).rejects.toEqual(
        error
      );
    });
  });

  describe("getTaxIDByDocument", () => {
    it("should return tax ID list", async () => {
      const mockResponse = {
        idPersonaListReturn: {
          idPersona: [20111111111],
        },
      };
      mockSoapClientInstance.getIdPersonaListByDocumentoAsync.mockResolvedValue(
        [mockResponse]
      );

      const result = await repository.getTaxIDByDocument("12345678");

      expect(result.idPersona).toEqual([20111111111]);
      expect(
        mockSoapClientInstance.getIdPersonaListByDocumentoAsync
      ).toHaveBeenCalledWith({
        documento: "12345678",
      });
    });

    it("should handle single number response", async () => {
      const mockResponse = {
        idPersonaListReturn: {
          idPersona: 20111111111,
        },
      };
      mockSoapClientInstance.getIdPersonaListByDocumentoAsync.mockResolvedValue(
        [mockResponse]
      );

      const result = await repository.getTaxIDByDocument("12345678");

      expect(result.idPersona).toEqual([20111111111]);
    });

    it("should handle empty response", async () => {
      const mockResponse = {
        idPersonaListReturn: {},
      };
      mockSoapClientInstance.getIdPersonaListByDocumentoAsync.mockResolvedValue(
        [mockResponse]
      );

      const result = await repository.getTaxIDByDocument("12345678");

      expect(result.idPersona).toEqual([]);
    });
  });
});
