import { describe, expect, it, beforeAll } from "@jest/globals";
import type { Arca } from "@arcasdk/core";
import { createArcaForRegisterHomologation } from "./utils/homologation-arca-register";
import { expectNonEmptyString } from "./utils/wsfe-expect";

const enableIntegration = process.env.ENABLE_INTEGRATION_TESTS === "true";
const describeOrSkip = enableIntegration ? describe : describe.skip;

describeOrSkip("Register services integration (consumidor npm)", () => {
  let arca: Arca;

  beforeAll(() => {
    arca = createArcaForRegisterHomologation();
  });

  function getTestIdentifier(): number {
    const raw = process.env.TEST_CUIT ?? process.env.CUIT ?? "20111111112";
    const digits = String(raw).replace(/\D/g, "");
    return parseInt(digits || "20111111112", 10);
  }

  function expectServerStatus(status: {
    appServer: string;
    dbServer: string;
    authServer: string;
  }): void {
    expectNonEmptyString("appServer", status.appServer);
    expectNonEmptyString("dbServer", status.dbServer);
    expectNonEmptyString("authServer", status.authServer);
  }

  it("scope four responde server status y taxpayer details", async () => {
    const status = await arca.registerScopeFourService.getServerStatus();
    expectServerStatus(status);

    const details =
      await arca.registerScopeFourService.getTaxpayerDetails(
        getTestIdentifier(),
      );

    // In homologation this may return full details or null, both valid outcomes.
    expect(details === null || typeof details === "object").toBe(true);
  });

  it("scope five responde server status y taxpayers details", async () => {
    const status = await arca.registerScopeFiveService.getServerStatus();
    expectServerStatus(status);

    const identifier = getTestIdentifier();
    const details = await arca.registerScopeFiveService.getTaxpayersDetails([
      identifier,
    ]);

    expect(details).toBeDefined();
    // Flexible: can have persona array or errors or both
    expect(details !== null && typeof details === "object").toBe(true);
  });

  it("scope ten responde server status y taxpayer details", async () => {
    const status = await arca.registerScopeTenService.getServerStatus();
    expectServerStatus(status);

    const details =
      await arca.registerScopeTenService.getTaxpayerDetails(
        getTestIdentifier(),
      );

    expect(details === null || typeof details === "object").toBe(true);
  });

  it("scope thirteen responde server status y tax id by document", async () => {
    const status = await arca.registerScopeThirteenService.getServerStatus();
    expectServerStatus(status);

    const identifier = String(getTestIdentifier());
    const byDocument =
      await arca.registerScopeThirteenService.getTaxIDByDocument(identifier);

    expect(byDocument).toBeDefined();
    expect(
      byDocument.idPersona !== undefined ||
        byDocument.errorConstancia !== undefined,
    ).toBe(true);
  });

  it("inscription proof responde server status y taxpayer details (singular)", async () => {
    const status = await arca.registerInscriptionProofService.getServerStatus();
    expectServerStatus(status);

    const details =
      await arca.registerInscriptionProofService.getTaxpayerDetails(
        getTestIdentifier(),
      );

    // In homologation this may return full details or null, both valid outcomes.
    expect(details === null || typeof details === "object").toBe(true);
  });

  it("inscription proof responde server status y taxpayers details", async () => {
    const status = await arca.registerInscriptionProofService.getServerStatus();
    expectServerStatus(status);

    const identifier = getTestIdentifier();
    const details =
      await arca.registerInscriptionProofService.getTaxpayersDetails([
        identifier,
      ]);

    expect(details).toBeDefined();
    expect(details !== null && typeof details === "object").toBe(true);
  });
});

if (!enableIntegration) {
  console.info(
    "Omitiendo tests Register services: ENABLE_INTEGRATION_TESTS=true",
  );
}
