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

/**
 * Base class for SOAP repositories
 * Provides common functionality for authentication proxy and WSDL path resolution
 */
export abstract class BaseSoapRepository {
  protected readonly cuit: number;
  protected readonly production: boolean;
  protected readonly soapClientPort: ISoapClientPort;
  protected readonly authRepository: IAuthenticationRepositoryPort;
  protected readonly logger: ILoggerPort;

  constructor(config: BaseSoapRepositoryConstructorConfig) {
    this.soapClientPort = config.soapClient ?? new SoapClient();
    this.authRepository = config.authRepository;
    this.logger = config.logger;
    this.cuit = config.cuit;
    this.production = config.production ?? false;
  }

  /**
   * Get full path to WSDL file
   * @param wsdlPath WSDL file name or path
   * @returns Full path to WSDL file
   */
  protected getWsdlFullPath(wsdlPath: string): string {
    // WSDL files are in infrastructure/outbound/adapters/soap/wsdl/
    // At runtime, they're copied to lib/infrastructure/outbound/adapters/soap/wsdl/
    // Since this file is now in soap/, __dirname points to lib/infrastructure/outbound/adapters/soap/
    const path = require("path");
    return path.resolve(__dirname, "wsdl", wsdlPath);
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
            soapServices?.Service?.[soapVersion]?.[func]?.input?.["Auth"] !==
            undefined;

          if (methodRequiresAuth) {
            return async (params: any) => {
              const ticket = await this.authRepository.login(serviceName);
              const auth = this.authRepository.getAuthParams(ticket, this.cuit);
              const paramsWithAuth = injectAuthProperty
                ? { ...auth.Auth, ...params }
                : { ...auth, ...params };
              return (original as any).call(target, paramsWithAuth);
            };
          }
        }
        return original;
      },
    });
  }
}
