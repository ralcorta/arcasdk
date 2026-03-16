/**
 * Register Inscription Proof Repository
 * Implements IRegisterInscriptionProofRepositoryPort
 */
import { IRegisterInscriptionProofRepositoryPort } from "@application/ports/register/register-repository.ports";
import { BaseBatchRegisterRepository } from "./base-batch-register-repository";
import {
  TaxpayerDetailsDto,
  TaxpayersDetailsDto,
} from "@application/dto/register.dto";
import { ServiceNamesEnum } from "@infrastructure/outbound/ports/soap/enums/service-names.enum";
import { WsdlPathEnum } from "@infrastructure/outbound/ports/soap/enums/wsdl-path.enum";
import { EndpointsEnum } from "@infrastructure/outbound/ports/soap/enums/endpoints.enum";
import { IPersonaServiceInscriptionProofPortSoap } from "@infrastructure/outbound/ports/soap/interfaces/PersonaServiceInscriptionProof/PersonaServiceInscriptionProofPort";

export class RegisterInscriptionProofRepository
  extends BaseBatchRegisterRepository<IPersonaServiceInscriptionProofPortSoap>
  implements IRegisterInscriptionProofRepositoryPort
{
  protected serviceName = ServiceNamesEnum.WSSR_INSCRIPTION_PROOF;
  protected wsdlProduction = WsdlPathEnum.WSSR_INSCRIPTION_PROOF;
  protected wsdlTesting = WsdlPathEnum.WSSR_INSCRIPTION_PROOF_TEST;
  protected endpointProduction = EndpointsEnum.WSSR_INSCRIPTION_PROOF;
  protected endpointTesting = EndpointsEnum.WSSR_INSCRIPTION_PROOF_TEST;
  protected personaMethod = "getPersona_v2Async" as const;
  protected personaListMethod = "getPersonaList_v2Async" as const;
}
