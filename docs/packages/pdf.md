# 🧾 Generador de PDF

El paquete `@arcasdk/pdf` permite generar comprobantes electrónicos en formato PDF con el diseño oficial de ARCA (ex AFIP). Soporta Facturas, Notas de Crédito, Notas de Débito y comprobantes MiPyME en letras A, B, C, E y M.

::: tip Paquete independiente
`@arcasdk/pdf` es un paquete independiente de `@arcasdk/core`. Podés usarlo sin el SDK core construyendo los datos manualmente, o combinarlo con `@arcasdk/core` para generar PDFs a partir de comprobantes ya emitidos.
:::

[[toc]]

---

## Vista previa

<div class="pdf-demo">
  <div class="pdf-demo-header">
    <span class="pdf-demo-badge">🧾 Factura A · datos de prueba</span>
    <div class="pdf-demo-actions">
      <a class="pdf-demo-link primary" href="/packages/pdf/factura-a-demo.pdf" target="_blank" rel="noopener">Abrir PDF</a>
      <a class="pdf-demo-link" href="/packages/pdf/factura-a-demo.pdf" download="factura-a-demo.pdf">Descargar ejemplo</a>
    </div>
  </div>

  <a href="/packages/pdf/factura-a-demo.pdf" target="_blank" rel="noopener" class="pdf-demo-preview">
    <img src="/packages/pdf/factura-a-demo.png" alt="Vista previa de Factura A generada con @arcasdk/pdf" loading="lazy" />
  </a>
  <p class="pdf-demo-caption">
    Factura A con 3 ítems, desglose de IVA, tributos y código QR. Todos los datos son ficticios.
  </p>

  <div class="pdf-demo-data">
    <div class="pdf-demo-data-item">
      <strong>Comprobante</strong>
      Factura A 00001-00000487
    </div>
    <div class="pdf-demo-data-item">
      <strong>Emisor</strong>
      Estudio Contable de Prueba
    </div>
    <div class="pdf-demo-data-item">
      <strong>Receptor</strong>
      Farmacia de Prueba S.A.
    </div>
    <div class="pdf-demo-data-item">
      <strong>Importe total</strong>
      $ 711.275,00
    </div>
  </div>

  <details class="pdf-demo-viewer">
    <summary>Ver PDF embebido</summary>
    <iframe src="/packages/pdf/factura-a-demo.pdf" title="Factura A de ejemplo"></iframe>
  </details>
</div>

Los datos de este ejemplo (ficticios) son los mismos que podés usar en tu código:

```ts
const data: InvoiceData = {
  emisor: {
    razonSocial: "ESTUDIO CONTABLE DE PRUEBA",
    domicilioComercial: "Mitre 456 Piso 2 Of. C - C1036AAR - CABA",
    condicionIva: "IVA Responsable Inscripto",
    cuit: "30702345678",
    iibb: "903-223344-5",
    fechaInicioActividades: "20110301",
    contacto: "contacto@estudio-prueba.com.ar",
  },
  receptor: {
    razonSocial: "FARMACIA DE PRUEBA S.A.",
    domicilio: "Bv. España 2300 - S2000DSR - Rosario - Santa Fe",
    condicionIva: "IVA Responsable Inscripto",
    documentoTipo: "CUIT",
    documentoNro: "30901876543",
  },
  cbteTipo: 1,
  cbteLetra: "A",
  puntoVenta: 1,
  cbteDesde: 487,
  cbteHasta: 487,
  cbteFecha: "20260501",
  concepto: 2,
  moneda: "PES",
  condicionVenta: "Cuenta Corriente - 30 días",
  fechaServicioDesde: "20260401",
  fechaServicioHasta: "20260430",
  fechaVtoPago: "20260531",
  items: [
    {
      codigo: "HON-001",
      descripcion: "Honorarios profesionales - Liquidación de sueldos abril 2026",
      cantidad: 1,
      unidadMedida: "unidades",
      precioUnitario: 320000,
      subtotal: 320000,
      alicuotaIva: 21,
    },
    {
      codigo: "HON-002",
      descripcion: "Asesoramiento impositivo mensual",
      cantidad: 1,
      unidadMedida: "unidades",
      precioUnitario: 180000,
      bonificacion: 10,
      subtotal: 162000,
      alicuotaIva: 21,
    },
    {
      codigo: "HON-003",
      descripcion: "Certificación de balances",
      cantidad: 1,
      unidadMedida: "unidades",
      precioUnitario: 95000,
      subtotal: 95000,
      alicuotaIva: 10.5,
    },
  ],
  importeNetoGravado: 577000,
  importeIva: 111195,
  iva: [
    { id: 5, descripcion: "21%", baseImponible: 482000, importe: 101220 },
    { id: 4, descripcion: "10.5%", baseImponible: 95000, importe: 9975 },
  ],
  tributos: [
    {
      id: 99,
      descripcion: "Percepción IIBB CABA",
      baseImponible: 577000,
      alicuota: 3,
      importe: 17310,
    },
    {
      id: 6,
      descripcion: "Percepción IVA",
      baseImponible: 577000,
      alicuota: 1,
      importe: 5770,
    },
  ],
  importeTributos: 23080,
  importeTotal: 711275,
  cae: "72643218900002",
  caeFechaVencimiento: "20260511",
};

const generator = new InvoicePdfGenerator();
const pdfBuffer = await generator.generate(data);
```

Para regenerar la vista previa de la documentación después de cambiar el template:

```bash
npm run generate:docs-demo --workspace=@arcasdk/pdf
```

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
import { writeFileSync } from "fs";

const data: InvoiceData = {
  emisor: {
    razonSocial: "Empresa de Prueba S.A.",
    domicilioComercial: "Av. Corrientes 1234, CABA",
    condicionIva: "IVA Responsable Inscripto",
    cuit: "20111111117",
    iibb: "12-3456789-0",
    fechaInicioActividades: "20180301",
  },
  receptor: {
    razonSocial: "Cliente de Prueba S.R.L.",
    domicilio: "Calle Falsa 456, Rosario",
    condicionIva: "IVA Responsable Inscripto",
    documentoTipo: "CUIT",
    documentoNro: "30111111118",
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
  footerText: "Documento no válido como factura",
  logo: "data:image/png;base64,...",
  logoWidth: 80,
});
```

| Opción       | Tipo                                                  | Default      | Descripción                                                 |
| ------------ | ----------------------------------------------------- | ------------ | ----------------------------------------------------------- |
| `pageSize`   | `"A4"` \| `"LETTER"` \| `"LEGAL"`                     | `"A4"`       | Tamaño de página                                            |
| `margin`     | `number`                                              | `10`         | Márgenes en mm                                              |
| `includeQr`  | `boolean`                                             | `true`       | Incluir código QR de verificación ARCA                      |
| `copy`       | `CopyType`                                            | `"ORIGINAL"` | Banner de copia (ORIGINAL, DUPLICADO, etc.)                 |
| `copies`     | `CopyType[]`                                          | —            | Generar múltiples copias en un solo PDF                     |
| `logo`       | `string`                                              | —            | Logo del emisor como data URL (`data:image/png;base64,...`) |
| `logoWidth`  | `number`                                              | `60`         | Ancho del logo en px                                        |
| `footerText` | `string`                                              | —            | Texto adicional en el pie de cada página                    |
| `template`   | `string \| ((props: InvoiceTemplateProps) => string)` | —            | Template personalizado (Handlebars string o función)        |

### CopyType

```ts
type CopyType = "ORIGINAL" | "DUPLICADO" | "TRIPLICADO" | "CUADRUPLICADO";
```

---

## Múltiples copias

Para generar ORIGINAL + DUPLICADO + TRIPLICADO en un solo PDF:

```ts
const generator = new InvoicePdfGenerator({
  copies: ["ORIGINAL", "DUPLICADO", "TRIPLICADO"],
});

const pdfBuffer = await generator.generate(data);
```

---

## Stream

Para obtener un `Readable` stream en lugar de un `Buffer`:

```ts
const generator = new InvoicePdfGenerator();
const stream = await generator.generateStream(data);

// Ejemplo con Express
res.setHeader("Content-Type", "application/pdf");
stream.pipe(res);
```

---

## Estructura de datos

### `InvoiceData`

| Campo                     | Tipo                    | Requerido | Descripción                                    |
| ------------------------- | ----------------------- | --------- | ---------------------------------------------- |
| `emisor`                  | `EmisorData`            | ✅        | Datos del emisor                               |
| `receptor`                | `ReceptorData`          | ✅        | Datos del receptor                             |
| `cbteTipo`                | `number`                | ✅        | Tipo de comprobante (1, 6, 11, 19, etc.)       |
| `cbteLetra`               | `string`                | ✅        | Letra del comprobante (A, B, C, E, M)          |
| `puntoVenta`              | `number`                | ✅        | Punto de venta                                 |
| `cbteDesde`               | `number`                | ✅        | Número de comprobante                          |
| `cbteHasta`               | `number`                | ✅        | Número de comprobante hasta                    |
| `cbteFecha`               | `string`                | ✅        | Fecha (YYYYMMDD)                               |
| `concepto`                | `number`                | ✅        | 1=Productos, 2=Servicios, 3=Ambos              |
| `items`                   | `InvoiceItem[]`         | ✅        | Items de la factura                            |
| `importeNetoGravado`      | `number`                | ✅        | Importe neto gravado                           |
| `importeIva`              | `number`                | ✅        | Importe total de IVA                           |
| `importeTotal`            | `number`                | ✅        | Importe total                                  |
| `cae`                     | `string`                | ✅        | CAE                                            |
| `caeFechaVencimiento`     | `string`                | ✅        | Vencimiento del CAE (YYYYMMDD)                 |
| `moneda`                  | `string`                | —         | Moneda (`"PES"`, `"DOL"`)                      |
| `cotizacion`              | `number`                | —         | Cotización de la moneda                        |
| `condicionVenta`          | `string`                | —         | Condición de venta                             |
| `fechaServicioDesde`      | `string`                | —         | Período desde (conceptos 2 y 3)                |
| `fechaServicioHasta`      | `string`                | —         | Período hasta (conceptos 2 y 3)                |
| `fechaVtoPago`            | `string`                | —         | Vencimiento de pago                            |
| `importeNetoNoGravado`    | `number`                | —         | Importe no gravado                             |
| `importeExento`           | `number`                | —         | Importe exento                                 |
| `iva`                     | `IvaDetail[]`           | —         | Desglose de IVA por alícuota                   |
| `tributos`                | `TributoDetail[]`       | —         | Otros tributos                                 |
| `importeTributos`         | `number`                | —         | Importe total de tributos                      |
| `cbtesAsociados`          | `ComprobanteAsociado[]` | —         | Comprobantes asociados (NC/ND)                 |
| `observaciones`           | `string`                | —         | Observaciones                                  |
| `cbteDescripcion`         | `string`                | —         | Descripción personalizada del comprobante      |
| `importeTotalPesos`       | `number`                | —         | Total en ARS pre-calculado (moneda extranjera) |
| `divisa`                  | `string`                | —         | Divisa (Factura E)                             |
| `destinoComprobante`      | `string`                | —         | País destino (Factura E)                       |
| `formaPago`               | `string`                | —         | Forma de pago (Factura E)                      |
| `incoterms`               | `string`                | —         | Incoterms (Factura E)                          |
| `fechaPago`               | `string`                | —         | Fecha de pago YYYYMMDD (Factura E)             |
| `condicionIvaExportacion` | `string`                | —         | Leyenda IVA exportación (Factura E)            |

### `EmisorData`

| Campo                    | Tipo     | Requerido | Descripción                         |
| ------------------------ | -------- | --------- | ----------------------------------- |
| `razonSocial`            | `string` | ✅        | Razón social                        |
| `domicilioComercial`     | `string` | ✅        | Domicilio comercial                 |
| `condicionIva`           | `string` | ✅        | Condición frente al IVA             |
| `cuit`                   | `string` | ✅        | CUIT (11 dígitos sin guiones)       |
| `iibb`                   | `string` | ✅        | Ingresos Brutos                     |
| `fechaInicioActividades` | `string` | ✅        | Fecha inicio actividades (YYYYMMDD) |
| `contacto`               | `string` | —         | Contacto (email, teléfono, web)     |

### `ReceptorData`

| Campo           | Tipo     | Requerido | Descripción                           |
| --------------- | -------- | --------- | ------------------------------------- |
| `razonSocial`   | `string` | ✅        | Razón social                          |
| `condicionIva`  | `string` | ✅        | Condición frente al IVA               |
| `documentoTipo` | `string` | ✅        | Tipo de documento (`"CUIT"`, `"DNI"`) |
| `documentoNro`  | `string` | ✅        | Número de documento                   |
| `domicilio`     | `string` | —         | Domicilio                             |
| `cuitPais`      | `string` | —         | CUIT país destino (Factura E)         |
| `idImpositivo`  | `string` | —         | ID impositivo exterior (Factura E)    |

### `InvoiceItem`

| Campo                 | Tipo     | Requerido | Descripción                                                      |
| --------------------- | -------- | --------- | ---------------------------------------------------------------- |
| `descripcion`         | `string` | ✅        | Descripción del producto/servicio                                |
| `cantidad`            | `number` | ✅        | Cantidad                                                         |
| `unidadMedida`        | `string` | ✅        | Unidad de medida                                                 |
| `precioUnitario`      | `number` | ✅        | Precio unitario                                                  |
| `subtotal`            | `number` | ✅        | Subtotal del item                                                |
| `codigo`              | `string` | —         | Código del producto                                              |
| `bonificacion`        | `number` | —         | Porcentaje de bonificación                                       |
| `importeBonificacion` | `number` | —         | Importe bonificación pre-calculado (si no se provee, se calcula) |
| `alicuotaIva`         | `number` | —         | Alícuota de IVA (solo Factura A)                                 |

### `IvaDetail`

| Campo           | Tipo     | Requerido | Descripción                            |
| --------------- | -------- | --------- | -------------------------------------- |
| `id`            | `number` | ✅        | ID de la alícuota                      |
| `descripcion`   | `string` | ✅        | Descripción (`"21%"`, `"10.5%"`, etc.) |
| `baseImponible` | `number` | ✅        | Base imponible                         |
| `importe`       | `number` | ✅        | Importe del IVA                        |

### `TributoDetail`

| Campo           | Tipo     | Requerido | Descripción             |
| --------------- | -------- | --------- | ----------------------- |
| `id`            | `number` | ✅        | ID del tributo          |
| `descripcion`   | `string` | ✅        | Descripción del tributo |
| `baseImponible` | `number` | ✅        | Base imponible          |
| `alicuota`      | `number` | ✅        | Alícuota en porcentaje  |
| `importe`       | `number` | ✅        | Importe del tributo     |

### `ComprobanteAsociado`

| Campo        | Tipo     | Requerido | Descripción              |
| ------------ | -------- | --------- | ------------------------ |
| `tipo`       | `number` | ✅        | Tipo de comprobante      |
| `puntoVenta` | `number` | ✅        | Punto de venta           |
| `numero`     | `number` | ✅        | Número de comprobante    |
| `cuit`       | `string` | —         | CUIT del emisor original |
| `fecha`      | `string` | —         | Fecha del comprobante    |

---

## Diferencias por letra

### Factura A

- 7 columnas: Cantidad, Producto/Servicio, Precio unit, %Bonif., $ Bonif., %IVA, Subtotal s/IVA
- Tabla de Otros Tributos con 5 filas fijas
- Desglose de IVA por alícuota (27%, 21%, 10.5%, 5%, 2.5%, 0%)
- Leyenda "Son PESOS ARGENTINOS..."

### Factura B

- 6 columnas (sin %IVA)
- Tabla de Otros Tributos con 5 filas fijas
- Subtotal + Importe Otros Tributos + Importe Total
- Leyenda "Son PESOS ARGENTINOS..."

### Factura C

- 6 columnas (sin %IVA)
- Sin tabla de tributos
- Importe Neto Gravado + Importe Total
- Leyenda "Son PESOS ARGENTINOS..."

### Factura E (Exportación)

- 5 columnas: Ítem, Descripción, Cantidad, Precio Unit. (USD), Total por ítem (USD)
- Sección receptor con "Señor(es)", CUIT País, ID Impositivo, Divisa, Destino del Comprobante
- Tabla de Forma de Pago / Fecha de Pago / Incoterms
- Tipo de Cambio + Divisa en el footer
- Importe Total en moneda extranjera

### Factura M

- Mismo layout que Factura B (6 columnas, sin desglose IVA)

---

## Cálculos automáticos

El template muestra los valores que le pasás, sin recalcular totales. Hay dos excepciones con override opcional:

| Cálculo                    | Se calcula como                                    | Override                   |
| -------------------------- | -------------------------------------------------- | -------------------------- |
| Bonificación ($) por item  | `precioUnitario × cantidad × (bonificacion / 100)` | `item.importeBonificacion` |
| Total en ARS (moneda ext.) | `importeTotal × cotizacion`                        | `importeTotalPesos`        |

Si proveés el campo de override, se usa directamente sin calcular.

---

## Ejemplo Factura B

```ts
const facturaB: InvoiceData = {
  emisor: {
    razonSocial: "Emisor de Prueba",
    domicilioComercial: "Av. Belgrano 789, CABA",
    condicionIva: "IVA Responsable Inscripto",
    cuit: "20111111117",
    iibb: "901-234567-0",
    fechaInicioActividades: "20150601",
  },
  receptor: {
    razonSocial: "Receptor de Prueba",
    condicionIva: "Consumidor Final",
    documentoTipo: "DNI",
    documentoNro: "31456789",
  },
  cbteTipo: 6,
  cbteLetra: "B",
  puntoVenta: 1,
  cbteDesde: 500,
  cbteHasta: 500,
  cbteFecha: "20240610",
  concepto: 2,
  fechaServicioDesde: "20240501",
  fechaServicioHasta: "20240531",
  fechaVtoPago: "20240625",
  items: [
    {
      descripcion: "Liquidación de sueldos - Mayo 2024",
      cantidad: 1,
      unidadMedida: "servicio",
      precioUnitario: 25000,
      subtotal: 25000,
    },
  ],
  importeNetoGravado: 25000,
  importeIva: 0,
  importeTotal: 25000,
  cae: "74512345678902",
  caeFechaVencimiento: "20240620",
};
```

## Ejemplo Factura E (Exportación)

```ts
const facturaE: InvoiceData = {
  emisor: {
    razonSocial: "Exportadora de Prueba S.A.",
    domicilioComercial: "Puerto Madero 100, CABA",
    condicionIva: "IVA Responsable Inscripto",
    cuit: "30111111118",
    iibb: "12-3456789-0",
    fechaInicioActividades: "20200101",
  },
  receptor: {
    razonSocial: "Empresa Exterior de Prueba",
    domicilio: "1234 Market St, San Francisco, CA, USA",
    condicionIva: "Cliente del Exterior",
    documentoTipo: "CUIT",
    documentoNro: "55000000000",
    cuitPais: "55000002126 (ESTADOS UNIDOS - Persona Jurídica)",
    idImpositivo: "261907945",
  },
  cbteTipo: 19,
  cbteLetra: "E",
  puntoVenta: 5,
  cbteDesde: 10,
  cbteHasta: 10,
  cbteFecha: "20240701",
  concepto: 1,
  moneda: "DOL",
  cotizacion: 1391.5,
  condicionIvaExportacion: "IVA EXENTO OPERACIÓN DE EXPORTACIÓN",
  divisa: "USD - Dólar Estadounidense",
  destinoComprobante: "ESTADOS UNIDOS",
  formaPago: "Transferencia SWIFT - Moneda Extranjera",
  fechaPago: "20240715",
  incoterms: "FOB",
  items: [
    {
      descripcion: "Consulting services",
      cantidad: 40,
      unidadMedida: "horas",
      precioUnitario: 150,
      subtotal: 6000,
    },
  ],
  importeNetoGravado: 6000,
  importeIva: 0,
  importeTotal: 6000,
  cae: "74512345678903",
  caeFechaVencimiento: "20240711",
};
```

---

## Template personalizado

### Template Handlebars (string)

```ts
const miTemplate = `
<html>
<body>
  <h1>{{data.emisor.razonSocial}}</h1>
  <p>{{descTipo data.cbteTipo}} {{data.cbteLetra}}</p>
  <p>Nro: {{voucherNumber data.puntoVenta data.cbteDesde}}</p>
  <p>Fecha: {{formatDate data.cbteFecha}}</p>
  <p>Total: {{formatCurrency data.importeTotal data.moneda}}</p>
  {{#if qrDataUrl}}<img src="{{qrDataUrl}}" width="100" />{{/if}}
</body>
</html>
`;

const generator = new InvoicePdfGenerator({ template: miTemplate });
```

### Template función

```ts
function MiTemplate({ data, options, qrDataUrl }: InvoiceTemplateProps): string {
  return `
    <html>
      <body>
        <h1>${data.emisor.razonSocial}</h1>
        <p>Total: $${data.importeTotal}</p>
      </body>
    </html>
  `;
}

const generator = new InvoicePdfGenerator({ template: MiTemplate });
```

### Helpers Handlebars disponibles

<div v-pre>

| Helper              | Descripción                                   | Ejemplo                                            |
| ------------------- | --------------------------------------------- | -------------------------------------------------- |
| `formatDate`        | YYYYMMDD → DD/MM/YYYY                         | `{{formatDate data.cbteFecha}}`                    |
| `formatCuit`        | CUIT con guiones                              | `{{formatCuit data.emisor.cuit}}`                  |
| `formatCurrency`    | Importe con símbolo de moneda                 | `{{formatCurrency data.importeTotal data.moneda}}` |
| `formatUnitPrice`   | Precio unitario formateado                    | `{{formatUnitPrice item.precioUnitario}}`          |
| `formatCotizacion`  | Cotización con 3 decimales                    | `{{formatCotizacion data.cotizacion}}`             |
| `voucherNumber`     | Nro comprobante (00003-00000152)              | `{{voucherNumber data.puntoVenta data.cbteDesde}}` |
| `descTipo`          | Descripción del tipo de comprobante           | `{{descTipo data.cbteTipo}}`                       |
| `currencyName`      | Nombre completo de la moneda                  | `{{currencyName data.moneda}}`                     |
| `currencyCode`      | Código ISO de la moneda (ARS, USD)            | `{{currencyCode data.moneda}}`                     |
| `currencyShortName` | Nombre corto de la moneda                     | `{{currencyShortName data.moneda}}`                |
| `numberToWords`     | Importe en letras (español)                   | `{{numberToWords data.importeTotal}}`              |
| `docNumber`         | Formatea doc (CUIT con guiones si 11 dígitos) | `{{docNumber data.receptor.documentoNro}}`         |
| `padStart`          | Rellena con ceros                             | `{{padStart data.puntoVenta 5}}`                   |
| `bonAmount`         | Calcula bonificación (con override)           | `{{bonAmount precio cant bonif importeBonif}}`     |
| `ivaImporte`        | Busca importe de IVA por descripción          | `{{ivaImporte data.iva "21%"}}`                    |
| `tributoImporte`    | Busca importe de tributo por descripción      | `{{tributoImporte data.tributos "..."}}`           |
| `multiply`          | Multiplicación                                | `{{multiply data.importeTotal data.cotizacion}}`   |
| `eq`, `neq`         | Igualdad / desigualdad                        | `{{#if (eq data.cbteLetra "A")}}`                  |
| `gt`, `gte`         | Mayor / mayor o igual                         | `{{#if (gt data.importeTotal 1000)}}`              |
| `or`, `and`, `not`  | Operadores lógicos                            | `{{#or condA condB}}...{{/or}}`                    |
| `default`           | Valor por defecto si falsy                    | `{{default data.moneda "PES"}}`                    |
| `isNull`            | Comprueba si es null/undefined                | `{{#if (isNull val)}}`                             |
| `len`               | Largo de un array                             | `{{len data.tributos}}`                            |

</div>

---

## Monedas soportadas

| Código | Moneda                        | Símbolo |
| ------ | ----------------------------- | ------- |
| `PES`  | Pesos Argentinos (ARS)        | $       |
| `DOL`  | Dólares Estadounidenses (USD) | US$     |

Cuando la moneda no es `PES` y se provee `cotizacion`, el PDF muestra una línea de conversión a pesos argentinos al pie del comprobante.
