import { IRegisterScopeFourRepositoryPort } from "@application/ports/register/register-repository.ports";
import { BaseRegisterRepository } from "./base-register-repository";
import { ArcaServiceNames } from "@application/types/service-name.types";
import { WsdlPaths } from "@infrastructure/soap/config/wsdl-path.types";
import { Endpoints } from "@infrastructure/soap/config/endpoints.types";
import { IPersonaServiceA4PortSoap } from "@infrastructure/soap/contracts/PersonaServiceA4/PersonaServiceA4Port";

export class RegisterScopeFourRepository
  extends BaseRegisterRepository<IPersonaServiceA4PortSoap>
  implements IRegisterScopeFourRepositoryPort
{
  protected serviceName = ArcaServiceNames.WSSR_PADRON_FOUR;
  protected wsdlProduction = WsdlPaths.WSSR_PADRON_FOUR;
  protected wsdlTesting = WsdlPaths.WSSR_PADRON_FOUR_TEST;
  protected endpointProduction = Endpoints.WSSR_PADRON_FOUR;
  protected endpointTesting = Endpoints.WSSR_PADRON_FOUR_TEST;
  protected personaMethod = "getPersonaAsync" as const;
}
