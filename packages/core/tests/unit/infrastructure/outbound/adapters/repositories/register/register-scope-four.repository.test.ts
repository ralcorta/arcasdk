import { RegisterScopeFourRepository } from "@infrastructure/outbound/adapters/repositories/register/register-scope-four.repository";
import { SoapClient } from "@infrastructure/outbound/adapters/soap/soap-client";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/types/soap-repository.types";
import { IPersonaServiceA4PortSoap } from "@infrastructure/outbound/ports/soap/interfaces/PersonaServiceA4/PersonaServiceA4Port";

jest.mock("@infrastructure/outbound/adapters/soap/soap-client");

describe("RegisterScopeFourRepository", () => {
  let repository: RegisterScopeFourRepository;
  let mockSoapClient: jest.Mocked<IPersonaServiceA4PortSoap>;
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
    };

    repository = new RegisterScopeFourRepository(mockConfig);
  });

  afterEach(() => {
    jest.clearAllMocks();
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
      mockSoapClient.dummyAsync.mockResolvedValue([mockResponse] as never);

      const result = await repository.getServerStatus();

      expect(result).toEqual({
        appserver: "OK",
        dbserver: "OK",
        authserver: "OK",
      });
    });
  });

  describe("getTaxpayerDetails", () => {
    it("should return taxpayer details", async () => {
      const mockResponse = {
        personaReturn: {
          persona: {
            idPersona: 20111111112,
            tipoPersona: "FISICA",
            estadoClave: "ACTIVO",
          },
        },
      };
      // Type assertion to bypass deep SOAP structures without using 'any'
      mockSoapClient.getPersonaAsync.mockResolvedValue([mockResponse] as never);

      const result = await repository.getTaxpayerDetails(20111111112);

      expect(result).toEqual({
        idPersona: 20111111112,
        tipoPersona: "FISICA",
        estadoClave: "ACTIVO",
        datosGenerales: {
          idPersona: 20111111112,
          tipoPersona: "FISICA",
          estadoClave: "ACTIVO",
        },
        datosMonotributo: undefined,
        datosRegimenGeneral: undefined,
        errorConstancia: undefined,
      });
    });

    it("should return null if persona not found", async () => {
      const mockResponse = {
        personaReturn: {
          errorConstancia: {
            error: "No existe",
            codigo: 602,
          },
        },
      };
      mockSoapClient.getPersonaAsync.mockResolvedValue([mockResponse] as never);

      const result = await repository.getTaxpayerDetails(20111111112);

      expect(result).toBeNull();
    });

    it("should return null on 602 error code", async () => {
      const error = { code: 602 };
      mockSoapClient.getPersonaAsync.mockRejectedValue(error);

      const result = await repository.getTaxpayerDetails(20111111112);

      expect(result).toBeNull();
    });
  });
});
