import { IRegisterScopeTenRepositoryPort } from "@application/ports/register/register-repository.ports";
import { BaseRegisterRepository } from "./base-register-repository";
import { ServiceNamesEnum } from "@infrastructure/constants/service-names.enum";
import { WsdlPathEnum } from "@infrastructure/outbound/ports/soap/enums/wsdl-path.enum";
import { EndpointsEnum } from "@infrastructure/outbound/ports/soap/enums/endpoints.enum";
import { IPersonaServiceA10PortSoap } from "@infrastructure/outbound/ports/soap/interfaces/PersonaServiceA10/PersonaServiceA10Port";

export class RegisterScopeTenRepository
  extends BaseRegisterRepository<IPersonaServiceA10PortSoap>
  implements IRegisterScopeTenRepositoryPort
{
  protected serviceName = ServiceNamesEnum.WSSR_PADRON_TEN;
  protected wsdlProduction = WsdlPathEnum.WSSR_PADRON_TEN;
  protected wsdlTesting = WsdlPathEnum.WSSR_PADRON_TEN_TEST;
  protected endpointProduction = EndpointsEnum.WSSR_PADRON_TEN;
  protected endpointTesting = EndpointsEnum.WSSR_PADRON_TEN_TEST;
  protected personaMethod = "getPersonaAsync" as const;
}
