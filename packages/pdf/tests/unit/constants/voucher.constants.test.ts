import {
  VOUCHER_TYPE_LETTER,
  VOUCHER_TYPE_DESCRIPTION,
  VOUCHER_TYPE_CODE,
  CURRENCY_SYMBOL,
  CURRENCY_NAME,
} from "@src/constants/voucher.constants";

describe("voucher.constants", () => {
  describe("VOUCHER_TYPE_LETTER", () => {
    it("should map factura types to correct letters", () => {
      expect(VOUCHER_TYPE_LETTER[1]).toBe("A");
      expect(VOUCHER_TYPE_LETTER[6]).toBe("B");
      expect(VOUCHER_TYPE_LETTER[11]).toBe("C");
      expect(VOUCHER_TYPE_LETTER[19]).toBe("E");
      expect(VOUCHER_TYPE_LETTER[51]).toBe("M");
    });

    it("should map nota de débito types", () => {
      expect(VOUCHER_TYPE_LETTER[2]).toBe("A");
      expect(VOUCHER_TYPE_LETTER[7]).toBe("B");
      expect(VOUCHER_TYPE_LETTER[12]).toBe("C");
    });

    it("should map nota de crédito types", () => {
      expect(VOUCHER_TYPE_LETTER[3]).toBe("A");
      expect(VOUCHER_TYPE_LETTER[8]).toBe("B");
      expect(VOUCHER_TYPE_LETTER[13]).toBe("C");
    });

    it("should map MiPyME types", () => {
      expect(VOUCHER_TYPE_LETTER[201]).toBe("A");
      expect(VOUCHER_TYPE_LETTER[206]).toBe("B");
      expect(VOUCHER_TYPE_LETTER[211]).toBe("C");
    });
  });

  describe("VOUCHER_TYPE_DESCRIPTION", () => {
    it("should return FACTURA for factura types", () => {
      expect(VOUCHER_TYPE_DESCRIPTION[1]).toBe("FACTURA");
      expect(VOUCHER_TYPE_DESCRIPTION[6]).toBe("FACTURA");
      expect(VOUCHER_TYPE_DESCRIPTION[11]).toBe("FACTURA");
    });

    it("should return NOTA DE DÉBITO for ND types", () => {
      expect(VOUCHER_TYPE_DESCRIPTION[2]).toBe("NOTA DE DÉBITO");
      expect(VOUCHER_TYPE_DESCRIPTION[7]).toBe("NOTA DE DÉBITO");
    });

    it("should return NOTA DE CRÉDITO for NC types", () => {
      expect(VOUCHER_TYPE_DESCRIPTION[3]).toBe("NOTA DE CRÉDITO");
      expect(VOUCHER_TYPE_DESCRIPTION[8]).toBe("NOTA DE CRÉDITO");
    });

    it("should return full description for MiPyME types", () => {
      expect(VOUCHER_TYPE_DESCRIPTION[201]).toContain("MiPyME");
      expect(VOUCHER_TYPE_DESCRIPTION[206]).toContain("MiPyME");
    });
  });

  describe("VOUCHER_TYPE_CODE", () => {
    it("should map letters to QR codes", () => {
      expect(VOUCHER_TYPE_CODE["A"]).toBe("001");
      expect(VOUCHER_TYPE_CODE["B"]).toBe("006");
      expect(VOUCHER_TYPE_CODE["C"]).toBe("011");
      expect(VOUCHER_TYPE_CODE["E"]).toBe("019");
      expect(VOUCHER_TYPE_CODE["M"]).toBe("051");
    });
  });

  describe("CURRENCY_SYMBOL", () => {
    it("should map PES to $", () => {
      expect(CURRENCY_SYMBOL["PES"]).toBe("$");
    });

    it("should map DOL to US$", () => {
      expect(CURRENCY_SYMBOL["DOL"]).toBe("US$");
    });
  });

  describe("CURRENCY_NAME", () => {
    it("should map PES to full name", () => {
      expect(CURRENCY_NAME["PES"]).toBe("PESOS ARGENTINOS (ARS)");
    });

    it("should map DOL to full name", () => {
      expect(CURRENCY_NAME["DOL"]).toBe("DÓLARES ESTADOUNIDENSES (USD)");
    });
  });
});
