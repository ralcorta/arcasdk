import { numberToWords } from "@src/utils/number-to-words.utils";

describe("numberToWords", () => {
  describe("zero", () => {
    it("should return CERO CON 00/100", () => {
      expect(numberToWords(0)).toBe("CERO CON 00/100");
    });
  });

  describe("units (1-9)", () => {
    it.each([
      [1, "UN CON 00/100"],
      [2, "DOS CON 00/100"],
      [3, "TRES CON 00/100"],
      [5, "CINCO CON 00/100"],
      [9, "NUEVE CON 00/100"],
    ])("should convert %d to %s", (n, expected) => {
      expect(numberToWords(n)).toBe(expected);
    });
  });

  describe("teens (10-19)", () => {
    it.each([
      [10, "DIEZ CON 00/100"],
      [11, "ONCE CON 00/100"],
      [15, "QUINCE CON 00/100"],
      [16, "DIECISÉIS CON 00/100"],
      [19, "DIECINUEVE CON 00/100"],
    ])("should convert %d to %s", (n, expected) => {
      expect(numberToWords(n)).toBe(expected);
    });
  });

  describe("twenties (20-29)", () => {
    it.each([
      [20, "VEINTE CON 00/100"],
      [21, "VEINTIÚN CON 00/100"],
      [22, "VEINTIDÓS CON 00/100"],
      [25, "VEINTICINCO CON 00/100"],
      [29, "VEINTINUEVE CON 00/100"],
    ])("should convert %d to %s", (n, expected) => {
      expect(numberToWords(n)).toBe(expected);
    });
  });

  describe("tens (30-99)", () => {
    it.each([
      [30, "TREINTA CON 00/100"],
      [31, "TREINTA Y UN CON 00/100"],
      [42, "CUARENTA Y DOS CON 00/100"],
      [50, "CINCUENTA CON 00/100"],
      [67, "SESENTA Y SIETE CON 00/100"],
      [80, "OCHENTA CON 00/100"],
      [99, "NOVENTA Y NUEVE CON 00/100"],
    ])("should convert %d to %s", (n, expected) => {
      expect(numberToWords(n)).toBe(expected);
    });
  });

  describe("hundreds (100-999)", () => {
    it("should convert 100 as CIEN", () => {
      expect(numberToWords(100)).toBe("CIEN CON 00/100");
    });

    it.each([
      [101, "CIENTO UN CON 00/100"],
      [200, "DOSCIENTOS CON 00/100"],
      [315, "TRESCIENTOS QUINCE CON 00/100"],
      [500, "QUINIENTOS CON 00/100"],
      [999, "NOVECIENTOS NOVENTA Y NUEVE CON 00/100"],
    ])("should convert %d to %s", (n, expected) => {
      expect(numberToWords(n)).toBe(expected);
    });
  });

  describe("thousands (1000-999999)", () => {
    it.each([
      [1000, "MIL CON 00/100"],
      [1001, "MIL UN CON 00/100"],
      [2000, "DOS MIL CON 00/100"],
      [10000, "DIEZ MIL CON 00/100"],
      [50000, "CINCUENTA MIL CON 00/100"],
      [60500, "SESENTA MIL QUINIENTOS CON 00/100"],
      [100000, "CIEN MIL CON 00/100"],
      [
        999999,
        "NOVECIENTOS NOVENTA Y NUEVE MIL NOVECIENTOS NOVENTA Y NUEVE CON 00/100",
      ],
    ])("should convert %d to %s", (n, expected) => {
      expect(numberToWords(n)).toBe(expected);
    });
  });

  describe("millions", () => {
    it.each([
      [1000000, "UN MILLÓN CON 00/100"],
      [2000000, "DOS MILLONES CON 00/100"],
      [2500000, "DOS MILLONES QUINIENTOS MIL CON 00/100"],
      [10000000, "DIEZ MILLONES CON 00/100"],
      [
        123456789,
        "CIENTO VEINTITRÉS MILLONES CUATROCIENTOS CINCUENTA Y SEIS MIL SETECIENTOS OCHENTA Y NUEVE CON 00/100",
      ],
    ])("should convert %d to %s", (n, expected) => {
      expect(numberToWords(n)).toBe(expected);
    });
  });

  describe("decimals (cents)", () => {
    it.each([
      [0.01, "CERO CON 01/100"],
      [0.99, "CERO CON 99/100"],
      [1.5, "UN CON 50/100"],
      [1234.56, "MIL DOSCIENTOS TREINTA Y CUATRO CON 56/100"],
      [100.1, "CIEN CON 10/100"],
    ])("should convert %d to %s", (n, expected) => {
      expect(numberToWords(n)).toBe(expected);
    });
  });

  describe("edge cases", () => {
    it("should fallback to string for numbers >= 1 billion", () => {
      const result = numberToWords(1000000000);
      expect(result).toBe("1000000000 CON 00/100");
    });
  });
});
