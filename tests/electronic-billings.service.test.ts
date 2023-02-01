import { resolve } from "path";
import { data } from "./mock-data/voucher";
import { Afip } from "../src/afip";
import fs from "fs";

describe("Services Test", () => {
  if (!process.env.CUIT) throw new Error("Add CUIT env.");

  const key = fs.readFileSync(
    resolve(__dirname, "test-files/afip_test_private_key.key"),
    {
      encoding: "utf8",
    }
  );

  const cert = fs.readFileSync(resolve(__dirname, "test-files/cert_test.crt"), {
    encoding: "utf8",
  });

  let afip: Afip = new Afip({
    key,
    cert,
    cuit: parseInt(process.env.CUIT),
  });

  beforeAll(async () => {});
  afterAll(async () => {});
  describe("Electronic Billings - createVoucher", () => {
    describe("Method Test - createVoucher", () => {
      it("should create a voucher from correct params", async () => {
        const lastVaucher = await afip.electronicBillingService.getLastVoucher(
          2,
          11
        );
        const voucher = await afip.electronicBillingService.createVoucher({
          ...data,
          CbteDesde: lastVaucher.CbteNro + 1,
          CbteHasta: lastVaucher.CbteNro + 1,
        });
        console.dir(voucher, { depth: 50 });
        expect(voucher).not.toBeNull();
      });
    });

    describe("Method Test - getLastVoucher", () => {
      it("should get last voucher created", async () => {
        const voucher = await afip.electronicBillingService.getLastVoucher(
          2,
          11
        );
        console.dir(voucher, { depth: 50 });
        expect(voucher).not.toBeNull();
      });
    });

    describe("Method Test - getTaxTypes", () => {
      it("should get all tax types", async () => {
        const types = await afip.electronicBillingService.getTaxTypes();
        console.dir(types, { depth: 50 });
        expect(types).not.toBeNull();
      });
    });
  });
});
