import { buildArcaQrUrl } from "@src/utils/qr.utils";
import { InvoiceData } from "@src/types/invoice-data.types";

const baseData: InvoiceData = {
  emisor: {
    razonSocial: "Test SA",
    domicilioComercial: "Calle Falsa 123",
    condicionIva: "Responsable Inscripto",
    cuit: "20304050607",
    iibb: "12-3456-7",
    fechaInicioActividades: "20200101",
  },
  receptor: {
    razonSocial: "Cliente SRL",
    condicionIva: "Responsable Inscripto",
    documentoTipo: "CUIT",
    documentoNro: "30712345678",
  },
  cbteTipo: 1,
  cbteLetra: "A",
  puntoVenta: 1,
  cbteDesde: 100,
  cbteHasta: 100,
  cbteFecha: "20240515",
  concepto: 1,
  items: [],
  importeNetoGravado: 1000,
  importeIva: 210,
  importeTotal: 1210,
  cae: "12345678901234",
  caeFechaVencimiento: "20240525",
};

describe("qr.utils", () => {
  describe("buildArcaQrUrl", () => {
    it("should return a valid ARCA QR URL", () => {
      const url = buildArcaQrUrl(baseData);
      expect(url).toContain("https://www.afip.gob.ar/fe/qr/?p=");
    });

    it("should encode correct data in base64", () => {
      const url = buildArcaQrUrl(baseData);
      const base64 = url.split("?p=")[1];
      const decoded = JSON.parse(Buffer.from(base64, "base64").toString());

      expect(decoded.ver).toBe(1);
      expect(decoded.cuit).toBe(20304050607);
      expect(decoded.ptoVta).toBe(1);
      expect(decoded.tipoCmp).toBe(1);
      expect(decoded.nroCmp).toBe(100);
      expect(decoded.importe).toBe(1210);
      expect(decoded.moneda).toBe("PES");
      expect(decoded.tipoDocRec).toBe(80);
      expect(decoded.codAut).toBe(12345678901234);
      expect(decoded.tipoCodAut).toBe("E");
    });

    it("should normalize date format", () => {
      const url = buildArcaQrUrl(baseData);
      const base64 = url.split("?p=")[1];
      const decoded = JSON.parse(Buffer.from(base64, "base64").toString());
      expect(decoded.fecha).toBe("2024-05-15");
    });

    it("should handle YYYY-MM-DD date format", () => {
      const data = { ...baseData, cbteFecha: "2024-05-15" };
      const url = buildArcaQrUrl(data);
      const base64 = url.split("?p=")[1];
      const decoded = JSON.parse(Buffer.from(base64, "base64").toString());
      expect(decoded.fecha).toBe("2024-05-15");
    });

    it("should default moneda to PES", () => {
      const data = { ...baseData, moneda: undefined };
      const url = buildArcaQrUrl(data);
      const base64 = url.split("?p=")[1];
      const decoded = JSON.parse(Buffer.from(base64, "base64").toString());
      expect(decoded.moneda).toBe("PES");
    });

    it("should default cotizacion to 1", () => {
      const data = { ...baseData, cotizacion: undefined };
      const url = buildArcaQrUrl(data);
      const base64 = url.split("?p=")[1];
      const decoded = JSON.parse(Buffer.from(base64, "base64").toString());
      expect(decoded.ctz).toBe(1);
    });

    it("should map DNI documento type to 96", () => {
      const data = {
        ...baseData,
        receptor: {
          ...baseData.receptor,
          documentoTipo: "DNI",
          documentoNro: "32456789",
        },
      };
      const url = buildArcaQrUrl(data);
      const base64 = url.split("?p=")[1];
      const decoded = JSON.parse(Buffer.from(base64, "base64").toString());
      expect(decoded.tipoDocRec).toBe(96);
      expect(decoded.nroDocRec).toBe(32456789);
    });

    it("should handle CUIT with dashes in emisor", () => {
      const data = {
        ...baseData,
        emisor: { ...baseData.emisor, cuit: "20-30405060-7" },
      };
      const url = buildArcaQrUrl(data);
      const base64 = url.split("?p=")[1];
      const decoded = JSON.parse(Buffer.from(base64, "base64").toString());
      expect(decoded.cuit).toBe(20304050607);
    });
  });
});
