import { describe, expect, it, beforeAll } from "@jest/globals";
import type { Arca } from "@arcasdk/core";
import { createArcaForWscdcHomologation } from "./utils/homologation-arca-register";
import { resolveHomologationPuntoVenta } from "./utils/wsfe-homologation-helpers";
import { expectNonEmptyString } from "./utils/wsfe-expect";

const enableIntegration = process.env.ENABLE_INTEGRATION_TESTS === "true";
const describeOrSkip = enableIntegration ? describe : describe.skip;

/** WSCDC: el CAE consultado no existe en las bases de ARCA. */
const WSCDC_CAE_INEXISTENTE = 100;

function getTestCuit(): number {
  const raw = process.env.TEST_CUIT ?? process.env.CUIT ?? "20111111112";
  return parseInt(String(raw).replace(/\D/g, "") || "20111111112", 10);
}

describeOrSkip(
  "WSCDC homologación — constatación de comprobantes (consumidor npm)",
  () => {
    let arca: Arca;

    beforeAll(() => {
      arca = createArcaForWscdcHomologation();
    });

    describe("dummy / estado de servidores", () => {
      it("dummy responde con texto no vacío en cada servidor", async () => {
        const result = await arca.wscdcService.dummy();
        expect(result.ComprobanteDummyResult).toBeDefined();
        expectNonEmptyString("AppServer", result.ComprobanteDummyResult.AppServer);
        expectNonEmptyString("DbServer", result.ComprobanteDummyResult.DbServer);
        expectNonEmptyString("AuthServer", result.ComprobanteDummyResult.AuthServer);
      });
    });

    describe("tablas de parámetros", () => {
      it("getComprobantesModalidad incluye CAE", async () => {
        const result = await arca.wscdcService.getComprobantesModalidad();
        const modalidades =
          result.ComprobantesModalidadConsultarResult.ResultGet?.FacModTipo ?? [];
        expect(modalidades.map((m) => m.Cod)).toContain("CAE");
      });

      it("getComprobantesTipo incluye Factura A", async () => {
        const result = await arca.wscdcService.getComprobantesTipo();
        const tipos =
          result.ComprobantesTipoConsultarResult.ResultGet?.CbteTipo ?? [];
        expect(tipos.map((t) => t.Id)).toContain(1);
      });

      it("getDocumentosTipo incluye CUIT", async () => {
        const result = await arca.wscdcService.getDocumentosTipo();
        const tipos =
          result.DocumentosTipoConsultarResult.ResultGet?.DocTipo ?? [];
        expect(tipos.map((t) => t.Id)).toContain("80");
      });

      it("getOpcionalesTipo devuelve resultado definido", async () => {
        // En homologación puede no haber opcionales (error 503 "Sin Resultados").
        const result = await arca.wscdcService.getOpcionalesTipo();
        expect(result.OpcionalesTipoConsultarResult).toBeDefined();
      });
    });

    describe("constatarComprobante", () => {
      it("rechaza un comprobante con CAE inexistente", async () => {
        const result = await arca.wscdcService.constatarComprobante({
          CmpReq: {
            CbteModo: "CAE",
            CuitEmisor: getTestCuit(),
            PtoVta: 1,
            CbteTipo: 11,
            CbteNro: 1,
            CbteFch: "20260901",
            ImpTotal: 100,
            CodAutorizacion: "76123456789012",
            DocTipoReceptor: "99",
            DocNroReceptor: "0",
          },
        });

        const constatacion = result.ComprobanteConstatarResult;
        expect(constatacion.Resultado).toBe("R");
        const codes = (constatacion.Observaciones?.Obs ?? []).map((o) => o.Code);
        expect(codes).toContain(WSCDC_CAE_INEXISTENTE);
      });

      it("aprueba el último comprobante autorizado por WSFE", async () => {
        const { nro: ptoVta } = await resolveHomologationPuntoVenta(arca);
        const eb = arca.electronicBillingService;

        for (const cbteTipo of [1, 6, 11]) {
          const last = await eb.getLastVoucher(ptoVta, cbteTipo);
          if (!last.cbteNro) continue;

          const info = await eb.getVoucherInfo(last.cbteNro, ptoVta, cbteTipo);
          if (
            !info?.codAutorizacion ||
            info.resultado !== "A" ||
            !info.cbteFch ||
            info.impTotal === undefined
          ) {
            continue;
          }

          const result = await arca.wscdcService.constatarComprobante({
            CmpReq: {
              CbteModo: info.emisionTipo ?? "CAE",
              CuitEmisor: getTestCuit(),
              PtoVta: ptoVta,
              CbteTipo: cbteTipo,
              CbteNro: last.cbteNro,
              CbteFch: info.cbteFch,
              ImpTotal: info.impTotal,
              CodAutorizacion: info.codAutorizacion,
              DocTipoReceptor: String(info.docTipo),
              DocNroReceptor: String(info.docNro),
            },
          });

          expect(result.ComprobanteConstatarResult.Resultado).toBe("A");
          return;
        }

        console.info(
          `WSCDC: sin comprobantes autorizados en el punto de venta ${ptoVta}; se omite la constatación aprobada`,
        );
      });
    });
  },
);

if (!enableIntegration) {
  console.info("Omitiendo tests WSCDC: ENABLE_INTEGRATION_TESTS=true");
}
