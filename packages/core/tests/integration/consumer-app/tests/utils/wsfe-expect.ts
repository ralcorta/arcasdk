import { expect } from "@jest/globals";

type WsfeErrPayload = { code: number; msg: string };

/** Respuestas de parámetros / consultas que traen `errors.err` mapeado desde SOAP. */
export type WsfeResultWithErr = { errors?: { err?: WsfeErrPayload[] } };

/**
 * Falla si WSFE devolvió errores de negocio en el DTO (p. ej. FEParam*, cotización).
 */
export function expectWsfeWithoutErrors(
  label: string,
  result: WsfeResultWithErr,
): void {
  const errs = result.errors?.err ?? [];
  try {
    expect(errs).toEqual([]);
  } catch (e) {
    const detail = e instanceof Error ? e.message : String(e);
    throw new Error(
      `${label}: WSFE no debe devolver errores: ${JSON.stringify(errs)} (${detail})`,
    );
  }
}

export function expectNonEmptyArray<T>(label: string, value: T[] | undefined): void {
  if (value === undefined) {
    throw new Error(`${label}: arreglo definido`);
  }
  if (!Array.isArray(value)) {
    throw new Error(`${label}: debe ser arreglo`);
  }
  if (value.length === 0) {
    throw new Error(`${label}: se esperaba al menos un elemento en homologación`);
  }
}

export function expectNonEmptyString(label: string, value: string): void {
  if (typeof value !== "string") {
    throw new Error(`${label}: se esperaba string`);
  }
  if (value.trim().length === 0) {
    throw new Error(`${label}: no vacío`);
  }
}

/** Primera fila típica de FEParam* (id numérico + vigencias). */
export function expectSampleNumericParamRow(
  label: string,
  row: { id: number; desc: string; fchDesde: string; fchHasta: string },
): void {
  try {
    expect(row).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        desc: expect.stringMatching(/\S/),
        fchDesde: expect.stringMatching(/\S/),
        fchHasta: expect.stringMatching(/\S/),
      }),
    );
  } catch (e) {
    const detail = e instanceof Error ? e.message : String(e);
    throw new Error(`${label}: fila de parámetro inválida (${detail})`);
  }
}

/** Monedas / opcionales usan id string en WSFE. */
export function expectSampleStringIdParamRow(
  label: string,
  row: { id: string; desc: string; fchDesde: string; fchHasta: string },
): void {
  try {
    expect(row).toEqual(
      expect.objectContaining({
        id: expect.stringMatching(/\S/),
        desc: expect.stringMatching(/\S/),
        fchDesde: expect.stringMatching(/\S/),
        fchHasta: expect.stringMatching(/\S/),
      }),
    );
  } catch (e) {
    const detail = e instanceof Error ? e.message : String(e);
    throw new Error(`${label}: fila de parámetro inválida (${detail})`);
  }
}

/** Condición IVA receptor (sin fechas de vigencia en el DTO). */
export function expectSampleIvaReceptorRow(
  label: string,
  row: { id: number; desc: string; cmp_Clase: string },
): void {
  try {
    expect(row).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        desc: expect.stringMatching(/\S/),
        cmp_Clase: expect.stringMatching(/\S/),
      }),
    );
  } catch (e) {
    const detail = e instanceof Error ? e.message : String(e);
    throw new Error(`${label}: condición IVA receptor inválida (${detail})`);
  }
}

/** País (solo id + desc). */
export function expectSamplePaisRow(
  label: string,
  row: { id: number; desc: string },
): void {
  try {
    expect(row).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        desc: expect.stringMatching(/\S/),
      }),
    );
  } catch (e) {
    const detail = e instanceof Error ? e.message : String(e);
    throw new Error(`${label}: país inválido (${detail})`);
  }
}

/** Actividad (id, orden, desc). */
export function expectSampleActividadRow(
  label: string,
  row: { id: number; orden: number; desc: string },
): void {
  try {
    expect(row).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        orden: expect.any(Number),
        desc: expect.stringMatching(/\S/),
      }),
    );
  } catch (e) {
    const detail = e instanceof Error ? e.message : String(e);
    throw new Error(`${label}: actividad inválida (${detail})`);
  }
}

/**
 * CAEA: en homologación muchos CUIT no están en régimen; si hay errores,
 * deben ser filas válidas { code, msg }.
 */
export function expectCaeaHomologationPayload(
  label: string,
  r: {
    resultGet?: { caea?: string; periodo?: number; orden?: number };
    errors?: { err?: WsfeErrPayload[] };
  },
): void {
  expect(r).toBeDefined();
  const errs = r.errors?.err ?? [];
  if (errs.length > 0) {
    for (let i = 0; i < errs.length; i++) {
      const e = errs[i]!;
      expect(typeof e.code).toBe("number");
      expect(typeof e.msg).toBe("string");
      expect(e.msg.trim().length).toBeGreaterThan(0);
    }
  } else {
    if (r.resultGet === undefined) {
      throw new Error(`${label}: resultGet ausente sin errores`);
    }
    expect(r.resultGet.periodo).toEqual(expect.any(Number));
    expect(r.resultGet.orden).toEqual(expect.any(Number));
    expectNonEmptyString(`${label}.caea`, String(r.resultGet.caea ?? ""));
  }
}

/**
 * FECAEASinMovimiento*: éxito con filas o lista vacía, o errores WSFE bien formados.
 */
export function expectCaeaNoMovementHomologation(
  label: string,
  r: {
    resultGet?: Array<{ caea?: string; fchProceso?: string; ptoVta?: number }>;
    errors?: { err?: WsfeErrPayload[] };
  },
): void {
  expect(r).toBeDefined();
  const errs = r.errors?.err ?? [];
  if (errs.length > 0) {
    for (const e of errs) {
      expect(typeof e.code).toBe("number");
      expect(typeof e.msg).toBe("string");
      expect(e.msg.trim().length).toBeGreaterThan(0);
    }
    return;
  }
  if (!Array.isArray(r.resultGet)) {
    throw new Error(`${label}: resultGet debe ser arreglo cuando no hay errores`);
  }
  if (r.resultGet.length > 0) {
    const row = r.resultGet[0]!;
    expectNonEmptyString(`${label}.caea`, String(row.caea ?? ""));
    expect(row.ptoVta).toEqual(expect.any(Number));
    expectNonEmptyString(`${label}.fchProceso`, String(row.fchProceso ?? ""));
  }
}

/**
 * FECAEARegInformativo: detalle mapeado o errores WSFE bien formados.
 */
export function expectCaeaUsageHomologation(
  label: string,
  r: {
    resultGet?: {
      caea?: string;
      concepto?: number;
      docTipo?: number;
      docNro?: number;
      cbteDesde?: number;
      cbteHasta?: number;
      cbteFch?: string;
      resultado?: string;
    };
    errors?: { err?: WsfeErrPayload[] };
  },
): void {
  expect(r).toBeDefined();
  const errs = r.errors?.err ?? [];
  if (errs.length > 0) {
    for (const e of errs) {
      expect(typeof e.code).toBe("number");
      expect(typeof e.msg).toBe("string");
      expect(e.msg.trim().length).toBeGreaterThan(0);
    }
    return;
  }
  if (r.resultGet === undefined) {
    throw new Error(`${label}: resultGet ausente sin errores`);
  }
  const g = r.resultGet;
  expectNonEmptyString(`${label}.caea`, String(g.caea ?? ""));
  expect(typeof g.resultado).toBe("string");
  expect(String(g.resultado).length).toBeGreaterThan(0);
  expect(g.concepto).toEqual(expect.any(Number));
  expect(g.docTipo).toEqual(expect.any(Number));
  expect(typeof g.docNro).toBe("number");
  expect(g.cbteDesde).toEqual(expect.any(Number));
  expect(g.cbteHasta).toEqual(expect.any(Number));
  expect(String(g.cbteFch ?? "")).toMatch(/^\d{8}$/);
}

/**
 * FEParamGetCondicionIvaReceptor con `ClaseCmp`: sin errores y cada `cmp_Clase` contiene la letra
 * pedida (p. ej. clase A → "A" o "A/B/C").
 */
export function expectIvaReceptorTypesForClaseCmp(
  label: string,
  claseCmp: string,
  r: {
    resultGet?: {
      condicionIvaReceptor?: Array<{ id: number; desc: string; cmp_Clase: string }>;
    };
    errors?: { err?: WsfeErrPayload[] };
  },
): void {
  const errs = r.errors?.err ?? [];
  if (errs.length > 0) {
    for (const e of errs) {
      expect(typeof e.code).toBe("number");
      expect(typeof e.msg).toBe("string");
      expect(e.msg.trim().length).toBeGreaterThan(0);
    }
    return;
  }
  expectWsfeWithoutErrors(label, r);
  const rows = r.resultGet?.condicionIvaReceptor;
  expectNonEmptyArray(`${label}.condicionIvaReceptor`, rows);
  const esc = claseCmp.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(esc);
  for (let i = 0; i < rows!.length; i++) {
    expectSampleIvaReceptorRow(`${label}[${i}]`, rows![i]!);
    expect(rows![i]!.cmp_Clase).toMatch(re);
  }
}
