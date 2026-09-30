import { ServerStatus } from "@application/dto/common";
import {
  SalesPoint,
  LastVoucher,
  VoucherInfo,
  AliquotType,
  ParameterType,
  IvaReceptorType,
  CaeaResponse,
  CaeaUsageResponse,
  CaeaNoMovement,
  PaisType,
  ActividadType,
  CotizacionType,
  ErrorInfo,
} from "@domain/types/electronic-billing.types";

export function mapSoapErrors(errors?: {
  Err?: Array<{ Code: number; Msg: string }>;
}): ErrorInfo[] | undefined {
  if (!errors?.Err) return undefined;
  return errors.Err.map((e) => ({
    code: e.Code,
    msg: e.Msg,
  }));
}

export function mapServerStatus(soapResult: {
  AppServer: string;
  DbServer: string;
  AuthServer: string;
}): ServerStatus {
  return {
    appServer: soapResult.AppServer,
    dbServer: soapResult.DbServer,
    authServer: soapResult.AuthServer,
  };
}

export function mapSalesPoints(soapResult: {
  ResultGet?: {
    PtoVenta?: Array<{
      Nro: number;
      EmisionTipo: string;
      Bloqueado: string;
      FchBaja?: string;
    }>;
  };
}): SalesPoint[] {
  return (
    soapResult.ResultGet?.PtoVenta?.map(
      (p): SalesPoint => ({
        nro: p.Nro,
        emisionTipo: p.EmisionTipo,
        bloqueado: p.Bloqueado,
        fechaBaja: p.FchBaja,
      }),
    ) || []
  );
}

export function mapLastVoucher(soapResult: {
  CbteNro: number;
  CbteTipo: number;
  PtoVta: number;
}): LastVoucher {
  return {
    cbteNro: soapResult.CbteNro,
    cbteTipo: soapResult.CbteTipo,
    ptoVta: soapResult.PtoVta,
  };
}

/**
 * Map SOAP voucher info to Domain VoucherInfo
 * Handles special case: Observaciones?.Obs?.[0]?.Msg -> observaciones (flattened);
 * every observation, with its code, goes to observacionesDetalle
 */
export function mapVoucherInfo(soapResult: {
  ResultGet?: {
    CodAutorizacion?: string;
    EmisionTipo?: string;
    FchVto?: string;
    FchProceso?: string;
    Resultado?: string;
    Observaciones?: { Obs?: Array<{ Code: number; Msg: string }> };
    PtoVta?: number;
    CbteTipo?: number;
    Concepto?: number;
    DocTipo?: number;
    DocNro?: number;
    CondicionIVAReceptorId?: number;
    CbteDesde?: number;
    CbteHasta?: number;
    CbteFch?: string;
    ImpTotal?: number;
    ImpTotConc?: number;
    ImpNeto?: number;
    ImpOpEx?: number;
    ImpIVA?: number;
    ImpTrib?: number;
    FchServDesde?: string;
    FchServHasta?: string;
    FchVtoPago?: string;
    MonId?: string;
    MonCotiz?: number;
    CanMisMonExt?: string;
    Iva?: {
      AlicIva?: Array<{ Id: number; BaseImp: number; Importe: number }>;
    };
    Tributos?: {
      Tributo?: Array<{
        Id: number;
        Desc?: string;
        BaseImp: number;
        Alic: number;
        Importe: number;
      }>;
    };
    CbtesAsoc?: {
      CbteAsoc?: Array<{
        Tipo: number;
        PtoVta: number;
        Nro: number;
        Cuit?: string;
        CbteFch?: string;
      }>;
    };
    PeriodoAsoc?: { FchDesde: string; FchHasta: string };
    Opcionales?: { Opcional?: Array<{ Id: string; Valor: string }> };
    Compradores?: {
      Comprador?: Array<{ DocTipo: number; DocNro: number; Porcentaje: number }>;
    };
    Actividades?: { Actividad?: Array<{ Id: number }> };
  };
}): VoucherInfo | null {
  if (!soapResult.ResultGet) {
    return null;
  }

  const result = soapResult.ResultGet;
  return {
    codAutorizacion: result.CodAutorizacion,
    emisionTipo: result.EmisionTipo,
    fchVto: result.FchVto,
    fchProceso: result.FchProceso,
    resultado: result.Resultado,
    observaciones: result.Observaciones?.Obs?.[0]?.Msg,
    observacionesDetalle: result.Observaciones?.Obs?.map((o) => ({
      code: o.Code,
      msg: o.Msg,
    })),
    ptoVta: result.PtoVta,
    cbteTipo: result.CbteTipo,
    concepto: result.Concepto,
    docTipo: result.DocTipo,
    docNro: result.DocNro,
    condicionIVAReceptorId: result.CondicionIVAReceptorId,
    cbteDesde: result.CbteDesde,
    cbteHasta: result.CbteHasta,
    cbteFch: result.CbteFch,
    impTotal: result.ImpTotal,
    impTotConc: result.ImpTotConc,
    impNeto: result.ImpNeto,
    impOpEx: result.ImpOpEx,
    impIVA: result.ImpIVA,
    impTrib: result.ImpTrib,
    fchServDesde: result.FchServDesde,
    fchServHasta: result.FchServHasta,
    fchVtoPago: result.FchVtoPago,
    monId: result.MonId,
    monCotiz: result.MonCotiz,
    canMisMonExt: result.CanMisMonExt,
    iva: result.Iva?.AlicIva?.map((a) => ({
      id: a.Id,
      baseImp: a.BaseImp,
      importe: a.Importe,
    })),
    tributos: result.Tributos?.Tributo?.map((t) => ({
      id: t.Id,
      desc: t.Desc,
      baseImp: t.BaseImp,
      alic: t.Alic,
      importe: t.Importe,
    })),
    cbtesAsoc: result.CbtesAsoc?.CbteAsoc?.map((c) => ({
      tipo: c.Tipo,
      ptoVta: c.PtoVta,
      nro: c.Nro,
      cuit: c.Cuit,
      cbteFch: c.CbteFch,
    })),
    periodoAsoc: result.PeriodoAsoc
      ? {
          fchDesde: result.PeriodoAsoc.FchDesde,
          fchHasta: result.PeriodoAsoc.FchHasta,
        }
      : undefined,
    opcionales: result.Opcionales?.Opcional?.map((o) => ({
      id: o.Id,
      valor: o.Valor,
    })),
    compradores: result.Compradores?.Comprador?.map((c) => ({
      docTipo: c.DocTipo,
      docNro: c.DocNro,
      porcentaje: c.Porcentaje,
    })),
    actividades: result.Actividades?.Actividad?.map((a) => ({ id: a.Id })),
  };
}

export function mapParameterTypes<T extends ParameterType>(
  soapResult: {
    ResultGet?: {
      [key: string]: Array<{
        Id: number | string;
        Desc: string;
        FchDesde: string;
        FchHasta: string;
      }>;
    };
  },
  resultKey: string,
): T[] {
  return (
    (soapResult.ResultGet?.[resultKey]?.map(
      (t): ParameterType => ({
        id: t.Id,
        desc: t.Desc,
        fchDesde: t.FchDesde,
        fchHasta: t.FchHasta,
      }),
    ) as T[]) || []
  );
}

/**
 * Map SOAP aliquot types to Domain AliquotType array
 * Handles special case: Id is string, needs parseInt
 */
export function mapAliquotTypes(soapResult: {
  ResultGet?: {
    IvaTipo?: Array<{
      Id: string;
      Desc: string;
      FchDesde: string;
      FchHasta: string;
    }>;
  };
}): AliquotType[] {
  return (
    soapResult.ResultGet?.IvaTipo?.map(
      (t): AliquotType => ({
        id: parseInt(t.Id, 10),
        desc: t.Desc,
        fchDesde: t.FchDesde,
        fchHasta: t.FchHasta,
      }),
    ) || []
  );
}

export function mapIvaReceptorTypes(soapResult: {
  ResultGet?: {
    CondicionIvaReceptor?: Array<{
      Id: number;
      Desc: string;
      Cmp_Clase: string;
    }>;
  };
}): IvaReceptorType[] {
  return (
    soapResult.ResultGet?.CondicionIvaReceptor?.map(
      (t): IvaReceptorType => ({
        id: t.Id,
        desc: t.Desc,
        cmp_Clase: t.Cmp_Clase,
      }),
    ) || []
  );
}

export function mapCaea(soapResult: {
  CAEA: string;
  Periodo: number;
  Orden: number;
  FchVigDesde: string;
  FchVigHasta: string;
  FchTopeInf: string;
  FchProceso: string;
  Observaciones?: { Obs?: Array<{ Msg: string }> };
}): CaeaResponse {
  return {
    caea: soapResult.CAEA,
    periodo: soapResult.Periodo,
    orden: soapResult.Orden,
    fchVigDesde: soapResult.FchVigDesde,
    fchVigHasta: soapResult.FchVigHasta,
    fchTopeInf: soapResult.FchTopeInf,
    fchProceso: soapResult.FchProceso,
    observaciones: soapResult.Observaciones?.Obs?.[0]?.Msg,
  };
}

export function mapCaeaUsage(soapResult: {
  CAEA: string;
  Concepto: number;
  DocTipo: number;
  DocNro: number;
  CbteDesde: number;
  CbteHasta: number;
  CbteFch: string;
  Resultado: string;
  Observaciones?: { Obs?: Array<{ Msg: string }> };
}): CaeaUsageResponse {
  return {
    caea: soapResult.CAEA,
    concepto: soapResult.Concepto,
    docTipo: soapResult.DocTipo,
    docNro: soapResult.DocNro,
    cbteDesde: soapResult.CbteDesde,
    cbteHasta: soapResult.CbteHasta,
    cbteFch: soapResult.CbteFch,
    resultado: soapResult.Resultado,
    observaciones: soapResult.Observaciones?.Obs?.[0]?.Msg,
  };
}

export function mapCaeaNoMovement(soapResult: {
  ResultGet?: {
    FECAEASinMov?: Array<{
      CAEA: string;
      FchProceso: string;
      PtoVta: number;
    }>;
  };
}): CaeaNoMovement[] {
  return (
    soapResult.ResultGet?.FECAEASinMov?.map(
      (c): CaeaNoMovement => ({
        caea: c.CAEA,
        fchProceso: c.FchProceso,
        ptoVta: c.PtoVta,
      }),
    ) || []
  );
}

export function mapCountries(soapResult: {
  ResultGet?: {
    PaisTipo?: Array<{
      Id: number;
      Desc: string;
    }>;
  };
}): PaisType[] {
  return (
    soapResult.ResultGet?.PaisTipo?.map(
      (p): PaisType => ({
        id: p.Id,
        desc: p.Desc,
      }),
    ) || []
  );
}

export function mapActivities(soapResult: {
  ResultGet?: {
    ActividadesTipo?: Array<{
      Id: number;
      Orden: number;
      Desc: string;
    }>;
  };
}): ActividadType[] {
  return (
    soapResult.ResultGet?.ActividadesTipo?.map(
      (a): ActividadType => ({
        id: a.Id,
        orden: a.Orden,
        desc: a.Desc,
      }),
    ) || []
  );
}

export function mapQuotation(soapResult: {
  ResultGet?: {
    MonId: string;
    MonCotiz: number;
    FchCotiz: string;
  };
}): CotizacionType | undefined {
  if (!soapResult.ResultGet) return undefined;
  return {
    monId: soapResult.ResultGet.MonId,
    monCotiz: soapResult.ResultGet.MonCotiz,
    fchCotiz: soapResult.ResultGet.FchCotiz,
  };
}

export function mapMaxRecords(soapResult: { RegXReq: number }): number {
  return soapResult.RegXReq;
}
