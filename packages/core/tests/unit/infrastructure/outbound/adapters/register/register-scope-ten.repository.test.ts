import { RegisterScopeTenRepository } from "@arcasdk/core/src/infrastructure/outbound/adapters/register/register-scope-ten.repository";
import { SoapClient } from "@arcasdk/core/src/infrastructure/outbound/adapters/soap/soap-client";

jest.mock("@infrastructure/outbound/adapters/soap/soap-client");

describe("RegisterScopeTenRepository", () => {
  let repository: RegisterScopeTenRepository;
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
    };

    (SoapClient as jest.MockedClass<typeof SoapClient>).mockImplementation(
      () => mockSoapClientInstance
    );

    repository = new RegisterScopeTenRepository(config);
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

    it("should return null if taxpayer not found (message includes 'no existe')", async () => {
      const error = { message: "El idPersona no existe" };
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
});
