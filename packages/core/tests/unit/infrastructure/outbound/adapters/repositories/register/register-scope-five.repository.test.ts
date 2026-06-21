import { RegisterScopeFiveRepository } from "@infrastructure/outbound/adapters/repositories/register/register-scope-five.repository";
import { SoapClient } from "@infrastructure/outbound/adapters/soap/soap-client";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/types/soap-repository.types";
import { IPersonaServiceA5PortSoap } from "@infrastructure/outbound/ports/soap/interfaces/PersonaServiceA5/PersonaServiceA5Port";
import {
  createRepositoryConfig,
  createServerStatusResponse,
  createTaxpayerNotFoundResponse,
  createTaxpayerPersonaResponse,
  expectedTaxpayerDetails,
  REPOSITORY_TEST_IDENTIFIER,
} from "./register-repository.test.helpers";

jest.mock("@infrastructure/outbound/adapters/soap/soap-client");

describe("RegisterScopeFiveRepository", () => {
  let repository: RegisterScopeFiveRepository;
  let mockSoapClient: jest.Mocked<IPersonaServiceA5PortSoap>;
  let mockConfig: BaseSoapRepositoryConstructorConfig;

  beforeEach(() => {
    mockSoapClient = {
      dummyAsync: jest.fn(),
      getPersona_v2Async: jest.fn(),
      setEndpoint: jest.fn(),
      describe: jest.fn().mockReturnValue({
        Service: {
          ServiceSoap: {
            dummy: { input: { Auth: {} } },
            getPersona_v2: { input: { Auth: {} } },
          },
        },
      }),
    } as never;

    (SoapClient.prototype.createClient as jest.Mock).mockResolvedValue(
      mockSoapClient,
    );

    mockConfig = createRepositoryConfig();

    repository = new RegisterScopeFiveRepository(mockConfig);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getServerStatus", () => {
    it("should return server status", async () => {
      const mockResponse = createServerStatusResponse();
      mockSoapClient.dummyAsync.mockResolvedValue([mockResponse] as never);

      const result = await repository.getServerStatus();

      expect(result).toEqual({
        appServer: "OK",
        dbServer: "OK",
        authServer: "OK",
      });
    });
  });

  describe("getTaxpayerDetails", () => {
    it("should return taxpayer details", async () => {
      const mockResponse = createTaxpayerPersonaResponse();
      mockSoapClient.getPersona_v2Async.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.getTaxpayerDetails(
        REPOSITORY_TEST_IDENTIFIER,
      );

      expect(result).toEqual(expectedTaxpayerDetails());
    });

    it("should return null if persona not found", async () => {
      const mockResponse = createTaxpayerNotFoundResponse();
      mockSoapClient.getPersona_v2Async.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.getTaxpayerDetails(
        REPOSITORY_TEST_IDENTIFIER,
      );

      expect(result).toBeNull();
    });

    it("should return null on 602 error code", async () => {
      const error = { code: 602 };
      mockSoapClient.getPersona_v2Async.mockRejectedValue(error);

      const result = await repository.getTaxpayerDetails(
        REPOSITORY_TEST_IDENTIFIER,
      );

      expect(result).toBeNull();
    });
  });
});
