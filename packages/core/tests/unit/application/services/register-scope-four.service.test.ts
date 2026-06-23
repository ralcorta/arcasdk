import { RegisterScopeFourService } from "@application/services/register-scope-four.service";
import { IRegisterScopeFourRepositoryPort } from "@application/ports/register/register-repository.ports";
import {
  dummyAsyncReturnMocks,
  getPersona_v2AsyncReturnMocks,
} from "../../../mocks/data/soapClient.mock";
import { TaxpayerDetailsDto } from "@application/dto/register";
import {
  mapServerStatus,
  REGISTER_TEST_CUIT,
  withNormalizedTaxpayerDetails,
} from "./register-service.test.helpers";

describe("Register Scope Four Service", () => {
  let registerScopeFourService: RegisterScopeFourService;
  let mockRepository: jest.Mocked<IRegisterScopeFourRepositoryPort>;

  beforeEach(() => {
    // Create mock repository
    mockRepository = {
      getServerStatus: jest.fn(),
      getTaxpayerDetails: jest.fn(),
    } as jest.Mocked<IRegisterScopeFourRepositoryPort>;

    // Create service with mocked repository
    registerScopeFourService = new RegisterScopeFourService(mockRepository);

    // Setup default mock responses
    const serverStatus = mapServerStatus(dummyAsyncReturnMocks[0]);
    mockRepository.getServerStatus.mockResolvedValue(serverStatus);

    const taxpayerDetails = withNormalizedTaxpayerDetails(
      getPersona_v2AsyncReturnMocks[0]
        .personaReturn as never as TaxpayerDetailsDto,
    );
    mockRepository.getTaxpayerDetails.mockResolvedValue(taxpayerDetails);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get server status", async () => {
    const status = await registerScopeFourService.getServerStatus();
    expect(status).toEqual(mapServerStatus(dummyAsyncReturnMocks[0]));
    expect(mockRepository.getServerStatus).toHaveBeenCalled();
  });

  it("should get taxpayer details", async () => {
    const details =
      await registerScopeFourService.getTaxpayerDetails(REGISTER_TEST_CUIT);
    expect(details).not.toBeNull();
    expect(details?.datosGenerales).toBeDefined();
    expect(mockRepository.getTaxpayerDetails).toHaveBeenCalledWith(
      REGISTER_TEST_CUIT,
    );
  });
});
