import { RegisterScopeFourService } from "@arcasdk/core/src/application/services/register-scope-four.service";
import { IRegisterScopeFourRepositoryPort } from "@arcasdk/core/src/application/ports/register/register-repository.ports";
import {
  scopeFourDummyAsyncReturnMocks,
  scopeFourGetPersonaAsyncReturnMocks,
} from "../../../mocks/data/soapClient.mock";
import {
  RegisterServerStatusDto,
  TaxpayerDetailsDto,
} from "@arcasdk/core/src/application/dto/register.dto";

describe("Register Scope Four Service", () => {
  let registerScopeFourService: RegisterScopeFourService;
  let mockRepository: jest.Mocked<IRegisterScopeFourRepositoryPort>;
  const cuitPayload = 20111111111;

  beforeEach(() => {
    // Create mock repository
    mockRepository = {
      getServerStatus: jest.fn(),
      getTaxpayerDetails: jest.fn(),
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
    expect(mockRepository.getServerStatus).toHaveBeenCalled();
  });

  it("should get taxpayer details", async () => {
    const details = await registerScopeFourService.getTaxpayerDetails(
      cuitPayload
    );
    expect(details).not.toBeNull();
    // expect(details?.persona).toBeDefined(); // The service returns the DTO directly now, not wrapped in 'persona' property unless DTO changed.
    // Wait, the service returns TaxpayerDetailsDto | null.
    // The previous service returned RegisterTaxpayerDetailsResultDto which had a 'persona' property.
    // The new service returns TaxpayerDetailsDto directly.
    // So details IS the persona object (or similar).
    expect(details).toBeDefined();
    expect(mockRepository.getTaxpayerDetails).toHaveBeenCalledWith(cuitPayload);
  });
});
