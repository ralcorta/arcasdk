import { testCuit } from "../../mocks/data/voucher.mock";
import { RegisterScopeTenService } from "@application/services/register-scope-ten.service";
import {
  IRegisterRepositoryPort,
  RegisterScope,
} from "@application/ports/register/register-repository.port";
import {
  scopeTenDummyAsyncReturnMocks,
  scopeTenGetPersonaAsyncReturnMocks,
} from "../../mocks/data/soapClient.mock";
import {
  RegisterServerStatusDto,
  TaxpayerDetailsDto,
} from "@application/dto/register.dto";

describe("Register Scope Ten Service", () => {
  let registerScopeTenService: RegisterScopeTenService;
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
    registerScopeTenService = new RegisterScopeTenService(mockRepository);

    // Setup default mock responses
    const serverStatus: RegisterServerStatusDto = {
      appserver: scopeTenDummyAsyncReturnMocks[0].return.appserver,
      dbserver: scopeTenDummyAsyncReturnMocks[0].return.dbserver,
      authserver: scopeTenDummyAsyncReturnMocks[0].return.authserver,
    };
    mockRepository.getServerStatus.mockResolvedValue(serverStatus);

    const taxpayerDetails: TaxpayerDetailsDto =
      scopeTenGetPersonaAsyncReturnMocks[0].personaReturn as any;
    mockRepository.getTaxpayerDetails.mockResolvedValue(taxpayerDetails);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get server status", async () => {
    const status = await registerScopeTenService.getServerStatus();
    expect(status).toEqual({
      appserver: scopeTenDummyAsyncReturnMocks[0].return.appserver,
      dbserver: scopeTenDummyAsyncReturnMocks[0].return.dbserver,
      authserver: scopeTenDummyAsyncReturnMocks[0].return.authserver,
    });
    expect(mockRepository.getServerStatus).toHaveBeenCalledWith(
      RegisterScope.TEN
    );
  });

  it("should get taxpayer details", async () => {
    const details = await registerScopeTenService.getTaxpayerDetails(
      cuitPayload
    );
    expect(details).not.toBeNull();
    expect(details?.persona).toBeDefined();
    expect(mockRepository.getTaxpayerDetails).toHaveBeenCalledWith(
      RegisterScope.TEN,
      cuitPayload
    );
  });
});
