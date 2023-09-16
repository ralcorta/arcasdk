import { AfipService } from "./afip.service";
import { WsdlPathEnum } from "../soap/wsdl-path.enum";
import { ServiceNamesEnum } from "../soap/service-names.enum";
import {
  IPersonaServiceA10PortSoap,
  PersonaServiceA10PortTypes,
} from "../soap/interfaces/PersonaServiceA10/PersonaServiceA10Port";
import { AfipContext } from "../types";
import { EndpointsEnum } from "../enums";

export class RegisterScopeTenService extends AfipService<IPersonaServiceA10PortSoap> {
  constructor(context: AfipContext) {
    super(context, {
      url: EndpointsEnum.WSSR_PADRON_TEN,
      url_test: EndpointsEnum.WSSR_PADRON_TEN_TEST,
      wsdl: WsdlPathEnum.WSSR_PADRON_TEN,
      wsdl_test: WsdlPathEnum.WSSR_PADRON_TEN_TEST,
      serviceName: ServiceNamesEnum.WSSR_PADRON_TEN,
      v12: false,
    });
  }

  /**
   * Asks to web service for servers status
   *
   * @return object { appserver : Web Service status,
   * dbserver : Database status, authserver : Autentication
   * server status}
   **/
  async getServerStatus() {
    const client = await this.getClient();
    const [output] = await client.dummyAsync({});
    return output;
  }

  /**
   * Asks to web service for taxpayer details
   *
   * @return object|null if taxpayer does not exists, return null,
   * if it exists, returns full response
   **/
  async getTaxpayerDetails(
    identifier: number
  ): Promise<PersonaServiceA10PortTypes.IpersonaReturn> {
    const client = await this.getClient();
    const { Auth } = await this.logIn();
    const [output] = await client.getPersonaAsync({
      cuitRepresentada: Auth.Cuit,
      sign: Auth.Sign,
      token: Auth.Token,
      idPersona: identifier,
    });
    return output.personaReturn;
  }
}
