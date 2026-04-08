import { Client } from "soap";
import { IGenericRepositoryPort } from "@application/ports/generic/generic-repository.port";
import { BaseSoapRepository } from "../../soap/base-soap-repository";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/types/soap-repository.types";
import { ServiceNamesEnum } from "@infrastructure/constants/service-names.enum";

export class GenericRepository
  extends BaseSoapRepository
  implements IGenericRepositoryPort
{
  constructor(config: BaseSoapRepositoryConstructorConfig) {
    super(config);
  }

  async call(
    serviceName: ServiceNamesEnum,
    methodName: string,
    params: any,
    options?: { wsdlContent?: string },
  ): Promise<any> {
    const wsdlName = serviceName;

    const { client, soapVersion } = await this.createSoapClient(wsdlName, {
      wsdlContent: options?.wsdlContent,
    });

    const authenticatedClient = this.createAuthenticatedProxy(client, {
      serviceName: serviceName,
      injectAuthProperty: false,
      soapVersion,
    });

    const methodAsync = `${methodName}Async`;
    const asyncMethod = (
      authenticatedClient as Client & Record<string, unknown>
    )[methodAsync];

    if (typeof asyncMethod !== "function") {
      throw new Error(
        `Method ${methodName} not found on service ${serviceName}`,
      );
    }

    const [result] = await (asyncMethod as (args: any) => Promise<any[]>)(
      params,
    );
    return result;
  }
}
