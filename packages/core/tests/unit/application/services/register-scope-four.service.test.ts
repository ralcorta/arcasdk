import { testCuit } from "../../../mocks/data/voucher.mock";
import { RegisterScopeFourService } from "@application/services/register-scope-four.service";
import {
  IRegisterRepositoryPort,
  RegisterScope,
} from "@application/ports/register/register-repository.port";
import {
  scopeFourDummyAsyncReturnMocks,
  scopeFourGetPersonaAsyncReturnMocks,
} from "../../../mocks/data/soapClient.mock";
import {
  RegisterServerStatusDto,
  TaxpayerDetailsDto,
} from "@application/dto/register.dto";

describe("Register Scope Four Service", () => {
  let registerScopeFourService: RegisterScopeFourService;
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
    registerScopeFourService = new RegisterScopeFourService(mockRepository);

    // Setup default mock responses
    const serverStatus: RegisterServerStatusDto = {
      appserver: scopeFourDummyAsyncReturnMocks[0].return.appserver,
      dbserver: scopeFourDummyAsyncReturnMocks[0].return.dbserver,
      authserver: scopeFourDummyAsyncReturnMocks[0].return.authserver,
    };
    mockRepository.getServerStatus.mockResolvedValue(serverStatus);

    const taxpayerDetails: TaxpayerDetailsDto =
      scopeFourGetPersonaAsyncReturnMocks[0].personaReturn as any;
    mockRepository.getTaxpayerDetails.mockResolvedValue(taxpayerDetails);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get server status", async () => {
    const status = await registerScopeFourService.getServerStatus();
    expect(status).toEqual({
      appserver: scopeFourDummyAsyncReturnMocks[0].return.appserver,
      dbserver: scopeFourDummyAsyncReturnMocks[0].return.dbserver,
      authserver: scopeFourDummyAsyncReturnMocks[0].return.authserver,
    });
    expect(mockRepository.getServerStatus).toHaveBeenCalledWith(
      RegisterScope.FOUR
    );
  });

  it("should get taxpayer details", async () => {
    const details = await registerScopeFourService.getTaxpayerDetails(
      cuitPayload
    );
    expect(details).not.toBeNull();
    expect(details?.persona).toBeDefined();
    expect(mockRepository.getTaxpayerDetails).toHaveBeenCalledWith(
      RegisterScope.FOUR,
      cuitPayload
    );
  });
});
