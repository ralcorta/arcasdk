import "./setup-puppeteer";
import { InvoicePdfGenerator } from "../src/generator/invoice-pdf-generator";
import type { InvoiceData } from "../src/types/invoice-data.types";
import { mkdirSync, writeFileSync } from "fs";
import { resolve } from "path";
import puppeteer, { type LaunchOptions } from "puppeteer";
import QRCode from "qrcode";
import { buildArcaQrUrl } from "../src/utils/qr.utils";
import { InvoiceDocument } from "../src/templates/arca-default";

function puppeteerLaunchOptions(): LaunchOptions {
  return {
    headless: true,
    ...(process.env.PUPPETEER_EXECUTABLE_PATH
      ? { executablePath: process.env.PUPPETEER_EXECUTABLE_PATH }
      : {}),
  };
}

const demoData: InvoiceData = {
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

const outDir = resolve(__dirname, "../../../docs/public/packages/pdf");

const PREVIEW_MARGIN_MM = 10;
const PREVIEW_PAGE_WIDTH_MM = 210;
const PREVIEW_PAGE_HEIGHT_MM = 297;

function mmToPx(mm: number): number {
  return Math.round((mm * 96) / 25.4);
}

async function generatePreviewPng(data: InvoiceData): Promise<Buffer> {
  const marginBottomMm = PREVIEW_MARGIN_MM + 8;
  const pageWidthPx = mmToPx(PREVIEW_PAGE_WIDTH_MM);
  const pageHeightPx = mmToPx(PREVIEW_PAGE_HEIGHT_MM);
  const printableHeightPx = Math.floor(
    mmToPx(PREVIEW_PAGE_HEIGHT_MM - PREVIEW_MARGIN_MM - marginBottomMm),
  );

  const qrUrl = buildArcaQrUrl(data);
  const qrDataUrl = await QRCode.toDataURL(qrUrl, {
    width: 200,
    margin: 0,
    errorCorrectionLevel: "M",
  });

  const html = InvoiceDocument({
    data,
    options: {
      pageSize: "A4",
      margin: PREVIEW_MARGIN_MM,
      includeQr: true,
      copy: "ORIGINAL",
    },
    qrDataUrl,
  });

  const marginStyle = `
    <style id="preview-page-margins">
      html, body {
        margin: 0;
        padding: 0;
        background: #fff;
      }
      body {
        width: ${PREVIEW_PAGE_WIDTH_MM}mm;
        min-height: ${PREVIEW_PAGE_HEIGHT_MM}mm;
        box-sizing: border-box;
        padding: ${PREVIEW_MARGIN_MM}mm ${PREVIEW_MARGIN_MM}mm ${marginBottomMm}mm ${PREVIEW_MARGIN_MM}mm;
      }
    </style>
  `;
  const htmlWithMargins = html.includes("</head>")
    ? html.replace("</head>", `${marginStyle}</head>`)
    : `${marginStyle}${html}`;

  const browser = await puppeteer.launch(puppeteerLaunchOptions());
  try {
    const page = await browser.newPage();
    await page.setViewport({
      width: pageWidthPx,
      height: pageHeightPx,
      deviceScaleFactor: 2,
    });
    await page.setContent(htmlWithMargins, { waitUntil: "networkidle0" });

    await page.evaluate(
      ({ printableHeightPx, marginTopPx }) => {
        const summary = document.querySelector<HTMLElement>(".summary-final");
        if (!summary) return;

        summary.style.marginTop = "0";

        const summaryTop =
          summary.getBoundingClientRect().top +
          window.scrollY -
          marginTopPx;
        const summaryHeight = summary.getBoundingClientRect().height;

        if (summaryHeight >= printableHeightPx) return;

        const contentEnd = summaryTop + summaryHeight;
        const numPages = Math.ceil(contentEnd / printableHeightPx);
        const lastPageBottom = numPages * printableHeightPx;
        const pushDownPx = Math.max(
          0,
          Math.floor(lastPageBottom - contentEnd) - 5,
        );

        if (pushDownPx > 1) {
          const spacer = document.createElement("div");
          spacer.style.height = `${pushDownPx}px`;
          summary.parentNode!.insertBefore(spacer, summary);
        }
      },
      {
        printableHeightPx,
        marginTopPx: mmToPx(PREVIEW_MARGIN_MM),
      },
    );

    return (await page.screenshot({
      type: "png",
      clip: { x: 0, y: 0, width: pageWidthPx, height: pageHeightPx },
    })) as Buffer;
  } finally {
    await browser.close();
  }
}

async function main() {
  mkdirSync(outDir, { recursive: true });

  const generator = new InvoicePdfGenerator();
  const [pdfBuffer, pngBuffer] = await Promise.all([
    generator.generate(demoData),
    generatePreviewPng(demoData),
  ]);

  writeFileSync(resolve(outDir, "factura-a-demo.pdf"), pdfBuffer);
  writeFileSync(resolve(outDir, "factura-a-demo.png"), pngBuffer);

  console.log(`✓ Demo generado en ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
