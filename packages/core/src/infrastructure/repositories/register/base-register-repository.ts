import { BaseSoapRepository } from "../../soap/base-soap-repository";
import { IRegisterBaseRepositoryPort } from "@application/ports/register/register-repository.ports";
import { ArcaServiceName } from "@application/types/service-name.types";
import { type WsdlPath } from "@infrastructure/soap/config/wsdl-path.types";
import { type Endpoint } from "@infrastructure/soap/config/endpoints.types";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/types/soap-repository.types";
import {
  ServerStatus,
  TaxpayerDetailsDto,
} from "@application/dto/register";

import { Client } from "soap";
import { isAfipNotFoundError } from "@infrastructure/utils/afip-errors";
import { PersonaReturnRaw } from "@infrastructure/types/register.types";
import {
  mapPadronAuth,
  padronExcludeMethods,
} from "@infrastructure/soap/config/auth-mappers";

export abstract class BaseRegisterRepository<TClient extends Client>
  extends BaseSoapRepository
  implements IRegisterBaseRepositoryPort
{
  protected client?: TClient;

  protected abstract get serviceName(): ArcaServiceName;
  protected abstract get wsdlProduction(): WsdlPath;
  protected abstract get wsdlTesting(): WsdlPath;
  protected abstract get endpointProduction(): Endpoint;
  protected abstract get endpointTesting(): Endpoint;
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
      soapVersion,
      authMapper: mapPadronAuth,
      excludeMethods: padronExcludeMethods,
    });

    return this.client;
  }

  async getServerStatus(): Promise<ServerStatus> {
    const client = await this.getClient();
    const [output] = await client.dummyAsync({});
    const result = output.return;

    return {
      appServer: result.appserver,
      dbServer: result.dbserver,
      authServer: result.authserver,
    };
  }

  async getTaxpayerDetails(
    identifier: number,
  ): Promise<TaxpayerDetailsDto | null> {
    const client = await this.getClient();
    const methodName = this.personaMethod;

    try {
      const call = client[methodName];
      if (typeof call !== "function") {
        throw new Error(`Method ${methodName} not found on register client`);
      }
      const [output] = await call.call(client, {
        idPersona: identifier,
      });

      const personaReturn = output.personaReturn;
      if (!personaReturn) {
        return null;
      }

      // ws_sr_constancia_inscripción devuelve datos* en la raíz de personaReturn (sin .persona).
      // Si solo viene errorConstancia, debe ser null.
      const pr = personaReturn.persona ?? personaReturn;
      const hasTaxpayerPayload =
        pr.datosGenerales != null ||
        pr.datosMonotributo != null ||
        pr.datosRegimenGeneral != null ||
        (pr.idPersona !== undefined && pr.idPersona !== null);
      if (!hasTaxpayerPayload) {
        return null;
      }

      return this.mapPersonaReturnToDto(personaReturn);
    } catch (error) {
      if (isAfipNotFoundError(error)) {
        return null;
      }
      throw error;
    }
  }

  protected mapPersonaReturnToDto(
    personaReturn: PersonaReturnRaw,
  ): TaxpayerDetailsDto {
    const persona = personaReturn.persona ?? personaReturn;
    const datosGenerales = persona.datosGenerales;

    return {
      idPersona: persona.idPersona ?? datosGenerales?.idPersona,
      tipoPersona: persona.tipoPersona ?? datosGenerales?.tipoPersona,
      estadoClave: persona.estadoClave ?? datosGenerales?.estadoClave,
      datosGenerales: datosGenerales ?? persona,
      datosMonotributo: persona.datosMonotributo,
      datosRegimenGeneral: persona.datosRegimenGeneral,
      errorConstancia: persona.errorConstancia
        ? {
            error: persona.errorConstancia.error ?? "",
            codigo: persona.errorConstancia.codigo,
          }
        : undefined,
    };
  }
}
