import { InvoiceData } from "@src/types/invoice-data.types";

const ARCA_QR_BASE_URL = "https://www.afip.gob.ar/fe/qr/";

/**
 * Genera la URL del QR de ARCA para un comprobante electrónico.
 * El QR codifica los datos del comprobante en base64 como parámetro de la URL.
 *
 * @see https://www.afip.gob.ar/fe/qr/especificaciones.asp
 */
export function buildArcaQrUrl(data: InvoiceData): string {
  const cuitEmisor = data.emisor.cuit.replace(/-/g, "");
  const cuitReceptor = data.receptor.documentoNro.replace(/-/g, "");
  const fecha = normalizeDate(data.cbteFecha);

  const qrData = {
    ver: 1,
    fecha,
    cuit: Number(cuitEmisor),
    ptoVta: data.puntoVenta,
    tipoCmp: data.cbteTipo,
    nroCmp: data.cbteDesde,
    importe: data.importeTotal,
    moneda: data.moneda || "PES",
    ctz: data.cotizacion || 1,
    tipoDocRec: getDocTipoNumber(data.receptor.documentoTipo),
    nroDocRec: Number(cuitReceptor) || 0,
    tipoCodAut: "E",
    codAut: Number(data.cae),
  };

  const jsonStr = JSON.stringify(qrData);
  const base64 = Buffer.from(jsonStr).toString("base64");

  return `${ARCA_QR_BASE_URL}?p=${base64}`;
}

function normalizeDate(date: string): string {
  const clean = date.replace(/-/g, "");
  if (clean.length !== 8) return date;
  return `${clean.substring(0, 4)}-${clean.substring(4, 6)}-${clean.substring(6, 8)}`;
}

function getDocTipoNumber(docTipo: string): number {
  const mapping: Record<string, number> = {
    CUIT: 80,
    CUIL: 86,
    CDI: 87,
    DNI: 96,
    LE: 89,
    LC: 90,
    "CI Extranjera": 91,
    Pasaporte: 94,
    "CI Buenos Aires": 0,
    "Sin Identificar": 99,
  };
  return mapping[docTipo] ?? (Number(docTipo) || 99);
}
