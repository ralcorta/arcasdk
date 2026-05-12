/**
 * Mock for Puppeteer for testing purposes
 * Returns a minimal but valid PDF buffer
 */

import { PDFDocument } from "pdf-lib";

let cachedPdf: Buffer | null = null;

async function getMinimalPdf(): Promise<Buffer> {
  if (cachedPdf) return cachedPdf;
  const doc = await PDFDocument.create();
  doc.addPage();
  const bytes = await doc.save();
  cachedPdf = Buffer.from(bytes);
  return cachedPdf;
}

export default {
  launch: async (options?: any) => ({
    newPage: async () => ({
      setViewport: async (viewport: any) => {},
      setContent: async (html: string, opts?: any) => {},
      evaluate: async (fn: Function, ...args: any[]) => {},
      pdf: async (options?: any) => getMinimalPdf(),
    }),
    close: async () => {},
  }),
};
