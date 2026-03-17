import { GenericRepository } from "@infrastructure/outbound/adapters/generic/generic-repository";
import { SoapClient } from "@infrastructure/outbound/adapters/soap/soap-client";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/outbound/ports/soap/soap-repository.types";
import { IAuthenticationRepositoryPort } from "@application/ports/authentication/authentication-repository.port";
import { Client } from "soap";

jest.mock("@infrastructure/outbound/adapters/soap/soap-client");

interface MockSoapClient extends Client {
  testMethodAsync: jest.Mock;
}

describe("GenericRepository", () => {
  let repository: GenericRepository;
  let mockSoapClient: jest.Mocked<MockSoapClient>;
  let mockConfig: BaseSoapRepositoryConstructorConfig;

  beforeEach(() => {
    mockSoapClient = {
      testMethodAsync: jest.fn(),
      setEndpoint: jest.fn(),
      describe: jest.fn().mockReturnValue({
        Service: {
          ServiceSoap: {
            testMethod: { input: { Auth: {} } },
          },
          ServiceSoap12: {
            testMethod: { input: { Auth: {} } },
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

    repository = new GenericRepository(mockConfig);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("call", () => {
    it("should call generic method with SOAP 1.1", async () => {
      const mockResponse = { result: "success" };
      mockSoapClient.testMethodAsync.mockResolvedValue([mockResponse]);

      const config = { ...mockConfig, useSoap12: false };
      repository = new GenericRepository(config);

      const result = await repository.call("ws_test", "testMethod", {
        param: "value",
      });

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.testMethodAsync).toHaveBeenCalledWith({
        param: "value",
        Auth: { Token: "token", Sign: "sign", Cuit: 12345678901 },
      });
    });

    it("should call generic method with SOAP 1.2", async () => {
      const mockResponse = { result: "success" };
      mockSoapClient.testMethodAsync.mockResolvedValue([mockResponse]);

      const config = { ...mockConfig, useSoap12: true };
      repository = new GenericRepository(config);

      const result = await repository.call("ws_test", "testMethod", {
        param: "value",
      });

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.testMethodAsync).toHaveBeenCalledWith({
        param: "value",
        Auth: { Token: "token", Sign: "sign", Cuit: 12345678901 },
      });
    });

    it("should throw error if method does not exist", async () => {
      const config = { ...mockConfig, useSoap12: false };
      repository = new GenericRepository(config);

      await expect(
        repository.call("ws_test", "nonExistentMethod", {}),
      ).rejects.toThrow(
        "Method nonExistentMethod not found on service ws_test",
      );
    });
  });
});
