import { Client } from "soap";
import { WSAuthParam } from "@application/types/auth.types";

import { IAuthenticationRepositoryPort } from "@application/ports/authentication/authentication-repository.port";
import { ISoapClientPort } from "@infrastructure/soap/soap-client.port";
import { ArcaServiceName } from "@application/types/service-name.types";
import { type SoapServiceVersion } from "@infrastructure/soap/config/soap-service-version.types";

export interface SoapClientResult<T extends Client> {
  client: T;
  soapVersion: SoapServiceVersion;
}

export interface BaseSoapRepositoryConstructorConfig {
  soapClient?: ISoapClientPort;
  authRepository: IAuthenticationRepositoryPort;
  cuit: number;
  production?: boolean;
  
  useSoap12?: boolean;
  
  useHttpsAgent?: boolean;
}

export interface AuthenticatedProxyOptions {
  
  serviceName: ArcaServiceName;
  
  injectAuthProperty?: boolean;
  
  soapVersion?: SoapServiceVersion;
  
  authMapper?: (auth: WSAuthParam) => Record<string, unknown>;
  
  excludeMethods?: string[];
}
