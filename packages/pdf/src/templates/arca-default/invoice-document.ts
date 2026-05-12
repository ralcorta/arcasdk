import { readFileSync } from "fs";
import { join } from "path";
import type { InvoiceTemplateProps } from "@src/types/invoice-data.types";
import { compileTemplate } from "@src/templates/engine";

const hbsSource = readFileSync(
  join(__dirname, "invoice-document.hbs"),
  "utf-8",
);

const render = compileTemplate(hbsSource);

export function InvoiceDocument(props: InvoiceTemplateProps): string {
  return render(props);
}

export const defaultTemplateSource = hbsSource;
