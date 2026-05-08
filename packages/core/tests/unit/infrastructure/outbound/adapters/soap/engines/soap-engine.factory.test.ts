// We mock `soap` to avoid pulling the real implementation into this unit test.
const mockHttpClientRequest = jest.fn();
jest.mock("soap", () => ({
  HttpClient: jest.fn().mockImplementation(() => ({
    request: mockHttpClientRequest,
  })),
}));

const mockCreateLegacyHttpsAgent = jest.fn().mockResolvedValue({ id: "legacy-agent" });
jest.mock(
  "@arcasdk/core/src/infrastructure/outbound/adapters/soap/engines/node-security.engine",
  () => ({
    createLegacyHttpsAgent: mockCreateLegacyHttpsAgent,
  }),
);

import { createSoapEngine } from "@arcasdk/core/src/infrastructure/outbound/adapters/soap/engines/soap-engine.factory";
import { FetchHttpClient } from "@arcasdk/core/src/infrastructure/outbound/adapters/soap/engines/universal-transport.engine";
import { SoapRuntime } from "@arcasdk/core/src/infrastructure/utils/soap-runtime";

type RequestCapable = {
  request: (
    rurl: string,
    data: string,
    callback: jest.Mock,
    exheaders: Record<string, unknown>,
    exoptions: Record<string, unknown>,
  ) => unknown;
};

describe("createSoapEngine", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create node engine when runtime=node", async () => {
    const engine = await createSoapEngine({
      runtime: SoapRuntime.Node,
      useHttpsAgent: false,
      requestOptions: {},
    });

    expect(engine).toBeTruthy();
    expect(typeof (engine as RequestCapable).request).toBe("function");
  });

  it("should create universal engine when runtime=universal", async () => {
    const engine = await createSoapEngine({ runtime: SoapRuntime.Universal });
    expect(engine).toBeInstanceOf(FetchHttpClient);
  });

  it("should inject legacy httpsAgent in node runtime when enabled", async () => {
    const engine = await createSoapEngine({
      runtime: SoapRuntime.Node,
      useHttpsAgent: true,
    });

    const cb = jest.fn();
    (engine as RequestCapable).request(
      "https://example.test/ws",
      "<xml/>",
      cb,
      {},
      {},
    );

    expect(mockCreateLegacyHttpsAgent).toHaveBeenCalled();
    expect(mockHttpClientRequest).toHaveBeenCalledWith(
      "https://example.test/ws",
      "<xml/>",
      cb,
      {},
      expect.objectContaining({
        httpsAgent: { id: "legacy-agent" },
      }),
    );
  });

  it("should not override existing httpsAgent when provided in exoptions", async () => {
    const engine = await createSoapEngine({
      runtime: SoapRuntime.Node,
      useHttpsAgent: true,
    });

    const cb = jest.fn();
    const customAgent = { id: "custom-agent" };
    (engine as RequestCapable).request(
      "https://example.test/ws",
      "<xml/>",
      cb,
      {},
      { httpsAgent: customAgent },
    );

    expect(mockHttpClientRequest).toHaveBeenCalledWith(
      "https://example.test/ws",
      "<xml/>",
      cb,
      {},
      expect.objectContaining({
        httpsAgent: customAgent,
      }),
    );
  });
});

