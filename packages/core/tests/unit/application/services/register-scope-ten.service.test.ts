import { RegisterScopeTenService } from "@application/services/register-scope-ten.service";
import { IRegisterScopeTenRepositoryPort } from "@application/ports/register/register-repository.ports";
import {
  scopeTenDummyAsyncReturnMocks,
  scopeTenGetPersonaAsyncReturnMocks,
} from "../../../mocks/data/soapClient.mock";
import { TaxpayerDetailsDto } from "@application/dto/register";
import {
  mapServerStatus,
  REGISTER_TEST_CUIT,
} from "./register-service.test.helpers";

describe("Register Scope Ten Service", () => {
  let registerScopeTenService: RegisterScopeTenService;
  let mockRepository: jest.Mocked<IRegisterScopeTenRepositoryPort>;

  beforeEach(() => {
    // Create mock repository
    mockRepository = {
      getServerStatus: jest.fn(),
      getTaxpayerDetails: jest.fn(),
    } as jest.Mocked<IRegisterScopeTenRepositoryPort>;

    // Create service with mocked repository
    registerScopeTenService = new RegisterScopeTenService(mockRepository);

    // Setup default mock responses
    const serverStatus = mapServerStatus(scopeTenDummyAsyncReturnMocks[0]);
    mockRepository.getServerStatus.mockResolvedValue(serverStatus);

    const taxpayerDetails: TaxpayerDetailsDto =
      scopeTenGetPersonaAsyncReturnMocks[0]
        .personaReturn as never as TaxpayerDetailsDto;
    mockRepository.getTaxpayerDetails.mockResolvedValue(taxpayerDetails);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get server status", async () => {
    const status = await registerScopeTenService.getServerStatus();
    expect(status).toEqual(mapServerStatus(scopeTenDummyAsyncReturnMocks[0]));
    expect(mockRepository.getServerStatus).toHaveBeenCalled();
  });

  it("should get taxpayer details", async () => {
    const details =
      await registerScopeTenService.getTaxpayerDetails(REGISTER_TEST_CUIT);
    expect(details).not.toBeNull();
    // expect(details?.persona).toBeDefined(); // Service returns DTO directly
    expect(details).toBeDefined();
    expect(mockRepository.getTaxpayerDetails).toHaveBeenCalledWith(
      REGISTER_TEST_CUIT,
    );
  });
});
