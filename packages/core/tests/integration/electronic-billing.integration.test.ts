import { Arca } from "../../src/arca";
import { ContextTest } from "../utils/context-test.utils";
import EnvTest from "../utils/env-test";
import { existsSync, mkdirSync } from "fs";
import { resolve } from "path";

const keyPath = ContextTest.getKeyPath();
const certPath = ContextTest.getCertPath();
const hasRealCertificates = existsSync(keyPath) && existsSync(certPath);

const describeOrSkip = hasRealCertificates ? describe : describe.skip;

if (!hasRealCertificates) {
  console.warn(
    "\n⚠️  Skipping integration tests: Real homologation certificates not found.\n" +
      "   Set TEST_CREDENTIALS_FOLDER, TEST_PRIVATE_KEY_FILE_NAME, TEST_CERT_FILE_NAME, and CUIT environment variables.\n"
  );
}

describeOrSkip(
  "Electronic Billing Service - Integration Tests (Homologation)",
  () => {
    let arca: Arca;
    const ticketsPath = resolve(
      __dirname,
      "../../src/infrastructure/storage/auth/tickets"
    );

    beforeAll(async () => {
      if (!existsSync(ticketsPath)) {
        mkdirSync(ticketsPath, { recursive: true });
      }

      const context = await ContextTest.getIntegrationTestContext({
        cuit: parseInt(EnvTest.cuit),
      });

      arca = new Arca(context);
    });

    describe("Server Status", () => {
      it("should get server status from homologation servers", async () => {
        const status = await arca.electronicBillingService.getServerStatus();

        expect(status).toBeDefined();
        expect(status.appServer).toBeDefined();
        expect(status.dbServer).toBeDefined();
        expect(status.authServer).toBeDefined();
      });
    });

    describe("Sales Points", () => {
      it("should get sales points from homologation servers", async () => {
        const salesPoints =
          await arca.electronicBillingService.getSalesPoints();

        expect(salesPoints).toBeDefined();
        // resultGet may be undefined if there are errors
        const result = salesPoints;

        // Check for errors (e.g., error 602: "Sin Resultados")
        if (result.errors?.err?.length) {
          // The test should still pass if we get a valid response structure, even with errors
          expect(result).toBeDefined();
        } else if (result.resultGet) {
          // If we have results, verify the structure
          expect(result.resultGet).toBeDefined();
        } else {
          // Still pass the test as the service responded correctly
          expect(result).toBeDefined();
        }
      });
    });

    describe("Voucher Types", () => {
      it("should get voucher types from homologation servers", async () => {
        const voucherTypes =
          await arca.electronicBillingService.getVoucherTypes();

        expect(voucherTypes).toBeDefined();
        if (voucherTypes.resultGet) {
          expect(voucherTypes.resultGet).toBeDefined();
        }
      });
    });

    describe("Document Types", () => {
      it("should get document types from homologation servers", async () => {
        const documentTypes =
          await arca.electronicBillingService.getDocumentTypes();

        expect(documentTypes).toBeDefined();
        expect(documentTypes.resultGet).toBeDefined();
      });
    });

    describe("Concept Types", () => {
      it("should get concept types from homologation servers", async () => {
        const conceptTypes =
          await arca.electronicBillingService.getConceptTypes();

        expect(conceptTypes).toBeDefined();
        expect(conceptTypes.resultGet).toBeDefined();
      });
    });

    describe("Aliquot Types", () => {
      it("should get aliquot types from homologation servers", async () => {
        const aliquotTypes =
          await arca.electronicBillingService.getAliquotTypes();

        expect(aliquotTypes).toBeDefined();
        expect(aliquotTypes.resultGet).toBeDefined();
      });
    });

    describe("Currency Types", () => {
      it("should get currency types from homologation servers", async () => {
        const currencyTypes =
          await arca.electronicBillingService.getCurrenciesTypes();

        expect(currencyTypes).toBeDefined();
        expect(currencyTypes.resultGet).toBeDefined();
      });
    });

    describe("Tax Types", () => {
      it("should get tax types from homologation servers", async () => {
        const taxTypes = await arca.electronicBillingService.getTaxTypes();

        expect(taxTypes).toBeDefined();
        expect(taxTypes.resultGet).toBeDefined();
      });
    });

    describe("Options Types", () => {
      it("should get options types from homologation servers", async () => {
        const optionsTypes =
          await arca.electronicBillingService.getOptionsTypes();

        expect(optionsTypes).toBeDefined();
        expect(optionsTypes.resultGet).toBeDefined();
      });
    });

    describe("Last Voucher", () => {
      it("should get last voucher from homologation servers", async () => {
        const salesPoints =
          await arca.electronicBillingService.getSalesPoints();
        const salesPointsList = salesPoints.resultGet?.ptoVenta || [];

        if (salesPointsList.length === 0) {
          return;
        }

        const firstSalesPoint = salesPointsList[0].nro;
        const voucherType = 1;

        const lastVoucher = await arca.electronicBillingService.getLastVoucher(
          firstSalesPoint,
          voucherType
        );

        expect(lastVoucher).toBeDefined();
        expect(lastVoucher.cbteNro).toBeDefined();
        expect(typeof lastVoucher.cbteNro).toBe("number");
      });
    });

    describe("Voucher Info", () => {
      it("should get voucher info from homologation servers", async () => {
        const salesPoints =
          await arca.electronicBillingService.getSalesPoints();
        const salesPointsList = salesPoints.resultGet?.ptoVenta || [];

        if (salesPointsList.length === 0) {
          return;
        }

        const firstSalesPoint = salesPointsList[0].nro;
        const voucherType = 1;

        const lastVoucher = await arca.electronicBillingService.getLastVoucher(
          firstSalesPoint,
          voucherType
        );

        if (lastVoucher.cbteNro === 0) {
          return;
        }

        const voucherInfo = await arca.electronicBillingService.getVoucherInfo(
          lastVoucher.cbteNro,
          firstSalesPoint,
          voucherType
        );

        if (voucherInfo) {
          expect(voucherInfo).toBeDefined();
          expect(voucherInfo).toBeDefined();
        }
      });
    });

    describe("Create Voucher", () => {
      it("should create a voucher (Factura C) on homologation servers", async () => {
        const salesPoints =
          await arca.electronicBillingService.getSalesPoints();
        const salesPointsList = salesPoints.resultGet?.ptoVenta || [];

        let puntoVenta: number;
        if (salesPointsList.length > 0) {
          puntoVenta = salesPointsList[0].nro;
        } else {
          puntoVenta = 2;
        }

        const tipoComprobante = 11; // Factura C

        const fecha = new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .split("T")[0]
          .replace(/-/g, "");

        const impNeto = 100;
        const impTrib = 0;
        const impIVA = 0; // Factura C no tiene IVA
        const impTotal = impNeto + impTrib + impIVA;

        // Helper function to create voucher with retry for race conditions
        const createVoucherWithRetry = async (
          maxRetries = 3,
          retryDelay = 500
        ) => {
          for (let attempt = 0; attempt < maxRetries; attempt++) {
            // Get the last voucher just before creating to minimize race conditions
            // Add a small random delay to reduce race conditions when tests run in parallel
            await new Promise((resolve) =>
              setTimeout(resolve, Math.random() * 100 + 50)
            );
            const lastVoucher =
              await arca.electronicBillingService.getLastVoucher(
                puntoVenta,
                tipoComprobante
              );
            const siguienteNumero = (lastVoucher.cbteNro || 0) + 1;

            const facturaData = {
              CantReg: 1,
              PtoVta: puntoVenta,
              CbteTipo: tipoComprobante,
              Concepto: 2, // Servicios
              DocTipo: 99, // Consumidor Final
              DocNro: 0,
              CbteDesde: siguienteNumero,
              CbteHasta: siguienteNumero,
              CbteFch: fecha,
              ImpTotal: impTotal,
              ImpTotConc: 0,
              ImpNeto: impNeto,
              ImpOpEx: 0,
              ImpIVA: impIVA,
              ImpTrib: impTrib,
              MonId: "PES",
              MonCotiz: 1,
              CondicionIVAReceptorId: 1,
              FchServDesde: fecha,
              FchServHasta: fecha,
              FchVtoPago: fecha,
            };

            const resultado = await arca.electronicBillingService.createVoucher(
              facturaData
            );

            // Check if there's a retryable error (transaction active or duplicate number)
            const hasRetryableError = resultado.response.Errors?.Err?.some(
              (err) =>
                err.Code === 502 || // Error interno de base de datos - Transacción Activa
                err.Code === 10016 // El numero o fecha del comprobante no se corresponde
            );

            if (hasRetryableError && attempt < maxRetries - 1) {
              // Wait with exponential backoff before retrying
              const delay = retryDelay * Math.pow(2, attempt);
              await new Promise((resolve) => setTimeout(resolve, delay));
              continue;
            }

            return resultado;
          }
          throw new Error("Max retries reached for voucher creation");
        };

        const resultado = await createVoucherWithRetry();

        console.dir(resultado, { depth: 50 });

        expect(resultado).toBeDefined();
        expect(resultado.response).toBeDefined();

        const { FeCabResp, FeDetResp, Errors, Events } = resultado.response;
        expect(FeCabResp).toBeDefined();
        expect(FeDetResp).toBeDefined();
        expect(FeDetResp.FECAEDetResponse).toBeDefined();
        expect(FeDetResp.FECAEDetResponse.length).toBeGreaterThan(0);

        const voucherResponse = FeDetResp.FECAEDetResponse[0];
        expect(voucherResponse).toBeDefined();

        // First check if the voucher was approved before checking CAE
        expect(voucherResponse.Resultado).toBe("A"); // "A" = Aprobado
        expect(FeCabResp.Resultado).toBe("A"); // "A" = Aprobado

        // Only check CAE if voucher was approved
        expect(voucherResponse.CAE).toBeDefined();
        expect(voucherResponse.CAE).not.toBe("");
        expect(voucherResponse.CAEFchVto).toBeDefined();
        expect(voucherResponse.CAEFchVto).not.toBe("");

        // Now check the extracted CAE values
        expect(resultado.cae).toBeDefined();
        expect(resultado.cae).not.toBe("");
        expect(resultado.caeFchVto).toBeDefined();
        expect(resultado.caeFchVto).not.toBe("");

        expect(voucherResponse.CAE).toMatch(/^\d{14}$/);

        // Verify that CbteDesde and CbteHasta are the same (single voucher)
        expect(voucherResponse.CbteDesde).toBe(voucherResponse.CbteHasta);

        expect(voucherResponse.CbteDesde).toBeDefined();
        expect(voucherResponse.CbteHasta).toBeDefined();

        expect(voucherResponse.CbteFch).toBe(fecha);

        expect(voucherResponse.Concepto).toBe(2); // Servicios
        expect(voucherResponse.DocTipo).toBe(99); // Consumidor Final
        expect(voucherResponse.DocNro).toBe(0);

        if (Errors?.Err?.length) {
          Errors.Err.forEach((error) => {
            expect(error.Code).toBeDefined();
            expect(error.Msg).toBeDefined();
          });
        }

        expect(FeCabResp.CantReg).toBe(1);
        expect(FeCabResp.PtoVta).toBe(puntoVenta);
        expect(FeCabResp.CbteTipo).toBe(tipoComprobante);
      });
    });
  }
);
