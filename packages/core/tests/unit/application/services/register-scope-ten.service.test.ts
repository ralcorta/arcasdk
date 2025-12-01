import { RegisterScopeTenService } from "@arcasdk/core/src/application/services/register-scope-ten.service";
import { IRegisterScopeTenRepositoryPort } from "@arcasdk/core/src/application/ports/register/register-repository.ports";
import {
  scopeTenDummyAsyncReturnMocks,
  scopeTenGetPersonaAsyncReturnMocks,
} from "../../../mocks/data/soapClient.mock";
import {
  RegisterServerStatusDto,
  TaxpayerDetailsDto,
} from "@arcasdk/core/src/application/dto/register.dto";

describe("Register Scope Ten Service", () => {
  let registerScopeTenService: RegisterScopeTenService;
  let mockRepository: jest.Mocked<IRegisterScopeTenRepositoryPort>;
  const cuitPayload = 20111111111;

  beforeEach(() => {
    // Create mock repository
    mockRepository = {
      getServerStatus: jest.fn(),
      getTaxpayerDetails: jest.fn(),
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
    expect(mockRepository.getServerStatus).toHaveBeenCalled();
  });

  it("should get taxpayer details", async () => {
    const details = await registerScopeTenService.getTaxpayerDetails(
      cuitPayload
    );
    expect(details).not.toBeNull();
    // expect(details?.persona).toBeDefined(); // Service returns DTO directly
    expect(details).toBeDefined();
    expect(mockRepository.getTaxpayerDetails).toHaveBeenCalledWith(cuitPayload);
  });
});
