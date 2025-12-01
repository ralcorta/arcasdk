/**
 * Register Scope Thirteen Repository
 * Implements IRegisterScopeThirteenRepositoryPort
 */
import { IRegisterScopeThirteenRepositoryPort } from "@application/ports/register/register-repository.ports";
import { BaseSoapRepository } from "../soap/base-soap-repository";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/outbound/ports/soap/soap-repository.types";
import {
  RegisterServerStatusDto,
  TaxpayerDetailsDto,
  TaxIDByDocumentResultDto,
} from "@application/dto/register.dto";
import { ServiceNamesEnum } from "@infrastructure/outbound/ports/soap/enums/service-names.enum";
import { WsdlPathEnum } from "@infrastructure/outbound/ports/soap/enums/wsdl-path.enum";
import {
  EndpointsEnum,
  SoapServiceVersion,
} from "@infrastructure/outbound/ports/soap/enums/endpoints.enum";
import { IPersonaServiceA13PortSoap } from "@infrastructure/outbound/ports/soap/interfaces/PersonaServiceA13/PersonaServiceA13Port";

export class RegisterScopeThirteenRepository
  extends BaseSoapRepository
  implements IRegisterScopeThirteenRepositoryPort
{
  private client?: IPersonaServiceA13PortSoap;

  constructor(config: BaseSoapRepositoryConstructorConfig) {
    super(config);
  }

  private async getClient(): Promise<IPersonaServiceA13PortSoap> {
    if (this.client) {
      return this.client;
    }

    const wsdlName = this.production
      ? WsdlPathEnum.WSSR_PADRON_THIRTEEN
      : WsdlPathEnum.WSSR_PADRON_THIRTEEN_TEST;
    const endpoint = this.production
      ? EndpointsEnum.WSSR_PADRON_THIRTEEN
      : EndpointsEnum.WSSR_PADRON_THIRTEEN_TEST;

    const client =
      await this.soapClient.createClient<IPersonaServiceA13PortSoap>(wsdlName, {
        forceSoap12Headers: false,
      });

    this.soapClient.setEndpoint(client, endpoint);

    this.client = this.createAuthenticatedProxy(client, {
      serviceName: ServiceNamesEnum.WSSR_PADRON_THIRTEEN,
      injectAuthProperty: true,
      soapVersion: SoapServiceVersion.ServiceSoap,
    });

    return this.client;
  }

  async getServerStatus(): Promise<RegisterServerStatusDto> {
    const client = await this.getClient();
    const [output] = await client.dummyAsync({});
    const result = output.return;

    return {
      appserver: result.appserver,
      dbserver: result.dbserver,
      authserver: result.authserver,
    };
  }

  async getTaxpayerDetails(
    identifier: number
  ): Promise<TaxpayerDetailsDto | null> {
    const client = await this.getClient();

    try {
      const [output] = await client.getPersonaAsync({
        idPersona: identifier,
      } as any);

      const personaReturn = output.personaReturn;
      if (!personaReturn || !personaReturn.persona) {
        return null;
      }

      return this.mapPersonaReturnToDto(personaReturn);
    } catch (error: any) {
      if (error?.code === 602 || error?.message?.includes("no existe")) {
        return null;
      }
      throw error;
    }
  }

  async getTaxIDByDocument(
    documentNumber: string
  ): Promise<TaxIDByDocumentResultDto> {
    const client = await this.getClient();
    const [output] = await client.getIdPersonaListByDocumentoAsync({
      documento: documentNumber,
    } as any);

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
  }

  private mapPersonaReturnToDto(personaReturn: any): TaxpayerDetailsDto {
    const persona = personaReturn.persona || personaReturn;

    return {
      idPersona: persona.idPersona,
      tipoPersona: persona.tipoPersona,
      estadoClave: persona.estadoClave,
      datosGenerales: persona.datosGenerales || persona,
      datosMonotributo: persona.datosMonotributo,
      datosRegimenGeneral: persona.datosRegimenGeneral,
      errorConstancia: persona.errorConstancia
        ? {
            error: persona.errorConstancia.error || "",
            codigo: persona.errorConstancia.codigo,
          }
        : undefined,
    };
  }
}
