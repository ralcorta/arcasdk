import { WsfecredRepository } from "@infrastructure/outbound/adapters/fecred/fecred-repository";
import { SoapClientFacade } from "@infrastructure/outbound/adapters/soap/soap-client-facade";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/outbound/ports/soap/soap-repository.types";

jest.mock("@infrastructure/outbound/adapters/soap/soap-client-facade");

describe("WsfecredRepository", () => {
  let repository: WsfecredRepository;
  let mockSoapClient: any;
  let mockConfig: BaseSoapRepositoryConstructorConfig;

  beforeEach(() => {
    mockSoapClient = {
      dummyAsync: jest.fn(),
      consultarComprobantesAsync: jest.fn(),
      describe: jest.fn().mockReturnValue({}),
    };

    (SoapClientFacade.create as jest.Mock).mockResolvedValue(mockSoapClient);

    mockConfig = {
      authRepository: {
        login: jest.fn().mockResolvedValue({}),
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
      } as any,
      useSoap12: false,
    } as any;

    repository = new WsfecredRepository(mockConfig);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return server status", async () => {
    mockSoapClient.dummyAsync.mockResolvedValue([
      {
        dummyReturn: {
          appserver: "OK",
          dbserver: "OK",
          authserver: "OK",
        },
      },
    ]);

    const result = await repository.getServerStatus();

    expect(result).toEqual({
      appserver: "OK",
      dbserver: "OK",
      authserver: "OK",
    });
  });

  it("should inject authRequest for consultarComprobantes", async () => {
    mockSoapClient.consultarComprobantesAsync.mockResolvedValue([
      {
        consultarCmpReturn: {},
      },
    ]);

    await repository.consultarComprobantes({
      rolCUITRepresentada: "COMPRADOR",
      nroPagina: 1,
    });

    expect(mockSoapClient.consultarComprobantesAsync).toHaveBeenCalledWith({
      authRequest: {
        token: "token",
        sign: "sign",
        cuitRepresentada: 12345678901,
      },
      rolCUITRepresentada: "COMPRADOR",
      nroPagina: 1,
    });
  });
});
