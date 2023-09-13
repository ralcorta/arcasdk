/* eslint-disable @typescript-eslint/no-explicit-any */
import { data } from "./mocks/data/voucher";
import { Afip } from "../src/afip";
import { TestConfigUtils } from "./utils/config";

describe("Services Test", () => {
  const cuit = process.env.CUIT as string;

  let key: string;
  let cert: string;
  let afip: Afip;

  beforeAll(() => {
    key = TestConfigUtils.getKey();
    cert = TestConfigUtils.getCert();
    afip = new Afip({
      key,
      cert,
      cuit: parseInt(cuit),
    });

    const clientMocked = jest.spyOn(afip.electronicBillingService, "getClient");
    clientMocked.mockReturnValue({
      FEDummyAsync: jest.fn().mockResolvedValue([
        {
          FEDummyResult: {
            AppServer: "OK",
            DbServer: "OK",
            AuthServer: "OK",
          },
        },
      ]),
      FEParamGetPtosVentaAsync: jest.fn().mockResolvedValue([{
        FEParamGetPtosVentaResult: {
          Errors: {
            Err: [
              {
                Code: 602,
                Msg: 'Sin Resultados: - Metodo FEParamGetPtosVenta'
              }
            ]
          }
        }
      }])
    } as any);
  });

  describe("Electronic Billings Service", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should get server status", async () => {
      const { electronicBillingService } = afip;
      const status = await electronicBillingService.getServerStatus();
      expect(status).toEqual({
        FEDummyResult: {
          AppServer: "OK",
          DbServer: "OK",
          AuthServer: "OK",
        },
      });
    });

    it("should get sales points", async () => {
      const { electronicBillingService } = afip;
      clientMocked.

      const status = await electronicBillingService.getSalesPoints();
      console.dir(status, { depth: 50 });
      expect(status).not.toBeNull();
    });

    xit("should create a voucher from correct params with createVoucher", async () => {
      const { electronicBillingService } = afip;
      const lastVoucher = await electronicBillingService.getLastVoucher(2, 11);
      console.dir(lastVoucher, { depth: 50 });
      const voucher = await electronicBillingService.createVoucher({
        ...data,
        CbteDesde: lastVoucher.CbteNro + 1,
        CbteHasta: lastVoucher.CbteNro + 1,
      });
      console.dir(voucher, { depth: 50 });
      expect(voucher).not.toBeNull();
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
