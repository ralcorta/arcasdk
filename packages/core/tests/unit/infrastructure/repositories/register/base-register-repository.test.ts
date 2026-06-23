import { RegisterScopeFourRepository } from "@infrastructure/repositories/register/register-scope-four.repository";
import { SoapClient } from "@infrastructure/soap/soap-client";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/types/soap-repository.types";
import {
  createRepositoryConfig,
  REPOSITORY_TEST_IDENTIFIER,
} from "./register-repository.test.helpers";

jest.mock("@infrastructure/soap/soap-client");

// Use RegisterScopeFourRepository as the concrete vehicle for testing BaseRegisterRepository
describe("BaseRegisterRepository (via RegisterScopeFourRepository)", () => {
  let repository: RegisterScopeFourRepository;
  let mockSoapClient: {
    dummyAsync: jest.Mock;
    getPersonaAsync: jest.Mock;
    setEndpoint: jest.Mock;
    describe: jest.Mock;
  };
  let mockConfig: BaseSoapRepositoryConstructorConfig;

  beforeEach(() => {
    mockSoapClient = {
      dummyAsync: jest.fn(),
      getPersonaAsync: jest.fn(),
      setEndpoint: jest.fn(),
      describe: jest.fn().mockReturnValue({
        Service: {
          ServiceSoap: {
            dummy: { input: { Auth: {} } },
            getPersona: { input: { Auth: {} } },
          },
        },
      }),
    };

    (SoapClient.prototype.createClient as jest.Mock).mockResolvedValue(
      mockSoapClient,
    );

    mockConfig = createRepositoryConfig();
    repository = new RegisterScopeFourRepository(mockConfig);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getTaxpayerDetails", () => {
    it("should return null when personaReturn is absent in response", async () => {
      mockSoapClient.getPersonaAsync.mockResolvedValue([{}] as never);

      const result = await repository.getTaxpayerDetails(
        REPOSITORY_TEST_IDENTIFIER,
      );

      expect(result).toBeNull();
    });

    it("should throw when the SOAP method is not a function on the client", async () => {
      // Override getPersonaAsync with a non-function value
      (mockSoapClient as any).getPersonaAsync = "not-a-function";

      await expect(
        repository.getTaxpayerDetails(REPOSITORY_TEST_IDENTIFIER),
      ).rejects.toThrow("Method getPersonaAsync not found on register client");
    });

    it("should propagate non-AFIP errors", async () => {
      mockSoapClient.getPersonaAsync.mockRejectedValue(
        new Error("Network error"),
      );

      await expect(
        repository.getTaxpayerDetails(REPOSITORY_TEST_IDENTIFIER),
      ).rejects.toThrow("Network error");
    });

    it("should include datosMonotributo and datosRegimenGeneral when present", async () => {
      mockSoapClient.getPersonaAsync.mockResolvedValue([
        {
          personaReturn: {
            persona: {
              idPersona: REPOSITORY_TEST_IDENTIFIER,
              tipoPersona: "FISICA",
              estadoClave: "ACTIVO",
              datosGenerales: {
                idPersona: REPOSITORY_TEST_IDENTIFIER,
                tipoPersona: "FISICA",
                estadoClave: "ACTIVO",
              },
              datosMonotributo: { categoria: "A" },
              datosRegimenGeneral: { impuesto: [{ id: 30 }] },
            },
          },
        },
      ] as never);

      const result = await repository.getTaxpayerDetails(
        REPOSITORY_TEST_IDENTIFIER,
      );

      expect(result?.datosMonotributo).toEqual({ categoria: "A" });
      expect(result?.datosRegimenGeneral).toEqual({ impuesto: [{ id: 30 }] });
    });

    it("should map errorConstancia when present in persona payload", async () => {
      mockSoapClient.getPersonaAsync.mockResolvedValue([
        {
          personaReturn: {
            persona: {
              idPersona: REPOSITORY_TEST_IDENTIFIER,
              tipoPersona: "FISICA",
              estadoClave: "ACTIVO",
              datosGenerales: {
                idPersona: REPOSITORY_TEST_IDENTIFIER,
              },
              errorConstancia: { error: "Parcial", codigo: 123 },
            },
          },
        },
      ] as never);

      const result = await repository.getTaxpayerDetails(
        REPOSITORY_TEST_IDENTIFIER,
      );

      expect(result?.errorConstancia).toEqual({
        error: "Parcial",
        codigo: 123,
      });
    });
  });

  describe("getClient (caching)", () => {
    it("should reuse the same client on subsequent calls", async () => {
      mockSoapClient.dummyAsync.mockResolvedValue([
        { return: { appserver: "OK", dbserver: "OK", authserver: "OK" } },
      ] as never);

      await repository.getServerStatus();
      await repository.getServerStatus();

      // createClient should only be invoked once despite two calls
      expect(SoapClient.prototype.createClient).toHaveBeenCalledTimes(1);
    });
  });
});
