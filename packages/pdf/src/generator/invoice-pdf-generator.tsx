import html2pdf from "html2pdf.js";
import QRCode from "qrcode";
import { Readable } from "stream";
import { InvoiceData, PdfGeneratorOptions, ResolvedPdfOptions } from "@src/types/invoice-data.types";
import { buildAfipQrUrl } from "@src/utils/qr.utils";
import { InvoiceDocument } from "@src/templates/afip-default";

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
    let qrDataUrl: string | undefined;

    if (this.opts.includeQr) {
      const qrUrl = buildAfipQrUrl(data);
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
    const html = renderTemplate({ data, options: this.opts, qrDataUrl });

    return new Promise((resolve, reject) => {
      html2pdf()
        .set({
          margin: this.opts.margin,
          filename: `factura-${data.cbteLetra}-${data.cbteDesde}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: {
            orientation: "portrait",
            unit: "pt",
            format: this.opts.pageSize === "LETTER" ? "letter" : this.opts.pageSize === "LEGAL" ? "legal" : "a4",
          },
        })
        .from(html)
        .outputPdf("arraybuffer")
        .then((pdf: ArrayBuffer) => {
          resolve(Buffer.from(pdf));
        })
        .catch(reject);
    });
  }

  async generateStream(data: InvoiceData): Promise<Readable> {
    const buffer = await this.generate(data);
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }
}
