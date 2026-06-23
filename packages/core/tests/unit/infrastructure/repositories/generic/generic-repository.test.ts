import { GenericRepository } from "@infrastructure/repositories/generic/generic-repository";
import { SoapClient } from "@infrastructure/soap/soap-client";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/types/soap-repository.types";
import { ArcaServiceNames } from "@application/types/service-name.types";
import { WsdlPaths } from "@infrastructure/soap/config/wsdl-path.types";
import { Endpoints } from "@infrastructure/soap/config/endpoints.types";
import { Client } from "soap";

jest.mock("@infrastructure/soap/soap-client");

interface MockSoapClient extends Client {
  testMethodAsync: jest.Mock;
  dummyAsync: jest.Mock;
  getPersonaAsync: jest.Mock;
  consultarTiposRetencionesAsync: jest.Mock;
  FEXGetPARAM_Cbte_TipoAsync: jest.Mock;
  FEXDummyAsync: jest.Mock;
}

describe("GenericRepository", () => {
  let repository: GenericRepository;
  let mockSoapClient: jest.Mocked<MockSoapClient>;
  let mockConfig: BaseSoapRepositoryConstructorConfig;

  beforeEach(() => {
    mockSoapClient = {
      testMethodAsync: jest.fn(),
      dummyAsync: jest.fn(),
      getPersonaAsync: jest.fn(),
      consultarTiposRetencionesAsync: jest.fn(),
      FEXGetPARAM_Cbte_TipoAsync: jest.fn(),
      FEXDummyAsync: jest.fn(),
      setEndpoint: jest.fn(),
      describe: jest.fn().mockReturnValue({
        Service: {
          ServiceSoap: {
            testMethod: { input: { Auth: {} } },
            FEXGetPARAM_Cbte_Tipo: { input: { Auth: {} } },
          },
          ServiceSoap12: {
            testMethod: { input: { Auth: {} } },
            FEXGetPARAM_Cbte_Tipo: { input: { Auth: {} } },
          },
        },
      }),
    } as never;

    (SoapClient.prototype.createClient as jest.Mock).mockResolvedValue(
      mockSoapClient,
    );
    jest.spyOn(SoapClient.prototype, "setEndpoint").mockImplementation(() => {});

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
      expect(SoapClient.prototype.createClient).toHaveBeenCalledWith(
        WsdlPaths.WSFE_TEST,
        expect.objectContaining({ forceSoap12Headers: false }),
      );
      expect(SoapClient.prototype.setEndpoint).toHaveBeenCalledWith(
        mockSoapClient,
        Endpoints.WSFEV1_TEST,
      );
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

    it("should resolve bundled WSDL and padron auth for ws_sr_padron_a4", async () => {
      const mockResponse = { appserver: "OK" };
      mockSoapClient.dummyAsync.mockResolvedValue([mockResponse]);

      const result = await repository.call(
        ArcaServiceNames.WSSR_PADRON_FOUR,
        "dummy",
        {},
      );

      expect(result).toEqual(mockResponse);
      expect(SoapClient.prototype.createClient).toHaveBeenCalledWith(
        WsdlPaths.WSSR_PADRON_FOUR_TEST,
        expect.objectContaining({ forceSoap12Headers: false }),
      );
      expect(SoapClient.prototype.setEndpoint).toHaveBeenCalledWith(
        mockSoapClient,
        Endpoints.WSSR_PADRON_FOUR_TEST,
      );
      expect(mockSoapClient.dummyAsync).toHaveBeenCalledWith({});
    });

    it("should inject padron auth for authenticated methods", async () => {
      const mockResponse = { personaReturn: {} };
      mockSoapClient.getPersonaAsync.mockResolvedValue([mockResponse]);

      const result = await repository.call(
        ArcaServiceNames.WSSR_PADRON_FOUR,
        "getPersona",
        { idPersona: 20111111112 },
      );

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.getPersonaAsync).toHaveBeenCalledWith({
        idPersona: 20111111112,
        token: "token",
        sign: "sign",
        cuitRepresentada: 12345678901,
      });
    });

    it("should inject FECRED authRequest for authenticated methods", async () => {
      const mockResponse = { consultarTiposRetencionesReturn: {} };
      mockSoapClient.consultarTiposRetencionesAsync.mockResolvedValue([
        mockResponse,
      ]);

      const result = await repository.call(
        ArcaServiceNames.WSFECRED,
        "consultarTiposRetenciones",
        {},
      );

      expect(result).toEqual(mockResponse);
      expect(SoapClient.prototype.createClient).toHaveBeenCalledWith(
        WsdlPaths.WSFECRED_TEST,
        expect.objectContaining({ forceSoap12Headers: false }),
      );
      expect(SoapClient.prototype.setEndpoint).toHaveBeenCalledWith(
        mockSoapClient,
        Endpoints.WSFECRED_TEST,
      );
      expect(mockSoapClient.consultarTiposRetencionesAsync).toHaveBeenCalledWith(
        {
          authRequest: {
            token: "token",
            sign: "sign",
            cuitRepresentada: 12345678901,
          },
        },
      );
    });

    it("should exclude FEXDummy from auth and inject auth for other WSFEX methods", async () => {
      const mockDummyResponse = { FEXDummyResult: {} };
      mockSoapClient.FEXDummyAsync.mockResolvedValue([mockDummyResponse]);

      await repository.call(ArcaServiceNames.WSFEX, "FEXDummy", {});
      expect(mockSoapClient.FEXDummyAsync).toHaveBeenCalledWith({});

      const mockParamResponse = { FEXGetPARAM_Cbte_TipoResult: {} };
      mockSoapClient.FEXGetPARAM_Cbte_TipoAsync.mockResolvedValue([
        mockParamResponse,
      ]);

      const result = await repository.call(
        ArcaServiceNames.WSFEX,
        "FEXGetPARAM_Cbte_Tipo",
        {},
      );

      expect(result).toEqual(mockParamResponse);
      expect(mockSoapClient.FEXGetPARAM_Cbte_TipoAsync).toHaveBeenCalledWith({
        Auth: { Token: "token", Sign: "sign", Cuit: 12345678901 },
      });
    });

    it("should use custom WSDL content without bundled config", async () => {
      const mockResponse = { ok: true };
      mockSoapClient.testMethodAsync.mockResolvedValue([mockResponse]);

      const result = await repository.call(
        ArcaServiceNames.WSFE,
        "testMethod",
        { param: "value" },
        { wsdlContent: "<wsdl/>" },
      );

      expect(result).toEqual(mockResponse);
      expect(SoapClient.prototype.createClient).toHaveBeenCalledWith(
        "",
        expect.objectContaining({ wsdlContent: "<wsdl/>" }),
      );
      expect(SoapClient.prototype.setEndpoint).not.toHaveBeenCalled();
    });

    it("should throw when service has no bundled WSDL and no wsdlContent", async () => {
      await expect(
        repository.call(ArcaServiceNames.FE_DUMMY, "dummy", {}),
      ).rejects.toThrow(
        "No bundled WSDL for service FEDummy. Provide wsdlContent in options.",
      );
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
