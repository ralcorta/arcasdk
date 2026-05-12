# Generador de PDF

El paquete `@arcasdk/pdf` permite generar comprobantes electrónicos en formato PDF con el diseño oficial de ARCA (ex AFIP). Soporta Facturas, Notas de Crédito, Notas de Débito y comprobantes MiPyME en letras A, B y C.

::: tip Paquete independiente
`@arcasdk/pdf` es un paquete independiente de `@arcasdk/core`. Podés usarlo sin el SDK core construyendo los datos manualmente, o combinarlo con `@arcasdk/core` para generar PDFs a partir de comprobantes ya emitidos.
:::

[[toc]]

---

## Instalación

::: code-group

```bash [npm]
npm i @arcasdk/pdf
```

```bash [yarn]
yarn add @arcasdk/pdf
```

```bash [pnpm]
pnpm add @arcasdk/pdf
```

:::

::: warning Requisito
Este paquete usa [Puppeteer](https://pptr.dev/) para renderizar el HTML a PDF. Puppeteer descarga Chromium automáticamente al instalar. En entornos serverless o CI, podés necesitar configurar Puppeteer para usar un binario externo.
:::

---

## Uso básico

```ts
import { InvoicePdfGenerator, InvoiceData } from "@arcasdk/pdf";

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
  moneda: "PES",
  condicionVenta: "Contado",
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

// Guardar a archivo
import { writeFileSync } from "fs";
writeFileSync("factura.pdf", pdfBuffer);
```

---

## Opciones de configuración

Se pasan al constructor de `InvoicePdfGenerator`:

```ts
const generator = new InvoicePdfGenerator({
  pageSize: "A4",
  margin: 10,
  includeQr: true,
  copy: "ORIGINAL",
  footerText: "Documento no válido como factura",
});
```

| Opción       | Tipo                                     | Default      | Descripción                                        |
| ------------ | ---------------------------------------- | ------------ | -------------------------------------------------- |
| `pageSize`   | `"A4"` \| `"LETTER"` \| `"LEGAL"`       | `"A4"`       | Tamaño de página                                   |
| `margin`     | `number`                                 | `10`         | Márgenes en puntos                                 |
| `includeQr`  | `boolean`                                | `true`       | Incluir código QR de verificación ARCA             |
| `copy`       | `CopyType`                               | `"ORIGINAL"` | Banner de copia (ORIGINAL, DUPLICADO, etc.)        |
| `copies`     | `CopyType[]`                             | —            | Generar múltiples copias en un solo PDF            |
| `logo`       | `Buffer`                                 | —            | Logo del emisor (PNG/JPG)                          |
| `logoWidth`  | `number`                                 | `80`         | Ancho del logo en puntos                           |
| `footerText` | `string`                                 | —            | Texto adicional en el pie de página                |
| `template`   | `(props: InvoiceTemplateProps) => string` | —            | Template HTML personalizado                        |

### CopyType

```ts
type CopyType = "ORIGINAL" | "DUPLICADO" | "TRIPLICADO" | "CUADRUPLICADO";
```

---

## Generar múltiples copias

Para generar ORIGINAL + DUPLICADO + TRIPLICADO en un solo PDF:

```ts
const generator = new InvoicePdfGenerator({
  copies: ["ORIGINAL", "DUPLICADO", "TRIPLICADO"],
});

const pdfBuffer = await generator.generate(data);
// Resultado: un PDF con 3 páginas (o más si el comprobante tiene varias páginas)
```

---

## Stream

Para generar el PDF como un `Readable` stream:

```ts
const generator = new InvoicePdfGenerator();
const stream = await generator.generateStream(data);

// Ejemplo: enviar como respuesta HTTP en Express
res.setHeader("Content-Type", "application/pdf");
stream.pipe(res);
```

---

## Tipos de comprobante soportados

El template detecta automáticamente el tipo de comprobante por `cbteTipo` y adapta el diseño:

| `cbteTipo` | Comprobante                           | Letra | Columna %IVA | Desglose IVA |
| ---------- | ------------------------------------- | ----- | ------------- | ------------ |
| 1          | Factura A                             | A     | ✅            | ✅           |
| 2          | Nota de Débito A                      | A     | ✅            | ✅           |
| 3          | Nota de Crédito A                     | A     | ✅            | ✅           |
| 6          | Factura B                             | B     | ❌            | ❌           |
| 7          | Nota de Débito B                      | B     | ❌            | ❌           |
| 8          | Nota de Crédito B                     | B     | ❌            | ❌           |
| 11         | Factura C                             | C     | ❌            | ❌           |
| 12         | Nota de Débito C                      | C     | ❌            | ❌           |
| 13         | Nota de Crédito C                     | C     | ❌            | ❌           |
| 201        | Factura de Crédito MiPyMEs (FCE) A    | A     | ✅            | ✅           |
| 206        | Factura de Crédito MiPyMEs (FCE) B    | B     | ❌            | ❌           |
| 211        | Factura de Crédito MiPyMEs (FCE) C    | C     | ❌            | ❌           |

### Diferencias por letra

- **Factura A**: 7 columnas en items (incluye %IVA y Subtotal s/IVA), muestra desglose de IVA, No gravados y Exentos en totales
- **Factura B**: 6 columnas (sin %IVA), muestra "Subtotal" en totales, sin desglose de IVA
- **Factura C**: 6 columnas (sin %IVA), muestra "Importe neto gravado" en totales, sin desglose de IVA

---

## Estructura de datos

### `InvoiceData`

| Campo                  | Tipo                 | Requerido | Descripción                                     |
| ---------------------- | -------------------- | --------- | ----------------------------------------------- |
| `emisor`               | `EmisorData`         | ✅        | Datos del emisor                                |
| `receptor`             | `ReceptorData`       | ✅        | Datos del receptor                              |
| `cbteTipo`             | `number`             | ✅        | Tipo de comprobante                             |
| `cbteLetra`            | `string`             | ✅        | Letra del comprobante (A, B, C)                 |
| `puntoVenta`           | `number`             | ✅        | Punto de venta                                  |
| `cbteDesde`            | `number`             | ✅        | Número de comprobante                           |
| `cbteHasta`            | `number`             | ✅        | Número de comprobante hasta                     |
| `cbteFecha`            | `string`             | ✅        | Fecha (YYYYMMDD)                                |
| `concepto`             | `number`             | ✅        | 1=Productos, 2=Servicios, 3=Ambos              |
| `items`                | `InvoiceItem[]`      | ✅        | Items de la factura                             |
| `importeNetoGravado`   | `number`             | ✅        | Importe neto gravado                            |
| `importeIva`           | `number`             | ✅        | Importe total de IVA                            |
| `importeTotal`         | `number`             | ✅        | Importe total                                   |
| `cae`                  | `string`             | ✅        | CAE                                             |
| `caeFechaVencimiento`  | `string`             | ✅        | Vencimiento del CAE (YYYYMMDD)                  |
| `moneda`               | `string`             | —         | Moneda ("PES", "DOL")                           |
| `cotizacion`           | `number`             | —         | Cotización de la moneda                         |
| `condicionVenta`       | `string`             | —         | Condición de venta                              |
| `fechaServicioDesde`   | `string`             | —         | Período desde (conceptos 2 y 3)                 |
| `fechaServicioHasta`   | `string`             | —         | Período hasta (conceptos 2 y 3)                 |
| `fechaVtoPago`         | `string`             | —         | Vencimiento de pago                             |
| `importeNetoNoGravado` | `number`             | —         | Importe no gravado                              |
| `importeExento`        | `number`             | —         | Importe exento                                  |
| `iva`                  | `IvaDetail[]`        | —         | Desglose de IVA por alícuota                    |
| `tributos`             | `TributoDetail[]`    | —         | Otros tributos                                  |
| `importeTributos`      | `number`             | —         | Importe total de tributos                       |
| `cbtesAsociados`       | `ComprobanteAsociado[]` | —      | Comprobantes asociados (NC/ND)                  |
| `observaciones`        | `string`             | —         | Observaciones                                   |
| `cbteDescripcion`      | `string`             | —         | Descripción personalizada del comprobante       |

### `InvoiceItem`

| Campo            | Tipo     | Requerido | Descripción                        |
| ---------------- | -------- | --------- | ---------------------------------- |
| `descripcion`    | `string` | ✅        | Descripción del producto/servicio  |
| `cantidad`       | `number` | ✅        | Cantidad                           |
| `unidadMedida`   | `string` | ✅        | Unidad de medida                   |
| `precioUnitario` | `number` | ✅        | Precio unitario                    |
| `subtotal`       | `number` | ✅        | Subtotal del item                  |
| `codigo`         | `string` | —         | Código del producto                |
| `bonificacion`   | `number` | —         | Porcentaje de bonificación         |
| `alicuotaIva`    | `number` | —         | Alícuota de IVA (solo Factura A)   |

---

## Template personalizado

Podés reemplazar el template HTML por defecto con uno propio:

```ts
import {
  InvoicePdfGenerator,
  InvoiceTemplateProps,
} from "@arcasdk/pdf";

function MiTemplate({ data, options, qrDataUrl }: InvoiceTemplateProps): string {
  return `
    <html>
      <body>
        <h1>${data.emisor.razonSocial}</h1>
        <p>Factura ${data.cbteLetra} Nro ${data.puntoVenta}-${data.cbteDesde}</p>
        <p>Total: $${data.importeTotal}</p>
        ${qrDataUrl ? `<img src="${qrDataUrl}" width="100" />` : ""}
      </body>
    </html>
  `;
}

const generator = new InvoicePdfGenerator({ template: MiTemplate });
const pdf = await generator.generate(data);
```

El template recibe:
- `data`: los datos del comprobante (`InvoiceData`)
- `options`: las opciones resueltas (`ResolvedPdfOptions`)
- `qrDataUrl`: data URL del QR (si `includeQr` es `true`)

---

## Uso con `@arcasdk/core`

Ejemplo de cómo generar un PDF a partir de un comprobante emitido con el SDK core:

```ts
import { Arca } from "@arcasdk/core";
import { InvoicePdfGenerator, InvoiceData } from "@arcasdk/pdf";

const arca = new Arca({ key: "...", cert: "...", cuit: 20111111112 });

// 1. Emitir el comprobante
const result = await arca.electronicBillingService.createInvoice({
  CantReg: 1,
  PtoVta: 3,
  CbteTipo: 1,
  // ... resto de los parámetros
});

// 2. Construir los datos para el PDF
const invoiceData: InvoiceData = {
  emisor: {
    razonSocial: "Mi Empresa S.A.",
    domicilioComercial: "Av. Corrientes 1234, CABA",
    condicionIva: "IVA Responsable Inscripto",
    cuit: "20111111112",
    iibb: "12-3456789-0",
    fechaInicioActividades: "20180301",
  },
  receptor: {
    razonSocial: "Cliente S.R.L.",
    domicilio: "Calle Falsa 456",
    condicionIva: "IVA Responsable Inscripto",
    documentoTipo: "CUIT",
    documentoNro: "30712345678",
  },
  cbteTipo: 1,
  cbteLetra: "A",
  puntoVenta: 3,
  cbteDesde: result.CbteDesde,
  cbteHasta: result.CbteHasta,
  cbteFecha: result.CbteFch,
  concepto: 1,
  items: [
    /* ... tus items ... */
  ],
  importeNetoGravado: 100,
  importeIva: 21,
  iva: [{ id: 5, descripcion: "21%", baseImponible: 100, importe: 21 }],
  importeTotal: 121,
  cae: result.CAE,
  caeFechaVencimiento: result.CAEFchVto,
};

// 3. Generar el PDF
const generator = new InvoicePdfGenerator();
const pdfBuffer = await generator.generate(invoiceData);
```

---

## Monedas soportadas

| Código | Moneda                       | Símbolo |
| ------ | ---------------------------- | ------- |
| `PES`  | Pesos Argentinos (ARS)       | $       |
| `DOL`  | Dólares Estadounidenses (USD)| US$     |

La moneda se refleja en el símbolo de todos los importes y en la leyenda "Son PESOS ARGENTINOS (ARS) ..." al pie.
