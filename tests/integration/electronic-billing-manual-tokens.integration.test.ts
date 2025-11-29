import { Arca } from "../../src/arca";
import { FileSystemTicketStorageAdapter } from "../../src/infrastructure/outbound/adapters/storage/file-system-ticket-storage.adapter";
import { ServiceNamesEnum } from "../../src/infrastructure/outbound/ports/soap/enums/service-names.enum";
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
    const ticketsPath = resolve(
      __dirname,
      "../../src/infrastructure/storage/auth/tickets"
    );

    beforeAll(async () => {
      if (!existsSync(ticketsPath)) {
        mkdirSync(ticketsPath, { recursive: true });
      }

      const cuit = parseInt(EnvTest.cuit);
      const ticketStorage = new FileSystemTicketStorageAdapter({
        ticketPath: ticketsPath,
        cuit,
        production: false,
      });

      // Try to get existing ticket from storage
      let existingTicket = await ticketStorage.get(ServiceNamesEnum.WSFE);

      // If no valid ticket exists, create one using auto mode first
      if (!existingTicket || existingTicket.isExpired()) {
        const autoContext = await ContextTest.getIntegrationTestContext({
          cuit,
          handleTicket: false,
          ticketPath: ticketsPath,
        });
        const autoArca = new Arca(autoContext);
        // Trigger login by calling a service method (this will save the ticket)
        await autoArca.electronicBillingService.getServerStatus();
        // Get the newly saved ticket
        existingTicket = await ticketStorage.get(ServiceNamesEnum.WSFE);
      }

      // Create context with manual ticket management using the ticket we found/saved
      const context = await ContextTest.getIntegrationTestContext({
        cuit,
        handleTicket: true,
        credentials: existingTicket
          ? existingTicket.getCredentials()
          : undefined,
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
        expect(salesPoints.resultGet).toBeDefined();

        const result = salesPoints;

        if (result.errors?.err?.length) {
          expect(result).toBeDefined();
        } else if (result.resultGet) {
          expect(result.resultGet).toBeDefined();
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
          console.warn("No sales points available for testing");
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
          expect(voucherInfo.resultGet).toBeDefined();
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
        const lastVoucher = await arca.electronicBillingService.getLastVoucher(
          puntoVenta,
          tipoComprobante
        );
        const siguienteNumero = (lastVoucher.cbteNro || 0) + 1;

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
