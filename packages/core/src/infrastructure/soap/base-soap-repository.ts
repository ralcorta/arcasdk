import { Client } from "soap";
import { SoapClient } from "./soap-client";
import { ISoapClientPort } from "@infrastructure/soap/soap-client.port";
import { IAuthenticationRepositoryPort } from "@application/ports/authentication/authentication-repository.port";
import { SoapServiceVersions } from "@infrastructure/soap/config/soap-service-version.types";
import type { ISoapOptions } from "@infrastructure/types/soap-client.types";
import {
  BaseSoapRepositoryConstructorConfig,
  AuthenticatedProxyOptions,
  SoapClientResult,
} from "@infrastructure/types/soap-repository.types";
import { DEFAULT_USE_HTTPS_AGENT } from "@infrastructure/constants";
import type { ArcaEventListener } from "@application/types/events.types";
import { SoapEventTracker } from "./soap-event-tracker";

export abstract class BaseSoapRepository {
  protected readonly cuit: number;
  protected readonly production: boolean;
  protected readonly soapClient: ISoapClientPort;
  protected readonly authRepository: IAuthenticationRepositoryPort;
  protected readonly useSoap12: boolean;
  protected readonly onEvent?: ArcaEventListener;

  constructor(config: BaseSoapRepositoryConstructorConfig) {
    this.soapClient =
      config.soapClient ??
      new SoapClient(config.useHttpsAgent ?? DEFAULT_USE_HTTPS_AGENT);
    this.authRepository = config.authRepository;
    this.cuit = config.cuit;
    this.production = config.production ?? false;
    this.useSoap12 = config.useSoap12 ?? true; // Default to SOAP 1.2
    this.onEvent = config.onEvent;
  }

  
  protected async createSoapClient<T extends Client>(
    wsdl: string,
    options: ISoapOptions = {},
  ): Promise<SoapClientResult<T>> {
    const useSoap12 = options.forceSoap12Headers ?? this.useSoap12;
    const soapVersion = useSoap12
      ? SoapServiceVersions.ServiceSoap12
      : SoapServiceVersions.ServiceSoap;

    const client = await this.soapClient.createClient<T>(wsdl, {
      ...options,
      forceSoap12Headers: useSoap12,
    });

    return { client, soapVersion };
  }

  
  protected createAuthenticatedProxy<T extends Client>(
    client: T,
    options: AuthenticatedProxyOptions,
  ): T {
    const {
      serviceName,
      injectAuthProperty = false,
      soapVersion = SoapServiceVersions.ServiceSoap12,
    } = options;
    const soapServices = client.describe();
    const tracker = this.onEvent
      ? new SoapEventTracker(client, this.onEvent)
      : undefined;

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

          if (!methodRequiresAuth && !tracker) {
            return original;
          }

          return async (
            params: Record<string, unknown>,
            callOptions?: Record<string, unknown>,
            extraHeaders?: Record<string, unknown>,
          ) => {
            let callParams = params;
            if (methodRequiresAuth) {
              const ticket = await this.authRepository.login(serviceName);
              const auth = this.authRepository.getAuthParams(ticket, this.cuit);

              const authParams = options.authMapper
                ? options.authMapper(auth)
                : injectAuthProperty
                  ? auth.Auth
                  : auth;

              callParams = { ...authParams, ...params };
            }

            if (!tracker) {
              return original.call(target, callParams);
            }
            return tracker.track(serviceName, func, callParams, (trackOptions) =>
              original.call(
                target,
                callParams,
                { ...callOptions, ...trackOptions },
                extraHeaders,
              ),
            );
          };
        }
        return original;
      },
    });
  }
}
