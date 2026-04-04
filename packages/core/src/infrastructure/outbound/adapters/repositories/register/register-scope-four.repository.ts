/**
 * Register Scope Four Repository
 * Implements IRegisterScopeFourRepositoryPort
 */
import { IRegisterScopeFourRepositoryPort } from "@application/ports/register/register-repository.ports";
import { BaseRegisterRepository } from "./base-register-repository";
import { ServiceNamesEnum } from "@infrastructure/outbound/ports/soap/enums/service-names.enum";
import { WsdlPathEnum } from "@infrastructure/outbound/ports/soap/enums/wsdl-path.enum";
import { EndpointsEnum } from "@infrastructure/outbound/ports/soap/enums/endpoints.enum";
import { IPersonaServiceA4PortSoap } from "@infrastructure/outbound/ports/soap/interfaces/PersonaServiceA4/PersonaServiceA4Port";

export class RegisterScopeFourRepository
  extends BaseRegisterRepository<IPersonaServiceA4PortSoap>
  implements IRegisterScopeFourRepositoryPort
{
  protected serviceName = ServiceNamesEnum.WSSR_PADRON_FOUR;
  protected wsdlProduction = WsdlPathEnum.WSSR_PADRON_FOUR;
  protected wsdlTesting = WsdlPathEnum.WSSR_PADRON_FOUR_TEST;
  protected endpointProduction = EndpointsEnum.WSSR_PADRON_FOUR;
  protected endpointTesting = EndpointsEnum.WSSR_PADRON_FOUR_TEST;
  protected personaMethod = "getPersonaAsync" as const;
}
