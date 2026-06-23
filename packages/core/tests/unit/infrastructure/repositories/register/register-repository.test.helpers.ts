import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/types/soap-repository.types";

export const REPOSITORY_TEST_CUIT = 12345678901;
export const REPOSITORY_TEST_IDENTIFIER = 20111111112;

export function createRepositoryConfig(): BaseSoapRepositoryConstructorConfig {
  const mockAuthRepository = {
    login: jest.fn().mockResolvedValue({ token: "token", sign: "sign" }),
    getAuthParams: jest.fn().mockReturnValue({
      Auth: { Token: "token", Sign: "sign", Cuit: REPOSITORY_TEST_CUIT },
    }),
  };

  return {
    authRepository: mockAuthRepository as never,
    cuit: REPOSITORY_TEST_CUIT,
  };
}

export function createServerStatusResponse() {
  return {
    return: {
      appserver: "OK",
      dbserver: "OK",
      authserver: "OK",
    },
  };
}

export function createTaxpayerPersonaResponse() {
  return {
    personaReturn: {
      persona: {
        idPersona: REPOSITORY_TEST_IDENTIFIER,
        tipoPersona: "FISICA",
        estadoClave: "ACTIVO",
      },
    },
  };
}

export function createTaxpayerNotFoundResponse() {
  return {
    personaReturn: {
      errorConstancia: {
        error: "No existe",
        codigo: 602,
      },
    },
  };
}

export function expectedTaxpayerDetails() {
  return {
    idPersona: REPOSITORY_TEST_IDENTIFIER,
    tipoPersona: "FISICA",
    estadoClave: "ACTIVO",
    datosGenerales: {
      idPersona: REPOSITORY_TEST_IDENTIFIER,
      tipoPersona: "FISICA",
      estadoClave: "ACTIVO",
    },
    datosMonotributo: undefined,
    datosRegimenGeneral: undefined,
    errorConstancia: undefined,
  };
}
