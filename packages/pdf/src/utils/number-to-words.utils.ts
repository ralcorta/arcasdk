const UNITS = [
  "",
  "un",
  "dos",
  "tres",
  "cuatro",
  "cinco",
  "seis",
  "siete",
  "ocho",
  "nueve",
  "diez",
  "once",
  "doce",
  "trece",
  "catorce",
  "quince",
  "dieciséis",
  "diecisiete",
  "dieciocho",
  "diecinueve",
  "veinte",
  "veintiún",
  "veintidós",
  "veintitrés",
  "veinticuatro",
  "veinticinco",
  "veintiséis",
  "veintisiete",
  "veintiocho",
  "veintinueve",
];

const TENS = [
  "",
  "",
  "",
  "treinta",
  "cuarenta",
  "cincuenta",
  "sesenta",
  "setenta",
  "ochenta",
  "noventa",
];

const HUNDREDS = [
  "",
  "ciento",
  "doscientos",
  "trescientos",
  "cuatrocientos",
  "quinientos",
  "seiscientos",
  "setecientos",
  "ochocientos",
  "novecientos",
];

function intToWords(n: number): string {
  if (n === 0) return "cero";
  if (n < 30) return UNITS[n];
  if (n < 100) {
    const t = Math.floor(n / 10);
    const u = n % 10;
    return u === 0 ? TENS[t] : `${TENS[t]} y ${UNITS[u]}`;
  }
  if (n === 100) return "cien";
  if (n < 1000) {
    const h = Math.floor(n / 100);
    const r = n % 100;
    return r === 0 ? HUNDREDS[h] : `${HUNDREDS[h]} ${intToWords(r)}`;
  }
  if (n < 1_000_000) {
    const thou = Math.floor(n / 1000);
    const r = n % 1000;
    const s = thou === 1 ? "mil" : `${intToWords(thou)} mil`;
    return r === 0 ? s : `${s} ${intToWords(r)}`;
  }
  if (n < 1_000_000_000) {
    const mill = Math.floor(n / 1_000_000);
    const r = n % 1_000_000;
    const s = mill === 1 ? "un millón" : `${intToWords(mill)} millones`;
    return r === 0 ? s : `${s} ${intToWords(r)}`;
  }
  return String(n);
}

export function numberToWords(n: number): string {
  const cents = Math.round((n % 1) * 100);
  const integer = Math.floor(n);
  const centStr = `${String(cents).padStart(2, "0")}/100`;
  if (integer === 0) return `CERO CON ${centStr}`;
  return `${intToWords(integer).toUpperCase()} CON ${centStr}`;
}
