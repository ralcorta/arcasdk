import { InvoiceDocument } from "@src/templates/arca-default";
import { InvoiceData, ResolvedPdfOptions } from "@src/types/invoice-data.types";

// ── Shared test data ──

const baseEmisor = {
  razonSocial: "EMPRESA TEST S.A.",
  domicilioComercial: "Av. Test 123 - C1000AAA - CABA",
  condicionIva: "IVA Responsable Inscripto",
  cuit: "30714578902",
  iibb: "901-234567-3",
  fechaInicioActividades: "20150315",
};

const baseReceptor = {
  razonSocial: "CLIENTE TEST S.R.L.",
  domicilio: "Calle Falsa 456 - S2000BFA - Rosario",
  condicionIva: "IVA Responsable Inscripto",
  documentoTipo: "CUIT",
  documentoNro: "30712345678",
};

const baseOptions: ResolvedPdfOptions = {
  pageSize: "A4",
  margin: 10,
  includeQr: true,
  copy: "ORIGINAL",
};

function makeInvoice(overrides: Partial<InvoiceData> = {}): InvoiceData {
  return {
    emisor: baseEmisor,
    receptor: baseReceptor,
    cbteTipo: 1,
    cbteLetra: "A",
    puntoVenta: 3,
    cbteDesde: 1001,
    cbteHasta: 1001,
    cbteFecha: "20260510",
    concepto: 1,
    moneda: "PES",
    cotizacion: 1,
    condicionVenta: "Contado",
    items: [
      {
        codigo: "SRV-001",
        descripcion: "Servicio de consultoría",
        cantidad: 10,
        unidadMedida: "horas",
        precioUnitario: 5000,
        bonificacion: 0,
        subtotal: 50000,
        alicuotaIva: 21,
      },
    ],
    importeNetoGravado: 50000,
    importeIva: 10500,
    iva: [{ id: 5, descripcion: "21%", baseImponible: 50000, importe: 10500 }],
    importeTotal: 60500,
    cae: "72643218900001",
    caeFechaVencimiento: "20260520",
    ...overrides,
  };
}

describe("InvoiceDocument", () => {
  // ── Structure ──

  describe("HTML structure", () => {
    it("should return valid HTML document", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).toContain("<!DOCTYPE html>");
      expect(html).toContain("<html>");
      expect(html).toContain("</html>");
    });

    it("should include page and content wrappers", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).toContain('class="page"');
      expect(html).toContain('class="content"');
    });
  });

  // ── Banner (copy type) ──

  describe("banner", () => {
    it("should show ORIGINAL by default", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).toContain("ORIGINAL");
    });

    it("should show DUPLICADO when specified", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: { ...baseOptions, copy: "DUPLICADO" },
      });
      expect(html).toContain("DUPLICADO");
    });

    it("should show TRIPLICADO when specified", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: { ...baseOptions, copy: "TRIPLICADO" },
      });
      expect(html).toContain("TRIPLICADO");
    });
  });

  // ── Header / Emisor ──

  describe("emisor data", () => {
    it("should render emisor razón social", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).toContain("EMPRESA TEST S.A.");
    });

    it("should render emisor domicilio", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).toContain("Av. Test 123 - C1000AAA - CABA");
    });

    it("should render formatted CUIT", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).toContain("30-71457890-2");
    });

    it("should render IIBB number", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).toContain("901-234567-3");
    });

    it("should render formatted inicio de actividades", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).toContain("15/03/2015");
    });

    it("should render contacto when present", () => {
      const data = makeInvoice({
        emisor: { ...baseEmisor, contacto: "info@test.com" },
      });
      const html = InvoiceDocument({ data, options: baseOptions });
      expect(html).toContain("info@test.com");
    });

    it("should not render contacto element when absent", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      // The CSS class exists in the stylesheet, but no element should use it
      const bodyContent = html.split("<body>")[1];
      expect(bodyContent).not.toContain('class="emisor-extra"');
    });
  });

  // ── Voucher info ──

  describe("voucher info", () => {
    it("should render comprobante type and letter", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).toContain("FACTURA A");
    });

    it("should render formatted voucher number", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).toContain("00003-00001001");
    });

    it("should render formatted date", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).toContain("10/05/2026");
    });

    it("should render letter box with cbteLetra", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).toContain('class="letter-box">A</div>');
    });

    it("should render COD for cbteTipo", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).toContain("COD.1");
    });

    it("should render NOTA DE CRÉDITO for cbteTipo 3", () => {
      const html = InvoiceDocument({
        data: makeInvoice({ cbteTipo: 3 }),
        options: baseOptions,
      });
      expect(html).toContain("NOTA DE CRÉDITO");
    });

    it("should use cbteDescripcion when provided", () => {
      const html = InvoiceDocument({
        data: makeInvoice({ cbteDescripcion: "RECIBO" }),
        options: baseOptions,
      });
      expect(html).toContain("RECIBO");
    });
  });

  // ── Receptor ──

  describe("receptor data", () => {
    it("should render receptor razón social", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).toContain("CLIENTE TEST S.R.L.");
    });

    it("should render receptor domicilio", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).toContain("Calle Falsa 456 - S2000BFA - Rosario");
    });

    it("should render '- -' when domicilio is missing", () => {
      const data = makeInvoice({
        receptor: { ...baseReceptor, domicilio: undefined },
      });
      const html = InvoiceDocument({ data, options: baseOptions });
      expect(html).toContain("- -");
    });

    it("should render formatted CUIT for receptor", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).toContain("30-71234567-8");
    });

    it("should render DNI without CUIT formatting", () => {
      const data = makeInvoice({
        receptor: {
          ...baseReceptor,
          documentoTipo: "DNI",
          documentoNro: "32456789",
        },
      });
      const html = InvoiceDocument({ data, options: baseOptions });
      expect(html).toContain("32456789");
    });

    it("should render condición frente al IVA", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).toContain("IVA Responsable Inscripto");
    });

    it("should render condición de venta", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).toContain("Cond. Venta:");
      expect(html).toContain("Contado");
    });

    it("should render vencimiento de pago when present", () => {
      const data = makeInvoice({
        condicionVenta: "Cuenta Corriente",
        fechaVtoPago: "20260610",
      });
      const html = InvoiceDocument({ data, options: baseOptions });
      expect(html).toContain("Vencimiento: 10/06/2026");
    });
  });

  // ── Período de servicio ──

  describe("service period", () => {
    it("should not render period for concepto 1 (productos)", () => {
      const html = InvoiceDocument({
        data: makeInvoice({ concepto: 1 }),
        options: baseOptions,
      });
      expect(html).not.toContain("Período facturado");
    });

    it("should render period for concepto 2 (servicios)", () => {
      const data = makeInvoice({
        concepto: 2,
        fechaServicioDesde: "20260401",
        fechaServicioHasta: "20260430",
      });
      const html = InvoiceDocument({ data, options: baseOptions });
      expect(html).toContain("Período facturado:");
      expect(html).toContain("01/04/2026");
      expect(html).toContain("30/04/2026");
    });

    it("should render period for concepto 3 (productos y servicios)", () => {
      const data = makeInvoice({
        concepto: 3,
        fechaServicioDesde: "20260301",
        fechaServicioHasta: "20260430",
      });
      const html = InvoiceDocument({ data, options: baseOptions });
      expect(html).toContain("Período facturado:");
    });

    it("should render divisa and tipo de cambio in period line", () => {
      const data = makeInvoice({
        concepto: 2,
        moneda: "PES",
        cotizacion: 1,
        fechaServicioDesde: "20260401",
        fechaServicioHasta: "20260430",
      });
      const html = InvoiceDocument({ data, options: baseOptions });
      expect(html).toContain("Divisa:");
      expect(html).toContain("1,000");
    });
  });

  // ── Items table ──

  describe("items table", () => {
    describe("Factura A headers", () => {
      it("should have 7 columns including %IVA", () => {
        const html = InvoiceDocument({
          data: makeInvoice(),
          options: baseOptions,
        });
        expect(html).toContain("Cantidad");
        expect(html).toContain("Producto / Servicio");
        expect(html).toContain("Precio unit");
        expect(html).toContain("%Bonif.");
        expect(html).toContain("$ Bonif.");
        expect(html).toContain("%IVA");
        expect(html).toContain("Subtotal s/IVA");
      });
    });

    describe("Factura B headers", () => {
      it("should have 6 columns without %IVA", () => {
        const data = makeInvoice({ cbteLetra: "B", cbteTipo: 6 });
        const html = InvoiceDocument({ data, options: baseOptions });
        expect(html).toContain("Precio Unit.");
        expect(html).not.toContain("%IVA");
        expect(html).not.toContain("Subtotal s/IVA");
        expect(html).toContain("Subtotal");
      });
    });

    describe("Factura C headers", () => {
      it("should have 6 columns without %IVA", () => {
        const data = makeInvoice({ cbteLetra: "C", cbteTipo: 11 });
        const html = InvoiceDocument({ data, options: baseOptions });
        expect(html).not.toContain("%IVA");
        expect(html).toContain("Subtotal");
      });
    });

    it("should render item description", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).toContain("Servicio de consultoría");
    });

    it("should render quantity with unit", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).toContain("10 horas");
    });

    it("should render formatted price", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).toContain("$ 5.000,00");
    });

    it("should render bonificacion percentage", () => {
      const data = makeInvoice({
        items: [
          {
            descripcion: "Item con bonif",
            cantidad: 1,
            unidadMedida: "unidades",
            precioUnitario: 10000,
            bonificacion: 15,
            subtotal: 8500,
            alicuotaIva: 21,
          },
        ],
      });
      const html = InvoiceDocument({ data, options: baseOptions });
      expect(html).toContain("15%");
    });

    it("should render IVA alicuota for Factura A", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).toContain("21%");
    });

    it("should render formatted subtotal", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).toContain("$ 50.000,00");
    });

    it("should render multiple items", () => {
      const data = makeInvoice({
        items: [
          {
            descripcion: "Item uno",
            cantidad: 1,
            unidadMedida: "unidades",
            precioUnitario: 1000,
            subtotal: 1000,
            alicuotaIva: 21,
          },
          {
            descripcion: "Item dos",
            cantidad: 2,
            unidadMedida: "kg",
            precioUnitario: 500,
            subtotal: 1000,
            alicuotaIva: 10.5,
          },
          {
            descripcion: "Item tres",
            cantidad: 3,
            unidadMedida: "horas",
            precioUnitario: 300,
            subtotal: 900,
            alicuotaIva: 21,
          },
        ],
      });
      const html = InvoiceDocument({ data, options: baseOptions });
      expect(html).toContain("Item uno");
      expect(html).toContain("Item dos");
      expect(html).toContain("Item tres");
      expect(html).toContain("2 kg");
      expect(html).toContain("10.5%");
    });
  });

  // ── Totals ──

  describe("totals", () => {
    describe("Factura A totals", () => {
      it("should show importe neto gravado", () => {
        const html = InvoiceDocument({
          data: makeInvoice(),
          options: baseOptions,
        });
        expect(html).toContain("Importe neto gravado");
        expect(html).toContain("$ 50.000,00");
      });

      it("should show IVA breakdown by alicuota", () => {
        const data = makeInvoice({
          iva: [
            { id: 5, descripcion: "21%", baseImponible: 40000, importe: 8400 },
            {
              id: 4,
              descripcion: "10.5%",
              baseImponible: 10000,
              importe: 1050,
            },
          ],
        });
        const html = InvoiceDocument({ data, options: baseOptions });
        expect(html).toContain("IVA 21%");
        expect(html).toContain("IVA 10.5%");
      });

      it("should show generic IVA when no iva detail but importeIva > 0", () => {
        const data = makeInvoice({ iva: undefined, importeIva: 10500 });
        const html = InvoiceDocument({ data, options: baseOptions });
        expect(html).toContain(">IVA<");
      });

      it("should show No gravados", () => {
        const data = makeInvoice({ importeNetoNoGravado: 5000 });
        const html = InvoiceDocument({ data, options: baseOptions });
        expect(html).toContain("No gravados");
        expect(html).toContain("$ 5.000,00");
      });

      it("should show Exentos", () => {
        const data = makeInvoice({ importeExento: 3000 });
        const html = InvoiceDocument({ data, options: baseOptions });
        expect(html).toContain("Exentos");
        expect(html).toContain("$ 3.000,00");
      });

      it("should show $ 0,00 for No gravados/Exentos when not set", () => {
        const html = InvoiceDocument({
          data: makeInvoice(),
          options: baseOptions,
        });
        const matches = html.match(/\$ 0,00/g);
        // Bonificación General + No gravados + Exentos + Otros Tributos = at least 4
        expect(matches!.length).toBeGreaterThanOrEqual(4);
      });
    });

    describe("Factura B totals", () => {
      it("should show Subtotal instead of Importe neto gravado", () => {
        const data = makeInvoice({
          cbteLetra: "B",
          cbteTipo: 6,
          importeIva: 0,
        });
        const html = InvoiceDocument({ data, options: baseOptions });
        expect(html).toContain(">Subtotal<");
        expect(html).not.toContain("Importe neto gravado");
      });

      it("should not show IVA breakdown", () => {
        const data = makeInvoice({
          cbteLetra: "B",
          cbteTipo: 6,
          importeIva: 0,
        });
        const html = InvoiceDocument({ data, options: baseOptions });
        expect(html).not.toContain("IVA 21%");
        expect(html).not.toContain("No gravados");
      });
    });

    describe("Factura C totals", () => {
      it("should show Importe neto gravado", () => {
        const data = makeInvoice({
          cbteLetra: "C",
          cbteTipo: 11,
          importeIva: 0,
        });
        const html = InvoiceDocument({ data, options: baseOptions });
        expect(html).toContain("Importe neto gravado");
      });
    });

    it("should show Importe Otros Tributos", () => {
      const data = makeInvoice({ importeTributos: 15000 });
      const html = InvoiceDocument({ data, options: baseOptions });
      expect(html).toContain("Importe Otros Tributos");
      expect(html).toContain("$ 15.000,00");
    });

    it("should show Importe Total", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).toContain("Importe Total");
      expect(html).toContain("$ 60.500,00");
    });

    it("should show number in words (Son ...)", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).toContain("Son PESOS ARGENTINOS (ARS)");
      expect(html).toContain("SESENTA MIL QUINIENTOS CON 00/100");
    });
  });

  // ── Tributos ──

  describe("tributos section", () => {
    it("should not render tributos when none present", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).not.toContain("Detalle de otros tributos");
    });

    it("should render tributos table when present", () => {
      const data = makeInvoice({
        tributos: [
          {
            id: 99,
            descripcion: "Percepción IIBB",
            baseImponible: 50000,
            alicuota: 3,
            importe: 1500,
          },
        ],
        importeTributos: 1500,
      });
      const html = InvoiceDocument({ data, options: baseOptions });
      expect(html).toContain("Detalle de otros tributos");
      expect(html).toContain("Percepción IIBB");
      expect(html).toContain("$ 1.500,00");
    });

    it("should render multiple tributos", () => {
      const data = makeInvoice({
        tributos: [
          {
            id: 99,
            descripcion: "Percepción IIBB",
            baseImponible: 50000,
            alicuota: 3,
            importe: 1500,
          },
          {
            id: 6,
            descripcion: "Percepción IVA",
            baseImponible: 50000,
            alicuota: 1,
            importe: 500,
          },
        ],
        importeTributos: 2000,
      });
      const html = InvoiceDocument({ data, options: baseOptions });
      expect(html).toContain("Percepción IIBB");
      expect(html).toContain("Percepción IVA");
    });
  });

  // ── CAE / QR section ──

  describe("CAE and QR", () => {
    it("should render CAE number", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).toContain("CAE N°: 72643218900001");
    });

    it("should render CAE vencimiento date formatted", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).toContain("20/05/2026");
    });

    it("should render ARCA block", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).toContain("ARCA");
      expect(html).toContain("Comprobante Autorizado");
    });

    it("should render QR image when qrDataUrl provided", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
        qrDataUrl: "data:image/png;base64,ABC123",
      });
      expect(html).toContain('src="data:image/png;base64,ABC123"');
      expect(html).toContain('class="qr-img"');
    });

    it("should not render QR image when qrDataUrl is undefined", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
        qrDataUrl: undefined,
      });
      expect(html).not.toContain('class="qr-img"');
    });
  });

  // ── Observaciones ──

  describe("observaciones", () => {
    it("should render observaciones when present", () => {
      const data = makeInvoice({ observaciones: "Nota importante de prueba" });
      const html = InvoiceDocument({ data, options: baseOptions });
      expect(html).toContain("Observaciones: Nota importante de prueba");
    });

    it("should not render observaciones when absent", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).not.toContain("Observaciones:");
    });
  });

  // ── Comprobantes asociados ──

  describe("comprobantes asociados", () => {
    it("should not render when no cbtesAsociados", () => {
      const html = InvoiceDocument({
        data: makeInvoice(),
        options: baseOptions,
      });
      expect(html).not.toContain("Comprobantes asociados");
    });

    it("should render associated voucher info", () => {
      const data = makeInvoice({
        cbteTipo: 3,
        cbtesAsociados: [
          {
            tipo: 1,
            puntoVenta: 1,
            numero: 487,
            cuit: "30711223344",
            fecha: "20260501",
          },
        ],
      });
      const html = InvoiceDocument({ data, options: baseOptions });
      expect(html).toContain("Comprobantes asociados:");
      expect(html).toContain("FACTURA");
      expect(html).toContain("00001-00000487");
      expect(html).toContain("01/05/2026");
    });

    it("should render multiple associated vouchers", () => {
      const data = makeInvoice({
        cbtesAsociados: [
          { tipo: 1, puntoVenta: 1, numero: 100 },
          { tipo: 1, puntoVenta: 1, numero: 101 },
        ],
      });
      const html = InvoiceDocument({ data, options: baseOptions });
      expect(html).toContain("00001-00000100");
      expect(html).toContain("00001-00000101");
    });
  });

  // ── Currency handling ──

  describe("currency", () => {
    it("should use $ for PES", () => {
      const html = InvoiceDocument({
        data: makeInvoice({ moneda: "PES" }),
        options: baseOptions,
      });
      expect(html).toContain("$ 60.500,00");
    });

    it("should use US$ for DOL", () => {
      const data = makeInvoice({ moneda: "DOL", cotizacion: 1200 });
      const html = InvoiceDocument({ data, options: baseOptions });
      expect(html).toContain("US$");
    });

    it("should show correct currency name in Son line", () => {
      const data = makeInvoice({ moneda: "DOL", importeTotal: 100 });
      const html = InvoiceDocument({ data, options: baseOptions });
      expect(html).toContain("DÓLARES ESTADOUNIDENSES (USD)");
    });
  });

  // ── Number to words ──

  describe("number to words", () => {
    it("should convert 0 correctly", () => {
      const data = makeInvoice({ importeTotal: 0 });
      const html = InvoiceDocument({ data, options: baseOptions });
      expect(html).toContain("CERO CON 00/100");
    });

    it("should convert integer correctly", () => {
      const data = makeInvoice({ importeTotal: 1000 });
      const html = InvoiceDocument({ data, options: baseOptions });
      expect(html).toContain("MIL CON 00/100");
    });

    it("should convert with cents", () => {
      const data = makeInvoice({ importeTotal: 1234.56 });
      const html = InvoiceDocument({ data, options: baseOptions });
      expect(html).toContain("MIL DOSCIENTOS TREINTA Y CUATRO CON 56/100");
    });

    it("should convert millions", () => {
      const data = makeInvoice({ importeTotal: 2500000 });
      const html = InvoiceDocument({ data, options: baseOptions });
      expect(html).toContain("DOS MILLONES QUINIENTOS MIL CON 00/100");
    });

    it("should convert 100 as CIEN", () => {
      const data = makeInvoice({ importeTotal: 100 });
      const html = InvoiceDocument({ data, options: baseOptions });
      expect(html).toContain("CIEN CON 00/100");
    });

    it("should convert 1000000 as UN MILLÓN", () => {
      const data = makeInvoice({ importeTotal: 1000000 });
      const html = InvoiceDocument({ data, options: baseOptions });
      expect(html).toContain("UN MILLÓN CON 00/100");
    });
  });
});
