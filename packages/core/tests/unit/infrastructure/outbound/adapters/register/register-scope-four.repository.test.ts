import { RegisterScopeFourRepository } from "@infrastructure/outbound/adapters/register/register-scope-four.repository";
import { SoapClientFacade } from "@infrastructure/outbound/adapters/soap/soap-client-facade";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/outbound/ports/soap/soap-repository.types";

jest.mock("@infrastructure/outbound/adapters/soap/soap-client-facade");

describe("RegisterScopeFourRepository", () => {
  let repository: RegisterScopeFourRepository;
  let mockSoapClient: any;
  let mockConfig: BaseSoapRepositoryConstructorConfig;

  beforeEach(() => {
    mockSoapClient = {
      dummyAsync: jest.fn(),
      getPersonaAsync: jest.fn(),
      describe: jest.fn().mockReturnValue({
        Service: {
          ServiceSoap: {
            dummy: { input: { Auth: {} } },
            getPersona: { input: { Auth: {} } },
          },
        },
      }),
    };

    (SoapClientFacade.create as jest.Mock).mockResolvedValue(mockSoapClient);

    mockConfig = {
      authRepository: {
        login: jest.fn().mockResolvedValue({ token: "token", sign: "sign" }),
        getAuthParams: jest.fn().mockReturnValue({
          Auth: { Token: "token", Sign: "sign", Cuit: 12345678901 },
        }),
      } as any,
      cuit: 12345678901,
      logger: {
        info: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
      },
    } as any;

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
      mockSoapClient.dummyAsync.mockResolvedValue([mockResponse]);

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
      mockSoapClient.getPersonaAsync.mockResolvedValue([mockResponse]);

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
      mockSoapClient.getPersonaAsync.mockResolvedValue([mockResponse]);

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
