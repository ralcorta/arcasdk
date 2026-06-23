import { ArcaServiceName, ArcaServiceNames } from "@application/types/service-name.types";
import { WSAuthParam } from "@application/types/auth.types";
import { WsdlPath, WsdlPaths } from "./wsdl-path.types";
import { Endpoint, Endpoints } from "./endpoints.types";
import {
  fexExcludeMethods,
  mapFecredAuth,
  mapPadronAuth,
  padronExcludeMethods,
} from "./auth-mappers";

export interface ArcaServiceConfig {
  wsdlProduction: WsdlPath;
  wsdlTesting: WsdlPath;
  endpointProduction: Endpoint;
  endpointTesting: Endpoint;
  forceSoap12Headers?: boolean;
  authMapper?: (auth: WSAuthParam) => Record<string, unknown>;
  excludeMethods?: string[];
}

const padronServiceConfig = {
  forceSoap12Headers: false as const,
  authMapper: mapPadronAuth,
  excludeMethods: padronExcludeMethods,
};

export const ArcaServiceConfigs: Partial<
  Record<ArcaServiceName, ArcaServiceConfig>
> = {
  [ArcaServiceNames.WSFE]: {
    wsdlProduction: WsdlPaths.WSFE,
    wsdlTesting: WsdlPaths.WSFE_TEST,
    endpointProduction: Endpoints.WSFEV1,
    endpointTesting: Endpoints.WSFEV1_TEST,
  },
  [ArcaServiceNames.WSFEX]: {
    wsdlProduction: WsdlPaths.WSFEX,
    wsdlTesting: WsdlPaths.WSFEX_TEST,
    endpointProduction: Endpoints.WSFEX,
    endpointTesting: Endpoints.WSFEX_TEST,
    excludeMethods: fexExcludeMethods,
  },
  [ArcaServiceNames.WSFECRED]: {
    wsdlProduction: WsdlPaths.WSFECRED,
    wsdlTesting: WsdlPaths.WSFECRED_TEST,
    endpointProduction: Endpoints.WSFECRED,
    endpointTesting: Endpoints.WSFECRED_TEST,
    forceSoap12Headers: false,
    authMapper: mapFecredAuth,
  },
  [ArcaServiceNames.WSSR_INSCRIPTION_PROOF]: {
    wsdlProduction: WsdlPaths.WSSR_INSCRIPTION_PROOF,
    wsdlTesting: WsdlPaths.WSSR_INSCRIPTION_PROOF_TEST,
    endpointProduction: Endpoints.WSSR_INSCRIPTION_PROOF,
    endpointTesting: Endpoints.WSSR_INSCRIPTION_PROOF_TEST,
    ...padronServiceConfig,
  },
  [ArcaServiceNames.WSSR_PADRON_FOUR]: {
    wsdlProduction: WsdlPaths.WSSR_PADRON_FOUR,
    wsdlTesting: WsdlPaths.WSSR_PADRON_FOUR_TEST,
    endpointProduction: Endpoints.WSSR_PADRON_FOUR,
    endpointTesting: Endpoints.WSSR_PADRON_FOUR_TEST,
    ...padronServiceConfig,
  },
  [ArcaServiceNames.WSSR_PADRON_FIVE]: {
    wsdlProduction: WsdlPaths.WSSR_PADRON_FIVE,
    wsdlTesting: WsdlPaths.WSSR_PADRON_FIVE_TEST,
    endpointProduction: Endpoints.WSSR_PADRON_FIVE,
    endpointTesting: Endpoints.WSSR_PADRON_FIVE_TEST,
    ...padronServiceConfig,
  },
  [ArcaServiceNames.WSSR_PADRON_TEN]: {
    wsdlProduction: WsdlPaths.WSSR_PADRON_TEN,
    wsdlTesting: WsdlPaths.WSSR_PADRON_TEN_TEST,
    endpointProduction: Endpoints.WSSR_PADRON_TEN,
    endpointTesting: Endpoints.WSSR_PADRON_TEN_TEST,
    ...padronServiceConfig,
  },
  [ArcaServiceNames.WSSR_PADRON_THIRTEEN]: {
    wsdlProduction: WsdlPaths.WSSR_PADRON_THIRTEEN,
    wsdlTesting: WsdlPaths.WSSR_PADRON_THIRTEEN_TEST,
    endpointProduction: Endpoints.WSSR_PADRON_THIRTEEN,
    endpointTesting: Endpoints.WSSR_PADRON_THIRTEEN_TEST,
    ...padronServiceConfig,
  },
};

export function getArcaServiceConfig(
  serviceName: ArcaServiceName,
): ArcaServiceConfig | undefined {
  return ArcaServiceConfigs[serviceName];
}
