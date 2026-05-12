import {
  compileTemplate,
  ensureHelpers,
  Handlebars,
} from "@src/templates/engine";
import type { InvoiceTemplateProps } from "@src/types/invoice-data.types";

function makeProps(
  overrides: Partial<InvoiceTemplateProps> = {},
): InvoiceTemplateProps {
  return {
    data: {
      emisor: {
        razonSocial: "Test SA",
        domicilioComercial: "Av. Test 123",
        condicionIva: "IVA Responsable Inscripto",
        cuit: "20304050607",
        iibb: "12-345-6",
        fechaInicioActividades: "20200101",
      },
      receptor: {
        razonSocial: "Cliente SRL",
        domicilio: "Calle 456",
        condicionIva: "IVA Responsable Inscripto",
        documentoTipo: "CUIT",
        documentoNro: "30712345678",
      },
      cbteTipo: 1,
      cbteLetra: "A",
      puntoVenta: 3,
      cbteDesde: 100,
      cbteHasta: 100,
      cbteFecha: "20260510",
      concepto: 1,
      moneda: "PES",
      items: [
        {
          descripcion: "Item 1",
          cantidad: 2,
          unidadMedida: "u",
          precioUnitario: 1000,
          subtotal: 2000,
        },
      ],
      importeNetoGravado: 2000,
      importeIva: 420,
      importeTotal: 2420,
      cae: "12345678901234",
      caeFechaVencimiento: "20260520",
    },
    options: {
      pageSize: "A4",
      margin: 10,
      includeQr: true,
      copy: "ORIGINAL",
    },
    ...overrides,
  };
}

describe("template-engine", () => {
  describe("compileTemplate", () => {
    it("should compile a simple template and render it", () => {
      const render = compileTemplate("<h1>{{data.emisor.razonSocial}}</h1>");
      const result = render(makeProps());
      expect(result).toBe("<h1>Test SA</h1>");
    });

    it("should return a reusable render function", () => {
      const render = compileTemplate("{{data.cbteLetra}}");
      expect(render(makeProps())).toBe("A");
      const props2 = makeProps();
      props2.data.cbteLetra = "B";
      expect(render(props2)).toBe("B");
    });

    it("should not escape HTML (noEscape: true)", () => {
      const render = compileTemplate("{{{data.emisor.razonSocial}}}");
      const props = makeProps();
      props.data.emisor.razonSocial = "<b>Test & Co</b>";
      expect(render(props)).toBe("<b>Test & Co</b>");
    });

    it("should not escape with double braces either", () => {
      const render = compileTemplate("{{data.emisor.razonSocial}}");
      const props = makeProps();
      props.data.emisor.razonSocial = "<b>Test & Co</b>";
      expect(render(props)).toBe("<b>Test & Co</b>");
    });
  });

  describe("formatDate helper", () => {
    it("should format YYYYMMDD to DD/MM/YYYY", () => {
      const render = compileTemplate("{{formatDate data.cbteFecha}}");
      expect(render(makeProps())).toBe("10/05/2026");
    });
  });

  describe("formatCuit helper", () => {
    it("should format 11-digit CUIT with dashes", () => {
      const render = compileTemplate("{{formatCuit data.emisor.cuit}}");
      expect(render(makeProps())).toBe("20-30405060-7");
    });
  });

  describe("formatCurrency helper", () => {
    it("should format with $ for PES", () => {
      const render = compileTemplate(
        "{{formatCurrency data.importeTotal data.moneda}}",
      );
      expect(render(makeProps())).toBe("$ 2.420,00");
    });

    it("should format with US$ for DOL", () => {
      const render = compileTemplate(
        "{{formatCurrency data.importeTotal data.moneda}}",
      );
      const props = makeProps();
      props.data.moneda = "DOL";
      expect(render(props)).toContain("US$");
    });
  });

  describe("formatUnitPrice helper", () => {
    it("should format price with dots and comma", () => {
      const render = compileTemplate(
        "{{formatUnitPrice data.items.[0].precioUnitario}}",
      );
      expect(render(makeProps())).toBe("$ 1.000,00");
    });
  });

  describe("padStart helper", () => {
    it("should pad number with zeros", () => {
      const render = compileTemplate("{{padStart data.puntoVenta 5}}");
      expect(render(makeProps())).toBe("00003");
    });
  });

  describe("voucherNumber helper", () => {
    it("should format as 00003-00000100", () => {
      const render = compileTemplate(
        "{{voucherNumber data.puntoVenta data.cbteDesde}}",
      );
      expect(render(makeProps())).toBe("00003-00000100");
    });
  });

  describe("descTipo helper", () => {
    it("should return description for known cbteTipo", () => {
      const render = compileTemplate("{{descTipo data.cbteTipo}}");
      expect(render(makeProps())).toBe("FACTURA");
    });

    it("should use cbteDescripcion when provided", () => {
      const render = compileTemplate(
        "{{descTipo data.cbteTipo data.cbteDescripcion}}",
      );
      const props = makeProps();
      props.data.cbteDescripcion = "RECIBO";
      expect(render(props)).toBe("RECIBO");
    });

    it("should fallback to COMPROBANTE for unknown type", () => {
      const render = compileTemplate("{{descTipo data.cbteTipo}}");
      const props = makeProps();
      props.data.cbteTipo = 9999;
      expect(render(props)).toBe("COMPROBANTE");
    });
  });

  describe("voucherTypeDescription helper", () => {
    it("should return description for known tipo", () => {
      const render = compileTemplate(
        "{{voucherTypeDescription data.cbteTipo}}",
      );
      expect(render(makeProps())).toBe("FACTURA");
    });

    it("should return Cbte for unknown tipo", () => {
      const render = compileTemplate(
        "{{voucherTypeDescription data.cbteTipo}}",
      );
      const props = makeProps();
      props.data.cbteTipo = 9999;
      expect(render(props)).toBe("Cbte");
    });
  });

  describe("currencyName helper", () => {
    it("should return full name for PES", () => {
      const render = compileTemplate("{{currencyName data.moneda}}");
      expect(render(makeProps())).toBe("PESOS ARGENTINOS (ARS)");
    });

    it("should return full name for DOL", () => {
      const render = compileTemplate("{{currencyName data.moneda}}");
      const props = makeProps();
      props.data.moneda = "DOL";
      expect(render(props)).toBe("DÓLARES ESTADOUNIDENSES (USD)");
    });

    it("should default to PESOS ARGENTINOS for unknown", () => {
      const render = compileTemplate("{{currencyName data.moneda}}");
      const props = makeProps();
      props.data.moneda = "XYZ";
      expect(render(props)).toBe("PESOS ARGENTINOS (ARS)");
    });
  });

  describe("currencyShortName helper", () => {
    it("should return short name without code", () => {
      const render = compileTemplate("{{currencyShortName data.moneda}}");
      expect(render(makeProps())).toBe("PESOS ARGENTINOS");
    });
  });

  describe("numberToWords helper", () => {
    it("should convert number to Spanish words", () => {
      const render = compileTemplate("{{numberToWords data.importeTotal}}");
      expect(render(makeProps())).toBe(
        "DOS MIL CUATROCIENTOS VEINTE CON 00/100",
      );
    });

    it("should handle zero", () => {
      const render = compileTemplate("{{numberToWords data.importeTotal}}");
      const props = makeProps();
      props.data.importeTotal = 0;
      expect(render(props)).toBe("CERO CON 00/100");
    });
  });

  describe("formatCotizacion helper", () => {
    it("should format cotizacion with comma", () => {
      const render = compileTemplate("{{formatCotizacion data.cotizacion}}");
      const props = makeProps();
      props.data.cotizacion = 1200.5;
      expect(render(props)).toBe("1200,500");
    });

    it("should default to 1,000 when undefined", () => {
      const render = compileTemplate("{{formatCotizacion data.cotizacion}}");
      expect(render(makeProps())).toBe("1,000");
    });
  });

  describe("docNumber helper", () => {
    it("should format 11-digit CUIT with dashes", () => {
      const render = compileTemplate(
        "{{docNumber data.receptor.documentoNro}}",
      );
      expect(render(makeProps())).toBe("30-71234567-8");
    });

    it("should return non-CUIT numbers as-is", () => {
      const render = compileTemplate(
        "{{docNumber data.receptor.documentoNro}}",
      );
      const props = makeProps();
      props.data.receptor.documentoNro = "32456789";
      expect(render(props)).toBe("32456789");
    });
  });

  describe("bonAmount helper", () => {
    it("should calculate bonus amount", () => {
      const render = compileTemplate("{{bonAmount 1000 10 15}}");
      const result = render(makeProps());
      expect(Number(result)).toBe(1500);
    });

    it("should return 0 when bonificacion is 0", () => {
      const render = compileTemplate("{{bonAmount 1000 10 0}}");
      const result = render(makeProps());
      expect(Number(result)).toBe(0);
    });

    it("should use importeBonificacion when provided", () => {
      const render = compileTemplate(
        "{{#each data.items}}{{bonAmount this.precioUnitario this.cantidad this.bonificacion this.importeBonificacion}}{{/each}}",
      );
      const props = makeProps();
      props.data.items = [
        {
          descripcion: "Item",
          cantidad: 10,
          unidadMedida: "u",
          precioUnitario: 1000,
          bonificacion: 15,
          importeBonificacion: 999,
          subtotal: 9001,
        },
      ];
      expect(Number(render(props))).toBe(999);
    });

    it("should fallback to calculation when importeBonificacion is undefined", () => {
      const render = compileTemplate(
        "{{#each data.items}}{{bonAmount this.precioUnitario this.cantidad this.bonificacion this.importeBonificacion}}{{/each}}",
      );
      const props = makeProps();
      props.data.items = [
        {
          descripcion: "Item",
          cantidad: 10,
          unidadMedida: "u",
          precioUnitario: 1000,
          bonificacion: 15,
          subtotal: 8500,
        },
      ];
      expect(Number(render(props))).toBe(1500);
    });
  });

  describe("comparison helpers", () => {
    it("eq should return true for equal values", () => {
      const render = compileTemplate(
        "{{#if (eq data.cbteLetra 'A')}}YES{{else}}NO{{/if}}",
      );
      expect(render(makeProps())).toBe("YES");
    });

    it("eq should return false for different values", () => {
      const render = compileTemplate(
        "{{#if (eq data.cbteLetra 'B')}}YES{{else}}NO{{/if}}",
      );
      expect(render(makeProps())).toBe("NO");
    });

    it("neq should work", () => {
      const render = compileTemplate(
        "{{#if (neq data.cbteLetra 'B')}}YES{{else}}NO{{/if}}",
      );
      expect(render(makeProps())).toBe("YES");
    });

    it("gt should work", () => {
      const render = compileTemplate(
        "{{#if (gt data.importeTotal 1000)}}YES{{else}}NO{{/if}}",
      );
      expect(render(makeProps())).toBe("YES");
    });

    it("gte should work for equal", () => {
      const render = compileTemplate(
        "{{#if (gte data.importeTotal 2420)}}YES{{else}}NO{{/if}}",
      );
      expect(render(makeProps())).toBe("YES");
    });
  });

  describe("logical helpers", () => {
    it("and should return truthy when both truthy", () => {
      const render = compileTemplate(
        "{{#if (and data.cae data.moneda)}}YES{{else}}NO{{/if}}",
      );
      expect(render(makeProps())).toBe("YES");
    });

    it("not should negate", () => {
      const render = compileTemplate(
        "{{#if (not data.observaciones)}}YES{{else}}NO{{/if}}",
      );
      expect(render(makeProps())).toBe("YES");
    });

    it("or should render fn block when at least one arg is truthy", () => {
      const render = compileTemplate(
        "{{#or data.cae data.observaciones}}YES{{else}}NO{{/or}}",
      );
      expect(render(makeProps())).toBe("YES");
    });

    it("or should render inverse block when all falsy", () => {
      const render = compileTemplate(
        "{{#or data.observaciones data.cbteDescripcion}}YES{{else}}NO{{/or}}",
      );
      expect(render(makeProps())).toBe("NO");
    });
  });

  describe("utility helpers", () => {
    it("default should return value when truthy", () => {
      const render = compileTemplate("{{default data.moneda 'PES'}}");
      expect(render(makeProps())).toBe("PES");
    });

    it("default should return fallback when falsy", () => {
      const render = compileTemplate("{{default data.observaciones 'N/A'}}");
      expect(render(makeProps())).toBe("N/A");
    });

    it("isNull should return true for null/undefined", () => {
      const render = compileTemplate(
        "{{#if (isNull data.observaciones)}}YES{{else}}NO{{/if}}",
      );
      expect(render(makeProps())).toBe("YES");
    });

    it("isNull should return false for defined values", () => {
      const render = compileTemplate(
        "{{#if (isNull data.moneda)}}YES{{else}}NO{{/if}}",
      );
      expect(render(makeProps())).toBe("NO");
    });

    it("len should return array length", () => {
      const render = compileTemplate("{{len data.items}}");
      expect(render(makeProps())).toBe("1");
    });

    it("len should return 0 for undefined", () => {
      const render = compileTemplate("{{len data.tributos}}");
      expect(render(makeProps())).toBe("0");
    });
  });

  describe("ensureHelpers", () => {
    it("should be idempotent (can call multiple times)", () => {
      expect(() => {
        ensureHelpers();
        ensureHelpers();
      }).not.toThrow();
    });
  });
});
