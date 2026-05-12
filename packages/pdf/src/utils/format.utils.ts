import { CURRENCY_SYMBOL } from "@src/constants/voucher.constants";

/**
 * Formatea una fecha de YYYYMMDD o YYYY-MM-DD a DD/MM/YYYY
 */
export function formatDate(date: string): string {
  const clean = date.replace(/-/g, "");
  if (clean.length !== 8) return date;
  const day = clean.substring(6, 8);
  const month = clean.substring(4, 6);
  const year = clean.substring(0, 4);
  return `${day}/${month}/${year}`;
}

/**
 * Formatea un número de comprobante con ceros a la izquierda
 */
export function formatVoucherNumber(
  puntoVenta: number,
  numero: number,
): string {
  const pv = String(puntoVenta).padStart(5, "0");
  const nro = String(numero).padStart(8, "0");
  return `${pv}-${nro}`;
}

/**
 * Formatea un CUIT con guiones: XX-XXXXXXXX-X
 */
export function formatCuit(cuit: string): string {
  const clean = cuit.replace(/-/g, "");
  if (clean.length !== 11) return cuit;
  return `${clean.substring(0, 2)}-${clean.substring(2, 10)}-${clean.substring(10)}`;
}

/**
 * Formatea un monto como moneda con separador de miles
 * Ejemplo: 1234567.89 -> "$ 1.234.567,89"
 */
export function formatCurrency(amount: number, monedaId?: string): string {
  const symbol = (monedaId && CURRENCY_SYMBOL[monedaId]) || "$";
  const formatted = formatNumber(amount);
  return `${symbol} ${formatted}`;
}

/**
 * Formatea un número con separador de miles (.) y decimales (,)
 * Formato argentino: 1.234.567,89
 */
export function formatNumber(value: number): string {
  const [intPart, decPart] = value.toFixed(2).split(".");
  const withDots = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${withDots},${decPart}`;
}
