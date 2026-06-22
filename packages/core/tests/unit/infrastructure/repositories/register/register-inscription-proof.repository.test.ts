import { RegisterInscriptionProofRepository } from "@infrastructure/repositories/register/register-inscription-proof.repository";
import { SoapClient } from "@infrastructure/soap/soap-client";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/types/soap-repository.types";
import { IPersonaServiceInscriptionProofPortSoap } from "@infrastructure/soap/contracts/PersonaServiceInscriptionProof/PersonaServiceInscriptionProofPort";
import {
  createRepositoryConfig,
  createServerStatusResponse,
  createTaxpayerPersonaResponse,
  expectedTaxpayerDetails,
  REPOSITORY_TEST_IDENTIFIER,
} from "./register-repository.test.helpers";

jest.mock("@infrastructure/soap/soap-client");

describe("RegisterInscriptionProofRepository", () => {
  let repository: RegisterInscriptionProofRepository;
  let mockSoapClient: jest.Mocked<IPersonaServiceInscriptionProofPortSoap>;
  let mockConfig: BaseSoapRepositoryConstructorConfig;

  beforeEach(() => {
    mockSoapClient = {
      dummyAsync: jest.fn(),
      getPersona_v2Async: jest.fn(),
      getPersonaList_v2Async: jest.fn(),
      setEndpoint: jest.fn(),
      describe: jest.fn().mockReturnValue({
        Service: {
          ServiceSoap: {
            dummy: { input: { Auth: {} } },
            getPersona_v2: { input: { Auth: {} } },
            getPersonaList_v2: { input: { Auth: {} } },
          },
        },
      }),
    } as never;

    (SoapClient.prototype.createClient as jest.Mock).mockResolvedValue(
      mockSoapClient,
    );

    mockConfig = createRepositoryConfig();

    repository = new RegisterInscriptionProofRepository(mockConfig);
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
      const mockResponse = createTaxpayerPersonaResponse() as never;
      mockSoapClient.getPersona_v2Async.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.getTaxpayerDetails(
        REPOSITORY_TEST_IDENTIFIER,
      );

      expect(result).toEqual(expectedTaxpayerDetails());
    });

    it("should map personaReturn con datosGenerales en raíz (ws_sr_constancia_inscripción)", async () => {
      const mockResponse = {
        personaReturn: {
          datosGenerales: {
            idPersona: REPOSITORY_TEST_IDENTIFIER,
            tipoPersona: "FISICA",
            estadoClave: "ACTIVO",
          },
        },
      } as never;
      mockSoapClient.getPersona_v2Async.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.getTaxpayerDetails(
        REPOSITORY_TEST_IDENTIFIER,
      );

      expect(result).toEqual(expectedTaxpayerDetails());
    });

    it("should return null if persona not found", async () => {
      const mockResponse = {
        personaReturn: {
          errorConstancia: {
            apellido: "",
            error: "No existe",
            idPersona: 0,
            nombre: "",
          },
        },
      } as never;
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

  describe("getTaxpayersDetails", () => {
    it("should return taxpayers details", async () => {
      const mockResponse = {
        personaListReturn: {
          persona: [
            {
              datosGenerales: {
                idPersona: 20111111112,
                tipoPersona: "FISICA",
                estadoClave: "ACTIVO",
              },
            },
          ],
        },
      } as never;
      mockSoapClient.getPersonaList_v2Async.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.getTaxpayersDetails([
        REPOSITORY_TEST_IDENTIFIER,
      ]);

      expect(result.persona).toHaveLength(1);
      expect(result.persona?.[0]).toEqual({
        idPersona: 20111111112,
        tipoPersona: "FISICA",
        estadoClave: "ACTIVO",
        datosGenerales: expect.any(Object),
        datosMonotributo: undefined,
        datosRegimenGeneral: undefined,
        errorConstancia: undefined,
      });
    });
  });
});
