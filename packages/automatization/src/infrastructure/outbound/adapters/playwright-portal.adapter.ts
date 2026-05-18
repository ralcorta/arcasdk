import { IPortalAutomationPort } from "@application/ports/portal-automation.port";
import {
  AcceptWebServiceDelegationParams,
  AutomationResult,
  DelegateWebServiceParams,
} from "@application/types/automation.types";

/**
 * Portal URLs used for ARCA automation.
 * These may change if ARCA updates their portal.
 */
const ARCA_URLS = {
  LOGIN: "https://auth.afip.gob.ar/contribuyente_/login.xhtml",
  PORTAL: "https://portalcf.cloud.afip.gob.ar/portal/app/",
  ADMIN_REL:
    "https://serviciosweb.afip.gob.ar/genericos/adminRel/main.aspx",
} as const;

/** Default timeout for navigation and element waits (ms) */
const DEFAULT_TIMEOUT = 30_000;

/** Minimal Playwright types to avoid requiring the package at compile time */
interface PwPage {
  goto(url: string, options?: Record<string, unknown>): Promise<unknown>;
  waitForLoadState(state?: string): Promise<void>;
  url(): string;
  locator(selector: string, options?: Record<string, unknown>): PwLocator;
  getByRole(role: string, options?: Record<string, unknown>): PwLocator;
}

interface PwLocator {
  waitFor(options?: Record<string, unknown>): Promise<void>;
  fill(value: string): Promise<void>;
  click(): Promise<void>;
  first(): PwLocator;
  isVisible(options?: Record<string, unknown>): Promise<boolean>;
  textContent(): Promise<string | null>;
  or(locator: PwLocator): PwLocator;
  filter(options: Record<string, unknown>): PwLocator;
  getByRole(role: string, options?: Record<string, unknown>): PwLocator;
  locator(selector: string): PwLocator;
}

interface PwBrowser {
  newContext(options?: Record<string, unknown>): Promise<PwContext>;
  close(): Promise<void>;
}

interface PwContext {
  setDefaultTimeout(timeout: number): void;
  newPage(): Promise<PwPage>;
}

interface PwModule {
  chromium: {
    launch(options?: Record<string, unknown>): Promise<PwBrowser>;
  };
}

function loadPlaywright(): PwModule {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require("playwright") as PwModule;
  } catch {
    throw new Error(
      "Playwright is required for portal automations. Install it with: npm install playwright && npx playwright install chromium",
    );
  }
}

interface BrowserPage {
  browser: PwBrowser;
  page: PwPage;
}

export interface PlaywrightPortalAdapterConfig {
  /** Show the browser window (useful for debugging). Default: false */
  headless?: boolean;
  /** Timeout for navigation and element waits in ms. Default: 30000 */
  timeout?: number;
}

/**
 * Playwright-based implementation for ARCA portal automations.
 *
 * Automates browser interactions with the ARCA portal to:
 * - Delegate web services to another CUIT
 * - Accept web service delegations from another CUIT
 *
 * Requires `playwright` as a peer dependency.
 *
 * @example
 * ```ts
 * const adapter = new PlaywrightPortalAdapter({ headless: true });
 * const result = await adapter.delegateWebService({
 *   cuit: '20111111112',
 *   username: '20111111112',
 *   password: 'mypassword',
 *   service: 'wsfe',
 *   delegateTo: '20222222223',
 * });
 * await adapter.close();
 * ```
 */
export class PlaywrightPortalAdapter implements IPortalAutomationPort {
  private browser: PwBrowser | null = null;
  private readonly headless: boolean;
  private readonly timeout: number;

  constructor(config?: PlaywrightPortalAdapterConfig) {
    this.headless = config?.headless ?? true;
    this.timeout = config?.timeout ?? DEFAULT_TIMEOUT;
  }

  async delegateWebService(
    params: DelegateWebServiceParams,
  ): Promise<AutomationResult> {
    let browserRef: PwBrowser | undefined;

    try {
      const { page, browser } = await this.launchAndLogin(params);
      browserRef = browser;

      await this.navigateToAdminRelaciones(page);
      await this.selectRepresentedEntity(page, params.cuit, params.username);

      // Click "Nueva Relación" to start delegation flow
      await page.getByRole("link", { name: /nueva relaci[oó]n/i }).click();
      await page.waitForLoadState("networkidle");

      // Search for the web service
      const serviceInput = page.locator(
        'input[name*="servicio"], input[name*="service"], input[placeholder*="servicio"]',
      );
      if (await serviceInput.isVisible({ timeout: 5000 }).catch(() => false)) {
        await serviceInput.fill(params.service);
        await page.getByRole("button", { name: /buscar|search/i }).click();
        await page.waitForLoadState("networkidle");
      }

      // Select the service from results
      const serviceRow = page.locator(`text=${params.service}`).first();
      await serviceRow.click();
      await page.waitForLoadState("networkidle");

      // Enter the delegate CUIT
      const cuitInput = page.locator(
        'input[name*="cuit"], input[name*="representante"], input[placeholder*="CUIT"]',
      );
      await cuitInput.waitFor({ state: "visible", timeout: this.timeout });
      await cuitInput.fill(params.delegateTo);

      // Search/confirm the CUIT
      await page
        .getByRole("button", { name: /buscar|confirmar|search|aceptar/i })
        .click();
      await page.waitForLoadState("networkidle");

      // Confirm the delegation
      const confirmBtn = page.getByRole("button", {
        name: /confirmar|aceptar|delegar/i,
      });
      if (await confirmBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
        await confirmBtn.click();
        await page.waitForLoadState("networkidle");
      }

      // Check for success indicators
      const alreadyExists = page.locator(
        'text=/ya existe|already exists|ya.*delegad/i',
      );
      if (
        await alreadyExists.isVisible({ timeout: 3000 }).catch(() => false)
      ) {
        return { status: "complete", data: { status: "already_exists" } };
      }

      const successIndicator = page.locator(
        'text=/exitosamente|exitosa|creada|delegaci[oó]n.*realizada/i',
      );
      if (
        await successIndicator.isVisible({ timeout: 5000 }).catch(() => false)
      ) {
        return { status: "complete", data: { status: "created" } };
      }

      const errorMessage = await this.getErrorMessage(page);
      if (errorMessage) {
        return { status: "error", error: errorMessage };
      }

      return { status: "complete", data: { status: "created" } };
    } catch (error) {
      return {
        status: "error",
        error:
          error instanceof Error
            ? error.message
            : "Unknown error during delegation",
      };
    } finally {
      if (browserRef) await browserRef.close();
    }
  }

  async acceptWebServiceDelegation(
    params: AcceptWebServiceDelegationParams,
  ): Promise<AutomationResult> {
    let browserRef: PwBrowser | undefined;

    try {
      const { page, browser } = await this.launchAndLogin(params);
      browserRef = browser;

      await this.navigateToAdminRelaciones(page);
      await this.selectRepresentedEntity(page, params.cuit, params.username);

      // Navigate to pending delegations / incoming relationships
      const pendingLink = page.getByRole("link", {
        name: /representantes|delegaciones.*pendientes|relaciones.*recibidas/i,
      });
      if (await pendingLink.isVisible({ timeout: 5000 }).catch(() => false)) {
        await pendingLink.click();
        await page.waitForLoadState("networkidle");
      }

      // Look for the delegation row matching the CUIT and service
      const delegationRow = page
        .locator("tr", {
          has: page.locator(`text=${params.delegatedCuit}`),
        })
        .filter({
          has: page.locator(`text=${params.service}`),
        });

      if (
        !(await delegationRow
          .isVisible({ timeout: this.timeout })
          .catch(() => false))
      ) {
        const cuitRow = page.locator(
          `tr:has-text("${params.delegatedCuit}")`,
        );
        if (!(await cuitRow.isVisible({ timeout: 5000 }).catch(() => false))) {
          return {
            status: "error",
            error: `No pending delegation found from CUIT ${params.delegatedCuit} for service ${params.service}`,
          };
        }
      }

      // Click accept/confirm on the delegation row
      const acceptBtn = delegationRow
        .getByRole("button", { name: /aceptar|confirmar|accept/i })
        .or(delegationRow.locator('a:has-text("Aceptar")'))
        .or(delegationRow.locator('input[value*="Aceptar"]'));

      await acceptBtn.first().click();
      await page.waitForLoadState("networkidle");

      // Handle confirmation dialog if present
      const finalConfirmBtn = page.getByRole("button", {
        name: /confirmar|aceptar|si|yes/i,
      });
      if (
        await finalConfirmBtn.isVisible({ timeout: 3000 }).catch(() => false)
      ) {
        await finalConfirmBtn.click();
        await page.waitForLoadState("networkidle");
      }

      // Check for success
      const alreadyExists = page.locator(
        'text=/ya existe|already|ya.*aceptad/i',
      );
      if (
        await alreadyExists.isVisible({ timeout: 3000 }).catch(() => false)
      ) {
        return { status: "complete", data: { status: "already_exists" } };
      }

      const successIndicator = page.locator(
        'text=/exitosamente|exitosa|aceptada|relaci[oó]n.*creada/i',
      );
      if (
        await successIndicator.isVisible({ timeout: 5000 }).catch(() => false)
      ) {
        return { status: "complete", data: { status: "accepted" } };
      }

      const errorMessage = await this.getErrorMessage(page);
      if (errorMessage) {
        return { status: "error", error: errorMessage };
      }

      return { status: "complete", data: { status: "accepted" } };
    } catch (error) {
      return {
        status: "error",
        error:
          error instanceof Error
            ? error.message
            : "Unknown error during delegation acceptance",
      };
    } finally {
      if (browserRef) await browserRef.close();
    }
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  /**
   * Launch browser and login to ARCA portal.
   */
  private async launchAndLogin(
    params: Pick<DelegateWebServiceParams, "username" | "password">,
  ): Promise<BrowserPage> {
    const pw = loadPlaywright();

    const browser = await pw.chromium.launch({
      headless: this.headless,
    });
    this.browser = browser;

    const context = await browser.newContext({
      locale: "es-AR",
      timezoneId: "America/Argentina/Buenos_Aires",
    });
    context.setDefaultTimeout(this.timeout);

    const page = await context.newPage();
    await this.login(page, params.username, params.password);

    return { browser, page };
  }

  /**
   * Login to ARCA with clave fiscal.
   * Handles the two-step login flow: CUIT → password.
   */
  private async login(
    page: PwPage,
    username: string,
    password: string,
  ): Promise<void> {
    await page.goto(ARCA_URLS.LOGIN, { waitUntil: "networkidle" });

    // Step 1: Enter CUIT
    const cuitInput = page
      .locator(
        'input[name="F1:username"], input[id*="username"], input[type="text"]',
      )
      .first();
    await cuitInput.waitFor({ state: "visible", timeout: this.timeout });
    await cuitInput.fill(username);

    // Click "Siguiente"
    await page
      .getByRole("button", { name: /siguiente/i })
      .or(page.locator('input[value*="Siguiente"]'))
      .or(page.locator("#F1\\:btnSiguiente"))
      .first()
      .click();

    await page.waitForLoadState("networkidle");

    // Step 2: Enter password
    const passwordInput = page
      .locator(
        'input[name="F1:password"], input[id*="password"], input[type="password"]',
      )
      .first();
    await passwordInput.waitFor({ state: "visible", timeout: this.timeout });
    await passwordInput.fill(password);

    // Click "Ingresar"
    await page
      .getByRole("button", { name: /ingresar/i })
      .or(page.locator('input[value*="Ingresar"]'))
      .or(page.locator("#F1\\:btnIngresar"))
      .first()
      .click();

    await page.waitForLoadState("networkidle");

    // Verify login was successful (no error message)
    const loginError = page.locator(
      '.error-message, .alert-danger, text=/clave.*incorrecta|usuario.*inv[aá]lido|datos.*incorrectos/i',
    );
    if (await loginError.isVisible({ timeout: 3000 }).catch(() => false)) {
      const errorText = await loginError.textContent();
      throw new Error(
        `ARCA login failed: ${errorText?.trim() ?? "Invalid credentials"}`,
      );
    }
  }

  /**
   * Navigate to the Administrador de Relaciones de Clave Fiscal.
   */
  private async navigateToAdminRelaciones(page: PwPage): Promise<void> {
    await page.goto(ARCA_URLS.ADMIN_REL, { waitUntil: "networkidle" });

    // If redirected to portal (session issue), try finding the service link
    const currentUrl = page.url();
    if (
      currentUrl.includes("portalcf") ||
      currentUrl.includes("contribuyente")
    ) {
      const adminRelLink = page.getByRole("link", {
        name: /administrador.*relaciones|admin.*rel/i,
      });
      if (
        await adminRelLink.isVisible({ timeout: 5000 }).catch(() => false)
      ) {
        await adminRelLink.click();
        await page.waitForLoadState("networkidle");
      } else {
        throw new Error(
          "Could not navigate to Administrador de Relaciones. The portal structure may have changed.",
        );
      }
    }
  }

  /**
   * If the login CUIT differs from the operating CUIT,
   * select the entity to represent.
   */
  private async selectRepresentedEntity(
    page: PwPage,
    cuit: string,
    username: string,
  ): Promise<void> {
    if (cuit === username) return;

    const entitySelector = page.locator(`text=${cuit}`);
    if (
      await entitySelector.isVisible({ timeout: 5000 }).catch(() => false)
    ) {
      await entitySelector.click();
      await page.waitForLoadState("networkidle");
    }
  }

  /**
   * Extract error messages from the current page.
   */
  private async getErrorMessage(page: PwPage): Promise<string | null> {
    const errorLocator = page.locator(
      '.error, .alert-danger, .error-message, [class*="error"], text=/error/i',
    );
    if (await errorLocator.isVisible({ timeout: 2000 }).catch(() => false)) {
      return (await errorLocator.first().textContent())?.trim() ?? null;
    }
    return null;
  }
}
