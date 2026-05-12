/**
 * Mock for Puppeteer for testing purposes
 * Returns a minimal but valid PDF buffer
 */

// Minimal valid PDF header
const MINIMAL_PDF = Buffer.from("%PDF-1.4\n%EOF", "ascii");

export default {
  launch: async (options?: any) => ({
    newPage: async () => ({
      setViewport: async (viewport: any) => {},
      setContent: async (html: string, opts?: any) => {},
      evaluate: async (fn: Function, ...args: any[]) => {},
      pdf: async (options?: any) => MINIMAL_PDF,
    }),
    close: async () => {},
  }),
};
