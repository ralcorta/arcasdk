import { IGenericRepositoryPort } from "@application/ports/generic/generic-repository.port";
import { ServiceNamesEnum } from "@infrastructure/constants/service-names.enum";

export class GenericService {
  constructor(private readonly repository: IGenericRepositoryPort) {}

  /**
   * Call a SOAP method on a service
   * @param serviceName AFIP/ARCA SOAP service (WSDL key)
   * @param methodName Method name to call (e.g., 'FECompUltimoAutorizado')
   * @param params Parameters for the method
   * @returns Promise with the result
   */
  async call(
    serviceName: ServiceNamesEnum,
    methodName: string,
    params: any,
    options?: { wsdlContent?: string },
  ): Promise<any> {
    return this.repository.call(serviceName, methodName, params, options);
  }
}
