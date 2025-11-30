import { testCuit } from "../../../mocks/data/voucher.mock";
import { RegisterInscriptionProofService } from "@application/services/register-inscription-proof.service";
import {
  IRegisterRepositoryPort,
  RegisterScope,
} from "@application/ports/register/register-repository.port";
import {
  dummyAsyncReturnMocks,
  getPersonaList_v2AsyncReturnMocks,
  getPersona_v2AsyncReturnMocks,
} from "../../../mocks/data/soapClient.mock";
import {
  RegisterServerStatusDto,
  TaxpayerDetailsDto,
  TaxpayersDetailsDto,
} from "@application/dto/register.dto";

describe("Register Inscription Proof Service", () => {
  let registerInscriptionProofService: RegisterInscriptionProofService;
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
    registerInscriptionProofService = new RegisterInscriptionProofService(
      mockRepository
    );

    // Setup default mock responses
    const serverStatus: RegisterServerStatusDto = {
      appserver: dummyAsyncReturnMocks[0].return.appserver,
      dbserver: dummyAsyncReturnMocks[0].return.dbserver,
      authserver: dummyAsyncReturnMocks[0].return.authserver,
    };
    mockRepository.getServerStatus.mockResolvedValue(serverStatus);

    const taxpayerDetails: TaxpayerDetailsDto = {
      ...getPersona_v2AsyncReturnMocks[0].personaReturn,
      datosGenerales: {},
      datosMonotributo: {},
      datosRegimenGeneral: {},
    } as any;
    mockRepository.getTaxpayerDetails.mockResolvedValue(taxpayerDetails);

    const taxpayersDetails: TaxpayersDetailsDto = {
      persona: getPersonaList_v2AsyncReturnMocks[0].personaListReturn
        .persona as any,
      cantidadRegistros:
        getPersonaList_v2AsyncReturnMocks[0].personaListReturn.persona
          ?.length || 0,
    };
    mockRepository.getTaxpayersDetails.mockResolvedValue(taxpayersDetails);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get server status", async () => {
    const status = await registerInscriptionProofService.getServerStatus();
    expect(status).toEqual({
      appserver: dummyAsyncReturnMocks[0].return.appserver,
      dbserver: dummyAsyncReturnMocks[0].return.dbserver,
      authserver: dummyAsyncReturnMocks[0].return.authserver,
    });
    expect(mockRepository.getServerStatus).toHaveBeenCalledWith(
      RegisterScope.INSCRIPTION_PROOF
    );
  });

  it("should get taxpayer details", async () => {
    const details = await registerInscriptionProofService.getTaxpayerDetails(
      cuitPayload
    );
    expect(details).not.toBeNull();
    expect(details?.datosGenerales).toBeDefined();
    expect(mockRepository.getTaxpayerDetails).toHaveBeenCalledWith(
      RegisterScope.INSCRIPTION_PROOF,
      cuitPayload
    );
  });

  it("should get taxpayers details", async () => {
    const details = await registerInscriptionProofService.getTaxpayersDetails([
      cuitPayload,
      cuitPayload,
    ]);
    expect(details).not.toBeNull();
    expect(details.persona).toBeDefined();
    expect(mockRepository.getTaxpayersDetails).toHaveBeenCalledWith(
      RegisterScope.INSCRIPTION_PROOF,
      [cuitPayload, cuitPayload]
    );
  });
});
