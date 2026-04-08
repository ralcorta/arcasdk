import { IRegisterScopeFiveRepositoryPort } from "@application/ports/register/register-repository.ports";
import { BaseBatchRegisterRepository } from "./base-batch-register-repository";
import { ServiceNamesEnum } from "@infrastructure/constants/service-names.enum";
import { WsdlPathEnum } from "@infrastructure/outbound/ports/soap/enums/wsdl-path.enum";
import { EndpointsEnum } from "@infrastructure/outbound/ports/soap/enums/endpoints.enum";
import { IPersonaServiceA5PortSoap } from "@infrastructure/outbound/ports/soap/interfaces/PersonaServiceA5/PersonaServiceA5Port";

export class RegisterScopeFiveRepository
  extends BaseBatchRegisterRepository<IPersonaServiceA5PortSoap>
  implements IRegisterScopeFiveRepositoryPort
{
  protected serviceName = ServiceNamesEnum.WSSR_PADRON_FIVE;
  protected wsdlProduction = WsdlPathEnum.WSSR_PADRON_FIVE;
  protected wsdlTesting = WsdlPathEnum.WSSR_PADRON_FIVE_TEST;
  protected endpointProduction = EndpointsEnum.WSSR_PADRON_FIVE;
  protected endpointTesting = EndpointsEnum.WSSR_PADRON_FIVE_TEST;
  protected personaMethod = "getPersona_v2Async" as const;
  protected personaListMethod = "getPersonaList_v2Async" as const;
}
