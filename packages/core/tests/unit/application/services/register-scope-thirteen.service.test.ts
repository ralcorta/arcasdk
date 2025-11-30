import { testCuit } from "../../../mocks/data/voucher.mock";
import { RegisterScopeThirteenService } from "@application/services/register-scope-thirteen.service";
import {
  IRegisterRepositoryPort,
  RegisterScope,
} from "@application/ports/register/register-repository.port";
import {
  scopeThirteenDummyAsyncReturnMocks,
  scopeThirteenGetPersonaAsyncReturnMocks,
} from "../../../mocks/data/soapClient.mock";
import {
  RegisterServerStatusDto,
  TaxpayerDetailsDto,
} from "@application/dto/register.dto";

describe("Register Scope Thirteen Service", () => {
  let registerScopeThirteenService: RegisterScopeThirteenService;
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
    registerScopeThirteenService = new RegisterScopeThirteenService(
      mockRepository
    );

    // Setup default mock responses
    const serverStatus: RegisterServerStatusDto = {
      appserver: scopeThirteenDummyAsyncReturnMocks[0].return.appserver,
      dbserver: scopeThirteenDummyAsyncReturnMocks[0].return.dbserver,
      authserver: scopeThirteenDummyAsyncReturnMocks[0].return.authserver,
    };
    mockRepository.getServerStatus.mockResolvedValue(serverStatus);

    const taxpayerDetails: TaxpayerDetailsDto =
      scopeThirteenGetPersonaAsyncReturnMocks[0].personaReturn as any;
    mockRepository.getTaxpayerDetails.mockResolvedValue(taxpayerDetails);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get server status", async () => {
    const status = await registerScopeThirteenService.getServerStatus();
    expect(status).toEqual({
      appserver: scopeThirteenDummyAsyncReturnMocks[0].return.appserver,
      dbserver: scopeThirteenDummyAsyncReturnMocks[0].return.dbserver,
      authserver: scopeThirteenDummyAsyncReturnMocks[0].return.authserver,
    });
    expect(mockRepository.getServerStatus).toHaveBeenCalledWith(
      RegisterScope.THIRTEEN
    );
  });

  it("should get taxpayer details", async () => {
    const details = await registerScopeThirteenService.getTaxpayerDetails(
      cuitPayload
    );
    expect(details).not.toBeNull();
    expect(details?.persona).toBeDefined();
    expect(mockRepository.getTaxpayerDetails).toHaveBeenCalledWith(
      RegisterScope.THIRTEEN,
      cuitPayload
    );
  });
});
