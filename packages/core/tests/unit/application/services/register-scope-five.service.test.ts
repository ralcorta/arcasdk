import { RegisterScopeFiveService } from "@application/services/register-scope-five.service";
import { IRegisterScopeFiveRepositoryPort } from "@application/ports/register/register-repository.ports";
import {
  dummyAsyncReturnMocks,
  getPersonaList_v2AsyncReturnMocks,
  getPersona_v2AsyncReturnMocks,
} from "../../../mocks/data/soapClient.mock";
import { TaxpayerDetailsDto } from "@application/dto/register";
import {
  mapServerStatus,
  mapTaxpayersDetails,
  REGISTER_TEST_CUIT,
  REGISTER_TEST_CUITS,
  withNormalizedTaxpayerDetails,
} from "./register-service.test.helpers";

describe("Register Scope Five Service", () => {
  let registerScopeFiveService: RegisterScopeFiveService;
  let mockRepository: jest.Mocked<IRegisterScopeFiveRepositoryPort>;

  beforeEach(() => {
    // Create mock repository
    mockRepository = {
      getServerStatus: jest.fn(),
      getTaxpayerDetails: jest.fn(),
      getTaxpayersDetails: jest.fn(),
    } as jest.Mocked<IRegisterScopeFiveRepositoryPort>;

    // Create service with mocked repository
    registerScopeFiveService = new RegisterScopeFiveService(mockRepository);

    // Setup default mock responses
    const serverStatus = mapServerStatus(dummyAsyncReturnMocks[0]);
    mockRepository.getServerStatus.mockResolvedValue(serverStatus);

    const taxpayerDetails = withNormalizedTaxpayerDetails(
      getPersona_v2AsyncReturnMocks[0]
        .personaReturn as never as TaxpayerDetailsDto,
    );
    mockRepository.getTaxpayerDetails.mockResolvedValue(taxpayerDetails);

    const taxpayersDetails = mapTaxpayersDetails(
      getPersonaList_v2AsyncReturnMocks[0].personaListReturn.persona as never,
    );
    mockRepository.getTaxpayersDetails.mockResolvedValue(taxpayersDetails);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get server status", async () => {
    const status = await registerScopeFiveService.getServerStatus();
    expect(status).toEqual(mapServerStatus(dummyAsyncReturnMocks[0]));
    expect(mockRepository.getServerStatus).toHaveBeenCalled();
  });

  it("should get taxpayer details", async () => {
    const details =
      await registerScopeFiveService.getTaxpayerDetails(REGISTER_TEST_CUIT);
    expect(details).not.toBeNull();
    expect(details?.datosGenerales).toBeDefined();
    expect(mockRepository.getTaxpayerDetails).toHaveBeenCalledWith(
      REGISTER_TEST_CUIT,
    );
  });

  it("should get taxpayers details", async () => {
    const details =
      await registerScopeFiveService.getTaxpayersDetails(REGISTER_TEST_CUITS);
    expect(details).not.toBeNull();
    expect(details.persona).toBeDefined();
    expect(mockRepository.getTaxpayersDetails).toHaveBeenCalledWith(
      REGISTER_TEST_CUITS,
    );
  });
});
