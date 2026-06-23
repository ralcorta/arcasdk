import { IRegisterScopeThirteenRepositoryPort } from "@application/ports/register/register-repository.ports";
import { BaseRegisterRepository } from "./base-register-repository";
import { TaxIDByDocumentResultDto } from "@application/dto/register";
import { ArcaServiceNames } from "@application/types/service-name.types";
import { WsdlPaths } from "@infrastructure/soap/config/wsdl-path.types";
import { Endpoints } from "@infrastructure/soap/config/endpoints.types";
import { IPersonaServiceA13PortSoap } from "@infrastructure/soap/contracts/PersonaServiceA13/PersonaServiceA13Port";
import { isAfipNotFoundError } from "@infrastructure/utils/afip-errors";

export class RegisterScopeThirteenRepository
  extends BaseRegisterRepository<IPersonaServiceA13PortSoap>
  implements IRegisterScopeThirteenRepositoryPort
{
  protected serviceName = ArcaServiceNames.WSSR_PADRON_THIRTEEN;
  protected wsdlProduction = WsdlPaths.WSSR_PADRON_THIRTEEN;
  protected wsdlTesting = WsdlPaths.WSSR_PADRON_THIRTEEN_TEST;
  protected endpointProduction = Endpoints.WSSR_PADRON_THIRTEEN;
  protected endpointTesting = Endpoints.WSSR_PADRON_THIRTEEN_TEST;
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
