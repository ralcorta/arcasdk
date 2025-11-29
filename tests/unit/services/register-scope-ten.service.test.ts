import { testCuit } from "../../mocks/data/voucher.mock";
import { Arca } from "../../../src/arca";
import { ContextTest } from "../../utils/context-test.utils";
import { mockLoginCredentials } from "../../mocks/data/credential-json.mock";
import { RegisterScopeTenService } from "../../../src/services/register-scope-ten.service";
import {
  scopeTenDummyAsyncReturnMocks,
  scopeTenGetPersonaAsyncReturnMocks,
} from "../../mocks/data/soapClient.mock";

describe("Register Scope Ten Service", () => {
  const originalNodeTlsRejectUnauthStatus =
    process.env.NODE_TLS_REJECT_UNAUTHORIZED;
  let registerScopeTenService: RegisterScopeTenService;
  const cuitPayload = 20111111111;

  beforeAll(() => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  });

  afterAll(() => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED =
      originalNodeTlsRejectUnauthStatus;
  });

  beforeEach(async () => {
    // Use integration test context which ensures production: false (homologation servers)
    const context = await ContextTest.getIntegrationTestContext({
      cuit: testCuit,
    });

    registerScopeTenService = new Arca(context).registerScopeTenService;

    registerScopeTenService.getWsAuth = jest.fn().mockReturnValue({
      Auth: {
        Token: mockLoginCredentials.credentials.token,
        Sign: mockLoginCredentials.credentials.sign,
        Cuit: testCuit,
      },
    });

    const afipMockParams = {
      dummyAsync: jest.fn().mockResolvedValue(scopeTenDummyAsyncReturnMocks),
      getPersonaAsync: jest
        .fn()
        .mockResolvedValue(scopeTenGetPersonaAsyncReturnMocks),
    } as any;

    jest
      .spyOn(registerScopeTenService, "getClient")
      .mockReturnValue(afipMockParams);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get server status", async () => {
    expect(await registerScopeTenService.getServerStatus()).toEqual(
      scopeTenDummyAsyncReturnMocks[0]
    );
  });

  it("should get taxpayer details", async () => {
    expect(
      await registerScopeTenService.getTaxpayerDetails(cuitPayload)
    ).toStrictEqual(scopeTenGetPersonaAsyncReturnMocks[0].personaReturn);
  });
});
