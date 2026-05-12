/**
 * Datos del emisor (quien emite la factura)
 */
export interface EmisorData {
  razonSocial: string;
  domicilioComercial: string;
  condicionIva: string;
  cuit: string;
  iibb: string;
  fechaInicioActividades: string;
  /** Contacto del emisor (email, web, teléfono) */
  contacto?: string;
}

/**
 * Datos del receptor (a quien va dirigida la factura)
 */
export interface ReceptorData {
  razonSocial: string;
  domicilio?: string;
  condicionIva: string;
  documentoTipo: string;
  documentoNro: string;
}

/**
 * Item individual de la factura
 */
export interface InvoiceItem {
  codigo?: string;
  descripcion: string;
  cantidad: number;
  unidadMedida: string;
  precioUnitario: number;
  bonificacion?: number;
  subtotal: number;
  alicuotaIva?: number;
}

/**
 * Detalle de alícuota de IVA
 */
export interface IvaDetail {
  id: number;
  descripcion: string;
  baseImponible: number;
  importe: number;
}

/**
 * Detalle de otros tributos
 */
export interface TributoDetail {
  id: number;
  descripcion: string;
  baseImponible: number;
  alicuota: number;
  importe: number;
}

/**
 * Comprobante asociado
 */
export interface ComprobanteAsociado {
  tipo: number;
  puntoVenta: number;
  numero: number;
  cuit?: string;
  fecha?: string;
}

/**
 * Datos del comprobante electrónico para generar el PDF
 * Independiente del package core - se puede construir manualmente
 * o mapeando datos desde @arcasdk/core
 */
export interface InvoiceData {
  /** Datos del emisor */
  emisor: EmisorData;

  /** Datos del receptor */
  receptor: ReceptorData;

  /** Tipo de comprobante (ej: 1=Factura A, 6=Factura B, 11=Factura C) */
  cbteTipo: number;

  /** Descripción del tipo de comprobante (ej: "FACTURA") */
  cbteDescripcion?: string;

  /** Letra del comprobante (A, B, C, etc) */
  cbteLetra: string;

  /** Punto de venta */
  puntoVenta: number;

  /** Número de comprobante desde */
  cbteDesde: number;

  /** Número de comprobante hasta */
  cbteHasta: number;

  /** Fecha del comprobante (formato YYYY-MM-DD o YYYYMMDD) */
  cbteFecha: string;

  /** Concepto: 1=Productos, 2=Servicios, 3=Productos y Servicios */
  concepto: number;

  /** Moneda (ej: "PES" para pesos argentinos) */
  moneda?: string;

  /** Cotización de la moneda */
  cotizacion?: number;

  /** Condición de venta (ej: "Contado", "Cuenta Corriente") */
  condicionVenta?: string;

  /** Fecha desde del servicio (para conceptos 2 y 3) */
  fechaServicioDesde?: string;

  /** Fecha hasta del servicio (para conceptos 2 y 3) */
  fechaServicioHasta?: string;

  /** Fecha de vencimiento de pago (para conceptos 2 y 3) */
  fechaVtoPago?: string;

  /** Items de la factura */
  items: InvoiceItem[];

  /** Importe neto gravado */
  importeNetoGravado: number;

  /** Importe neto no gravado */
  importeNetoNoGravado?: number;

  /** Importe exento */
  importeExento?: number;

  /** Detalle de IVA por alícuota */
  iva?: IvaDetail[];

  /** Importe total de IVA */
  importeIva: number;

  /** Detalle de otros tributos */
  tributos?: TributoDetail[];

  /** Importe total de otros tributos */
  importeTributos?: number;

  /** Importe total */
  importeTotal: number;

  /** CAE (Código de Autorización Electrónico) */
  cae: string;

  /** Fecha de vencimiento del CAE (formato YYYY-MM-DD o YYYYMMDD) */
  caeFechaVencimiento: string;

  /** Comprobantes asociados */
  cbtesAsociados?: ComprobanteAsociado[];

  /** Observaciones */
  observaciones?: string;
}

/**
 * Props recibidas por cualquier template de factura.
 * Implementar este contrato para crear templates personalizados.
 */
export interface InvoiceTemplateProps {
  data: InvoiceData;
  options: ResolvedPdfOptions;
  /** Data URL del QR code ya generado (undefined si includeQr=false) */
  qrDataUrl?: string;
}

/**
 * Opciones resueltas (con defaults aplicados) que recibe el template.
 */
export type CopyType =
  | "ORIGINAL"
  | "DUPLICADO"
  | "TRIPLICADO"
  | "CUADRUPLICADO";

export interface ResolvedPdfOptions {
  pageSize: "A4" | "LETTER" | "LEGAL";
  margin: number;
  includeQr: boolean;
  logo?: Buffer;
  logoWidth?: number;
  footerText?: string;
  copy?: CopyType;
  copies?: CopyType[];
}

/**
 * Opciones de configuración para la generación del PDF
 */
export interface PdfGeneratorOptions {
  /** Tamaño de página (default: "A4") */
  pageSize?: "A4" | "LETTER" | "LEGAL";

  /** Márgenes en puntos (default: 40) */
  margin?: number;

  /** Incluir QR code de ARCA (default: true) */
  includeQr?: boolean;

  /** Logo del emisor (buffer de imagen PNG/JPG) */
  logo?: Buffer;

  /** Ancho del logo en puntos (default: 80) */
  logoWidth?: number;

  /** Texto adicional en el pie de página */
  footerText?: string;

  /** Banner de copia individual: "ORIGINAL" | "DUPLICADO" | "TRIPLICADO" | "CUADRUPLICADO" */
  copy?: CopyType;

  /**
   * Generar múltiples copias en un solo PDF.
   * Cada entrada genera una copia completa con su banner.
   * Si se provee, ignora `copy`.
   *
   * @example
   * copies: ["ORIGINAL", "DUPLICADO", "TRIPLICADO"]
   */
  copies?: CopyType[];

  /**
   * Template personalizado. Debe ser una función que reciba
   * InvoiceTemplateProps y retorne un string HTML.
   * Si no se provee, se usa el template oficial ARCA.
   *
   * @example
   * function MiTemplate({ data, options, qrDataUrl }: InvoiceTemplateProps): string {
   *   return `
   *     <html>
   *       <body>
   *         <h1>${data.emisor.razonSocial}</h1>
   *         <img src="${qrDataUrl}" />
   *       </body>
   *     </html>
   *   `;
   * }
   *
   * const generator = new InvoicePdfGenerator({ template: MiTemplate });
   */
  template?: (props: InvoiceTemplateProps) => string;
}
