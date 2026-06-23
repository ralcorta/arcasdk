import { IGenericRepositoryPort } from "@application/ports/generic/generic-repository.port";
import { BaseSoapRepository } from "../../soap/base-soap-repository";
import { ArcaServiceName } from "@application/types/service-name.types";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/types/soap-repository.types";
import { getArcaServiceConfig } from "@infrastructure/soap/config/arca-service-config";
import type { ISoapOptions } from "@infrastructure/types/soap-client.types";

export class GenericRepository
  extends BaseSoapRepository
  implements IGenericRepositoryPort
{
  constructor(config: BaseSoapRepositoryConstructorConfig) {
    super(config);
  }

  async call(
    serviceName: ArcaServiceName,
    methodName: string,
    params: Record<string, unknown>,
    options?: { wsdlContent?: string },
  ): Promise<unknown> {
    const serviceConfig = options?.wsdlContent
      ? undefined
      : getArcaServiceConfig(serviceName);

    if (!options?.wsdlContent && !serviceConfig) {
      throw new Error(
        `No bundled WSDL for service ${serviceName}. Provide wsdlContent in options.`,
      );
    }

    const wsdlName = serviceConfig
      ? this.production
        ? serviceConfig.wsdlProduction
        : serviceConfig.wsdlTesting
      : "";

    const createOptions: ISoapOptions = {
      wsdlContent: options?.wsdlContent,
    };

    if (serviceConfig?.forceSoap12Headers !== undefined) {
      createOptions.forceSoap12Headers = serviceConfig.forceSoap12Headers;
    }

    const { client, soapVersion } = await this.createSoapClient(
      wsdlName,
      createOptions,
    );

    if (serviceConfig) {
      const endpoint = this.production
        ? serviceConfig.endpointProduction
        : serviceConfig.endpointTesting;
      this.soapClient.setEndpoint(client, endpoint);
    }

    const authenticatedClient = this.createAuthenticatedProxy(client, {
      serviceName,
      soapVersion,
      authMapper: serviceConfig?.authMapper,
      excludeMethods: serviceConfig?.excludeMethods,
    });

    const methodAsync = `${methodName}Async`;
    const asyncMethod = authenticatedClient[methodAsync];

    if (typeof asyncMethod !== "function") {
      throw new Error(
        `Method ${methodName} not found on service ${serviceName}`,
      );
    }

    const [result] = await asyncMethod(params);
    return result;
  }
}
