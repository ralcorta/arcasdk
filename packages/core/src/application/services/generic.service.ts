import { IGenericRepositoryPort } from "@application/ports/generic/generic-repository.port";
import { ArcaServiceName } from "@application/types/service-name.types";

export class GenericService {
  constructor(private readonly repository: IGenericRepositoryPort) {}

  async call(
    serviceName: ArcaServiceName,
    methodName: string,
    params: Record<string, unknown>,
    options?: { wsdlContent?: string },
  ): Promise<unknown> {
    return this.repository.call(serviceName, methodName, params, options);
  }
}
