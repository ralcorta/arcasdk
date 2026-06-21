import { RegisterInscriptionProofService } from "@arcasdk/core/src/application/services/register-inscription-proof.service";
import { IRegisterInscriptionProofRepositoryPort } from "@arcasdk/core/src/application/ports/register/register-repository.ports";
import {
  dummyAsyncReturnMocks,
  getPersona_v2AsyncReturnMocks,
  getPersonaList_v2AsyncReturnMocks,
} from "../../../mocks/data/soapClient.mock";
import { TaxpayerDetailsDto } from "@application/dto/register";
import {
  mapServerStatus,
  mapTaxpayersDetails,
  REGISTER_TEST_CUIT,
  REGISTER_TEST_CUITS,
} from "./register-service.test.helpers";

describe("Register Inscription Proof Service", () => {
  let registerInscriptionProofService: RegisterInscriptionProofService;
  let mockRepository: jest.Mocked<IRegisterInscriptionProofRepositoryPort>;

  beforeEach(() => {
    // Create mock repository
    mockRepository = {
      getServerStatus: jest.fn(),
      getTaxpayerDetails: jest.fn(),
      getTaxpayersDetails: jest.fn(),
    } as jest.Mocked<IRegisterInscriptionProofRepositoryPort>;

    // Create service with mocked repository
    registerInscriptionProofService = new RegisterInscriptionProofService(
      mockRepository,
    );

    // Setup default mock responses
    const serverStatus = mapServerStatus(dummyAsyncReturnMocks[0]);
    mockRepository.getServerStatus.mockResolvedValue(serverStatus);

    const taxpayerDetails: TaxpayerDetailsDto = getPersona_v2AsyncReturnMocks[0]
      .personaReturn as never as TaxpayerDetailsDto;
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
    const status = await registerInscriptionProofService.getServerStatus();
    expect(status).toEqual(mapServerStatus(dummyAsyncReturnMocks[0]));
    expect(mockRepository.getServerStatus).toHaveBeenCalled();
  });

  it("should get taxpayer details", async () => {
    const details =
      await registerInscriptionProofService.getTaxpayerDetails(
        REGISTER_TEST_CUIT,
      );
    expect(details).not.toBeNull();
    expect(details).toBeDefined();
    expect(mockRepository.getTaxpayerDetails).toHaveBeenCalledWith(
      REGISTER_TEST_CUIT,
    );
  });

  it("should get taxpayers details", async () => {
    const details =
      await registerInscriptionProofService.getTaxpayersDetails(
        REGISTER_TEST_CUITS,
      );
    expect(details).not.toBeNull();
    expect(details.persona).toBeDefined();
    expect(mockRepository.getTaxpayersDetails).toHaveBeenCalledWith(
      REGISTER_TEST_CUITS,
    );
  });
});
