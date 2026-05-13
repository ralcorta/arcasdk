import { describe, expect, it, beforeAll } from "@jest/globals";
import type { Arca } from "@arcasdk/core";
import { createArcaForWsfecredHomologation } from "./utils/homologation-arca-register";

const enableIntegration = process.env.ENABLE_INTEGRATION_TESTS === "true";
const describeOrSkip = enableIntegration ? describe : describe.skip;

describeOrSkip(
  "WSFECred homologación — factura de crédito electrónica (consumidor npm)",
  () => {
    let arca: Arca;

    beforeAll(() => {
      arca = createArcaForWsfecredHomologation();
    });

    describe("consultarTiposRetenciones", () => {
      it("devuelve resultado definido", async () => {
        const result = await arca.wsfecredService.consultarTiposRetenciones();
        expect(result).toBeDefined();
        expect(result.consultarTiposRetencionesReturn).toBeDefined();
      });
    });

    describe("consultarTiposMotivosRechazo", () => {
      it("devuelve resultado definido", async () => {
        const result =
          await arca.wsfecredService.consultarTiposMotivosRechazo();
        expect(result).toBeDefined();
        expect(result.codigoDescripcionReturn).toBeDefined();
      });
    });

    describe("consultarTiposFormasCancelacion", () => {
      it("devuelve resultado definido", async () => {
        const result =
          await arca.wsfecredService.consultarTiposFormasCancelacion();
        expect(result).toBeDefined();
        expect(result.codigoDescripcionReturn).toBeDefined();
      });
    });

    describe("consultarTiposAjustesOperacion", () => {
      it("devuelve resultado definido", async () => {
        const result =
          await arca.wsfecredService.consultarTiposAjustesOperacion();
        expect(result).toBeDefined();
        expect(result.codigoDescripcionReturn).toBeDefined();
      });
    });

    describe("consultarCuentasEnAgtDptoCltv", () => {
      it("devuelve resultado definido", async () => {
        const result =
          await arca.wsfecredService.consultarCuentasEnAgtDptoCltv();
        expect(result).toBeDefined();
        expect(result.consultarCuentasEnAgtDptoCltvReturn).toBeDefined();
      });
    });

    describe("consultarObligadoRecepcion", () => {
      it("devuelve resultado definido para CUIT de test", async () => {
        const testCuit = parseInt(
          process.env.TEST_CUIT ?? process.env.CUIT ?? "20111111112",
          10,
        );
        const result = await arca.wsfecredService.consultarObligadoRecepcion({
          cuitConsultada: testCuit,
        } as never);
        expect(result).toBeDefined();
        expect(result.consultarObligadoRecepcionReturn).toBeDefined();
      });
    });

    describe("consultarMontoObligadoRecepcion", () => {
      it("devuelve resultado definido para CUIT de test", async () => {
        const testCuit = parseInt(
          process.env.TEST_CUIT ?? process.env.CUIT ?? "20111111112",
          10,
        );
        const result =
          await arca.wsfecredService.consultarMontoObligadoRecepcion({
            cuitConsultada: testCuit,
          } as never);
        expect(result).toBeDefined();
        expect(result.consultarMontoObligadoRecepcionReturn).toBeDefined();
      });
    });

    describe("consultarComprobantes", () => {
      it("devuelve resultado definido (consulta sin comprobantes)", async () => {
        const result = await arca.wsfecredService.consultarComprobantes({
          rolCUITRepresentada: "Emisor",
          CUITContraparte: 0,
          codTipoCmp: 0,
          estadoCmp: "Aceptado",
          fecha: { desde: "2024-01-01", hasta: "2024-01-02" },
          codCtaCte: 0,
          estadoCtaCte: "Aceptada",
          nroPagina: 1,
        } as never);
        expect(result).toBeDefined();
        expect(result.consultarCmpReturn).toBeDefined();
      });
    });

    describe("consultarCtasCtes", () => {
      it("devuelve resultado definido (consulta sin ctas ctes)", async () => {
        const result = await arca.wsfecredService.consultarCtasCtes({
          rolCUITRepresentada: "Emisor",
          CUITContraparte: 0,
          fecha: { desde: "2024-01-01", hasta: "2024-01-02" },
          estadoCtaCte: "Aceptada",
          nroPagina: 1,
          opcionTransferencia: "SCA",
        } as never);
        expect(result).toBeDefined();
        expect(result.consultarCtasCtesReturn).toBeDefined();
      });
    });
  },
);

if (!enableIntegration) {
  console.info("Omitiendo tests WSFECred: ENABLE_INTEGRATION_TESTS=true");
}
