import { InvoicePdfGenerator } from "../src/generator/invoice-pdf-generator";
import { InvoiceData } from "../src/types/invoice-data.types";
import { writeFileSync } from "fs";
import { resolve } from "path";

// ── Emisores ──
const emisorTech = {
  razonSocial: "EMPRESA DE PRUEBA S.A.",
  domicilioComercial: "Av. Siempreviva 1234 Piso 3 Of. D - C1001AAZ - CABA",
  condicionIva: "IVA Responsable Inscripto",
  cuit: "30501234567",
  iibb: "902-345678-1",
  fechaInicioActividades: "20160420",
  contacto: "info@empresa-prueba.com.ar / www.empresa-prueba.com.ar",
};

const emisorConstructora = {
  razonSocial: "CONSTRUCTORA DE PRUEBA S.R.L.",
  domicilioComercial: "Ruta 7 Km 150 - M5500 - Mendoza",
  condicionIva: "IVA Responsable Inscripto",
  cuit: "30601987654",
  iibb: "MZ-56789-0",
  fechaInicioActividades: "20090715",
};

const emisorEstudio = {
  razonSocial: "ESTUDIO CONTABLE DE PRUEBA",
  domicilioComercial: "Mitre 456 Piso 2 Of. C - C1036AAR - CABA",
  condicionIva: "IVA Responsable Inscripto",
  cuit: "30702345678",
  iibb: "903-223344-5",
  fechaInicioActividades: "20110301",
  contacto: "contacto@estudio-prueba.com.ar",
};

// ── Receptores ──
const receptorDistribuidora = {
  razonSocial: "DISTRIBUIDORA DE PRUEBA S.R.L.",
  domicilio: "Av. Pellegrini 890 - S2000BFA - Rosario - Santa Fe",
  condicionIva: "IVA Responsable Inscripto",
  documentoTipo: "CUIT",
  documentoNro: "30801234567",
};

const receptorFarmacia = {
  razonSocial: "FARMACIA DE PRUEBA S.A.",
  domicilio: "Bv. España 2300 - S2000DSR - Rosario - Santa Fe",
  condicionIva: "IVA Responsable Inscripto",
  documentoTipo: "CUIT",
  documentoNro: "30901876543",
};

const receptorMunicipio = {
  razonSocial: "MUNICIPALIDAD DE PRUEBA",
  domicilio: "San Martín 200 - B6500 - Ciudad de Prueba - Buenos Aires",
  condicionIva: "IVA Sujeto Exento",
  documentoTipo: "CUIT",
  documentoNro: "30551122334",
};

// ══════════════════════════════════════════════
// FACTURA A-1: 1 solo item, contado, sin tributos, sin período
// ══════════════════════════════════════════════
const facturaA1: InvoiceData = {
  emisor: emisorTech,
  receptor: receptorDistribuidora,
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
      descripcion: "Auditoría de seguridad informática",
      cantidad: 1,
      unidadMedida: "unidades",
      precioUnitario: 750000,
      bonificacion: 0,
      subtotal: 750000,
      alicuotaIva: 21,
    },
  ],
  importeNetoGravado: 750000,
  importeIva: 157500,
  iva: [{ id: 5, descripcion: "21%", baseImponible: 750000, importe: 157500 }],
  importeTotal: 907500,
  cae: "72643218900001",
  caeFechaVencimiento: "20260520",
};

// ══════════════════════════════════════════════
// FACTURA A-2: 3 items, con bonificación, con período de servicio, con tributos
// ══════════════════════════════════════════════
const facturaA2: InvoiceData = {
  emisor: emisorEstudio,
  receptor: receptorFarmacia,
  cbteTipo: 1,
  cbteLetra: "A",
  puntoVenta: 1,
  cbteDesde: 487,
  cbteHasta: 487,
  cbteFecha: "20260501",
  concepto: 2,
  moneda: "PES",
  cotizacion: 1,
  condicionVenta: "Cuenta Corriente - 30 días",
  fechaServicioDesde: "20260401",
  fechaServicioHasta: "20260430",
  fechaVtoPago: "20260531",
  items: [
    {
      codigo: "HON-001",
      descripcion:
        "Honorarios profesionales - Liquidación de sueldos abril 2026",
      cantidad: 1,
      unidadMedida: "unidades",
      precioUnitario: 320000,
      bonificacion: 0,
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
      bonificacion: 0,
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

// ══════════════════════════════════════════════
// FACTURA A-3: 8 items variados, importes exentos y no gravados
// ══════════════════════════════════════════════
const facturaA3: InvoiceData = {
  emisor: emisorConstructora,
  receptor: receptorMunicipio,
  cbteTipo: 1,
  cbteLetra: "A",
  puntoVenta: 5,
  cbteDesde: 220,
  cbteHasta: 220,
  cbteFecha: "20260508",
  concepto: 3,
  moneda: "PES",
  cotizacion: 1,
  condicionVenta: "30/60/90 días",
  fechaServicioDesde: "20260301",
  fechaServicioHasta: "20260430",
  fechaVtoPago: "20260607",
  items: [
    {
      descripcion: "Excavación y movimiento de suelos",
      cantidad: 150,
      unidadMedida: "m³",
      precioUnitario: 12500,
      subtotal: 1875000,
      alicuotaIva: 21,
    },
    {
      descripcion: "Hormigón elaborado H30",
      cantidad: 80,
      unidadMedida: "m³",
      precioUnitario: 95000,
      subtotal: 7600000,
      alicuotaIva: 21,
    },
    {
      descripcion: "Acero ADN 420 conformado",
      cantidad: 12000,
      unidadMedida: "kg",
      precioUnitario: 1850,
      subtotal: 22200000,
      alicuotaIva: 21,
    },
    {
      descripcion: "Encofrado y desencofrado",
      cantidad: 400,
      unidadMedida: "m²",
      precioUnitario: 8500,
      subtotal: 3400000,
      alicuotaIva: 21,
    },
    {
      descripcion: "Mano de obra albañilería",
      cantidad: 2200,
      unidadMedida: "horas",
      precioUnitario: 4500,
      subtotal: 9900000,
      alicuotaIva: 21,
    },
    {
      descripcion: "Dirección técnica de obra",
      cantidad: 2,
      unidadMedida: "unidades",
      precioUnitario: 850000,
      bonificacion: 5,
      subtotal: 1615000,
      alicuotaIva: 21,
    },
    {
      descripcion: "Seguro de caución",
      cantidad: 1,
      unidadMedida: "unidades",
      precioUnitario: 450000,
      subtotal: 450000,
      alicuotaIva: 0,
    },
    {
      descripcion: "Sellados y tasas municipales",
      cantidad: 1,
      unidadMedida: "unidades",
      precioUnitario: 125000,
      subtotal: 125000,
      alicuotaIva: 0,
    },
  ],
  importeNetoGravado: 46590000,
  importeNetoNoGravado: 450000,
  importeExento: 125000,
  importeIva: 9783900,
  iva: [
    { id: 5, descripcion: "21%", baseImponible: 46590000, importe: 9783900 },
  ],
  tributos: [
    {
      id: 99,
      descripcion: "Percepción IIBB La Pampa",
      baseImponible: 46590000,
      alicuota: 2.5,
      importe: 1164750,
    },
  ],
  importeTributos: 1164750,
  importeTotal: 58113650,
  cae: "72643218900003",
  caeFechaVencimiento: "20260518",
  observaciones:
    "Obra: Ampliación Centro Cultural Municipal - Expte. 2024/4567",
};

// ══════════════════════════════════════════════
// FACTURA A-4: 25 items (2 páginas), sin tributos
// ══════════════════════════════════════════════
const items25 = Array.from({ length: 25 }, (_, i) => ({
  codigo: `MAT-${String(i + 1).padStart(3, "0")}`,
  descripcion: [
    "Cable UTP Cat.6 caja x 305m",
    "Patch panel 24 puertos",
    "Switch TP-Link 24p PoE",
    "Access Point Ubiquiti U6-Pro",
    "Rack cerrado 42U",
    "Bandeja fija 1U",
    "Organizador de cables 1U",
    "UPS APC 3000VA online",
    "Patchcord Cat.6 1.5m",
    "Patchcord Cat.6 3m",
    "Canaleta 60x40 blanca x 2m",
    "Roseta doble RJ45 Cat.6",
    "Certificación de punto de red",
    "Fibra óptica monomodo x 1000m",
    "ODF 24 puertos",
    "Pigtail LC monomodo",
    "Fusionado de fibra óptica",
    "Conversor de medios Gbit",
    "Servidor Dell PowerEdge R750",
    "Disco SSD 960GB SATA Enterprise",
    "Memoria DDR4 32GB ECC",
    "Licencia Windows Server 2025 Std",
    "Configuración e instalación servidor",
    "Migración de datos",
    "Soporte post-instalación 3 meses",
  ][i],
  cantidad: [
    5, 2, 4, 8, 1, 2, 4, 1, 50, 30, 100, 24, 24, 2, 1, 24, 24, 2, 1, 4, 4, 1, 1,
    1, 1,
  ][i],
  unidadMedida: i < 22 ? "unidades" : i === 22 ? "unidades" : "unidades",
  precioUnitario: [
    45000, 85000, 320000, 180000, 750000, 35000, 18000, 520000, 2500, 3800,
    4200, 6500, 15000, 280000, 95000, 4500, 12000, 65000, 8500000, 185000,
    92000, 1200000, 350000, 280000, 450000,
  ][i],
  bonificacion: i === 8 || i === 9 ? 10 : 0,
  subtotal: [
    225000, 170000, 1280000, 1440000, 750000, 70000, 72000, 520000, 112500,
    102600, 420000, 156000, 360000, 560000, 95000, 108000, 288000, 130000,
    8500000, 740000, 368000, 1200000, 350000, 280000, 450000,
  ][i],
  alicuotaIva: 21 as number,
}));

const totalNeto25 = items25.reduce((s, i) => s + i.subtotal, 0);
const facturaA4: InvoiceData = {
  emisor: emisorTech,
  receptor: receptorFarmacia,
  cbteTipo: 1,
  cbteLetra: "A",
  puntoVenta: 3,
  cbteDesde: 1529,
  cbteHasta: 1529,
  cbteFecha: "20260511",
  concepto: 1,
  moneda: "PES",
  cotizacion: 1,
  condicionVenta: "50% anticipo, 50% contra entrega",
  items: items25,
  importeNetoGravado: totalNeto25,
  importeIva: Math.round(totalNeto25 * 0.21),
  iva: [
    {
      id: 5,
      descripcion: "21%",
      baseImponible: totalNeto25,
      importe: Math.round(totalNeto25 * 0.21),
    },
  ],
  importeTotal: totalNeto25 + Math.round(totalNeto25 * 0.21),
  cae: "72643218900004",
  caeFechaVencimiento: "20260521",
};

// ══════════════════════════════════════════════
// FACTURA A-5: 50 items (3+ páginas), con múltiples alícuotas y tributos
// ══════════════════════════════════════════════
const items50 = Array.from({ length: 50 }, (_, i) => {
  const precio = Math.round((i + 1) * 7500 + 2000);
  const cant = (i % 10) + 1;
  const bonif = i % 8 === 0 ? 5 : 0;
  const neto = precio * cant * (1 - bonif / 100);
  const alic = i % 6 === 0 ? 10.5 : i % 10 === 0 ? 27 : 21;
  return {
    codigo: `INS-${String(i + 1).padStart(3, "0")}`,
    descripcion: `Insumo industrial tipo ${String.fromCharCode(65 + (i % 26))}-${i + 1}`,
    cantidad: cant,
    unidadMedida: i % 3 === 0 ? "kg" : i % 3 === 1 ? "litros" : "unidades",
    precioUnitario: precio,
    bonificacion: bonif,
    subtotal: Math.round(neto),
    alicuotaIva: alic,
  };
});

const neto21 = items50
  .filter((i) => i.alicuotaIva === 21)
  .reduce((s, i) => s + i.subtotal, 0);
const neto105 = items50
  .filter((i) => i.alicuotaIva === 10.5)
  .reduce((s, i) => s + i.subtotal, 0);
const neto27 = items50
  .filter((i) => i.alicuotaIva === 27)
  .reduce((s, i) => s + i.subtotal, 0);
const totalNeto50 = neto21 + neto105 + neto27;
const iva21 = Math.round(neto21 * 0.21);
const iva105 = Math.round(neto105 * 0.105);
const iva27 = Math.round(neto27 * 0.27);
const totalIva50 = iva21 + iva105 + iva27;
const tribImporte = Math.round(totalNeto50 * 0.015);

const facturaA5: InvoiceData = {
  emisor: emisorConstructora,
  receptor: receptorDistribuidora,
  cbteTipo: 1,
  cbteLetra: "A",
  puntoVenta: 5,
  cbteDesde: 221,
  cbteHasta: 221,
  cbteFecha: "20260509",
  concepto: 1,
  moneda: "PES",
  cotizacion: 1,
  condicionVenta: "Cuenta Corriente - 60 días",
  items: items50,
  importeNetoGravado: totalNeto50,
  importeIva: totalIva50,
  iva: [
    { id: 5, descripcion: "21%", baseImponible: neto21, importe: iva21 },
    { id: 4, descripcion: "10.5%", baseImponible: neto105, importe: iva105 },
    { id: 6, descripcion: "27%", baseImponible: neto27, importe: iva27 },
  ],
  tributos: [
    {
      id: 99,
      descripcion: "Percepción IIBB Bs. As.",
      baseImponible: totalNeto50,
      alicuota: 1.5,
      importe: tribImporte,
    },
    {
      id: 7,
      descripcion: "Tasa municipal Rosario",
      baseImponible: totalNeto50,
      alicuota: 0.5,
      importe: Math.round(totalNeto50 * 0.005),
    },
  ],
  importeTributos: tribImporte + Math.round(totalNeto50 * 0.005),
  importeTotal:
    totalNeto50 + totalIva50 + tribImporte + Math.round(totalNeto50 * 0.005),
  cae: "72643218900005",
  caeFechaVencimiento: "20260519",
  observaciones: "OC #2026-1234 — Entrega en depósito Rosario",
};

// ══════════════════════════════════════════════
// Generate
// ══════════════════════════════════════════════

// ── Factura B: consumidor final, sin IVA discriminado ──
const facturaB1: InvoiceData = {
  emisor: emisorTech,
  receptor: {
    razonSocial: "PERSONA DE PRUEBA",
    domicilio: "Av. Belgrano 1500 - C1093AAQ - CABA",
    condicionIva: "Consumidor Final",
    documentoTipo: "DNI",
    documentoNro: "34567890",
  },
  cbteTipo: 6,
  cbteLetra: "B",
  puntoVenta: 3,
  cbteDesde: 892,
  cbteHasta: 892,
  cbteFecha: "20260510",
  concepto: 1,
  moneda: "PES",
  cotizacion: 1,
  condicionVenta: "Contado",
  items: [
    {
      codigo: "PROD-001",
      descripcion: "Notebook Lenovo ThinkPad T14 Gen 5",
      cantidad: 1,
      unidadMedida: "unidades",
      precioUnitario: 1512500,
      subtotal: 1512500,
    },
    {
      codigo: "PROD-002",
      descripcion: "Mouse inalámbrico Logitech MX Master 3S",
      cantidad: 1,
      unidadMedida: "unidades",
      precioUnitario: 114950,
      subtotal: 114950,
    },
    {
      codigo: "PROD-003",
      descripcion: "Funda protectora 14 pulgadas",
      cantidad: 1,
      unidadMedida: "unidades",
      precioUnitario: 42350,
      bonificacion: 10,
      subtotal: 38115,
    },
  ],
  importeNetoGravado: 1665565,
  importeIva: 0,
  importeTotal: 1665565,
  cae: "72643218907812",
  caeFechaVencimiento: "20260520",
};

// ── Factura C: monotributo, sin IVA ──
const facturaC1: InvoiceData = {
  emisor: {
    razonSocial: "MONOTRIBUTISTA DE PRUEBA",
    domicilioComercial: "Colón 780 - X5000JHJ - Córdoba",
    condicionIva: "Responsable Monotributo",
    cuit: "27301234567",
    iibb: "Exento",
    fechaInicioActividades: "20200301",
  },
  receptor: receptorDistribuidora,
  cbteTipo: 11,
  cbteLetra: "C",
  puntoVenta: 1,
  cbteDesde: 45,
  cbteHasta: 45,
  cbteFecha: "20260508",
  concepto: 2,
  moneda: "PES",
  cotizacion: 1,
  condicionVenta: "Contado",
  fechaServicioDesde: "20260401",
  fechaServicioHasta: "20260430",
  fechaVtoPago: "20260515",
  items: [
    {
      codigo: "DIS-001",
      descripcion: "Diseño gráfico - Pack redes sociales mensual",
      cantidad: 1,
      unidadMedida: "unidades",
      precioUnitario: 180000,
      subtotal: 180000,
    },
    {
      codigo: "DIS-002",
      descripcion: "Diseño de logo corporativo",
      cantidad: 1,
      unidadMedida: "unidades",
      precioUnitario: 250000,
      subtotal: 250000,
    },
  ],
  importeNetoGravado: 430000,
  importeIva: 0,
  importeTotal: 430000,
  cae: "72643218903456",
  caeFechaVencimiento: "20260518",
};

// ── Nota de Crédito A: con comprobante asociado ──
const notaCreditoA1: InvoiceData = {
  emisor: emisorEstudio,
  receptor: receptorFarmacia,
  cbteTipo: 3,
  cbteLetra: "A",
  puntoVenta: 1,
  cbteDesde: 52,
  cbteHasta: 52,
  cbteFecha: "20260512",
  concepto: 2,
  moneda: "PES",
  cotizacion: 1,
  condicionVenta: "Cuenta Corriente",
  fechaServicioDesde: "20260401",
  fechaServicioHasta: "20260430",
  fechaVtoPago: "20260531",
  cbtesAsociados: [
    {
      tipo: 1,
      puntoVenta: 1,
      numero: 487,
      cuit: "30702345678",
      fecha: "20260501",
    },
  ],
  items: [
    {
      descripcion: "Descuento por pronto pago - Honorarios abril 2026",
      cantidad: 1,
      unidadMedida: "unidades",
      precioUnitario: 48200,
      subtotal: 48200,
      alicuotaIva: 21,
    },
  ],
  importeNetoGravado: 48200,
  importeIva: 10122,
  iva: [{ id: 5, descripcion: "21%", baseImponible: 48200, importe: 10122 }],
  importeTotal: 58322,
  cae: "72643218900010",
  caeFechaVencimiento: "20260522",
  observaciones: "Descuento 10% por pago dentro de los 10 días",
};

// ── Factura B: sin domicilio receptor (campo opcional) ──
const facturaB2: InvoiceData = {
  emisor: emisorTech,
  receptor: {
    razonSocial: "CONSUMIDOR FINAL",
    condicionIva: "Consumidor Final",
    documentoTipo: "Sin identificar",
    documentoNro: "0",
  },
  cbteTipo: 6,
  cbteLetra: "B",
  puntoVenta: 3,
  cbteDesde: 893,
  cbteHasta: 893,
  cbteFecha: "20260511",
  concepto: 1,
  moneda: "PES",
  cotizacion: 1,
  condicionVenta: "Contado",
  items: [
    {
      descripcion: "Servicio de reparación de PC",
      cantidad: 1,
      unidadMedida: "unidades",
      precioUnitario: 45000,
      subtotal: 45000,
    },
  ],
  importeNetoGravado: 45000,
  importeIva: 0,
  importeTotal: 45000,
  cae: "72643218907900",
  caeFechaVencimiento: "20260521",
};

async function main() {
  const generator = new InvoicePdfGenerator();

  const facturas: { name: string; data: InvoiceData }[] = [
    { name: "factura-a-1item", data: facturaA1 },
    { name: "factura-a-3items-tributos", data: facturaA2 },
    { name: "factura-a-8items-obra", data: facturaA3 },
    { name: "factura-a-25items", data: facturaA4 },
    { name: "factura-a-50items", data: facturaA5 },
    { name: "factura-b-consumidor", data: facturaB1 },
    { name: "factura-b-sin-domicilio", data: facturaB2 },
    { name: "factura-c-monotributo", data: facturaC1 },
    { name: "nota-credito-a", data: notaCreditoA1 },
  ];

  // ── Nota de Débito A ──
  facturas.push({
    name: "nota-debito-a",
    data: {
      ...facturaA1,
      cbteTipo: 2,
      cbteDesde: 80,
      cbteHasta: 80,
      cbtesAsociados: [
        {
          tipo: 1,
          puntoVenta: 3,
          numero: 1001,
          cuit: "30801234567",
          fecha: "20260510",
        },
      ],
      items: [
        {
          descripcion: "Ajuste por diferencia de precio",
          cantidad: 1,
          unidadMedida: "unidades",
          precioUnitario: 25000,
          subtotal: 25000,
          alicuotaIva: 21,
        },
      ],
      importeNetoGravado: 25000,
      importeIva: 5250,
      iva: [{ id: 5, descripcion: "21%", baseImponible: 25000, importe: 5250 }],
      importeTotal: 30250,
      cae: "72643218900020",
      caeFechaVencimiento: "20260522",
    },
  });

  // ── Nota de Crédito B ──
  facturas.push({
    name: "nota-credito-b",
    data: {
      emisor: emisorTech,
      receptor: {
        razonSocial: "CONSUMIDOR DE PRUEBA",
        domicilio: "Tucumán 350 - CABA",
        condicionIva: "Consumidor Final",
        documentoTipo: "DNI",
        documentoNro: "29876543",
      },
      cbteTipo: 8,
      cbteLetra: "B",
      puntoVenta: 3,
      cbteDesde: 15,
      cbteHasta: 15,
      cbteFecha: "20260512",
      concepto: 1,
      moneda: "PES",
      cotizacion: 1,
      condicionVenta: "Contado",
      cbtesAsociados: [
        { tipo: 6, puntoVenta: 3, numero: 892, fecha: "20260510" },
      ],
      items: [
        {
          descripcion: "Devolución - Funda protectora 14 pulgadas",
          cantidad: 1,
          unidadMedida: "unidades",
          precioUnitario: 38115,
          subtotal: 38115,
        },
      ],
      importeNetoGravado: 38115,
      importeIva: 0,
      importeTotal: 38115,
      cae: "72643218900021",
      caeFechaVencimiento: "20260522",
    },
  });

  // ── Nota de Débito B ──
  facturas.push({
    name: "nota-debito-b",
    data: {
      ...facturaB1,
      cbteTipo: 7,
      cbteDesde: 30,
      cbteHasta: 30,
      items: [
        {
          descripcion: "Interés por mora",
          cantidad: 1,
          unidadMedida: "unidades",
          precioUnitario: 15000,
          subtotal: 15000,
        },
      ],
      importeNetoGravado: 15000,
      importeIva: 0,
      importeTotal: 15000,
      cae: "72643218900022",
      caeFechaVencimiento: "20260522",
    },
  });

  // ── Nota de Crédito C ──
  facturas.push({
    name: "nota-credito-c",
    data: {
      ...facturaC1,
      cbteTipo: 13,
      cbteDesde: 5,
      cbteHasta: 5,
      cbtesAsociados: [
        { tipo: 11, puntoVenta: 1, numero: 45, fecha: "20260508" },
      ],
      items: [
        {
          descripcion: "Descuento por fidelidad",
          cantidad: 1,
          unidadMedida: "unidades",
          precioUnitario: 43000,
          subtotal: 43000,
        },
      ],
      importeNetoGravado: 43000,
      importeTotal: 43000,
      cae: "72643218900023",
      caeFechaVencimiento: "20260518",
    },
  });

  // ── Nota de Débito C ──
  facturas.push({
    name: "nota-debito-c",
    data: {
      ...facturaC1,
      cbteTipo: 12,
      cbteDesde: 8,
      cbteHasta: 8,
      items: [
        {
          descripcion: "Recargo por servicio adicional",
          cantidad: 1,
          unidadMedida: "unidades",
          precioUnitario: 20000,
          subtotal: 20000,
        },
      ],
      importeNetoGravado: 20000,
      importeTotal: 20000,
      cae: "72643218900024",
      caeFechaVencimiento: "20260518",
    },
  });

  // ── Factura E (Exportación) ──
  facturas.push({
    name: "factura-e-exportacion",
    data: {
      emisor: emisorTech,
      receptor: {
        razonSocial: "EMPRESA EXTERIOR DE PRUEBA",
        domicilio: "742 Evergreen Terrace, Portland, OR 97201, USA",
        condicionIva: "Cliente del Exterior",
        documentoTipo: "CUIT",
        documentoNro: "55000000000",
        cuitPais: "55000002126 (ESTADOS UNIDOS - Persona Jurídica)",
        idImpositivo: "845209317",
      },
      cbteTipo: 19,
      cbteLetra: "E",
      puntoVenta: 3,
      cbteDesde: 12,
      cbteHasta: 12,
      cbteFecha: "20260510",
      concepto: 2,
      moneda: "DOL",
      cotizacion: 1391.5,
      condicionVenta: "Transferencia bancaria 30 días",
      fechaServicioDesde: "20260401",
      fechaServicioHasta: "20260430",
      fechaVtoPago: "20260610",
      condicionIvaExportacion: "IVA EXENTO OPERACIÓN DE EXPORTACIÓN",
      divisa: "USD - Dólar Estadounidense",
      destinoComprobante: "ESTADOS UNIDOS",
      formaPago: "Transferencia SWIFT - Moneda Extranjera",
      fechaPago: "20260610",
      incoterms: "",
      items: [
        {
          codigo: "0001",
          descripcion:
            "Servicio: S13 - Servicios de informática (armado de páginas web, soporte web, mantenimiento de sistemas, programación, desarrollo full stack)",
          cantidad: 1,
          unidadMedida: "",
          precioUnitario: 7560,
          subtotal: 7560,
        },
      ],
      importeNetoGravado: 7560,
      importeIva: 0,
      importeTotal: 7560,
      cae: "72643218900030",
      caeFechaVencimiento: "20260520",
    },
  });

  // ── Nota de Crédito E ──
  facturas.push({
    name: "nota-credito-e",
    data: {
      emisor: emisorTech,
      receptor: {
        razonSocial: "EMPRESA EXTERIOR DE PRUEBA",
        domicilio: "742 Evergreen Terrace, Portland, OR 97201, USA",
        condicionIva: "Cliente del Exterior",
        documentoTipo: "CUIT",
        documentoNro: "55000000000",
        cuitPais: "55000002126 (ESTADOS UNIDOS - Persona Jurídica)",
        idImpositivo: "845209317",
      },
      cbteTipo: 21,
      cbteLetra: "E",
      puntoVenta: 3,
      cbteDesde: 3,
      cbteHasta: 3,
      cbteFecha: "20260512",
      concepto: 2,
      moneda: "DOL",
      cotizacion: 1391.5,
      condicionVenta: "Transferencia bancaria",
      fechaServicioDesde: "20260401",
      fechaServicioHasta: "20260430",
      condicionIvaExportacion: "IVA EXENTO OPERACIÓN DE EXPORTACIÓN",
      divisa: "USD - Dólar Estadounidense",
      destinoComprobante: "ESTADOS UNIDOS",
      formaPago: "Transferencia SWIFT - Moneda Extranjera",
      cbtesAsociados: [
        { tipo: 19, puntoVenta: 3, numero: 12, fecha: "20260510" },
      ],
      items: [
        {
          codigo: "0001",
          descripcion: "Credit - Scope reduction April 2026",
          cantidad: 20,
          unidadMedida: "horas",
          precioUnitario: 85,
          subtotal: 1700,
        },
      ],
      importeNetoGravado: 1700,
      importeIva: 0,
      importeTotal: 1700,
      cae: "72643218900031",
      caeFechaVencimiento: "20260522",
    },
  });

  // ── Factura M ──
  facturas.push({
    name: "factura-m",
    data: {
      emisor: {
        razonSocial: "EMPRESA NUEVA DE PRUEBA S.A.",
        domicilioComercial: "Florida 300 - C1005ABA - CABA",
        condicionIva: "IVA Responsable Inscripto",
        cuit: "30401567890",
        iibb: "904-567890-1",
        fechaInicioActividades: "20260201",
      },
      receptor: receptorDistribuidora,
      cbteTipo: 51,
      cbteLetra: "M",
      puntoVenta: 1,
      cbteDesde: 3,
      cbteHasta: 3,
      cbteFecha: "20260510",
      concepto: 1,
      moneda: "PES",
      cotizacion: 1,
      condicionVenta: "Contado",
      items: [
        {
          descripcion: "Servicio de limpieza industrial",
          cantidad: 1,
          unidadMedida: "unidades",
          precioUnitario: 200000,
          subtotal: 200000,
        },
      ],
      importeNetoGravado: 200000,
      importeIva: 0,
      importeTotal: 200000,
      cae: "72643218900040",
      caeFechaVencimiento: "20260520",
    },
  });

  // ── Factura de Crédito MiPyME A (FCE) ──
  facturas.push({
    name: "fce-factura-a",
    data: {
      emisor: emisorConstructora,
      receptor: receptorDistribuidora,
      cbteTipo: 201,
      cbteLetra: "A",
      puntoVenta: 5,
      cbteDesde: 10,
      cbteHasta: 10,
      cbteFecha: "20260510",
      concepto: 1,
      moneda: "PES",
      cotizacion: 1,
      condicionVenta: "Cuenta Corriente - 90 días",
      fechaVtoPago: "20260810",
      items: [
        {
          descripcion: "Provisión de materiales para obra",
          cantidad: 100,
          unidadMedida: "m²",
          precioUnitario: 15000,
          subtotal: 1500000,
          alicuotaIva: 21,
        },
        {
          descripcion: "Mano de obra instalación",
          cantidad: 200,
          unidadMedida: "horas",
          precioUnitario: 4500,
          subtotal: 900000,
          alicuotaIva: 21,
        },
      ],
      importeNetoGravado: 2400000,
      importeIva: 504000,
      iva: [
        { id: 5, descripcion: "21%", baseImponible: 2400000, importe: 504000 },
      ],
      importeTotal: 2904000,
      cae: "72643218900050",
      caeFechaVencimiento: "20260520",
    },
  });

  // ── FCE Nota de Crédito B ──
  facturas.push({
    name: "fce-nota-credito-b",
    data: {
      emisor: emisorTech,
      receptor: {
        razonSocial: "CLIENTE MAYORISTA DE PRUEBA S.A.",
        domicilio: "Ruta 8 Km 250 - Córdoba",
        condicionIva: "Consumidor Final",
        documentoTipo: "CUIT",
        documentoNro: "30601778899",
      },
      cbteTipo: 208,
      cbteLetra: "B",
      puntoVenta: 3,
      cbteDesde: 2,
      cbteHasta: 2,
      cbteFecha: "20260512",
      concepto: 1,
      moneda: "PES",
      cotizacion: 1,
      condicionVenta: "Contado",
      cbtesAsociados: [
        { tipo: 206, puntoVenta: 3, numero: 5, fecha: "20260505" },
      ],
      items: [
        {
          descripcion: "Devolución parcial - Equipamiento informático",
          cantidad: 2,
          unidadMedida: "unidades",
          precioUnitario: 120000,
          subtotal: 240000,
        },
      ],
      importeNetoGravado: 240000,
      importeIva: 0,
      importeTotal: 240000,
      cae: "72643218900051",
      caeFechaVencimiento: "20260522",
    },
  });

  // ── FCE Factura C ──
  facturas.push({
    name: "fce-factura-c",
    data: {
      emisor: {
        razonSocial: "MONOTRIBUTISTA DE PRUEBA",
        domicilioComercial: "Colón 780 - X5000JHJ - Córdoba",
        condicionIva: "Responsable Monotributo",
        cuit: "27301234567",
        iibb: "Exento",
        fechaInicioActividades: "20200301",
      },
      receptor: receptorFarmacia,
      cbteTipo: 211,
      cbteLetra: "C",
      puntoVenta: 1,
      cbteDesde: 1,
      cbteHasta: 1,
      cbteFecha: "20260510",
      concepto: 2,
      moneda: "PES",
      cotizacion: 1,
      condicionVenta: "Cuenta Corriente - 60 días",
      fechaServicioDesde: "20260401",
      fechaServicioHasta: "20260430",
      fechaVtoPago: "20260710",
      items: [
        {
          descripcion: "Desarrollo web - Landing page",
          cantidad: 1,
          unidadMedida: "unidades",
          precioUnitario: 350000,
          subtotal: 350000,
        },
      ],
      importeNetoGravado: 350000,
      importeIva: 0,
      importeTotal: 350000,
      cae: "72643218900052",
      caeFechaVencimiento: "20260520",
    },
  });

  // ── Factura A en dólares ──
  facturas.push({
    name: "factura-a-dolares",
    data: {
      emisor: emisorTech,
      receptor: receptorDistribuidora,
      cbteTipo: 1,
      cbteLetra: "A",
      puntoVenta: 3,
      cbteDesde: 1530,
      cbteHasta: 1530,
      cbteFecha: "20260512",
      concepto: 2,
      moneda: "DOL",
      cotizacion: 1250.5,
      condicionVenta: "Contado",
      fechaServicioDesde: "20260401",
      fechaServicioHasta: "20260430",
      items: [
        {
          descripcion: "Licencia de software anual",
          cantidad: 5,
          unidadMedida: "unidades",
          precioUnitario: 2400,
          subtotal: 12000,
          alicuotaIva: 21,
        },
      ],
      importeNetoGravado: 12000,
      importeIva: 2520,
      iva: [{ id: 5, descripcion: "21%", baseImponible: 12000, importe: 2520 }],
      importeTotal: 14520,
      cae: "72643218900060",
      caeFechaVencimiento: "20260522",
    },
  });

  for (const f of facturas) {
    const buf = await generator.generate(f.data);
    const out = resolve(__dirname, `${f.name}.pdf`);
    writeFileSync(out, buf);
  }

  // ── Factura con múltiples copias ──
  const generatorCopies = new InvoicePdfGenerator({
    copies: ["ORIGINAL", "DUPLICADO", "TRIPLICADO"],
  });
  const bufCopies = await generatorCopies.generate(facturaA1);
  writeFileSync(resolve(__dirname, "factura-a-copias.pdf"), bufCopies);

  // ── Factura con logo ──
  const generatorLogo = new InvoicePdfGenerator({
    logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiMzMzY2Y2MiIHJ4PSI1Ii8+PHRleHQgeD0iNTAiIHk9IjI1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5MT0dPPC90ZXh0Pjwvc3ZnPg==",
    logoWidth: 80,
  });
  const bufLogo = await generatorLogo.generate(facturaA1);
  writeFileSync(resolve(__dirname, "factura-a-con-logo.pdf"), bufLogo);

  console.log(`✓ ${facturas.length + 2} PDFs generados en ${__dirname}`);
}

main().catch(console.error);
