import {
  createLegacyHttpsAgent,
  LEGACY_HTTPS_CIPHERS,
} from "@infrastructure/soap/engines/node-security.engine";

// Mock the dynamic import
jest.mock(
  "https",
  () => {
    return {
      Agent: jest.fn(function (options: any) {
        this.options = options;
        return this;
      }),
    };
  },
  { virtual: true },
);

describe("createLegacyHttpsAgent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an https.Agent instance", async () => {
    const agent = await createLegacyHttpsAgent();
    expect(agent).toBeDefined();
    expect(agent).toHaveProperty("options");
  });

  it("should keep verifying certificates", async () => {
    const agent = (await createLegacyHttpsAgent()) as any;
    expect(agent.options.rejectUnauthorized).toBe(true);
  });

  it("should exclude DHE so servers with a weak DH key negotiate another suite", async () => {
    const agent = (await createLegacyHttpsAgent()) as any;
    expect(agent.options.ciphers).toBe(LEGACY_HTTPS_CIPHERS);
    expect(LEGACY_HTTPS_CIPHERS).toContain("!DHE");
  });

  it("should not lower the OpenSSL security level", async () => {
    const agent = (await createLegacyHttpsAgent()) as any;
    expect(agent.options.ciphers).not.toContain("SECLEVEL");
  });

  it("should not relax the DH size, the protocol or renegotiation", async () => {
    const agent = (await createLegacyHttpsAgent()) as any;
    expect(agent.options).not.toHaveProperty("minDHSize");
    expect(agent.options).not.toHaveProperty("secureProtocol");
    expect(agent.options).not.toHaveProperty("secureOptions");
  });

  it("should use dynamic imports to support non-Node.js environments", async () => {
    // The fact that this doesn't throw in Node.js environment confirms
    // dynamic imports work. In browser environments, it would fail to load,
    // which is the intended behavior.
    await expect(createLegacyHttpsAgent()).resolves.toBeDefined();
  });

  it("should be idempotent - multiple calls produce equivalent agents", async () => {
    const agent1 = (await createLegacyHttpsAgent()) as any;
    const agent2 = (await createLegacyHttpsAgent()) as any;

    expect(agent1.options).toEqual(agent2.options);
  });
});
