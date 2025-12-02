import { RegisterInscriptionProofRepository } from "@arcasdk/core/src/infrastructure/outbound/adapters/register/register-inscription-proof.repository";
import { SoapClient } from "@arcasdk/core/src/infrastructure/outbound/adapters/soap/soap-client";

jest.mock("@infrastructure/outbound/adapters/soap/soap-client");

describe("RegisterInscriptionProofRepository", () => {
  let repository: RegisterInscriptionProofRepository;
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
      getPersona_v2Async: jest.fn(),
      getPersonaList_v2Async: jest.fn(),
    };

    (SoapClient as jest.MockedClass<typeof SoapClient>).mockImplementation(
      () => mockSoapClientInstance
    );

    repository = new RegisterInscriptionProofRepository(config);
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
      mockSoapClientInstance.getPersona_v2Async.mockResolvedValue([
        mockResponse,
      ]);

      const result = await repository.getTaxpayerDetails(20111111111);

      expect(result).toBeDefined();
      expect(result?.idPersona).toBe(20111111111);
      expect(result?.tipoPersona).toBe("FISICA");
      expect(mockSoapClientInstance.getPersona_v2Async).toHaveBeenCalledWith({
        idPersona: 20111111111,
      });
    });

    it("should return null if taxpayer not found (error 602)", async () => {
      const error = { code: 602 };
      mockSoapClientInstance.getPersona_v2Async.mockRejectedValue(error);

      const result = await repository.getTaxpayerDetails(20111111111);

      expect(result).toBeNull();
    });

    it("should throw error for other errors", async () => {
      const error = { code: 500 };
      mockSoapClientInstance.getPersona_v2Async.mockRejectedValue(error);

      await expect(repository.getTaxpayerDetails(20111111111)).rejects.toEqual(
        error
      );
    });
  });

  describe("getTaxpayersDetails", () => {
    it("should return list of taxpayers", async () => {
      const mockResponse = {
        personaListReturn: {
          persona: [
            {
              datosGenerales: {
                idPersona: 20111111111,
                tipoPersona: "FISICA",
                estadoClave: "ACTIVO",
              },
            },
          ],
        },
      };
      mockSoapClientInstance.getPersonaList_v2Async.mockResolvedValue([
        mockResponse,
      ]);

      const result = await repository.getTaxpayersDetails([20111111111]);

      expect(result.persona).toHaveLength(1);
      expect(result.persona?.[0].idPersona).toBe(20111111111);
      expect(
        mockSoapClientInstance.getPersonaList_v2Async
      ).toHaveBeenCalledWith({
        idPersona: [20111111111],
      });
    });

    it("should handle empty list", async () => {
      const mockResponse = {
        personaListReturn: {
          persona: [],
        },
      };
      mockSoapClientInstance.getPersonaList_v2Async.mockResolvedValue([
        mockResponse,
      ]);

      const result = await repository.getTaxpayersDetails([]);

      expect(result.persona).toHaveLength(0);
    });
  });
});
