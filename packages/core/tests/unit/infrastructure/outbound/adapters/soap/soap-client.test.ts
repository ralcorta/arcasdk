import { SoapClient } from "@arcasdk/core/src/infrastructure/outbound/adapters/soap/soap-client";
import { SoapClientFacade } from "@arcasdk/core/src/infrastructure/outbound/adapters/soap/soap-client-facade";
import { Client } from "soap";

jest.mock("@infrastructure/outbound/adapters/soap/soap-client-facade");

describe("SoapClient", () => {
  let soapClient: SoapClient;
  let mockClient: jest.Mocked<Client>;

  beforeEach(() => {
    soapClient = new SoapClient();
    mockClient = {
      setEndpoint: jest.fn(),
      someMethod: jest.fn(),
      someMethodAsync: jest.fn().mockResolvedValue(["result", "", {}, ""]),
    } as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createClient", () => {
    it("should create a SOAP client with default options", async () => {
      const mockCreate = SoapClientFacade.create as jest.MockedFunction<
        typeof SoapClientFacade.create
      >;
      mockCreate.mockResolvedValue(mockClient as any);

      const wsdlPath = "/path/to/wsdl.wsdl";
      const client = await soapClient.createClient<Client>(wsdlPath);

      expect(client).toBe(mockClient);
      expect(mockCreate).toHaveBeenCalledWith({
        wsdl: wsdlPath,
        options: expect.objectContaining({
          disableCache: true,
          forceSoap12Headers: false,
          wsdl_options: expect.objectContaining({
            httpsAgent: expect.any(Object),
          }),
          request: expect.objectContaining({
            httpsAgent: expect.any(Object),
          }),
        }),
      });
    });

    it("should create a SOAP client with custom options", async () => {
      const mockCreate = SoapClientFacade.create as jest.MockedFunction<
        typeof SoapClientFacade.create
      >;
      mockCreate.mockResolvedValue(mockClient as any);

      const wsdlPath = "/path/to/wsdl.wsdl";
      const customOptions = {
        forceSoap12Headers: true,
        customOption: "value",
      };

      const client = await soapClient.createClient<Client>(
        wsdlPath,
        customOptions
      );

      expect(client).toBe(mockClient);
      expect(mockCreate).toHaveBeenCalledWith({
        wsdl: wsdlPath,
        options: expect.objectContaining({
          disableCache: true,
          forceSoap12Headers: true,
          customOption: "value",
          wsdl_options: expect.objectContaining({
            httpsAgent: expect.any(Object),
          }),
          request: expect.objectContaining({
            httpsAgent: expect.any(Object),
          }),
        }),
      });
    });

    it("should merge custom options with default options", async () => {
      const mockCreate = SoapClientFacade.create as jest.MockedFunction<
        typeof SoapClientFacade.create
      >;
      mockCreate.mockResolvedValue(mockClient as any);

      const wsdlPath = "/path/to/wsdl.wsdl";
      const customOptions = {
        disableCache: false, // Should be overridden by default
        forceSoap12Headers: true,
      };

      await soapClient.createClient<Client>(wsdlPath, customOptions);

      expect(mockCreate).toHaveBeenCalledWith({
        wsdl: wsdlPath,
        options: expect.objectContaining({
          disableCache: false, // Custom option takes precedence
          forceSoap12Headers: true,
        }),
      });
    });
  });

  describe("setEndpoint", () => {
    it("should set endpoint if client has setEndpoint method", () => {
      const endpoint = "https://example.com/soap";
      soapClient.setEndpoint(mockClient, endpoint);

      expect(mockClient.setEndpoint).toHaveBeenCalledWith(endpoint);
    });

    it("should not throw if client does not have setEndpoint method", () => {
      const clientWithoutSetEndpoint = {} as any;
      const endpoint = "https://example.com/soap";

      expect(() => {
        soapClient.setEndpoint(clientWithoutSetEndpoint, endpoint);
      }).not.toThrow();
    });

    it("should not throw if client is null", () => {
      const endpoint = "https://example.com/soap";

      expect(() => {
        soapClient.setEndpoint(null as any, endpoint);
      }).not.toThrow();
    });
  });

  describe("call", () => {
    it("should call the method on the client", async () => {
      const methodName = "someMethodAsync";
      const params = { param1: "value1" };
      const expectedResult: [any, string, any, string] = [
        { result: "success" },
        "",
        {},
        "",
      ];

      mockClient[methodName] = jest
        .fn()
        .mockResolvedValue(expectedResult) as any;

      const result = await soapClient.call(mockClient, methodName, params);

      expect(mockClient[methodName]).toHaveBeenCalledWith(params);
      expect(result).toEqual(expectedResult);
    });

    it("should throw error if method does not exist on client", async () => {
      const methodName = "nonExistentMethod";
      const params = { param1: "value1" };

      await expect(
        soapClient.call(mockClient, methodName, params)
      ).rejects.toThrow(`Method ${methodName} not found on SOAP client`);
    });

    it("should throw error if client is null", async () => {
      const methodName = "someMethod";
      const params = { param1: "value1" };

      await expect(
        soapClient.call(null as any, methodName, params)
      ).rejects.toThrow(`Method ${methodName} not found on SOAP client`);
    });

    it("should throw error if method is not a function", async () => {
      const methodName = "someProperty";
      const params = { param1: "value1" };

      (mockClient as any)[methodName] = "not a function";

      await expect(
        soapClient.call(mockClient, methodName, params)
      ).rejects.toThrow(`Method ${methodName} not found on SOAP client`);
    });
  });
});
