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

              const authParams = options.authMapper
                ? options.authMapper(auth)
                : injectAuthProperty
                  ? auth.Auth
                  : auth;

              const paramsWithAuth: Record<string, unknown> = {
                ...authParams,
                ...params,
              };
              // Some operations carry request fields inside Auth (WSFEX FEXGetLast_CMP:
              // Pto_venta, Cbte_Tipo). auth.Auth is spread twice on purpose:
              // - the first spread fixes key order: credentials first, as in the WSDL
              //   sequence (soap serializes keys in insertion order)
              // - the last spread restores the credential values if the request fields
              //   reused a credential key; reassigning an existing key keeps its position
              if (authParams === auth && params?.Auth) {
                paramsWithAuth.Auth = {
                  ...auth.Auth,
                  ...(params.Auth as Record<string, unknown>),
                  ...auth.Auth,
                };
              }
              return original.call(target, paramsWithAuth);
            };
          }
        }
        return original;
      },
    });
  }
}
