import { WsfexRepository } from "@infrastructure/outbound/adapters/fex/fex-repository";
import { SoapClientFacade } from "@infrastructure/outbound/adapters/soap/soap-client-facade";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/outbound/ports/soap/soap-repository.types";

jest.mock("@infrastructure/outbound/adapters/soap/soap-client-facade");

describe("WsfexRepository", () => {
  let repository: WsfexRepository;
  let mockSoapClient: any;
  let mockConfig: BaseSoapRepositoryConstructorConfig;

  beforeEach(() => {
    mockSoapClient = {
      FEXDummyAsync: jest.fn(),
      FEXGetLast_CMPAsync: jest.fn(),
      describe: jest.fn().mockReturnValue({
        Service: {
          ServiceSoap: {
            FEXDummy: { input: {} },
            FEXGetLast_CMP: { input: { Auth: {} } },
          },
        },
      }),
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

    repository = new WsfexRepository(mockConfig);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return server status", async () => {
    mockSoapClient.FEXDummyAsync.mockResolvedValue([
      {
        FEXDummyResult: {
          AppServer: "OK",
          DbServer: "OK",
          AuthServer: "OK",
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

  it("should inject auth for getLastCmp", async () => {
    mockSoapClient.FEXGetLast_CMPAsync.mockResolvedValue([
      {
        FEXGetLast_CMPResult: {},
      },
    ]);

    await repository.getLastCmp({ Pto_venta: 1, Cbte_Tipo: 19 });

    expect(mockSoapClient.FEXGetLast_CMPAsync).toHaveBeenCalledWith({
      Auth: {
        Token: "token",
        Sign: "sign",
        Cuit: 12345678901,
        Pto_venta: 1,
        Cbte_Tipo: 19,
      },
    });
  });
});