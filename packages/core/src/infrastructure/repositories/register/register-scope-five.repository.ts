import { IRegisterScopeFiveRepositoryPort } from "@application/ports/register/register-repository.ports";
import { BaseBatchRegisterRepository } from "./base-batch-register-repository";
import { ArcaServiceNames } from "@application/types/service-name.types";
import { WsdlPaths } from "@infrastructure/soap/config/wsdl-path.types";
import { Endpoints } from "@infrastructure/soap/config/endpoints.types";
import { IPersonaServiceA5PortSoap } from "@infrastructure/soap/contracts/PersonaServiceA5/PersonaServiceA5Port";

export class RegisterScopeFiveRepository
  extends BaseBatchRegisterRepository<IPersonaServiceA5PortSoap>
  implements IRegisterScopeFiveRepositoryPort
{
  protected serviceName = ArcaServiceNames.WSSR_PADRON_FIVE;
  protected wsdlProduction = WsdlPaths.WSSR_PADRON_FIVE;
  protected wsdlTesting = WsdlPaths.WSSR_PADRON_FIVE_TEST;
  protected endpointProduction = Endpoints.WSSR_PADRON_FIVE;
  protected endpointTesting = Endpoints.WSSR_PADRON_FIVE_TEST;
  protected personaMethod = "getPersona_v2Async" as const;
  protected personaListMethod = "getPersonaList_v2Async" as const;
}
