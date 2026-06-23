import { ArcaServiceNames } from "@application/types/service-name.types";
import {
  getArcaServiceConfig,
  ArcaServiceConfigs,
} from "@infrastructure/soap/config/arca-service-config";
import { WsdlPaths } from "@infrastructure/soap/config/wsdl-path.types";
import { Endpoints } from "@infrastructure/soap/config/endpoints.types";
import {
  fexExcludeMethods,
  mapFecredAuth,
  mapPadronAuth,
  padronExcludeMethods,
} from "@infrastructure/soap/config/auth-mappers";

describe("arca-service-config", () => {
  it("returns undefined for services without bundled WSDL", () => {
    expect(getArcaServiceConfig(ArcaServiceNames.FE_DUMMY)).toBeUndefined();
  });

  it("configures WSFE for homologation WSDL and endpoint", () => {
    const config = getArcaServiceConfig(ArcaServiceNames.WSFE);
    expect(config).toEqual({
      wsdlProduction: WsdlPaths.WSFE,
      wsdlTesting: WsdlPaths.WSFE_TEST,
      endpointProduction: Endpoints.WSFEV1,
      endpointTesting: Endpoints.WSFEV1_TEST,
    });
  });

  it("configures WSFEX with FEXDummy excluded from auth", () => {
    const config = getArcaServiceConfig(ArcaServiceNames.WSFEX);
    expect(config?.wsdlTesting).toBe(WsdlPaths.WSFEX_TEST);
    expect(config?.endpointTesting).toBe(Endpoints.WSFEX_TEST);
    expect(config?.excludeMethods).toBe(fexExcludeMethods);
  });

  it("configures WSFECRED with SOAP 1.1 and fecred auth mapper", () => {
    const config = getArcaServiceConfig(ArcaServiceNames.WSFECRED);
    expect(config?.wsdlTesting).toBe(WsdlPaths.WSFECRED_TEST);
    expect(config?.endpointTesting).toBe(Endpoints.WSFECRED_TEST);
    expect(config?.forceSoap12Headers).toBe(false);
    expect(config?.authMapper).toBe(mapFecredAuth);
  });

  it("configures padron services with shared auth and dummy exclusion", () => {
    const config = getArcaServiceConfig(ArcaServiceNames.WSSR_PADRON_FOUR);
    expect(config?.wsdlTesting).toBe(WsdlPaths.WSSR_PADRON_FOUR_TEST);
    expect(config?.endpointTesting).toBe(Endpoints.WSSR_PADRON_FOUR_TEST);
    expect(config?.forceSoap12Headers).toBe(false);
    expect(config?.authMapper).toBe(mapPadronAuth);
    expect(config?.excludeMethods).toBe(padronExcludeMethods);
  });

  it("includes all bundled services except FE_DUMMY", () => {
    const keys = Object.keys(ArcaServiceConfigs);
    expect(keys).toContain(ArcaServiceNames.WSFE);
    expect(keys).toContain(ArcaServiceNames.WSFEX);
    expect(keys).toContain(ArcaServiceNames.WSFECRED);
    expect(keys).toContain(ArcaServiceNames.WSSR_PADRON_FOUR);
    expect(keys).not.toContain(ArcaServiceNames.FE_DUMMY);
  });
});
