import {
  mapSoapErrors,
  mapServerStatus,
  mapSalesPoints,
  mapLastVoucher,
  mapVoucherInfo,
  mapParameterTypes,
  mapAliquotTypes,
  mapIvaReceptorTypes,
  mapCaea,
  mapCaeaUsage,
  mapCaeaNoMovement,
  mapCountries,
  mapActivities,
  mapQuotation,
  mapMaxRecords,
} from "@infrastructure/mappers";

describe("soap-to-dto.mapper", () => {
  describe("mapSoapErrors", () => {
    it("should return undefined when errors is undefined", () => {
      expect(mapSoapErrors(undefined)).toBeUndefined();
    });

    it("should return undefined when Err array is absent", () => {
      expect(mapSoapErrors({})).toBeUndefined();
    });

    it("should map Err array to domain ErrorInfo array", () => {
      const result = mapSoapErrors({
        Err: [
          { Code: 602, Msg: "Contribuyente no encontrado" },
          { Code: 999, Msg: "Error interno" },
        ],
      });

      expect(result).toEqual([
        { code: 602, msg: "Contribuyente no encontrado" },
        { code: 999, msg: "Error interno" },
      ]);
    });
  });

  describe("mapServerStatus", () => {
    it("should map SOAP server status fields to camelCase", () => {
      const result = mapServerStatus({
        AppServer: "OK",
        DbServer: "OK",
        AuthServer: "OK",
      });

      expect(result).toEqual({
        appServer: "OK",
        dbServer: "OK",
        authServer: "OK",
      });
    });
  });

  describe("mapSalesPoints", () => {
    it("should map PtoVenta array to domain SalesPoint array", () => {
      const result = mapSalesPoints({
        ResultGet: {
          PtoVenta: [
            { Nro: 1, EmisionTipo: "CAE", Bloqueado: "N", FchBaja: "20241231" },
          ],
        },
      });

      expect(result).toEqual([
        { nro: 1, emisionTipo: "CAE", bloqueado: "N", fechaBaja: "20241231" },
      ]);
    });

    it("should return empty array when PtoVenta is absent", () => {
      expect(mapSalesPoints({ ResultGet: {} })).toEqual([]);
      expect(mapSalesPoints({})).toEqual([]);
    });
  });

  describe("mapLastVoucher", () => {
    it("should map SOAP last voucher to domain LastVoucher", () => {
      const result = mapLastVoucher({ CbteNro: 10, CbteTipo: 1, PtoVta: 2 });

      expect(result).toEqual({ cbteNro: 10, cbteTipo: 1, ptoVta: 2 });
    });
  });

  describe("mapVoucherInfo", () => {
    it("should return null when ResultGet is absent", () => {
      expect(mapVoucherInfo({})).toBeNull();
      expect(mapVoucherInfo({ ResultGet: undefined })).toBeNull();
    });

    it("should map ResultGet fields to domain VoucherInfo", () => {
      const result = mapVoucherInfo({
        ResultGet: {
          CodAutorizacion: "12345678901234",
          EmisionTipo: "CAE",
          FchVto: "20241231",
          FchProceso: "20231001100000",
          Resultado: "A",
          Observaciones: { Obs: [{ Msg: "Obs message" }] },
          Concepto: 1,
          DocTipo: 80,
          DocNro: 20111111112,
          CbteDesde: 1,
          CbteHasta: 1,
          CbteFch: "20231001",
          ImpTotal: 121,
          ImpTotConc: 0,
          ImpNeto: 100,
          ImpOpEx: 0,
          ImpIVA: 21,
          ImpTrib: 0,
          MonId: "PES",
          MonCotiz: 1,
        },
      });

      expect(result).toMatchObject({
        codAutorizacion: "12345678901234",
        emisionTipo: "CAE",
        resultado: "A",
        observaciones: "Obs message",
        docTipo: 80,
        docNro: 20111111112,
        impTotal: 121,
      });
    });

    it("should return undefined observaciones when Obs is absent", () => {
      const result = mapVoucherInfo({
        ResultGet: { Resultado: "A" },
      });

      expect(result).not.toBeNull();
      expect(result!.observaciones).toBeUndefined();
    });
  });

  describe("mapParameterTypes", () => {
    it("should map result array with given key to ParameterType array", () => {
      const result = mapParameterTypes(
        {
          ResultGet: {
            CbteTipo: [
              {
                Id: 1,
                Desc: "Factura A",
                FchDesde: "20030401",
                FchHasta: "99991231",
              },
            ],
          },
        },
        "CbteTipo",
      );

      expect(result).toEqual([
        {
          id: 1,
          desc: "Factura A",
          fchDesde: "20030401",
          fchHasta: "99991231",
        },
      ]);
    });

    it("should return empty array when ResultGet is absent", () => {
      expect(mapParameterTypes({}, "CbteTipo")).toEqual([]);
    });

    it("should return empty array when key array is absent", () => {
      expect(mapParameterTypes({ ResultGet: {} }, "CbteTipo")).toEqual([]);
    });
  });

  describe("mapAliquotTypes", () => {
    it("should parse Id from string to integer", () => {
      const result = mapAliquotTypes({
        ResultGet: {
          IvaTipo: [
            {
              Id: "5",
              Desc: "21%",
              FchDesde: "20030401",
              FchHasta: "99991231",
            },
          ],
        },
      });

      expect(result).toEqual([
        { id: 5, desc: "21%", fchDesde: "20030401", fchHasta: "99991231" },
      ]);
    });

    it("should return empty array when IvaTipo is absent", () => {
      expect(mapAliquotTypes({ ResultGet: {} })).toEqual([]);
      expect(mapAliquotTypes({})).toEqual([]);
    });
  });

  describe("mapIvaReceptorTypes", () => {
    it("should map CondicionIvaReceptor array to domain IvaReceptorType array", () => {
      const result = mapIvaReceptorTypes({
        ResultGet: {
          CondicionIvaReceptor: [
            { Id: 1, Desc: "IVA Responsable Inscripto", Cmp_Clase: "A" },
          ],
        },
      });

      expect(result).toEqual([
        { id: 1, desc: "IVA Responsable Inscripto", cmp_Clase: "A" },
      ]);
    });

    it("should return empty array when CondicionIvaReceptor is absent", () => {
      expect(mapIvaReceptorTypes({ ResultGet: {} })).toEqual([]);
      expect(mapIvaReceptorTypes({})).toEqual([]);
    });
  });

  describe("mapCaea", () => {
    it("should map CAEA result fields to domain CaeaResponse", () => {
      const result = mapCaea({
        CAEA: "12345678901234",
        Periodo: 202310,
        Orden: 1,
        FchVigDesde: "20231001",
        FchVigHasta: "20231015",
        FchTopeInf: "20231020",
        FchProceso: "20231001100000",
        Observaciones: { Obs: [{ Msg: "Obs message" }] },
      });

      expect(result).toEqual({
        caea: "12345678901234",
        periodo: 202310,
        orden: 1,
        fchVigDesde: "20231001",
        fchVigHasta: "20231015",
        fchTopeInf: "20231020",
        fchProceso: "20231001100000",
        observaciones: "Obs message",
      });
    });

    it("should return undefined observaciones when Obs is absent", () => {
      const result = mapCaea({
        CAEA: "12345678901234",
        Periodo: 202310,
        Orden: 1,
        FchVigDesde: "20231001",
        FchVigHasta: "20231015",
        FchTopeInf: "20231020",
        FchProceso: "20231001100000",
      });

      expect(result.observaciones).toBeUndefined();
    });
  });

  describe("mapCaeaUsage", () => {
    it("should map CAEA usage fields to domain CaeaUsageResponse", () => {
      const result = mapCaeaUsage({
        CAEA: "12345678901234",
        Concepto: 1,
        DocTipo: 80,
        DocNro: 20111111112,
        CbteDesde: 1,
        CbteHasta: 1,
        CbteFch: "20231001",
        Resultado: "A",
        Observaciones: { Obs: [{ Msg: "Obs message" }] },
      });

      expect(result).toEqual({
        caea: "12345678901234",
        concepto: 1,
        docTipo: 80,
        docNro: 20111111112,
        cbteDesde: 1,
        cbteHasta: 1,
        cbteFch: "20231001",
        resultado: "A",
        observaciones: "Obs message",
      });
    });
  });

  describe("mapCaeaNoMovement", () => {
    it("should map FECAEASinMov array to domain CaeaNoMovement array", () => {
      const result = mapCaeaNoMovement({
        ResultGet: {
          FECAEASinMov: [
            { CAEA: "12345678901234", FchProceso: "20231001100000", PtoVta: 1 },
          ],
        },
      });

      expect(result).toEqual([
        { caea: "12345678901234", fchProceso: "20231001100000", ptoVta: 1 },
      ]);
    });

    it("should return empty array when ResultGet is absent", () => {
      expect(mapCaeaNoMovement({})).toEqual([]);
    });
  });

  describe("mapCountries", () => {
    it("should map PaisTipo array to domain PaisType array", () => {
      const result = mapCountries({
        ResultGet: { PaisTipo: [{ Id: 200, Desc: "Argentina" }] },
      });

      expect(result).toEqual([{ id: 200, desc: "Argentina" }]);
    });

    it("should return empty array when PaisTipo is absent", () => {
      expect(mapCountries({ ResultGet: {} })).toEqual([]);
      expect(mapCountries({})).toEqual([]);
    });
  });

  describe("mapActivities", () => {
    it("should map ActividadesTipo array to domain ActividadType array", () => {
      const result = mapActivities({
        ResultGet: {
          ActividadesTipo: [{ Id: 1, Orden: 1, Desc: "Actividad 1" }],
        },
      });

      expect(result).toEqual([{ id: 1, orden: 1, desc: "Actividad 1" }]);
    });

    it("should return empty array when ActividadesTipo is absent", () => {
      expect(mapActivities({ ResultGet: {} })).toEqual([]);
      expect(mapActivities({})).toEqual([]);
    });
  });

  describe("mapQuotation", () => {
    it("should map ResultGet to domain CotizacionType", () => {
      const result = mapQuotation({
        ResultGet: { MonId: "DOL", MonCotiz: 350, FchCotiz: "20231001" },
      });

      expect(result).toEqual({
        monId: "DOL",
        monCotiz: 350,
        fchCotiz: "20231001",
      });
    });

    it("should return undefined when ResultGet is absent", () => {
      expect(mapQuotation({})).toBeUndefined();
    });
  });

  describe("mapMaxRecords", () => {
    it("should return the RegXReq value as-is", () => {
      expect(mapMaxRecords({ RegXReq: 1000 })).toBe(1000);
    });
  });
});
