import { IRegisterInscriptionProofRepositoryPort } from "@application/ports/register/register-repository.ports";
import { BaseBatchRegisterRepository } from "./base-batch-register-repository";
import { ArcaServiceNames } from "@application/types/service-name.types";
import { WsdlPaths } from "@infrastructure/soap/config/wsdl-path.types";
import { Endpoints } from "@infrastructure/soap/config/endpoints.types";
import { IPersonaServiceA5PortSoap } from "@infrastructure/soap/contracts/PersonaServiceInscriptionProof/PersonaServiceInscriptionProofPort";

export class RegisterInscriptionProofRepository
  extends BaseBatchRegisterRepository<IPersonaServiceA5PortSoap>
  implements IRegisterInscriptionProofRepositoryPort
{
  protected serviceName = ArcaServiceNames.WSSR_INSCRIPTION_PROOF;
  protected wsdlProduction = WsdlPaths.WSSR_INSCRIPTION_PROOF;
  protected wsdlTesting = WsdlPaths.WSSR_INSCRIPTION_PROOF_TEST;
  protected endpointProduction = Endpoints.WSSR_INSCRIPTION_PROOF;
  protected endpointTesting = Endpoints.WSSR_INSCRIPTION_PROOF_TEST;
  protected personaMethod = "getPersona_v2Async" as const;
  protected personaListMethod = "getPersonaList_v2Async" as const;
}
