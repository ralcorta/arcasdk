/**
 * Base SOAP Repository
 * Abstract base class for SOAP repositories with common authentication proxy logic
 */
import { Client } from "soap";
import { SoapServices } from "@infrastructure/types/soap.types";
import { SoapClient } from "./soap-client";
import { ISoapClientPort } from "@infrastructure/outbound/ports/soap/soap-client.port";
import { IAuthenticationRepositoryPort } from "@application/ports/authentication/authentication-repository.port";
import { ILoggerPort } from "@infrastructure/outbound/ports/logger/logger.port";
import { SoapServiceVersion } from "@infrastructure/outbound/ports/soap/enums/endpoints.enum";
import {
  BaseSoapRepositoryConstructorConfig,
  AuthenticatedProxyOptions,
} from "@infrastructure/outbound/ports/soap/soap-repository.types";
import { DEFAULT_USE_HTTPS_AGENT } from "@infrastructure/constants";

/**
 * Base class for SOAP repositories
 * Provides common functionality for authentication proxy
 */
export abstract class BaseSoapRepository {
  protected readonly cuit: number;
  protected readonly production: boolean;
  protected readonly soapClient: ISoapClientPort;
  protected readonly authRepository: IAuthenticationRepositoryPort;
  protected readonly logger: ILoggerPort;
  protected readonly useSoap12: boolean;

  constructor(config: BaseSoapRepositoryConstructorConfig) {
    this.soapClient =
      config.soapClient ??
      new SoapClient(config.useHttpsAgent ?? DEFAULT_USE_HTTPS_AGENT);
    this.authRepository = config.authRepository;
    this.logger = config.logger;
    this.cuit = config.cuit;
    this.production = config.production ?? false;
    this.useSoap12 = config.useSoap12 ?? true; // Default to SOAP 1.2
  }

  /**
   * Create a proxy that automatically injects Auth into SOAP method calls
   * Only intercepts methods that actually require Auth (checked via client.describe())
   * @param client SOAP client to proxy
   * @param options Configuration options for the proxy
   * @returns Proxied client with automatic authentication injection
   */
  protected createAuthenticatedProxy<T extends Client>(
    client: T,
    options: AuthenticatedProxyOptions
  ): T {
    const {
      serviceName,
      injectAuthProperty = false,
      soapVersion = SoapServiceVersion.ServiceSoap12,
    } = options;
    return new Proxy(client, {
      get: (target: T, prop: string) => {
        const original = (target as any)[prop];
        if (typeof original === "function" && prop.endsWith("Async")) {
          const func = prop.slice(0, -5);
          const soapServices: SoapServices<T> = (client as any).describe();
          const methodRequiresAuth =
            !options.excludeMethods?.includes(func) &&
            (!!options.authMapper ||
              soapServices?.Service?.[soapVersion]?.[func]?.input?.["Auth"] !==
                undefined);

          if (methodRequiresAuth) {
            return async (params: any) => {
              const ticket = await this.authRepository.login(serviceName);
              const auth = this.authRepository.getAuthParams(ticket, this.cuit);

              let authParams = injectAuthProperty ? auth.Auth : auth;

              if (options.authMapper) {
                authParams = options.authMapper(auth);
              }

              const paramsWithAuth = { ...authParams, ...params };
              return (original as any).call(target, paramsWithAuth);
            };
          }
        }
        return original;
      },
    });
  }
}
