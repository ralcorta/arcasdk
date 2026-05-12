# @arcasdk/pdf

Generador de comprobantes electrónicos en formato PDF con diseño oficial de ARCA (ex AFIP).

[![npm](https://img.shields.io/npm/v/@arcasdk/pdf.svg?style=flat-square)](https://npmjs.org/package/@arcasdk/pdf)

## Características

- Genera PDFs de Facturas, Notas de Crédito y Notas de Débito (letras A, B, C)
- Diseño adaptado al formato oficial de ARCA
- Código QR de verificación automático
- Soporte para múltiples copias (Original, Duplicado, Triplicado, Cuadruplicado)
- Soporte para servicios (período facturado, vencimiento de pago)
- Soporte para tributos adicionales y comprobantes asociados
- Monedas: Pesos Argentinos (ARS) y Dólares Estadounidenses (USD)
- Templates personalizables
- Independiente de `@arcasdk/core` — se puede usar de forma standalone

## Instalación

```bash
npm i @arcasdk/pdf
```

## Uso rápido

```ts
import { InvoicePdfGenerator, InvoiceData } from "@arcasdk/pdf";
import { writeFileSync } from "fs";

const data: InvoiceData = {
  emisor: {
    razonSocial: "Mi Empresa S.A.",
    domicilioComercial: "Av. Corrientes 1234, CABA",
    condicionIva: "IVA Responsable Inscripto",
    cuit: "20304050607",
    iibb: "12-3456789-0",
    fechaInicioActividades: "20180301",
  },
  receptor: {
    razonSocial: "Cliente S.R.L.",
    domicilio: "Calle Falsa 456, Rosario",
    condicionIva: "IVA Responsable Inscripto",
    documentoTipo: "CUIT",
    documentoNro: "30712345678",
  },
  cbteTipo: 1,
  cbteLetra: "A",
  puntoVenta: 3,
  cbteDesde: 152,
  cbteHasta: 152,
  cbteFecha: "20240515",
  concepto: 1,
  items: [
    {
      descripcion: "Servicio de consultoría",
      cantidad: 10,
      unidadMedida: "horas",
      precioUnitario: 5000,
      subtotal: 50000,
      alicuotaIva: 21,
    },
  ],
  importeNetoGravado: 50000,
  importeIva: 10500,
  iva: [{ id: 5, descripcion: "21%", baseImponible: 50000, importe: 10500 }],
  importeTotal: 60500,
  cae: "74512345678901",
  caeFechaVencimiento: "20240525",
};

const generator = new InvoicePdfGenerator();
const pdfBuffer = await generator.generate(data);
writeFileSync("factura.pdf", pdfBuffer);
```

## Opciones

```ts
const generator = new InvoicePdfGenerator({
  pageSize: "A4", // "A4" | "LETTER" | "LEGAL"
  margin: 10, // Márgenes en puntos
  includeQr: true, // Código QR de verificación ARCA
  copy: "ORIGINAL", // Banner de copia
  footerText: "Pie custom", // Texto en el footer
});
```

### Múltiples copias

```ts
const generator = new InvoicePdfGenerator({
  copies: ["ORIGINAL", "DUPLICADO", "TRIPLICADO"],
});
const pdf = await generator.generate(data);
// Un solo PDF con 3 copias completas
```

### Stream

```ts
const stream = await generator.generateStream(data);
stream.pipe(res); // Express response
```

## Documentación

Para la documentación completa (tipos de comprobante, estructura de datos, templates personalizados, integración con `@arcasdk/core`):

📖 [Ver documentación completa](https://ralcorta.github.io/arcasdk/services/pdf)

## Licencia

MIT
