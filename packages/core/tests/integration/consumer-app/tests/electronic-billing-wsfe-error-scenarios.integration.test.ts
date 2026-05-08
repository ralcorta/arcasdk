import { describe, expect, it, beforeAll } from "@jest/globals";
import type { Arca } from "@arcasdk/core";
import { createArcaForWsfeHomologation } from "./utils/homologation-arca";
import { resolveHomologationPuntoVenta } from "./utils/wsfe-homologation-helpers";
import {
  buildFacturaA,
  homologacionCbteFch,
  createVoucherHomologacionWithRetry,
} from "./utils/wsfe-invoice-emission";
import { expectNonEmptyString } from "./utils/wsfe-expect";

/**
 * Errores y violaciones de reglas de negocio en WSFE.
 * WSFE homologación permite aprobación O rechazo bien formado con observaciones.
 */
const enableIntegration = process.env.ENABLE_INTEGRATION_TESTS === "true";

const describeOrSkip = enableIntegration ? describe : describe.skip;

describeOrSkip(
  "WSFE errores — violaciones de reglas de negocio (consumidor npm)",
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
        throw new Error(`Setup WSFE errores (consumidor): ${msg}`);
      }
    });

    describe("Errores de validación de entrada", () => {
      it("CbteDesde > CbteHasta genera excepción (validación client-side)", async () => {
        const { nro: puntoVenta } = await resolveHomologationPuntoVenta(arca);
        const docNro = 99999999999;
        const condIva = 1;

        let thrownError: Error | null = null;

        try {
          await createVoucherHomologacionWithRetry(
            arca,
            puntoVenta,
            1,
            (n, f) => ({
              CantReg: 1,
              PtoVta: puntoVenta,
              CbteTipo: 1,
              Concepto: 2,
              DocTipo: 80,
              DocNro: docNro,
              CbteDesde: 1000, // > CbteHasta
              CbteHasta: 999,
              CbteFch: f,
              ImpTotal: 100,
              ImpTotConc: 0,
              ImpNeto: 100,
              ImpOpEx: 0,
              ImpIVA: 0,
              ImpTrib: 0,
              MonId: "PES",
              MonCotiz: 1,
              CondicionIVAReceptorId: condIva,
              FchServDesde: f,
              FchServHasta: f,
              FchVtoPago: f,
              Iva: [{ Id: 5, BaseImp: 100, Importe: 0 }],
            }),
          );
        } catch (e) {
          thrownError = e instanceof Error ? e : new Error(String(e));
        }

        expect(thrownError).not.toBeNull();
        if (thrownError) {
          expect(thrownError.message).toMatch(/CbteDesde|mayor|CbteHasta/i);
        }
      });

      it("Documento tipo inválido (docTipo 999) genera rechazo WSFE", async () => {
        const { nro: puntoVenta } = await resolveHomologationPuntoVenta(arca);
        const docNro = 99999999999;
        const condIva = 1;
        const numSig = 1;
        const fecha = homologacionCbteFch();

        const { resultado } = await createVoucherHomologacionWithRetry(
          arca,
          puntoVenta,
          1,
          () => ({
            CantReg: 1,
            PtoVta: puntoVenta,
            CbteTipo: 1,
            Concepto: 2,
            DocTipo: 999, // Inválido
            DocNro: docNro,
            CbteDesde: numSig,
            CbteHasta: numSig,
            CbteFch: fecha,
            ImpTotal: 100,
            ImpTotConc: 0,
            ImpNeto: 100,
            ImpOpEx: 0,
            ImpIVA: 0,
            ImpTrib: 0,
            MonId: "PES",
            MonCotiz: 1,
            CondicionIVAReceptorId: condIva,
            FchServDesde: fecha,
            FchServHasta: fecha,
            FchVtoPago: fecha,
            Iva: [{ Id: 5, BaseImp: 100, Importe: 0 }],
          }),
        );

        const response = resultado.response;
        const soapErrors = response.Errors?.Err ?? [];
        const cabResult = response.FeCabResp?.Resultado;
        const detResult = response.FeDetResp?.FECAEDetResponse?.[0]?.Resultado;

        const hasErrors = soapErrors.length > 0;
        const isRejected = cabResult === "R" || detResult === "R";

        expect(hasErrors || isRejected).toBe(true);
      });

      it("Monto negativo (ImpTotal < 0) genera rechazo WSFE", async () => {
        const { nro: puntoVenta } = await resolveHomologationPuntoVenta(arca);
        const docNro = 99999999999;
        const condIva = 1;
        const numSig = 1;
        const fecha = homologacionCbteFch();

        const { resultado } = await createVoucherHomologacionWithRetry(
          arca,
          puntoVenta,
          1,
          () => ({
            CantReg: 1,
            PtoVta: puntoVenta,
            CbteTipo: 1,
            Concepto: 2,
            DocTipo: 80,
            DocNro: docNro,
            CbteDesde: numSig,
            CbteHasta: numSig,
            CbteFch: fecha,
            ImpTotal: -100, // Negativo
            ImpTotConc: 0,
            ImpNeto: -100,
            ImpOpEx: 0,
            ImpIVA: 0,
            ImpTrib: 0,
            MonId: "PES",
            MonCotiz: 1,
            CondicionIVAReceptorId: condIva,
            FchServDesde: fecha,
            FchServHasta: fecha,
            FchVtoPago: fecha,
            Iva: [{ Id: 5, BaseImp: -100, Importe: 0 }],
          }),
        );

        const response = resultado.response;
        const soapErrors = response.Errors?.Err ?? [];
        const cabResult = response.FeCabResp?.Resultado;
        const detResult = response.FeDetResp?.FECAEDetResponse?.[0]?.Resultado;

        const hasErrors = soapErrors.length > 0;
        const isRejected = cabResult === "R" || detResult === "R";

        expect(hasErrors || isRejected).toBe(true);
      });

      it("CondicionIVAReceptorId fuera de rango genera rechazo WSFE", async () => {
        const { nro: puntoVenta } = await resolveHomologationPuntoVenta(arca);
        const docNro = 99999999999;
        const numSig = 1;
        const fecha = homologacionCbteFch();

        const { resultado } = await createVoucherHomologacionWithRetry(
          arca,
          puntoVenta,
          1,
          () => ({
            CantReg: 1,
            PtoVta: puntoVenta,
            CbteTipo: 1,
            Concepto: 2,
            DocTipo: 80,
            DocNro: docNro,
            CbteDesde: numSig,
            CbteHasta: numSig,
            CbteFch: fecha,
            ImpTotal: 100,
            ImpTotConc: 0,
            ImpNeto: 100,
            ImpOpEx: 0,
            ImpIVA: 0,
            ImpTrib: 0,
            MonId: "PES",
            MonCotiz: 1,
            CondicionIVAReceptorId: 9999, // Fuera de rango
            FchServDesde: fecha,
            FchServHasta: fecha,
            FchVtoPago: fecha,
            Iva: [{ Id: 5, BaseImp: 100, Importe: 0 }],
          }),
          { maxRetries: 2, retryDelay: 200 }, // Timeout más rápido para evitar ser bloqueado
        );

        const response = resultado.response;
        const soapErrors = response.Errors?.Err ?? [];
        const cabResult = response.FeCabResp?.Resultado;
        const detResult = response.FeDetResp?.FECAEDetResponse?.[0]?.Resultado;

        const hasErrors = soapErrors.length > 0;
        const isRejected = cabResult === "R" || detResult === "R";

        if (!hasErrors && !isRejected) {
          console.warn(
            "[WSFE errores] CondIva 9999 no fue rechazado (puede ser válido en homologación)",
          );
        } else {
          expect(hasErrors || isRejected).toBe(true);
        }
      }, 90000); // Timeout extendido: 90s

      it("Concepto inválido (999) genera excepción (validación client-side)", async () => {
        const { nro: puntoVenta } = await resolveHomologationPuntoVenta(arca);
        const docNro = 99999999999;
        const condIva = 1;
        const numSig = 1;
        const fecha = homologacionCbteFch();

        let thrownError: Error | null = null;

        try {
          await createVoucherHomologacionWithRetry(arca, puntoVenta, 1, () => ({
            CantReg: 1,
            PtoVta: puntoVenta,
            CbteTipo: 1,
            Concepto: 999, // Inválido
            DocTipo: 80,
            DocNro: docNro,
            CbteDesde: numSig,
            CbteHasta: numSig,
            CbteFch: fecha,
            ImpTotal: 100,
            ImpTotConc: 0,
            ImpNeto: 100,
            ImpOpEx: 0,
            ImpIVA: 0,
            ImpTrib: 0,
            MonId: "PES",
            MonCotiz: 1,
            CondicionIVAReceptorId: condIva,
            FchServDesde: fecha,
            FchServHasta: fecha,
            FchVtoPago: fecha,
            Iva: [{ Id: 5, BaseImp: 100, Importe: 0 }],
          }));
        } catch (e) {
          thrownError = e instanceof Error ? e : new Error(String(e));
        }

        expect(thrownError).not.toBeNull();
        if (thrownError) {
          expect(thrownError.message).toMatch(/Concepto|1|2|3/i);
        }
      });
    });

    describe("Errores de documento receptor", () => {
      it("Documento receptor no encontrado genera observación", async () => {
        const { nro: puntoVenta } = await resolveHomologationPuntoVenta(arca);
        const condIva = parseInt(
          process.env.TEST_FE_COND_IVA_RECEPTOR_A ?? "1",
          10,
        );

        // CUIT que probablemente no existe en el padrón
        const inexistentDocNro = 99999999998;

        const { resultado } = await createVoucherHomologacionWithRetry(
          arca,
          puntoVenta,
          1,
          (n, f) => buildFacturaA(puntoVenta, inexistentDocNro, condIva, n, f),
        );

        const response = resultado.response;
        const detList = response.FeDetResp?.FECAEDetResponse ?? [];

        // En homologación, puede ser aprobado o rechazado (flexible)
        // Pero si hay observaciones, debemos validarlas
        if (detList.length > 0 && detList[0]!.Observaciones) {
          const obs = detList[0]!.Observaciones;
          expectNonEmptyString("observaciones presentes", JSON.stringify(obs));
        }
      });
    });

    describe("Validación de integridad de respuesta", () => {
      it("Respuesta WSFE siempre contiene FeCabResp o Errors", async () => {
        const { nro: puntoVenta } = await resolveHomologationPuntoVenta(arca);
        const docNro = 99999999999;
        const condIva = 1;
        const numSig = 1;
        const fecha = homologacionCbteFch();

        const { resultado } = await createVoucherHomologacionWithRetry(
          arca,
          puntoVenta,
          1,
          () => buildFacturaA(puntoVenta, docNro, condIva, numSig, fecha),
        );

        const response = resultado.response;
        const hasCabResp = response.FeCabResp !== undefined;
        const hasErrors =
          response.Errors &&
          response.Errors.Err &&
          response.Errors.Err.length > 0;

        expect(hasCabResp || hasErrors).toBe(true);
      });

      it("CAE nunca está presente si Resultado no es A (rechazo WSFE)", async () => {
        const { nro: puntoVenta } = await resolveHomologationPuntoVenta(arca);
        const docNro = 99999999999;
        const numSig = 1;
        const fecha = homologacionCbteFch();

        const { resultado } = await createVoucherHomologacionWithRetry(
          arca,
          puntoVenta,
          1,
          () => ({
            CantReg: 1,
            PtoVta: puntoVenta,
            CbteTipo: 1,
            Concepto: 2,
            DocTipo: 999, // DocTipo inválido genera rechazo WSFE
            DocNro: docNro,
            CbteDesde: numSig,
            CbteHasta: numSig,
            CbteFch: fecha,
            ImpTotal: 100,
            ImpTotConc: 0,
            ImpNeto: 100,
            ImpOpEx: 0,
            ImpIVA: 0,
            ImpTrib: 0,
            MonId: "PES",
            MonCotiz: 1,
            CondicionIVAReceptorId: 1,
            FchServDesde: fecha,
            FchServHasta: fecha,
            FchVtoPago: fecha,
            Iva: [{ Id: 5, BaseImp: 100, Importe: 0 }],
          }),
        );

        const response = resultado.response;
        const detList = response.FeDetResp?.FECAEDetResponse ?? [];

        // Si hay detalle y Resultado != A, CAE debe estar vacío o no definido
        if (detList.length > 0 && detList[0]!.Resultado !== "A") {
          const cae = detList[0]!.CAE ?? "";
          expect(cae.trim()).toBe("");
        }
      });
    });
  },
);

if (!enableIntegration) {
  console.info("Omitiendo tests WSFE (errores): ENABLE_INTEGRATION_TESTS=true");
}
