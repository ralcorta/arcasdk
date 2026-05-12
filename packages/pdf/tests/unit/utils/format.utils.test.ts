import {
  formatDate,
  formatVoucherNumber,
  formatCuit,
  formatCurrency,
  formatNumber,
} from "@src/utils/format.utils";

describe("format.utils", () => {
  describe("formatDate", () => {
    it("should format YYYYMMDD to DD/MM/YYYY", () => {
      expect(formatDate("20240115")).toBe("15/01/2024");
    });

    it("should format YYYY-MM-DD to DD/MM/YYYY", () => {
      expect(formatDate("2024-01-15")).toBe("15/01/2024");
    });

    it("should return input if not 8 chars after cleaning", () => {
      expect(formatDate("2024")).toBe("2024");
    });
  });

  describe("formatVoucherNumber", () => {
    it("should format punto de venta and nro with padding", () => {
      expect(formatVoucherNumber(1, 42)).toBe("00001-00000042");
    });

    it("should handle large numbers", () => {
      expect(formatVoucherNumber(99999, 12345678)).toBe("99999-12345678");
    });
  });

  describe("formatCuit", () => {
    it("should format 11-digit CUIT with dashes", () => {
      expect(formatCuit("20123456789")).toBe("20-12345678-9");
    });

    it("should handle already formatted CUIT", () => {
      expect(formatCuit("20-12345678-9")).toBe("20-12345678-9");
    });

    it("should return input if not 11 chars", () => {
      expect(formatCuit("12345")).toBe("12345");
    });
  });

  describe("formatCurrency", () => {
    it("should format with $ by default and Argentine number format", () => {
      expect(formatCurrency(1500.5)).toBe("$ 1.500,50");
    });

    it("should use US$ for DOL", () => {
      expect(formatCurrency(100, "DOL")).toBe("US$ 100,00");
    });

    it("should use $ for PES", () => {
      expect(formatCurrency(200, "PES")).toBe("$ 200,00");
    });

    it("should format large numbers with thousand separators", () => {
      expect(formatCurrency(1234567.89, "PES")).toBe("$ 1.234.567,89");
    });

    it("should format zero", () => {
      expect(formatCurrency(0)).toBe("$ 0,00");
    });

    it("should use $ when monedaId is undefined", () => {
      expect(formatCurrency(100)).toBe("$ 100,00");
    });
  });

  describe("formatNumber", () => {
    it("should format number with Argentine format", () => {
      expect(formatNumber(1234567.89)).toBe("1.234.567,89");
    });

    it("should format zero", () => {
      expect(formatNumber(0)).toBe("0,00");
    });

    it("should pad decimals", () => {
      expect(formatNumber(100)).toBe("100,00");
    });

    it("should handle small decimals", () => {
      expect(formatNumber(0.5)).toBe("0,50");
    });
  });
});
