import { resolveLegends, withLegends } from "@src/utils/legends.utils";
import {
  LEYENDA_LEY_27618,
  LEYENDA_OPERACION_SUJETA_A_RETENCION,
  LEYENDA_PAGO_EN_CBU_INFORMADA,
  TITULO_TRANSPARENCIA_FISCAL,
} from "@src/constants/legends.constants";
import { InvoiceData, ResolvedPdfOptions } from "@src/types/invoice-data.types";

const baseData: InvoiceData = {
  emisor: {
    razonSocial: "Test SA",
    domicilioComercial: "Calle Falsa 123",
    condicionIva: "Responsable Inscripto",
    cuit: "20304050607",
    iibb: "12-3456-7",
    fechaInicioActividades: "20200101",
  },
  receptor: {
    razonSocial: "Cliente SRL",
    condicionIva: "Responsable Inscripto",
    documentoTipo: "CUIT",
    documentoNro: "30712345678",
  },
  cbteTipo: 1,
  cbteLetra: "A",
  puntoVenta: 1,
  cbteDesde: 100,
  cbteHasta: 100,
  cbteFecha: "20260515",
  concepto: 1,
  items: [],
  importeNetoGravado: 1000,
  importeIva: 210,
  importeTotal: 1210,
  cae: "12345678901234",
  caeFechaVencimiento: "20260525",
};

const options: ResolvedPdfOptions = {
  pageSize: "A4",
  margin: 10,
  includeQr: true,
};

function withReceptor(condicionIvaId: number, data = baseData): InvoiceData {
  return { ...data, receptor: { ...data.receptor, condicionIvaId } };
}

describe("legends.utils", () => {
  describe("resolveLegends", () => {
    it("should not add legends without the new fields", () => {
      expect(resolveLegends(baseData)).toEqual({
        letra: "A",
        cabecera: undefined,
        transparenciaFiscal: undefined,
        pie: [],
      });
    });

    it("should keep the given letter for regular types", () => {
      const data = { ...baseData, cbteTipo: 6, cbteLetra: "B" };
      expect(resolveLegends(data).letra).toBe("B");
    });

    it.each([51, 52, 53, 54])(
      "should resolve type %i as clase A sujeta a retención",
      (cbteTipo) => {
        const legends = resolveLegends({
          ...baseData,
          cbteTipo,
          cbteLetra: "M",
        });
        expect(legends.letra).toBe("A");
        expect(legends.cabecera).toBe(LEYENDA_OPERACION_SUJETA_A_RETENCION);
      },
    );

    it("should prefer OPERACIÓN SUJETA A RETENCIÓN over PAGO EN CBU INFORMADA", () => {
      const legends = resolveLegends({
        ...baseData,
        cbteTipo: 51,
        pagoEnCbuInformada: true,
      });
      expect(legends.cabecera).toBe(LEYENDA_OPERACION_SUJETA_A_RETENCION);
    });

    it("should add PAGO EN CBU INFORMADA only on clase A", () => {
      expect(
        resolveLegends({ ...baseData, pagoEnCbuInformada: true }).cabecera,
      ).toBe(LEYENDA_PAGO_EN_CBU_INFORMADA);
      expect(
        resolveLegends({
          ...baseData,
          cbteTipo: 6,
          cbteLetra: "B",
          pagoEnCbuInformada: true,
        }).cabecera,
      ).toBeUndefined();
    });

    it("should resolve the transparency regime for consumidor final", () => {
      const legends = resolveLegends(
        withReceptor(5, {
          ...baseData,
          cbteTipo: 6,
          cbteLetra: "B",
          tributos: [
            {
              id: 1,
              descripcion: "Impuestos nacionales",
              baseImponible: 1000,
              alicuota: 1,
              importe: 10,
            },
            {
              id: 4,
              descripcion: "Impuestos Internos",
              baseImponible: 1000,
              alicuota: 2.5,
              importe: 25,
            },
            {
              id: 99,
              descripcion: "Otro",
              baseImponible: 1000,
              alicuota: 1,
              importe: 10,
            },
          ],
        }),
      );
      expect(legends.transparenciaFiscal).toEqual({
        titulo: TITULO_TRANSPARENCIA_FISCAL,
        ivaContenido: 210,
        otrosImpuestosNacionalesIndirectos: 35,
      });
    });

    it("should only count national indirect taxes", () => {
      const legends = resolveLegends(
        withReceptor(5, {
          ...baseData,
          importeIva: 0,
          tributos: [
            {
              id: 2,
              descripcion: "Impuestos provinciales",
              baseImponible: 1000,
              alicuota: 3,
              importe: 30,
            },
          ],
        }),
      );
      expect(legends.transparenciaFiscal).toBeUndefined();
    });

    it.each([1, 4, 6])(
      "should not resolve the transparency regime for condicionIvaId %i",
      (id) => {
        expect(
          resolveLegends(withReceptor(id)).transparenciaFiscal,
        ).toBeUndefined();
      },
    );

    it("should let explicit amounts override the computed ones", () => {
      const legends = resolveLegends(
        withReceptor(5, {
          ...baseData,
          transparenciaFiscal: { otrosImpuestosNacionalesIndirectos: 12 },
        }),
      );
      expect(legends.transparenciaFiscal).toMatchObject({
        ivaContenido: 210,
        otrosImpuestosNacionalesIndirectos: 12,
      });
    });

    it("should resolve explicit transparency amounts for any receptor", () => {
      const legends = resolveLegends(
        withReceptor(4, {
          ...baseData,
          importeIva: 0,
          transparenciaFiscal: { ivaContenido: 0 },
        }),
      );
      expect(legends.transparenciaFiscal).toMatchObject({
        ivaContenido: 0,
        otrosImpuestosNacionalesIndirectos: 0,
      });
    });

    it.each([6, 13, 16])(
      "should add the Ley 27.618 legend to clase A for condicionIvaId %i",
      (id) => {
        expect(resolveLegends(withReceptor(id)).pie).toEqual([
          LEYENDA_LEY_27618,
        ]);
      },
    );

    it("should add the Ley 27.618 legend to types 51 to 54", () => {
      const legends = resolveLegends(
        withReceptor(6, { ...baseData, cbteTipo: 53, cbteLetra: "M" }),
      );
      expect(legends.pie).toEqual([LEYENDA_LEY_27618]);
    });

    it("should not add the Ley 27.618 legend outside clase A", () => {
      const legends = resolveLegends(
        withReceptor(6, { ...baseData, cbteTipo: 6, cbteLetra: "B" }),
      );
      expect(legends.pie).toEqual([]);
    });

    it("should append free legends after the Ley 27.618 legend", () => {
      const legends = resolveLegends(
        withReceptor(6, { ...baseData, leyendas: ["Uno", "", "Dos"] }),
      );
      expect(legends.pie).toEqual([LEYENDA_LEY_27618, "Uno", "Dos"]);
    });
  });

  describe("withLegends", () => {
    it("should keep the same data object when the letter does not change", () => {
      const props = withLegends({ data: baseData, options });
      expect(props.data).toBe(baseData);
      expect(props.legends?.letra).toBe("A");
    });

    it("should replace the letter for types 51 to 54", () => {
      const data = { ...baseData, cbteTipo: 51, cbteLetra: "M" };
      const props = withLegends({ data, options });
      expect(props.data.cbteLetra).toBe("A");
      expect(data.cbteLetra).toBe("M");
    });

    it("should keep legends already provided", () => {
      const legends = { letra: "A", pie: ["Custom"] };
      const props = withLegends({ data: baseData, options, legends });
      expect(props.legends).toBe(legends);
    });
  });
});
