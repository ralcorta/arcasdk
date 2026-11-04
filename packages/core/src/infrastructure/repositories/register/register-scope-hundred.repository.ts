import { BaseSoapRepository } from "../../soap/base-soap-repository";
import { IRegisterScopeHundredRepositoryPort } from "@application/ports/register/register-repository.ports";
import {
  ParameterCollectionDto,
  RegisterParameterDto,
  ServerStatus,
} from "@application/dto/register";
import { ArcaServiceNames } from "@application/types/service-name.types";
import { WsdlPaths } from "@infrastructure/soap/config/wsdl-path.types";
import { Endpoints } from "@infrastructure/soap/config/endpoints.types";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/types/soap-repository.types";
import {
  mapPadronAuth,
  padronExcludeMethods,
} from "@infrastructure/soap/config/auth-mappers";
import {
  IParameterServiceA100PortSoap,
  ParameterServiceA100PortTypes,
} from "@infrastructure/soap/contracts/ParameterServiceA100/ParameterServiceA100Port";

export class RegisterScopeHundredRepository
  extends BaseSoapRepository
  implements IRegisterScopeHundredRepositoryPort
{
  private client?: IParameterServiceA100PortSoap;

  constructor(config: BaseSoapRepositoryConstructorConfig) {
    super(config);
  }

  private async getClient(): Promise<IParameterServiceA100PortSoap> {
    if (this.client) {
      return this.client;
    }

    const wsdlName = this.production
      ? WsdlPaths.WSSR_PADRON_HUNDRED
      : WsdlPaths.WSSR_PADRON_HUNDRED_TEST;
    const endpoint = this.production
      ? Endpoints.WSSR_PADRON_HUNDRED
      : Endpoints.WSSR_PADRON_HUNDRED_TEST;

    const { client, soapVersion } =
      await this.createSoapClient<IParameterServiceA100PortSoap>(wsdlName, {
        forceSoap12Headers: false,
      });

    this.soapClient.setEndpoint(client, endpoint);

    this.client = this.createAuthenticatedProxy(client, {
      serviceName: ArcaServiceNames.WSSR_PADRON_HUNDRED,
      soapVersion,
      authMapper: mapPadronAuth,
      excludeMethods: padronExcludeMethods,
    });

    return this.client;
  }

  async getServerStatus(): Promise<ServerStatus> {
    const client = await this.getClient();
    const [output] = await client.dummyAsync({});
    const result = output.return;

    return {
      appServer: result.appserver,
      dbServer: result.dbserver,
      authServer: result.authserver,
    };
  }

  async getParameterCollection(
    collectionName: string,
  ): Promise<ParameterCollectionDto | null> {
    const client = await this.getClient();
    const [output] = await client.getParameterCollectionByNameAsync({
      collectionName,
    });

    const collectionReturn = output?.parameterCollectionReturn;
    const collection = collectionReturn?.parameterCollection;
    if (!collection) {
      return null;
    }

    return {
      name: collection.name ?? collectionName,
      fechaHora: toIsoString(collectionReturn.metadata?.fechaHora),
      parameters: toArray(collection.parameterList).map(mapParameter),
    };
  }
}

// node-soap devuelve un objeto suelto en lugar de un array cuando hay un solo elemento.
function toArray<T>(value: T | T[] | null | undefined): T[] {
  if (value === null || value === undefined) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

// node-soap convierte xs:dateTime en Date aunque el contrato generado lo tipe como string.
function toIsoString(value: string | Date | undefined): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }
  return new Date(value).toISOString();
}

function mapParameter(
  parameter: ParameterServiceA100PortTypes.IparameterList,
): RegisterParameterDto {
  const attributes: Record<string, string | undefined> = {};
  for (const attribute of toArray(parameter.attributeList)) {
    if (attribute?.name) {
      attributes[attribute.name] = attribute.value;
    }
  }

  return {
    id: parameter.id,
    description: parameter.description,
    attributes,
  };
}
