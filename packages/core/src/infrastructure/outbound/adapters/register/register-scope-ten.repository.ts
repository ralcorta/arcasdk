/**
 * Register Scope Ten Repository
 * Implements IRegisterScopeTenRepositoryPort
 */
import { IRegisterScopeTenRepositoryPort } from "@application/ports/register/register-repository.ports";
import { BaseSoapRepository } from "../soap/base-soap-repository";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/outbound/ports/soap/soap-repository.types";
import {
  RegisterServerStatusDto,
  TaxpayerDetailsDto,
} from "@application/dto/register.dto";
import { ServiceNamesEnum } from "@infrastructure/outbound/ports/soap/enums/service-names.enum";
import { WsdlPathEnum } from "@infrastructure/outbound/ports/soap/enums/wsdl-path.enum";
import {
  EndpointsEnum,
  SoapServiceVersion,
} from "@infrastructure/outbound/ports/soap/enums/endpoints.enum";
import { IPersonaServiceA10PortSoap } from "@infrastructure/outbound/ports/soap/interfaces/PersonaServiceA10/PersonaServiceA10Port";

export class RegisterScopeTenRepository
  extends BaseSoapRepository
  implements IRegisterScopeTenRepositoryPort
{
  private client?: IPersonaServiceA10PortSoap;

  constructor(config: BaseSoapRepositoryConstructorConfig) {
    super(config);
  }

  private async getClient(): Promise<IPersonaServiceA10PortSoap> {
    if (this.client) {
      return this.client;
    }

    const wsdlName = this.production
      ? WsdlPathEnum.WSSR_PADRON_TEN
      : WsdlPathEnum.WSSR_PADRON_TEN_TEST;
    const endpoint = this.production
      ? EndpointsEnum.WSSR_PADRON_TEN
      : EndpointsEnum.WSSR_PADRON_TEN_TEST;

    const client =
      await this.soapClient.createClient<IPersonaServiceA10PortSoap>(wsdlName, {
        forceSoap12Headers: false,
      });

    this.soapClient.setEndpoint(client, endpoint);

    this.client = this.createAuthenticatedProxy(client, {
      serviceName: ServiceNamesEnum.WSSR_PADRON_TEN,
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
