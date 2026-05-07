import { describe, expect, it, beforeAll } from "@jest/globals";
import type { Arca } from "@arcasdk/core";
import { createArcaForWsfeHomologationManualTicket } from "./utils/homologation-arca-manual-ticket";
import { resolveHomologationPuntoVenta } from "./utils/wsfe-homologation-helpers";
import {
  buildFacturaC,
  createVoucherHomologacionWithRetry,
  expectFecaeFacturaAprobada,
} from "./utils/wsfe-invoice-emission";
import { expectNonEmptyString } from "./utils/wsfe-expect";

/**
 * Cubre el flujo legacy: WSAA vía `AuthRepository` sin `ticketStorage`, TA en disco
 * y `Arca` con `handleTicket: true` + `credentials`. El resto de FEParam* / A-B
 * queda en `electronic-billing-wsfe-homologation.integration.test.ts` (storage en archivo).
 */
const enableIntegration = process.env.ENABLE_INTEGRATION_TESTS === "true";

const describeOrSkip = enableIntegration ? describe : describe.skip;

describeOrSkip(
  "WSFE homologación — TA manual (consumidor npm)",
  () => {
    let arca: Arca;

    beforeAll(async () => {
      try {
        arca = await createArcaForWsfeHomologationManualTicket();
      } catch (e) {
        const msg =
          e instanceof Error
            ? e.message
            : typeof e === "string"
              ? e
              : "unknown";
        throw new Error(`Setup WSFE (TA manual): ${msg}`);
      }
    });

    describe("FEDummy / estado de servidores", () => {
      it("getServerStatus responde con texto no vacío en cada servidor", async () => {
        const status = await arca.electronicBillingService.getServerStatus();
        expect(status).toBeDefined();
        expectNonEmptyString("appServer", status.appServer);
        expectNonEmptyString("dbServer", status.dbServer);
        expectNonEmptyString("authServer", status.authServer);
      });
    });

    describe("FECAESolicitar — Factura C con createVoucher (TA manual)", () => {
      it("Factura C (CbteTipo 11): consumidor final sin IVA", async () => {
        const { nro: puntoVenta } = await resolveHomologationPuntoVenta(arca);
        const condIva = parseInt(
          process.env.TEST_FE_COND_IVA_RECEPTOR_C ?? "1",
          10,
        );

        const { resultado, fecha } = await createVoucherHomologacionWithRetry(
          arca,
          puntoVenta,
          11,
          (n, f) => buildFacturaC(puntoVenta, n, f, condIva),
        );

        expectFecaeFacturaAprobada(resultado, {
          puntoVenta,
          cbteTipo: 11,
          fecha,
          concepto: 2,
          docTipo: 99,
          docNro: 0,
        });
      });
    });
  },
);

if (!enableIntegration) {
  console.info(
    "Omitiendo tests WSFE (TA manual): ENABLE_INTEGRATION_TESTS=true",
  );
}
