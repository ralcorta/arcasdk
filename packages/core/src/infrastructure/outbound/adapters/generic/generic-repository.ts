/**
 * Generic Repository
 * Implements IGenericRepositoryPort for generic AFIP/ARCA requests
 */
import { IGenericRepositoryPort } from "@application/ports/generic/generic-repository.port";
import { BaseSoapRepository } from "../soap/base-soap-repository";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/outbound/ports/soap/soap-repository.types";
import { SoapServiceVersion } from "@infrastructure/outbound/ports/soap/enums/endpoints.enum";

export class GenericRepository
  extends BaseSoapRepository
  implements IGenericRepositoryPort
{
  constructor(config: BaseSoapRepositoryConstructorConfig) {
    super(config);
  }

  async call(
    serviceName: string,
    methodName: string,
    params: any,
    options?: { wsdlContent?: string }
  ): Promise<any> {
    const wsdlName = serviceName;

    let client: any;
    let soapVersion: SoapServiceVersion;

    if (this.useSoap12) {
      client = await this.soapClient.createClient(wsdlName, {
        forceSoap12Headers: true,
        wsdlContent: options?.wsdlContent,
      });
      soapVersion = SoapServiceVersion.ServiceSoap12;
    } else {
      client = await this.soapClient.createClient(wsdlName, {
        forceSoap12Headers: false,
        wsdlContent: options?.wsdlContent,
      });
      soapVersion = SoapServiceVersion.ServiceSoap;
    }

    const authenticatedClient = this.createAuthenticatedProxy(client, {
      serviceName: serviceName as any,
      injectAuthProperty: false,
      soapVersion,
    });

    const methodAsync = `${methodName}Async`;

    if (typeof authenticatedClient[methodAsync] !== "function") {
      throw new Error(
        `Method ${methodName} not found on service ${serviceName}`
      );
    }

    const [result] = await authenticatedClient[methodAsync](params);
    return result;
  }
}
