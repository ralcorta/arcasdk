import { Voucher } from "@arcasdk/core/src/domain/entities/voucher.entity";
import { IVoucher } from "@arcasdk/core/src/domain/types/voucher.types";
import { data } from "../../../mocks/data/voucher.mock";

describe("Voucher Entity", () => {
  describe("create", () => {
    it("should create a valid voucher", () => {
      const voucher = Voucher.create(data);
      expect(voucher).toBeInstanceOf(Voucher);
    });

    it("should throw error if PtoVta is invalid", () => {
      const invalidData: IVoucher = {
        ...data,
        PtoVta: 0,
      };
      expect(() => Voucher.create(invalidData)).toThrow(
        "Punto de venta inválido. Debe ser mayor a cero."
      );
    });

    it("should throw error if CbteTipo is invalid", () => {
      const invalidData: IVoucher = {
        ...data,
        CbteTipo: 0,
      };
      expect(() => Voucher.create(invalidData)).toThrow(
        "Tipo de comprobante inválido. Debe ser mayor a cero."
      );
    });

    it("should throw error if CbteDesde is missing", () => {
      const invalidData: IVoucher = {
        ...data,
        CbteDesde: undefined as any,
      };
      expect(() => Voucher.create(invalidData)).toThrow(
        "Números de comprobante inválidos. CbteDesde y CbteHasta son requeridos."
      );
    });

    it("should throw error if CbteHasta is missing", () => {
      const invalidData: IVoucher = {
        ...data,
        CbteHasta: undefined as any,
      };
      expect(() => Voucher.create(invalidData)).toThrow(
        "Números de comprobante inválidos. CbteDesde y CbteHasta son requeridos."
      );
    });

    it("should throw error if CbteDesde > CbteHasta", () => {
      const invalidData: IVoucher = {
        ...data,
        CbteDesde: 10,
        CbteHasta: 5,
      };
      expect(() => Voucher.create(invalidData)).toThrow(
        "CbteDesde no puede ser mayor que CbteHasta."
      );
    });

    it("should throw error if CbteDesde is negative", () => {
      const invalidData: IVoucher = {
        ...data,
        CbteDesde: -1,
      };
      expect(() => Voucher.create(invalidData)).toThrow(
        "Los números de comprobante no pueden ser negativos."
      );
    });

    it("should throw error if CantReg is incorrect", () => {
      const invalidData: IVoucher = {
        ...data,
        CbteDesde: 1,
        CbteHasta: 3,
        CantReg: 5, // Should be 3
      };
      expect(() => Voucher.create(invalidData)).toThrow(
        "CantReg (5) debe ser igual a la cantidad de comprobantes (3)"
      );
    });

    it("should throw error if Factura C has IVA", () => {
      const invalidData: IVoucher = {
        ...data,
        CbteTipo: 11, // Factura C
        ImpIVA: 100,
      };
      expect(() => Voucher.create(invalidData)).toThrow(
        "El campo ImpIVA (Importe de IVA) para comprobantes tipo C debe ser igual a cero (0)."
      );
    });

    it("should throw error if Factura C has Iva array", () => {
      const invalidData: IVoucher = {
        ...data,
        CbteTipo: 11, // Factura C
        ImpIVA: 0,
        Iva: [{ Id: 5, BaseImp: 100, Importe: 0 }],
      };
      expect(() => Voucher.create(invalidData)).toThrow(
        "Para comprobantes tipo C el objeto IVA no debe informarse."
      );
    });

    it("should throw error if ImpTotal calculation is incorrect", () => {
      const invalidData: IVoucher = {
        ...data,
        CbteTipo: 1, // Factura A (allows IVA)
        ImpNeto: 100,
        ImpTrib: 10,
        ImpIVA: 21,
        ImpTotal: 150, // Should be 131
      };
      expect(() => Voucher.create(invalidData)).toThrow(
        "El campo 'Importe Total' ImpTotal (150), debe ser igual a la suma de ImpNeto (100) + ImpTrib (10) + ImpIVA (21) = 131."
      );
    });

    it("should throw error if Concepto is invalid", () => {
      const invalidData: IVoucher = {
        ...data,
        Concepto: 0,
      };
      expect(() => Voucher.create(invalidData)).toThrow(
        "Concepto inválido. Debe ser 1 (Productos), 2 (Servicios) o 3 (Productos y Servicios)."
      );
    });

    it("should throw error if DocTipo is invalid", () => {
      const invalidData: IVoucher = {
        ...data,
        DocTipo: 0,
      };
      expect(() => Voucher.create(invalidData)).toThrow(
        "Tipo de documento inválido."
      );
    });

    it("should throw error if MonId is missing", () => {
      const invalidData: IVoucher = {
        ...data,
        MonId: "",
      };
      expect(() => Voucher.create(invalidData)).toThrow(
        "Moneda (MonId) es requerida."
      );
    });

    it("should throw error if MonCotiz is invalid", () => {
      const invalidData: IVoucher = {
        ...data,
        MonCotiz: 0,
      };
      expect(() => Voucher.create(invalidData)).toThrow(
        "Cotización de moneda (MonCotiz) debe ser mayor a cero."
      );
    });
  });

  describe("getters", () => {
    let voucher: Voucher;

    beforeEach(() => {
      voucher = Voucher.create(data);
    });

    it("should return PtoVta", () => {
      expect(voucher.getPtoVta()).toBe(data.PtoVta);
    });

    it("should return CbteTipo", () => {
      expect(voucher.getCbteTipo()).toBe(data.CbteTipo);
    });

    it("should return CbteDesde", () => {
      expect(voucher.getCbteDesde()).toBe(data.CbteDesde);
    });

    it("should return CbteHasta", () => {
      expect(voucher.getCbteHasta()).toBe(data.CbteHasta);
    });

    it("should return ImpTotal", () => {
      expect(voucher.getImpTotal()).toBe(data.ImpTotal);
    });

    it("should return ImpIVA", () => {
      expect(voucher.getImpIVA()).toBe(data.ImpIVA);
    });

    it("should return ImpNeto", () => {
      expect(voucher.getImpNeto()).toBe(data.ImpNeto);
    });

    it("should return ImpTrib", () => {
      expect(voucher.getImpTrib()).toBe(data.ImpTrib);
    });

    it("should return CbteFch", () => {
      expect(voucher.getCbteFch()).toBe(data.CbteFch);
    });

    it("should return Concepto", () => {
      expect(voucher.getConcepto()).toBe(data.Concepto);
    });

    it("should return DocTipo", () => {
      expect(voucher.getDocTipo()).toBe(data.DocTipo);
    });

    it("should return DocNro", () => {
      expect(voucher.getDocNro()).toBe(data.DocNro);
    });

    it("should return MonId", () => {
      expect(voucher.getMonId()).toBe(data.MonId);
    });

    it("should return MonCotiz", () => {
      expect(voucher.getMonCotiz()).toBe(data.MonCotiz);
    });

    it("should return Iva array", () => {
      expect(voucher.getIva()).toEqual(data.Iva);
    });

    it("should return Tributos array", () => {
      expect(voucher.getTributos()).toEqual(data.Tributos);
    });

    it("should return CbtesAsoc array", () => {
      expect(voucher.getCbtesAsoc()).toEqual(data.CbtesAsoc);
    });

    it("should return CantReg", () => {
      expect(voucher.getCantReg()).toBe(data.CantReg);
    });
  });

  describe("type checks", () => {
    it("should return true for Factura C (type 11)", () => {
      const facturaC: IVoucher = {
        ...data,
        CbteTipo: 11,
        ImpIVA: 0,
        Iva: undefined,
      };
      const voucher = Voucher.create(facturaC);
      expect(voucher.isFacturaC()).toBe(true);
      expect(voucher.isFacturaA()).toBe(false);
      expect(voucher.isFacturaB()).toBe(false);
    });

    it("should return true for Factura A (type 1)", () => {
      const facturaA: IVoucher = {
        ...data,
        CbteTipo: 1,
      };
      const voucher = Voucher.create(facturaA);
      expect(voucher.isFacturaA()).toBe(true);
      expect(voucher.isFacturaC()).toBe(false);
      expect(voucher.isFacturaB()).toBe(false);
    });

    it("should return true for Factura B (type 6)", () => {
      const facturaB: IVoucher = {
        ...data,
        CbteTipo: 6,
      };
      const voucher = Voucher.create(facturaB);
      expect(voucher.isFacturaB()).toBe(true);
      expect(voucher.isFacturaA()).toBe(false);
      expect(voucher.isFacturaC()).toBe(false);
    });
  });

  describe("toDTO", () => {
    it("should return a copy of the voucher data", () => {
      const voucher = Voucher.create(data);
      const dto = voucher.toDTO();
      expect(dto).toEqual(data);
      expect(dto).not.toBe(data); // Should be a copy, not the same reference
    });
  });
});
