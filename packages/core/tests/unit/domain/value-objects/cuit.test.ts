import { CUIT } from "@arcasdk/core/src/domain/value-objects/cuit.vo";

describe("CUIT Value Object", () => {
  const validCuitNumber = 20111111111;
  const validCuitString = "20111111111";

  describe("create", () => {
    it("should create a valid CUIT from number", () => {
      const cuit = CUIT.create(validCuitNumber);
      expect(cuit).toBeInstanceOf(CUIT);
    });

    it("should create a valid CUIT from string", () => {
      const cuit = CUIT.create(validCuitString);
      expect(cuit).toBeInstanceOf(CUIT);
    });

    it("should throw error if CUIT is not an integer", () => {
      expect(() => CUIT.create(20111111111.5)).toThrow(
        "CUIT debe ser un número entero"
      );
    });

    it("should throw error if CUIT has incorrect length", () => {
      expect(() => CUIT.create(1234567890)).toThrow(
        "CUIT inválido: debe tener 11 dígitos, tiene 10"
      );
      expect(() => CUIT.create(123456789012)).toThrow(
        "CUIT inválido: debe tener 11 dígitos, tiene 12"
      );
    });

    it("should throw error if CUIT is zero", () => {
      // Zero has length 1, so it will fail the length check first
      expect(() => CUIT.create(0)).toThrow("CUIT inválido: debe tener 11 dígitos");
    });

    it("should parse string correctly", () => {
      const cuit = CUIT.create("20111111111");
      expect(cuit.getValue()).toBe(20111111111);
    });
  });

  describe("getValue", () => {
    it("should return the CUIT value as number", () => {
      const cuit = CUIT.create(validCuitNumber);
      expect(cuit.getValue()).toBe(validCuitNumber);
      expect(typeof cuit.getValue()).toBe("number");
    });
  });

  describe("toString", () => {
    it("should return the CUIT value as string", () => {
      const cuit = CUIT.create(validCuitNumber);
      expect(cuit.toString()).toBe(validCuitString);
    });
  });

  describe("toFormattedString", () => {
    it("should format CUIT with dashes", () => {
      const cuit = CUIT.create(validCuitNumber);
      expect(cuit.toFormattedString()).toBe("20-11111111-1");
    });

    it("should format CUIT correctly for different values", () => {
      const cuit = CUIT.create(27123456789);
      expect(cuit.toFormattedString()).toBe("27-12345678-9");
    });
  });

  describe("equals", () => {
    it("should return true for equal CUITs", () => {
      const cuit1 = CUIT.create(validCuitNumber);
      const cuit2 = CUIT.create(validCuitNumber);
      expect(cuit1.equals(cuit2)).toBe(true);
    });

    it("should return false for different CUITs", () => {
      const cuit1 = CUIT.create(20111111111);
      const cuit2 = CUIT.create(27123456789);
      expect(cuit1.equals(cuit2)).toBe(false);
    });

    it("should return true when created from number and string with same value", () => {
      const cuit1 = CUIT.create(validCuitNumber);
      const cuit2 = CUIT.create(validCuitString);
      expect(cuit1.equals(cuit2)).toBe(true);
    });
  });

  describe("clone", () => {
    it("should create a copy of the CUIT", () => {
      const cuit1 = CUIT.create(validCuitNumber);
      const cuit2 = cuit1.clone();
      expect(cuit2).toBeInstanceOf(CUIT);
      expect(cuit2.getValue()).toBe(cuit1.getValue());
      expect(cuit2).not.toBe(cuit1); // Different instances
    });
  });
});

