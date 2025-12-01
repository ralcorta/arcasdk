import { CAE } from "@arcasdk/core/src/domain/value-objects/cae.vo";

describe("CAE Value Object", () => {
  describe("create", () => {
    it("should create a valid CAE", () => {
      const cae = CAE.create("73588223013282");
      expect(cae).toBeInstanceOf(CAE);
    });

    it("should throw error if CAE is not a string", () => {
      expect(() => CAE.create(null as any)).toThrow(
        "CAE debe ser una cadena de texto"
      );
      expect(() => CAE.create(undefined as any)).toThrow(
        "CAE debe ser una cadena de texto"
      );
      expect(() => CAE.create(123 as any)).toThrow(
        "CAE debe ser una cadena de texto"
      );
    });

    it("should throw error if CAE has incorrect length", () => {
      expect(() => CAE.create("1234567890123")).toThrow(
        'CAE inválido: debe tener 14 dígitos, tiene "1234567890123"'
      );
      expect(() => CAE.create("123456789012345")).toThrow(
        'CAE inválido: debe tener 14 dígitos, tiene "123456789012345"'
      );
    });

    it("should throw error if CAE contains non-digits", () => {
      expect(() => CAE.create("7358822301328a")).toThrow(
        'CAE inválido: debe tener 14 dígitos, tiene "7358822301328a"'
      );
      expect(() => CAE.create("735882230132-2")).toThrow(
        'CAE inválido: debe tener 14 dígitos, tiene "735882230132-2"'
      );
    });

    it("should throw error if CAE is all zeros", () => {
      expect(() => CAE.create("00000000000000")).toThrow(
        "CAE inválido: no puede ser todo ceros"
      );
    });
  });

  describe("getValue", () => {
    it("should return the CAE value as string", () => {
      const caeValue = "73588223013282";
      const cae = CAE.create(caeValue);
      expect(cae.getValue()).toBe(caeValue);
    });
  });

  describe("toString", () => {
    it("should return the CAE value as string", () => {
      const caeValue = "73588223013282";
      const cae = CAE.create(caeValue);
      expect(cae.toString()).toBe(caeValue);
    });
  });

  describe("toFormattedString", () => {
    it("should format CAE with dashes", () => {
      const cae = CAE.create("73588223013282");
      expect(cae.toFormattedString()).toBe("7358-8223-0132-82");
    });

    it("should format CAE correctly for different values", () => {
      const cae = CAE.create("12345678901234");
      expect(cae.toFormattedString()).toBe("1234-5678-9012-34");
    });
  });

  describe("equals", () => {
    it("should return true for equal CAEs", () => {
      const cae1 = CAE.create("73588223013282");
      const cae2 = CAE.create("73588223013282");
      expect(cae1.equals(cae2)).toBe(true);
    });

    it("should return false for different CAEs", () => {
      const cae1 = CAE.create("73588223013282");
      const cae2 = CAE.create("12345678901234");
      expect(cae1.equals(cae2)).toBe(false);
    });
  });

  describe("clone", () => {
    it("should create a copy of the CAE", () => {
      const cae1 = CAE.create("73588223013282");
      const cae2 = cae1.clone();
      expect(cae2).toBeInstanceOf(CAE);
      expect(cae2.getValue()).toBe(cae1.getValue());
      expect(cae2).not.toBe(cae1); // Different instances
    });
  });

  describe("isValid", () => {
    it("should return true for valid CAE", () => {
      const cae = CAE.create("73588223013282");
      expect(cae.isValid()).toBe(true);
    });

    it("should always return true for created CAE instances", () => {
      // Since validation happens in constructor, if we have an instance, it's valid
      const cae = CAE.create("73588223013282");
      expect(cae.isValid()).toBe(true);
    });
  });
});

