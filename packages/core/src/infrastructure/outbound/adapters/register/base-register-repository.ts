import { BaseSoapRepository } from "../soap/base-soap-repository";
import { IRegisterBaseRepositoryPort } from "@application/ports/register/register-repository.ports";
import { ServiceNamesEnum } from "@infrastructure/outbound/ports/soap/enums/service-names.enum";
import { WsdlPathEnum } from "@infrastructure/outbound/ports/soap/enums/wsdl-path.enum";
import {
  EndpointsEnum,
  SoapServiceVersion,
} from "@infrastructure/outbound/ports/soap/enums/endpoints.enum";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/outbound/ports/soap/soap-repository.types";
import {
  RegisterServerStatusDto,
  TaxpayerDetailsDto,
} from "@application/dto/register.dto";

import { Client } from "soap";
import { isAfipNotFoundError } from "@infrastructure/utils/afip-errors";

export abstract class BaseRegisterRepository<
  TClient extends Client & { dummyAsync: (args: any) => Promise<any> },
>
  extends BaseSoapRepository
  implements IRegisterBaseRepositoryPort
{
  protected client?: TClient;

  // Subclasses need to define these for soapClient initialization
  protected abstract get serviceName(): ServiceNamesEnum;
  protected abstract get wsdlProduction(): WsdlPathEnum;
  protected abstract get wsdlTesting(): WsdlPathEnum;
  protected abstract get endpointProduction(): EndpointsEnum;
  protected abstract get endpointTesting(): EndpointsEnum;
  protected abstract get personaMethod():
    | "getPersonaAsync"
    | "getPersona_v2Async";

  constructor(config: BaseSoapRepositoryConstructorConfig) {
    super(config);
  }

  protected async getClient(): Promise<TClient> {
    if (this.client) {
      return this.client;
    }

    const wsdlName = this.production ? this.wsdlProduction : this.wsdlTesting;
    const endpoint = this.production
      ? this.endpointProduction
      : this.endpointTesting;

    const { client, soapVersion } = await this.createSoapClient<TClient>(
      wsdlName,
      { forceSoap12Headers: false },
    );

    this.soapClient.setEndpoint(client, endpoint);

    this.client = this.createAuthenticatedProxy(client, {
      serviceName: this.serviceName,
      injectAuthProperty: true,
      soapVersion,
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
    identifier: number,
  ): Promise<TaxpayerDetailsDto | null> {
    const client = await this.getClient();

    try {
      const methodName = this.personaMethod;
      const [output] = await (client as any)[methodName]({
        idPersona: identifier,
      });

      const personaReturn = output.personaReturn;
      if (!personaReturn || !(personaReturn as any).persona) {
        return null;
      }

      return this.mapPersonaReturnToDto(personaReturn);
    } catch (error: any) {
      if (isAfipNotFoundError(error)) {
        return null; // Known AFIP code/message for 'Not Found'
      }
      throw error; // Let consumer handle the raw SOAP fault if applicable
    }
  }

  protected mapPersonaReturnToDto(personaReturn: any): TaxpayerDetailsDto {
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
