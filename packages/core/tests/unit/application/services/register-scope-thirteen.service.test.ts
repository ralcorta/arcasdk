import { RegisterScopeThirteenService } from "@arcasdk/core/src/application/services/register-scope-thirteen.service";
import { IRegisterScopeThirteenRepositoryPort } from "@arcasdk/core/src/application/ports/register/register-repository.ports";
import {
  scopeThirteenDummyAsyncReturnMocks,
  scopeThirteenGetPersonaAsyncReturnMocks,
  getTaxIDByDocumentAsyncReturnMocks,
} from "../../../mocks/data/soapClient.mock";
import {
  RegisterServerStatusDto,
  TaxIDByDocumentResultDto,
  TaxpayerDetailsDto,
} from "@arcasdk/core/src/application/dto/register.dto";

describe("Register Scope Thirteen Service", () => {
  let registerScopeThirteenService: RegisterScopeThirteenService;
  let mockRepository: jest.Mocked<IRegisterScopeThirteenRepositoryPort>;
  const cuitPayload = 20111111111;

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
    const serverStatus: RegisterServerStatusDto = {
      appserver: scopeThirteenDummyAsyncReturnMocks[0].return.appserver,
      dbserver: scopeThirteenDummyAsyncReturnMocks[0].return.dbserver,
      authserver: scopeThirteenDummyAsyncReturnMocks[0].return.authserver,
    };
    mockRepository.getServerStatus.mockResolvedValue(serverStatus);

    const taxpayerDetails: TaxpayerDetailsDto = {
      ...(scopeThirteenGetPersonaAsyncReturnMocks[0]
        .personaReturn as never as TaxpayerDetailsDto),
      datosGenerales: {},
      datosMonotributo: {},
      datosRegimenGeneral: {},
    };
    mockRepository.getTaxpayerDetails.mockResolvedValue(taxpayerDetails);

    const taxIDByDocument: TaxIDByDocumentResultDto = {
      taxID: getTaxIDByDocumentAsyncReturnMocks[0].return.taxID,
    };
    mockRepository.getTaxIDByDocument.mockResolvedValue(taxIDByDocument);
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
    expect(mockRepository.getServerStatus).toHaveBeenCalled();
  });

  it("should get taxpayer details", async () => {
    const details =
      await registerScopeThirteenService.getTaxpayerDetails(cuitPayload);
    expect(details).not.toBeNull();
    expect(details?.datosGenerales).toBeDefined();
    expect(mockRepository.getTaxpayerDetails).toHaveBeenCalledWith(cuitPayload);
  });

  it("should get tax ID by document", async () => {
    const documentNumber = "20111111111";
    const result =
      await registerScopeThirteenService.getTaxIDByDocument(documentNumber);
    expect(result).not.toBeNull();
    expect(result.taxID).toEqual(
      getTaxIDByDocumentAsyncReturnMocks[0].return.taxID,
    );
    expect(mockRepository.getTaxIDByDocument).toHaveBeenCalledWith(
      documentNumber,
    );
  });
});
