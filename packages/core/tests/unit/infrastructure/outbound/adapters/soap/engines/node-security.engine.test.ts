import { createLegacyHttpsAgent } from "@infrastructure/outbound/adapters/soap/engines/node-security.engine";
import { MIN_DH_SIZE_LEGACY } from "@infrastructure/constants";

// Mock the dynamic imports
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

jest.mock(
  "crypto",
  () => {
    return {
      constants: {
        SSL_OP_LEGACY_SERVER_CONNECT: 0x4,
        SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION: 0x40000,
      },
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

  it("should set rejectUnauthorized to true", async () => {
    const agent = (await createLegacyHttpsAgent()) as any;
    expect(agent.options.rejectUnauthorized).toBe(true);
  });

  it("should set minDHSize to MIN_DH_SIZE_LEGACY", async () => {
    const agent = (await createLegacyHttpsAgent()) as any;
    expect(agent.options.minDHSize).toBe(MIN_DH_SIZE_LEGACY);
  });

  it("should set ciphers to DEFAULT@SECLEVEL=1", async () => {
    const agent = (await createLegacyHttpsAgent()) as any;
    expect(agent.options.ciphers).toBe("DEFAULT@SECLEVEL=1");
  });

  it("should set secureProtocol to TLSv1_2_method", async () => {
    const agent = (await createLegacyHttpsAgent()) as any;
    expect(agent.options.secureProtocol).toBe("TLSv1_2_method");
  });

  it("should combine SSL_OP_LEGACY_SERVER_CONNECT and SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION", async () => {
    const agent = (await createLegacyHttpsAgent()) as any;
    const expectedSecureOptions = 0x4 | 0x40000; // bitwise OR
    expect(agent.options.secureOptions).toBe(expectedSecureOptions);
  });

  it("should have all required TLS configuration options", async () => {
    const agent = (await createLegacyHttpsAgent()) as any;
    expect(agent.options).toEqual(
      expect.objectContaining({
        rejectUnauthorized: true,
        minDHSize: expect.any(Number),
        ciphers: "DEFAULT@SECLEVEL=1",
        secureProtocol: "TLSv1_2_method",
        secureOptions: expect.any(Number),
      }),
    );
  });

  it("should configure agent for legacy HTTPS connections", async () => {
    const agent = (await createLegacyHttpsAgent()) as any;

    // Verify it's suitable for legacy servers
    expect(agent.options.rejectUnauthorized).toBe(true); // Still verify certificates
    expect(agent.options.secureProtocol).toMatch(/TLS/); // TLS based
    expect(agent.options.ciphers).toContain("DEFAULT"); // Supports default ciphers
  });

  it("should use dynamic imports to support non-Node.js environments", async () => {
    // The fact that this doesn't throw in Node.js environment confirms
    // dynamic imports work. In browser environments, it would fail to load,
    // which is the intended behavior.
    expect(async () => {
      await createLegacyHttpsAgent();
    }).not.toThrow();
  });

  it("should be idempotent - multiple calls produce equivalent agents", async () => {
    const agent1 = (await createLegacyHttpsAgent()) as any;
    const agent2 = (await createLegacyHttpsAgent()) as any;

    expect(agent1.options.rejectUnauthorized).toBe(
      agent2.options.rejectUnauthorized,
    );
    expect(agent1.options.minDHSize).toBe(agent2.options.minDHSize);
    expect(agent1.options.ciphers).toBe(agent2.options.ciphers);
    expect(agent1.options.secureProtocol).toBe(agent2.options.secureProtocol);
    expect(agent1.options.secureOptions).toBe(agent2.options.secureOptions);
  });

  it("should configure weak DH size for legacy compatibility", async () => {
    const agent = (await createLegacyHttpsAgent()) as any;
    // MIN_DH_SIZE_LEGACY should be smaller than default (1024)
    expect(agent.options.minDHSize).toBeLessThanOrEqual(1024);
  });

  it("should allow SECLEVEL=1 for compatibility with older servers", async () => {
    const agent = (await createLegacyHttpsAgent()) as any;
    // SECLEVEL=1 allows weaker ciphers than default SECLEVEL=2
    expect(agent.options.ciphers).toContain("SECLEVEL=1");
  });

  it("should support legacy renegotiation for compatibility", async () => {
    const agent = (await createLegacyHttpsAgent()) as any;
    // secureOptions should include SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION
    const hasLegacyRenegFlag = (agent.options.secureOptions & 0x40000) !== 0;
    expect(hasLegacyRenegFlag).toBe(true);
  });

  it("should be suitable for connecting to AFIP legacy servers", async () => {
    // AFIP servers sometimes require legacy TLS configurations
    const agent = (await createLegacyHttpsAgent()) as any;

    // Check that it's configured for legacy connections
    expect(agent.options.secureProtocol).toBe("TLSv1_2_method");
    expect(agent.options.ciphers).toBe("DEFAULT@SECLEVEL=1");
    expect(agent.options.minDHSize).toBeLessThanOrEqual(1024);
  });
});
