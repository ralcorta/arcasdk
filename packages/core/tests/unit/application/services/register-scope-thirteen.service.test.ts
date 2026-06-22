import { RegisterScopeThirteenService } from "@application/services/register-scope-thirteen.service";
import { IRegisterScopeThirteenRepositoryPort } from "@application/ports/register/register-repository.ports";
import {
  scopeThirteenDummyAsyncReturnMocks,
  scopeThirteenGetPersonaAsyncReturnMocks,
} from "../../../mocks/data/soapClient.mock";
import {
  TaxIDByDocumentResultDto,
  TaxpayerDetailsDto,
} from "@application/dto/register";
import {
  mapServerStatus,
  REGISTER_TEST_CUIT,
  withNormalizedTaxpayerDetails,
} from "./register-service.test.helpers";

describe("Register Scope Thirteen Service", () => {
  let registerScopeThirteenService: RegisterScopeThirteenService;
  let mockRepository: jest.Mocked<IRegisterScopeThirteenRepositoryPort>;

  beforeEach(() => {
    // Create mock repository
    mockRepository = {
      getServerStatus: jest.fn(),
      getTaxpayerDetails: jest.fn(),
      getTaxIDByDocument: jest.fn(),
    } as jest.Mocked<IRegisterScopeThirteenRepositoryPort>;

    // Create service with mocked repository
    registerScopeThirteenService = new RegisterScopeThirteenService(
      mockRepository,
    );

    // Setup default mock responses
    const serverStatus = mapServerStatus(scopeThirteenDummyAsyncReturnMocks[0]);
    mockRepository.getServerStatus.mockResolvedValue(serverStatus);

    const taxpayerDetails = withNormalizedTaxpayerDetails(
      scopeThirteenGetPersonaAsyncReturnMocks[0]
        .personaReturn as never as TaxpayerDetailsDto,
    );
    mockRepository.getTaxpayerDetails.mockResolvedValue(taxpayerDetails);

    const taxIDByDocument: TaxIDByDocumentResultDto = {
      idPersona: [20111111111],
    };
    mockRepository.getTaxIDByDocument.mockResolvedValue(taxIDByDocument);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get server status", async () => {
    const status = await registerScopeThirteenService.getServerStatus();
    expect(status).toEqual(
      mapServerStatus(scopeThirteenDummyAsyncReturnMocks[0]),
    );
    expect(mockRepository.getServerStatus).toHaveBeenCalled();
  });

  it("should get taxpayer details", async () => {
    const details =
      await registerScopeThirteenService.getTaxpayerDetails(REGISTER_TEST_CUIT);
    expect(details).not.toBeNull();
    expect(details?.datosGenerales).toBeDefined();
    expect(mockRepository.getTaxpayerDetails).toHaveBeenCalledWith(
      REGISTER_TEST_CUIT,
    );
  });

  it("should get tax ID by document", async () => {
    const documentNumber = "20111111111";
    const result =
      await registerScopeThirteenService.getTaxIDByDocument(documentNumber);
    expect(result).not.toBeNull();
    expect(result.idPersona).toEqual([20111111111]);
    expect(mockRepository.getTaxIDByDocument).toHaveBeenCalledWith(
      documentNumber,
    );
  });
});
