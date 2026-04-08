import type { Arca } from "@arcasdk/core";
import { expectWsfeWithoutErrors } from "./wsfe-expect";

/** WSFE devuelve 602 cuando el contribuyente no tiene puntos de venta dados de alta para FE. */
export const WSFE_NO_PUNTOS_VENTA_CODE = 602;

export function isWsfeNoPuntosVentaResponse(errs: { code: number; msg: string }[]): boolean {
  return (
    errs.length === 1 &&
    errs[0]!.code === WSFE_NO_PUNTOS_VENTA_CODE &&
    /FEParamGetPtosVenta|PtosVenta|Sin Resultados/i.test(errs[0]!.msg)
  );
}

/**
 * Número de punto de venta a usar en homologación.
 * Si `getSalesPoints` trae lista, se usa el primer Nro; si viene 602 “sin resultados”,
 * se usa `TEST_WSFE_PTO_VTA` (default `2`), como en entornos ARCA sin PV en el padrón.
 */
export async function resolveHomologationPuntoVenta(arca: Arca): Promise<{
  nro: number;
  source: "wsfe" | "fallback";
}> {
  const result = await arca.electronicBillingService.getSalesPoints();
  const list = result.resultGet?.ptoVenta ?? [];
  const errs = result.errors?.err ?? [];

  if (list.length > 0) {
    return { nro: list[0]!.nro, source: "wsfe" };
  }

  if (errs.length > 0) {
    if (!isWsfeNoPuntosVentaResponse(errs)) {
      expectWsfeWithoutErrors("getSalesPoints", result);
    }
  }

  const raw = process.env.TEST_WSFE_PTO_VTA ?? "2";
  const nro = parseInt(raw, 10);
  if (!Number.isFinite(nro) || nro < 1) {
    throw new Error(
      `TEST_WSFE_PTO_VTA debe ser un entero >= 1 (recibido: ${JSON.stringify(raw)})`,
    );
  }
  return { nro, source: "fallback" };
}
