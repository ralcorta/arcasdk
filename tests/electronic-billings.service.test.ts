import { data } from "./mocks/data/voucher";
import { Afip } from "../src/afip";
import { testConfigUtil } from "./utils/config";

describe("Services Test", () => {
  const cuit = process.env.CUIT as string;

  let key: string;
  let cert: string;
  let afip: Afip;

  beforeAll(() => {
    key = testConfigUtil.getKey();
    cert = testConfigUtil.getCert();
    afip = new Afip({
      key,
      cert,
      cuit: parseInt(cuit),
    });
  });

  describe("Electronic Billings - createVoucher", () => {
    describe("Method Test - createVoucher", () => {
      it("should create a voucher from correct params", async () => {
        const { electronicBillingService } = afip;
        const lastVoucher = await electronicBillingService.getLastVoucher(
          2,
          11
        );
        console.dir(lastVoucher, { depth: 50 });
        const voucher = await electronicBillingService.createVoucher({
          ...data,
          CbteDesde: lastVoucher.CbteNro + 1,
          CbteHasta: lastVoucher.CbteNro + 1,
        });
        console.dir(voucher, { depth: 50 });
        expect(voucher).not.toBeNull();
      });
    });

    // describe("Method Test - getLastVoucher", () => {
    //   it("should get last voucher created", async () => {
    //     const voucher = await afip.electronicBillingService.getLastVoucher(
    //       2,
    //       11
    //     );
    //     console.dir(voucher, { depth: 50 });
    //     expect(voucher).not.toBeNull();
    //   });
    // });

    // describe("Method Test - getTaxTypes", () => {
    //   it("should get all tax types", async () => {
    //     const types = await afip.electronicBillingService.getTaxTypes();
    //     console.dir(types, { depth: 50 });
    //     expect(types).not.toBeNull();
    //   });
    // });
  });
});
