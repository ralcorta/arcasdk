import { describe, expect, it, beforeAll } from "@jest/globals";
import type { Arca } from "@arcasdk/core";
import { createArcaForWsfeHomologationManualTicket } from "./utils/homologation-arca-manual-ticket";
import { resolveHomologationPuntoVenta } from "./utils/wsfe-homologation-helpers";
import {
  buildFacturaC,
  buildFacturaAUsd,
  buildFacturaALote2,
  buildNextFacturaC,
  buildFacturaAProductos,
  buildFacturaAMultiIvaTributoOpcional,
  buildNotaCreditoAConAsociado,
  buildNotaDebitoAConAsociado,
  createVoucherHomologacionWithRetry,
  createNextVoucherHomologacionWithRetry,
  expectFecaeFacturaAprobada,
  expectFecaeHomologacionFlexible,
  parseCuit11,
  emitterCuit11Digits,
} from "./utils/wsfe-invoice-emission";
import {
  expectNonEmptyString,
  expectIvaReceptorTypesForClaseCmp,
  expectWsfeWithoutErrors,
  expectNonEmptyArray,
} from "./utils/wsfe-expect";

/**
 * Cubre el flujo legacy: WSAA vía `AuthRepository` sin `ticketStorage`, TA en disco
 * y `Arca` con `handleTicket: true` + `credentials`. El resto de FEParam* / A-B
 * queda en `electronic-billing-wsfe-homologation.integration.test.ts` (storage en archivo).
 */
const enableIntegration = process.env.ENABLE_INTEGRATION_TESTS === "true";

const describeOrSkip = enableIntegration ? describe : describe.skip;

describeOrSkip("WSFE homologación — TA manual (consumidor npm)", () => {
  let arca: Arca;

  beforeAll(async () => {
    try {
      arca = await createArcaForWsfeHomologationManualTicket();
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : typeof e === "string" ? e : "unknown";
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

    it("createNextVoucher Factura C (CbteTipo 11) con numeración automática", async () => {
      const { nro: puntoVenta } = await resolveHomologationPuntoVenta(arca);
      const condIva = parseInt(
        process.env.TEST_FE_COND_IVA_RECEPTOR_C ?? "1",
        10,
      );

      const { resultado } = await createNextVoucherHomologacionWithRetry(
        arca,
        puntoVenta,
        11,
        (fecha) => buildNextFacturaC(puntoVenta, fecha, condIva),
      );

      expectFecaeHomologacionFlexible(resultado, {
        puntoVenta,
        cbteTipo: 11,
      });
    });

    it("Factura A en USD (MonId DOL) con cotización WSFE", async () => {
      const { nro: puntoVenta } = await resolveHomologationPuntoVenta(arca);
      const docNro = parseCuit11(
        "TEST_FE_RECEIVER_CUIT",
        process.env.TEST_FE_RECEIVER_CUIT,
      );
      const condIva = parseInt(
        process.env.TEST_FE_COND_IVA_RECEPTOR_A ?? "1",
        10,
      );

      const quote = await arca.electronicBillingService.getQuotation("DOL");
      expectWsfeWithoutErrors("getQuotation(DOL) para FECAE", quote);
      const monCotiz = quote.resultGet?.monCotiz ?? 0;
      expect(monCotiz).toBeGreaterThan(0);

      const { resultado } = await createVoucherHomologacionWithRetry(
        arca,
        puntoVenta,
        1,
        (n, f) => buildFacturaAUsd(puntoVenta, docNro, condIva, n, f, monCotiz),
      );

      expectFecaeHomologacionFlexible(resultado, {
        puntoVenta,
        cbteTipo: 1,
      });
    });

    it("Factura A en lote (CantReg=2) devuelve payload consistente", async () => {
      const { nro: puntoVenta } = await resolveHomologationPuntoVenta(arca);
      const docNro = parseCuit11(
        "TEST_FE_RECEIVER_CUIT",
        process.env.TEST_FE_RECEIVER_CUIT,
      );
      const condIva = parseInt(
        process.env.TEST_FE_COND_IVA_RECEPTOR_A ?? "1",
        10,
      );

      const { resultado } = await createVoucherHomologacionWithRetry(
        arca,
        puntoVenta,
        1,
        (n, f) => buildFacturaALote2(puntoVenta, docNro, condIva, n, f),
      );

      expectFecaeHomologacionFlexible(resultado, {
        puntoVenta,
        cbteTipo: 1,
      });
    });
  });

  describe("FEParamGetTiposComprobantes — IVA receptor (TA manual)", () => {
    it('getIvaReceptorTypes("A") con clase de comprobante filtrada', async () => {
      const r = await arca.electronicBillingService.getIvaReceptorTypes("A");
      expectIvaReceptorTypesForClaseCmp("getIvaReceptorTypes(A)", "A", r);
    });
  });

  describe("FECAESolicitar — Comprobantes complejos (notas y multi-IVA, TA manual)", () => {
    it("Factura A concepto 1 (Productos): sin fechas de servicio", async () => {
      const { nro: puntoVenta } = await resolveHomologationPuntoVenta(arca);
      const docNro = parseCuit11(
        "TEST_FE_RECEIVER_CUIT",
        process.env.TEST_FE_RECEIVER_CUIT,
      );
      const condIva = parseInt(
        process.env.TEST_FE_COND_IVA_RECEPTOR_A ?? "1",
        10,
      );

      const { resultado } = await createVoucherHomologacionWithRetry(
        arca,
        puntoVenta,
        1,
        (n, f) => buildFacturaAProductos(puntoVenta, docNro, condIva, n, f),
      );

      expectFecaeHomologacionFlexible(resultado, {
        puntoVenta,
        cbteTipo: 1,
      });
    });

    it("Factura A multi-IVA (21 % + 10,5 %) + tributo + opcional", async () => {
      const { nro: puntoVenta } = await resolveHomologationPuntoVenta(arca);
      const docNro = parseCuit11(
        "TEST_FE_RECEIVER_CUIT",
        process.env.TEST_FE_RECEIVER_CUIT,
      );
      const condIva = parseInt(
        process.env.TEST_FE_COND_IVA_RECEPTOR_A ?? "1",
        10,
      );

      // Obtener tributoId desde FEParamGetTiposTributos
      const tributos = await arca.electronicBillingService.getTaxTypes();
      expectWsfeWithoutErrors("getTaxTypes para multi-IVA", tributos);
      const tributoList = tributos.resultGet?.tributoTipo ?? [];
      if (tributoList.length === 0) {
        console.info(
          "[WSFE] Sin tributos disponibles en homologación; se omite test multi-IVA+tributo",
        );
        return;
      }
      const tributoId = tributoList[0]!.id;

      // Obtener opcionalId desde FEParamGetTiposOpcional
      const opcionales = await arca.electronicBillingService.getOptionsTypes();
      expectWsfeWithoutErrors("getOptionsTypes para multi-IVA", opcionales);
      const opcionalList = opcionales.resultGet?.opcionalTipo ?? [];
      if (opcionalList.length === 0) {
        console.info(
          "[WSFE] Sin opcionales disponibles en homologación; se omite test multi-IVA+opcional",
        );
        return;
      }
      const opcionalId = opcionalList[0]!.id;

      const { resultado } = await createVoucherHomologacionWithRetry(
        arca,
        puntoVenta,
        1,
        (n, f) =>
          buildFacturaAMultiIvaTributoOpcional(
            puntoVenta,
            docNro,
            condIva,
            n,
            f,
            tributoId,
            opcionalId,
          ),
      );

      expectFecaeHomologacionFlexible(resultado, {
        puntoVenta,
        cbteTipo: 1,
      });
    });

    it("Nota de Crédito A (CbteTipo 3) con comprobante asociado", async () => {
      const { nro: puntoVenta } = await resolveHomologationPuntoVenta(arca);
      const docNro = parseCuit11(
        "TEST_FE_RECEIVER_CUIT",
        process.env.TEST_FE_RECEIVER_CUIT,
      );
      const condIva = parseInt(
        process.env.TEST_FE_COND_IVA_RECEPTOR_A ?? "1",
        10,
      );

      // 1. Emitir Factura A base para asociar
      const { resultado: facturaResult, fecha: facturaFecha } =
        await createVoucherHomologacionWithRetry(arca, puntoVenta, 1, (n, f) =>
          buildFacturaAProductos(puntoVenta, docNro, condIva, n, f),
        );

      const facturaAprobada =
        facturaResult.response.FeCabResp?.Resultado === "A" &&
        facturaResult.response.FeDetResp?.FECAEDetResponse?.[0]?.Resultado ===
          "A";

      if (!facturaAprobada) {
        console.info(
          "[WSFE] Factura base no aprobada; se omite test Nota de Crédito",
        );
        return;
      }

      const det = facturaResult.response.FeDetResp!.FECAEDetResponse![0]!;
      const emitterCuit = emitterCuit11Digits();

      // 2. Emitir Nota de Crédito con la Factura como asociada
      const { resultado: notaResult } =
        await createVoucherHomologacionWithRetry(arca, puntoVenta, 3, (n, f) =>
          buildNotaCreditoAConAsociado(puntoVenta, docNro, condIva, n, f, {
            tipo: 1,
            ptoVta: puntoVenta,
            nro: det.CbteDesde!,
            cuit: emitterCuit,
            cbteFch: facturaFecha,
          }),
        );

      expectFecaeHomologacionFlexible(notaResult, {
        puntoVenta,
        cbteTipo: 3,
      });
    });

    it("Nota de Débito A (CbteTipo 2) con comprobante asociado", async () => {
      const { nro: puntoVenta } = await resolveHomologationPuntoVenta(arca);
      const docNro = parseCuit11(
        "TEST_FE_RECEIVER_CUIT",
        process.env.TEST_FE_RECEIVER_CUIT,
      );
      const condIva = parseInt(
        process.env.TEST_FE_COND_IVA_RECEPTOR_A ?? "1",
        10,
      );

      // 1. Emitir Factura A base para asociar
      const { resultado: facturaResult, fecha: facturaFecha } =
        await createVoucherHomologacionWithRetry(arca, puntoVenta, 1, (n, f) =>
          buildFacturaAProductos(puntoVenta, docNro, condIva, n, f),
        );

      const facturaAprobada =
        facturaResult.response.FeCabResp?.Resultado === "A" &&
        facturaResult.response.FeDetResp?.FECAEDetResponse?.[0]?.Resultado ===
          "A";

      if (!facturaAprobada) {
        console.info(
          "[WSFE] Factura base no aprobada; se omite test Nota de Débito",
        );
        return;
      }

      const det = facturaResult.response.FeDetResp!.FECAEDetResponse![0]!;
      const emitterCuit = emitterCuit11Digits();

      // 2. Emitir Nota de Débito con la Factura como asociada
      const { resultado: notaResult } =
        await createVoucherHomologacionWithRetry(arca, puntoVenta, 2, (n, f) =>
          buildNotaDebitoAConAsociado(puntoVenta, docNro, condIva, n, f, {
            tipo: 1,
            ptoVta: puntoVenta,
            nro: det.CbteDesde!,
            cuit: emitterCuit,
            cbteFch: facturaFecha,
          }),
        );

      expectFecaeHomologacionFlexible(notaResult, {
        puntoVenta,
        cbteTipo: 2,
      });
    });
  });
});

if (!enableIntegration) {
  console.info(
    "Omitiendo tests WSFE (TA manual): ENABLE_INTEGRATION_TESTS=true",
  );
}
