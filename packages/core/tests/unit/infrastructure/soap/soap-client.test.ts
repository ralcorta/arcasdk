import { SoapClient } from "@infrastructure/soap/soap-client";
import { Client, createClientAsync, type IHttpClient } from "soap";
import { SoapRuntime } from "@infrastructure/utils/soap-runtime";

// Mock the wsdl-strings module
jest.mock(
  "@infrastructure/soap/wsdl-strings",
  () => ({
    getWsdlString: jest.fn(),
  }),
);

// Mock the engines module
const mockCreateSoapEngine = jest.fn();
const mockDetectSoapRuntime = jest.fn();
jest.mock(
  "@infrastructure/soap/engines",
  () => ({
    createSoapEngine: mockCreateSoapEngine,
    detectSoapRuntime: mockDetectSoapRuntime,
  }),
);

// Mock soap library
jest.mock("soap", () => ({
  ...jest.requireActual("soap"),
  createClientAsync: jest.fn(),
}));

// Access mocked versions of functions
const {
  getWsdlString,
} = require("@infrastructure/soap/wsdl-strings");

const MockedGetWsdlString = getWsdlString as jest.MockedFunction<
  typeof getWsdlString
>;
const MockedCreateClientAsync = createClientAsync as jest.MockedFunction<
  typeof createClientAsync
>;

describe("SoapClient", () => {
  let soapClient: SoapClient;
  let mockClient: jest.Mocked<Client>;

  beforeEach(() => {
    soapClient = new SoapClient();

    // Create a mock client that satisfies the Client interface for our test needs
    mockClient = {
      setEndpoint: jest.fn(),
      describe: jest.fn(),
      addSoapHeader: jest.fn(),
      changeSoapHeader: jest.fn(),
      getSoapHeaders: jest.fn(),
      clearSoapHeaders: jest.fn(),
      addHttpHeader: jest.fn(),
      getHttpHeaders: jest.fn(),
      clearHttpHeaders: jest.fn(),
      addBodyAttribute: jest.fn(),
      getBodyAttributes: jest.fn(),
      clearBodyAttributes: jest.fn(),
      setSecurity: jest.fn(),
      setSOAPAction: jest.fn(),
    } as never;

    MockedCreateClientAsync.mockResolvedValue(mockClient);

    // Mock getWsdlString to return a valid WSDL XML string
    MockedGetWsdlString.mockReturnValue(
      '<?xml version="1.0" encoding="UTF-8"?><wsdl:definitions></wsdl:definitions>',
    );

    mockDetectSoapRuntime.mockReturnValue(SoapRuntime.Universal);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createClient", () => {
    it("should create a SOAP client with default options", async () => {
      const wsdlName = "wsfe.wsdl";
      const client = await soapClient.createClient<Client>(wsdlName);

      expect(client).toBe(mockClient);
      expect(MockedGetWsdlString).toHaveBeenCalledWith(wsdlName);
      expect(mockCreateSoapEngine).toHaveBeenCalled();
      expect(mockCreateSoapEngine).toHaveBeenCalledWith(
        expect.objectContaining({
          runtime: expect.any(String),
        }),
      );
      expect(MockedCreateClientAsync).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          disableCache: true,
          forceSoap12Headers: false,
        }),
      );
    });

    it("should create a SOAP client with custom options", async () => {
      const wsdlName = "wsaa.wsdl";
      const customOptions = {
        forceSoap12Headers: true,
        customOption: "value",
      };

      const client = await soapClient.createClient<Client>(
        wsdlName,
        customOptions,
      );

      expect(client).toBe(mockClient);
      expect(MockedGetWsdlString).toHaveBeenCalledWith(wsdlName);
      expect(MockedCreateClientAsync).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          disableCache: true,
          forceSoap12Headers: true,
          customOption: "value",
        }),
      );
    });

    it("should use explicit runtime when provided in options", async () => {
      const wsdlName = "wsfe.wsdl";
      await soapClient.createClient<Client>(wsdlName, {
        runtime: SoapRuntime.Universal,
      });

      expect(mockCreateSoapEngine).toHaveBeenCalledWith(
        expect.objectContaining({
          runtime: SoapRuntime.Universal,
        }),
      );
    });

    it("should skip internal engine factory when custom httpClient is provided", async () => {
      const wsdlName = "wsfe.wsdl";
      const customHttpClient = {
        request: jest.fn(),
      } as unknown as IHttpClient;

      await soapClient.createClient<Client>(wsdlName, {
        httpClient: customHttpClient,
      });

      expect(mockCreateSoapEngine).not.toHaveBeenCalled();
      expect(MockedCreateClientAsync).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          httpClient: customHttpClient,
        }),
      );
    });

    it("should prioritize custom httpClient even when runtime is provided", async () => {
      const wsdlName = "wsfe.wsdl";
      const customHttpClient = {
        request: jest.fn(),
      } as unknown as IHttpClient;

      await soapClient.createClient<Client>(wsdlName, {
        runtime: SoapRuntime.Universal,
        httpClient: customHttpClient,
      });

      expect(mockCreateSoapEngine).not.toHaveBeenCalled();
      expect(MockedCreateClientAsync).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          runtime: SoapRuntime.Universal,
          httpClient: customHttpClient,
        }),
      );
    });

    it("should pass request options to internal engine factory", async () => {
      const wsdlName = "wsfe.wsdl";
      const requestOptions = {
        timeout: 5000,
        headers: { "X-Test": "1" },
      };

      await soapClient.createClient<Client>(wsdlName, {
        request: requestOptions,
      });

      expect(mockCreateSoapEngine).toHaveBeenCalledWith(
        expect.objectContaining({
          requestOptions,
        }),
      );
    });

    it("should throw error if WSDL not found", async () => {
      const wsdlName = "non-existent.wsdl";
      MockedGetWsdlString.mockReturnValue(undefined);

      await expect(soapClient.createClient<Client>(wsdlName)).rejects.toThrow(
        `WSDL ${wsdlName} not found`,
      );

      expect(MockedGetWsdlString).toHaveBeenCalledWith(wsdlName);
      expect(MockedCreateClientAsync).not.toHaveBeenCalled();
    });
  });

  describe("setEndpoint", () => {
    it("should set endpoint if client has setEndpoint method", () => {
      const endpoint = "https://example.com/soap";
      soapClient.setEndpoint(mockClient, endpoint);

      expect(mockClient.setEndpoint).toHaveBeenCalledWith(endpoint);
    });

    it("should not throw if client does not have setEndpoint method", () => {
      // Create an object that doesn't have setEndpoint
      const clientWithoutSetEndpoint = {} as jest.Mocked<Client>;
      const endpoint = "https://example.com/soap";

      expect(() => {
        soapClient.setEndpoint(clientWithoutSetEndpoint, endpoint);
      }).not.toThrow();
    });
  });

  describe("call", () => {
    it("should call the method on the client", async () => {
      const methodName = "someMethodAsync";
      const params = { param1: "value1" };
      const expectedResult: [object, string, object, string] = [
        { result: "success" },
        "",
        {},
        "",
      ];

      // Add the dynamic method to our mock client
      (mockClient as never as Record<string, jest.Mock>)[methodName] = jest
        .fn()
        .mockResolvedValue(expectedResult);

      const result = await soapClient.call(mockClient, methodName, params);

      expect(
        (mockClient as never as Record<string, jest.Mock>)[methodName],
      ).toHaveBeenCalledWith(params);
      expect(result).toEqual(expectedResult);
    });

    it("should throw error if method does not exist on client", async () => {
      const methodName = "nonExistentMethod";
      const params = { param1: "value1" };

      await expect(
        soapClient.call(mockClient, methodName, params),
      ).rejects.toThrow(`Method ${methodName} not found on SOAP client`);
    });

  });
});
