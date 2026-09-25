import { CdcRepository } from "@infrastructure/repositories/cdc/cdc.repository";
import { SoapClient } from "@infrastructure/soap/soap-client";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/types/soap-repository.types";
import { IServiceSoap12Soap } from "@infrastructure/soap/contracts/CDCService/ServiceSoap12";
import { WsdlPaths } from "@infrastructure/soap/config/wsdl-path.types";
import { Endpoints } from "@infrastructure/soap/config/endpoints.types";

jest.mock("@infrastructure/soap/soap-client");

describe("CdcRepository", () => {
  let repository: CdcRepository;
  let mockSoapClient: jest.Mocked<IServiceSoap12Soap>;
  let mockConfig: BaseSoapRepositoryConstructorConfig;
  const expectedAuth = {
    Auth: { Token: "token", Sign: "sign", Cuit: 12345678901 },
  };
  const operationsWithAuth = {
    ComprobanteConstatar: { input: { Auth: {}, CmpReq: {} } },
    ComprobantesModalidadConsultar: { input: { Auth: {} } },
    ComprobantesTipoConsultar: { input: { Auth: {} } },
    DocumentosTipoConsultar: { input: { Auth: {} } },
    OpcionalesTipoConsultar: { input: { Auth: {} } },
    ComprobanteDummy: { input: {} },
  };

  beforeEach(() => {
    mockSoapClient = {
      ComprobanteConstatarAsync: jest.fn(),
      ComprobantesModalidadConsultarAsync: jest.fn(),
      ComprobantesTipoConsultarAsync: jest.fn(),
      DocumentosTipoConsultarAsync: jest.fn(),
      OpcionalesTipoConsultarAsync: jest.fn(),
      ComprobanteDummyAsync: jest.fn(),
      setEndpoint: jest.fn(),
      describe: jest.fn().mockReturnValue({
        Service: {
          ServiceSoap: operationsWithAuth,
          ServiceSoap12: operationsWithAuth,
        },
      }),
    } as never;

    (SoapClient.prototype.createClient as jest.Mock).mockResolvedValue(
      mockSoapClient,
    );
    jest.spyOn(SoapClient.prototype, "setEndpoint").mockImplementation(() => {});

    const mockAuthRepository = {
      login: jest.fn().mockResolvedValue({ token: "token", sign: "sign" }),
      getAuthParams: jest.fn().mockReturnValue(expectedAuth),
    } as never;

    mockConfig = {
      authRepository: mockAuthRepository,
      cuit: 12345678901,
      production: false,
    };

    repository = new CdcRepository(mockConfig);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getClient", () => {
    it("uses the testing WSDL and endpoint by default", async () => {
      mockSoapClient.ComprobanteDummyAsync.mockResolvedValue([{}] as never);

      await repository.dummy();

      expect(SoapClient.prototype.createClient).toHaveBeenCalledWith(
        WsdlPaths.WSCDC_TEST,
        expect.objectContaining({ keepAlive: false }),
      );
      expect(SoapClient.prototype.setEndpoint).toHaveBeenCalledWith(
        mockSoapClient,
        Endpoints.WSCDC_TEST,
      );
    });

    it("uses the production WSDL and endpoint in production", async () => {
      repository = new CdcRepository({ ...mockConfig, production: true });
      mockSoapClient.ComprobanteDummyAsync.mockResolvedValue([{}] as never);

      await repository.dummy();

      expect(SoapClient.prototype.createClient).toHaveBeenCalledWith(
        WsdlPaths.WSCDC,
        expect.anything(),
      );
      expect(SoapClient.prototype.setEndpoint).toHaveBeenCalledWith(
        mockSoapClient,
        Endpoints.WSCDC,
      );
    });

    it("reuses the SOAP client between calls", async () => {
      mockSoapClient.ComprobanteDummyAsync.mockResolvedValue([{}] as never);

      await repository.dummy();
      await repository.dummy();

      expect(SoapClient.prototype.createClient).toHaveBeenCalledTimes(1);
    });
  });

  describe("dummy", () => {
    it("delegates to SOAP ComprobanteDummyAsync without auth", async () => {
      const mockResponse = {
        ComprobanteDummyResult: {
          AppServer: "OK",
          DbServer: "OK",
          AuthServer: "OK",
        },
      };
      mockSoapClient.ComprobanteDummyAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.dummy();

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.ComprobanteDummyAsync).toHaveBeenCalledWith({});
      expect(mockConfig.authRepository.login).not.toHaveBeenCalled();
    });
  });

  describe("constatarComprobante", () => {
    it("delegates to SOAP ComprobanteConstatarAsync with Auth", async () => {
      const mockResponse = {
        ComprobanteConstatarResult: { Resultado: "A" },
      };
      mockSoapClient.ComprobanteConstatarAsync.mockResolvedValue([
        mockResponse,
      ] as never);
      const input = {
        CmpReq: {
          CbteModo: "CAE",
          CuitEmisor: 20111111112,
          PtoVta: 3,
          CbteTipo: 1,
          CbteNro: 31,
          CbteFch: "20260924",
          ImpTotal: 507.74,
          CodAutorizacion: "86390926314486",
          DocTipoReceptor: "80",
          DocNroReceptor: "20077041096",
        },
      };

      const result = await repository.constatarComprobante(input as never);

      expect(result).toEqual(mockResponse);
      expect(mockConfig.authRepository.login).toHaveBeenCalledWith("wscdc");
      expect(mockSoapClient.ComprobanteConstatarAsync).toHaveBeenCalledWith({
        ...expectedAuth,
        ...input,
      });
    });
  });

  describe("getComprobantesModalidad", () => {
    it("delegates to SOAP ComprobantesModalidadConsultarAsync with Auth", async () => {
      const mockResponse = { ComprobantesModalidadConsultarResult: {} };
      mockSoapClient.ComprobantesModalidadConsultarAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.getComprobantesModalidad();

      expect(result).toEqual(mockResponse);
      expect(
        mockSoapClient.ComprobantesModalidadConsultarAsync,
      ).toHaveBeenCalledWith(expectedAuth);
    });
  });

  describe("getComprobantesTipo", () => {
    it("delegates to SOAP ComprobantesTipoConsultarAsync with Auth", async () => {
      const mockResponse = { ComprobantesTipoConsultarResult: {} };
      mockSoapClient.ComprobantesTipoConsultarAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.getComprobantesTipo();

      expect(result).toEqual(mockResponse);
      expect(
        mockSoapClient.ComprobantesTipoConsultarAsync,
      ).toHaveBeenCalledWith(expectedAuth);
    });
  });

  describe("getDocumentosTipo", () => {
    it("delegates to SOAP DocumentosTipoConsultarAsync with Auth", async () => {
      const mockResponse = { DocumentosTipoConsultarResult: {} };
      mockSoapClient.DocumentosTipoConsultarAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.getDocumentosTipo();

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.DocumentosTipoConsultarAsync).toHaveBeenCalledWith(
        expectedAuth,
      );
    });
  });

  describe("getOpcionalesTipo", () => {
    it("delegates to SOAP OpcionalesTipoConsultarAsync with Auth", async () => {
      const mockResponse = { OpcionalesTipoConsultarResult: {} };
      mockSoapClient.OpcionalesTipoConsultarAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.getOpcionalesTipo();

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.OpcionalesTipoConsultarAsync).toHaveBeenCalledWith(
        expectedAuth,
      );
    });
  });
});
