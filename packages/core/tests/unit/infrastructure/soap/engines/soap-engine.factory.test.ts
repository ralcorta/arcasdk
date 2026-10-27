// We mock `soap` to avoid pulling the real implementation into this unit test.
const mockHttpClientRequest = jest.fn();
jest.mock("soap", () => ({
  HttpClient: jest.fn().mockImplementation(() => ({
    request: mockHttpClientRequest,
  })),
}));

const mockCreateLegacyHttpsAgent = jest.fn().mockResolvedValue({ id: "legacy-agent" });
const mockCreateIsolatedHttpsAgent = jest
  .fn()
  .mockResolvedValue({ id: "isolated-agent" });
jest.mock(
  "@infrastructure/soap/engines/node-security.engine",
  () => ({
    createLegacyHttpsAgent: mockCreateLegacyHttpsAgent,
    createIsolatedHttpsAgent: mockCreateIsolatedHttpsAgent,
  }),
);

import { createSoapEngine } from "@infrastructure/soap/engines/soap-engine.factory";
import { FetchHttpClient } from "@infrastructure/soap/engines/universal-transport.engine";
import { SoapRuntime } from "@infrastructure/utils/soap-runtime";

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

  it("should not inject any agent in node runtime by default", async () => {
    const engine = await createSoapEngine({ runtime: SoapRuntime.Node });

    const cb = jest.fn();
    (engine as RequestCapable).request(
      "https://example.test/ws",
      "<xml/>",
      cb,
      {},
      {},
    );

    expect(mockCreateLegacyHttpsAgent).not.toHaveBeenCalled();
    expect(mockCreateIsolatedHttpsAgent).not.toHaveBeenCalled();
    expect(mockHttpClientRequest).toHaveBeenCalledWith(
      "https://example.test/ws",
      "<xml/>",
      cb,
      {},
      {},
    );
  });

  it("should inject an isolated agent in node runtime when keepAlive is false", async () => {
    const engine = await createSoapEngine({
      runtime: SoapRuntime.Node,
      keepAlive: false,
    });

    const cb = jest.fn();
    (engine as RequestCapable).request(
      "https://example.test/ws",
      "<xml/>",
      cb,
      {},
      {},
    );

    expect(mockCreateIsolatedHttpsAgent).toHaveBeenCalled();
    expect(mockCreateLegacyHttpsAgent).not.toHaveBeenCalled();
    expect(mockHttpClientRequest).toHaveBeenCalledWith(
      "https://example.test/ws",
      "<xml/>",
      cb,
      {},
      expect.objectContaining({
        httpsAgent: { id: "isolated-agent" },
      }),
    );
  });

  it("should keep the legacy agent when useHttpsAgent is set and keepAlive is false", async () => {
    const engine = await createSoapEngine({
      runtime: SoapRuntime.Node,
      useHttpsAgent: true,
      keepAlive: false,
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
    expect(mockCreateIsolatedHttpsAgent).not.toHaveBeenCalled();
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
});
