import { RegisterScopeFiveRepository } from "@infrastructure/outbound/adapters/repositories/register/register-scope-five.repository";
import { SoapClient } from "@infrastructure/outbound/adapters/soap/soap-client";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/types/soap-repository.types";
import {
  createRepositoryConfig,
  REPOSITORY_TEST_IDENTIFIER,
} from "./register-repository.test.helpers";

jest.mock("@infrastructure/outbound/adapters/soap/soap-client");

// Use RegisterScopeFiveRepository as the concrete vehicle for testing BaseBatchRegisterRepository
describe("BaseBatchRegisterRepository (via RegisterScopeFiveRepository)", () => {
  let repository: RegisterScopeFiveRepository;
  let mockSoapClient: {
    dummyAsync: jest.Mock;
    getPersona_v2Async: jest.Mock;
    getPersonaList_v2Async: jest.Mock;
    setEndpoint: jest.Mock;
    describe: jest.Mock;
  };
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
    };

    (SoapClient.prototype.createClient as jest.Mock).mockResolvedValue(
      mockSoapClient,
    );

    mockConfig = createRepositoryConfig();
    repository = new RegisterScopeFiveRepository(mockConfig);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getTaxpayersDetails", () => {
    it("should return empty persona array when response has no persona", async () => {
      mockSoapClient.getPersonaList_v2Async.mockResolvedValue([
        { personaListReturn: {} },
      ] as never);

      const result = await repository.getTaxpayersDetails([
        REPOSITORY_TEST_IDENTIFIER,
      ]);

      expect(result.persona).toEqual([]);
      expect(result.cantidadRegistros).toBe(0);
    });

    it("should map multiple personas to DTOs", async () => {
      mockSoapClient.getPersonaList_v2Async.mockResolvedValue([
        {
          personaListReturn: {
            persona: [
              {
                datosGenerales: {
                  idPersona: 20111111112,
                  tipoPersona: "FISICA",
                  estadoClave: "ACTIVO",
                },
              },
              {
                datosGenerales: {
                  idPersona: 30222222221,
                  tipoPersona: "JURIDICA",
                  estadoClave: "ACTIVO",
                },
              },
            ],
          },
        },
      ] as never);

      const result = await repository.getTaxpayersDetails([
        20111111112, 30222222221,
      ]);

      expect(result.persona).toHaveLength(2);
      expect(result.cantidadRegistros).toBe(2);
      expect(result.persona?.[1]).toEqual(
        expect.objectContaining({
          idPersona: 30222222221,
          tipoPersona: "JURIDICA",
        }),
      );
    });

    it("should pass identifiers array to the correct SOAP method", async () => {
      mockSoapClient.getPersonaList_v2Async.mockResolvedValue([
        { personaListReturn: { persona: [] } },
      ] as never);

      const identifiers = [20111111112, 30222222221];
      await repository.getTaxpayersDetails(identifiers);

      expect(mockSoapClient.getPersonaList_v2Async).toHaveBeenCalledWith(
        expect.objectContaining({ idPersona: identifiers }),
      );
    });
  });

  describe("mapPersonaToDto", () => {
    it("should map errorConstancia when present", async () => {
      mockSoapClient.getPersonaList_v2Async.mockResolvedValue([
        {
          personaListReturn: {
            persona: [
              {
                datosGenerales: {
                  idPersona: REPOSITORY_TEST_IDENTIFIER,
                  tipoPersona: "FISICA",
                  estadoClave: "ACTIVO",
                },
                errorConstancia: { error: "Parcial", codigo: 456 },
              },
            ],
          },
        },
      ] as never);

      const result = await repository.getTaxpayersDetails([
        REPOSITORY_TEST_IDENTIFIER,
      ]);

      expect(result.persona?.[0]?.errorConstancia).toEqual({
        error: "Parcial",
        codigo: 456,
      });
    });

    it("should set errorConstancia to undefined when absent", async () => {
      mockSoapClient.getPersonaList_v2Async.mockResolvedValue([
        {
          personaListReturn: {
            persona: [
              {
                datosGenerales: {
                  idPersona: REPOSITORY_TEST_IDENTIFIER,
                  tipoPersona: "FISICA",
                  estadoClave: "ACTIVO",
                },
              },
            ],
          },
        },
      ] as never);

      const result = await repository.getTaxpayersDetails([
        REPOSITORY_TEST_IDENTIFIER,
      ]);

      expect(result.persona?.[0]?.errorConstancia).toBeUndefined();
    });
  });
});
