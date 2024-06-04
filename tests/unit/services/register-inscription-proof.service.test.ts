import { testCuit } from "../../mocks/data/voucher.mock";
import { Afip } from "../../../src/afip";
import { TestConfigUtils } from "../../utils/config.utils";
import {
  dummyAsyncReturnMocks,
  getPersonaList_v2AsyncReturnMocks,
  getPersona_v2AsyncReturnMocks,
} from "../../mocks/data/soapClient.mock";
import { mockLoginCredentials } from "../../mocks/data/credential-json.mock";
import { RegisterInscriptionProofService } from "../../../src/services/register-inscription-proof.service";

describe("Register Inscription Proof Service", () => {
  const originalNodeTlsRejectUnauthStatus =
    process.env.NODE_TLS_REJECT_UNAUTHORIZED;
  let registerInscriptionProofService: RegisterInscriptionProofService;
  const cuitPayload = 20111111111;

  beforeAll(() => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  });

  afterAll(() => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED =
      originalNodeTlsRejectUnauthStatus;
  });

  beforeEach(async () => {
    registerInscriptionProofService = new Afip({
      key: await TestConfigUtils.getKey(),
      cert: await TestConfigUtils.getCert(),
      cuit: testCuit,
    }).registerInscriptionProofService;

    registerInscriptionProofService.getWsAuth = jest.fn().mockReturnValue({
      Auth: {
        Token: mockLoginCredentials.credentials.token,
        Sign: mockLoginCredentials.credentials.sign,
        Cuit: testCuit,
      },
    });

    const afipMockParams = {
      dummyAsync: jest.fn().mockResolvedValue(dummyAsyncReturnMocks),
      getPersona_v2Async: jest
        .fn()
        .mockResolvedValue(getPersona_v2AsyncReturnMocks),
      getPersonaList_v2Async: jest
        .fn()
        .mockResolvedValue(getPersonaList_v2AsyncReturnMocks),
    } as any;

    jest
      .spyOn(registerInscriptionProofService, "getClient")
      .mockReturnValue(afipMockParams);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get server status", async () => {
    const status = await registerInscriptionProofService.getServerStatus();
    expect(status).toEqual(dummyAsyncReturnMocks[0]);
  });

  it("should get taxpayer details", async () => {
    const details = await registerInscriptionProofService.getTaxpayerDetails(
      cuitPayload
    );
    expect(details).toStrictEqual(
      getPersona_v2AsyncReturnMocks[0].personaReturn
    );
  });

  it("should get taxpayers details", async () => {
    const details = await registerInscriptionProofService.getTaxpayersDetails([
      cuitPayload,
      cuitPayload,
    ]);
    expect(details).toStrictEqual(
      getPersonaList_v2AsyncReturnMocks[0].personaListReturn
    );
  });
});
