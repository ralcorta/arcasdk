import { describe, expect, it, beforeAll } from "@jest/globals";
import type { Arca } from "@arcasdk/core";
import { createArcaForWsfeHomologation } from "./utils/homologation-arca";
import {
  resolveHomologationPuntoVenta,
  isWsfeNoPuntosVentaResponse,
  WSFE_NO_PUNTOS_VENTA_CODE,
} from "./utils/wsfe-homologation-helpers";
import {
  buildFacturaALote2,
  buildFacturaAUsd,
  buildFacturaA,
  buildFacturaB,
  buildFacturaC,
  buildNextFacturaC,
  buildFacturaAProductos,
  buildFacturaAMultiIvaTributoOpcional,
  buildNotaCreditoAConAsociado,
  buildNotaDebitoAConAsociado,
  createVoucherHomologacionWithRetry,
  createNextVoucherHomologacionWithRetry,
  expectFecaeHomologacionFlexible,
  expectFecaeFacturaAprobada,
  parseCuit11,
  emitterCuit11Digits,
} from "./utils/wsfe-invoice-emission";
import {
  expectCaeaHomologationPayload,
  expectIvaReceptorTypesForClaseCmp,
  expectNonEmptyArray,
  expectNonEmptyString,
  expectSampleActividadRow,
  expectSampleIvaReceptorRow,
  expectSampleNumericParamRow,
  expectSamplePaisRow,
  expectSampleStringIdParamRow,
  expectWsfeWithoutErrors,
} from "./utils/wsfe-expect";

/**
 * WSFE es el único servicio SOAP de facturación electrónica expuesto hoy por @arcasdk/core.
 * Aserciones estrictas: sin errores en el DTO y listas no vacías donde homologación suele responder OK.
 */
const enableIntegration = process.env.ENABLE_INTEGRATION_TESTS === "true";

const describeOrSkip = enableIntegration ? describe : describe.skip;

describeOrSkip(
  "WSFE homologación — facturación electrónica (consumidor npm)",
  () => {
    let arca: Arca;

    beforeAll(async () => {
      try {
        arca = await createArcaForWsfeHomologation();
      } catch (e) {
        const msg =
          e instanceof Error
            ? e.message
            : typeof e === "string"
              ? e
              : "unknown";
        throw new Error(`Setup WSFE (consumidor): ${msg}`);
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

    describe("FEParamGetPtosVenta", () => {
      it("getSalesPoints: lista de PV o 602 sin puntos en padrón WSFE", async () => {
        const result = await arca.electronicBillingService.getSalesPoints();
        const list = result.resultGet?.ptoVenta ?? [];
        const errs = result.errors?.err ?? [];

        if (list.length > 0) {
          expectWsfeWithoutErrors("getSalesPoints", result);
          expectNonEmptyArray("ptoVenta", list);
          expect(list[0]!).toEqual(
            expect.objectContaining({
              nro: expect.any(Number),
              emisionTipo: expect.any(String),
              bloqueado: expect.any(String),
            }),
          );
        } else {
          expect(isWsfeNoPuntosVentaResponse(errs)).toBe(true);
          expect(errs[0]!.code).toBe(WSFE_NO_PUNTOS_VENTA_CODE);
          expect(errs[0]!.msg).toMatch(
            /FEParamGetPtosVenta|PtosVenta|Sin Resultados/i,
          );
        }
      });
    });

    describe("FEParamGetTiposCbte", () => {
      it("getVoucherTypes sin errores y primera fila válida", async () => {
        const r = await arca.electronicBillingService.getVoucherTypes();
        expectWsfeWithoutErrors("getVoucherTypes", r);
        expect(r.resultGet).toBeDefined();
        expectNonEmptyArray("cbteTipo", r.resultGet!.cbteTipo);
        expectSampleNumericParamRow("cbteTipo[0]", r.resultGet!.cbteTipo![0]!);
      });
    });

    describe("FEParamGetTiposDoc", () => {
      it("getDocumentTypes sin errores y primera fila válida", async () => {
        const r = await arca.electronicBillingService.getDocumentTypes();
        expectWsfeWithoutErrors("getDocumentTypes", r);
        expect(r.resultGet).toBeDefined();
        expectNonEmptyArray("docTipo", r.resultGet!.docTipo);
        expectSampleNumericParamRow("docTipo[0]", r.resultGet!.docTipo![0]!);
      });
    });

    describe("FEParamGetTiposConcepto", () => {
      it("getConceptTypes sin errores y primera fila válida", async () => {
        const r = await arca.electronicBillingService.getConceptTypes();
        expectWsfeWithoutErrors("getConceptTypes", r);
        expect(r.resultGet).toBeDefined();
        expectNonEmptyArray("conceptoTipo", r.resultGet!.conceptoTipo);
        expectSampleNumericParamRow(
          "conceptoTipo[0]",
          r.resultGet!.conceptoTipo![0]!,
        );
      });
    });

    describe("FEParamGetTiposIva", () => {
      it("getAliquotTypes sin errores y primera fila válida", async () => {
        const r = await arca.electronicBillingService.getAliquotTypes();
        expectWsfeWithoutErrors("getAliquotTypes", r);
        expect(r.resultGet).toBeDefined();
        expectNonEmptyArray("ivaTipo", r.resultGet!.ivaTipo);
        expectSampleNumericParamRow("ivaTipo[0]", r.resultGet!.ivaTipo![0]!);
      });
    });

    describe("FEParamGetTiposMonedas", () => {
      it("getCurrencyTypes sin errores y primera fila válida", async () => {
        const r = await arca.electronicBillingService.getCurrencyTypes();
        expectWsfeWithoutErrors("getCurrencyTypes", r);
        expect(r.resultGet).toBeDefined();
        expectNonEmptyArray("moneda", r.resultGet!.moneda);
        expectSampleStringIdParamRow("moneda[0]", r.resultGet!.moneda![0]!);
      });
    });

    describe("FEParamGetTiposTributos", () => {
      it("getTaxTypes sin errores y primera fila válida", async () => {
        const r = await arca.electronicBillingService.getTaxTypes();
        expectWsfeWithoutErrors("getTaxTypes", r);
        expect(r.resultGet).toBeDefined();
        expectNonEmptyArray("tributoTipo", r.resultGet!.tributoTipo);
        expectSampleNumericParamRow(
          "tributoTipo[0]",
          r.resultGet!.tributoTipo![0]!,
        );
      });
    });

    describe("FEParamGetTiposOpcional", () => {
      it("getOptionalTypes sin errores y primera fila válida", async () => {
        const r = await arca.electronicBillingService.getOptionalTypes();
        expectWsfeWithoutErrors("getOptionalTypes", r);
        expect(r.resultGet).toBeDefined();
        expectNonEmptyArray("opcionalTipo", r.resultGet!.opcionalTipo);
        expectSampleStringIdParamRow(
          "opcionalTipo[0]",
          r.resultGet!.opcionalTipo![0]!,
        );
      });
    });

    describe("FEParamGetCondicionIvaReceptor", () => {
      it("getIvaReceptorTypes sin errores y primera fila válida", async () => {
        const r = await arca.electronicBillingService.getIvaReceptorTypes();
        expectWsfeWithoutErrors("getIvaReceptorTypes", r);
        expect(r.resultGet).toBeDefined();
        expectNonEmptyArray(
          "condicionIvaReceptor",
          r.resultGet!.condicionIvaReceptor,
        );
        expectSampleIvaReceptorRow(
          "condicionIvaReceptor[0]",
          r.resultGet!.condicionIvaReceptor![0]!,
        );
      });

      it('getIvaReceptorTypes("A") con clase de comprobante filtrada', async () => {
        const r = await arca.electronicBillingService.getIvaReceptorTypes("A");
        expectIvaReceptorTypesForClaseCmp("getIvaReceptorTypes(A)", "A", r);
      });
    });

    describe("FEParamGetCotizacion", () => {
      it("getQuotation DOL sin errores y cotización coherente", async () => {
        const r = await arca.electronicBillingService.getQuotation("DOL");
        expectWsfeWithoutErrors("getQuotation(DOL)", r);
        expect(r.resultGet).toBeDefined();
        expect(r.resultGet!).toEqual(
          expect.objectContaining({
            monId: "DOL",
            monCotiz: expect.any(Number),
            fchCotiz: expect.stringMatching(/^\d{8}$/),
          }),
        );
        expect(r.resultGet!.monCotiz).toBeGreaterThan(0);
      });
    });

    describe("FEParamGetPaises", () => {
      it("getCountries sin errores y primera fila válida", async () => {
        const r = await arca.electronicBillingService.getCountries();
        expectWsfeWithoutErrors("getCountries", r);
        expect(r.resultGet).toBeDefined();
        expectNonEmptyArray("paisTipo", r.resultGet!.paisTipo);
        expectSamplePaisRow("paisTipo[0]", r.resultGet!.paisTipo![0]!);
      });
    });

    describe("FEParamGetActividades", () => {
      it("getActivities sin errores y primera fila válida", async () => {
        const r = await arca.electronicBillingService.getActivities();
        expectWsfeWithoutErrors("getActivities", r);
        expect(r.resultGet).toBeDefined();
        expectNonEmptyArray("actividadesTipo", r.resultGet!.actividadesTipo);
        expectSampleActividadRow(
          "actividadesTipo[0]",
          r.resultGet!.actividadesTipo![0]!,
        );
      });
    });

    describe("FECompTotXRequest", () => {
      it("getMaxRecordsPerRequest sin errores y límite positivo", async () => {
        const r = await arca.electronicBillingService.getMaxRecordsPerRequest();
        expectWsfeWithoutErrors("getMaxRecordsPerRequest", r);
        expect(r.resultGet).toBeDefined();
        expect(typeof r.resultGet).toBe("number");
        expect(r.resultGet!).toBeGreaterThan(0);
      });
    });

    describe("CAEA (homologación: éxito o errores de negocio bien formados)", () => {
      it("getCaea y consultCaea devuelven payload esperado", async () => {
        const now = new Date();
        const period = now.getFullYear() * 100 + (now.getMonth() + 1);
        const order = now.getDate() <= 15 ? 1 : 2;

        const solicitud = await arca.electronicBillingService.getCaea(
          period,
          order,
        );
        expectCaeaHomologationPayload("getCaea", solicitud);

        const consulta = await arca.electronicBillingService.consultCaea(
          period,
          order,
        );
        expectCaeaHomologationPayload("consultCaea", consulta);
      });
    });

    describe("FECompUltimoAutorizado / FECompConsultar", () => {
      it("getLastVoucher sin errores y número de comprobante coherente", async () => {
        const { nro: ptoVta } = await resolveHomologationPuntoVenta(arca);
        const last = await arca.electronicBillingService.getLastVoucher(
          ptoVta,
          1,
        );
        expectWsfeWithoutErrors("getLastVoucher", last);
        expect(last.cbteNro).toBeGreaterThanOrEqual(0);
        expect(last.ptoVta).toBe(ptoVta);
        expect(last.cbteTipo).toBe(1);
      });

      it("getVoucherInfo sin errores si ya hay comprobante tipo 1 en el PV", async () => {
        const { nro: ptoVta } = await resolveHomologationPuntoVenta(arca);
        const voucherType = 1;
        const last = await arca.electronicBillingService.getLastVoucher(
          ptoVta,
          voucherType,
        );
        expectWsfeWithoutErrors("getLastVoucher (consulta)", last);
        if (last.cbteNro === 0) {
          console.info(
            "[WSFE homologación] Sin comprobantes tipo 1 en el PV; se omite FECompConsultar.",
          );
          return;
        }

        const info = await arca.electronicBillingService.getVoucherInfo(
          last.cbteNro,
          ptoVta,
          voucherType,
        );
        expect(info).not.toBeNull();
        expectWsfeWithoutErrors("getVoucherInfo", info!);
        expectNonEmptyString(
          "codAutorizacion",
          String(info!.codAutorizacion ?? ""),
        );
      });
    });

    describe("FECAESolicitar — Facturas A, B y C (homologación)", () => {
      it("Factura A (CbteTipo 1): RI + IVA 21 %", async () => {
        const { nro: puntoVenta } = await resolveHomologationPuntoVenta(arca);
        const docNro = parseCuit11(
          "TEST_FE_RECEIVER_CUIT",
          process.env.TEST_FE_RECEIVER_CUIT,
        );
        const condIva = parseInt(
          process.env.TEST_FE_COND_IVA_RECEPTOR_A ?? "1",
          10,
        );

        const { resultado, fecha } = await createVoucherHomologacionWithRetry(
          arca,
          puntoVenta,
          1,
          (n, f) => buildFacturaA(puntoVenta, docNro, condIva, n, f),
        );

        expectFecaeFacturaAprobada(resultado, {
          puntoVenta,
          cbteTipo: 1,
          fecha,
          concepto: 2,
          docTipo: 80,
          docNro,
        });
      });

      it("Factura B (CbteTipo 6): gravado + IVA 21 %", async () => {
        const { nro: puntoVenta } = await resolveHomologationPuntoVenta(arca);
        const docNro = parseCuit11(
          "TEST_FE_RECEIVER_CUIT_B",
          process.env.TEST_FE_RECEIVER_CUIT_B,
        );
        const condIva = parseInt(
          process.env.TEST_FE_COND_IVA_RECEPTOR_B ?? "6",
          10,
        );

        const { resultado, fecha } = await createVoucherHomologacionWithRetry(
          arca,
          puntoVenta,
          6,
          (n, f) => buildFacturaB(puntoVenta, docNro, condIva, n, f),
        );

        expectFecaeFacturaAprobada(resultado, {
          puntoVenta,
          cbteTipo: 6,
          fecha,
          concepto: 2,
          docTipo: 80,
          docNro,
        });
      });

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
          (n, f) =>
            buildFacturaAUsd(puntoVenta, docNro, condIva, n, f, monCotiz),
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
          expectBatch: { cantReg: 2 },
        });
      });
    });

    describe("FECAESolicitar — Comprobantes complejos (notas y multi-IVA)", () => {
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
        const opcionales =
          await arca.electronicBillingService.getOptionalTypes();
        expectWsfeWithoutErrors("getOptionalTypes para multi-IVA", opcionales);
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
          await createVoucherHomologacionWithRetry(
            arca,
            puntoVenta,
            1,
            (n, f) => buildFacturaA(puntoVenta, docNro, condIva, n, f),
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
          await createVoucherHomologacionWithRetry(
            arca,
            puntoVenta,
            3,
            (n, f) =>
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
          await createVoucherHomologacionWithRetry(
            arca,
            puntoVenta,
            1,
            (n, f) => buildFacturaA(puntoVenta, docNro, condIva, n, f),
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
          await createVoucherHomologacionWithRetry(
            arca,
            puntoVenta,
            2,
            (n, f) =>
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
  },
);

if (!enableIntegration) {
  console.info(
    "Omitiendo tests WSFE (FEParam*, CAEA, comprobantes): ENABLE_INTEGRATION_TESTS=true",
  );
}
