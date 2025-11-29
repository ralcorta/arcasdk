import { Arca } from "../../src/arca";
import { ArcaAuth } from "../../src/auth/arca-auth";
import { ServiceNamesEnum } from "../../src/soap/service-names.enum";
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
  "Electronic Billing Service - Integration Tests (Homologation) - Manual Token Management",
  () => {
    let arca: Arca;
    const ticketsPath = resolve(__dirname, "../../src/auth/tickets");

    beforeAll(async () => {
      if (!existsSync(ticketsPath)) {
        mkdirSync(ticketsPath, { recursive: true });
      }

      const context = await ContextTest.getIntegrationTestContext({
        cuit: parseInt(EnvTest.cuit),
        handleTicket: true,
      });

      arca = new Arca(context);

      const arcaAuth = new ArcaAuth(context);
      const existingTicket = await arcaAuth.getLocalAccessTicket(
        ServiceNamesEnum.WSFE
      );

      if (existingTicket && !existingTicket.isExpired()) {
        arca.electronicBillingService.setCredentials(existingTicket);
      } else {
        const ticket = await arca.electronicBillingService.login();
        arca.electronicBillingService.setCredentials(ticket);
      }
    });

    describe("Server Status", () => {
      it("should get server status from homologation servers", async () => {
        const status = await arca.electronicBillingService.getServerStatus();

        expect(status).toBeDefined();
        expect(status.FEDummyResult).toBeDefined();
        expect(status.FEDummyResult.AppServer).toBeDefined();
        expect(status.FEDummyResult.DbServer).toBeDefined();
        expect(status.FEDummyResult.AuthServer).toBeDefined();
      });
    });

    describe("Sales Points", () => {
      it("should get sales points from homologation servers", async () => {
        const salesPoints =
          await arca.electronicBillingService.getSalesPoints();

        expect(salesPoints).toBeDefined();
        expect(salesPoints.FEParamGetPtosVentaResult).toBeDefined();

        const result = salesPoints.FEParamGetPtosVentaResult;

        if (result.Errors?.Err?.length) {
          expect(result).toBeDefined();
        } else if (result.ResultGet) {
          expect(result.ResultGet).toBeDefined();
        } else {
          expect(result).toBeDefined();
        }
      });
    });

    describe("Voucher Types", () => {
      it("should get voucher types from homologation servers", async () => {
        const voucherTypes =
          await arca.electronicBillingService.getVoucherTypes();

        expect(voucherTypes).toBeDefined();
        if (voucherTypes.ResultGet) {
          expect(voucherTypes.ResultGet).toBeDefined();
        }
      });
    });

    describe("Document Types", () => {
      it("should get document types from homologation servers", async () => {
        const documentTypes =
          await arca.electronicBillingService.getDocumentTypes();

        expect(documentTypes).toBeDefined();
        expect(documentTypes.ResultGet).toBeDefined();
      });
    });

    describe("Concept Types", () => {
      it("should get concept types from homologation servers", async () => {
        const conceptTypes =
          await arca.electronicBillingService.getConceptTypes();

        expect(conceptTypes).toBeDefined();
        expect(conceptTypes.ResultGet).toBeDefined();
      });
    });

    describe("Aliquot Types", () => {
      it("should get aliquot types from homologation servers", async () => {
        const aliquotTypes =
          await arca.electronicBillingService.getAliquotTypes();

        expect(aliquotTypes).toBeDefined();
        expect(aliquotTypes.ResultGet).toBeDefined();
      });
    });

    describe("Currency Types", () => {
      it("should get currency types from homologation servers", async () => {
        const currencyTypes =
          await arca.electronicBillingService.getCurrenciesTypes();

        expect(currencyTypes).toBeDefined();
        expect(currencyTypes.ResultGet).toBeDefined();
      });
    });

    describe("Tax Types", () => {
      it("should get tax types from homologation servers", async () => {
        const taxTypes = await arca.electronicBillingService.getTaxTypes();

        expect(taxTypes).toBeDefined();
        expect(taxTypes.ResultGet).toBeDefined();
      });
    });

    describe("Options Types", () => {
      it("should get options types from homologation servers", async () => {
        const optionsTypes =
          await arca.electronicBillingService.getOptionsTypes();

        expect(optionsTypes).toBeDefined();
        expect(optionsTypes.ResultGet).toBeDefined();
      });
    });

    describe("Last Voucher", () => {
      it("should get last voucher from homologation servers", async () => {
        const salesPoints =
          await arca.electronicBillingService.getSalesPoints();
        const salesPointsList =
          salesPoints.FEParamGetPtosVentaResult?.ResultGet?.PtoVenta || [];

        if (salesPointsList.length === 0) {
          console.warn("No sales points available for testing");
          return;
        }

        const firstSalesPoint = salesPointsList[0].Nro;
        const voucherType = 1;

        const lastVoucher = await arca.electronicBillingService.getLastVoucher(
          firstSalesPoint,
          voucherType
        );

        expect(lastVoucher).toBeDefined();
        expect(lastVoucher.CbteNro).toBeDefined();
        expect(typeof lastVoucher.CbteNro).toBe("number");
      });
    });

    describe("Voucher Info", () => {
      it("should get voucher info from homologation servers", async () => {
        const salesPoints =
          await arca.electronicBillingService.getSalesPoints();
        const salesPointsList =
          salesPoints.FEParamGetPtosVentaResult?.ResultGet?.PtoVenta || [];

        if (salesPointsList.length === 0) {
          return;
        }

        const firstSalesPoint = salesPointsList[0].Nro;
        const voucherType = 1;

        const lastVoucher = await arca.electronicBillingService.getLastVoucher(
          firstSalesPoint,
          voucherType
        );

        if (lastVoucher.CbteNro === 0) {
          return;
        }

        const voucherInfo = await arca.electronicBillingService.getVoucherInfo(
          lastVoucher.CbteNro,
          firstSalesPoint,
          voucherType
        );

        if (voucherInfo) {
          expect(voucherInfo).toBeDefined();
          expect(voucherInfo.ResultGet).toBeDefined();
        }
      });
    });

    describe("Create Voucher", () => {
      it("should create a voucher (Factura C) on homologation servers", async () => {
        const salesPoints =
          await arca.electronicBillingService.getSalesPoints();
        const salesPointsList =
          salesPoints.FEParamGetPtosVentaResult?.ResultGet?.PtoVenta || [];

        let puntoVenta: number;
        if (salesPointsList.length > 0) {
          puntoVenta = salesPointsList[0].Nro;
        } else {
          puntoVenta = 2;
        }

        const tipoComprobante = 11; // Factura C
        const lastVoucher = await arca.electronicBillingService.getLastVoucher(
          puntoVenta,
          tipoComprobante
        );
        const siguienteNumero = (lastVoucher.CbteNro || 0) + 1;

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

        expect(resultado).toBeDefined();
        expect(resultado.response).toBeDefined();
        expect(resultado.cae).toBeDefined();
        expect(resultado.cae).not.toBe("");
        expect(resultado.caeFchVto).toBeDefined();
        expect(resultado.caeFchVto).not.toBe("");

        const { FeCabResp, FeDetResp, Errors, Events } = resultado.response;
        expect(FeCabResp).toBeDefined();
        expect(FeDetResp).toBeDefined();
        expect(FeDetResp.FECAEDetResponse).toBeDefined();
        expect(FeDetResp.FECAEDetResponse.length).toBeGreaterThan(0);

        const voucherResponse = FeDetResp.FECAEDetResponse[0];
        expect(voucherResponse).toBeDefined();
        expect(voucherResponse.Resultado).toBe("A"); // "A" = Aprobado
        expect(voucherResponse.CAE).toBeDefined();
        expect(voucherResponse.CAE).not.toBe("");
        expect(voucherResponse.CAEFchVto).toBeDefined();
        expect(voucherResponse.CAEFchVto).not.toBe("");

        expect(voucherResponse.CAE).toMatch(/^\d{14}$/);

        expect(voucherResponse.CbteDesde).toBe(siguienteNumero);
        expect(voucherResponse.CbteHasta).toBe(siguienteNumero);

        expect(voucherResponse.CbteDesde).toBeDefined();
        expect(voucherResponse.CbteHasta).toBeDefined();

        expect(voucherResponse.CbteFch).toBe(fecha);

        expect(voucherResponse.Concepto).toBe(facturaData.Concepto);
        expect(voucherResponse.DocTipo).toBe(facturaData.DocTipo);
        expect(voucherResponse.DocNro).toBe(facturaData.DocNro);

        if (Errors?.Err?.length) {
          Errors.Err.forEach((error) => {
            expect(error.Code).toBeDefined();
            expect(error.Msg).toBeDefined();
          });
        }

        expect(FeCabResp.CantReg).toBe(1);
        expect(FeCabResp.Resultado).toBe("A"); // "A" = Aprobado
        expect(FeCabResp.PtoVta).toBe(puntoVenta);
        expect(FeCabResp.CbteTipo).toBe(tipoComprobante);
      });
    });
  }
);
