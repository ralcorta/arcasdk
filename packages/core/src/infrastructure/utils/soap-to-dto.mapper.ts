/**
 * SOAP to Domain Types Mapper
 * Utility functions to convert SOAP types (PascalCase) to Domain types (camelCase)
 * Maps from infrastructure (SOAP) to domain (business concepts)
 * This maintains architectural boundaries: Infrastructure -> Domain -> Application
 */
import {
  SalesPoint,
  ServerStatus,
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

/**
 * Map SOAP errors to Domain ErrorInfo
 */
export function mapSoapErrors(errors?: {
  Err?: Array<{ Code: number; Msg: string }>;
}): ErrorInfo[] | undefined {
  if (!errors?.Err) return undefined;
  return errors.Err.map((e) => ({
    code: e.Code,
    msg: e.Msg,
  }));
}

/**
 * Map SOAP server status to Domain ServerStatus
 */
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

/**
 * Map SOAP sales points to Domain SalesPoint array
 */
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
      })
    ) || []
  );
}

/**
 * Map SOAP last voucher to Domain LastVoucher
 */
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
 * Handles special case: Observaciones?.Obs?.[0]?.Msg -> observaciones (flattened)
 */
export function mapVoucherInfo(soapResult: {
  ResultGet?: {
    CodAutorizacion?: string;
    EmisionTipo?: string;
    FchVto?: string;
    FchProceso?: string;
    Resultado?: string;
    Observaciones?: { Obs?: Array<{ Msg: string }> };
    Concepto?: number;
    DocTipo?: number;
    DocNro?: number;
    CbteDesde?: number;
    CbteHasta?: number;
    CbteFch?: string;
    ImpTotal?: number;
    ImpTotConc?: number;
    ImpNeto?: number;
    ImpOpEx?: number;
    ImpIVA?: number;
    ImpTrib?: number;
    MonId?: string;
    MonCotiz?: number;
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
    concepto: result.Concepto,
    docTipo: result.DocTipo,
    docNro: result.DocNro,
    cbteDesde: result.CbteDesde,
    cbteHasta: result.CbteHasta,
    cbteFch: result.CbteFch,
    impTotal: result.ImpTotal,
    impTotConc: result.ImpTotConc,
    impNeto: result.ImpNeto,
    impOpEx: result.ImpOpEx,
    impIVA: result.ImpIVA,
    impTrib: result.ImpTrib,
    monId: result.MonId,
    monCotiz: result.MonCotiz,
  };
}

/**
 * Map SOAP parameter types to Domain ParameterType array (generic for all parameter types)
 */
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
  resultKey: string
): T[] {
  return (
    (soapResult.ResultGet?.[resultKey]?.map(
      (t): ParameterType => ({
        id: t.Id,
        desc: t.Desc,
        fchDesde: t.FchDesde,
        fchHasta: t.FchHasta,
      })
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
      })
    ) || []
  );
}

/**
 * Map SOAP IVA receptor types to Domain IvaReceptorType array
 */
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
      })
    ) || []
  );
}
/**
 * Map SOAP CAEA to Domain CaeaResponse
 */
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

/**
 * Map SOAP CAEA Usage to Domain CaeaUsageResponse
 */
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

/**
 * Map SOAP CAEA No Movement to Domain CaeaNoMovement array
 */
export function mapCaeaNoMovement(soapResult: {
  ResultGet?: Array<{
    CAEA: string;
    FchProceso: string;
    PtoVta: number;
  }>;
}): CaeaNoMovement[] {
  return (
    soapResult.ResultGet?.map(
      (c): CaeaNoMovement => ({
        caea: c.CAEA,
        fchProceso: c.FchProceso,
        ptoVta: c.PtoVta,
      })
    ) || []
  );
}

/**
 * Map SOAP Countries to Domain PaisType array
 */
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
      })
    ) || []
  );
}

/**
 * Map SOAP Activities to Domain ActividadType array
 */
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
      })
    ) || []
  );
}

/**
 * Map SOAP Quotation to Domain CotizacionType
 */
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

/**
 * Map SOAP Max Records to number
 */
export function mapMaxRecords(soapResult: { RegXReq: number }): number {
  return soapResult.RegXReq;
}
