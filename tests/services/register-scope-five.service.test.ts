import { testCuit } from "../mocks/data/voucher.mock";
import { Afip } from "../../src/afip";
import { TestConfigUtils } from "../utils/config.utils";
import { dummyAsyncReturnMocks } from "../mocks/data/soapClient.mock";

describe("Register Scope Five Service", () => {
  let afip: Afip;
  const originalNodeTlsRejectUnauthStatus =
    process.env.NODE_TLS_REJECT_UNAUTHORIZED;

  beforeAll(() => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  });

  afterAll(() => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED =
      originalNodeTlsRejectUnauthStatus;
  });

  beforeEach(async () => {
    afip = new Afip({
      key: await TestConfigUtils.getKey(),
      cert: await TestConfigUtils.getCert(),
      cuit: testCuit,
    });

    // const afipMockParams = {
    //   dummyAsync: jest.fn().mockResolvedValue(dummyAsyncReturnMocks),
    // } as any;

    // jest
    //   .spyOn(afip.electronicBillingService, "getClient")
    //   .mockReturnValue(afipMockParams);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get server status", async () => {
    const { registerScopeFiveService } = afip;
    const status = await registerScopeFiveService.getServerStatus();
    expect(status).toEqual(dummyAsyncReturnMocks[0]);
  });

  it("should get taxpayer details", async () => {
    const { registerScopeFiveService } = afip;
    const details = await registerScopeFiveService.getTaxpayerDetails(
      20111111111
    );
    console.dir(details, { depth: 50 });
    expect(details).toBeDefined();
  });
});
