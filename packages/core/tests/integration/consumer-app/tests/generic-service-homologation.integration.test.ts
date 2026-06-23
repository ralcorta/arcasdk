import { describe, expect, it, beforeAll } from "@jest/globals";
import { ArcaServiceNames, type Arca } from "@arcasdk/core";
import { createArcaForGenericHomologation } from "./utils/homologation-arca-register";
import { expectNonEmptyString } from "./utils/wsfe-expect";

const enableIntegration = process.env.ENABLE_INTEGRATION_TESTS === "true";
const describeOrSkip = enableIntegration ? describe : describe.skip;

type PadronDummyResponse = {
  return?: {
    appserver?: string;
    dbserver?: string;
    authserver?: string;
  };
};

type WsfeDummyResponse = {
  FEDummyResult?: {
    AppServer?: string;
    DbServer?: string;
    AuthServer?: string;
  };
};

type WsfexDummyResponse = {
  FEXDummyResult?: {
    AppServer?: string;
    DbServer?: string;
    AuthServer?: string;
  };
};

describeOrSkip(
  "GenericService homologación — WSDL embebido vía genericService.call (consumidor npm)",
  () => {
    let arca: Arca;

    beforeAll(() => {
      arca = createArcaForGenericHomologation();
    });

    it("ws_sr_padron_a4 dummy resuelve WSDL embebido y responde estado de servidores", async () => {
      const result = (await arca.genericService.call(
        ArcaServiceNames.WSSR_PADRON_FOUR,
        "dummy",
        {},
      )) as PadronDummyResponse;

      expect(result).toBeDefined();
      expect(result.return).toBeDefined();
      expectNonEmptyString("appserver", result.return!.appserver ?? "");
      expectNonEmptyString("dbserver", result.return!.dbserver ?? "");
      expectNonEmptyString("authserver", result.return!.authserver ?? "");
    });

    it("ws_sr_padron_a5 dummy resuelve WSDL embebido y responde estado de servidores", async () => {
      const result = (await arca.genericService.call(
        ArcaServiceNames.WSSR_PADRON_FIVE,
        "dummy",
        {},
      )) as PadronDummyResponse;

      expect(result).toBeDefined();
      expect(result.return).toBeDefined();
      expectNonEmptyString("appserver", result.return!.appserver ?? "");
      expectNonEmptyString("dbserver", result.return!.dbserver ?? "");
      expectNonEmptyString("authserver", result.return!.authserver ?? "");
    });

    it("wsfe FEDummy resuelve WSDL embebido y responde estado de servidores", async () => {
      const result = (await arca.genericService.call(
        ArcaServiceNames.WSFE,
        "FEDummy",
        {},
      )) as WsfeDummyResponse;

      expect(result).toBeDefined();
      expect(result.FEDummyResult).toBeDefined();
      expectNonEmptyString("AppServer", result.FEDummyResult!.AppServer ?? "");
      expectNonEmptyString("DbServer", result.FEDummyResult!.DbServer ?? "");
      expectNonEmptyString("AuthServer", result.FEDummyResult!.AuthServer ?? "");
    });

    it("wsfex FEXDummy resuelve WSDL embebido y responde estado de servidores", async () => {
      const result = (await arca.genericService.call(
        ArcaServiceNames.WSFEX,
        "FEXDummy",
        {},
      )) as WsfexDummyResponse;

      expect(result).toBeDefined();
      expect(result.FEXDummyResult).toBeDefined();
      expectNonEmptyString("AppServer", result.FEXDummyResult!.AppServer ?? "");
      expectNonEmptyString("DbServer", result.FEXDummyResult!.DbServer ?? "");
      expectNonEmptyString("AuthServer", result.FEXDummyResult!.AuthServer ?? "");
    });

    it("wsfecred consultarTiposRetenciones resuelve WSDL embebido", async () => {
      const result = await arca.genericService.call(
        ArcaServiceNames.WSFECRED,
        "consultarTiposRetenciones",
        {},
      );

      expect(result).toBeDefined();
      expect(
        (result as { consultarTiposRetencionesReturn?: unknown })
          .consultarTiposRetencionesReturn,
      ).toBeDefined();
    });

    it("padron a4 vía genérico coincide con registerScopeFourService.getServerStatus", async () => {
      const genericResult = (await arca.genericService.call(
        ArcaServiceNames.WSSR_PADRON_FOUR,
        "dummy",
        {},
      )) as PadronDummyResponse;

      const dedicatedStatus =
        await arca.registerScopeFourService.getServerStatus();

      expect(genericResult.return).toBeDefined();
      expect(dedicatedStatus.appServer).toBe(genericResult.return!.appserver);
      expect(dedicatedStatus.dbServer).toBe(genericResult.return!.dbserver);
      expect(dedicatedStatus.authServer).toBe(genericResult.return!.authserver);
    });

    it("wsfex FEXDummy vía genérico coincide con wsfexService.dummy", async () => {
      const genericResult = (await arca.genericService.call(
        ArcaServiceNames.WSFEX,
        "FEXDummy",
        {},
      )) as WsfexDummyResponse;

      const dedicatedResult = await arca.wsfexService.dummy();

      expect(genericResult.FEXDummyResult).toEqual(dedicatedResult.FEXDummyResult);
    });
  },
);
