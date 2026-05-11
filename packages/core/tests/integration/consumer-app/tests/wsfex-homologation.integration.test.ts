import { describe, expect, it, beforeAll } from "@jest/globals";
import type { Arca } from "@arcasdk/core";
import { createArcaForWsfexHomologation } from "./utils/homologation-arca-register";
import { expectNonEmptyString } from "./utils/wsfe-expect";

const enableIntegration = process.env.ENABLE_INTEGRATION_TESTS === "true";
const describeOrSkip = enableIntegration ? describe : describe.skip;

describeOrSkip(
  "WSFEX homologación — facturación electrónica de exportación (consumidor npm)",
  () => {
    let arca: Arca;

    beforeAll(() => {
      arca = createArcaForWsfexHomologation();
    });

    describe("FEXDummy / estado de servidores", () => {
      it("dummy responde con texto no vacío en cada servidor", async () => {
        const result = await arca.wsfexService.dummy();
        expect(result).toBeDefined();
        expect(result.FEXDummyResult).toBeDefined();
        expectNonEmptyString("AppServer", result.FEXDummyResult.AppServer);
        expectNonEmptyString("DbServer", result.FEXDummyResult.DbServer);
        expectNonEmptyString("AuthServer", result.FEXDummyResult.AuthServer);
      });
    });

    describe("FEXGetPARAM_Cbte_Tipo", () => {
      it("getParamCbteTipo devuelve resultado definido", async () => {
        const result = await arca.wsfexService.getParamCbteTipo({});
        expect(result).toBeDefined();
        expect(result.FEXGetPARAM_Cbte_TipoResult).toBeDefined();
      });
    });

    describe("FEXGetPARAM_Tipo_Expo", () => {
      it("getParamTipoExpo devuelve resultado definido", async () => {
        const result = await arca.wsfexService.getParamTipoExpo({});
        expect(result).toBeDefined();
        expect(result.FEXGetPARAM_Tipo_ExpoResult).toBeDefined();
      });
    });

    describe("FEXGetPARAM_Incoterms", () => {
      it("getParamIncoterms devuelve resultado definido", async () => {
        const result = await arca.wsfexService.getParamIncoterms({});
        expect(result).toBeDefined();
        expect(result.FEXGetPARAM_IncotermsResult).toBeDefined();
      });
    });

    describe("FEXGetPARAM_Idiomas", () => {
      it("getParamIdiomas devuelve resultado definido", async () => {
        const result = await arca.wsfexService.getParamIdiomas({});
        expect(result).toBeDefined();
        expect(result.FEXGetPARAM_IdiomasResult).toBeDefined();
      });
    });

    describe("FEXGetPARAM_UMed", () => {
      it("getParamUMed devuelve resultado definido", async () => {
        const result = await arca.wsfexService.getParamUMed({});
        expect(result).toBeDefined();
        expect(result.FEXGetPARAM_UMedResult).toBeDefined();
      });
    });

    describe("FEXGetPARAM_DST_pais", () => {
      it("getParamDstPais devuelve resultado definido", async () => {
        const result = await arca.wsfexService.getParamDstPais({});
        expect(result).toBeDefined();
        expect(result.FEXGetPARAM_DST_paisResult).toBeDefined();
      });
    });

    describe("FEXGetPARAM_DST_CUIT", () => {
      it("getParamDstCuit devuelve resultado definido", async () => {
        const result = await arca.wsfexService.getParamDstCuit({});
        expect(result).toBeDefined();
        expect(result.FEXGetPARAM_DST_CUITResult).toBeDefined();
      });
    });

    describe("FEXGetPARAM_MON", () => {
      it("getParamMon devuelve resultado definido", async () => {
        const result = await arca.wsfexService.getParamMon({});
        expect(result).toBeDefined();
        expect(result.FEXGetPARAM_MONResult).toBeDefined();
      });
    });

    describe("FEXGetPARAM_MON_CON_COTIZACION", () => {
      it("getParamMonConCotizacion devuelve resultado definido", async () => {
        const result = await arca.wsfexService.getParamMonConCotizacion({
          Fecha_CTZ: "",
        });
        expect(result).toBeDefined();
        expect(result.FEXGetPARAM_MON_CON_COTIZACIONResult).toBeDefined();
      });
    });

    describe("FEXGetPARAM_Ctz", () => {
      it("getParamCtz devuelve cotización para USD", async () => {
        const result = await arca.wsfexService.getParamCtz({
          Mon_id: "DOL",
          FchCotiz: "",
        });
        expect(result).toBeDefined();
        expect(result.FEXGetPARAM_CtzResult).toBeDefined();
      });
    });

    describe("FEXGetPARAM_PtoVenta", () => {
      it("getParamPtoVenta devuelve resultado definido", async () => {
        const result = await arca.wsfexService.getParamPtoVenta({});
        expect(result).toBeDefined();
        expect(result.FEXGetPARAM_PtoVentaResult).toBeDefined();
      });
    });

    describe("FEXGetPARAM_Opcionales", () => {
      it("getParamOpcionales devuelve resultado definido", async () => {
        const result = await arca.wsfexService.getParamOpcionales({});
        expect(result).toBeDefined();
        expect(result.FEXGetPARAM_OpcionalesResult).toBeDefined();
      });
    });

    describe("FEXGetPARAM_Actividades", () => {
      it("getParamActividades devuelve resultado definido", async () => {
        const result = await arca.wsfexService.getParamActividades({});
        expect(result).toBeDefined();
        expect(result.FEXGetPARAM_ActividadesResult).toBeDefined();
      });
    });

    describe("FEXGetLast_CMP", () => {
      it("getLastCmp devuelve resultado definido", async () => {
        const result = await arca.wsfexService.getLastCmp({});
        expect(result).toBeDefined();
        expect(result.FEXGetLast_CMPResult).toBeDefined();
      });
    });

    describe("FEXGetLast_ID", () => {
      it("getLastId devuelve resultado definido", async () => {
        const result = await arca.wsfexService.getLastId({});
        expect(result).toBeDefined();
        expect(result.FEXGetLast_IDResult).toBeDefined();
      });
    });
  },
);

if (!enableIntegration) {
  console.info("Omitiendo tests WSFEX: ENABLE_INTEGRATION_TESTS=true");
}
