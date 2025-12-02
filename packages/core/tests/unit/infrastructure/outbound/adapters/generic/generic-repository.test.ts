import { GenericRepository } from "@infrastructure/outbound/adapters/generic/generic-repository";
import { SoapClientFacade } from "@infrastructure/outbound/adapters/soap/soap-client-facade";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/outbound/ports/soap/soap-repository.types";

jest.mock("@infrastructure/outbound/adapters/soap/soap-client-facade");

describe("GenericRepository", () => {
  let repository: GenericRepository;
  let mockSoapClient: any;
  let mockConfig: BaseSoapRepositoryConstructorConfig;

  beforeEach(() => {
    mockSoapClient = {
      createClient: jest
        .fn()
        .mockImplementation(() => Promise.resolve(mockSoapClient)),
      testMethodAsync: jest.fn(),
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
    };

    (SoapClientFacade.create as jest.Mock).mockResolvedValue(mockSoapClient);

    mockConfig = {
      soapClient: mockSoapClient,
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

    repository = new GenericRepository(mockConfig);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("call", () => {
    it("should call generic method with SOAP 1.1", async () => {
      const mockResponse = { result: "success" };
      mockSoapClient.testMethodAsync.mockResolvedValue([mockResponse]);

      // Default is SOAP 1.1 (useSoap12 is undefined/false by default in BaseSoapRepository if not set,
      // but let's check the implementation. BaseSoapRepository defaults useSoap12 to true for Electronic Billing,
      // but GenericRepository extends BaseSoapRepository.
      // Let's force it to false for this test to be sure.
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
        repository.call("ws_test", "nonExistentMethod", {})
      ).rejects.toThrow(
        "Method nonExistentMethod not found on service ws_test"
      );
    });
  });
});
