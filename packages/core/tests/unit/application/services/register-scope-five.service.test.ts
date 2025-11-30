import { testCuit } from "../../../mocks/data/voucher.mock";
import { RegisterScopeFiveService } from "@application/services/register-scope-five.service";
import {
  IRegisterRepositoryPort,
  RegisterScope,
} from "@application/ports/register/register-repository.port";
import {
  dummyAsyncReturnMocks,
  getPersonaList_v2AsyncReturnMocks,
  getPersona_v2AsyncReturnMocks,
} from "../../../mocks/data/soapClient.mock";
import {
  RegisterServerStatusDto,
  TaxpayerDetailsDto,
  TaxpayersDetailsDto,
} from "@application/dto/register.dto";

describe("Register Scope Five Service", () => {
  let registerScopeFiveService: RegisterScopeFiveService;
  let mockRepository: jest.Mocked<IRegisterRepositoryPort>;
  const cuitPayload = 20111111111;

  beforeEach(() => {
    // Create mock repository
    mockRepository = {
      getServerStatus: jest.fn(),
      getTaxpayerDetails: jest.fn(),
      getTaxpayersDetails: jest.fn(),
      getTaxIDByDocument: jest.fn(),
    } as any;

    // Create service with mocked repository
    registerScopeFiveService = new RegisterScopeFiveService(mockRepository);

    // Setup default mock responses
    const serverStatus: RegisterServerStatusDto = {
      appserver: dummyAsyncReturnMocks[0].return.appserver,
      dbserver: dummyAsyncReturnMocks[0].return.dbserver,
      authserver: dummyAsyncReturnMocks[0].return.authserver,
    };
    mockRepository.getServerStatus.mockResolvedValue(serverStatus);

    const taxpayerDetails: TaxpayerDetailsDto = {
      ...getPersona_v2AsyncReturnMocks[0].personaReturn,
      datosGenerales: {},
      datosMonotributo: {},
      datosRegimenGeneral: {},
    } as any;
    mockRepository.getTaxpayerDetails.mockResolvedValue(taxpayerDetails);

    const taxpayersDetails: TaxpayersDetailsDto = {
      persona: getPersonaList_v2AsyncReturnMocks[0].personaListReturn
        .persona as any,
      cantidadRegistros:
        getPersonaList_v2AsyncReturnMocks[0].personaListReturn.persona
          ?.length || 0,
    };
    mockRepository.getTaxpayersDetails.mockResolvedValue(taxpayersDetails);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get server status", async () => {
    const status = await registerScopeFiveService.getServerStatus();
    expect(status).toEqual({
      appserver: dummyAsyncReturnMocks[0].return.appserver,
      dbserver: dummyAsyncReturnMocks[0].return.dbserver,
      authserver: dummyAsyncReturnMocks[0].return.authserver,
    });
    expect(mockRepository.getServerStatus).toHaveBeenCalledWith(
      RegisterScope.FIVE
    );
  });

  it("should get taxpayer details", async () => {
    const details = await registerScopeFiveService.getTaxpayerDetails(
      cuitPayload
    );
    expect(details).not.toBeNull();
    expect(details?.datosGenerales).toBeDefined();
    expect(mockRepository.getTaxpayerDetails).toHaveBeenCalledWith(
      RegisterScope.FIVE,
      cuitPayload
    );
  });

  it("should get taxpayers details", async () => {
    const details = await registerScopeFiveService.getTaxpayersDetails([
      cuitPayload,
      cuitPayload,
    ]);
    expect(details).not.toBeNull();
    expect(details.persona).toBeDefined();
    expect(mockRepository.getTaxpayersDetails).toHaveBeenCalledWith(
      RegisterScope.FIVE,
      [cuitPayload, cuitPayload]
    );
  });
});
