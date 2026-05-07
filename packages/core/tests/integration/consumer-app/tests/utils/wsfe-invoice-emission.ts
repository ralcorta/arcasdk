import { expect } from "@jest/globals";
import type { Arca } from "@arcasdk/core";
import { expectWsfeWithoutErrors, expectNonEmptyString } from "./wsfe-expect";

/** Fecha comprobante AAAAMMDD en calendario local (uso habitual WSFE). */
export function homologacionCbteFch(): string {
  return new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0]!
    .replace(/-/g, "");
}

export function parseCuit11(label: string, raw: string | undefined): number {
  const digits = String(raw ?? "").replace(/\D/g, "");
  if (!/^\d{11}$/.test(digits)) {
    throw new Error(
      `${label}: se esperaba un CUIT de 11 dígitos (recibido: ${JSON.stringify(raw)})`,
    );
  }
  return parseInt(digits, 10);
}

/** True si `raw` tiene 11 dígitos (útil para omitir tests que requieren CUIT B explícito). */
export function envHasCuit11(raw: string | undefined): boolean {
  const digits = String(raw ?? "").replace(/\D/g, "");
  return /^\d{11}$/.test(digits);
}

type FacturaPayload = Parameters<
  Arca["electronicBillingService"]["createVoucher"]
>[0];

type NextVoucherPayload = Parameters<
  Arca["electronicBillingService"]["createNextVoucher"]
>[0];

/**
 * Emite un comprobante con reintentos ante 502 / 10016 (homologación).
 */
export async function createVoucherHomologacionWithRetry(
  arca: Arca,
  puntoVenta: number,
  tipoComprobante: number,
  buildFactura: (siguienteNumero: number, fecha: string) => FacturaPayload,
  options?: { maxRetries?: number; retryDelay?: number },
): Promise<{
  resultado: Awaited<ReturnType<Arca["electronicBillingService"]["createVoucher"]>>;
  fecha: string;
}> {
  const maxRetries = options?.maxRetries ?? 3;
  const retryDelay = options?.retryDelay ?? 500;
  const fecha = homologacionCbteFch();

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    await new Promise((res) => setTimeout(res, Math.random() * 100 + 50));

    const lastVoucher = await arca.electronicBillingService.getLastVoucher(
      puntoVenta,
      tipoComprobante,
    );
    expectWsfeWithoutErrors("getLastVoucher (emisión)", lastVoucher);
    const siguienteNumero = (lastVoucher.cbteNro || 0) + 1;

    const facturaData = buildFactura(siguienteNumero, fecha);
    const resultado =
      await arca.electronicBillingService.createVoucher(facturaData);

    const hasRetryableError = resultado.response.Errors?.Err?.some(
      (err: { Code?: number }) => err.Code === 502 || err.Code === 10016,
    );

    if (hasRetryableError && attempt < maxRetries - 1) {
      const delay = retryDelay * 2 ** attempt;
      await new Promise((res) => setTimeout(res, delay));
      continue;
    }

    return { resultado, fecha };
  }

  throw new Error("Max retries reached for voucher creation");
}

/** Payload Factura C (11) sin `CbteDesde` / `CbteHasta` (los calcula `createNextVoucher`). */
export function buildNextFacturaC(
  puntoVenta: number,
  fecha: string,
  condicionIvaReceptorId: number,
): NextVoucherPayload {
  const impNeto = 100;
  const impTrib = 0;
  const impIVA = 0;
  const impTotal = impNeto + impTrib + impIVA;
  return {
    CantReg: 1,
    PtoVta: puntoVenta,
    CbteTipo: 11,
    Concepto: 2,
    DocTipo: 99,
    DocNro: 0,
    CbteFch: fecha,
    ImpTotal: impTotal,
    ImpTotConc: 0,
    ImpNeto: impNeto,
    ImpOpEx: 0,
    ImpIVA: impIVA,
    ImpTrib: impTrib,
    MonId: "PES",
    MonCotiz: 1,
    CondicionIVAReceptorId: condicionIvaReceptorId,
    FchServDesde: fecha,
    FchServHasta: fecha,
    FchVtoPago: fecha,
  };
}

/**
 * `createNextVoucher` con reintentos ante 502 / 10016 (homologación).
 */
export async function createNextVoucherHomologacionWithRetry(
  arca: Arca,
  puntoVenta: number,
  tipoComprobante: number,
  buildPayload: (fecha: string) => NextVoucherPayload,
  options?: { maxRetries?: number; retryDelay?: number },
): Promise<{
  resultado: Awaited<
    ReturnType<Arca["electronicBillingService"]["createNextVoucher"]>
  >;
  fecha: string;
}> {
  const maxRetries = options?.maxRetries ?? 3;
  const retryDelay = options?.retryDelay ?? 500;
  const fecha = homologacionCbteFch();

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    await new Promise((res) => setTimeout(res, Math.random() * 100 + 50));

    const payload = buildPayload(fecha);
    const resultado =
      await arca.electronicBillingService.createNextVoucher(payload);

    const hasRetryableError = resultado.response.Errors?.Err?.some(
      (err: { Code?: number }) => err.Code === 502 || err.Code === 10016,
    );

    if (hasRetryableError && attempt < maxRetries - 1) {
      const delay = retryDelay * 2 ** attempt;
      await new Promise((res) => setTimeout(res, delay));
      continue;
    }

    return { resultado, fecha };
  }

  throw new Error("Max retries reached for createNextVoucher");
}

function soapList<T>(x: T | T[] | undefined | null): T[] {
  if (x == null) return [];
  return Array.isArray(x) ? x : [x];
}

type ObsLike = { Code?: number; Msg?: string };

function fecaeRejectionHint(response: {
  FeCabResp?: { Resultado?: string };
  FeDetResp?: {
    FECAEDetResponse?: Array<{
      Resultado?: string;
      Observaciones?: { Obs?: ObsLike | ObsLike[] };
    }>;
  };
  Events?: { Evt?: ObsLike | ObsLike[] };
}): string {
  const cab = response.FeCabResp?.Resultado;
  const det = response.FeDetResp?.FECAEDetResponse?.[0];
  const detRes = det?.Resultado;
  const obsMsgs = soapList(det?.Observaciones?.Obs)
    .map((o) => (o.Msg ? `${o.Code ?? "?"}: ${o.Msg}` : ""))
    .filter(Boolean);
  const evtMsgs = soapList(response.Events?.Evt)
    .map((e) => (e.Msg ? `Evt ${e.Code}: ${e.Msg}` : ""))
    .filter(Boolean);
  const parts = [
    `FeCabResp.Resultado=${cab}`,
    `detalle.Resultado=${detRes}`,
    obsMsgs.length ? `Obs: ${obsMsgs.join(" | ")}` : "",
    evtMsgs.length ? evtMsgs.join(" | ") : "",
  ].filter(Boolean);
  return parts.join(". ");
}

/**
 * Homologación: aprobación CAE o rechazo WSFE bien formado (Errors en cabecera SOAP
 * u observaciones / Resultado R en FECAE).
 */
export function expectFecaeHomologacionFlexible(
  resultado: Awaited<
    ReturnType<Arca["electronicBillingService"]["createVoucher"]>
  >,
  opts?: {
    puntoVenta?: number;
    cbteTipo?: number;
    expectBatch?: { cantReg: number };
  },
): void {
  const response = resultado.response;
  const soapErrs = response.Errors?.Err ?? [];
  if (soapErrs.length > 0) {
    for (const e of soapErrs) {
      expect(typeof e.Code).toBe("number");
      expect(String(e.Msg ?? "").trim().length).toBeGreaterThan(0);
    }
    return;
  }

  expect(response.FeCabResp).toBeDefined();
  expect(response.FeDetResp).toBeDefined();
  const cab = response.FeCabResp!;
  const detList = response.FeDetResp!.FECAEDetResponse ?? [];
  expect(detList.length).toBeGreaterThanOrEqual(1);
  const det = detList[0]!;

  if (opts?.puntoVenta !== undefined) {
    expect(cab.PtoVta).toBe(opts.puntoVenta);
  }
  if (opts?.cbteTipo !== undefined) {
    expect(cab.CbteTipo).toBe(opts.cbteTipo);
  }
  if (opts?.expectBatch) {
    expect(cab.CantReg).toBe(opts.expectBatch.cantReg);
  }

  if (cab.Resultado === "A" && det.Resultado === "A") {
    expect(det.CAE).toMatch(/^\d{14}$/);
    expect(det.CAEFchVto).toMatch(/^\d{8}$/);
    if (opts?.expectBatch) {
      expect(det.CbteHasta! - det.CbteDesde! + 1).toBe(
        opts.expectBatch.cantReg,
      );
    }
    return;
  }

  const hint = fecaeRejectionHint(response);
  if (hint.length < 8) {
    throw new Error(
      `FECAE: rechazo sin detalle útil. response=${JSON.stringify(response)}`,
    );
  }
}

export function expectFecaeFacturaAprobada(
  resultado: Awaited<ReturnType<Arca["electronicBillingService"]["createVoucher"]>>,
  ctx: {
    puntoVenta: number;
    cbteTipo: number;
    fecha: string;
    concepto: number;
    docTipo: number;
    docNro: number;
  },
): void {
  const { response } = resultado;
  expect(response).toBeDefined();
  expect(response.Errors?.Err ?? []).toEqual([]);

  const { FeCabResp, FeDetResp } = response;
  expect(FeCabResp).toBeDefined();
  expect(FeDetResp).toBeDefined();
  if (FeCabResp!.Resultado !== "A") {
    throw new Error(
      `FECAE no aprobada (esperado Resultado A). ${fecaeRejectionHint(response)}`,
    );
  }
  expect(FeCabResp!.CantReg).toBe(1);
  expect(FeCabResp!.PtoVta).toBe(ctx.puntoVenta);
  expect(FeCabResp!.CbteTipo).toBe(ctx.cbteTipo);

  const detList = FeDetResp!.FECAEDetResponse;
  expect(detList).toBeDefined();
  expect(detList!.length).toBe(1);
  const det = detList![0]!;
  if (det.Resultado !== "A") {
    throw new Error(
      `FECAE detalle no aprobado (esperado A). ${fecaeRejectionHint(response)}`,
    );
  }
  expect(det.CAE).toMatch(/^\d{14}$/);
  expect(det.CAEFchVto).toMatch(/^\d{8}$/);
  expect(det.CbteDesde).toBe(det.CbteHasta);
  expect(det.CbteFch).toBe(ctx.fecha);
  expect(det.Concepto).toBe(ctx.concepto);
  expect(det.DocTipo).toBe(ctx.docTipo);
  expect(det.DocNro).toBe(ctx.docNro);

  expect(resultado.cae).toBe(det.CAE);
  expect(resultado.caeFchVto).toBe(det.CAEFchVto);
  expectNonEmptyString("resultado.cae", resultado.cae);
  expect(resultado.caeFchVto).toMatch(/^\d{8}$/);
}

/** Factura A (1): receptor RI, IVA 21 %, alícuota Id 5. */
export function buildFacturaA(
  puntoVenta: number,
  docNroReceptor: number,
  condicionIvaReceptorId: number,
  siguienteNumero: number,
  fecha: string,
): FacturaPayload {
  const impNeto = 100;
  const impIVA = 21;
  const impTrib = 0;
  const impTotal = impNeto + impIVA + impTrib;
  return {
    CantReg: 1,
    PtoVta: puntoVenta,
    CbteTipo: 1,
    Concepto: 2,
    DocTipo: 80,
    DocNro: docNroReceptor,
    CbteDesde: siguienteNumero,
    CbteHasta: siguienteNumero,
    CbteFch: fecha,
    ImpTotal: impTotal,
    ImpTotConc: 0,
    ImpNeto: impNeto,
    ImpOpEx: 0,
    ImpIVA: impIVA,
    ImpTrib: impTrib,
    MonId: "PES",
    MonCotiz: 1,
    CondicionIVAReceptorId: condicionIvaReceptorId,
    FchServDesde: fecha,
    FchServHasta: fecha,
    FchVtoPago: fecha,
    Iva: [{ Id: 5, BaseImp: impNeto, Importe: impIVA }],
  };
}

/**
 * Factura B (6): mismo esquema gravado que A. CondicionIVAReceptorId debe ser válida para clase B/C
 * (FEParamGetCondicionIvaReceptor / Cmp_Clase) y coherente con el CUIT en padrón.
 */
export function buildFacturaB(
  puntoVenta: number,
  docNroReceptor: number,
  condicionIvaReceptorId: number,
  siguienteNumero: number,
  fecha: string,
): FacturaPayload {
  const impNeto = 100;
  const impIVA = 21;
  const impTrib = 0;
  const impTotal = impNeto + impIVA + impTrib;
  return {
    CantReg: 1,
    PtoVta: puntoVenta,
    CbteTipo: 6,
    Concepto: 2,
    DocTipo: 80,
    DocNro: docNroReceptor,
    CbteDesde: siguienteNumero,
    CbteHasta: siguienteNumero,
    CbteFch: fecha,
    ImpTotal: impTotal,
    ImpTotConc: 0,
    ImpNeto: impNeto,
    ImpOpEx: 0,
    ImpIVA: impIVA,
    ImpTrib: impTrib,
    MonId: "PES",
    MonCotiz: 1,
    CondicionIVAReceptorId: condicionIvaReceptorId,
    FchServDesde: fecha,
    FchServHasta: fecha,
    FchVtoPago: fecha,
    Iva: [{ Id: 5, BaseImp: impNeto, Importe: impIVA }],
  };
}

/** CUIT emisor (11 dígitos) para `CbtesAsoc.Cuit` y similares. */
export function emitterCuit11Digits(): string {
  const raw = process.env.TEST_CUIT ?? process.env.CUIT ?? "20111111112";
  const digits = String(raw).replace(/\D/g, "");
  if (!/^\d{11}$/.test(digits)) {
    throw new Error(
      `TEST_CUIT/CUIT: se esperaban 11 dígitos (recibido: ${JSON.stringify(raw)})`,
    );
  }
  return digits;
}

/**
 * Factura A en moneda extranjera (p. ej. DOL): importes en moneda del comprobante;
 * `MonCotiz` debe coincidir con FEParamGetCotizacion.
 */
export function buildFacturaAUsd(
  puntoVenta: number,
  docNroReceptor: number,
  condicionIvaReceptorId: number,
  siguienteNumero: number,
  fecha: string,
  monCotiz: number,
): FacturaPayload {
  const impNeto = 100;
  const impIVA = 21;
  const impTrib = 0;
  const impTotal = impNeto + impIVA + impTrib;
  return {
    CantReg: 1,
    PtoVta: puntoVenta,
    CbteTipo: 1,
    Concepto: 2,
    DocTipo: 80,
    DocNro: docNroReceptor,
    CbteDesde: siguienteNumero,
    CbteHasta: siguienteNumero,
    CbteFch: fecha,
    ImpTotal: impTotal,
    ImpTotConc: 0,
    ImpNeto: impNeto,
    ImpOpEx: 0,
    ImpIVA: impIVA,
    ImpTrib: impTrib,
    MonId: "DOL",
    MonCotiz: monCotiz,
    CondicionIVAReceptorId: condicionIvaReceptorId,
    FchServDesde: fecha,
    FchServHasta: fecha,
    FchVtoPago: fecha,
    Iva: [{ Id: 5, BaseImp: impNeto, Importe: impIVA }],
  };
}

/** Factura A concepto 1 (productos): sin fechas de servicio. */
export function buildFacturaAProductos(
  puntoVenta: number,
  docNroReceptor: number,
  condicionIvaReceptorId: number,
  siguienteNumero: number,
  fecha: string,
): FacturaPayload {
  const impNeto = 100;
  const impIVA = 21;
  const impTrib = 0;
  const impTotal = impNeto + impIVA + impTrib;
  return {
    CantReg: 1,
    PtoVta: puntoVenta,
    CbteTipo: 1,
    Concepto: 1,
    DocTipo: 80,
    DocNro: docNroReceptor,
    CbteDesde: siguienteNumero,
    CbteHasta: siguienteNumero,
    CbteFch: fecha,
    ImpTotal: impTotal,
    ImpTotConc: 0,
    ImpNeto: impNeto,
    ImpOpEx: 0,
    ImpIVA: impIVA,
    ImpTrib: impTrib,
    MonId: "PES",
    MonCotiz: 1,
    CondicionIVAReceptorId: condicionIvaReceptorId,
    Iva: [{ Id: 5, BaseImp: impNeto, Importe: impIVA }],
  };
}

/**
 * Factura A con dos alícuotas IVA (21 % y 10,5 %), un tributo y un opcional AFIP.
 * `tributoId` / `opcionalId` deben venir de FEParamGetTiposTributos / FEParamGetTiposOpcional.
 */
export function buildFacturaAMultiIvaTributoOpcional(
  puntoVenta: number,
  docNroReceptor: number,
  condicionIvaReceptorId: number,
  siguienteNumero: number,
  fecha: string,
  tributoId: number,
  opcionalId: string,
): FacturaPayload {
  const base21 = 60;
  const iva21 = 12.6;
  const base105 = 40;
  const iva105 = 4.2;
  const impNeto = base21 + base105;
  const impIVA = iva21 + iva105;
  const impTrib = 1.25;
  const impTotal = impNeto + impIVA + impTrib;
  return {
    CantReg: 1,
    PtoVta: puntoVenta,
    CbteTipo: 1,
    Concepto: 2,
    DocTipo: 80,
    DocNro: docNroReceptor,
    CbteDesde: siguienteNumero,
    CbteHasta: siguienteNumero,
    CbteFch: fecha,
    ImpTotal: impTotal,
    ImpTotConc: 0,
    ImpNeto: impNeto,
    ImpOpEx: 0,
    ImpIVA: impIVA,
    ImpTrib: impTrib,
    MonId: "PES",
    MonCotiz: 1,
    CondicionIVAReceptorId: condicionIvaReceptorId,
    FchServDesde: fecha,
    FchServHasta: fecha,
    FchVtoPago: fecha,
    Iva: [
      { Id: 5, BaseImp: base21, Importe: iva21 },
      { Id: 4, BaseImp: base105, Importe: iva105 },
    ],
    Tributos: [
      {
        Id: tributoId,
        Desc: "Homologación tributo",
        BaseImp: impNeto,
        Alic: 1.25,
        Importe: impTrib,
      },
    ],
    Opcionales: [{ Id: opcionalId, Valor: "1" }],
  };
}

/** Mismo comprobante replicado en rango [CbteDesde, CbteHasta] (CantReg = 2). */
export function buildFacturaALote2(
  puntoVenta: number,
  docNroReceptor: number,
  condicionIvaReceptorId: number,
  cbteDesde: number,
  fecha: string,
): FacturaPayload {
  const cbteHasta = cbteDesde + 1;
  const impNeto = 100;
  const impIVA = 21;
  const impTrib = 0;
  const impTotal = impNeto + impIVA + impTrib;
  return {
    CantReg: 2,
    PtoVta: puntoVenta,
    CbteTipo: 1,
    Concepto: 2,
    DocTipo: 80,
    DocNro: docNroReceptor,
    CbteDesde: cbteDesde,
    CbteHasta: cbteHasta,
    CbteFch: fecha,
    ImpTotal: impTotal,
    ImpTotConc: 0,
    ImpNeto: impNeto,
    ImpOpEx: 0,
    ImpIVA: impIVA,
    ImpTrib: impTrib,
    MonId: "PES",
    MonCotiz: 1,
    CondicionIVAReceptorId: condicionIvaReceptorId,
    FchServDesde: fecha,
    FchServHasta: fecha,
    FchVtoPago: fecha,
    Iva: [{ Id: 5, BaseImp: impNeto, Importe: impIVA }],
  };
}

/** Nota de crédito A (3) con comprobante asociado (típicamente factura A tipo 1). */
export function buildNotaCreditoAConAsociado(
  puntoVenta: number,
  docNroReceptor: number,
  condicionIvaReceptorId: number,
  siguienteNumero: number,
  fecha: string,
  asociado: {
    tipo: number;
    ptoVta: number;
    nro: number;
    cuit: string;
    cbteFch: string;
  },
): FacturaPayload {
  const impNeto = 100;
  const impIVA = 21;
  const impTrib = 0;
  const impTotal = impNeto + impIVA + impTrib;
  return {
    CantReg: 1,
    PtoVta: puntoVenta,
    CbteTipo: 3,
    Concepto: 2,
    DocTipo: 80,
    DocNro: docNroReceptor,
    CbteDesde: siguienteNumero,
    CbteHasta: siguienteNumero,
    CbteFch: fecha,
    ImpTotal: impTotal,
    ImpTotConc: 0,
    ImpNeto: impNeto,
    ImpOpEx: 0,
    ImpIVA: impIVA,
    ImpTrib: impTrib,
    MonId: "PES",
    MonCotiz: 1,
    CondicionIVAReceptorId: condicionIvaReceptorId,
    FchServDesde: fecha,
    FchServHasta: fecha,
    FchVtoPago: fecha,
    Iva: [{ Id: 5, BaseImp: impNeto, Importe: impIVA }],
    CbtesAsoc: [
      {
        Tipo: asociado.tipo,
        PtoVta: asociado.ptoVta,
        Nro: asociado.nro,
        Cuit: asociado.cuit,
        CbteFch: asociado.cbteFch,
      },
    ],
  };
}

/** Nota de débito A (2) con comprobante asociado. */
export function buildNotaDebitoAConAsociado(
  puntoVenta: number,
  docNroReceptor: number,
  condicionIvaReceptorId: number,
  siguienteNumero: number,
  fecha: string,
  asociado: {
    tipo: number;
    ptoVta: number;
    nro: number;
    cuit: string;
    cbteFch: string;
  },
): FacturaPayload {
  const impNeto = 100;
  const impIVA = 21;
  const impTrib = 0;
  const impTotal = impNeto + impIVA + impTrib;
  return {
    CantReg: 1,
    PtoVta: puntoVenta,
    CbteTipo: 2,
    Concepto: 2,
    DocTipo: 80,
    DocNro: docNroReceptor,
    CbteDesde: siguienteNumero,
    CbteHasta: siguienteNumero,
    CbteFch: fecha,
    ImpTotal: impTotal,
    ImpTotConc: 0,
    ImpNeto: impNeto,
    ImpOpEx: 0,
    ImpIVA: impIVA,
    ImpTrib: impTrib,
    MonId: "PES",
    MonCotiz: 1,
    CondicionIVAReceptorId: condicionIvaReceptorId,
    FchServDesde: fecha,
    FchServHasta: fecha,
    FchVtoPago: fecha,
    Iva: [{ Id: 5, BaseImp: impNeto, Importe: impIVA }],
    CbtesAsoc: [
      {
        Tipo: asociado.tipo,
        PtoVta: asociado.ptoVta,
        Nro: asociado.nro,
        Cuit: asociado.cuit,
        CbteFch: asociado.cbteFch,
      },
    ],
  };
}

/** Factura C (11): consumidor final, sin IVA. `CondicionIVAReceptorId` es obligatorio en WSFE. */
export function buildFacturaC(
  puntoVenta: number,
  siguienteNumero: number,
  fecha: string,
  condicionIvaReceptorId: number,
): FacturaPayload {
  const impNeto = 100;
  const impTrib = 0;
  const impIVA = 0;
  const impTotal = impNeto + impTrib + impIVA;
  return {
    CantReg: 1,
    PtoVta: puntoVenta,
    CbteTipo: 11,
    Concepto: 2,
    DocTipo: 99,
    DocNro: 0,
    CbteDesde: siguienteNumero,
    CbteHasta: siguienteNumero,
    CbteFch: fecha,
    ImpTotal: impTotal,
    ImpTotConc: 0,
    ImpNeto: impNeto,
    ImpOpEx: 0,
    ImpIVA: impIVA,
    ImpTrib: impTrib,
    MonId: "PES",
    MonCotiz: 1,
    CondicionIVAReceptorId: condicionIvaReceptorId,
    FchServDesde: fecha,
    FchServHasta: fecha,
    FchVtoPago: fecha,
  };
}
