import { Client } from "soap";
import { SoapClient } from "./soap-client";
import { ISoapClientPort } from "@infrastructure/outbound/ports/soap/soap-client.port";
import { IAuthenticationRepositoryPort } from "@application/ports/authentication/authentication-repository.port";
import { SoapServiceVersion } from "@infrastructure/outbound/ports/soap/enums/endpoints.enum";
import type { ISoapOptions } from "@infrastructure/types/soap-client.types";
import {
  BaseSoapRepositoryConstructorConfig,
  AuthenticatedProxyOptions,
  SoapClientResult,
} from "@infrastructure/types/soap-repository.types";
import { DEFAULT_USE_HTTPS_AGENT } from "@infrastructure/constants";

export abstract class BaseSoapRepository {
  protected readonly cuit: number;
  protected readonly production: boolean;
  protected readonly soapClient: ISoapClientPort;
  protected readonly authRepository: IAuthenticationRepositoryPort;
  protected readonly useSoap12: boolean;

  constructor(config: BaseSoapRepositoryConstructorConfig) {
    this.soapClient =
      config.soapClient ??
      new SoapClient(config.useHttpsAgent ?? DEFAULT_USE_HTTPS_AGENT);
    this.authRepository = config.authRepository;
    this.cuit = config.cuit;
    this.production = config.production ?? false;
    this.useSoap12 = config.useSoap12 ?? true; // Default to SOAP 1.2
  }

  /**
   * Helper to create a SOAP client with the correct version-specific headers
   * @param wsdl WSDL path or name
   * @param options Additional SOAP client options
   * @returns Object containing the created client and the soap version used
   */
  protected async createSoapClient<T extends Client>(
    wsdl: string,
    options: ISoapOptions = {},
  ): Promise<SoapClientResult<T>> {
    const useSoap12 = options.forceSoap12Headers ?? this.useSoap12;
    const soapVersion = useSoap12
      ? SoapServiceVersion.ServiceSoap12
      : SoapServiceVersion.ServiceSoap;

    const client = await this.soapClient.createClient<T>(wsdl, {
      ...options,
      forceSoap12Headers: useSoap12,
    });

    return { client, soapVersion };
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
    options: AuthenticatedProxyOptions,
  ): T {
    const {
      serviceName,
      injectAuthProperty = false,
      soapVersion = SoapServiceVersion.ServiceSoap12,
    } = options;
    const soapServices = client.describe();

    return new Proxy(client, {
      get: (target: T, prop: string) => {
        const original = target[prop];
        if (typeof original === "function" && prop.endsWith("Async")) {
          const func = prop.slice(0, -5);
          const methodRequiresAuth =
            !options.excludeMethods?.includes(func) &&
            (!!options.authMapper ||
              soapServices?.Service?.[soapVersion]?.[func]?.input?.["Auth"] !==
                undefined);

          if (methodRequiresAuth) {
            return async (params: Record<string, unknown>) => {
              const ticket = await this.authRepository.login(serviceName);
              const auth = this.authRepository.getAuthParams(ticket, this.cuit);

              let authParams: Record<string, unknown> = injectAuthProperty
                ? (auth.Auth as unknown as Record<string, unknown>)
                : (auth as unknown as Record<string, unknown>);

              if (options.authMapper) {
                authParams = options.authMapper(auth);
              }

              const paramsWithAuth = { ...authParams, ...params };
              return original.call(target, paramsWithAuth);
            };
          }
        }
        return original;
      },
    });
  }
}
