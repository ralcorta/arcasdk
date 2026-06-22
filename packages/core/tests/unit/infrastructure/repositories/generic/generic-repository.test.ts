import { GenericRepository } from "@infrastructure/repositories/generic/generic-repository";
import { SoapClient } from "@infrastructure/soap/soap-client";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/types/soap-repository.types";
import { ArcaServiceNames } from "@application/types/service-name.types";
import { Client } from "soap";

jest.mock("@infrastructure/soap/soap-client");

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

      const result = await repository.call(ArcaServiceNames.WSFE, "testMethod", {
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

      const result = await repository.call(ArcaServiceNames.WSFE, "testMethod", {
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
        repository.call(ArcaServiceNames.WSFE, "nonExistentMethod", {}),
      ).rejects.toThrow(
        `Method nonExistentMethod not found on service ${ArcaServiceNames.WSFE}`,
      );
    });
  });
});
