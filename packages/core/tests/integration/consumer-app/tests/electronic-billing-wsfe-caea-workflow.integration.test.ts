import { describe, expect, it, beforeAll } from "@jest/globals";
import type { Arca } from "@arcasdk/core";
import { createArcaForWsfeHomologation } from "./utils/homologation-arca";
import { resolveHomologationPuntoVenta } from "./utils/wsfe-homologation-helpers";
import {
  buildFacturaA,
  homologacionCbteFch,
  parseCuit11,
} from "./utils/wsfe-invoice-emission";

const enableIntegration = process.env.ENABLE_INTEGRATION_TESTS === "true";
const describeOrSkip = enableIntegration ? describe : describe.skip;

describeOrSkip("WSFE CAEA workflow (consumidor npm)", () => {
  let arca: Arca;

  beforeAll(async () => {
    arca = await createArcaForWsfeHomologation();
  });

  function currentPeriodAndOrder(): { period: number; order: number } {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const period = parseInt(`${year}${month}`, 10);
    const order = now.getDate() <= 15 ? 1 : 2;
    return { period, order };
  }

  it("consultCaea retorna estructura válida", async () => {
    const { period, order } = currentPeriodAndOrder();

    const result = await arca.electronicBillingService.consultCaea(
      period,
      order,
    );

    const hasResult = result.resultGet !== undefined;
    const hasErrors = (result.errors?.err?.length ?? 0) > 0;

    expect(hasResult || hasErrors).toBe(true);
  });

  it("informCaeaNoMovement y consultCaeaNoMovement responden de forma consistente", async () => {
    const { period, order } = currentPeriodAndOrder();
    const { nro: puntoVenta } = await resolveHomologationPuntoVenta(arca);

    const caeaResponse = await arca.electronicBillingService.getCaea(
      period,
      order,
    );
    const caea = caeaResponse.resultGet?.caea;

    if (!caea) {
      // If CAEA is unavailable for the current period/order in homologation,
      // validate at least that the API returned structured errors.
      expect((caeaResponse.errors?.err?.length ?? 0) > 0).toBe(true);
      return;
    }

    const informed = await arca.electronicBillingService.informCaeaNoMovement(
      caea,
      puntoVenta,
    );
    const consulted = await arca.electronicBillingService.consultCaeaNoMovement(
      caea,
      puntoVenta,
    );

    const informedHasResult = informed.resultGet !== undefined;
    const informedHasErrors = (informed.errors?.err?.length ?? 0) > 0;
    const consultedHasResult = consulted.resultGet !== undefined;
    const consultedHasErrors = (consulted.errors?.err?.length ?? 0) > 0;

    expect(informedHasResult || informedHasErrors).toBe(true);
    expect(consultedHasResult || consultedHasErrors).toBe(true);
  });

  it("informCaeaUsage devuelve payload estructurado", async () => {
    const { period, order } = currentPeriodAndOrder();
    const { nro: puntoVenta } = await resolveHomologationPuntoVenta(arca);

    const docNro = parseCuit11(
      "TEST_FE_RECEIVER_CUIT",
      process.env.TEST_FE_RECEIVER_CUIT,
    );
    const condIva = parseInt(
      process.env.TEST_FE_COND_IVA_RECEPTOR_A ?? "1",
      10,
    );

    const caeaResponse = await arca.electronicBillingService.getCaea(
      period,
      order,
    );
    const caea = caeaResponse.resultGet?.caea;

    if (!caea) {
      expect((caeaResponse.errors?.err?.length ?? 0) > 0).toBe(true);
      return;
    }

    const lastVoucher = await arca.electronicBillingService.getLastVoucher(
      puntoVenta,
      1,
    );
    const next = (lastVoucher.cbteNro || 0) + 1;
    const fecha = homologacionCbteFch();

    const voucher = buildFacturaA(puntoVenta, docNro, condIva, next, fecha);
    const result = await arca.electronicBillingService.informCaeaUsage(
      voucher,
      caea,
    );

    const hasResult = result.resultGet !== undefined;
    const hasErrors = (result.errors?.err?.length ?? 0) > 0;

    expect(hasResult || hasErrors).toBe(true);
  });
});

if (!enableIntegration) {
  console.info("Omitiendo tests WSFE (CAEA): ENABLE_INTEGRATION_TESTS=true");
}
