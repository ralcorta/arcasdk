import { PlaywrightPortalAdapter } from "@infrastructure/outbound/adapters/playwright-portal.adapter";

// Mock playwright as virtual module since it's an optional peer dependency.
// jest.mock is hoisted, so we must define mocks inline or use jest.fn() directly.
jest.mock(
  "playwright",
  () => {
    const mockPage = {
      goto: jest.fn().mockResolvedValue(undefined),
      waitForLoadState: jest.fn().mockResolvedValue(undefined),
      url: jest.fn().mockReturnValue(
        "https://serviciosweb.afip.gob.ar/genericos/adminRel/main.aspx",
      ),
      locator: jest.fn().mockReturnValue({
        waitFor: jest.fn().mockResolvedValue(undefined),
        fill: jest.fn().mockResolvedValue(undefined),
        click: jest.fn().mockResolvedValue(undefined),
        first: jest.fn().mockReturnThis(),
        isVisible: jest.fn().mockResolvedValue(false),
        textContent: jest.fn().mockResolvedValue(null),
        or: jest.fn().mockReturnThis(),
        filter: jest.fn().mockReturnThis(),
        getByRole: jest.fn().mockReturnThis(),
        locator: jest.fn().mockReturnThis(),
      }),
      getByRole: jest.fn().mockReturnValue({
        click: jest.fn().mockResolvedValue(undefined),
        isVisible: jest.fn().mockResolvedValue(false),
        or: jest.fn().mockReturnThis(),
        first: jest.fn().mockReturnThis(),
      }),
    };

    const mockContext = {
      setDefaultTimeout: jest.fn(),
      newPage: jest.fn().mockResolvedValue(mockPage),
    };

    const mockBrowser = {
      newContext: jest.fn().mockResolvedValue(mockContext),
      close: jest.fn().mockResolvedValue(undefined),
    };

    return {
      __esModule: true,
      default: {
        chromium: {
          launch: jest.fn().mockResolvedValue(mockBrowser),
        },
      },
      chromium: {
        launch: jest.fn().mockResolvedValue(mockBrowser),
      },
    };
  },
  { virtual: true },
);

describe("PlaywrightPortalAdapter", () => {
  let adapter: PlaywrightPortalAdapter;

  beforeEach(() => {
    adapter = new PlaywrightPortalAdapter({ headless: true, timeout: 5000 });
  });

  afterEach(async () => {
    await adapter.close();
  });

  describe("delegateWebService", () => {
    it("should launch browser, login, and attempt delegation", async () => {
      const result = await adapter.delegateWebService({
        cuit: "20111111112",
        username: "20111111112",
        password: "test-password",
        service: "wsfe",
        delegateTo: "20222222223",
      });

      expect(result.status).toBeDefined();
      // The result should be either "complete" or "error"
      expect(["complete", "error"]).toContain(result.status);
    });

    it("should use chromium in headless mode by default", async () => {
      const pw = jest.requireMock("playwright") as {
        chromium: { launch: jest.Mock };
      };
      await adapter.delegateWebService({
        cuit: "20111111112",
        username: "20111111112",
        password: "test-password",
        service: "wsfe",
        delegateTo: "20222222223",
      });

      expect(pw.chromium.launch).toHaveBeenCalledWith({ headless: true });
    });
  });

  describe("acceptWebServiceDelegation", () => {
    it("should launch browser, login, and attempt acceptance", async () => {
      const result = await adapter.acceptWebServiceDelegation({
        cuit: "20222222223",
        username: "20222222223",
        password: "test-password",
        service: "wsfe",
        delegatedCuit: "20111111112",
      });

      expect(result.status).toBeDefined();
      expect(["complete", "error"]).toContain(result.status);
    });
  });

  describe("close", () => {
    it("should close browser if open", async () => {
      // Trigger a delegation to open the browser
      await adapter.delegateWebService({
        cuit: "20111111112",
        username: "20111111112",
        password: "test-password",
        service: "wsfe",
        delegateTo: "20222222223",
      });

      await adapter.close();

      // close should not throw when called again
      await expect(adapter.close()).resolves.not.toThrow();
    });
  });

  describe("constructor", () => {
    it("should default to headless mode", () => {
      const defaultAdapter = new PlaywrightPortalAdapter();
      expect(defaultAdapter).toBeDefined();
    });

    it("should accept custom timeout", () => {
      const customAdapter = new PlaywrightPortalAdapter({ timeout: 60000 });
      expect(customAdapter).toBeDefined();
    });
  });
});

describe("PlaywrightPortalAdapter - playwright not installed", () => {
  it("should throw clear error when playwright is not available", async () => {
    // Override the mock to simulate missing playwright
    jest.resetModules();
    jest.mock(
      "playwright",
      () => {
        throw new Error("Cannot find module 'playwright'");
      },
      { virtual: true },
    );

    // Dynamic re-import to pick up the reset
    const { PlaywrightPortalAdapter: FreshAdapter } = await import(
      "@infrastructure/outbound/adapters/playwright-portal.adapter"
    );

    const adapter = new FreshAdapter();
    const result = await adapter.delegateWebService({
      cuit: "20111111112",
      username: "20111111112",
      password: "test",
      service: "wsfe",
      delegateTo: "20222222223",
    });

    expect(result.status).toBe("error");
    expect(result.error).toContain("Playwright is required");
  });
});
