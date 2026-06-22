import { IGenericRepositoryPort } from "@application/ports/generic/generic-repository.port";
import { BaseSoapRepository } from "../../soap/base-soap-repository";
import { ArcaServiceName } from "@application/types/service-name.types";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/types/soap-repository.types";

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
    const { client, soapVersion } = await this.createSoapClient(serviceName, {
      wsdlContent: options?.wsdlContent,
    });

    const authenticatedClient = this.createAuthenticatedProxy(client, {
      serviceName,
      injectAuthProperty: false,
      soapVersion,
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
