import type { InvoiceTemplateProps } from "@src/types/invoice-data.types";
import {
  formatDate,
  formatCuit,
  formatCurrency,
} from "@src/utils/format.utils";
import {
  VOUCHER_TYPE_DESCRIPTION,
  CURRENCY_NAME,
} from "@src/constants/voucher.constants";

// ── Helpers ──

function descTipo(cbteTipo: number, cbteDescripcion?: string): string {
  return cbteDescripcion || VOUCHER_TYPE_DESCRIPTION[cbteTipo] || "COMPROBANTE";
}

function nro(puntoVenta: number, cbteDesde: number): string {
  return `${String(puntoVenta).padStart(5, "0")}-${String(cbteDesde).padStart(8, "0")}`;
}

function formatUnitPrice(amount: number): string {
  const [intPart, decPart] = amount.toFixed(2).split(".");
  const withDots = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `$ ${withDots},${decPart}`;
}

// ── Number to words (Spanish) ──

function intToWords(n: number): string {
  if (n === 0) return "cero";
  const units = [
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
  const tens = [
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
  const hundreds = [
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

  if (n < 30) return units[n];
  if (n < 100) {
    const t = Math.floor(n / 10);
    const u = n % 10;
    return u === 0 ? tens[t] : `${tens[t]} y ${units[u]}`;
  }
  if (n === 100) return "cien";
  if (n < 1000) {
    const h = Math.floor(n / 100);
    const r = n % 100;
    return r === 0 ? hundreds[h] : `${hundreds[h]} ${intToWords(r)}`;
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

function numberToWords(n: number): string {
  const cents = Math.round((n % 1) * 100);
  const integer = Math.floor(n);
  const centStr = `${String(cents).padStart(2, "0")}/100`;
  if (integer === 0) return `CERO CON ${centStr}`;
  return `${intToWords(integer).toUpperCase()} CON ${centStr}`;
}

// ── HTML builders ──

function buildItemsHeaders(
  isA: boolean,
  isC: boolean,
): { headers: string[]; widths: number[] } {
  if (isA) {
    return {
      headers: [
        "Cantidad",
        "Producto / Servicio",
        "Precio unit",
        "%Bonif.",
        "$ Bonif.",
        "%IVA",
        "Subtotal s/IVA",
      ],
      widths: [10, 25, 13, 8, 10, 8, 26],
    };
  }
  if (isC) {
    return {
      headers: [
        "Cantidad",
        "Producto / Servicio",
        "Precio unit",
        "%Bonif.",
        "$ Bonif.",
        "Subtotal",
      ],
      widths: [10, 30, 13, 8, 10, 29],
    };
  }
  // B
  return {
    headers: [
      "Cantidad",
      "Producto / Servicio",
      "Precio Unit.",
      "%Bonif.",
      "$ Bonif.",
      "Subtotal",
    ],
    widths: [11, 29, 15, 9, 12, 24],
  };
}

function buildTotalsRows(
  data: InvoiceTemplateProps["data"],
): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [];
  const isA = data.cbteLetra === "A";
  const isB = data.cbteLetra === "B";

  rows.push({
    label: "Bonificación General",
    value: formatCurrency(0, data.moneda),
  });

  if (isA) {
    rows.push({
      label: "Importe neto gravado",
      value: formatCurrency(data.importeNetoGravado, data.moneda),
    });
    if (data.iva && data.iva.length > 0) {
      for (const iva of data.iva) {
        rows.push({
          label: `IVA ${iva.descripcion}`,
          value: formatCurrency(iva.importe, data.moneda),
        });
      }
    } else if (data.importeIva > 0) {
      rows.push({
        label: "IVA",
        value: formatCurrency(data.importeIva, data.moneda),
      });
    }
    rows.push({
      label: "No gravados",
      value: formatCurrency(data.importeNetoNoGravado || 0, data.moneda),
    });
    rows.push({
      label: "Exentos",
      value: formatCurrency(data.importeExento || 0, data.moneda),
    });
  } else if (isB) {
    rows.push({
      label: "Subtotal",
      value: formatCurrency(data.importeNetoGravado, data.moneda),
    });
  } else {
    rows.push({
      label: "Importe neto gravado",
      value: formatCurrency(data.importeNetoGravado, data.moneda),
    });
  }

  rows.push({
    label: "Importe Otros Tributos",
    value: formatCurrency(data.importeTributos || 0, data.moneda),
  });
  return rows;
}

// ── Main export ──

export function InvoiceDocument({
  data,
  options,
  qrDataUrl,
}: InvoiceTemplateProps): string {
  const isA = data.cbteLetra === "A";
  const isC = data.cbteLetra === "C";
  const { headers, widths } = buildItemsHeaders(isA, isC);

  const docNumber =
    data.receptor.documentoNro.length === 11
      ? formatCuit(data.receptor.documentoNro)
      : data.receptor.documentoNro;

  // Items rows
  const itemsHtml = data.items
    .map((item) => {
      const bonPct = item.bonificacion ?? 0;
      const bonAmt = item.precioUnitario * item.cantidad * (bonPct / 100);

      const vals: string[] = [
        `${item.cantidad} ${item.unidadMedida}`,
        item.descripcion,
        formatUnitPrice(item.precioUnitario),
      ];

      if (!isC || isA) {
        vals.push(`${bonPct}%`);
        vals.push(formatCurrency(bonAmt, data.moneda));
      }
      if (isC && !isA) {
        vals.push(`${bonPct}%`);
        vals.push(formatCurrency(bonAmt, data.moneda));
      }
      if (isA) {
        vals.push(item.alicuotaIva != null ? `${item.alicuotaIva}%` : "-");
      }
      vals.push(formatCurrency(item.subtotal, data.moneda));

      return `<tr class="item-row">${vals.map((v, ci) => `<td style="width:${widths[ci]}%; text-align:${ci <= 1 ? "left" : "right"}">${v}</td>`).join("")}</tr>`;
    })
    .join("");

  // Tributos
  const tributosHtml =
    data.tributos && data.tributos.length > 0
      ? `<table class="tributos-table">
          <tr class="tributos-header"><td colspan="2">Detalle de otros tributos:</td></tr>
          <tr class="tributos-subheader"><td>Descripción</td><td>Importe</td></tr>
          ${data.tributos.map((t) => `<tr class="tributos-row"><td>${t.descripcion}</td><td>${formatCurrency(t.importe, data.moneda)}</td></tr>`).join("")}
        </table>`
      : "";

  // Totals
  const totalsRows = buildTotalsRows(data);
  const totalsHtml = totalsRows
    .map(
      (r) =>
        `<div class="totals-row"><span class="totals-label">${r.label}</span><span class="totals-value">${r.value}</span></div>`,
    )
    .join("");

  // Periodo / servicio line
  const currencyFullName =
    (data.moneda && CURRENCY_NAME[data.moneda]) || "PESOS ARGENTINOS (ARS)";
  const periodoLine =
    data.concepto >= 2 && data.fechaServicioDesde && data.fechaServicioHasta
      ? `<div class="receptor-row"><b>Período facturado:</b> ${formatDate(data.fechaServicioDesde)} al ${formatDate(data.fechaServicioHasta)}&nbsp;&nbsp;&nbsp;&nbsp;<b>Divisa:</b> ${currencyFullName.split(" (")[0]} - Tipo de cambio: ${(data.cotizacion || 1).toFixed(3).replace(".", ",")}</div>`
      : "";
  const currencyLabel =
    (data.moneda && CURRENCY_NAME[data.moneda]) || "PESOS ARGENTINOS (ARS)";

  const condVentaLine = data.condicionVenta
    ? `&nbsp;&nbsp;&nbsp;&nbsp;<b>Cond. Venta:</b> ${data.condicionVenta}${data.fechaVtoPago ? ` (Vencimiento: ${formatDate(data.fechaVtoPago)})` : ""}`
    : "";

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${descTipo(data.cbteTipo, data.cbteDescripcion)} ${data.cbteLetra} ${nro(data.puntoVenta, data.cbteDesde)}</title>
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html,body{height:100%;font-family:Arial,Helvetica,sans-serif;font-size:8pt;line-height:1.35;color:#000;overflow-x:hidden}
  b{font-weight:bold}
  table{border-collapse:collapse;width:100%}
  .page{padding-right:1px}

  /* ── Page wrapper ── */
  .page{min-height:100vh;display:flex;flex-direction:column}
  .content{flex:1;display:flex;flex-direction:column}

  /* ── Banner ── */
  .banner{border:1pt solid #000;text-align:center;padding:5px 0;margin-bottom:6px}
  .banner span{font-size:12pt;font-weight:bold}

  /* ── Header ── */
  .header{border:1pt solid #000;margin-bottom:6px}
  .header-top{display:flex;min-height:75px}
  .header-left{flex:1;border-right:1pt solid #000;padding:8px;display:flex;flex-direction:column;justify-content:center}
  .header-left .emisor-rs{font-size:10pt;font-weight:bold;margin:2px 0}
  .header-left .emisor-dom{font-size:7.5pt;margin-bottom:1px}
  .header-left .emisor-extra{font-size:7.5pt;margin-top:3px}

  .header-center{width:54px;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding-top:6px}
  .letter-box{width:46px;height:46px;border:1pt solid #000;display:flex;align-items:center;justify-content:center;font-size:28pt;font-weight:bold}
  .letter-cod{font-size:7pt;margin-top:2px;text-align:center}

  .header-right{flex:1;border-left:1pt solid #000;padding:8px;display:flex;flex-direction:column;justify-content:center;text-align:right}
  .header-right .voucher-type{font-size:13pt;font-weight:bold}
  .header-right .voucher-nro{font-size:11pt;font-weight:bold;margin-top:3px}
  .header-right .voucher-fecha{font-size:9pt;font-weight:bold;margin-top:6px}

  .header-bottom{display:flex;border-top:1pt solid #000;min-height:36px}
  .header-bottom-left{flex:1;border-right:1pt solid #000;padding:5px 8px;font-size:7.5pt;display:flex;align-items:center}
  .header-bottom-right{flex:1;padding:4px 10px;display:flex;flex-direction:column;justify-content:center}
  .info-row{display:flex;justify-content:flex-end;gap:6px;margin-bottom:1px}
  .info-row .lbl{font-weight:bold;font-size:7.5pt}
  .info-row .val{font-size:7.5pt}

  /* ── Receptor ── */
  .receptor{padding:6px 8px;margin-bottom:4px}
  .receptor-row{margin-bottom:3px;font-size:8pt}
  .receptor-sep{border-bottom:1pt solid #000;margin-top:4px}

  /* ── Items table ── */
  .items-table{border:1pt solid #000;margin-bottom:4px}
  .items-table .items-header td{background:#e8e8e8;font-weight:bold;font-size:7.5pt;padding:5px 4px;border-right:0.5pt solid #ccc;border-bottom:1pt solid #000}
  .items-table .items-header td:last-child{border-right:none}
  .items-table .item-row td{font-size:7.5pt;padding:5px 4px;border-bottom:0.5pt solid #ccc;border-right:0.5pt solid #ccc}
  .items-table .item-row td:last-child{border-right:none}

  /* ── Summary final (pushed to bottom) ── */
  .summary-final{margin-top:auto;break-inside:avoid;page-break-inside:avoid}

  .bottom-columns{display:flex;gap:10px;margin-bottom:6px}
  .bottom-col-left{width:42%}
  .bottom-col-right{width:52%;margin-left:auto}

  /* Tributos */
  .tributos-table{border:1pt solid #000;font-size:7.5pt;width:100%}
  .tributos-table td{padding:3px 5px}
  .tributos-header td{background:#f0f0f0;font-weight:bold;border-bottom:1pt solid #000}
  .tributos-subheader td{font-weight:bold;border-bottom:0.5pt solid #ccc}
  .tributos-subheader td:last-child{text-align:right}
  .tributos-row td:last-child{text-align:right}

  /* Totals */
  .totals-row{display:flex;justify-content:flex-end;margin-bottom:1px}
  .totals-label{text-align:right;font-size:8pt;padding-right:8px;width:60%}
  .totals-value{text-align:right;font-size:8pt;width:40%}
  .total-box{display:flex;background:#d9e2f3;border:1pt solid #000;padding:4px 6px;margin:4px 0}
  .total-box-label{width:60%;text-align:right;font-size:11pt;font-weight:bold;padding-right:8px}
  .total-box-value{width:40%;text-align:right;font-size:11pt;font-weight:bold}
  .son-text{font-size:7pt;text-align:right;margin-top:2px}

  /* ── CAE / QR footer ── */
  .cae-section{display:flex;align-items:flex-start;gap:12px;margin-top:8px}
  .qr-img{width:65px;height:65px}
  .arca-block{display:flex;flex-direction:column;justify-content:center}
  .arca-title{font-size:13pt;font-weight:bold}
  .arca-sub{font-size:8pt;font-style:italic;margin-top:2px}
  .arca-disclaimer{font-size:6.5pt;line-height:1.3;margin-top:3px}
  .cae-line{font-size:8.5pt;font-weight:bold;margin-top:6px}
  .observations{font-size:6.5pt;font-style:italic;color:#333;margin-top:3px}
</style>
</head>
<body>
<div class="page">
<div class="content">

  <!-- Banner -->
  <div class="banner"><span>${options.copy || "ORIGINAL"}</span></div>

  <!-- Header -->
  <div class="header">
    <div class="header-top">
      <div class="header-left">
        ${options.logo ? `<img src="${options.logo}" style="width:${options.logoWidth || 60}px;margin-bottom:4px">` : ""}
        <div class="emisor-dom">Razón social:</div>
        <div class="emisor-rs">${data.emisor.razonSocial}</div>
        <div class="emisor-dom">Domicilio:</div>
        <div class="emisor-dom">${data.emisor.domicilioComercial}</div>
        ${data.emisor.contacto ? `<div class="emisor-extra">${data.emisor.contacto}</div>` : ""}
      </div>
      <div class="header-center">
        <div class="letter-box">${data.cbteLetra}</div>
        <div class="letter-cod">COD.${data.cbteTipo}</div>
      </div>
      <div class="header-right">
        <div class="voucher-type">${descTipo(data.cbteTipo, data.cbteDescripcion)} ${data.cbteLetra}</div>
        <div class="voucher-nro">Nro.:${nro(data.puntoVenta, data.cbteDesde)}</div>
        <div class="voucher-fecha">Fecha: ${formatDate(data.cbteFecha)}</div>
      </div>
    </div>
    <div class="header-bottom">
      <div class="header-bottom-left"></div>
      <div class="header-bottom-right">
        <div class="info-row"><span class="lbl">CUIT:</span><span class="val">${formatCuit(data.emisor.cuit)} - ${data.emisor.condicionIva}</span></div>
        <div class="info-row"><span class="lbl">Ingresos Brutos:</span><span class="val">${data.emisor.iibb}</span></div>
        <div class="info-row"><span class="lbl">Inicio actividades:</span><span class="val">${formatDate(data.emisor.fechaInicioActividades)}</span></div>
      </div>
    </div>
  </div>

  <!-- Receptor -->
  <div class="receptor">
    <div class="receptor-row"><b>Apellido y nombre / Razón Social:</b> ${data.receptor.razonSocial}</div>
    <div class="receptor-row"><b>Domicilio:</b> ${data.receptor.domicilio || "- -"}</div>
    <div class="receptor-row"><b>${data.receptor.documentoTipo}:</b> ${docNumber}&nbsp;&nbsp;&nbsp;&nbsp;<b>Condición frente al IVA:</b> ${data.receptor.condicionIva}${condVentaLine}</div>
    ${periodoLine}
    <div class="receptor-sep"></div>
  </div>

  <!-- Items -->
  ${data.cbtesAsociados && data.cbtesAsociados.length > 0 ? `<div class="receptor-row" style="margin-bottom:4px;font-size:7.5pt"><b>Comprobantes asociados:</b> ${data.cbtesAsociados.map((c) => `${VOUCHER_TYPE_DESCRIPTION[c.tipo] || "Cbte"} ${String(c.puntoVenta).padStart(5, "0")}-${String(c.numero).padStart(8, "0")}${c.fecha ? " (" + formatDate(c.fecha) + ")" : ""}`).join(", ")}</div>` : ""}
  <table class="items-table">
    <tr class="items-header">
      ${headers.map((h, i) => `<td style="width:${widths[i]}%;text-align:${i <= 1 ? "left" : "right"}">${h}</td>`).join("")}
    </tr>
    ${itemsHtml}
  </table>

  <!-- Summary final (totals + CAE + QR) — pushed to page bottom -->
  <div class="summary-final">
    <div class="bottom-columns">
      <div class="bottom-col-left">${tributosHtml}</div>
      <div class="bottom-col-right">
        ${totalsHtml}
        <div class="total-box">
          <span class="total-box-label">Importe Total</span>
          <span class="total-box-value">${formatCurrency(data.importeTotal, data.moneda)}</span>
        </div>
        <div class="son-text">Son ${currencyLabel} ${numberToWords(data.importeTotal)}</div>
      </div>
    </div>

    <div class="cae-section">
      ${qrDataUrl ? `<img src="${qrDataUrl}" class="qr-img">` : ""}
      <div class="arca-block">
        <div class="arca-title">ARCA</div>
        <div class="arca-sub">Comprobante Autorizado</div>
        <div class="arca-disclaimer">Esta Administración Federal no se responsabiliza por los datos ingresados en el detalle de la operación.</div>
      </div>
    </div>
    <div class="cae-line">CAE N°: ${data.cae}&nbsp;&nbsp;&nbsp;&nbsp;Fecha vencimiento CAE: ${formatDate(data.caeFechaVencimiento)}</div>
    ${data.observaciones ? `<div class="observations">Observaciones: ${data.observaciones}</div>` : ""}
  </div>

</div>
</div>
</body>
</html>`;
}
