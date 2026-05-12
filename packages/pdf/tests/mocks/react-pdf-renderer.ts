// Minimal PDF header for mock output
const PDF_HEADER =
  "%PDF-1.4\n1 0 obj\n<< /Type /Catalog >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF";

export const renderToBuffer = jest
  .fn()
  .mockResolvedValue(Buffer.from(PDF_HEADER, "ascii"));

export const Document = "Document";
export const Page = "Page";
export const View = "View";
export const Text = "Text";
export const Image = "Image";
export const StyleSheet = { create: (s: Record<string, unknown>) => s };
