/**
 * Register Scope Four Repository
 * Implements IRegisterScopeFourRepositoryPort
 */
import { Client } from "soap";
import { IRegisterScopeFourRepositoryPort } from "@application/ports/register/register-repository.ports";
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
import { IPersonaServiceA4PortSoap } from "@infrastructure/outbound/ports/soap/interfaces/PersonaServiceA4/PersonaServiceA4Port";

export class RegisterScopeFourRepository
  extends BaseSoapRepository
  implements IRegisterScopeFourRepositoryPort
{
  private client?: IPersonaServiceA4PortSoap;

  constructor(config: BaseSoapRepositoryConstructorConfig) {
    super(config);
  }

  private async getClient(): Promise<IPersonaServiceA4PortSoap> {
    if (this.client) {
      return this.client;
    }

    const wsdlName = this.production
      ? WsdlPathEnum.WSSR_PADRON_FOUR
      : WsdlPathEnum.WSSR_PADRON_FOUR_TEST;
    const endpoint = this.production
      ? EndpointsEnum.WSSR_PADRON_FOUR
      : EndpointsEnum.WSSR_PADRON_FOUR_TEST;

    const client =
      await this.soapClient.createClient<IPersonaServiceA4PortSoap>(wsdlName, {
        forceSoap12Headers: false,
      });

    this.soapClient.setEndpoint(client, endpoint);

    this.client = this.createAuthenticatedProxy(client, {
      serviceName: ServiceNamesEnum.WSSR_PADRON_FOUR,
      injectAuthProperty: true,
      soapVersion: SoapServiceVersion.ServiceSoap,
      authMapper: (auth: any) => ({
        token: auth.Auth.Token,
        sign: auth.Auth.Sign,
        cuitRepresentada: auth.Auth.Cuit,
      }),
      excludeMethods: ["dummy"],
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
      console.log("Error message:", error?.message);
      console.log("Error keys:", Object.keys(error));
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
