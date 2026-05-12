/**
 * Mapeo de código de tipo de comprobante a su letra
 */
export const VOUCHER_TYPE_LETTER: Record<number, string> = {
  1: "A", // Factura A
  2: "A", // Nota de Débito A
  3: "A", // Nota de Crédito A
  6: "B", // Factura B
  7: "B", // Nota de Débito B
  8: "B", // Nota de Crédito B
  11: "C", // Factura C
  12: "C", // Nota de Débito C
  13: "C", // Nota de Crédito C
  19: "E", // Factura E (Exportación)
  20: "E", // Nota de Débito E
  21: "E", // Nota de Crédito E
  51: "M", // Factura M
  52: "M", // Nota de Débito M
  53: "M", // Nota de Crédito M
  201: "A", // Factura de Crédito Electrónica MiPyME A
  202: "A", // Nota de Débito Electrónica MiPyME A
  203: "A", // Nota de Crédito Electrónica MiPyME A
  206: "B", // Factura de Crédito Electrónica MiPyME B
  207: "B", // Nota de Débito Electrónica MiPyME B
  208: "B", // Nota de Crédito Electrónica MiPyME B
  211: "C", // Factura de Crédito Electrónica MiPyME C
  212: "C", // Nota de Débito Electrónica MiPyME C
  213: "C", // Nota de Crédito Electrónica MiPyME C
};

/**
 * Mapeo de código de tipo de comprobante a su descripción
 */
export const VOUCHER_TYPE_DESCRIPTION: Record<number, string> = {
  1: "FACTURA",
  2: "NOTA DE DÉBITO",
  3: "NOTA DE CRÉDITO",
  6: "FACTURA",
  7: "NOTA DE DÉBITO",
  8: "NOTA DE CRÉDITO",
  11: "FACTURA",
  12: "NOTA DE DÉBITO",
  13: "NOTA DE CRÉDITO",
  19: "FACTURA",
  20: "NOTA DE DÉBITO",
  21: "NOTA DE CRÉDITO",
  51: "FACTURA",
  52: "NOTA DE DÉBITO",
  53: "NOTA DE CRÉDITO",
  201: "FACTURA DE CRÉDITO ELECTRÓNICA MiPyME",
  202: "NOTA DE DÉBITO ELECTRÓNICA MiPyME",
  203: "NOTA DE CRÉDITO ELECTRÓNICA MiPyME",
  206: "FACTURA DE CRÉDITO ELECTRÓNICA MiPyME",
  207: "NOTA DE DÉBITO ELECTRÓNICA MiPyME",
  208: "NOTA DE CRÉDITO ELECTRÓNICA MiPyME",
  211: "FACTURA DE CRÉDITO ELECTRÓNICA MiPyME",
  212: "NOTA DE DÉBITO ELECTRÓNICA MiPyME",
  213: "NOTA DE CRÉDITO ELECTRÓNICA MiPyME",
};

/**
 * Código del tipo de comprobante (letra) para el QR
 */
export const VOUCHER_TYPE_CODE: Record<string, string> = {
  A: "001",
  B: "006",
  C: "011",
  E: "019",
  M: "051",
};

/**
 * Mapeo de moneda ID a símbolo
 */
export const CURRENCY_SYMBOL: Record<string, string> = {
  PES: "$",
  DOL: "US$",
  "002": "US$",
  "000": "$",
};

/**
 * Mapeo de moneda ID a nombre completo
 */
export const CURRENCY_NAME: Record<string, string> = {
  PES: "PESOS ARGENTINOS (ARS)",
  DOL: "DÓLARES ESTADOUNIDENSES (USD)",
  "002": "DÓLARES ESTADOUNIDENSES (USD)",
  "000": "PESOS ARGENTINOS (ARS)",
};

/**
 * Mapeo de moneda ID a código ISO
 */
export const CURRENCY_CODE: Record<string, string> = {
  PES: "ARS",
  DOL: "USD",
  "002": "USD",
  "000": "ARS",
};
