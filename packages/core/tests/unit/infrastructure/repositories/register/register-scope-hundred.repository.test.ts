import { RegisterScopeHundredRepository } from "@infrastructure/repositories/register/register-scope-hundred.repository";
import { SoapClient } from "@infrastructure/soap/soap-client";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/types/soap-repository.types";
import { IParameterServiceA100PortSoap } from "@infrastructure/soap/contracts/ParameterServiceA100/ParameterServiceA100Port";
import { WsdlPaths } from "@infrastructure/soap/config/wsdl-path.types";
import { Endpoints } from "@infrastructure/soap/config/endpoints.types";
import {
  createRepositoryConfig,
  createServerStatusResponse,
  REPOSITORY_TEST_CUIT,
} from "./register-repository.test.helpers";

jest.mock("@infrastructure/soap/soap-client");

function createParameterCollectionResponse(parameterList: unknown) {
  return {
    parameterCollectionReturn: {
      metadata: {
        fechaHora: new Date("2026-09-25T12:38:03.144Z"),
        servidor: "setiwsh2",
      },
      parameterCollection: {
        name: "SUPA.E_PROVINCIA",
        parameterList,
      },
    },
  };
}

describe("RegisterScopeHundredRepository", () => {
  let repository: RegisterScopeHundredRepository;
  let mockSoapClient: jest.Mocked<IParameterServiceA100PortSoap>;
  let mockConfig: BaseSoapRepositoryConstructorConfig;

  beforeEach(() => {
    mockSoapClient = {
      dummyAsync: jest.fn(),
      getParameterCollectionByNameAsync: jest.fn(),
      setEndpoint: jest.fn(),
      describe: jest.fn().mockReturnValue({}),
    } as never;

    (SoapClient.prototype.createClient as jest.Mock).mockResolvedValue(
      mockSoapClient,
    );

    mockConfig = createRepositoryConfig();

    repository = new RegisterScopeHundredRepository(mockConfig);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getClient", () => {
    it("uses the testing WSDL and endpoint by default", async () => {
      mockSoapClient.dummyAsync.mockResolvedValue([
        createServerStatusResponse(),
      ] as never);

      await repository.getServerStatus();

      expect(SoapClient.prototype.createClient).toHaveBeenCalledWith(
        WsdlPaths.WSSR_PADRON_HUNDRED_TEST,
        expect.objectContaining({ forceSoap12Headers: false }),
      );
      expect(SoapClient.prototype.setEndpoint).toHaveBeenCalledWith(
        mockSoapClient,
        Endpoints.WSSR_PADRON_HUNDRED_TEST,
      );
    });

    it("uses the production WSDL and endpoint in production", async () => {
      repository = new RegisterScopeHundredRepository({
        ...mockConfig,
        production: true,
      });
      mockSoapClient.dummyAsync.mockResolvedValue([
        createServerStatusResponse(),
      ] as never);

      await repository.getServerStatus();

      expect(SoapClient.prototype.createClient).toHaveBeenCalledWith(
        WsdlPaths.WSSR_PADRON_HUNDRED,
        expect.anything(),
      );
      expect(SoapClient.prototype.setEndpoint).toHaveBeenCalledWith(
        mockSoapClient,
        Endpoints.WSSR_PADRON_HUNDRED,
      );
    });

    it("reuses the SOAP client between calls", async () => {
      mockSoapClient.dummyAsync.mockResolvedValue([
        createServerStatusResponse(),
      ] as never);

      await repository.getServerStatus();
      await repository.getServerStatus();

      expect(SoapClient.prototype.createClient).toHaveBeenCalledTimes(1);
    });
  });

  describe("getServerStatus", () => {
    it("should return server status without authenticating", async () => {
      mockSoapClient.dummyAsync.mockResolvedValue([
        createServerStatusResponse(),
      ] as never);

      const result = await repository.getServerStatus();

      expect(result).toEqual({
        appServer: "OK",
        dbServer: "OK",
        authServer: "OK",
      });
      expect(mockSoapClient.dummyAsync).toHaveBeenCalledWith({});
      expect(mockConfig.authRepository.login).not.toHaveBeenCalled();
    });
  });

  describe("getParameterCollection", () => {
    it("sends padron credentials and the collection name", async () => {
      mockSoapClient.getParameterCollectionByNameAsync.mockResolvedValue([
        createParameterCollectionResponse([]),
      ] as never);

      await repository.getParameterCollection("SUPA.E_PROVINCIA");

      expect(mockConfig.authRepository.login).toHaveBeenCalledWith(
        "ws_sr_padron_a100",
      );
      expect(
        mockSoapClient.getParameterCollectionByNameAsync,
      ).toHaveBeenCalledWith({
        token: "token",
        sign: "sign",
        cuitRepresentada: REPOSITORY_TEST_CUIT,
        collectionName: "SUPA.E_PROVINCIA",
      });
    });

    it("maps parameters and their attributes", async () => {
      mockSoapClient.getParameterCollectionByNameAsync.mockResolvedValue([
        createParameterCollectionResponse([
          {
            id: "0",
            description: "CIUDAD AUTONOMA BUENOS AIRES",
            attributeList: [
              { name: "COD_PROVINCIA", value: "0" },
              { name: "CODIGO_SIM_PROVINCIA", value: "CF" },
            ],
          },
          {
            id: "1",
            description: "BUENOS AIRES",
            attributeList: [{ name: "COD_PROVINCIA", value: "1" }],
          },
        ]),
      ] as never);

      const result = await repository.getParameterCollection("SUPA.E_PROVINCIA");

      expect(result).toEqual({
        name: "SUPA.E_PROVINCIA",
        fechaHora: "2026-09-25T12:38:03.144Z",
        parameters: [
          {
            id: "0",
            description: "CIUDAD AUTONOMA BUENOS AIRES",
            attributes: { COD_PROVINCIA: "0", CODIGO_SIM_PROVINCIA: "CF" },
          },
          {
            id: "1",
            description: "BUENOS AIRES",
            attributes: { COD_PROVINCIA: "1" },
          },
        ],
      });
    });

    it("normalizes single-element lists returned as objects", async () => {
      mockSoapClient.getParameterCollectionByNameAsync.mockResolvedValue([
        createParameterCollectionResponse({
          id: "0",
          description: "CIUDAD AUTONOMA BUENOS AIRES",
          attributeList: { name: "COD_PROVINCIA", value: "0" },
        }),
      ] as never);

      const result = await repository.getParameterCollection("SUPA.E_PROVINCIA");

      expect(result?.parameters).toEqual([
        {
          id: "0",
          description: "CIUDAD AUTONOMA BUENOS AIRES",
          attributes: { COD_PROVINCIA: "0" },
        },
      ]);
    });

    it("returns an empty list when the collection has no parameters", async () => {
      mockSoapClient.getParameterCollectionByNameAsync.mockResolvedValue([
        {
          parameterCollectionReturn: {
            parameterCollection: { name: "SUPA.TIPO_EMAIL" },
          },
        },
      ] as never);

      const result = await repository.getParameterCollection("SUPA.TIPO_EMAIL");

      expect(result).toEqual({
        name: "SUPA.TIPO_EMAIL",
        fechaHora: undefined,
        parameters: [],
      });
    });

    it("returns null when ARCA does not return a collection", async () => {
      mockSoapClient.getParameterCollectionByNameAsync.mockResolvedValue([
        { parameterCollectionReturn: {} },
      ] as never);

      const result = await repository.getParameterCollection("SUPA.E_PROVINCIA");

      expect(result).toBeNull();
    });

    it("propagates SOAP faults such as an unknown collection name", async () => {
      const fault = new Error(
        "soap:Server: ParameterDefinition no encontrada en PUC_PARAM.DICCIONARIO_PARAMETROS - SUPA.NO_EXISTE",
      );
      mockSoapClient.getParameterCollectionByNameAsync.mockRejectedValue(fault);

      await expect(
        repository.getParameterCollection("SUPA.NO_EXISTE"),
      ).rejects.toThrow("ParameterDefinition no encontrada");
    });
  });
});
