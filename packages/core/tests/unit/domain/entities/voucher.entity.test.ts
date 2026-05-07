import { Voucher } from "@domain/entities/voucher.entity";
import { IVoucher } from "@domain/types/voucher.types";

describe("Voucher Entity", () => {
  const validVoucherData: IVoucher = {
    CantReg: 1,
    PtoVta: 1,
    CbteTipo: 1, // Factura A
    Concepto: 2,
    DocTipo: 80,
    DocNro: 20111111112,
    CbteDesde: 100,
    CbteHasta: 100,
    CbteFch: "20240507",
    ImpTotal: 121,
    ImpTotConc: 0,
    ImpNeto: 100,
    ImpOpEx: 0,
    ImpTrib: 0,
    ImpIVA: 21,
    MonId: "PES",
    MonCotiz: 1,
    CondicionIVAReceptorId: 1,
    FchServDesde: "20240507",
    FchServHasta: "20240507",
    FchVtoPago: "20240507",
    Iva: [{ Id: 5, BaseImp: 100, Importe: 21 }],
  };

  describe("create", () => {
    it("creates a valid voucher", () => {
      const voucher = Voucher.create(validVoucherData);
      expect(voucher).toBeDefined();
      expect(voucher.getPtoVta()).toBe(1);
      expect(voucher.getCbteTipo()).toBe(1);
    });

    it("throws error when CbteDesde > CbteHasta", () => {
      const invalidData = { ...validVoucherData, CbteDesde: 101, CbteHasta: 100 };
      expect(() => Voucher.create(invalidData)).toThrow(/CbteDesde|mayor/i);
    });

    it("throws error when CantReg is incorrect", () => {
      const invalidData = { ...validVoucherData, CantReg: 2 }; // Should be 1
      expect(() => Voucher.create(invalidData)).toThrow(/CantReg/i);
    });

    it("throws error when PtoVta is invalid", () => {
      const invalidData = { ...validVoucherData, PtoVta: 0 };
      expect(() => Voucher.create(invalidData)).toThrow(/Punto de venta/i);
    });

    it("throws error when ImpTotal calculation is wrong", () => {
      const invalidData = {
        ...validVoucherData,
        ImpTotal: 100, // Should be 121 (100 + 21)
      };
      expect(() => Voucher.create(invalidData)).toThrow(/ImpTotal/i);
    });

    it("throws error for Factura C with IVA", () => {
      const facturaCData = {
        ...validVoucherData,
        CbteTipo: 11, // Factura C
        ImpIVA: 21, // C should have 0
        ImpTotal: 100, // Adjust total
      };
      expect(() => Voucher.create(facturaCData)).toThrow(/ImpIVA|tipo C/i);
    });

    it("throws error when currency is missing", () => {
      const invalidData = { ...validVoucherData, MonId: "" };
      expect(() => Voucher.create(invalidData)).toThrow(/Moneda/i);
    });
  });

  describe("toDTO", () => {
    it("returns complete DTO with all fields", () => {
      const voucher = Voucher.create(validVoucherData);
      const dto = voucher.toDTO();

      expect(dto.CbteDesde).toBe(100);
      expect(dto.CbteHasta).toBe(100);
      expect(dto.ImpTotal).toBe(121);
      expect(dto.PtoVta).toBe(1);
    });
  });

  describe("getters", () => {
    const voucher = Voucher.create(validVoucherData);

    it("getPtoVta returns correct value", () => {
      expect(voucher.getPtoVta()).toBe(1);
    });

    it("getCbteTipo returns correct value", () => {
      expect(voucher.getCbteTipo()).toBe(1);
    });

    it("getCbteDesde returns correct value", () => {
      expect(voucher.getCbteDesde()).toBe(100);
    });

    it("getCbteHasta returns correct value", () => {
      expect(voucher.getCbteHasta()).toBe(100);
    });

    it("getImpTotal returns correct value", () => {
      expect(voucher.getImpTotal()).toBe(121);
    });
  });

  describe("type validators", () => {
    it("isTypeA returns true for Factura A", () => {
      const voucher = Voucher.create(validVoucherData);
      expect(voucher.isTypeA()).toBe(true);
    });

    it("isTypeB returns true for Factura B", () => {
      const facturaBData = { ...validVoucherData, CbteTipo: 6 };
      const voucher = Voucher.create(facturaBData);
      expect(voucher.isTypeB()).toBe(true);
    });

    it("isTypeC returns true for Factura C", () => {
      const facturaCData = {
        ...validVoucherData,
        CbteTipo: 11,
        ImpIVA: 0,
        Iva: [],
        ImpTotal: 100,
      };
      const voucher = Voucher.create(facturaCData);
      expect(voucher.isTypeC()).toBe(true);
    });
  });
});
