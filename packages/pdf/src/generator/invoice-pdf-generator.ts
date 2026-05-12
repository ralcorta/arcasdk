import puppeteer from "puppeteer";
import QRCode from "qrcode";
import { Readable } from "stream";
import {
  CopyType,
  InvoiceData,
  PdfGeneratorOptions,
  ResolvedPdfOptions,
} from "@src/types/invoice-data.types";
import { buildArcaQrUrl } from "@src/utils/qr.utils";
import { InvoiceDocument } from "@src/templates/arca-default";

const DEFAULT_MARGIN = 10;

export class InvoicePdfGenerator {
  private readonly opts: ResolvedPdfOptions;
  private readonly template: PdfGeneratorOptions["template"];

  constructor(options?: PdfGeneratorOptions) {
    const { template, ...rest } = options ?? {};
    this.opts = {
      pageSize: "A4",
      margin: DEFAULT_MARGIN,
      includeQr: true,
      ...rest,
    };
    this.template = template;
  }

  async generate(data: InvoiceData): Promise<Buffer> {
    const copies: CopyType[] =
      this.opts.copies && this.opts.copies.length > 0
        ? this.opts.copies
        : [this.opts.copy || "ORIGINAL"];

    if (copies.length === 1) {
      return this._generateSingle(data, copies[0]);
    }

    // Multiple copies: generate each and merge
    const buffers: Buffer[] = [];
    for (const copy of copies) {
      buffers.push(await this._generateSingle(data, copy));
    }
    return this._mergeBuffers(buffers);
  }

  private async _generateSingle(
    data: InvoiceData,
    copy: CopyType,
  ): Promise<Buffer> {
    let qrDataUrl: string | undefined;

    if (this.opts.includeQr) {
      const qrUrl = buildArcaQrUrl(data);
      try {
        qrDataUrl = await QRCode.toDataURL(qrUrl, {
          width: 200,
          margin: 0,
          errorCorrectionLevel: "M",
        });
      } catch {
        // skip QR on error
      }
    }

    const renderTemplate = this.template ?? InvoiceDocument;
    const optsWithCopy = { ...this.opts, copy };
    const html = renderTemplate({ data, options: optsWithCopy, qrDataUrl });

    const browser = await puppeteer.launch({ headless: true });
    try {
      const page = await browser.newPage();

      const pageFormat =
        this.opts.pageSize === "LETTER"
          ? "Letter"
          : this.opts.pageSize === "LEGAL"
            ? "Legal"
            : "A4";

      const pageWidthMm =
        this.opts.pageSize === "LETTER" || this.opts.pageSize === "LEGAL"
          ? 215.9
          : 210;
      const pageHeightMm =
        this.opts.pageSize === "LETTER"
          ? 279.4
          : this.opts.pageSize === "LEGAL"
            ? 355.6
            : 297;
      const marginTopMm = this.opts.margin;
      const marginBottomMm = this.opts.margin + 8;

      // Set viewport width to match PDF content width for accurate measurements
      const contentWidthPx = Math.round(
        ((pageWidthMm - 2 * this.opts.margin) * 96) / 25.4,
      );
      await page.setViewport({ width: contentWidthPx, height: 800 });
      await page.setContent(html, { waitUntil: "domcontentloaded" });

      const printableHeightPx = Math.floor(
        ((pageHeightMm - marginTopMm - marginBottomMm) * 96) / 25.4,
      );

      await page.evaluate(
        ({ printableHeightPx }) => {
          const summary = document.querySelector<HTMLElement>(".summary-final");
          if (!summary) return;

          // Remove CSS auto margin to measure natural position
          summary.style.marginTop = "0";

          const summaryTop =
            summary.getBoundingClientRect().top + window.scrollY;
          const summaryHeight = summary.getBoundingClientRect().height;

          if (summaryHeight >= printableHeightPx) return;

          const topInPage = summaryTop % printableHeightPx;

          let pushDownPx: number;
          if (topInPage + summaryHeight <= printableHeightPx) {
            // Summary fits on its current virtual page — push to bottom
            pushDownPx = Math.floor(
              printableHeightPx - topInPage - summaryHeight,
            );
          } else {
            // Summary won't fit — Puppeteer will push it to the next page top
            // so we need to push it to the bottom of that next page
            pushDownPx = Math.floor(printableHeightPx - summaryHeight);
          }

          if (pushDownPx > 1) {
            // Use a spacer div — margin-top gets suppressed at page tops in paged media
            const spacer = document.createElement("div");
            spacer.style.height = `${pushDownPx}px`;
            summary.parentNode!.insertBefore(spacer, summary);
          }
        },
        { printableHeightPx },
      );

      const pdfBuffer = await page.pdf({
        format: pageFormat,
        displayHeaderFooter: true,
        headerTemplate: "<span></span>",
        footerTemplate: `
          <div style="font-size: 9px; width: 100%; text-align: center; padding: 0 10mm; box-sizing: border-box; border-top: 1px solid #000;">
            <span style="float: left; padding-top: 3px; margin-left: 10mm;">${this.opts.footerText || ""}</span>
            <span style="float: right; padding-top: 3px; margin-right: 10mm;">Pág. <span class="pageNumber"></span>/<span class="totalPages"></span></span>
            <div style="clear: both;"></div>
          </div>
        `,
        margin: {
          top: `${this.opts.margin}mm`,
          right: `${this.opts.margin}mm`,
          bottom: `${this.opts.margin + 8}mm`,
          left: `${this.opts.margin}mm`,
        },
      });

      return pdfBuffer as Buffer;
    } finally {
      await browser.close();
    }
  }

  async generateStream(data: InvoiceData): Promise<Readable> {
    const buffer = await this.generate(data);
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }

  private async _mergeBuffers(buffers: Buffer[]): Promise<Buffer> {
    const { PDFDocument } = await import("pdf-lib");
    const merged = await PDFDocument.create();
    for (const buf of buffers) {
      const doc = await PDFDocument.load(buf);
      const pages = await merged.copyPages(doc, doc.getPageIndices());
      for (const p of pages) {
        merged.addPage(p);
      }
    }
    const bytes = await merged.save();
    return Buffer.from(bytes);
  }
}
