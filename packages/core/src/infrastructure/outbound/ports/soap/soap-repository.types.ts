/**
 * SOAP Repository Types
 * Configuration types for SOAP repositories
 */
import { ISoapClientPort } from "./soap-client.port";
import { IAuthenticationRepositoryPort } from "@application/ports/authentication/authentication-repository.port";
import { ILoggerPort } from "../logger/logger.port";
import { ServiceNamesEnum } from "./enums/service-names.enum";
import { SoapServiceVersion } from "./enums/endpoints.enum";

export interface BaseSoapRepositoryConstructorConfig {
  soapClient?: ISoapClientPort;
  authRepository: IAuthenticationRepositoryPort;
  logger: ILoggerPort;
  cuit: number;
  production?: boolean;
  /**
   * Use SOAP 1.2 instead of SOAP 1.1 for Electronic Billing service
   * @default true (uses SOAP 1.2 by default)
   */
  useSoap12?: boolean;
  /**
   * Enable HTTPS Agent for Node.js environments (required for legacy ARCA servers)
   * Set to false when running in Cloudflare Workers or other edge runtimes
   * @default true (enabled by default for Node.js compatibility)
   */
  useHttpsAgent?: boolean;
}

export interface AuthenticatedProxyOptions {
  /**
   * Service name to use for authentication
   */
  serviceName: ServiceNamesEnum;
  /**
   * Whether to inject auth.Auth instead of auth directly
   * @default false
   */
  injectAuthProperty?: boolean;
  /**
   * SOAP service version to use when checking if method requires Auth
   * @default ServiceSoap12
   */
  soapVersion?: SoapServiceVersion;
  /**
   * Optional function to map auth parameters before injection
   */
  authMapper?: (auth: any) => any;
  /**
   * List of methods to exclude from authentication injection
   */
  excludeMethods?: string[];
}
