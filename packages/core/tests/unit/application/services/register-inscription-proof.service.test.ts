import { RegisterInscriptionProofService } from "@arcasdk/core/src/application/services/register-inscription-proof.service";
import { IRegisterInscriptionProofRepositoryPort } from "@arcasdk/core/src/application/ports/register/register-repository.ports";
import {
  dummyAsyncReturnMocks,
  getPersonaList_v2AsyncReturnMocks,
  getPersona_v2AsyncReturnMocks,
} from "../../../mocks/data/soapClient.mock";
import {
  RegisterServerStatusDto,
  TaxpayerDetailsDto,
  TaxpayersDetailsDto,
} from "@arcasdk/core/src/application/dto/register.dto";

describe("Register Inscription Proof Service", () => {
  let registerInscriptionProofService: RegisterInscriptionProofService;
  let mockRepository: jest.Mocked<IRegisterInscriptionProofRepositoryPort>;
  const cuitPayload = 20111111111;

  beforeEach(() => {
    // Create mock repository
    mockRepository = {
      getServerStatus: jest.fn(),
      getTaxpayerDetails: jest.fn(),
      getTaxpayersDetails: jest.fn(),
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
    expect(mockRepository.getServerStatus).toHaveBeenCalled();
  });

  it("should get taxpayer details", async () => {
    const details = await registerInscriptionProofService.getTaxpayerDetails(
      cuitPayload
    );
    expect(details).not.toBeNull();
    expect(details?.datosGenerales).toBeDefined();
    expect(mockRepository.getTaxpayerDetails).toHaveBeenCalledWith(cuitPayload);
  });

  it("should get taxpayers details", async () => {
    const details = await registerInscriptionProofService.getTaxpayersDetails([
      cuitPayload,
      cuitPayload,
    ]);
    expect(details).not.toBeNull();
    expect(details.persona).toBeDefined();
    expect(mockRepository.getTaxpayersDetails).toHaveBeenCalledWith([
      cuitPayload,
      cuitPayload,
    ]);
  });
});
