/**
 * Register Repository Adapter
 * Implements IRegisterRepositoryPort for AFIP/ARCA Register services
 */
import {
  IRegisterRepositoryPort,
  RegisterScope,
} from "@application/ports/register/register-repository.port";
import { ISoapClientPort } from "@infrastructure/outbound/ports/soap/soap-client.port";
import { IAuthenticationRepositoryPort } from "@application/ports/authentication/authentication-repository.port";
import { ILoggerPort } from "@infrastructure/outbound/ports/logger/logger.port";
import {
  RegisterServerStatusDto,
  TaxpayerDetailsDto,
  TaxpayersDetailsDto,
  TaxIDByDocumentResultDto,
} from "@application/dto/register.dto";
import { ServiceNamesEnum } from "@infrastructure/outbound/ports/soap/enums/service-names.enum";
import { WsdlPathEnum } from "@infrastructure/outbound/ports/soap/enums/wsdl-path.enum";
import { EndpointsEnum } from "@infrastructure/outbound/ports/soap/enums/endpoints.enum";
import { IPersonaServiceA4PortSoap } from "@infrastructure/outbound/ports/soap/interfaces/PersonaServiceA4/PersonaServiceA4Port";
import { IPersonaServiceA5PortSoap } from "@infrastructure/outbound/ports/soap/interfaces/PersonaServiceA5/PersonaServiceA5Port";
import { IPersonaServiceA10PortSoap } from "@infrastructure/outbound/ports/soap/interfaces/PersonaServiceA10/PersonaServiceA10Port";
import { IPersonaServiceA13PortSoap } from "@infrastructure/outbound/ports/soap/interfaces/PersonaServiceA13/PersonaServiceA13Port";
import { IPersonaServiceInscriptionProofPortSoap } from "@infrastructure/outbound/ports/soap/interfaces/PersonaServiceInscriptionProof/PersonaServiceInscriptionProofPort";

export interface RegisterRepositoryAdapterConfig {
  cuit: number;
  production?: boolean;
}

type PersonaServiceClient =
  | IPersonaServiceA4PortSoap
  | IPersonaServiceA5PortSoap
  | IPersonaServiceA10PortSoap
  | IPersonaServiceA13PortSoap
  | IPersonaServiceInscriptionProofPortSoap;

export class RegisterRepositoryAdapter implements IRegisterRepositoryPort {
  private readonly clients: Map<RegisterScope, PersonaServiceClient> =
    new Map();
  private readonly cuit: number;
  private readonly production: boolean;

  constructor(
    private readonly soapClientPort: ISoapClientPort,
    private readonly authRepository: IAuthenticationRepositoryPort,
    private readonly logger: ILoggerPort,
    config: RegisterRepositoryAdapterConfig
  ) {
    this.cuit = config.cuit;
    this.production = config.production ?? false;
  }

  /**
   * Get or create SOAP client for a specific scope
   */
  private async getClient(scope: RegisterScope): Promise<PersonaServiceClient> {
    if (this.clients.has(scope)) {
      return this.clients.get(scope)!;
    }

    const { wsdlPath, endpoint, serviceName } = this.getScopeConfig(scope);

    // Create SOAP client based on scope
    let client: PersonaServiceClient;

    switch (scope) {
      case RegisterScope.FOUR:
        client =
          await this.soapClientPort.createClient<IPersonaServiceA4PortSoap>(
            this.getWsdlFullPath(wsdlPath),
            { forceSoap12Headers: false }
          );
        break;
      case RegisterScope.FIVE:
        client =
          await this.soapClientPort.createClient<IPersonaServiceA5PortSoap>(
            this.getWsdlFullPath(wsdlPath),
            { forceSoap12Headers: false }
          );
        break;
      case RegisterScope.TEN:
        client =
          await this.soapClientPort.createClient<IPersonaServiceA10PortSoap>(
            this.getWsdlFullPath(wsdlPath),
            { forceSoap12Headers: false }
          );
        break;
      case RegisterScope.THIRTEEN:
        client =
          await this.soapClientPort.createClient<IPersonaServiceA13PortSoap>(
            this.getWsdlFullPath(wsdlPath),
            { forceSoap12Headers: false }
          );
        break;
      case RegisterScope.INSCRIPTION_PROOF:
        client =
          await this.soapClientPort.createClient<IPersonaServiceInscriptionProofPortSoap>(
            this.getWsdlFullPath(wsdlPath),
            { forceSoap12Headers: false }
          );
        break;
      default:
        throw new Error(`Unknown register scope: ${scope}`);
    }

    // Set endpoint
    this.soapClientPort.setEndpoint(client, endpoint);

    // Create proxy to inject Auth automatically
    const proxiedClient = this.createAuthenticatedProxy(
      client,
      scope,
      serviceName
    );
    this.clients.set(scope, proxiedClient);

    return proxiedClient;
  }

  /**
   * Get configuration for a specific scope
   */
  private getScopeConfig(scope: RegisterScope): {
    wsdlPath: string;
    endpoint: string;
    serviceName: ServiceNamesEnum;
  } {
    switch (scope) {
      case RegisterScope.FOUR:
        return {
          wsdlPath: this.production
            ? WsdlPathEnum.WSSR_PADRON_FOUR
            : WsdlPathEnum.WSSR_PADRON_FOUR_TEST,
          endpoint: this.production
            ? EndpointsEnum.WSSR_PADRON_FOUR
            : EndpointsEnum.WSSR_PADRON_FOUR_TEST,
          serviceName: ServiceNamesEnum.WSSR_PADRON_FOUR,
        };
      case RegisterScope.FIVE:
        return {
          wsdlPath: this.production
            ? WsdlPathEnum.WSSR_PADRON_FIVE
            : WsdlPathEnum.WSSR_PADRON_FIVE_TEST,
          endpoint: this.production
            ? EndpointsEnum.WSSR_PADRON_FIVE
            : EndpointsEnum.WSSR_PADRON_FIVE_TEST,
          serviceName: ServiceNamesEnum.WSSR_PADRON_FIVE,
        };
      case RegisterScope.TEN:
        return {
          wsdlPath: this.production
            ? WsdlPathEnum.WSSR_PADRON_TEN
            : WsdlPathEnum.WSSR_PADRON_TEN_TEST,
          endpoint: this.production
            ? EndpointsEnum.WSSR_PADRON_TEN
            : EndpointsEnum.WSSR_PADRON_TEN_TEST,
          serviceName: ServiceNamesEnum.WSSR_PADRON_TEN,
        };
      case RegisterScope.THIRTEEN:
        return {
          wsdlPath: this.production
            ? WsdlPathEnum.WSSR_PADRON_THIRTEEN
            : WsdlPathEnum.WSSR_PADRON_THIRTEEN_TEST,
          endpoint: this.production
            ? EndpointsEnum.WSSR_PADRON_THIRTEEN
            : EndpointsEnum.WSSR_PADRON_THIRTEEN_TEST,
          serviceName: ServiceNamesEnum.WSSR_PADRON_THIRTEEN,
        };
      case RegisterScope.INSCRIPTION_PROOF:
        return {
          wsdlPath: this.production
            ? WsdlPathEnum.WSSR_INSCRIPTION_PROOF
            : WsdlPathEnum.WSSR_INSCRIPTION_PROOF_TEST,
          endpoint: this.production
            ? EndpointsEnum.WSSR_INSCRIPTION_PROOF
            : EndpointsEnum.WSSR_INSCRIPTION_PROOF_TEST,
          serviceName: ServiceNamesEnum.WSSR_INSCRIPTION_PROOF,
        };
      default:
        throw new Error(`Unknown register scope: ${scope}`);
    }
  }

  /**
   * Get full path to WSDL file
   */
  private getWsdlFullPath(wsdlPath: string): string {
    const path = require("path");
    return path.resolve(__dirname, "..", "soap", "wsdl", wsdlPath);
  }

  /**
   * Create a proxy that automatically injects Auth into SOAP method calls
   */
  private createAuthenticatedProxy(
    client: PersonaServiceClient,
    scope: RegisterScope,
    serviceName: ServiceNamesEnum
  ): PersonaServiceClient {
    return new Proxy(client, {
      get: (target: PersonaServiceClient, prop: string) => {
        const original = (target as any)[prop];

        // Only intercept async methods that need Auth (not dummy)
        if (
          typeof original === "function" &&
          prop.endsWith("Async") &&
          prop !== "dummyAsync" &&
          prop !== "describe"
        ) {
          return async (params: any) => {
            // Get authentication
            const ticket = await this.authRepository.login(serviceName);
            const auth = this.authRepository.getAuthParams(ticket, this.cuit);

            // Inject Auth into params
            const paramsWithAuth = {
              ...auth.Auth,
              ...params,
            };

            // Call original method
            return (original as any).call(target, paramsWithAuth);
          };
        }

        return original;
      },
    }) as PersonaServiceClient;
  }

  async getServerStatus(
    scope: RegisterScope
  ): Promise<RegisterServerStatusDto> {
    const client = await this.getClient(scope);
    const [output] = await (client as any).dummyAsync({});

    const result = output.return;

    return {
      appserver: result.appserver,
      dbserver: result.dbserver,
      authserver: result.authserver,
    };
  }

  async getTaxpayerDetails(
    scope: RegisterScope,
    identifier: number
  ): Promise<TaxpayerDetailsDto | null> {
    const client = await this.getClient(scope);

    try {
      let output: any;

      switch (scope) {
        case RegisterScope.FOUR: {
          // Proxy injects Auth automatically
          const result = await (client as any).getPersonaAsync({
            idPersona: identifier,
          });
          output = result[0];
          break;
        }
        case RegisterScope.FIVE:
        case RegisterScope.INSCRIPTION_PROOF: {
          // Proxy injects Auth automatically
          const result = await (client as any).getPersona_v2Async({
            idPersona: identifier,
          });
          output = result[0];
          break;
        }
        case RegisterScope.TEN: {
          // Proxy injects Auth automatically
          const result = await (client as any).getPersonaAsync({
            idPersona: identifier,
          });
          output = result[0];
          break;
        }
        case RegisterScope.THIRTEEN: {
          // Proxy injects Auth automatically
          const result = await (client as any).getPersonaAsync({
            idPersona: identifier,
          });
          output = result[0];
          break;
        }
        default:
          throw new Error(`Unknown register scope: ${scope}`);
      }

      // Map SOAP response to DTO
      const personaReturn = output.personaReturn;
      if (!personaReturn || !personaReturn.persona) {
        return null;
      }

      return this.mapPersonaReturnToDto(personaReturn);
    } catch (error: any) {
      // If error indicates not found, return null
      if (error?.code === 602 || error?.message?.includes("no existe")) {
        return null;
      }
      throw error;
    }
  }

  async getTaxpayersDetails(
    scope: RegisterScope,
    identifiers: number[]
  ): Promise<TaxpayersDetailsDto> {
    if (
      scope !== RegisterScope.FIVE &&
      scope !== RegisterScope.INSCRIPTION_PROOF
    ) {
      throw new Error(
        `getTaxpayersDetails is only available for FIVE and INSCRIPTION_PROOF scopes`
      );
    }

    const client = await this.getClient(scope);
    // Proxy injects Auth automatically
    const [output] = await (client as any).getPersonaList_v2Async({
      idPersona: identifiers,
    });

    const personaListReturn = output.personaListReturn;

    return {
      persona:
        personaListReturn.persona?.map((p: any) => this.mapPersonaToDto(p)) ||
        [],
      cantidadRegistros: personaListReturn.persona?.length || 0,
      // IpersonaListReturn doesn't have errorConstancia, it's in individual persona objects
      errorConstancia: undefined,
    };
  }

  async getTaxIDByDocument(
    scope: RegisterScope,
    documentNumber: string
  ): Promise<TaxIDByDocumentResultDto> {
    if (scope !== RegisterScope.THIRTEEN) {
      throw new Error(
        `getTaxIDByDocument is only available for THIRTEEN scope`
      );
    }

    const client = await this.getClient(scope);
    // Proxy injects Auth automatically
    const [output] = await (client as any).getIdPersonaListByDocumentoAsync({
      documento: documentNumber,
    });

    const idPersonaListReturn = output.idPersonaListReturn;

    // IidPersonaListReturn.idPersona can be a single number or array
    const idPersona = Array.isArray(idPersonaListReturn.idPersona)
      ? idPersonaListReturn.idPersona
      : typeof idPersonaListReturn.idPersona === "number"
      ? [idPersonaListReturn.idPersona]
      : [];

    return {
      idPersona,
      // IidPersonaListReturn doesn't have errorConstancia
      errorConstancia: undefined,
    };
  }

  /**
   * Map SOAP personaReturn to DTO
   */
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

  /**
   * Map SOAP persona to DTO
   */
  private mapPersonaToDto(persona: any): TaxpayerDetailsDto {
    return {
      idPersona: persona.datosGenerales?.idPersona,
      tipoPersona: persona.datosGenerales?.tipoPersona,
      estadoClave: persona.datosGenerales?.estadoClave,
      datosGenerales: persona.datosGenerales,
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
