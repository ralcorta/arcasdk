import { IRegisterScopeTenRepositoryPort } from "@application/ports/register/register-repository.ports";
import { BaseRegisterRepository } from "./base-register-repository";
import { ArcaServiceNames } from "@application/types/service-name.types";
import { WsdlPaths } from "@infrastructure/soap/config/wsdl-path.types";
import { Endpoints } from "@infrastructure/soap/config/endpoints.types";
import { IPersonaServiceA10PortSoap } from "@infrastructure/soap/contracts/PersonaServiceA10/PersonaServiceA10Port";

export class RegisterScopeTenRepository
  extends BaseRegisterRepository<IPersonaServiceA10PortSoap>
  implements IRegisterScopeTenRepositoryPort
{
  protected serviceName = ArcaServiceNames.WSSR_PADRON_TEN;
  protected wsdlProduction = WsdlPaths.WSSR_PADRON_TEN;
  protected wsdlTesting = WsdlPaths.WSSR_PADRON_TEN_TEST;
  protected endpointProduction = Endpoints.WSSR_PADRON_TEN;
  protected endpointTesting = Endpoints.WSSR_PADRON_TEN_TEST;
  protected personaMethod = "getPersonaAsync" as const;
}
