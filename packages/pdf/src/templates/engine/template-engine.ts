import Handlebars from "handlebars";
import type { InvoiceTemplateProps } from "@src/types/invoice-data.types";
import {
  formatDate,
  formatCuit,
  formatCurrency,
} from "@src/utils/format.utils";
import {
  VOUCHER_TYPE_DESCRIPTION,
  CURRENCY_NAME,
  CURRENCY_CODE,
} from "@src/constants/voucher.constants";
import { numberToWords } from "@src/utils/number-to-words.utils";

function registerHelpers(hbs: typeof Handlebars): void {
  hbs.registerHelper("formatDate", (date: string) => formatDate(date));

  hbs.registerHelper("formatCuit", (cuit: string) => formatCuit(cuit));

  hbs.registerHelper("formatCurrency", (amount: number, moneda?: string) =>
    formatCurrency(amount, typeof moneda === "string" ? moneda : undefined),
  );

  hbs.registerHelper("formatUnitPrice", (amount: number) => {
    const [intPart, decPart] = amount.toFixed(2).split(".");
    const withDots = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `$ ${withDots},${decPart}`;
  });

  hbs.registerHelper("padStart", (value: number, length: number) =>
    String(value).padStart(length, "0"),
  );

  hbs.registerHelper(
    "voucherNumber",
    (puntoVenta: number, cbteDesde: number) =>
      `${String(puntoVenta).padStart(5, "0")}-${String(cbteDesde).padStart(8, "0")}`,
  );

  hbs.registerHelper(
    "descTipo",
    (cbteTipo: number, cbteDescripcion?: string) =>
      (typeof cbteDescripcion === "string" && cbteDescripcion) ||
      VOUCHER_TYPE_DESCRIPTION[cbteTipo] ||
      "COMPROBANTE",
  );

  hbs.registerHelper(
    "voucherTypeDescription",
    (tipo: number) => VOUCHER_TYPE_DESCRIPTION[tipo] || "Cbte",
  );

  hbs.registerHelper(
    "currencyName",
    (moneda?: string) =>
      (moneda && CURRENCY_NAME[moneda]) || "PESOS ARGENTINOS (ARS)",
  );

  hbs.registerHelper("currencyShortName", (moneda?: string) => {
    const full = (moneda && CURRENCY_NAME[moneda]) || "PESOS ARGENTINOS (ARS)";
    return full.split(" (")[0];
  });

  hbs.registerHelper(
    "currencyCode",
    (moneda?: string) => (moneda && CURRENCY_CODE[moneda]) || "ARS",
  );

  hbs.registerHelper("numberToWords", (n: number) => numberToWords(n));

  hbs.registerHelper("formatCotizacion", (cotizacion?: number) =>
    (cotizacion || 1).toFixed(3).replace(".", ","),
  );

  hbs.registerHelper("docNumber", (documentoNro: string) =>
    documentoNro.length === 11 ? formatCuit(documentoNro) : documentoNro,
  );

  hbs.registerHelper(
    "bonAmount",
    function (
      precioUnitario: number,
      cantidad: number,
      bonificacion: number | undefined,
      importeBonificacion: number | undefined,
    ) {
      // When called with 3 args from template, Handlebars passes options as 4th
      if (typeof importeBonificacion === "object")
        importeBonificacion = undefined;
      if (importeBonificacion != null) return importeBonificacion;
      const pct = bonificacion ?? 0;
      return precioUnitario * cantidad * (pct / 100);
    },
  );

  hbs.registerHelper(
    "ivaImporte",
    (
      ivaArray: Array<{ descripcion: string; importe: number }> | undefined,
      descripcion: string,
    ) => {
      if (!ivaArray || !Array.isArray(ivaArray)) return 0;
      const found = ivaArray.find((i) => i.descripcion === descripcion);
      return found ? found.importe : 0;
    },
  );

  hbs.registerHelper(
    "tributoImporte",
    (
      tributosArray:
        | Array<{ descripcion: string; importe: number }>
        | undefined,
      descripcion: string,
    ) => {
      if (!tributosArray || !Array.isArray(tributosArray)) return 0;
      const found = tributosArray.find((t) => t.descripcion === descripcion);
      return found ? found.importe : 0;
    },
  );

  hbs.registerHelper("multiply", (a: number, b: number) => a * b);

  hbs.registerHelper("eq", (a: unknown, b: unknown) => a === b);
  hbs.registerHelper("neq", (a: unknown, b: unknown) => a !== b);
  hbs.registerHelper("gt", (a: number, b: number) => a > b);
  hbs.registerHelper("gte", (a: number, b: number) => a >= b);
  hbs.registerHelper("or", (...args: unknown[]) => {
    const options = args.pop();
    return args.some(Boolean)
      ? (options as Handlebars.HelperOptions).fn(
          (options as Handlebars.HelperOptions).data.root,
        )
      : (options as Handlebars.HelperOptions).inverse(
          (options as Handlebars.HelperOptions).data.root,
        );
  });
  hbs.registerHelper("and", (a: unknown, b: unknown) => a && b);
  hbs.registerHelper("not", (a: unknown) => !a);
  hbs.registerHelper("default", (a: unknown, b: unknown) => a || b);
  hbs.registerHelper("isNull", (a: unknown) => a == null);
  hbs.registerHelper("len", (a: unknown[]) => (a ? a.length : 0));
}

let initialized = false;

function ensureHelpers(): void {
  if (initialized) return;
  registerHelpers(Handlebars);
  initialized = true;
}

export function compileTemplate(
  source: string,
): (props: InvoiceTemplateProps) => string {
  ensureHelpers();
  const compiled = Handlebars.compile(source, { noEscape: true });
  return (props: InvoiceTemplateProps) => compiled(props);
}

export { Handlebars, ensureHelpers };
