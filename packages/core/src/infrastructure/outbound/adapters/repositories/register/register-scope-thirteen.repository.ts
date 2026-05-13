import { IRegisterScopeThirteenRepositoryPort } from "@application/ports/register/register-repository.ports";
import { BaseRegisterRepository } from "./base-register-repository";
import { TaxIDByDocumentResultDto } from "@application/dto/register.dto";
import { ServiceNamesEnum } from "@infrastructure/constants/service-names.enum";
import { WsdlPathEnum } from "@infrastructure/outbound/ports/soap/enums/wsdl-path.enum";
import { EndpointsEnum } from "@infrastructure/outbound/ports/soap/enums/endpoints.enum";
import { IPersonaServiceA13PortSoap } from "@infrastructure/outbound/ports/soap/interfaces/PersonaServiceA13/PersonaServiceA13Port";
import { isAfipNotFoundError } from "@infrastructure/utils/afip-errors";

export class RegisterScopeThirteenRepository
  extends BaseRegisterRepository<IPersonaServiceA13PortSoap>
  implements IRegisterScopeThirteenRepositoryPort
{
  protected serviceName = ServiceNamesEnum.WSSR_PADRON_THIRTEEN;
  protected wsdlProduction = WsdlPathEnum.WSSR_PADRON_THIRTEEN;
  protected wsdlTesting = WsdlPathEnum.WSSR_PADRON_THIRTEEN_TEST;
  protected endpointProduction = EndpointsEnum.WSSR_PADRON_THIRTEEN;
  protected endpointTesting = EndpointsEnum.WSSR_PADRON_THIRTEEN_TEST;
  protected personaMethod = "getPersonaAsync" as const;

  async getTaxIDByDocument(
    documentNumber: string,
  ): Promise<TaxIDByDocumentResultDto> {
    const client = await this.getClient();

    try {
      const [output] = await client.getIdPersonaListByDocumentoAsync({
        documento: documentNumber,
      });

      const idPersonaListReturn = output.idPersonaListReturn;

      const idPersona = Array.isArray(idPersonaListReturn.idPersona)
        ? idPersonaListReturn.idPersona
        : typeof idPersonaListReturn.idPersona === "number"
          ? [idPersonaListReturn.idPersona]
          : [];

      return {
        idPersona,
        errorConstancia: undefined,
      };
    } catch (error) {
      if (isAfipNotFoundError(error)) {
        return {
          idPersona: [],
          errorConstancia: undefined,
        };
      }
      throw error;
    }
  }
}
