import { AfipService } from "./afip.service";
import { WsdlPathEnum } from "../soap/wsdl-path.enum";
import { ServiceNamesEnum } from "../soap/service-names.enum";
import {
  IPersonaServiceA4PortSoap,
  PersonaServiceA4PortTypes,
} from "../soap/interfaces/PersonaServiceA4/PersonaServiceA4Port";
import { Context } from "../types";
import { EndpointsEnum } from "../enums";

export class RegisterScopeFourService extends AfipService<IPersonaServiceA4PortSoap> {
  constructor(context: Context) {
    super(context, {
      url: EndpointsEnum.WSSR_PADRON_FOUR,
      url_test: EndpointsEnum.WSSR_PADRON_FOUR_TEST,
      wsdl: WsdlPathEnum.WSSR_PADRON_FOUR,
      wsdl_test: WsdlPathEnum.WSSR_PADRON_FOUR_TEST,
      serviceName: ServiceNamesEnum.WSSR_PADRON_FOUR,
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
  ): Promise<PersonaServiceA4PortTypes.IpersonaReturn> {
    const client = await this.getClient();
    const { Auth } = await this.getWsAuth();
    const [output] = await client.getPersonaAsync({
      cuitRepresentada: Auth.Cuit,
      sign: Auth.Sign,
      token: Auth.Token,
      idPersona: identifier,
    });
    return output.personaReturn;
  }
}
