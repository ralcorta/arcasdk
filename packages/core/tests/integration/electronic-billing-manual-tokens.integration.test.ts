import { Arca } from "../../src/arca";
import { AccessTicket } from "../../src/domain/entities/access-ticket.entity";
import { ServiceNamesEnum } from "../../src/infrastructure/outbound/ports/soap/enums/service-names.enum";
import { ContextTest } from "../utils/context-test.utils";
import EnvTest from "../utils/env-test";
import { existsSync, mkdirSync } from "fs";
import { promises as fs } from "fs";
import { resolve } from "path";
import { AuthRepository } from "../../src/infrastructure/outbound/adapters/auth/auth.repository";

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

    beforeAll(async () => {
      const cuit = parseInt(EnvTest.cuit);
      const production = false;
      const serviceName = ServiceNamesEnum.WSFE;
      const baseContext = await ContextTest.getIntegrationTestContext({
        cuit,
        production,
      });
      const ticketsPath = resolve(
        __dirname,
        "../../src/infrastructure/storage/auth/tickets"
      );

      if (!existsSync(ticketsPath)) mkdirSync(ticketsPath, { recursive: true });

      // Create ticket file name (same format as FileSystemTicketStorage)
      const ticketFileName = `TA-${cuit}-${serviceName}${
        production ? "-production" : ""
      }.json`;
      const ticketFilePath = resolve(ticketsPath, ticketFileName);

      let ticket: AccessTicket | null = null;

      if (existsSync(ticketFilePath)) {
        try {
          const fileData = await fs.readFile(ticketFilePath, "utf8");
          const ticketData = JSON.parse(fileData);
          ticket = AccessTicket.create(ticketData);
          if (ticket.isExpired()) ticket = null;
        } catch (error) {
          ticket = null;
        }
      }

      // If no valid ticket exists, get a new one and save it manually
      if (!ticket) {
        const authRepository = new AuthRepository({
          cert: baseContext.cert,
          key: baseContext.key,
          cuit: baseContext.cuit,
          production,
          handleTicket: false,
        });

        ticket = await authRepository.login(serviceName);

        if (!ticket) throw new Error("Failed to obtain access ticket");

        const ticketData = {
          header: ticket.getHeaders(),
          credentials: ticket.getCredentials(),
        };
        await fs.writeFile(
          ticketFilePath,
          JSON.stringify(ticketData, null, 2),
          "utf8"
        );
      }

      const context = await ContextTest.getIntegrationTestContext({
        cuit: parseInt(EnvTest.cuit),
        handleTicket: true,
        credentials: ticket.toLoginCredentials(),
      });

      arca = new Arca(context);
    });

    describe("Server Status", () => {
      it("should get server status from homologation servers", async () => {
        const status = await arca.electronicBillingService.getServerStatus();

        console.log("status", status);

        expect(status).toBeDefined();
        expect(status.appServer).toBeDefined();
        expect(status.dbServer).toBeDefined();
        expect(status.authServer).toBeDefined();
      });
    });

    describe("Sales Points", () => {
      it("should get sales points from homologation servers", async () => {
        const result = await arca.electronicBillingService.getSalesPoints();

        expect(result).toBeDefined();
        expect(result.resultGet).toBeDefined();

        console.log("result", result);

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
          expect(voucherInfo.codAutorizacion).toBeDefined();
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
