import { VoucherNumber } from "@arcasdk/core/src/domain/value-objects/voucher-number.vo";

describe("VoucherNumber Value Object", () => {
  describe("create", () => {
    it("should create a valid voucher number", () => {
      const voucherNumber = VoucherNumber.create(1);
      expect(voucherNumber).toBeInstanceOf(VoucherNumber);
    });

    it("should throw error if value is not an integer", () => {
      expect(() => VoucherNumber.create(1.5)).toThrow(
        "Número de comprobante debe ser un número entero"
      );
    });

    it("should throw error if value is less than 1", () => {
      expect(() => VoucherNumber.create(0)).toThrow(
        "Número de comprobante debe ser mayor a cero"
      );
      expect(() => VoucherNumber.create(-1)).toThrow(
        "Número de comprobante debe ser mayor a cero"
      );
    });

    it("should throw error if value is greater than 99999999", () => {
      expect(() => VoucherNumber.create(99999999 + 1)).toThrow(
        "Número de comprobante no puede ser mayor a 99999999"
      );
    });

    it("should accept maximum valid value", () => {
      const voucherNumber = VoucherNumber.create(99999999);
      expect(voucherNumber).toBeInstanceOf(VoucherNumber);
      expect(voucherNumber.getValue()).toBe(99999999);
    });
  });

  describe("getValue", () => {
    it("should return the voucher number value", () => {
      const value = 12345;
      const voucherNumber = VoucherNumber.create(value);
      expect(voucherNumber.getValue()).toBe(value);
      expect(typeof voucherNumber.getValue()).toBe("number");
    });
  });

  describe("toString", () => {
    it("should return the voucher number as string", () => {
      const voucherNumber = VoucherNumber.create(12345);
      expect(voucherNumber.toString()).toBe("12345");
    });
  });

  describe("toFormattedString", () => {
    it("should format voucher number with leading zeros (8 digits)", () => {
      const voucherNumber = VoucherNumber.create(123);
      expect(voucherNumber.toFormattedString()).toBe("00000123");
    });

    it("should format voucher number correctly for single digit", () => {
      const voucherNumber = VoucherNumber.create(5);
      expect(voucherNumber.toFormattedString()).toBe("00000005");
    });

    it("should format voucher number correctly for 8 digits", () => {
      const voucherNumber = VoucherNumber.create(12345678);
      expect(voucherNumber.toFormattedString()).toBe("12345678");
    });
  });

  describe("equals", () => {
    it("should return true for equal voucher numbers", () => {
      const voucherNumber1 = VoucherNumber.create(12345);
      const voucherNumber2 = VoucherNumber.create(12345);
      expect(voucherNumber1.equals(voucherNumber2)).toBe(true);
    });

    it("should return false for different voucher numbers", () => {
      const voucherNumber1 = VoucherNumber.create(12345);
      const voucherNumber2 = VoucherNumber.create(67890);
      expect(voucherNumber1.equals(voucherNumber2)).toBe(false);
    });
  });

  describe("isGreaterThan", () => {
    it("should return true if this number is greater", () => {
      const voucherNumber1 = VoucherNumber.create(100);
      const voucherNumber2 = VoucherNumber.create(50);
      expect(voucherNumber1.isGreaterThan(voucherNumber2)).toBe(true);
    });

    it("should return false if this number is not greater", () => {
      const voucherNumber1 = VoucherNumber.create(50);
      const voucherNumber2 = VoucherNumber.create(100);
      expect(voucherNumber1.isGreaterThan(voucherNumber2)).toBe(false);
    });

    it("should return false for equal numbers", () => {
      const voucherNumber1 = VoucherNumber.create(100);
      const voucherNumber2 = VoucherNumber.create(100);
      expect(voucherNumber1.isGreaterThan(voucherNumber2)).toBe(false);
    });
  });

  describe("isLessThan", () => {
    it("should return true if this number is less", () => {
      const voucherNumber1 = VoucherNumber.create(50);
      const voucherNumber2 = VoucherNumber.create(100);
      expect(voucherNumber1.isLessThan(voucherNumber2)).toBe(true);
    });

    it("should return false if this number is not less", () => {
      const voucherNumber1 = VoucherNumber.create(100);
      const voucherNumber2 = VoucherNumber.create(50);
      expect(voucherNumber1.isLessThan(voucherNumber2)).toBe(false);
    });

    it("should return false for equal numbers", () => {
      const voucherNumber1 = VoucherNumber.create(100);
      const voucherNumber2 = VoucherNumber.create(100);
      expect(voucherNumber1.isLessThan(voucherNumber2)).toBe(false);
    });
  });

  describe("next", () => {
    it("should return the next voucher number", () => {
      const voucherNumber = VoucherNumber.create(100);
      const next = voucherNumber.next();
      expect(next.getValue()).toBe(101);
      expect(next).toBeInstanceOf(VoucherNumber);
    });

    it("should work for maximum value", () => {
      const voucherNumber = VoucherNumber.create(99999999);
      expect(() => voucherNumber.next()).toThrow(
        "Número de comprobante no puede ser mayor a 99999999"
      );
    });
  });

  describe("previous", () => {
    it("should return the previous voucher number", () => {
      const voucherNumber = VoucherNumber.create(100);
      const previous = voucherNumber.previous();
      expect(previous.getValue()).toBe(99);
      expect(previous).toBeInstanceOf(VoucherNumber);
    });

    it("should throw error if value is 1", () => {
      const voucherNumber = VoucherNumber.create(1);
      expect(() => voucherNumber.previous()).toThrow(
        "No se puede obtener el número anterior, ya está en el mínimo"
      );
    });

    it("should throw error if value is less than 1", () => {
      // This shouldn't happen since we validate in create, but test edge case
      const voucherNumber = VoucherNumber.create(2);
      const previous = voucherNumber.previous();
      expect(previous.getValue()).toBe(1);
    });
  });

  describe("clone", () => {
    it("should create a copy of the voucher number", () => {
      const voucherNumber1 = VoucherNumber.create(12345);
      const voucherNumber2 = voucherNumber1.clone();
      expect(voucherNumber2).toBeInstanceOf(VoucherNumber);
      expect(voucherNumber2.getValue()).toBe(voucherNumber1.getValue());
      expect(voucherNumber2).not.toBe(voucherNumber1); // Different instances
    });
  });
});

